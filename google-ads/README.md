# Campania Google Ads - forajeputurideapa.ro

Campanie de Search, făcută pentru telefoane: oamenii caută „foraj puț”, văd anunțul cu numărul și sună.

## Ce conține

| Fișier | Ce e |
|---|---|
| `1-campanie.csv` | Campania: doar Google Search (fără Display, fără parteneri), România, limba română, 60 lei/zi, **pe pauză** |
| `2-grupuri.csv` | 6 grupuri: foraj puț, preț, casă/grădină/irigații, denisipare, pompe de căldură, județe |
| `3-cuvinte-cheie.csv` | 148 de cuvinte cheie, potrivire expresie + exactă (fără „broad” la început, ca să nu se ducă bugetul pe căutări greșite) |
| `4-negative.csv` | 55 de cuvinte negative: „cum să”, „de vânzare”, „olx”, „angajare”, „utilaj foraj”, „petrol” etc. |
| `5-anunturi.csv` | Un anunț responsive pe grup, câte 15 titluri și 4 descrieri, fiecare pe pagina potrivită |
| `6`-`9` | Sitelinkuri, callouts, servicii (snippet) și extensia de apel cu 0761 251 596 |

Programul anunțurilor: L-V 08-18, S 09-14, adică doar când răspunde cineva la telefon. Dacă răspundeți și în afara programului, lărgiți-l.

## Cum o importi (Google Ads Editor, gratuit)

1. Instalează Google Ads Editor și descarcă contul.
2. `Cont > Import > Din fișier` și importă fișierele **în ordine**, de la 1 la 9.
3. Verifică în dreapta-jos că nu sunt erori, apoi `Postează`.
4. Campania apare în cont **pe pauză**. Nu cheltuie nimic până nu o pornești.

## Înainte să o pornești

1. **Bugetul.** 60 lei/zi e un punct de plecare. Schimbă-l dacă vrei altă sumă.
2. **Urmărirea conversiilor.** Creează în Google Ads conversiile „Clic pe telefon”, „Clic WhatsApp”, „Formular trimis” și „Apeluri din anunțuri” (minim 60 sec). Pune ID-urile în `src/lib/tracking.ts` și publică site-ul din nou. Fără ele, Google nu știe ce anunț aduce clienți.
3. **Licitarea.** Pornește cu „Maximize clicks” și CPC maxim 3-4 lei. După ~30 de conversii, treci pe „Maximize conversions” sau „Target CPA”.
4. **Locația.** În setări, la „Opțiuni de locație”, alege „Prezență: oameni aflați în locațiile vizate”. Altfel apari și pentru cei care doar se interesează de România din altă țară.

## Prima lună

- În fiecare săptămână deschide **Termeni de căutare** și adaugă la negative tot ce nu e client (ex. „foraj put singur”, „preț burghiu”).
- Termenii buni care nu sunt în listă adaugă-i în grupul potrivit.
- Dacă un județ nu aduce apeluri sau e prea departe, scade-l din locații sau pune o ajustare negativă.

## Modificări

Textele și cuvintele cheie sunt în `genereaza.py`. După ce schimbi ceva, rulează `python3 google-ads/genereaza.py`. Scriptul verifică singur limitele Google (titlu 30 caractere, descriere 90) și refuză textele prea lungi.
