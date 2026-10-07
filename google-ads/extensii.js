// Google Ads Script: adauga apelul, sitelinkurile, callout-urile, snippet-ul si programul
// pe campania AcviForaj. Se ruleaza o singura data (Instrumente > Actiuni in bloc > Scripturi).
function main() {
  var NAME = 'AcviForaj - Search - Foraje puturi';
  var SITE = 'https://forajeputurideapa.ro';
  var it = AdsApp.campaigns().withCondition("Name = '" + NAME + "'").get();
  if (!it.hasNext()) throw new Error('Nu gasesc campania ' + NAME);
  var c = it.next();

  // Apel
  var call = AdsApp.extensions().newPhoneNumberBuilder()
    .withCountry('RO').withPhoneNumber('0761 251 596').withCallOnly(false).build();
  if (call.isSuccessful()) c.addPhoneNumber(call.getResult());

  // Sitelinkuri
  var links = [
    ['Cât costă un puț', 'Ce intră în preț', 'Ofertă gratuită', SITE + '/preturi/'],
    ['Filmări de pe șantier', 'Lucrări reale', 'Utilaj și materiale', SITE + '/portofoliu/'],
    ['Denisipare puțuri', 'Puțul scoate nisip?', 'Debitul revine', SITE + '/servicii/denisipari-puturi/'],
    ['Pompe și hidrofoare', 'Montaj la puț', 'Apa până în casă', SITE + '/servicii/sisteme-de-pompare/'],
    ['Acte Apele Române', 'Avize și autorizații', 'Ne ocupăm noi', SITE + '/servicii/avize-si-autorizatii/'],
    ['Contact', 'Telefon și WhatsApp', 'Răspundem imediat', SITE + '/contact/'],
  ];
  links.forEach(function (l) {
    var op = AdsApp.extensions().newSitelinkBuilder()
      .withLinkText(l[0]).withDescription1(l[1]).withDescription2(l[2]).withFinalUrl(l[3]).build();
    if (op.isSuccessful()) c.addSitelink(op.getResult()); else Logger.log('Sitelink: ' + op.getErrors());
  });

  // Callouts
  ['Utilaj propriu', 'Echipă proprie', 'Ofertă gratuită', 'Garanție în scris', 'Ne ocupăm de acte',
   'Test de debit inclus', 'Lucrăm în toată țara', 'Tubaj PVC cu filtru'].forEach(function (t) {
    var op = AdsApp.extensions().newCalloutBuilder().withText(t).build();
    if (op.isSuccessful()) c.addCallout(op.getResult()); else Logger.log('Callout: ' + op.getErrors());
  });

  // Snippet structurat
  var sn = AdsApp.extensions().newSnippetBuilder().withHeader('Services')
    .withValues(['Foraje puțuri apă', 'Denisipare puțuri', 'Foraje geotermale', 'Pompe și hidrofoare',
                 'Avize Apele Române', 'Mentenanță puțuri']).build();
  if (sn.isSuccessful()) c.addSnippet(sn.getResult()); else Logger.log('Snippet: ' + sn.getErrors());

  // Program: doar cand raspunde cineva la telefon
  ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].forEach(function (d) {
    c.addAdSchedule({ dayOfWeek: d, startHour: 8, startMinute: 0, endHour: 18, endMinute: 0, bidModifier: 1 });
  });
  c.addAdSchedule({ dayOfWeek: 'SATURDAY', startHour: 9, startMinute: 0, endHour: 14, endMinute: 0, bidModifier: 1 });

  Logger.log('Gata: apel, ' + links.length + ' sitelinkuri, callouts, snippet, program.');
}
