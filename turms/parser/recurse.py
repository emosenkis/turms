from turms.config import GeneratorConfig
from graphql.utilities.build_client_schema import GraphQLSchema
from graphql.language.ast import (
    FieldNode,
    FragmentSpreadNode,
    InlineFragmentNode,
)
from turms.registry import ClassRegistry
from turms.utils import (
    generate_config_class,
    generate_typename_field,
    get_additional_bases_for_type,
    get_interface_bases,
    parse_documents,
    target_from_node,
)
import ast
from graphql.type.definition import (
    GraphQLEnumType,
    GraphQLField,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLScalarType,
    GraphQLType,
    get_named_type,
    is_list_type,
)
import keyword


def recurse_annotation(
    node: FieldNode,
    type: GraphQLType,
    client_schema: GraphQLSchema,
    config: GeneratorConfig,
    subtree: ast.AST,
    registry: ClassRegistry,
    parent_name="",
    is_optional=True,
):

    if isinstance(type, GraphQLInterfaceType):
        # Lets Create Base Class to Inherit from for this
        mother_class_fields = []
        target = target_from_node(node)
        base_name = f"{parent_name}{target.capitalize()}"

        if len(node.selection_set.selections) == 1:
            subnode = node.selection_set.selections[0]
            if isinstance(subnode, FragmentSpreadNode):
                if is_optional:
                    registry.register_import("typing.Optional")
                    return ast.Subscript(
                        value=ast.Name("Optional", ctx=ast.Load()),
                        slice=ast.Name(
                            id=registry.get_fragment_class(subnode.name.value),
                            ctx=ast.Load(),
                        ),
                    )

                else:
                    return ast.Name(
                        id=registry.get_fragment_class(subnode.name.value),
                        ctx=ast.Load(),
                    )

        if type.description:
            mother_class_fields.append(
                ast.Expr(value=ast.Constant(value=type.description))
            )

        registry.register_import("typing.Optional")
        """
        mother_class_fields += [
            ast.AnnAssign(
                target=ast.Name(id="typename", ctx=ast.Store()),
                annotation=ast.Subscript(
                    value=ast.Name(id="Optional", ctx=ast.Load()),
                    slice=ast.Name("str", ctx=ast.Load()),
                ),
                value=ast.Call(
                    func=ast.Name(id="Field", ctx=ast.Load()),
                    args=[],
                    keywords=[
                        ast.keyword(arg="alias", value=ast.Constant(value="__typename"))
                    ],
                ),
                simple=1,
            )
        ]
        """

        for sub_node in node.selection_set.selections:

            if isinstance(sub_node, FieldNode):
                if sub_node.name.value == "__typename":
                    continue

                field_type = type.fields[sub_node.name.value]
                mother_class_fields += type_field_node(
                    sub_node,
                    field_type,
                    client_schema,
                    config,
                    subtree,
                    registry,
                    parent_name=base_name,
                )

        mother_class_name = f"{base_name}Base"
        additional_bases = get_additional_bases_for_type(type.name, config, registry)

        body = mother_class_fields if mother_class_fields else [ast.Pass()]

        mother_class = ast.ClassDef(
            mother_class_name,
            bases=get_interface_bases(config, registry)
            + additional_bases,  # Todo: fill with base
            decorator_list=[],
            keywords=[],
            body=body + generate_config_class(config),
        )

        subtree.append(mother_class)

        union_class_names = []

        for sub_node in node.selection_set.selections:

            if isinstance(sub_node, FragmentSpreadNode):

                name = f"{base_name}{sub_node.name.value}"

                cls = ast.ClassDef(
                    name,
                    bases=[
                        ast.Name(id=mother_class_name, ctx=ast.Load()),
                        ast.Name(
                            id=registry.get_fragment_class(sub_node.name.value),
                            ctx=ast.Load(),
                        ),
                    ],
                    decorator_list=[],
                    keywords=[],
                    body=[ast.Pass()] + generate_config_class(config),
                )

                subtree.append(cls)
                union_class_names.append(name)

            if isinstance(sub_node, InlineFragmentNode):
                name = f"{base_name}{sub_node.type_condition.name.value}Fragment"
                inline_fragment_fields = []

                inline_fragment_fields += [
                    generate_typename_field(
                        sub_node.type_condition.name.value, registry
                    )
                ]

                for sub_sub_node in sub_node.selection_set.selections:

                    if isinstance(sub_sub_node, FieldNode):
                        sub_sub_node_type = client_schema.get_type(
                            sub_node.type_condition.name.value
                        )

                        if sub_sub_node.name.value == "__typename":
                            continue

                        field_type = sub_sub_node_type.fields[sub_sub_node.name.value]
                        inline_fragment_fields += type_field_node(
                            sub_sub_node,
                            field_type,
                            client_schema,
                            config,
                            subtree,
                            registry,
                            parent_name=name,
                        )

                additional_bases = get_additional_bases_for_type(
                    sub_node.type_condition.name.value, config, registry
                )
                cls = ast.ClassDef(
                    name,
                    bases=additional_bases
                    + [
                        ast.Name(id=mother_class_name, ctx=ast.Load()),
                    ],
                    decorator_list=[],
                    keywords=[],
                    body=inline_fragment_fields + generate_config_class(config),
                )

                subtree.append(cls)
                union_class_names.append(name)

        union_class_names.append(mother_class_name)
        if len(union_class_names) > 1:
            slice = ast.Tuple(
                elts=[
                    ast.Name(id=clsname, ctx=ast.Load())
                    for clsname in union_class_names
                ],
                ctx=ast.Load(),
            )

            if is_optional:
                registry.register_import("typing.Optional")
                registry.register_import("typing.Union")

                return ast.Subscript(
                    value=ast.Name("Optional", ctx=ast.Load()),
                    slice=ast.Subscript(
                        value=ast.Name("Union", ctx=ast.Load()),
                        slice=slice,
                    ),
                )
            else:
                registry.register_import("typing.Union")
                return ast.Subscript(
                    value=ast.Name("Union", ctx=ast.Load()),
                    slice=slice,
                )
        else:
            return ast.Name(id=union_class_names[0], ctx=ast.Load())

    if isinstance(type, GraphQLObjectType):
        pick_fields = []
        additional_bases = get_additional_bases_for_type(type.name, config, registry)

        target = target_from_node(node)
        nana = f"{parent_name}{target.capitalize()}"
        if type.description:
            pick_fields.append(ast.Expr(value=ast.Constant(value=type.description)))
        pick_fields += [generate_typename_field(type.name, registry)]

        if len(node.selection_set.selections) == 1:
            subnode = node.selection_set.selections[0]
            if isinstance(subnode, FragmentSpreadNode):
                if is_optional:
                    registry.register_import("typing.Optional")
                    return ast.Subscript(
                        value=ast.Name("Optional", ctx=ast.Load()),
                        slice=ast.Name(
                            id=registry.get_fragment_class(subnode.name.value),
                            ctx=ast.Load(),
                        ),
                    )

                else:
                    return ast.Name(
                        id=registry.get_fragment_class(subnode.name.value),
                        ctx=ast.Load(),
                    )

        for sub_node in node.selection_set.selections:

            if isinstance(sub_node, FragmentSpreadNode):
                additional_bases.append(
                    ast.Name(
                        id=registry.get_fragment_class(subnode.name.value),
                        ctx=ast.Load(),
                    )
                )

            if isinstance(sub_node, FieldNode):
                if sub_node.name.value == "__typename":
                    continue
                field_type = type.fields[sub_node.name.value]
                pick_fields += type_field_node(
                    sub_node,
                    field_type,
                    client_schema,
                    config,
                    subtree,
                    registry,
                    parent_name=nana,
                )

            if isinstance(sub_node, InlineFragmentNode):
                raise NotImplementedError()

        body = pick_fields if pick_fields else [ast.Pass()]

        cls = ast.ClassDef(
            nana,
            bases=additional_bases
            + [
                ast.Name(id=base.split(".")[-1], ctx=ast.Load())
                for base in config.object_bases
            ],
            decorator_list=[],
            keywords=[],
            body=body + generate_config_class(config),
        )

        subtree.append(cls)

        if is_optional:
            registry.register_import("typing.Optional")
            return ast.Subscript(
                value=ast.Name("Optional", ctx=ast.Load()),
                slice=ast.Name(
                    id=nana,
                    ctx=ast.Load(),
                ),
            )

        else:
            return ast.Name(
                id=nana,
                ctx=ast.Load(),
            )

    if isinstance(type, GraphQLScalarType):

        if is_optional:
            registry.register_import("typing.Optional")
            return ast.Subscript(
                value=ast.Name("Optional", ctx=ast.Load()),
                slice=ast.Name(
                    id=registry.get_scalar_equivalent(type.name),
                    ctx=ast.Load(),
                ),
            )

        else:
            return ast.Name(
                id=registry.get_scalar_equivalent(type.name),
                ctx=ast.Load(),
            )

    if isinstance(type, GraphQLEnumType):

        if is_optional:
            registry.register_import("typing.Optional")
            return ast.Subscript(
                value=ast.Name("Optional", ctx=ast.Load()),
                slice=ast.Name(
                    id=registry.get_enum_class(type.name),
                    ctx=ast.Load(),
                ),
            )

        else:
            return ast.Name(
                id=registry.get_enum_class(type.name),
                ctx=ast.Load(),
            )

    if isinstance(type, GraphQLNonNull):
        return recurse_annotation(
            node,
            type.of_type,
            client_schema,
            config,
            subtree,
            registry,
            parent_name=parent_name,
            is_optional=False,
        )

    if isinstance(type, GraphQLList):

        if is_optional:
            registry.register_import("typing.Optional")
            registry.register_import("typing.List")
            return ast.Subscript(
                value=ast.Name("Optional", ctx=ast.Load()),
                slice=ast.Subscript(
                    value=ast.Name("List", ctx=ast.Load()),
                    slice=recurse_annotation(
                        node,
                        type.of_type,
                        client_schema,
                        config,
                        subtree,
                        registry,
                        parent_name=parent_name,
                    ),
                ),
            )

        else:
            registry.register_import("typing.List")
            return ast.Subscript(
                value=ast.Name("List", ctx=ast.Load()),
                slice=recurse_annotation(
                    node,
                    type.of_type,
                    client_schema,
                    config,
                    subtree,
                    registry,
                    parent_name=parent_name,
                ),
            )

    raise NotImplementedError()


def type_field_node(
    node: FieldNode,
    field: GraphQLField,
    client_schema: GraphQLSchema,
    config: GeneratorConfig,
    subtree: ast.AST,
    registry: ClassRegistry,
    parent_name="",
    is_optional=True,
):

    target = target_from_node(node)
    field_name = registry.generate_node_name(target)

    if target != field_name:
        registry.register_import("pydantic.Field")
        assign = ast.AnnAssign(
            target=ast.Name(field_name, ctx=ast.Store()),
            annotation=recurse_annotation(
                node,
                field.type,
                client_schema,
                config,
                subtree,
                registry,
                parent_name=parent_name,
                is_optional=is_optional,
            ),
            value=ast.Call(
                func=ast.Name(id="Field", ctx=ast.Load()),
                args=[],
                keywords=[ast.keyword(arg="alias", value=ast.Constant(value=target))],
            ),
            simple=1,
        )
    else:
        assign = ast.AnnAssign(
            target=ast.Name(target, ctx=ast.Store()),
            annotation=recurse_annotation(
                node,
                field.type,
                client_schema,
                config,
                subtree,
                registry,
                parent_name=parent_name,
                is_optional=is_optional,
            ),
            simple=1,
        )

    potential_comment = (
        field.description
        if not field.deprecation_reason
        else f"DEPRECATED {field.deprecation_reason}: : {field.description} "
    )

    if field.deprecation_reason:
        registry.warn(
            f"Field {node.name.value} on {parent_name} is deprecated: {field.deprecation_reason}"
        )

    if potential_comment:
        return [assign, ast.Expr(value=ast.Constant(value=potential_comment))]

    return [assign]
