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
//   - callConversionLabel: label-ul actiunii de conversie "apel telefonic"
// ============================================================================
export const tracking = {
  ga4Id: 'G-XXXXXXXXXX', // [PLACEHOLDER]
  adsId: 'AW-XXXXXXXXXX', // [PLACEHOLDER]
  leadConversionLabel: 'XXXXXXXXXXXXXXXXXX', // [PLACEHOLDER] conversie: formular trimis
  callConversionLabel: 'XXXXXXXXXXXXXXXXXX', // [PLACEHOLDER] conversie: click telefon
};

const isPlaceholder = (v: string) => v.includes('XXXX');

export const ga4Enabled = !isPlaceholder(tracking.ga4Id);
export const adsEnabled = !isPlaceholder(tracking.adsId);
export const trackingEnabled = ga4Enabled || adsEnabled;
