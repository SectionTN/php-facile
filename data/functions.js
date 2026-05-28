/* ============================================================
   functions.js — Référence des fonctions PHP importantes
   {name, cat, short, sig, desc, ex:[{code,out}], errors:[],
    compare?, mini:[{q,a}]}
   ============================================================ */
window.FUNCTIONS = [

{ name:"echo", cat:"Base", short:"Afficher du texte ou des variables.",
  sig:"echo $valeur;",
  desc:"La fonction de base pour afficher. Accepte plusieurs valeurs séparées par des virgules. N'a pas de valeur de retour.",
  ex:[{code:`echo "Bonjour";\necho "Total : ", 5 + 3;`, out:`Bonjour\nTotal : 8`}],
  errors:["Oublier le point-virgule.","Utiliser des guillemets simples quand on veut lire une variable : 'Salut $nom' n'interprète pas $nom."],
  mini:[{q:"Affiche « J'ai 20 ans » avec une variable $age = 20.", a:`$age = 20;\necho "J'ai $age ans";`}]
},

{ name:"strlen", cat:"Chaînes", short:"Compter le nombre de caractères d'une chaîne.",
  sig:"int strlen(string $chaine)",
  desc:"Renvoie la longueur d'une chaîne. Très utilisée pour valider une saisie (mot de passe trop court, etc.).",
  ex:[{code:`echo strlen("PHP");\necho strlen("");`, out:`3\n0`}],
  errors:["Croire que ça compte les mots — ça compte les caractères, espaces compris."],
  mini:[{q:"Vérifie qu'un mot de passe $mdp fait au moins 8 caractères.", a:`if (strlen($mdp) >= 8) {\n  echo "OK";\n} else {\n  echo "Trop court";\n}`}]
},

{ name:"substr", cat:"Chaînes", short:"Extraire une portion de chaîne.",
  sig:"string substr(string $ch, int $debut, int $longueur)",
  desc:"Découpe une sous-chaîne à partir de la position $debut (qui commence à 0). Si on omet la longueur, on va jusqu'à la fin.",
  ex:[{code:`$url = "https://iset.tn";\necho substr($url, 0, 5);\necho substr($url, 8);`, out:`https\niset.tn`}],
  errors:["Oublier que le premier caractère est à la position 0, pas 1.","Un $debut négatif compte depuis la fin (piège utile mais surprenant)."],
  mini:[{q:"Extrais les 3 premières lettres de \"Bonjour\".", a:`echo substr("Bonjour", 0, 3);   // Bon`}]
},

{ name:"trim", cat:"Chaînes", short:"Supprimer les espaces en début et fin de chaîne.",
  sig:"string trim(string $chaine)",
  desc:"Nettoie les espaces blancs (espace, tabulation, retour à la ligne) au début et à la fin. Réflexe systématique sur les saisies de formulaire.",
  ex:[{code:`$saisie = "   php   ";\necho "[" . trim($saisie) . "]";`, out:`[php]`}],
  errors:["Ne nettoie PAS les espaces au milieu de la chaîne.","Oublier de réaffecter : trim() renvoie une nouvelle chaîne, il ne modifie pas l'originale en place."],
  mini:[{q:"Nettoie $email avant de l'utiliser.", a:`$email = trim($email);`}]
},

{ name:"str_replace", cat:"Chaînes", short:"Remplacer un texte par un autre.",
  sig:"string str_replace($cherche, $remplace, $chaine)",
  desc:"Remplace toutes les occurrences de $cherche par $remplace dans $chaine.",
  ex:[{code:`echo str_replace("rouge", "bleu", "tout est rouge");`, out:`tout est bleu`}],
  errors:["Penser qu'il ne remplace que la première occurrence — il les remplace TOUTES."],
  mini:[{q:"Remplace tous les espaces de $nom par des tirets.", a:`echo str_replace(" ", "-", $nom);`}]
},

{ name:"strpos", cat:"Chaînes", short:"Trouver la position d'un texte dans une chaîne.",
  sig:"int|false strpos($chaine, $recherche)",
  desc:"Renvoie la position (à partir de 0) de la première occurrence, ou false si absent.",
  ex:[{code:`$pos = strpos("ali@iset.tn", "@");\necho $pos;`, out:`3`}],
  errors:["Tester avec == au lieu de !== false : si le texte est en position 0, PHP confond 0 et false."],
  compare:"strpos cherche une POSITION ; in_array cherche une valeur dans un TABLEAU ; strstr renvoie le reste de la chaîne.",
  mini:[{q:"Vérifie qu'un email contient un @.", a:`if (strpos($email, "@") !== false) {\n  echo "Valide";\n}`}]
},

{ name:"explode", cat:"Chaînes ↔ Tableaux", short:"Casser une chaîne en tableau.",
  sig:"array explode(string $sep, string $chaine)",
  desc:"Coupe la chaîne à chaque séparateur et renvoie un tableau des morceaux. L'inverse exact d'implode.",
  ex:[{code:`$parts = explode(",", "a,b,c,d");\nprint_r($parts);`, out:`Array ( [0]=>a [1]=>b [2]=>c [3]=>d )`}],
  errors:["Inverser l'ordre des arguments : c'est (séparateur, chaîne), pas l'inverse."],
  compare:"explode : chaîne → tableau.  implode : tableau → chaîne. Ce sont des opérations inverses.",
  mini:[{q:"Découpe \"2024-05-28\" en année, mois, jour.", a:`$d = explode("-", "2024-05-28");\n// $d[0]=2024, $d[1]=05, $d[2]=28`}]
},

{ name:"implode", cat:"Chaînes ↔ Tableaux", short:"Recoller un tableau en une chaîne.",
  sig:"string implode(string $sep, array $tableau)",
  desc:"Assemble tous les éléments du tableau en une chaîne, séparés par $sep. L'inverse d'explode.",
  ex:[{code:`$tab = ["La", "raison", "du", "plus", "fort"];\necho implode(" ", $tab);`, out:`La raison du plus fort`}],
  errors:["Confondre avec explode — implode prend un TABLEAU et rend une CHAÎNE."],
  compare:"Astuce mémo : ex-PLODE explose (→ tableau), im-PLODE implose/rassemble (→ chaîne).",
  mini:[{q:"Affiche un tableau $jours séparé par des virgules.", a:`echo implode(", ", $jours);`}]
},

{ name:"isset", cat:"Tests", short:"Vérifier qu'une variable existe.",
  sig:"bool isset($variable)",
  desc:"Renvoie true si la variable existe et n'est pas null. Essentiel pour tester les champs d'un formulaire avant de les utiliser.",
  ex:[{code:`if (isset($_POST['nom'])) {\n  echo "Le champ nom a été envoyé";\n}`, out:`(si le formulaire est soumis)`}],
  errors:["Confondre avec empty : isset teste l'EXISTENCE, empty teste si c'est VIDE."],
  compare:"isset($x) → la variable existe-t-elle ? · empty($x) → est-elle vide (\"\", 0, null) ?",
  mini:[{q:"Affiche le pseudo seulement s'il existe.", a:`if (isset($_GET['pseudo'])) {\n  echo $_GET['pseudo'];\n}`}]
},

{ name:"empty", cat:"Tests", short:"Vérifier qu'une variable est vide.",
  sig:"bool empty($variable)",
  desc:"Renvoie true si la variable est vide : \"\", 0, \"0\", null, false ou inexistante.",
  ex:[{code:`$titre = "";\nif (empty($titre)) {\n  echo "Le titre est vide !";\n}`, out:`Le titre est vide !`}],
  errors:["Oublier que empty(\"0\") vaut true — la chaîne \"0\" est considérée vide. Piège classique !"],
  mini:[{q:"Bloque l'envoi si le champ $message est vide.", a:`if (empty($message)) {\n  die("Message obligatoire");\n}`}]
},

{ name:"count", cat:"Tableaux", short:"Compter les éléments d'un tableau.",
  sig:"int count(array $tableau)",
  desc:"Renvoie le nombre d'éléments. Synonyme : sizeof(). Très utilisé pour les boucles et les vérifications.",
  ex:[{code:`$tab = ["a", "b", "c"];\necho count($tab);`, out:`3`}],
  errors:["count() sur une chaîne ne marche pas — pour le texte, c'est strlen()."],
  mini:[{q:"Affiche \"Panier vide\" si $panier ne contient rien.", a:`if (count($panier) == 0) {\n  echo "Panier vide";\n}`}]
},

{ name:"in_array", cat:"Tableaux", short:"Vérifier si une valeur est dans un tableau.",
  sig:"bool in_array($valeur, array $tableau)",
  desc:"Renvoie true si $valeur figure parmi les valeurs du tableau.",
  ex:[{code:`$fruits = ["pomme", "kiwi"];\nif (in_array("kiwi", $fruits)) {\n  echo "Trouvé !";\n}`, out:`Trouvé !`}],
  errors:["Chercher une clé au lieu d'une valeur — pour les clés, c'est array_key_exists()."],
  mini:[{q:"Vérifie que \"admin\" est dans le tableau $roles.", a:`if (in_array("admin", $roles)) {\n  echo "Accès autorisé";\n}`}]
},

{ name:"array_push", cat:"Tableaux", short:"Ajouter un ou plusieurs éléments à la fin.",
  sig:"int array_push(array &$tab, $valeur)",
  desc:"Ajoute des éléments à la fin du tableau. Équivalent à $tab[] = $valeur (qui est souvent préféré, plus court).",
  ex:[{code:`$tab = ["a"];\narray_push($tab, "b", "c");\nprint_r($tab);`, out:`Array ( [0]=>a [1]=>b [2]=>c )`}],
  errors:["Pour un seul élément, $tab[] = \"x\" est plus simple et plus rapide."],
  mini:[{q:"Ajoute le produit $p au panier.", a:`$panier[] = $p;   // ou array_push($panier, $p);`}]
},

{ name:"sort", cat:"Tableaux", short:"Trier un tableau par valeurs croissantes.",
  sig:"bool sort(array &$tableau)",
  desc:"Réorganise le tableau par ordre croissant. Modifie le tableau directement (pas de valeur de retour utile). Les clés sont réindexées.",
  ex:[{code:`$n = [3, 1, 2];\nsort($n);\nprint_r($n);`, out:`Array ( [0]=>1 [1]=>2 [2]=>3 )`}],
  errors:["Faire $tab = sort($tab) : sort modifie en place et renvoie true/false, pas le tableau !"],
  compare:"sort/rsort trient par VALEUR · ksort/krsort trient par CLÉ.",
  mini:[{q:"Trie $notes de la plus grande à la plus petite.", a:`rsort($notes);`}]
},

{ name:"foreach", cat:"Boucles", short:"Parcourir un tableau élément par élément.",
  sig:"foreach ($tableau as $cle => $valeur) { ... }",
  desc:"La boucle dédiée aux tableaux. Pas de compteur à gérer. Existe en deux formes : valeurs seules, ou clé + valeur.",
  ex:[{code:`$tab = ["fr"=>"France", "tn"=>"Tunisie"];\nforeach ($tab as $code => $nom) {\n  echo "$code : $nom\\n";\n}`, out:`fr : France\ntn : Tunisie`}],
  errors:["Modifier le tableau pendant qu'on le parcourt peut donner des résultats imprévisibles."],
  mini:[{q:"Affiche chaque élément de $liste.", a:`foreach ($liste as $item) {\n  echo $item . "<br>";\n}`}]
},

{ name:"include / require", cat:"Inclusion", short:"Insérer le contenu d'un autre fichier.",
  sig:"include 'fichier.php';   require 'fichier.php';",
  desc:"Permet de réutiliser un en-tête, un menu, une connexion BDD sur plusieurs pages. Différence clé : si le fichier manque, include affiche un warning et continue ; require stoppe tout le script.",
  ex:[{code:`include 'header.php';\nrequire 'connexion.php';   // critique : require`, out:``}],
  errors:["Utiliser include pour un fichier vital (connexion) : si absent, le script continue à moitié cassé. Préfère require."],
  compare:"include → continue malgré l'erreur · require → arrête si le fichier manque. include_once / require_once évitent les doublons.",
  mini:[{q:"Inclus un menu commun en haut de page.", a:`include 'menu.php';`}]
},

{ name:"session_start", cat:"Sessions", short:"Démarrer (ou reprendre) la session.",
  sig:"bool session_start()",
  desc:"À appeler tout en haut de chaque page, AVANT tout HTML. Donne accès au tableau $_SESSION.",
  ex:[{code:`<?php\nsession_start();\n$_SESSION['user'] = "Ali";\n?>`, out:``}],
  errors:["L'appeler après du HTML ou un espace → erreur « headers already sent ».","Oublier de l'appeler sur une page → $_SESSION inaccessible."],
  mini:[{q:"Démarre la session et stocke le login \"sara\".", a:`session_start();\n$_SESSION['login'] = "sara";`}]
},

{ name:"header", cat:"HTTP", short:"Envoyer un en-tête HTTP (souvent : rediriger).",
  sig:"header(string $entete)",
  desc:"Sert surtout à rediriger vers une autre page. Doit être appelée avant tout affichage.",
  ex:[{code:`header("Location: accueil.php");\nexit;   // toujours après une redirection`, out:``}],
  errors:["Afficher quoi que ce soit avant header() → erreur « headers already sent ».","Oublier exit après une redirection : le reste du code continue de s'exécuter."],
  mini:[{q:"Redirige un visiteur non connecté vers login.php.", a:`if (!isset($_SESSION['user'])) {\n  header("Location: login.php");\n  exit;\n}`}]
},

{ name:"mysql_query", cat:"MySQL", short:"Exécuter une requête SQL.",
  sig:"resource mysql_query(string $sql)",
  desc:"Envoie une requête SQL à la base et renvoie un identifiant de résultat (pour un SELECT) ou true/false (pour INSERT/UPDATE).",
  ex:[{code:`$r = mysql_query("SELECT * FROM membres");\nwhile ($row = mysql_fetch_array($r)) {\n  echo $row['nom'];\n}`, out:``}],
  errors:["Injecter directement des variables utilisateur → faille d'injection SQL. En vrai, on échappe les données ou on utilise des requêtes préparées (mysqli/PDO)."],
  compare:"mysql_fetch_array → tableau associatif · mysql_fetch_row → tableau numéroté · mysql_fetch_object → objet.",
  mini:[{q:"Compte le nombre de membres.", a:`$r = mysql_query("SELECT * FROM membres");\necho mysql_num_rows($r);`}]
}

];
