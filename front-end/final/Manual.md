#User Manual

This document contains instructions and tips in using the StarterPacks. For Game Specification head over [here](gamespec.html).

##Installation

Choose your preffered language : `Python` `C` `C++`
See the [walkthrough](walk_the_talk.php?chosen_lang="python") for a guided tour of the features and usage of the StarterPack.

> We are extremely sorry that the `C` and `C++` starter packs are not ready yet. They should be deployed by the end of this week (Jan 30). In the meantime, if you know a bit of python you can atleast get familiar with the game, take your bot for a spin. Download the pack and unpack into any folder.

DOWNLOAD BUTTON
base address == https://bob16.pythonanywhere.com/media/starter_packs

##Directory Structure
```
saber/
js/
logs/

maps/
mybot/
samples/
arena/

config.ini
launch.sh
```

* The path to the packaged executable *(which we call `saber`)* is `saber/saber`.
* `maps/` contains a few Scenarios that you can use for testing.
* `samples/` has a few sample bots (that are extremely dumb). You can pitch `mybot` against them.
* `mybot/` contains your AI script. Ignore the `Quantum.py` and `util.py`. You can read them, but you'll gain little useful information.
* `logs` will contain the comprehensive Game logs which you can use to squash those nasty bugs and comb out errors.
* `game-ui/` contains the visualisation of the game that you can launch by opening `game-ui/view-game.html` in your browser. You must enable `javascript`.

##Usage

Write your AI script in python *(3 prefferably, though 2.7 is supported)* and save it in `mybot`.

###Configure the System

Edit `config.ini` and change the bot `name`, you can also specify the `map` you want to use.
You cannot *preview* the map. Run a game to see the map.
> Some maps have many participating bots!

  + Read the instructions in `config.ini` to correctly specify the bots you want play against.

<center>![config-file-img](images/docs/config.png "configuration file")</center>
> **Why do I need to specify the python version I'm using?**
A `python 3.5.1` interpreter is embedded in this starter pack. If you use version `3.X`, the inbuilt interpreter will run the script. Otherwise, you must have a working installation of python `2.7.X` on your machine.

###Launch a game

Fire up your terminal and navigate to the directory where you unpacked the starter-pack and invoke
```sh
$ bash ./launch.sh
```
That's it, you're done! You can see some of the ending Game-Statistics on the console.
The logs will have been dumped into `logs`.

###Visualising and Debugging

You can now visualise the game by opening `game-ui/view-game.html` in your browser. You must enable `javascript`.

If you see your bot act in an unexpected manner, view the input and output logs for your bot. By default, your script is dubbed as `bot0`. You can use any text-editor for opening the `.log` files *(they're just *`plain-text`*)*.
`game_log.rX.log` has complete game-state at each turn.

<center>![log-list-img](images/docs/logs.png "List of log-file. Use bot0* files")</center>

##Errors and Getting Help

You tried everything to fix the game on your side but you now suspect that the fault is in the Game Engine. Just send us a mail that describes the issue and attach a `.zip` or `.tarX` that includes,
* `logs/`
* `config.ini`
We'll get back to you with an explanation and if it really is a mistake on our side, we'll fix and redistribute the starter-pack. So, we request you to stay tuned to the [news](index.php#news). The API or Game Specification is unlikely to change and hence your AI script would not require any change.

#Note

We have exposed a lot of the Game Engine by providing you with an executable. You can try editing it, or try to understand it but we can assure you nothing good will come of it. We will only take the file you have created in `mybot/` and use our local copy of the engine. Hence, your effort might be in vain. After the event is over, Game Engine source-code might be released. Sit tight till then! :D