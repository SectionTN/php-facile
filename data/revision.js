/* ============================================================
   revision.js — Fiches de révision + fiche "Dernière heure"
   FICHES : {chap, title, rows:[[gauche, droite]...]}
   FLASH  : fiche ultra-condensée avant l'examen
   ============================================================ */
window.FICHES = [
{ chap:"bases", title:"Les bases", rows:[
  ["<code>&lt;?php ?&gt;</code>","Délimite le code PHP"],
  ["<code>echo</code>","Affiche du texte / une variable"],
  ["<code>$var</code>","Une variable (toujours avec $)"],
  ['Guillemets <code>"..."</code>',"Lisent les variables · <code>'...'</code> = texte brut"],
  ["<code>.</code>","Colle deux chaînes (concaténation)"],
  ["<code>;</code>","Fin d'instruction — obligatoire"]
]},
{ chap:"conditions", title:"Conditions", rows:[
  ["<code>if (c) { }</code>","Exécute si c est vrai"],
  ["<code>else</code>","Sinon"],
  ["<code>elseif</code>","Cas intermédiaire"],
  ["<code>== != &gt; &lt; &gt;= &lt;=</code>","Comparaisons"],
  ["<code>=== </code>","Égal ET même type (strict)"],
  ["<code>&& || !</code>","ET · OU · NON"],
  ["<code>switch / case / break</code>","Comparer 1 variable à n valeurs"]
]},
{ chap:"boucles", title:"Boucles", rows:[
  ["<code>for ($i=0; $i&lt;n; $i++)</code>","Tours connus"],
  ["<code>while (c)</code>","Tant que c (test avant)"],
  ["<code>do { } while (c)</code>","≥ 1 tour (test après)"],
  ["<code>foreach</code>","Spécial tableaux"],
  ["<code>$i++ / $i--</code>","Incrémenter / décrémenter"],
  ["⚠ Boucle infinie","Si la condition ne devient jamais fausse"]
]},
{ chap:"fonctions", title:"Fonctions", rows:[
  ["<code>function f($a) { }</code>","Définir"],
  ["<code>return</code>","Renvoie un résultat + termine"],
  ["Portée locale","Défaut, meurt avec la fonction"],
  ["<code>global $x</code>","Atteindre une variable externe"],
  ["<code>static $x</code>","Garde sa valeur entre appels"]
]},
{ chap:"chaines", title:"Chaînes", rows:[
  ["<code>strlen</code>","Longueur"],
  ["<code>substr($c, $d, $l)</code>","Extraire (début = 0)"],
  ["<code>trim</code>","Nettoie les espaces (début/fin)"],
  ["<code>str_replace(a,b,c)</code>","Remplace a par b"],
  ["<code>strpos</code>","Position (tester <code>!== false</code>)"],
  ["<code>explode(sep, ch)</code>","Chaîne → tableau"],
  ["<code>implode(sep, tab)</code>","Tableau → chaîne"]
]},
{ chap:"tableaux", title:"Tableaux", rows:[
  ["<code>$t = [1, 2, 3]</code>","Tableau indexé (clés 0,1,2)"],
  ["<code>[\"cle\" =&gt; \"val\"]</code>","Tableau associatif"],
  ["<code>$t[0]</code> / <code>$t[\"cle\"]</code>","Accès"],
  ["<code>foreach ($t as $k=&gt;$v)</code>","Parcours"],
  ["<code>count</code>","Nombre d'éléments"],
  ["<code>sort / ksort</code>","Trier par valeur / clé"],
  ["<code>in_array / array_push</code>","Chercher / ajouter"]
]},
{ chap:"mysql", title:"MySQL", rows:[
  ["<code>mysql_connect</code>","1. Connexion serveur"],
  ["<code>mysql_select_db</code>","2. Choisir la base"],
  ["<code>mysql_query</code>","3. Exécuter SQL"],
  ["<code>mysql_fetch_array</code>","Lire 1 ligne (assoc)"],
  ["<code>mysql_num_rows</code>","Nombre de lignes"],
  ["<code>mysql_insert_id</code>","Dernier ID inséré"],
  ["<code>mysql_close</code>","Fermer"]
]},
{ chap:"sessions", title:"Sessions & Cookies", rows:[
  ["<code>session_start()</code>","En 1er, avant tout HTML"],
  ["<code>$_SESSION['x']</code>","Variable de session"],
  ["<code>session_destroy()</code>","Fermer la session"],
  ["<code>setcookie(n, v, exp)</code>","Créer un cookie"],
  ["<code>$_COOKIE['n']</code>","Lire un cookie"],
  ["Session = serveur","Cookie = client (durable)"]
]}
];

/* Fiche dernière heure : les pièges + l'essentiel ultra-condensé */
window.FLASH = [
  { t:"Syntaxe vitale", items:[
    "Tout finit par <code>;</code> · variables avec <code>$</code> · code entre <code>&lt;?php ?&gt;</code>.",
    "Guillemets doubles lisent les variables, simples = texte brut.",
    "Concaténation = le point <code>.</code> (pas le +)."
  ]},
  { t:"Pièges qui coûtent des points", items:[
    "<code>=</code> affecte ≠ <code>==</code> compare.",
    "Indice de tableau et position de caractère commencent à <strong>0</strong>.",
    "<code>strpos</code> : tester <code>!== false</code> (pas <code>== false</code>).",
    "Oublier <code>break</code> dans un switch → cascade.",
    "Oublier de faire évoluer la condition → boucle infinie."
  ]},
  { t:"Fonctions à ne pas confondre", items:[
    "<code>explode</code> (chaîne→tableau) vs <code>implode</code> (tableau→chaîne).",
    "<code>isset</code> (existe ?) vs <code>empty</code> (vide ?).",
    "<code>echo</code> (affiche) vs <code>return</code> (renvoie).",
    "<code>include</code> (continue) vs <code>require</code> (arrête si absent)."
  ]},
  { t:"Boucles & portée", items:[
    "<code>for</code> = tours connus · <code>while</code> = inconnu · <code>do..while</code> = ≥1 tour.",
    "<code>foreach ($t as $k =&gt; $v)</code> pour les tableaux.",
    "Variable de fonction = locale · <code>global</code> · <code>static</code> (mémorise)."
  ]},
  { t:"Web : sessions & BDD", items:[
    "<code>session_start()</code> et <code>setcookie()</code> AVANT tout HTML.",
    "4 étapes MySQL : connecter → sélectionner → requêter → exploiter.",
    "Lire : <code>while ($r = mysql_fetch_array($res))</code>."
  ]}
];
