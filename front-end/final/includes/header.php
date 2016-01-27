<?php
session_start();

include 'includes/db.php';

?>

<!DOCTYPE HTML>
<!--
	Spectral by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title><?php echo $page_title; ?> | BoB</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
		<?php if($page_title == "Log in" || $page_title = "Team" || $page_title = "Submissions"): ?>
			<link rel="stylesheet" href="assets/css/bootstrap.min.css">
		<?php endif; ?>
		<link rel="stylesheet" href="assets/css/main.css" />
		<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
		<!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
	</head>
	<body>
		<!-- Page Wrapper -->
		<div id="page-wrapper">
			<!-- Header -->
			<header id="header">
				<h1><a href="index.php">BATTLE OF BOTS</a></h1>
				<nav id="nav">
					<ul>
						<li class="special">
							<a href="#menu" class="menuToggle"><span>Menu</span></a>
							<div id="menu">
								<ul>
									<li><a href="index.php">Home</a></li>
									<?php if(!isset($_SESSION['logged_in'])): ?>
										<li><a href="login.php">Login</a></li>
										<li><a href="register.php">Register your team</a></li>
									<?php else: ?>
										<li><a href="team.php">Team</a></li>
										<li><a href="submissions.php">Submissions</a></li>
									<?php endif; ?>	
									<li><a href="rules.php">Rules</a></li>
									<li><a href="explore.php">Explore</a></li>
									<?php if(isset($_SESSION['logged_in'])): ?>
										<li><a href="logout.php">Log Out</a></li>
									<?php endif; ?>
									<li><a href="contact.php">Contact Us</a></li>
								</ul>
							</div>
						</li>
					</ul>
				</nav>
			</header>