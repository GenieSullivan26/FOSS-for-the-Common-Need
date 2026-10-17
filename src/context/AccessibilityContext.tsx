import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'es' | 'vi' | 'zh' | 'ar';

export interface AccessibilitySettings {
  language: LanguageCode;
  fontSize: 'normal' | 'large' | 'xlarge';
  contrast: 'normal' | 'high';
  darkMode: boolean;
  dyslexicFont: boolean;
  reducedMotion: boolean;
  focusHighlights: boolean;
  textToSpeech: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  t: (key: string) => string;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
}

const defaultSettings: AccessibilitySettings = {
  language: 'en',
  fontSize: 'normal',
  contrast: 'normal',
  darkMode: false,
  dyslexicFont: false,
  reducedMotion: false,
  focusHighlights: false,
  textToSpeech: false,
};

// UI Translations Dictionary
const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    about: 'About',
    actions: 'Actions',
    apps: 'Apps',
    heroTitle: 'Building Economic Democracy through User-Controlled Digital Tools.',
    heroDesc: 'In response to centuries of stolen land and labor, FOSS For The Common Need builds user-controlled digital infrastructure powered by volunteers to help local non-profits expand access to free goods and services for working class families.',
    missionTitle: 'Rooted in Self-Determination. Built for the Common Need.',
    charitableMission: '501(c)(3) CHARITABLE MISSION',
    systemicVision: 'LONG-TERM SYSTEMIC VISION',
    whyThisMatters: 'WHY THIS MATTERS',
    addressingProblems: 'Addressing Four Everyday Problems',
    ourWork: 'OUR WORK',
    whatWeDo: 'What We Do Every Day',
    earlyPreview: 'EARLY APP PREVIEW',
    howAppsWork: 'How the Apps Work',
    appsDesc: "Here is an early look at the free tools we're building. They connect non-profits and volunteer couriers to families in need by delivering free basic needs.",
    accessibilityTitle: 'Accessibility & Language Settings',
    selectLanguage: 'Select Language',
    textSize: 'Text Size',
    highContrast: 'High Contrast Mode',
    darkMode: 'Dark Mode Theme',
    dyslexiaFont: 'Dyslexia-Friendly Spacing',
    reducedMotion: 'Reduce Animations',
    focusRing: 'Highlight Focus Elements',
    readAloud: 'Read Aloud (Text-to-Speech)',
    reset: 'Reset Defaults',
    close: 'Close',

    // Section Content
    missionStatement: 'In response to centuries of stolen land and labor, FOSS For The Common Need creates user-controlled digital tools powered by volunteers to help local non-profits expand access to free goods and services for working class families.',
    visionStatement: 'To build a future where technology is a public good, not a private commodity. We envision a world where communities own their digital infrastructure, ensuring goods and services are distributed according to need.',
    pillarsDesc: 'As big corporations raise delivery fees and cut pay, everyday people need simple tools they control to help their own neighborhoods get fresh food, medicine, and essentials.',
    theProblem: '[ THE PROBLEM ]',
    ourSolution: '[ OUR SOLUTION ]',
    pillarWord: 'PILLAR',
    ofWord: 'OF',
    swipeNavPillars: '← Swipe on mobile or tap pills above →',
    swipeNavActivities: '← Swipe on mobile or tap pills above to navigate →',
    stepWord: 'Step',

    // Economic Pillars
    p1Category: 'Family Budgets',
    p1Title: 'Skyrocketing Delivery Costs',
    p1Problem: 'Commercial delivery apps add extra fees and jack up prices by 30%, making it impossible for families on tight budgets to get food delivered.',
    p1Solution: 'A free community app that connects volunteer drivers with local food pantries to bring groceries and care packages to doors at 100% zero cost.',
    p1Metric: '100% free delivery with zero hidden fees',

    p2Category: 'People in Charge',
    p2Title: 'Corporate Delivery Apps',
    p2Problem: 'Big-tech delivery companies underpay gig workers and trap families into costly services just to chase corporate profits.',
    p2Solution: 'A volunteer-powered system where local drivers, charities, and families vote together on how deliveries work and where help goes first.',
    p2Metric: 'Run by the community, not corporate executives',

    p3Category: 'Non-Profits',
    p3Title: 'Overburdened Community Groups',
    p3Problem: 'Non-profits, mutual aid groups, and community organizations waste precious hours each week juggling messy spreadsheets and frantic phone calls just to coordinate deliveries.',
    p3Solution: 'An easy automated tool that pairs volunteer drivers with community deliveries in one click, letting non-profits and mutual aid organizers focus on serving their neighbors.',
    p3Metric: 'Saves 12–18 hours of busywork every week per group',

    p4Category: 'Democracy',
    p4Title: 'Towns Left Without Support',
    p4Problem: "Local towns and neighborhoods often don't have the budget to help during crises, while private apps pull money out of the local economy.",
    p4Solution: 'Permanent, free software that any town or neighborhood group can use forever to support one another without paying monthly fees.',
    p4Metric: 'Free forever for any town or community group',

    // Core Activities
    act1Title: 'Design',
    act1Subtitle: 'Building Free Delivery Tools',
    act1Desc: 'We build easy-to-use apps that help volunteer drivers find the fastest delivery routes, match food boxes with families, and track volunteer hours.',

    act2Title: 'FOSS',
    act2Subtitle: 'Keeping the Tools Free & Public',
    act2Desc: 'We keep all our software code public and open so that no corporation can ever buy it, privatize it, or put it behind a paywall.',

    act3Title: 'Free Guides',
    act3Subtitle: 'Simple Guides & Open Playbooks',
    act3Desc: 'We write free, step-by-step guides so any local food bank, town hall, or neighborhood group can easily set up their own free delivery network.',

    act4Title: 'Partnerships',
    act4Subtitle: 'Listening to Everyday People',
    act4Desc: 'We sit down directly with local food bank workers, volunteer drivers, and families to design apps that are easy, respectful, and genuinely helpful.',

    // PWA Categories
    catAll: 'All',
    catProduce: 'Produce',
    catPantry: 'Pantry',
    catHotMeal: 'Hot Meal',
    catHealth: 'Health',
    catFamily: 'Family',

    // PWA Wireframe Translations
    memberPwa: '1. Member PWA',
    volunteerPwa: '2. Volunteer PWA',
    nonProfitPwa: '3. Non-Profit PWA',
    pwaHeaderMember: 'THE COMMON NEED • MEMBER PWA',
    pwaHeaderVolunteer: 'THE COMMON NEED • VOLUNTEER PWA',
    pwaHeaderNonProfit: 'THE COMMON NEED • NON-PROFIT PWA',
    freeBadge: '$0 FREE',
    freeCoOp: '$0 FREE CO-OP',
    chooseItemsTitle: 'Choose Exact Items Your Family Needs',
    pooledFromHubs: 'Pooled from 3 local non-profits • Volunteer delivery',
    noMeansTesting: 'No Means-Testing',
    immunocompromisedPriority: 'Immunocompromised Priority',
    seniorDisabilityPriority: 'Senior & Disability Priority',
    addBtn: '+ Add',
    multiPantryBasket: 'Multi-Pantry Member Basket',
    mobilityHandoff: 'Mobility & Accessibility Handoff',
    porchStepsPref: 'Bring up porch steps to door',
    extraWaitPref: 'Wait 60s at door (Mobility Aid / Senior)',
    contactlessPref: 'Contactless dropoff (Immunocompromised)',
    nonProfitGoods: 'Non-Profit Goods',
    volunteerDelivery: 'Volunteer Courier Delivery',
    corporateAppFees: 'Corporate App Markup Fees',
    totalDue: 'TOTAL DUE',
    requestDeliveryBtn: 'Request Free Volunteer Delivery →',
    etaMins: 'ETA: 14 MINS',
    courierEnRoute: 'Volunteer Courier Marcus En Route',
    liveTracker: '[OpenStreetMap Live Courier Tracker]',
    navChooseItems: '1. Choose Items',
    navBasket: '2. $0 Basket',
    navTrackCourier: '3. Track Courier',

    // Volunteer PWA
    batchId: 'BATCH #OAK-409',
    loopTitle: 'Deep East Oakland → Fruitvale Loop',
    routeStats: '42 mins • 4.6 mi',
    stopsCompleted: 'Stops Done',
    desiloedRoute: 'Desiloed Route: 2 Non-Profits → 2 Homes',
    cboFeesSaved: '$47.50 CBO Fees Saved',
    markDone: 'Mark Done',
    completed: 'Completed',
    navBatchRoute: '1. Active Batch Route',
    navCoopVote: '2. Courier Co-op Vote',
    courierGovernance: 'decidim-module-courier Governance',
    proposalTitle: 'Volunteer Courier Assembly Proposal #206',
    proposalDesc: 'Allocate municipal grant funds to station 12 cargo e-bikes at local pantries so working-class volunteers never pay out-of-pocket fuel costs.',
    quorumMet: 'Quorum: 96% Met',
    votedSupport: 'Voted Support ✓',

    // Non-Profit PWA
    hubName: 'East Oakland Collective Pantry Hub',
    doordashFeesSaved: 'DOORDASH FEES SAVED',
    staffHoursSaved: 'STAFF HOURS SAVED',
    navHandoff: '1. Courier Handoff',
    navShelfStock: '2. Live Shelf Stock',
    navCboCoop: '3. CBO Co-op',
    sharedFleet: 'Shared Volunteer Fleet',
    sharedFleetDesc: 'Pre-pack member choice crates below for incoming volunteer couriers.',
    pullFromShelf: 'Pull from Shelf',
    markReadyForCourier: 'Mark Crates Ready for Courier',
    cratesStaged: 'Crates Staged at Loading Ramp ✓',
    postSurplusGoods: '+ Post Surplus Goods to Member App',
    itemNamePlaceholder: 'Item name (e.g., Fresh Bok Choy & Ginger)',
    addToCommonNeed: '+ Add to Common Need',
    cboFederationPriority: 'CBO Federation Routing Priority',

    // Footer & Donation
    footerDesc: 'Creating user-controlled digital tools powered by volunteers to help local non-profits expand access to free goods and services for working class families.',
    getInTouch: 'Get in touch with us:',
    copied: 'Copied!',
    taxDeductibleGift: '[ TAX-DEDUCTIBLE 501(c)(3) GIFT ]',
    supportTitle: 'Support FOSS For The Common Need',
    confirmContribution: 'CONFIRM CONTRIBUTION',
    thankYouTitle: 'Thank You for Fueling the Commons!',
    copyTaxReceipt: 'Copy Tax Receipt',
    done: 'Done',
    selectedContribution: 'Selected Contribution',
    yourName: 'Your Name (for Tax Receipt)',
    emailAddress: 'Email Address (to receive Official Receipt) *',
    paymentMethod: 'Payment Method',
    creditDebit: 'Credit / Debit',
    bankAch: 'Bank ACH',
    dafCheck: 'DAF / Check',
    taxReceiptCopied: 'Receipt Copied!',
  },
  es: {
    about: 'Acerca de',
    actions: 'Acciones',
    apps: 'Aplicaciones',
    heroTitle: 'Construyendo Democracia Económica a través de Herramientas Digitales Controladas por Usuarios.',
    heroDesc: 'En respuesta a siglos de despojo, FOSS For The Common Need crea infraestructura digital gratuita y operada por voluntarios para ayudar a las organizaciones locales a llevar bienes a familias trabajadoras.',
    missionTitle: 'Arraigado en la Autodeterminación. Construido para la Necesidad Común.',
    charitableMission: 'MISIÓN CARITATIVA 501(c)(3)',
    systemicVision: 'VISIÓN SISTÉMICA A LARGO PLAZO',
    whyThisMatters: 'POR QUÉ IMPORTA ESTO',
    addressingProblems: 'Resolviendo Cuatro Problemas Cotidianos',
    ourWork: 'NUESTRO TRABAJO',
    whatWeDo: 'Lo Que Hacemos Cada Día',
    earlyPreview: 'VISTA PREVIA DE LAS APPS',
    howAppsWork: 'Cómo Funcionan las Aplicaciones',
    appsDesc: 'Una vista previa de nuestras herramientas gratuitas. Conectan organizaciones sin fines de lucro y repartidores voluntarios con familias necesitadas.',
    accessibilityTitle: 'Configuración de Accesibilidad e Idioma',
    selectLanguage: 'Seleccionar Idioma',
    textSize: 'Tamaño del Texto',
    highContrast: 'Modo Alto Contraste',
    darkMode: 'Modo Oscuro',
    dyslexiaFont: 'Espaciado para Dislexia',
    reducedMotion: 'Reducir Animaciones',
    focusRing: 'Resaltar Elementos Activos',
    readAloud: 'Lectura en Voz Alta',
    reset: 'Restablecer',
    close: 'Cerrar',

    // Section Content
    missionStatement: 'En respuesta a siglos de despojo de tierras y trabajo, FOSS For The Common Need crea herramientas digitales controladas por usuarios y operadas por voluntarios para ayudar a las organizaciones sin fines de lucro locales a ampliar el acceso a bienes y servicios gratuitos para familias trabajadoras.',
    visionStatement: 'Construir un futuro donde la tecnología sea un bien público, no una mercancía privada. Imaginamos un mundo donde las comunidades sean dueñas de su infraestructura digital, garantizando que los bienes y servicios se distribuyan según las necesidades.',
    pillarsDesc: 'A medida que las grandes corporaciones aumentan las tarifas de envío y reducen los sueldos, las personas necesitan herramientas sencillas que puedan controlar para ayudar a sus vecindarios a obtener alimentos frescos, medicinas y artículos esenciales.',
    theProblem: '[ EL PROBLEMA ]',
    ourSolution: '[ NUESTRA SOLUCIÓN ]',
    pillarWord: 'PILAR',
    ofWord: 'DE',
    swipeNavPillars: '← Deslice en móvil o toque las pestañas →',
    swipeNavActivities: '← Deslice en móvil o toque las pestañas para navegar →',
    stepWord: 'Paso',

    // Economic Pillars
    p1Category: 'Presupuestos Familiares',
    p1Title: 'Costos de Envío Desorbitados',
    p1Problem: 'Las aplicaciones comerciales de envío agregan tarifas extra y aumentan los precios un 30%, impidiendo que las familias con presupuestos ajustados reciban alimentos.',
    p1Solution: 'Una aplicación comunitaria gratuita que conecta a repartidores voluntarios con bancos de alimentos locales para llevar despensas a la puerta a un costo 100% cero.',
    p1Metric: 'Entrega 100% gratuita sin tarifas ocultas',

    p2Category: 'Personas al Mando',
    p2Title: 'Aplicaciones de Envío Corporativas',
    p2Problem: 'Las grandes empresas de envíos pagan mal a los trabajadores y atrapan a las familias en servicios costosos solo para obtener ganancias corporativas.',
    p2Solution: 'Un sistema operado por voluntarios donde repartidores locales, organizaciones y familias votan juntos sobre cómo funcionan los envíos y dónde va la ayuda primero.',
    p2Metric: 'Gestionado por la comunidad, no por ejecutivos corporativos',

    p3Category: 'Non-Profits',
    p3Title: 'Grupos Comunitarios Sobrecargados',
    p3Problem: 'Organizaciones sin fines de lucro y grupos de ayuda mutua pierden horas valiosas cada semana manejando hojas de cálculo y llamadas telefónicas para coordinar entregas.',
    p3Solution: 'Una herramienta automatizada y sencilla que conecta repartidores voluntarios con entregas comunitarias en un clic, permitiendo a los organizadores enfocarse en servir a sus vecinos.',
    p3Metric: 'Ahorra de 12 a 18 horas de papeleo cada semana por grupo',

    p4Category: 'Democracia',
    p4Title: 'Comunidades Sin Apoyo',
    p4Problem: 'Las comunidades locales a menudo no tienen presupuesto para ayudar durante las crisis, mientras que las aplicaciones privadas extraen dinero de la economía local.',
    p4Solution: 'Software permanente y gratuito que cualquier comunidad o grupo de vecindarios puede usar para apoyarse mutuamente sin pagar tarifas mensuales.',
    p4Metric: 'Gratis para siempre para cualquier comunidad o grupo',

    // Core Activities
    act1Title: 'Diseño',
    act1Subtitle: 'Construyendo Herramientas Gratuitas de Entrega',
    act1Desc: 'Creamos aplicaciones fáciles de usar que ayudan a repartidores voluntarios a encontrar rutas rápidas, entregar cajas de alimentos a familias y registrar sus horas.',

    act2Title: 'Software Libre',
    act2Subtitle: 'Manteniendo las Herramientas Libres y Públicas',
    act2Desc: 'Mantenemos todo nuestro código público y abierto para que ninguna corporación pueda comprarlo, privatizarlo ni cobrar por su uso.',

    act3Title: 'Guías Gratuitas',
    act3Subtitle: 'Guías Sencillas y Manuales Abiertos',
    act3Desc: 'Escribimos guías gratuitas paso a paso para que cualquier banco de alimentos, alcaldía o grupo local pueda instalar su propia red de entregas.',

    act4Title: 'Alianzas',
    act4Subtitle: 'Escuchando a las Personas',
    act4Desc: 'Nos reunimos directamente con trabajadores de bancos de alimentos, repartidores voluntarios y familias para diseñar aplicaciones respetuosas y útiles.',

    // PWA Categories
    catAll: 'Todos',
    catProduce: 'Frutas y Verduras',
    catPantry: 'Despensa',
    catHotMeal: 'Comida Caliente',
    catHealth: 'Salud',
    catFamily: 'Familia',

    // PWA Wireframe Translations
    memberPwa: '1. App Miembro',
    volunteerPwa: '2. App Repartidor',
    nonProfitPwa: '3. App Organización',
    pwaHeaderMember: 'LA NECESIDAD COMÚN • APP MIEMBRO',
    pwaHeaderVolunteer: 'LA NECESIDAD COMÚN • APP REPARTIDOR',
    pwaHeaderNonProfit: 'LA NECESIDAD COMÚN • APP ORGANIZACIÓN',
    freeBadge: '$0 GRATIS',
    freeCoOp: '$0 COOPERATIVA',
    chooseItemsTitle: 'Elija los Productos Exactos para su Familia',
    pooledFromHubs: 'Unificado de 3 organizaciones locales • Entrega voluntaria',
    noMeansTesting: 'Sin Prueba de Ingresos',
    immunocompromisedPriority: 'Prioridad Inmunocomprometidos',
    seniorDisabilityPriority: 'Prioridad Adultos Mayores y Discapacidad',
    addBtn: '+ Añadir',
    multiPantryBasket: 'Canasta Unificada de Organizaciones',
    mobilityHandoff: 'Entrega Adaptada a Movilidad y Accesibilidad',
    porchStepsPref: 'Subir escalones de entrada hasta la puerta',
    extraWaitPref: 'Esperar 60s en la puerta (Silla de ruedas / Mayor)',
    contactlessPref: 'Entrega sin contacto (Inmunocomprometido)',
    nonProfitGoods: 'Bienes Sin Fines de Lucro',
    volunteerDelivery: 'Entrega Voluntaria Gratuita',
    corporateAppFees: 'Tarifas de Aplicaciones Corporativas',
    totalDue: 'TOTAL A PAGAR',
    requestDeliveryBtn: 'Solicitar Entrega Gratuita Voluntaria →',
    etaMins: 'LLEGADA: 14 MINS',
    courierEnRoute: 'Repartidor Voluntario Marcus en Camino',
    liveTracker: '[Rastreador en Vivo OpenStreetMap]',
    navChooseItems: '1. Elegir Bienes',
    navBasket: '2. Canasta $0',
    navTrackCourier: '3. Rastrear Repartidor',

    // Volunteer PWA
    batchId: 'LOTE #OAK-409',
    loopTitle: 'Ruta East Oakland → Circuito Fruitvale',
    routeStats: '42 mins • 4.6 mi',
    stopsCompleted: 'Paradas Listas',
    desiloedRoute: 'Ruta Unificada: 2 Organizaciones → 2 Hogares',
    cboFeesSaved: '$47.50 Ahorrado en Tarifas',
    markDone: 'Marcar Listo',
    completed: 'Completado',
    navBatchRoute: '1. Ruta Activa',
    navCoopVote: '2. Voto Cooperativa',
    courierGovernance: 'Gobernanza decidim-module-courier',
    proposalTitle: 'Propuesta de Asamblea de Repartidores #206',
    proposalDesc: 'Asignar fondos municipales para 12 e-bikes de carga en centros de acopio para que voluntarios no paguen gasolina.',
    quorumMet: 'Quórum: 96% Alcanzado',
    votedSupport: 'Voto a Favor ✓',

    // Non-Profit PWA
    hubName: 'Centro de Acopio Colectivo East Oakland',
    doordashFeesSaved: 'TARIFAS AHORRADAS A CORPO',
    staffHoursSaved: 'HORAS DE PERSONAL AHORRADAS',
    navHandoff: '1. Despacho Voluntario',
    navShelfStock: '2. Inventario en Vivo',
    navCboCoop: '3. Red de Organizaciones',
    sharedFleet: 'Flota Voluntaria Compartida',
    sharedFleetDesc: 'Prepare cajas de selección de miembros para los repartidores entrantes.',
    pullFromShelf: 'Tomar de Estante',
    markReadyForCourier: 'Marcar Cajas Listas para Repartidor',
    cratesStaged: 'Cajas Listas en Rampa de Carga ✓',
    postSurplusGoods: '+ Publicar Excedentes en la App',
    itemNamePlaceholder: 'Nombre del producto (ej., Verduras y Jengibre)',
    addToCommonNeed: '+ Añadir a la Red Gratuita',
    cboFederationPriority: 'Prioridad de Enrutamiento de la Red',

    // Footer & Donation
    footerDesc: 'Creando herramientas digitales controladas por usuarios y operadas por voluntarios para ayudar a las organizaciones sin fines de lucro locales a ampliar el acceso a bienes y servicios gratuitos para familias trabajadoras.',
    getInTouch: 'Contáctenos:',
    copied: '¡Copiado!',
    taxDeductibleGift: '[ DONACIÓN DEDUCIBLE DE IMPUESTOS 501(c)(3) ]',
    supportTitle: 'Apoye a FOSS For The Common Need',
    confirmContribution: 'CONFIRMAR CONTRIBUCIÓN',
    thankYouTitle: '¡Gracias por Impulsar los Bienes Comunes!',
    copyTaxReceipt: 'Copiar Recibo Fiscal',
    done: 'Listo',
    selectedContribution: 'Contribución Seleccionada',
    yourName: 'Su Nombre (para recibo fiscal)',
    emailAddress: 'Correo Electrónico (para recibo oficial) *',
    paymentMethod: 'Método de Pago',
    creditDebit: 'Tarjeta de Crédito / Débito',
    bankAch: 'Transferencia ACH',
    dafCheck: 'Fondo DAF / Cheque',
    taxReceiptCopied: '¡Recibo Copiado!',
  },
  vi: {
    about: 'Giới thiệu',
    actions: 'Hành động',
    apps: 'Ứng dụng',
    heroTitle: 'Xây dựng Dân chủ Kinh tế thông qua Công cụ Kỹ thuật số do Người dùng Kiểm soát.',
    heroDesc: 'FOSS For The Common Need xây dựng cơ sở hạ tầng kỹ thuật số do tình nguyện viên vận hành để giúp các tổ chức phi lợi nhuận mở rộng quyền truy cập hàng hóa miễn phí cho các gia đình công nhân.',
    missionTitle: 'Bắt nguồn từ Tự quyết. Xây dựng vì Nhu cầu Chung.',
    charitableMission: 'SỨ MỆNH PHI LỢI NHUẬN 501(c)(3)',
    systemicVision: 'TẦM NHÌN HỆ THỐNG DÀI HẠN',
    whyThisMatters: 'TẠI SAO ĐIỀU NÀY QUAN TRỌNG',
    addressingProblems: 'Giải quyết Bốn Vấn đề Hàng ngày',
    ourWork: 'CÔNG VIỆC CỦA CHÚNG TÔI',
    whatWeDo: 'Những gì Chúng tôi Làm Mỗi Ngày',
    earlyPreview: 'XEM TRƯỚC ỨNG DỤNG',
    howAppsWork: 'Cách Ứng dụng Hoạt động',
    appsDesc: 'Xem trước các công cụ miễn phí giúp kết nối các tổ chức phi lợi nhuận và tình nguyện viên giao hàng đến các gia đình cần hỗ trợ.',
    accessibilityTitle: 'Cài đặt Truy cập & Ngôn ngữ',
    selectLanguage: 'Chọn Ngôn ngữ',
    textSize: 'Kích thước Chữ',
    highContrast: 'Chế độ Tương phản Cao',
    darkMode: 'Giao diện Tối',
    dyslexiaFont: 'Khoảng cách Dễ đọc',
    reducedMotion: 'Giảm Chuyển động',
    focusRing: 'Nổi bật Thẻ Đang chọn',
    readAloud: 'Đọc thành Tiếng',
    reset: 'Đặt lại',
    close: 'Đóng',

    // Section Content
    missionStatement: 'Để ứng phó với hàng thế kỷ bị tước đoạt đất đai và sức lao động, FOSS For The Common Need tạo ra các công cụ kỹ thuật số do người dùng kiểm soát và tình nguyện viên vận hành nhằm giúp các tổ chức phi lợi nhuận địa phương mở rộng quyền truy cập hàng hóa và dịch vụ miễn phí cho các gia đình công nhân.',
    visionStatement: 'Xây dựng một tương lai nơi công nghệ là hàng hóa công cộng, không phải hàng hóa tư nhân. Chúng tôi hướng tới một thế giới nơi cộng đồng làm chủ cơ sở hạ tầng kỹ thuật số của mình, đảm bảo hàng hóa và dịch vụ được phân phối theo nhu cầu.',
    pillarsDesc: 'Khi các tập đoàn lớn tăng phí giao hàng và cắt giảm thù lao, người dân cần các công cụ đơn giản do chính họ kiểm soát để giúp xóm giềng nhận thực phẩm tươi, thuốc men và nhu yếu phẩm.',
    theProblem: '[ VẤN ĐỀ ]',
    ourSolution: '[ GIẢI PHÁP ]',
    pillarWord: 'TRỤ CỘT',
    ofWord: 'TRÊN',
    swipeNavPillars: '← Vuốt trên di động hoặc chạm các thẻ trên →',
    swipeNavActivities: '← Vuốt trên di động hoặc chạm các thẻ trên để chuyển →',
    stepWord: 'Bước',

    // Economic Pillars
    p1Category: 'Ngân sách Gia đình',
    p1Title: 'Chi phí Giao hàng Tăng cao',
    p1Problem: 'Các ứng dụng giao hàng thương mại cộng thêm phí và tăng giá 30%, khiến các gia đình có ngân sách eo hẹp không thể đặt giao thực phẩm.',
    p1Solution: 'Ứng dụng cộng đồng miễn phí kết nối tài xế tình nguyện với điểm cứu trợ thực phẩm địa phương để mang nhu yếu phẩm đến tận cửa với chi phí 0đ.',
    p1Metric: 'Giao hàng miễn phí 100% không phí ẩn',

    p2Category: 'Người Điều hành',
    p2Title: 'Ứng dụng Giao hàng Thương mại',
    p2Problem: 'Các công ty giao hàng công nghệ trả lương thấp cho tài xế và ép các gia đình dùng dịch vụ đắt đỏ chỉ để chạy theo lợi nhuận.',
    p2Solution: 'Hệ thống do tình nguyện viên vận hành, nơi tài xế, tổ chức từ thiện và gia đình cùng biểu quyết cách thức giao hàng và nơi ưu tiên hỗ trợ.',
    p2Metric: 'Được quản lý bởi cộng đồng, không phải giám đốc tập đoàn',

    p3Category: 'Phi lợi nhuận',
    p3Title: 'Các Nhóm Cộng đồng Quá tải',
    p3Problem: 'Các tổ chức phi lợi nhuận và nhóm hỗ trợ mất nhiều giờ mỗi tuần để xử lý bảng tính và gọi điện thoại chỉ để điều phối giao hàng.',
    p3Solution: 'Công cụ tự động hóa đơn giản ghép nối tài xế tình nguyện với điểm giao hàng chỉ bằng 1 cú nhấp, giúp nhà tổ chức tập trung phục vụ bà con.',
    p3Metric: 'Tiết kiệm 12–18 giờ làm việc mỗi tuần cho mỗi nhóm',

    p4Category: 'Dân chủ',
    p4Title: 'Cộng đồng Không có Hỗ trợ',
    p4Problem: 'Các khu phố địa phương thường không có ngân sách hỗ trợ khi khủng hoảng, trong khi ứng dụng tư nhân lại hút tiền khỏi kinh tế địa phương.',
    p4Solution: 'Phần mềm miễn phí vĩnh viễn mà bất kỳ nhóm cộng đồng nào cũng có thể dùng để hỗ trợ lẫn nhau mà không tốn phí hàng tháng.',
    p4Metric: 'Miễn phí vĩnh viễn cho mọi nhóm cộng đồng',

    // Core Activities
    act1Title: 'Thiết kế',
    act1Subtitle: 'Xây dựng Công cụ Miễn phí',
    act1Desc: 'Chúng tôi xây dựng các ứng dụng dễ sử dụng giúp tình nguyện viên tìm tuyến đường nhanh nhất, phân phát gói thực phẩm và theo dõi giờ tình nguyện.',

    act2Title: 'Phần mềm Tự do',
    act2Subtitle: 'Giữ Công cụ Miễn phí & Công cộng',
    act2Desc: 'Chúng tôi giữ toàn bộ mã nguồn công khai để không tập đoàn nào có thể mua lại, tư nhân hóa hay thu phí người dùng.',

    act3Title: 'Hướng dẫn Miễn phí',
    act3Subtitle: 'Hướng dẫn Đơn giản & Sách Lược Mở',
    act3Desc: 'Chúng tôi viết hướng dẫn từng bước miễn phí để mọi điểm cứu trợ thực phẩm hoặc nhóm cộng đồng có thể dễ dàng thiết lập mạng lưới giao hàng.',

    act4Title: 'Đối tác',
    act4Subtitle: 'Lắng nghe Người dân',
    act4Desc: 'Chúng tôi trao đổi trực tiếp với nhân viên điểm phân phát, tình nguyện viên và bà con để thiết kế các ứng dụng dễ dùng, tôn trọng và hữu ích.',

    // PWA Categories
    catAll: 'Tất cả',
    catProduce: 'Rau củ quả',
    catPantry: 'Thực phẩm khô',
    catHotMeal: 'Bữa ăn nóng',
    catHealth: 'Y tế',
    catFamily: 'Gia đình',

    // PWA Wireframe Translations
    memberPwa: '1. Ứng dụng Thành viên',
    volunteerPwa: '2. Ứng dụng Tình nguyện viên',
    nonProfitPwa: '3. Ứng dụng Tổ chức',
    pwaHeaderMember: 'NHU CẦU CHUNG • ỨNG DỤNG THÀNH VIÊN',
    pwaHeaderVolunteer: 'NHU CẦU CHUNG • TÌNH NGUYỆN VIÊN',
    pwaHeaderNonProfit: 'NHU CẦU CHUNG • TỔ CHỨC PHI LỢI NHUẬN',
    freeBadge: '$0 MIỄN PHÍ',
    freeCoOp: '$0 HỢP TÁC XÃ',
    chooseItemsTitle: 'Chọn đúng món đồ gia đình bạn cần',
    pooledFromHubs: 'Tổng hợp từ 3 tổ chức phi lợi nhuận • Tình nguyện viên giao',
    noMeansTesting: 'Không xét duyệt thu nhập',
    immunocompromisedPriority: 'Ưu tiên người suy giảm miễn dịch',
    seniorDisabilityPriority: 'Ưu tiên người cao tuổi & khuyết tật',
    addBtn: '+ Thêm',
    multiPantryBasket: 'Giỏ hàng liên kết tổ chức',
    mobilityHandoff: 'Hỗ trợ di chuyển & tiếp cận',
    porchStepsPref: 'Mang lên bậc thềm đến tận cửa',
    extraWaitPref: 'Chờ 60s tại cửa (Người già / Khuyết tật)',
    contactlessPref: 'Giao hàng không tiếp xúc',
    nonProfitGoods: 'Hàng hóa phi lợi nhuận',
    volunteerDelivery: 'Giao hàng tình nguyện miễn phí',
    corporateAppFees: 'Phí ứng dụng thương mại',
    totalDue: 'TỔNG CỘNG',
    requestDeliveryBtn: 'Yêu cầu giao hàng tình nguyện miễn phí →',
    etaMins: 'DỰ KIẾN: 14 PHÚT',
    courierEnRoute: 'Tình nguyện viên Marcus đang giao hàng',
    liveTracker: '[Định vị trực tiếp OpenStreetMap]',
    navChooseItems: '1. Chọn hàng',
    navBasket: '2. Giỏ $0',
    navTrackCourier: '3. Theo dõi giao hàng',

    // Volunteer PWA
    batchId: 'LÔ HÀNG #OAK-409',
    loopTitle: 'Đông Oakland → Tuyến Fruitvale',
    routeStats: '42 phút • 4.6 mi',
    stopsCompleted: 'Điểm đã xong',
    desiloedRoute: 'Tuyến gộp: 2 Tổ chức → 2 Gia đình',
    cboFeesSaved: 'Tiết kiệm $47.50 phí tổ chức',
    markDone: 'Đánh dấu Xong',
    completed: 'Đã hoàn thành',
    navBatchRoute: '1. Tuyến giao hiện tại',
    navCoopVote: '2. Biểu quyết Hợp tác xã',
    courierGovernance: 'Quản trị decidim-module-courier',
    proposalTitle: 'Đề xuất Đại hội Tình nguyện viên #206',
    proposalDesc: 'Cấp ngân sách mua 12 xe đạp điện chở hàng cho các điểm phân phát để tình nguyện viên không tốn tiền xăng.',
    quorumMet: 'Tỷ lệ tham gia: 96%',
    votedSupport: 'Đã bỏ phiếu Đồng ý ✓',

    // Non-Profit PWA
    hubName: 'Trung tâm Phân phối Đông Oakland',
    doordashFeesSaved: 'TIẾT KIỆM PHÍ GIAO HÀNG',
    staffHoursSaved: 'TIẾT KIỆM GIỜ LÀM NHÂN VIÊN',
    navHandoff: '1. Bàn giao cho Tình nguyện viên',
    navShelfStock: '2. Kho hàng trực tiếp',
    navCboCoop: '3. Mạng lưới Liên kết',
    sharedFleet: 'Đội xe tình nguyện dùng chung',
    sharedFleetDesc: 'Đóng gói sẵn các thùng hàng thành viên đã chọn cho tình nguyện viên.',
    pullFromShelf: 'Lấy từ kệ',
    markReadyForCourier: 'Đánh dấu Thùng hàng Sẵn sàng',
    cratesStaged: 'Thùng hàng đã sẵn sàng ở bãi bốc xếp ✓',
    postSurplusGoods: '+ Đăng hàng dư thừa lên ứng dụng',
    itemNamePlaceholder: 'Tên món hàng (VD: Rau tươi & Gừng)',
    addToCommonNeed: '+ Thêm vào Nhu cầu Chung',
    cboFederationPriority: 'Mức ưu tiên tuyến giao liên kết',

    // Footer & Donation
    footerDesc: 'Xây dựng công cụ kỹ thuật số do người dùng kiểm soát và tình nguyện viên vận hành để mở rộng quyền truy cập hàng hóa miễn phí.',
    getInTouch: 'Liên hệ với chúng tôi:',
    copied: 'Đã sao chép!',
    taxDeductibleGift: '[ QUYÊN GÓP ĐƯỢC TRỪ THUẾ 501(c)(3) ]',
    supportTitle: 'Ủng hộ FOSS For The Common Need',
    confirmContribution: 'XÁC NHẬN QUYÊN GÓP',
    thankYouTitle: 'Cảm ơn bạn đã đóng góp cho Cộng đồng!',
    copyTaxReceipt: 'Sao chép Hóa đơn Thuế',
    done: 'Hoàn tất',
    selectedContribution: 'Khoản đóng góp đã chọn',
    yourName: 'Tên của bạn (Hóa đơn thuế)',
    emailAddress: 'Địa chỉ Email (Nhận hóa đơn) *',
    paymentMethod: 'Phương thức thanh toán',
    creditDebit: 'Thẻ tín dụng / Ghi nợ',
    bankAch: 'Chuyển khoản Ngân hàng',
    dafCheck: 'Quỹ DAF / Séc',
    taxReceiptCopied: 'Đã sao chép Hóa đơn!',
  },
  zh: {
    about: '关于我们',
    actions: '核心行动',
    apps: '应用预览',
    heroTitle: '通过用户控制的数字工具建立经济民主。',
    heroDesc: 'FOSS For The Common Need 构建由志愿者驱动的开源数字基础设施，帮助本地非营利组织向工薪阶层家庭提供免费的日常必需品。',
    missionTitle: '立足自主决定，服务公共需求。',
    charitableMission: '501(c)(3) 慈善使命',
    systemicVision: '长期系统性愿景',
    whyThisMatters: '为什么这很重要',
    addressingProblems: '解决四个日常问题',
    ourWork: '我们的工作',
    whatWeDo: '我们每天在做的事',
    earlyPreview: '应用早期预览',
    howAppsWork: '应用如何运作',
    appsDesc: '提前预览我们正在构建的免费工具。它们将非营利组织、志愿者配送员与有需要的家庭连接起来，免费提供基本生活用品。',
    accessibilityTitle: '无障碍与语言设置',
    selectLanguage: '选择语言',
    textSize: '文字大小',
    highContrast: '高对比度模式',
    darkMode: '深色主题',
    dyslexiaFont: '阅读友好间距',
    reducedMotion: '减少动画效果',
    focusRing: '突出显示焦点元素',
    readAloud: '朗读文本 (Text-to-Speech)',
    reset: '重置默认',
    close: '关闭',

    // Section Content
    missionStatement: '为应对几个世纪以来被剥夺的土地与劳动，FOSS For The Common Need 构建由用户控制、志愿者驱动的开源数字基础设施，帮助本地非营利组织向工薪阶层家庭扩大免费日常物资与服务的普及。',
    visionStatement: '构建一个将技术视为公共产品而非私人商品的未来。我们憧憬这样一个世界：社区拥有自己的数字基础设施，确保物资与服务严格按照需求进行平等分发。',
    pillarsDesc: '随着商业巨头不断提高配送费并削减劳动报酬，普通民众需要由自己完全掌控的简便工具，帮助邻里社区获取新鲜食物、药品和生活必需品。',
    theProblem: '[ 存在的问题 ]',
    ourSolution: '[ 我们的解决方案 ]',
    pillarWord: '支柱',
    ofWord: '/',
    swipeNavPillars: '← 在移动端滑动或点击上方标签切换 →',
    swipeNavActivities: '← 在移动端滑动或点击上方卡片导航 →',
    stepWord: '步骤',

    // Economic Pillars
    p1Category: '家庭预算',
    p1Title: '飞涨的配送成本',
    p1Problem: '商业配送软件加收额外服务费并将物资价格抬高30%，使得预算紧张的家庭无法承受配送服务。',
    p1Solution: '一款免费的社区应用，将志愿者驱动的配送员与本地物资点连接起来，将食品包以100%零成本送达家门口。',
    p1Metric: '100% 免费配送，零隐藏费用',

    p2Category: '掌权者',
    p2Title: '商业垄断配送平台',
    p2Problem: '大型科技配送公司削减零工工人报酬，将家庭锁入昂贵的服务中，仅为了追逐商业利润。',
    p2Solution: '由志愿者驱动的系统，本地配送员、慈善机构与受助家庭共同投票决定配送方式与优先援助顺序。',
    p2Metric: '由社区共同运营，而非商业高管掌控',

    p3Category: 'Non-Profits',
    p3Title: '不堪重负的社区组织',
    p3Problem: '非营利组织与互助小组每周浪费宝贵的时间来整理繁琐的表格和接听电话，仅为了协调物资配送。',
    p3Solution: '简便的一键式自动化工具，将志愿者配送员与社区需求精准匹配，让组织者专注于服务邻里。',
    p3Metric: '每个小组每周可节省 12–18 小时的繁琐工作',

    p4Category: 'Democracy',
    p4Title: '缺乏支持的城镇与社区',
    p4Problem: '本地城镇与社区在危机期间常常缺乏救助预算，而商业软件又不断从本地经济中抽走资金。',
    p4Solution: '永久免费的开源软件，任何城镇或社区小组都可以永久免费使用，相互扶持而无需支付月费。',
    p4Metric: '面向任何城镇或社区小组永久免费',

    // Core Activities
    act1Title: '设计',
    act1Subtitle: '构建免费配送工具',
    act1Desc: '我们开发简单易用的应用程序，帮助志愿者配送员规划最快的路线、将物资精准分配至各家庭并记录服务时长。',

    act2Title: '开源软件',
    act2Subtitle: '保障工具公共与永久免费',
    act2Desc: '我们保持所有软件代码公开透明，确保没有任何商业公司能够收购、私有化或将其置于付费墙之后。',

    act3Title: '免费指南',
    act3Subtitle: '简明指南与开源操作手册',
    act3Desc: '我们编写免费的分步指南，让任何本地食品库、社区中心或邻里小组都能轻松搭建属于自己的免费配送网络。',

    act4Title: '社区合作',
    act4Subtitle: '倾听社区与群众的声音',
    act4Desc: '我们与本地食品库工作人员、志愿者配送员和受助家庭坐在一起，设计真正简单、尊重且切实有用的软件。',

    // PWA Categories
    catAll: '全部',
    catProduce: '生鲜果蔬',
    catPantry: '粮油干货',
    catHotMeal: '热餐熟食',
    catHealth: '医疗健康',
    catFamily: '母婴家庭',

    // PWA Wireframe Translations
    memberPwa: '1. 居民端 PWA',
    volunteerPwa: '2. 志愿者端 PWA',
    nonProfitPwa: '3. 非营利组织端 PWA',
    pwaHeaderMember: '公共需求 • 居民端应用',
    pwaHeaderVolunteer: '公共需求 • 志愿者配送端',
    pwaHeaderNonProfit: '公共需求 • 组织管理端',
    freeBadge: '$0 免费',
    freeCoOp: '$0 合作社免费',
    chooseItemsTitle: '精准选择您家庭所需的物资',
    pooledFromHubs: '汇总来自 3 家本地非营利物资点 • 志愿者无偿配送',
    noMeansTesting: '无需财产审查',
    immunocompromisedPriority: '免疫受损人群优先',
    seniorDisabilityPriority: '长者及残障人士优先',
    addBtn: '+ 添加',
    multiPantryBasket: '多机构联合配送篮',
    mobilityHandoff: '无障碍与行动辅助交接',
    porchStepsPref: '送货上门（需上门口台阶）',
    extraWaitPref: '在门口等待 60 秒（行动不便 / 长者）',
    contactlessPref: '无接触式放置（免疫防护）',
    nonProfitGoods: '非营利公益物资',
    volunteerDelivery: '志愿者无偿配送',
    corporateAppFees: '商业软件溢价与服务费',
    totalDue: '应付总额',
    requestDeliveryBtn: '申请免费志愿者配送 →',
    etaMins: '预计到达：14 分钟',
    courierEnRoute: '志愿者配送员 Marcus 正在送货途中',
    liveTracker: '[OpenStreetMap 实时配送追踪]',
    navChooseItems: '1. 选择物资',
    navBasket: '2. $0 物资篮',
    navTrackCourier: '3. 追踪配送',

    // Volunteer PWA
    batchId: '批次号 #OAK-409',
    loopTitle: '东奥克兰 → Fruitvale 环线',
    routeStats: '42 分钟 • 4.6 英里',
    stopsCompleted: '已完成站点',
    desiloedRoute: '多机构联合路线：2 家机构 → 2 个家庭',
    cboFeesSaved: '已为机构节省 $47.50 费用',
    markDone: '标记完成',
    completed: '已完成',
    navBatchRoute: '1. 当前配送路线',
    navCoopVote: '2. 合作社投票',
    courierGovernance: 'decidim-module-courier 社区治理',
    proposalTitle: '志愿者配送员大会 206 号提案',
    proposalDesc: '拨款在物资点配备 12 辆电动载货自行车，让志愿者无需自付油费。',
    quorumMet: '法定人数：96% 已达标',
    votedSupport: '已投赞成票 ✓',

    // Non-Profit PWA
    hubName: '东奥克兰物资联合分发中心',
    doordashFeesSaved: '已节省商业配送费',
    staffHoursSaved: '已节省工作人员工时',
    navHandoff: '1. 志愿者交接',
    navShelfStock: '2. 实时库存',
    navCboCoop: '3. 机构联盟',
    sharedFleet: '共享志愿者车队',
    sharedFleetDesc: '为到场的志愿者配送员提前打包居民自选物资箱。',
    pullFromShelf: '货架取货',
    markReadyForCourier: '标记物资箱已就绪',
    cratesStaged: '物资箱已在装卸区就绪 ✓',
    postSurplusGoods: '+ 发布余缺物资到居民端应用',
    itemNamePlaceholder: '物资名称（如：新鲜蔬菜与姜）',
    addToCommonNeed: '+ 添加到公共需求网络',
    cboFederationPriority: '联盟路线调度优先级',

    // Footer & Donation
    footerDesc: '构建由用户控制、志愿者驱动的开源数字基础设施，帮助本地非营利组织扩大免费物资覆盖面。',
    getInTouch: '联系我们：',
    copied: '已复制！',
    taxDeductibleGift: '[ 501(c)(3) 免税捐赠 ]',
    supportTitle: '支持 FOSS For The Common Need',
    confirmContribution: '确认捐赠金额',
    thankYouTitle: '感谢您为公共事业助力！',
    copyTaxReceipt: '复制捐赠收据',
    done: '完成',
    selectedContribution: '已选捐赠金额',
    yourName: '您的姓名（用于捐赠收据）',
    emailAddress: '电子邮箱（接收官方收据）*',
    paymentMethod: '支付方式',
    creditDebit: '信用卡 / 借记卡',
    bankAch: '银行 ACH 转账',
    dafCheck: 'DAF 基金 / 支票',
    taxReceiptCopied: '已复制捐赠收据！',
  },
  ar: {
    about: 'عن المبادرة',
    actions: 'الإجراءات',
    apps: 'التطبيقات',
    heroTitle: 'بناء الديمقراطية الاقتصادية من خلال أدوات رقمية يتحكم فيها المستخدم.',
    heroDesc: 'تبني FOSS For The Common Need بنية تحتية رقمية مجانية يديرها متطوعون لمساعدة الجمعيات المحلية على توفير السلع الأساسية مجانًا للأسر العاملة.',
    missionTitle: 'مبنية على تقرير المصير. مخصصة للحاجة المشتركة.',
    charitableMission: 'مهمة خيرية معفاة من الضرائب 501(c)(3)',
    systemicVision: 'رؤية نظامية طويلة الأجل',
    whyThisMatters: 'لماذا هذا مهم',
    addressingProblems: 'معالجة أربع مشكلات يومية',
    ourWork: 'عملنا',
    whatWeDo: 'ما نفعله كل يوم',
    earlyPreview: 'معاينة التطبيق',
    howAppsWork: 'كيف تعمل التطبيقات',
    appsDesc: 'نظرة أولية على الأدوات المجانية التي نبنيها لربط المنظمات غير الربحية والمتطوعين بالأسر المحتاجة.',
    accessibilityTitle: 'إعدادات إمكانية الوصول واللغة',
    selectLanguage: 'اختر اللغة',
    textSize: 'حجم النص',
    highContrast: 'وضع التباين العالي',
    darkMode: 'الوضع الداكن',
    dyslexiaFont: 'تباعد مريح للقراءة',
    reducedMotion: 'تقليل الحركة والرسوم المتحركة',
    focusRing: 'تمييز العناصر النشطة',
    readAloud: 'القراءة الصوتية النصية',
    reset: 'إعادة ضبط',
    close: 'إغلاق',

    // Section Content
    missionStatement: 'رداً على قرون من استغلال الأراضي والعمالة، تُنشئ FOSS For The Common Need أدوات رقمية مجانية يديرها متطوعون لمساعدة الجمعيات المحلية على توفير السلع والخدمات المجانية للأسر العاملة.',
    visionStatement: 'بناء مستقبل تكون فيه التكنولوجيا خيرًا عامًا وليست سلعة خاصة. نطمح إلى عالم تمتلك فيه المجتمعات بنيتها التحتية الرقمية، مما يضمن توزيع السلع والخدمات وفقًا للحاجة.',
    pillarsDesc: 'مع رفع الشركات الكبرى لرسوم التوصيل وتخفيض الأجور، يحتاج عامة الناس إلى أدوات بسيطة يتحكمون فيها لمساعدة أحيائهم للحصول على الأغذية الطازجة والأدوية والمستلزمات الأساسية.',
    theProblem: '[ المشكلة ]',
    ourSolution: '[ حلنا ]',
    pillarWord: 'الركيزة',
    ofWord: 'من',
    swipeNavPillars: '← اسحب على الهاتف أو اضغط على الأزرار أعلاه →',
    swipeNavActivities: '← اسحب على الهاتف أو انقر فوق الأزرار للتنقل →',
    stepWord: 'الخطوة',

    // Economic Pillars
    p1Category: 'ميزانيات الأسرة',
    p1Title: 'تكاليف التوصيل المرتفعة',
    p1Problem: 'تضيف تطبيقات التوصيل التجارية رسومًا إضافية وترفع الأسعار بنسبة 30%، مما يجعل توصيل الطعام مستحيلاً للأسر ذات الميزانيات المحدودة.',
    p1Solution: 'تطبيق مجتمعي مجاني يربط السائقين المتطوعين بالمراكز المحلية لتوصيل المواد الغذائية وحزم الرعاية إلى الأبواب مجانًا بنسبة 100%.',
    p1Metric: 'توصيل مجاني 100% بدون أي رسوم خفية',

    p2Category: 'الأشخاص المسؤولون',
    p2Title: 'تطبيقات التوصيل التجارية',
    p2Problem: 'تدفع شركات التوصيل الكبرى أجورًا متدنية للعمال وتوقع الأسر في خدمات مكلفة بحثًا عن أرباح الشركات.',
    p2Solution: 'نظام يديره المتطوعون حيث يصوت السائقون والجمعيات والأسر معا حول كيفية عمل التوصيل وأولويات المساعدة.',
    p2Metric: 'يدار من قبل المجتمع وليس من قبل التنفيذيين',

    p3Category: 'Non-Profits',
    p3Title: 'المجموعات المجتمعية المجهدة',
    p3Problem: 'تضيع المنظمات غير الربحية ومجموعات التضامن ساعات ثمينة أسبوعيًا في إدارة الجداول والاتصالات للتنسيق.',
    p3Solution: 'أداة مؤتمتة بسيطة تربط السائقين المتطوعين بالتوصيلات المجتمعية بضغطة زر، مما يتيح للمنظمات التركيز على خدمة الجيران.',
    p3Metric: 'يوفر 12-18 ساعة من العمل الإداري أسبوعيًا لكل مجموعة',

    p4Category: 'Democracy',
    p4Title: 'البلدات المتروكة دون دعم',
    p4Problem: 'غالباً ما تفتقر البلدات والأحياء إلى الميزانية المخصصة للمساعدة أثناء الأزمات، بينما تسحب التطبيقات الخاصة الأموال.',
    p4Solution: 'برمجيات دائمة ومجانية يمكن لأي بلدة أو مجموعة استخدامها للأبد لدعم بعضهم البعض دون دفع رسوم شهرية.',
    p4Metric: 'مجاني للأبد لأي بلدة أو مجموعة مجتمعية',

    // Core Activities
    act1Title: 'التصميم',
    act1Subtitle: 'بناء أدوات توصيل مجانية',
    act1Desc: 'نبني تطبيقات سهلة الاستخدام تساعد السائقين المتطوعين في العثور على أسرع الطرق وتوزيع حزم الأغذية وتسجيل ساعات التطوع.',

    act2Title: 'البرمجيات الحرة',
    act2Subtitle: 'الحفاظ على الأدوات مجانية وعامة',
    act2Desc: 'نحافظ على جميع شفرات البرمجيات مفتوحة وعامة حتى لا تتمكن أي شركة من شرائها أو خصخصتها أو فرض رسوم عليها.',

    act3Title: 'الأدلة المجانية',
    act3Subtitle: 'أدلة بسيطة وكتيبات مفتوحة',
    act3Desc: 'نكتب أدلة مجانية خطوة بخطوة حتى يتمكن أي بنك طعام أو بلدية أو مجموعة أهليّة من إنشاء شبكة توصيل مجانية.',

    act4Title: 'الشراكات',
    act4Subtitle: 'الاستماع إلى الناس',
    act4Desc: 'نجلس مباشرة مع عمال بنوك الطعام والسائقين المتطوعين والأسر لتصميم تطبيقات سهلة ومحترمة ومفيدة حقًا.',

    // PWA Categories
    catAll: 'الكل',
    catProduce: 'خضار وفواكه',
    catPantry: 'المؤن',
    catHotMeal: 'وجبات ساخنة',
    catHealth: 'الصحة',
    catFamily: 'الأسرة',

    // PWA Wireframe Translations
    memberPwa: '1. تطبيق المستفيد',
    volunteerPwa: '2. تطبيق المتطوع',
    nonProfitPwa: '3. تطبيق المنظمة',
    pwaHeaderMember: 'الحاجة المشتركة • تطبيق المستفيد',
    pwaHeaderVolunteer: 'الحاجة المشتركة • تطبيق المتطوع',
    pwaHeaderNonProfit: 'الحاجة المشتركة • تطبيق المنظمة',
    freeBadge: '$0 مجاناً',
    freeCoOp: '$0 تعاوني مجاني',
    chooseItemsTitle: 'اختر المواد التي تحتاجها أسرتك بالضبط',
    pooledFromHubs: 'تجميع من 3 مراكز محلية • توصيل تطوعي',
    noMeansTesting: 'بدون شروط دخل تعجيزية',
    immunocompromisedPriority: 'أولوية لضعاف المناعة',
    seniorDisabilityPriority: 'أولوية لكبار السن وذوي الإعاقة',
    addBtn: '+ إضافة',
    multiPantryBasket: 'سلة مشتركة من عدة مراكز',
    mobilityHandoff: 'توصيل مخصص لسريعي التأثر وسهولة الوصول',
    porchStepsPref: 'الصعود لدرجات المدخل حتى الباب',
    extraWaitPref: 'الانتظار 60 ثانية عند الباب (كبار السن / الإعاقة)',
    contactlessPref: 'توصيل بدون تلامس (لحماية المناعة)',
    nonProfitGoods: 'مواد غير ربحية',
    volunteerDelivery: 'توصيل تطوعي مجاني',
    corporateAppFees: 'رسوم التطبيقات التجارية',
    totalDue: 'المبلغ الإجمالي',
    requestDeliveryBtn: 'طلب توصيل تطوعي مجاني ←',
    etaMins: 'الوصول: خلال 14 دقيقة',
    courierEnRoute: 'المتطوع ماركوس في الطريق إليك',
    liveTracker: '[تتبع مباشر عبر الخريطة المفتوحة]',
    navChooseItems: '1. اختيار المواد',
    navBasket: '2. سلة $0',
    navTrackCourier: '3. تتبع السائق',

    // Volunteer PWA
    batchId: 'دفعة رقم #OAK-409',
    loopTitle: 'مسار شرق أوكلاند → فروتفيل',
    routeStats: '42 دقيقة • 4.6 ميل',
    stopsCompleted: 'محطات مكتملة',
    desiloedRoute: 'مسار موحد: مركزان → منزلان',
    cboFeesSaved: 'وفرت 47.50$ من رسوم المنظمات',
    markDone: 'تحديد كمنجز',
    completed: 'مكتمل',
    navBatchRoute: '1. المسار النشط',
    navCoopVote: '2. تصويت التعاونية',
    courierGovernance: 'إدارة decidim-module-courier',
    proposalTitle: 'مقترح الجمعية العمومية للمتطوعين رقم #206',
    proposalDesc: 'تخصيص منح للبلدية لتوفير 12 دراجة كهربائية للشحن في المراكز حتى لا يدفع المتطوعون الوقود من جيبهم.',
    quorumMet: 'النصاب: 96% مكتمل',
    votedSupport: 'تم التصويت بالتأييد ✓',

    // Non-Profit PWA
    hubName: 'مركز توزيع شرق أوكلاند الموحد',
    doordashFeesSaved: 'وفرت رسوم التطبيقات التجارية',
    staffHoursSaved: 'وفرت ساعات عمل الموظفين',
    navHandoff: '1. تسليم المتطوعين',
    navShelfStock: '2. مخزون الرف المباشر',
    navCboCoop: '3. شبكة التعاونيات',
    sharedFleet: 'أسطول المتطوعين المشترك',
    sharedFleetDesc: 'تجهيز الصناديق المختارة مسبقاً قبل وصول المتطوعين.',
    pullFromShelf: 'سحب من الرف',
    markReadyForCourier: 'تحديد الصناديق كجاهزة للتسليم',
    cratesStaged: 'الصناديق جاهزة في منطقة التحميل ✓',
    postSurplusGoods: '+ نشر الفائض إلى تطبيق المستفيدين',
    itemNamePlaceholder: 'اسم المادة (مثل: خضروات طازجة وزنجبيل)',
    addToCommonNeed: '+ إضافة إلى شبكة الحاجة المشتركة',
    cboFederationPriority: 'أولوية توجيه اتحاد الجمعيات',

    // Footer & Donation
    footerDesc: 'بناء أدوات رقمية مجانية يديرها متطوعون لمساعدة الجمعيات على توفير المواد الأساسية للأسر العاملة.',
    getInTouch: 'تواصل معنا:',
    copied: 'تم النسخ!',
    taxDeductibleGift: '[ تبرع معفى من الضرائب 501(c)(3) ]',
    supportTitle: 'دعم FOSS For The Common Need',
    confirmContribution: 'تأكيد التبرع',
    thankYouTitle: 'شكراً لدعمك للخير العام!',
    copyTaxReceipt: 'نسخ إيصال التبرع',
    done: 'تم',
    selectedContribution: 'المساهمة المختارة',
    yourName: 'اسمك (لإيصال الضريبة)',
    emailAddress: 'البريد الإلكتروني (لإيصال الدفع) *',
    paymentMethod: 'طريقة الدفع',
    creditDebit: 'بطاقة ائتمان / خصم',
    bankAch: 'تحويل بانكي ACH',
    dafCheck: 'صندوق DAF / شيك',
    taxReceiptCopied: 'تم نسخ الإيصال!',
  },
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('foss_a11y_settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply CSS root attribute modifications when settings change
  useEffect(() => {
    localStorage.setItem('foss_a11y_settings', JSON.stringify(settings));

    const root = document.documentElement;

    // Font size
    root.setAttribute('data-a11y-size', settings.fontSize);

    // Contrast
    root.setAttribute('data-a11y-contrast', settings.contrast);

    // Dark Mode Theme
    root.setAttribute('data-a11y-theme', settings.darkMode ? 'dark' : 'light');

    // Dyslexic font & spacing
    root.setAttribute('data-a11y-dyslexic', String(settings.dyslexicFont));

    // Reduced motion
    root.setAttribute('data-a11y-motion', String(settings.reducedMotion));

    // Focus highlights
    root.setAttribute('data-a11y-focus', String(settings.focusHighlights));

    // RTL for Arabic
    if (settings.language === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', settings.language);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    stopSpeech();
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langCodeMap: Record<LanguageCode, string> = {
      en: 'en-US',
      es: 'es-ES',
      vi: 'vi-VN',
      zh: 'zh-CN',
      ar: 'ar-SA',
    };
    utterance.lang = langCodeMap[settings.language] || 'en-US';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        t,
        speakText,
        stopSpeech,
        isSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
