"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1289],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return d}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=r.createContext({}),l=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=l(e.components);return r.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),f=l(t),d=a,g=f["".concat(u,".").concat(d)]||f[d]||p[d]||o;return t?r.createElement(g,i(i({ref:n},c),{},{components:t})):r.createElement(g,i({ref:n},c))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=f;var s={};for(var u in n)hasOwnProperty.call(n,u)&&(s[u]=n[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},63384:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return l},toc:function(){return c},default:function(){return f}});var r=t(87462),a=t(63366),o=(t(67294),t(3905)),i=["components"],s={sidebar_position:5,sidebar_label:"Operations Funcs"},u="Operations Funcs (Experimental)",l={unversionedId:"plugins/funcs",id:"plugins/funcs",title:"Operations Funcs (Experimental)",description:"Operations Funcs generated fully typed python functions that can call other functions (for example your GQL Clients execute function) and returns the typed response.",source:"@site/docs/plugins/funcs.md",sourceDirName:"plugins",slug:"/plugins/funcs",permalink:"/turms/docs/plugins/funcs",editUrl:"https://github.com/jhnnsrs/turms/edit/master/website/docs/plugins/funcs.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,sidebar_label:"Operations Funcs"},sidebar:"tutorialSidebar",previous:{title:"Operations",permalink:"/turms/docs/plugins/operations"},next:{title:"config",permalink:"/turms/docs/reference/config"}},c=[{value:"Default Configuration",id:"default-configuration",children:[],level:3},{value:"Example Config",id:"example-config",children:[],level:3}],p={toc:c};function f(e){var n=e.components,t=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"operations-funcs-experimental"},"Operations Funcs (Experimental)"),(0,o.kt)("p",null,"Operations Funcs generated fully typed python functions that can call other functions (for example your GQL Clients execute function) and returns the typed response."),(0,o.kt)("h3",{id:"default-configuration"},"Default Configuration"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'project:\n  default:\n    schema: ...\n    extensions:\n      turms:\n        plugins:\n          - type: turms.plugins.operations.OperationsPlugin\n            prepend_sync: ""\n            prepend_async: "a"\n            collapse_lonely: True #bool = True Collapses one operation query and return the collapsed type\n            global_args: #List[Arg] = [] global additional arguments for the functions to be called\n            global_kwargs: #List[Kwarg] = []\n            definitions: #List[FunctionDefinition] = []\n')),(0,o.kt)("p",null,"Definitions Sepcify a strategy to generate a proxy function"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"definitions:\n  type: # OperationType subscrpition, query, mutation\n  is_async: #bool = False should we generate an async function\n  extra_args: # List[Arg] = [] A list ofadditional arguments to be passed\n  extra_kwargs: # List[Kwarg] = [] # A list of keyworad arguments to be passed\n  use: path.to.the.function #the function we should proxy to signature def(document, variables, *extra_args, **extra_kwargs)\n")),(0,o.kt)("p",null,"Args can be defined as such"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'extra_args:\n  key: #str\n  type: #str\n  description: #str = "Specify that in turms.plugin.funcs.OperationsFuncPlugin"\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'extra_kwargs:\n  key: #str\n  type: #str\n  description: #str = "Specify that in turms.plugin.funcs.OperationsFuncPlugin"\n  default: #str = None\n')),(0,o.kt)("h3",{id:"example-config"},"Example Config"))}f.isMDXComponent=!0}}]);