<?php 

$page_title = "Register";

include 'includes/header.php'; 

if(isset($_SESSION['logged_in']) == true){
	header('Location: http://localhost/saber/index.php');
	die();
}
$errors = [];
if($_SERVER['REQUEST_METHOD'] == 'POST'){

	$team_mates = (count($_POST)-2)/3;

	foreach ($_POST as $key => $value) {
		$_POST[$key] = stripslashes(strip_tags($value));
	}
	$id = [];

	function insertUser($db,$member){
		global $id;
		$phone = $_POST['phone'.$member.''];
		$json = json_decode($_POST['data'.$member.'']);
		$name = $json->user->name;
		$email = $json->user->email;
		$id[] = $json->user->id;
		$access_token = $json->access_token;
		$query = "insert into users values(".$id[count($id)-1].",'".$name."',".$phone.",'".$email."','".$access_token."')";
		$result = mysqli_query($db,$query);
	}
	function insertTeam($db){
		global $id;
		$team = $_POST['team'];
		$password = crypt($_POST['password'], '$6$rounds=4567$abcdefghijklmnop$');
		$query = "insert into teams (name,password) values('".$team."','".$password."')";
		$result = mysqli_query($db,$query);
		$query = "select id from teams where name = '". $team."'";
		$result = mysqli_query($db,$query);
		$row = mysqli_fetch_all($result,MYSQLI_ASSOC);
		for($i = 0;$i<count($id);$i++){
			$query = "insert into register(user_id,team_id) values(".$id[$i].",".$row[0]['id'].")";
			$result = mysqli_query($db,$query);
		}	
	}

	$errors = [];

	if($team_mates == 1){
		$query = "Select * from users where phone_no =". $_POST['phone1']."";
		$result = mysqli_query($db,$query);
		$user = mysqli_affected_rows($db);
		$query = "Select * from teams where name ='". $_POST['team']."'";
		$result = mysqli_query($db,$query);
		$team = mysqli_affected_rows($db);
		if($user > 0){
			$errors[] = "<p>Entered user already exists.</p>";
		}
		if($team > 0){
			$errors[] = "<p>Entered team name already exists.</p>";
		}
		if(count($errors) == 0){

			insertUser($db,1);
			insertTeam($db);
		}
		/*
		$result = mysqli_fetch_all($result,MYSQLI_ASSOC);
		var_dump($result);
		*/
	}
	else if($team_mates == 2 && ($_POST['phone1'] != $_POST['phone2'])){
		$user = [];
		$query = "Select * from users where phone_no =". $_POST['phone1']."";
		$result = mysqli_query($db,$query);
		$user[] = mysqli_affected_rows($db);
		$query = "Select * from users where phone_no =". $_POST['phone2']."";
		$result = mysqli_query($db,$query);
		$user[] = mysqli_affected_rows($db);
		$query = "Select * from teams where name ='". $_POST['team']."'";
		$result = mysqli_query($db,$query);
		$team = mysqli_affected_rows($db);
		if($user[0] > 0 || $user[1] > 0){
			$errors[] = "<p>Entered user already exists.</p>";
		}
		if($team > 0){
			$errors[] = "<p>Entered team name already exists.</p>";
		}
		if(count($errors) == 0){
			insertUser($db,1);
			insertUser($db,2);
			insertTeam($db);
			
		}

	}else if($team_mates == 3 && (($_POST['phone1'] != $_POST['phone2']) && ($_POST['phone1'] != $_POST['phone3']) && ($_POST['phone2'] != $_POST['phone3']) )){

		$user = [];
		$query = "Select * from users where phone_no =". $_POST['phone1']."";
		$result = mysqli_query($db,$query);
		$user[] = mysqli_affected_rows($db);
		$query = "Select * from users where phone_no =". $_POST['phone2']."";
		$result = mysqli_query($db,$query);
		$user[] = mysqli_affected_rows($db);
		$query = "Select * from users where phone_no =". $_POST['phone3']."";
		$result = mysqli_query($db,$query);
		$user[] = mysqli_affected_rows($db);
		$query = "Select * from teams where name ='". $_POST['team']."'";
		$result = mysqli_query($db,$query);
		$team = mysqli_affected_rows($db);
		if($user[0] > 0 || $user[1] > 0 || $user[2] > 0){
			$errors[] = "<p>Entered user already exists.</p>";
		}
		if($team > 0){
			$errors[] = "<p>Entered team name already exists.</p>";
		}
		if(count($errors) == 0){
			insertUser($db,1);
			insertUser($db,2);
			insertUser($db,3);
			insertTeam($db);
		}

	}else{
		$errors[]= "<p>Enter unique phone numbers for each team member</p>";
	}

}
?>

<article id="main">
				<header>
					<h2>Register your team</h2>
				</header>
				<section class="wrapper style5" id="r_page">
					<div class="inner">
						<div id="errors">
						<?php for ($i=0; $i < count($errors); $i++) { 
							echo $errors[$i];
						}
						?>
						</div>
						<form action="register.php" method="post" id="register" novalidate="novalidate">
						<div class="form-group">
						    <label for="team">Team Name</label>
						    <input type="text" name="team" class="form-control" id="phone" placeholder="Team Name">
						  </div>
						 <div class="form-group">
						    <label for="password">Password</label>
						    <input type="password" name="password" class="form-control" id="password" placeholder="Password for the team">
						  </div>
						<p>Team Member 1</p>
						<div id="mem-1">	
						  <div class="form-group">
						    <label for="phone1">Phone No</label>
						    <input type="tel" name="phone1" class="form-control" id="phone1" placeholder="Registered Phone No">
						  </div>
						  <div class="form-group">
						    <label for="password1">Password</label>
						    <input type="password" name="password1" class="form-control" id="password1" placeholder="Password">
						  </div>
						  <div class="form-group">
						    <input type="hidden" name="data1" class="form-control" id="data1" >
						  </div>
						 </div>
						  <button class="btn btn-primary" id="add_new">Add a new member</button>
						  <button type="submit" class="btn btn-primary" id="register-button">Register</button>
						</form>
					</div>
				</section>
			</article>		
<?php include 'includes/footer.php'; ?>