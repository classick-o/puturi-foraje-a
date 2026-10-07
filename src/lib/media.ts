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
    title: 'Apa țâșnește din puț imediat după forare',
    description:
      'Puț forat de echipa noastră: apa iese cu presiune din coloană, semn de strat acvifer bogat. Filmare reală de pe șantier.',
    duration: 'PT11S',
    seconds: 11,
    tag: 'Rezultat final',
  },
  {
    slug: 'foraj-put-santier',
    title: 'Instalația de foraj în lucru, în curtea clientului',
    description:
      'Utilajul hidraulic de foraj la lucru: forare cu circulație de apă și șanțul de decantare pentru nămol. Lucrăm curat și organizat.',
    duration: 'PT20S',
    seconds: 20,
    tag: 'Forare',
  },
  {
    slug: 'tubaj-pvc-put',
    title: 'Coloana de tubaj PVC pregătită pentru puț',
    description:
      'Țevi PVC albastre cu filet și filtru cu fantă, pregătite pentru tubarea puțului. Materiale noi, potrivite pentru apă.',
    duration: 'PT19S',
    seconds: 19,
    tag: 'Materiale',
  },
  {
    slug: 'utilaj-foraj-teren',
    title: 'Utilajul de foraj pe un teren în pantă',
    description:
      'Ajungem și pe terenuri mai greu accesibile: instalația de foraj poziționată lângă casă, plus șanțul pentru racordul puțului.',
    duration: 'PT21S',
    seconds: 21,
    tag: 'Teren dificil',
  },
];

export type Photo = { src: string; alt: string; caption: string };

export const photos: Record<string, Photo> = {
  instalatieCamp: {
    src: '/media/instalatie-foraj-camp.webp',
    alt: 'Instalație de foraj cu trepied montată pe câmp, lângă roaba cu materiale',
    caption: 'Foraj pe teren deschis',
  },
  instalatieGradina: {
    src: '/media/instalatie-foraj-gradina.webp',
    alt: 'Echipa de foraj lucrând cu trepiedul într-o grădină',
    caption: 'Foraj în grădină, între case',
  },
  tubFiltru: {
    src: '/media/tub-pvc-filtru-fanta.webp',
    alt: 'Tub PVC albastru pentru puț, cu filtru cu fantă, detaliu',
    caption: 'Filtru cu fantă, PVC pentru apă',
  },
  teviTubaj: {
    src: '/media/tevi-pvc-tubaj.webp',
    alt: 'Țevi PVC albastre de tubaj aliniate pe pământ înainte de montaj',
    caption: 'Coloana de tubaj pregătită',
  },
  jetApa: {
    src: '/media/jet-apa-put.webp',
    alt: 'Jet de apă curată care iese din coloana puțului forat',
    caption: 'Apa la suprafață',
  },
  instalatieHidraulica: {
    src: '/media/instalatie-foraj-hidraulica.webp',
    alt: 'Instalație hidraulică de foraj în funcțiune într-o curte',
    caption: 'Utilaj hidraulic propriu',
  },
  capatPut: {
    src: '/media/capat-put-forat.webp',
    alt: 'Capătul coloanei unui puț forat, în groapa pregătită pentru cămin',
    caption: 'Puț forat, gata de racord',
  },
  santRacord: {
    src: '/media/sant-racord-put.webp',
    alt: 'Șanț săpat de la puț spre casă pentru țeava de racord',
    caption: 'Șanț pentru racordul la casă',
  },
  sapatura: {
    src: '/media/sapatura-namol-foraj.webp',
    alt: 'Șanț de decantare cu apă și nămol lângă instalația de foraj',
    caption: 'Decantare nămol în timpul forării',
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
