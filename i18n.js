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
      seg_menu: "Menu du jour", seg_veg: "Légumes du moment", nav_label: "Navigation principale", scroll_prev: "Précédent", scroll_next: "Suivant",
      hero_menu_1: "Au menu", hero_menu_2: "actuellement",
      hero_veg_1: "Fiches", hero_veg_2: "légumes",
      veg_intro: "Tout savoir sur les légumes du buffet : saison, goût, conservation, idées.",
      back: "Retour au menu", back_veg: "Tous les légumes",
      allergens: "Allergènes", allergen1: "Allergène", contains: "Contient", ingredients: "Ingrédients", veg_links: "Fiches des ingrédients", benefits: "Bienfaits",
      more: "Mais aussi…", see_all: "Voir tout",
      search_ph: "Rechercher un légume", all: "Tous",
      s_all: "Disponible toute l'année", s_until: "En saison jusqu'en {m}", s_back: "De retour en {m}", season_chip: "De saison en {m}", in_season: "De saison",
      season: "Saison", storage: "Conservation", ideas: "Idées",
      empty: "Aucun résultat.", enjoy: "Bon appétit !", sections: "Sections du menu", h_read: "Lire son histoire", h_back: "Retour au plat", r_title: "Réserver une livraison", r_intro: "Cochez ce que vous souhaitez et dites-nous où livrer : nous vous répondons pour confirmer.", r_what: "Que souhaitez-vous commander ?", r_raw: "Fruits et légumes bruts de saison", r_where: "Où livrer ?", r_loc_room: "Chambre d'un athlète", r_loc_office: "Bureau des organisateurs", r_loc_studio: "Studio de journalistes", r_loc_team: "Salle d'équipe", r_loc_other: "Autre lieu", r_place_detail: "Précisions : bâtiment, étage, numéro de chambre…", r_when: "Quand ?", r_date: "Date", r_time: "Heure", r_people: "Nombre de personnes", r_you: "Vos coordonnées", r_name: "Nom", r_contact: "Téléphone ou e-mail", r_notes: "Allergies, précisions, remarques", r_send_mail: "Envoyer par e-mail", r_send_wa: "Envoyer par WhatsApp", r_copy: "Copier la demande", r_copied: "Demande copiée.", r_err_item: "Cochez au moins un article.", r_err_place: "Choisissez un lieu de livraison.", r_err_you: "Indiquez votre nom et un moyen de vous joindre.", r_noconf: "Les coordonnées de réservation ne sont pas encore renseignées : copiez la demande pour l'envoyer.", r_short: "Réserver", f_variety: "Variété", f_caliber: "Calibre", f_origin: "Origine", f_price: "Prix", f_category: "Catégorie"
    },
    en: {
      nav_menu: "Menu", nav_veg: "Vegetables", change_lang: "Change language",
      seg_menu: "Today's menu", seg_veg: "Vegetables of the moment", nav_label: "Main navigation", scroll_prev: "Previous", scroll_next: "Next",
      hero_menu_1: "On the menu", hero_menu_2: "right now",
      hero_veg_1: "Vegetable", hero_veg_2: "guides",
      veg_intro: "Everything about the buffet's vegetables: season, taste, storage, ideas.",
      back: "Back to the menu", back_veg: "All vegetables",
      allergens: "Allergens", allergen1: "Allergen", contains: "Contains", ingredients: "Ingredients", veg_links: "Ingredient guides", benefits: "Benefits",
      more: "Also on the menu…", see_all: "See all",
      search_ph: "Search for a vegetable", all: "All",
      s_all: "All year round", s_until: "In season until {m}", s_back: "Back in {m}", season_chip: "In season in {m}", in_season: "In season",
      season: "Season", storage: "Storage", ideas: "Ideas",
      empty: "No results.", enjoy: "Enjoy your meal!", sections: "Menu sections", h_read: "Read his story", h_back: "Back to the dish", r_title: "Book a delivery", r_intro: "Tick what you would like and tell us where to deliver: we will reply to confirm.", r_what: "What would you like to order?", r_raw: "Raw seasonal fruit and vegetables", r_where: "Where to deliver?", r_loc_room: "Athlete's room", r_loc_office: "Organisers' office", r_loc_studio: "Journalists' studio", r_loc_team: "Team room", r_loc_other: "Other place", r_place_detail: "Details: building, floor, room number…", r_when: "When?", r_date: "Date", r_time: "Time", r_people: "Number of people", r_you: "Your details", r_name: "Name", r_contact: "Phone or e-mail", r_notes: "Allergies, details, comments", r_send_mail: "Send by e-mail", r_send_wa: "Send via WhatsApp", r_copy: "Copy the request", r_copied: "Request copied.", r_err_item: "Tick at least one item.", r_err_place: "Choose a delivery place.", r_err_you: "Enter your name and a way to reach you.", r_noconf: "Booking contact details are not set up yet: copy the request to send it.", r_short: "Book", f_variety: "Variety", f_caliber: "Size grade", f_origin: "Origin", f_price: "Price", f_category: "Grade"
    },
    es: {
      nav_menu: "Menú", nav_veg: "Verduras", change_lang: "Cambiar de idioma",
      seg_menu: "Menú del día", seg_veg: "Verduras del momento", nav_label: "Navegación principal", scroll_prev: "Anterior", scroll_next: "Siguiente",
      hero_menu_1: "En el menú", hero_menu_2: "ahora mismo",
      hero_veg_1: "Fichas de", hero_veg_2: "verduras",
      veg_intro: "Todo sobre las verduras del buffet: temporada, sabor, conservación, ideas.",
      back: "Volver al menú", back_veg: "Todas las verduras",
      allergens: "Alérgenos", allergen1: "Alérgeno", contains: "Contiene", ingredients: "Ingredientes", veg_links: "Fichas de los ingredientes", benefits: "Beneficios",
      more: "Y también…", see_all: "Ver todo",
      search_ph: "Buscar una verdura", all: "Todas",
      s_all: "Todo el año", s_until: "De temporada hasta {m}", s_back: "Vuelve en {m}", season_chip: "De temporada en {m}", in_season: "De temporada",
      season: "Temporada", storage: "Conservación", ideas: "Ideas",
      empty: "Sin resultados.", enjoy: "¡Buen provecho!", sections: "Secciones del menú", h_read: "Leer su historia", h_back: "Volver al plato", r_title: "Reservar una entrega", r_intro: "Marque lo que desea e indíquenos dónde entregar: le responderemos para confirmar.", r_what: "¿Qué desea pedir?", r_raw: "Frutas y verduras crudas de temporada", r_where: "¿Dónde entregar?", r_loc_room: "Habitación de un deportista", r_loc_office: "Oficina de los organizadores", r_loc_studio: "Estudio de periodistas", r_loc_team: "Sala de equipo", r_loc_other: "Otro lugar", r_place_detail: "Detalles: edificio, planta, número de habitación…", r_when: "¿Cuándo?", r_date: "Fecha", r_time: "Hora", r_people: "Número de personas", r_you: "Sus datos", r_name: "Nombre", r_contact: "Teléfono o correo electrónico", r_notes: "Alergias, detalles, comentarios", r_send_mail: "Enviar por correo", r_send_wa: "Enviar por WhatsApp", r_copy: "Copiar la solicitud", r_copied: "Solicitud copiada.", r_err_item: "Marque al menos un artículo.", r_err_place: "Elija un lugar de entrega.", r_err_you: "Indique su nombre y un medio de contacto.", r_noconf: "Los datos de contacto aún no están configurados: copie la solicitud para enviarla.", r_short: "Reservar", f_variety: "Variedad", f_caliber: "Calibre", f_origin: "Origen", f_price: "Precio", f_category: "Categoría"
    },
    zh: {
      nav_menu: "菜单", nav_veg: "蔬菜", change_lang: "切换语言",
      seg_menu: "今日菜单", seg_veg: "当季蔬菜", nav_label: "主导航", scroll_prev: "上一个", scroll_next: "下一个",
      hero_menu_1: "当前", hero_menu_2: "菜单",
      hero_veg_1: "蔬菜", hero_veg_2: "小百科",
      veg_intro: "了解自助餐中的蔬菜：时令、口味、保存方法与烹饪灵感。",
      back: "返回菜单", back_veg: "全部蔬菜",
      allergens: "过敏原", allergen1: "过敏原", contains: "含", ingredients: "配料", veg_links: "食材小百科", benefits: "营养与益处",
      more: "您可能还喜欢…", see_all: "查看全部",
      search_ph: "搜索蔬菜", all: "全部",
      s_all: "全年供应", s_until: "当季至{m}", s_back: "{m}回归", season_chip: "{m}当季", in_season: "当季",
      season: "时令", storage: "保存方法", ideas: "烹饪灵感",
      empty: "没有找到结果。", enjoy: "祝您用餐愉快！", sections: "菜单分类", h_read: "阅读他的故事", h_back: "返回菜品", r_title: "预约配送", r_intro: "勾选您想要的餐品并告诉我们配送地点，我们会回复确认。", r_what: "您想订购什么？", r_raw: "时令生鲜蔬果", r_where: "配送到哪里？", r_loc_room: "运动员房间", r_loc_office: "组织者办公室", r_loc_studio: "记者演播室", r_loc_team: "团队休息室", r_loc_other: "其他地点", r_place_detail: "详细信息：楼栋、楼层、房间号……", r_when: "什么时候？", r_date: "日期", r_time: "时间", r_people: "人数", r_you: "您的联系方式", r_name: "姓名", r_contact: "电话或电子邮件", r_notes: "过敏信息、备注", r_send_mail: "通过电子邮件发送", r_send_wa: "通过WhatsApp发送", r_copy: "复制申请", r_copied: "已复制。", r_err_item: "请至少勾选一项。", r_err_place: "请选择配送地点。", r_err_you: "请填写姓名和联系方式。", r_noconf: "预约联系方式尚未设置：请复制申请后发送。", r_short: "预约", f_variety: "品种", f_caliber: "规格", f_origin: "产地", f_price: "价格", f_category: "等级"
    },
    ar: {
      nav_menu: "القائمة", nav_veg: "الخضروات", change_lang: "تغيير اللغة",
      seg_menu: "قائمة اليوم", seg_veg: "خضروات الموسم", nav_label: "التنقل الرئيسي", scroll_prev: "السابق", scroll_next: "التالي",
      hero_menu_1: "على القائمة", hero_menu_2: "حاليًا",
      hero_veg_1: "دليل", hero_veg_2: "الخضروات",
      veg_intro: "كل ما تريد معرفته عن خضروات البوفيه: الموسم والطعم والتخزين وأفكار للتحضير.",
      back: "العودة إلى القائمة", back_veg: "كل الخضروات",
      allergens: "مسببات الحساسية", allergen1: "مسبب الحساسية", contains: "يحتوي على", ingredients: "المكوّنات", veg_links: "بطاقات المكوّنات", benefits: "الفوائد",
      more: "وأيضاً…", see_all: "عرض الكل",
      search_ph: "ابحث عن خضار", all: "الكل",
      s_all: "طوال السنة", s_until: "موسمي حتى {m}", s_back: "يعود في {m}", season_chip: "موسمي في {m}", in_season: "موسمي",
      season: "الموسم", storage: "التخزين", ideas: "أفكار للتحضير",
      empty: "لا توجد نتائج.", enjoy: "بالهناء والشفاء!", sections: "أقسام القائمة", h_read: "اقرأ قصته", h_back: "العودة إلى الطبق", r_title: "احجز توصيلاً", r_intro: "اختر ما تريده وأخبرنا أين نوصّل، وسنردّ عليك للتأكيد.", r_what: "ماذا تريد أن تطلب؟", r_raw: "فواكه وخضار موسمية نيئة", r_where: "أين نوصّل؟", r_loc_room: "غرفة رياضي", r_loc_office: "مكتب المنظمين", r_loc_studio: "استوديو صحفيين", r_loc_team: "قاعة فريق", r_loc_other: "مكان آخر", r_place_detail: "تفاصيل: المبنى، الطابق، رقم الغرفة…", r_when: "متى؟", r_date: "التاريخ", r_time: "الوقت", r_people: "عدد الأشخاص", r_you: "بياناتك", r_name: "الاسم", r_contact: "الهاتف أو البريد الإلكتروني", r_notes: "الحساسية، تفاصيل، ملاحظات", r_send_mail: "إرسال بالبريد الإلكتروني", r_send_wa: "إرسال عبر واتساب", r_copy: "نسخ الطلب", r_copied: "تم النسخ.", r_err_item: "اختر عنصراً واحداً على الأقل.", r_err_place: "اختر مكان التوصيل.", r_err_you: "أدخل اسمك ووسيلة للتواصل.", r_noconf: "بيانات التواصل غير مضبوطة بعد: انسخ الطلب لإرساله.", r_short: "احجز", f_variety: "الصنف", f_caliber: "القياس", f_origin: "المنشأ", f_price: "السعر", f_category: "الفئة"
    }
  },

  /* Noms des catégories du menu (clé = nom français tel qu'écrit dans le CMS) */
  cat: {
    en: { "Les jus olympiques": "The Olympic juices", "Velouté olympique de saison": "Olympic seasonal velouté", "Préparations olympiques sucrées": "Olympic sweet preparations", "Préparations olympiques salées": "Olympic savoury preparations", "Salades": "Salads", "Veloutés": "Velouté soups", "Bouchées": "Bites", "Prêts à croquer": "Ready to bite" },
    es: { "Les jus olympiques": "Los zumos olímpicos", "Velouté olympique de saison": "Crema olímpica de temporada", "Préparations olympiques sucrées": "Preparaciones olímpicas dulces", "Préparations olympiques salées": "Preparaciones olímpicas saladas", "Salades": "Ensaladas", "Veloutés": "Cremas", "Bouchées": "Bocados", "Prêts à croquer": "Listos para picar" },
    zh: { "Les jus olympiques": "奥运果汁", "Velouté olympique de saison": "奥运时令浓汤", "Préparations olympiques sucrées": "奥运甜品", "Préparations olympiques salées": "奥运咸味小食", "Salades": "沙拉", "Veloutés": "浓汤", "Bouchées": "一口小点", "Prêts à croquer": "即食小食" },
    ar: { "Les jus olympiques": "العصائر الأولمبية", "Velouté olympique de saison": "حساء كريمي أولمبي موسمي", "Préparations olympiques sucrées": "تحضيرات أولمبية حلوة", "Préparations olympiques salées": "تحضيرات أولمبية مالحة", "Salades": "سلطات", "Veloutés": "حساء كريمي", "Bouchées": "لقيمات", "Prêts à croquer": "جاهزة للأكل" }
  },
  /* Allergènes : le CMS propose cette liste ; chaque nom est traduit ici. « m » = mot à mettre en gras dans les ingrédients. */
  allergen: {
    "Céleri": { en: "Celery", es: "Apio", zh: "芹菜", ar: "الكرفس", m: { fr: "céleri", en: "celery", es: "apio", zh: "芹菜", ar: "كرفس" } },
    "Pistache": { en: "Pistachio", es: "Pistacho", zh: "开心果", ar: "الفستق الحلبي", m: { fr: "pistache", en: "pistachio", es: "pistacho", zh: "开心果", ar: "فستق" } },
    "Noix": { en: "Walnut", es: "Nuez", zh: "核桃", ar: "الجوز", m: { fr: "noix", en: "walnut", es: "nuez|nueces", zh: "核桃", ar: "جوز" } },
    "Autres fruits à coque": { en: "Other tree nuts", es: "Otros frutos de cáscara", zh: "其他坚果", ar: "مكسرات أخرى", m: { fr: "amande|noisette|cajou|pécan|macadamia|brésil", en: "almond|hazelnut|cashew|pecan|macadamia|brazil nut", es: "almendra|avellana|anacardo|pecana|macadamia", zh: "杏仁|榛子|腰果|山核桃", ar: "لوز|بندق|كاجو" } },
    "Gluten": { en: "Gluten", es: "Gluten", zh: "麸质", ar: "الغلوتين", m: { fr: "gluten|blé|seigle|orge|avoine|épeautre", en: "gluten|wheat|rye|barley|oat|spelt", es: "gluten|trigo|centeno|cebada|avena|espelta", zh: "麸质|小麦|黑麦|大麦|燕麦", ar: "غلوتين|قمح|شعير|شوفان" } },
    "Lait": { en: "Milk", es: "Leche", zh: "牛奶", ar: "الحليب", m: { fr: "lait|crème|beurre|fromage|yaourt", en: "milk|cream|butter|cheese|yogurt", es: "leche|nata|crema|mantequilla|queso|yogur", zh: "牛奶|奶油|黄油|奶酪|酸奶", ar: "حليب|كريمة|زبدة|جبن|زبادي" } },
    "Œufs": { en: "Eggs", es: "Huevos", zh: "鸡蛋", ar: "البيض", m: { fr: "œuf|oeuf", en: "egg", es: "huevo", zh: "鸡蛋|蛋", ar: "بيض" } },
    "Arachides": { en: "Peanuts", es: "Cacahuetes", zh: "花生", ar: "الفول السوداني", m: { fr: "arachide|cacahuète", en: "peanut", es: "cacahuete|cacahuate", zh: "花生", ar: "فول سوداني" } },
    "Soja": { en: "Soy", es: "Soja", zh: "大豆", ar: "الصويا", m: { fr: "soja", en: "soy", es: "soja", zh: "大豆|豆", ar: "صويا" } },
    "Sésame": { en: "Sesame", es: "Sésamo", zh: "芝麻", ar: "السمسم", m: { fr: "sésame", en: "sesame", es: "sésamo", zh: "芝麻", ar: "سمسم" } },
    "Moutarde": { en: "Mustard", es: "Mostaza", zh: "芥末", ar: "الخردل", m: { fr: "moutarde", en: "mustard", es: "mostaza", zh: "芥末|芥", ar: "خردل" } },
    "Sulfites": { en: "Sulphites", es: "Sulfitos", zh: "亚硫酸盐", ar: "الكبريتيت", m: { fr: "sulfite", en: "sulphite|sulfite", es: "sulfito", zh: "亚硫酸盐", ar: "كبريتيت" } },
    "Poisson": { en: "Fish", es: "Pescado", zh: "鱼", ar: "السمك", m: { fr: "poisson", en: "fish", es: "pescado", zh: "鱼", ar: "سمك" } },
    "Crustacés": { en: "Crustaceans", es: "Crustáceos", zh: "甲壳类", ar: "القشريات", m: { fr: "crustacé|crevette|crabe", en: "crustacean|shrimp|prawn|crab", es: "crustáceo|gamba|cangrejo", zh: "甲壳|虾|蟹", ar: "قشريات|روبيان|سلطعون" } },
    "Mollusques": { en: "Molluscs", es: "Moluscos", zh: "软体动物", ar: "الرخويات", m: { fr: "mollusque|moule|huître", en: "mollusc|mussel|oyster", es: "molusco|mejillón|ostra", zh: "软体|贻贝|牡蛎", ar: "رخويات|بلح البحر|محار" } },
    "Lupin": { en: "Lupin", es: "Altramuces", zh: "羽扇豆", ar: "الترمس", m: { fr: "lupin", en: "lupin", es: "altramuz|altramuces", zh: "羽扇豆", ar: "ترمس" } },
    "Graines de courge": { en: "Pumpkin seeds", es: "Semillas de calabaza", zh: "南瓜籽", ar: "بذور القرع", m: { fr: "graines? de courge", en: "pumpkin seeds?", es: "semillas? de calabaza", zh: "南瓜籽", ar: "بذور القرع" } }
  }
};
