/* Langues et textes fixes du site (boutons, titres, libellés).
   Le contenu du menu et des légumes se traduit, lui, dans le CMS (/admin). */
window.I18N = {
  langs: [
    /* "flag" = drapeau affiché dans le menu des langues (fr, gb, es, cn, ae) */
    { code: "fr", name: "Français", short: "FR", flag: "fr", locale: "fr-FR", dir: "ltr" },
    { code: "en", name: "English", short: "EN", flag: "gb", locale: "en-GB", dir: "ltr" },
    { code: "es", name: "Español", short: "ES", flag: "es", locale: "es-ES", dir: "ltr" },
    { code: "zh", name: "中文", short: "中文", flag: "cn", locale: "zh-CN", dir: "ltr" },
    { code: "ar", name: "العربية", short: "عربي", flag: "ae", locale: "ar-EG-u-ca-gregory-nu-latn", dir: "rtl" }
  ],

  welcome: [
    ["fr", "Bienvenue"], ["en", "Welcome"], ["es", "Bienvenidos"], ["zh", "欢迎"], ["ar", "أهلاً وسهلاً"]
  ],

  ui: {
    fr: {
      nav_menu: "Menu", nav_veg: "Légumes", change_lang: "Changer de langue",
      seg_menu: "Menu du jour", seg_veg: "Légumes disponibles aujourd'hui", nav_label: "Navigation principale",
      hero_menu_1: "Au menu", hero_menu_2: "actuellement",
      hero_veg_1: "Fiches", hero_veg_2: "légumes",
      veg_intro: "Tout savoir sur les légumes du buffet : saison, goût, conservation, idées.",
      back: "Retour au menu", back_veg: "Tous les légumes",
      ingredients: "Ingrédients", veg_links: "Fiches légumes",
      more: "Mais aussi…", see_all: "Voir tout",
      search_ph: "Rechercher un légume", all: "Tous",
      season_chip: "De saison en {m}", in_season: "De saison",
      season: "Saison", storage: "Conservation", ideas: "Idées",
      empty: "Aucun résultat.", enjoy: "Bon appétit !", sections: "Sections du menu"
    },
    en: {
      nav_menu: "Menu", nav_veg: "Vegetables", change_lang: "Change language",
      seg_menu: "Today's menu", seg_veg: "Vegetables available today", nav_label: "Main navigation",
      hero_menu_1: "On the menu", hero_menu_2: "right now",
      hero_veg_1: "Vegetable", hero_veg_2: "guides",
      veg_intro: "Everything about the buffet's vegetables: season, taste, storage, ideas.",
      back: "Back to the menu", back_veg: "All vegetables",
      ingredients: "Ingredients", veg_links: "Vegetable guides",
      more: "Also on the menu…", see_all: "See all",
      search_ph: "Search for a vegetable", all: "All",
      season_chip: "In season in {m}", in_season: "In season",
      season: "Season", storage: "Storage", ideas: "Ideas",
      empty: "No results.", enjoy: "Enjoy your meal!", sections: "Menu sections"
    },
    es: {
      nav_menu: "Menú", nav_veg: "Verduras", change_lang: "Cambiar de idioma",
      seg_menu: "Menú del día", seg_veg: "Verduras disponibles hoy", nav_label: "Navegación principal",
      hero_menu_1: "En el menú", hero_menu_2: "ahora mismo",
      hero_veg_1: "Fichas de", hero_veg_2: "verduras",
      veg_intro: "Todo sobre las verduras del buffet: temporada, sabor, conservación, ideas.",
      back: "Volver al menú", back_veg: "Todas las verduras",
      ingredients: "Ingredientes", veg_links: "Fichas de verduras",
      more: "Y también…", see_all: "Ver todo",
      search_ph: "Buscar una verdura", all: "Todas",
      season_chip: "De temporada en {m}", in_season: "De temporada",
      season: "Temporada", storage: "Conservación", ideas: "Ideas",
      empty: "Sin resultados.", enjoy: "¡Buen provecho!", sections: "Secciones del menú"
    },
    zh: {
      nav_menu: "菜单", nav_veg: "蔬菜", change_lang: "切换语言",
      seg_menu: "今日菜单", seg_veg: "今日供应蔬菜", nav_label: "主导航",
      hero_menu_1: "当前", hero_menu_2: "菜单",
      hero_veg_1: "蔬菜", hero_veg_2: "小百科",
      veg_intro: "了解自助餐中的蔬菜：时令、口味、保存方法与烹饪灵感。",
      back: "返回菜单", back_veg: "全部蔬菜",
      ingredients: "配料", veg_links: "相关蔬菜",
      more: "您可能还喜欢…", see_all: "查看全部",
      search_ph: "搜索蔬菜", all: "全部",
      season_chip: "{m}当季", in_season: "当季",
      season: "时令", storage: "保存方法", ideas: "烹饪灵感",
      empty: "没有找到结果。", enjoy: "祝您用餐愉快！", sections: "菜单分类"
    },
    ar: {
      nav_menu: "القائمة", nav_veg: "الخضروات", change_lang: "تغيير اللغة",
      seg_menu: "قائمة اليوم", seg_veg: "الخضروات المتوفرة اليوم", nav_label: "التنقل الرئيسي",
      hero_menu_1: "على القائمة", hero_menu_2: "حاليًا",
      hero_veg_1: "دليل", hero_veg_2: "الخضروات",
      veg_intro: "كل ما تريد معرفته عن خضروات البوفيه: الموسم والطعم والتخزين وأفكار للتحضير.",
      back: "العودة إلى القائمة", back_veg: "كل الخضروات",
      ingredients: "المكوّنات", veg_links: "بطاقات الخضروات",
      more: "وأيضاً…", see_all: "عرض الكل",
      search_ph: "ابحث عن خضار", all: "الكل",
      season_chip: "موسمي في {m}", in_season: "موسمي",
      season: "الموسم", storage: "التخزين", ideas: "أفكار للتحضير",
      empty: "لا توجد نتائج.", enjoy: "بالهناء والشفاء!", sections: "أقسام القائمة"
    }
  },

  /* Noms des catégories du menu (clé = nom français tel qu'écrit dans le CMS) */
  cat: {
    en: { "Jus de fruits": "Fruit juices", "Salades": "Salads", "Bouchées": "Bites", "Prêts à croquer": "Ready to bite" },
    es: { "Jus de fruits": "Zumos de fruta", "Salades": "Ensaladas", "Bouchées": "Bocados", "Prêts à croquer": "Listos para picar" },
    zh: { "Jus de fruits": "鲜榨果汁", "Salades": "沙拉", "Bouchées": "一口小点", "Prêts à croquer": "即食小食" },
    ar: { "Jus de fruits": "عصائر الفواكه", "Salades": "سلطات", "Bouchées": "لقيمات", "Prêts à croquer": "جاهزة للأكل" }
  }
};
