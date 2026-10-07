// Google Ads Script: adauga apelul, sitelinkurile, callout-urile, snippet-ul si programul
// pe campania AcviForaj, prin elemente (assets) - API-ul actual Google Ads.
// Se ruleaza o singura data (Instrumente > Actiuni in bloc > Scripturi).
function main() {
  var NAME = 'AcviForaj - Search - Foraje puturi';
  var SITE = 'https://forajeputurideapa.ro';
  var it = AdsApp.campaigns().withCondition("Name = '" + NAME + "'").get();
  if (!it.hasNext()) throw new Error('Nu gasesc campania ' + NAME);
  var camp = it.next();
  var cid = AdsApp.currentAccount().getCustomerId().replace(/-/g, '');
  var campaignRn = 'customers/' + cid + '/campaigns/' + camp.getId();

  var ops = [];
  var tmp = 0;
  function asset(body, fieldType) {
    tmp -= 1;
    var rn = 'customers/' + cid + '/assets/' + tmp;
    body.resourceName = rn;
    ops.push({ assetOperation: { create: body } });
    ops.push({ campaignAssetOperation: { create: { campaign: campaignRn, asset: rn, fieldType: fieldType } } });
  }

  asset({ callAsset: { countryCode: 'RO', phoneNumber: '0761251596' } }, 'CALL');

  [
    ['Cât costă un puț', 'Ce intră în preț', 'Ofertă gratuită', SITE + '/preturi/'],
    ['Filmări de pe șantier', 'Lucrări reale', 'Utilaj și materiale', SITE + '/portofoliu/'],
    ['Denisipare puțuri', 'Puțul scoate nisip?', 'Debitul revine', SITE + '/servicii/denisipari-puturi/'],
    ['Pompe și hidrofoare', 'Montaj la puț', 'Apa până în casă', SITE + '/servicii/sisteme-de-pompare/'],
    ['Acte Apele Române', 'Avize și autorizații', 'Ne ocupăm noi', SITE + '/servicii/avize-si-autorizatii/'],
    ['Contact', 'Telefon și WhatsApp', 'Răspundem imediat', SITE + '/contact/'],
  ].forEach(function (l) {
    asset({ finalUrls: [l[3]], sitelinkAsset: { linkText: l[0], description1: l[1], description2: l[2] } }, 'SITELINK');
  });

  ['Utilaj propriu', 'Echipă proprie', 'Ofertă gratuită', 'Garanție în scris', 'Ne ocupăm de acte',
   'Test de debit inclus', 'Lucrăm în toată țara', 'Tubaj PVC cu filtru'].forEach(function (t) {
    asset({ calloutAsset: { calloutText: t } }, 'CALLOUT');
  });

  asset({ structuredSnippetAsset: { header: 'Servicii', values: ['Foraje puțuri apă', 'Denisipare puțuri',
    'Foraje geotermale', 'Pompe și hidrofoare', 'Avize Apele Române', 'Mentenanță puțuri'] } }, 'STRUCTURED_SNIPPET');

  // Program: doar cand raspunde cineva la telefon
  var days = [['MONDAY', 8, 18], ['TUESDAY', 8, 18], ['WEDNESDAY', 8, 18], ['THURSDAY', 8, 18], ['FRIDAY', 8, 18], ['SATURDAY', 9, 14]];
  days.forEach(function (d) {
    ops.push({ campaignCriterionOperation: { create: { campaign: campaignRn, adSchedule: {
      dayOfWeek: d[0], startHour: d[1], startMinute: 'ZERO', endHour: d[2], endMinute: 'ZERO' } } } });
  });

  var results = AdsApp.mutateAll(ops, { partialFailure: true });
  var ok = 0;
  results.forEach(function (r, i) {
    if (r.isSuccessful()) ok++;
    else Logger.log('Operatia ' + i + ' a esuat: ' + r.getErrorMessages().join('; '));
  });
  Logger.log('Gata: ' + ok + ' din ' + ops.length + ' operatii reusite.');
}
