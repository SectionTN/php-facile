/* ============================================================
   chapters2.js — Suite des chapitres (chaînes, tableaux, MySQL, sessions)
   ============================================================ */
window.CHAPTERS.push(

/* ---------------------------------------------------------- 4b. CHAÎNES */
{
  id:"chaines", num:"04", icon:"✂️", title:"Les chaînes de caractères",
  subtitle:"Découper, mesurer, nettoyer, remplacer. La boîte à outils du texte.",
  blocks:[
    {t:"p", x:"Manipuler du texte est le quotidien d'un site&nbsp;: vérifier un formulaire, formater un nom, découper une adresse. PHP offre une <strong>énorme</strong> bibliothèque de fonctions pour ça. Voici les essentielles."},

    {t:"h2", x:"1. Mesurer et tester"},
    {t:"code", cap:"Longueur et champ vide", x:`<?php
  $titre = "PHP";
  echo strlen($titre);   // 3 (nombre de caractères)

  if (empty($titre)) {
    echo "Le titre est vide !";
  }
?>`},
    {t:"list", items:[
      "<code>strlen($ch)</code> — longueur de la chaîne.",
      "<code>empty($v)</code> — vrai si la variable est vide (\"\", 0, null…).",
      "<code>isset($v)</code> — vrai si la variable existe et n'est pas null."
    ]},

    {t:"h2", x:"2. Extraire un morceau : substr"},
    {t:"p", x:"<code>substr($chaine, $debut, $longueur)</code> découpe une sous-chaîne. Attention&nbsp;: le premier caractère est à la position <strong>0</strong>."},
    {t:"code", cap:"Vérifier qu'une URL commence par http://", x:`<?php
  $url = "https://iset.tn";
  $debut = substr($url, 0, 7);   // 7 premiers caractères
  echo $debut;                    // "https:/"
?>`},

    {t:"h2", x:"3. Transformer"},
    {t:"list", items:[
      "<code>strtolower($ch)</code> — tout en minuscules · <code>strtoupper()</code> en majuscules.",
      "<code>trim($ch)</code> — retire les espaces au début et à la fin.",
      "<code>strrev($ch)</code> — inverse la chaîne.",
      "<code>str_replace(\"a\", \"b\", $ch)</code> — remplace toutes les occurrences."
    ]},
    {t:"code", cap:"Nettoyer puis remplacer", x:`<?php
  $saisie = "   bonjour   ";
  $propre = trim($saisie);            // "bonjour"

  $phrase = "tout est rouge";
  echo str_replace("rouge", "bleu", $phrase);  // tout est bleu
?>`},
    {t:"callout", kind:"tip", title:"Réflexe pro", x:"Avant de traiter une saisie utilisateur (formulaire), passe-la toujours par <code>trim()</code>. Les espaces invisibles sont la cause n°1 des comparaisons qui «&nbsp;devraient marcher mais ne marchent pas&nbsp;»."},

    {t:"h2", x:"4. Chercher une position : strpos"},
    {t:"code", x:`<?php
  $email = "ali@iset.tn";
  $pos = strpos($email, "@");   // 3
  if ($pos !== false) {
    echo "Email valide, @ trouvé en position $pos";
  }
?>`},
    {t:"callout", kind:"danger", title:"Le piège du 0", x:"Si le caractère est en position 0, <code>strpos</code> renvoie <code>0</code>, que PHP confond avec «&nbsp;faux&nbsp;». Utilise toujours <code>!== false</code> (avec trois <code>=</code>) pour tester."},

    {t:"h2", x:"5. Couper / recoller : explode & implode"},
    {t:"p", x:"Le duo star des examens. <code>explode</code> casse une chaîne en tableau ; <code>implode</code> recolle un tableau en chaîne. Ce sont des opérations <strong>inverses</strong>."},
    {t:"code", x:`<?php
  $chaine = "Nom|Prenom|Adresse";
  $champs = explode("|", $chaine);
  // ["Nom", "Prenom", "Adresse"]

  $tab = ["La", "raison", "du", "plus", "fort"];
  echo implode(" ", $tab);   // "La raison du plus fort"
?>`},

    {t:"sim", id:"implode"},

    {t:"recap", items:[
      "<code>strlen</code> mesure · <code>substr</code> découpe · <code>trim</code> nettoie · <code>str_replace</code> remplace.",
      "<code>strpos</code> cherche une position — teste avec <code>!== false</code>.",
      "<code>explode(sep, chaîne)</code> → tableau · <code>implode(sep, tableau)</code> → chaîne.",
      "Ce sont deux opérations inverses — la question revient TOUT le temps en examen."
    ]}
  ]
},

/* ---------------------------------------------------------- 5. TABLEAUX */
{
  id:"tableaux", num:"05", icon:"📚", title:"Les tableaux",
  subtitle:"Une seule variable pour ranger 1000 valeurs. Indexés ou associatifs.",
  blocks:[
    {t:"p", x:"Un tableau (<code>array</code>) stocke <strong>plusieurs valeurs</strong> sous un seul nom. Chaque valeur a une <strong>clé</strong> (ou indice) pour la retrouver. Par défaut, la première valeur a l'indice <strong>0</strong>."},
    {t:"analogy", x:"Imagine un casier à tiroirs numérotés. Le tableau, c'est le meuble ; chaque tiroir a un numéro (la clé) et contient un objet (la valeur)."},

    {t:"h2", x:"1. Créer un tableau"},
    {t:"code", cap:"Trois façons équivalentes", x:`<?php
  // ajout au fil de l'eau
  $tab[] = "a";   $tab[] = "b";   $tab[] = "c";

  // avec la fonction array()
  $tab = array("a", "b", "c");

  // syntaxe moderne (crochets)
  $tab = ["a", "b", "c"];

  echo $tab[1];   // "b" (les indices commencent à 0 !)
?>`},

    {t:"h2", x:"2. Les tableaux associatifs"},
    {t:"p", x:"Au lieu de numéros, on utilise des <strong>noms</strong> comme clés avec l'opérateur <code>=&gt;</code>. Beaucoup plus parlant."},
    {t:"code", x:`<?php
  $tab = [
    "forme"   => "rond",
    "couleur" => "vert",
    "poids"   => 30
  ];

  echo $tab["couleur"];   // "vert"
?>`},

    {t:"h2", x:"3. Parcourir un tableau : foreach"},
    {t:"p", x:"<code>foreach</code> est la boucle <strong>spéciale tableaux</strong>. Pas de compteur à gérer, pas d'erreur d'indice&nbsp;: elle passe sur chaque élément, point."},
    {t:"code", cap:"Valeurs seules, puis clé + valeur", x:`<?php
  $tab = ["forme"=>"rond", "couleur"=>"vert", "poids"=>30];

  // 1) juste les valeurs
  foreach ($tab as $valeur) {
    echo "$valeur <br>";          // rond / vert / 30
  }

  // 2) clé ET valeur
  foreach ($tab as $cle => $valeur) {
    echo "$cle : $valeur <br>";   // forme : rond ...
  }
?>`},
    {t:"callout", kind:"tip", title:"foreach > for pour les tableaux", x:"Tu peux parcourir un tableau avec <code>for</code> et <code>sizeof()</code>/<code>count()</code>, mais <code>foreach</code> est plus court, plus clair et marche aussi sur les tableaux associatifs. Préfère-le."},

    {t:"h2", x:"4. Fonctions utiles"},
    {t:"list", items:[
      "<code>count($tab)</code> (ou <code>sizeof</code>) — nombre d'éléments.",
      "<code>sort($tab)</code> — trie par valeur croissante · <code>rsort()</code> décroissante.",
      "<code>ksort($tab)</code> — trie par clé · <code>krsort()</code> par clé décroissante.",
      "<code>in_array(\"x\", $tab)</code> — vrai si la valeur existe.",
      "<code>array_push($tab, \"x\")</code> — ajoute un élément à la fin."
    ]},
    {t:"code", cap:"Trier des pays", x:`<?php
  $pays = ["Suisse", "Canada", "France", "Allemagne"];
  sort($pays);
  // Allemagne, Canada, France, Suisse
  echo count($pays);   // 4
?>`},

    {t:"sim", id:"array"},

    {t:"recap", items:[
      "Tableau indexé&nbsp;: clés = 0, 1, 2… · associatif&nbsp;: clés = noms via <code>=&gt;</code>.",
      "<code>foreach ($tab as $cle =&gt; $val)</code> est LA façon de parcourir.",
      "<code>count</code> compte · <code>sort</code>/<code>ksort</code> trient · <code>in_array</code> cherche.",
      "Les indices commencent à 0 — un grand classique des pièges."
    ]}
  ]
},

/* ---------------------------------------------------------- 6. MYSQL */
{
  id:"mysql", num:"06", icon:"🗄️", title:"MySQL avec PHP",
  subtitle:"Connecter ton site à une base de données : lire, insérer, mettre à jour.",
  blocks:[
    {t:"p", x:"Jusqu'ici, tes données disparaissaient à la fin du script. Avec une <strong>base de données</strong>, elles sont stockées durablement. PHP + MySQL, c'est le moteur de la plupart des sites web."},
    {t:"callout", kind:"warn", title:"Note importante sur les versions", x:"Ton cours utilise les fonctions <code>mysql_*</code> (style historique, parfait pour comprendre les 4 étapes). En production aujourd'hui, on utilise <strong>mysqli</strong> ou <strong>PDO</strong>, plus sûrs. Le raisonnement reste identique&nbsp;; on garde la syntaxe du cours ici."},

    {t:"h2", x:"Les 4 étapes (à connaître par cœur)"},
    {t:"list", ordered:true, items:[
      "<b>Se connecter</b> au serveur de base de données.",
      "<b>Sélectionner</b> la base à utiliser.",
      "<b>Exécuter</b> une requête SQL.",
      "<b>Exploiter</b> le résultat, puis fermer la connexion."
    ]},

    {t:"h2", x:"1. Connexion + sélection"},
    {t:"code", x:`<?php
  $link = mysql_connect("localhost", "root", "");
  if (!$link) {
    die("Connexion impossible");
  }
  mysql_select_db("ma_base");
  echo "Connexion réussie !";
?>`},
    {t:"callout", kind:"tip", title:"Le @ et le die()", x:"<code>@mysql_connect(...)</code> masque le warning par défaut. <code>die(\"message\")</code> arrête tout le script en affichant un message — pratique quand la connexion échoue."},

    {t:"h2", x:"2. Exécuter une requête"},
    {t:"code", x:`<?php
  $requete = "SELECT * FROM membres WHERE nom = 'YOUSSEF'";
  $resultat = mysql_query($requete);
?>`},
    {t:"p", x:"<code>mysql_query</code> envoie le SQL et renvoie un <strong>identifiant de résultat</strong>. Cet identifiant est précieux&nbsp;: c'est lui qu'on passe aux fonctions de lecture."},

    {t:"h2", x:"3. Lire les résultats"},
    {t:"list", items:[
      "<code>mysql_fetch_row</code> — une ligne en tableau numéroté (<code>$r[0]</code>, <code>$r[1]</code>…).",
      "<code>mysql_fetch_array</code> — une ligne en tableau associatif (<code>$r['nom']</code>).",
      "<code>mysql_fetch_object</code> — une ligne en objet (<code>$r->nom</code>).",
      "<code>mysql_num_rows</code> — combien de lignes au total."
    ]},
    {t:"code", cap:"Afficher tous les membres", x:`<?php
  $result = mysql_query("SELECT * FROM membres");
  echo "Il y a " . mysql_num_rows($result) . " membre(s)";

  while ($ligne = mysql_fetch_array($result)) {
    echo $ligne['nom'] . " " . $ligne['prenom'] . "<br>";
  }
?>`},
    {t:"analogy", x:"Le <code>while + fetch</code>, c'est comme distribuer un paquet de cartes&nbsp;: à chaque tour on tire la carte du dessus jusqu'à ce qu'il n'en reste plus. <code>fetch</code> avance le «&nbsp;pointeur&nbsp;» tout seul."},

    {t:"h2", x:"4. Insérer des données"},
    {t:"code", x:`<?php
  $query = "INSERT INTO membres(nom, prenom)
            VALUES ('$nom', '$prenom')";
  mysql_query($query);

  echo "Nouvel ID : " . mysql_insert_id();
  mysql_close($link);
?>`},
    {t:"list", items:[
      "<code>mysql_insert_id()</code> — récupère le dernier ID auto-incrémenté.",
      "<code>mysql_affected_rows()</code> — combien de lignes modifiées par un UPDATE/DELETE.",
      "<code>mysql_close($link)</code> — ferme proprement la connexion."
    ]},

    {t:"recap", items:[
      "4 étapes&nbsp;: connecter → sélectionner → requêter → exploiter (+ fermer).",
      "<code>mysql_query</code> renvoie un identifiant de résultat à réutiliser.",
      "<code>while ($l = mysql_fetch_array($r))</code> = la boucle reine pour lire.",
      "<code>fetch_array</code> donne <code>$l['colonne']</code> ; <code>num_rows</code> compte."
    ]}
  ]
},

/* ---------------------------------------------------------- 7. SESSIONS & COOKIES */
{
  id:"sessions", num:"07", icon:"🔐", title:"Sessions & Cookies",
  subtitle:"Se souvenir d'un visiteur d'une page à l'autre : connexion, panier, préférences.",
  blocks:[
    {t:"p", x:"Le web est <strong>sans mémoire</strong>&nbsp;: chaque page est une nouvelle conversation. Les sessions et les cookies servent à se souvenir du visiteur — pour le garder connecté, retenir son panier, etc."},

    {t:"h2", x:"1. Les sessions"},
    {t:"p", x:"Une session conserve des variables <strong>sur toutes les pages</strong> du site. PHP génère un identifiant unique (le <em>PHPSESSID</em>) et le transmet automatiquement de page en page."},
    {t:"callout", kind:"danger", title:"La règle d'or", x:"<code>session_start()</code> doit être appelé <strong>tout en haut</strong> de chaque page, AVANT le moindre code HTML (même avant <code>&lt;!DOCTYPE&gt;</code> ou un espace). Sinon&nbsp;: erreur «&nbsp;headers already sent&nbsp;»."},
    {t:"code", cap:"Page 1 : on enregistre", x:`<?php
  session_start();   // toujours en premier

  $_SESSION['prenom'] = 'Ali';
  $_SESSION['nom']    = 'Tlili';
  $_SESSION['age']    = 24;
?>
<html>
  <body>Salut <?php echo $_SESSION['prenom']; ?> !</body>
</html>`},
    {t:"code", cap:"Page 2 : on se souvient (sans rien refaire)", x:`<?php
  session_start();
?>
<html>
  <body>
    Re-bonjour <?php echo $_SESSION['prenom']; ?> !
    Tu as <?php echo $_SESSION['age']; ?> ans.
  </body>
</html>`},
    {t:"p", x:"On utilise <code>$_SESSION['cle']</code> comme une variable normale. Pour fermer la session (déconnexion)&nbsp;: <code>session_destroy()</code>."},
    {t:"callout", kind:"exam", title:"À quoi ça sert concrètement ?", x:"Authentification (rester connecté) · zone d'admin sécurisée · panier d'achat sur un site e-commerce. Ce sont les exemples qui tombent en examen."},

    {t:"h2", x:"2. Les cookies"},
    {t:"p", x:"Un cookie est un <strong>petit fichier texte stocké chez le visiteur</strong> (dans son navigateur). Différence clé avec la session&nbsp;: le cookie vit côté client et peut durer des jours, la session vit côté serveur et est temporaire."},
    {t:"code", cap:"Créer un cookie valable 1 heure", x:`<?php
  // setcookie(nom, valeur, expiration)
  setcookie("VISITEUR", date("d/m/y"), time() + 3600);

  // le lire ensuite
  echo $_COOKIE["VISITEUR"];
?>`},
    {t:"list", items:[
      "<b>name</b> — le nom du cookie · <b>value</b> — ce qu'il contient.",
      "<b>expire</b> — date d'expiration en secondes (<code>time() + 3600</code> = dans 1h).",
      "<code>setcookie(\"VISITEUR\", \"\", time()-3600)</code> — pour le détruire (date passée)."
    ]},
    {t:"callout", kind:"warn", title:"Même contrainte que les sessions", x:"<code>setcookie()</code> doit aussi être appelée <strong>avant tout HTML</strong>, car elle envoie des en-têtes HTTP."},

    {t:"recap", items:[
      "Session = mémoire côté <b>serveur</b>, temporaire · Cookie = fichier côté <b>client</b>, durable.",
      "<code>session_start()</code> en haut de CHAQUE page, avant tout HTML.",
      "<code>$_SESSION['x']</code> pour lire/écrire · <code>session_destroy()</code> pour fermer.",
      "<code>setcookie(nom, valeur, expiration)</code> · lecture via <code>$_COOKIE['nom']</code>."
    ]}
  ]
}

);
