/* ============================================================
   exercises.js — Exercices par niveau
   {id, chap, level:'facile'|'moyen'|'difficile'|'examen',
    title, statement, solution(code), method}
   ============================================================ */
window.EXERCISES = [

/* ---- CONDITIONS ---- */
{ id:"c1", chap:"conditions", level:"facile", title:"Majeur ou mineur",
  statement:"Écris un script qui affiche « Majeur » si $age vaut au moins 18, « Mineur » sinon.",
  solution:`$age = 20;\nif ($age >= 18) {\n  echo "Majeur";\n} else {\n  echo "Mineur";\n}`,
  method:"On a deux cas exclusifs → if/else. On teste avec >= (au moins 18 inclut 18)."
},
{ id:"c2", chap:"conditions", level:"moyen", title:"Mention au bac",
  statement:"Selon une note /20 : >=16 « Très bien », >=14 « Bien », >=12 « Assez bien », >=10 « Passable », sinon « Échec ».",
  solution:`$note = 13;\nif ($note >= 16) echo "Très bien";\nelseif ($note >= 14) echo "Bien";\nelseif ($note >= 12) echo "Assez bien";\nelseif ($note >= 10) echo "Passable";\nelse echo "Échec";`,
  method:"Plusieurs paliers ordonnés → if/elseif/else. L'ordre compte : du plus haut au plus bas, sinon 18 déclencherait « Passable » en premier."
},
{ id:"c3", chap:"conditions", level:"examen", title:"Jour de la semaine (switch)",
  statement:"À partir d'un numéro $jour (1 à 7), affiche le nom du jour avec un switch. Gère le cas d'un numéro invalide.",
  solution:`$jour = 3;\nswitch ($jour) {\n  case 1: echo "Lundi"; break;\n  case 2: echo "Mardi"; break;\n  case 3: echo "Mercredi"; break;\n  // ... 4 à 7\n  default: echo "Numéro invalide";\n}`,
  method:"On compare une seule variable à des valeurs précises → switch. Le break évite la cascade ; default gère l'erreur."
},

/* ---- BOUCLES ---- */
{ id:"b1", chap:"boucles", level:"facile", title:"Compter jusqu'à 10",
  statement:"Affiche les nombres de 1 à 10, chacun sur une ligne.",
  solution:`for ($i = 1; $i <= 10; $i++) {\n  echo $i . "<br>";\n}`,
  method:"Nombre de tours connu (10) → for. Départ 1, condition <= 10, on incrémente de 1."
},
{ id:"b2", chap:"boucles", level:"moyen", title:"Table de multiplication",
  statement:"Affiche la table de multiplication de 7 (de 7×1 à 7×10).",
  solution:`$n = 7;\nfor ($i = 1; $i <= 10; $i++) {\n  echo "$n x $i = " . ($n * $i) . "<br>";\n}`,
  method:"On boucle de 1 à 10 et on multiplie $n par le compteur $i à chaque tour."
},
{ id:"b3", chap:"boucles", level:"difficile", title:"Somme des pairs",
  statement:"Calcule la somme de tous les nombres pairs entre 1 et 100.",
  solution:`$somme = 0;\nfor ($i = 2; $i <= 100; $i += 2) {\n  $somme += $i;\n}\necho $somme;   // 2550`,
  method:"On part de 2 et on avance de 2 en 2 ($i += 2) pour ne tomber que sur les pairs. On accumule dans $somme."
},

/* ---- FONCTIONS ---- */
{ id:"f1", chap:"fonctions", level:"facile", title:"Fonction de bienvenue",
  statement:"Écris une fonction direBonjour($nom) qui affiche « Bonjour $nom ! ».",
  solution:`function direBonjour($nom) {\n  echo "Bonjour $nom !";\n}\ndireBonjour("Ali");`,
  method:"Un paramètre $nom, on l'utilise dans le echo. Ici on affiche directement (pas de return nécessaire)."
},
{ id:"f2", chap:"fonctions", level:"moyen", title:"Le plus grand des deux",
  statement:"Écris une fonction maximum($a, $b) qui RENVOIE le plus grand des deux nombres.",
  solution:`function maximum($a, $b) {\n  if ($a > $b) return $a;\n  return $b;\n}\necho maximum(8, 12);   // 12`,
  method:"On veut réutiliser le résultat → return (pas echo). Si $a gagne on le renvoie, sinon c'est $b."
},
{ id:"f3", chap:"fonctions", level:"examen", title:"Compteur statique",
  statement:"Écris une fonction qui, à chaque appel, affiche combien de fois elle a été appelée.",
  solution:`function compteur() {\n  static $n = 0;\n  $n++;\n  echo "Appel n°$n<br>";\n}\ncompteur(); compteur(); compteur();   // 1, 2, 3`,
  method:"Une variable normale repartirait de 0 à chaque appel. static garde la valeur entre les appels."
},

/* ---- CHAÎNES ---- */
{ id:"s1", chap:"chaines", level:"facile", title:"Longueur d'un mot",
  statement:"Affiche le nombre de caractères du mot « anticonstitutionnellement ».",
  solution:`echo strlen("anticonstitutionnellement");   // 25`,
  method:"strlen renvoie directement la longueur."
},
{ id:"s2", chap:"chaines", level:"moyen", title:"Découper un nom complet",
  statement:"À partir de \"Tlili Ali\", récupère le nom et le prénom dans deux variables.",
  solution:`$complet = "Tlili Ali";\n$parts = explode(" ", $complet);\n$nom = $parts[0];      // Tlili\n$prenom = $parts[1];   // Ali`,
  method:"Le séparateur est l'espace → explode(\" \", ...). On récupère ensuite par indice."
},
{ id:"s3", chap:"chaines", level:"examen", title:"Valider une URL",
  statement:"Vérifie qu'une variable $url commence bien par « http:// ».",
  solution:`$debut = strtolower(substr($url, 0, 7));\nif ($debut != "http://") {\n  echo "URL invalide";\n} else {\n  echo "OK";\n}`,
  method:"substr extrait les 7 premiers caractères, strtolower normalise la casse, puis on compare."
},

/* ---- TABLEAUX ---- */
{ id:"t1", chap:"tableaux", level:"facile", title:"Afficher une liste",
  statement:"Affiche chaque fruit du tableau [\"pomme\", \"kiwi\", \"mangue\"].",
  solution:`$fruits = ["pomme", "kiwi", "mangue"];\nforeach ($fruits as $f) {\n  echo $f . "<br>";\n}`,
  method:"foreach parcourt chaque valeur sans se soucier des indices."
},
{ id:"t2", chap:"tableaux", level:"moyen", title:"Moyenne des notes",
  statement:"Calcule la moyenne du tableau $notes = [12, 15, 9, 18].",
  solution:`$notes = [12, 15, 9, 18];\n$somme = 0;\nforeach ($notes as $n) {\n  $somme += $n;\n}\necho $somme / count($notes);   // 13.5`,
  method:"On additionne tout dans la boucle, puis on divise par le nombre d'éléments (count)."
},
{ id:"t3", chap:"tableaux", level:"difficile", title:"Trouver le maximum",
  statement:"Trouve la plus grande valeur du tableau $t = [4, 9, 2, 11, 7] sans utiliser max().",
  solution:`$t = [4, 9, 2, 11, 7];\n$plusGrand = $t[0];\nforeach ($t as $v) {\n  if ($v > $plusGrand) {\n    $plusGrand = $v;\n  }\n}\necho $plusGrand;   // 11`,
  method:"On suppose que le premier est le max, puis on compare chaque élément et on garde le meilleur."
},

/* ---- MYSQL ---- */
{ id:"m1", chap:"mysql", level:"moyen", title:"Lister les membres",
  statement:"Affiche le nom de tous les membres de la table « membres ».",
  solution:`$r = mysql_query("SELECT * FROM membres");\nwhile ($row = mysql_fetch_array($r)) {\n  echo $row['nom'] . "<br>";\n}`,
  method:"SELECT puis boucle while + fetch_array : on lit ligne par ligne jusqu'à épuisement."
},
{ id:"m2", chap:"mysql", level:"examen", title:"Insérer un membre",
  statement:"Insère un membre ($nom, $prenom) puis affiche son ID généré.",
  solution:`$q = "INSERT INTO membres(nom, prenom)\n      VALUES ('$nom', '$prenom')";\nmysql_query($q);\necho "ID : " . mysql_insert_id();`,
  method:"Requête INSERT avec les valeurs, puis mysql_insert_id() pour récupérer l'identifiant auto-incrémenté."
},

/* ---- SESSIONS ---- */
{ id:"se1", chap:"sessions", level:"moyen", title:"Page protégée",
  statement:"Empêche l'accès à une page si l'utilisateur n'est pas connecté (pas de $_SESSION['user']).",
  solution:`session_start();\nif (!isset($_SESSION['user'])) {\n  header("Location: login.php");\n  exit;\n}`,
  method:"On démarre la session, on teste si la variable de connexion existe ; sinon on redirige et on exit."
},
{ id:"se2", chap:"sessions", level:"facile", title:"Cookie de bienvenue",
  statement:"Crée un cookie « VISITE » contenant la date, valable 1 heure.",
  solution:`setcookie("VISITE", date("d/m/y"), time() + 3600);`,
  method:"setcookie(nom, valeur, expiration). time()+3600 = maintenant + une heure (3600 secondes)."
},

/* ---- POO ---- */
{ id:"p1", chap:"poo", level:"moyen", title:"Classe Etudiant",
  statement:"Crée une classe Etudiant avec un attribut privé $nom, un constructeur qui l'initialise, et une méthode getNom() qui le renvoie.",
  solution:`class Etudiant {\n  private $nom;\n\n  public function __construct($nom) {\n    $this->nom = $nom;\n  }\n  public function getNom() {\n    return $this->nom;\n  }\n}\n\n$e = new Etudiant("Sara");\necho $e->getNom();   // Sara`,
  method:"L'attribut est private → on y accède via une méthode (getNom). Le constructeur reçoit $nom et l'affecte à $this->nom."
},
{ id:"p2", chap:"poo", level:"examen", title:"Héritage Animal → Chien",
  statement:"Crée une classe Animal (attribut protected $nom) et une classe Chien qui en hérite et ajoute une méthode aboyer().",
  solution:`class Animal {\n  protected $nom;\n  public function __construct($nom) {\n    $this->nom = $nom;\n  }\n}\n\nclass Chien extends Animal {\n  public function aboyer() {\n    return $this->nom . " : Wouf !";\n  }\n}\n\n$c = new Chien("Rex");\necho $c->aboyer();   // Rex : Wouf !`,
  method:"protected permet à Chien d'accéder à $nom hérité. extends crée la classe fille ; le constructeur du parent suffit ici (pas besoin d'en réécrire un)."
},
{ id:"p3", chap:"poo", level:"difficile", title:"Lister des données avec PDO",
  statement:"Connecte-toi en PDO à la base « test » et affiche le nom de chaque ligne de la table « membres ».",
  solution:`try {\n  $bdd = new PDO('mysql:host=localhost;dbname=test', 'root', '');\n  $rep = $bdd->query('SELECT * FROM membres');\n  while ($d = $rep->fetch()) {\n    echo $d['nom'] . "<br>";\n  }\n  $rep->closeCursor();\n} catch (Exception $e) {\n  die('Erreur : ' . $e->getMessage());\n}`,
  method:"Connexion dans un try/catch, query() pour le SELECT, while+fetch() pour lire ligne par ligne, closeCursor() à la fin."
}

];
