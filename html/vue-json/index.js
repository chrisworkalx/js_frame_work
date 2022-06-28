!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('vue'), require('clipboard')))
    : 'function' == typeof define && define.amd
    ? define(['vue', 'clipboard'], t)
    : 'object' == typeof exports
    ? (exports.JsonView = t(require('vue'), require('clipboard')))
    : (e.JsonView = t(e.vue, e.clipboard));
})(this, function (n, o) {
  return (
    (a = {}),
    (i.m = r =
      [
        function (e, t, n) {
          'use strict';
          function o(e, t, n, o, i, r, a, s) {
            var u,
              l,
              c = 'function' == typeof e ? e.options : e;
            return (
              t &&
                ((c.render = t), (c.staticRenderFns = n), (c._compiled = !0)),
              o && (c.functional = !0),
              r && (c._scopeId = 'data-v-' + r),
              a
                ? ((u = function (e) {
                    (e =
                      e ||
                      (this.$vnode && this.$vnode.ssrContext) ||
                      (this.parent &&
                        this.parent.$vnode &&
                        this.parent.$vnode.ssrContext)) ||
                      'undefined' == typeof __VUE_SSR_CONTEXT__ ||
                      (e = __VUE_SSR_CONTEXT__),
                      i && i.call(this, e),
                      e &&
                        e._registeredComponents &&
                        e._registeredComponents.add(a);
                  }),
                  (c._ssrRegister = u))
                : i &&
                  (u = s
                    ? function () {
                        i.call(
                          this,
                          (c.functional ? this.parent : this).$root.$options
                            .shadowRoot
                        );
                      }
                    : i),
              u &&
                (c.functional
                  ? ((c._injectStyles = u),
                    (l = c.render),
                    (c.render = function (e, t) {
                      return u.call(t), l(e, t);
                    }))
                  : ((s = c.beforeCreate),
                    (c.beforeCreate = s ? [].concat(s, u) : [u]))),
              { exports: e, options: c }
            );
          }
          n.d(t, 'a', function () {
            return o;
          });
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(2),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          a(n(29));
          var o = a(n(21)),
            i = a(n(41)),
            r = n(42);
          function a(e) {
            return e && e.__esModule ? e : { default: e };
          }
          t.default = {
            name: 'JsonViewer',
            components: { JsonBox: o.default },
            props: {
              value: {
                type: [Object, Array, String, Number, Boolean, Function],
                required: !0
              },
              expanded: { type: Boolean, default: !1 },
              expandDepth: { type: Number, default: 1 },
              copyable: { type: [Boolean, Object], default: !1 },
              sort: { type: Boolean, default: !1 },
              boxed: { type: Boolean, default: !1 },
              theme: { type: String, default: 'jv-light' },
              timeformat: {
                type: Function,
                default: function (e) {
                  return e.toLocaleString();
                }
              },
              previewMode: { type: Boolean, default: !1 },
              showArrayIndex: { type: Boolean, default: !0 },
              showDoubleQuotes: { type: Boolean, default: !1 }
            },
            provide: function () {
              return {
                expandDepth: this.expandDepth,
                timeformat: this.timeformat,
                onKeyclick: this.onKeyclick
              };
            },
            data: function () {
              return {
                copied: !1,
                expandableCode: !1,
                expandCode: this.expanded
              };
            },
            computed: {
              jvClass: function () {
                return (
                  'jv-container ' + this.theme + (this.boxed ? ' boxed' : '')
                );
              },
              copyText: function () {
                var e = this.copyable;
                return {
                  copyText: e.copyText || 'copy',
                  copiedText: e.copiedText || 'copied!',
                  timeout: e.timeout || 2e3,
                  align: e.align
                };
              }
            },
            watch: {
              value: function () {
                this.onResized();
              }
            },
            mounted: function () {
              var t = this;
              (this.debounceResized = (0, r.debounce)(
                this.debResized.bind(this),
                200
              )),
                this.boxed &&
                  this.$refs.jsonBox &&
                  (this.onResized(),
                  this.$refs.jsonBox.$el.addEventListener(
                    'resized',
                    this.onResized,
                    !0
                  )),
                this.copyable &&
                  new i.default(this.$refs.clip, {
                    container: this.$refs.viewer,
                    text: function () {
                      return JSON.stringify(t.value, null, 2);
                    }
                  }).on('success', function (e) {
                    t.onCopied(e);
                  });
            },
            methods: {
              onResized: function () {
                this.debounceResized();
              },
              debResized: function () {
                var e = this;
                this.$nextTick(function () {
                  e.$refs.jsonBox &&
                    (250 <= e.$refs.jsonBox.$el.clientHeight
                      ? (e.expandableCode = !0)
                      : (e.expandableCode = !1));
                });
              },
              onCopied: function (e) {
                var t = this;
                this.copied ||
                  ((this.copied = !0),
                  setTimeout(function () {
                    t.copied = !1;
                  }, this.copyText.timeout),
                  this.$emit('copied', e));
              },
              toggleExpandCode: function () {
                this.expandCode = !this.expandCode;
              },
              onKeyclick: function (e) {
                this.$emit('keyclick', e);
              }
            }
          };
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(4),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          var r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  },
            a = o(n(30)),
            s = o(n(31)),
            u = o(n(32)),
            l = o(n(33)),
            c = o(n(34)),
            d = o(n(35)),
            f = o(n(36)),
            p = o(n(37));
          function o(e) {
            return e && e.__esModule ? e : { default: e };
          }
          t.default = {
            name: 'JsonBox',
            inject: ['expandDepth', 'onKeyclick'],
            props: {
              value: {
                type: [Object, Array, String, Number, Boolean, Function, Date],
                default: null
              },
              keyName: { type: String, default: '' },
              sort: Boolean,
              depth: { type: Number, default: 0 },
              previewMode: Boolean,
              forceExpand: Boolean,
              showArrayIndex: Boolean,
              showDoubleQuotes: Boolean,
              path: { type: String, default: '$' }
            },
            data: function () {
              return { expand: !0, forceExpandMe: this.forceExpand };
            },
            mounted: function () {
              this.expand =
                this.previewMode ||
                !(this.depth >= this.expandDepth) ||
                this.forceExpandMe;
            },
            methods: {
              toggle: function () {
                (this.expand = !this.expand), this.dispatchEvent();
              },
              toggleAll: function () {
                (this.expand = !this.expand),
                  (this.forceExpandMe = this.expand),
                  this.dispatchEvent();
              },
              dispatchEvent: function () {
                try {
                  this.$el.dispatchEvent(new Event('resized'));
                } catch (e) {
                  var t = document.createEvent('Event');
                  t.initEvent('resized', !0, !1), this.$el.dispatchEvent(t);
                }
              },
              getPath: function () {
                for (var e = [this.keyName], t = this.$parent; t.depth; )
                  t.$el.classList.contains('jv-node') && e.push(t.keyName),
                    (t = t.$parent);
                return e.reverse();
              }
            },
            render: function (e) {
              var t = this,
                n = [],
                o = void 0;
              null === this.value || void 0 === this.value
                ? (o = s.default)
                : Array.isArray(this.value)
                ? (o = d.default)
                : '[object Date]' === Object.prototype.toString.call(this.value)
                ? (o = p.default)
                : 'object' === r(this.value)
                ? (o = c.default)
                : 'number' == typeof this.value
                ? (o = u.default)
                : 'string' == typeof this.value
                ? (o = a.default)
                : 'boolean' == typeof this.value
                ? (o = l.default)
                : 'function' == typeof this.value && (o = f.default);
              var i =
                this.keyName &&
                this.value &&
                (Array.isArray(this.value) ||
                  ('object' === r(this.value) &&
                    '[object Date]' !==
                      Object.prototype.toString.call(this.value)));
              return (
                !this.previewMode &&
                  i &&
                  n.push(
                    e('span', {
                      class: { 'jv-toggle': !0, open: !!this.expand },
                      on: {
                        click: function (e) {
                          e.altKey ? t.toggleAll() : t.toggle();
                        }
                      }
                    })
                  ),
                this.keyName &&
                  n.push(
                    e('span', {
                      class: { 'jv-key': !0 },
                      domProps: {
                        innerText: this.showDoubleQuotes
                          ? '"' + this.keyName + '":'
                          : this.keyName + ':'
                      },
                      on: {
                        click: function () {
                          t.onKeyclick(t.path);
                        }
                      }
                    })
                  ),
                n.push(
                  e(o, {
                    class: { 'jv-push': !0 },
                    props: {
                      jsonValue: this.value,
                      keyName: this.keyName,
                      sort: this.sort,
                      depth: this.depth,
                      expand: this.expand,
                      previewMode: this.previewMode,
                      forceExpand: this.forceExpandMe,
                      showArrayIndex: this.showArrayIndex,
                      showDoubleQuotes: this.showDoubleQuotes,
                      path: this.path
                    },
                    on: {
                      'update:expand': function (e) {
                        t.expand = e;
                      },
                      'update:expandAll': function (e) {
                        (t.expand = e), (t.forceExpandMe = t.expand);
                      }
                    }
                  })
                ),
                e(
                  'div',
                  {
                    class: {
                      'jv-node': !0,
                      'jv-key-node': Boolean(this.keyName) && !i,
                      toggle: !this.previewMode && i
                    }
                  },
                  n
                )
              );
            }
          };
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(6),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          var i = /^\w+:\/\//;
          t.default = {
            name: 'JsonString',
            props: { jsonValue: { type: String, required: !0 } },
            data: function () {
              return { expand: !0, canExtend: !1 };
            },
            mounted: function () {
              this.$refs.itemRef.offsetHeight >
                this.$refs.holderRef.offsetHeight && (this.canExtend = !0);
            },
            methods: {
              toggle: function () {
                this.expand = !this.expand;
              }
            },
            render: function (e) {
              var t = this.jsonValue,
                n = i.test(t),
                o = void 0;
              return (
                this.expand
                  ? ((o = {
                      class: { 'jv-item': !0, 'jv-string': !0 },
                      ref: 'itemRef'
                    }).domProps = n
                      ? {
                          innerHTML:
                            '"' +
                            (t =
                              '<a href="' +
                              t +
                              '" target="_blank" class="jv-link">' +
                              t +
                              '</a>').toString() +
                            '"'
                        }
                      : { innerText: '"' + t.toString() + '"' })
                  : (o = {
                      class: { 'jv-ellipsis': !0 },
                      on: { click: this.toggle },
                      domProps: { innerText: '...' }
                    }),
                e('span', {}, [
                  this.canExtend &&
                    e('span', {
                      class: { 'jv-toggle': !0, open: this.expand },
                      on: { click: this.toggle }
                    }),
                  e('span', {
                    class: { 'jv-holder-node': !0 },
                    ref: 'holderRef'
                  }),
                  e('span', o)
                ])
              );
            }
          };
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(8),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = {
              name: 'JsonUndefined',
              functional: !0,
              props: { jsonValue: { type: Object, default: null } },
              render: function (e, t) {
                return e('span', {
                  class: { 'jv-item': !0, 'jv-undefined': !0 },
                  domProps: {
                    innerText: null === t.props.jsonValue ? 'null' : 'undefined'
                  }
                });
              }
            });
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(10),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = {
              name: 'JsonNumber',
              functional: !0,
              props: { jsonValue: { type: Number, required: !0 } },
              render: function (e, t) {
                var n = t.props,
                  t = Number.isInteger(n.jsonValue);
                return e('span', {
                  class: {
                    'jv-item': !0,
                    'jv-number': !0,
                    'jv-number-integer': t,
                    'jv-number-float': !t
                  },
                  domProps: { innerText: n.jsonValue.toString() }
                });
              }
            });
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(12),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = {
              name: 'JsonBoolean',
              functional: !0,
              props: { jsonValue: Boolean },
              render: function (e, t) {
                return e('span', {
                  class: { 'jv-item': !0, 'jv-boolean': !0 },
                  domProps: { innerText: t.props.jsonValue.toString() }
                });
              }
            });
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(14),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          var n = n(21),
            r = (n = n) && n.__esModule ? n : { default: n };
          t.default = {
            name: 'JsonObject',
            props: {
              jsonValue: { type: Object, required: !0 },
              keyName: { type: String, default: '' },
              depth: { type: Number, default: 0 },
              expand: Boolean,
              forceExpand: Boolean,
              sort: Boolean,
              previewMode: Boolean,
              showArrayIndex: Boolean,
              showDoubleQuotes: Boolean,
              path: String
            },
            data: function () {
              return { value: {} };
            },
            computed: {
              ordered: function () {
                var t = this;
                if (!this.sort) return this.value;
                var n = {};
                return (
                  Object.keys(this.value)
                    .sort()
                    .forEach(function (e) {
                      n[e] = t.value[e];
                    }),
                  n
                );
              }
            },
            watch: {
              jsonValue: function (e) {
                this.setValue(e);
              }
            },
            mounted: function () {
              this.setValue(this.jsonValue);
            },
            methods: {
              setValue: function (e) {
                var t = this;
                setTimeout(function () {
                  t.value = e;
                }, 0);
              },
              toggle: function () {
                this.$emit('update:expand', !this.expand), this.dispatchEvent();
              },
              toggleAll: function () {
                this.$emit('update:expandAll', !this.expand),
                  this.dispatchEvent();
              },
              dispatchEvent: function () {
                try {
                  this.$el.dispatchEvent(new Event('resized'));
                } catch (e) {
                  var t = document.createEvent('Event');
                  t.initEvent('resized', !0, !1), this.$el.dispatchEvent(t);
                }
              }
            },
            render: function (e) {
              var t,
                n = this,
                o = [];
              if (
                (this.previewMode ||
                  this.keyName ||
                  o.push(
                    e('span', {
                      class: { 'jv-toggle': !0, open: !!this.expand },
                      on: {
                        click: function (e) {
                          e.altKey ? n.toggleAll() : n.toggle();
                        }
                      }
                    })
                  ),
                o.push(
                  e('span', {
                    class: { 'jv-item': !0, 'jv-object': !0 },
                    domProps: { innerText: '{' }
                  })
                ),
                this.expand)
              )
                for (var i in this.ordered)
                  this.ordered.hasOwnProperty(i) &&
                    ((t = this.ordered[i]),
                    o.push(
                      e(r.default, {
                        key: i,
                        props: {
                          sort: this.sort,
                          keyName: i,
                          depth: this.depth + 1,
                          value: t,
                          previewMode: this.previewMode,
                          forceExpand: this.forceExpand,
                          showArrayIndex: this.showArrayIndex,
                          showDoubleQuotes: this.showDoubleQuotes,
                          path: this.path + '.' + i
                        }
                      })
                    ));
              return (
                !this.expand &&
                  Object.keys(this.value).length &&
                  o.push(
                    e('span', {
                      class: { 'jv-ellipsis': !0 },
                      on: {
                        click: function (e) {
                          e.altKey ? n.toggleAll() : n.toggle();
                        }
                      },
                      attrs: {
                        title:
                          'click to reveal object content (keys: ' +
                          Object.keys(this.ordered).join(', ') +
                          ')'
                      },
                      domProps: { innerText: '...' }
                    })
                  ),
                o.push(
                  e('span', {
                    class: { 'jv-item': !0, 'jv-object': !0 },
                    domProps: { innerText: '}' }
                  })
                ),
                e('span', o)
              );
            }
          };
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(16),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          var n = n(21),
            r = (n = n) && n.__esModule ? n : { default: n };
          t.default = {
            name: 'JsonArray',
            props: {
              jsonValue: { type: Array, required: !0 },
              keyName: { type: String, default: '' },
              depth: { type: Number, default: 0 },
              sort: Boolean,
              expand: Boolean,
              forceExpand: Boolean,
              previewMode: Boolean,
              showArrayIndex: Boolean,
              showDoubleQuotes: Boolean,
              path: String
            },
            data: function () {
              return { value: [] };
            },
            watch: {
              jsonValue: function (e) {
                this.setValue(e);
              }
            },
            mounted: function () {
              this.setValue(this.jsonValue);
            },
            methods: {
              setValue: function (e) {
                var t = this,
                  n =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : 0;
                0 === n && (this.value = []),
                  setTimeout(function () {
                    e.length > n && (t.value.push(e[n]), t.setValue(e, n + 1));
                  }, 0);
              },
              toggle: function () {
                this.$emit('update:expand', !this.expand), this.dispatchEvent();
              },
              toggleAll: function () {
                this.$emit('update:expandAll', !this.expand),
                  this.dispatchEvent();
              },
              dispatchEvent: function () {
                try {
                  this.$el.dispatchEvent(new Event('resized'));
                } catch (e) {
                  var t = document.createEvent('Event');
                  t.initEvent('resized', !0, !1), this.$el.dispatchEvent(t);
                }
              }
            },
            render: function (n) {
              var o = this,
                i = [];
              return (
                this.previewMode ||
                  this.keyName ||
                  i.push(
                    n('span', {
                      class: { 'jv-toggle': !0, open: !!this.expand },
                      on: {
                        click: function (e) {
                          e.altKey ? o.toggleAll() : o.toggle();
                        }
                      }
                    })
                  ),
                i.push(
                  n('span', {
                    class: { 'jv-item': !0, 'jv-array': !0 },
                    domProps: { innerText: '[' }
                  })
                ),
                this.expand &&
                  this.value.forEach(function (e, t) {
                    i.push(
                      n(r.default, {
                        key: t,
                        props: {
                          sort: o.sort,
                          keyName: o.showArrayIndex ? '' + t : '',
                          depth: o.depth + 1,
                          value: e,
                          previewMode: o.previewMode,
                          forceExpand: o.forceExpand,
                          showArrayIndex: o.showArrayIndex,
                          showDoubleQuotes: o.showDoubleQuotes,
                          path: o.path + '.' + t
                        }
                      })
                    );
                  }),
                !this.expand &&
                  this.value.length &&
                  i.push(
                    n('span', {
                      class: { 'jv-ellipsis': !0 },
                      on: {
                        click: function (e) {
                          e.altKey ? o.toggleAll() : o.toggle();
                        }
                      },
                      attrs: {
                        title:
                          'click to reveal ' +
                          this.value.length +
                          ' hidden items'
                      },
                      domProps: { innerText: '...' }
                    })
                  ),
                i.push(
                  n('span', {
                    class: { 'jv-item': !0, 'jv-array': !0 },
                    domProps: { innerText: ']' }
                  })
                ),
                n('span', i)
              );
            }
          };
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(18),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = {
              name: 'JsonFunction',
              functional: !0,
              props: { jsonValue: { type: Function, required: !0 } },
              render: function (e, t) {
                return e('span', {
                  class: { 'jv-item': !0, 'jv-function': !0 },
                  attrs: { title: t.props.jsonValue.toString() },
                  domProps: { innerHTML: '&lt;function&gt;' }
                });
              }
            });
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(20),
            r = n.n(i);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          t.default = r.a;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = {
              name: 'JsonDate',
              inject: ['timeformat'],
              functional: !0,
              props: { jsonValue: { type: Date, required: !0 } },
              render: function (e, t) {
                var n = t.props,
                  t = t.injections,
                  n = n.jsonValue;
                return e('span', {
                  class: { 'jv-item': !0, 'jv-string': !0 },
                  domProps: { innerText: '"' + (0, t.timeformat)(n) + '"' }
                });
              }
            });
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(3);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          n(38);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/json-box.vue'), (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          function o() {
            var e = this,
              t = e.$createElement;
            return (t = e._self._c || t)(
              'div',
              { ref: 'viewer', class: e.jvClass },
              [
                e.copyable
                  ? t(
                      'div',
                      { class: 'jv-tooltip ' + (e.copyText.align || 'right') },
                      [
                        t(
                          'span',
                          {
                            ref: 'clip',
                            staticClass: 'jv-button',
                            class: { copied: e.copied }
                          },
                          [
                            e._t(
                              'copy',
                              function () {
                                return [
                                  e._v(
                                    '\n        ' +
                                      e._s(
                                        e.copied
                                          ? e.copyText.copiedText
                                          : e.copyText.copyText
                                      ) +
                                      '\n      '
                                  )
                                ];
                              },
                              { copied: e.copied }
                            )
                          ],
                          2
                        )
                      ]
                    )
                  : e._e(),
                e._v(' '),
                t(
                  'div',
                  {
                    staticClass: 'jv-code',
                    class: { open: e.expandCode, boxed: e.boxed }
                  },
                  [
                    t('json-box', {
                      ref: 'jsonBox',
                      attrs: {
                        value: e.value,
                        sort: e.sort,
                        'preview-mode': e.previewMode,
                        'show-array-index': e.showArrayIndex,
                        'show-double-quotes': e.showDoubleQuotes
                      },
                      on: { keyclick: e.onKeyclick }
                    })
                  ],
                  1
                ),
                e._v(' '),
                e.expandableCode && e.boxed
                  ? t(
                      'div',
                      {
                        staticClass: 'jv-more',
                        on: { click: e.toggleExpandCode }
                      },
                      [
                        t('span', {
                          staticClass: 'jv-toggle',
                          class: { open: !!e.expandCode }
                        })
                      ]
                    )
                  : e._e()
              ]
            );
          }
          var i = [];
          (o._withStripped = !0),
            n.d(t, 'a', function () {
              return o;
            }),
            n.d(t, 'b', function () {
              return i;
            });
        },
        function (e, t, n) {
          var o = n(39);
          'string' == typeof o && (o = [[e.i, o, '']]);
          var i = { hmr: !0, transform: void 0 };
          n(25)(o, i);
          o.locals && (e.exports = o.locals);
        },
        function (e, t, n) {
          'use strict';
          e.exports = function (n) {
            var u = [];
            return (
              (u.toString = function () {
                return this.map(function (e) {
                  var t = (function (e, t) {
                    var n = e[1] || '',
                      o = e[3];
                    if (!o) return n;
                    if (t && 'function' == typeof btoa) {
                      (e = (function (e) {
                        (e = btoa(
                          unescape(encodeURIComponent(JSON.stringify(e)))
                        )),
                          (e =
                            'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
                              e
                            ));
                        return '/*# '.concat(e, ' */');
                      })(o)),
                        (t = o.sources.map(function (e) {
                          return '/*# sourceURL='
                            .concat(o.sourceRoot || '')
                            .concat(e, ' */');
                        }));
                      return [n].concat(t).concat([e]).join('\n');
                    }
                    return [n].join('\n');
                  })(e, n);
                  return e[2] ? '@media '.concat(e[2], ' {').concat(t, '}') : t;
                }).join('');
              }),
              (u.i = function (e, t, n) {
                'string' == typeof e && (e = [[null, e, '']]);
                var o = {};
                if (n)
                  for (var i = 0; i < this.length; i++) {
                    var r = this[i][0];
                    null != r && (o[r] = !0);
                  }
                for (var a = 0; a < e.length; a++) {
                  var s = [].concat(e[a]);
                  (n && o[s[0]]) ||
                    (t &&
                      (s[2]
                        ? (s[2] = ''.concat(t, ' and ').concat(s[2]))
                        : (s[2] = t)),
                    u.push(s));
                }
              }),
              u
            );
          };
        },
        function (e, t, n) {
          var o,
            i,
            r,
            u = {},
            l =
              ((o = function () {
                return window && document && document.all && !window.atob;
              }),
              function () {
                return (i = void 0 === i ? o.apply(this, arguments) : i);
              }),
            a =
              ((r = {}),
              function (e) {
                if (void 0 === r[e]) {
                  var t = function (e) {
                    return document.querySelector(e);
                  }.call(this, e);
                  if (t instanceof window.HTMLIFrameElement)
                    try {
                      t = t.contentDocument.head;
                    } catch (e) {
                      t = null;
                    }
                  r[e] = t;
                }
                return r[e];
              }),
            s = null,
            c = 0,
            d = [],
            f = n(40);
          function p(e, t) {
            for (var n = 0; n < e.length; n++) {
              var o = e[n],
                i = u[o.id];
              if (i) {
                i.refs++;
                for (var r = 0; r < i.parts.length; r++) i.parts[r](o.parts[r]);
                for (; r < o.parts.length; r++) i.parts.push(m(o.parts[r], t));
              } else {
                for (var a = [], r = 0; r < o.parts.length; r++)
                  a.push(m(o.parts[r], t));
                u[o.id] = { id: o.id, refs: 1, parts: a };
              }
            }
          }
          function v(e, t) {
            for (var n = [], o = {}, i = 0; i < e.length; i++) {
              var r = e[i],
                a = t.base ? r[0] + t.base : r[0],
                r = { css: r[1], media: r[2], sourceMap: r[3] };
              o[a]
                ? o[a].parts.push(r)
                : n.push((o[a] = { id: a, parts: [r] }));
            }
            return n;
          }
          function h(e, t) {
            var n = a(e.insertInto);
            if (!n)
              throw new Error(
                "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
              );
            var o = d[d.length - 1];
            if ('top' === e.insertAt)
              o
                ? o.nextSibling
                  ? n.insertBefore(t, o.nextSibling)
                  : n.appendChild(t)
                : n.insertBefore(t, n.firstChild),
                d.push(t);
            else if ('bottom' === e.insertAt) n.appendChild(t);
            else {
              if ('object' != typeof e.insertAt || !e.insertAt.before)
                throw new Error(
                  "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
                );
              e = a(e.insertInto + ' ' + e.insertAt.before);
              n.insertBefore(t, e);
            }
          }
          function b(e) {
            null !== e.parentNode &&
              (e.parentNode.removeChild(e),
              0 <= (e = d.indexOf(e)) && d.splice(e, 1));
          }
          function j(e) {
            var t = document.createElement('style');
            return (e.attrs.type = 'text/css'), g(t, e.attrs), h(e, t), t;
          }
          function g(t, n) {
            Object.keys(n).forEach(function (e) {
              t.setAttribute(e, n[e]);
            });
          }
          function m(t, e) {
            var n, o, i, r, a;
            if (e.transform && t.css) {
              if (!(r = e.transform(t.css))) return function () {};
              t.css = r;
            }
            return (
              (i = e.singleton
                ? ((a = c++),
                  (n = s = s || j(e)),
                  (o = w.bind(null, n, a, !1)),
                  w.bind(null, n, a, !0))
                : t.sourceMap &&
                  'function' == typeof URL &&
                  'function' == typeof URL.createObjectURL &&
                  'function' == typeof URL.revokeObjectURL &&
                  'function' == typeof Blob &&
                  'function' == typeof btoa
                ? ((r = e),
                  (a = document.createElement('link')),
                  (r.attrs.type = 'text/css'),
                  (r.attrs.rel = 'stylesheet'),
                  g(a, r.attrs),
                  h(r, a),
                  (n = a),
                  (o = function (e, t, n) {
                    var o = n.css,
                      i = n.sourceMap,
                      n = void 0 === t.convertToAbsoluteUrls && i;
                    (t.convertToAbsoluteUrls || n) && (o = f(o));
                    i &&
                      (o +=
                        '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(i)))) +
                        ' */');
                    (i = new Blob([o], { type: 'text/css' })), (o = e.href);
                    (e.href = URL.createObjectURL(i)),
                      o && URL.revokeObjectURL(o);
                  }.bind(null, n, e)),
                  function () {
                    b(n), n.href && URL.revokeObjectURL(n.href);
                  })
                : ((n = j(e)),
                  (o = function (e, t) {
                    var n = t.css,
                      t = t.media;
                    t && e.setAttribute('media', t);
                    if (e.styleSheet) e.styleSheet.cssText = n;
                    else {
                      for (; e.firstChild; ) e.removeChild(e.firstChild);
                      e.appendChild(document.createTextNode(n));
                    }
                  }.bind(null, n)),
                  function () {
                    b(n);
                  })),
              o(t),
              function (e) {
                e
                  ? (e.css === t.css &&
                      e.media === t.media &&
                      e.sourceMap === t.sourceMap) ||
                    o((t = e))
                  : i();
              }
            );
          }
          e.exports = function (e, a) {
            if (
              'undefined' != typeof DEBUG &&
              DEBUG &&
              'object' != typeof document
            )
              throw new Error(
                'The style-loader cannot be used in a non-browser environment'
              );
            ((a = a || {}).attrs = 'object' == typeof a.attrs ? a.attrs : {}),
              a.singleton ||
                'boolean' == typeof a.singleton ||
                (a.singleton = l()),
              a.insertInto || (a.insertInto = 'head'),
              a.insertAt || (a.insertAt = 'bottom');
            var s = v(e, a);
            return (
              p(s, a),
              function (e) {
                for (var t = [], n = 0; n < s.length; n++) {
                  var o = s[n];
                  (i = u[o.id]).refs--, t.push(i);
                }
                e && p(v(e, a), a);
                for (var i, n = 0; n < t.length; n++)
                  if (0 === (i = t[n]).refs) {
                    for (var r = 0; r < i.parts.length; r++) i.parts[r]();
                    delete u[i.id];
                  }
              }
            );
          };
          var x,
            y =
              ((x = []),
              function (e, t) {
                return (x[e] = t), x.filter(Boolean).join('\n');
              });
          function w(e, t, n, o) {
            var n = n ? '' : o.css;
            e.styleSheet
              ? (e.styleSheet.cssText = y(t, n))
              : ((o = document.createTextNode(n)),
                (n = e.childNodes)[t] && e.removeChild(n[t]),
                n.length ? e.insertBefore(o, n[t]) : e.appendChild(o));
          }
        },
        function (e, t, n) {
          var o = n(44);
          'string' == typeof o && (o = [[e.i, o, '']]);
          var i = { hmr: !0, transform: void 0 };
          n(25)(o, i);
          o.locals && (e.exports = o.locals);
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          var n = n(28),
            o = (n = n) && n.__esModule ? n : { default: n };
          t.default = Object.assign(o.default, {
            install: function (e) {
              e.component('JsonViewer', o.default);
            }
          });
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(22),
            r = n(1);
          for (o in r)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return r[e];
                });
              })(o);
          n(43);
          var a = n(0),
            i = Object(a.a)(r.default, i.a, i.b, !1, null, null, null);
          (i.options.__file = 'lib/json-viewer.vue'), (t.default = i.exports);
        },
        function (e, t) {
          e.exports = n;
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(5);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/types/json-string.vue'),
            (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(7);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/types/json-undefined.vue'),
            (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(9);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/types/json-number.vue'),
            (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(11);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/types/json-boolean.vue'),
            (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(13);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/types/json-object.vue'),
            (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(15);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/types/json-array.vue'),
            (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(17);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/types/json-function.vue'),
            (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          n.r(t);
          var o,
            i = n(19);
          for (o in i)
            'default' !== o &&
              (function (e) {
                n.d(t, e, function () {
                  return i[e];
                });
              })(o);
          var r = n(0),
            r = Object(r.a)(i.default, void 0, void 0, !1, null, null, null);
          (r.options.__file = 'lib/types/json-date.vue'),
            (t.default = r.exports);
        },
        function (e, t, n) {
          'use strict';
          n(23);
        },
        function (e, t, n) {
          (t = n(24)(!1)).push([
            e.i,
            ".jv-node{position:relative}.jv-node:after{content:','}.jv-node:last-of-type:after{content:''}.jv-node.toggle{margin-left:13px !important}.jv-node .jv-node{margin-left:25px}\n",
            ''
          ]),
            (e.exports = t);
        },
        function (e, t) {
          e.exports = function (e) {
            var t = 'undefined' != typeof window && window.location;
            if (!t) throw new Error('fixUrls requires window.location');
            if (!e || 'string' != typeof e) return e;
            var n = t.protocol + '//' + t.host,
              o = n + t.pathname.replace(/\/[^\/]*$/, '/');
            return e.replace(
              /url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
              function (e, t) {
                var t = t
                  .trim()
                  .replace(/^"(.*)"$/, function (e, t) {
                    return t;
                  })
                  .replace(/^'(.*)'$/, function (e, t) {
                    return t;
                  });
                return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(t)
                  ? e
                  : ((t =
                      0 === t.indexOf('//')
                        ? t
                        : 0 === t.indexOf('/')
                        ? n + t
                        : o + t.replace(/^\.\//, '')),
                    'url(' + JSON.stringify(t) + ')');
              }
            );
          };
        },
        function (e, t) {
          e.exports = o;
        },
        function (e, t, n) {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 });
          t.debounce = function (o, i) {
            var r = Date.now(),
              a = void 0;
            return function () {
              for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
              Date.now() - r < i && a && clearTimeout(a),
                (a = setTimeout(function () {
                  o.apply(void 0, t);
                }, i)),
                (r = Date.now());
            };
          };
        },
        function (e, t, n) {
          'use strict';
          n(26);
        },
        function (e, t, n) {
          var o = n(24),
            i = n(45),
            n = n(46);
          t = o(!1);
          n = i(n);
          t.push([
            e.i,
            '.jv-container{box-sizing:border-box;position:relative}.jv-container.boxed{border:1px solid #eee;border-radius:6px}.jv-container.boxed:hover{box-shadow:0 2px 7px rgba(0,0,0,0.15);border-color:transparent;position:relative}.jv-container.jv-light{background:#fff;white-space:nowrap;color:#525252;font-size:14px;font-family:Consolas, Menlo, Courier, monospace}.jv-container.jv-light .jv-ellipsis{color:#999;background-color:#eee;display:inline-block;line-height:0.9;font-size:0.9em;padding:0px 4px 2px 4px;margin:0 4px;border-radius:3px;vertical-align:2px;cursor:pointer;-webkit-user-select:none;user-select:none}.jv-container.jv-light .jv-button{color:#49b3ff}.jv-container.jv-light .jv-key{color:#111111;margin-right:4px}.jv-container.jv-light .jv-item.jv-array{color:#111111}.jv-container.jv-light .jv-item.jv-boolean{color:#fc1e70}.jv-container.jv-light .jv-item.jv-function{color:#067bca}.jv-container.jv-light .jv-item.jv-number{color:#fc1e70}.jv-container.jv-light .jv-item.jv-object{color:#111111}.jv-container.jv-light .jv-item.jv-undefined{color:#e08331}.jv-container.jv-light .jv-item.jv-string{color:#42b983;word-break:break-word;white-space:normal}.jv-container.jv-light .jv-item.jv-string .jv-link{color:#0366d6}.jv-container.jv-light .jv-code .jv-toggle:before{padding:0px 2px;border-radius:2px}.jv-container.jv-light .jv-code .jv-toggle:hover:before{background:#eee}.jv-container .jv-code{overflow:hidden;padding:30px 20px}.jv-container .jv-code.boxed{max-height:300px}.jv-container .jv-code.open{max-height:initial !important;overflow:visible;overflow-x:auto;padding-bottom:45px}.jv-container .jv-toggle{background-image:url(' +
              n +
              ');background-repeat:no-repeat;background-size:contain;background-position:center center;cursor:pointer;width:10px;height:10px;margin-right:2px;display:inline-block;-webkit-transition:-webkit-transform 0.1s;transition:-webkit-transform 0.1s;transition:transform 0.1s;transition:transform 0.1s, -webkit-transform 0.1s}.jv-container .jv-toggle.open{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.jv-container .jv-more{position:absolute;z-index:1;bottom:0;left:0;right:0;height:40px;width:100%;text-align:center;cursor:pointer}.jv-container .jv-more .jv-toggle{position:relative;top:40%;z-index:2;color:#888;-webkit-transition:all 0.1s;transition:all 0.1s;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.jv-container .jv-more .jv-toggle.open{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.jv-container .jv-more:after{content:"";width:100%;height:100%;position:absolute;bottom:0;left:0;z-index:1;background:-webkit-linear-gradient(top, rgba(0,0,0,0) 20%, rgba(230,230,230,0.3) 100%);background:linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(230,230,230,0.3) 100%);-webkit-transition:all 0.1s;transition:all 0.1s}.jv-container .jv-more:hover .jv-toggle{top:50%;color:#111}.jv-container .jv-more:hover:after{background:-webkit-linear-gradient(top, rgba(0,0,0,0) 20%, rgba(230,230,230,0.3) 100%);background:linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(230,230,230,0.3) 100%)}.jv-container .jv-button{position:relative;cursor:pointer;display:inline-block;padding:5px;z-index:5}.jv-container .jv-button.copied{opacity:0.4;cursor:default}.jv-container .jv-tooltip{position:absolute}.jv-container .jv-tooltip.right{right:15px}.jv-container .jv-tooltip.left{left:15px}.jv-container .j-icon{font-size:12px}\n',
            ''
          ]),
            (e.exports = t);
        },
        function (e, t, n) {
          'use strict';
          e.exports = function (e, t) {
            return (
              (t = t || {}),
              'string' != typeof (e = e && e.__esModule ? e.default : e)
                ? e
                : (/^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
                  t.hash && (e += t.hash),
                  /["'() \t\n]/.test(e) || t.needQuotes
                    ? '"'.concat(
                        e.replace(/"/g, '\\"').replace(/\n/g, '\\n'),
                        '"'
                      )
                    : e)
            );
          };
        },
        function (e, t) {
          e.exports =
            'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2IiB3aWR0aD0iOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIAo8cG9seWdvbiBwb2ludHM9IjAsMCA4LDggMCwxNiIKc3R5bGU9ImZpbGw6IzY2NjtzdHJva2U6cHVycGxlO3N0cm9rZS13aWR0aDowIiAvPgo8L3N2Zz4=';
        }
      ]),
    (i.c = a),
    (i.d = function (e, t, n) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (i.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (i.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var o in t)
          i.d(
            n,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return n;
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return i.d(t, 'a', t), t;
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = ''),
    i((i.s = 27))
  );
  function i(e) {
    if (a[e]) return a[e].exports;
    var t = (a[e] = { i: e, l: !1, exports: {} });
    return r[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
  }
  var r, a;
});
