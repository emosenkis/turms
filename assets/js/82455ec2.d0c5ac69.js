"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7078],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),u=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=u(n),h=a,d=m["".concat(o,".").concat(h)]||m[h]||c[h]||s;return n?r.createElement(d,i(i({ref:t},p),{},{components:n})):r.createElement(d,i({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=m;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<s;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},95937:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return o},metadata:function(){return u},toc:function(){return p},default:function(){return m}});var r=n(87462),a=n(63366),s=(n(67294),n(3905)),i=["components"],l={sidebar_position:5,sidebar_label:"Turms \u2764\ufe0f Rath"},o="Turms \u2764\ufe0f Rath",u={unversionedId:"rath",id:"rath",title:"Turms \u2764\ufe0f Rath",description:"What is raths?",source:"@site/docs/rath.md",sourceDirName:".",slug:"/rath",permalink:"/turms/docs/rath",editUrl:"https://github.com/jhnnsrs/turms/edit/master/website/docs/rath.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,sidebar_label:"Turms \u2764\ufe0f Rath"},sidebar:"tutorialSidebar",previous:{title:"Config",permalink:"/turms/docs/config"},next:{title:"config",permalink:"/turms/docs/reference/config"}},p=[{value:"What is raths?",id:"what-is-raths",children:[],level:3},{value:"Design",id:"design",children:[],level:3}],c={toc:p};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,s.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"turms-\ufe0f-rath"},"Turms \u2764\ufe0f Rath"),(0,s.kt)("h3",{id:"what-is-raths"},"What is raths?"),(0,s.kt)("p",null,"Rath is an apollo like graphql client library for async and sync queries focussing\non linking client side logic in a composable way."),(0,s.kt)("h3",{id:"design"},"Design"),(0,s.kt)("p",null,"Rath and Turms are developed independently, but are completely interoperable."),(0,s.kt)("p",null,"Consider this query"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="/graphql/get_capsules.graphql"',title:'"/graphql/get_capsules.graphql"'},"query get_capsules {\n  capsules {\n    id\n    missions {\n      flight\n      name\n    }\n  }\n}\n")),(0,s.kt)("p",null,"On running (in your terminal)"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"turms gen\n")),(0,s.kt)("p",null,"Turms generates automatically this pydantic schema for you"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="/schema/api.py"',title:'"/schema/api.py"'},'\nclass Get_capsulesQueryCapsulesMissions(GraphQLObject):\n    typename: Optional[Literal["CapsuleMission"]] = Field(alias="__typename")\n    flight: Optional[int]\n    name: Optional[str]\n\n\nclass Get_capsulesQueryCapsules(GraphQLObject):\n    typename: Optional[Literal["Capsule"]] = Field(alias="__typename")\n    id: Optional[str]\n    missions: Optional[List[Optional[Get_capsulesQueryCapsulesMissions]]]\n\n\nclass Get_capsulesQuery(GraphQLQuery):\n    capsules: Optional[List[Optional[Get_capsulesQueryCapsules]]]\n\n    class Meta:\n        domain = "default"\n        document = "query get_capsules {\\n  capsules {\\n    id\\n    missions {\\n      flight\\n      name\\n    }\\n  }\\n}"\n\n')),(0,s.kt)("p",null,"Which you can than use easily in your rath code"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-python"},"from rath import Rath\nfrom schema.api import Get_capsulesQuery\n\nrath = Rath(...)\n\nwith rath:\n  typed_answer = GetcapuslesQuery(**rath.execute(GetcapuslesQuery.Meta.document).data) # fully tpyed\n\n")),(0,s.kt)("p",null,"You can also use the funcs plugin in conjuction with a rath proxy function to\nallow fully typed calls to your api like this:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-python"},"from rath import Rath\nfrom schema.api import get_capsules\n\nrath = Rath(...)\n\nwith rath:\n typed_answer = get_capsules()\n\n")))}m.isMDXComponent=!0}}]);