var n = {
  false: "push",
  true: "unshift"
},
e = Object.prototype.hasOwnProperty,
r = function(n, r, t) {
  var i = n,
  u = 2;
  if (t && e.call(r, i)) throw Error("User defined id attribute '" + n + "' is NOT unique. Please fix it in your markdown to continue.");
  for (; e.call(r, i);) i = n + "-" + u++;
  return r[i] = !0,
  i
},
t = function n(e, t) {
  t = Object.assign({},
  n.defaults, t),
  e.core.ruler.push("anchor",
  function(n) {
      var e, i = {},
      u = n.tokens,
      o = Array.isArray(t.level) ? (e = t.level,
      function(n) {
          return e.includes(n)
      }) : function(n) {
          return function(e) {
              return e >= n
          }
      } (t.level);
      u.filter(function(n) {
          return "heading_open" === n.type
      }).filter(function(n) {
          return o(Number(n.tag.substr(1)))
      }).forEach(function(e) {
          var o = u[u.indexOf(e) + 1].children.filter(function(n) {
              return "text" === n.type || "code_inline" === n.type
          }).reduce(function(n, e) {
              return n + e.content
          },
          ""),
          c = e.attrGet("id");
          c = null == c ? r(t.slugify(o), i, !1) : r(c, i, !0),
          e.attrSet("id", c),
          t.permalink && t.renderPermalink(c, t, n, u.indexOf(e)),
          t.callback && t.callback(e, {
              slug: c,
              title: o
          })
      })
  })
};
t.defaults = {
  level: 1,
  slugify: function(n) {
      return String(n).trim().toLowerCase().replace(/\s+/g, "-")
  },
  permalink: !1,
  renderPermalink: function(e, r, t, i) {
      var u, o = [Object.assign(new t.Token("link_open", "a", 1), {
          attrs: [["class", r.permalinkClass], ["href", r.permalinkHref(e, t)]].concat(Object.entries(r.permalinkAttrs(e, t)))
      }), Object.assign(new t.Token("html_block", "", 0), {
          content: r.permalinkSymbol
      }), new t.Token("link_close", "a", -1)];
      r.permalinkSpace && o[n[!r.permalinkBefore]](Object.assign(new t.Token("text", "", 0), {
          content: " "
      })),
      (u = t.tokens[i + 1].children)[n[r.permalinkBefore]].apply(u, o)
  },
  permalinkClass: "header-anchor",
  permalinkSpace: !0,
  permalinkSymbol: "¶",
  permalinkBefore: !1,
  permalinkHref: function(n) {
      return "#" + n
  },
  permalinkAttrs: function(n) {
      return {}
  }
},
module.exports = t;
//# sourceMappingURL=markdownItAnchor.js.map
