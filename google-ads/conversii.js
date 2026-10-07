// Google Ads Script: creeaza conversiile pentru forajeputurideapa.ro (daca nu exista deja)
// si scrie in jurnal ID-urile de tag (AW-.../eticheta) pentru src/lib/tracking.ts.
// Apelurile din anunturi folosesc conversia existenta in cont: "Apeluri din anunțuri".
function main() {
  var cid = AdsApp.currentAccount().getCustomerId().replace(/-/g, '');
  var wanted = [
    { name: 'AcviForaj - Clic telefon (site)', type: 'WEBPAGE', category: 'PHONE_CALL_LEAD' },
    { name: 'AcviForaj - Clic WhatsApp (site)', type: 'WEBPAGE', category: 'CONTACT' },
    { name: 'AcviForaj - Formular trimis (site)', type: 'WEBPAGE', category: 'SUBMIT_LEAD_FORM' },
  ];

  var existing = {};
  var rows = AdsApp.search('SELECT conversion_action.name, conversion_action.status FROM conversion_action');
  while (rows.hasNext()) {
    var r = rows.next();
    Logger.log('Exista: ' + r.conversionAction.name + ' (' + r.conversionAction.status + ')');
    existing[r.conversionAction.name] = true;
  }

  var ops = wanted.filter(function (w) { return !existing[w.name]; }).map(function (w) {
    var c = {
      name: w.name, type: w.type, category: w.category, status: 'ENABLED',
      countingType: 'ONE_PER_CLICK', primaryForGoal: true,
      valueSettings: { defaultValue: 0, alwaysUseDefaultValue: true },
    };
    if (w.phoneCallDurationSeconds) c.phoneCallDurationSeconds = w.phoneCallDurationSeconds;
    return { conversionActionOperation: { create: c } };
  });
  if (ops.length) {
    AdsApp.mutateAll(ops, { partialFailure: true }).forEach(function (res, i) {
      Logger.log(res.isSuccessful() ? 'Creata: ' + res.getResourceName() : 'Eroare ' + i + ': ' + res.getErrorMessages().join('; '));
    });
  }

  var q = AdsApp.search("SELECT conversion_action.name, conversion_action.tag_snippets FROM conversion_action " +
                        "WHERE conversion_action.name LIKE 'AcviForaj%'");
  while (q.hasNext()) {
    var a = q.next().conversionAction;
    var s = (a.tagSnippets || []).map(function (t) { return t.eventSnippet || ''; }).join(' ');
    var m = s.match(/send_to': ?'([^']+)'/) || s.match(/send_to":"([^"]+)"/);
    Logger.log('TAG ' + a.name + ' => ' + (m ? m[1] : '(fara tag web)'));
  }
}
