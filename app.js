(function () {
  var S = null;
  var MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  var LOGO = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="42" viewBox="0 0 28 42" fill="none">' +
    '<path d="M 16.804 19.203 C 18.935 18.243 20.563 17.987 21.783 18.123 C 22.969 18.256 23.87 18.768 24.583 19.567 C 26.093 21.258 26.823 24.326 26.823 27.867 C 26.823 34.875 21.141 40.556 14.133 40.556 C 7.125 40.556 1.444 34.875 1.444 27.867 C 1.444 24.484 2.451 21.415 4.145 19.671 C 4.969 18.823 5.95 18.289 7.098 18.135 C 8.256 17.98 9.707 18.198 11.478 19.07 C 13.116 19.876 15.08 19.98 16.804 19.203 Z" stroke-width="2.89" stroke="rgb(119,5,35)" stroke-miterlimit="10"/>' +
    '<path d="M 11.249 24.697 C 12.811 26.258 15.342 26.258 16.903 24.697" stroke-width="1.82" stroke="rgb(119,5,35)" stroke-linecap="round" stroke-miterlimit="10"/>' +
    '<path d="M 27.298 0.002 C 28.076 -0.049 28.644 0.725 28.361 1.451 L 27.038 4.852 C 26.917 5.161 26.659 5.397 26.34 5.489 L 20.152 7.268 C 20.68 11.027 19.928 14.313 18.802 16.264 L 18.781 16.301 L 18.758 16.336 L 16.041 20.457 C 15.609 21.112 14.728 21.292 14.074 20.861 C 13.419 20.429 13.238 19.549 13.67 18.894 L 16.361 14.812 C 17.207 13.321 17.924 10.277 17.162 6.646 C 17.073 6.22 16.893 5.786 16.636 5.341 C 16.244 4.662 16.477 3.794 17.156 3.402 C 17.835 3.01 18.703 3.242 19.095 3.922 C 19.352 4.366 19.583 4.852 19.756 5.377 L 22.84 0.719 C 23.023 0.442 23.326 0.266 23.657 0.244 Z" fill="rgb(119,5,35)"/></svg>';

  // Motif de pommes (même pomme que le logo, en rose clair)
  var tile = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="-6 -4 40 60"><g fill="none" opacity="0.2">' +
    LOGO.replace(/^<svg[^>]*>/, "").replace("</svg>", "").replace(/rgb\(119,5,35\)/g, "#770523") + "</g></svg>";
  document.documentElement.style.setProperty("--pattern", 'url("data:image/svg+xml,' + encodeURIComponent(tile) + '")');

  var app = document.getElementById("app");
  var moisCourant = new Date().getMonth() + 1;
  var etat = { cat: "Tout", q: "", type: "Tous", saison: false };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function slug(s) { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function pic(img, alt, extra) {
    return '<div class="pic' + (img ? "" : " empty") + '">' +
      (img ? '<img src="' + esc(img) + '" alt="' + esc(alt) + '" loading="lazy">' : "") + (extra || "") + "</div>";
  }

  function header(route) {
    return '<header class="top"><a class="logo" href="#/" aria-label="Accueil">' + LOGO + "</a>" +
      '<div class="name">' + esc(S.nom) + "</div>" +
      '<nav><a href="#/" class="' + (route === "menu" ? "on" : "") + '">Menu</a>' +
      '<a href="#/legumes" class="' + (route === "legumes" ? "on" : "") + '">Légumes</a></nav></header>';
  }
  function footer() { return '<footer class="foot"><p>Bon appétit !</p></footer>'; }

  /* ---------- Menu ---------- */
  function viewMenu() {
    var cats = ["Tout"].concat(S.categories);
    var count = function (c) { return S.plats.filter(function (p) { return c === "Tout" || p.categorie === c; }).length; };
    var liste = S.plats.filter(function (p) { return etat.cat === "Tout" || p.categorie === etat.cat; });
    app.innerHTML = header("menu") +
      '<section class="hero"><h1><span class="serif">Au menu</span><span class="sans">actuellement</span></h1><p>' + esc(S.intro) + "</p></section>" +
      '<section class="layout"><div class="filters">' +
      cats.map(function (c) {
        return '<button data-cat="' + esc(c) + '" class="' + (c === etat.cat ? "on" : "") + '">' + esc(c) + "<sup>" + count(c) + "</sup></button>";
      }).join("") + "</div>" +
      '<div class="grid">' + (liste.length ? liste.map(function (p) {
        return '<a class="card" href="#/plat/' + esc(p.id) + '">' +
          pic(p.image, p.nom, p.etiquette ? '<span class="tag">' + esc(p.etiquette) + "</span>" : "") +
          '<div class="cat">' + esc(p.categorie) + "</div><h3>" + esc(p.nom) + "</h3></a>";
      }).join("") : '<p class="empty-msg">Rien pour le moment dans cette catégorie.</p>') + "</div></section>" + footer();
    app.querySelectorAll("[data-cat]").forEach(function (b) {
      b.onclick = function () { etat.cat = b.getAttribute("data-cat"); viewMenu(); };
    });
  }

  function autres(liste, courant, n) {
    return liste.filter(function (x) { return x.id !== courant; }).slice(0, n);
  }

  function pageDetail(o) {
    app.innerHTML = header(o.route) +
      '<section class="detail">' +
      '<a class="btn-back" href="' + o.backHref + '">Retour</a>' +
      "<h2>" + esc(o.titre) + "</h2>" +
      '<div class="detail-body">' + pic(o.image, o.titre, o.tag ? '<span class="tag">' + esc(o.tag) + "</span>" : "") +
      '<aside><div class="pills">' + o.pills.map(function (t) { return '<span class="pill">' + esc(t) + "</span>"; }).join("") + "</div>" +
      (o.texte ? '<p class="texte">' + esc(o.texte) + "</p>" : "") + (o.extra || "") + "</aside></div>" +
      '<div class="more-head"><h3>Mais aussi…</h3><a href="' + o.backHref + '">Voir tout</a></div>' +
      '<div class="more">' + o.autres.map(o.carte).join("") + "</div></section>" + footer();
    window.scrollTo(0, 0);
  }
  function cartePlat(p) {
    return '<a class="card" href="#/plat/' + esc(p.id) + '">' +
      pic(p.image, p.nom, p.etiquette ? '<span class="tag">' + esc(p.etiquette) + "</span>" : "") +
      '<div class="cat">' + esc(p.categorie) + "</div><h3>" + esc(p.nom) + "</h3></a>";
  }
  function carteLegume(l) {
    return '<a class="card" href="#/legume/' + esc(l.id) + '">' + pic(l.image, l.nom,
      l.saisons.indexOf(moisCourant) > -1 ? '<span class="tag">De saison</span>' : "") +
      '<div class="cat">' + esc(l.type) + "</div><h3>" + esc(l.nom) + "</h3></a>";
  }

  function viewPlat(id) {
    var p = S.plats.filter(function (x) { return x.id === id; })[0];
    if (!p) return viewMenu();
    var liens = (p.legumes || []).map(function (lid) {
      var l = S.legumes.filter(function (x) { return x.id === slug(lid); })[0];
      return l ? '<a href="#/legume/' + esc(l.id) + '">' + esc(l.nom) + "</a>" : "";
    }).join("");
    var extra = '<dl><dt>Ingrédients</dt><dd>' + esc(p.ingredients) + "</dd>" +
      (liens ? '<dt>Fiches légumes</dt><dd class="links">' + liens + "</dd>" : "") + "</dl>";
    pageDetail({ route: "menu", backHref: "#/", titre: p.nom, image: p.image, tag: p.etiquette,
      pills: p.pastilles || [], texte: p.description, extra: extra,
      autres: autres(S.plats, p.id, 2), carte: cartePlat });
  }

  /* ---------- Légumes ---------- */
  function viewLegumes() {
    var types = ["Tous"].concat(S.legumes.map(function (l) { return l.type; }).filter(function (t, i, a) { return a.indexOf(t) === i; }));
    var liste = S.legumes.filter(function (l) {
      return (etat.type === "Tous" || l.type === etat.type) &&
        (!etat.saison || l.saisons.indexOf(moisCourant) > -1) &&
        (!etat.q || norm(l.nom + " " + l.type).indexOf(norm(etat.q)) > -1);
    });
    app.innerHTML = header("legumes") +
      '<section class="hero"><h1><span class="serif">Fiches</span><span class="sans">légumes</span></h1><p>Tout savoir sur les légumes du buffet : saison, goût, conservation, idées.</p></section>' +
      '<section class="layout"><div><input class="search" id="q" type="search" placeholder="Rechercher un légume" value="' + esc(etat.q) + '">' +
      '<div class="filters">' + types.map(function (t) {
        return '<button data-type="' + esc(t) + '" class="' + (t === etat.type ? "on" : "") + '">' + esc(t) + "</button>";
      }).join("") + '</div><div class="chips"><button class="chip' + (etat.saison ? " on" : "") + '" id="saison">De saison en ' + MOIS[moisCourant - 1] + "</button></div></div>" +
      '<div class="grid">' + (liste.length ? liste.map(function (l) {
        return '<a class="card" href="#/legume/' + esc(l.id) + '">' + pic(l.image, l.nom,
          l.saisons.indexOf(moisCourant) > -1 ? '<span class="tag">De saison</span>' : "") +
          '<div class="cat">' + esc(l.type) + "</div><h3>" + esc(l.nom) + "</h3></a>";
      }).join("") : '<p class="empty-msg">Aucun légume ne correspond.</p>') + "</div></section>" + footer();
    var q = document.getElementById("q");
    q.oninput = function () { etat.q = q.value; var pos = q.selectionStart; viewLegumes(); var n = document.getElementById("q"); n.focus(); n.setSelectionRange(pos, pos); };
    app.querySelectorAll("[data-type]").forEach(function (b) { b.onclick = function () { etat.type = b.getAttribute("data-type"); viewLegumes(); }; });
    document.getElementById("saison").onclick = function () { etat.saison = !etat.saison; viewLegumes(); };
  }

  function viewLegume(id) {
    var l = S.legumes.filter(function (x) { return x.id === id; })[0];
    if (!l) return viewLegumes();
    var extra = "<dl><dt>Saison</dt><dd><div class=\"months\">" + MOIS.map(function (m, i) {
        return '<span class="' + (l.saisons.indexOf(i + 1) > -1 ? "on" : "") + '">' + m + "</span>";
      }).join("") + "</div></dd>" +
      "<dt>Conservation</dt><dd>" + esc(l.conservation) + "</dd>" +
      "<dt>Idées</dt><dd>" + esc(l.idees) + "</dd></dl>";
    pageDetail({ route: "legumes", backHref: "#/legumes", titre: l.nom, image: l.image,
      tag: l.saisons.indexOf(moisCourant) > -1 ? "De saison" : "",
      pills: [l.type, l.gout], texte: l.description, extra: extra,
      autres: autres(S.legumes.filter(function (x) { return x.type === l.type; }).concat(S.legumes), l.id, 2).filter(function (x, i, a) { return a.indexOf(x) === i; }),
      carte: carteLegume });
  }

  function route() {
    var h = location.hash.replace(/^#\/?/, "").split("/");
    if (h[0] === "plat") return viewPlat(h[1]);
    if (h[0] === "legumes") return viewLegumes();
    if (h[0] === "legume") return viewLegume(h[1]);
    viewMenu();
  }
  function demarrer(data) {
    S = data;
    S.plats.forEach(function (p) { p.id = slug(p.nom); p.pastilles = p.pastilles || []; p.legumes = p.legumes || []; });
    S.legumes.forEach(function (l) { l.id = slug(l.nom); l.saisons = (l.saisons || []).map(Number); });
    document.title = S.nom;
    window.addEventListener("hashchange", route);
    route();
  }
  function charger() {
    if (window.SITE_INLINE) return demarrer(window.SITE_INLINE);
    var get = function (f) { return fetch(f, { cache: "no-cache" }).then(function (r) { return r.json(); }); };
    Promise.all([get("content/site.json"), get("content/plats.json"), get("content/legumes.json")]).then(function (r) {
      demarrer({ nom: r[0].nom, intro: r[0].intro, categories: r[0].categories, plats: r[1].plats, legumes: r[2].legumes });
    }).catch(function () {
      app.innerHTML = '<p style="padding:40px">Le contenu n\'a pas pu être chargé. Ouvrez le site depuis son adresse en ligne.</p>';
    });
  }
  charger();
})();
