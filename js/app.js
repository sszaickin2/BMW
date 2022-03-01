(() => {
  "use strict";
  const t = {};
  function e() {
    if (location.hash) return location.hash.replace("#", "");
  }
  let a = (t, e = 500, a = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = a ? `${a}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !a),
            !a && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !a && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: t } })
            );
        }, e));
    },
    o = (t, e = 500, a = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          a && t.style.removeProperty("height");
        let o = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = a ? `${a}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = o + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: t } })
              );
          }, e);
      }
    },
    i = !0,
    s = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let a = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < a.length; t++) {
            a[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    };
  function n(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function r(t, e) {
    const a = Array.from(t).filter(function (t, a, o) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (a.length) {
      const t = [];
      a.forEach((a) => {
        const o = {},
          i = a.dataset[e].split(",");
        (o.value = i[0]),
          (o.type = i[1] ? i[1].trim() : "max"),
          (o.item = a),
          t.push(o);
      });
      let o = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      o = (function (t) {
        return t.filter(function (t, e, a) {
          return a.indexOf(t) === e;
        });
      })(o);
      const i = [];
      if (o.length)
        return (
          o.forEach((e) => {
            const a = e.split(","),
              o = a[1],
              s = a[2],
              n = window.matchMedia(a[0]),
              r = t.filter(function (t) {
                if (t.value === o && t.type === s) return !0;
              });
            i.push({ itemsArray: r, matchMedia: n });
          }),
          i
        );
    }
  }
  t.mousePrlx = new (class {
    constructor(t, e = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, t)),
        this.config.init)
      ) {
        const t = document.querySelectorAll("[data-prlx-mouse]");
        t.length
          ? (this.paralaxMouseInit(t),
            this.setLogging(`Проснулся, слежу за объектами: (${t.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(t) {
      t.forEach((t) => {
        const e = t.closest("[data-prlx-mouse-wrapper]"),
          a = t.dataset.prlxCx ? +t.dataset.prlxCx : 100,
          o = t.dataset.prlxCy ? +t.dataset.prlxCy : 100,
          i = t.hasAttribute("data-prlx-dxr") ? -1 : 1,
          s = t.hasAttribute("data-prlx-dyr") ? -1 : 1,
          n = t.dataset.prlxA ? +t.dataset.prlxA : 50;
        let r = 0,
          l = 0,
          c = 0,
          d = 0;
        function p(e = window) {
          e.addEventListener("mousemove", function (e) {
            const a = t.getBoundingClientRect().top + window.scrollY;
            if (a >= window.scrollY || a + t.offsetHeight >= window.scrollY) {
              const t = window.innerWidth,
                a = window.innerHeight,
                o = e.clientX - t / 2,
                i = e.clientY - a / 2;
              (c = (o / t) * 100), (d = (i / a) * 100);
            }
          });
        }
        !(function e() {
          (r += ((c - r) * n) / 1e3),
            (l += ((d - l) * n) / 1e3),
            (t.style.cssText = `transform: translate3D(${(i * r) / (a / 10)}%,${
              (s * l) / (o / 10)
            }%,0);`),
            requestAnimationFrame(e);
        })(),
          e ? p(e) : p();
      });
    }
    setLogging(t) {
      this.config.logging && n(`[PRLX Mouse]: ${t}`);
    }
  })({});
  let l = (t, e = !1, a = 500, o = 0) => {
    const i = document.querySelector(t);
    if (i) {
      let r = "",
        l = 0;
      e &&
        ((r = "header.header"), (l = document.querySelector(r).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: a,
        header: r,
        offset: o,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (s(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(i, "", c);
      else {
        let t = i.getBoundingClientRect().top + scrollY;
        (t = l ? t - l : t),
          (t = o ? t - o : t),
          window.scrollTo({ top: t, behavior: "smooth" });
      }
      n(`[gotoBlock]: Юхуу...едем к ${t}`);
    } else n(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
  };
  let c = !1;
  function d(t) {
    this.type = t;
  }
  setTimeout(() => {
    if (c) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (d.prototype.init = function () {
      const t = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let t = 0; t < this.nodes.length; t++) {
        const e = this.nodes[t],
          a = e.dataset.da.trim().split(","),
          o = {};
        (o.element = e),
          (o.parent = e.parentNode),
          (o.destination = document.querySelector(a[0].trim())),
          (o.breakpoint = a[1] ? a[1].trim() : "767"),
          (o.place = a[2] ? a[2].trim() : "last"),
          (o.index = this.indexInParent(o.parent, o.element)),
          this.оbjects.push(o);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (t) {
            return (
              "(" +
              this.type +
              "-width: " +
              t.breakpoint +
              "px)," +
              t.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (t, e, a) {
            return Array.prototype.indexOf.call(a, t) === e;
          }
        ));
      for (let e = 0; e < this.mediaQueries.length; e++) {
        const a = this.mediaQueries[e],
          o = String.prototype.split.call(a, ","),
          i = window.matchMedia(o[0]),
          s = o[1],
          n = Array.prototype.filter.call(this.оbjects, function (t) {
            return t.breakpoint === s;
          });
        i.addListener(function () {
          t.mediaHandler(i, n);
        }),
          this.mediaHandler(i, n);
      }
    }),
    (d.prototype.mediaHandler = function (t, e) {
      if (t.matches)
        for (let t = 0; t < e.length; t++) {
          const a = e[t];
          (a.index = this.indexInParent(a.parent, a.element)),
            this.moveTo(a.place, a.element, a.destination);
        }
      else
        for (let t = e.length - 1; t >= 0; t--) {
          const a = e[t];
          a.element.classList.contains(this.daClassname) &&
            this.moveBack(a.parent, a.element, a.index);
        }
    }),
    (d.prototype.moveTo = function (t, e, a) {
      e.classList.add(this.daClassname),
        "last" === t || t >= a.children.length
          ? a.insertAdjacentElement("beforeend", e)
          : "first" !== t
          ? a.children[t].insertAdjacentElement("beforebegin", e)
          : a.insertAdjacentElement("afterbegin", e);
    }),
    (d.prototype.moveBack = function (t, e, a) {
      e.classList.remove(this.daClassname),
        void 0 !== t.children[a]
          ? t.children[a].insertAdjacentElement("beforebegin", e)
          : t.insertAdjacentElement("beforeend", e);
    }),
    (d.prototype.indexInParent = function (t, e) {
      const a = Array.prototype.slice.call(t.children);
      return Array.prototype.indexOf.call(a, e);
    }),
    (d.prototype.arraySort = function (t) {
      "min" === this.type
        ? Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? -1
                : "last" === t.place || "first" === e.place
                ? 1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          })
        : Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? 1
                : "last" === t.place || "first" === e.place
                ? -1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          });
    });
  new d("max").init(),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    (function () {
      const t = document.querySelectorAll("[data-tabs]");
      let i = [];
      if (t.length > 0) {
        const a = e();
        a && a.startsWith("tab-") && (i = a.replace("tab-", "").split("-")),
          t.forEach((t, e) => {
            t.classList.add("_tab-init"),
              t.setAttribute("data-tabs-index", e),
              t.addEventListener("click", l),
              (function (t) {
                let e = t.querySelectorAll("[data-tabs-titles]>*"),
                  a = t.querySelectorAll("[data-tabs-body]>*");
                const o = t.dataset.tabsIndex,
                  s = i[0] == o;
                if (s) {
                  const e = t.querySelector("[data-tabs-titles]>._tab-active");
                  e && e.classList.remove("_tab-active");
                }
                a.length &&
                  ((a = Array.from(a).filter(
                    (e) => e.closest("[data-tabs]") === t
                  )),
                  (e = Array.from(e).filter(
                    (e) => e.closest("[data-tabs]") === t
                  )),
                  a.forEach((t, a) => {
                    e[a].setAttribute("data-tabs-title", ""),
                      t.setAttribute("data-tabs-item", ""),
                      s && a == i[1] && e[a].classList.add("_tab-active"),
                      (t.hidden = !e[a].classList.contains("_tab-active"));
                  }));
              })(t);
          });
        let o = r(t, "tabs");
        o &&
          o.length &&
          o.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              s(t.itemsArray, t.matchMedia);
            }),
              s(t.itemsArray, t.matchMedia);
          });
      }
      function s(t, e) {
        t.forEach((t) => {
          let a = (t = t.item).querySelector("[data-tabs-titles]"),
            o = t.querySelectorAll("[data-tabs-title]"),
            i = t.querySelector("[data-tabs-body]"),
            s = t.querySelectorAll("[data-tabs-item]");
          (o = Array.from(o).filter((e) => e.closest("[data-tabs]") === t)),
            (s = Array.from(s).filter((e) => e.closest("[data-tabs]") === t)),
            s.forEach((s, n) => {
              e.matches
                ? (i.append(o[n]), i.append(s), t.classList.add("_tab-spoller"))
                : (a.append(o[n]), t.classList.remove("_tab-spoller"));
            });
        });
      }
      function n(t) {
        let e = t.querySelectorAll("[data-tabs-title]"),
          i = t.querySelectorAll("[data-tabs-item]");
        const s = t.dataset.tabsIndex;
        const n = (function (t) {
          if (t.hasAttribute("data-tabs-animate"))
            return t.dataset.tabsAnimate > 0
              ? Number(t.dataset.tabsAnimate)
              : 500;
        })(t);
        if (i.length > 0) {
          const r = t.hasAttribute("data-tabs-hash");
          (i = Array.from(i).filter((e) => e.closest("[data-tabs]") === t)),
            (e = Array.from(e).filter((e) => e.closest("[data-tabs]") === t)),
            i.forEach((t, i) => {
              var l;
              e[i].classList.contains("_tab-active")
                ? (n ? o(t, n) : (t.hidden = !1),
                  r &&
                    !t.closest(".popup") &&
                    ((l = (l = `tab-${s}-${i}`)
                      ? `#${l}`
                      : window.location.href.split("#")[0]),
                    history.pushState("", "", l)))
                : n
                ? a(t, n)
                : (t.hidden = !0);
            });
        }
      }
      function l(t) {
        const e = t.target;
        if (e.closest("[data-tabs-title]")) {
          const a = e.closest("[data-tabs-title]"),
            o = a.closest("[data-tabs]");
          if (
            !a.classList.contains("_tab-active") &&
            !o.querySelector("._slide")
          ) {
            let t = o.querySelectorAll("[data-tabs-title]._tab-active");
            t.length &&
              (t = Array.from(t).filter((t) => t.closest("[data-tabs]") === o)),
              t.length && t[0].classList.remove("_tab-active"),
              a.classList.add("_tab-active"),
              n(o);
          }
          t.preventDefault();
        }
      }
    })(),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const a = e.closest("[data-goto]"),
              o = a.dataset.goto ? a.dataset.goto : "",
              i = !!a.hasAttribute("data-goto-header"),
              s = a.dataset.gotoSpeed ? a.dataset.gotoSpeed : 500,
              n = a.dataset.gotoTop ? parseInt(a.dataset.gotoTop) : 0;
            l(o, i, s, n), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            a = e.target;
          if ("navigator" === a.dataset.watch) {
            document.querySelector("[data-goto]._navigator-active");
            let t;
            if (a.id && document.querySelector(`[data-goto="#${a.id}"]`))
              t = document.querySelector(`[data-goto="#${a.id}"]`);
            else if (a.classList.length)
              for (let e = 0; e < a.classList.length; e++) {
                const o = a.classList[e];
                if (document.querySelector(`[data-goto=".${o}"]`)) {
                  t = document.querySelector(`[data-goto=".${o}"]`);
                  break;
                }
              }
            e.isIntersecting
              ? t && t.classList.add("_navigator-active")
              : t && t.classList.remove("_navigator-active");
          }
        }
      }
      if (
        (document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t),
        e())
      ) {
        let t;
        document.querySelector(`#${e()}`)
          ? (t = `#${e()}`)
          : document.querySelector(`.${e()}`) && (t = `.${e()}`),
          t && l(t, !0, 500, 20);
      }
    })();
})();
