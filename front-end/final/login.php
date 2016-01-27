<?php 

$page_title = "Log in";

include 'includes/header.php'; 

if(isset($_SESSION['logged_in']) == true){
	header('Location: http://localhost/saber/index.php');
	die();
}
$errors = [];

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	foreach ($_POST as $key => $value) {
		$_POST[$key] = mysqli_real_escape_string($db,stripslashes(strip_tags($value)));
	}
	$team = $_POST['team'];
	$users= [];
	$password = $_POST['password'];
	$password = crypt($password, '$6$rounds=4567$abcdefghijklmnop$');
	$query = "select id from teams where name = '". $team."' and password='".$password."'";
	$result = mysqli_query($db,$query);
	if(mysqli_affected_rows($db) == 1){
		$row = mysqli_fetch_row($result);
		$query = "select user_id from register where team_id = ". $row[0]."";
		$result = mysqli_query($db,$query);
		$users_id = mysqli_fetch_all($result,MYSQLI_ASSOC);
		for($i=0;$i<count($users_id);$i++){
			$query = "select * from users where id = ". $users_id[$i]['user_id']."";
			$result = mysqli_query($db,$query);
			$users[] = mysqli_fetch_all($result,MYSQLI_ASSOC);
		}
		$_SESSION['logged_in'] = true;
		$_SESSION['members'] = count($users_id);
		for($i = 0;$i<count($users_id);$i++){
			$_SESSION['user'.$i.''] = $users[$i][0];
		}
	}else{
		$errors[] = "Wrong credentials entered.";
	}
}
?>

<article id="main">
				<header>
					<h2>Log In</h2>
				</header>
				<section class="wrapper style5" id="l_page">
					<div class="inner">
					<div id="errors">
						<?php for ($i=0; $i < count($errors); $i++) { 
							echo $errors[$i];
						}
						?>
						</div>
						<form action="login.php" method="post" id="login" novalidate="novalidate">
						  <div class="form-group">
						    <label for="team">Team Name</label>
						    <input type="text" name="team" class="form-control" id="team" placeholder="Registered Team Name">
						  </div>
						  <div class="form-group">
						    <label for="password">Password</label>
						    <input type="password" name="password" class="form-control" id="password" placeholder="Password">
						  </div>
						  <button type="submit" name="submit" class="btn btn-primary" id="login-button">Log In</button>
						</form>
					</div>
				</section>
			</article>		
<?php include 'includes/footer.php'; ?>