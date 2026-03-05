import type { Lang } from "../context/LanguageContext";

const translations: Record<string, Record<Lang, string>> = {
  appName: { en: "Fresh Choice Organic", te: "ఫ్రెష్ చాయిస్ ఆర్గానిక్" },
  farmToDoorstep: { en: "Farm to doorstep", te: "పొలం నుండి మీ ఇంటికి" },
  certifications: { en: "Certifications", te: "సర్టిఫికేషన్లు" },
  freeDelivery: { en: "Free Delivery", te: "ఉచిత డెలివరీ" },
  rating: { en: "4.9 Rating", te: "4.9 రేటింగ్" },
  fssaiCertified: { en: "FSSAI Certified", te: "FSSAI సర్టిఫైడ్" },
  heroTitle: {
    en: "From Our Farm, To Your Table",
    te: "మా పొలం నుండి, మీ భోజనం వరకు",
  },
  productsAvailableSingular: {
    en: "product available",
    te: "ఉత్పత్తి అందుబాటులో",
  },
  productsAvailablePlural: {
    en: "products available",
    te: "ఉత్పత్తులు అందుబాటులో",
  },
  eggs: { en: "Eggs", te: "గుడ్లు" },
  honey: { en: "Honey", te: "తేనె" },
  chicken: { en: "Chicken", te: "చికెన్" },
  rawUnfiltered: { en: "Raw & Unfiltered", te: "ముడి & వడపోయని" },
  addToCart: { en: "Add to Cart", te: "కార్ట్‌కు జోడించు" },
  contactUs: { en: "Contact Us", te: "సంప్రదించండి" },
  quickLinks: { en: "Quick Links", te: "త్వరిత లింక్లు" },
  allOrders: { en: "All Orders", te: "అన్ని ఆర్డర్లు" },
  followUs: { en: "Follow Us", te: "మమ్మల్ని అనుసరించండి" },
  scanToConnect: { en: "Scan to Connect", te: "స్కాన్ చేయండి" },
  scanToWhatsapp: { en: "Scan to WhatsApp", te: "WhatsApp కోసం స్కాన్" },
  instagramHandle: { en: "@FreshChoiceOrganic", te: "@FreshChoiceOrganic" },
  builtWith: {
    en: "Built with ♥ using caffeine.ai",
    te: "Built with ♥ using caffeine.ai",
  },
  checkout: { en: "Checkout", te: "చెక్అవుట్" },
  itemsInCartSingular: { en: "item in cart", te: "కార్ట్‌లో వస్తువు" },
  itemsInCartPlural: { en: "items in cart", te: "కార్ట్‌లో వస్తువులు" },
  orderSummary: { en: "Order Summary", te: "ఆర్డర్ సారాంశం" },
  deliveryDetails: { en: "Delivery Details", te: "డెలివరీ వివరాలు" },
  fullName: { en: "Full Name *", te: "పూర్తి పేరు *" },
  phoneNumber: { en: "Phone Number *", te: "ఫోన్ నంబర్ *" },
  deliveryAddress: { en: "Delivery Address *", te: "డెలివరీ చిరునామా *" },
  paymentMethod: { en: "Payment Method", te: "చెల్లింపు పద్ధతి" },
  upiPayment: { en: "UPI Payment", te: "UPI చెల్లింపు" },
  recommended: { en: "Recommended", te: "సిఫార్సు చేయబడింది" },
  payViaUpi: {
    en: "Pay via any UPI app (PhonePe, GPay, Paytm etc.)",
    te: "ఏదైనా UPI యాప్ ద్వారా చెల్లించండి",
  },
  scanAndPay: { en: "Scan & Pay", te: "స్కాన్ & చెల్లించు" },
  tapToEnlarge: { en: "Tap to enlarge", te: "పెద్దది చేయడానికి నొక్కండి" },
  scanToPay: { en: "Scan to Pay", te: "చెల్లించడానికి స్కాన్" },
  orPayToUpiId: { en: "Or pay to UPI ID", te: "లేదా UPI ID కి చెల్లించండి" },
  cashOnDelivery: { en: "Cash on Delivery", te: "డెలివరీలో నగదు" },
  payWithCash: {
    en: "Pay with cash when your order arrives",
    te: "ఆర్డర్ వచ్చినప్పుడు నగదు చెల్లించండి",
  },
  placeOrder: { en: "Place Order", te: "ఆర్డర్ చేయండి" },
  placingOrder: { en: "Placing Order...", te: "ఆర్డర్ చేస్తోంది..." },
  agreeToTerms: {
    en: "By placing order, you agree to our terms of service",
    te: "ఆర్డర్ చేయడం ద్వారా మీరు మా నిబంధనలకు అంగీకరిస్తున్నారు",
  },
  browseProducts: { en: "Browse Products", te: "ఉత్పత్తులు చూడండి" },
  cartIsEmpty: { en: "Your cart is empty", te: "మీ కార్ట్ ఖాళీగా ఉంది" },
  addBeforeCheckout: {
    en: "Add some products before checking out",
    te: "చెక్అవుట్ చేయడానికి ముందు ఉత్పత్తులు జోడించండి",
  },
  orderConfirmed: { en: "Order Confirmed", te: "ఆర్డర్ నిర్ధారించబడింది" },
  orderPlaced: { en: "Order Placed! 🎉", te: "ఆర్డర్ చేయబడింది! 🎉" },
  productsOnWay: {
    en: "Your fresh farm products are on their way.",
    te: "మీ తాజా వ్యవసాయ ఉత్పత్తులు మార్గంలో ఉన్నాయి.",
  },
  orderId: { en: "Order ID", te: "ఆర్డర్ ID" },
  orderDetails: { en: "Order Details", te: "ఆర్డర్ వివరాలు" },
  totalAmount: { en: "Total Amount", te: "మొత్తం మొత్తం" },
  payment: { en: "Payment", te: "చెల్లింపు" },
  deliveryTo: { en: "Delivery to", te: "డెలివరీ" },
  status: { en: "Status", te: "స్థితి" },
  continueShopping: { en: "Continue Shopping", te: "షాపింగ్ కొనసాగించండి" },
  viewAllOrders: { en: "View All Orders", te: "అన్ని ఆర్డర్లు చూడండి" },
  qualityYouCanTrust: {
    en: "Quality You Can Trust",
    te: "నమ్మదగిన నాణ్యత",
  },
  freshChoiceCertified: {
    en: "Fresh Choice Organic is certified and tested to bring you the safest, freshest farm products.",
    te: "ఫ్రెష్ చాయిస్ ఆర్గానిక్ సర్టిఫైడ్ మరియు పరీక్షించబడింది.",
  },
  fssaiFoodSafety: {
    en: "FSSAI Food Safety License",
    te: "FSSAI ఆహార భద్రత లైసెన్స్",
  },
  foodSafetyAuthority: {
    en: "Food Safety & Standards Authority of India",
    te: "ఆహార భద్రత & ప్రమాణాల అథారిటీ ఆఫ్ ఇండియా",
  },
  honeyLabCert: {
    en: "Honey Lab Test Certificate",
    te: "తేనె ల్యాబ్ పరీక్షా సర్టిఫికేట్",
  },
  uploadDocument: { en: "Upload Document", te: "పత్రాన్ని అప్‌లోడ్ చేయండి" },
  replaceDocument: { en: "Replace Document", te: "పత్రాన్ని మార్చండి" },
  licensesTitle: {
    en: "Licenses & Quality Proofs",
    te: "లైసెన్స్లు & నాణ్యత నిరూపణలు",
  },
  allProductsCertified: {
    en: "All our products are certified and tested for quality",
    te: "మా అన్ని ఉత్పత్తులు నాణ్యత కోసం సర్టిఫైడ్ మరియు పరీక్షించబడ్డాయి",
  },
  farmFreshDeliveries: {
    en: "Farm Fresh Deliveries",
    te: "పొలం తాజా డెలివరీలు",
  },
  loadingOrders: { en: "Loading orders...", te: "ఆర్డర్లు లోడ్ అవుతున్నాయి..." },
  loadingYourOrder: {
    en: "Loading your order...",
    te: "మీ ఆర్డర్ లోడ్ అవుతోంది...",
  },
  noOrdersYet: { en: "No orders yet", te: "ఇంకా ఆర్డర్లు లేవు" },
  ordersWillAppear: {
    en: "Orders will appear here once customers start placing them.",
    te: "కస్టమర్లు ఆర్డర్లు చేసిన తర్వాత ఇక్కడ కనిపిస్తాయి.",
  },
  goToShop: { en: "Go to Shop", te: "షాప్‌కి వెళ్ళండి" },
  pleaseFixErrors: {
    en: "Please fix the errors before placing your order",
    te: "ఆర్డర్ చేయడానికి ముందు లోపాలను సరిచేయండి",
  },
  failedToPlaceOrder: {
    en: "Failed to place order. Please try again.",
    te: "ఆర్డర్ చేయడం విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
  },
  upiCopied: {
    en: "UPI ID copied to clipboard!",
    te: "UPI ID కాపీ చేయబడింది!",
  },
  fullNameRequired: {
    en: "Full name is required",
    te: "పూర్తి పేరు అవసరం",
  },
  phoneRequired: {
    en: "Phone number is required",
    te: "ఫోన్ నంబర్ అవసరం",
  },
  validPhone: {
    en: "Enter a valid 10-digit Indian phone number",
    te: "చెల్లుబాటు అయ్యే 10 అంకెల ఇండియన్ ఫోన్ నంబర్ నమోదు చేయండి",
  },
  addressRequired: {
    en: "Delivery address is required",
    te: "డెలివరీ చిరునామా అవసరం",
  },
  enterUpiRef: {
    en: "Please enter your UPI transaction reference ID",
    te: "దయచేసి మీ UPI లావాదేవీ సూచన ID నమోదు చేయండి",
  },
  orderStatusUpdated: {
    en: "Order status updated to",
    te: "ఆర్డర్ స్థితి నవీకరించబడింది",
  },
  failedToUpdateStatus: {
    en: "Failed to update order status",
    te: "ఆర్డర్ స్థితిని నవీకరించడం విఫలమైంది",
  },
  totalOrderSingular: { en: "total order", te: "మొత్తం ఆర్డర్" },
  totalOrderPlural: { en: "total orders", te: "మొత్తం ఆర్డర్లు" },
  customer: { en: "Customer", te: "కస్టమర్" },
  items: { en: "Items", te: "వస్తువులు" },
  total: { en: "Total", te: "మొత్తం" },
  updateStatus: { en: "Update Status:", te: "స్థితిని నవీకరించండి:" },
  upiTransactionRef: {
    en: "UPI Transaction Reference / UTR ID *",
    te: "UPI లావాదేవీ సూచన / UTR ID *",
  },
  afterPaymentEnterUtr: {
    en: "After making the payment, enter your UPI Transaction Reference / UTR number below",
    te: "చెల్లింపు చేసిన తర్వాత, మీ UPI లావాదేవీ సూచన / UTR నంబర్ క్రింద నమోదు చేయండి",
  },
  hdfcBankUpi: { en: "HDFC Bank UPI", te: "HDFC బ్యాంక్ UPI" },
  openUpiAndScan: {
    en: "Open any UPI app and scan this code to pay",
    te: "ఏదైనా UPI యాప్ తెరిచి ఈ కోడ్ స్కాన్ చేయండి చెల్లించడానికి",
  },
  tagline: {
    en: "Fresh, natural farm products delivered to your doorstep.",
    te: "తాజా, సహజ వ్యవసాయ ఉత్పత్తులు మీ ఇంటికి డెలివరీ.",
  },
  hundredPercentNatural: { en: "100% Natural", te: "100% సహజం" },
  labTested: { en: "Lab Tested", te: "ల్యాబ్ పరీక్షించబడింది" },
  farmDirect: { en: "Farm Direct", te: "పొలం నేరుగా" },
  certified: { en: "Certified", te: "సర్టిఫైడ్" },
  documentUploaded: { en: "Document uploaded", te: "పత్రం అప్‌లోడ్ చేయబడింది" },
  view: { en: "View", te: "వీక్షించు" },
  fssaiLicensePlaceholder: {
    en: "FSSAI License document will be displayed here",
    te: "FSSAI లైసెన్స్ పత్రం ఇక్కడ ప్రదర్శించబడుతుంది",
  },
  labCertPlaceholder: {
    en: "Lab certificate will be displayed here",
    te: "ల్యాబ్ సర్టిఫికేట్ ఇక్కడ ప్రదర్శించబడుతుంది",
  },
  chooseLanguage: {
    en: "Choose your language / మీ భాషను ఎంచుకోండి",
    te: "మీ భాషను ఎంచుకోండి / Choose your language",
  },

  // Auth & OTP
  login: { en: "Login", te: "లాగిన్" },
  logout: { en: "Logout", te: "లాగ్అవుట్" },
  myOrders: { en: "My Orders", te: "నా ఆర్డర్లు" },
  enterPhone: { en: "Enter your mobile number", te: "మీ మొబైల్ నంబర్ నమోదు చేయండి" },
  getOtp: { en: "Get OTP", te: "OTP పొందండి" },
  enterOtp: { en: "Enter OTP", te: "OTP నమోదు చేయండి" },
  verifyOtp: { en: "Verify OTP", te: "OTP ధృవీకరించండి" },
  otpSentTo: { en: "OTP sent to", te: "OTP పంపబడింది" },
  otpDemo: { en: "Demo mode – your OTP is:", te: "డెమో మోడ్ – మీ OTP:" },
  wrongOtp: {
    en: "Incorrect OTP. Please try again.",
    te: "తప్పు OTP. దయచేసి మళ్ళీ ప్రయత్నించండి.",
  },
  loginSuccess: { en: "Logged in successfully!", te: "విజయవంతంగా లాగిన్ అయ్యారు!" },
  adminLogin: { en: "Admin Login", te: "అడ్మిన్ లాగిన్" },
  loginWithCompanyNumber: {
    en: "Login with Company Number",
    te: "కంపెనీ నంబర్‌తో లాగిన్",
  },
  trackMyOrder: { en: "Track My Order", te: "నా ఆర్డర్ ట్రాక్ చేయండి" },
  loginToViewOrders: {
    en: "Login to view your orders",
    te: "మీ ఆర్డర్లు చూడటానికి లాగిన్ చేయండి",
  },
  adminAccessRequired: { en: "Admin access required", te: "అడ్మిన్ యాక్సెస్ అవసరం" },
  orderNotifications: { en: "Order Notifications", te: "ఆర్డర్ నోటిఫికేషన్లు" },
  notificationsInfo: {
    en: "All order updates are logged to Freshchoiceorg@gmail.com",
    te: "అన్ని ఆర్డర్ అప్‌డేట్‌లు Freshchoiceorg@gmail.com కి లాగ్ చేయబడతాయి",
  },

  // Product names
  "product.brown-eggs.name": { en: "Brown Eggs", te: "గోధుమ రంగు గుడ్లు" },
  "product.white-eggs.name": { en: "White Eggs", te: "తెల్లటి గుడ్లు" },
  "product.desi-eggs.name": { en: "Desi Eggs", te: "దేశీ గుడ్లు" },
  "product.honey-200g.name": {
    en: "Forest Organic Honey (200g)",
    te: "అడవి సేంద్రీయ తేనె (200గ్రా)",
  },
  "product.honey-1kg.name": {
    en: "Forest Organic Honey (1kg)",
    te: "అడవి సేంద్రీయ తేనె (1కేజీ)",
  },
  "product.chicken-desi-naatu.name": {
    en: "Desi Naatu Chicken",
    te: "దేశీ నాటు చికెన్",
  },
  "product.chicken-broiler.name": {
    en: "Broiler Chicken",
    te: "బ్రాయిలర్ చికెన్",
  },
  "product.chicken-naatu-live.name": {
    en: "Naatu Chicken – Live",
    te: "నాటు చికెన్ – జీవం",
  },

  // Product descriptions
  "product.brown-eggs.desc": {
    en: "Farm-fresh brown eggs from free-range hens. Rich yolk, great nutrition.",
    te: "ఫ్రీ-రేంజ్ కోళ్ల నుండి తాజా గోధుమ రంగు గుడ్లు. గొప్ప పోషణ.",
  },
  "product.white-eggs.desc": {
    en: "Classic white eggs, freshly collected. Perfect for everyday cooking.",
    te: "తాజా తెల్లటి గుడ్లు. రోజువారీ వంటకు అనువైనవి.",
  },
  "product.desi-eggs.desc": {
    en: "Authentic desi eggs from country hens. Darker yolk, richer taste.",
    te: "దేశీ కోళ్ల నుండి గుడ్లు. చీకటి పచ్చసొన, రుచికరమైన రుచి.",
  },
  "product.honey-200g.desc": {
    en: "Unfiltered raw forest organic honey. Pure, wild, and full of natural goodness.",
    te: "అనారోగ్యకరమైన అడవి సేంద్రీయ తేనె. స్వచ్ఛమైన మరియు సహజమైనది.",
  },
  "product.honey-1kg.desc": {
    en: "Unfiltered raw forest organic honey in bulk. Best value for daily use.",
    te: "పెద్ద మొత్తంలో అడవి సేంద్రీయ తేనె. ఉత్తమ విలువ.",
  },
  "product.chicken-desi-naatu.desc": {
    en: "Country-bred desi naatu chicken, curry cut. Bold flavour, ideal for traditional recipes.",
    te: "దేశీ నాటు చికెన్, కర్రీ కట్. సంప్రదాయ వంటకాలకు.",
  },
  "product.chicken-broiler.desc": {
    en: "Tender skinless broiler chicken, curry cut. Clean, fresh, and ready to cook.",
    te: "తెల్లటి బ్రాయిలర్ చికెన్, కర్రీ కట్. శుభ్రంగా తాజాగా.",
  },
  "product.chicken-naatu-live.desc": {
    en: "Live naatu chicken, farm-raised free-range. Order fresh, delivered live.",
    te: "జీవంగా నాటు చికెన్. ఆర్డర్ తాజాగా, జీవంగా డెలివరీ.",
  },
};

export function t(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? key;
}
