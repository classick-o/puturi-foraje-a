"""Campania de Search pentru AquaFor (forajedenisipariputuri.web.app, cont Google Ads 1260797466).
Ruleaza: python3 google-ads/aquafor/genereaza.py -> CSV-uri pentru Instrumente > Actiuni in bloc > Incarcari.
"""
import csv, os, sys

OUT = os.path.join(os.path.dirname(__file__), 'import-web')
os.makedirs(OUT, exist_ok=True)
SITE = 'https://forajedenisipariputuri.web.app'
CAMPAIGN = 'AquaFor - Search - Foraje puturi (nou)'
BUDGET = '100'
# Aceleasi zone pe care le tintea si campania veche
LOCATIONS = ['Bucharest, Romania', 'Ilfov County, Romania', 'Dambovita, Romania',
             'Teleorman, Romania', 'Dolj County, Romania', 'Ialomita County, Romania']  # numele exacte din lista Google

COMMON_H = ['Sunați oricând, 24/7', 'Evaluare inițială gratuită', 'Peste 20 de ani în foraje',
            'Garanție pentru fiecare puț', 'Ofertă pe loc la telefon', 'Scrie-ne pe WhatsApp']

COUNTY = {  # cuvant cheie -> pagina judetului
    'bucuresti': 'foraje-puturi-bucuresti', 'ilfov': 'foraje-puturi-ilfov', 'dambovita': 'foraje-puturi-dambovita',
    'teleorman': 'foraje-puturi-teleorman', 'dolj': 'foraje-puturi-dolj', 'ialomita': 'foraje-puturi-ialomita',
    'targoviste': 'foraje-puturi-dambovita', 'craiova': 'foraje-puturi-dolj', 'alexandria': 'foraje-puturi-teleorman',
    'slobozia': 'foraje-puturi-ialomita', 'voluntari': 'foraje-puturi-ilfov', 'buftea': 'foraje-puturi-ilfov',
    'otopeni': 'foraje-puturi-ilfov', 'chitila': 'foraje-puturi-ilfov', 'bragadiru': 'foraje-puturi-ilfov',
    'magurele': 'foraje-puturi-ilfov', 'pantelimon': 'foraje-puturi-ilfov', 'popesti leordeni': 'foraje-puturi-ilfov',
    'snagov': 'foraje-puturi-ilfov', 'corbeanca': 'foraje-puturi-ilfov', 'balotesti': 'foraje-puturi-ilfov',
}

GROUPS = [
    {
        'name': 'Foraj put apa', 'url': f'{SITE}/', 'path': ('foraje', 'puturi-apa'), 'cpc': '3.50',
        'kw': ['foraj put', 'foraje puturi', 'foraj put apa', 'foraje puturi apa', 'firma foraj put', 'firma foraje puturi',
               'forare put', 'put forat', 'puturi forate', 'foraj fantana', 'fantana forata', 'foraj apa', 'executie put forat'],
        'h': ['Foraje puțuri de apă', 'AquaFor - foraje puțuri', 'Foraj la orice adâncime', 'Tub PVC 140 mm și filtru',
              'Lucrare la cheie', 'Apă curată, debit constant', 'Puțuri pentru case și ferme', 'Foraje mică și mare adâncime', 'Bază în Buftea, Ilfov'],
        'd': ['Foraje puțuri de apă, denisipări și adânciri. Sunați 24/7 pentru o ofertă pe loc.',
              'Tubăm cu PVC ecologic de 140 mm, cu decantor și filtru screen. Garanție la fiecare puț.',
              'Peste 20 de ani de experiență în foraje. Evaluarea inițială e gratuită.',
              'Calculați online prețul orientativ al forajului, apoi sunați pentru prețul exact.'],
    },
    {
        'name': 'Pret foraj put', 'url': f'{SITE}/calculator-pret', 'path': ('calculator', 'pret-foraj'), 'cpc': '3.50',
        'kw': ['pret foraj put', 'pret put forat', 'cat costa un put forat', 'cat costa forarea unui put', 'foraj put pret',
               'pret foraj put apa', 'foraj put pret metru', 'pret metru foraj', 'cost put forat', 'calculator pret foraj'],
        'h': ['Cât costă un puț forat?', 'Calculator preț foraj', 'Estimare online, gratuită', 'Prețul exact, la telefon',
              'Preț pe adâncime și diametru', 'Fără costuri ascunse', 'Foraje puțuri de apă', 'Calculați în 1 minut', 'Ofertă clară înainte de foraj'],
        'd': ['Alegeți județul, adâncimea și diametrul și vedeți pe loc o estimare a prețului.',
              'Pentru prețul exact sunați-ne oricând: vă spunem ce intră în lucrare, fără surprize.',
              'Tub PVC de 140 mm, filtru screen și decantor incluse în lucrare. Garanție în contract.',
              'Evaluarea inițială e gratuită. Lucrăm în București, Ilfov și județele din jur.'],
    },
    {
        'name': 'Denisipare put', 'url': f'{SITE}/', 'path': ('denisipare', 'put'), 'cpc': '2.50',
        'kw': ['denisipare put', 'denisipare puturi', 'denisipare put forat', 'curatare put forat', 'curatare put', 'put cu nisip',
               'put infundat', 'put colmatat', 'pret denisipare put', 'cat costa denisiparea unui put'],
        'h': ['Denisipări puțuri', 'Puțul scoate nisip?', 'Puț colmatat sau înfundat?', 'Refacem debitul puțului',
              'Protejăm pompa de nisip', 'Curățare puț de nisip și mâl', 'Intervenim rapid', 'Denisipare la preț corect', 'Echipă cu experiență'],
        'd': ['Scoatem nisipul și mâlul din puț și refacem debitul. Sunați 24/7 pentru programare.',
              'Un puț curat protejează pompa submersibilă. Vă spunem la telefon ce trebuie făcut.',
              'Peste 20 de ani de experiență în foraje și denisipări. Evaluare inițială gratuită.',
              'Lucrăm în București, Ilfov, Dâmbovița, Teleorman, Dolj și Ialomița.'],
    },
    {
        'name': 'Put secat adancire', 'url': f'{SITE}/blog/put-secat-adancire-sau-foraj-nou', 'path': ('put-secat', 'adancire'), 'cpc': '2.50',
        'kw': ['put secat', 'put fara apa', 'adancire put', 'adancire put forat', 'put nu mai are apa', 'putul nu mai da apa',
               'reparatii puturi', 'reparatie put forat', 'reabilitare put'],
        'h': ['Puțul a secat?', 'Adâncim puțul existent', 'Adâncire sau foraj nou?', 'Reparații puțuri forate',
              'Vă spunem ce merită făcut', 'Apă din nou în puț', 'Echipă cu experiență', 'Verificăm puțul vechi', 'Intervenim rapid'],
        'd': ['Puțul nu mai dă apă? Verificăm dacă merită adâncit sau e nevoie de un foraj nou.',
              'Adâncim, reparăm și denisipăm puțuri. Sunați oricând pentru o evaluare gratuită.',
              'Peste 20 de ani de experiență în foraje. Garanție pentru fiecare lucrare.',
              'Lucrăm în București, Ilfov și județele din jur, cu echipamentele noastre.'],
    },
    {
        'name': 'Foraj put zona', 'url': f'{SITE}/', 'path': ('foraje', 'zona-ta'), 'cpc': '3.00',
        'kw': list(COUNTY.keys()),  # se transforma mai jos in "foraj put <zona>" + "foraje puturi <zona>"
        'h': ['Foraje puțuri în zona ta', 'Foraje puțuri Ilfov', 'Foraje puțuri București', 'Venim cu utilajul la tine',
              'Cunoaștem straturile locale', 'Bază în Buftea, Ilfov', 'Foraj la adâncimea potrivită', 'Intervenim rapid', 'Foraje puțuri de apă'],
        'd': ['Forăm în București, Ilfov, Dâmbovița, Teleorman, Dolj și Ialomița. Sunați 24/7.',
              'Știm la ce adâncime e apa bună în zona ta. Evaluarea inițială e gratuită.',
              'Tub PVC de 140 mm, filtru screen și decantor. Garanție pentru fiecare puț.',
              'Peste 20 de ani de experiență în foraje, denisipări, adânciri și reparații.'],
    },
]

NEGATIVES = ['gratis', 'cum sa', 'cum se', 'singur', 'manual', 'diy', 'burghiu', 'sfredel', 'utilaj foraj',
             'instalatie foraj', 'masina de forat', 'de vanzare', 'second hand', 'inchiriere', 'olx', 'emag',
             'dedeman', 'leroy merlin', 'hornbach', 'brico', 'angajare', 'angajari', 'locuri de munca', 'job',
             'salariu', 'curs', 'facultate', 'licenta', 'pdf', 'wikipedia', 'definitie', 'ce inseamna', 'petrol',
             'gaze', 'foraj orizontal', 'foraj dirijat', 'inele beton', 'tuburi beton', 'fantana decorativa',
             'minecraft', 'joc', 'imagini', 'aquaforaj', 'acviforaj']

errors = []
for g in GROUPS:
    hs = g['h'] + COMMON_H
    if len(hs) > 15 or len(set(hs)) != len(hs): errors.append(f"titluri {g['name']}: {len(hs)} / duplicate")
    errors += [f'titlu {len(h)}: {h}' for h in hs if len(h) > 30]
    errors += [f'descriere {len(d)}: {d}' for d in g['d'] if len(d) > 90]
    errors += [f'cale: {p}' for p in g['path'] if len(p) > 15]
if errors: print('\n'.join(errors)); sys.exit(1)

def w(name, header, rows):
    with open(os.path.join(OUT, name), 'w', newline='', encoding='utf-8') as f:
        c = csv.writer(f); c.writerow(header); c.writerows(rows)

w('1-campanie.csv', ['Row Type', 'Action', 'Campaign status', 'Campaign', 'Campaign type', 'Networks', 'Budget', 'Budget type',
                     'Bid strategy type', 'Language', 'Location', 'EU political ads'],
  [['Campaign', 'Add', 'Paused', CAMPAIGN, 'Search', 'Google search', BUDGET, 'Daily', 'Maximize clicks', 'ro', ';'.join(LOCATIONS), 'No']])
w('2-grupuri.csv', ['Row Type', 'Action', 'Ad group status', 'Campaign', 'Ad group', 'Ad group type', 'Default max. CPC'],
  [['Ad group', 'Add', 'Enabled', CAMPAIGN, g['name'], 'Standard', g['cpc']] for g in GROUPS])
kr = []
for g in GROUPS:
    for k in g['kw']:
        if g['name'] == 'Foraj put zona':
            for kk in (f'foraj put {k}', f'foraje puturi {k}'):
                for t in ('Phrase match', 'Exact match'):
                    kr.append(['Keyword', 'Add', 'Enabled', CAMPAIGN, g['name'], kk, t, f'{SITE}/{COUNTY[k]}'])
        else:
            for t in ('Phrase match', 'Exact match'):
                kr.append(['Keyword', 'Add', 'Enabled', CAMPAIGN, g['name'], k, t, g['url']])
w('3-cuvinte-cheie.csv', ['Row Type', 'Action', 'Keyword status', 'Campaign', 'Ad group', 'Keyword', 'Type', 'Final URL'], kr)
w('4-negative.csv', ['Row Type', 'Action', 'Keyword status', 'Level', 'Campaign', 'Negative keyword', 'Type'],
  [['Negative keyword', 'Add', 'Enabled', 'Campaign', CAMPAIGN, n, 'Phrase match'] for n in NEGATIVES])
ah = ['Row Type', 'Action', 'Ad status', 'Campaign', 'Ad group', 'Ad type'] + [f'Headline {i}' for i in range(1, 16)] \
     + [f'Description {i}' for i in range(1, 5)] + ['Path 1', 'Path 2', 'Final URL']
w('5-anunturi.csv', ah, [['Ad', 'Add', 'Enabled', CAMPAIGN, g['name'], 'Responsive search ad'] + (g['h'] + COMMON_H + [''] * 15)[:15]
                         + g['d'] + list(g['path']) + [g['url']] for g in GROUPS])
print(f'OK: {len(GROUPS)} grupuri, {len(kr)} cuvinte cheie, {len(NEGATIVES)} negative -> {OUT}')
