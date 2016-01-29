<?php 

$page_title = "Manual";

include 'includes/header.php'; ?>
			<!-- Main -->
			<article id="main">
				<header>
					<h2>Manual</h2>
				</header>
				<section class="wrapper style5" id="manual">
					<div class="inner">
						
						<p>
							This document contains instructions and tips in using the StarterPacks. For Game Specification head over <a href="gamespec.html">here</a>.
See the <a href="walk_the_talk.php?chosen_lang=">walkthrough</a> for a guided tour of the features and usage of the StarterPack.
						</p>
						<p>Choose your preffered language : <code>Python</code> <code>C</code> <code>C++</code></p>
						<blockquote>We are extremely sorry that the <code>C</code> and <code>C++</code> starter packs are not ready yet. They should be deployed by the end of this week (Jan 30). In the meantime, if you know a bit of python you can atleast get familiar with the game, take your bot for a spin. Download the pack and unpack into any folder.</blockquote>
						<h1>
							Download the Pack
						</h1>
						<hr>
						<p>
							The <code>Full</code> tar contains everything and after downloading all you have to do is unpack the archive.<br>
(Only) The actual executable is in <code>Engine</code> tar.<br>
<code>maps/</code>, <code>samples/</code> (bots) are in <code>utilities</code> tar.
						</p>
						<p>
							We will be updating <code>utilities</code> often so there’s no need for you to download the <code>Full</code> tar each time.
						</p>
						<p class="bold">
							Any changes to the starter packs will feature on the <a href="findex.php#news">news</a> .<br>
The API or Game Specification is unlikely to change and hence your AI script would not require any change, even if the <code>Engine</code> is updated.<br>
See the <a href="https://bob16.pythonanywhere.com/media/changelog.txt">changelog</a>.
						</p>
						<p>
							DOWNLOAD BUTTON
							Full == all_python-starter_packs.tar.xz
							base == python-starter_packs.tar.xz
							base address == https://bob16.pythonanywhere.com/media/starter_packs
						</p>
						<h2>Unpacking</h2>
						<p>
							Most linuxes have GUI <code>utilities</code> for upacking <code>.tar.xz</code> by default. You can also do it on the command line, but don’t forget to cd into the right directory.
						</p>
						<p class="code">
							<pre class="code"><code class= "bash">$ unzip -u {tar-name}</code></pre>
						</p>
						<p>
							You need to unpack the utilities tar inside the Engine or Full tar.
						</p>
						<h1>
							Directory Structure
						</h1>
						<hr>
						<p>
							If your directory looks like this, you’re good to go.
						</p>
						<p class="file_structure">
							saber/
							js/
							logs/

							maps/
							mybot/
							samples/
							arena/

							config.ini
							launch.sh
						</p>
						<p><ul>
							<li>The path to the packaged executable (which we call <code>saber</code>) is <code>saber/saber</code>.</li>
							<li><code>maps/</code> contains a few Scenarios that you can use for testing.</li>
							<li><code>samples/</code> has a few sample bots (that are extremely dumb). You can pitch <code>mybot</code> against them.</li>
							<li><code>mybot/</code> contains your AI script. Ignore the Quantum.py and util.py. You can read them, but you’ll gain little useful information.</li>
							<li><code>logs</code> will contain the comprehensive Game logs which you can use to squash those nasty bugs and comb out errors.</li>
							<li>game-ui/ contains the visualisation of the game that you can launch by opening game-ui/view-game.html in your browser. You must enable javascript.</li>
							<li>arena/ is not used (as of now).</li>
						</ul></p>
						<h1>Usage</h1>
						<p>
							Write your AI script in python (3 prefferably, though 2.7 is supported) and save it in mybot.
						</p>
						<h2>Configure the System</h2>
						<p>
							Edit <code>config.ini</code> and change the bot <code>name</code>, you can also specify the <code>map</code> you want to use.
							You cannot preview the map. Run a game to see the map.
						</p>
						<blockquote>
							Some maps have many participating bots!
						</blockquote>
						<ul>
							<li>Read the instructions in <code>config.ini</code> to correctly specify the bots you want play against.</li>
						</ul>
						<blockquote>
							<strong>Why do I need to specify the python version I&rsquo;m using?</strong><br>
							A <code>python 3.5.1</code> interpreter is embedded in this starter pack. If you use version <code>3.X</code>, the inbuilt interpreter will run the script. Otherwise, you must have a working installation of python <code>2.7.X</code> on your machine.
						</blockquote>
						<h2>Launch a game</h2>
						<p>Fire up your terminal and navigate to the directory where you unpacked the starter-pack and invoke</p>
						<p class="code">
							<pre class="code"><code>$ bash ./launch.sh</code></pre>
						</p>
						<p>
							That’s it, you’re done! You can see some of the ending Game-Statistics on the console.
The logs will have been dumped into <code>logs</code>.
						</p>
						<h1>Visualising and Debugging</h1>
						<p>
							You can now visualise the game by opening <code>game-ui/view-game.html</code> in your browser. You must enable <code>javascript</code>.</p>

<p>If you see your bot act in an unexpected manner, view the input and output logs for your bot. By default, your script is dubbed as <code>bot0</code>. You can use any text-editor for opening the <code>.log</code> files (they’re just plain-text).
<code>game_log.rX.log</code> has complete game-state at each turn.</p>
						</p>
						<h2>
							Log File Format
						</h2>
						<p><code>game_replay.*.log</code> and <code>error.log</code> are easily readable.</p>
						<h2><code>Sample input.log</code></h2>
						<pre class="code"><code class="bash">
turn~0
<span class="highlight"> initialisation info</span>
act_width~60.000000
aspect~1.777778
turntime~2
loadtime~2
bot_count~2
server_count~3
id~1
<span class="highlight">'s' or 'n' == server</span>
<span class="highlight">server_id, position_x, position_y, reserve, invested, limit, owner_id</span>
s~0 0.250000 0.400000 15.000000 0.000000 80.000000 0
s~1 0.750000 0.400000 40.000000 0.000000 80.000000 1
<span class="highlight">neutral servers are held by owner (-1)</span>
n~2 0.500000 0.800000 15.000000 0.000000 60.000000 -1
ready
<span class="highlight">game has started</span>
turn~1
<span class="highlight">current bot score</span>
score~0
<span class="highlight">state of all servers</span>
s~0 15.000000 0.000000 0
s~1 40.000000 0.000000 1
s~2 15.000000 0.000000 -1
go
turn~2
score~0
<span class="highlight">state of all servers</span>
cn~1 2 0.400000 20.180436
s~0 15.800000 0.000000 0
s~1 35.800000 5.000000 1
s~2 15.000000 0.000000 -1
<span class="highlight">state of all "connections"</span>
<span class="highlight">source sink attack_rate current_length</span>
c~1 2 0.400000 0 5.000000
go
						</code></pre>

						<h2><code>Sample output.log</code></h2>
						<p class="code">
						<pre class="code"><code>
# turn 1
<span class="highlight"> attack src->sink attack_rate</span>
a 1 2 0.400000
# turn 2
# .
# .
# .
# turn 24
<span class="highlight"> update src->sink new_attack_rate</span>
u 1 2 0.100000
# turn 25
# turn 26
<span class="highlight">  withdraw src->sink split_ratio</span>
w 1 2 1.000000
# turn 27
						</code></pre>
						</p>
						<h2>
							Submitting your AI Script
						</h2>
						<p>
							Login to your account on \bob<\aergserg> and navigate to the Submissions tab. Upload your <code>.py</code> file.
						</p>
						<h1>Errors and Getting Help</h1>
						<hr>
						<p>
							You tried everything to fix the game on your side but you now suspect that the fault is in the Game Engine. Just send us a mail that describes the issue and attach a <code>.zip</code> or <code>.tarX</code> that includes,
						</p>
						<p>
							<ul>
								<li><code>logs/</code></li>
								<li><code>config.ini</code></li>
							</ul>
						</p>
						<p>
							We’ll get back to you with an explanation and if it really is a mistake on our side, we’ll fix and redistribute the starter-pack.
						</p>
						<p>
							Fixing the bugs is unlikely to change The API or Game Specification and hence it’s unlikely that you’ll have to edit your AI script.
							<br>
							So, we request you to stay tuned to the <a href="index.php#news">news</a> .
						</p>
						<h1>Note</h1>
						<hr>
						<p>We have exposed a lot of the Game Engine by providing you with an executable. You can try editing it, or try to understand it but we can assure you nothing good will come of it. We will only take the file you have created in <code>mybot/</code> and use our local copy of the engine. Hence, your effort might be in vain. After the event is over, Game Engine source-code might be released. Sit tight till then! :D</p>
						
					</div>
				</section>
			</article>
			<style>
				.wrapper.style5 h1, .wrapper.style5 h2, .wrapper.style5 h3, .wrapper.style5 h4, .wrapper.style5 h5, .wrapper.style5 h6{
					color: black;
				}
			</style>
<?php include 'includes/footer.php'; ?>