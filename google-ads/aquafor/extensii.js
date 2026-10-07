// Google Ads Script (cont AquaFor 1260797466): apel, sitelinkuri, callouts si snippet
// pe campania noua. Fara program de afisare: firma raspunde 24/7.
function main() {
  var NAME = 'AquaFor - Search - Foraje puturi (nou)';
  var SITE = 'https://forajedenisipariputuri.web.app';
  var it = AdsApp.campaigns().withCondition("Name = '" + NAME + "'").get();
  if (!it.hasNext()) throw new Error('Nu gasesc campania ' + NAME);
  var camp = it.next();
  var cid = AdsApp.currentAccount().getCustomerId().replace(/-/g, '');
  var campaignRn = 'customers/' + cid + '/campaigns/' + camp.getId();
  var ops = [], tmp = 0;
  function asset(body, fieldType) {
    tmp -= 1;
    var rn = 'customers/' + cid + '/assets/' + tmp;
    body.resourceName = rn;
    ops.push({ assetOperation: { create: body } });
    ops.push({ campaignAssetOperation: { create: { campaign: campaignRn, asset: rn, fieldType: fieldType } } });
  }

  asset({ callAsset: { countryCode: 'RO', phoneNumber: '0733633600' } }, 'CALL');

  [
    ['Calculator preț foraj', 'Estimare online gratuită', 'Alegeți adâncimea', SITE + '/calculator-pret'],
    ['Foraje puțuri Ilfov', 'Toate localitățile', 'Bază în Buftea', SITE + '/foraje-puturi-ilfov'],
    ['Foraje puțuri București', 'Case și vile', 'Intervenim rapid', SITE + '/foraje-puturi-bucuresti'],
    ['Cât costă un foraj', 'Ce influențează prețul', 'Ghid scurt', SITE + '/blog/cat-costa-un-foraj-de-put'],
    ['Semne de denisipare', 'Semne că puțul are nisip', 'Ce puteți face', SITE + '/blog/cum-stii-ca-putul-are-nevoie-de-denisipare'],
    ['Puț secat', 'Adâncire sau foraj nou', 'Vă ajutăm să alegeți', SITE + '/blog/put-secat-adancire-sau-foraj-nou'],
  ].forEach(function (l) {
    asset({ finalUrls: [l[3]], sitelinkAsset: { linkText: l[0], description1: l[1], description2: l[2] } }, 'SITELINK');
  });

  ['Disponibili 24/7', 'Evaluare gratuită', '20+ ani de experiență', 'Tub PVC de 140 mm',
   'Filtru screen și decantor', 'Garanție pentru lucrare', 'Lucrări la cheie', 'Bază în Buftea, Ilfov'].forEach(function (t) {
    asset({ calloutAsset: { calloutText: t } }, 'CALLOUT');
  });

  asset({ structuredSnippetAsset: { header: 'Servicii', values: ['Foraje puțuri apă', 'Denisipări puțuri',
    'Adâncire puțuri', 'Reparații puțuri', 'Piloni forați'] } }, 'STRUCTURED_SNIPPET');

  var ok = 0;
  AdsApp.mutateAll(ops, { partialFailure: true }).forEach(function (r, i) {
    if (r.isSuccessful()) ok++; else Logger.log('Operatia ' + i + ' a esuat: ' + r.getErrorMessages().join('; '));
  });
  Logger.log('Gata: ' + ok + ' din ' + ops.length + ' operatii reusite.');
}
