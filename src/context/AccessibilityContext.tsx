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
    footerDesc: 'Creando herramientas digitales controladas por usuarios y operadas por voluntarios para expandir el acceso a bienes gratuitos.',
    getInTouch: 'Contáctenos:',
    copied: '¡Copiado!',
    taxDeductibleGift: '[ DONACIÓN DEDUCIBLE DE IMPUESTOS 501(c)(3) ]',
    supportTitle: 'Apoye a FOSS For The Common Need',
    confirmContribution: 'CONFIRMAR CONTRIBUCIÓN',
    thankYouTitle: '¡Gracias por Impulsar los Bienes Comunes!',
    copyTaxReceipt: 'Copiar Recibo Fiscal',
    done: 'Listo',
  },
  vi: {
    about: 'Giới thiệu',
    actions: 'Hành động',
    apps: 'Ứng dụng',
    heroTitle: 'Xây dựng Dân chủ Kinh tế thông qua Công cụ Kỹ thuật số do Người dùng Kiểm soát.',
    heroDesc: 'FOSS For The Common Need xây dựng cơ sở hạ tầng kỹ thuật số do tình nguyện viên vận hành để giúp các tổ chức phi lợi nhuận mở rộng quyền truy cập hàng hóa miễn phí cho các gia đình công nhân.',
    missionTitle: 'Bắt nguồn từ Tự quyết. Xây dựng vì Nhu cầu Chung.',
    charitableMission: 'SỨ MỆNH SỪ DỤNG MỤC PHI LỢI NHUẬN 501(c)(3)',
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
