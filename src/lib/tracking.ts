// ============================================================================
// Configurare tracking Google (Analytics 4 + Google Ads).
//
// [PLACEHOLDER] Inlocuieste valorile de mai jos cu ID-urile reale primite de la
// client / din conturile Google. Cat timp raman valorile cu "XXXX", tracking-ul
// si bannerul de cookies sunt DEZACTIVATE automat (nu se incarca nimic).
//
// De unde iei valorile:
//   - ga4Id: GA4 -> Admin -> Data Streams -> Measurement ID (forma "G-XXXXXXXXXX")
//   - adsId: Google Ads -> Goals/Conversions -> tag (forma "AW-XXXXXXXXXX")
//   - leadConversionLabel: label-ul actiunii de conversie "formular trimis"
//   - callConversionLabel: label-ul actiunii de conversie "clic pe telefon"
//   - whatsappConversionLabel: label-ul actiunii de conversie "clic pe WhatsApp"
//   - web3formsKey: cheie gratuita de pe https://web3forms.com (formularul ajunge
//     pe email). Fara ea, formularul trimite cererea pe WhatsApp.
// ============================================================================
export const tracking = {
  ga4Id: 'G-XXXXXXXXXX', // [PLACEHOLDER]
  adsId: 'AW-XXXXXXXXXX', // [PLACEHOLDER]
  leadConversionLabel: 'XXXXXXXXXXXXXXXXXX', // [PLACEHOLDER] conversie: formular trimis
  callConversionLabel: 'XXXXXXXXXXXXXXXXXX', // [PLACEHOLDER] conversie: click telefon
  whatsappConversionLabel: 'XXXXXXXXXXXXXXXXXX', // [PLACEHOLDER] conversie: click WhatsApp
  web3formsKey: '', // [PLACEHOLDER] optional - formular pe email
};

const isPlaceholder = (v: string) => v.includes('XXXX');

export const ga4Enabled = !isPlaceholder(tracking.ga4Id);
export const adsEnabled = !isPlaceholder(tracking.adsId);
export const trackingEnabled = ga4Enabled || adsEnabled;

/** "AW-xxx/label" pentru o conversie Google Ads, sau '' daca nu e configurata. */
export const adsSendTo = (label: string) => (adsEnabled && !isPlaceholder(label) ? `${tracking.adsId}/${label}` : '');
