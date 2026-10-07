"""Genereaza fisierele de import pentru Google Ads Editor (campania de Search).
Ruleaza: python3 google-ads/genereaza.py  -> scrie CSV-urile in google-ads/import/
Verifica automat limitele Google: titlu 30, descriere 90, cale 15, extensii 25.
"""
import csv, os, sys

OUT = os.path.join(os.path.dirname(__file__), 'import')
os.makedirs(OUT, exist_ok=True)

SITE = 'https://forajeputurideapa.ro'
CAMPAIGN = 'AcviForaj - Search - Foraje puturi'
BUDGET = '60'  # RON/zi - de confirmat inainte de pornire

# Titluri comune, potrivite in orice grup (se combina cu cele specifice)
COMMON_H = [
    'Sună, răspundem imediat',
    'Prețul îl afli la telefon',
    'Utilaj și echipă proprie',
    'Garanție în scris',
    'Ne ocupăm și de acte',
    'Lucrăm în toată țara',
    'Vezi filmări de pe șantier',
]

GROUPS = [
    {
        'name': 'Foraj put apa',
        'url': f'{SITE}/servicii/foraje-puturi-apa/',
        'path': ('foraje', 'puturi-apa'),
        'cpc': '3.50',
        'kw': ['foraj put', 'foraje puturi', 'foraj put apa', 'foraje puturi apa', 'firma foraj put',
               'firma foraje puturi', 'forare put', 'put forat', 'puturi forate', 'foraj fantana',
               'fantana forata', 'executie put forat', 'foraj apa', 'sapare put apa'],
        'h': ['Foraje puțuri de apă', 'Forăm până dăm de apă', 'Puț forat, gata de folosit',
              'Tubaj PVC cu filtru', 'Apa la tine în curte', 'De regulă, gata într-o zi',
              'Test de debit inclus', 'Foraj cu utilajul nostru'],
        'd': ['Forăm, tubăm cu PVC și filtru, spălăm puțul și montăm pompa. Sună pentru preț.',
              'Venim cu utilajul nostru, fără subcontractori. Garanție în scris, trecută în contract.',
              'Ne spui localitatea și pentru ce îți trebuie apa, iar noi îți spunem prețul complet.',
              'Vezi pe site filmări reale de la clienți: utilajul, materialele și apa la suprafață.'],
    },
    {
        'name': 'Pret foraj put',
        'url': f'{SITE}/preturi/',
        'path': ('pret', 'foraj-put'),
        'cpc': '3.50',
        'kw': ['pret foraj put', 'pret put forat', 'cat costa un put forat', 'cat costa forarea unui put',
               'foraj put pret', 'pret foraj put apa', 'foraj put pret metru', 'pret metru foraj',
               'cost put forat', 'oferta foraj put'],
        'h': ['Cât costă un puț forat?', 'Preț complet, din prima', 'Ofertă gratuită la telefon',
              'Fără costuri ascunse', 'Prețul nu se schimbă', 'Deviz clar înainte de foraj',
              'Ce intră în preț: tot', 'Foraje puțuri de apă'],
        'd': ['Prețul depinde de adâncime și teren. Sună, ne spui localitatea și afli prețul complet.',
              'În preț intră forajul, tubajul PVC cu filtru, denisiparea și testul de debit.',
              'Nu afișăm un preț pe metru care se schimbă la fața locului. Ți-l spunem din start.',
              'Ofertă gratuită și fără obligații. Garanție în scris pentru fiecare puț.'],
    },
    {
        'name': 'Put casa gradina irigatii',
        'url': f'{SITE}/servicii/foraje-puturi-apa/',
        'path': ('put', 'casa-gradina'),
        'cpc': '3.00',
        'kw': ['put forat casa', 'put pentru casa', 'put apa casa', 'put forat gradina', 'put pentru irigatii',
               'foraj put irigatii', 'put apa gradina', 'apa pentru irigatii', 'put pentru gospodarie',
               'foraj put gospodarie'],
        'h': ['Puț pentru casă și grădină', 'Apă pentru irigații', 'Apă proprie, fără factură',
              'Puț pentru gospodărie', 'Pompă montată la cerere', 'Apa trasă până în casă',
              'Foraje puțuri de apă', 'Dimensionat după nevoie'],
        'd': ['Facem puțul după cât consumi: casă, grădină sau irigații. Sună pentru preț.',
              'Montăm pompa sau hidroforul și tragem țeava până în casă. Pleci cu apa la robinet.',
              'Forăm cu utilajul nostru, tubăm cu PVC și filtru. Garanție în scris în contract.',
              'Trimite-ne pe WhatsApp o poză cu terenul și localitatea. Îți spunem ce se poate face.'],
    },
    {
        'name': 'Denisipare put',
        'url': f'{SITE}/servicii/denisipari-puturi/',
        'path': ('denisipare', 'put'),
        'cpc': '2.50',
        'kw': ['denisipare put', 'denisipare puturi', 'denisipare put forat', 'curatare put forat',
               'curatare put', 'put cu nisip', 'put infundat', 'put colmatat', 'reabilitare put',
               'put nu mai da apa', 'pret denisipare put'],
        'h': ['Denisipare puțuri', 'Puțul scoate nisip?', 'Puțul nu mai dă apă?', 'Debitul revine ca nou',
              'Curățare puț forat', 'Venim cu utilaj propriu', 'Test de debit la final',
              'Reabilitare puțuri vechi'],
        'd': ['Scoatem nisipul și depunerile din puț până iese apa limpede. Sună pentru preț.',
              'Recomandăm denisiparea la 3-4 ani. Verificăm și pompa dacă e nevoie.',
              'Măsurăm debitul înainte și după, ca să vezi exact ce s-a schimbat.',
              'Lucrăm în toată țara cu utilajul nostru. Ofertă gratuită la telefon.'],
    },
    {
        'name': 'Foraj pompa de caldura',
        'url': f'{SITE}/servicii/foraje-pompe-de-caldura/',
        'path': ('pompe', 'de-caldura'),
        'cpc': '3.50',
        'kw': ['foraj pompa de caldura', 'foraje pompe de caldura', 'foraj geotermal', 'foraje geotermale',
               'sonde geotermale', 'foraj pompa caldura sol apa', 'pompa de caldura apa apa put',
               'put pompa de caldura', 'pret foraj geotermal'],
        'h': ['Foraje pompe de căldură', 'Foraje geotermale', 'Sonde pentru sol-apă',
              'Puț pentru apă-apă', 'Lucrăm cu instalatorul tău', 'Adâncime după calcul',
              'Ofertă gratuită la telefon', 'Utilaj propriu'],
        'd': ['Forăm sondele verticale sau puțul pentru pompa de căldură. Sună pentru preț.',
              'Lucrăm după calculul instalatorului și predăm lucrarea cu fișă și garanție.',
              'Utilaj și echipă proprie, fără subcontractori. Lucrăm în toată țara.',
              'Ne ocupăm și de actele necesare. Ofertă gratuită și fără obligații.'],
    },
    {
        'name': 'Foraj put judete',
        'url': f'{SITE}/zone-acoperite/',
        'path': ('foraje', 'zona-ta'),
        'cpc': '3.00',
        'kw': [f'foraj put {z}' for z in ['bucuresti', 'ilfov', 'prahova', 'dambovita', 'arges', 'giurgiu',
                                           'cluj', 'timis', 'brasov', 'constanta', 'iasi', 'dolj', 'bihor',
                                           'sibiu', 'mures', 'olt']]
              + ['foraje puturi bucuresti', 'foraje puturi ilfov', 'foraj put langa mine', 'foraje puturi in zona'],
        'h': ['Foraje puțuri în zona ta', 'Venim la tine cu utilajul', 'Foraje puțuri lângă tine',
              'Foraje puțuri de apă', 'Spune-ne localitatea', 'Deplasare în toată țara',
              'Ofertă gratuită la telefon', 'Puț forat de regulă în 1 zi'],
        'd': ['Ne deplasăm cu utilajul nostru în toată țara. Sună și spune-ne localitatea.',
              'Forăm, tubăm cu PVC și filtru, denisipăm și montăm pompa. Garanție în scris.',
              'Îți spunem prețul la telefon, gratuit, după ce ne spui unde ești și ce îți trebuie.',
              'Vezi pe site filmări reale de pe șantierele noastre înainte să ne suni.'],
    },
]

NEGATIVES = [
    'gratis', 'gratuit', 'cum sa', 'cum se', 'singur', 'manual', 'diy', 'burghiu', 'sfredel',
    'utilaj foraj', 'instalatie foraj', 'masina de forat', 'vanzare', 'de vanzare', 'second hand',
    'inchiriere', 'olx', 'emag', 'dedeman', 'leroy merlin', 'hornbach', 'altex', 'brico',
    'angajare', 'angajari', 'locuri de munca', 'job', 'joburi', 'salariu', 'sofer', 'operator',
    'curs', 'cursuri', 'facultate', 'licenta', 'pdf', 'wikipedia', 'definitie', 'ce inseamna',
    'petrol', 'petrolier', 'gaze', 'foraj orizontal', 'foraj dirijat', 'foraj sub drum',
    'inele beton', 'tuburi beton', 'fantana manuala', 'fantana decorativa', 'fantana arteziana parc',
    'minecraft', 'joc', 'desen', 'poze', 'imagini',
]

SITELINKS = [
    ('Cât costă un puț', 'Ce intră în preț', 'Ofertă gratuită', f'{SITE}/preturi/'),
    ('Filmări de pe șantier', 'Lucrări reale', 'Utilaj și materiale', f'{SITE}/portofoliu/'),
    ('Denisipare puțuri', 'Puțul scoate nisip?', 'Debitul revine', f'{SITE}/servicii/denisipari-puturi/'),
    ('Pompe și hidrofoare', 'Montaj la puț', 'Apa până în casă', f'{SITE}/servicii/sisteme-de-pompare/'),
    ('Acte Apele Române', 'Avize și autorizații', 'Ne ocupăm noi', f'{SITE}/servicii/avize-si-autorizatii/'),
    ('Contact', 'Telefon și WhatsApp', 'Răspundem imediat', f'{SITE}/contact/'),
]
CALLOUTS = ['Utilaj propriu', 'Echipă proprie', 'Ofertă gratuită', 'Garanție în scris',
            'Ne ocupăm de acte', 'Test de debit inclus', 'Lucrăm în toată țara', 'Tubaj PVC cu filtru']
SNIPPET = ('Servicii', ['Foraje puțuri apă', 'Denisipare puțuri', 'Foraje geotermale',
                        'Pompe și hidrofoare', 'Avize Apele Române', 'Mentenanță puțuri'])

# ---------- validare ----------
errors = []
def check(text, limit, what):
    if len(text) > limit:
        errors.append(f'{what} are {len(text)}/{limit}: {text!r}')
for g in GROUPS:
    hs = g['h'] + COMMON_H
    assert len(hs) <= 15, (g['name'], len(hs))
    if len(set(hs)) != len(hs): errors.append(f"titluri duplicate in {g['name']}")
    for h in hs: check(h, 30, f"titlu [{g['name']}]")
    for d in g['d']: check(d, 90, f"descriere [{g['name']}]")
    for p in g['path']: check(p, 15, 'cale')
for s in SITELINKS:
    check(s[0], 25, 'sitelink'); check(s[1], 35, 'sitelink d1'); check(s[2], 35, 'sitelink d2')
for c in CALLOUTS: check(c, 25, 'callout')
for v in SNIPPET[1]: check(v, 25, 'snippet')
if errors:
    print('\n'.join(errors)); sys.exit(1)

def write(name, header, rows):
    with open(os.path.join(OUT, name), 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f); w.writerow(header); w.writerows(rows)

# 1. Campanie
write('1-campanie.csv',
      ['Campaign', 'Campaign Type', 'Networks', 'Budget', 'Budget type', 'Bid Strategy Type',
       'Languages', 'Location', 'Campaign Status', 'Ad Schedule'],
      [[CAMPAIGN, 'Search', 'Google search', BUDGET, 'Daily', 'Maximize clicks',
        'ro', 'Romania', 'Paused',
        '(Monday[08:00-18:00]);(Tuesday[08:00-18:00]);(Wednesday[08:00-18:00]);(Thursday[08:00-18:00]);(Friday[08:00-18:00]);(Saturday[09:00-14:00])']])

# 2. Grupuri de anunturi
write('2-grupuri.csv', ['Campaign', 'Ad Group', 'Max CPC', 'Ad Group Status'],
      [[CAMPAIGN, g['name'], g['cpc'], 'Enabled'] for g in GROUPS])

# 3. Cuvinte cheie: expresie + exacta (fara broad la inceput, ca sa controlam bugetul)
kw_rows = []
for g in GROUPS:
    for k in g['kw']:
        kw_rows.append([CAMPAIGN, g['name'], k, 'Phrase', g['url'], 'Enabled'])
        kw_rows.append([CAMPAIGN, g['name'], k, 'Exact', g['url'], 'Enabled'])
write('3-cuvinte-cheie.csv', ['Campaign', 'Ad Group', 'Keyword', 'Criterion Type', 'Final URL', 'Status'], kw_rows)

# 4. Cuvinte cheie negative (la nivel de campanie)
write('4-negative.csv', ['Campaign', 'Keyword', 'Criterion Type'],
      [[CAMPAIGN, n, 'Campaign negative phrase'] for n in NEGATIVES])

# 5. Anunturi responsive (RSA). Fara numar de telefon in text (interzis de Google) -
#    numarul apare prin extensia de apel (9-apel.csv).
hdr = ['Campaign', 'Ad Group', 'Ad type']
hdr += [x for i in range(1, 16) for x in (f'Headline {i}', f'Headline {i} position')]
hdr += [f'Description {i}' for i in range(1, 5)] + ['Path 1', 'Path 2', 'Final URL', 'Status']
ad_rows = []
for g in GROUPS:
    hs = g['h'] + COMMON_H
    row = [CAMPAIGN, g['name'], 'Responsive search ad']
    for i in range(15):
        h = hs[i] if i < len(hs) else ''
        row += [h, '']
    row += g['d'] + list(g['path']) + [g['url'], 'Enabled']
    ad_rows.append(row)
write('5-anunturi.csv', hdr, ad_rows)

# 6. Extensii (assets)
write('6-sitelinkuri.csv', ['Campaign', 'Link Text', 'Description Line 1', 'Description Line 2', 'Final URL'],
      [[CAMPAIGN, *s] for s in SITELINKS])
write('7-callouts.csv', ['Campaign', 'Callout text'], [[CAMPAIGN, c] for c in CALLOUTS])
write('8-snippet.csv', ['Campaign', 'Header', 'Snippet Values'], [[CAMPAIGN, SNIPPET[0], ';'.join(SNIPPET[1])]])
write('9-apel.csv', ['Campaign', 'Phone Number', 'Country Code', 'Call reporting'],
      [[CAMPAIGN, '0761251596', 'RO', 'Enabled']])

print(f'OK: {len(GROUPS)} grupuri, {len(kw_rows)} cuvinte cheie, {len(NEGATIVES)} negative, '
      f'{len(ad_rows)} anunturi, {len(SITELINKS)} sitelinkuri, {len(CALLOUTS)} callouts -> {OUT}')


# ---------- Format pentru incarcarea in bloc din interfata web (Instrumente > Actiuni in bloc > Incarcari) ----------
WEB = os.path.join(os.path.dirname(__file__), 'import-web')
os.makedirs(WEB, exist_ok=True)
def wwrite(name, header, rows):
    with open(os.path.join(WEB, name), 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f); w.writerow(header); w.writerows(rows)

wwrite('1-campanie.csv',
       ['Row Type', 'Action', 'Campaign status', 'Campaign', 'Campaign type', 'Networks', 'Budget', 'Budget type',
        'Bid strategy type', 'Language', 'Location', 'EU political ads'],
       [['Campaign', 'Add', 'Paused', CAMPAIGN, 'Search', 'Google search', BUDGET, 'Daily', 'Maximize clicks', 'ro', 'Romania', 'No']])
wwrite('2-grupuri.csv', ['Row Type', 'Action', 'Ad group status', 'Campaign', 'Ad group', 'Ad group type', 'Default max. CPC'],
       [['Ad group', 'Add', 'Enabled', CAMPAIGN, g['name'], 'Standard', g['cpc']] for g in GROUPS])
krows = []
for g in GROUPS:
    for k in g['kw']:
        for t in ('Phrase match', 'Exact match'):
            krows.append(['Keyword', 'Add', 'Enabled', CAMPAIGN, g['name'], k, t, g['url']])
wwrite('3-cuvinte-cheie.csv', ['Row Type', 'Action', 'Keyword status', 'Campaign', 'Ad group', 'Keyword', 'Type', 'Final URL'], krows)
wwrite('4-negative.csv', ['Row Type', 'Action', 'Keyword status', 'Level', 'Campaign', 'Negative keyword', 'Type'],
       [['Negative keyword', 'Add', 'Enabled', 'Campaign', CAMPAIGN, n, 'Phrase match'] for n in NEGATIVES])
ah = ['Row Type', 'Action', 'Ad status', 'Campaign', 'Ad group', 'Ad type'] + [f'Headline {i}' for i in range(1, 16)] \
     + [f'Description {i}' for i in range(1, 5)] + ['Path 1', 'Path 2', 'Final URL']
arows = []
for g in GROUPS:
    hs = (g['h'] + COMMON_H + [''] * 15)[:15]
    arows.append(['Ad', 'Add', 'Enabled', CAMPAIGN, g['name'], 'Responsive search ad'] + hs + g['d'] + list(g['path']) + [g['url']])
wwrite('5-anunturi.csv', ah, arows)
print('web ->', WEB)
