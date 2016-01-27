<?php 

$page_title = "Submissions";

include 'includes/header.php'; 

if(!isset($_SESSION['logged_in']) == true){
	header('Location: http://localhost/saber/index.php');
	die();
}

?>

<article id="main">
				<header>
					<h2>Team Dashboard</h2>
				</header>
				<section class="wrapper style5">
					<div class="inner">
					<?php
						for($i=0;$i<$_SESSION['members'];$i++):
					?>
					<h4>Team Member <?php echo $i+1; ?></h4>
					<p>Name: <?php echo $_SESSION['user'.$i.'']['name']; ?></p>
					<p>Name: <?php echo $_SESSION['user'.$i.'']['email']; ?></p>
					<p>Name: <?php echo $_SESSION['user'.$i.'']['phone_no']; ?></p>
					<?php
						endfor;
					?>
					</div>
				</section>
				
			</article>		
<?php include 'includes/footer.php'; ?>