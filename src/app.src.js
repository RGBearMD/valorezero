(function(){
  var POP = 58943000;
  var S365 = 31536000;
  var WIN = 'ago 2025–lug 2026';
  var ISTAT_SRC = 'ISTAT, macellazioni mensili (dataset 101_1033), capi macellati';
  var ISTAT_URL = 'https://dati.istat.it/';
  var LEVELS = {off:['b-off','Ufficiale'], ter:['b-ter','Riportato da terzi'], ass:['b-ass','Associazione'],
    est:['b-est','Stima non ufficiale'], mass:['b-mass','Dato di massa'], nd:['b-nd','Dato nazionale non disponibile']};

  /* ---------- dati ---------- */
  var GROUPS = [
    ['bovini','Bovini'],['bufalini','Bufalini'],['suini','Suini'],['avicoli','Polli, galline, tacchini e altri uccelli'],
    ['ovini','Ovini'],['caprini','Caprini'],['equini','Equini'],['conigli','Conigli'],['acq','Pesci e molluschi'],['altri','Senza contatore']
  ];
  var ITEMS = [];
  function A(g,id,name,sg,pl,n,icon,extra){
    var o={g:g,id:id,name:name,sg:sg,pl:pl,n:n,icon:icon,lv:['off'],unit:'animali',year:WIN,secs:S365,kind:'Macellazione',src:ISTAT_SRC,url:ISTAT_URL};
    for(var k in (extra||{}))o[k]=extra[k];
    ITEMS.push(o);return o;
  }
  var PSA='Abbattimenti sanitari documentati: peste suina africana, 89.458 suini in circa 60 giorni del 2024 (al 20/9, Ministero della Salute citato da Il Fatto Alimentare, riportato da terzi). Non inclusi nel contatore.';
  var DNC='Abbattimenti sanitari documentati: dermatite nodulare in Sardegna, 759 bovini abbattuti nel 2025 al 24/9 (Quotidiano Sanità, riportato da terzi). Non inclusi nel contatore.';
  var AVI='Abbattimenti per influenza aviaria: oltre 7,5 milioni di avicoli da marzo 2024 a marzo 2026, 150 focolai, tutte le specie (Greenpeace Italia, riportato da terzi). Non inclusi nel contatore.';

  A('bovini','bov','Bovini (totale)','bovino','bovini',2402197,'cow',{def:'Totale ISTAT dei bovini macellati: comprende vitelli, vitelloni, manzi, buoi, tori e vacche. Le altre schede bovine sono componenti di questo totale.',extra:DNC});
  A('bovini','vit','Vitelli','vitello','vitelli',629165,'calf',{in:'Bovini (totale)',def:'ISTAT «vitelli»: 560.909 sotto gli 8 mesi e 68.256 da 8 mesi in su.',why:'I vitelli maschi dell\'industria del latte, non destinati alla rimonta, sono avviati all\'ingrasso o alla macellazione.'});
  A('bovini','vtm','Vitelloni maschi e manzi','vitellone','vitelloni',706487,'cow',{in:'Bovini (totale)',def:'ISTAT «vitelloni maschi e manzi». ISTAT non separa i manzi dai vitelloni maschi.'});
  A('bovini','vtf','Vitelloni femmine','vitellone femmina','vitelloni femmina',574303,'cow',{in:'Bovini (totale)',def:'ISTAT «vitelloni femmine».'});
  A('bovini','buo','Buoi','bue','buoi',3649,'cow',{in:'Bovini (totale)',def:'ISTAT «buoi».'});
  A('bovini','tor','Tori','toro','tori',11546,'cow',{in:'Bovini (totale)',def:'ISTAT «tori».'});
  A('bovini','vac','Vacche','vacca','vacche',477047,'cow',{in:'Bovini (totale)',def:'ISTAT «vacche».',why:'Le vacche da latte sono macellate a fine carriera produttiva.'});

  A('bufalini','buf','Bufalini (totale)','bufalino','bufalini',97839,'buf',{def:'ISTAT «totale bufalini». La consistenza BDN (437.521 capi al 31/12/2024) non è un flusso e non entra nel contatore.'});
  A('bufalini','ann','Annutoli (vitelli bufalini)','annutolo','annutoli',63051,'buf',{in:'Bufalini (totale)',def:'ISTAT «annutoli», i vitelli bufalini.'});
  A('bufalini','bfl','Bufale','bufala','bufale',30576,'buf',{in:'Bufalini (totale)',def:'ISTAT «bufale».'});

  A('suini','sui','Suini (totale)','suino','suini',9869286,'pig',{def:'ISTAT «totale suini». Le categorie di dettaglio non si sommano al totale.',extra:PSA});
  A('suini','lat','Lattonzoli','lattonzolo','lattonzoli',351984,'pig',{in:'Suini (totale)',def:'ISTAT «lattonzoli».'});
  A('suini','mag','Suini da 30 a 100 kg','suino da 30 a 100 kg','suini da 30 a 100 kg',825317,'pig',{in:'Suini (totale)',def:'ISTAT «suini da 30 a 100 kg». Non è verificato se coincida con la categoria «magroni».'});
  A('suini','sgr','Suini grassi','suino grasso','suini grassi',9043969,'pig',{in:'Suini (totale)',def:'ISTAT «suini grassi» (oltre 100 kg).'});

  A('avicoli','pgt','Polli e galline (totale)','pollo o gallina','polli e galline',636574567,'hen',{def:'ISTAT «totale polli e galline»: polli da carne, galline da uova e galline da riproduzione.',extra:AVI});
  A('avicoli','pcl','Polli da carne sotto i 2 kg','pollo','polli da carne sotto i 2 kg',182255488,'hen',{in:'Polli e galline (totale)',def:'ISTAT «polli da carne minori di 2 kg».'});
  A('avicoli','pch','Polli da carne sopra i 2 kg','pollo','polli da carne sopra i 2 kg',427744255,'hen',{in:'Polli e galline (totale)',def:'ISTAT «polli da carne maggiori di 2 kg».'});
  A('avicoli','gov','Galline da uova','gallina ovaiola','galline ovaiole',22223619,'hen',{in:'Polli e galline (totale)',def:'ISTAT «galline da uova»: galline a fine ciclo avviate al macello. Gli abbattimenti sanitari fuori macello non sono in questo dato. La cifra di 17,4 milioni, che circola in fonti secondarie, non è stata ritrovata e non è usata.',why:'Una gallina ovaiola produce uova per un periodo limitato, poi la produzione cala e l\'allevamento la sostituisce. A fine ciclo è avviata alla macellazione (la «riforma»). Una seconda causa è l\'abbattimento sanitario in caso di focolaio, per esempio di influenza aviaria.'});
  A('avicoli','grp','Galline da riproduzione','gallina da riproduzione','galline da riproduzione',4351205,'hen',{in:'Polli e galline (totale)',def:'ISTAT «galline da riproduzione».'});
  A('avicoli','tac','Tacchini','tacchino','tacchini',23942067,'turkey',{def:'ISTAT «tacchini»: maschi da carne 11.916.044, femmine da carne 11.699.398, da riproduzione 326.625.'});
  A('avicoli','qua','Quaglie','quaglia','quaglie',7676600,'bird',{def:'ISTAT «quaglie».'});
  A('avicoli','pic','Piccioni','piccione','piccioni',37438,'bird',{def:'ISTAT «piccioni».'});
  A('avicoli','far','Faraone','faraona','faraone',3145563,'bird',{def:'ISTAT «faraone».'});
  A('avicoli','ana','Anatre','anatra','anatre',1191412,'bird',{def:'ISTAT «anatre».'});
  ITEMS.push({g:'avicoli',id:'pul',name:'Pulcini maschi di linea ovaiola',sg:'pulcino',pl:'pulcini',icon:'chick',lv:['est'],secs:S365,unit:'animali',kind:'Eliminazione alla schiusa',year:'media su 365 giorni',
    presets:[{l:'30 milioni · Il Fatto Alimentare',n:30000000},{l:'34 milioni · Greenme',n:34000000},{l:'40 milioni · Animal Equality',n:40000000}],n:30000000,
    def:'Stime di terzi, anno e metodo non verificati. Non esiste un dato ufficiale nazionale. Scegli una stima: il contatore si adatta.',
    src:'Stime di terzi (giornalistiche e di associazione)',url:'',
    why:'I pulcini maschi delle linee selezionate per le uova non producono uova e non sono selezionati per la carne. Finora sono stati eliminati poco dopo la schiusa, di norma entro le prime 24 ore, con gassificazione o con macerazione. Il D.Lgs. 7 dicembre 2023, n. 205 (art. 3) vieta l\'abbattimento selettivo dal 31 dicembre 2026 e fissa la stessa data per il divieto di triturazione. Alternative documentate: determinazione del sesso nell\'uovo e linee a duplice attitudine.',countdown:true});

  A('ovini','ovi','Ovini (totale)','ovino','ovini',2036559,'sheep',{def:'ISTAT «totale ovini»: agnelli, agnelloni, pecore, montoni. Le altre schede ovine sono componenti.'});
  A('ovini','pec','Pecore','pecora','pecore',428958,'sheep',{in:'Ovini (totale)',def:'ISTAT «pecore».'});
  A('ovini','mon','Montoni','montone','montoni',58484,'sheep',{in:'Ovini (totale)',def:'ISTAT «montoni».'});
  A('ovini','agn','Agnelli','agnello','agnelli',1389005,'sheep',{in:'Ovini (totale)',def:'ISTAT «agnelli». Le soglie di età o peso di ISTAT non sono state verificate.'});
  A('ovini','agl','Agnelloni','agnellone','agnelloni',155085,'sheep',{in:'Ovini (totale)',def:'ISTAT «agnelloni».'});

  A('caprini','cap','Caprini (totale)','caprino','caprini',124970,'goat',{def:'ISTAT «totale caprini»: capre, becchi, capretti e caprettoni.'});
  A('caprini','cpa','Capre','capra','capre',36635,'goat',{in:'Caprini (totale)',def:'ISTAT «capre».'});
  A('caprini','bec','Becchi','becco','becchi',10167,'goat',{in:'Caprini (totale)',def:'ISTAT «becchi».'});
  A('caprini','cpt','Capretti e caprettoni','capretto','capretti',78168,'goat',{in:'Caprini (totale)',def:'ISTAT «capretti e caprettoni».'});

  A('equini','equ','Equini (totale)','equino','equini',19374,'horse',{def:'ISTAT «totale equini»: cavalli, asini, muli e bardotti. La macellazione alimentare richiede la qualifica DPA e l\'idoneità legale; un cavallo ritirato dallo sport non è destinato automaticamente al macello.',extra:'Altre cifre del 2024 con perimetri diversi: Eurostat 23.790 equidi, BDN 10.156 cavalli, Vetinfo circa 17.000. Non sono alternative a questo dato.'});
  A('equini','cav','Cavalli','cavallo','cavalli',16536,'horse',{in:'Equini (totale)',def:'ISTAT «cavalli».'});
  A('equini','asi','Asini','asino','asini',2062,'horse',{in:'Equini (totale)',def:'ISTAT «asini».'});
  A('equini','mul','Muli e bardotti','mulo o bardotto','muli e bardotti',776,'horse',{in:'Equini (totale)',def:'ISTAT «muli e bardotti».'});

  A('conigli','con','Conigli','coniglio','conigli',12714970,'rabbit',{def:'ISTAT «totale conigli». Annuale ISTAT: 13.709.624 nel 2024 e 12.699.382 nel 2025. Macelli registrati: la macellazione in azienda non è inclusa. La cifra di 14.507.537 (CIWF) non è confermata.'});

  ITEMS.push({g:'acq',id:'pes',name:'Pesci d\'acquacoltura',sg:'pesce',pl:'pesci',icon:'fish',lv:['off','mass'],n:50553000,unit:'kg',year:2023,secs:S365,kind:'Produzione in peso',
    def:'50.553 t di pesci (37.304 t acqua dolce, 13.249 t marino; trota 34.143 t). Escluso il totale dei molluschi. Non indica il numero di pesci né che tutta la biomassa sia stata uccisa nell\'anno.',
    src:'ISPRA, indicatori ambientali (dati MASAF-CREA ed Eurostat)',url:'https://indicatoriambientali.isprambiente.it/en/node/4965'});
  ITEMS.push({g:'acq',id:'mol',name:'Molluschi d\'acquacoltura',sg:'mollusco',pl:'molluschi',icon:'shell',lv:['off','mass'],n:79160000,unit:'kg',year:2023,secs:S365,kind:'Produzione in peso',
    def:'79.160 t. Vongola filippina 21.547 t (ISPRA); le cozze sono circa il 44% della produzione nazionale. Lettura Eurostat da verificare. Non è un conteggio di individui.',
    src:'Eurostat fish_aq2a e ISPRA',url:'https://indicatoriambientali.isprambiente.it/en/node/4965'});

  var NONE = [
    {id:'api',name:'Api',lv:['nd'],
     why:'Non è calcolabile un numero di api uccise. L\'unità pertinente è la colonia, e non c\'è un dato nazionale sulle colonie distrutte per ordine sanitario.',
     vals:[['Alveari censiti 2022','1.573.967 (BDN, via Osservatorio Nazionale Miele)']],
     note:'Gli alveari censiti non sono un denominatore delle uccisioni. Servono apiari, colonie distrutte, patologia, regione e data dell\'ordine.'},
    {id:'ric',name:'Animali nella ricerca',lv:['ass','nd'],
     why:'Il dato riguarda gli utilizzi, non le uccisioni. La quota soppressa a fine procedura non è stata trovata. Per questo non c\'è un contatore di uccisioni.',
     vals:[['Utilizzati 2024','368.058 (Gazzetta Ufficiale 21/05/2026, via LAV)'],['Utilizzati 2022','420.506']],
     note:'La Gazzetta non è stata aperta: la distinzione tra utilizzati, uccisi e soppressi resta da verificare lì.'}
  ];

  var SOURCES = [
    ['ISTAT, popolazione residente al 1° gennaio 2026 (provvisorio), 58.943.000','Base dei confronti con la popolazione','Ufficiale','https://www.istat.it/wp-content/uploads/2026/03/Report_Indicatori-demografici_Anno-2025.pdf'],
    ['ISTAT, macellazioni: dataset 101_1033 (mensile carni rosse, mensile e annuale carni bianche)','Capi macellati di bovini, bufalini, suini, ovini, caprini, equini, avicoli, conigli','Ufficiale (file forniti dall\'utente)','https://dati.istat.it/'],
    ['ISMEA, Scheda di settore cunicolo n. 41/2026 (su dati ISTAT)','Conigli: peso morto','Ufficiale (file forniti dall\'utente)','https://www.ismeamercati.it/'],
    ['ISPRA, indicatori ambientali: acquacoltura','Pesci e molluschi (t)','Ufficiale','https://indicatoriambientali.isprambiente.it/en/node/4965'],
    ['Eurostat, apro_mt_pann (macellazioni)','Confronto 2024: bovini, suini, equidi','Ufficiale','https://ec.europa.eu/eurostat/databrowser/view/apro_mt_pann'],
    ['Greenspoon, Ramot, Moran et al. (2025), Nature Communications 16, 8338','Biomassa dei mammiferi dal 1850','Peer-reviewed','https://www.nature.com/articles/s41467-025-63888-z'],
    ['CIWF Polska 2024, rapporto sui conigli','Cifra 14.507.537 (non usata)','Associazione','https://www.ciwf.pl/media/7459473/sledztwo-na-fermach-krolikow-w-ue-raport-compassion-in-world-farming-polska-2024.pdf'],
    ['ARSIAL, su BDN','Consistenza bufalini','Riportato da terzi','https://www.arsial.it/wp-content/uploads/2026/02/Rapporto-di-ricerca_ARSIAL_DIPEG_La-produzione-di-latte-bufalino-nella-Regione-Lazio.pdf'],
    ['Il Fatto Alimentare (Ministero della Salute)','Abbattimenti peste suina africana','Riportato da terzi','https://ilfattoalimentare.it/peste-suina-dati-governo.html'],
    ['Quotidiano Sanità','Abbattimenti dermatite nodulare','Riportato da terzi','https://www.quotidianosanita.it/regioni-e-asl/dermatite-bovina-in-sardegna-vaccinato-il-dei-capi-confermati-focolai/'],
    ['Greenpeace Italia, 06/03/2026','Abbattimenti aviaria','Riportato da terzi (ONG)','https://www.greenpeace.org/italy/comunicato-stampa/30310/aviaria-spese-milionarie-e-declino-piccole-aziende-a-due-anni-dalla-proposta-di-legge-contro-gli-allevamenti-intensivi-e-ora-di-andare-oltre/'],
    ['D.Lgs. 205/2023, art. 3 (testo su MioLegale)','Divieto di abbattimento dei pulcini maschi dal 31/12/2026','Norma (Gazzetta non consultata direttamente)','https://miolegale.it/norme/dlgs-205-2023-abbattimento-animali/'],
    ['Osservatorio Nazionale Miele (BDN)','Alveari','Associazione','https://www.apicolturaonline.it/report2023.pdf'],
    ['LAV, comunicato 05/06/2026 (Gazzetta Ufficiale n. 116)','Animali nella ricerca','Associazione','https://static.lav.it/press-review/20260605-cs-lav-rsa-statistiche-sperimentazione-animale.pdf'],
    ['ISMEA, Schede Avicoli 2026, Bovino 2025, Suini 2026 e Tendenze Uova 2026 (su dati ISTAT)','Consumo apparente pro capite: avicola 23 kg (2025), bovina 15,3 kg (2024), uova 230 (2025); suini 2.234.000 t (2025)','Ufficiale (file forniti dall\'utente)','https://www.ismeamercati.it/'],
    ['Ferrari et al. (2020), studio di modellizzazione sulle diete italiane (Sapienza)','Consumi osservati e dieta modellizzata in Italia','Peer-reviewed','https://iris.uniroma1.it/retrieve/e3835325-fe7b-15e8-e053-a505fe0a3de9/Ferrari_Could-Dietary_2020.pdf'],
    ['Greenspoon et al. (2023), The global biomass of wild mammals, PNAS','Biomassa dei mammiferi selvatici, con umani e bestiame','Peer-reviewed','https://doi.org/10.1073/pnas.2204892120'],
    ['Bar-On, Phillips, Milo (2018), The biomass distribution on Earth, PNAS','Biomassa di uccelli allevati e selvatici','Peer-reviewed','https://doi.org/10.1073/pnas.1711842115'],
    ['Our World in Data, Wild mammals and birds biomass (1/12/2025)','Quote di biomassa di mammiferi e uccelli','Divulgativa su fonti peer-reviewed','https://ourworldindata.org/wild-mammals-birds-biomass'],
    ['CREA, Studio sui consumi alimentari in Italia IV SCAI, Volume 1 (2023, agg. gennaio 2024)','Consumo effettivo in g al giorno, 3–74 anni, 2017–2020','Ufficiale','https://www.crea.gov.it/en/web/alimenti-e-nutrizione/attività-istituzionali'],
    ['ASSICA, comunicato Assemblea annuale 2025 (26/06/2025)','Salumi 16,5 kg pro capite (2024); salumi più carne suina fresca 27,6 kg','Associazione di categoria','https://www.assica.it/news/salumi-italiani-nel-2024-cresce-la-produzione-ed-export-ma-calano-i-consumi-interni/'],
    ['EUMOFA, scheda Italia','Consumo apparente di prodotti ittici 30,38 kg pro capite (2023, peso vivo equivalente)','Ufficiale (Commissione europea)','https://fishery-aquaculture-market-observatory.ec.europa.eu/en/country-and-species-profiles/country-profiles/italy'],
    ['Our World in Data, grafici sulla biomassa (CC BY)','Immagini della pagina Biomassa','Divulgativa su fonti peer-reviewed','https://ourworldindata.org/wild-mammals-birds-biomass'],
    ['Scarborough et al. (2023), Vegans, vegetarians, fish-eaters and meat-eaters in the UK show discrepant environmental impacts, Nature Food','Impatto ambientale per tipo di dieta (Regno Unito)','Peer-reviewed','https://doi.org/10.1038/s43016-023-00795-w'],
    ['Poore e Nemecek (2018), Reducing food\'s environmental impacts through producers and consumers, Science 360','Effetti globali di una dieta senza prodotti animali','Peer-reviewed','https://doi.org/10.1126/science.aaq0216'],
    ['Rosi et al. (2017), Environmental impact of omnivorous, ovo-lacto-vegetarian, and vegan diet, Scientific Reports 7:6105','Consumi e impronte di tre gruppi di 51 adulti italiani (diario di 7 giorni)','Peer-reviewed (campione non rappresentativo)','https://doi.org/10.1038/s41598-017-06466-8'],
    ['ISTAT, macellazioni mensili (dataset 101_1033), elaborazione: peso morto ÷ capi, peso vivo, resa, ago 2025–lug 2026','Peso medio per capo nelle schede degli animali','Ufficiale (elaborazione)','https://dati.istat.it/'],
    ['CREA, Tabelle di composizione degli alimenti (BDA), pagine alimentinutrizione.it, aggiornate a dicembre 2019','Composizione di 19 alimenti per 100 g (pagina Confronti nutrizionali)','Ufficiale (valori in parte calcolati o imputati)','https://www.alimentinutrizione.it/tabelle-nutrizionali'],
    ['EFSA, Dietary Reference Values, tabelle di sintesi (gennaio 2017)','Riferimenti giornalieri per adulti','Ufficiale (UE)','https://www.efsa.europa.eu/sites/default/files/assets/DRV_Summary_tables_jan_17.pdf'],
    ['NHS, The vegan diet','Vitamina B12 nelle diete vegane','Ufficiale (Servizio sanitario britannico)','https://www.nhs.uk/content-widgets/live-well/eat-well/how-to-eat-a-balanced-diet/the-vegan-diet'],
    ['Regolamento (CE) n. 1099/2009 sulla protezione degli animali durante l\'abbattimento (testo letto da copia su certifico.com; fa fede EUR-Lex)','Stordimento, deroga per i riti religiosi, immobilizzazione, metodi di stordimento','Ufficiale (UE)','https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32009R1099'],
    ['Corte di giustizia UE, sentenza C-336/19 del 17 dicembre 2020 (comunicato stampa 163/20)','Stati membri e stordimento reversibile nella macellazione rituale','Ufficiale (UE)','https://curia.europa.eu/jcms/upload/docs/application/pdf/2020-12/cp200163it.pdf'],
    ['Senato della Repubblica, scheda sul DDL S. 1100 (2024)','D.Lgs. 131/2013, sanzioni e proposta di obbligo di stordimento','Ufficiale (Senato)','https://www.senato.it/leg/19/BGT/Schede/FascicoloSchedeDDL/ebook/58151.pdf'],
    ['Roggero F. (2016), Nota in tema di macellazione religiosa secondo il rito islamico, Rivista di diritto alimentare 10(2)','L. 439/1978, D.M. 11 giugno 1980, riti, dato italiano del 2009','Peer-reviewed (rivista giuridica)','https://iris.uniroma1.it/retrieve/e3835322-16b9-15e8-e053-a505fe0a3de9/Roggero_Note-in-tema_2016.pdf'],
    ['Parlamento europeo, EPRS (2023), Religious slaughter','Riti, posizioni, dati su Regno Unito e Stati UE, citazioni EFSA','Ufficiale (Parlamento europeo)','https://www.europarl.europa.eu/RegData/etudes/IDAN/2023/751418/EPRS_IDA(2023)751418_EN.pdf'],
    ['HSA, Religious slaughter information leaflet 2026','Riti e dati FSA 2024 (Inghilterra e Galles)','Associazione (fonte integrativa)','https://www.hsa.org.uk/downloads/religious-slaughter-information-leaflet-2026.pdf'],
    ['FAO, Guidelines for slaughtering, meat cutting and further processing, Paper 91 (1991)','Strumenti e fasi di macellazione, taglio e disosso','Ufficiale (FAO)','https://www.fao.org/4/t0279e/t0279e00.htm'],
    ['JRC, BREF macelli e industrie dei sottoprodotti di origine animale','Fasi di lavorazione dei suini e dei volatili (indice delle sezioni)','Ufficiale (Commissione europea)','https://eippcb.jrc.ec.europa.eu/reference/slaughterhouses-and-animals-products-industries'],
    ['Catalogo di un costruttore di impianti (testo fornito); il costruttore non è indicato nel testo','Attrezzature di impianti di macellazione bovini, ovini e suini; trattamento di sangue e scarti','Fonte commerciale (integrativa)',''],
    ['Ministero della Salute, tabella 2: strutture autorizzate alla macellazione rituale (S.Inte.S.I.S.-Strutture, 5/4/2019)','Numero di strutture per regione e categoria','Ufficiale (Ministero della Salute)',''],
    ['Ministero della Salute, nota 0025150 del 5/10/2023, check-list Reg. (CE) 1099/2009 sulla macellazione di ungulati (IZSLER, rev. 03)','Controlli ufficiali sulla macellazione, anche rituale','Ufficiale (Ministero della Salute)','https://www.izsler.it/benessereanimale/wp-content/uploads/sites/10/2025/04/1_CL_Mac_UNGULATI_Rev03-1.pdf'],
    ['Essere Animali (2020), I 10 strumenti utilizzati nell\'industria della carne','Interventi sugli animali in allevamento e uso del pungolo elettrico','ONG (fonte integrativa)','https://www.essereanimali.org/2020/09/10-strumenti-utilizzati-industria-carne/'],
    ['Direttiva 2008/120/CE sulla protezione dei suini (testo da copia su anmvioggi.it)','Castrazione, coda, denti, scrofe','Ufficiale (UE)','https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32008L0120'],
    ['CEIRSA, Corso di formazione per gli addetti allo stordimento presso i macelli','Metodi storici e cartucce; riferito al D.Lgs. 333/98, precedente al Reg. 1099/2009','Materiale formativo (fonte integrativa)',''],
    ['Macdonald C. (2026), What are the best sources of protein? Introducing the BPI Score, Frontiers in Sustainable Food Systems 10:1677796','BPI Score: 20 fonti proteiche, punteggi e limiti','Peer-reviewed (articolo «perspective»)','https://doi.org/10.3389/fsufs.2026.1677796'],
    ['Our World in Data, Dairy vs. plant-based milk (dati di Poore e Nemecek, 2018, Science)','Confronto ambientale tra latte vaccino e bevande vegetali: valori relativi','Ufficiale/ricerca (fonte secondaria su studio peer-reviewed)','https://ourworldindata.org/environmental-impact-milks'],
    ['O\'Neill D. G. et al. (2019), Morbidity and mortality of domestic rabbits (Oryctolagus cuniculus) under primary veterinary care in England, Veterinary Record; scheda VetCompass, Royal Veterinary College','Durata media della vita dei conigli da compagnia: 4,3 anni (6.349 conigli, 107 cliniche)','Peer-reviewed (letto sulla scheda dell\'ente, non sull\'articolo)','https://www.rvc.ac.uk/Media/Default/VetCompass/VC_20012020RABBIT_v03.pdf'],
    ['Hoffman J. M., Valencak T. G. (2020), A short life on the farm: aging and longevity in agricultural, large-bodied mammals, Geroscience 42:909–922; AnAge (Ovis aries, Capra hircus, Bos taurus); RSPCA, Laying hens','Longevità massima e durata media in allevamento di pecora, capra, bovino, gallina ovaiola','Peer-reviewed e banca dati (letti sugli originali; il dato RSPCA sulle ovaiole non è verificato)','https://doi.org/10.1007/s11357-020-00190-4'],
    ['Eurispes, Rapporto Italia 2026 (via Open, 18/06/2026) e 2025 (via Sky TG24, 01/10/2025)','Quota di vegetariani, vegani e flexitariani (autodefinizione)','Associazione di ricerca, riportato da terzi','https://www.open.online/2026/06/18/italia-vegetariani-vegani-flexitariani-dati/'],
    ['EFSA (2023), Welfare of ducks, geese and quail on farm, EFSA Journal 21(5):7992','Quaglia giapponese: età di macellazione 4–5 settimane (5–6 in alcuni casi), inizio deposizione circa 6 settimane, ciclo di deposizione di 6 mesi','Peer-reviewed (EFSA, letto sul testo)','https://doi.org/10.2903/j.efsa.2023.7992'],
    ['AnAge (quaglia giapponese, bufalo d\'acqua, cozza), SeaLifeBase (vongola filippina), Marozzi et al. (2014) Ital. J. Food Saf. (bufalini, Lazio), BMTI e Atlas Goro (tempi di allevamento di cozze e vongole)','Longevità massima e età di allevamento di quaglia, bufalini, cozza e vongola','Letto sulle schede e sui testi originali; i tempi di allevamento di cozze e vongole (monografia sulla cozza, Atlas Goro) sono descrittivi del settore o del territorio, non medie nazionali',''],
    ['ISTAT, Superfici e produzione, dati in complesso (dataset IT1101_1015_DF_DCSP_COLTIVAZIONI_11.0), anni 2025 e 2026','Ettari per coltura in Italia: prati e pascoli, erbai, cereali, soia (pagina Terra)','Ufficiale (file forniti dall\'utente)','https://esploradati.istat.it/databrowser/'],
    ['FAOSTAT, Land Use (Inputs_LandUse_E_Europe), Italia 2020–2024','Superficie agricola, seminativi, prati e pascoli permanenti e temporanei','Ufficiale (FAO, file forniti dall\'utente)','https://www.fao.org/faostat/en/#data/RL'],
    ['Ritchie H., Roser M. (2024), Half of the world\'s habitable land is used for agriculture, e (2021) If the world adopted a plant-based diet, Our World in Data','Terra agricola mondiale, quota del bestiame (80%), quota dei coltivi per mangimi (38%)','Divulgativa su dati FAO e Poore e Nemecek (letta sui PDF)','https://ourworldindata.org/global-land-for-agriculture'],
    ['Poore J., Nemecek T. (2018), Science 360, materiali supplementari (aaq0216-poore-sm, tabelle S1 e S10; data S2)','Terra per 100 g di proteine e per prodotto; terra per mangimi nel mondo','Peer-reviewed (letto sui file originali; stime di modello)','https://doi.org/10.1126/science.aaq0216'],
    ['Eurostat, Crop production in EU standard humidity (apro_cpsh1), superfici in migliaia di ettari, UE-27 e Italia, 2022–2025','Ettari di foraggere verdi, cereali, soia e girasole (pagina Terra)','Ufficiale (UE; file forniti dall\'utente)','https://ec.europa.eu/eurostat/databrowser/view/apro_cpsh1'],
    ['Eurostat, Main farm land use by NUTS 2 region (ef_lus_main), UE-27 e Italia, 2020 e 2023','Superficie agricola, seminativi, prati permanenti, colture permanenti (pagina Terra)','Ufficiale (UE; file forniti dall\'utente)','https://ec.europa.eu/eurostat/databrowser/view/ef_lus_main'],
    ['Regolamento (UE) 1308/2013, allegato VII, parte IV, sezione III (latte alimentare), copia britannica su legislation.gov.uk','Grassi regolati, arricchimento con proteine, minerali e vitamine, lattosio ridotto','Ufficiale (UE; fa fede EUR-Lex)','https://www.legislation.gov.uk/eur/2013/1308/annex/VII/part/IV/division/III'],
    ['Regolamento (CE) 853/2004, allegato III, sezione IX, capitolo I, parte III, copia britannica su legislation.gov.uk','Limiti per latte crudo di vacca: carica batterica 100.000 per ml, cellule somatiche 400.000 per ml, antibiotici','Ufficiale (UE; fa fede EUR-Lex)','https://www.legislation.gov.uk/cy/eur/2004/853/annex/III/section/IX/2020-12-31'],
    ['Smith K. L., Hillerton J. E., Harmon R. J. (2001), Guidelines on Normal and Abnormal Raw Milk Based on Somatic Cell Counts and Signs of Clinical Mastitis, National Mastitis Council','Cellule somatiche del latte: leucociti, soglie di 100.000 e 200.000 per ml','Linee guida scientifiche (associazione di ricerca)','https://www.nmconline.org/wp-content/uploads/2023/06/Guidelines-on-Normal-and-Abnormal-Raw-Milk-Formatted-002.pdf'],
    ['Legge 3 maggio 1989, n. 169 (testo su edizionieuropee.it; artt. 1 e 2 abrogati)','Disciplina del latte alimentare vaccino: nessuna previsione di aggiunte','Norma (Gazzetta non consultata direttamente)','https://www.edizionieuropee.it/law/html/24/zn4_02_021.html'],
    ['Agireora, «Quanto vivono gli animali d\'allevamento» (da VIVA!)','Età in allevamento e aspettativa di vita (stime)','Associazione','https://www.agireora.org/vegan/quanto-vivono-gli-animali-dallevamento-3001.html'],
    ['UNEP e FAO, Sustainable Food Cold Chains (2022); comunicato FAO del 12/11/2022','Catena del freddo: 4% delle emissioni globali, 14% di cibo perso','Ufficiale (ONU)','https://www.fao.org/newsroom/detail/amid-food-and-climate-crises-investing-in-sustainable-food-cold-chains-crucial/en'],
    ['IPCC, AR6 Gruppo di lavoro III, capitolo 12 (Cross-sectoral perspectives)','Catena del freddo 1% delle emissioni; refrigerazione 43% dell’energia del commercio al dettaglio','Peer-reviewed (rapporto IPCC)','https://www.ipcc.ch/report/ar6/wg3/'],
    ['Commissione europea, Fridges and Freezers (Ecodesign Impact Accounting 2024)','Frigoriferi domestici UE27: parco, volumi, consumi 2020 (stime)','Ufficiale (UE), stima di modello','https://energy-efficient-products.ec.europa.eu/product-list/fridges-and-freezers_en'],
    ['ISTAT, Consumi energetici delle famiglie, anno 2021','Frigorifero nel 99,5% delle famiglie, congelatore esterno nel 27,3%','Ufficiale','https://www.istat.it/it/files/2022/06/REPORT-CONSUMI-ENERGETICI-FAMIGLIE-2021-DEF.pdf'],
    ['Evans, Swain e James (2009), Energy consumption in the UK food chill chain: primary chilling','Calore da sottrarre per alimento, Regno Unito','Peer-reviewed','https://openresearch.lsbu.ac.uk/item/87q67'],
    ['Ministero della Salute, Decalogo sulla sicurezza nel frigorifero; Precauzioni per le malattie trasmesse da alimenti; FAQ Conservare gli alimenti col freddo (13/03/2025)','Temperature, tempi in frigorifero e in congelatore','Ufficiale','https://www.salute.gov.it/new/it/faq/faq-conservare-gli-alimenti-col-freddo/'],
    ['CREA, linee guida per una sana alimentazione: la conservazione','Pasta, riso, farina e legumi secchi in dispensa','Ufficiale','https://www.crea.gov.it/documents/59764/0/lineeguida_10.pdf/7a499afb-5b1c-a2a7-cd66-d75f096f02e4?t=1551862640500'],
    ['CREA, Annuario dell’agricoltura italiana 2024, p. 343 (dati ASSOLATTE 2025)','Latte UHT 75% e pastorizzato 25% dei volumi','Ufficiale (dato di associazione riportato da CREA)','https://www.crea.gov.it/documents/68457/0/Annuario2024_Vol_LXXVIII.pdf/b47a400c-6516-ce1d-2961-7657a7e0ae3b?t=1765899574420'],
    ['IIR, CO₂ per ridurre l’impronta del trasporto refrigerato (28/03/2024)','Trasporto refrigerato: 3,4 milioni di unità, circa 50 MtCO₂-eq (2017)','Istituzione internazionale','https://iifiir.org/en/news/co2-one-of-the-options-for-reducing-the-carbon-footprint-of-refrigerated-transport'],
    ['Lagoeiro et al. (2024), Quantifying Energy Consumption and Carbon Emissions from Retail Refrigeration in the UK, ICCC 2024','Refrigerazione del commercio alimentare nel Regno Unito: 3,28 TWh','Peer-reviewed (atti di congresso), stima','https://doi.org/10.18462/iir.iccc2024.1058'],
    ['FishBase, FAO, studi su PubMed Central','Età di macellazione e longevità di pesci e altre specie','Peer-reviewed e istituzionale','https://fishbase.org/summary/239'],
    ['FAO, FAOSTAT, dataset QCL: animali macellati (Italia, Europa, Mondo), download del 9/11/2026','Pagina Animali macellati: capi per specie, 2024','Ufficiale / stima FAO','https://www.fao.org/faostat/en/#data/QCL'],
    ['Our World in Data, How many animals get slaughtered every day? (Max Roser, 2023, CC BY 4.0)','Pagina Animali macellati: confronto con i dati 2021 e note su pesci e pulcini maschi','Divulgativa su dati FAO','https://ourworldindata.org/how-many-animals-get-slaughtered-every-day']
  ];

  var BY_ID={};ITEMS.forEach(function(it){BY_ID[it.id]=it});NONE.forEach(function(n){BY_ID[n.id]=n});
  /* ---------- sito a più file: una pagina per sezione e una per gruppo di specie ---------- */
  var GFILE={bovini:'bovini-macellati.html',bufalini:'bufalini-macellati.html',suini:'suini-macellati.html',avicoli:'polli-galline-tacchini-macellati.html',ovini:'ovini-macellati.html',caprini:'caprini-macellati.html',equini:'equini-macellati.html',conigli:'conigli-macellati.html',acq:'pesci-e-molluschi-allevati.html',altri:'senza-contatore.html'};
  function vzFile(r){
    if(r===''||r==null)return 'index.html';
    if(HASH_PAGE[r])return r+'.html';
    if(GFILE[r])return GFILE[r];
    var x=BY_ID[r];if(x)return (x.n!==undefined?GFILE[x.g]:GFILE.altri)+'#'+r;
    return null;
  }
  var MULTI=document.body.hasAttribute('data-route');
  function fixLinks(root){if(!MULTI)return;[].forEach.call((root||document).querySelectorAll('a[href^="#"]'),function(a){var r=a.getAttribute('href').slice(1),f=vzFile(r);if(f)a.setAttribute('href',f)})}
  function vzGroupMeta(g){
    var gl=(GROUPS.filter(function(x){return x[0]===g})[0]||[0,''])[1],its=ITEMS.filter(function(x){return x.g===g});
    var ov={avicoli:'Polli, galline e tacchini',acq:'Pesci e molluschi d\'acquacoltura'};
    var nm=ov[g]||gl,names=its.map(function(x){return x.name.replace(/ \(totale\)$/,'')}).slice(0,8).join(', ');
    if(g==='acq')return {t:nm+' in Italia: produzione e contatore',d:'Quanti pesci e molluschi sono allevati in Italia? Produzione di acquacoltura in chilogrammi e contatore, con dati e limiti dichiarati ('+its[0].year+').'};
    if(g==='altri')return {t:'Categorie senza contatore: api e animali nella ricerca',d:'Perché per le api e per gli animali usati nella ricerca non esiste un contatore: i dati disponibili, le fonti e cosa manca.'};
    return {t:nm+' macellati in Italia: contatore e dati ISTAT',d:'Quanti animali vengono macellati in Italia? Contatore e dati ISTAT per '+names.toLowerCase().replace(/^./,function(c){return c.toUpperCase()})+' ('+WIN+'), con fonti e definizioni.'};
  }
  function renderNoneAll(){
    var h='<header style="display:grid;gap:8px"><span class="eyebrow">Approfondimento</span><h1 style="font-size:clamp(2.2rem,11vw,3.4rem)">Categorie senza contatore</h1></header><p class="note read">Per queste categorie non esiste un dato di animali uccisi, confrontabile e affidabile. Dove il dato manca non c\'è uno zero: si spiega cosa manca.</p>';
    NONE.forEach(function(n){
      h+='<section id="'+n.id+'" style="display:grid;gap:10px"><h2>'+esc(n.name)+'</h2>'+badges(n.lv)+'<p class="none"><b>Contatore non attivato.</b> '+esc(n.why)+'</p><div class="vals">';
      n.vals.forEach(function(v){h+='<div><span>'+esc(v[0])+'</span><b>'+esc(v[1])+'</b></div>'});
      h+='</div><p class="note">'+esc(n.note)+'</p></section>';
    });
    h+='<p><a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;cur=null;
    if(location.hash){var e=document.getElementById(location.hash.slice(1));if(e)e.scrollIntoView()}
  }
  window.vzAll=function(){var o=[['',vzFile('')]];Object.keys(HASH_PAGE).forEach(function(k){o.push([k,vzFile(k)])});Object.keys(GFILE).forEach(function(k){o.push([k,GFILE[k]])});return o};
  window.vzData=function(){return {WIN:WIN,ISTAT_URL:ISTAT_URL,groups:GROUPS.map(function(g){var m=vzGroupMeta(g[0]);return {id:g[0],label:g[1],file:GFILE[g[0]],title:m.t,desc:m.d,items:ITEMS.filter(function(x){return x.g===g[0]}).map(function(x){return {id:x.id,name:x.name,n:x.n,unit:x.unit,year:x.year}})}})}};
  var PAGES={cose:'Che cos\'è Valore Zer0',bio:'Biomassa dei mammiferi',vita:'Vita media di un animale allevato',info:'Info e fonti',priv:'Informativa sulla privacy',diete:'Diete a confronto',amb:'Impatto ambientale delle diete',nut:'Confronti nutrizionali',mmm:'Mangia! Mangia! Mangia!',str:'Strumenti dell\'industria',proc:'Processi di macellazione',rit:'Macellazione rituale',fil:'Filiere a confronto',ltt:'Latte animale vs vegetale',ter:'Terra per allevamenti e mangimi',fr:'Catena del freddo e cibo',mac:'Animali macellati: Italia, Europa e mondo',tra:'Il prezzo della tradizione: la vita di un agnello'};
  var PAGE_HASH={cose:'che-cose',bio:'biomassa',vita:'anni-di-vita',info:'info',priv:'privacy',diete:'diete',amb:'impatto-ambientale',nut:'confronti-nutrizionali',mmm:'mangia-mangia-mangia',str:'strumenti-industria',proc:'processi-macellazione',rit:'macellazione-rituale',fil:'filiere-a-confronto',ltt:'latte-animale-vs-vegetale',ter:'terra',fr:'catena-del-freddo',mac:'animali-macellati',tra:'prezzo-della-tradizione'};
  var HASH_PAGE={};for(var pk in PAGE_HASH)HASH_PAGE[PAGE_HASH[pk]]=pk;

  /* ---------- utilità ---------- */
  function fmt(x,d){return x.toLocaleString('it-IT',{maximumFractionDigits:d||0,minimumFractionDigits:d||0})}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function badges(lv){return '<div class="badges">'+lv.map(function(k){var b=LEVELS[k];return '<span class="badge '+b[0]+'"><i aria-hidden="true"></i>'+b[1]+'</span>'}).join('')+'</div>'}
  function rateHtml(it){
    var r=it.n/it.secs;
    if(it.unit==='kg')return '<b>'+fmt(r,2)+'</b> kg al secondo<span>'+fmt(r*3600/1000,1)+' t all\'ora · '+fmt(r*86400/1000,0)+' t al giorno</span>';
    var main=r>=1?'<b>'+fmt(r,1)+'</b> animali al secondo':'1 animale ogni <b>'+fmt(1/r,1)+'</b> secondi';
    return main+'<span>'+fmt(r*3600,0)+' all\'ora · '+fmt(r*86400,0)+' al giorno</span>';
  }
  function yearTxt(it){return typeof it.year==='number'?' nel '+it.year:' ('+it.year+')'}
  function pctText(r){var p=r*100;return fmt(p,p<1?2:p<10?1:0)}

  var PW = {"bov": [261.16, 453.6, 57.6], "vit": [132.67, 213.43, 62.2], "vtm": [343.11, 566.96, 60.5], "vtf": [282.35, 495.81, 56.9], "buo": [303.01, 532.64, 56.9], "tor": [405.92, 676.74, 60.0], "vac": [279.93, 545.67, 51.3], "buf": [168.89, 303.92, 55.6], "ann": [130.32, 220.3, 59.2], "bfl": [239.93, 458.02, 52.4], "sui": [131.45, 158.8, 82.8], "lat": [13.65, 16.74, 81.5], "sgr": [139.14, 167.92, 82.9], "pgt": [1.95, 2.85, 68.4], "pcl": [1.05, 1.53, 68.2], "pch": [2.34, 3.42, 68.5], "gov": [1.73, 2.57, 67.3], "grp": [2.36, 3.51, 67.2], "tac": [10.33, 14.07, 73.4], "qua": [0.14, 0.21, 69.0], "pic": [0.38, 0.52, 72.9], "far": [1.65, 2.24, 73.5], "ana": [2.19, 3.17, 69.0], "ovi": [12.91, 23.18, 55.7], "pec": [22.18, 43.99, 50.4], "mon": [29.37, 56.75, 51.8], "agn": [9.07, 14.97, 60.5], "agl": [15.13, 25.74, 58.8], "cap": [11.3, 20.68, 54.6], "cpa": [17.76, 34.46, 51.5], "bec": [22.85, 44.61, 51.2], "cpt": [6.76, 11.1, 60.9], "equ": [257.48, 477.42, 53.9], "cav": [273.94, 505.56, 54.2], "asi": [127.5, 244.28, 52.2], "mul": [252.45, 497.42, 50.8], "con": [1.64, 2.72, 60.2]};
  function pesoTxt(id){var p=PW[id];if(!p)return '';var d=function(x){return fmt(x,x<1?2:(x<10?1:0))};return 'Carcassa '+d(p[0])+' kg · vivo '+d(p[1])+' kg · resa '+fmt(p[2],1)+'%'}
  function comparisons(it){
    if(it.unit==='kg'){
      var kg=it.n/POP;
      return '<div>Confronto con la popolazione non calcolabile: il dato è in peso, non in individui.</div>'+
             '<div>È come se ogni anno, per ogni cittadino, fossero prodotti <strong>'+fmt(kg,2)+' kg</strong> di '+esc(it.pl)+' d\'acquacoltura.</div>';
    }
    var r=it.n/POP;
    var a='Ogni anno vengono uccisi circa <strong>'+fmt(it.n)+'</strong> '+esc(it.pl)+'. Significa praticamente il <strong>'+pctText(r)+'%</strong> della popolazione nazionale'+(r>=1?' ('+fmt(r,1)+' volte)':'')+'.';
    var b=r>=1?'È come se ogni anno, per ogni cittadino, venissero uccisi <strong>'+fmt(r,1)+'</strong> '+esc(it.pl)+'.'
              :'È come se ogni anno venisse ucciso <strong>1</strong> '+esc(it.sg)+' ogni <strong>'+fmt(1/r)+'</strong> cittadini.';
    return '<div>'+a+'</div><div>'+b+'</div>';
  }

  function niceScale(rate){var raw=rate*0.4;if(raw<=1)return 1;var p=Math.pow(10,Math.floor(Math.log10(raw))),m=raw/p;return(m<1.5?1:m<3.5?2:m<7.5?5:10)*p}
  function capText(it){
    var w=it.unit==='kg'?(it.N===1?'1 chilogrammo':fmt(it.N)+' chilogrammi'):(it.N===1?'1 animale':fmt(it.N)+' animali');
    return '1 icona = '+w+' · griglie complete dall\'apertura: <b data-cyc>0</b>';
  }

  /* ---------- orologio ---------- */
  var elapsed=0,last=performance.now(),paused=false,timer=null,cur=null;
  var mq=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):null;
  var reduced=!!(mq&&mq.matches);
  var LIST=null,clk=document.getElementById('clk');
  function hms(t){t=Math.floor(t);var h=Math.floor(t/3600),m=Math.floor(t%3600/60),x=t%60;return (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(x<10?'0':'')+x}
  function paint(){
    clk.textContent=hms(elapsed);
    if(LIST)LIST.forEach(function(r){var u=r.it.n/r.it.secs*(elapsed-(r.base||0));r.el.textContent=fmt(Math.floor(u));if(r.bar)r.bar.style.width=((u%1)*100).toFixed(1)+'%'});
    if(!cur)return;
    var it=cur.it;
    cur.v.textContent=fmt(Math.floor(it.n/it.secs*elapsed));
    var units=(it.n/it.secs*elapsed)/it.N,cyc=units%100,full=Math.floor(cyc),frac=cyc-full;
    for(var i=0;i<100;i++){
      var s=i<full?1:(i===full&&frac>0.02?2:0);
      if(cur.state[i]!==s){cur.state[i]=s;cur.nodes[i].setAttribute('class',s===1?'ic on':s===2?'ic part':'ic')}
      if(s===2)cur.nodes[i].style.opacity=(0.3+0.7*frac).toFixed(2);
      else if(cur.nodes[i].style.opacity)cur.nodes[i].style.opacity='';
    }
    var cy=cur.cap.querySelector('[data-cyc]');if(cy)cy.textContent=fmt(Math.floor(units/100));
    if(cur.el)cur.el.textContent=fmt(Math.floor(elapsed))+' s';
  }
  function tick(){var now=performance.now();if(!paused)elapsed+=(now-last)/1000;last=now;paint()}
  function start(){clearInterval(timer);timer=setInterval(tick,reduced?1000:200)}
  start();
  if(mq&&mq.addEventListener)mq.addEventListener('change',function(e){reduced=e.matches;start()});

  /* ---------- pagine ---------- */
  var app=document.getElementById('app');

  function rateShort(it){var r=it.n/it.secs;return it.unit==='kg'?fmt(r,1)+' kg al secondo':(r>=1?fmt(r,1)+' al secondo':'1 ogni '+fmt(1/r)+' secondi')}
  function renderHome(){
    var h='<section class="hero"><img class="lg-b" src="img/logo-b.png" alt="Valore Zer0" width="160" height="80" style="width:160px;height:auto"><img class="lg-w" src="img/logo-w.png" alt="" width="160" height="80" style="width:160px;height:auto"><h1>Li uccidiamo a milioni. E li chiamiamo numeri.</h1>'+
      '<div class="lines"><p>Le loro vite diventano merce.</p><p>La loro sofferenza, un costo.</p><p>La loro morte, profitto.</p></div>'+
      '<p class="red">Il loro valore è zero. Non perché non valgano nulla, ma perché li trattiamo come oggetti, merci, commodities.</p>'+
      '<p><a href="#che-cose">Che cos\'è Valore Zer0</a></p></section>';
    h+='<section style="display:grid;gap:14px"><h2>Vite animali nella filiera dei prodotti animali</h2><p class="note" style="margin-top:-6px">(conteggio a partire dall\'apertura della pagina)</p><div class="rows">';
    var rows=ITEMS.filter(function(it){return !it.in});
    rows.forEach(function(it){
      h+='<a class="row" href="#'+it.id+'"><svg class="ri" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-'+it.icon+'"/></svg><span class="nm"><b>'+esc(it.name)+'</b><small>'+rateShort(it)+(it.unit==='kg'?' · peso':'')+'</small></span><span class="rc" data-c>0</span><span class="ar" aria-hidden="true">›</span></a>';
    });
    NONE.forEach(function(n){h+='<a class="row" href="#'+n.id+'"><span></span><span class="nm"><b>'+esc(n.name)+'</b><small>senza contatore</small></span><span></span><span class="ar" aria-hidden="true">›</span></a>'});
    h+='</div><p class="note">Ogni contatore divide il totale di 12 mesi per i secondi dell\'anno: è una media, non un conteggio in tempo reale. Le categorie non si sommano. Nel caso di pesci e molluschi i dati fanno riferimento a kg e non a singoli animali.</p></section>';
    h+='<div class="group-h"><h2>Approfondimenti</h2><div class="tiles">'+
      '<a class="tile" href="#anni-di-vita"><b>Vita media di un animale allevato</b><span>a che età vengono uccisi</span></a>'+
      '<a class="tile" href="#mangia-mangia-mangia"><b>Mangia! Mangia! Mangia!</b><span>un animale dopo l\'altro</span></a>'+
      '<a class="tile" href="#filiere-a-confronto"><b>Filiere a confronto</b><span>confronti tra filiere</span></a>'+
      '<a class="tile" href="#latte-animale-vs-vegetale"><b>Latte animale vs vegetale</b><span>ambiente e composizione</span></a>'+
      '<a class="tile" href="#strumenti-industria"><b>Strumenti dell\'industria</b><span>come si stordisce e si lavora</span></a>'+
      '<a class="tile" href="#processi-macellazione"><b>Processi di macellazione</b><span>fase per fase</span></a>'+
      '<a class="tile" href="#macellazione-rituale"><b>Macellazione rituale</b><span>riti, deroga, dati</span></a>'+
      '<a class="tile" href="#diete"><b>Diete a confronto</b><span>onnivori, vegetariani, vegani</span></a>'+
      '<a class="tile" href="#impatto-ambientale"><b>Impatto ambientale delle diete</b><span>clima, suolo, acqua</span></a>'+
      '<a class="tile" href="#confronti-nutrizionali"><b>Confronti nutrizionali</b><span>proteine, ferro, vitamine</span></a>'+
      '<a class="tile" href="#biomassa"><b>Biomassa dei mammiferi</b><span>umani, bestiame, selvatici</span></a>'+
      '<a class="tile" href="#info"><b>Info e fonti</b><span>dati e metodo</span></a></div></div>';
    app.innerHTML=h;cur=null;
    var els=app.querySelectorAll('[data-c]');LIST=rows.map(function(it,i){return {it:it,el:els[i]}});paint();
  }

  var USE={
bov:"Carne fresca (tagli, macinato), hamburger, polpette e carne in scatola; dai sottoprodotti anche pelli, gelatine e grassi. Il totale comprende anche animali della filiera del latte a fine carriera.",
vit:"Carne di vitello (fettine, bocconcini). Molti vitelli nascono nella filiera del latte: i maschi non servono alla produzione di latte e sono avviati alla carne.",
vtm:"Carne di vitellone e di manzo: tagli, macinato, hamburger e polpette, di solito dopo un periodo di ingrasso.",
vtf:"Carne di vitellone femmina: tagli, macinato, hamburger e polpette.",
buo:"Carne bovina: tagli e macinato.",
tor:"Carne di toro, macinato e preparazioni. Alcuni maschi sono tenuti come riproduttori.",
vac:"Carne di vacche a fine carriera, dopo anni di produzione di latte: macinato, hamburger, carne in scatola e preparazioni industriali.",
buf:"Carne di bufalo e preparazioni. La filiera principale è quella del latte per la mozzarella e i latticini.",
ann:"Carne di annutolo (vitello di bufala), in genere sottoprodotto della filiera del latte di bufala.",
bfl:"Carne di bufale a fine carriera, dopo la produzione di latte per mozzarella e latticini.",
sui:"Carne fresca (cotolette, costine, salsicce), prosciutti e salumi, speck, pancetta, wurstel, preparazioni industriali; strutto e altri sottoprodotti.",
lat:"Carne di lattonzolo (maialino da latte): arrosti e porchetta.",
mag:"Suini in fase di accrescimento: la carne va al fresco e ai salumi.",
sgr:"Suino grasso (oltre 100 kg): carne fresca e soprattutto prosciutti, salumi, mortadella e preparazioni.",
pgt:"Carne di pollo (petti, cosce, spiedini), hamburger, nuggets, polpette, wurstel e affettati di pollo; galline a fine carriera per brodo, ripieni e preparazioni industriali.",
pcl:"Polli giovani, venduti interi o a pezzi.",
pch:"Polli più pesanti, venduti in tagli (petti, cosce) e trasformati in hamburger, nuggets e cotolette.",
gov:"Uova da consumo e ovoprodotti (tuorlo e albume per pasta, dolci, maionese). A fine ciclo la gallina è macellata: carne per brodo, ripieni e preparazioni industriali.",
grp:"Producono le uova da cui nascono i polli da carne e le future ovaiole; a fine carriera sono macellate.",
tac:"Carne di tacchino (fesa, cosce), hamburger, polpette, affettati e salsicce.",
qua:"Carne di quaglia, venduta intera; si allevano anche per le uova.",
pic:"Carne di piccione, venduta intera, soprattutto per la ristorazione.",
far:"Carne di faraona, venduta intera o a pezzi.",
ana:"Carne di anatra (petto, cosce) e fegato grasso.",
pul:"Non sono un alimento: i pulcini maschi delle linee ovaiole non producono uova e non sono selezionati per la carne. In alcuni casi sono usati come alimento per rapaci e rettili.",
ovi:"Carne di agnello e di pecora (cosce, costolette, spezzatino), anche macinata; dalle pecore pecorino e ricotta, e la lana.",
pec:"Carne di pecora a fine produzione di latte o lana; il latte diventa pecorino e ricotta.",
mon:"Carne di montone. Alcuni maschi sono riproduttori.",
agn:"Carne di agnello (cosciotto, costolette, spezzatino), molto richiesta a Pasqua e a Natale.",
agl:"Carne di agnellone, venduta a pezzi.",
cap:"Carne di capra e di capretto; il latte diventa formaggi caprini.",
cpa:"Carne di capra a fine carriera; il latte diventa formaggi caprini.",
bec:"Carne di becco. Alcuni maschi sono riproduttori.",
cpt:"Carne di capretto, tradizionale a Pasqua: in gran parte maschi della filiera del latte caprino.",
equ:"Carne equina, fresca o in preparazioni (macinato, salumi). Si macellano anche cavalli a fine carriera sportiva o da lavoro, se idonei.",
cav:"Carne di cavallo, fresca o in preparazioni come macinato e salumi.",
asi:"Carne d'asino, in alcune zone in stufati e salumi.",
mul:"Carne di mulo e di bardotto, uso limitato.",
con:"Carne di coniglio, intera o a pezzi, e preparati come hamburger.",
pes:"Pesce intero, filetti, tranci, surgelati e preparati (trota, orata, branzino, salmone); dai sottoprodotti anche farine e mangimi.",
mol:"Cozze, vongole e ostriche: vendute intere, sgusciate, surgelate, in scatola e in preparazioni."
  };
  /* ---------- libreria visiva: immagini editoriali ---------- */
  /* IMG[spazio] = {src,alt,kind:'foto'|'illustrazione',credit,license,w,h}. Vuota finché non arrivano le immagini: le pagine mostrano la composizione tipografica.
     Spazi: bov, sui, pgt (schede), vita, mac (macellazione), lat, amb, bio, mac2 (animali macellati). */
  var IMG={
    bov:{src:"img/ed/bov.webp",alt:"Vacche da latte con la testa tra le sbarre di un fienile, mentre mangiano fieno.",kind:"foto",credit:"Susanne Jutzeler (suju-foto) su Pexels",license:"Licenza Pexels",w:1600,h:900},
    vita:{src:"img/ed/vita.webp",alt:"Vitelli in un allevamento: uno in primo piano, altri sullo sfondo dietro le sbarre.",kind:"foto",credit:"Wijs Wise su Pexels",license:"Licenza Pexels",w:1600,h:900},
    sui:{src:"img/ed/sui.webp",alt:"Suini in box affiancati lungo il corridoio di un capannone, con mangiatoie appese al soffitto.",kind:"foto",credit:"Mark Stebnicki su Pexels",license:"Licenza Pexels",w:1600,h:900},
    pgt:{src:"img/ed/pgt.webp",alt:"Interno di un capannone di polli da carne, con centinaia di polli bianchi a terra.",kind:"foto",credit:"Mark Stebnicki su Pexels",license:"Licenza Pexels",w:1600,h:900}
  };
  var MMNOTICE='<aside class="avviso" role="note"><b>Contenuto sensibile.</b> Questa pagina mostra, con illustrazioni, la macellazione e la morte di animali, anche con sangue. Le immagini sono illustrazioni, non fotografie. Se non vuoi vederle, puoi tornare alla <a href="#">home</a>.</aside>';
  function edBig(n){
    var f=function(x,d){return x.toLocaleString('it-IT',{minimumFractionDigits:d,maximumFractionDigits:d})};
    if(n>=1e9)return f(n/1e9,2)+' miliardi';
    if(n>=1e6)return f(n/1e6,n>=1e8?0:1)+' milioni';
    return f(n,0);
  }
  function edHero(slot,o){
    var im=IMG[slot],h='';
    if(im&&im.src)h+='<figure class="ed ed-photo"><img src="'+im.src+'" alt="'+esc(im.alt||'')+'" width="'+(im.w||1600)+'" height="'+(im.h||900)+'" loading="lazy" decoding="async"><figcaption class="ed-in"><b>'+(im.kind==='foto'?'Fotografia':'Immagine illustrativa')+'</b>'+(im.credit?' · '+esc(im.credit):'')+(im.license?' · '+esc(im.license):'')+'</figcaption></figure>';
    if(!o||!o.v)return h;
    var s=o.s?'<div class="src">'+esc(o.s)+'</div>':'';
    if(o.v==='band')h+='<section class="ed ed-band"><div class="ed-in"><div class="n">'+esc(o.n)+'</div><p>'+esc(o.t)+'</p>'+s+'</div></section>';
    else if(o.v==='split')h+='<section class="ed ed-split"><div class="ed-in ed-cols"><div class="n">'+esc(o.n)+'</div><div><p>'+esc(o.t)+'</p>'+s+'</div></div></section>';
    else if(o.v==='bar'){
      var al=o.bar.map(function(b){return b[2]+' '+b[0]+'%'}).join(', ');
      h+='<section class="ed ed-bar"><div class="ed-in"><div class="n">'+esc(o.n)+'</div><p>'+esc(o.t)+'</p><div class="barx" role="img" aria-label="'+esc(al)+'">'+o.bar.map(function(b){return '<i class="'+b[1]+'" style="width:'+b[0]+'%"></i>'}).join('')+'</div><div class="lgx">'+o.bar.map(function(b){return '<span><i class="'+b[1]+'"></i>'+esc(b[2])+' '+b[0]+'%</span>'}).join('')+'</div>'+s+'</div></section>';
    }
    return h;
  }
  function edAnimal(it){
    var M={bov:['band','bovini macellati in Italia in 12 mesi'],sui:['split','suini macellati in Italia in 12 mesi'],pgt:['band','polli e galline macellati in Italia in 12 mesi']}[it.id];
    if(!M)return '';
    if(IMG[it.id]&&IMG[it.id].src)return edHero(it.id);
    return edHero(it.id,{v:M[0],n:edBig(it.n),t:M[1],s:'ISTAT, macellazioni, '+WIN});
  }
  function groupNav(it){
    var sib=ITEMS.filter(function(x){return x.g===it.g});if(sib.length<2)return '';
    var gl=(GROUPS.filter(function(g){return g[0]===it.g})[0]||[0,''])[1];
    return '<nav class="gsw" aria-label="Categorie: '+esc(gl)+'"><span class="gsw-t">'+esc(gl)+', categorie</span><ul>'+sib.map(function(x,i){return '<li><a href="#'+x.id+'"'+(x.id===it.id?' aria-current="page"':'')+'>'+(i===0?'<small>Totale</small>':esc(x.name))+'</a></li>'}).join('')+'</ul></nav>';
  }
  function groupTable(it){
    var sib=ITEMS.filter(function(x){return x.g===it.g});if(sib.length<2)return '';
    var gl=(GROUPS.filter(function(g){return g[0]===it.g})[0]||[0,''])[1],kg=sib[0].unit==='kg';
    var r='<section class="gtab"><h2>'+esc(gl)+': tutte le categorie</h2><div class="gtw"><table><caption>Totale su 12 mesi ('+esc(String(sib[0].year))+'): '+(kg?'produzione in tonnellate':'animali macellati')+' e ritmo medio</caption><thead><tr><th scope="col">Categoria</th><th scope="col">'+(kg?'Tonnellate':'Animali')+'</th><th scope="col">Ritmo medio</th></tr></thead><tbody>';
    sib.forEach(function(x){var q=x.n/x.secs;r+='<tr><th scope="row"><a href="#'+x.id+'">'+esc(x.name)+'</a></th><td>'+(x.unit==='kg'?fmt(x.n/1000):fmt(x.n))+'</td><td>'+(x.unit==='kg'?fmt(q,2)+' kg al secondo':(q>=1?fmt(q,1)+' al secondo':'1 ogni '+fmt(1/q,1)+' secondi'))+'</td></tr>'});
    r+='</tbody></table></div>';
    if(sib.some(function(x){return x.in}))r+='<p class="note">Il totale comprende le altre categorie: i valori non si sommano.</p>';
    r+='<h3>Definizioni</h3><dl class="gdef">'+sib.map(function(x){return '<dt>'+esc(x.name)+'</dt><dd>'+esc(x.def||'')+'</dd>'}).join('')+'</dl></section>';
    return r;
  }
  function renderAnimal(it){
    it.N=niceScale(it.n/it.secs);
    var h=groupNav(it)+'<header style="display:grid;gap:8px">'+badges(it.lv)+'<h1 style="font-size:clamp(2.2rem,11vw,3.4rem)">'+esc(it.name)+'</h1></header>';
var hv=edAnimal(it),bigH='<div class="big"><span data-v>0</span><small>'+(it.unit==='kg'?'kg di produzione':'animali')+', media attesa da quando hai aperto la pagina (<span data-el>0 s</span>)</small></div>',rateH='<div class="rate" data-r></div>';
    if(hv.indexOf('ed-photo')>=0)h+='<div class="hov">'+hv+'<div class="hov-t">'+bigH+rateH+'</div></div>';
    else h+=hv+bigH+rateH;
    h+='<div><div class="pgrid" data-grid aria-hidden="true"></div><div class="pcap" data-cap></div></div>';
    if(it.presets){
      h+='<div class="pchips" role="group" aria-label="Scegli la stima">';
      it.presets.forEach(function(p,i){h+='<button type="button" data-p="'+i+'" aria-pressed="'+(p.n===it.n)+'">'+esc(p.l)+'</button>'});
      h+='</div>';
    }
    if(USE[it.id])h+='<section class="prose"><h2>Impiego</h2><p>'+esc(USE[it.id])+'</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>Animali uccisi per cittadino</h2><div class="cmp" data-cmp></div><p class="note">Popolazione: 58.943.000 residenti, ISTAT al 1° gennaio 2026 (dato provvisorio). Totale degli animali su 12 mesi'+(typeof it.year==='string'&&it.year===WIN?' ('+WIN+')':'')+'.</p></section>';
    if(it.why)h+='<section class="prose"><h2>Perché</h2><p>'+esc(it.why)+'</p>'+(it.countdown?'<p class="note" data-cd></p>':'')+'</section>';
    h+='<div class="card"><dl><dt>Tipo</dt><dd>'+esc(it.kind)+'</dd><dt>Totale</dt><dd data-n></dd>'+(PW[it.id]?'<dt>Peso medio per capo</dt><dd>'+pesoTxt(it.id)+'</dd>':'')+'<dt>Fonte</dt><dd>'+(it.url?'<a href="'+it.url+'" target="_blank" rel="noopener">'+esc(it.src)+'</a>':esc(it.src))+'</dd></dl>'+
      '<p class="note">'+esc(it.def)+'</p>'+
      (PW[it.id]?'<p class="note">Peso medio per capo: ISTAT, macellazioni mensili ('+WIN+'), peso morto complessivo ÷ capi macellati, ponderato sui capi. Resa = peso morto ÷ peso vivo.</p>':'')+(it.in?'<p class="note">Compreso nel totale «'+esc(it.in)+'». Le categorie non si sommano.</p>':'')+
      (it.extra?'<p class="note" style="border-top:1px dashed var(--line);padding-top:8px">'+esc(it.extra)+'</p>':'')+'</div>';
    h+=groupTable(it);
    h+='<p><a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;

    var gridEl=app.querySelector('[data-grid]'),g='';
    for(var i=0;i<100;i++)g+='<svg class="ic" viewBox="0 0 24 24"><use href="#i-'+it.icon+'"/></svg>';
    gridEl.innerHTML=g;
    cur={it:it,v:app.querySelector('[data-v]'),cap:app.querySelector('[data-cap]'),el:app.querySelector('[data-el]'),nodes:gridEl.children,state:new Array(100).fill(0)};
    function stat(){
      it.N=niceScale(it.n/it.secs);
      app.querySelector('[data-r]').innerHTML=rateHtml(it);
      app.querySelector('[data-n]').textContent=it.unit==='kg'?fmt(it.n/1000)+' t'+yearTxt(it):fmt(it.n)+yearTxt(it);
      app.querySelector('[data-cmp]').innerHTML=comparisons(it);
      cur.cap.innerHTML=capText(it);
    }
    stat();
    if(it.countdown){
      var d=Math.ceil((new Date(2026,11,31)-new Date())/86400000);
      app.querySelector('[data-cd]').textContent=d>0?'Giorni al 31/12/2026, data di decorrenza del divieto: '+fmt(d)+'.':'La data del 31/12/2026 è passata: verificare lo stato di applicazione del divieto.';
    }
    if(it.presets){
      app.querySelectorAll('[data-p]').forEach(function(b){
        b.addEventListener('click',function(){
          it.n=it.presets[+b.dataset.p].n;
          app.querySelectorAll('[data-p]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
          stat();paint();
        });
      });
    }
    paint();
  }

  function renderNone(n){
    var h='<header style="display:grid;gap:8px">'+badges(n.lv)+'<h1 style="font-size:clamp(2.2rem,11vw,3.4rem)">'+esc(n.name)+'</h1></header>';
    h+='<p class="none"><b>Contatore non attivato.</b> '+esc(n.why)+'</p><div class="vals">';
    n.vals.forEach(function(v){h+='<div><span>'+esc(v[0])+'</span><b>'+esc(v[1])+'</b></div>'});
    h+='</div><p class="note">'+esc(n.note)+'</p><p><a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;cur=null;
  }

  function renderCose(){
    var h='<h1>Che cos\'è Valore Zer0</h1>';
    h+='<section class="pov"><span class="eyebrow">Punto di vista</span><p class="zero">Per gli animali, il valore è sempre zero.</p>'+
      '<p>Zero quando vengono contati. Zero quando vengono allevati. Zero quando vengono uccisi.</p>'+
      '<p>Le loro vite entrano nei bilanci come costi, i loro corpi diventano prodotti, la loro morte una voce di mercato. La sofferenza non compare nei prezzi. L\'individualità non entra nei conti.</p>'+
      '<p>Eppure, ognuno di loro è qualcuno. Una vita capace di sentire, di provare paura, dolore e benessere. Non una cosa. Non un\'unità. Non un numero.</p>'+
      '<p><strong>Zero non è il valore che hanno. È il valore che gli viene assegnato.</strong></p>'+
      '<p>Questo contatore rende visibile ciò che il sistema riduce a statistica: le vite animali sacrificate ogni secondo alle nostre abitudini e ai nostri consumi.</p>'+
      '<p>Perché dietro ogni numero c\'è una vita. E nessuna vita dovrebbe valere zero.</p></section>';
    h+='<section class="prose"><h2>Quante vite scorrono dietro le nostre scelte?</h2><p>Ogni anno in Italia milioni di animali allevati vengono uccisi per mano umana. Questi contatori trasformano i totali di 12 mesi in un ritmo che si può osservare.</p></section>';
    h+='<section class="prose"><h2>Come leggere i contatori</h2><ul>'+
      '<li>Sono contate solo le uccisioni per mano umana: macellazione, abbattimento sanitario, eutanasia. La mortalità naturale non rientra.</li>'+
      '<li>Ogni contatore divide il totale di 12 mesi per i secondi di quel periodo. È una media aritmetica, non un conteggio in tempo reale.</li>'+
      '<li>Ogni pagina ha una griglia di 100 icone. Le icone piene sono quelle «avvenute» in media da quando hai aperto la pagina. La scala è scritta sotto la griglia e la griglia ricomincia quando si riempie.</li>'+
      '<li>Ogni pagina ha due confronti con la popolazione italiana: la quota sul totale dei residenti e quanti animali sono uccisi «per ogni cittadino».</li>'+
      '<li>Consistenza (animali presenti) e flusso (animali uccisi in un periodo) non si confondono. Macellazioni, abbattimenti sanitari e altre eliminazioni non si sommano.</li>'+
      '<li>Dove il dato manca non c\'è uno zero: la pagina spiega cosa manca. Le tonnellate non diventano individui. Le stime non sono chiamate dato ufficiale.</li></ul></section>';
    h+='<section class="prose"><h2>Categorie senza contatore</h2><p>Per queste categorie non esiste un dato di animali uccisi, confrontabile e affidabile.</p><ul>'+
      NONE.map(function(n){return '<li><a href="#'+n.id+'">'+esc(n.name)+'</a>: '+esc(n.why)+'</li>'}).join('')+'</ul>'+
      '<p>Pesci e molluschi hanno un contatore di massa, in chilogrammi, non di individui.</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>Come funzionano le filiere</h2><p class="note read">Descrizioni generali, non quantificate qui. I numeri sono nelle pagine dei contatori.</p>'+
      '<details class="fil"><summary>Carne: la macellazione</summary><div><p>La macellazione è l\'uscita prevista per gli animali allevati per la carne. Le statistiche contano gli animali macellati in stabilimenti riconosciuti. La macellazione in azienda per autoconsumo è esclusa e non sempre è stimata.</p></div></details>'+
      '<details class="fil"><summary>Uova: galline e pulcini</summary><div><p>Il sistema delle uova produce due flussi di uccisioni: le galline a fine ciclo e i pulcini maschi. Il codice stampato sul guscio indica il metodo di allevamento: 0 biologico, 1 all\'aperto, 2 a terra, 3 in gabbia.</p></div></details>'+
      '<details class="fil"><summary>Latte: vacche e vitelli</summary><div><p>Le vacche da latte sono macellate a fine carriera produttiva. I vitelli maschi non destinati alla rimonta sono avviati all\'ingrasso e poi alla macellazione.</p></div></details>'+
      '<details class="fil"><summary>Abbattimenti sanitari</summary><div><p>Quando una malattia soggetta a notifica è accertata, l\'autorità sanitaria può ordinare l\'abbattimento degli animali dell\'allevamento. È un flusso diverso dalla macellazione e i totali non vanno sommati.</p></div></details>'+
      '<details class="fil"><summary>Pesci e molluschi</summary><div><p>Le statistiche ufficiali misurano il peso prodotto, non gli individui. Per questo sono mostrati come contatori di massa: chilogrammi al secondo.</p></div></details></section>';
    h+='<section class="pov"><span class="eyebrow">Punto di vista</span><h2>Dai numeri agli individui</h2><div class="steps">'+
      '<div class="step"><b>Vedere</b><h3>I numeri rendono visibile</h3><p>Una realtà che resta fuori dall\'esperienza quotidiana, perché avviene altrove e in modo industriale.</p></div>'+
      '<div class="step"><b>Conoscere</b><h3>Dietro ogni cifra una filiera</h3><p>Uova, latte, carne e pesce seguono logiche produttive diverse. Le filiere sopra le descrivono.</p></div>'+
      '<div class="step"><b>Comprendere</b><h3>Cos\'è lo specismo</h3><p>Il termine fu coniato da Richard Ryder nel 1970 e diffuso da Peter Singer. L\'antispecismo sostiene che la specie, da sola, non giustifichi un trattamento diverso degli interessi degli animali.</p></div>'+
      '<div class="step"><b>Interrogarsi</b><h3>Domande aperte</h3><p>Quali interessi hanno gli animali che alleviamo? Perché alcune specie sono compagni e altre alimenti? Quali scelte quotidiane dipendono dall\'abitudine?</p></div>'+
      '<div class="step"><b>Agire</b><h3>Strumenti pratici</h3><p>Leggere il codice sulle uova, informarsi sulle filiere, provare alternative vegetali, condividere una singola pagina con le sue fonti.</p></div></div>'+
      '<p>Chi non condivide questa prospettiva può usare i contatori come strumento di conoscenza. Questa pagina non giudica chi legge.</p></section>';
    app.innerHTML=h;cur=null;
  }

  function pie(title,parts){
    var a0=-Math.PI/2,sv='',cx=100,cy=100,R=70;
    parts.forEach(function(p){
      var a1=a0+p.v/100*2*Math.PI,x0=cx+R*Math.cos(a0),y0=cy+R*Math.sin(a0),x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);
      sv+='<path class="'+p.c+'" d="M'+cx+' '+cy+' L'+x0.toFixed(2)+' '+y0.toFixed(2)+' A'+R+' '+R+' 0 '+(p.v>50?1:0)+' 1 '+x1.toFixed(2)+' '+y1.toFixed(2)+' Z"/>';
      var am=(a0+a1)/2,small=p.v<8,r=small?R*1.22:R*0.62;
      sv+='<text class="'+(small?'t-out':p.t)+'" x="'+(cx+r*Math.cos(am)).toFixed(1)+'" y="'+(cy+r*Math.sin(am)).toFixed(1)+'">'+p.v+'%</text>';
      a0=a1;
    });
    var alt=title+': '+parts.map(function(p){return p.l+' '+p.v+'%'}).join(', ');
    return '<div class="pie"><h3>'+title+'</h3><svg viewBox="0 0 200 200" role="img" aria-label="'+alt+'">'+sv+'</svg></div>';
  }
  function legend(parts){return parts.map(function(p){return '<span><i class="'+p.c+'"></i>'+p.l+': <b>'+p.v+'%</b></span>'}).join('')}
  function renderBio(){
    var h='<header style="display:grid;gap:8px"><span class="eyebrow">Approfondimento</span><h1 style="font-size:clamp(2.2rem,11vw,3.4rem)">La quota dei mammiferi selvatici è passata da circa il 50% a circa il 5%</h1></header>';
    h+=edHero('bio',{v:'bar',n:'5%',t:'è la quota dei mammiferi selvatici sulla biomassa dei mammiferi. Umani e mammiferi domestici sono circa il 95%.',bar:[[95,'d','Umani e domestici'],[5,'w','Selvatici']],s:'Greenspoon et al. 2023, PNAS; Our World in Data'});
 h+='<section class="prose"><p>Umani e mammiferi domestici rappresentano oggi circa il 95% della biomassa dei mammiferi. Tutti i mammiferi selvatici insieme, balene comprese, il 5%.</p>'+
      '<p>Uno studio del 2025 stima che la biomassa dei mammiferi selvatici sia scesa da circa 200 milioni di tonnellate nel 1850 a circa 60 milioni di tonnellate nel 2020. Nello stesso periodo umani e mammiferi domestici sono saliti a circa 1,1 miliardi di tonnellate.</p></section>';
    function waf(w,lab,al){var g="";for(var q=0;q<100;q++)g+="<i class='"+(q<w?"wk-w":"wk-d")+"'></i>";return "<div class='waf'><h3>"+lab+"</h3><div class='wgrid' role='img' aria-label='"+al+"'>"+g+"</div></div>";}
    h+="<section style='display:grid;gap:12px'><h2>Biomassa dei mammiferi: 1850 e 2020</h2><div class='wafs'>"+waf(50,"1850","1850: circa 50 quadrati su 100 per i mammiferi selvatici e 50 per umani e domestici")+waf(5,"2020","2020: 5 quadrati su 100 per i mammiferi selvatici e 95 per umani e domestici")+"</div><div class='wleg'><span><i class='wk-w'></i>Mammiferi selvatici: circa 200 milioni di tonnellate (1850), circa 60 (2020)</span><span><i class='wk-d'></i>Esseri umani e mammiferi domestici: circa pari ai selvatici nel 1850, circa 1.100 milioni di tonnellate nel 2020</span></div><p class='note'>Ogni quadrato è l\'1% della biomassa dei mammiferi. Per il 1850 lo studio dice che umani e domestici avevano una biomassa «circa pari» a quella dei selvatici: il 50% è una stima, non un valore pubblicato.</p></section>";
    var PM=[{c:'s-dom',t:'t-dom',v:59,l:'Mammiferi allevati e da compagnia'},{c:'s-hum',t:'t-hum',v:36,l:'Esseri umani'},{c:'s-wild',t:'t-wild',v:5,l:'Mammiferi selvatici'}],PB=[{c:'s-dom',t:'t-dom',v:71,l:'Pollame (uccelli allevati)'},{c:'s-wild',t:'t-wild',v:29,l:'Uccelli selvatici'}];
    h+='<section style="display:grid;gap:12px"><h2>Mammiferi e uccelli: chi pesa di più</h2><div class="pies">'+pie('Biomassa dei Mammiferi',PM)+pie('Biomassa degli Uccelli',PB)+'</div><div class="leg">'+legend(PM)+legend(PB)+'</div><figure style="margin:0;display:grid;gap:6px"><img src="img/owid-barre.jpg" alt="Grafico a barre di Our World in Data: mammiferi 59% bestiame, 36% umani, 5% selvatici; uccelli 71% pollame, 29% selvatici" style="width:100%;height:auto;border-radius:6px"><figcaption class="note">Our World in Data, licenza CC BY. Dati: Greenspoon et al. (2023) e Bar-On et al. (2018), PNAS.</figcaption></figure><figure style="margin:0;display:grid;gap:6px"><img src="img/owid-mammiferi.jpg" alt="Griglia di Our World in Data: ogni quadrato è l\'1% della biomassa dei mammiferi; umani 36%, bovini 38%, bufali 6%, pecore 4%, capre 3%, suini 3%, cavalli e asini 3%, cani 2%, selvatici 5%" style="width:100%;height:auto;border-radius:6px"><figcaption class="note">Our World in Data, Hannah Ritchie e Fiona Spooner, licenza CC BY. Ogni quadrato è l\'1% della biomassa dei mammiferi (circa 11 milioni di tonnellate). Dati: Greenspoon et al. (2023), PNAS.</figcaption></figure><p class="note"><b>Che cosa mostrano.</b> Quote stimate della biomassa mondiale, cioè della massa corporea totale: non il numero di animali né le uccisioni annuali. Ogni torta ha il proprio totale, quindi le due non si confrontano tra loro. Percentuali arrotondate.</p><p class="note"><b>Fonti (verificate sui testi originali).</b> Mammiferi: Greenspoon et al. (2023), <a href="https://doi.org/10.1073/pnas.2204892120" target="_blank" rel="noopener">The global biomass of wild mammals</a>, PNAS: bestiame ≈630 Mt, esseri umani ≈390 Mt, mammiferi selvatici ≈22 Mt terrestri e ≈40 Mt marini (peso fresco). Le quote 59% (allevati e da compagnia), 36% e 5% sono quelle di Our World in Data (1/12/2025) su questi dati. Uccelli: Bar-On, Phillips, Milo (2018), <a href="https://doi.org/10.1073/pnas.1711842115" target="_blank" rel="noopener">The biomass distribution on Earth</a>, PNAS: pollame ≈0,005 Gt C, uccelli selvatici ≈0,002 Gt C, cioè 71% e 29%. Per gli uccelli selvatici l\'incertezza è alta: secondo Our World in Data la quota potrebbe andare dal 14% al 44% a seconda del metodo. Con i soli dati del 2018 i mammiferi sarebbero circa 60%, 36% e 4% (0,1, 0,06 e 0,007 Gt C): la differenza viene dall\'aggiornamento della stima dei selvatici.</p></section>';
    h+='<section class="prose"><h2>Cosa dice lo studio</h2><ul>'+
      '<li>La biomassa dei mammiferi selvatici è diminuita di più della metà dal 1850.</li>'+
      '<li>La biomassa dei mammiferi marini selvatici è diminuita di circa il 70%, soprattutto per il declino delle grandi balene.</li>'+
      '<li>La quota di circa il 5% nel 2020 si ricava dalle cifre dello studio: 60 / (1.100 + 60). La quota di circa il 50% nel 1850 deriva dall\'equivalenza tra le due biomasse.</li></ul>'+
      '<p>Il calo riflette sia la diminuzione dei mammiferi selvatici sia l\'enorme espansione di esseri umani e allevamenti. Sono stime di massa corporea totale, non numeri di animali né di specie.</p>'+
      '<p class="note">Fonte: Greenspoon L., Ramot N., Moran U. et al. (2025), «The global biomass of mammals since 1850», Nature Communications 16, 8338, <a href="https://www.nature.com/articles/s41467-025-63888-z" target="_blank" rel="noopener">DOI 10.1038/s41467-025-63888-z</a>. Le cifre dell\'abstract sono ≈200 Mt (1850) e ≈1.100 Mt (umani e domestici oggi); le 60 Mt dei selvatici nel 2020 sono nel testo dell\'articolo.</p></section>';
    app.innerHTML=h;cur=null;
  }

  var AGES=[
    ['Pollo da carne rapido','35–42 giorni','Giovane prepubere','Sì, è ancora un giovane pollo'],
    ['Pollo biologico','minimo 81 giorni','Giovane prepubere','Sì'],
    ['Gallina ovaiola a fine ciclo','circa 72 settimane (cicli fino a 80–100)','Adulta','No, ma non è normalmente anziana'],
    ['Tacchino da carne','femmine 15–18 settimane, maschi 20–22','Giovane o peripubere','Generalmente sì, giovane'],
    ['Anatra muta da carne','51–84 giorni','Giovane prepubere','Sì'],
    ['Coniglio da carne','71–86 giorni','Peripubere','Giovane, non neonato'],
    ['Suino pesante italiano','almeno 9 mesi','Giovane adulto','No, ma è un adulto molto giovane'],
    ['Agnello da latte','28–42 giorni','Lattante e prepubere','Sì, inequivocabilmente'],
    ['Capretto','2–3 mesi','Prepubere','Sì'],
    ['Branzino allevato','18–24 mesi','Sessualmente immaturo nella maggior parte dei casi','Giovane'],
    ['Orata allevata','circa 15 mesi','Giovane','Giovane'],
    ['Trota iridea (studio italiano)','circa 75 settimane','Subadulta','Giovane o subadulta']
  ];
  var LIFE=[
    ['Pollo da carne','35–42 giorni','circa 8 anni',1.2,1.4],
    ['Anatra','51–84 giorni','8–12 anni',1.2,2.9],
    ['Tacchino','15–22 settimane','almeno 10 anni',2.9,4.2],
    ['Suino pesante','circa 9 mesi','10–15 anni',5,7.5],
    ['Branzino','18–24 mesi','fino a 30 anni',5,6.7],
    ['Orata','circa 15 mesi','età massima documentata 14 anni',8.9,8.9],
    ['Trota iridea (studio)','circa 75 settimane','età massima documentata 11 anni',13,13],
    ['Gallina ovaiola','circa 72 settimane','circa 8 anni',17,17]
  ];

  var VITA_H=83.7;
  var ANI=[
    {n:"Pulcino maschio (linee ovaiole)",i:"chick",age:"entro 24 ore",tag:"stima non ufficiale"},
    {n:"Agnello da latte",i:"sheep",age:"28–42 giorni",lon:"massimo documentato 22,8 anni nella pecora (AnAge, un esemplare in cattività)",lo:.3,hi:.5},
    {n:"Pollo da carne",i:"hen",age:"35–42 giorni",lon:"circa 8 anni",lo:1.2,hi:1.4},
    {n:"Anatra",i:"bird",age:"51–84 giorni",lon:"8–12 anni",lo:1.2,hi:2.9},
    {n:"Coniglio",i:"rabbit",age:"71–86 giorni",lon:"media di 4,3 anni nei conigli da compagnia in Inghilterra; non è una longevità massima",lo:4.5,hi:5.5},
    {n:"Capretto",i:"goat",age:"2–3 mesi",lon:"massimo documentato 20,8 anni nella capra (AnAge, una femmina in cattività)",lo:.8,hi:1.2},
    {n:"Tacchino",i:"turkey",age:"15–22 settimane",lon:"almeno 10 anni",lo:2.9,hi:4.2},
    {n:"Suino pesante",i:"pig",age:"circa 9 mesi",lon:"10–15 anni",lo:5,hi:7.5},
    {n:"Orata",i:"fish",age:"circa 15 mesi",lon:"fino a 14 anni (massimo documentato)",lo:8.9,hi:8.9},
    {n:"Gallina ovaiola",i:"hen",age:"circa 72 settimane",lon:"circa 8 anni",lo:17,hi:17},
    {n:"Trota iridea",i:"fish",age:"circa 75 settimane",lon:"fino a 11 anni (massimo documentato)",lo:13,hi:13},
    {n:"Branzino",i:"fish",age:"18–24 mesi",lon:"fino a 30 anni",lo:5,hi:6.7},
    {n:"Quaglia da carne",i:"bird",age:"4–6 settimane (EFSA 2023: spesso 4–5, in alcuni casi 5–6)",lon:"massimo 6 anni (AnAge)",lo:1.3,hi:1.9},
    {n:"Faraona (studio sperimentale)",i:"bird",age:"16 settimane (età usata in uno studio, non una media commerciale)",lon:"nessun record stabilito (AnAge: solo segnalazioni aneddotiche)"},
    {n:"Bufalino maschio",i:"buf",age:"circa 1 anno (Lazio, 2000–2012)",lon:"massimo 34,9 anni nel bufalo d\'acqua (AnAge, in cattività; qualità «accettabile»)",lo:2.9,hi:2.9},
    {n:"Bufala",i:"buf",age:"circa 8 anni alla macellazione (Lazio, 2000–2012)",lon:"massimo 34,9 anni nel bufalo d\'acqua (AnAge, in cattività; qualità «accettabile»)",lo:22.9,hi:22.9},
    {n:"Cozza",i:"shell",age:"13–15 mesi per raggiungere i 5 cm (monografia sulla cozza)",lon:"massimo 20 anni in natura (AnAge)",lo:5.4,hi:6.3},
    {n:"Vongola filippina",i:"shell",age:"12–18 mesi per la taglia commerciale (Sacca di Goro)",lon:"massimo 14 anni in natura (SeaLifeBase)",lo:7.1,hi:10.7},
    {n:"Bovini da carne",i:"cow",age:"1–2,5 anni",lon:"circa 20 anni per la specie bovina (AnAge, qualità del dato «discutibile»); non esiste un dato specifico per i bovini da carne",lo:5,hi:12.5},
    {n:"Vacca da latte",i:"cow",age:"3–4 anni",lon:"circa 20 anni per la specie bovina (AnAge, qualità del dato «discutibile»)",lo:15,hi:20}
  ];
  function vitaInfo(){
    var h="<section style='display:grid;gap:12px'><h2>A che età vengono uccisi</h2>";
    h+="<div class='vcard vhum'><svg class='ri' viewBox='0 0 24 24' aria-hidden='true'><use href='#i-human'/></svg><div class='vb'><b>Essere umano</b><span class='vage'>81,7 anni (uomini) · 85,7 (donne)</span><span class='note'>Speranza di vita alla nascita in Italia, 2025 (ISTAT).</span><div class='track'><div class='fill g' style='width:100%'></div></div></div></div>";
    ANI.forEach(function(a){
      var eq="",pc="";
      if(a.lo!==undefined){
        var l=a.lo*VITA_H/100,hh=a.hi*VITA_H/100;
        pc=a.lo===a.hi?"circa "+fmt(a.lo,1)+"%":fmt(a.lo,1)+"–"+fmt(a.hi,1)+"%";
        eq=(a.lo===a.hi?"circa "+fmt(l,1):fmt(l,1)+"–"+fmt(hh,1))+" anni";
      }
      h+="<div class='vcard'><svg class='ri' viewBox='0 0 24 24' aria-hidden='true'><use href='#i-"+a.i+"'/></svg><div class='vb'><b>"+esc(a.n)+"</b><span class='vage'>"+esc(a.age)+"</span>";
      if(pc){
        h+="<div class='track'><div class='fill' style='width:"+Math.max(a.hi,2)+"%'></div></div><span class='note'>Ha vissuto circa "+pc+" della vita possibile ("+esc(a.lon)+").</span><span class='eqh'>È come se un essere umano venisse ucciso a "+eq+".</span>";
      }else{
        h+="<span class='note'>"+(a.lon?"Vita naturale: "+esc(a.lon)+". ":"")+"Percentuale non calcolabile con i dati disponibili."+(a.tag?" ("+a.tag+")":"")+"</span>";
      }
      h+="</div></div>";
    });
    h+="<p class='note'>La barra è la vita possibile della specie (100%). L\'equivalente umano è un calcolo illustrativo: quota di vita vissuta × 83,7 anni (media di 81,7 e 85,7). Non è un\'equivalenza biologica. Le età sono valori tipici, non medie nazionali.</p>";
    h+="<p class='note'>Senza dato di età in questa pagina: equini e piccioni. Record di longevità (AnAge): cavallo 57 anni, asino 47, piccione 35, in cattività; per i piccioni allevati per carne e per i muli non c\'è un record né un\'età di macellazione documentati. I dati su bufalini e bufale sono regionali (Lazio, 2000–2012) e non nazionali. Per cozze e vongole la percentuale usa la longevità in natura, non in allevamento.</p></section>";
    return h;
  }
  function renderVita(){
    var h='<header style="display:grid;gap:8px"><span class="eyebrow">Approfondimento</span><h1 style="font-size:clamp(2.2rem,11vw,3.4rem)">Che età hanno gli animali quando li uccidiamo?</h1></header>';
    h+=edHero('vita',{v:'split',n:'5–6 settimane',t:'È l\'età tipica di macellazione dei polli da carne. Sono valori tipici o intervalli commerciali, non medie nazionali ufficiali.',s:'Fonti nella pagina'});
 h+=vitaInfo();
    h+='<section class="prose"><p>La risposta corretta non è «sono tutti cuccioli». Molti animali destinati alla carne sono macellati quando sono ancora neonati, giovani o sessualmente immaturi. Altri, come i suini pesanti, sono giovani adulti. Le galline ovaiole a fine ciclo sono adulte, ma lontane dalla longevità potenziale della specie.</p>'+
      '<p><strong>L\'età di macellazione dipende soprattutto dal raggiungimento del peso commerciale o dalla fine della fase produttiva, non dall\'invecchiamento naturale.</strong></p>'+
      '<p class="note">Non esiste una statistica italiana sull\'età individuale degli animali macellati. Le età sono valori tipici, intervalli commerciali, limiti di disciplinare o risultati di studi, non medie nazionali ufficiali. La longevità di riferimento non è una durata media della vita.</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>In quale fase vivono?</h2>'+
      '<div class="stage"><b>Neonati o lattanti</b><span>Agnelli da latte (4–6 settimane), capretti (spesso 1–3 mesi).</span></div>'+
      '<div class="stage"><b>Giovani prepuberi</b><span>Polli da carne (5–6 settimane), anatre (7–12 settimane), tacchini (15–22 settimane), branzini.</span></div>'+
      '<div class="stage"><b>Peripuberi o adolescenti</b><span>Conigli (10–12 settimane), alcuni polli a crescita lenta.</span></div>'+
      '<div class="stage"><b>Giovani adulti</b><span>Suini pesanti (almeno 9 mesi).</span></div>'+
      '<div class="stage"><b>Adulti</b><span>Galline ovaiole a fine ciclo (circa 16–23 mesi).</span></div>'+
      '<div class="stage"><b>Vecchi</b><span>Nessuna delle principali categorie alimentari esaminate è normalmente allevata fino alla vecchiaia naturale.</span></div></section>';
    h+='<section style="display:grid;gap:10px"><h2>Possiamo dire «uccidiamo cuccioli»?</h2><p class="prose">Sì, ma non per tutte le categorie. Cuccioli o lattanti: agnelli da latte e capretti. Giovani prepuberi: polli da carne, molte anatre e numerosi tacchini. Adolescenti: conigli da carne. Giovani adulti: suini pesanti. Adulti non anziani: galline ovaiole a fine ciclo. Età molto variabile: bovini da riforma, bufalini, riproduttori, equidi e animali abbattuti per ragioni sanitarie.</p>'+
      '<p class="prose">«Tutti gli animali macellati sono cuccioli» sarebbe scientificamente sbagliato. È corretto dire che una parte molto consistente viene macellata prima della maturità completa o poco dopo.</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>Età alla macellazione</h2><div class="tablewrap"><table><thead><tr><th>Animale</th><th>Età documentata</th><th>Stadio biologico</th><th>«Cucciolo»?</th></tr></thead><tbody>'+
      AGES.map(function(r){return '<tr><td data-label="Animale">'+esc(r[0])+'</td><td data-label="Età documentata">'+esc(r[1])+'</td><td data-label="Stadio biologico">'+esc(r[2])+'</td><td data-label="«Cucciolo»?">'+esc(r[3])+'</td></tr>'}).join('')+'</tbody></table></div></section>';
    h+='<section style="display:grid;gap:10px"><h2>Bovini e agnelli: stime di associazione</h2><div class="tablewrap"><table><thead><tr><th>Animale</th><th>Età in allevamento</th><th>Aspettativa di vita naturale</th></tr></thead><tbody>'+
      [['Vitelli «scarto» del latte','6–8 mesi','fino a 20 anni e oltre'],['Bovini da carne','1–2,5 anni','fino a 20 anni e oltre'],['Mucche da latte','3–4 anni (raramente 5)','fino a 20 anni e oltre'],['Agnelli','3–6 mesi','fino a 12 anni']].map(function(r){return '<tr><td data-label="Animale">'+r[0]+'</td><td data-label="Età in allevamento">'+r[1]+'</td><td data-label="Aspettativa">'+r[2]+'</td></tr>'}).join('')+'</tbody></table></div>'+
      '<p class="note">Fonte: Agireora, che attribuisce i dati all\'articolo «Are you a baby eater?» dell\'associazione VIVA!. Sono stime di associazione, senza fonti per le singole cifre, quindi non entrano nei confronti sopra. Per bovini, bufalini ed equidi manca una distribuzione nazionale completa per età.</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>Quanto vivono in allevamento</h2><div class="tablewrap"><table><thead><tr><th>Animale</th><th>Durata media in allevamento</th><th>Longevità massima documentata</th></tr></thead><tbody>'+
      [['Pecora','circa 5 anni, età media di eliminazione dal gregge (Hoffman e Valencak 2020); in Fig. 1 una vita effettiva di circa 7 anni, pari al 31% del massimo','22,8 anni (AnAge)'],['Capra','4–5,7 anni, età media di riforma (circa 4 in una popolazione da latte francese; 4,5–5,7 in Nuova Zelanda); in Fig. 1 circa 6 anni, il 29% del massimo','20,8 anni (AnAge)'],['Vacca da latte','circa 5,4 anni di vita effettiva, il 27% del massimo (Fig. 1 di Hoffman e Valencak 2020)','circa 20 anni (AnAge)'],['Bovino da carne','nessuna media generale: i bovini da carne sono macellati prima di raggiungere la longevità massima (AnAge)','circa 20 anni (specie, AnAge)'],['Gallina ovaiola','70–100 settimane in allevamento commerciale','nessun dato per le linee ovaiole commerciali']].map(function(r){return '<tr><td data-label="Animale">'+r[0]+'</td><td data-label="Durata media in allevamento">'+r[1]+'</td><td data-label="Longevità massima documentata">'+r[2]+'</td></tr>'}).join('')+
      '</tbody></table></div><p class="note">Le medie di allevamento misurano quando gli animali vengono eliminati o riformati, non la morte naturale; i massimi sono record individuali in cattività. Verificato sui testi originali: Hoffman e Valencak (2020), <i>Geroscience</i> 42:909–922, e le schede AnAge di Ovis aries, Capra hircus e Bos taurus (build 15). Per il bovino AnAge giudica il dato «discutibile»: le stime sono tra 12 e oltre 20 anni, con segnalazioni non verificate di capi più longevi. Il dato sulle galline ovaiole (RSPCA) non è ancora verificato.</p></section>';
    h+='<section class="prose"><h2>Limiti</h2><ul>'+
      '<li>Le età commerciali cambiano con razza, sesso, peso richiesto e sistema di allevamento.</li>'+
      '<li>Gli studi sperimentali non rappresentano automaticamente tutta la produzione italiana.</li>'+
      '<li>La longevità massima non è la durata media della vita.</li>'+
      '<li>Le linee a crescita rapida possono avere una longevità diversa dalle razze tradizionali.</li>'+
      '<li>Per pesci e molluschi mancano serie italiane che colleghino individui, età e causa dell\'uccisione.</li>'+
      '<li>La classificazione «cucciolo» o «adulto» si basa sullo sviluppo biologico, non solo sulla percentuale di vita trascorsa.</li></ul>'+
      '<p class="note">Fonti principali delle età: studi su PubMed Central e Università di Padova per polli, conigli, suini, agnelli e capretti, FAO e FishBase per i pesci. Le longevità di riferimento vengono da fonti divulgative e da FishBase: i confronti sono illustrativi. Elenco completo nella pagina Info e fonti.</p></section>';
    app.innerHTML=h;cur=null;
  }

  function renderPriv(){
    var T='<a href="mailto:privacyvalore0@rgbear.it">privacyvalore0@rgbear.it</a>';
    var h='<h1>Informativa sulla privacy</h1><p class="note">Informativa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR). Ultimo aggiornamento: 31/10/2026.</p>'+
    '<section class="prose"><h2>In breve</h2><p>Questo sito non richiede registrazione, non ha moduli, non usa cookie, non usa strumenti di analisi o di profilazione e salva sul tuo dispositivo soltanto la scelta del tema (chiaro, scuro o automatico), se la modifichi. La pagina non raccoglie né conserva dati personali di chi la visita. Non carica contenuti da servizi di terzi: i caratteri tipografici sono ospitati sul sito stesso.</p></section>'+
    '<section class="prose"><h2>Chi gestisce il sito</h2><p>Valore Zer0 è un progetto informativo e didattico senza scopo di lucro. Per qualsiasi richiesta sui dati personali scrivi a '+T+'.</p></section>'+
    '<section class="prose"><h2>Quali dati vengono trattati</h2><ul>'+
    '<li><strong>Dati di navigazione.</strong> Per mostrare il sito, il servizio di hosting che lo ospita riceve dal tuo browser dati tecnici come indirizzo IP, data e ora della richiesta, tipo di browser e di dispositivo. Questi dati sono trattati dal fornitore di hosting per erogare e proteggere il servizio. Chi gestisce il sito non li usa per identificarti.</li>'+
    '<li><strong>Link esterni.</strong> Le fonti rimandano a siti di terzi (ISTAT, Eurostat, Nature e altri). Se li apri, valgono le loro informative.</li></ul></section>'+
    '<section class="prose"><h2>Finalità e base giuridica</h2><p>Erogazione e sicurezza del sito: legittimo interesse (art. 6, par. 1, lett. f, GDPR) a mantenere il sito funzionante e protetto. Il sito ha finalità informative e didattiche. Non c\'è nessuna decisione automatizzata né profilazione.</p></section>'+
    '<section class="prose"><h2>Cookie e dispositivo</h2><p>Il sito non installa cookie. Se scegli il tema chiaro o scuro, il browser conserva questa sola preferenza nella memoria locale (localStorage): non contiene dati personali, non viene inviata a nessuno e serve solo a ricordare la tua scelta. Puoi cancellarla in qualsiasi momento dalle impostazioni del browser o tornando alla modalità automatica. Il sito non legge altre informazioni dal tuo dispositivo e non mostra un banner dei cookie. Se in futuro verranno aggiunti strumenti di analisi o altri servizi di terzi, questa informativa sarà aggiornata e, dove serve, sarà chiesto il consenso.</p></section>'+
    '<section class="prose"><h2>Conservazione e trasferimenti</h2><p>La pagina non conserva dati. I tempi di conservazione dei dati tecnici dipendono dal fornitore di hosting, che può trattarli anche fuori dallo Spazio economico europeo con le garanzie previste dal GDPR (per esempio decisioni di adeguatezza o clausole contrattuali tipo). Dettagli nell\'informativa del fornitore.</p></section>'+
    '<section class="prose"><h2>I tuoi diritti</h2><p>Puoi chiedere l\'accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione, l\'opposizione al trattamento e, dove applicabile, la portabilità (artt. 15–22 GDPR), scrivendo a '+T+'. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">garanteprivacy.it</a>) o all\'autorità del tuo Paese.</p></section>'+
    '<section class="prose"><h2>Minori</h2><p>Il sito può essere usato in classe. Non raccoglie dati dei minori e non richiede di inserirne.</p></section>'+
    '<p class="note read">Le fonti dei numeri sono elencate in <a href="#info">Info e fonti</a>. Caratteri: Anton e IBM Plex Sans, licenza SIL Open Font License 1.1.</p>';
    app.innerHTML=h;cur=null;
  }

  function renderDiete(){
    var h='<header style="display:grid;gap:8px"><span class="eyebrow">Approfondimento</span><h1 style="font-size:clamp(2.2rem,11vw,3.4rem)">Onnivori, vegetariani, vegani</h1></header>';
    h+="<section class='prose'><p>Le diete sostengono filiere animali diverse. Un confronto numerico completo tra onnivori, vegetariani e vegani non è ancora possibile.</p></section>";
    h+="<div class='stats'><div><b>100 g</b><span>di carne e derivati al giorno per cittadino</span></div><div><b>36,5 kg</b><span>all\'anno (calcolo)</span></div><div><b>92%</b><span>del campione ne consuma</span></div></div><p class='note'>Consumo effettivo, indagine CREA IV SCAI, 2017–2020.</p>";
    h+="<section style='display:grid;gap:12px'><h2>Quanti sono vegetariani e vegani</h2><div class='stats'><div><b>5,3%</b><span>si dichiara vegetariano</span></div><div><b>3,2%</b><span>si dichiara vegano</span></div><div><b>23%</b><span>si dichiara flexitariano</span></div></div><p class='note'>Indagine Eurispes, Rapporto Italia 2026 (riportata da Open, 18/06/2026), popolazione adulta. Sono autodefinizioni, non classificazioni basate sui consumi. Il campione non è indicato nell\'articolo. Nel Rapporto Italia 2025 erano 6,6% vegetariani e 2,9% vegani: le differenze tra anni sono piccole e non sono una misura precisa della popolazione.</p></section>";
    h+='<section style="display:grid;gap:12px"><h2>Quanta carne mangia un cittadino</h2><p class="prose">Secondo l\'indagine alimentare nazionale CREA IV SCAI (rilevazioni 2017–2020, popolazione da 3 a 74 anni), la media è di <strong>100 g al giorno</strong> di «carne e derivati», che consuma il 92% del campione. Sono circa 36,5 kg all\'anno (calcolo: 100 g × 365). È il consumo effettivo, rilevato con interviste sulle 24 ore e diari alimentari.</p><div class="bars"><div class="bar"><div class="lab"><span>Bambini</span><b>82 g</b></div><div class="track"><div class="fill" style="width:51.2%"></div></div></div><div class="bar"><div class="lab"><span>Adolescenti</span><b>143 g</b></div><div class="track"><div class="fill" style="width:89.4%"></div></div></div><div class="bar"><div class="lab"><span>Adulti</span><b>124 g</b></div><div class="track"><div class="fill" style="width:77.5%"></div></div></div><div class="bar"><div class="lab"><span>Anziani</span><b>98 g</b></div><div class="track"><div class="fill" style="width:61.3%"></div></div></div><div class="bar"><div class="lab"><span>Intera popolazione (3–74 anni)</span><b>100 g</b></div><div class="track"><div class="fill" style="width:62.5%"></div></div></div></div><p class="note">Grammi al giorno per classe d\'età. Tra gli adolescenti i maschi sono a 157 g e le femmine a 126 g; tra gli adulti 151 g contro 100 g. Per sottogruppi, il documento riporta circa 31 g al giorno di carne avicola, circa 31 g di bovina e 23 g di processata (salumi e simili); consumano carne processata il 59% del campione, bovina il 48%, avicola il 42%, di maiale il 12%. Altri gruppi: pesce 33 g al giorno (consumato dal 49%), uova 13 g (47%), latte e derivati 237 g (98%). I dati non sono del 2025 e non includono gli over 75.</p></section>';
    h+='<section style="display:grid;gap:12px"><h2>Tre diete a confronto, in Italia</h2><p class="prose">Studio italiano su 153 adulti (51 onnivori, 51 ovo-latto-vegetariani, 51 vegani), con diario alimentare di 7 giorni. Non è un campione rappresentativo degli italiani: mostra le differenze tra gruppi di persone che seguono già quella dieta.</p><div class="tablewrap"><table><caption class="note" style="text-align:left">Consumo giornaliero, mediana (g/giorno)</caption><thead><tr><th>Alimento</th><th>Onnivori</th><th>Vegetariani</th><th>Vegani</th></tr></thead><tbody><tr><td data-label="Alimento">Carne e derivati</td><td data-label="Onnivori">113,6</td><td data-label="Vegetariani">0</td><td data-label="Vegani">0</td></tr><tr><td data-label="Alimento">Pesce</td><td data-label="Onnivori">34,3</td><td data-label="Vegetariani">0</td><td data-label="Vegani">0</td></tr><tr><td data-label="Alimento">Uova</td><td data-label="Onnivori">15,0</td><td data-label="Vegetariani">13,2</td><td data-label="Vegani">0</td></tr><tr><td data-label="Alimento">Latte e derivati</td><td data-label="Onnivori">188,6</td><td data-label="Vegetariani">68,6</td><td data-label="Vegani">0</td></tr><tr><td data-label="Alimento">Legumi</td><td data-label="Onnivori">18,6</td><td data-label="Vegetariani">50,7</td><td data-label="Vegani">64,3</td></tr><tr><td data-label="Alimento">Verdure</td><td data-label="Onnivori">219,0</td><td data-label="Vegetariani">407,6</td><td data-label="Vegani">478,5</td></tr></tbody></table></div><div class="tablewrap"><table><caption class="note" style="text-align:left">Impronta giornaliera per persona, media</caption><thead><tr><th>Indicatore</th><th>Onnivori</th><th>Vegetariani</th><th>Vegani</th></tr></thead><tbody><tr><td data-label="Indicatore">Carbonio (g CO₂ eq.)</td><td data-label="Onnivori">3.959</td><td data-label="Vegetariani">2.598</td><td data-label="Vegani">2.336</td></tr><tr><td data-label="Indicatore">Acqua (litri)</td><td data-label="Onnivori">3.141</td><td data-label="Vegetariani">2.305</td><td data-label="Vegani">2.455</td></tr><tr><td data-label="Indicatore">Ecologica (m² globali)</td><td data-label="Onnivori">26,0</td><td data-label="Vegetariani">16,1</td><td data-label="Vegani">14,5</td></tr></tbody></table></div><p class="note">Fonte: Rosi et al. (2017), Scientific Reports 7:6105, tabelle 2 e 4. Per carbonio, acqua e impronta ecologica gli onnivori risultano diversi dagli altri due gruppi; tra vegetariani e vegani lo studio non rileva differenze significative. Le impronte dipendono dai coefficienti usati dagli autori.</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>Consumo apparente: quanto entra sul mercato</h2><div class="vals">'+
      '<div><span>Carne avicola (2025)</span><b>23 kg</b></div><div><span>Carne bovina (2024)</span><b>15,3 kg</b></div><div><span>Carne suina, consumo apparente (2025)</span><b>2.234.000 t</b></div><div><span>Uova (2025, fresche e trasformate)</span><b>230</b></div><div><span>Salumi (2024, ASSICA)</span><b>16,5 kg</b></div><div><span>Salumi più carne suina fresca (2024, ASSICA)</span><b>27,6 kg</b></div><div><span>Prodotti ittici (2023, EUMOFA, peso vivo equivalente)</span><b>30,4 kg</b></div></div>'+
      '<p class="note">Fonte: ISMEA (Scheda Avicoli 2026, Scheda Bovino 2025, Scheda Suini 2026, Tendenze Uova 2026), su dati ISTAT; file forniti dall\'utente e letti. I chili sono tonnellate equivalente carcassa divise per i residenti, cioè consumo apparente (produzione + import − export), non quanto si mangia davvero. Per i suini la scheda dà solo il totale, che comprende carni fresche, congelate e preparazioni: non c\'è un dato in kg per persona. Salumi, carne fresca e pesce sono di altri anni e fonti: non si sommano ai valori ISMEA. Sottraendo, ASSICA implica circa 11 kg di carne suina fresca nel 2024 (27,6 − 16,5, calcolo). Sono medie su tutta la popolazione, non il consumo dell\'onnivoro. Il consumo effettivo CREA (36,5 kg all\'anno) e quello apparente non sono confrontabili: il secondo conta carcassa, scarti e sprechi. Una verifica ha corretto il documento di ricerca iniziale: 21,4 kg di avicola e 16,1 kg di bovina non corrispondono alle schede (16,1 kg è il bovino del 2020; l\'avicola 2023 è 21,7 kg).</p></section>';
    h+='<section class="pov"><span class="eyebrow">In sintesi</span><p class="zero">Le diete sostengono filiere diverse.</p><p>Il numero totale di individui attribuibile ai consumi italiani richiede ancora dati e coefficienti specifici: non può essere ricavato dalle sole macellazioni nazionali.</p></section>';
    h+='<p class="note read">Sintesi del documento di ricerca fornito dall\'utente (rapporto sugli effetti delle diete). Le citazioni sono di terzi e non sono state riverificate una per una. Fonti: Info e fonti.</p>';
    app.innerHTML=h;cur=null;
  }

  var DIETS=[["Vegani","Vegani"],["Vegetariani","Vegetariani"],["Pescetariani","Mangiano pesce, non carne"],["Poca carne","Meno di 50 g di carne al giorno"],["Carne media","50–99 g di carne al giorno"],["Molta carne","Almeno 100 g di carne al giorno"]];
  var AMBD=[
    {t:"Gas serra",u:"kg di CO2-eq al giorno (GWP100)",v:[2.47,4.16,4.74,5.37,7.04,10.24],d:2},
    {t:"Metano",u:"g di CH4 al giorno",v:[4.39,20.21,22.55,28.99,40.88,65.40],d:1},
    {t:"Suolo agricolo",u:"m² al giorno",v:[4.37,6.01,6.31,8.31,11.28,16.78],d:1},
    {t:"Acqua",u:"m³ al giorno",v:[0.41,0.53,0.71,0.71,0.78,0.89],d:2},
    {t:"Eutrofizzazione",u:"g di PO4-eq al giorno (inquinamento delle acque)",v:[10.70,17.27,21.09,23.55,29.61,40.80],d:1}
  ];
  /* ---------- Confronti nutrizionali (CREA, BDA) ---------- */
  var NF=[
    // id, nome, stato, porzione g, gruppo, [kcal,prot,lip,fib,fe,zn,ca,mg,k,se,b1,b2,b3], aminoacido limitante, indice chimico
    ['bf','Bovino, fesa','crudo',100,'a',[103,21.8,1.8,0,1.8,3.9,4,18,342,3,.15,.26,6.3],'valina',123],
    ['bl','Bovino, filetto','crudo',100,'a',[127,20.5,5.0,0,1.9,2.8,4,20,330,17,.09,.19,4.7],'valina',115],
    ['mm','Maiale, lombo','crudo',100,'a',[146,20.7,7.0,0,1.3,1.8,7,null,220,14,.25,.30,4.0],'leucina',132],
    ['pp','Pollo, petto','crudo',100,'a',[100,23.3,.8,0,.4,.7,4,32,370,10,.10,.20,8.3],'leucina',142],
    ['tt','Tacchino, fesa','crudo',100,'a',[107,24.0,1.2,0,.8,1.1,8,32,382,7,.10,.20,6.7],'leucina',141],
    ['ag','Agnello','crudo',100,'a',[159,20.0,8.8,0,1.7,3.1,10,20,350,18,.15,.28,6.0],'valina',128],
    ['uo','Uovo di gallina, intero','crudo',50,'a',[128,12.4,8.7,0,1.5,1.2,48,13,133,5.8,.09,.30,.10],'leucina',142],
    ['la','Latte vaccino intero','pastorizzato',125,'a',[64,3.3,3.6,0,.1,.38,119,12,150,1.6,.04,.18,.10],'amminoacidi solforati',153],
    ['pa','Parmigiano Reggiano','media stagionatura',50,'a',[397,32.4,29.7,0,.2,4.0,1159,43,102,12,.03,.37,.05],'valina',104],
    ['to','Tonno','crudo',150,'a',[159,21.5,8.1,0,1.3,null,38,26,410,112,.20,.12,8.5],'leucina',147],
    ['sa','Salmone','crudo',150,'a',[185,18.4,12,0,.7,null,27,null,310,null,.20,.15,7.0],null,null],
    ['le','Lenticchie','secche, cotte',150,'v',[109,6.9,.4,8.3,3,1.1,29,28,266,4,.12,.05,.60],'amminoacidi solforati',85],
    ['ce','Ceci','secchi, cotti',150,'v',[132,7.0,2.4,5.8,2.2,1.7,58,37,302,1,.20,.04,.90],'amminoacidi solforati',99],
    ['bo','Fagioli borlotti','secchi, cotti',150,'v',[106,6.9,.4,6.9,2.3,1.2,46,null,282,6,.11,.03,.30],'amminoacidi solforati',94],
    ['so','Soia','secca',50,'v',[430,36.9,19.1,11.9,6.9,null,257,null,1740,null,.99,.52,2.50],null,null],
    ['sp','Spinaci','crudi',80,'v',[35,3.4,.7,1.9,2.9,1.43,78,60,530,1,.07,.37,.40],'valina',156],
    ['qu','Quinoa','cruda',80,'v',[376,15.4,8.1,12.2,3.6,2.74,46,189,655,null,null,null,null],null,null],
    ['ma','Mandorle dolci','secche',30,'v',[628,22.0,55.3,12.7,3,2.5,240,264,780,1.5,.23,.40,3.0],'lisina',49],
    ['pi','Pane integrale','pronto al consumo',50,'v',[224,8.5,1.3,6.5,2.5,null,25,null,198,null,.10,.12,null],null,null]
  ];
  // k: indice nel vettore, nome, unità, riferimento EFSA adulti [uomini, donne] o null, decimali, nota
  var NN=[
    {k:1,n:'Proteine',u:'g',ref:null,d:1,note:'Il riferimento EFSA è 0,83 g per kg di peso corporeo al giorno, quindi dipende dal peso: per 70 kg sono 58 g (calcolo). La qualità proteica è nella tabella sotto.'},
    {k:4,n:'Ferro',u:'mg',ref:[11,16],rl:'uomini · donne in premenopausa',d:1,note:'Il contenuto non è l\'assorbito. Carne e pesce contengono anche ferro «eme», più assorbibile; uova, latticini e alimenti vegetali contengono ferro «non eme», che la vitamina C nello stesso pasto favorisce e i fitati ostacolano. Per le donne dopo la menopausa il riferimento EFSA è 11 mg.'},
    {k:5,n:'Zinco',u:'mg',ref:null,d:1,note:'Il riferimento EFSA dipende dai fitati della dieta: da 9,4 a 16,3 mg al giorno negli uomini e da 7,5 a 12,7 mg nelle donne. Per questo non si calcola una percentuale unica.'},
    {k:6,n:'Calcio',u:'mg',ref:[950,950],rl:'adulti da 25 anni',d:0,note:'Il contenuto non è l\'assorbito: negli spinaci gli ossalati ne limitano l\'assorbimento, quindi i milligrammi non vanno confrontati direttamente con quelli del latte.'},
    {k:7,n:'Magnesio',u:'mg',ref:[350,300],rl:'uomini · donne',d:0,note:''},
    {k:8,n:'Potassio',u:'mg',ref:[3500,3500],rl:'adulti',d:0,note:''},
    {k:9,n:'Selenio',u:'µg',ref:[70,70],rl:'adulti',d:1,note:''},
    {k:3,n:'Fibre',u:'g',ref:[25,25],rl:'adulti',d:1,note:'Le fibre sono presenti solo negli alimenti vegetali: nei prodotti animali il valore CREA è 0.'},
    {k:11,n:'Riboflavina (B2)',u:'mg',ref:[1.6,1.6],rl:'adulti',d:2,note:''},
    {k:10,n:'Tiamina (B1)',u:'mg',ref:null,d:2,note:'Il riferimento EFSA dipende dall\'energia assunta: la percentuale non è calcolata.'},
    {k:12,n:'Niacina (B3)',u:'mg',ref:null,d:1,note:'Il riferimento EFSA dipende dall\'energia assunta e comprende la niacina ricavata dal triptofano: la percentuale non è calcolata.'},
    {k:0,n:'Energia',u:'kcal',ref:null,d:0,note:'Il fabbisogno energetico dipende da età, sesso, corporatura e attività fisica: nessun riferimento unico.'},
    {k:2,n:'Grassi totali',u:'g',ref:null,d:1,note:'Il profilo degli acidi grassi nelle tabelle CREA è espresso in percentuale degli acidi grassi, non in grammi, e per molti alimenti manca: qui si confrontano solo i grassi totali.'},
    {k:-1,n:'Vitamina B12',u:'',ref:null,d:0,note:''}
  ];
  var nutriSel=1,nutriMode='p';
  var NFN={"Proteine": "Costruiscono e riparano muscoli, pelle, enzimi e ormoni. Forniscono gli aminoacidi, nove dei quali sono essenziali: il corpo non li produce e deve assumerli con il cibo.", "Ferro": "Trasporta l'ossigeno nel sangue, nell'emoglobina, e nei muscoli. Serve alla formazione dei globuli rossi e al normale funzionamento del sistema immunitario.", "Zinco": "Partecipa alle difese immunitarie, alla guarigione delle ferite, alla sintesi di proteine e DNA e alla crescita.", "Calcio": "È il minerale di ossa e denti. Serve anche alla contrazione dei muscoli, alla trasmissione degli impulsi nervosi e alla coagulazione del sangue.", "Magnesio": "Serve ai muscoli e ai nervi, alla produzione di energia nelle cellule e al mantenimento delle ossa.", "Potassio": "Regola l'equilibrio dei liquidi e il funzionamento di nervi e muscoli, compreso il cuore, e contribuisce a mantenere normale la pressione del sangue.", "Selenio": "Fa parte di enzimi che proteggono le cellule dallo stress ossidativo e serve alla tiroide e alle difese immunitarie.", "Fibre": "Aiutano il funzionamento dell'intestino e danno senso di sazietà. Contribuiscono a limitare l'aumento della glicemia dopo i pasti.", "Riboflavina (B2)": "Aiuta a ricavare energia da carboidrati, grassi e proteine. Serve a pelle, mucose e vista e protegge le cellule dallo stress ossidativo.", "Tiamina (B1)": "Serve al metabolismo dei carboidrati per produrre energia e al funzionamento del sistema nervoso e del cuore.", "Niacina (B3)": "Serve a produrre energia dagli alimenti e al buon funzionamento di pelle, mucose e sistema nervoso.", "Energia": "È il carburante di tutte le funzioni del corpo, dal battito del cuore al movimento. Viene dai carboidrati, dai grassi e dalle proteine ed è misurata in kcal.", "Grassi totali": "Sono una riserva concentrata di energia, entrano nelle membrane delle cellule e permettono di assorbire le vitamine A, D, E e K. Alcuni acidi grassi sono essenziali.", "Vitamina B12": "Serve alla formazione dei globuli rossi, al sistema nervoso e alla sintesi del DNA."};
  NN.forEach(function(n){n.fn=NFN[n.n]||''});
  NN.sort(function(a,b){return a.n.localeCompare(b.n,'it')});
  NN.forEach(function(n,i){if(n.n==='Ferro')nutriSel=i});
  function nutriChart(){
    var N=NN[nutriSel],h='';
    if(N.k<0){
      return '<div class="card"><p>Vitamina B12: non conta soltanto cosa mangiamo, ma anche quanto ne assorbiamo. La carenza può riguardare persone con qualsiasi modello alimentare. Chi segue un\'alimentazione vegana deve garantirne l\'assunzione con integratori o alimenti fortificati; altre persone possono aver bisogno di integrazione per carenze o difficoltà di assorbimento, su indicazione sanitaria.</p></div>'+
        '<p class="note">Il riferimento EFSA per gli adulti è 4 µg al giorno. Le tabelle CREA non riportano la B12 per la maggior parte degli alimenti (solo il Parmigiano Reggiano, 1,7 µg per 100 g), quindi non è possibile un confronto numerico. Secondo il Servizio sanitario britannico (NHS), le fonti per i vegani sono poche e può servire un integratore; sono indicati cereali per la colazione, bevande di soia non zuccherate ed estratto o fiocchi di lievito, tutti arricchiti con B12. Fonti: NHS, EFSA; scheda NIH, non consultabile da qui.</p>';
    }
    var rows=NF.map(function(f){var v=f[5][N.k];return {f:f,v:v,x:(v==null?null:(nutriMode==='p'?v*f[3]/100:v))}});
    var have=rows.filter(function(r){return r.x!==null}).sort(function(a,b){return b.x-a.x});
    var miss=rows.filter(function(r){return r.x===null});
    var max=have.length?have[0].x:1;
    h+='<div class="bars">';
    have.forEach(function(r){
      var f=r.f,pct='';
      if(N.ref&&nutriMode==='p'){
        var a=r.x/N.ref[0]*100,b=r.x/N.ref[1]*100;
        pct=N.ref[0]===N.ref[1]?' · '+fmt(a,a<10?1:0)+'% del riferimento':' · '+fmt(a,a<10?1:0)+'% uomini · '+fmt(b,b<10?1:0)+'% donne';
      }
      h+='<div class="bar"><div class="lab"><span>'+esc(f[1])+' <small style="color:var(--muted)">('+(f[4]==='a'?'animale':'vegetale')+', '+esc(f[2])+')</small></span><b>'+fmt(r.x,N.d)+' '+N.u+'</b></div><div class="track"><div class="fill'+(f[4]==='v'?' g':'')+'" style="width:'+(max>0?Math.max(r.x/max*100,r.x>0?1.5:0):0)+'%"></div></div>'+(pct?'<div class="note" style="margin:2px 0 0">'+pct.replace(/^ · /,'')+'</div>':'')+'</div>';
    });
    h+='</div>';
    if(N.ref&&nutriMode==='p')h+='<p class="note">Percentuale del riferimento EFSA giornaliero per gli adulti ('+N.ref[0]+(N.ref[0]!==N.ref[1]?' e '+N.ref[1]:'')+' '+N.u+', '+N.rl+').</p>';
    if(miss.length)h+='<p class="note">Non riportato nelle tabelle CREA: '+miss.map(function(r){return esc(r.f[1])}).join(', ')+'.</p>';
    if(N.note)h+='<p class="note">'+N.note+'</p>';
    if(N.k===1){
      h+='<div class="tablewrap"><table><caption class="note" style="text-align:left">Qualità proteica secondo CREA</caption><thead><tr><th>Alimento</th><th>Aminoacido limitante</th><th>Indice chimico</th></tr></thead><tbody>';
      NF.forEach(function(f){h+='<tr><td data-label="Alimento">'+esc(f[1])+'</td><td data-label="Aminoacido limitante">'+(f[6]?esc(f[6]):'non riportato')+'</td><td data-label="Indice chimico">'+(f[7]!==null?f[7]:'non riportato')+'</td></tr>'});
      h+='</tbody></table></div><p class="note">L\'indice chimico confronta le proteine con un profilo di riferimento, un valore sotto 100 indica un aminoacido limitante. Non tiene conto della digeribilità, che misurano invece indici come PDCAAS e DIAAS.</p>';
    }
    return h;
  }
  function renderNutri(){
    var h="<header style='display:grid;gap:8px'><span class='eyebrow'>Approfondimento</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Confronti nutrizionali</h1></header>";
    h+="<section class='prose'><p>Composizione di 19 alimenti, animali e vegetali, secondo la banca dati CREA. Il confronto è per porzione di riferimento: gli stati degli alimenti sono diversi (crudo, cotto, secco), quindi i valori per 100 g non sono confrontabili tra loro.</p></section>";
    h+='<div class="pchips" role="group" aria-label="Scegli il nutriente">';
    NN.forEach(function(n,i){h+='<button type="button" data-n="'+i+'" aria-pressed="'+(i===nutriSel)+'">'+esc(n.n)+'</button>'});
    h+='</div>';
    h+='<div class="pchips" role="group" aria-label="Unità di confronto" data-modes><button type="button" data-m="p" aria-pressed="'+(nutriMode==='p')+'">Per porzione</button><button type="button" data-m="c" aria-pressed="'+(nutriMode==='c')+'">Per 100 g</button></div>';
    h+='<section style="display:grid;gap:12px"><h2 data-nt></h2><p class="prose" data-nf></p><div data-nc></div></section>';
    h+='<p class="note">Fonti: CREA, Tabelle di composizione degli alimenti (BDA, pagine aggiornate a dicembre 2019); riferimenti EFSA, Dietary Reference Values (tabelle di sintesi, gennaio 2017). Le porzioni sono quelle di riferimento CREA e LARN/SINU; per i ceci e per gli spinaci è usata la porzione LARN, diversa da quella indicata da CREA. Alcuni valori CREA sono calcolati o imputati e non misurati.</p>';
    h+='<section class="prose"><h2>Il BPI Score: 20 fonti proteiche a confronto</h2><p>Il BPI Score (Better Protein Index) è un indice proposto da Chris Macdonald, dell\'Università di Cambridge e direttore del Better Protein Institute, in un articolo di tipo «perspective» pubblicato su <i>Frontiers in Sustainable Food Systems</i> il 29 luglio 2026. Assegna un punteggio a 20 alimenti ricchi di proteine, su un massimo di 40 punti, per 100 g di proteine.</p><p>Il punteggio somma due parti. Il <b>Planet Score</b> (massimo 16 punti) usa quattro misure ambientali: emissioni di gas serra, inquinamento dell\'acqua, uso del suolo e consumo di acqua dolce, dalla banca dati di Clark et al. (2022). Il <b>People Score</b> (massimo 24 punti) usa sei misure: sodio, grassi saturi, colesterolo, completezza delle proteine, prezzo e disponibilità in un supermercato britannico; i dati nutrizionali vengono dalla banca dati Nutritionix. Per ogni misura gli alimenti sono ordinati e divisi in cinque gruppi da 0 a 4 punti.</p></section>';
    h+='<section style="display:grid;gap:10px"><h3>Risultati riportati nell\'articolo</h3><div class="tablewrap"><table><thead><tr><th>Punteggio</th><th>Primo</th><th>Ultimo</th></tr></thead><tbody>'+
      [['Complessivo (su 40)','Tofu, 36','Cheddar, 13'],['Planet Score (su 16)','Tofu, 16','Manzo, 1'],['People Score (su 24)','Tofu, 20','Agnello, 10']].map(function(r){return '<tr><td data-label="Punteggio">'+r[0]+'</td><td data-label="Primo">'+r[1]+'</td><td data-label="Ultimo">'+r[2]+'</td></tr>'}).join('')+
      '</tbody></table></div><div class="tablewrap"><table><thead><tr><th>Misura (per 100 g di proteine)</th><th>Valore più basso citato</th><th>Valore più alto citato</th></tr></thead><tbody>'+
      [['Gas serra (kg CO₂ eq)','Tofu, 0,61','Manzo, 64,19'],['Uso del suolo (m²)','Tofu, 2,16','Manzo, 211,38'],['Inquinamento dell\'acqua (g PO₄ eq)','Semi di chia, 3,07','Maiale, 46,23'],['Consumo di acqua dolce (litri)','Fagioli, 0,07','Frutta a guscio, 2.239,1']].map(function(r){return '<tr><td data-label="Misura">'+r[0]+'</td><td data-label="Più basso">'+r[1]+'</td><td data-label="Più alto">'+r[2]+'</td></tr>'}).join('')+
      '</tbody></table></div><p class="note">Nel gruppo più alto (20%) ci sono solo alimenti vegetali (tofu, semi di chia, fagioli, quinoa); in quello più basso solo alimenti animali (mozzarella, maiale, cheddar, manzo). I valori sono quelli citati nel testo: la graduatoria completa è in una figura che non ho trascritto. Il paper dice che l\'acqua dolce consumata è l\'acqua «blu».</p></section>';
    h+='<section class="prose"><h3>Limiti dichiarati dall\'autore</h3><p>È la prima versione (V1) e una seconda è in sviluppo. Prezzo e disponibilità riguardano un solo supermercato britannico (Aldi), quindi non valgono in altri Paesi. La scala a cinque gruppi nasconde le differenze molto grandi, come quelle del manzo. La completezza delle proteine è un sì/no, e la maggior parte degli alimenti vegetali risulta «incompleta». Benessere animale, costi opportunità, resistenza agli antibiotici e rischio di malattie trasmesse dagli animali non sono inclusi. L\'autore dirige l\'istituto che propone l\'indice; dichiara di non avere conflitti di interesse e che i costi di pubblicazione sono stati coperti dal Lucy Cavendish College. Il BPI Score non misura il numero di animali allevati o uccisi, ed è un indice, non una raccomandazione alimentare.</p><p class="note">Fonte: Macdonald C. (2026), <i>What are the best sources of protein? Introducing the BPI Score</i>, Front. Sustain. Food Syst. 10:1677796, doi 10.3389/fsufs.2026.1677796, letto per intero. Le fonti dei dati (Clark et al. 2022, Nutritionix) sono citate dall\'articolo e non le ho consultate.</p></section>';
    h+='<p class="note">I valori descrivono il contenuto dell\'alimento, non un\'indicazione alimentare personale. Per esigenze individuali ci si rivolge a un medico o a un dietista.</p>';
    h+='<p><a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;cur=null;
    function draw(){
      var N=NN[nutriSel];
      app.querySelector('[data-nf]').textContent=N.fn;
      app.querySelector('[data-nt]').textContent=N.n+(N.k<0?'':(nutriMode==='p'?' per porzione':' per 100 g'));
      app.querySelector('[data-nc]').innerHTML=nutriChart();
      app.querySelector('[data-modes]').style.display=N.k<0?'none':'';
      app.querySelectorAll('button[data-n]').forEach(function(b){b.setAttribute('aria-pressed',String(+b.getAttribute('data-n')===nutriSel))});
      app.querySelectorAll('button[data-m]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-m')===nutriMode))});
    }
    app.querySelectorAll('button[data-n]').forEach(function(b){b.addEventListener('click',function(){nutriSel=+b.getAttribute('data-n');draw()})});
    app.querySelectorAll('button[data-m]').forEach(function(b){b.addEventListener('click',function(){nutriMode=b.getAttribute('data-m');draw()})});
    draw();
  }
  /* ---------- Mangia! Mangia! Mangia! ---------- */
  var MM=[
    ['bov','Ricordi quando hai voluto una bistecca?','uccisi','bovino',1,''],
    ['vac','Ricordi quando hai voluto latte e cereali a colazione?','uccise','mucca',1,'ISTAT non distingue le vacche da latte da quelle da carne. Le vacche sono comprese nel totale dei bovini: non si sommano.'],
    ['sui','Ricordi quando hai voluto un panino col prosciutto?','uccisi','maiale',.92,''],
    ['pgt','Ricordi quando hai ordinato il pollo?','uccisi','pollo',.78,'Totale ISTAT: polli da carne, galline da uova e galline da riproduzione.'],
    ['gov','Ricordi quando hai voluto una frittata?','uccise','gallina',.8,'Compreso nel totale polli e galline: le due righe non si sommano.'],
    ['tac','Ricordi quando hai voluto un panino col tacchino?','uccisi','tacchino',.92,''],
    ['agn','Ricordi quando a Pasqua c\'era l\'agnello?','uccisi','agnello',.85,''],
    ['con','Ricordi quando hai voluto il coniglio alla cacciatora?','uccisi','coniglio',.62,'']
  ];
  var mmPaused=false;
  var MMSET={bov:1,vac:1};
  var MMR={bovino:1.383,mucca:1.304,maiale:1.629,pollo:.85,gallina:.829,tacchino:1.075,agnello:1.0625,coniglio:1.158};
  function mmRateTxt(r,pl,ucc){
    if(r>=1)return '<b>'+fmt(r,1)+'</b> '+esc(pl)+' '+ucc+' al secondo';
    if(r*60>=1)return '<b>'+fmt(r*60,1)+'</b> '+esc(pl)+' '+ucc+' al minuto';
    return '<b>'+fmt(r*3600,1)+'</b> '+esc(pl)+' '+ucc+' all\'ora';
  }
  function mmKF(P,id){
    // unità u = durata di un passo (T); ciclo = 5 passi
    function pc(u){return (u/5*100).toFixed(3)+'%'}
    function fr(a){return a.map(function(z){return pc(z[0])+'{'+z[1]+'}'}).join('')}
    var ON='opacity:1;transform:none;filter:none',OFF='opacity:0;transform:none;filter:blur(3px)';
    var css='',X=function(v){return 'transform:translateX('+v+'%)'};
    css+='@keyframes mw_'+id+'{'+fr([[0,X(100)+';animation-timing-function:linear'],[.4,X(48)+';animation-timing-function:ease-out'],[1,X(12)+';animation-timing-function:linear'],[1.4,X(12)+';animation-timing-function:ease-in-out'],[1.75,X(-20)+';animation-timing-function:linear'],[3,X(-32)],[4,X(-52)],[5,X(-80)]])+'}';
    var UP='opacity:0;transform:translateY(-28%);filter:blur(2px)',DN='opacity:0;transform:translateY(18%) scale(.5);filter:blur(2px)';
    var q=[
      [[0,ON],[1.05,ON],[1.1,OFF],[4.999,OFF],[5,ON]],
      [[0,OFF],[1.05,OFF],[1.1,ON],[1.25,ON],[1.3,OFF]],
      [[0,'opacity:0;transform:translateY(-1.5%);filter:blur(3px)'],[1.25,'opacity:0;transform:translateY(-1.5%);filter:blur(3px)'],[1.3,ON],[1.4,ON],[1.7,'opacity:0;transform:translateY(-4%);filter:none']],
      [[0,UP],[1.4,UP],[1.7,ON],[3.05,ON],[3.25,'opacity:0;transform:translateY(12%) scale(.55);filter:blur(2px)']],
      [[0,DN],[3.05,DN],[3.25,ON],[5,ON]]
    ];
    q.forEach(function(k,i){
      var body=fr(k);
      if(i===0)body=body.replace(/transform:none/g,'transform:scaleX(-1)');
      css+='@keyframes mq_'+id+i+'{'+body+'}';
    });
    return css;
  }
  function renderMangia(){
    var reduce=false;try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
    mmPaused=reduce;
    var MAXR=5,NIC=Math.min(24,Math.ceil((window.innerWidth||400)/140)+3);
    var h='<section class="mm-head mm-full"><div class="mm-rows" aria-hidden="true">';
    for(var q=0;q<18;q++){
      var t='';for(var z=0;z<16;z++)t+='Mangia! ';
      h+='<div class="mm-row '+(q%2?'mm-l':'mm-r')+'" style="--rd:'+(26+(q%5)*4)+'s"><span>'+t+'</span><span>'+t+'</span></div>';
    }
    h+='</div><h1 class="mm-title">Mangia!<br>Mangia!<br>Mangia!</h1><a class="mm-arrow" href="#mm-start" aria-label="Vai alla prima sezione" data-mm-go>↓</a></section>';
    h+=MMNOTICE;
    h+='<section class="mm-first" id="mm-start"><p>Gli animali scorrono a una velocità proporzionale alla media annua dei dati ISTAT; nei primi due nastri ogni animale è seguito dalle fasi che portano alla carne confezionata. La velocità si basa sulla media annua dei dati ISTAT ('+WIN+'), divisa per i secondi dell\'anno: non è un conteggio in tempo reale.</p>'+
      '<button type="button" class="mm-btn" data-mm-toggle aria-pressed="'+(!mmPaused)+'">'+(mmPaused?'Avvia le animazioni':'Metti in pausa')+'</button>'+(reduce?'<p class="note">Le animazioni sono ferme perché il tuo dispositivo chiede di ridurre il movimento.</p>':'')+'</section>';
    h+='<div class="mm-page'+(mmPaused?' mm-paused mm-still':'')+'" data-mm>';
    var n=0;
    MM.forEach(function(m){
      var it=BY_ID[m[0]];if(!it||it.n===undefined)return;
      var r=it.n/it.secs,k=1,ks=[2,5,10,20,50,100,200];
      for(var i=0;r/k>MAXR&&i<ks.length;i++)k=ks[i];
      var seq=!!MMSET[m[0]];
      if(seq){k=1;for(var i2=0;r/k>1&&i2<ks.length;i2++)k=ks[i2]}
      var dur=k/r;
      var ic='';
      if(seq){
        var nI=5,P=5*dur,bz=mmKF(P,m[0]),cw=(m[3]==='bovino')?1.383:1.304,anim='';
        for(var jj=0;jj<nI;jj++){
          var dls=(-((.4+jj)*dur)).toFixed(3)+'s';
          anim+='<div class="mm-an" style="animation-name:mw_'+m[0]+';animation-delay:'+dls+'"><div class="mm-sq">'+
            '<img class="q0" style="aspect-ratio:'+cw+';animation-name:mq_'+m[0]+'0;animation-delay:'+dls+'" src="img/animali/'+m[3]+'.webp" alt="" decoding="async">'+
            '<img class="q1" style="animation-name:mq_'+m[0]+'1;animation-delay:'+dls+'" src="img/fasi/full-operatore.webp" alt="" decoding="async">'+
            '<img class="q2" style="animation-name:mq_'+m[0]+'2;animation-delay:'+dls+'" src="img/fasi/full-mucca-morta.webp" alt="" decoding="async">'+
            '<img class="q3" style="animation-name:mq_'+m[0]+'3;animation-delay:'+dls+'" src="img/fasi/carcassa.webp" alt="" decoding="async">'+
            '<img class="q4" style="animation-name:mq_'+m[0]+'4;animation-delay:'+dls+'" src="img/fasi/bistecca.webp" alt="" decoding="async"></div></div>';
        }
        var stat='<div class="mm-strip" aria-hidden="true"><img src="img/animali/'+m[3]+'.webp" alt=""><img src="img/fasi/operatore.webp" alt=""><img src="img/fasi/mucca-morta.webp" alt=""><img src="img/fasi/carcassa.webp" alt=""><img src="img/fasi/bistecca.webp" alt=""></div>';
        h+='<section class="mm-sec mm-full"><p class="mm-q">'+esc(m[1])+'</p>'+
          '<div class="mm-line" role="img" aria-label="Sequenza animata: animale vivo, operatore con pistola a proiettile captivo, animale che si accascia, carcassa appesa, bistecca confezionata" style="--P:'+P.toFixed(3)+'s"><style>'+bz+'</style>'+anim+'</div>'+stat+
          '<div class="mm-cap"><div>'+mmRateTxt(r,it.pl,m[2])+'</div>'+
                    (k>1?'<small>Ogni passo della catena = '+k+' animali reali, ogni '+fmt(dur,1)+' secondi</small>':'<small>Ogni passo della catena = 1 animale, ogni '+fmt(dur,1)+' secondi</small>')+
          '<small>Immagini illustrative.</small>'+
          (m[5]?'<small>'+esc(m[5])+'</small>':'')+'</div></section>';
        return;
      }
      for(var j=0;j<NIC;j++)ic+='<img src="img/animali/'+m[3]+'.webp" alt="" loading="lazy" decoding="async">';
      h+='<section class="mm-sec mm-full"><p class="mm-q">'+esc(m[1])+'</p>'+
        '<div class="mm-stage"><div class="mm-belt" aria-hidden="true"><div class="mm-track" style="--dur:'+dur.toFixed(3)+'s;--f:'+m[4]+';--ratio:'+MMR[m[3]]+'">'+ic+'</div></div></div>'+
        '<div class="mm-cap"><div>'+mmRateTxt(r,it.pl,m[2])+'</div>'+
        (k>1?'<small>1 immagine = '+k+' animali</small>':'<small>1 immagine = 1 animale</small>')+
        (m[5]?'<small>'+esc(m[5])+'</small>':'')+'</div></section>';
    });
    h+='</div>';
    h+='<p class="note">Fonte: ISTAT, macellazioni ('+WIN+'). Sono animali macellati nei macelli registrati: non comprendono abbattimenti sanitari, macellazioni fuori macello né pesci e molluschi, che hanno altre unità di misura. Le righe non si sommano tra specie. Dettagli in Info e fonti.</p>';
    h+='<p><a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;cur=null;
    var root=app.querySelector('[data-mm]'),btn=app.querySelector('[data-mm-toggle]');
    btn.addEventListener('click',function(){
      mmPaused=!mmPaused;root.classList.toggle('mm-paused',mmPaused);if(!mmPaused)root.classList.remove('mm-still');
      btn.textContent=mmPaused?'Avvia le animazioni':'Metti in pausa';btn.setAttribute('aria-pressed',String(!mmPaused));
    });
    app.querySelector('[data-mm-go]').addEventListener('click',function(e){
      e.preventDefault();var t=document.getElementById('mm-start');if(t)t.scrollIntoView({behavior:reduce?'auto':'smooth'});
    });
  }
  /* ---------- Strumenti, processi, macellazione rituale ---------- */
  var TOOLS=[
    {g:'Immobilizzazione e stordimento',t:[
      ['Sistemi di immobilizzazione (trappola)','Bovini, ovini','Box o dispositivi che tengono fermo l\'animale prima dello stordimento o del taglio. Per la macellazione senza stordimento il regolamento UE prevede l\'immobilizzazione individuale, meccanica per i ruminanti; i sistemi che capovolgono i bovini sono vietati, salvo che per la macellazione rituale.','Reg. (CE) 1099/2009, art. 15, par. 2'],
      ['Trappola di abbattimento (tradizionale o halal)','Bovini, ovini','Il catalogo di un costruttore elenca trappole di abbattimento tradizionali e halal per bovini e ovini, dove l\'animale è condotto singolarmente e fissato prima dello stordimento o del taglio.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Trappola pneumatica e restrainer','Suini','Per i suini il catalogo elenca la trappola pneumatica tradizionale e il restrainer per le grandi produzioni, seguiti da una rulliera inox per il dissanguamento orizzontale con vasca di raccolta del sangue, o da una linea verticale.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Pistola a proiettile captivo','Bovini, ovini (non suini)','Dispositivo meccanico in cui un\'asta, che resta vincolata allo strumento, colpisce il cranio dell\'animale. Può essere penetrante o non penetrante. Secondo la FAO si usa su bovini e ovini, non sui suini. Per i bovini il corso CEIRSA indica come punto di applicazione la fronte, sulla linea mediana, perpendicolare al piano della fronte e appena sopra l\'incontro delle diagonali che uniscono il centro degli occhi alla base delle corna; è vietato colpire dietro le corna, nello spazio tra le orecchie. Il proiettile deve forare l\'osso frontale e raggiungere la corteccia cerebrale, e l\'incoscienza si riconosce dalla scomparsa dei riflessi oculari.','Reg. (CE) 1099/2009, all. I; FAO Paper 91, cap. 4; CEIRSA (basato sul D.Lgs. 333/98, precedente al regolamento)'],
      ['Pinze elettriche per lo stordimento','Suini, ovini (non bovini)','Due elettrodi applicati ai lati della testa fanno passare corrente per pochi secondi. La FAO indica una tensione di 60–80 V. Il regolamento distingue l\'elettronarcosi limitata alla testa da quella a testa e corpo.','FAO Paper 91, cap. 4; Reg. (CE) 1099/2009, all. I'],
      ['Bagno d\'acqua elettrificato','Volatili','I volatili sospesi per le zampe a una linea passano con la testa in una vasca d\'acqua attraversata da corrente. È uno dei metodi elettrici elencati dal regolamento.','Reg. (CE) 1099/2009, all. I; art. 15, par. 3'],
      ['Impianti a gas','Suini, volatili','Stordimento in atmosfera controllata. Il regolamento elenca CO₂ ad alta concentrazione, CO₂ in due fasi, miscele con gas inerti, gas inerti, monossido di carbonio e bassa pressione atmosferica. La FAO cita CO₂ all\'85% per circa 45 secondi nei grandi macelli suini.','Reg. (CE) 1099/2009, all. I; FAO Paper 91, cap. 4'],
      ['Dislocazione cervicale e colpo alla testa','Piccoli animali','Metodi manuali. Il regolamento stabilisce che nessuno può uccidere in questo modo più di settanta animali al giorno.','Reg. (CE) 1099/2009, all. I, capo II']
    ]},
    {g:'Sollevamento e dissanguamento',t:[
      ['Argano e rotaia aerea','Bovini, suini, ovini','Dopo lo stordimento l\'animale viene sollevato con un argano su una rotaia mobile e dissanguato. Le rotaie sono a 2,4–3,4 m da terra. Il regolamento vieta di sospendere o sollevare animali coscienti.','FAO Paper 91, cap. 4; Reg. (CE) 1099/2009, art. 15, par. 3'],
      ['Carrucole a laccetto e vasca di raccolta','Bovini','Il catalogo elenca carrucole a laccetto per il dissanguamento, vasche di dissanguamento in acciaio inox con grigliato antisdrucciolo, tubazioni, pompe e cisterne con agitatore, refrigerate o no.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Coltello cavo e contenitore del sangue','Bovini, suini, ovini','Per il sangue destinato all\'uso alimentare umano si usano coltelli sterilizzati con lama cava che convogliano il sangue in un contenitore coperto di acciaio inossidabile. La FAO indica la rimozione del 40–60% del volume totale di sangue.','FAO Paper 91, cap. 4']
    ]},
    {g:'Lavorazione della carcassa',t:[
      ['Vasca di scottatura e macchina depilatrice','Suini','Il suino è immerso in acqua a circa 60 °C per circa 6 minuti per allentare il pelo senza cuocere la pelle. Nei grandi impianti vasche con barre o palette rotanti combinano scottatura e depilazione; in alternativa si usa un raschietto a campana.','FAO Paper 91, cap. 4; JRC BREF'],
      ['Forno o torcia di bruciatura','Suini','Dopo la depilazione i residui di pelo si bruciano con una torcia a gas manuale o in un forno automatico; i residui neri si raschiano.','FAO Paper 91, cap. 4; JRC BREF'],
      ['Macchina strappapelle (scuoiatore automatico)','Bovini','Nei grandi impianti, con le carcasse appese a rotaie aeree, un dispositivo meccanico tira la pelle dal posteriore o dalle spalle. Si usano anche coltelli rotanti pneumatici e piattaforme idrauliche di lavoro.','FAO Paper 91, cap. 4'],
      ['Pedana di lavorazione','Bovini, ovini, suini','Piattaforma in acciaio inox lungo la linea, con lavelli lavamani e sterilizzatore per coltelli, su cui gli operatori lavorano la carcassa sospesa. Il catalogo parla di pedane di lavorazione; la mobilità della pedana non è indicata.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Spazzolatrici, fiammatrici e depilatrici','Suini','Depilatrici da 65 a 98 spazzole (anche in serie), spazzolatrici verticali e orizzontali a due, tre o quattro rulli e tunnel di fiammatura. Per i piccoli impianti esistono macchine combinate depilscotta da 15–20 capi/ora.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Cesoie, seghe e coltelli rotativi','Bovini, suini','Cesoia oleodinamica per zampe e corna, sega sterno, seghe per mezzene e quarti, divaricatori pneumatici e coltelli rotativi per la scuoiatura.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Catene aeree motorizzate','Tutte le specie','Linee aeree motorizzate che portano carcasse, visceri e frattaglie anche in curva, salita e discesa. Secondo il catalogo la normativa europea non ammette contatto tra carcassa e scarti e impone la tracciabilità di ogni parte.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Divaricatore e gambrel','Ovini','Nei piccoli ruminanti la scuoiatura è verticale, con la carcassa tenuta aperta da un divaricatore e sospesa a un gambrel. Per gli agnelli si usa anche un nastro orizzontale a piastre d\'acciaio.','FAO Paper 91, cap. 4'],
      ['Seghe per sterno e divisione','Bovini, suini','Per l\'eviscerazione dei bovini il petto viene segato; poi la carcassa si divide lungo la colonna con sega o accetta. Gli attrezzi si sterilizzano in acqua a 82 °C tra una carcassa e l\'altra.','FAO Paper 91, cap. 4']
    ]},
    {g:'Refrigerazione, taglio e confezionamento',t:[
      ['Celle di refrigerazione','Tutte le specie','Le carcasse entrano in cella subito dopo la pesatura, appese a rotaie. Si misura la temperatura al centro del muscolo: 6–7 °C in 28–36 ore nei bovini, 12–16 nei suini, 24–30 negli ovini, con umidità di circa 90%.','FAO Paper 91, cap. 4'],
      ['Tavolo da taglio e disosso','Bovini, suini, ovini','Tavolo in materiale non corrosivo con piano in plastica dura, coltelli da disosso, sega, acciaino e contenitori. La FAO descrive tre metodi: con osso, disosso muscolo per muscolo e disosso con la mezzena appesa («on the rail»), il più igienico.','FAO Paper 91, cap. 5'],
      ['Tavolo da disosso a postazioni','Bovini, suini, ovini','Nastro motorizzato in acciaio inox su cui scorrono i tagli, con nastri separati per ossa e grassi. Ogni postazione ha piano in polietilene, pedana antiscivolo, supporti per i coltelli e sterilizzatore. Il catalogo cita un modello a 16 postazioni.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Giostre e bilancieri di appendimento','Tutte le specie','Il catalogo elenca «bilancieri e giostre di appendimento» tra gli accessori della linea. Non descrive una «giostra di selezione dei tagli anatomici».','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Bilance aeree e a pavimento','Tutte le specie','Pese con celle di carico per carcasse e cartoni; dopo il disosso, rulliere con scanner, etichettatura, reggiatura e pallettizzazione.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Raffreddamento rapido dei suini','Suini','Catene con ventilazione forzata a bassa temperatura fino a circa 4 °C sulla superficie. Il costruttore afferma che evita un calo di peso di circa il 3%.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Tavolo di confezionamento','Tutte le specie','Postazione separata per carta, film plastico o sacchetti, vicina al taglio.','FAO Paper 91, cap. 5']
    ]},
    {g:'Sangue e scarti',t:[
      ['Coagulazione e sterilizzazione del sangue','Tutte le specie','Il sangue non può andare tal quale al depuratore. Con vapore saturo in un tubo a pressione si separano solidi e liquidi: la parte solida (circa il 30% del sangue fresco) è essiccata in farina di sangue, la liquida va al depuratore.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Tripperia','Bovini, ovini','Centrifughe lavatrippe, sbiancatrici e raffinatrici in acciaio inox per trippe e organi interni destinati al consumo, con tavoli di svuotamento del pacco intestinale.','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Trasporto degli scarti','Tutte le specie','Corna, zampe, pelli, visceri e rumine vanno in aree riservate fuori dalla linea con coclee e trasportatori pneumatici («cannoni»).','Catalogo di un costruttore di impianti (testo fornito)'],
      ['Impianto di cottura degli scarti','Tutte le specie','Frangiossa, trituratori, cuocitori a pressione, presse e mulini a martelli per la farina di ossa, decanter per il grasso, condensatori e torri di abbattimento fumi.','Catalogo di un costruttore di impianti (testo fornito)']
    ]}
    ,{g:'Movimentazione degli animali',t:[
      ['Pungolo elettrico','Bovini e suini adulti','Strumento portatile che dà scariche elettriche per far avanzare animali che rifiutano di muoversi. Il regolamento chiede di evitarlo nella misura del possibile e lo ammette solo su bovini e suini adulti che hanno spazio davanti. Le scariche durano al massimo un secondo, a intervalli adeguati, e vanno applicate solo ai muscoli dei quarti posteriori. Essere Animali descrive un uso frequente su parti sensibili, come occhi, naso e genitali; il corso CEIRSA, riferito alla norma precedente, indicava due secondi.','Reg. (CE) 1099/2009, all. III, punto 1.9; Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa; CEIRSA']
    ]}
    ,{g:'Interventi sugli animali in allevamento',t:[
      ['Bisturi per la castrazione','Suinetti','Usato per la castrazione chirurgica dei suinetti nei primi giorni di vita. La direttiva ammette la castrazione con mezzi diversi dalla lacerazione dei tessuti; dopo il settimo giorno è consentita solo sotto anestesia e con analgesici somministrati per un periodo prolungato da un veterinario. Essere Animali segnala interventi senza anestesia nei primi giorni.','Direttiva 2008/120/CE, all. I, cap. I, punto 8; Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa'],
      ['Mozzatrice di code','Suinetti','Strumento con lama incandescente che taglia parte della coda per prevenire i morsi tra animali. La direttiva vieta questa operazione come routine e ammette il mozzamento solo di una parte della coda; dopo il settimo giorno solo con anestesia e analgesia prolungata. Essere Animali lega i morsi a noia, sovraffollamento e stress.','Direttiva 2008/120/CE, all. I, cap. I, punto 8; Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa'],
      ['Macinadenti','Suinetti','Strumento che riduce i denti dei lattonzoli per proteggere le mammelle della scrofa. La direttiva ammette una riduzione uniforme degli incisivi entro i primi sette giorni di vita, non come routine. Essere Animali lo collega alla scrofa tenuta in uno spazio che non le permette di girarsi.','Direttiva 2008/120/CE, all. I, cap. I, punto 8; Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa'],
      ['Scornatore a ferro rovente','Vitelli','Brucia la base delle corna per impedirne la crescita. Secondo Essere Animali viene usato spesso senza anestesia, perché gli animali senza corna possono essere allevati più fitti. Norma specifica non verificata.','Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa'],
      ['Pinza per marche auricolari','Bovini e altri','Perfora l\'orecchio e fissa una targhetta identificativa. Essere Animali segnala infiammazioni e perdita delle marche. Norma specifica non verificata.','Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa'],
      ['Anelli anti-allattamento','Vitelli','Dispositivi applicati al naso dei vitelli, con punte rivolte all\'esterno, che impediscono di succhiare da altri animali dopo la separazione dalla madre. Descrizione di Essere Animali; norma non verificata.','Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa'],
      ['Siringa ipodermica','Suini','Serve a somministrare ferro, vaccini e farmaci. Essere Animali segnala l\'uso routinario di antibiotici e il rischio di antibiotico-resistenza, citando l\'OMS. Dati non verificati.','Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa'],
      ['Imbuto per l\'alimentazione forzata','Oche e anatre','Tubo con cui si somministra cibo ipercalorico per ingrossare il fegato (foie gras). Essere Animali riferisce 800–1000 g di purea di mais per pasto e dice che in Italia è vietato, mentre in Spagna e Francia è consentito. Non verificato su fonti ufficiali.','Essere Animali (2020), articolo sui 10 strumenti; associazione, fonte integrativa']
    ]}
    ,{g:'Strumenti storici non più ammessi',t:[
      ['Mazza, bolzone a molla, maschera di Bruneau, enervazione','Bovini','Il corso CEIRSA elenca come metodi di stordimento del passato, oggi non più accettati, la mazza (anche inglese), la maschera di Bruneau con mazza di legno, il bolzone a molla di Kleinschmidt, l\'enervazione con stiletto e gli apparecchi a proiettile libero.','CEIRSA, corso per addetti allo stordimento (basato sul D.Lgs. 333/98)'],
      ['Cartucce a potenza graduata','Bovini, ovini, equidi','Il corso CEIRSA indica che le cartucce della pistola captiva hanno potenza diversa secondo la taglia dell\'animale e si riconoscono dal colore: rosa, giallo, verde, rosso e nero, in ordine di potenza. Dopo ogni colpo l\'operatore deve controllare che il proiettile torni in posizione.','CEIRSA, corso per addetti allo stordimento (basato sul D.Lgs. 333/98)']
    ]}
  ];
  var PROC={
    bov:{n:'Bovini e ovini',s:[
      ['Ricezione e stabulazione','Gli animali arrivano al macello e sostano in stalla di attesa prima della macellazione.','JRC BREF, 3.3.1.1.1'],
      ['Trappola','Immobilizzazione individuale dell\'animale. Per la macellazione senza stordimento è prevista quella meccanica per i ruminanti.','Reg. (CE) 1099/2009, art. 15'],
      ['Stordimento','Perdita di coscienza indotta prima del taglio, di solito con pistola a proiettile captivo. Deve durare fino alla morte.','FAO Paper 91, cap. 4; Reg. (CE) 1099/2009, art. 4'],
      ['Dissanguamento','L\'animale è sollevato su una rotaia e dissanguato fino a flusso trascurabile. Si rimuove il 40–60% del volume del sangue.','FAO Paper 91, cap. 4'],
      ['Scuoiatura','Si rimuove la pelle evitando che contamini la carcassa. Nei bovini, con rotaie aeree e scuoiatore automatico; negli ovini, con divaricatore.','FAO Paper 91, cap. 4'],
      ['Eviscerazione','Si tolgono le viscere senza contaminare la carcassa. Restano identificate con la carcassa fino all\'ispezione veterinaria.','FAO Paper 91, cap. 4'],
      ['Divisione e rifinitura','Nei bovini la carcassa si divide lungo la colonna vertebrale; poi si tolgono le parti danneggiate e si lava a spruzzo.','FAO Paper 91, cap. 4'],
      ['Pesatura','Le carcasse si pesano prima di entrare in cella.','FAO Paper 91, cap. 4'],
      ['Raffreddamento','Cella a circa 0 °C: 6–7 °C al centro del muscolo in 28–36 ore nei bovini, 24–30 negli ovini.','FAO Paper 91, cap. 4'],
      ['Taglio e disosso','La carcassa è ridotta in tagli primari; il disosso può essere fatto con la mezzena appesa.','FAO Paper 91, cap. 5'],
      ['Confezionamento','I tagli sono avvolti o chiusi in sacchetti a una postazione dedicata.','FAO Paper 91, cap. 5'],
      ['Scarti e sottoprodotti','Pelli, sangue e visceri non destinati al consumo diventano sottoprodotti di origine animale o rifiuti.','JRC BREF, titolo e ambito']
    ]},
    sui:{n:'Suini',s:[
      ['Ricezione e stabulazione','Arrivo al macello e sosta in stalla di attesa.','JRC BREF, 3.3.1.3'],
      ['Stordimento','Con pinze elettriche (60–80 V per pochi secondi) o con CO₂ nei grandi macelli (85% per circa 45 secondi).','FAO Paper 91, cap. 4'],
      ['Dissanguamento','Sollevamento su rotaia e dissanguamento, con raccolta del sangue destinato all\'uso alimentare.','FAO Paper 91, cap. 4'],
      ['Scottatura','Immersione in acqua a circa 60 °C per circa 6 minuti per allentare il pelo.','FAO Paper 91, cap. 4; JRC BREF, 3.3.1.3.1'],
      ['Depilazione','Con macchina depilatrice, raschietto a campana o coltello.','FAO Paper 91, cap. 4; JRC BREF, 3.3.1.3.2'],
      ['Bruciatura','Con torcia a gas o forno automatico, seguita dalla raschiatura dei residui.','FAO Paper 91, cap. 4; JRC BREF, 3.3.1.3.3'],
      ['Eviscerazione','Si lega il retto e si incide lungo la linea mediana; le viscere restano associate alla carcassa fino all\'ispezione.','FAO Paper 91, cap. 4'],
      ['Divisione e pesatura','La carcassa si divide lungo la colonna (la testa resta di solito intera) e si pesa.','FAO Paper 91, cap. 4'],
      ['Raffreddamento','6–7 °C al centro del muscolo in 12–16 ore.','FAO Paper 91, cap. 4'],
      ['Taglio e confezionamento','Tagli primari: prosciutto, anteriore, lombo e pancia; poi confezionamento.','FAO Paper 91, cap. 5'],
      ['Scarti e sottoprodotti','Setole, sangue e visceri non destinati al consumo diventano sottoprodotti o rifiuti.','JRC BREF, titolo e ambito']
    ]},
    avi:{n:'Avicoli',s:[
      ['Ricezione degli uccelli','Arrivo dei volatili in cassette e scarico al macello.','JRC BREF, 3.4.1.1'],
      ['Appendimento','I volatili sono sospesi per le zampe a una linea. Il regolamento ammette i dispositivi di sospensione per i volatili.','Reg. (CE) 1099/2009, art. 15, par. 3'],
      ['Stordimento e dissanguamento','Con bagno d\'acqua elettrificato o con gas (CO₂, gas inerti, bassa pressione), poi taglio e dissanguamento.','JRC BREF, 3.4.1.2; Reg. (CE) 1099/2009, all. I'],
      ['Scottatura','Immersione in acqua calda per allentare le penne.','JRC BREF, 3.4.1.3'],
      ['Spennatura','Rimozione meccanica delle penne.','JRC BREF, 3.4.1.4'],
      ['Eviscerazione','Rimozione delle viscere.','JRC BREF, 3.4.1.5'],
      ['Raffreddamento','Abbassamento della temperatura della carcassa.','JRC BREF, 3.4.1.6'],
      ['Maturazione','Fase descritta dal documento JRC dopo il raffreddamento.','JRC BREF, 3.4.1.7'],
      ['Scarti e sottoprodotti','Penne, sangue e visceri non destinati al consumo diventano sottoprodotti o rifiuti.','JRC BREF, titolo e ambito']
    ]}
  };
  var procSel='bov';
  function renderStrumenti(){
    var h="<header style='display:grid;gap:8px'><span class='eyebrow'>Approfondimento</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Strumenti dell'industria</h1></header>";
    h+=edHero('mac',null);
 h+="<section class='prose'><p>Gli strumenti usati nei macelli per immobilizzare, stordire, dissanguare e lavorare le carcasse, come descritti nel regolamento europeo sull'abbattimento e in documenti tecnici della FAO e della Commissione europea.</p></section>";
    TOOLS.forEach(function(G){
      h+='<section style="display:grid;gap:10px"><h2>'+esc(G.g)+'</h2>';
      G.t.forEach(function(t){
        h+='<div class="card tool"><b>'+esc(t[0])+'</b><span class="eyebrow">'+esc(t[1])+'</span><p>'+esc(t[2])+'</p><p class="note">Fonte: '+esc(t[3])+'</p></div>';
      });
      h+='</section>';
    });
    h+='<p class="note">I gruppi sugli interventi in allevamento riportano la documentazione di un\'associazione animalista (Essere Animali), con le norme verificate accanto; le sue affermazioni sono attribuite e non confermate da fonti ufficiali. Le schede con fonte «Catalogo di un costruttore» descrivono prodotti commerciali, non standard ufficiali. La FAO Paper 91 è del 1991 e descrive impianti di dimensioni medio-piccole: gli impianti industriali attuali possono usare attrezzature più automatizzate. Le attrezzature della linea dei volatili (scottatura, spennatura, eviscerazione, raffreddamento) sono descritte nelle sezioni 3.4.1 del documento JRC.</p>';
    h+='<p><a href="#processi-macellazione">Processi di macellazione</a> · <a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;cur=null;
  }
  function renderProcessi(){
    var h="<header style='display:grid;gap:8px'><span class='eyebrow'>Approfondimento</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Processi di macellazione</h1></header>";
    h+=edHero('mac',null);
 h+="<section class='prose'><p>Le fasi che un animale attraversa dall'arrivo al macello fino ai prodotti e agli scarti. Cambiano secondo la specie.</p></section>";
    h+='<div class="pchips" role="group" aria-label="Scegli la specie">';
    ['bov','sui','avi'].forEach(function(k){h+='<button type="button" data-p="'+k+'" aria-pressed="'+(k===procSel)+'">'+esc(PROC[k].n)+'</button>'});
    h+='</div><section style="display:grid;gap:12px"><h2 data-pt></h2><p class="flow" data-pf></p><ol class="tl" data-pl></ol></section>';
    h+='<p class="note">Fonti: FAO Paper 91 (1991) per le attrezzature e i valori; JRC, BREF macelli e industrie dei sottoprodotti, per le fasi dei suini e dei volatili; Reg. (CE) 1099/2009. L\'ordine e i dettagli possono variare tra impianti. Il Reg. (CE) 1099/2009 vieta di sospendere o sollevare animali coscienti.</p>';
    h+='<p><a href="#strumenti-industria">Strumenti dell\'industria</a> · <a href="#macellazione-rituale">Macellazione rituale</a></p>';
    app.innerHTML=h;cur=null;
    function draw(){
      var P=PROC[procSel];
      app.querySelector('[data-pt]').textContent=P.n;
      app.querySelector('[data-pf]').textContent=P.s.map(function(x){return x[0]}).join(' → ');
      app.querySelector('[data-pl]').innerHTML=P.s.map(function(x,i){return '<li><b>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p><small>'+esc(x[2])+'</small></li>'}).join('');
      app.querySelectorAll('button[data-p]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-p')===procSel))});
    }
    app.querySelectorAll('button[data-p]').forEach(function(b){b.addEventListener('click',function(){procSel=b.getAttribute('data-p');draw()})});
    draw();
  }
  var MAPW=535,MAPH=702,MAPD={"Piemonte":["M23.9,109.2L22.7,106.4L25.2,104.4L26.1,101.8L22.3,98.6L23.8,95.1L24.2,97.3L27.8,97.8L29.9,95.1L34.7,95.0L39.7,91.0L43.1,90.5L45.0,92.2L50.5,93.0L54.7,90.2L58.0,90.5L57.9,89.2L59.7,87.4L58.2,84.9L59.6,82.5L56.4,78.6L57.0,67.6L58.2,66.4L61.9,66.2L63.9,63.2L63.9,60.1L67.2,59.3L69.1,57.5L69.8,55.1L68.6,52.4L66.0,50.4L68.6,47.9L71.5,47.7L74.2,44.2L76.4,43.1L76.6,42.2L75.4,41.6L76.1,40.5L82.3,38.2L83.2,39.4L83.3,44.1L83.2,46.0L81.5,48.1L82.8,50.2L82.2,51.0L86.2,53.0L89.3,56.8L89.7,58.7L94.3,60.1L93.9,61.1L94.9,64.2L87.9,71.9L89.0,76.0L87.2,78.0L87.2,79.5L88.9,82.2L91.6,83.2L91.0,85.4L92.8,85.4L92.3,86.3L93.1,87.8L91.8,87.7L93.8,90.0L93.3,91.3L94.2,94.8L97.5,96.8L100.0,102.4L94.5,103.3L96.3,104.9L93.2,108.4L92.1,108.4L90.3,104.9L87.1,104.3L85.9,105.5L86.4,107.0L84.6,108.5L86.3,109.3L86.7,110.8L85.7,111.0L87.2,111.5L86.0,111.6L86.7,112.0L85.8,112.7L86.9,113.8L85.8,114.1L88.3,113.9L86.6,115.6L89.7,118.3L89.6,119.6L91.2,121.5L90.7,123.5L91.8,124.9L94.1,123.7L96.8,125.6L97.9,123.9L102.0,122.4L103.3,126.7L105.3,126.8L106.0,128.0L105.7,129.4L107.1,131.5L109.5,132.7L110.1,134.1L109.2,135.0L110.2,137.0L114.2,137.1L114.7,139.7L116.5,140.9L116.2,150.1L113.0,151.5L110.3,148.5L109.1,149.1L107.7,146.0L103.9,145.4L101.8,147.7L102.9,149.2L103.3,152.3L99.3,152.3L97.5,156.6L96.6,156.5L96.6,154.5L94.3,151.1L90.2,150.8L89.2,151.9L89.8,153.3L88.1,155.4L83.4,154.7L82.5,156.2L81.0,155.3L78.5,158.1L78.0,156.9L73.7,154.3L71.3,157.8L72.3,160.0L71.6,161.7L69.1,162.9L68.9,165.2L67.2,166.1L67.0,167.9L65.8,167.2L65.1,168.0L66.5,169.5L65.2,170.8L66.0,171.5L65.3,173.0L66.7,174.2L66.5,175.5L65.5,177.3L63.0,176.6L61.5,177.7L62.9,178.7L62.7,179.8L57.2,179.7L51.9,177.6L50.1,178.6L50.5,180.9L51.7,180.9L50.1,182.4L47.6,178.2L47.9,175.4L46.2,175.4L45.4,177.0L36.9,178.2L36.7,179.2L33.7,178.9L33.0,177.2L30.2,177.5L26.2,173.9L18.2,171.9L17.6,169.2L12.8,164.3L13.1,160.8L15.5,160.2L12.3,157.1L11.4,154.0L14.8,151.6L15.1,149.8L16.4,148.8L15.5,146.8L16.1,145.4L21.2,144.6L19.2,142.3L17.9,138.5L18.9,136.6L14.8,134.2L13.9,135.3L12.1,135.0L6.7,131.6L7.1,130.0L6.4,129.9L7.4,128.3L6.2,126.6L6.5,125.2L3.2,124.6L2.8,121.7L1.2,119.8L3.6,117.6L6.3,117.8L7.5,116.4L11.1,118.4L13.1,117.8L13.1,115.9L15.5,115.8L16.2,113.7L18.0,112.8L21.3,113.2L23.9,110.8L23.9,109.2Z",59,110],"Valle d'Aosta":["M50.6,70.6L51.3,69.6L53.5,71.0L56.4,71.0L56.4,78.6L59.3,81.5L59.6,82.5L58.2,84.9L59.7,87.4L57.9,89.2L58.0,90.5L55.7,89.9L50.5,93.0L45.0,92.2L43.1,90.5L39.7,91.0L34.7,95.0L29.9,95.1L27.8,97.8L24.2,97.3L24.0,95.0L22.5,98.0L20.0,97.7L20.3,96.4L17.8,95.7L17.4,94.2L17.6,91.4L16.8,90.7L17.7,87.6L14.5,87.0L13.5,85.2L11.1,84.6L9.1,80.7L9.7,76.0L17.4,73.9L19.3,70.7L22.4,74.5L24.8,73.2L26.3,74.5L31.0,70.7L35.0,72.2L39.0,69.9L39.2,68.8L42.0,68.6L42.2,66.9L43.3,66.7L44.1,67.8L47.4,67.5L50.6,70.6Z",34,82],"Liguria":["M42.4,192.3L43.1,189.4L46.8,187.6L47.7,186.1L47.4,184.3L51.7,181.0L49.9,179.8L50.3,178.4L51.9,177.6L57.2,179.7L62.6,179.9L63.0,178.8L61.8,177.4L65.6,177.2L66.7,174.2L65.3,173.0L66.0,171.6L65.2,170.8L66.5,169.5L65.1,168.0L65.8,167.2L67.0,167.9L67.2,166.1L68.9,165.2L69.1,162.9L71.6,161.7L72.3,160.0L71.2,158.1L72.4,156.9L72.5,155.1L73.7,154.3L78.0,156.9L78.5,158.1L81.0,155.3L82.5,156.2L83.4,154.7L88.1,155.4L89.8,153.3L89.2,151.9L90.2,150.8L94.6,151.2L95.9,154.4L96.6,154.5L96.6,156.5L97.5,156.6L99.3,152.3L103.3,152.3L102.9,149.2L101.8,147.7L103.9,145.4L107.7,146.0L109.1,149.1L110.3,148.5L113.2,151.6L117.9,148.8L118.0,150.0L120.4,149.5L122.5,151.2L124.0,151.4L125.1,150.0L125.9,151.5L128.9,152.5L129.2,157.0L127.9,157.1L126.6,160.9L128.4,161.4L131.9,159.7L136.2,161.3L137.1,164.1L138.5,164.0L139.5,166.3L145.0,169.8L145.2,172.0L146.0,172.6L145.6,175.2L147.5,173.4L148.7,174.2L146.8,176.0L150.4,176.0L151.0,180.2L152.7,178.8L154.7,180.5L152.4,183.3L150.6,183.9L144.3,179.4L143.2,180.0L145.0,182.4L144.1,183.1L136.8,177.5L135.3,178.0L134.0,175.7L128.8,171.7L125.0,170.9L123.8,168.6L117.5,165.1L116.5,166.0L116.7,168.1L113.8,167.0L113.9,165.1L111.4,163.7L104.0,162.3L103.4,161.2L103.3,162.1L95.6,160.4L82.5,168.7L82.1,169.8L82.8,170.5L81.0,172.7L81.4,174.3L74.4,177.6L72.7,180.7L72.5,183.4L69.7,186.4L70.2,188.7L65.6,192.6L55.0,197.0L49.0,198.1L47.8,199.4L41.5,198.9L39.9,194.3L42.4,192.3ZM145.1,183.0L144.8,184.0L144.2,183.2L145.1,183.0Z",97,172],"Lombardia":["M88.3,80.9L87.0,78.7L89.0,76.0L87.9,71.9L94.8,64.9L93.9,60.9L95.5,58.7L100.4,61.5L97.5,66.7L102.3,68.5L102.2,70.1L104.4,73.8L103.1,76.2L104.8,75.4L108.5,76.6L111.0,72.0L107.9,70.3L107.6,68.4L106.5,67.8L108.3,66.4L107.4,63.8L110.5,62.1L111.0,60.7L110.2,58.8L115.2,55.7L116.9,52.2L118.1,52.0L120.4,46.4L119.3,43.8L119.5,41.4L118.0,39.8L119.4,38.3L119.6,36.2L123.2,35.4L125.3,38.0L127.6,35.6L127.6,43.4L129.1,44.2L131.5,47.9L138.4,48.5L139.9,45.0L141.7,45.9L147.4,43.1L148.3,44.0L149.5,43.2L151.4,44.9L150.7,46.6L151.5,48.9L154.1,50.2L153.7,52.3L157.1,52.5L159.5,50.5L156.3,46.1L159.0,41.6L157.4,40.1L155.2,40.7L153.4,39.4L154.0,38.2L153.5,33.7L156.1,31.0L156.2,29.4L162.3,27.9L163.0,29.5L162.5,31.3L164.2,31.7L164.8,33.0L170.3,32.9L172.8,36.3L176.3,36.7L179.3,39.1L179.7,41.9L178.6,43.2L174.8,44.7L177.4,47.9L176.6,48.9L177.7,51.3L175.7,54.7L176.8,56.0L176.0,59.1L173.1,62.6L173.2,64.6L171.8,66.7L173.3,67.7L173.2,69.3L174.3,70.6L173.5,72.9L174.0,76.2L175.8,76.9L175.1,77.7L175.4,78.7L180.2,77.9L180.9,76.1L182.6,75.6L189.1,76.0L179.6,89.9L180.5,99.1L179.4,99.4L180.4,99.5L180.3,100.9L181.3,100.3L183.7,101.6L182.7,103.3L183.5,103.9L182.2,105.4L183.5,106.0L183.1,107.0L184.2,107.0L184.5,108.8L186.5,107.1L189.4,110.6L193.4,112.0L193.3,113.1L196.0,114.8L195.9,116.9L198.4,117.0L197.5,118.6L199.4,120.1L201.9,119.8L202.7,118.4L205.3,119.3L204.1,120.2L204.0,122.4L206.9,123.4L208.0,122.6L208.4,124.9L215.2,129.0L210.0,128.4L208.3,129.7L207.2,128.9L203.0,130.0L199.4,128.3L196.1,128.7L191.3,131.3L184.8,129.1L184.0,126.5L182.6,128.3L182.2,126.8L179.6,130.5L174.8,131.2L171.0,129.4L169.7,126.9L167.6,128.1L161.0,124.0L158.6,123.4L156.3,124.7L155.3,123.2L153.8,123.5L152.6,121.4L152.9,120.2L151.0,118.0L148.0,120.0L148.2,117.8L146.3,118.4L147.0,121.2L144.4,120.3L143.7,122.8L140.8,119.2L140.4,121.3L138.9,122.5L135.3,121.0L135.1,118.1L133.2,120.0L131.5,118.0L130.9,118.7L131.6,120.6L130.8,121.3L129.3,119.8L125.3,121.0L123.5,123.1L123.8,124.8L121.4,129.4L119.7,130.1L119.4,132.3L122.3,134.0L123.2,136.7L119.7,140.0L121.8,141.9L120.8,143.7L121.5,144.6L118.6,145.2L117.5,143.0L117.8,144.8L115.9,144.8L116.5,140.9L114.7,139.7L114.2,137.1L110.2,137.0L109.2,135.0L110.1,134.1L109.5,132.7L107.1,131.5L105.7,129.4L106.0,128.0L105.3,126.8L103.3,126.7L102.0,122.4L97.9,123.9L96.8,125.6L94.1,123.7L91.8,124.9L90.7,123.5L91.2,121.5L89.6,119.6L89.7,118.3L86.6,115.6L88.3,113.9L85.8,114.1L86.9,113.8L85.8,112.7L86.7,112.0L86.0,111.6L87.2,111.5L85.7,111.0L86.7,110.8L86.3,109.3L84.6,108.5L86.4,107.0L85.9,105.5L87.1,104.3L90.3,104.9L92.1,108.4L93.2,108.4L96.3,104.9L94.5,103.3L100.0,102.4L97.5,96.8L94.2,94.8L93.3,91.3L93.8,90.0L91.8,87.7L93.1,87.8L92.3,86.3L92.8,85.4L91.0,85.4L91.5,83.0L89.0,82.3L88.3,80.9ZM105.8,67.0L105.9,68.3L105.1,68.1L105.8,67.0Z",150,87],"Trentino-Alto Adige":["M241.4,32.9L240.7,34.0L239.3,33.3L233.1,35.5L232.4,37.3L235.4,37.8L235.8,39.5L234.1,39.9L233.4,44.0L232.8,43.4L230.7,44.5L233.3,46.6L233.7,49.8L235.7,49.3L236.0,50.8L237.6,51.1L236.7,52.5L239.1,54.1L238.6,55.8L237.6,55.5L235.9,58.8L226.7,60.4L227.6,63.2L225.9,63.8L226.9,66.7L226.3,68.1L222.4,67.9L221.9,65.6L219.0,65.3L216.1,67.1L212.9,67.0L213.2,69.1L212.2,69.4L211.8,71.4L209.6,69.9L209.7,70.9L207.7,70.8L206.9,74.6L204.6,77.2L205.2,79.0L203.9,78.8L204.1,81.7L202.1,84.4L196.7,83.0L194.8,85.2L195.0,83.9L193.6,85.6L192.7,85.2L192.9,84.0L189.2,82.9L191.1,79.5L190.5,78.7L191.2,77.3L188.4,75.7L180.9,76.1L180.3,77.8L176.3,79.0L175.1,77.7L175.8,76.9L174.0,76.2L173.5,72.8L174.3,70.6L173.2,69.3L173.3,67.7L171.8,67.4L171.8,66.5L173.2,64.6L173.1,62.6L176.0,59.1L176.8,56.0L175.7,54.7L177.7,51.1L176.6,48.9L177.4,48.1L176.7,46.4L174.6,45.2L179.7,41.9L178.4,37.9L172.0,35.4L173.6,29.1L171.5,27.5L169.6,27.8L169.1,26.7L168.9,24.8L170.2,23.0L169.5,21.9L171.3,20.8L170.6,18.7L172.7,14.6L176.3,15.6L181.4,13.5L185.6,16.6L184.2,18.7L186.7,18.2L191.0,20.2L197.2,20.1L198.1,17.8L199.9,16.7L199.4,15.0L200.5,11.3L203.6,9.6L203.6,8.1L210.4,6.5L214.3,8.1L217.6,5.3L220.2,7.0L224.0,5.3L229.5,7.9L237.8,3.7L249.1,0.5L251.5,1.9L249.9,4.4L246.2,5.6L246.6,8.2L248.3,9.7L247.2,11.2L249.2,11.6L250.4,13.6L251.5,12.6L253.0,13.0L254.5,15.6L253.4,17.1L253.4,19.0L256.7,19.5L257.9,23.0L262.1,25.2L257.7,27.4L258.0,28.6L252.4,28.3L249.4,30.3L249.4,28.8L243.8,25.5L243.7,28.4L241.4,32.9Z",216,43],"Veneto":["M179.9,93.9L179.7,89.4L189.1,76.0L191.2,77.3L190.5,78.7L191.1,79.5L189.2,82.9L192.9,84.0L192.3,84.7L193.4,85.6L196.7,83.0L201.8,84.6L204.1,81.7L203.9,78.8L205.2,79.0L204.6,77.2L206.9,74.6L207.7,70.8L209.7,70.9L209.6,69.9L211.8,71.4L212.2,69.4L213.2,69.1L212.9,67.0L216.1,67.1L219.0,65.3L221.9,65.6L222.4,67.9L226.3,68.1L226.9,66.7L225.9,63.8L227.6,63.2L226.7,60.4L236.0,58.8L239.1,54.1L236.7,52.5L237.6,51.1L236.0,50.8L235.7,49.3L233.4,49.6L233.3,46.6L230.7,44.5L232.8,43.4L233.4,44.0L234.1,39.9L235.8,39.5L235.4,37.8L232.3,36.9L234.2,34.9L239.3,33.3L240.7,34.0L242.9,30.9L243.8,25.5L249.4,28.8L249.4,30.3L252.4,28.3L258.0,28.6L257.7,27.4L262.1,25.2L266.1,27.0L271.4,26.6L273.4,28.0L268.4,33.4L268.9,36.0L270.3,37.9L264.4,38.1L263.0,41.3L261.1,42.5L261.4,43.8L259.4,44.7L259.0,46.2L256.6,46.8L255.2,49.6L256.6,52.1L260.7,53.5L260.7,55.2L262.9,57.0L262.4,59.6L258.6,63.5L259.8,66.2L259.8,69.1L263.3,70.6L265.7,76.4L267.3,77.1L267.8,75.7L270.6,78.5L275.6,74.7L276.8,76.8L279.2,75.0L280.5,76.8L281.8,76.1L282.2,77.0L283.6,75.2L285.1,77.1L284.4,77.2L285.0,78.1L284.4,78.7L285.6,80.0L285.7,82.5L286.7,81.8L288.2,86.6L289.9,87.5L281.5,89.2L259.9,100.9L258.7,100.3L256.9,102.2L254.1,111.3L254.8,112.0L254.4,114.3L255.7,116.2L255.7,120.7L265.5,128.1L263.5,130.4L261.6,135.4L258.5,138.4L256.6,137.1L256.0,135.0L253.9,134.4L253.3,129.5L250.8,130.6L248.4,129.5L247.2,130.3L245.8,128.4L242.9,127.4L232.1,127.4L229.4,128.6L228.9,130.4L223.8,132.7L219.9,129.8L215.3,130.2L215.0,128.2L208.4,124.9L208.0,122.6L206.9,123.4L204.0,122.4L204.1,120.2L205.3,119.3L202.7,118.4L201.9,119.8L199.4,120.1L197.5,118.6L198.4,117.0L195.9,116.9L196.0,114.8L193.3,113.1L193.4,112.0L189.4,110.6L186.5,107.1L184.1,108.5L184.2,107.1L183.1,107.0L183.5,106.0L182.2,104.8L183.5,103.9L182.7,103.3L183.5,101.1L180.3,100.9L180.4,99.5L179.4,99.4L180.5,99.1L179.9,93.9Z",235,82],"Friuli-Venezia Giulia":["M308.4,43.0L304.9,44.4L305.3,46.2L302.1,48.1L304.2,51.9L303.7,53.3L307.0,52.5L310.0,53.4L310.6,54.9L314.2,54.7L315.0,55.7L310.9,60.7L307.7,62.3L308.0,64.1L306.6,65.6L309.5,68.1L311.7,66.6L314.0,67.0L313.7,70.0L311.7,72.7L311.0,75.4L312.3,77.7L315.3,78.1L320.9,81.4L323.6,86.1L326.3,88.0L322.8,91.1L317.6,90.3L318.0,89.5L321.4,89.6L318.7,87.6L319.7,86.8L319.0,85.2L313.5,79.9L310.4,79.3L309.2,77.7L309.7,78.4L309.0,78.7L309.8,79.0L308.4,81.4L310.0,82.5L306.1,83.6L304.7,85.3L300.7,85.2L296.3,82.8L292.2,84.0L289.9,87.4L288.2,86.6L286.7,81.8L285.7,82.5L285.6,80.0L284.4,78.7L285.0,78.1L284.4,77.2L285.1,77.1L283.6,75.2L282.2,77.0L281.8,76.1L280.5,76.8L279.2,75.0L276.8,76.8L275.6,74.7L270.6,78.6L267.8,75.7L267.3,77.1L265.7,76.4L263.3,70.6L259.8,69.2L259.8,66.2L258.6,63.5L262.4,59.6L262.9,57.0L260.7,55.2L260.7,53.5L258.9,53.5L258.7,52.3L256.6,52.1L255.1,50.1L256.6,46.8L259.0,46.2L259.4,44.7L261.4,43.8L261.1,42.5L263.0,41.3L264.4,38.1L270.3,37.9L268.9,36.0L268.8,32.4L274.7,27.1L277.8,28.2L278.5,29.7L289.6,30.1L295.7,32.8L299.7,32.9L302.0,31.2L304.3,32.5L307.8,32.0L308.5,33.2L317.2,34.6L316.1,39.6L312.1,39.7L310.8,41.9L308.4,43.0Z",291,59],"Emilia-Romagna":["M121.8,141.9L119.7,140.0L123.2,136.7L122.3,134.0L119.4,132.3L119.7,130.1L121.4,129.4L123.8,124.8L123.5,123.1L125.3,121.0L129.3,119.8L130.8,121.3L131.6,120.6L130.9,118.7L131.5,118.0L133.2,120.0L135.1,118.1L135.3,121.0L138.9,122.5L140.4,121.3L140.8,119.2L143.7,122.8L144.4,120.3L147.0,121.2L146.3,118.4L148.2,117.8L148.0,120.0L151.0,118.0L152.9,120.2L152.6,121.4L153.8,123.5L155.3,123.2L155.7,124.6L158.8,123.3L161.0,124.0L167.4,128.0L169.8,127.0L171.1,129.5L176.9,131.5L179.6,130.5L182.2,126.8L182.6,128.3L184.0,126.5L184.8,129.1L191.3,131.3L196.1,128.7L199.6,128.3L203.0,130.0L207.2,128.9L208.3,129.7L210.6,128.3L215.2,128.9L215.3,130.3L219.9,129.8L223.7,132.7L228.9,130.4L229.4,128.6L232.1,127.4L242.9,127.4L245.8,128.4L247.2,130.3L248.4,129.5L250.8,130.6L253.1,129.4L253.9,130.4L253.3,131.4L253.9,134.4L256.0,135.0L256.6,137.1L258.5,138.4L255.1,138.7L258.0,138.6L254.9,135.5L253.5,135.6L252.3,137.1L253.5,136.9L251.5,143.3L253.3,150.2L253.7,158.2L256.7,169.8L258.3,173.3L263.8,179.7L271.5,186.8L274.2,187.9L273.3,190.7L273.5,193.8L271.2,194.8L270.9,196.5L268.6,196.7L267.1,192.9L265.0,194.1L262.8,193.2L262.7,190.9L263.8,189.5L263.4,186.5L258.8,188.7L259.0,191.8L261.4,192.6L260.7,193.7L258.6,193.6L258.1,197.0L253.5,198.3L253.4,200.1L250.1,200.7L249.5,202.1L248.1,200.3L244.2,201.6L240.2,200.3L236.8,197.2L233.7,197.5L227.9,193.4L228.2,190.7L226.7,189.9L227.0,188.6L225.0,186.6L229.6,178.6L226.6,178.6L225.3,179.9L222.3,179.3L223.6,176.5L219.2,176.5L216.5,174.4L216.3,172.8L215.0,171.6L213.2,174.0L211.4,173.8L208.7,176.6L204.9,176.9L207.8,179.1L207.1,180.2L203.1,179.3L198.4,180.6L196.3,179.3L196.5,177.7L192.2,182.2L191.4,180.5L189.5,180.1L185.2,176.8L180.3,176.4L179.4,178.8L178.0,179.1L175.0,176.6L173.2,172.6L170.8,172.4L168.4,170.0L165.3,168.9L162.9,169.9L158.0,164.8L156.0,165.2L152.0,162.6L151.1,161.7L151.8,159.8L150.3,158.1L143.6,158.0L140.7,161.7L140.9,162.6L137.1,164.1L136.2,161.3L133.8,159.8L128.4,161.4L126.6,160.9L127.9,157.1L129.2,157.0L128.9,152.5L125.9,151.5L125.1,150.0L124.0,151.4L120.4,149.5L118.0,150.0L118.0,148.8L115.9,149.1L115.9,144.8L117.8,144.8L117.5,143.0L118.6,145.2L121.5,144.6L120.8,143.7L121.8,141.9Z",195,160],"Marche":["M263.1,214.8L261.2,215.0L260.3,213.7L258.4,215.5L257.3,214.1L255.6,214.6L254.7,213.3L257.1,211.4L257.3,209.3L252.3,210.7L250.8,210.3L249.2,208.0L251.8,206.0L251.7,205.1L253.9,204.9L254.5,202.2L254.9,205.3L255.8,205.3L255.5,203.5L257.3,203.5L253.4,200.1L253.5,198.4L258.1,197.0L258.6,193.6L260.7,193.7L261.7,192.2L264.9,194.1L267.1,192.9L268.6,196.7L270.9,196.5L271.2,194.8L273.5,193.8L273.3,190.7L274.3,187.8L281.2,190.6L298.1,205.2L305.6,209.4L307.0,209.5L308.0,208.2L311.0,211.9L313.3,213.0L313.2,215.9L321.6,235.9L326.2,252.3L316.9,255.0L316.5,256.6L315.0,257.6L313.2,257.0L311.0,258.0L309.2,257.0L307.4,261.8L305.3,262.1L304.9,264.0L302.9,264.8L298.0,261.6L296.7,262.7L293.7,262.0L294.1,260.3L296.1,260.2L297.1,257.5L295.9,254.0L294.8,255.5L292.6,256.1L290.4,252.6L287.7,250.8L285.4,251.4L284.3,253.8L284.3,250.4L280.7,248.1L281.3,246.9L280.4,245.4L281.2,243.9L280.5,242.5L280.8,240.4L280.1,238.7L278.4,238.7L277.9,237.7L279.2,236.0L279.3,233.4L278.1,232.9L277.7,230.4L276.0,229.0L276.2,226.0L274.1,222.6L275.6,221.1L274.9,220.4L275.2,218.6L273.5,218.1L272.4,220.4L270.3,219.8L268.4,221.0L263.1,214.8Z",288,226],"Toscana":["M147.0,176.2L148.7,174.2L146.8,173.5L145.6,175.2L146.0,172.6L145.2,172.0L145.0,169.8L141.3,167.9L138.7,164.2L137.6,164.0L140.9,162.6L140.7,161.7L143.6,158.0L145.1,157.8L150.3,158.1L151.8,159.8L151.1,161.7L151.7,162.3L156.0,165.2L158.0,164.8L162.9,169.9L165.3,168.9L168.4,170.0L170.8,172.4L173.2,172.6L175.0,176.6L178.0,179.0L179.4,178.8L180.2,176.4L185.1,176.7L191.8,180.8L191.9,182.2L196.5,177.7L196.3,179.3L198.4,180.6L203.1,179.3L207.2,180.1L207.8,179.1L204.9,176.9L208.7,176.6L211.4,173.8L213.2,174.0L215.0,171.6L216.3,172.8L216.5,174.4L219.2,176.5L223.6,176.5L222.3,179.3L225.3,179.9L226.6,178.6L229.8,178.8L225.0,186.6L227.0,188.6L226.7,189.9L228.2,190.7L227.9,193.4L228.8,194.2L233.7,197.5L236.8,197.2L238.7,199.4L243.9,201.6L247.9,200.3L249.5,202.1L250.1,200.7L253.4,200.1L257.3,203.5L255.5,203.5L255.8,205.3L254.9,205.3L254.5,202.2L253.9,204.9L251.7,205.1L251.2,206.6L249.1,207.5L250.3,209.3L247.6,214.3L245.4,214.2L244.8,215.3L247.2,217.8L241.9,221.1L242.3,222.0L244.2,221.9L244.2,224.1L246.3,224.5L246.7,228.4L248.7,229.1L249.5,227.1L250.8,228.3L244.9,231.8L242.7,231.0L241.8,234.8L237.4,237.0L237.4,241.5L238.1,242.8L238.8,241.9L240.0,242.9L237.8,251.5L239.0,253.8L237.6,253.9L236.1,255.9L232.5,256.6L232.2,258.3L230.7,256.7L229.8,257.9L229.5,258.9L232.7,261.3L231.9,263.6L231.0,263.7L232.3,266.8L229.6,267.6L229.0,269.6L227.9,269.4L224.9,272.0L222.0,272.0L222.3,273.5L221.2,275.0L223.7,276.7L223.7,279.8L218.0,279.6L216.2,283.3L207.0,280.9L205.6,281.5L204.7,284.1L203.0,284.3L200.6,282.4L200.1,280.4L200.9,279.1L201.7,279.9L203.9,279.3L204.8,275.9L204.2,273.7L203.2,272.2L201.7,272.5L200.0,268.4L196.8,266.6L194.0,261.8L184.2,257.9L186.1,256.1L186.7,252.7L186.1,251.5L180.4,248.8L176.6,248.9L175.8,250.8L173.8,250.1L173.1,246.7L174.6,246.1L175.5,241.0L175.1,231.6L174.0,228.6L172.0,226.5L170.6,222.1L166.3,217.6L164.6,213.2L165.9,210.9L164.7,212.4L163.6,205.4L164.0,201.7L162.2,193.7L158.0,187.5L152.4,183.3L154.5,180.0L152.4,178.8L151.3,180.4L150.4,176.0L147.0,176.2ZM155.2,268.8L156.1,271.5L153.8,271.5L155.2,268.8ZM163.4,261.3L162.2,261.1L162.2,262.4L157.6,261.9L156.2,259.9L157.2,257.8L159.9,257.3L162.4,258.8L163.9,256.9L163.4,256.2L166.3,256.9L165.6,257.6L167.0,258.2L169.9,253.6L171.3,255.1L171.0,259.5L168.8,260.4L170.8,261.9L170.8,263.2L168.6,263.1L167.0,260.2L165.8,260.4L165.8,261.8L165.4,260.4L164.4,261.9L163.4,261.3ZM143.8,241.6L144.8,243.3L143.2,245.8L142.4,244.8L143.8,241.6ZM147.2,219.6L147.4,220.5L146.7,220.6L147.2,219.6ZM165.6,284.9L166.3,286.7L164.7,287.0L164.7,285.3L165.6,284.9ZM250.8,197.4L251.5,198.8L249.7,199.8L248.3,197.7L250.8,197.4ZM201.1,290.2L201.1,291.7L200.3,290.9L201.1,290.2ZM191.1,282.6L192.7,284.4L192.7,286.9L190.3,284.7L191.1,282.6Z",197,225],"Umbria":["M292.4,266.7L290.6,266.5L288.2,268.6L286.5,267.7L285.6,269.1L280.0,269.4L280.6,272.2L272.5,276.0L273.8,277.8L270.8,279.5L268.5,277.9L267.8,281.8L264.2,284.1L263.6,281.8L260.9,282.2L261.5,280.3L259.2,280.5L259.2,278.7L260.0,278.5L259.2,277.9L259.6,276.4L258.2,276.1L256.4,277.6L253.7,276.3L254.5,276.2L253.0,275.4L253.0,272.4L251.4,271.7L251.8,270.2L251.0,269.3L251.6,268.3L249.9,266.4L248.0,265.4L246.3,267.0L245.5,266.1L242.1,267.4L238.2,265.0L238.5,264.2L237.5,263.7L239.9,260.1L237.5,259.1L236.0,255.4L239.0,253.8L237.8,251.5L240.0,243.0L238.9,241.9L237.9,242.6L236.9,238.3L238.1,236.5L241.8,234.8L242.3,231.2L244.9,231.8L250.8,228.3L249.5,227.1L248.7,229.1L246.7,228.4L246.3,224.5L244.1,223.9L244.2,221.9L242.1,221.8L242.2,220.6L247.2,217.8L244.9,215.9L245.0,214.7L247.6,214.3L250.3,209.3L250.9,210.4L254.1,210.9L256.7,209.0L257.3,209.3L257.1,211.4L254.7,213.3L255.6,214.6L257.3,214.1L258.4,215.5L260.0,213.8L261.2,215.0L262.4,214.4L268.4,221.0L270.3,219.8L272.4,220.4L273.5,218.1L275.2,218.6L274.9,220.4L275.6,221.1L274.1,222.6L276.2,226.0L276.0,229.0L277.7,230.4L278.1,232.9L279.3,233.4L279.2,236.0L277.9,237.7L278.4,238.7L280.1,238.7L280.8,240.4L280.5,242.5L281.2,243.9L280.4,245.4L281.3,246.9L280.7,248.1L284.3,250.4L284.3,253.8L285.4,251.4L287.8,250.8L290.4,252.6L292.2,255.9L294.8,255.5L295.9,253.9L296.4,255.1L297.1,257.4L296.3,259.9L294.0,260.3L293.9,263.4L292.4,266.7ZM260.0,209.6L260.0,210.5L259.0,209.9L260.0,209.6Z",267,247],"Lazio":["M232.3,257.6L234.0,255.7L236.5,256.1L237.5,259.1L239.9,260.1L237.5,263.8L242.1,267.4L245.5,266.1L246.3,267.0L248.0,265.4L249.9,266.4L251.6,268.3L251.0,269.3L251.8,270.2L251.4,271.7L253.0,272.4L253.0,275.4L254.5,276.2L253.7,276.3L256.4,277.6L258.2,276.1L259.6,276.4L259.2,277.9L260.0,278.5L259.2,278.7L259.2,280.5L261.5,280.3L260.9,282.2L263.6,281.8L264.2,284.1L267.8,281.8L268.5,277.9L270.8,279.5L273.8,277.8L272.5,276.0L280.6,272.2L280.4,269.2L282.3,269.8L285.9,269.0L286.5,267.7L288.0,268.6L290.6,266.5L291.9,267.2L293.1,266.0L293.8,262.0L296.7,262.7L297.8,261.5L299.6,262.6L301.3,264.4L300.9,265.9L303.6,267.4L302.9,270.5L298.4,271.8L293.9,270.7L292.3,273.6L293.3,277.2L290.5,279.4L294.0,282.6L292.2,284.6L295.5,286.8L296.2,289.9L302.3,295.2L296.5,298.4L294.1,296.5L289.2,295.3L289.2,297.4L286.7,298.7L286.6,303.0L287.8,305.0L289.9,305.5L290.0,304.4L301.6,310.5L302.4,312.0L301.4,313.8L302.3,317.0L304.0,315.9L310.9,320.7L313.5,319.0L314.3,317.3L316.8,318.8L317.9,318.1L319.6,321.1L321.6,320.8L326.4,322.9L329.4,326.7L330.5,329.5L329.9,331.5L331.1,332.7L330.2,333.7L331.2,334.6L328.7,336.4L329.6,337.1L329.0,338.3L323.8,341.0L324.8,342.0L324.2,344.1L325.0,348.2L322.3,349.1L322.5,350.7L319.8,351.5L319.3,352.6L316.8,350.8L312.9,350.4L311.0,351.6L310.8,352.9L311.7,353.4L311.0,353.8L298.3,348.2L293.1,349.5L289.5,352.5L287.9,352.5L284.3,345.6L280.9,342.5L278.3,341.1L274.8,341.4L271.3,338.8L268.3,339.2L260.4,327.7L256.5,324.3L251.3,321.7L252.2,321.2L250.7,321.3L249.9,316.2L247.0,311.1L237.0,303.6L233.4,304.2L232.2,301.2L230.1,299.3L229.2,295.7L225.8,289.8L221.3,285.9L216.2,283.3L218.0,279.6L223.7,279.8L223.7,276.7L221.2,275.0L222.3,273.5L222.0,272.0L224.9,272.0L227.9,269.4L229.0,269.6L229.6,267.6L232.1,267.4L231.0,263.7L231.9,263.6L232.7,261.3L229.5,258.9L230.5,256.8L232.1,258.3L232.3,257.6ZM284.0,370.7L283.3,373.3L283.1,370.9L285.2,370.1L284.0,370.7Z",274,314],"Campania":["M333.8,338.4L335.3,335.6L337.3,337.3L337.6,336.0L340.7,336.2L344.5,338.8L351.2,340.9L352.5,343.1L355.2,342.5L356.8,344.2L359.7,341.6L363.3,341.5L365.0,338.9L368.5,340.4L374.9,336.8L376.0,338.8L379.0,340.2L378.4,341.6L378.9,342.6L377.2,343.7L377.8,346.1L380.4,347.0L381.2,349.2L383.5,348.8L387.0,351.4L385.5,351.8L386.2,354.1L384.5,355.1L383.9,357.1L387.1,360.2L390.9,360.9L392.2,359.6L399.0,362.8L399.9,367.5L398.1,371.5L395.4,372.6L395.1,374.0L390.3,373.0L391.4,373.9L391.4,375.8L389.5,375.9L391.5,377.3L390.9,378.0L391.8,378.4L391.6,382.6L397.0,386.2L394.6,389.5L398.6,391.9L398.6,396.7L404.1,402.5L405.8,403.0L407.0,407.1L410.5,409.6L410.0,412.7L407.2,414.0L405.8,416.4L406.0,418.9L403.6,421.3L404.7,422.7L403.3,423.4L402.4,421.6L397.9,421.7L393.3,426.6L390.4,426.0L388.6,424.1L386.6,424.7L387.3,423.8L386.6,421.5L380.5,415.7L376.1,415.7L374.1,412.9L370.5,411.4L372.1,409.3L372.1,405.9L374.3,404.7L374.5,402.7L369.8,392.0L365.2,386.2L363.3,385.3L360.7,388.0L357.8,387.1L353.5,389.6L351.6,388.4L344.4,391.9L345.1,388.5L347.8,387.7L348.0,386.6L351.3,384.3L350.0,380.8L347.8,380.5L342.0,375.4L339.9,376.2L338.4,378.4L337.2,378.4L337.2,377.1L334.7,376.1L333.2,376.9L333.9,379.3L331.7,378.5L332.0,375.0L330.7,370.3L326.5,364.4L322.5,356.0L319.3,352.6L319.8,351.5L322.5,350.7L322.3,349.1L325.0,348.2L324.2,344.1L324.8,342.0L323.9,340.9L328.8,338.2L330.3,338.9L330.0,340.1L331.8,342.4L334.9,342.8L334.7,340.7L333.5,339.2L333.8,338.4ZM340.3,393.5L338.7,393.8L338.9,392.3L341.8,392.6L340.3,393.5ZM327.9,383.6L324.3,384.1L323.4,383.4L323.8,380.6L328.0,381.6L327.9,383.6ZM330.8,379.9L331.6,380.3L330.7,381.6L329.5,381.4L330.8,379.9Z",365,381],"Abruzzo":["M327.3,324.7L325.1,321.9L319.6,321.1L317.9,318.1L316.8,318.8L314.3,317.3L313.5,319.0L310.9,320.7L304.0,315.9L302.3,317.0L301.4,313.8L302.4,312.0L301.7,310.6L290.0,304.4L289.9,305.5L287.8,305.0L286.2,301.6L286.7,298.7L289.2,297.4L289.2,295.3L294.1,296.5L296.5,298.4L302.3,295.2L296.2,289.9L295.5,286.8L292.2,284.6L294.0,282.6L290.5,279.4L293.3,277.2L292.3,273.6L293.9,270.7L298.4,271.8L302.4,271.1L303.6,267.6L300.9,265.9L301.4,264.3L304.9,264.1L305.3,262.1L307.4,261.8L309.2,257.0L311.0,258.0L313.2,257.0L315.0,257.6L316.5,256.6L316.9,255.0L325.9,252.3L329.6,263.2L334.8,272.2L341.6,279.6L348.7,284.7L348.9,286.4L352.7,290.9L361.7,295.4L362.0,299.7L364.7,301.8L363.9,303.3L364.9,304.0L362.2,306.0L355.3,316.9L351.8,320.3L350.2,320.2L349.7,315.5L346.8,313.2L345.3,314.2L344.4,312.2L342.6,311.4L338.8,315.4L336.5,316.4L337.6,319.3L338.9,319.9L338.6,321.0L337.6,320.1L337.1,321.1L335.3,321.3L334.7,323.6L334.2,321.7L333.1,321.8L332.3,323.9L330.8,325.1L327.3,324.7Z",326,289],"Molise":["M348.7,339.9L344.5,338.8L340.7,336.2L337.6,336.0L337.3,337.3L335.3,335.6L333.5,339.2L334.7,340.7L334.9,342.8L331.8,342.4L330.0,340.1L330.3,338.9L329.0,338.3L329.6,337.1L328.7,336.4L331.2,334.6L330.2,333.7L331.1,332.7L329.9,331.5L330.5,329.5L329.4,326.7L327.3,324.7L330.8,325.1L332.3,323.9L333.1,321.8L334.2,321.7L334.7,323.6L335.3,321.3L337.1,321.1L337.6,320.1L338.6,321.0L338.9,319.9L337.6,319.2L336.9,315.8L338.8,315.4L342.6,311.4L344.4,312.2L345.3,314.2L346.8,313.2L349.7,315.5L350.2,320.2L351.8,320.4L355.3,316.9L362.2,306.0L364.8,304.2L363.9,303.3L364.7,301.8L369.7,304.6L374.8,305.6L378.1,309.5L380.7,310.3L380.8,313.3L379.0,315.8L379.8,318.0L378.9,320.1L379.9,322.8L381.7,323.4L376.8,326.6L375.7,328.6L372.9,327.4L371.6,328.8L372.3,330.5L371.7,334.4L374.9,336.8L368.5,340.4L365.0,338.9L363.3,341.5L359.7,341.6L356.8,344.2L355.2,342.5L352.5,343.1L351.2,340.9L348.7,339.9Z",354,323],"Puglia":["M378.9,342.6L378.9,340.0L376.0,338.8L375.6,337.4L371.8,334.5L372.3,330.5L371.6,328.8L372.9,327.4L375.7,328.6L376.8,326.6L381.7,323.4L379.9,322.8L378.9,320.1L379.8,318.0L379.0,315.8L380.8,313.3L380.7,310.4L392.6,312.0L402.2,310.3L405.8,311.1L419.7,309.0L423.0,309.6L427.4,313.0L427.0,314.4L427.8,318.2L425.5,321.5L416.4,327.7L416.9,328.8L416.3,327.8L414.8,329.0L414.8,333.9L417.2,338.3L445.2,353.5L457.1,358.2L457.8,357.4L458.4,358.7L467.8,362.2L477.2,368.5L479.3,371.6L485.0,376.2L495.3,380.5L501.1,384.5L505.5,384.8L507.3,386.2L505.1,387.6L508.9,387.5L510.3,390.1L510.0,392.2L511.9,394.5L518.8,399.1L527.3,408.5L531.5,419.6L526.5,427.4L525.8,436.9L524.8,438.4L520.2,435.9L517.3,435.6L512.1,432.0L508.9,427.8L508.0,426.0L509.0,425.8L509.1,424.1L507.1,422.7L508.5,421.7L508.8,419.5L505.0,415.0L504.9,412.6L503.6,411.0L504.2,410.9L502.1,409.0L494.1,407.7L486.4,408.3L472.9,401.5L474.7,399.7L474.8,398.4L468.8,394.8L463.3,396.5L457.5,402.0L455.3,400.0L454.9,398.6L451.2,397.2L452.0,395.4L450.6,392.7L451.6,389.9L450.8,388.2L451.6,384.7L450.2,383.8L451.5,383.2L448.7,381.1L448.2,381.8L444.8,380.3L444.5,381.8L443.8,380.5L442.8,381.3L443.2,382.5L441.5,380.3L438.3,383.8L437.0,383.6L430.0,375.7L428.2,370.9L426.4,370.3L424.5,372.1L418.1,368.5L417.9,367.7L420.3,366.5L420.9,364.0L419.1,362.7L418.1,360.4L417.1,360.4L417.1,359.4L413.3,357.6L410.4,359.3L409.8,360.7L400.7,360.1L398.6,361.7L398.8,362.6L392.2,359.6L390.9,360.9L387.1,360.2L383.8,356.7L386.2,354.1L385.5,351.8L387.0,351.4L383.5,348.8L381.2,349.2L380.4,347.0L377.8,346.1L377.2,343.7L378.9,342.6Z",427,364],"Basilicata":["M395.3,388.0L397.0,386.2L391.6,382.6L391.8,378.4L390.9,378.0L391.5,377.3L389.5,375.9L391.4,375.8L391.4,373.9L390.3,373.0L395.1,374.0L395.4,372.6L398.1,371.5L399.9,367.5L398.6,361.8L399.5,360.7L407.5,360.0L408.8,361.0L413.3,357.6L417.1,359.4L417.1,360.4L418.1,360.4L419.1,362.7L420.9,364.0L420.3,366.5L417.9,367.7L418.1,368.5L424.5,372.1L426.4,370.3L428.2,370.9L430.0,375.7L437.0,383.6L438.3,383.8L441.5,380.3L443.1,382.5L443.1,380.8L444.7,381.8L444.5,380.5L445.2,380.2L448.2,381.8L448.7,381.1L451.5,383.2L450.2,383.8L451.6,384.7L450.8,388.2L451.6,389.9L450.6,392.7L452.0,395.4L451.2,397.2L454.9,398.6L455.3,400.0L457.8,402.1L454.0,408.2L451.8,413.8L447.9,418.9L445.3,418.0L442.8,418.9L437.9,417.4L436.9,425.0L434.3,429.8L435.2,430.8L434.8,432.1L433.2,430.3L431.0,429.9L428.7,430.4L428.7,432.2L426.2,430.8L425.3,431.9L421.3,432.3L419.4,428.6L420.5,426.4L418.2,427.0L415.9,425.9L414.6,427.1L412.3,425.6L409.1,428.3L408.3,430.6L404.7,424.2L403.3,423.5L404.7,422.7L403.6,421.3L406.0,418.9L406.3,415.3L410.0,412.7L410.5,409.6L407.0,407.1L405.8,403.0L404.1,402.5L398.6,396.7L398.6,391.9L394.6,389.5L395.3,388.0Z",424,395],"Calabria":["M418.0,457.9L415.8,454.4L413.6,452.9L410.9,445.2L408.8,435.9L409.9,434.4L408.3,430.6L409.0,428.3L412.3,425.6L414.6,427.1L415.9,425.9L418.2,427.0L420.0,426.2L420.6,427.0L419.4,428.6L421.3,432.3L425.3,431.9L426.2,430.8L428.7,432.2L428.7,430.4L431.0,429.9L433.2,430.3L434.8,432.1L435.2,430.8L434.3,429.8L436.9,425.0L437.9,417.4L442.8,418.9L447.1,418.2L447.8,419.0L446.1,421.2L445.8,423.6L447.1,428.5L440.9,438.2L441.1,440.9L442.7,442.5L442.2,445.9L446.7,448.7L453.5,448.8L457.8,453.7L464.7,457.0L467.3,460.7L470.7,461.9L468.6,467.5L468.5,470.9L470.3,473.6L468.6,479.6L470.2,483.2L472.9,484.3L471.1,486.2L471.3,488.7L467.9,492.4L467.4,491.2L464.7,491.6L463.1,489.8L461.5,489.7L454.4,491.9L446.5,496.8L443.0,503.2L444.0,505.1L445.0,515.9L444.3,520.8L440.0,525.6L433.3,528.7L426.5,537.9L425.5,544.2L422.0,550.5L408.6,551.0L404.8,548.8L403.0,545.6L403.8,543.6L402.7,539.9L403.8,537.9L402.8,532.7L409.9,529.2L413.6,520.7L415.0,519.3L415.2,517.6L414.3,519.3L416.0,513.2L411.4,508.9L411.8,507.3L418.5,502.6L425.3,502.8L427.5,500.6L428.9,495.7L428.8,490.5L426.2,489.0L423.6,484.2L422.1,477.5L421.5,468.3L418.0,457.9Z",438,484],"Sicilia":["M281.3,544.5L288.8,540.7L287.7,537.8L290.1,534.6L293.9,535.8L299.4,532.5L301.7,535.1L302.1,538.3L301.5,538.2L302.5,539.5L305.1,540.3L308.0,538.8L309.4,539.2L309.3,542.0L310.6,543.6L318.6,547.8L331.0,543.5L332.9,544.9L336.5,544.4L342.8,545.6L349.0,543.6L353.2,543.5L358.3,541.6L363.3,536.0L365.1,536.9L370.7,534.5L373.3,536.9L376.6,537.1L378.9,538.7L384.0,534.9L385.3,531.4L384.6,529.8L385.8,530.9L385.3,533.0L387.6,533.6L393.7,531.5L398.7,527.9L403.7,529.9L400.5,531.3L399.4,534.2L400.2,534.4L396.6,541.5L384.1,560.6L384.3,563.5L382.3,568.0L382.4,571.4L379.7,574.2L378.4,577.1L379.0,587.0L383.0,589.1L383.7,588.4L385.9,591.5L384.5,591.7L384.9,594.1L384.0,591.2L382.8,591.8L382.8,594.3L383.7,596.8L385.4,597.2L384.4,597.4L385.1,599.1L387.7,599.6L387.8,602.5L386.8,602.3L386.8,603.6L388.1,603.4L389.6,605.6L386.8,605.6L386.2,607.5L384.1,608.2L381.4,611.1L378.8,618.3L380.7,625.1L378.1,627.1L375.3,623.9L372.6,624.4L369.1,622.1L364.8,623.8L360.8,622.8L356.2,619.4L351.9,618.8L350.5,617.1L349.8,613.8L347.0,608.6L341.5,602.5L333.4,599.4L325.2,600.1L322.1,597.3L318.8,597.0L314.9,594.4L314.1,592.5L310.1,588.9L305.4,588.2L297.5,582.5L292.9,576.5L286.3,576.3L283.7,572.2L281.7,571.4L270.3,572.0L267.7,567.5L263.9,566.4L262.0,564.1L261.7,561.2L259.7,557.9L261.4,557.0L262.4,553.6L261.2,551.5L264.0,545.4L262.7,545.1L266.2,541.9L269.5,541.3L270.2,539.3L272.4,539.5L273.7,537.6L272.7,535.6L273.4,534.6L275.0,535.2L276.9,541.1L281.3,544.5ZM254.5,548.7L255.2,550.1L257.2,550.7L257.1,551.6L253.3,550.8L253.2,549.3L254.5,548.7ZM243.6,546.4L244.9,549.1L242.8,548.4L242.0,546.5L243.6,546.4ZM255.7,544.8L256.5,546.4L255.9,546.9L255.1,545.9L255.7,544.8ZM261.1,551.7L260.7,555.4L259.9,552.3L261.1,551.7ZM238.8,615.6L242.8,617.9L242.9,621.0L241.8,621.9L240.0,621.3L237.5,617.8L237.6,616.5L238.8,615.6ZM293.4,502.8L294.3,503.5L292.2,504.4L293.4,502.8ZM367.7,513.7L365.5,512.3L366.0,511.1L368.8,511.2L368.8,513.7L367.7,513.7ZM372.8,520.1L374.7,523.7L372.3,522.7L371.8,521.3L372.8,520.1ZM372.8,514.6L372.9,516.5L373.7,517.0L372.6,517.5L372.5,519.6L370.1,516.5L370.6,514.9L372.8,514.6ZM346.1,512.7L346.0,514.1L345.2,514.0L346.1,512.7ZM354.6,510.8L356.4,512.7L354.6,512.4L354.0,511.3L354.6,510.8ZM384.4,497.3L385.4,497.8L384.7,499.4L383.0,498.8L384.4,497.3ZM264.9,694.3L268.8,694.8L269.0,696.4L263.9,694.9L264.9,694.3ZM279.8,673.5L280.1,674.7L279.0,674.6L278.7,673.7L279.8,673.5Z",321,597],"Sardegna":["M78.8,396.2L77.5,396.0L75.6,390.4L71.5,391.9L72.2,389.9L71.2,388.9L69.8,392.4L69.1,390.9L68.8,388.6L70.7,387.7L71.6,385.2L68.4,382.1L72.2,373.8L72.3,372.5L70.3,369.9L71.4,367.6L73.0,369.0L73.1,371.8L75.9,374.9L79.6,374.9L78.0,375.6L84.5,376.8L88.8,375.4L93.6,371.1L97.7,370.7L101.0,366.8L101.8,364.3L103.9,363.4L107.5,358.6L111.8,358.0L112.4,356.7L114.1,356.3L114.5,352.3L113.4,351.2L114.4,351.8L117.5,350.5L119.5,352.3L119.4,354.4L119.8,352.8L119.9,354.4L121.3,353.8L121.8,354.9L123.2,353.5L123.5,355.0L125.9,355.4L125.1,356.6L126.8,357.9L126.7,359.7L127.8,357.4L130.1,357.4L130.3,356.6L131.0,357.6L130.5,357.9L131.3,358.0L131.1,359.1L132.3,359.1L129.5,365.5L132.0,363.7L131.8,365.8L133.5,364.7L136.6,366.3L134.3,365.8L133.1,366.8L132.7,370.3L130.5,370.0L129.4,371.2L132.0,370.8L133.3,372.0L135.7,370.8L134.6,372.6L136.2,373.2L136.7,374.8L139.4,375.4L137.6,375.9L137.9,377.3L136.9,378.9L139.0,381.0L138.9,383.5L140.5,385.3L140.5,389.9L143.9,394.3L141.1,402.5L137.4,405.8L134.8,410.9L135.1,414.6L136.3,417.5L139.8,421.4L137.6,427.0L137.7,429.1L138.9,430.2L137.4,432.0L138.1,434.8L136.9,438.9L137.2,443.3L135.9,446.9L136.3,451.2L135.2,455.8L135.8,458.3L133.7,464.9L133.9,466.8L135.3,468.1L133.0,470.1L132.1,474.1L132.8,475.5L132.1,477.7L130.2,478.9L130.4,480.3L129.4,478.1L126.5,478.7L121.4,473.8L116.5,472.4L114.5,473.6L114.2,475.1L112.0,473.2L108.8,475.6L107.4,478.6L107.8,480.8L109.4,480.9L108.1,481.1L109.1,482.6L108.2,486.0L100.6,493.4L98.4,492.0L98.1,493.0L97.3,491.3L94.5,489.8L92.0,491.2L92.3,492.2L91.3,492.6L91.8,493.8L91.0,494.1L91.2,492.3L89.5,492.4L90.0,489.1L88.6,488.7L87.7,486.2L88.1,484.1L86.1,482.4L83.3,482.7L82.1,487.9L80.5,488.3L78.1,480.1L78.9,479.2L79.4,480.0L81.4,479.5L83.2,482.6L84.2,480.9L83.2,478.9L82.0,479.1L81.9,476.6L80.9,475.7L80.8,477.0L80.2,474.4L78.9,473.0L81.9,468.6L81.2,466.0L79.1,463.6L80.8,460.3L79.5,458.6L83.4,450.1L82.5,448.0L82.2,440.5L82.9,439.9L84.8,443.2L86.7,438.3L86.8,434.4L87.8,434.2L84.4,431.4L83.2,431.8L81.8,434.5L81.7,432.8L80.2,431.8L80.0,427.2L80.9,425.0L79.2,423.9L82.7,423.0L84.4,420.8L82.8,415.4L84.0,409.5L82.9,406.9L79.5,405.7L80.3,401.5L78.8,396.2ZM76.6,358.8L77.9,360.6L77.5,362.4L75.0,362.1L72.9,364.6L73.5,364.4L73.9,366.7L71.8,366.7L72.7,364.6L72.3,363.5L75.1,361.5L74.7,359.7L76.6,358.8ZM125.7,353.5L125.7,354.7L124.7,354.6L125.7,353.5ZM128.0,351.3L128.7,353.0L128.0,355.9L127.2,354.5L126.4,354.8L128.0,351.3ZM122.2,350.8L123.1,351.5L122.5,352.2L122.2,350.8ZM125.8,349.9L126.3,352.5L126.9,352.0L126.6,353.0L124.1,353.4L123.8,352.0L125.8,349.9ZM139.5,373.4L139.8,374.4L138.7,373.9L139.5,373.4ZM139.8,370.6L140.1,371.3L137.0,372.6L139.8,370.6ZM76.2,474.7L76.1,479.8L73.5,479.5L72.5,476.3L76.2,474.7Z",106,422]},MAPN={"Abruzzo":[1,0,0,0,0],"Basilicata":[0,0,0,0,0],"Calabria":[0,0,0,0,0],"Campania":[5,1,0,1,0],"Emilia-Romagna":[2,0,0,2,0],"Friuli-Venezia Giulia":[2,0,0,0,0],"Lazio":[4,1,0,0,0],"Liguria":[0,0,0,0,0],"Lombardia":[76,6,43,7,1],"Marche":[0,0,0,1,0],"Molise":[0,0,0,0,0],"Piemonte":[35,2,8,8,1],"Puglia":[2,1,0,0,0],"Sardegna":[5,0,0,1,0],"Sicilia":[8,1,0,2,0],"Toscana":[5,2,1,1,2],"Umbria":[1,0,0,0,0],"Valle d'Aosta":[0,0,1,0,0],"Veneto":[16,4,0,9,0],"Trentino-Alto Adige":[6,0,3,0,0]};
  var MAPC=['Rito islamico: ungulati e lagomorfi','Rito ebraico: ungulati e lagomorfi','Festa del sacrificio: ungulati e lagomorfi','Rito islamico: pollame e lagomorfi','Rito ebraico: pollame e lagomorfi'];
  var mapSel=0,mapReg=null;
  function drawMap(box){
    var mx=0;Object.keys(MAPN).forEach(function(r){var v=MAPN[r][mapSel];if(v>mx)mx=v});
    var s='<svg viewBox="0 0 '+MAPW+' '+MAPH+'" role="group" aria-label="Mappa dell\'Italia per regione: strutture autorizzate, '+esc(MAPC[mapSel])+'" class="imap">';
    Object.keys(MAPD).forEach(function(r){
      var v=MAPN[r][mapSel],op=v>0?(0.18+0.82*Math.sqrt(v/mx)).toFixed(2):0;
      s+='<path d="'+MAPD[r][0]+'" data-r="'+esc(r)+'" tabindex="0" role="button" aria-label="'+esc(r)+': '+(v>0?v:'nessuna struttura indicata')+'" class="'+(r===mapReg?'on':'')+'"/>';
      s+='<path d="'+MAPD[r][0]+'" class="fillv" style="fill-opacity:'+op+'" pointer-events="none"/>';
    });
    Object.keys(MAPD).forEach(function(r){var v=MAPN[r][mapSel];s+='<text x="'+MAPD[r][1]+'" y="'+MAPD[r][2]+'" text-anchor="middle" dominant-baseline="central" class="mlab" pointer-events="none">'+(v>0?v:'—')+'</text>'});
    s+='</svg>';
    var d='';
    if(mapReg){d='<h3>'+esc(mapReg)+'</h3><ul>'+MAPC.map(function(c,i){var v=MAPN[mapReg][i];return '<li>'+esc(c)+': <b>'+(v>0?v:'—')+'</b></li>'}).join('')+'</ul>'}
    else d='<p class="note">Seleziona una regione per vedere tutte le categorie.</p>';
    box.querySelector('[data-map]').innerHTML=s;box.querySelector('[data-md]').innerHTML=d;
    box.querySelectorAll('button[data-c]').forEach(function(b){b.setAttribute('aria-pressed',String(+b.getAttribute('data-c')===mapSel))});
    box.querySelectorAll('svg path[data-r]').forEach(function(p){
      function pick(){mapReg=p.getAttribute('data-r');drawMap(box)}
      p.addEventListener('click',pick);p.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}});
    });
  }
  function mapSection(){
    return '<section style="display:grid;gap:10px" data-mapbox><h2>Strutture autorizzate per regione</h2><p>Numero di strutture autorizzate alla macellazione rituale, per regione e categoria. Il numero è scritto in ogni regione; il trattino indica che la fonte non riporta strutture.</p><div class="pchips" role="group" aria-label="Scegli la categoria">'+MAPC.map(function(c,i){return '<button type="button" data-c="'+i+'" aria-pressed="'+(i===0)+'">'+esc(c)+'</button>'}).join('')+'</div><div data-map></div><div data-md class="mdet"></div><p class="note">Fonte: Ministero della Salute, tabella 2 «N. strutture autorizzate per la macellazione rituale» (dati S.Inte.S.I.S.-Strutture, aggiornati al 5 aprile 2019; file fornito, senza titolo né indirizzo di pubblicazione). Sono conteggi regionali, non un elenco di indirizzi: la fonte non indica dove si trovi ogni struttura. Una struttura può essere autorizzata per più categorie, quindi le categorie non vanno sommate. Il Trentino-Alto Adige somma le province di Bolzano e Trento, riportate separatamente nella fonte. I dati hanno oltre sette anni.</p></section>';
  }
  function renderRituale(){
    var h="<header style='display:grid;gap:8px'><span class='eyebrow'>Approfondimento</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Macellazione rituale</h1></header>";
    h+=edHero('mac',null);
 h+=mapSection();
    h+="<section class='prose'><p>In Europa gli animali devono essere storditi prima di essere uccisi. Il regolamento prevede una deroga per i metodi prescritti da riti religiosi, come quelli ebraico e islamico. Questa pagina descrive le regole, i riti e i dati disponibili.</p></section>";
    h+="<div class='stats'><div><b>Art. 4.1</b><span>stordimento obbligatorio prima dell'uccisione</span></div><div><b>Art. 4.4</b><span>deroga per i riti religiosi, solo in macello</span></div><div><b>2.000–6.000 €</b><span>sanzione in Italia per stordimento omesso fuori dalla deroga</span></div></div>";
    h+='<section style="display:grid;gap:10px"><h2>I due riti a confronto</h2><div class="tablewrap"><table><thead><tr><th>Aspetto</th><th>Shechita (ebraica)</th><th>Dhabihah (islamica, halal)</th></tr></thead><tbody>'+
      [['Chi esegue','Lo shochet, formato con anni di studio e tirocinio','Un musulmano adulto sano di mente o un Ahlul Kitab'],
       ['Taglio','Unico, rapido e continuo: recide esofago, trachea, giugulari e carotidi, senza ledere il midollo spinale','Unico, da davanti a dietro, su trachea, esofago e due giugulari'],
       ['Coltello','Molto affilato, senza tacche né punta, lungo almeno il doppio della larghezza del collo','Molto affilato'],
       ['Invocazione','Non descritta nelle fonti consultate','Si pronuncia il nome di Allah su ogni animale'],
       ['Stato dell\'animale','Vivo, sano e senza lesioni al momento del taglio','Vivo al momento del taglio'],
       ['Stordimento','Non ammesso: i metodi comuni sono considerati lesivi','Posizioni diverse: alcune autorità lo accettano se reversibile e se l\'animale è vivo al taglio']].map(function(r){return '<tr><td data-label="Aspetto">'+esc(r[0])+'</td><td data-label="Shechita (ebraica)">'+esc(r[1])+'</td><td data-label="Dhabihah (islamica, halal)">'+esc(r[2])+'</td></tr>'}).join('')+
      '</tbody></table></div><p class="note">Fonti: Parlamento europeo (EPRS, 2023), pp. 2–6; HSA, scheda sulla macellazione religiosa (2026); Roggero (2016). Sono sintesi: le comunità religiose interpretano le regole in modi diversi.</p></section>';
    h+='<section class="prose"><h2>La deroga nel diritto europeo</h2><p>Il regolamento (CE) 1099/2009 stabilisce che gli animali sono abbattuti esclusivamente previo stordimento (art. 4, par. 1). Il paragrafo 4 esclude i «particolari metodi di macellazione prescritti da riti religiosi», a condizione che la macellazione avvenga in un macello. In questi casi l\'animale va immobilizzato individualmente e i ruminanti meccanicamente (art. 15, par. 2), con controlli sistematici sull\'assenza di segni di vita prima delle fasi successive e con un operatore dotato di certificato di idoneità.</p><p>Il regolamento lascia agli Stati membri la scelta se usare la deroga e permette norme più protettive (art. 26, par. 2, lett. c). Con la sentenza C-336/19 del 17 dicembre 2020 la Corte di giustizia ha stabilito che gli Stati possono imporre uno stordimento reversibile anche nella macellazione rituale, cercando un equilibrio tra benessere animale e libertà di religione. Vallonia (dal 2018) e Fiandre (dal 2019) lo impongono; la Danimarca vieta dal 2014 la macellazione senza stordimento; Bulgaria e Repubblica Ceca usano la deroga.</p></section>';
    h+='<section class="prose"><h2>La deroga in Italia</h2><p>La legge 439/1978 impone lo stordimento e consente metodi speciali per i riti religiosi con decreto ministeriale. Il D.M. 11 giugno 1980 autorizza la macellazione senza stordimento secondo i riti ebraico e islamico, con un coltello affilatissimo e un taglio unico di esofago, trachea e grossi vasi del collo. Il D.Lgs. 131/2013 prevede una sanzione da 2.000 a 6.000 euro per chi non stordisce, ma non la applica ai metodi rituali in macello; altre sanzioni, da 1.000 a 3.000 euro, riguardano la mancata verifica dei segni di vita e la mancata comunicazione all\'autorità sanitaria, e da 2.000 a 6.000 euro l\'assenza del certificato di idoneità.</p><p>L\'11 aprile 2024 è stato presentato al Senato un disegno di legge (S. 1100) che impone lo stordimento su tutto il territorio nazionale, anche per la macellazione rituale. Il suo esito non è stato verificato.</p></section>';
    h+='<section class="prose"><h2>Che cosa succede senza stordimento</h2><p>Secondo l\'EFSA (2004) i tagli interessano un\'area ricca di recettori del dolore e senza stordimento si osservano dolore e paura; l\'EFSA indica tempi di perdita di sensibilità dopo il taglio fino a 20 secondi negli ovini e fino a 2 minuti nei bovini. Le fonti non concordano: la tradizione ebraica indica circa 2 secondi, Temple Grandin circa 10 secondi se la procedura è eseguita correttamente, mentre un rabbino citato dal Parlamento europeo riporta che il 17% dei bovini supera i 30 secondi, dato contestato. Lo stordimento reversibile prima del taglio, accettato da alcune autorità islamiche, e lo stordimento subito dopo il taglio sono le soluzioni più discusse. Secondo l\'EFSA (2020), gli animali storditi in modo inefficace possono riprendere coscienza.</p><p class="note">Fonte: Parlamento europeo (EPRS, 2023), pp. 14–20. Sono citazioni di terzi, riportate come tali.</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>Quanti animali</h2><div class="tablewrap"><table><thead><tr><th>Specie (Inghilterra e Galles, 2024)</th><th>Stordimento convenzionale</th><th>Halal con stordimento</th><th>Halal senza</th><th>Shechita senza</th></tr></thead><tbody>'+
      [['Ovini','18%','54%','28%','meno dell\'1%'],['Polli da carne','78%','19%','3%','meno dell\'1%'],['Bovini','95%','4%','meno dell\'1%','2%'],['Caprini','53%','37%','11%','—']].map(function(r){return '<tr><td data-label="Specie">'+r[0]+'</td><td data-label="Stordimento convenzionale">'+r[1]+'</td><td data-label="Halal con stordimento">'+r[2]+'</td><td data-label="Halal senza">'+r[3]+'</td><td data-label="Shechita senza">'+r[4]+'</td></tr>'}).join('')+
      '</tbody></table></div><p class="note">Fonte: HSA (2026), da dati della Food Standards Agency. Nel 2022, sempre in Inghilterra e Galles, 19,5 milioni di animali sono stati macellati senza pre-stordimento: 18,3 milioni di polli (2,3% del totale), 219 mila ovini (23%) e 33 mila bovini (1%), secondo il Parlamento europeo (EPRS, 2023). Per l\'Italia l\'unico dato trovato, del 2009, indica che quasi il 95% della macellazione halal avviene senza stordimento (Catanese et al., citato da Roggero, 2016); non è aggiornato né riferito a un totale nazionale.</p></section>';
    h+='<p><a href="#processi-macellazione">Processi di macellazione</a> · <a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;cur=null;
    var mb=app.querySelector('[data-mapbox]');drawMap(mb);
    mb.querySelectorAll('button[data-c]').forEach(function(b){b.addEventListener('click',function(){mapSel=+b.getAttribute('data-c');drawMap(mb)})});
  }
  function renderFiliere(){
    var h="<header style='display:grid;gap:8px'><span class='eyebrow'>Approfondimento</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Filiere a confronto</h1></header>";
    h+="<section class='prose'><p>Confronti tra filiere produttive: che cosa cambia in termini di ambiente, composizione e costi quando lo stesso prodotto nasce da un animale o da una pianta.</p></section>";
    h+='<a class="tile" href="#latte-animale-vs-vegetale"><b>Latte animale vs vegetale</b><span>ambiente e composizione</span></a>';
    h+='<a class="tile" href="#catena-del-freddo"><b>Catena del freddo e cibo</b><span>quanto freddo serve</span></a>';
    h+='<p><a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;cur=null;
  }
  function renderLatte(){
    function N(v,d){return v.toLocaleString('it-IT',{maximumFractionDigits:d===undefined?2:d})}
    var h="<header style='display:grid;gap:8px'><span class='eyebrow'>Filiere a confronto</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Latte animale vs vegetale</h1></header>";
    h+=edHero('lat',{v:'split',n:'38.000',t:'aziende agricole nello studio da cui vengono i dati ambientali del confronto.',s:'Poore e Nemecek, Science, 2018'});
 h+="<section class='prose'><p>Quattro domande, quattro risposte basate su testi di legge, linee guida scientifiche e uno studio su 38.000 aziende agricole. Dove la fonte non c'è, la pagina non risponde.</p></section>";
    /* 1 */
    h+="<section style='display:grid;gap:12px'><h2>1. Anche il latte vaccino può essere «addizionato»</h2><p class='prose'>Il regolamento europeo sul latte alimentare ammette alcune modifiche al latte prima della vendita. Sono lecite se rispettano le regole di etichetta.</p><div class='steps2'>"+
      [['Latte crudo','dalla mungitura'],['Grassi regolati','si toglie o si aggiunge panna, o si mescolano latti con grasso diverso, per arrivare a 3,5% (intero), 1,5–1,8% (parzialmente scremato) o 0,5% (scremato)'],['Arricchimento (facoltativo)','proteine del latte, sali minerali o vitamine; con proteine aggiunte il latte deve avere almeno 3,8% di proteine'],['Lattosio ridotto (facoltativo)','conversione del lattosio in glucosio e galattosio'],['Trattamento termico','per esempio la pastorizzazione']].map(function(s,i){return "<div class='st2'><b>"+(i+1)+". "+s[0]+"</b><span>"+s[1]+"</span></div>"}).join('')+
      "</div><p class='note'>Regolamento (UE) 1308/2013, allegato VII, parte IV, sezione III (punti 1 e 2), letto sulla copia britannica pubblicata su legislation.gov.uk: fa fede il testo su EUR-Lex. Le modifiche per arricchimento e lattosio devono essere indicate sulla confezione. La legge italiana 169/1989, nei suoi articoli ancora in vigore, non tratta le aggiunte. Le bevande vegetali sono spesso arricchite (per esempio con calcio): il confronto corretto è tra etichette.</p></section>";
    /* 2 */
    h+="<section style='display:grid;gap:12px'><h2>2. Il latte contiene sempre cellule: globuli bianchi e cellule della mammella</h2><p class='prose'>Il latte vaccino contiene cellule somatiche, cioè cellule del corpo dell'animale. Sono soprattutto leucociti (globuli bianchi), più alcune cellule che si staccano dalla parete della mammella. Una mammella sana ne ha poche; con un'infiammazione o infezione (mastite) aumentano.</p>"+
      "<div class='gauge' role='img' aria-label='Cellule somatiche per ml: sotto 100.000 tipico di latte sano, da 200.000 probabile infezione del quarto, 400.000 limite di legge per il latte crudo di vacca'><div class='g1' style='width:25%'></div><div class='g2' style='width:25%'></div><div class='g3' style='width:50%'></div></div>"+
      "<div class='glab'><span>0</span><span>100.000</span><span>200.000</span><span>400.000 cellule per ml</span></div>"+
      "<div class='leg'><span><i class='tm-h'></i>Sotto 100.000: quasi sempre latte di quarti non infetti</span><span><i class='tm-m'></i>Da 200.000: più probabile che il quarto sia infetto</span><span><i class='tm-a'></i>Limite di legge per il latte crudo di vacca: 400.000 (media geometrica su tre mesi)</span></div>"+
      "<p class='note'>Smith, Hillerton e Harmon (2001), Guidelines on Normal and Abnormal Raw Milk Based on Somatic Cell Counts, National Mastitis Council: «Milk somatic cells are primarily leukocytes (white blood cells)»; sotto i 100.000 nei quarti non infetti; da 200.000 «the odds favor that the quarter is infected». Le soglie del quarto (singola mammella) e il limite di legge (latte di massa dell'allevamento) misurano cose diverse. Regolamento (CE) 853/2004, allegato III, sezione IX, capitolo I, parte III, copia britannica su legislation.gov.uk (fa fede EUR-Lex).</p>"+
      "<div class='card'><b>Altri controlli di legge sul latte crudo di vacca</b><dl><dt>Carica batterica a 30 °C</dt><dd>massimo 100.000 per ml (media geometrica su due mesi)</dd><dt>Antibiotici</dt><dd>il latte con residui oltre i limiti non può essere venduto</dd></dl><p class='note'>Non abbiamo una fonte che quantifichi la presenza di materia fecale nel latte: per questo la pagina non ne parla. La carica batterica massima sopra è il controllo di legge disponibile.</p></div></section>";
    /* 3 */
    h+="<section style='display:grid;gap:12px'><h2>3. Quanto nutre una bevanda vegetale rispetto al latte?</h2>"+
      "<div class='card'><b>Proteine per 100 g</b>"+
      bars([['Latte vaccino intero pastorizzato (CREA)',3.3,'3,3 g']])+bars([['Bevanda di soia (definizione dello studio Poore e Nemecek)',3.3,'circa 3,3 g']],' w')+
      "</div><p class='prose'>Per la proteina, una bevanda di soia è paragonabile al latte vaccino: lo studio sugli impatti la definisce con circa il 3,3% di proteine, come il latte. Avena, riso e mandorla hanno composizioni diverse e dipendono dalla ricetta e dalla fortificazione. Per vitamine e minerali il confronto va fatto sull'etichetta del prodotto scelto.</p><p class='note'>Poore e Nemecek 2018, supplemento, tabella S1: «1 liter of soymilk (~3.3% protein)» e «1 liter of pasteurized milk (4% fat, 3.3% protein)». CREA, Tabelle di composizione degli alimenti (BDA): latte vaccino intero 64 kcal, proteine 3,3 g, grassi 3,6 g, calcio 119 mg per 100 g. Qui non c'è una tabella di composizione verificata per le bevande vegetali: non si può dire che nutrano meno né più del latte.</p></section>";
    /* 4 */
    var M=[['Terra (m² per litro)',8.95,0.66,2],['Gas serra (kg CO2-eq per litro)',3.15,0.98,2],['Acqua dolce prelevata (litri per litro)',628.2,27.8,1],['Eutrofizzazione (g PO4-eq per litro)',10.65,1.06,2],['Acidificazione (g SO2-eq per litro)',20.01,2.6,1]];
    h+="<section style='display:grid;gap:12px'><h2>4. Quanto pesa sull'ambiente un litro?</h2><p class='prose'>Il latte vaccino parte da una filiera più lunga: prima si coltivano i mangimi e si allevano le vacche, poi si munge e si lavora il latte. La bevanda di soia salta quei passaggi.</p>"+
      "<div class='fil2'><div class='frow'><b class='fl-a'>Latte vaccino</b>"+['Coltivazione di mangimi e pascoli','Alimentazione e allevamento della vacca','Mungitura e raccolta','Trasformazione e pastorizzazione','Latte'].map(function(s){return "<span>"+s+"</span>"}).join('<em>→</em>')+"</div><div class='frow'><b class='fl-h'>Bevanda di soia</b>"+['Coltivazione della soia','Trasformazione','Bevanda'].map(function(s){return "<span>"+s+"</span>"}).join('<em>→</em>')+"</div></div><p class='note'>Schema semplificato: non misura le fasi, mostra i passaggi in più dell'allevamento.</p>";
    M.forEach(function(m){
      h+="<div class='card'><b>"+m[0]+"</b>"+
        "<div class='bar'><div class='lab'><span>Latte vaccino</span><b>"+N(m[1],m[3])+"</b></div><div class='track'><div class='fill' style='width:100%'></div></div></div>"+
        "<div class='bar'><div class='lab'><span>Bevanda di soia</span><b>"+N(m[2],m[3])+"</b></div><div class='track'><div class='fill w' style='width:"+Math.max(m[2]/m[1]*100,1).toFixed(1)+"%'></div></div></div>"+
        "<span class='note'>La soia usa il "+N(m[2]/m[1]*100,0)+"% del latte vaccino: "+N(m[1]/m[2],1)+" volte meno.</span></div>";
    });
    h+="<p class='note'>Poore e Nemecek (2018), Science 360, file dati S2, foglio «Results - Retail Weight», medie del campione ricampionato (soia e latte, per litro). Gas serra: IPCC 2013 con retroazioni climatiche. Studio su oltre 38.000 aziende in 119 Paesi, dalla produzione alla vendita. Sono medie internazionali, non misure sulle filiere italiane, e valgono per la soia: per avena, riso e mandorla la fonte che abbiamo letto non dà valori per litro.</p>"+
      "<p class='note'>Our World in Data (sintesi del confronto): rispetto alle bevande vegetali, il latte vaccino ha circa 3 volte i gas serra, circa 10 volte l'uso di suolo e da 2 a 20 volte l'uso di acqua dolce. Il latte di mandorla ha emissioni e uso del suolo inferiori alla soia, ma consuma più acqua e provoca più eutrofizzazione. Non c'è una bevanda vegetale migliore su tutte le misure.</p></section>";
    h+='<p><a href="#filiere-a-confronto">Filiere a confronto</a> · <a href="#terra">Terra per allevamenti e mangimi</a> · <a href="#info">Info e fonti</a></p>';
    app.innerHTML=h;cur=null;
  }
  function renderAmb(){
    var h="<header style='display:grid;gap:8px'><span class='eyebrow'>Approfondimento</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Impatto ambientale delle diete</h1></header>";
    h+=edHero('amb',{v:'band',n:'25%',t:'del suolo agricolo usato dai vegani, rispetto a chi mangia molta carne.',s:'Scarborough et al. 2023, Regno Unito, stima'});
 h+="<div class='stats'><div><b>25%</b><span>emissioni dei vegani rispetto a chi mangia molta carne</span></div><div><b>25%</b><span>suolo agricolo usato</span></div><div><b>46%</b><span>acqua usata</span></div></div><p class='note'>Regno Unito, 55.504 adulti (studio EPIC-Oxford), consumi e impatti stimati. Non sono dati italiani.</p>";
    AMBD.forEach(function(m){
      var mx=Math.max.apply(null,m.v);
      h+="<section style='display:grid;gap:10px'><h2>"+m.t+"</h2><p class='note'>"+m.u+", per una dieta di 2.000 kcal. Mediana.</p><div class='bars'>";
      DIETS.forEach(function(dd,i){
        h+="<div class='bar'><div class='lab'><span>"+dd[0]+"</span><b>"+fmt(m.v[i],m.d)+"</b></div><div class='track'><div class='fill"+(i===0?" w":"")+"' style='width:"+(m.v[i]/mx*100).toFixed(1)+"%'></div></div></div>";
      });
      h+="</div></section>";
    });
    h+="<p class='note'>Le categorie: pescetariani mangiano pesce ma non carne; poca, media e molta carne indicano i grammi giornalieri di carne totale. Il confronto vale per queste persone, non per tutta la popolazione: nel campione il 77% sono donne e le diete sono dichiarate. Per ogni valore lo studio indica anche un intervallo di incertezza ampio, in particolare per chi mangia molta carne. Valori da Scarborough et al. 2023, Nature Food (tabelle 2, 3 e 4). I vegani qui sono 25,1% (15,1–37,0%) di chi mangia molta carne per i gas serra, 25,1% (7,1–44,5%) per il suolo, 46,4% (21,0–81,0%) per l\'acqua, 27,0% (19,4–40,4%) per l\'eutrofizzazione.</p>";
    h+="<section style='display:grid;gap:12px'><h2>A livello mondiale</h2><p class='prose'>Uno studio su 38.000 aziende agricole in 119 Paesi stima che passare dalle diete attuali a una senza prodotti animali ridurrebbe:</p><div class='stats'><div><b>−76%</b><span>suolo usato per il cibo (3,1 miliardi di ettari)</span></div><div><b>−49%</b><span>gas serra del cibo (6,6 miliardi di t di CO2-eq)</span></div><div><b>−50%</b><span>acidificazione</span></div></div><div class='stats'><div><b>−49%</b><span>eutrofizzazione</span></div><div><b>−19%</b><span>prelievi di acqua dolce, ponderati per la scarsità</span></div><div><b>−19%</b><span>terreno arabile</span></div></div><p class='note'>Poore e Nemecek 2018, Science 360: anno di riferimento 2010, scenario modellato su scala globale. Gli intervalli sono nello studio (per esempio 5,5–7,4 miliardi di t per i gas serra). Il risparmio di acqua è l\'unico con intervallo che include lo zero (da −5% a 32%).</p></section>";
    h+="<p class='note read'>Fonti: Scarborough et al. 2023, Nature Food, <a href='https://doi.org/10.1038/s43016-023-00795-w' target='_blank' rel='noopener'>doi.org/10.1038/s43016-023-00795-w</a>; Poore e Nemecek 2018, Science, <a href='https://doi.org/10.1126/science.aaq0216' target='_blank' rel='noopener'>doi.org/10.1126/science.aaq0216</a>.</p>";
    app.innerHTML=h;cur=null;
  }

  /* ---- visualizzazioni: treemap e torta ---- */
  function bars(rows,cls){var mx=Math.max.apply(null,rows.map(function(r){return r[1]}));return "<div class='bars'>"+rows.map(function(r){return "<div class='bar'><div class='lab'><span>"+r[0]+"</span><b>"+r[2]+"</b></div><div class='track'><div class='fill"+(cls||"")+"' style='width:"+Math.max(r[1]/mx*100,1).toFixed(1)+"%'></div></div></div>"}).join('')+"</div>"}
  function vzTreemap(items,unit){
    var W=100,H=80,tot=0,out=[];
    items=items.slice().sort(function(a,b){return b.v-a.v});
    items.forEach(function(i){tot+=i.v});
    items.forEach(function(i){i.a=i.v/tot*W*H});
    function worst(row,s){var sm=0,mx=0,mn=1e9;row.forEach(function(r){sm+=r.a;mx=Math.max(mx,r.a);mn=Math.min(mn,r.a)});return Math.max(s*s*mx/(sm*sm),sm*sm/(s*s*mn))}
    function lay(arr,x,y,w,h){
      if(!arr.length)return;
      var s=Math.min(w,h),row=[],rest=arr.slice(),best=Infinity;
      while(rest.length){var t=row.concat([rest[0]]),ws=worst(t,s);if(row.length&&ws>best)break;row=t;rest.shift();best=ws}
      var ra=0;row.forEach(function(r){ra+=r.a});
      if(w>=h){var cw=ra/h,cy=y;row.forEach(function(r){var ch=r.a/cw;out.push({i:r,x:x,y:cy,w:cw,h:ch});cy+=ch});lay(rest,x+cw,y,w-cw,h)}
      else{var rh=ra/w,cx=x;row.forEach(function(r){var cw2=r.a/rh;out.push({i:r,x:cx,y:y,w:cw2,h:rh});cx+=cw2});lay(rest,x,y+rh,w,h-rh)}
    }
    lay(items,0,0,W,H);
    var h="<div class='tm' role='img' aria-label='Treemap: "+items.map(function(i){return i.n+" "+i.l}).join('; ')+"'>";
    out.forEach(function(o){
      var i=o.i,ar=o.w*o.h,txt="";
      if(ar>=110)txt="<b>"+i.n+"</b>"+(ar>=200?"<span>"+i.l+(unit?" "+unit:"")+" · "+(i.v/tot*100).toLocaleString('it-IT',{maximumFractionDigits:1})+"%</span>":"");
      h+="<div class='tm-"+i.k+"' title='"+i.n+": "+i.l+" ("+(i.v/tot*100).toLocaleString('it-IT',{maximumFractionDigits:1})+"%)' style='left:"+o.x+"%;top:"+(o.y/H*100)+"%;width:"+o.w+"%;height:"+(o.h/H*100)+"%'>"+txt+"</div>";
    });
    return h+"</div>";
  }
  function vzTmLegend(){return "<div class='tmleg'><span><i class='tm-a'></i>Per gli animali</span><span><i class='tm-m'></i>Uso misto (cibo, mangimi, industria)</span><span><i class='tm-h'></i>Per il cibo umano</span><span><i class='tm-f'></i>Maggese o altro</span></div>"}
  function vzPie(items,center,cap){
    var a0=-Math.PI/2,h="<figure class='pf'><svg viewBox='-60 -60 120 120' role='img' aria-label='"+cap+": "+items.map(function(i){return i.n+" "+i.v+"%"}).join(', ')+"'>";
    items.forEach(function(i){
      var a1=a0+i.v/100*2*Math.PI,r=54,r2=30,L=(a1-a0)>Math.PI?1:0;
      var p=[[Math.cos(a0)*r,Math.sin(a0)*r],[Math.cos(a1)*r,Math.sin(a1)*r],[Math.cos(a1)*r2,Math.sin(a1)*r2],[Math.cos(a0)*r2,Math.sin(a0)*r2]];
      h+="<path class='s-"+i.k+"' d='M"+p[0][0].toFixed(2)+" "+p[0][1].toFixed(2)+" A"+r+" "+r+" 0 "+L+" 1 "+p[1][0].toFixed(2)+" "+p[1][1].toFixed(2)+" L"+p[2][0].toFixed(2)+" "+p[2][1].toFixed(2)+" A"+r2+" "+r2+" 0 "+L+" 0 "+p[3][0].toFixed(2)+" "+p[3][1].toFixed(2)+" Z'/>";
      a0=a1;
    });
    h+="<text x='0' y='0'>"+center+"</text></svg><figcaption>"+cap+"</figcaption></figure>";
    return h;
  }

  function renderTerra(){
    function N(v){return v.toLocaleString('it-IT')}
    function bars(rows,cls){var mx=Math.max.apply(null,rows.map(function(r){return r[1]}));return "<div class='bars'>"+rows.map(function(r){return "<div class='bar'><div class='lab'><span>"+r[0]+"</span><b>"+r[2]+"</b></div><div class='track'><div class='fill"+(cls||"")+"' style='width:"+Math.max(r[1]/mx*100,1).toFixed(1)+"%'></div></div></div>"}).join('')+"</div>"}
    var h="<header style='display:grid;gap:8px'><span class='eyebrow'>Approfondimento</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Terra per allevamenti e mangimi</h1></header>";
    h+="<div class='stats'><div><b>47%</b><span>della superficie agricola italiana è a prato o pascolo (FAO, 2024)</span></div><div><b>6,1 Mha</b><span>milioni di ettari di prati e pascoli, permanenti e temporanei</span></div><div><b>80%</b><span>della terra agricola mondiale serve al bestiame (OWID, 2024)</span></div></div>";
    h+="<p class='note read'>I dati fisici (ettari censiti) e le stime di modello (impronta di terra per prodotto) sono grandezze diverse e restano separate in questa pagina. Non si sommano.</p>";
    h+="<section style='display:grid;gap:12px'><h2>Animali o persone? La terra agricola a colpo d'occhio</h2>"+
      "<div class='stats'><div><b>47%</b><span>dell'Italia agricola è certamente per gli animali (prati, pascoli, foraggere)</span></div><div><b>19%</b><span>è certamente per il cibo umano (colture permanenti: vite, olivo, frutta)</span></div><div><b>31%</b><span>è a uso misto (cereali, semi, ortaggi, altri seminativi)</span></div></div>"+
      vzTmLegend()+"<h3>Italia, 2024: 12,9 milioni di ettari</h3>"+
      vzTreemap([{n:'Prati e pascoli permanenti',v:3553.81,l:'3,55 Mha',k:'a'},{n:'Prati e foraggere temporanei',v:2559.99,l:'2,56 Mha',k:'a'},{n:'Altre colture temporanee (cereali, semi, ortaggi...)',v:4039.12,l:'4,04 Mha',k:'m'},{n:'Colture permanenti (vite, olivo, frutta)',v:2398.47,l:'2,40 Mha',k:'h'},{n:'Maggese',v:350.14,l:'0,35 Mha',k:'f'}])+
      "<p class='note'>FAOSTAT, uso del suolo, Italia 2024. Le superfici sono ettari censiti. «Uso misto» non è «cibo umano»: cereali e soia vanno anche ai mangimi, ma i dati non dicono in che quota.</p>"+
      "<div class='stats'><div><b>43%</b><span>dell'UE-27 agricola è certamente per gli animali</span></div><div><b>7%</b><span>è certamente per il cibo umano (colture permanenti)</span></div><div><b>50%</b><span>è a uso misto (cereali da granella e altri seminativi)</span></div></div>"+
      "<h3>Unione europea (UE-27), 2023: 153,6 milioni di ettari</h3>"+
      vzTreemap([{n:'Prati permanenti',v:45.87,l:'45,9 Mha',k:'a'},{n:'Foraggere verdi dei seminativi',v:19.72,l:'19,7 Mha',k:'a'},{n:'Cereali da granella',v:50.97,l:'51,0 Mha',k:'m'},{n:'Altri seminativi (oleaginose, legumi, patate, maggese...)',v:25.83,l:'25,8 Mha',k:'m'},{n:'Colture permanenti',v:11.14,l:'11,1 Mha',k:'h'},{n:'Altro',v:0.09,l:'0,09 Mha',k:'f'}])+
      "<p class='note'>Eurostat 2023. I prati permanenti e i seminativi totali (96,52 Mha) vengono dall'indagine sulla struttura delle aziende; le foraggere verdi (19,72 Mha) e i cereali (50,97 Mha) dalle statistiche annuali sulle colture. «Altri seminativi» è calcolato per differenza (96,52 − 19,72 − 50,97 = 25,83) e comprende il maggese. Fonti e metodi diversi: i confini tra le voci sono approssimati.</p></section>";
    h+="<section style='display:grid;gap:12px'><h2>Quanta terra si libererebbe senza allevamenti?</h2>"+
      "<p class='prose'>Nessuna fonte che abbiamo letto calcola questo scenario per l'Italia o per l'UE. Si può dire quanta terra occupano oggi i prati, i pascoli e le foraggere: è un limite superiore teorico, non una previsione.</p>"+
      "<div class='stats'><div><b>6,1 Mha</b><span>Italia: prati, pascoli e foraggere (FAO 2024), il 20,7% del territorio nazionale</span></div><div><b>65,6 Mha</b><span>UE-27: prati permanenti e foraggere verdi (Eurostat 2023)</span></div><div><b>−75%</b><span>mondo: terra agricola con diete vegetali, da 4 a 1 miliardo di ettari (OWID, modello)</span></div></div>"+
      bars([['Italia: prati, pascoli e foraggere (oggi per gli animali)',6.114,'6,11 Mha'],['Italia: boschi',9.409,'9,41 Mha'],['Italia: altre colture temporanee',4.039,'4,04 Mha'],['Italia: colture permanenti',2.398,'2,40 Mha']])+
      "<p class='note'>Territorio nazionale e boschi: FAOSTAT 2024 (29,57 Mha di superficie terrestre; 9,41 Mha di foreste).</p>"+
      "<h3>Perché non è un conto semplice</h3><ul class='prose'><li>Non tutta la terra a prato o pascolo è coltivabile: Our World in Data riporta che due terzi dei pascoli del mondo non sono adatti alle colture.</li><li>Il modello di Poore e Nemecek stima che un mondo senza prodotti animali userebbe il 76% di terra in meno per il cibo (3,1 miliardi di ettari). Per Our World in Data la terra agricola scenderebbe da 4 a 1 miliardo di ettari. Sono scenari globali, non valori per l'Italia.</li><li>L'Italia importa mangimi: la terra estera usata per farli non è nei numeri di questa pagina.</li><li>Liberare la terra non coincide con destinarla a nuove colture: potrebbe tornare a bosco o prato naturale.</li></ul></section>";
    h+="<section style='display:grid;gap:12px'><h2>Nel mondo: terra, calorie e proteine</h2><div class='pies3'>"+
      vzPie([{n:'bestiame',v:80,k:'a'},{n:'cibo umano',v:16,k:'h'},{n:'altri usi',v:4,k:'f'}],'80%','Terra agricola usata per il bestiame')+
      vzPie([{n:'carne, latticini, pesce',v:17,k:'a'},{n:'resto',v:83,k:'h'}],'17%','Calorie fornite da carne, latticini e pesce')+
      vzPie([{n:'carne, latticini, pesce',v:38,k:'a'},{n:'resto',v:62,k:'h'}],'38%','Proteine fornite da carne, latticini e pesce')+
      "</div><div class='tmleg'><span><i class='tm-a'></i>Bestiame (pascoli e coltivi per mangimi) e prodotti animali</span><span><i class='tm-h'></i>Cibo umano vegetale (terra) e resto della dieta</span><span><i class='tm-f'></i>Colture non alimentari</span></div>"+
      "<p class='note'>Our World in Data (2024), su dati FAO e Poore e Nemecek 2018. Nel caso della terra, le quote sono stime di modello. Il «resto» di calorie e proteine è calcolato per differenza.</p></section>";
    h+="<section style='display:grid;gap:10px'><h2>Italia: prati, pascoli ed erbai</h2><p class='note'>ISTAT, superfici coltivate, anno 2025, ettari. Dato fisico, indagine statistica.</p>"+
      bars([['Prati permanenti e pascoli (totale)',3536791,N(3536791)],['di cui pascoli poveri',1807183,N(1807183)],['di cui altri pascoli',954635,N(954635)],['di cui prati permanenti',744804,N(744804)],['Foraggere dei seminativi, mais ceroso incluso (somma delle voci)',2552220,N(2552220)],['di cui erba medica',660488,N(660488)],['di cui prati avvicendati polifiti',394445,N(394445)],['di cui mais ceroso',378014,N(378014)],['di cui altri erbai monofiti',289305,N(289305)],['di cui altri miscugli',279210,N(279210)],['di cui altre foraggere',550758,N(550758)]])+
      "<p class='note'>Le tre voci dei prati permanenti sommano 3.506.622 ettari: ai 3.536.791 del totale ne mancano 30.169, non ripartiti nel file. Le foraggere dei seminativi sono la somma di 16 voci del file ISTAT (codici Eurostat G): non c\'è un totale ufficiale nel file e non si può escludere una sovrapposizione tra voci, ma il risultato coincide entro lo 0,3% con la categoria FAO «prati e pascoli temporanei» (sotto).</p></section>";
    h+="<section style='display:grid;gap:10px'><h2>Controllo con FAO</h2><p class='note'>FAOSTAT, uso del suolo in Italia, 2024, ettari.</p>"+
      bars([['Superficie agricola',12901530,N(12901530)],['Prati e pascoli permanenti',3553810,N(3553810)],['Prati e pascoli temporanei',2559990,N(2559990)],['Seminativi (arable land)',6949250,N(6949250)]])+
      "<p class='note'>Permanenti più temporanei: 6.113.800 ettari, il 47,4% della superficie agricola FAO. Il confronto con ISTAT: permanenti 3.553.810 (FAO 2024) contro 3.536.791 (ISTAT 2025); temporanei 2.559.990 contro 2.552.220. Nel censimento ISTAT del 2020 i prati permanenti e pascoli erano 3.136.555 ettari e la SAU 12.535.356: non è lo stesso anno né la stessa rilevazione. I seminativi FAO comprendono anche i prati temporanei.</p></section>";
    h+="<section style='display:grid;gap:10px'><h2>Cereali e semi: quanti ettari vanno ai mangimi?</h2><p class='note'>ISTAT 2025, ettari totali della coltura, non la quota per mangimi.</p>"+
      bars([['Mais (da granella)',540945,N(540945)],['Frumento tenero',511242,N(511242)],['Soia',297775,N(297775)],['Orzo',228832,N(228832)],['Avena',98092,N(98092)],['Fava da granella',48423,N(48423)],['Sorgo',48145,N(48145)]],' dash')+
      "<p class='note'>Queste colture sono usate anche per l\'alimentazione umana, l\'industria e l\'esportazione. ISTAT non indica quanta superficie o produzione vada ai mangimi, quindi <strong>non esiste un totale in ettari per i cereali da mangime</strong> e non lo stimiamo. Anche Our World in Data scrive che la FAO non fornisce la ripartizione tra cibo, mangimi e usi industriali.</p></section>";
    h+="<section style='display:grid;gap:10px'><h2>Unione europea (UE-27)</h2><p class='note'>Eurostat, apro_cpsh1, anno 2024, milioni di ettari. Dato fisico, statistica ufficiale. L\'Italia ha 2,56 milioni di ettari di foraggere verdi dei seminativi, il 12,8% del totale UE.</p>"+
      bars([['Piante raccolte verdi dai seminativi (foraggere e mais verde)',20.06,'20,06'],['di cui graminacee temporanee e pascoli temporanei',7.36,'7,36'],['di cui mais verde',5.87,'5,87'],['di cui leguminose raccolte verdi (erba medica, trifoglio)',4.64,'4,64']])+
      "<p class='note'>Cereali da granella, ettari totali, non la quota per mangimi:</p>"+
      bars([['Cereali da granella (totale)',49.5,'49,50'],['Frumento tenero',20.32,'20,32'],['Orzo',10.29,'10,29'],['Mais da granella',8.67,'8,67'],['Frumento duro',2.2,'2,20'],['Girasole',4.79,'4,79'],['Soia',1.12,'1,12']],' dash')+
      "<p class='note'>Le tre voci in dettaglio delle foraggere non sommano al totale: restano altre colture verdi (cereali raccolti verdi e altre piante) non mostrate. Per l\'Unione europea non c\'è, come per l\'Italia, la quota di cereali e soia destinata ai mangimi.</p>"+
      "<h3>Prati permanenti e superficie agricola</h3><p class='note'>Eurostat, indagine sulla struttura delle aziende agricole (ef_lus_main), solo aziende sopra la soglia, 2023, milioni di ettari. L\'indagine esce solo ogni tre anni circa (2020, 2023), non ogni anno.</p>"+
      bars([['UE-27: superficie agricola utilizzata',153.62,'153,62'],['UE-27: seminativi',96.52,'96,52'],['UE-27: prati permanenti all\'aperto',45.87,'45,87'],['UE-27: colture permanenti',11.14,'11,14'],['Italia: superficie agricola utilizzata',12.29,'12,29'],['Italia: seminativi',7.01,'7,01'],['Italia: prati permanenti all\'aperto',2.95,'2,95'],['Italia: colture permanenti',2.32,'2,32']])+
      "<p class='note'>I prati permanenti sono il 29,9% della superficie agricola nell\'UE-27 e il 24,0% in Italia. Nel 2020 erano 46,57 milioni di ettari nell\'UE-27 e 3,09 in Italia. I numeri non coincidono con quelli di ISTAT, FAO o di altre statistiche UE (per l\'Italia 2,95 qui contro 3,54 di ISTAT 2025 e 3,14 del censimento 2020): cambiano la rilevazione, le soglie e la definizione di «all\'aperto». Vanno letti per fonte, non confrontati.</p></section>";
    h+="<section style='display:grid;gap:12px'><h2>Nel mondo: quanti ettari</h2><div class='stats'><div><b>48 milioni km²</b><span>terra agricola: il 44% della terra abitabile (OWID, dati FAO)</span></div><div><b>1/3 · 2/3</b><span>coltivi e pascoli, quota della terra agricola</span></div><div><b>38%</b><span>dei coltivi serve ai mangimi, 50% al cibo, 12% ad altri usi</span></div></div>"+
      "<p class='prose'>Sommando i pascoli e i coltivi per mangimi, il bestiame occupa l\'80% della terra agricola; il cibo vegetale per le persone il 16% e le colture non alimentari il 4%. Carne, latticini e pesce d\'allevamento forniscono il 17% delle calorie e il 38% delle proteine (FAO, tramite Our World in Data).</p>"+
      "<div class='stats'><div><b>538 Mha</b><span>coltivi per mangimi (422 raccolti, 116 a riposo), 38% dei coltivi (Poore e Nemecek, ~2010)</span></div><div><b>1.534 Mha</b><span>pascoli per mangimi nel modello; la FAO ne conta 3.322</span></div><div><b>−47%</b><span>stima dei pascoli del modello rispetto alla FAO</span></div></div>"+
      "<p class='note'>Dati di modello, non ettari censiti. I pascoli dello studio sono stimati con poche osservazioni per l\'Africa e senza osservazioni per Arabia Saudita, Kazakistan e Mongolia: gli autori dicono che questo porta a sottostimare l\'uso di terra dei ruminanti. Our World in Data riporta che due terzi dei pascoli non sono adatti alla coltivazione.</p></section>";
    h+="<section style='display:grid;gap:10px'><h2>Quanta terra per 100 grammi di proteine?</h2><p class='note'>Poore e Nemecek 2018, metri quadrati di terra per un anno per 100 g di proteine. Media del campione ricampionato; tra parentesi la mediana. Stima di modello su aziende di 119 Paesi.</p>"+
      bars([['Carne di agnello e pecora',184.81,'185 (64)'],['Carne bovina, mandria da carne',163.6,'164 (85)'],['Formaggio',39.76,'40 (9)'],['Carne bovina, mandria da latte',21.9,'22 (13)'],['Carne di maiale',10.73,'11 (8)'],['Carne di pollo',7.06,'7,1 (6,4)'],['Uova',5.65,'5,7 (5,2)'],['Pesce d\'allevamento',3.69,'3,7 (2,5)'],['Piselli',3.36,'3,4 (3,0)'],['Tofu',2.2,'2,2 (2,1)']])+
      "<p class='note'>La differenza tra media e mediana è grande per i ruminanti: la terra per grammo di proteina varia molto tra aziende e Paesi. Il latte è misurato per litro, non per proteina, e non è nel grafico. Il dato include i pascoli, che per molti ruminanti sono terra non coltivabile.</p></section>";
    h+="<section class='prose'><h2>Limiti</h2><ul><li>Per l\'Unione europea manca la quota di cereali e soia destinata ai mangimi.</li><li>Mancano gli ettari di terra estera per i mangimi importati (soia e altri): non c\'è un dato verificato.</li><li>Il dato FAO «fabbricati e cortili aziendali» non distingue le stalle e quindi non è usato.</li><li>Il pascolo è terra occupata, non necessariamente sottratta ad altri usi: per questo i dati vanno letti insieme alla qualità del suolo.</li></ul></section>";
    h+="<p class='note read'>Fonti: ISTAT, Superfici e produzione, dati in complesso (dataset IT1101_1015_DF_DCSP_COLTIVAZIONI_11.0); FAOSTAT, Land Use; Ritchie e Roser, Our World in Data (2024 e 2021); Poore e Nemecek 2018, Science, materiali supplementari. Si veda <a href='#info'>Info e fonti</a>.</p>";
    app.innerHTML=h;cur=null;
  }

  function renderFreddo(){
    var AN='var(--terra)',VG='var(--wild)',FG='var(--fg)';
    function ic(id,col,sz){return "<svg viewBox='0 0 24 24' width='"+(sz||40)+"' height='"+(sz||40)+"' aria-hidden='true' style='stroke:"+col+";fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex:none'><use href='#"+id+"'/></svg>"}
    function picto(n,on,id,sz,label){var s="<div class='picto' role='img' aria-label='"+label+"'>";for(var i=0;i<n;i++){var f=i<on;s+="<svg viewBox='0 0 24 24' width='"+sz+"' height='"+sz+"' aria-hidden='true' style='stroke:"+(f?AN:FG)+";fill:"+(f?AN:'none')+";fill-opacity:"+(f?'.9':'0')+";stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round'><use href='#"+id+"'/></svg>"}return s+"</div>"}
    function barsI(rows){var mx=Math.max.apply(null,rows.map(function(r){return r[2]}));return "<div class='bars'>"+rows.map(function(r){return "<div class='bar'><div class='irow'>"+ic(r[0],r[5]||FG,32)+"<div class='ibody'><div class='lab'><span>"+r[1]+"</span><b>"+r[3]+"</b></div><div class='track'><div class='fill"+(r[4]?" "+r[4]:"")+"' style='width:"+Math.max(r[2]/mx*100,1).toFixed(1)+"%'></div></div></div></div></div>"}).join('')+"</div>"}
    function sec(id,eb,title,inner){return "<section id='"+id+"' style='display:grid;gap:14px'><span class='eyebrow'>"+eb+"</span><h2>"+title+"</h2>"+inner+"</section>"}
    var h="<header style='display:grid;gap:12px'><span class='eyebrow'>Approfondimento</span><h1 style='font-size:clamp(2.2rem,11vw,3.4rem)'>Catena del freddo e cibo</h1><div class='heroic' aria-hidden='true'>"+ic('i-fridge',FG,64)+ic('i-flake',VG,40)+ic('i-milk',AN,52)+ic('i-meat',AN,52)+ic('i-fish',AN,52)+ic('i-beans',VG,52)+ic('i-wheat',VG,52)+"</div></header>";
    h+="<section class='prose'><p class='lead'>Il freddo permette di conservare più a lungo gli alimenti che, a temperatura ambiente, si deteriorerebbero rapidamente. Tuttavia, la temperatura necessaria per conservarli correttamente varia in base al tipo di alimento.</p><p class='note'>In questa analisi distinguiamo quattro aspetti: il consumo di energia, il calore da sottrarre, il volume degli spazi refrigerati e le quote di mercato. Si tratta di grandezze diverse, che devono essere considerate separatamente e non sommate tra loro.</p></section>";
    h+="<nav class='ichips' aria-label='Sezioni della pagina'><button type='button' data-go='fr-a'>Due modi</button><button type='button' data-go='fr-b'>Calore</button><button type='button' data-go='fr-c'>Frigorifero</button><button type='button' data-go='fr-d'>Senza frigo</button><button type='button' data-go='fr-e'>Nel mondo</button><button type='button' data-go='fr-f'>Limiti e fonti</button></nav>";
    h+=sec('fr-a','01 · Conservazione','Due modi per conservare gli alimenti',"<div class='duo2'><div class='card'><h3>Alimenti che richiedono il freddo</h3><div class='icons'>"+ic('i-milk',AN,56)+ic('i-meat',AN,56)+ic('i-fish',AN,56)+"</div><p>Latte pastorizzato, carne e pesce freschi.</p><p class='note'>Per conservarli in sicurezza sono necessari frigoriferi, camion refrigerati e celle frigorifere. In genere, questi alimenti si mantengono per pochi giorni.</p></div><div class='card'><h3>Alimenti che si conservano a temperatura ambiente</h3><div class='icons'>"+ic('i-beans',VG,56)+ic('i-wheat',VG,56)+ic('i-pasta',VG,56)+"</div><p>Lenticchie, ceci e fagioli secchi, riso, pasta e farina.</p><p class='note'>Possono essere conservati in dispensa, senza refrigerazione, purché siano riposti in confezioni ben chiuse e in un ambiente asciutto (fonte: CREA).</p></div></div><p class='note'><b>Attenzione:</b> non tutti i vegetali possono essere conservati a secco. La frutta e la verdura fresche, ad esempio, richiedono spesso la refrigerazione. Lo stesso vale per gli alimenti di origine animale: il latte UHT, invece, può essere conservato a temperatura ambiente finché la confezione rimane chiusa.</p>");
    h+=sec('fr-b','02 · Il peso della refrigerazione','Latte e carne richiedono più freddo di patate e verdure',"<p class='read'>Quanto calore bisogna sottrarre agli alimenti per raffreddarli e conservarli? I dati raccolti nel Regno Unito nel 2009 mostrano una differenza significativa tra le diverse categorie alimentari.</p><p class='read'>Latte e carne, due prodotti di origine animale, richiedono quantità di raffreddamento nettamente superiori rispetto a patate e altre verdure.</p><h3>Calore da sottrarre in un anno · Regno Unito, 2009</h3>"+
      barsI([['i-milk','Latte',532,'532 GWh','',AN],['i-meat','Carne',114,'114 GWh','',AN],['i-potato','Patate',59,'59 GWh','w',VG],['i-veg','Altre verdure',36,'36 GWh','w',VG],['i-fish','Pesce',6.5,'6,5 GWh','',AN],['i-apple','Frutta',5.9,'5,9 GWh','w',VG]])+
      "<div class='tmleg'><span><i class='tm-a'></i>Origine animale</span><span><i class='tm-h'></i>Origine vegetale</span></div>"+
      "<div class='card' style='gap:12px'><h3>Cosa ci dicono questi numeri?</h3><p>Il raffreddamento del latte richiede oltre 9 volte il calore da sottrarre alle patate e quasi 15 volte quello delle altre verdure. La carne ne richiede quasi il doppio rispetto alle patate.</p><h3>Il latte: 7 GWh su ogni 10</h3>"+picto(10,7,'i-milk',34,'Su ogni 10 GWh di calore da sottrarre alle sei categorie, 7 riguardano il latte')+"<p class='note'>Ogni bottiglia vale 1 GWh su 10. Sommando le sei categorie dello studio, su ogni 10 GWh di calore da sottrarre circa 7 sono del latte (71%).</p></div>"+
      "<p class='read'>Il pesce, pur di origine animale, richiede meno calore da sottrarre di patate e verdure: il freddo non segue la divisione tra animale e vegetale.</p>"+
      "<p class='note'>Fonte: Evans, Swain e James. I valori indicano il calore da sottrarre durante il raffreddamento primario, non il consumo di elettricità. Sono totali per categoria, non per chilo di alimento, e dipendono da quanto cibo viene lavorato.</p>"+
      "<details class='fil'><summary>Quanto si potrebbe risparmiare?</summary><div><p>Con le migliori tecnologie lo studio stima un risparmio di 154 GWh all’anno per le patate, 128 per il latte e 51–80 per la carne.</p></div></details>");
    h+=sec('fr-c','03 · In casa','Che cosa va in frigorifero?',"<p class='note'>Ministero della Salute, «Decalogo» sul frigorifero. Sono tempi massimi consigliati in casa.</p><h3>Quanto dura in frigorifero (zona più fredda, circa 2 °C)</h3>"+
      barsI([['i-clock','Pesce eviscerato e lavato',24,'24 ore','',AN],['i-clock','Carne macinata',24,'24 ore','',AN],['i-clock','Pollo e tacchino',48,'48 ore','',AN],['i-clock','Carne fresca e affettati non confezionati',72,'3 giorni','',AN]])+
      "<div class='fil2'><div class='frow'><b>Zona centrale, 4–5 °C</b><span>Uova</span><span>Latticini</span><span>Dolci con creme e panna</span><span>Alimenti dopo l’apertura</span></div><div class='frow'><b>Cassetto, zona meno fredda</b><span>Verdura e frutta che il freddo eccessivo può danneggiare</span></div><div class='frow'><b>Meglio fuori dal frigorifero</b><span>Frutta esotica</span><span>Agrumi</span><span>Pomodori</span><span>Fagiolini</span><span>Cetrioli</span><span>Zucchine</span><span>Pane</span></div></div>"+
      "<h3>Mesi in congelatore a −18 °C</h3><p class='note'>Ministero della Salute, FAQ «Conservare gli alimenti col freddo» (13/03/2025).</p>"+
      barsI([['i-flake','Pollame intero crudo',11,'10–12','',AN],['i-flake','Bovino, arrosto crudo',9,'9','',AN],['i-flake','Pesce magro crudo',4,'4','',AN],['i-flake','Carne macinata cruda',3.5,'3–4','',AN],['i-flake','Pesce grasso crudo',3,'3','',AN],['i-flake','Salsiccia',1.5,'1–2','',AN]])+
      "<p class='note'>Per carni e pollame il Ministero indica sotto i 4 °C e al massimo 2–3 giorni in frigorifero (Ministero della Salute, «Precauzioni»).</p>");
    h+=sec('fr-d','04 · Senza frigorifero','Che cosa si conserva a secco?',"<p class='read'>Pasta, riso, farina e legumi secchi non si rovinano in fretta: stanno in dispensa, in contenitori chiusi, con aria e poca umidità (CREA). Il CREA non dà una durata unica in giorni o mesi.</p><div class='card' style='gap:12px'><h3>Latte alimentare in Italia, 2024: 3 su 4 sono UHT</h3>"+picto(4,3,'i-milk',48,'Su quattro bottiglie di latte alimentare, tre sono UHT e una pastorizzata')+"<div class='tmleg'><span><i style='background:"+AN+"'></i>75% UHT, a temperatura ambiente se chiuso</span><span><i style='border:2px solid "+FG+"'></i>25% pastorizzato, in frigorifero</span></div><p class='note'>Quote dei volumi. Per valore: 67% UHT e 33% pastorizzato (ASSOLATTE 2025, riportato da CREA, Annuario 2024). Per formaggi stagionati, yogurt e burro non esiste una quota pubblicata tra venduto con e senza frigorifero.</p></div>");
    h+=sec('fr-e','05 · Nel mondo','Quanto pesa il freddo alimentare?',"<div class='stats2'><div><b>4%</b><span>delle emissioni globali: catena del freddo più cibo perso per mancanza di freddo (FAO e UNEP, 2022)</span></div><div><b>1%</b><span>delle emissioni globali: solo la catena del freddo (IPCC AR6, gruppo 3, cap. 12)</span></div><div><b>14%</b><span>del cibo prodotto si perde prima di arrivare al consumatore (FAO e UNEP, 2022)</span></div><div><b>43%</b><span>dell’energia del commercio al dettaglio va alla refrigerazione (IPCC, da Behfar et al. 2018)</span></div><div><b>3,28 TWh</b><span>elettricità della refrigerazione del commercio alimentare nel Regno Unito, circa l’1% (stima, ICCC 2024)</span></div><div><b>50 Mt</b><span>CO₂-eq all’anno dai trasporti refrigerati nel mondo, 3,4 milioni di unità nel 2017 (IIR)</span></div></div><p class='note'>Il 4% e l’1% hanno perimetri diversi: il 4% include il cibo perso, l’1% no. Sono stime globali, non dati italiani.</p>"+
      "<h3>I frigoriferi di casa in Europa</h3><div class='stats2'><div><b>258 mln</b><span>frigoriferi e congelatori nell’UE27 nel 2020 (stima, Commissione europea)</span></div><div><b>391 L</b><span>volume raffreddato per famiglia; il 92% dei frigoriferi è in casa</span></div><div><b>181 kWh</b><span>consumo annuo medio di un apparecchio venduto nel 2020, contro 477 nel 1990</span></div></div>"+
      "<div class='duo2'><div class='card'><h3>Volume raffreddato, UE27, 2020</h3>"+vzPie([{n:'Refrigerato a +5 °C',v:78,k:'h'},{n:'Congelato a −18 °C',v:22,k:'f'}],'78%','Volume raffreddato: 78% refrigerato, 22% congelato')+"<div class='tmleg'><span><i class='tm-h'></i>78% refrigerato a +5 °C</span><span><i class='tm-f'></i>22% congelato a −18 °C</span></div></div><div class='card'><h3>Elettricità dei frigoriferi domestici, UE27</h3>"+barsI([['i-fridge','Senza misure di efficienza (scenario)',116,'116 TWh','dash'],['i-fridge','Nel 2020, con ecodesign (stima)',61,'61 TWh','g']])+"</div></div><p class='note'>Stime della Commissione europea (Ecodesign Impact Accounting 2024). ISTAT 2021: frigorifero nel 99,5% delle famiglie italiane, congelatore esterno nel 27,3%. Il consumo elettrico dei soli frigoriferi italiani non è pubblicato nelle fonti consultate.</p>");
    h+="<section class='prose'><h2>In sintesi: il freddo ha un costo</h2><p>Una parte degli alimenti richiede refrigerazione continua, trasporto a temperatura controllata e frigorifero. Altri, come legumi secchi, pasta e riso, si conservano a temperatura ambiente. Nello studio britannico del 2009 il latte richiede il maggior calore da togliere.</p><p>Scegliere più alimenti conservabili a secco può ridurre la dipendenza dalla catena del freddo per una parte della spesa. Quanto questo si traduca in risparmio di energia e di denaro dipende da quantità, produzione, trasformazione, trasporto e conservazione.</p></section>";
    h+="<section class='pov'><span class='eyebrow'>Punto di vista</span><p class='zero'>Un’ipotesi, non un dato.</p><p>Carne, pesce e latticini freschi sono tra gli alimenti con la durata più breve in frigorifero: da 24 ore a 3 giorni per carni e pesce secondo il Ministero. Una filiera con meno alimenti di questo tipo potrebbe richiedere meno freddo.</p><p><strong>Nessuna fonte consultata misura quanto.</strong> I dati mostrano anche il contrario in singoli casi: patate e verdure richiedono freddo, il latte UHT e i cereali no.</p></section>";
    h+="<section id='fr-f' style='display:grid;gap:10px'><h2>Limiti e fonti</h2><details class='fil'><summary>Che cosa i dati non dicono</summary><div><ul><li>Non esiste un dato italiano sull’elettricità dei frigoriferi domestici, della refrigerazione commerciale, dei magazzini e dei trasporti refrigerati.</li><li>Non è stata trovata una ripartizione dell’energia o del volume refrigerato tra alimenti animali e vegetali, né per l’Italia né per l’UE.</li><li>I dati per alimento (Evans et al.) riguardano il Regno Unito nel 2009 e il solo raffreddamento primario.</li><li>Uno studio di modellizzazione (Università del Michigan) sul freddo in Africa subsahariana trova emissioni più alte per pesce, carne e verdure (scenario nordamericano) e per pesce, carne e cereali (scenario europeo): è un modello, non un dato italiano.</li><li>Per un confronto completo servirebbero kWh per kg e per 1.000 kcal, a parità di quantità nutrizionale e con confini di filiera omogenei: oggi nessuna fonte li fornisce.</li><li>I valori globali di FAO, UNEP e IPCC sono stime con perimetri diversi.</li></ul></div></details><details class='fil'><summary>Fonti</summary><div><p>FAO e UNEP (2022); IPCC AR6 WGIII cap. 12; Commissione europea, Fridges and Freezers; ISTAT, Consumi energetici delle famiglie 2021; Evans, Swain e James (2009); Ministero della Salute; CREA; IIR; Lagoeiro et al. (2024). Link completi in <a href='#info'>Info e fonti</a>.</p></div></details></section>";
    app.innerHTML=h;cur=null;
    app.querySelectorAll('[data-go]').forEach(function(b){b.addEventListener('click',function(){var el=document.getElementById(b.getAttribute('data-go'));if(el)el.scrollIntoView({behavior:'smooth',block:'start'})})});
  }

  /* ---------- animali macellati: Italia, Europa, mondo (FAOSTAT QCL) ---------- */
  var macSp='Polli',macAr='W';
  function renderMac(){
    /* D: [specie, [valore, flag, anno] per Mondo, Europa, Italia]; flag A = valore ufficiale FAO, E = stima FAO */
    var D=[["Bovini", [304744668, "E", 2024], [37842889, "A", 2024], [2607110, "A", 2024]], ["Bufalini", [29040868, "E", 2024], [103613, "A", 2024], [99830, "A", 2024]], ["Suini", [1493796985, "A", 2024], [303209683, "A", 2024], [10086260, "A", 2024]], ["Ovini", [703861354, "E", 2024], [59392730, "A", 2024], [2030540, "A", 2024]], ["Caprini", [563722557, "E", 2024], [6486382, "A", 2024], [118780, "A", 2024]], ["Polli", [78533923000, "E", 2024], [11960588000, "E", 2024], [590905000, "A", 2024]], ["Tacchini", [504128000, "A", 2024], [174171000, "A", 2024], [23961000, "A", 2024]], ["Anatre", [4227882000, "E", 2024], [173078000, "A", 2024], [1216000, "A", 2024]], ["Oche", [803201000, "E", 2024], [14985000, "E", 2024], [6000, "A", 2023]], ["Conigli", [604235000, "E", 2024], [84746000, "E", 2024], [14509000, "A", 2023]], ["Cavalli", [4451641, "E", 2024], [454828, "E", 2024], [22209, "A", 2024]]];
    /* S: serie annuali 1961-2024 per specie e area (null = dato assente); F: flag per anno (A ufficiale, E stima, - assente) */
    var S={"Bovini":{"W":[172941542,184291677,193869838,191768897,191603596,196721238,204646684,211048784,211674513,210489844,204347570,203945936,203867888,216913183,232884732,243425742,243947176,245387215,237239600,235205573,237345205,238772599,240866111,246682858,247193299,253847359,250974833,250029202,250347063,254755276,246281768,245006849,244833564,248271178,249893220,252137528,259119208,260627582,262492190,263519348,259662540,264681968,269203279,273001293,274884087,279758941,284569482,284909642,283002992,280856528,280076408,282311094,286387513,286273909,283239351,285403546,289854465,294619397,298711710,285721360,286943331,291311978,298177711,304744668],"E":[69005974,75803316,81743376,75822122,72579495,76170385,82968316,85051581,82697105,81399594,78884787,76297470,76998569,84087416,86763664,87166773,83836529,84345920,85450371,86375473,84547526,83842640,84014744,88830643,88193879,88049858,89375045,86376161,85169153,88767729,86952411,77708861,73280144,71210006,69174925,64897410,62847736,59538950,56271660,54526947,51562647,52565459,52559969,51127198,48038096,46736063,46210859,45605729,45000087,45111407,43534018,41851011,40935292,40915551,40637694,41078850,40652176,40675610,40068392,39606806,39381930,38620408,37589339,37842889],"I":[3901600,4122600,3807200,3213000,3349700,3945700,4271700,4575500,5016500,5186300,5125800,4809500,4917800,4969751,4509590,4625420,4775660,4679325,4980355,5120635,4902865,4790060,4862951,5128150,5186765,5097134,4972900,4915035,4870590,4881515,4952740,5064730,4860260,4752800,4729133,4629000,4610850,4408368,4490641,4425605,4258700,4332000,4209863,4197270,4077964,4045189,3960248,3822943,3811491,3830530,3559433,3409984,3007558,2511789,2629150,2750692,2561312,2768190,2729600,2694340,2774540,2797660,2541150,2607110]},"Bufalini":{"W":[7743998,7988885,8126010,8408479,8566176,8682884,8897674,9239026,9410656,9626442,9912469,10089687,10436783,10725174,10816197,11050462,11268971,11448182,11758403,11971663,12320359,13106928,13293716,13711912,14285865,14771292,14841146,16025267,15878160,16265642,16609657,17002753,17765110,18420702,19192845,17865084,19252854,19615368,20255001,20438518,20339021,20732989,20043481,20676206,21280006,22075600,22905559,23230555,24891182,25831980,26084025,26540821,26120402,26349313,26435291,26613041,26752009,27513586,27276237,27172123,27869060,28464588,28610566,29040868],"E":[80633,109400,99051,85610,77460,76628,59077,59535,55474,45990,41114,41023,40553,40541,36957,37887,36652,33369,30297,29882,25516,18853,17432,14752,14741,13604,12612,12809,11851,10628,11322,16404,15008,13881,9845,11800,12467,11018,8467,9802,6883,9460,7958,14051,30199,7072,19747,11771,28230,33216,58010,121207,60244,80812,87544,99811,94667,113598,108465,109364,113886,116894,106263,103613],"I":[1400,2400,2800,3000,3300,3300,3300,3500,3500,3700,4200,4500,5200,7249,8410,6580,6970,5745,7235,6915,9175,4260,3855,3670,4395,3956,4350,3885,3130,2845,2530,2480,2686,2202,3000,6304,7717,7430,5346,7446,5000,8131,5915,12880,27956,4622,18598,10516,26795,31654,56597,118653,57570,77988,82515,94860,89698,109311,104776,103566,107949,111799,102999,99830]},"Suini":{"W":[376334202,400583951,438282913,453679797,491699985,507104383,525590831,528894426,518370701,537183242,595036167,617749308,614740832,630804364,627314245,621676329,643601384,665104795,721661828,756280931,749193657,744691410,770624880,791165598,815476372,836556183,856263821,884914627,901793409,917393400,918759103,940970149,960537402,986314001,995116335,994495702,992747492,1050062093,1083622689,1095426826,1096718995,1127390645,1166455573,1179075771,1191496329,1221860055,1256151949,1289323100,1310674953,1373806870,1378519612,1417844640,1442799056,1460692661,1476637578,1471016382,1478003045,1476565156,1332579293,1319184248,1472869881,1496428680,1513463182,1493796985],"E":[190191511,198832514,198147150,184316020,212255615,211816444,216222495,217641393,211477493,220959308,242137630,254837799,254505785,268043390,279311928,259428982,271614797,290970742,299644445,305976643,307176360,305686122,313551335,319739465,319506542,327511322,335631042,341924820,339245381,337971855,325645694,307753674,309875090,300542634,292391676,294758451,284758103,298542378,304233038,295343073,285020015,289867368,294812706,289910557,286965283,291664106,304859269,302622699,298670724,307922767,314308319,308109237,309496332,311863248,318151143,325516554,323897189,327283708,325399958,327560616,332357233,320080563,304155342,303209683],"I":[3901000,3832000,3566000,4520000,4649000,4178000,4437000,5224000,5289000,6383000,6933000,7142000,7245000,7605000,8170000,8388000,9169410,9621190,10041020,10284820,10534940,10541900,10951700,11447410,11228870,11072610,11443600,11737020,11971760,12133720,12189340,12258610,12241243,12732800,11991920,11943900,12163800,12570750,12992000,12920500,13153100,13275500,13558318,13583176,13010294,13380006,13595605,13616438,13593772,13764351,13097493,13377139,13098673,10930709,11304236,11848037,11380546,11410440,11642620,10764870,11102370,10502600,10035650,10086260]},"Ovini":{"W":[330835564,341462940,344282144,345818500,341928746,353080784,354307452,361897533,359107325,367447298,372085128,372132771,361449440,347677465,363304630,356796679,359198719,366222284,362036477,384107419,401801398,403676562,414621956,414958201,423667667,421003776,431554672,441209800,456671507,464990297,451919632,448987417,447433307,453014743,457609690,443941650,448419223,459443747,462330198,475321111,481086851,485439872,492533242,491113877,503533792,519654398,529323748,526086824,516138815,518479854,514128633,520124669,543361210,559474982,565849017,576471181,595130805,602227575,616100710,642818861,668278516,690589161,713905326,703861354],"E":[130654812,136304084,139496006,139332122,131403777,136200062,134953218,130070926,127225933,128413241,127334060,125093175,125053002,129581835,134720820,124383169,122925186,125832883,125938452,133017939,131632932,134653547,137877757,141635051,141433388,144071462,145525423,151732470,157875222,162435727,157395804,120019546,120179943,113197224,109050121,105491496,97213327,97251793,93744637,92413306,84791506,84834710,86550920,86491287,87100739,86502015,85509677,82128678,79150532,76656064,76352585,74558522,73645148,70980800,69887593,71310636,69937847,69142436,68978232,67187038,66251717,65973169,63987426,59392730],"I":[4276000,4505000,4301000,4315000,4159000,4576000,4892000,5074000,5448064,6052887,6477900,6198000,5709000,5379000,5542000,5475000,6502400,6412200,6934700,7293235,7083870,6980405,8390685,7543945,7640585,7484965,7757720,7984860,8601200,9004680,9076270,9119100,8390685,8053030,7959800,7950000,7652270,7414540,7389849,6997113,6665723,6347553,6304000,6612218,6488723,6569787,6561170,6189767,6145343,5707505,5271255,5089609,3031165,2517387,2764989,2937007,2852682,2759500,2814860,2846120,2762450,2780150,2645880,2030540]},"Caprini":{"W":[102891045,104599399,105212726,106656915,108952198,111454323,112765208,114653615,117233384,118784104,122078134,125227351,128235140,130801557,135948127,138196249,142386285,148694256,152644160,156677108,162033493,164026370,170487493,175066434,180702469,186217427,202238652,208195384,219738211,228829934,227919399,236521423,240584996,248271271,266149943,259577663,275975344,292246991,308021063,308042860,310752734,312452854,328936444,351239520,362626641,362854556,368576330,380369418,399463516,409745714,414464793,418093197,449981643,465231526,477699818,493713978,484914248,494799605,515608355,524338707,534861387,549690111,565352521,563722557],"E":[12524644,12336609,12377331,11593661,11276624,10640686,10848708,11073331,11499033,11020254,10831057,10580436,10525017,10937883,11153656,11072183,11430322,11827224,10545130,10996998,11149180,11143387,11130069,12223429,12071884,11535794,12757310,12478179,11935392,13842689,12189445,12351133,12934961,13216454,13013783,13244985,12953955,12981635,12879228,13334879,13111229,13413318,13310000,13280627,12872511,12538218,12785336,12029931,12111274,12455830,12155299,11744745,11367450,9301070,8809476,8932175,8476089,8460999,8436856,7997120,7937268,7674415,7420756,6486382],"I":[594000,574000,509000,494000,463000,526000,506000,530000,565588,535113,560100,492000,464000,396000,393000,445000,673000,669600,698400,688585,607940,546465,510656,503545,478105,474175,438480,482180,524810,557390,552960,536030,510656,500000,513000,411000,453000,391293,423767,452900,504000,587800,414000,414896,360082,329095,321717,310952,277391,280412,241781,262791,137456,132751,158806,141903,131654,129220,152940,151510,150840,150230,172080,118780]},"Polli":{"W":[6577111000,6852797000,7219168000,7494365000,8119314000,8276598000,9158117000,9473743000,10157365000,11033162000,11389255000,12168049000,12703582000,13189074000,13381722000,14285931000,15192622000,16214210000,17451282000,18391395000,19352411000,20021114000,20480016000,20860399000,21773906000,22868225000,24545053000,25490207000,25862181000,27184043000,28221635000,29310400000,30768619000,32084345000,34092761000,34967132000,36350330000,37084374000,38952436000,40489593000,41958161000,43589792000,44271185000,45188945000,47372642000,48204689000,51078884000,53486667000,55371275000,56604961000,58222473000,59392661000,60351084000,61854419000,64003607000,65553177000,68773931000,70105351000,72329757000,73091007000,73745518000,75444696000,76951157000,78533923000],"E":[2168327000,2324115000,2467874000,2536674000,2761350000,2873531000,3032440000,3145802000,3421104000,3861253000,4023487000,4356835000,4671271000,4866847000,5050720000,5239682000,5682991000,5946242000,6205633000,6430190000,6793692000,6951680000,6919609000,7020296000,7161977000,7452373000,7801287000,7968649000,7858129000,7859370000,7494788000,6841051000,6586019000,6451539000,6403432000,6454322000,6404873000,6696986000,6757494000,6703689000,6991557000,7096414000,6905149000,7033829000,7326857000,7301675000,7765055000,8087657000,8621538000,8904406000,9237337000,9697318000,10084765000,10362566000,10747760000,10860653000,11079540000,11442631000,11547727000,11586539000,11362299000,11370988000,11648103000,11960588000],"I":[205000000,244000000,285000000,342000000,408000000,420000000,405000000,406700000,413000000,432000000,418000000,445000000,493000000,507000000,485000000,482000000,487000000,508000000,520000000,530300000,525400000,524900000,510300000,490800000,474200000,477500000,504000000,507500000,521300000,522700000,520000000,526000000,532000000,515000000,500000000,515000000,501400000,492800000,509000000,490000000,510000000,470000000,413105000,416420000,408714000,372190000,435817000,463996000,481091000,491482000,506506000,517833000,504321000,508864000,533817000,554237000,549262000,534307000,569767000,573846000,581805000,534144000,564465000,590905000]},"Tacchini":{"W":[141620000,128645000,133740000,141732000,151287000,168748000,182955000,169116000,172886000,193835000,209791000,228044000,250845000,263884000,251358000,276844000,282915000,293897000,325608000,349032000,355747000,359124000,376678000,372008000,391563000,427338000,478815000,485448000,513814000,558279000,560466000,579432000,578089000,593904000,622663000,636126000,640941000,630784000,618453000,643882000,646965000,652114000,625650000,617738000,610448000,598746000,629947000,638177000,604030000,588838000,592806000,618085000,589305000,594129000,599941000,624346000,611764000,576657000,567414000,563405000,540380000,522815000,521829000,504128000],"E":[22848000,22618000,24025000,25097000,26425000,30941000,34985000,38222000,42426000,49449000,56886000,63804000,80884000,84751000,81209000,90826000,100752000,107785000,122234000,130332000,128504000,136556000,144715000,140340000,146998000,160560000,171211000,179187000,192396000,213399000,211731000,222571000,224669000,234219000,256362000,260409000,265060000,270747000,262254000,269490000,274383000,275241000,247899000,248811000,236543000,218911000,227542000,226678000,220620000,215098000,215416000,219724000,209127000,215247000,222462000,230506000,219154000,206545000,207591000,210936000,193219000,183539000,177894000,174171000],"I":[1650000,1780000,2140000,2140000,2600000,3100000,3570000,4170000,5000000,7700000,13100000,15500000,18500000,19500000,20200000,20700000,22000000,23200000,24400000,26800000,27000000,28000000,30000000,28500000,27600000,28200000,28800000,29800000,30500000,33200000,32500000,32000000,31600000,32000000,35000000,36000000,34995000,36614000,35200000,33700000,35000000,45000000,28104000,28105000,29621000,26797000,27721000,29959000,29216000,28284000,28733000,30351000,29232000,29894000,30292000,30944000,28489000,27767000,28536000,29431000,27474000,20455000,23828000,23961000]},"Anatre":{"W":[226713000,235197000,250608000,258949000,272838000,283829000,293365000,304553000,315310000,336631000,350875000,358449000,373609000,386389000,381434000,396430000,416215000,441339000,479383000,479245000,502921000,523895000,545569000,560407000,583083000,629610000,687256000,730986000,749728000,812102000,915671000,1008941000,1176906000,1280874000,1436374000,1495920000,1610422000,1734023000,2039147000,1956680000,2020011000,1986342000,2063769000,2096025000,2279127000,2263059000,2426883000,2563351000,2586034000,2673345000,2772860000,2890278000,2870069000,2807726000,2925887000,2988500000,3086368000,3159924000,3218234000,3604773000,3793121000,4109226000,4173312000,4227882000],"E":[40270000,40178000,41120000,44470000,48929000,50326000,55420000,58252000,60748000,73047000,78272000,71344000,68992000,67891000,67193000,63801000,69466000,72231000,81498000,69871000,74891000,71572000,77695000,85513000,86831000,87893000,90186000,95451000,101651000,104628000,108061000,137359000,134982000,137686000,138882000,146359000,153320000,161237000,169427000,160088000,168032000,172381000,177137000,166599000,180012000,169610000,181501000,177569000,176250000,173583000,177781000,181563000,177552000,184205000,185417000,173175000,170522000,203849000,200371000,173808000,171222000,138750000,157158000,173078000],"I":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1382000,1479000,805000,714000,1196000,1000000,1154000,1216000]},"Oche":{"W":[44488000,46795000,46957000,49962000,54319000,56055000,60017000,64517000,63131000,67737000,74618000,69637000,71101000,70990000,74563000,73413000,75473000,80459000,82214000,83536000,86164000,90307000,93742000,95548000,95260000,106267000,118422000,151673000,158217000,179602000,216156000,234131000,260947000,276928000,380611000,389129000,423250000,460072000,476404000,484062000,482124000,470781000,488073000,495365000,530756000,524644000,575381000,589671000,622261000,635652000,655334000,697428000,688562000,699482000,643351000,662238000,699919000,752220000,750146000,768683000,781204000,781846000,798583000,803201000],"E":[18204000,18430000,16399000,17098000,19087000,18629000,20523000,22756000,19192000,21371000,26105000,18915000,17889000,15950000,17310000,14478000,14642000,16923000,16390000,16331000,16803000,17334000,17284000,16943000,15255000,16612000,16350000,16760000,17781000,20922000,17387000,29266000,26811000,26208000,30533000,29922000,27149000,26205000,28005000,28568000,25985000,27019000,28913000,27958000,28108000,20595000,20945000,19760000,18621000,16749000,18552000,20450000,19975000,19004000,19009000,19033000,17009000,20338000,14915000,20841000,18402000,17244000,22282000,14985000],"I":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,16000,21000,20000,16000,24000,25000,14000,19000,29000,19000,23000,16000,18000,17000,19000,19000,14000,7000,5000,4000,4000,6000,null]},"Conigli":{"W":[271336000,270866000,274420000,276557000,280891000,289911000,298260000,311902000,324310000,333175000,362969000,384273000,400651000,427283000,444813000,467674000,495767000,497078000,503963000,496627000,493321000,498315000,510206000,518665000,524350000,536578000,565185000,577021000,539531000,538531000,437278000,460783000,472802000,494221000,515017000,560149000,529678000,552588000,547691000,608383000,669446000,684860000,689272000,684775000,724576000,749754000,794987000,763355000,777406000,814440000,840179000,841561000,871311000,890613000,893544000,780138000,670514000,652253000,658169000,605030000,586660000,613822000,605380000,604235000],"E":[243856000,242472000,243481000,243878000,247016000,254178000,256780000,267246000,278894000,289063000,314725000,335083000,349551000,377095000,386267000,406198000,431666000,428031000,430096000,417232000,411942000,412318000,420705000,422115000,423211000,421695000,430860000,431451000,396120000,399200000,287166000,256462000,254488000,242495000,238738000,246668000,237875000,240507000,222256000,223484000,224848000,227901000,214853000,187029000,185416000,182598000,184237000,167012000,157581000,159379000,161469000,159194000,158499000,159321000,153341000,145187000,138901000,121901000,118222000,106577000,102400000,92968000,86949000,84746000],"I":[32580000,35280000,37800000,39000000,42000000,45600000,47520000,49320000,52200000,56520000,61080000,68400000,72840000,80520000,83520000,84120000,94130000,101500000,109800000,116700000,119300000,119000000,118000000,119400000,121700000,122900000,125100000,130700000,124000000,122700000,36240000,35638000,35038000,34440000,33844000,33250000,32658000,32068000,31481000,30895000,30311000,30000000,28103000,27442000,28765000,28390000,29134000,28081000,27013000,25871000,24983000,23600000,23800000,24200000,21291000,20881000,18983000,15858000,16573000,16501000,16006000,14731000,14509000,null]},"Cavalli":{"W":[3070964,3011027,3004979,3171073,3042180,2970305,2929556,3049182,3074561,3066567,3032460,3050209,3091764,2818583,2940337,3174995,3114395,3202272,3108438,2865611,2840700,2659156,2617700,2722388,2750526,2650492,2740882,2755635,2809530,2867713,2947393,3944922,3672160,4089308,4251825,4690539,4632735,4552776,4685394,4746746,4956383,4777901,4789554,4782114,4750571,4705539,4548429,4494249,4512516,4412811,4534242,4640087,4543408,4618843,4440246,4421318,4205513,4318787,4454567,4927026,4527209,4681139,4575765,4451641],"E":[1302806,1213218,1127898,1119887,1034297,938428,859650,885305,940979,946368,913339,874118,741963,697673,754269,806278,832350,818332,790229,732153,664528,633752,648769,673541,692042,610498,580768,536332,520235,501110,434968,882910,864675,831095,839261,851560,915694,892142,824285,817394,879260,767735,743731,770073,688473,672342,601456,590502,588164,617821,590450,625798,585708,565597,539343,553983,529543,479561,475576,481632,460788,448878,456005,454828],"I":[283000,301000,285000,258039,243668,244654,239800,256000,294800,316000,321000,350000,302000,268000,301000,310000,308960,319830,313210,281930,260510,231830,239400,255570,272150,262550,257110,252330,258380,259400,259330,275815,275607,268405,260522,248000,240044,227180,227323,234900,280500,198900,191000,199488,136213,165797,98921,97648,84063,67005,62237,72387,53234,42482,35368,42793,26780,19008,22575,18609,19647,19731,18984,22209]}},F={"Bovini":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAEEEEEEEEAAAAEEEEEEEEEEEEEEEAEEEE","E":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","I":"EEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"Bufalini":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAEEEEEE","E":"EEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAEAEEEAAAAAAAAAAAAAAAAAAAAAAAAAAA","I":"EEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"Suini":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAEEAAAAAAAAAAAAAAA","E":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","I":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"Ovini":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAEEEEE","E":"AAAAAAAAAAAAAAAAAAAAAAAAAAEEEAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","I":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"Caprini":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAEEEEE","E":"EEEEEEEEEEEEEEEAEEEEEEEEAEEEEAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","I":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"Polli":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAEEAAEEEEEEEEEEEEEEEE","E":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAE","I":"EEEEEEEEEEEEEEEEEEEEEEEEEEEAAAEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAA"},"Tacchini":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","E":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAEEAAEEEEAAAAAAAAAAAAAAA","I":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAA"},"Anatre":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE","E":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAEEEEEEEEEEAAAAEEEAAAAAAAAAAAAAAAA","I":"--------------------------------------------------------AAAAAAAA"},"Oche":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE","E":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAEEEEEEEEEEEEEEEEEEEEAAAEEAAAEEEEE","I":"-----------------------------------------AAAAAAAAAAAAAAAAAAAAAA-"},"Conigli":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAEEEEEEAAAAAAAAAAEAAAEAAAEEEEE","E":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAEAEEAAAAAAAAAAAAAAAAAAAAAAAE","I":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAAEEEEEEEEAAAAAAAAA-"},"Cavalli":{"W":"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAAEAEAEEEEEEAAEEEEE","E":"EAAAAAAAAAAAAAAAAAAAAAAAAAAAEEAEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAEE","I":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAA"}},Y0=1961;
    var ICO={Bovini:'i-cow',Bufalini:'i-buf',Suini:'i-pig',Ovini:'i-sheep',Caprini:'i-goat',Polli:'i-hen',Tacchini:'i-turkey',Anatre:'i-bird',Oche:'i-bird',Conigli:'i-rabbit',Cavalli:'i-horse'};
    var AR={W:'Mondo',E:'Europa',I:'Italia'};
    function it(n,d){return n.toLocaleString('it-IT',{minimumFractionDigits:d||0,maximumFractionDigits:d||0})}
    function big(n){
      if(n>=1e9)return it(n/1e9,2)+' miliardi';
      if(n>=1e6)return it(n/1e6,n>=1e8?0:1)+' milioni';
      return it(n);
    }
    function cnt(n,pl){return n>=1e6?big(n)+' di '+pl:big(n)+' '+pl}
    function pct(a,b){var p=a/b*100;return p<0.1?'meno dello 0,1%':it(p,1)+'%'}
    function short(n){
      if(n>=1e9)return it(n/1e9,n/1e9%1?1:0)+' mld';
      if(n>=1e6)return it(n/1e6,n/1e6%1?1:0)+' mln';
      if(n>=1e3)return it(n/1e3,0)+' mila';
      return it(n);
    }
    function pg(id,n,partial,label){
      var s='<div class="pgrid" style="max-width:260px" role="img" aria-label="'+label+'">';
      for(var k=0;k<100;k++){var on=k<n;s+='<svg class="ic'+(on?' on':'')+'" viewBox="0 0 24 24" aria-hidden="true"'+(on&&partial?' style="fill-opacity:.4"':'')+'><use href="#'+id+'"/></svg>'}
      return s+'</div>';
    }
    var h='<div id="mac" class="lv2"><header style="display:grid;gap:8px"><span class="eyebrow">Approfondimento</span><h1 style="font-size:clamp(2.2rem,11vw,3.4rem)">Animali macellati: Italia, Europa e mondo</h1></header>';
    h+=edHero('mac2',{v:'band',n:'78,5 miliardi',t:'polli macellati nel mondo nel 2024.',s:'FAO, FAOSTAT, stima FAO'});
    h+='<p class="note read">Questa pagina riporta numeri di animali macellati. Per leggere solo l\'essenziale scegli «Facile».</p>';
    h+='<div class="ichips" role="group" aria-label="Livello di lettura"><button type="button" data-lv="1" aria-pressed="false">Facile</button><button type="button" data-lv="2" aria-pressed="true">Spiegato</button><button type="button" data-lv="3" aria-pressed="false">Dati</button></div>';
    h+='<div class="stats"><div><b>78,5 miliardi</b><span>polli macellati nel mondo nel 2024 (stima FAO)</span></div><div><b>1,49 miliardi</b><span>suini macellati nel mondo nel 2024 (valore ufficiale FAO)</span></div><div><b>305 milioni</b><span>bovini macellati nel mondo nel 2024 (stima FAO)</span></div></div>';
    h+='<p class="note read">Fonte: FAO, FAOSTAT, animali macellati per la carne, anno 2024. Ogni specie è un conteggio a sé: le specie non vengono sommate.</p>';
    D.forEach(function(r){
      var w=r[1],e=r[2],i=r[3],pl=r[0].toLowerCase(),id=ICO[r[0]],same=(!i[2]||i[2]===2024),yr=i[2]||2024;
      h+='<section style="display:grid;gap:10px"><h2 style="display:flex;gap:10px;align-items:center"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true" style="width:40px;height:40px;flex:none"><use href="#'+id+'"/></svg>'+esc(r[0])+'</h2>';
      h+='<p class="read">In Italia ('+yr+') sono stati macellati circa '+cnt(i[0],pl)+'. Nel mondo (2024), circa '+cnt(w[0],pl)+'.</p>';
      if(same){
        var sh=i[0]/w[0]*100,n=Math.round(sh),part=(n===0);if(part)n=1;
        h+=pg(id,n,part,'Su 100 '+pl+' macellati nel mondo, '+(part?'meno di 1':'circa '+n)+' in Italia');
        h+='<p class="note">Ogni icona è 1 animale ogni 100 macellati nel mondo. In Italia: '+(part?'meno di 1 su 100':n+' su 100')+'. Calcolo su dati FAO.</p>';
      }else h+='<p class="note">Il dato italiano è del '+yr+', quindi non si calcola la quota sul mondo.</p>';
      h+='<div class="l2 bars">';
      [['Mondo',w],['Europa',e],['Italia',i]].forEach(function(x){
        var v=x[1],y=(v[2]&&v[2]!==2024)?' '+v[2]:'';
        h+='<div class="bar"><div class="lab"><span>'+x[0]+y+' · '+(v[1]==='A'?'ufficiale':'stima')+'</span><b>'+big(v[0])+'</b></div><div class="track"><div class="fill'+(v[1]==='A'?'':' dash')+'" style="width:'+Math.max(v[0]/w[0]*100,1).toFixed(1)+'%"></div></div></div>';
      });
      h+='</div>';
      h+='<p class="note l2">Le barre sono confrontate con il mondo, nella stessa specie.'+(same?' L\'Italia è '+pct(i[0],w[0])+' del totale mondiale.':'')+'</p>';
      h+='<dl class="l3"><dt>Mondo</dt><dd>'+(w[1]==='A'?'valore ufficiale FAO':'stima FAO')+', '+it(w[0])+' capi</dd><dt>Europa</dt><dd>'+(e[1]==='A'?'valore ufficiale FAO':'stima FAO')+', '+it(e[0])+' capi</dd><dt>Italia '+yr+'</dt><dd>'+(i[1]==='A'?'valore ufficiale FAO':'stima FAO')+', '+it(i[0])+' capi</dd></dl>';
      h+='</section>';
    });
    h+='<section class="l2" style="display:grid;gap:12px"><h2>Come cambia nel tempo</h2><p class="note read">Scegli la specie e l\'area. L\'asse parte da zero. Linea piena: valori ufficiali. Linea tratteggiata: stime FAO.</p>';
    h+='<div class="ichips" id="macSp" role="group" aria-label="Specie">'+D.map(function(r){return '<button type="button" data-sp="'+r[0]+'" aria-pressed="'+(r[0]===macSp)+'">'+r[0]+'</button>'}).join('')+'</div>';
    h+='<div class="ichips" id="macAr" role="group" aria-label="Area">'+['W','E','I'].map(function(a){return '<button type="button" data-ar="'+a+'" aria-pressed="'+(a===macAr)+'">'+AR[a]+'</button>'}).join('')+'</div>';
    h+='<div id="macChart"></div><p id="macSum" class="read" aria-live="polite"></p><details class="fil"><summary>Tabella dei dati</summary><div class="tablewrap" id="macTab" style="padding:0 16px 14px"></div></details></section>';
    h+='<section class="l2 prose"><h2>Una cifra per capire</h2><p>Nel mondo, nel 2024, i polli macellati sono oltre 50 volte i suini (78,53 miliardi contro 1,49 miliardi). Il rapporto è un calcolo su dati FAO. Conta il numero di animali, non il peso della carne.</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>Parole difficili</h2>'+
      [['Macellare','Uccidere un animale per ricavarne carne e altri prodotti.'],['Capo','Un singolo animale.'],['FAO','L\'organizzazione delle Nazioni Unite per l\'alimentazione e l\'agricoltura.'],['Valore ufficiale','Un numero che la FAO registra come ufficiale per quel Paese e quell\'anno.'],['Stima','Un numero non misurato direttamente, ma stimato. Può cambiare quando la FAO rivede i dati.'],['Europa (FAO)','I Paesi che la FAO include nella regione Europa. Non coincide con l\'Unione europea.']].map(function(t){return '<details class="fil"><summary>'+esc(t[0])+'</summary><div><p>'+esc(t[1])+'</p></div></details>'}).join('')+'</section>';
    h+='<section class="l2" style="display:grid;gap:10px"><h2>Che cosa non dicono questi numeri</h2>'+
      '<details class="fil"><summary>Apri l\'elenco</summary><div><ul class="prose"><li>Non dicono quanti animali vivono: contano solo quelli macellati in un anno.</li><li>Non dicono quanta carne si ottiene: un pollo e un bovino hanno pesi molto diversi.</li><li>Non confrontano specie diverse tra loro: ogni specie ha la sua scala.</li><li>Non comprendono pesci e molluschi, né i pulcini maschi eliminati alla schiusa.</li><li>Non spiegano perché i numeri cambiano nel tempo.</li></ul></div></details>'+
      '<details class="fil"><summary>Perché si contano gli animali</summary><div><p>Il numero di animali mostra quanti individui sono coinvolti, mentre il peso della carne nasconde la differenza tra specie piccole e grandi. Il peso è un altro indicatore e qui non è mostrato.</p></div></details></section>';
    h+='<section class="l3 prose"><h2>Limiti</h2><ul><li>«Europa» è la regione FAO, non l\'UE.</li><li>Per il mondo molte specie sono stime FAO, non valori ufficiali dei Paesi.</li><li>La FAO rivede i dati negli anni: per il 2021 l\'articolo di Our World in Data (2023) riporta 331,95 milioni di bovini nel mondo, mentre il file FAOSTAT scaricato il 9/11/2026 ne riporta 286,94 milioni. Qui si usa il file più recente.</li><li>Italia: conigli e oche sono dati 2023, perché il 2024 non è nel file.</li><li>Asini, muli, cammelli e selvaggina non sono mostrati.</li><li>I numeri dell\'Italia in questa pagina non coincidono con quelli della home, che usa i dati ISTAT da agosto 2025 a luglio 2026 (bovini 2.402.197; polli e galline 636.574.567). Periodo e perimetro sono diversi: per l\'Italia valgono i dati ISTAT della home.</li><li>Il dato FAO sui polli non è stato verificato per distinguere polli da carne e galline a fine ciclo.</li></ul></section>';
    h+='<p class="note read">Fonti: FAO, FAOSTAT, QCL, <a href="https://www.fao.org/faostat/en/#data/QCL" target="_blank" rel="noopener">fao.org/faostat</a>; Our World in Data, <a href="https://ourworldindata.org/how-many-animals-get-slaughtered-every-day" target="_blank" rel="noopener">How many animals get slaughtered every day?</a> (Max Roser, 2023, CC BY 4.0) e <a href="https://ourworldindata.org/explorers/animal-welfare?Metric=Animals+slaughtered&amp;Animal=All+land+animals&amp;Per+capita=false&amp;country=OWID_WRL~USA~CHN~IND~BRA~GBR~ESP" target="_blank" rel="noopener">Animal Welfare Data Explorer</a>. Si veda <a href="#info">Info e fonti</a>.</p></div>';
    app.innerHTML=h;cur=null;

    /* livelli di lettura */
    var root=document.getElementById('mac');
    root.querySelectorAll('button[data-lv]').forEach(function(b){b.addEventListener('click',function(){
      root.className='lv'+b.getAttribute('data-lv');
      root.querySelectorAll('button[data-lv]').forEach(function(o){o.setAttribute('aria-pressed',o===b)});
    })});

    /* curva */
    function nice(m){var p=Math.pow(10,Math.floor(Math.log(m)/Math.LN10)),x=m/p;return (x<=1?1:x<=2?2:x<=2.5?2.5:x<=5?5:10)*p}
    function draw(){
      var v=S[macSp][macAr],fl=F[macSp][macAr],W=360,H=240,L=46,R=12,T=14,B=26,pw=W-L-R,ph=H-T-B,n=v.length;
      var mx=0,first=-1,last=-1;
      v.forEach(function(x,k){if(x!=null){if(x>mx)mx=x;if(first<0)first=k;last=k}});
      var top=nice(mx||1);
      function X(k){return L+k/(n-1)*pw}
      function Yv(x){return T+ph-x/top*ph}
      var s='<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:640px;height:auto;display:block;font-family:var(--mono)" role="img" aria-label="Animali macellati, '+macSp.toLowerCase()+', '+AR[macAr]+', dal '+(Y0+first)+' al '+(Y0+last)+'">';
      for(var g=0;g<=4;g++){var yy=T+ph-g/4*ph;s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+yy+'" y2="'+yy+'" style="stroke:var(--line)" stroke-width="1"/><text x="'+(L-5)+'" y="'+yy+'" text-anchor="end" dominant-baseline="central" font-size="9" style="fill:var(--muted)">'+(g===0?'0':short(top*g/4))+'</text>'}
      [1961,1980,2000,2024].forEach(function(yr){var k=yr-Y0;s+='<text x="'+X(k)+'" y="'+(H-8)+'" text-anchor="'+(k===0?'start':k===n-1?'end':'middle')+'" font-size="9" style="fill:var(--muted)">'+yr+'</text>'});
      var runs=[],run=null,prev=-1;
      for(var k=0;k<n;k++){
        if(v[k]==null){run=null;prev=-1;continue}
        var t=fl.charAt(k)==='A'?'A':'E';
        if(!run||run.t!==t){var nr={t:t,p:[]};if(run&&prev===k-1)nr.p.push(prev);run=nr;runs.push(run)}
        run.p.push(k);prev=k;
      }
      runs.forEach(function(r){
        var d=r.p.map(function(k,j){return (j?'L':'M')+X(k).toFixed(1)+','+Yv(v[k]).toFixed(1)}).join('');
        if(r.p.length===1){s+='<circle cx="'+X(r.p[0]).toFixed(1)+'" cy="'+Yv(v[r.p[0]]).toFixed(1)+'" r="2" style="fill:var(--terra)"/>'}
        else s+='<path d="'+d+'" fill="none" style="stroke:var(--terra)" stroke-width="2.2" stroke-linejoin="round"'+(r.t==='E'?' stroke-dasharray="5 3"':'')+'/>';
      });
      s+='<circle cx="'+X(last).toFixed(1)+'" cy="'+Yv(v[last]).toFixed(1)+'" r="3.5" style="fill:var(--terra)"/><text x="'+(X(last)-6).toFixed(1)+'" y="'+Math.max(Yv(v[last])-9,10).toFixed(1)+'" text-anchor="end" font-size="10" font-weight="700" style="fill:var(--fg)">'+big(v[last])+'</text></svg>';
      document.getElementById('macChart').innerHTML=s;
      var a=v[first],b=v[last],txt='Nel '+(Y0+first)+' ('+AR[macAr]+'): '+cnt(a,macSp.toLowerCase())+'. Nel '+(Y0+last)+': '+cnt(b,macSp.toLowerCase())+'. ';
      var q=b/a;txt+=q>=1.5?'In questo periodo il numero è cresciuto di circa '+it(q,1)+' volte.':q<=0.67?'In questo periodo il numero è sceso del '+it((1-q)*100,0)+'%.':'In questo periodo il numero è cambiato di poco.';
      txt+=' Calcolo su dati FAO.';
      document.getElementById('macSum').textContent=txt;
      var rows=[];for(var y=Y0;y<=Y0+n-1;y+=5)rows.push(y-Y0);if(rows[rows.length-1]!==last)rows.push(last);
      document.getElementById('macTab').innerHTML='<table><thead><tr><th>Anno</th><th>Animali macellati</th><th>Tipo di dato</th></tr></thead><tbody>'+rows.map(function(k){var x=v[k];return '<tr><td data-label="Anno">'+(Y0+k)+'</td><td data-label="Animali macellati">'+(x==null?'non presente':it(x))+'</td><td data-label="Tipo di dato">'+(x==null?'—':fl.charAt(k)==='A'?'ufficiale':'stima')+'</td></tr>'}).join('')+'</tbody></table>';
    }
    document.querySelectorAll('#macSp button').forEach(function(b){b.addEventListener('click',function(){macSp=b.getAttribute('data-sp');document.querySelectorAll('#macSp button').forEach(function(o){o.setAttribute('aria-pressed',o===b)});draw()})});
    document.querySelectorAll('#macAr button').forEach(function(b){b.addEventListener('click',function(){macAr=b.getAttribute('data-ar');document.querySelectorAll('#macAr button').forEach(function(o){o.setAttribute('aria-pressed',o===b)});draw()})});
    draw();
  }

  function renderInfo(){
    var h='<h1>Info e fonti</h1><section class="prose"><p>Valore Zer0 mostra quanti animali allevati in Italia vengono uccisi per mano umana, con il ritmo medio di 12 mesi di dati. Ogni pagina indica se il dato è ufficiale, riportato da terzi, di un\'associazione, una stima o un dato di massa.</p>'+
      '<p class="note">I dati ISTAT di macellazione usati sono i capi macellati da agosto 2025 a luglio 2026 (365 giorni, 31.536.000 secondi). I mesi più recenti possono essere rivisti da ISTAT. Pesci e molluschi sono dati 2023 in peso. Le percentuali e i confronti per cittadino si calcolano su 58.943.000 residenti (ISTAT, 1° gennaio 2026, provvisorio).</p></section>';
    h+='<section style="display:grid;gap:10px"><h2>Fonti</h2><div class="tablewrap"><table><thead><tr><th>Fonte</th><th>Uso</th><th>Livello</th></tr></thead><tbody>'+
      SOURCES.map(function(s){return '<tr><td data-label="Fonte"><a href="'+s[3]+'" target="_blank" rel="noopener">'+esc(s[0])+'</a></td><td data-label="Uso">'+esc(s[1])+'</td><td data-label="Livello">'+esc(s[2])+'</td></tr>'}).join('')+'</tbody></table></div></section>';
    h+='<p class="note read">Dati consultati tra il 15 e il 18/10/2026. I siti ISTAT e ISMEA non erano raggiungibili dagli strumenti di ricerca: i file ISTAT e ISMEA sono stati forniti dall\'utente. Prima di usare il sito in aula si consiglia di confermare le cifre sulle tabelle primarie.</p>';
    app.innerHTML=h;cur=null;
  }

  /* ---------- menu ---------- */
  var drawer=document.getElementById('drawer'),scrim=document.getElementById('scrim'),burger=document.getElementById('burger');
  function buildDrawer(active){
    var h='<div class="dh"><b style="color:var(--green)">Valore Zer0</b><button type="button" id="dclose" aria-label="Chiudi il menu">✕</button></div>';
    h+='<a href="#" '+(active===''?'aria-current="page"':'')+'>Home</a>';
    var cOpen=ITEMS.concat(NONE).some(function(x){return x.id===active});
    h+='<details class="ctr"'+(cOpen?' open':'')+'><summary>Contatori <small>animali, uno per specie</small></summary><div class="ctb">';
    GROUPS.forEach(function(g){
      var list=ITEMS.filter(function(it){return it.g===g[0]});
      var nl=g[0]==='altri'?NONE:[];
      if(!list.length&&!nl.length)return;
      var open=list.concat(nl).some(function(x){return x.id===active});
      h+='<details'+(open?' open':'')+'><summary>'+esc(g[1])+'</summary><div class="sub">';
      list.concat(nl).forEach(function(x){h+='<a href="#'+x.id+'" '+(x.id===active?'aria-current="page"':'')+'>'+esc(x.name)+'</a>'});
      h+='</div></details>';
    });
    h+='</div></details>';
    h+='<div class="pages"><p class="dl">Pagine e approfondimenti</p>';
    var PG=[['Il progetto',['cose','info','priv']],['Dati e numeri',['mac','vita','bio']],['Filiere e processi',['tra','mmm','str','proc','rit','fil']],['Cibo e ambiente',['ltt','diete','amb','ter','fr','nut']]];
    PG.forEach(function(g){var op=g[1].some(function(k){return PAGE_HASH[k]===active});h+='<details'+(op?' open':'')+'><summary>'+esc(g[0])+'</summary><div class="sub">';g[1].forEach(function(k){h+='<a href="#'+PAGE_HASH[k]+'" '+(PAGE_HASH[k]===active?'aria-current="page"':'')+'>'+esc(PAGES[k])+'</a>'});h+='</div></details>'});
    h+='<button type="button" id="dpause" aria-pressed="'+paused+'" style="margin-top:8px">'+(paused?'Riprendi i contatori':'Metti in pausa i contatori')+'</button></div>';
    var VR=window.vzRead||{s:{fs:0,hc:0,ls:0,hl:0}};
    h+='<div class="rd" role="group" aria-label="Modalità di lettura"><b>Lettura</b><div class="rdb"><button type="button" id="fsm" aria-label="Riduci il testo">A−</button><button type="button" id="fsp" aria-label="Ingrandisci il testo">A+</button><button type="button" id="rhc" aria-pressed="'+!!VR.s.hc+'">Contrasto alto</button><button type="button" id="rls" aria-pressed="'+!!VR.s.ls+'">Interlinea ampia</button><button type="button" id="rhl" aria-pressed="'+!!VR.s.hl+'">Carattere leggibile</button>'+(('speechSynthesis' in window)?'<button type="button" id="rsp" aria-pressed="false">Leggi la pagina</button>':'')+'</div></div>';
    drawer.innerHTML=h;
    document.getElementById('dclose').addEventListener('click',closeMenu);
    document.getElementById('dpause').addEventListener('click',function(){
      paused=!paused;this.setAttribute('aria-pressed',paused);this.textContent=paused?'Riprendi i contatori':'Metti in pausa i contatori';
    });
    (function(){var R=window.vzRead;if(!R)return;
      var fm=document.getElementById('fsm'),fp=document.getElementById('fsp'),hc=document.getElementById('rhc'),ls=document.getElementById('rls'),hl=document.getElementById('rhl'),sp=document.getElementById('rsp');
      function ref(){fm.disabled=R.s.fs<=0;fp.disabled=R.s.fs>=2}
      ref();
      fm.addEventListener('click',function(){R.set('fs',Math.max(0,R.s.fs-1));ref()});
      fp.addEventListener('click',function(){R.set('fs',Math.min(2,R.s.fs+1));ref()});
      hc.addEventListener('click',function(){R.set('hc',R.s.hc?0:1);hc.setAttribute('aria-pressed',!!R.s.hc)});
      ls.addEventListener('click',function(){R.set('ls',R.s.ls?0:1);ls.setAttribute('aria-pressed',!!R.s.ls)});
      hl.addEventListener('click',function(){R.set('hl',R.s.hl?0:1);hl.setAttribute('aria-pressed',!!R.s.hl)});
      if(sp)sp.addEventListener('click',function(){
        var ss=window.speechSynthesis;
        function off(){sp.setAttribute('aria-pressed','false');sp.textContent='Leggi la pagina'}
        if(sp.getAttribute('aria-pressed')==='true'){ss.cancel();off();return}
        var parts=(app.innerText||'').split(/\n+/).filter(function(x){return x.trim()}),k=0;
        sp.setAttribute('aria-pressed','true');sp.textContent='Ferma la lettura';
        function nx(){if(k>=parts.length||sp.getAttribute('aria-pressed')!=='true'){off();return}var u=new SpeechSynthesisUtterance(parts[k++]);u.lang='it-IT';u.onend=nx;u.onerror=off;ss.speak(u)}
        nx();
      });
    })();
    drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu)});
  }
  function openMenu(){drawer.hidden=false;scrim.hidden=false;burger.setAttribute('aria-expanded','true');var c=document.getElementById('dclose');if(c)c.focus()}
  function closeMenu(){drawer.hidden=true;scrim.hidden=true;burger.setAttribute('aria-expanded','false');burger.focus()}
  burger.addEventListener('click',function(){drawer.hidden?openMenu():closeMenu()});
  scrim.addEventListener('click',closeMenu);
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&!drawer.hidden)closeMenu();
    if(e.key==='Tab'&&!drawer.hidden){
      var f=drawer.querySelectorAll('a,button,summary');var a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
      else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}
    }
  });

  /* ---------- routing ---------- */
  /* ---------- il prezzo della tradizione: la vita di un agnello (storytelling orizzontale) ---------- */
  /* AGM[a01..a12] = {src,alt,kind:'foto'|'illustrazione'|'video',poster,credit,license}. Vuoto: ogni scena mostra la composizione tipografica.
     Un video si riproduce muto, in loop, solo nella scena attiva, con pulsante di pausa. */
  var AGM={
    a01:{src:"img/ag/a01.webp",alt:"Pecore in un ricovero di legno, con paglia a terra, vicine tra loro.",kind:"illustrazione",w:1600,h:1600},
    a02:{src:"img/ag/a02.webp",alt:"Due agnelli che corrono su un prato in collina.",kind:"illustrazione",w:1600,h:1600},
    a03:{src:"img/ag/a03.webp",alt:"Gruppo di pecore in un ricovero aperto con tetto in lamiera e travi di legno.",kind:"illustrazione",w:1600,h:1600},
    a04:{src:"img/ag/a04.webp",alt:"Primo piano dell'orecchio di una pecora con la marca auricolare gialla.",kind:"illustrazione",pos:"75% 50%",w:1600,h:1600},
    a05:{src:"img/ag/a05.webp",alt:"Una mano con guanto nero spruzza una linea rossa di vernice sul vello di una pecora.",kind:"illustrazione",pos:"50% 50%",w:1600,h:1600},
    a06:{src:"img/ag/a06.webp",alt:"Un agnello solo su un terreno brullo.",kind:"illustrazione",w:1600,h:1600},
    a07:{src:"img/ag/a07.webp",alt:"Pecore dietro le sbarre metalliche di un rimorchio per il trasporto di animali.",kind:"illustrazione",w:1600,h:1600},
    a08:{src:"img/ag/a08.webp",alt:"Pecore di spalle in un vano metallico con pavimento a griglia.",kind:"illustrazione",w:1600,h:1600},
    a09:{src:"img/ag/a09.webp",alt:"Locale piastrellato di un impianto, con binari e ganci metallici sul soffitto, senza animali.",kind:"illustrazione",w:1600,h:1600},
    a10:{src:"img/ag/a10.webp",alt:"Mezzene appese a ganci in una cella frigorifera.",kind:"illustrazione",w:1600,h:1600},
    a11:{src:"img/ag/a11.webp",alt:"Piatto di carne arrosto con verdure e pane su un tavolo di legno.",kind:"illustrazione",w:1600,h:1600},
    a12:{src:"img/ag/a12.webp",alt:"Una pecora sola in un campo, sotto un cielo coperto.",kind:"illustrazione",w:1600,h:1600}
  };
  var AG_BADGE={u:['Dato ufficiale','Dato da fonte istituzionale o da un testo normativo.'],p:['Pratica documentata','Pratica descritta da una fonte, che non vale per tutti gli allevamenti.'],g:['Informazione generale','Informazione di zootecnia di carattere generale: la fonte specifica non è ancora stata verificata in questa versione.']};
  var AG_L={
    dis:'<a href="https://www.arsial.it/wp-content/uploads/2025/06/AbbacchioRomanoIGP.pdf" target="_blank" rel="noopener">ARSIAL, Lazio Patrimonio Agroalimentare: Abbacchio Romano IGP</a>',
    sar:'<a href="https://win.spaghettitaliani.com/Disciplinari/AS-IGP.pdf" target="_blank" rel="noopener">Disciplinare dell\'Agnello di Sardegna IGP (copia su win.spaghettitaliani.com)</a>',
    cit:'<a href="https://www.arsial.it/wp-content/uploads/2025/06/Agnello_del_CentroItaliaIGP.pdf" target="_blank" rel="noopener">ARSIAL: Agnello del Centro Italia IGP</a>',
    tra:'<a href="https://eur-lex.europa.eu/IT/legal-content/summary/eu-rules-on-the-protection-of-animals-during-transport.html" target="_blank" rel="noopener">EUR-Lex, sintesi: protezione degli animali durante il trasporto (Reg. CE 1/2005)</a>',
    ab:'<a href="https://www.legislation.gov.uk/eur/2009/1099/contents/adopted/data.pdf" target="_blank" rel="noopener">Reg. CE 1099/2009, protezione degli animali durante l\'abbattimento (testo originale)</a>',
    bdn:'<a href="https://www.salute.gov.it/new/it/banche-dati/banca-dati-delle-anagrafi-zootecniche/" target="_blank" rel="noopener">Ministero della Salute, Banca dati delle anagrafi zootecniche</a>',
    proc:'<a href="#processi-macellazione">Valore Zer0: Processi di macellazione</a>',
    rit:'<a href="#macellazione-rituale">Valore Zer0: Macellazione rituale</a>',
    vita:'<a href="#anni-di-vita">Valore Zer0: Vita media di un animale allevato</a>',
    agn:'<a href="#agn">Valore Zer0: scheda Agnelli (ISTAT)</a>'
  };
  function agRate(){var it=BY_ID.agn,r=it.n/it.secs;return {it:it,r:r}}
  function AGR(){var q=agRate(),r=q.r;return '1 agnello ogni '+fmt(1/r,1)+' secondi, '+fmt(Math.round(r*3600))+' all\'ora, '+fmt(Math.round(r*86400))+' al giorno ('+fmt(q.it.n)+' in 12 mesi, ago 2025–lug 2026)'}
  function agBigC(){return '<div class="ag-bigc"><p class="ag-bl">Da quando hai aperto questa pagina:</p><p class="ag-bn" data-agn>0</p><p class="ag-bs">agnelli macellati in Italia, in media</p><p class="ag-bx">Stima calcolata sui dati statistici disponibili: '+AGR()+'. Non è un conteggio in tempo reale e non distingue le macellazioni legate al Natale.</p></div>'}
  function agCal(){
    var c='';
    for(var d=1;d<=40;d++){
      var k=d>=28?(d===28||d===30||d===40?' m':' r'):'';
      c+='<li class="d'+k+'" style="--i:'+d+'"><b>'+(k===' m'||d===1?d:'')+'</b></li>';
    }
    return '<div class="ag-cal" role="img" aria-label="Calendario dei primi 40 giorni di vita. Il disciplinare dell\'Abbacchio Romano IGP prevede la macellazione tra il giorno 28 e il giorno 40."><ol>'+c+'</ol><p><span><i class="k m"></i>giorni 28, 30 e 40</span><span><i class="k r"></i>intervallo 28–40 giorni</span></p><p class="more">Calendario del caso «Abbacchio Romano IGP». Non è il conto alla rovescia di un singolo animale.</p><table class="ag-tb"><caption>Categorie nei disciplinari</caption><tbody><tr><th scope="row">Abbacchio Romano IGP</th><td>28–40 giorni; fino a 8 kg</td></tr><tr><th scope="row">Agnello di Sardegna IGP, «da latte»</th><td>solo latte materno; 4,5–8,5 kg</td></tr><tr><th scope="row">Agnello di Sardegna IGP, «leggero» e «da taglio»</th><td>8,5–13 kg</td></tr><tr><th scope="row">Agnello del Centro Italia IGP</th><td>meno di 12 mesi; «leggero» 8,01–13 kg, «pesante» da 13,01 kg</td></tr></tbody></table></div>';
  }
  function agFil(){
    var s=['Nascita','Allevamento','Identificazione','Trasporto','Macello','Lavorazione','Distribuzione','Consumo'];
    return '<ol class="ag-fil" aria-label="La filiera, dalla nascita al consumo">'+s.map(function(x,i){return '<li'+(i>=4&&i<=5?' class="on"':'')+'><b>'+(i+1)+'</b>'+x+'</li>'}).join('')+'</ol>';
  }
  var AGS=[
    {t:'Nascere',b:'g',x:'<p>La gestazione di una pecora dura in media circa cinque mesi.</p><p>Alla nascita, l\'agnello è un animale vulnerabile. Deve asciugarsi, trovare la madre e iniziare a nutrirsi. Il primo latte, il colostro, gli fornisce anticorpi e sostanze indispensabili nelle prime ore di vita.</p><p>Nei giorni successivi si rafforza il legame con la madre. La riconosce, la cerca e dipende da lei per il nutrimento e la protezione.</p><p class="ag-br">Prima di diventare una categoria commerciale, è un individuo appena nato.</p>',alt:'Nascita, madre e piccolo, primo allattamento',s:'<li>Nessuna fonte specifica verificata in questa versione per le informazioni di questa scena.</li>'},
    {t:'Crescere',b:'g',x:'<p>Nelle prime settimane di vita l\'agnello si nutre soprattutto di latte materno.</p><p>Segue la madre, la riconosce attraverso odori e richiami e interagisce con gli altri piccoli. Si alza, corre, salta, esplora lo spazio intorno a sé.</p><p>La crescita non è soltanto un aumento di peso. È un processo fatto di sviluppo fisico, apprendimento e comportamento.</p><p class="ag-br">La durata di questa fase dipende dal tipo di produzione a cui l\'animale è destinato. Alcuni agnelli vengono macellati ancora molto giovani; altri continuano a crescere per mesi.</p>',alt:'Agnelli vivi, allattamento, gioco',s:'<li>Nessuna fonte specifica verificata in questa versione per le informazioni di questa scena.</li><li>Per le età e le categorie: '+AG_L.vita+'.</li>'},
    {t:'L\'allevamento',b:'g',x:'<p>Gli agnelli possono essere allevati al pascolo, in ricoveri o attraverso sistemi che alternano le due modalità.</p><p>Le condizioni cambiano da un allevamento all\'altro: alimentazione, disponibilità di spazio, riparo, accesso all\'acqua, gestione sanitaria e possibilità di movimento.</p><p>Anche la durata dell\'allevamento varia. La categoria commerciale, il peso richiesto e le caratteristiche della produzione contribuiscono a determinare quando l\'animale verrà avviato alla macellazione.</p><p class="ag-ex">Non esiste un\'unica esperienza di allevamento valida per tutti gli agnelli.</p><p class="ag-br">Il sistema produttivo determina tempi e condizioni della loro vita.</p>',alt:'Ricoveri, recinti, pascoli, mangiatoie e gruppi di agnelli',s:'<li>Descrizione generale: le condizioni reali variano da azienda ad azienda e non sono ricostruite qui.</li><li>Esempio di regole di una produzione a denominazione: '+AG_L.dis+' (alimentazione con latte materno; esclusi stress ambientale e nutrizionale, trattamenti ormonali).</li>'},
    {t:'Identificazione',b:'u',x:'<p>Gli ovini devono essere identificati secondo le norme di tracciabilità.</p><p>L\'identificazione consente di associare l\'animale alle informazioni previste dal sistema: provenienza, allevamento e movimenti lungo la filiera.</p><p>In alcune produzioni a denominazione IGP sono previsti requisiti specifici. Per esempio, i disciplinari dell\'Abbacchio Romano IGP e dell\'Agnello di Sardegna IGP stabiliscono modalità e tempi di identificazione.</p><p class="ag-ex">Questa identificazione ufficiale non va confusa con le marcature colorate che possono essere applicate sul vello in allevamento.</p><p class="ag-br">Un codice permette di seguire l\'animale nella filiera. Non racconta la sua esperienza.</p>',alt:'Dettaglio di identificatori auricolari e marcatura sul vello',s:'<li>'+AG_L.bdn+'.</li><li>'+AG_L.dis+'; '+AG_L.sar+'. Per queste due IGP l\'identificazione avviene entro 20 giorni dalla nascita (per l\'Abbacchio Romano con marca sull\'orecchio sinistro). Non vale per tutti gli agnelli.</li>'},
    {t:'La marcatura',b:'p',x:'<p>In alcuni allevamenti gli animali vengono contrassegnati con vernice colorata applicata sul vello, anche attraverso bombolette spray.</p><p>Il colore può servire a distinguere gruppi, lotti, categorie o destinazioni. In determinate realtà può indicare anche gli animali selezionati per la macellazione.</p><p class="ag-ex">Non esiste un significato universale dei colori: il codice dipende dalle procedure adottate dall\'azienda. Questa marcatura non sostituisce l\'identificazione ufficiale prevista per la tracciabilità.</p><p class="ag-br">Per l\'animale è un segno visibile sul corpo. Per l\'organizzazione produttiva è un\'informazione operativa.</p>',alt:'Primo piano della bomboletta, applicazione della vernice, agnello marcato',s:'<li>Pratica descritta come aziendale: nessuna fonte di carattere generale verificata in questa versione.</li>'},
    {t:'Quanto dura la loro vita?',b:'u',big:'28–40 giorni',x:'<p>Non tutti gli agnelli vengono macellati alla stessa età.</p><p>Un caso preciso è quello dell\'<b>Abbacchio Romano IGP</b>: il relativo disciplinare prevede la macellazione dell\'agnello da latte tra il ventottesimo e il quarantesimo giorno di vita, con un peso della carcassa fino a 8 kg.</p><p>Altre produzioni prevedono categorie e pesi differenti. Il disciplinare dell\'Agnello di Sardegna IGP, per esempio, distingue agnelli da latte, leggeri e da taglio. L\'Agnello del Centro Italia IGP comprende invece animali di età inferiore a dodici mesi.</p><p class="ag-ex">Il dato di 28–40 giorni, quindi, non descrive tutti gli agnelli allevati in Italia. Descrive una specifica categoria commerciale.</p><p class="ag-br">Da quattro a quasi sei settimane possono bastare perché una vita diventi un prodotto.</p>',v:agCal,alt:'Calendario dei primi 40 giorni',s:'<li>'+AG_L.dis+' (pagina senza data di versione): 28–40 giorni, fino a 8 kg.</li><li>'+AG_L.sar+': agnello «da latte» 4,5–8,5 kg, «leggero» 8,5–10 kg, «da taglio» 10–13 kg (carcassa). Il disciplinare non indica un\'età in giorni.</li><li>'+AG_L.cit+': meno di 12 mesi; «leggero» 8,01–13 kg, «pesante» da 13,01 kg, castrato da 20 kg.</li><li>Non si mostrano date di nascita o di macellazione di singoli animali, perché non esistono dati da riportare.</li>'},
    {t:'Il trasporto',b:'u',x:'<p>Quando viene raggiunta la fase prevista dalla produzione, gli animali vengono caricati su mezzi autorizzati e trasferiti al macello.</p><p>Il viaggio comprende diverse fasi: movimentazione, carico, permanenza sul mezzo, trasporto e scarico.</p><p>Per gli animali significa lasciare l\'ambiente conosciuto e affrontare una situazione nuova, con spostamenti, rumori, contatti e condizioni ambientali diverse.</p><p>La normativa europea stabilisce requisiti per il trasporto, tra cui quelli relativi all\'idoneità degli animali, alla durata del viaggio, allo spazio disponibile e alle condizioni di trasporto.</p><p class="ag-br">Il trasferimento è una fase regolamentata della filiera. Non per questo è priva di stress.</p>',alt:'Caricamento, camion per animali vivi, viaggio, arrivo',s:'<li>'+AG_L.tra+'.</li><li>I limiti numerici per gli ovini e per gli agnelli non svezzati sono nel testo del regolamento e non sono riportati qui, perché non verificati in questa versione.</li><li>L\'affermazione sullo stress da trasporto è una valutazione generale: non è stata verificata su una fonte specifica in questa versione.</li>'},
    {t:'L\'arrivo al macello',b:'p',x:'<p>Al loro arrivo, gli animali vengono scaricati e condotti nelle aree previste per la permanenza prima della macellazione.</p><p>Seguono le operazioni di movimentazione, attesa e preparazione.</p><p>I tempi possono variare in funzione della filiera. Alcuni disciplinari IGP stabiliscono limiti specifici tra la consegna al macello e la macellazione: per esempio, entro 24 ore per l\'Abbacchio Romano IGP e l\'Agnello di Sardegna IGP.</p><p class="ag-ex">Questi limiti riguardano le produzioni indicate e non devono essere generalizzati a tutti gli ovini.</p><p class="ag-br">La fase di allevamento è finita. Inizia quella che conduce all\'uccisione.</p>',alt:'Ingresso del macello, corridoi e aree di stabulazione',s:'<li>'+AG_L.dis+'; '+AG_L.sar+'; '+AG_L.cit+'. I limiti di tempo valgono per queste IGP.</li><li>'+AG_L.proc+'.</li>'},
    {t:'L\'uccisione',b:'u',warn:1,x:'<p>Nella procedura ordinaria, la normativa europea prevede lo stordimento dell\'animale prima dell\'uccisione.</p><p>Per gli ovini sono previsti diversi metodi di stordimento, tra cui quelli meccanici ed elettrici.</p><p>Dopo lo stordimento viene eseguito il dissanguamento, attraverso il taglio dei principali vasi sanguigni del collo. Seguono i controlli previsti per verificare l\'efficacia dello stordimento e l\'avvenuto decesso.</p><p class="ag-ex">La normativa contempla anche deroghe per la macellazione rituale, che in determinate condizioni può avvenire senza stordimento preventivo. Le procedure, le condizioni e le differenze normative sono approfondite nelle pagine dedicate di Valore Zer0.</p><p class="ag-br">L\'animale muore. La filiera prosegue.</p>',alt:'Documentazione tecnica del processo, attrezzature, ambienti industriali',s:'<li>'+AG_L.ab+'. L\'allegato I elenca i metodi di stordimento, tra cui quello meccanico con pistola a proiettile captivo non penetrante e quello elettrico testa-corpo.</li><li>'+AG_L.proc+'; '+AG_L.rit+'.</li>'},
    {t:'Da animale a carne',b:'g',x:'<p>Dopo l\'uccisione, il corpo dell\'animale viene sottoposto alle operazioni di lavorazione previste dalla macellazione.</p><p>La carcassa viene scuoiata ed eviscerata, sottoposta ai controlli sanitari e refrigerata. Successivamente viene sezionata in tagli destinati alla distribuzione e alla vendita.</p><p>A questo punto il percorso produttivo ha completato la trasformazione: ciò che era un animale vivo è diventato una carcassa e, poi, una serie di prodotti alimentari.</p><p class="ag-br">La filiera separa le fasi, assegna loro procedure e funzioni. Ma il prodotto finale proviene sempre dallo stesso individuo.</p>',v:agFil,alt:'Lavorazione, carcassa, sezionamento, celle frigorifere, confezionamento',s:'<li>Descrizione generale delle fasi. Per le tecniche di lavorazione negli ovini: '+AG_L.proc+'.</li>'},
    {t:'La carne sulla tavola',b:'g',x:'<p>La carne ovina viene distribuita attraverso macellerie, supermercati, ristoranti e altri canali commerciali.</p><p>In Italia è utilizzata in preparazioni legate a tradizioni regionali differenti:</p><ul class="ag-chip"><li>Abbacchio al forno e a scottadito (Lazio)</li><li>Agnello cacio e uova (Abruzzo e Molise)</li><li>Agnello arrosto (Sardegna)</li><li>Costolette e altre preparazioni a base di agnello</li><li>Arrosticini (tradizione abruzzese)</li></ul><p class="ag-ex">Una distinzione è importante: gli arrosticini tradizionali sono generalmente preparati con carne di ovino adulto, non con quella dell\'agnello da latte. Non tutte queste preparazioni, quindi, provengono dalla stessa categoria di animale.</p><p>Il consumo di carne ovina è legato a ricorrenze, abitudini e identità gastronomiche. La tradizione riguarda il piatto e il suo significato culturale.</p><p class="ag-br">Per arrivare nel piatto, la vita dell\'animale è già terminata.</p>',alt:'Piatti tradizionali italiani e tavole imbandite',s:'<li>Il dato sugli agnelli macellati è quello della scheda ISTAT del sito: '+AG_L.agn+'. Non è attribuibile alle sole festività.</li><li>Preparazioni e arrosticini: informazione generale, fonte non ancora verificata in questa versione.</li>'},
    {t:'Il prezzo della tradizione',b:'g',fin:1,x:'<p class="ag-q">La tradizione dura un giorno.<br>La vita dell\'agnello può durare poche settimane.</p><p>Per diventare un piatto delle festività, un animale nasce, cresce, viene allevato, identificato, trasportato e ucciso.</p><p>La carne è il prodotto finale di questo percorso. Prima del prodotto c\'è stata una vita: un corpo che cresceva, una madre che lo nutriva, un animale che cercava spazio, contatto e protezione.</p><p>Il calendario delle festività stabilisce quando quel piatto viene consumato. Il ciclo produttivo stabilisce quando l\'animale smette di vivere.</p><p class="ag-br">Dietro ogni piatto c\'è una vita. Dietro ogni numero, individui: oltre un milione e trecentomila agnelli macellati in Italia in 12 mesi (ISTAT, ago 2025–lug 2026).</p>',v:agBigC,alt:'',s:'<li>La frase sintetizza le scene precedenti. «Poche settimane» riguarda le categorie con macellazione a 28–40 giorni, non tutti gli agnelli.</li><li>Contatore: ISTAT, agnelli macellati da agosto 2025 a luglio 2026, media su 365 giorni. Il dato non distingue il periodo natalizio. '+AG_L.agn+'.</li>'}
  ];
  function agMedia(i){
    var m=AGM['a'+(i<10?'0':'')+i],sc=AGS[i-1];
    if(m&&m.src){
      if(m.kind==='video')return '<video class="ag-vid" src="'+m.src+'"'+(m.poster?' poster="'+m.poster+'"':'')+' muted loop playsinline preload="metadata" aria-label="'+esc(m.alt||sc.alt||'')+'"></video><button type="button" class="ag-vp" data-vp aria-pressed="false">Pausa</button>';
      return '<img class="ag-img"'+(m.pos?' style="object-position:'+m.pos+'"':'')+' src="'+m.src+'" alt="'+esc(m.alt||sc.alt||'')+'" loading="lazy" decoding="async">';
    }
    return '<div class="ag-fb" aria-hidden="true"><span>'+(i<10?'0':'')+i+'</span></div>';
  }
  function agCap(i){
    var m=AGM['a'+(i<10?'0':'')+i];
    if(!(m&&m.src))return '';
    return '<p class="ag-cap"><b>'+(m.kind==='foto'?'Fotografia':m.kind==='video'?'Video':'Immagine illustrativa')+'</b>'+(m.credit?' · '+esc(m.credit):'')+(m.license?' · '+esc(m.license):'')+'</p>';
  }
  function renderPrezzo(){
    document.body.classList.add('ag-on');
    var h='<div class="ag" id="ag"><div class="ag-lv" role="img" aria-label="Contatore che avanza mentre leggi: il suo significato è spiegato nell\'ultima scena"><b id="agLn" data-agn>0</b><small>mentre leggi</small><i class="ag-lp" aria-hidden="true"></i></div><div class="ag-ct"><button type="button" id="agMode" aria-pressed="false">Lettura verticale</button><span class="ag-cnt" id="agCnt" aria-live="polite">0/12</span></div>';
    h+='<div class="ag-tr" id="agTrack" tabindex="0" role="region" aria-roledescription="carosello" aria-label="Il prezzo della tradizione, 12 scene">';
    h+='<section class="ag-sc ag-cover" data-i="0" aria-label="Introduzione"><div class="ag-md"><div class="ag-fb" aria-hidden="true"><span>0</span></div></div><div class="ag-tx"><span class="ag-n">Approfondimento · Valore Zer0</span><h1>Il prezzo della tradizione</h1><p class="ag-sub">La vita di un agnello, dalla nascita alla tavola.</p><p>Ogni anno, in Italia, la carne di agnello entra nelle tradizioni gastronomiche di diverse regioni. A Natale, a Pasqua e in altre occasioni, diventa il centro di piatti considerati parte della cultura e della memoria familiare.</p><p>Prima di arrivare su una tavola, però, c\'è un animale. Nasce, cresce, cerca la madre, si muove, esplora l\'ambiente. Viene allevato, identificato, trasportato e, infine, macellato.</p><p>Per alcuni agnelli il percorso dalla nascita alla macellazione può durare appena quattro o cinque settimane. Per altri è più lungo: dipende dalla categoria commerciale e dal sistema di allevamento.</p><p>Questa pagina ricostruisce le principali tappe di quel percorso. Non racconta la storia di un singolo animale o di un allevamento specifico, ma una filiera che ogni anno trasforma vite individuali in prodotti alimentari.</p><aside class="avviso" role="note"><b>Contenuto sensibile.</b> Le scene dedicate all\'uccisione e alla lavorazione descrivono le procedure senza mostrare immagini di queste fasi.</aside><button type="button" class="ag-go" data-go="1">Inizia la storia</button><p class="ag-sm">Scorri di lato, usa le frecce della tastiera o i pulsanti ai lati. Oppure scegli la lettura verticale.</p></div></section>';
    AGS.forEach(function(s,k){
      var i=k+1,n=(i<10?'0':'')+i,bd=AG_BADGE[s.b];
      h+='<section class="ag-sc s'+i+(s.fin?' ag-fin':'')+'" data-i="'+i+'" aria-label="Scena '+i+' di 12: '+esc(s.t)+'"><div class="ag-md">'+agMedia(i)+'</div><div class="ag-tx'+(s.v?' hv':'')+'"><div class="ag-c"><span class="ag-n">Scena '+n+' / 12</span><h2>'+esc(s.t)+'</h2>'+(s.big?'<p class="ag-big">'+s.big.replace('giorni','<small>giorni</small>')+'</p>':'')+s.x+'<span class="ag-bd" title="'+esc(bd[1])+'">'+bd[0]+'</span><details class="ag-src"><summary>Fonti e approfondimenti</summary><ul>'+s.s+'</ul></details>'+(s.fin?'<p class="ag-end"><img src="img/logo-w.png" alt="Valore Zer0" width="120" height="60"><a class="ag-go" href="#">Torna alla home di Valore Zer0</a></p>':'')+agCap(i)+'</div>'+(s.v?'<div class="ag-vz">'+s.v()+'</div>':'')+'</div></section>';
    });
    h+='</div><button type="button" class="ag-nb ag-pv" id="agPv" aria-label="Scena precedente">‹</button><button type="button" class="ag-nb ag-nx" id="agNx" aria-label="Scena successiva">›</button>';
    h+='<nav class="ag-tl" aria-label="Linea del tempo della storia"><ol>';
    for(var j=0;j<=12;j++)h+='<li><button type="button" data-go="'+j+'" aria-label="'+(j?'Vai alla scena '+j+': '+esc(AGS[j-1].t):'Vai all\'introduzione')+'"><i></i><span>'+(j||'·')+'</span></button></li>';
    h+='</ol></nav></div>';
    app.innerHTML=h;cur=null;
    LIST=[].slice.call(document.querySelectorAll('[data-agn]')).map(function(el){return {el:el,it:BY_ID.agn,base:elapsed,bar:el.id==='agLn'?document.querySelector('.ag-lp'):null}});
    var ag=document.getElementById('ag'),tr=document.getElementById('agTrack'),sc=[].slice.call(tr.querySelectorAll('.ag-sc'));
    var vert=false,ci=0,lock=0,raf=0,rm=false;
    try{rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
    function fit(){var t=document.querySelector('.top');ag.style.setProperty('--agtop',(t?Math.max(0,t.getBoundingClientRect().bottom):0)+'px')}
    function at(){
      if(vert){var y=tr.scrollTop,b=0,d=1e9;sc.forEach(function(s,k){var e=Math.abs(s.offsetTop-y);if(e<d){d=e;b=k}});return b}
      return Math.max(0,Math.min(12,Math.round(tr.scrollLeft/(tr.clientWidth||1))));
    }
    function ui(){
      ci=at();
      document.getElementById('agCnt').textContent=(ci<10?'0':'')+ci+'/12';
      sc.forEach(function(s,k){
        var on=k===ci;s.classList.toggle('on',on);
        var v=s.querySelector('video');if(v){if(on&&!rm&&!v.dataset.p){v.play&&v.play().catch(function(){})}else{v.pause()}}
      });
      [].forEach.call(ag.querySelectorAll('.ag-tl button'),function(b){var k=+b.dataset.go;b.classList.toggle('past',k<ci);if(k===ci)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
      document.getElementById('agPv').disabled=ci===0;document.getElementById('agNx').disabled=ci===12;
    }
    function go(i){
      i=Math.max(0,Math.min(12,i));
      var o={behavior:rm?'auto':'smooth'};
      if(vert){o.top=sc[i].offsetTop}else{o.left=i*tr.clientWidth}
      tr.scrollTo(o);
    }
    tr.addEventListener('scroll',function(){cancelAnimationFrame(raf);raf=requestAnimationFrame(ui)},{passive:true});
    var tx0=0,ty0=0,tt0=0;
    tr.addEventListener('touchstart',function(e){if(vert||e.touches.length!==1)return;tx0=e.touches[0].clientX;ty0=e.touches[0].clientY;tt0=Date.now()},{passive:true});
    tr.addEventListener('touchend',function(e){
      if(vert||!tt0)return;var t=e.changedTouches[0],dx=t.clientX-tx0,dy=t.clientY-ty0,fast=Date.now()-tt0<600;tt0=0;
      if(Math.abs(dx)>(fast?40:70)&&Math.abs(dx)>Math.abs(dy)*1.3)go(ci+(dx<0?1:-1));
    },{passive:true});
    tr.addEventListener('wheel',function(e){
      if(vert)return;
      if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();var t0=Date.now();if(t0-lock<650||Math.abs(e.deltaX)<8)return;lock=t0;go(ci+(e.deltaX>0?1:-1));return}
      var s=sc[ci],dn=e.deltaY>0;
      if(s.scrollHeight>s.clientHeight+2){
        var top=s.scrollTop<=0,bot=s.scrollTop+s.clientHeight>=s.scrollHeight-2;
        if((dn&&!bot)||(!dn&&!top))return;
      }
      e.preventDefault();
      var t=Date.now();if(t-lock<650)return;lock=t;go(ci+(dn?1:-1));
    },{passive:false});
    ag.addEventListener('click',function(e){
      var b=e.target.closest('[data-go]');if(b&&b.tagName==='BUTTON'){go(+b.dataset.go);return}
      var vp=e.target.closest('[data-vp]');if(vp){var v=vp.parentNode.querySelector('video'),p=!v.paused;if(p){v.pause();v.dataset.p='1'}else{delete v.dataset.p;v.play()}vp.textContent=p?'Riproduci':'Pausa';vp.setAttribute('aria-pressed',p)}
    });
    document.getElementById('agPv').addEventListener('click',function(){go(ci-1)});
    document.getElementById('agNx').addEventListener('click',function(){go(ci+1)});
    document.getElementById('agMode').addEventListener('click',function(){
      vert=!vert;ag.classList.toggle('ag-v',vert);this.setAttribute('aria-pressed',vert);this.textContent=vert?'Lettura orizzontale':'Lettura verticale';
      var k=ci;setTimeout(function(){tr.scrollTo(vert?{top:sc[k].offsetTop,behavior:'auto'}:{left:k*tr.clientWidth,behavior:'auto'});ui()},30);
    });
    window.agKey=function(e){
      var t=document.getElementById('agTrack');if(!t)return;
      var tg=(e.target&&e.target.tagName)||'';if(/INPUT|TEXTAREA|SELECT/.test(tg)||e.altKey||e.ctrlKey||e.metaKey)return;
      var dr=document.getElementById('drawer');if(dr&&!dr.hidden)return;
      var k=e.key;
      if(k==='ArrowRight'||(k==='PageDown'&&!vert)){e.preventDefault();go(ci+1)}
      else if(k==='ArrowLeft'||(k==='PageUp'&&!vert)){e.preventDefault();go(ci-1)}
      else if(k==='Home'&&!vert){e.preventDefault();go(0)}
      else if(k==='End'&&!vert){e.preventDefault();go(12)}
    };
    if(!window.agKeyBound){document.addEventListener('keydown',function(e){window.agKey&&window.agKey(e)});window.agKeyBound=1}
    window.agFit=function(){if(document.getElementById('ag')){fit();if(!vert)tr.scrollTo({left:ci*tr.clientWidth,behavior:'auto'})}};
    if(!window.agRes){window.addEventListener('resize',function(){window.agFit&&window.agFit()});window.agRes=1}
    fit();ui();
    var ds=document.querySelector('meta[name="description"]');if(!ds){ds=document.createElement('meta');ds.name='description';document.head.appendChild(ds)}
    ds.content='Dalla nascita alla macellazione: scopri il percorso degli agnelli destinati alla carne delle tradizioni natalizie italiane.';
  }

  function route(){
    document.body.classList.remove('ag-on');
    LIST=null;
    try{if(window.speechSynthesis)window.speechSynthesis.cancel()}catch(e){}
    var h=MULTI?document.body.getAttribute('data-route'):(location.hash||'').replace('#','');
    if(MULTI&&h===''&&location.hash){var lf=vzFile(location.hash.slice(1));if(lf&&lf!=='index.html'){location.replace(lf);return}}
    var title='Valore Zer0',dh=h;
    if(!h){renderHome()}
    else if(HASH_PAGE[h]){
      var p=HASH_PAGE[h];title=PAGES[p]+' · Valore Zer0';
      ({cose:renderCose,bio:renderBio,vita:renderVita,info:renderInfo,priv:renderPriv,diete:renderDiete,amb:renderAmb,nut:renderNutri,mmm:renderMangia,str:renderStrumenti,proc:renderProcessi,rit:renderRituale,fil:renderFiliere,ltt:renderLatte,ter:renderTerra,fr:renderFreddo,mac:renderMac,tra:renderPrezzo})[p]();
    }else if(MULTI&&GFILE[h]){
      var gm=vzGroupMeta(h);title=gm.t+' · Valore Zer0';
      if(h==='altri')renderNoneAll();
      else{var its=ITEMS.filter(function(z){return z.g===h}),sel=its.filter(function(z){return z.id===location.hash.slice(1)})[0]||its[0];dh=sel.id;if(sel!==its[0])title=sel.name+' · '+gm.t+' · Valore Zer0';renderAnimal(sel)}
    }else if(BY_ID[h]){
      var x=BY_ID[h];title=x.name+' · Valore Zer0';
      if(x.n!==undefined)renderAnimal(x);else renderNone(x);
    }else renderHome();
    if(({'animali-macellati':1,'processi-macellazione':1,'macellazione-rituale':1,'strumenti-industria':1})[h])app.insertAdjacentHTML('afterbegin','<aside class="avviso" role="note"><b>Contenuto sensibile.</b> Questa pagina parla di macellazione e di uccisione di animali. Se non vuoi leggerla, puoi tornare alla <a href="#">home</a>.</aside>');
    if(h==='prezzo-della-tradizione')title='Il prezzo della tradizione: la vita di un agnello | Valore Zero';
    try{document.title=title}catch(e){}
    buildDrawer(dh);
    fixLinks(document);
    if(!MULTI)window.scrollTo(0,0);
  }
  if(MULTI){
    var fq=0,fo=new MutationObserver(function(){if(fq)return;fq=requestAnimationFrame(function(){fq=0;fixLinks(document)})});fo.observe(document.body,{childList:true,subtree:true});
    window.addEventListener('hashchange',function(){var r=document.body.getAttribute('data-route');if(GFILE[r]&&r!=='altri')route()});
  }else window.addEventListener('hashchange',route);
  route();
})();
