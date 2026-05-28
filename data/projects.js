/* ============================================================
   projects.js — Mini-projets PHP commentés
   {id, icon, title, level, desc, concepts:[], archi:[], code, notes}
   ============================================================ */
window.PROJECTS = [

{ id:"login", icon:"🔑", title:"Formulaire de connexion", level:"moyen",
  desc:"Un mini système d'authentification : on saisit login + mot de passe, on vérifie, on ouvre une session.",
  concepts:["Formulaire HTML + $_POST","Conditions","Sessions","Redirection header()"],
  archi:["<b>login.php</b> — le formulaire + la vérification","<b>accueil.php</b> — page protégée, accessible si connecté","<b>logout.php</b> — détruit la session"],
  code:`<?php
session_start();

// Données attendues (en vrai : depuis une base de données)
$bonLogin = "admin";
$bonMdp   = "1234";

if (isset($_POST['login']) && isset($_POST['mdp'])) {
  $login = trim($_POST['login']);
  $mdp   = trim($_POST['mdp']);

  if ($login == $bonLogin && $mdp == $bonMdp) {
    $_SESSION['user'] = $login;   // on mémorise la connexion
    header("Location: accueil.php");
    exit;
  } else {
    $erreur = "Login ou mot de passe incorrect";
  }
}
?>
<form method="post">
  <input type="text" name="login" placeholder="Login">
  <input type="password" name="mdp" placeholder="Mot de passe">
  <button type="submit">Se connecter</button>
</form>
<?php if (isset($erreur)) echo "<p>$erreur</p>"; ?>`,
  notes:"On nettoie les saisies avec trim, on compare, et seulement si tout est bon on remplit $_SESSION puis on redirige. La page accueil.php commencera par vérifier <code>isset($_SESSION['user'])</code>."
},

{ id:"calc", icon:"🧮", title:"Calculatrice", level:"facile",
  desc:"Deux nombres, une opération (+ - × ÷), un résultat. Le terrain de jeu parfait pour le switch.",
  concepts:["$_POST","switch","Fonctions","Gestion d'erreur (division par 0)"],
  archi:["<b>calc.php</b> — formulaire + calcul sur la même page"],
  code:`<?php
function calculer($a, $b, $op) {
  switch ($op) {
    case "+": return $a + $b;
    case "-": return $a - $b;
    case "*": return $a * $b;
    case "/":
      if ($b == 0) return "Division par zéro !";
      return $a / $b;
    default: return "Opération inconnue";
  }
}

if (isset($_POST['a'])) {
  $resultat = calculer($_POST['a'], $_POST['b'], $_POST['op']);
  echo "Résultat : $resultat";
}
?>
<form method="post">
  <input type="number" name="a">
  <select name="op">
    <option>+</option><option>-</option>
    <option>*</option><option>/</option>
  </select>
  <input type="number" name="b">
  <button>Calculer</button>
</form>`,
  notes:"Toute la logique est dans une fonction <code>calculer()</code> qui RENVOIE (return) le résultat — propre et réutilisable. On gère le cas de la division par zéro avant de planter."
},

{ id:"todo", icon:"✅", title:"Gestion d'une liste (tableaux)", level:"moyen",
  desc:"Ajouter des tâches dans un tableau et les afficher. Le classique pour maîtriser les tableaux + foreach.",
  concepts:["Tableaux","array_push / []","foreach","count"],
  archi:["<b>liste.php</b> — on stocke les tâches en session pour qu'elles survivent au rechargement"],
  code:`<?php
session_start();

// Initialiser la liste une seule fois
if (!isset($_SESSION['taches'])) {
  $_SESSION['taches'] = [];
}

// Ajouter une tâche
if (isset($_POST['tache']) && !empty($_POST['tache'])) {
  $_SESSION['taches'][] = trim($_POST['tache']);
}
?>
<form method="post">
  <input type="text" name="tache" placeholder="Nouvelle tâche">
  <button>Ajouter</button>
</form>

<p>Tu as <?php echo count($_SESSION['taches']); ?> tâche(s) :</p>
<ul>
<?php foreach ($_SESSION['taches'] as $i => $t) { ?>
  <li><?php echo ($i + 1) . ". " . $t; ?></li>
<?php } ?>
</ul>`,
  notes:"On garde les tâches dans <code>$_SESSION</code> pour ne pas tout perdre au rechargement. <code>foreach ($t as $i =&gt; $t)</code> donne l'indice ET la valeur, parfait pour numéroter."
},

{ id:"crud", icon:"🗃️", title:"CRUD simple (MySQL)", level:"difficile",
  desc:"Create-Read : insérer un membre puis lister tous les membres. Le cœur de toute application web.",
  concepts:["Connexion MySQL","INSERT","SELECT","while + fetch_array"],
  archi:["<b>db.php</b> — connexion (à inclure partout)","<b>membres.php</b> — ajout + affichage"],
  code:`<?php
// --- Connexion (db.php) ---
$link = mysql_connect("localhost", "root", "");
mysql_select_db("ecole");

// --- CREATE : insérer ---
if (isset($_POST['nom'])) {
  $nom = trim($_POST['nom']);
  mysql_query("INSERT INTO membres(nom) VALUES ('$nom')");
  echo "Ajouté ! ID = " . mysql_insert_id();
}

// --- READ : lister ---
$res = mysql_query("SELECT * FROM membres");
echo "Total : " . mysql_num_rows($res) . " membre(s)<br>";

while ($row = mysql_fetch_array($res)) {
  echo $row['id'] . " - " . $row['nom'] . "<br>";
}

mysql_close($link);
?>
<form method="post">
  <input type="text" name="nom">
  <button>Ajouter</button>
</form>`,
  notes:"Les 4 étapes au complet : connexion → sélection → requête (INSERT puis SELECT) → exploitation avec la boucle <code>while + fetch_array</code>. ⚠ En production : utilise des requêtes préparées (mysqli/PDO) pour éviter l'injection SQL."
},

{ id:"compteur", icon:"👁️", title:"Compteur de visites (cookies)", level:"facile",
  desc:"Compter combien de fois un visiteur revient grâce à un cookie.",
  concepts:["Cookies","Conditions","Conversion de type"],
  archi:["<b>index.php</b> — lit, incrémente et réécrit le cookie"],
  code:`<?php
// Lire le cookie (ou 0 s'il n'existe pas encore)
$visites = isset($_COOKIE['visites']) ? $_COOKIE['visites'] : 0;
$visites++;

// Réécrire le cookie pour 30 jours
setcookie("visites", $visites, time() + 30*24*3600);
?>
<html>
<body>
  <p>Tu es venu ici <?php echo $visites; ?> fois.</p>
</body>
</html>`,
  notes:"<code>setcookie</code> doit passer AVANT tout HTML (d'où le bloc PHP tout en haut). <code>time() + 30*24*3600</code> = expiration dans 30 jours."
}

];
