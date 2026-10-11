(function () {
  var I = window.I18N;
  var S = null;                 // contenu du site (chargé depuis /content)
  var LANG = "fr";
  var CHOSEN = false;           // la langue a-t-elle déjà été choisie ?
  var CUR = "";                 // page affichée, ex. "/plat/le-gabin"
  var app = document.getElementById("app");
  var moisCourant = new Date().getMonth() + 1;
  var etat = { q: "", type: "", saison: false };
  var observer = null;
  // Repères des Jeux : bleu, jaune, noir, vert, rouge (utilisés avec discrétion)
  var OLY = [{ c: "#0085C7", ink: "#fff" }, { c: "#F4C300", ink: "#1a1a1a" }, { c: "#1a1a1a", ink: "#fff" }, { c: "#009F3D", ink: "#fff" }, { c: "#DF0024", ink: "#fff" }];
  function oly(i) { return OLY[i % 5]; }
  function olyStyle(i) { var o = oly(i); return "--c:" + o.c + ";--on:" + o.ink; }

  /* ---------- Petits outils ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function slug(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function lget(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function langInfo(code) { return I.langs.filter(function (l) { return l.code === code; })[0]; }
  function two(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Traduction ---------- */
  function t(key, vars) {
    var s = (I.ui[LANG] && I.ui[LANG][key]) || I.ui.fr[key] || "";
    if (vars) for (var k in vars) s = s.replace("{" + k + "}", vars[k]);
    return s;
  }
  // Champ d'un plat/légume dans la langue choisie, sinon en français
  function tr(obj, field) {
    if (LANG !== "fr" && obj.traductions && obj.traductions[LANG]) {
      var v = obj.traductions[LANG][field];
      if (Array.isArray(v) ? v.length : v) return v;
    }
    return obj[field];
  }
  function trCat(c) { return (LANG !== "fr" && I.cat[LANG] && I.cat[LANG][c]) || c; }
  function monthName(m, style) {
    try { return new Intl.DateTimeFormat(langInfo(LANG).locale, { month: style }).format(new Date(2026, m - 1, 1)); }
    catch (e) { return String(m); }
  }
  function setLang(code) {
    if (!langInfo(code)) code = "fr";
    LANG = code;
    document.documentElement.lang = code;
    document.documentElement.dir = langInfo(code).dir;
    lset("buffet-lang", code);
    CHOSEN = true;
  }

  /* ---------- Icônes ---------- */
  var APPLE_PATHS =
    '<path d="M 16.804 19.203 C 18.935 18.243 20.563 17.987 21.783 18.123 C 22.969 18.256 23.87 18.768 24.583 19.567 C 26.093 21.258 26.823 24.326 26.823 27.867 C 26.823 34.875 21.141 40.556 14.133 40.556 C 7.125 40.556 1.444 34.875 1.444 27.867 C 1.444 24.484 2.451 21.415 4.145 19.671 C 4.969 18.823 5.95 18.289 7.098 18.135 C 8.256 17.98 9.707 18.198 11.478 19.07 C 13.116 19.876 15.08 19.98 16.804 19.203 Z" fill="none" stroke="currentColor" stroke-width="2.89" stroke-miterlimit="10"/>' +
    '<path d="M 11.249 24.697 C 12.811 26.258 15.342 26.258 16.903 24.697" fill="none" stroke="currentColor" stroke-width="1.82" stroke-linecap="round"/>' +
    '<path d="M 27.298 0.002 C 28.076 -0.049 28.644 0.725 28.361 1.451 L 27.038 4.852 C 26.917 5.161 26.659 5.397 26.34 5.489 L 20.152 7.268 C 20.68 11.027 19.928 14.313 18.802 16.264 L 18.781 16.301 L 18.758 16.336 L 16.041 20.457 C 15.609 21.112 14.728 21.292 14.074 20.861 C 13.419 20.429 13.238 19.549 13.67 18.894 L 16.361 14.812 C 17.207 13.321 17.924 10.277 17.162 6.646 C 17.073 6.22 16.893 5.786 16.636 5.341 C 16.244 4.662 16.477 3.794 17.156 3.402 C 17.835 3.01 18.703 3.242 19.095 3.922 C 19.352 4.366 19.583 4.852 19.756 5.377 L 22.84 0.719 C 23.023 0.442 23.326 0.266 23.657 0.244 Z" fill="currentColor"/>';
  function logo(h) { return '<svg class="apple" viewBox="-1 -1 31 43" height="' + h + '" aria-hidden="true">' + APPLE_PATHS + "</svg>"; }
  var MEDAL =
    '<svg class="medal" viewBox="0 0 200 270" aria-hidden="true">' +
    '<defs><radialGradient id="mg" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#f7d57a"/><stop offset="1" stop-color="#d89a1f"/></radialGradient></defs>' +
    '<path d="M50 0 H96 L124 104 H80 Z" fill="#c0432a"/><path d="M150 0 H104 L76 104 H120 Z" fill="#770523"/>' +
    '<circle cx="100" cy="176" r="86" fill="url(#mg)"/><circle cx="100" cy="176" r="74" fill="none" stroke="#b9780f" stroke-width="3" opacity=".6"/>' +
    '<circle cx="100" cy="176" r="66" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="2 6" opacity=".7"/>' +
    '<g transform="translate(60 118) scale(2.7)" color="#770523">' + APPLE_PATHS + "</g></svg>";
  var ARROW = '<svg class="chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.documentElement.style.setProperty("--apple",
    'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 31 43" color="#770523">' + APPLE_PATHS.replace(/currentColor/g, "#770523") + "</svg>") + '")');

  /* ---------- Drapeaux (petits SVG simplifiés, sans emoji : ils s'affichent partout) ---------- */
  function star(cx, cy, r, a) {
    var p = [], i, ang;
    for (i = 0; i < 5; i++) { ang = a + i * 4 * Math.PI / 5; p.push((cx + r * Math.cos(ang)).toFixed(2) + "," + (cy + r * Math.sin(ang)).toFixed(2)); }
    return '<polygon points="' + p.join(" ") + '" fill="#FFDE00"/>';
  }
  var cn = '<rect width="30" height="20" fill="#DE2910"/>' + star(5, 5, 3, -Math.PI / 2);
  [[10, 2], [12, 4], [12, 7], [10, 9]].forEach(function (c) { cn += star(c[0], c[1], 1, Math.atan2(5 - c[1], 5 - c[0])); });
  var FLAG_SVG = {
    fr: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/></svg>',
    es: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/></svg>',
    cn: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">' + cn + "</svg>",
    ae: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect x="7.5" width="22.5" height="6.67" fill="#00732F"/><rect x="7.5" y="13.33" width="22.5" height="6.67" fill="#000"/><rect width="7.5" height="20" fill="#EF3340"/></svg>',
    gb: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" preserveAspectRatio="none"><clipPath id="a"><path d="M0 0h60v30H0z"/></clipPath><clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#a)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#b)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>'
  };
  function flagImg(code) {
    var svg = FLAG_SVG[code];
    return svg ? '<img class="flag" alt="" width="22" height="15" src="data:image/svg+xml,' + encodeURIComponent(svg) + '">' : "";
  }
  var CHECK = '<svg class="check" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CARET = '<svg class="caret" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  (function () {   // motif très léger : la pomme répétée dans les 5 couleurs
    function apple(x, y, col) { return '<g transform="translate(' + x + " " + y + ') scale(.62)">' + APPLE_PATHS.replace(/currentColor/g, col) + "</g>"; }
    var g = "", i;
    for (i = 0; i < 5; i++) g += apple(10 + 40 * i, 12, oly(i).c);
    for (i = 0; i < 4; i++) g += apple(30 + 40 * i, 72, oly(i + 2).c);
    g += apple(190, 72, oly(1).c) + apple(-10, 72, oly(1).c);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">' + g + "</svg>";
    document.documentElement.style.setProperty("--pattern", 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")');
  })();

  function thumb(img, alt, extra, cls) {
    return '<span class="thumb ' + (cls || "") + (img ? "" : " empty") + '">' +
      (img ? '<img src="' + esc(img) + '" alt="' + esc(alt) + '" loading="lazy">' : "") + (extra || "") + "</span>";
  }
  function tagHtml(txt, season) { return txt ? '<span class="tag' + (season ? " season" : "") + '"><span>' + esc(txt) + "</span></span>" : ""; }

  /* ---------- Structure commune ---------- */
  function header(route) {
    var cur = langInfo(LANG);
    var langs = '<div class="langdd">' +
      '<button type="button" class="lang-trigger" aria-haspopup="menu" aria-expanded="false" aria-label="' + esc(t("change_lang")) + " : " + esc(cur.name) + '">' +
      flagImg(cur.flag) + '<span class="lang-cur" lang="' + cur.code + '">' + esc(cur.short) + "</span>" + CARET + "</button>" +
      '<ul class="lang-menu" role="menu" aria-label="' + esc(t("change_lang")) + '" hidden>' +
      I.langs.map(function (l) {
        var on = l.code === LANG;
        return '<li role="none"><button type="button" role="menuitemradio" class="lang-opt' + (on ? " on" : "") + '" data-lang="' + l.code + '" lang="' + l.code + '" aria-checked="' + on + '" tabindex="-1">' +
          flagImg(l.flag) + '<span class="lang-name">' + esc(l.name) + "</span>" + (on ? CHECK : "") + "</button></li>";
      }).join("") + "</ul></div>";
    return '<header class="top' + (window.pageYOffset > 4 ? " scrolled" : "") + '"><div class="top-in">' +
      '<a class="logo" href="#/" aria-label="' + esc(S.nom) + '">' + logo(34) + "</a>" +
      '<a class="brand" href="#/">' + esc(S.nom) + "</a>" +
      '<div class="langs">' + langs + "</div></div></header>";
  }
  function footer() {
    return '<footer class="foot"><div class="foot-pattern"></div><p class="enjoy">' + esc(t("enjoy")) + '</p><div class="foot-track"></div></footer>';
  }
  /* En-tête collant : verre dépoli dès qu'on défile, et sa hauteur est mesurée pour décaler les barres collantes */
  var segPrev = null, focusSeg = false, hdObs = null;
  function onScroll() {
    var hd = document.querySelector(".top");
    if (hd) hd.classList.toggle("scrolled", window.pageYOffset > 4);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  function setHdr() {
    var hd = document.querySelector(".top");
    document.documentElement.style.setProperty("--hdr", (hd ? hd.offsetHeight : 0) + "px");
  }
  function watchHeader() {
    setHdr();
    var hd = document.querySelector(".top");
    if (hdObs) { hdObs.disconnect(); hdObs = null; }
    if (hd && window.ResizeObserver) { hdObs = new ResizeObserver(setHdr); hdObs.observe(hd); }
  }

  /* Contrôle segmenté « Menu du jour | Légumes disponibles aujourd'hui » : la pastille glisse d'un segment à l'autre */
  function segmented(cur) {
    var from = segPrev == null ? cur : segPrev;
    return '<nav class="seg" data-i="' + from + '" data-cur="' + cur + '" aria-label="' + esc(t("nav_label")) + '">' +
      '<span class="seg-thumb" aria-hidden="true"></span>' +
      '<a class="seg-item' + (cur === 0 ? " on" : "") + '" href="#/" style="' + olyStyle(0) + '"' + (cur === 0 ? ' aria-current="page"' : "") + ">" + esc(t("seg_menu")) + "</a>" +
      '<a class="seg-item' + (cur === 1 ? " on" : "") + '" href="#/legumes" style="' + olyStyle(3) + '"' + (cur === 1 ? ' aria-current="page"' : "") + ">" + esc(t("seg_veg")) + "</a></nav>";
  }
  function settleSeg() {
    var s = document.querySelector(".seg");
    if (!s) return;
    var cur = s.getAttribute("data-cur");
    if (s.getAttribute("data-i") !== cur) {
      void s.offsetWidth;                                  // fixe le point de départ avant d'animer
      requestAnimationFrame(function () { s.setAttribute("data-i", cur); });
    }
    segPrev = +cur;
  }

  function afterRender(scrollTop) {
    if (scrollTop !== false) window.scrollTo(0, 0);
    onScroll(); watchHeader(); settleSeg();
  }

  /* ---------- Page d'accueil : choix de la langue ---------- */
  function viewSplash() {
    document.documentElement.dir = "ltr";
    app.innerHTML =
      '<main class="splash" dir="ltr"><div class="splash-pattern"></div><div class="splash-in">' +
      '<span class="mark">' + logo(40) + "</span><h1>" + esc(S.nom) + "</h1>" +
      '<p class="welcome">' + I.welcome.map(function (w) { return '<span lang="' + w[0] + '">' + esc(w[1]) + "</span>"; }).join('<i aria-hidden="true">·</i>') + "</p>" +
      '<ul class="lanes">' + I.langs.map(function (l, i) {
        return '<li><button class="lane" data-lane="' + l.code + '" lang="' + l.code + '" style="' + olyStyle(i) + '"><span class="dot">' + (i + 1) + "</span>" +
          '<span class="lane-name"' + (l.dir === "rtl" ? ' dir="rtl"' : "") + ">" + esc(l.name) + "</span>" +
          '<svg class="arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></li>';
      }).join("") + "</ul></div></main>";
    document.title = S.nom;
    var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    app.querySelectorAll(".lane").forEach(function (b) {
      b.onclick = function () {
        b.classList.add("go");
        var code = b.getAttribute("data-lane");
        setTimeout(function () { setLang(code); go("/"); }, reduced ? 0 : 320);
      };
    });
    window.scrollTo(0, 0);
  }

  /* ---------- Éléments de liste ---------- */
  function rowPlat(p) {
    return '<li><a class="row" href="#/plat/' + esc(p.id) + '">' + thumb(p.image, p.nom) +
      '<span class="row-main"><span class="row-name">' + esc(p.nom) + "</span>" +
      '<span class="row-ing">' + esc(tr(p, "ingredients")) + "</span></span>" +
      tagHtml(tr(p, "etiquette")) + ARROW + "</a></li>";
  }
  function tile(href, img, alt, tag, season, label, name) {
    return '<li><a class="tile" href="' + href + '">' + thumb(img, alt, tagHtml(tag, season), "big") +
      '<span class="tile-cat">' + esc(label) + '</span><span class="tile-name">' + esc(name) + "</span></a></li>";
  }
  function tilePlat(p) { return tile("#/plat/" + esc(p.id), p.image, p.nom, tr(p, "etiquette"), false, trCat(p.categorie), p.nom); }
  function tileLegume(l) {
    return tile("#/legume/" + esc(l.id), l.image, tr(l, "nom"), l.saisons.indexOf(moisCourant) > -1 ? t("in_season") : "", true, tr(l, "type"), tr(l, "nom"));
  }

  /* ---------- Menu ---------- */
  function viewMenu() {
    var cats = S.categories.filter(function (c) { return S.plats.some(function (p) { return p.categorie === c; }); });
    S.plats.forEach(function (p) { if (cats.indexOf(p.categorie) < 0) cats.push(p.categorie); });
    var count = function (c) { return S.plats.filter(function (p) { return p.categorie === c; }).length; };

    app.innerHTML = header("menu") +
      '<section class="hero"><div class="hero-side">' + MEDAL + '</div><div class="hero-main"><div class="hero-text"><h1><span class="serif">' + esc(t("hero_menu_1")) + '</span><span class="sans">' + esc(t("hero_menu_2")) + "</span></h1>" +
      (tr(S, "intro") ? '<p class="intro">' + esc(tr(S, "intro")) + "</p>" : "") + "</div>" + segmented(0) + "</div></section>" +
      '<div class="layout"><aside class="side"><nav aria-label="' + esc(t("sections")) + '">' +
      cats.map(function (c, i) { return '<button data-go="cat-' + i + '" style="' + olyStyle(i) + '">' + esc(trCat(c)) + "<sup>" + count(c) + "</sup></button>"; }).join("") +
      '</nav></aside><div class="content">' +
      cats.map(function (c, i) {
        var liste = S.plats.filter(function (p) { return p.categorie === c; });
        return '<section class="epreuve" id="cat-' + i + '" style="' + olyStyle(i) + '"><header class="ep-head"><span class="num">' + two(i + 1) + "</span><h2>" + esc(trCat(c)) +
          '</h2><span class="ep-line"></span></header><ul class="rows">' + liste.map(rowPlat).join("") + "</ul></section>";
      }).join("") + "</div></div>" + footer();
    document.title = S.nom;
    afterRender();

    var btns = app.querySelectorAll(".side button");
    btns.forEach(function (b) {
      b.onclick = function () {
        var el = document.getElementById(b.getAttribute("data-go"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    });
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) btns.forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-go") === e.target.id); });
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      app.querySelectorAll(".epreuve").forEach(function (s) { observer.observe(s); });
    }
  }

  /* ---------- Pages de détail (fiche produit / fiche légume) ---------- */
  function pageDetail(o) {
    segPrev = o.route === "menu" ? 0 : 1;                  // pour que la pastille glisse au retour
    app.innerHTML = header(o.route) +
      '<main class="detail"><a class="back" href="' + o.backHref + '">' + esc(o.backLabel) + "</a>" +
      '<h1 class="d-title">' + esc(o.titre) + "</h1>" +
      '<div class="d-grid">' + thumb(o.image, o.titre, "", "d-pic") +
      '<div class="d-info"><div class="pills">' + o.pills.filter(Boolean).map(function (x) { return '<span class="pill">' + esc(x) + "</span>"; }).join("") + "</div>" +
      (o.texte ? '<p class="d-text">' + esc(o.texte) + "</p>" : "") + (o.extra || "") + "</div></div>" +
      (o.autres.length ? '<div class="more-head"><h2>' + esc(t("more")) + '</h2><a href="' + o.backHref + '">' + esc(t("see_all")) + "</a></div>" +
        '<ul class="tiles more">' + o.autres.map(o.tile).join("") + "</ul>" : "") + "</main>" + footer();
    document.title = o.titre + " · " + S.nom;
    afterRender();
  }

  function viewPlat(id) {
    var p = S.plats.filter(function (x) { return x.id === id; })[0];
    if (!p) return viewMenu();
    var liens = (p.legumes || []).map(function (nom) {
      var l = S.legumes.filter(function (x) { return x.id === slug(nom); })[0];
      return l ? '<a class="chip-link" href="#/legume/' + esc(l.id) + '">' + esc(tr(l, "nom")) + "</a>" : "";
    }).join("");
    var extra = "<dl><dt>" + esc(t("ingredients")) + "</dt><dd>" + esc(tr(p, "ingredients")) + "</dd>" +
      (liens ? "<dt>" + esc(t("veg_links")) + '</dt><dd class="links">' + liens + "</dd>" : "") + "</dl>";
    pageDetail({
      route: "menu", backHref: "#/", backLabel: t("back"), titre: p.nom, image: p.image,
      pills: [tr(p, "etiquette")].concat(tr(p, "pastilles") || []), texte: tr(p, "description"), extra: extra,
      autres: S.plats.filter(function (x) { return x.id !== p.id; }).sort(function (a) { return a.categorie === p.categorie ? -1 : 1; }).slice(0, 3), tile: tilePlat
    });
  }

  function viewLegume(id) {
    var l = S.legumes.filter(function (x) { return x.id === id; })[0];
    if (!l) return viewLegumes();
    var cells = "";
    for (var m = 1; m <= 12; m++) {
      cells += '<span class="' + (l.saisons.indexOf(m) > -1 ? "on" : "") + (m === moisCourant ? " now" : "") + '">' + esc(monthName(m, "short")) + "</span>";
    }
    var extra = "<dl><dt>" + esc(t("season")) + '</dt><dd><div class="months">' + cells + "</div></dd>" +
      (tr(l, "conservation") ? "<dt>" + esc(t("storage")) + "</dt><dd>" + esc(tr(l, "conservation")) + "</dd>" : "") +
      (tr(l, "idees") ? "<dt>" + esc(t("ideas")) + "</dt><dd>" + esc(tr(l, "idees")) + "</dd>" : "") + "</dl>";
    pageDetail({
      route: "legumes", backHref: "#/legumes", backLabel: t("back_veg"), titre: tr(l, "nom"), image: l.image,
      pills: [tr(l, "type"), tr(l, "gout")], texte: tr(l, "description"), extra: extra,
      autres: S.legumes.filter(function (x) { return x.id !== l.id; }).sort(function (a) { return a.type === l.type ? -1 : 1; }).slice(0, 3), tile: tileLegume
    });
  }

  /* ---------- Fiches légumes ---------- */
  function viewLegumes() {
    var typesFr = [], labels = {}, nb = {};
    S.legumes.forEach(function (l) {
      if (typesFr.indexOf(l.type) < 0) { typesFr.push(l.type); labels[l.type] = tr(l, "type"); nb[l.type] = 0; }
      nb[l.type]++;
    });
    var liste = S.legumes.filter(function (l) {
      return (!etat.type || l.type === etat.type) &&
        (!etat.saison || l.saisons.indexOf(moisCourant) > -1) &&
        (!etat.q || norm(l.nom + " " + tr(l, "nom") + " " + l.type + " " + tr(l, "type")).indexOf(norm(etat.q)) > -1);
    });
    app.innerHTML = header("legumes") +
      '<section class="hero"><div class="hero-side"></div><div class="hero-main"><div class="hero-text"><h1><span class="serif">' + esc(t("hero_veg_1")) + '</span><span class="sans">' + esc(t("hero_veg_2")) + "</span></h1>" +
      '<p class="intro">' + esc(t("veg_intro")) + "</p></div>" + segmented(1) + "</div></section>" +
      '<div class="layout"><aside class="side"><input class="search" id="q" type="search" placeholder="' + esc(t("search_ph")) + '" value="' + esc(etat.q) + '"><nav>' +
      '<button data-type="" class="' + (!etat.type ? "on" : "") + '">' + esc(t("all")) + "<sup>" + S.legumes.length + "</sup></button>" +
      typesFr.map(function (ty) { return '<button data-type="' + esc(ty) + '" class="' + (etat.type === ty ? "on" : "") + '">' + esc(labels[ty]) + "<sup>" + nb[ty] + "</sup></button>"; }).join("") +
      '<button id="saison" class="season-btn' + (etat.saison ? " on" : "") + '">' + esc(t("season_chip", { m: monthName(moisCourant, "long") })) + "</button></nav></aside>" +
      '<div class="content"><ul class="tiles">' + (liste.length ? liste.map(tileLegume).join("") : '<li class="none">' + esc(t("empty")) + "</li>") + "</ul></div></div>" + footer();
    document.title = t("nav_veg") + " · " + S.nom;
    afterRender(false);
    var q = document.getElementById("q");
    q.oninput = function () {
      etat.q = q.value; var pos = q.selectionStart; viewLegumes();
      var n = document.getElementById("q"); n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) {}
    };
    app.querySelectorAll("[data-type]").forEach(function (b) { b.onclick = function () { etat.type = b.getAttribute("data-type"); viewLegumes(); }; });
    document.getElementById("saison").onclick = function () { etat.saison = !etat.saison; viewLegumes(); };
  }

  /* ---------- Navigation (fonctionne même si l'adresse ne peut pas changer) ---------- */
  function route() {
    var h = CUR.replace(/^\/?/, "").split("/");
    if (observer) { observer.disconnect(); observer = null; }
    if (h[0] === "langue") return viewSplash();
    if (CHOSEN) document.documentElement.dir = langInfo(LANG).dir;
    if (h[0] === "plat") return viewPlat(h[1]);
    if (h[0] === "legumes") return viewLegumes();
    if (h[0] === "legume") return viewLegume(h[1]);
    if (!CHOSEN) return viewSplash();      // première visite : choix de la langue
    viewMenu();
  }
  function go(path) {
    CUR = path;
    try { if (location.hash.replace(/^#/, "") !== path) location.hash = path; } catch (e) {}
    route();
    if (focusSeg) {                                        // navigation au clavier : le focus reste sur le contrôle
      focusSeg = false;
      var el = document.querySelector(".seg-item.on");
      if (el) el.focus();
    }
  }

  /* ---------- Menu déroulant des langues ---------- */
  function langMenu() { return document.querySelector(".lang-menu"); }
  function langOpts() { var m = langMenu(); return m ? Array.prototype.slice.call(m.querySelectorAll(".lang-opt")) : []; }
  function openLangs(focusOpt) {
    var m = langMenu(), tg = document.querySelector(".lang-trigger");
    if (!m || !tg) return;
    m.hidden = false; tg.setAttribute("aria-expanded", "true");
    if (focusOpt) { var o = m.querySelector(".lang-opt.on") || langOpts()[0]; if (o) o.focus(); }
  }
  function closeLangs(refocus) {
    var m = langMenu(), tg = document.querySelector(".lang-trigger");
    if (!m || m.hidden) return;
    m.hidden = true; if (tg) { tg.setAttribute("aria-expanded", "false"); if (refocus) tg.focus(); }
  }
  function pickLang(code) {
    setLang(code);
    route();
    var tg = document.querySelector(".lang-trigger");     // le clavier reste sur le sélecteur
    if (tg && document.activeElement === document.body && KEY) tg.focus();
  }
  var KEY = false;      // la dernière action venait-elle du clavier ?

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (a) {
      e.preventDefault(); closeLangs(false);
      focusSeg = a.classList.contains("seg-item") && e.detail === 0;
      go(a.getAttribute("href").slice(1)); return;
    }
    var opt = e.target.closest && e.target.closest(".lang-opt");
    if (opt) { KEY = e.detail === 0; pickLang(opt.getAttribute("data-lang")); return; }
    var tg = e.target.closest && e.target.closest(".lang-trigger");
    if (tg) { var m = langMenu(); if (m && m.hidden) openLangs(e.detail === 0); else closeLangs(false); return; }
    closeLangs(false);                                     // clic ailleurs : on referme
  });
  document.addEventListener("keydown", function (e) {
    var m = langMenu(); if (!m) return;
    var inDD = e.target.closest && e.target.closest(".langdd");
    if (!inDD) return;
    var opts = langOpts(), i = opts.indexOf(document.activeElement);
    if (e.key === "Escape") { if (!m.hidden) { e.preventDefault(); closeLangs(true); } return; }
    if (e.target.closest(".lang-trigger")) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); openLangs(true); }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); opts[(i + 1) % opts.length].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); opts[(i - 1 + opts.length) % opts.length].focus(); }
    else if (e.key === "Home") { e.preventDefault(); opts[0].focus(); }
    else if (e.key === "End") { e.preventDefault(); opts[opts.length - 1].focus(); }
    else if (e.key === "Tab") { closeLangs(false); }
  });
  window.addEventListener("hashchange", function () {      // boutons précédent / suivant du navigateur
    var p = location.hash.replace(/^#/, "");
    if (p !== CUR) { CUR = p; route(); }
  });

  function demarrer(data) {
    S = data;
    S.plats.forEach(function (p) { p.id = slug(p.nom); p.pastilles = p.pastilles || []; p.legumes = p.legumes || []; });
    S.legumes.forEach(function (l) { l.id = slug(l.nom); l.saisons = (l.saisons || []).map(Number); });

    // Langue : adresse ?lang=en, sinon dernier choix mémorisé dans ce navigateur
    var m = /[?&]lang=(\w+)/.exec(location.search);
    var saved = lget("buffet-lang");
    var start = (m && langInfo(m[1]) && m[1]) || (saved && langInfo(saved) && saved) || "fr";
    LANG = start;
    document.documentElement.lang = start;
    document.documentElement.dir = langInfo(start).dir;
    CHOSEN = !!((m && langInfo(m[1])) || (saved && langInfo(saved)));
    if (m && langInfo(m[1])) lset("buffet-lang", m[1]);

    try { CUR = location.hash.replace(/^#/, ""); } catch (e) { CUR = ""; }
    route();
  }

  function charger() {
    var get = function (f) { return fetch(f, { cache: "no-cache" }).then(function (r) { return r.json(); }); };
    Promise.all([get("content/site.json"), get("content/plats.json"), get("content/legumes.json")]).then(function (r) {
      demarrer({ nom: r[0].nom, intro: r[0].intro, categories: r[0].categories || [], traductions: r[0].traductions, plats: r[1].plats, legumes: r[2].legumes });
    }).catch(function () {
      app.innerHTML = '<p style="padding:40px;font-family:sans-serif">Le contenu n\'a pas pu être chargé. Ouvrez le site depuis son adresse en ligne.</p>';
    });
  }
  charger();
})();
