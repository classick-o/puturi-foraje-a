import { withBase } from './url';

// ============================================================
// Date centrale ale site-ului. [PLACEHOLDER] = de inlocuit cu datele reale
// ale clientului (nume firma, telefon, email, adresa, social).
// ============================================================
export const site = {
  name: 'AquaForaj', // [PLACEHOLDER] numele firmei
  legalName: 'AquaForaj SRL', // [PLACEHOLDER]
  tagline: 'Foraje puturi de apa, oriunde in Romania',
  description:
    'Foraje puturi apa cu utilaj propriu: forare, tubaj PVC cu filtru, denisipare si pompa montata. Suna la 0761 251 596 pentru pret pe loc - deviz gratuit, garantie in scris.',
  phone: '0761 251 596',
  phoneIntl: '+40761251596',
  phoneHref: 'tel:+40761251596',
  whatsapp: `https://wa.me/40761251596?text=${encodeURIComponent('Buna ziua! As dori o oferta pentru un foraj de put.')}`,
  whatsappBase: 'https://wa.me/40761251596',
  email: 'office@aquaforaj.ro', // [PLACEHOLDER]
  address: 'Deplasare in toata Romania', // [PLACEHOLDER] adresa sediului, daca vrei sa apara (ajuta la Google Business)
  schedule: 'Luni - Vineri: 08:00 - 18:00 | Sambata: 09:00 - 14:00',
  social: {
    facebook: 'https://facebook.com', // [PLACEHOLDER]
    instagram: 'https://instagram.com', // [PLACEHOLDER]
    tiktok: 'https://tiktok.com', // [PLACEHOLDER]
  },
} as const;

export const nav = [
  { label: 'Acasa', href: withBase('') },
  { label: 'Despre noi', href: withBase('despre-noi') },
  { label: 'Servicii', href: withBase('servicii') },
  { label: 'Preturi', href: withBase('preturi') },
  { label: 'Portofoliu', href: withBase('portofoliu') },
  { label: 'Zone', href: withBase('zone-acoperite') },
  { label: 'Blog', href: withBase('blog') },
  { label: 'Contact', href: withBase('contact') },
] as const;

export const stats = [
  { value: '15+', label: 'Ani de experienta' },
  { value: '2.500+', label: 'Foraje executate' },
  { value: 'Gratuit', label: 'Deviz si consultanta' },
  { value: '40+', label: 'Judete acoperite' },
] as const;

export const whyUs = [
  {
    icon: 'ph:truck-duotone',
    title: 'Utilaje proprii moderne',
    text: 'Instalatii performante pentru orice tip de teren, fara intarzieri de la subcontractori.',
  },
  {
    icon: 'ph:users-three-duotone',
    title: 'Echipa proprie',
    text: 'Operatori si ingineri cu experienta - nu subcontractam lucrarea.',
  },
  {
    icon: 'ph:seal-check-duotone',
    title: 'Garantie in scris',
    text: 'Lucrari cu garantie in scris, in contract, fara discutii ulterioare.',
  },
  {
    icon: 'ph:file-text-duotone',
    title: 'Ne ocupam de acte',
    text: 'Documentatia si avizele la Apele Romane / Primarie le rezolvam noi.',
  },
  {
    icon: 'ph:hand-coins-duotone',
    title: 'Pret corect si clar',
    text: 'Deviz transparent, comunicat din start, fara costuri ascunse.',
  },
  {
    icon: 'ph:map-pin-duotone',
    title: 'Deplasare in toata tara',
    text: 'Lucram la nivel national si oferim suport si dupa finalizare.',
  },
] as const;

export const steps = [
  { title: 'Ne contactezi', text: 'Ne suni sau ceri o oferta online si ne spui ce ai nevoie.' },
  { title: 'Evaluare si deviz', text: 'Analizam terenul si iti dam un deviz personalizat, gratuit.' },
  { title: 'Programare', text: 'Stabilim data si venim cu utilajul la tine.' },
  { title: 'Executie foraj', text: 'Foram, tubam si denisipam putul pana la apa curata.' },
  { title: 'Punere in functiune', text: 'Montam pompa sau hidroforul si predam documentatia + garantia.' },
] as const;

export const testimonials = [
  {
    name: 'Andrei P.',
    city: 'Ilfov',
    text: 'Au venit la timp, au lucrat curat si am avut apa in aceeasi zi. Recomand cu incredere.',
    rating: 5,
  },
  {
    name: 'Maria D.',
    city: 'Cluj',
    text: 'M-au ajutat si cu actele la Apele Romane. Pret corect, exact cat au spus la inceput.',
    rating: 5,
  },
  {
    name: 'Ionut si familia',
    city: 'Timis',
    text: 'Put de 60 m pentru gospodarie si gradina. Echipa serioasa, garantie in scris.',
    rating: 5,
  },
  {
    name: 'Gabriel M.',
    city: 'Brasov',
    text: 'Denisipare rapida la un put vechi, debitul a revenit complet. Multumesc!',
    rating: 5,
  },
] as const;

export const zones = [
  'Bucuresti', 'Ilfov', 'Prahova', 'Dambovita', 'Arges', 'Giurgiu', 'Cluj', 'Timis',
  'Brasov', 'Constanta', 'Iasi', 'Dolj', 'Bihor', 'Sibiu', 'Mures', 'Olt',
] as const;

export const faqs = [
  {
    q: 'Cat costa un foraj de put?',
    a: 'Nu exista un pret fix - depinde de adancime, diametru, tipul de sol si materiale. Cel mai simplu suni sau ceri o oferta, iar noi iti dam un pret exact, gratuit, dupa o scurta discutie despre teren.',
  },
  {
    q: 'La ce adancime se gaseste apa?',
    a: 'Depinde de zona si de panza freatica locala, in general intre 10 si 80 m pentru gospodarie. Putem estima dupa lucrarile facute in zona ta.',
  },
  {
    q: 'Am nevoie de autorizatie pentru un put?',
    a: 'Conform Legii Apelor 107/2006, peste anumite adancimi sau debite este nevoie de aviz de la Apele Romane. Te consiliem si ne ocupam noi de documentatie.',
  },
  {
    q: 'Cat dureaza forarea unui put?',
    a: 'Pentru adancimi obisnuite, de regula o zi. La adancimi mari sau terenuri dificile poate dura mai mult, insa iti spunem din start.',
  },
  {
    q: 'Ce garantie oferiti?',
    a: 'Oferim garantie in scris, mentionata in contract, in functie de tipul lucrarii.',
  },
  {
    q: 'Faceti si mentenanta sau denisipare?',
    a: 'Da. Recomandam o denisipare la 3-4 ani si oferim revizii, inlocuire pompa si reabilitare puturi.',
  },
] as const;
