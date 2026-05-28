/* ============================================================
   quizzes.js — Banque de QCM
   {chap, q, opts:[...], correct:index, explain}
   q et opts peuvent contenir <code>.
   ============================================================ */
window.QUIZZES = [

/* ---- BASES ---- */
{chap:"bases", q:"Comment ouvre-t-on un bloc de code PHP ?", opts:["<code>&lt;php&gt;</code>","<code>&lt;?php</code>","<code>{php}</code>","<code>#php</code>"], correct:1, explain:"Le code PHP s'écrit entre <code>&lt;?php</code> et <code>?&gt;</code>."},
{chap:"bases", q:"Que produit <code>echo 'Salut $nom';</code> si $nom = \"Ali\" ?", opts:["Salut Ali","Salut $nom","Erreur","Salut"], correct:1, explain:"Les guillemets SIMPLES n'interprètent pas les variables. Il faut des guillemets doubles."},
{chap:"bases", q:"Quel symbole précède toute variable en PHP ?", opts:["<code>@</code>","<code>#</code>","<code>$</code>","<code>&</code>"], correct:2, explain:"Toutes les variables PHP commencent par <code>$</code>."},
{chap:"bases", q:"Quel opérateur colle deux chaînes ?", opts:["<code>+</code>","<code>.</code>","<code>&</code>","<code>,</code>"], correct:1, explain:"Le point <code>.</code> est l'opérateur de concaténation en PHP (pas le +)."},
{chap:"bases", q:"Quelle est la différence entre <code>=</code> et <code>==</code> ?", opts:["Aucune","<code>=</code> affecte, <code>==</code> compare","<code>=</code> compare, <code>==</code> affecte","Les deux comparent"], correct:1, explain:"<code>=</code> affecte une valeur, <code>==</code> teste l'égalité."},

/* ---- CONDITIONS ---- */
{chap:"conditions", q:"Que signifie <code>else</code> ?", opts:["Si","Tant que","Sinon","Pour"], correct:2, explain:"<code>else</code> = sinon : exécuté quand le if est faux."},
{chap:"conditions", q:"Dans un <code>switch</code>, à quoi sert <code>break</code> ?", opts:["Arrêter le script","Sortir du case pour éviter la cascade","Recommencer","Rien"], correct:1, explain:"Sans break, PHP exécute aussi les case suivants (effet cascade)."},
{chap:"conditions", q:"Quel opérateur signifie « ET logique » ?", opts:["<code>||</code>","<code>&&</code>","<code>!</code>","<code>==</code>"], correct:1, explain:"<code>&&</code> (ou AND) : vrai seulement si les deux conditions sont vraies."},
{chap:"conditions", q:"Que vaut la condition <code>(5 != 3)</code> ?", opts:["false","true","0","erreur"], correct:1, explain:"<code>!=</code> = différent. 5 est bien différent de 3 → true."},
{chap:"conditions", q:"À quoi sert <code>default</code> dans un switch ?", opts:["La première valeur","Le cas par défaut si aucune ne correspond","Toujours exécuté","Le break automatique"], correct:1, explain:"<code>default</code> gère le cas où aucune valeur ne correspond."},
{chap:"conditions", q:"Quel est le piège le plus fréquent ?", opts:["Mettre trop de else","Écrire <code>if ($x = 5)</code> au lieu de <code>==</code>","Utiliser switch","Oublier default"], correct:1, explain:"<code>=</code> affecte au lieu de comparer ; ça ne plante pas mais fausse la logique."},

/* ---- BOUCLES ---- */
{chap:"boucles", q:"Quelle boucle utiliser quand on connaît le nombre de tours ?", opts:["<code>while</code>","<code>for</code>","<code>do..while</code>","<code>if</code>"], correct:1, explain:"<code>for</code> intègre départ, condition et incrément : idéal quand le nombre est connu."},
{chap:"boucles", q:"Combien de fois s'exécute au minimum un <code>do..while</code> ?", opts:["0","1","Infini","Selon la condition"], correct:1, explain:"Le test étant à la fin, le bloc s'exécute au moins une fois."},
{chap:"boucles", q:"Que fait <code>$i++</code> ?", opts:["Multiplie $i par 2","Ajoute 1 à $i","Enlève 1","Affiche $i"], correct:1, explain:"<code>$i++</code> incrémente : <code>$i = $i + 1</code>."},
{chap:"boucles", q:"Qu'est-ce qui provoque une boucle infinie ?", opts:["Trop de variables","Une condition qui ne devient jamais fausse","Un echo","Un break"], correct:1, explain:"Si rien ne fait évoluer la condition vers false, la boucle ne s'arrête jamais."},
{chap:"boucles", q:"Quelle boucle teste la condition AVANT le premier tour ?", opts:["<code>do..while</code>","<code>while</code>","Les deux","Aucune"], correct:1, explain:"<code>while</code> teste avant : si faux dès le départ, on n'entre jamais dans la boucle."},

/* ---- FONCTIONS ---- */
{chap:"fonctions", q:"Quel mot-clé renvoie une valeur depuis une fonction ?", opts:["<code>echo</code>","<code>return</code>","<code>print</code>","<code>give</code>"], correct:1, explain:"<code>return</code> renvoie la valeur ET termine la fonction."},
{chap:"fonctions", q:"Une variable créée dans une fonction est par défaut…", opts:["globale","locale","statique","constante"], correct:1, explain:"Par défaut elle est locale : elle disparaît à la fin de la fonction."},
{chap:"fonctions", q:"Que fait le mot-clé <code>static</code> sur une variable ?", opts:["La rend globale","Conserve sa valeur entre les appels","La supprime","La rend constante"], correct:1, explain:"Une variable static garde sa valeur d'un appel à l'autre."},
{chap:"fonctions", q:"Comment atteindre une variable externe dans une fonction ?", opts:["<code>extern</code>","<code>global $x;</code>","<code>public</code>","On ne peut pas"], correct:1, explain:"On déclare <code>global $x;</code> (ou on utilise le tableau $GLOBALS)."},
{chap:"fonctions", q:"Quelle est la bonne pratique : calculer puis…", opts:["echo dans la fonction","return le résultat","ne rien faire","global partout"], correct:1, explain:"Une fonction calcule et renvoie (return) ; c'est l'appelant qui décide d'afficher."},

/* ---- CHAÎNES ---- */
{chap:"chaines", q:"Que renvoie <code>strlen(\"PHP\")</code> ?", opts:["1","3","\"PHP\"","0"], correct:1, explain:"strlen compte les caractères : P-H-P = 3."},
{chap:"chaines", q:"<code>explode</code> transforme…", opts:["un tableau en chaîne","une chaîne en tableau","un nombre en texte","rien"], correct:1, explain:"explode coupe une chaîne en tableau ; implode fait l'inverse."},
{chap:"chaines", q:"À quelle position commence le premier caractère pour <code>substr</code> ?", opts:["1","0","-1","Selon la chaîne"], correct:1, explain:"L'indexation des caractères commence à 0."},
{chap:"chaines", q:"Pourquoi tester <code>strpos</code> avec <code>!== false</code> ?", opts:["Pour la vitesse","Car une position 0 serait confondue avec false","Par convention","C'est inutile"], correct:1, explain:"Si le caractère est en position 0, <code>== false</code> donnerait un faux négatif."},
{chap:"chaines", q:"Que fait <code>trim(\"  php  \")</code> ?", opts:["\"php\"","\"  php  \"","\"PHP\"","Erreur"], correct:0, explain:"trim retire les espaces de début et de fin → \"php\"."},
{chap:"chaines", q:"Quelle fonction remplace un texte par un autre ?", opts:["<code>str_change</code>","<code>str_replace</code>","<code>replace</code>","<code>substr</code>"], correct:1, explain:"<code>str_replace(cherche, remplace, chaîne)</code> remplace toutes les occurrences."},

/* ---- TABLEAUX ---- */
{chap:"tableaux", q:"Quel est l'indice du premier élément d'un tableau ?", opts:["1","0","-1","Aléatoire"], correct:1, explain:"Par défaut le premier élément a l'indice 0."},
{chap:"tableaux", q:"Quelle boucle est idéale pour parcourir un tableau ?", opts:["<code>for</code>","<code>foreach</code>","<code>do..while</code>","<code>switch</code>"], correct:1, explain:"<code>foreach</code> est dédiée aux tableaux : pas de compteur, marche aussi sur les associatifs."},
{chap:"tableaux", q:"Que renvoie <code>count([\"a\",\"b\",\"c\"])</code> ?", opts:["2","3","\"c\"","0"], correct:1, explain:"count compte les éléments : 3."},
{chap:"tableaux", q:"Quel opérateur définit une clé dans un tableau associatif ?", opts:["<code>-&gt;</code>","<code>=&gt;</code>","<code>::</code>","<code>:</code>"], correct:1, explain:"On écrit <code>\"cle\" =&gt; \"valeur\"</code>."},
{chap:"tableaux", q:"<code>in_array(\"x\", $t)</code> vérifie…", opts:["si \"x\" est une clé","si \"x\" est une valeur","la taille du tableau","l'ordre"], correct:1, explain:"in_array cherche une VALEUR. Pour une clé, c'est array_key_exists."},
{chap:"tableaux", q:"Que fait <code>sort($t)</code> ?", opts:["Renvoie un tableau trié","Trie $t en place par valeurs croissantes","Trie par clé","Supprime les doublons"], correct:1, explain:"sort modifie le tableau directement (croissant). Ne fais pas <code>$t = sort($t)</code>."},

/* ---- MYSQL ---- */
{chap:"mysql", q:"Quelle est la 1re des 4 étapes ?", opts:["Requête","Connexion au serveur","Fermeture","Affichage"], correct:1, explain:"Ordre : connexion → sélection base → requête → exploitation (+ fermeture)."},
{chap:"mysql", q:"<code>mysql_fetch_array</code> renvoie une ligne sous forme de…", opts:["objet","tableau associatif","chaîne","entier"], correct:1, explain:"fetch_array → tableau associatif : <code>$row['nom']</code>."},
{chap:"mysql", q:"Quelle fonction compte les lignes d'un SELECT ?", opts:["<code>count()</code>","<code>mysql_num_rows()</code>","<code>strlen()</code>","<code>sizeof()</code>"], correct:1, explain:"mysql_num_rows() renvoie le nombre d'enregistrements retournés."},
{chap:"mysql", q:"Comment lit-on toutes les lignes d'un résultat ?", opts:["Un seul fetch","<code>while ($r = mysql_fetch_array($res))</code>","Avec switch","Avec strlen"], correct:1, explain:"La boucle while + fetch avance le pointeur jusqu'à la dernière ligne."},
{chap:"mysql", q:"<code>mysql_insert_id()</code> sert à…", opts:["compter les lignes","récupérer le dernier ID auto-incrémenté","fermer la base","sélectionner la base"], correct:1, explain:"Après un INSERT, elle renvoie l'identifiant généré automatiquement."},

/* ---- SESSIONS ---- */
{chap:"sessions", q:"Où doit-on appeler <code>session_start()</code> ?", opts:["N'importe où","Tout en haut, avant tout HTML","À la fin","Dans le body"], correct:1, explain:"Avant tout affichage, sinon erreur « headers already sent »."},
{chap:"sessions", q:"Où sont stockées les variables de session ?", opts:["Chez le client","Côté serveur","Dans l'URL","Dans un cookie texte"], correct:1, explain:"La session vit côté serveur ; seul l'ID transite (souvent via cookie)."},
{chap:"sessions", q:"Un cookie est stocké…", opts:["côté serveur","côté client (navigateur)","dans la base","nulle part"], correct:1, explain:"Un cookie est un petit fichier texte stocké sur la machine du visiteur."},
{chap:"sessions", q:"Comment ferme-t-on une session ?", opts:["<code>session_close()</code>","<code>session_destroy()</code>","<code>unset()</code>","<code>exit</code>"], correct:1, explain:"<code>session_destroy()</code> détruit la session (déconnexion)."},
{chap:"sessions", q:"Que fait <code>setcookie(\"X\", \"\", time()-3600)</code> ?", opts:["Crée X","Détruit le cookie X (date passée)","Lit X","Rien"], correct:1, explain:"Une date d'expiration dans le passé supprime le cookie."}

];
