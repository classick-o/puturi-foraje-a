import { withBase } from './url';

// ============================================================
// Filmari si poze REALE de pe santier (din arhiva WhatsApp a clientului).
// Fisierele sunt in public/media. Toate sunt verticale (filmate cu telefonul).
// ============================================================

/** Rezolva o cale de imagine: URL extern ramane neschimbat, cea locala primeste `base`. */
export const asset = (src: string) => (src.startsWith('http') ? src : withBase(src));

export type Video = {
  slug: string;
  title: string;
  description: string;
  duration: string; // ISO 8601, pentru schema VideoObject
  seconds: number;
  tag: string;
};

export const videos: Video[] = [
  {
    slug: 'put-arteziu-apa',
    title: 'Apa tasneste din put imediat dupa forare',
    description:
      'Put forat de echipa noastra: apa iese cu presiune din coloana, semn de strat acvifer bogat. Filmare reala de pe santier.',
    duration: 'PT11S',
    seconds: 11,
    tag: 'Rezultat final',
  },
  {
    slug: 'foraj-put-santier',
    title: 'Instalatia de foraj in lucru, in curtea clientului',
    description:
      'Utilajul hidraulic de foraj la lucru: forare cu circulatie de apa si santul de decantare pentru namol. Lucram curat si organizat.',
    duration: 'PT20S',
    seconds: 20,
    tag: 'Forare',
  },
  {
    slug: 'tubaj-pvc-put',
    title: 'Coloana de tubaj PVC pregatita pentru put',
    description:
      'Tevi PVC albastre cu filet si filtru cu fanta, pregatite pentru tubarea putului. Materiale noi, potrivite pentru apa.',
    duration: 'PT19S',
    seconds: 19,
    tag: 'Materiale',
  },
  {
    slug: 'utilaj-foraj-teren',
    title: 'Utilajul de foraj pe un teren in panta',
    description:
      'Ajungem si pe terenuri mai greu accesibile: instalatia de foraj pozitionata langa casa, plus santul pentru racordul putului.',
    duration: 'PT21S',
    seconds: 21,
    tag: 'Teren dificil',
  },
];

export type Photo = { src: string; alt: string; caption: string };

export const photos: Record<string, Photo> = {
  instalatieCamp: {
    src: '/media/instalatie-foraj-camp.webp',
    alt: 'Instalatie de foraj cu trepied montata pe camp, langa roaba cu materiale',
    caption: 'Foraj pe teren deschis',
  },
  instalatieGradina: {
    src: '/media/instalatie-foraj-gradina.webp',
    alt: 'Echipa de foraj lucrand cu trepiedul intr-o gradina',
    caption: 'Foraj in gradina, intre case',
  },
  tubFiltru: {
    src: '/media/tub-pvc-filtru-fanta.webp',
    alt: 'Tub PVC albastru pentru put, cu filtru cu fanta, detaliu',
    caption: 'Filtru cu fanta, PVC pentru apa',
  },
  teviTubaj: {
    src: '/media/tevi-pvc-tubaj.webp',
    alt: 'Tevi PVC albastre de tubaj aliniate pe pamant inainte de montaj',
    caption: 'Coloana de tubaj pregatita',
  },
  jetApa: {
    src: '/media/jet-apa-put.webp',
    alt: 'Jet de apa curata care iese din coloana putului forat',
    caption: 'Apa la suprafata',
  },
  instalatieHidraulica: {
    src: '/media/instalatie-foraj-hidraulica.webp',
    alt: 'Instalatie hidraulica de foraj in functiune intr-o curte',
    caption: 'Utilaj hidraulic propriu',
  },
  capatPut: {
    src: '/media/capat-put-forat.webp',
    alt: 'Capatul coloanei unui put forat, in groapa pregatita pentru camin',
    caption: 'Put forat, gata de racord',
  },
  santRacord: {
    src: '/media/sant-racord-put.webp',
    alt: 'Sant sapat de la put spre casa pentru teava de racord',
    caption: 'Sant pentru racordul la casa',
  },
  sapatura: {
    src: '/media/sapatura-namol-foraj.webp',
    alt: 'Sant de decantare cu apa si namol langa instalatia de foraj',
    caption: 'Decantare namol in timpul forarii',
  },
};

export const videoSrc = (v: Video) => withBase(`media/${v.slug}.mp4`);
export const videoPoster = (v: Video) => withBase(`media/${v.slug}.webp`);

/** Schema.org VideoObject - ajuta la aparitia in Google Video / rezultate cu thumbnail. */
export const videoLd = (v: Video, site: URL | undefined) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: v.title,
  description: v.description,
  thumbnailUrl: new URL(videoPoster(v), site).href,
  contentUrl: new URL(videoSrc(v), site).href,
  uploadDate: '2026-09-01',
  duration: v.duration,
});
