import { withBase } from './url';

// ============================================================
// Date centrale ale site-ului. [PLACEHOLDER] = de inlocuit cu datele reale
// ale clientului (nume firma, telefon, email, adresa, social).
// ============================================================
export const site = {
  name: 'AquaForaj', // [PLACEHOLDER] numele firmei
  legalName: 'AquaForaj SRL', // [PLACEHOLDER]
  tagline: 'Foraje puțuri de apă, oriunde în România',
  description:
    'Foraje puțuri apă cu utilaj propriu: forare, tubaj PVC cu filtru, denisipare și pompă montată. Sună la 0761 251 596 pentru preț pe loc - deviz gratuit, garanție în scris.',
  phone: '0761 251 596',
  phoneIntl: '+40761251596',
  phoneHref: 'tel:+40761251596',
  whatsapp: `https://wa.me/40761251596?text=${encodeURIComponent('Bună ziua! Aș dori o ofertă pentru un foraj de puț.')}`,
  whatsappBase: 'https://wa.me/40761251596',
  email: 'office@aquaforaj.ro', // [PLACEHOLDER]
  address: 'Deplasare în toată România', // [PLACEHOLDER] adresa sediului, daca vrei sa apara (ajuta la Google Business)
  schedule: 'Luni - Vineri: 08:00 - 18:00 | Sâmbătă: 09:00 - 14:00',
  social: {
    facebook: 'https://facebook.com', // [PLACEHOLDER]
    instagram: 'https://instagram.com', // [PLACEHOLDER]
    tiktok: 'https://tiktok.com', // [PLACEHOLDER]
  },
} as const;

export const nav = [
  { label: 'Acasă', href: withBase('') },
  { label: 'Despre noi', href: withBase('despre-noi') },
  { label: 'Servicii', href: withBase('servicii') },
  { label: 'Prețuri', href: withBase('preturi') },
  { label: 'Lucrări', href: withBase('portofoliu') },
  { label: 'Zone', href: withBase('zone-acoperite') },
  { label: 'Blog', href: withBase('blog') },
  { label: 'Contact', href: withBase('contact') },
] as const;

export const stats = [
  { value: '15+', label: 'Ani de experiență' },
  { value: '2.500+', label: 'Foraje executate' },
  { value: 'Gratuit', label: 'Deviz și consultanță' },
  { value: '40+', label: 'Județe acoperite' },
] as const;

export const whyUs = [
  {
    icon: 'ph:truck-duotone',
    title: 'Utilaje proprii moderne',
    text: 'Instalații performante pentru orice tip de teren, fără întârzieri de la subcontractori.',
  },
  {
    icon: 'ph:users-three-duotone',
    title: 'Echipă proprie',
    text: 'Operatori și ingineri cu experiență - nu subcontractăm lucrarea.',
  },
  {
    icon: 'ph:seal-check-duotone',
    title: 'Garanție în scris',
    text: 'Lucrări cu garanție în scris, în contract, fără discuții ulterioare.',
  },
  {
    icon: 'ph:file-text-duotone',
    title: 'Ne ocupăm de acte',
    text: 'Documentația și avizele la Apele Române / Primărie le rezolvăm noi.',
  },
  {
    icon: 'ph:hand-coins-duotone',
    title: 'Preț corect și clar',
    text: 'Deviz transparent, comunicat din start, fără costuri ascunse.',
  },
  {
    icon: 'ph:map-pin-duotone',
    title: 'Deplasare în toată țara',
    text: 'Lucrăm la nivel național și oferim suport și după finalizare.',
  },
] as const;

export const steps = [
  { title: 'Ne contactezi', text: 'Ne suni sau ceri o ofertă online și ne spui ce ai nevoie.' },
  { title: 'Evaluare și deviz', text: 'Analizăm terenul și îți dăm un deviz personalizat, gratuit.' },
  { title: 'Programare', text: 'Stabilim data și venim cu utilajul la tine.' },
  { title: 'Execuție foraj', text: 'Forăm, tubăm și denisipăm puțul până la apă curată.' },
  { title: 'Punere în funcțiune', text: 'Montăm pompa sau hidroforul și predăm documentația + garanția.' },
] as const;

export const testimonials = [
  {
    name: 'Andrei P.',
    city: 'Ilfov',
    text: 'Au venit la timp, au lucrat curat și am avut apă în aceeași zi. Recomand cu încredere.',
    rating: 5,
  },
  {
    name: 'Maria D.',
    city: 'Cluj',
    text: 'M-au ajutat și cu actele la Apele Române. Preț corect, exact cât au spus la început.',
    rating: 5,
  },
  {
    name: 'Ionuț și familia',
    city: 'Timiș',
    text: 'Puț de 60 m pentru gospodărie și grădină. Echipă serioasă, garanție în scris.',
    rating: 5,
  },
  {
    name: 'Gabriel M.',
    city: 'Brașov',
    text: 'Denisipare rapidă la un puț vechi, debitul a revenit complet. Mulțumesc!',
    rating: 5,
  },
] as const;

export const zones = [
  'București', 'Ilfov', 'Prahova', 'Dâmbovița', 'Argeș', 'Giurgiu', 'Cluj', 'Timiș',
  'Brașov', 'Constanța', 'Iași', 'Dolj', 'Bihor', 'Sibiu', 'Mureș', 'Olt',
] as const;

export const faqs = [
  {
    q: 'Cât costă un foraj de puț?',
    a: 'Nu există un preț fix - depinde de adâncime, diametru, tipul de sol și materiale. Cel mai simplu suni sau ceri o ofertă, iar noi îți dăm un preț exact, gratuit, după o scurtă discuție despre teren.',
  },
  {
    q: 'La ce adâncime se găsește apa?',
    a: 'Depinde de zonă și de pânza freatică locală, în general între 10 și 80 m pentru gospodărie. Putem estima după lucrările făcute în zona ta.',
  },
  {
    q: 'Am nevoie de autorizație pentru un puț?',
    a: 'Conform Legii Apelor 107/1996, peste anumite adâncimi sau debite este nevoie de aviz de la Apele Române. Te consiliem și ne ocupăm noi de documentație.',
  },
  {
    q: 'Cât durează forarea unui puț?',
    a: 'Pentru adâncimi obișnuite, de regulă o zi. La adâncimi mari sau terenuri dificile poate dura mai mult, însă îți spunem din start.',
  },
  {
    q: 'Ce garanție oferiți?',
    a: 'Oferim garanție în scris, menționată în contract, în funcție de tipul lucrării.',
  },
  {
    q: 'Faceți și mentenanță sau denisipare?',
    a: 'Da. Recomandăm o denisipare la 3-4 ani și oferim revizii, înlocuire pompă și reabilitare puțuri.',
  },
] as const;
