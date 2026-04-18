// ================================================================
// PATCH index.html — Questions manquantes + OCR Tesseract gratuit
// ================================================================
// 
// PARTIE 1 : Dans ALL_SUBJECTS, remplacer les blocs vides par ces données
//
// PARTIE 2 : Remplacer la fonction generateFromScan() par la version OCR
// ================================================================

// ============================================================
// PARTIE 1A — geo : ajouter 5ème et 4ème (remplacer les vides)
// ============================================================
// Trouver : '5ème': { questions:[], flashcards:[] },   (dans 'geo')
// Trouver : '4ème': { questions:[], flashcards:[] },   (dans 'geo')
// Remplacer par :

/*
      '5ème': { questions:[
        {q:"Qu'est-ce que la mondialisation ?", opts:["Un accord militaire","L'intensification des échanges à l'échelle mondiale","Un système politique","Une religion mondiale"], ans:1, img:'🌐'},
        {q:"Le canal de Suez relie :", opts:["Atlantique et Pacifique","Mer Rouge et Méditerranée","Mer Noire et Mer Caspienne","Atlantique et Arctique"], ans:1, img:'⛴️'},
        {q:"Quelle est la capitale du Brésil ?", opts:["Rio de Janeiro","São Paulo","Salvador","Brasília"], ans:3, img:'🇧🇷'},
        {q:"L'Himalaya est situé :", opts:["En Afrique","En Amérique du Sud","En Asie","En Europe"], ans:2, img:'🏔️'},
        {q:"Quel pays est le plus peuplé du monde ?", opts:["Inde","USA","Chine","Indonésie"], ans:0, img:'👥'},
        {q:"Le fleuve Amazone coule en :", opts:["Argentine","Brésil","Colombie","Venezuela"], ans:1, img:'🌿'},
        {q:"Quelle est la plus grande île du monde ?", opts:["Madagascar","Bornéo","Groenland","Nouvelle-Guinée"], ans:2, img:'🏝️'},
        {q:"Le désert de Gobi est situé en :", opts:["Afrique du Nord","Australie","Asie centrale (Chine/Mongolie)","Moyen-Orient"], ans:2, img:'🏜️'},
        {q:"La mer Morte est célèbre pour :", opts:["Ses requins","Sa très forte salinité","Ses courants","Ses îles"], ans:1, img:'🧂'},
        {q:"Quelle ville est la plus haute du monde (altitude) ?", opts:["Lhassa","La Paz","Quito","Addis-Abeba"], ans:1, img:'🏔️'},
      ], flashcards:[
        {front:'Mondialisation', back:'Intensification des échanges économiques, culturels et humains à l\'échelle planétaire'},
        {front:'Canal de Suez', back:'Voie maritime artificielle reliant la Mer Rouge à la Méditerranée — raccourcit les routes maritimes'},
        {front:'Déforestation', back:'Destruction des forêts, notamment en Amazonie — cause majeure de réchauffement climatique'},
        {front:'Zone intertropicale', back:'Zone entre les tropiques du Cancer et du Capricorne — climat chaud et humide'},
        {front:'Migrations climatiques', back:'Déplacements de populations causés par les catastrophes naturelles ou le changement climatique'},
      ]},
      '4ème': { questions:[
        {q:"Le pétrole est principalement extrait :", opts:["En Europe","Au Moyen-Orient, en Russie et Amérique","En Australie","En Antarctique"], ans:1, img:'🛢️'},
        {q:"Qu'est-ce qu'une métropole mondiale ?", opts:["Une petite ville","Une grande ville centre de pouvoir économique mondial","Une ville touristique","Une ville industrielle"], ans:1, img:'🏙️'},
        {q:"Le littoral méditerranéen français est connu pour :", opts:["L'élevage","Le tourisme et l'urbanisation","L'industrie lourde","La pêche intensive"], ans:1, img:'🏖️'},
        {q:"La 'Sun Belt' américaine désigne :", opts:["Une région froide","Les États du Sud ensoleillés en fort développement","Une zone militaire","Un parc national"], ans:1, img:'☀️'},
        {q:"Qu'est-ce qu'une mégapole ?", opts:["Une ville de moins d'un million d'habitants","Une ville de plus de 10 millions d'habitants","Une capitale","Une ville portuaire"], ans:1, img:'🌆'},
        {q:"La Ruhr en Allemagne est célèbre pour :", opts:["Le tourisme","Son industrie lourde reconvertie","Son agriculture","Sa pêche"], ans:1, img:'🏭'},
        {q:"Le détroit de Gibraltar sépare :", opts:["France et Espagne","Europe et Afrique","Angleterre et France","Italie et Tunisie"], ans:1, img:'🌊'},
        {q:"Qu'est-ce que l'exode rural ?", opts:["Migration de la ville vers la campagne","Migration de la campagne vers la ville","Départ à l'étranger","Retour au pays"], ans:1, img:'🚜'},
        {q:"La Silicon Valley est située :", opts:["À New York","En Californie","Au Texas","En Floride"], ans:1, img:'💻'},
        {q:"Le BRICS regroupe :", opts:["5 pays développés","Brésil, Russie, Inde, Chine, Afrique du Sud","Les pays d'Europe de l'Est","Les pays du Golfe"], ans:1, img:'🌍'},
      ], flashcards:[
        {front:'Métropolisation', back:'Processus de concentration de la population et des activités dans les grandes villes'},
        {front:'Littoralisation', back:'Concentration des populations et activités sur les zones côtières'},
        {front:'Exode rural', back:'Migration des habitants de la campagne vers la ville, surtout au XIXe-XXe s.'},
        {front:'Hub mondial', back:'Nœud de communication et d\'échanges à l\'échelle mondiale (ex: Rotterdam, Dubaï)'},
        {front:'Transition démographique', back:'Passage d\'une forte natalité/mortalité à une faible natalité/mortalité — associé au développement'},
      ]},
*/

// ============================================================
// PARTIE 1B — physchim : ajouter CM1, CM2, 6ème, 5ème
// ============================================================
// Trouver : 'CM1': { questions:[], flashcards:[] }, (dans physchim)
// Remplacer par :

/*
      'CM1': { questions:[
        {q:"Quel état de la matière coule et prend la forme du récipient ?", opts:['Solide','Liquide','Gazeux','Plasma'], ans:1, img:'💧'},
        {q:"L'eau bout à quelle température ?", opts:['50°C','75°C','100°C','150°C'], ans:2, img:'♨️'},
        {q:"La glace est de l'eau à l'état :", opts:['Liquide','Gazeux','Solide','Plasma'], ans:2, img:'🧊'},
        {q:"Quel métal est attiré par un aimant ?", opts:['L\'or','L\'aluminium','Le fer','Le cuivre'], ans:2, img:'🧲'},
        {q:"La lumière du soleil voyage à :", opts:['300 km/s','3 000 km/s','300 000 km/s','3 000 000 km/s'], ans:2, img:'☀️'},
        {q:"Un circuit électrique a besoin de :", opts:['Un seul fil','Une pile et des fils reliés','Seulement une ampoule','Un interrupteur seul'], ans:1, img:'💡'},
        {q:"Qu'est-ce que la pesanteur ?", opts:['La force qui attire les objets vers le bas','La force qui les fait monter','La force du vent','La chaleur'], ans:0, img:'⬇️'},
        {q:"Le son se propage dans :", opts:['Le vide uniquement','L\'air, l\'eau et les solides','Seulement l\'air','Seulement l\'eau'], ans:1, img:'🔊'},
        {q:"Quel matériau conduit le mieux l\'électricité ?", opts:['Plastique','Bois','Cuivre','Verre'], ans:2, img:'⚡'},
        {q:"L'arc-en-ciel se forme quand la lumière :", opts:['Passe dans le noir','Se réfléchit dans les gouttes d\'eau','Touche le sol','Traverse le verre'], ans:1, img:'🌈'},
      ], flashcards:[
        {front:'Les 3 états de la matière', back:'Solide (forme fixe), Liquide (volume fixe), Gazeux (ni forme ni volume)'},
        {front:'Fusion', back:'Passage de l\'état solide à l\'état liquide — ex: glace → eau à 0°C'},
        {front:'Vaporisation', back:'Passage de l\'état liquide à l\'état gazeux — ex: eau → vapeur à 100°C'},
        {front:'Conducteur électrique', back:'Matériau qui laisse passer le courant : métaux (cuivre, fer, or...)'},
        {front:'Isolant électrique', back:'Matériau qui ne laisse pas passer le courant : plastique, bois, verre...'},
      ]},
      'CM2': { questions:[
        {q:"Combien y a-t-il de couleurs dans l'arc-en-ciel ?", opts:['5','6','7','8'], ans:2, img:'🌈'},
        {q:"Un aimant a :", opts:['1 pôle','2 pôles','3 pôles','4 pôles'], ans:1, img:'🧲'},
        {q:"La force qui s'exerce sur un objet posé sur terre est appelée :", opts:['Pression','Magnétisme','Poids','Tension'], ans:2, img:'⬇️'},
        {q:"L'unité de mesure de la masse est :", opts:['Le litre','Le gramme/kilogramme','Le mètre','Le newton'], ans:1, img:'⚖️'},
        {q:"Un circuit électrique ouvert :", opts:['Laisse passer le courant','Ne laisse pas passer le courant','Produit de l\'électricité','Brûle les ampoules'], ans:1, img:'🔌'},
        {q:"La chaleur se transmet par :", opts:['Conduction, convection et rayonnement','Seulement le froid','Seulement le vent','Le magnétisme'], ans:0, img:'🔥'},
        {q:"Un thermomètre mesure :", opts:['La masse','La pression','La température','La vitesse'], ans:2, img:'🌡️'},
        {q:"L'oxygène représente environ ... % de l'air :", opts:['10%','21%','50%','78%'], ans:1, img:'💨'},
        {q:"Le verre laisse passer :", opts:['L\'eau','L\'électricité','La lumière','Le son uniquement'], ans:2, img:'🪟'},
        {q:"Pour observer de très petits objets on utilise :", opts:['Un télescope','Un microscope','Des lunettes','Un périscope'], ans:1, img:'🔬'},
      ], flashcards:[
        {front:'Poids vs Masse', back:'Masse = quantité de matière (kg) | Poids = force exercée par la pesanteur (N)'},
        {front:'Les sources lumineuses', back:'Primaires (soleil, feu, ampoule) — envoient leur propre lumière | Secondaires — réfléchissent la lumière'},
        {front:'Mélange et corps pur', back:'Corps pur : une seule substance (eau distillée) | Mélange : plusieurs substances (eau salée)'},
        {front:'Dissoudre', back:'Faire disparaître un solide dans un liquide — ex: sucre dans l\'eau'},
        {front:'Filtration', back:'Séparer un solide d\'un liquide à l\'aide d\'un filtre'},
      ]},
      '6ème': { questions:[
        {q:"La formule chimique de l'eau est :", opts:['CO2','H2O','O2','NaCl'], ans:1, img:'💧'},
        {q:"L'unité de mesure de la force est :", opts:['Le kilogramme','Le joule','Le newton','Le watt'], ans:2, img:'💪'},
        {q:"Un atome est :", opts:['La plus grande particule de matière','La plus petite particule d\'un élément chimique','Un mélange','Un gaz'], ans:1, img:'⚛️'},
        {q:"La masse volumique de l'eau est :", opts:['0,5 g/cm³','1 g/cm³','2 g/cm³','10 g/cm³'], ans:1, img:'💧'},
        {q:"Quelle grandeur mesure-t-on avec un voltmètre ?", opts:['L\'intensité','La résistance','La tension','La puissance'], ans:2, img:'⚡'},
        {q:"Un objet flotte si :", opts:['Sa masse volumique est supérieure à celle du liquide','Sa masse volumique est inférieure à celle du liquide','Il est très lourd','Il est métallique'], ans:1, img:'🛟'},
        {q:"La vitesse se calcule avec :", opts:['v = m×a','v = d/t','v = F/m','v = P×t'], ans:1, img:'🏎️'},
        {q:"Le tableau périodique classe les :", opts:['Molécules','Atomes et éléments chimiques','Minéraux','Planètes'], ans:1, img:'🧪'},
        {q:"L'intensité électrique se mesure en :", opts:['Volts','Ohms','Ampères','Watts'], ans:2, img:'⚡'},
        {q:"La lumière blanche est :", opts:['Une seule couleur','Un mélange de toutes les couleurs','Seulement du jaune et du blanc','Invisible'], ans:1, img:'🌈'},
      ], flashcards:[
        {front:'Masse volumique', back:'ρ = m/V (en g/cm³ ou kg/m³) — un objet flotte si ρ < ρ liquide'},
        {front:'Vitesse', back:'v = d/t — distance divisée par temps — en m/s ou km/h'},
        {front:'Intensité et tension', back:'Intensité I en Ampères (A) | Tension U en Volts (V) | Résistance R en Ohms (Ω)'},
        {front:'Atome et molécule', back:'Atome = plus petite unité d\'un élément | Molécule = association d\'atomes (H₂O = 2H + 1O)'},
        {front:'Dispersion de la lumière', back:'Le prisme décompose la lumière blanche en 7 couleurs : rouge, orange, jaune, vert, bleu, indigo, violet'},
      ]},
      '5ème': { questions:[
        {q:"La loi de conservation de la masse dit que :", opts:['La masse augmente dans une réaction','La masse totale est conservée avant et après réaction','La masse diminue toujours','La masse dépend de la température'], ans:1, img:'⚖️'},
        {q:"Qu'est-ce qu'une réaction de combustion ?", opts:['Dissolution d\'un sel','Réaction d\'un combustible avec l\'oxygène','Filtration d\'un mélange','Fusion d\'un métal'], ans:1, img:'🔥'},
        {q:"La pression atmosphérique est due à :", opts:['La rotation de la Terre','Le poids de l\'air sur les surfaces','L\'attraction de la Lune','Le vent'], ans:1, img:'🌬️'},
        {q:"En chimie, pH 7 signifie :", opts:['Acide','Basique','Neutre','Très acide'], ans:2, img:'🧪'},
        {q:"L'énergie potentielle gravitationnelle dépend de :", opts:['La vitesse','La masse et la hauteur','La couleur','La forme'], ans:1, img:'⬆️'},
        {q:"Un électron a une charge :", opts:['Positive','Nulle','Négative','Variable'], ans:2, img:'⚛️'},
        {q:"La résistance électrique se mesure en :", opts:['Volts','Ampères','Ohms','Watts'], ans:2, img:'💡'},
        {q:"Le CO2 est produit lors de :", opts:['La photosynthèse','La combustion et la respiration','La filtration','La fusion'], ans:1, img:'🌿'},
        {q:"La puissance électrique est :", opts:['P = U/I','P = U + I','P = U × I','P = U - I'], ans:2, img:'⚡'},
        {q:"Une solution aqueuse est :", opts:['Un mélange d\'huile et d\'eau','Une solution dont le solvant est l\'eau','Un gaz dissous','Un solide fondu'], ans:1, img:'💧'},
      ], flashcards:[
        {front:'Conservation de la masse', back:'Dans toute réaction chimique : masse totale des réactifs = masse totale des produits'},
        {front:'Combustion', back:'Réaction d\'un combustible avec le comburant (O2) — produit CO2 et H2O'},
        {front:'pH', back:'Mesure l\'acidité : pH < 7 acide | pH = 7 neutre | pH > 7 basique'},
        {front:'Puissance électrique', back:'P = U × I (en Watts) | Énergie E = P × t (en Joules)'},
        {front:'Énergie mécanique', back:'Somme de l\'énergie cinétique (Ec = ½mv²) et potentielle (Ep = mgh)'},
      ]},
*/

// ============================================================
// PARTIE 1C — anglais : ajouter 5ème et 4ème
// ============================================================
// Trouver : '5ème': { questions:[], flashcards:[] }, (dans 'anglais')
// Trouver : '4ème': { questions:[], flashcards:[] }, (dans 'anglais')
// Remplacer par :

/*
      '5ème': { questions:[
        {q:"'She has been studying for 3 hours.' Which tense?", opts:['Present simple','Past simple','Present perfect continuous','Future'], ans:2, img:'📚'},
        {q:"The comparative of 'good' is:", opts:['Gooder','More good','Better','Best'], ans:2, img:'📊'},
        {q:"'I wish I had more time.' This expresses:", opts:['A real fact','A regret about the present','A future plan','A past event'], ans:1, img:'⏰'},
        {q:"Choose the correct passive: 'The cake ___ by Marie.'", opts:['was made','made','is make','has make'], ans:0, img:'🎂'},
        {q:"'Despite studying hard, he failed.' 'Despite' introduces:", opts:['A cause','A consequence','A concession','A condition'], ans:2, img:'📝'},
        {q:"The superlative of 'bad' is:", opts:['Worse','Most bad','Baddest','Worst'], ans:3, img:'❌'},
        {q:"'He told me that he WAS tired.' (reported speech) — originally he said:", opts:['I was tired','I am tired','I were tired','I be tired'], ans:1, img:'💬'},
        {q:"'As soon as she arrives, call me.' 'as soon as' expresses:", opts:['Condition','Time','Opposition','Cause'], ans:1, img:'⏱️'},
        {q:"Which sentence uses the present perfect correctly?", opts:['I have went yesterday','She has never been to Paris','He have eaten','They has finished'], ans:1, img:'✅'},
        {q:"'I would rather stay home.' This means:", opts:['I must stay','I prefer to stay','I should stay','I will stay'], ans:1, img:'🏠'},
      ], flashcards:[
        {front:'Present Perfect Continuous', back:'Have/has been + V-ing — action commencée dans le passé et toujours en cours'},
        {front:'Comparatifs et superlatifs irréguliers', back:'good → better → best | bad → worse → worst | far → farther → farthest'},
        {front:'Would rather / Had better', back:'Would rather = préférer | Had better = il vaudrait mieux (conseil fort)'},
        {front:'Reported speech (temps)', back:'am/is → was | have → had | will → would | can → could'},
        {front:'Conjonctions de temps', back:'when, while, as soon as, until, before, after, by the time'},
      ]},
      '4ème': { questions:[
        {q:"'Had I known, I would have helped.' This is:", opts:['Conditional type 1','Conditional type 2','Conditional type 3 inverted','Present conditional'], ans:2, img:'🔄'},
        {q:"The gerund form of 'run' is:", opts:['Running','Ran','To run','Runs'], ans:0, img:'🏃'},
        {q:"'It is said that...' is an example of:", opts:['Active voice','Passive reporting','Conditional','Relative clause'], ans:1, img:'📰'},
        {q:"Choose the correct relative pronoun: 'The book ___ I read was great.'", opts:['who','which/that','whose','where'], ans:1, img:'📖'},
        {q:"'No sooner had he left than it rained.' This means:", opts:['He left after the rain','He left just before it rained','He left during rain','He did not leave'], ans:1, img:'🌧️'},
        {q:"'She got her car repaired.' This is a :", opts:['Passive voice','Causative structure (have/get + object + past participle)','Conditional','Gerund'], ans:1, img:'🚗'},
        {q:"Which sentence is correct?", opts:['Despite of the rain, we went out','In spite of the rain, we went out','Although the rain, we went out','However the rain, we went out'], ans:1, img:'🌧️'},
        {q:"'The more you practice, the better you get.' This is:", opts:['A comparison with as...as','A double comparative','A superlative','A conditional'], ans:1, img:'💪'},
        {q:"'I am used to working late.' 'used to' here means:", opts:['I did this in the past','I am accustomed to','I must work','I wish I worked'], ans:1, img:'🌙'},
        {q:"An infinitive of purpose answers the question:", opts:['When?','Why? / For what purpose?','How?','Where?'], ans:1, img:'🎯'},
      ], flashcards:[
        {front:'Causative (have/get)', back:'Have/get + objet + participe passé : She got her hair cut (faire faire qqch)'},
        {front:'Inversion conditionnelle', back:'Had I known = If I had known | Were I you = If I were you | Should you need = If you need'},
        {front:'Used to vs Be used to', back:'Used to + inf. = habitude passée | Be used to + V-ing = être habitué à'},
        {front:'Propositions relatives', back:'Who (personnes) | Which/That (choses) | Whose (possession) | Where (lieu) | When (temps)'},
        {front:'Discours indirect (questions)', back:'Direct: "Where do you live?" → Indirect: He asked where I lived (ordre affirmatif, pas de do/does)'},
      ]},
*/

// ============================================================
// PARTIE 1D — histoire 5ème : le bloc existe deux fois, garder le bon
// ============================================================
// Dans 'histoire', chercher le SECOND bloc '5ème' avec questions:[]
// Il n'y a qu'un seul vrai bloc vide. Remplacer par les questions déjà présentes
// (le bloc '5ème' complet avec La Peste Noire, Jeanne d'Arc, etc. est déjà en place)
// → Rien à faire, les données sont déjà là

// ============================================================
// PARTIE 2 — Remplacer generateFromScan() par OCR Tesseract
// ============================================================
// Ajouter dans <head> AVANT le tag </head> :
// <script src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js"></script>
//
// Puis remplacer la fonction generateFromScan() par celle ci-dessous :

/*
async function generateFromScan(){
  const textInput = document.getElementById('scan-text-input').value.trim();
  
  // Si l'utilisateur a collé du texte directement → on l'utilise
  if(textInput) {
    processTextContent(textInput);
    return;
  }
  
  // Si une image est chargée → OCR avec Tesseract.js (100% gratuit, dans le navigateur)
  if(scanImageBase64) {
    document.getElementById('scan-input-zone').style.display = 'none';
    document.getElementById('scan-loading').style.display = 'block';
    document.getElementById('ai-quiz-result').style.display = 'none';
    
    let msgIdx = 0;
    const loadingMsgs = [
      "Analyse de l'image en cours... 📷",
      "Reconnaissance du texte... 🔍", 
      "Extraction du contenu... 📝",
      "Préparation des exercices... 🎯"
    ];
    const mi = setInterval(() => {
      document.getElementById('scan-loading-msg').textContent = loadingMsgs[msgIdx++ % loadingMsgs.length];
    }, 1800);
    
    try {
      // Convertir base64 → blob pour Tesseract
      const byteChars = atob(scanImageBase64);
      const byteArr = new Uint8Array(byteChars.length);
      for(let i = 0; i < byteChars.length; i++) byteArr[i] = byteChars.charCodeAt(i);
      const blob = new Blob([byteArr], {type:'image/jpeg'});
      
      // OCR avec Tesseract.js — reconnaissance en français + anglais
      const result = await Tesseract.recognize(blob, 'fra+eng', {
        logger: m => {
          if(m.status === 'recognizing text') {
            document.getElementById('scan-loading-msg').textContent = 
              `Lecture... ${Math.round(m.progress * 100)}% 🔍`;
          }
        }
      });
      
      clearInterval(mi);
      const extractedText = result.data.text.trim();
      
      if(!extractedText || extractedText.length < 20) {
        throw new Error('Texte trop court ou illisible');
      }
      
      // Mettre le texte extrait dans la zone de texte et continuer
      document.getElementById('scan-text-input').value = extractedText;
      processTextContent(extractedText);
      
    } catch(err) {
      clearInterval(mi);
      document.getElementById('scan-loading').style.display = 'none';
      document.getElementById('scan-input-zone').style.display = 'block';
      showToast('❌ Impossible de lire l\'image. Colle le texte directement !');
    }
    return;
  }
  
  showToast('📸 Ajoute une photo ou colle du texte !');
}

function processTextContent(text) {
  document.getElementById('scan-input-zone').style.display = 'none';
  document.getElementById('scan-loading').style.display = 'block';
  document.getElementById('ai-quiz-result').style.display = 'none';
  document.getElementById('scan-loading-msg').textContent = 'Génération des exercices... 🧠';
  
  // Générer les exercices localement sans API payante
  try {
    if(scanType === 'flash') {
      generateFlashcardsFromText(text);
    } else if(scanType === 'resume') {
      generateSummaryFromText(text);
    } else {
      generateQCMFromText(text, scanType);
    }
    document.getElementById('scan-loading').style.display = 'none';
    document.getElementById('ai-quiz-result').style.display = 'block';
    addXP(20); showToast('✨ Exercices générés ! +20 XP');
  } catch(e) {
    document.getElementById('scan-loading').style.display = 'none';
    document.getElementById('scan-input-zone').style.display = 'block';
    showToast('❌ Erreur, réessaie avec un texte plus long !');
  }
}

function generateFlashcardsFromText(text) {
  // Découper le texte en phrases/segments et créer des fiches
  const sentences = text.split(/[.!?;:\n]+/).map(s => s.trim()).filter(s => s.length > 20);
  const cards = [];
  
  for(let i = 0; i < Math.min(sentences.length - 1, 6); i++) {
    const words = sentences[i].split(/\s+/);
    if(words.length < 5) continue;
    // Cacher un mot clé (le plus long)
    const keyIdx = words.reduce((best, w, idx) => w.length > words[best].length ? idx : best, 0);
    const answer = words[keyIdx];
    const question = words.map((w, idx) => idx === keyIdx ? '___' : w).join(' ');
    cards.push({front: question, back: answer});
  }
  
  // Si pas assez de fiches, créer des fiches définition
  if(cards.length < 3) {
    const parts = text.split(/\n+/).filter(p => p.trim().length > 30).slice(0, 6);
    parts.forEach((p, i) => {
      const half = Math.floor(p.length / 2);
      cards.push({front: p.slice(0, half) + '...', back: '...' + p.slice(half)});
    });
  }
  
  aiGeneratedFlash = cards.slice(0, 6);
  renderAiFlashResult();
  document.getElementById('btn-play-ai').style.display = 'flex';
}

function generateQCMFromText(text, type) {
  // Extraire les informations clés du texte pour créer des QCM
  const sentences = text.split(/[.!?\n]+/).map(s => s.trim()).filter(s => s.length > 30);
  const questions = [];
  
  sentences.slice(0, 8).forEach((sentence, idx) => {
    const words = sentence.split(/\s+/).filter(w => w.length > 4);
    if(words.length < 4) return;
    
    // Trouver un mot clé à cacher
    const keyIdx = Math.floor(words.length / 2);
    const keyword = words[keyIdx].replace(/[,;:]/g, '');
    
    if(keyword.length < 3) return;
    
    // Créer 3 distracteurs en modifiant le mot
    const distractors = [
      keyword.slice(0, -1) + 'x',
      keyword.charAt(0).toUpperCase() + keyword.slice(1) + 's',
      keyword.split('').reverse().join('').slice(0, keyword.length)
    ].filter(d => d !== keyword).slice(0, 3);
    
    const questionText = words.map((w, i) => i === keyIdx ? '___' : w).join(' ');
    const opts = shuffle([keyword, ...distractors]);
    const ans = opts.indexOf(keyword);
    
    if(type === 'vf') {
      // Vrai/Faux : la phrase est-elle correcte ?
      questions.push({
        q: 'Vrai ou faux : "' + sentence.slice(0, 80) + '"',
        opts: ['✅ Vrai', '❌ Faux'],
        ans: 0,
        img: '🤔'
      });
    } else {
      questions.push({
        q: 'Complète : ' + questionText,
        opts: opts,
        ans: ans,
        img: '📝'
      });
    }
  });
  
  aiGeneratedQuestions = questions.slice(0, 6);
  renderAiQuizResult();
}

function generateSummaryFromText(text) {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 50);
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 20);
  
  // Prendre les premières et dernières phrases comme résumé
  const summaryParts = [
    ...sentences.slice(0, 3),
    ...sentences.slice(-2)
  ].filter((v, i, a) => a.indexOf(v) === i); // dédoublonner
  
  const summary = summaryParts.join('. ') + '.';
  
  // Extraire les mots clés les plus fréquents comme points clés
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 5);
  const freq = {};
  words.forEach(w => freq[w] = (freq[w] || 0) + 1);
  const keypoints = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => sentences.find(s => s.toLowerCase().includes(word)) || word);
  
  renderAiSummaryResult({
    summary: summary.slice(0, 300),
    keypoints: keypoints.slice(0, 5)
  });
  document.getElementById('btn-play-ai').style.display = 'none';
}
*/
