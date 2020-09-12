//
//
//
//
//
//
//
//
//
//

var script = {

    name      : 'HelloWorld',
    mixins    : [],
    components: {},

    props: {
        name: {
            type   : String,
            default: 'World'
        }
    },

    data () {
        return {
            reversed: false
        };
    },

    computed: {
        display () {
            const str = `Hello ${ this.name }`;
            return this.reversed
                ? str
                    .split ( '' )
                    .reverse ()
                    .join ( '' )
                : str;
        }
    },

    methods: {

        reverse () {
            this.reversed = !this.reversed;
        }

    }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [
    _c("h1", { domProps: { innerHTML: _vm._s(_vm.display) } }),
    _vm._v(" "),
    _c("button", { staticClass: "primary", on: { click: _vm.reverse } }, [
      _vm._v("Reverse")
    ])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-e7337386_0", { source: "h1[data-v-e7337386] {\n  display: inline-block;\n}\nbutton[data-v-e7337386]:hover {\n  -webkit-transform: rotate(180deg);\n  -moz-transform: rotate(180deg);\n  -o-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n\n/*# sourceMappingURL=component.vue.map */", map: {"version":3,"sources":["/home/thefoot/Work/opensource/thefoot/vue-component-template/src/component.vue","component.vue"],"names":[],"mappings":"AAuDA;EACA,qBAAA;ACtDA;AD0DA;EACA,iCAAA;EACA,8BAAA;EACA,4BAAA;EACA,6BAAA;EACA,yBAAA;ACvDA;;AAEA,wCAAwC","file":"component.vue","sourcesContent":["<template>\n\t<div>\n\n\t\t<h1 v-html=\"display\"></h1>\n\n\t\t<button class=\"primary\" @click=\"reverse\">Reverse</button>\n\n\t</div>\n</template>\n\n<script>\nexport default {\n\n    name      : 'HelloWorld',\n    mixins    : [],\n    components: {},\n\n    props: {\n        name: {\n            type   : String,\n            default: 'World'\n        }\n    },\n\n    data () {\n        return {\n            reversed: false\n        };\n    },\n\n    computed: {\n        display () {\n            const str = `Hello ${ this.name }`;\n            return this.reversed\n                ? str\n                    .split ( '' )\n                    .reverse ()\n                    .join ( '' )\n                : str;\n        }\n    },\n\n    methods: {\n\n        reverse () {\n            this.reversed = !this.reversed;\n        }\n\n    }\n\n};\n</script>\n\n<style scoped lang=\"scss\">\n\nh1 {\n\tdisplay: inline-block;\n}\n\nbutton {\n\t&:hover {\n\t\t-webkit-transform: rotate(180deg);\n\t\t-moz-transform: rotate(180deg);\n\t\t-o-transform: rotate(180deg);\n\t\t-ms-transform: rotate(180deg);\n\t\ttransform: rotate(180deg);\n\t}\n}\n\n</style>","h1 {\n  display: inline-block;\n}\n\nbutton:hover {\n  -webkit-transform: rotate(180deg);\n  -moz-transform: rotate(180deg);\n  -o-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n\n/*# sourceMappingURL=component.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-e7337386";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__.install = Vue => {
    Vue.component ( __vue_component__.name, __vue_component__ );
};

export default __vue_component__;
//# sourceMappingURL=component.esm.js.map
