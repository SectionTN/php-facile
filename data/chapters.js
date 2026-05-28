/* ============================================================
   chapters.js — Contenu pédagogique des chapitres (FR, humanisé)
   Modèle de bloc : {t:'h2'|'h3'|'p'|'analogy'|'code'|'callout'|
                     'recap'|'list'|'sim'} (voir render.js)
   ============================================================ */
window.CHAPTERS = [

/* ---------------------------------------------------------- 0. LES BASES */
{
  id:"bases", num:"00", icon:"🌱", title:"Les bases de PHP",
  subtitle:"Avant de courir, on apprend à marcher. Variables, echo, et la fameuse balise <?php.",
  blocks:[
    {t:"p", x:"PHP, c'est un langage qui travaille <strong>du côté du serveur</strong>. En clair&nbsp;: ton code s'exécute sur la machine qui héberge le site, et le visiteur ne reçoit que le résultat (du HTML). Il ne voit jamais ton code PHP — pratique pour cacher la logique et les mots de passe."},
    {t:"analogy", x:"Pense à un restaurant&nbsp;: le client lit le menu (le HTML), mais la cuisine (PHP) reste cachée. Il reçoit juste l'assiette."},

    {t:"h2", x:"1. La balise PHP"},
    {t:"p", x:"Tout code PHP vit entre <code>&lt;?php</code> et <code>?&gt;</code>. Hors de ces balises, le navigateur lit du HTML normal."},
    {t:"code", cap:"Le grand classique : afficher quelque chose", x:`<?php
  echo "Bonjour le monde !";
?>`},
    {t:"p", x:"<code>echo</code> est ton meilleur ami&nbsp;: il <strong>affiche</strong> du texte. Et n'oublie jamais le <strong>point-virgule</strong> <code>;</code> à la fin de chaque instruction — c'est le point final d'une phrase en PHP."},

    {t:"h2", x:"2. Les variables"},
    {t:"p", x:"Une variable est une <strong>boîte étiquetée</strong> qui stocke une valeur. En PHP, toutes les variables commencent par un <code>$</code>."},
    {t:"code", cap:"Ranger des valeurs dans des boîtes", x:`<?php
  $nom = "Ali";      // une chaîne de caractères
  $age = 19;          // un entier
  $note = 14.5;       // un décimal
  $estAdmis = true;   // un booléen (vrai / faux)

  echo "Salut $nom, tu as $age ans.";
?>`},
    {t:"callout", kind:"tip", title:"Le truc qui change tout", x:"Avec les guillemets <strong>doubles</strong> <code>\"...\"</code>, PHP lit les variables à l'intérieur du texte. Avec les guillemets <strong>simples</strong> <code>'...'</code>, il affiche le texte tel quel. <code>'Salut $nom'</code> affichera littéralement «&nbsp;Salut $nom&nbsp;»."},

    {t:"h3", x:"Concaténer (= coller des morceaux)"},
    {t:"p", x:"Le point <code>.</code> colle deux chaînes ensemble. C'est l'opérateur de concaténation."},
    {t:"code", x:`<?php
  $prenom = "Sarra";
  $message = "Bienvenue " . $prenom . " !";
  echo $message;   // Bienvenue Sarra !
?>`},

    {t:"h2", x:"3. Les types de base"},
    {t:"list", items:[
      "<b>String</b> (chaîne) — du texte : <code>\"php\"</code>",
      "<b>Int</b> (entier) — un nombre sans virgule : <code>42</code>",
      "<b>Float</b> (décimal) — un nombre à virgule : <code>3.14</code>",
      "<b>Bool</b> (booléen) — <code>true</code> ou <code>false</code>",
      "<b>Array</b> (tableau) — une liste de valeurs (chapitre Tableaux)"
    ]},

    {t:"callout", kind:"warn", title:"Erreurs fréquentes des débutants", x:"Oublier le <code>$</code> devant une variable · oublier le <code>;</code> · confondre <code>=</code> (affecter) et <code>==</code> (comparer) · écrire <code>Echo</code> ou <code>ECHO</code> — les fonctions sont insensibles à la casse mais reste régulier."},

    {t:"recap", items:[
      "Code PHP entre <code>&lt;?php ... ?&gt;</code>, chaque instruction finit par <code>;</code>.",
      "<code>echo</code> affiche · <code>$variable</code> stocke.",
      "Guillemets doubles → les variables sont lues. Guillemets simples → texte brut.",
      "Le point <code>.</code> colle les chaînes."
    ]}
  ]
},

/* ---------------------------------------------------------- 3a. CONDITIONS */
{
  id:"conditions", num:"03", icon:"🔀", title:"Les conditions",
  subtitle:"Apprendre à ton code à prendre des décisions : si… alors… sinon.",
  blocks:[
    {t:"p", x:"Une condition permet d'exécuter du code <strong>seulement si</strong> quelque chose est vrai. C'est ce qui rend un programme intelligent&nbsp;: il réagit différemment selon la situation."},
    {t:"analogy", x:"«&nbsp;<em>S'il</em> pleut, <em>alors</em> je prends un parapluie, <em>sinon</em> je mets des lunettes de soleil.&nbsp;» Ton cerveau fait des <code>if/else</code> toute la journée."},

    {t:"h2", x:"1. La condition simple : if"},
    {t:"code", cap:"Si la condition est vraie, le bloc s'exécute", x:`<?php
  $age = 19;

  if ($age > 18) {
    echo "Bienvenue !";
  }
?>`},
    {t:"p", x:"Décortiquons&nbsp;: <code>if</code> = «&nbsp;si&nbsp;». Entre <strong>parenthèses</strong>, la condition à tester. Entre <strong>accolades</strong> <code>{ }</code>, ce qui se passe si c'est vrai. Ici <code>$age &gt; 18</code> vaut <code>true</code> (19 &gt; 18), donc on affiche le message."},

    {t:"h3", x:"Les opérateurs de comparaison"},
    {t:"list", items:[
      "<code>==</code> égal à · <code>!=</code> différent de",
      "<code>&gt;</code> plus grand · <code>&lt;</code> plus petit",
      "<code>&gt;=</code> plus grand ou égal · <code>&lt;=</code> plus petit ou égal",
      "<code>===</code> égal <b>et même type</b> (le plus strict, le plus sûr)"
    ]},
    {t:"callout", kind:"danger", title:"Le piège n°1 des examens", x:"<code>=</code> <strong>affecte</strong> une valeur. <code>==</code> <strong>compare</strong>. Écrire <code>if ($x = 5)</code> au lieu de <code>if ($x == 5)</code> est l'erreur la plus classique — et ça compile sans planter, donc c'est sournois."},

    {t:"h2", x:"2. if … else"},
    {t:"p", x:"<code>else</code> = «&nbsp;sinon&nbsp;». Il s'exécute quand la condition du <code>if</code> est fausse. Pas de parenthèses pour <code>else</code>&nbsp;: il ne teste rien, il ramasse tous les autres cas."},
    {t:"code", x:`<?php
  $age = 15;

  if ($age > 18) {
    echo "Bienvenu !";
  } else {
    echo "Veuillez quitter le site";
  }
?>`},

    {t:"h2", x:"3. if … elseif … else"},
    {t:"p", x:"Quand il y a plus de deux cas, on enchaîne avec <code>elseif</code>. PHP teste les conditions une par une, dans l'ordre, et s'arrête à la première qui est vraie."},
    {t:"code", cap:"Comparer deux nombres", x:`<?php
  $a = 10; $b = 11;

  if ($a > $b) {
    echo "a est plus grand que b";
  } elseif ($a == $b) {
    echo "a est égal à b";
  } else {
    echo "a est inférieur à b";   // <- ce cas s'affiche
  }
?>`},

    {t:"h3", x:"Combiner des conditions : AND, OR, NOT"},
    {t:"list", items:[
      "<code>&&</code> ou <code>AND</code> — vrai si <b>les deux</b> sont vrais",
      "<code>||</code> ou <code>OR</code> — vrai si <b>au moins un</b> est vrai",
      "<code>!</code> — la négation (inverse vrai ↔ faux)"
    ]},
    {t:"code", x:`<?php
  if ($age <= 12 && $sexe == "garçon") {
    echo "Bienvenue Captain Mégakill !";
  } elseif ($age <= 12 && $sexe == "fille") {
    echo "Site réservé aux aventuriers !";
  }
?>`},

    {t:"h2", x:"4. Le switch"},
    {t:"p", x:"Quand on compare <strong>la même variable</strong> à plein de valeurs, le <code>switch</code> est plus lisible qu'une montagne de <code>elseif</code>."},
    {t:"code", cap:"Aiguiller selon une valeur", x:`<?php
  switch ($type) {
    case "Femme":
      echo "Bonjour Madame";
      break;
    case "Homme":
      echo "Bonjour Monsieur";
      break;
    default:
      echo "Erreur !";
  }
?>`},
    {t:"callout", kind:"warn", title:"N'oublie JAMAIS le break", x:"Sans <code>break</code>, PHP continue d'exécuter les <code>case</code> suivants (effet «&nbsp;cascade&nbsp;»). <code>default</code> = le cas «&nbsp;aucune valeur ne correspond&nbsp;»."},

    {t:"sim", id:"condition"},

    {t:"recap", items:[
      "<code>if (condition) { ... }</code> exécute si vrai · <code>else</code> sinon · <code>elseif</code> pour les cas intermédiaires.",
      "<code>==</code> compare, <code>=</code> affecte — ne les confonds pas.",
      "<code>&&</code> = ET, <code>||</code> = OU, <code>!</code> = NON.",
      "<code>switch</code> pour comparer une variable à plusieurs valeurs — et <code>break</code> partout&nbsp;!"
    ]}
  ]
},

/* ---------------------------------------------------------- 3b. BOUCLES */
{
  id:"boucles", num:"03", icon:"🔁", title:"Les boucles",
  subtitle:"Répéter une action 100 fois sans écrire 100 lignes. La paresse intelligente.",
  blocks:[
    {t:"p", x:"Une boucle répète un bloc de code tant qu'une condition est remplie. C'est la machine à café du programmeur&nbsp;: tu appuies une fois, elle te ressert autant de fois que voulu."},

    {t:"h2", x:"1. La boucle for"},
    {t:"p", x:"On utilise <code>for</code> quand on <strong>connaît d'avance</strong> le nombre de répétitions. Elle a trois parties séparées par des <code>;</code>."},
    {t:"code", cap:"Compter de 1 à 5", x:`<?php
  for ($i = 1; $i <= 5; $i++) {
    echo "Ligne n°$i <br>";
  }
?>`},
    {t:"list", ordered:true, items:[
      "<code>$i = 1</code> — la <b>valeur de départ</b> du compteur.",
      "<code>$i &lt;= 5</code> — la <b>condition</b> : on continue tant qu'elle est vraie.",
      "<code>$i++</code> — l'<b>incrément</b> : on ajoute 1 à chaque tour (<code>$i = $i + 1</code>)."
    ]},

    {t:"h2", x:"2. La boucle while"},
    {t:"p", x:"<code>while</code> (= «&nbsp;tant que&nbsp;») s'utilise quand on <strong>ne sait pas</strong> combien de fois on va boucler. Elle teste la condition <em>avant</em> chaque tour."},
    {t:"code", cap:"Écrire 100 lignes en un clin d'œil", x:`<?php
  $nombre_de_lignes = 1;

  while ($nombre_de_lignes <= 100) {
    echo "Je n'oublie pas le point-virgule.<br>";
    $nombre_de_lignes++;   // indispensable !
  }
?>`},
    {t:"callout", kind:"danger", title:"La boucle infinie", x:"Si tu oublies de faire évoluer la condition (ici <code>$nombre_de_lignes++</code>), la boucle ne s'arrête jamais et fait planter la page. Vérifie toujours qu'il existe une sortie&nbsp;!"},

    {t:"h2", x:"3. La boucle do … while"},
    {t:"p", x:"Identique à <code>while</code>, sauf qu'elle teste la condition <strong>à la fin</strong>. Conséquence&nbsp;: le bloc s'exécute <strong>au moins une fois</strong>, même si la condition est fausse dès le départ."},
    {t:"code", x:`<?php
  $i = 0;
  do {
    echo $i;          // affiche 0 une fois
  } while ($i > 0);   // faux, donc on s'arrête
?>`},
    {t:"callout", kind:"exam", title:"Question type examen", x:"«&nbsp;Quelle est la différence entre <code>while</code> et <code>do..while</code>&nbsp;?&nbsp;» Réponse&nbsp;: <code>do..while</code> exécute toujours au moins une fois car le test est fait après le tour."},

    {t:"p", x:"<strong>Note&nbsp;:</strong> pour parcourir un tableau, il existe une boucle dédiée, <code>foreach</code> — on la voit en détail dans le chapitre Tableaux."},

    {t:"sim", id:"loop"},

    {t:"recap", items:[
      "<code>for</code> → nombre de tours connu (compteur intégré).",
      "<code>while</code> → on boucle «&nbsp;tant que&nbsp;», nombre de tours inconnu.",
      "<code>do..while</code> → au moins un tour garanti.",
      "Toujours prévoir une condition de sortie pour éviter la boucle infinie."
    ]}
  ]
},

/* ---------------------------------------------------------- 4a. FONCTIONS */
{
  id:"fonctions", num:"04", icon:"🧩", title:"Les fonctions",
  subtitle:"Emballer une logique dans une boîte réutilisable. Écris une fois, sers-toi partout.",
  blocks:[
    {t:"p", x:"Une fonction est un <strong>bloc d'instructions nommé</strong> qu'on peut appeler quand on veut. Dès que tu copies-colles le même code deux fois, c'est le signal&nbsp;: il faut une fonction."},
    {t:"analogy", x:"Une fonction, c'est une recette&nbsp;: tu lui donnes des ingrédients (les <em>arguments</em>), elle te rend un plat (la valeur de <em>retour</em>)."},

    {t:"h2", x:"1. Définir et appeler une fonction"},
    {t:"code", cap:"Une fonction qui calcule un carré", x:`<?php
  function carre($nombre) {
    return $nombre * $nombre;
  }

  echo carre(3);   // affiche 9
  echo carre(5);   // affiche 25
?>`},
    {t:"list", items:[
      "<code>function</code> — le mot-clé pour créer une fonction.",
      "<code>carre</code> — son nom (à toi de le choisir, clair et parlant).",
      "<code>$nombre</code> — l'<b>argument</b> : l'ingrédient qu'on lui donne.",
      "<code>return</code> — renvoie le <b>résultat</b> et termine la fonction."
    ]},
    {t:"callout", kind:"tip", title:"echo ou return ?", x:"<code>return</code> <strong>renvoie</strong> une valeur que tu peux réutiliser (la stocker, la calculer encore). <code>echo</code> <strong>affiche</strong> directement. Une bonne fonction calcule et <code>return</code> ; c'est l'appelant qui décide d'afficher."},

    {t:"h3", x:"Plusieurs arguments"},
    {t:"code", cap:"Volume d'un cône", x:`<?php
  function volumeCone($rayon, $hauteur) {
    return $rayon * $rayon * 3.14 * $hauteur / 3;
  }

  echo volumeCone(3, 1);   // 9.42
?>`},

    {t:"h2", x:"2. La portée des variables"},
    {t:"p", x:"Une variable créée <strong>dans</strong> une fonction est <strong>locale</strong>&nbsp;: elle vit seulement le temps de la fonction, puis disparaît. Elle n'a rien à voir avec une variable du même nom à l'extérieur."},
    {t:"code", cap:"Deux $var bien distinctes", x:`<?php
  $var = "a";

  function change_var() {
    $var = "b";   // variable LOCALE, différente
  }

  change_var();
  echo $var;   // affiche "a" — l'extérieur n'a pas bougé
?>`},
    {t:"p", x:"Pour modifier la variable extérieure, on la déclare <code>global</code> dans la fonction&nbsp;:"},
    {t:"code", x:`<?php
  $var = "a";
  function change_var() {
    global $var;
    $var = "b";
  }
  change_var();
  echo $var;   // affiche "b"
?>`},

    {t:"h3", x:"Variable statique"},
    {t:"p", x:"Une variable <code>static</code> est locale mais <strong>garde sa valeur</strong> entre deux appels. Utile pour compter."},
    {t:"code", x:`<?php
  function compte() {
    static $compteur = 0;
    $compteur++;
    echo "$compteur ";
    if ($compteur < 10) compte();
  }
  compte();   // 1 2 3 4 5 6 7 8 9 10
?>`},

    {t:"callout", kind:"exam", title:"Astuce examen", x:"Retiens les trois portées&nbsp;: <strong>locale</strong> (défaut, meurt avec la fonction), <strong>globale</strong> (mot-clé <code>global</code> ou tableau <code>$GLOBALS</code>), <strong>statique</strong> (<code>static</code>, survit entre les appels)."},

    {t:"recap", items:[
      "<code>function nom($args) { return ...; }</code> définit · <code>nom(valeurs)</code> appelle.",
      "<code>return</code> renvoie un résultat réutilisable ; <code>echo</code> affiche.",
      "Variable dans une fonction = locale par défaut.",
      "<code>global</code> pour atteindre l'extérieur · <code>static</code> pour mémoriser entre appels."
    ]}
  ]
}

];
