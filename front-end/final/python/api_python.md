#Using the Game API

You have to edit the `bot_template.py` in `mybots/`. This file uses `Quantum.py` to manage the game state. `Quantum.py` is an interface to the actual Game Engine.
Since your bot is provided with an interface to the Game Engine, all your bot needs to do is use the API to make Game [*"Move"*][move-calls] calls.
**Your bot's `stdout` is used to communicate with the Game Engine. Do not use print statements in your code _(else game will fail)_**.
Incase you want to print anything for debugging, use `stderr`. There is a [helper method][error_dump] for this.

```py
#!/usr/bin/env python

from Quantum import *
# any other imports here

class myBot():
	"""
	My BOT
	"""
	def __init__(self):
		self.name = "my Bot"
		# initialise any persistent data structures (if needed)
	
	def do_setup(self, game):
		pass

	def do_turn(self, game):
		pass
if __name__ == '__main__':
	try:
		ServerStack.launch(myBot())
	except KeyboardInterrupt:
		print("Ctrl-C, bye!")
```

`do_setup()` is called after the game is initialised. The `game` object contains complete `game-state`. You can traverse it to initialise you data structures.
At the beginning of every turn, `game-state` is updated by `Quantum.py` and `do_turn()` is called. This is where you make decisions and perform Game [*"Move"*][move-calls] calls. Once again, `game` holds the most recent `game-state`.

[TOC]

#Game State Object

This is a pretty large object defined in `Quantum.py`. Acces attributes like this:
```py
game.error_dump(game.turn)
game.error_dump(game.Clusters[game.my_id])
```

my_id
:	This is the `Cluter ID` or, `bot_id` assigned to this the bot. `Clusters[game.my_id]` will return the `Server` objects that are nuder *"this"* bot's control.

turntime
:	`float`
Time in seconds provided to your script to make a move.

loadtime
:	`float`
Time in seconds provided to your script to run `do_setup()`.

turn
:	`int`
Current turn#

active
:	`bool`
Whether the bot is active in the game, it could be 'eliminated', 'timed-out' or 'crashed'

bot_count
:	Is the number of bots playing in this round (apart from *"this"* bot!)

server_count
:	Is the total number of servers on the map. `server_count == len(Servers)`

Servers
:	`list` of `Server` objects
The list of server objects. Each server object has complete information about itself. Described [here][server]. Since the number of servers is fixed, the list is fixed, in the sense that if @ \\(turn\ k\\) `Server[i]` was @ position `(x, y)` then at every 
$$turn\ m, 0 \leq m \leq maxTURNS$$
`Server[i]` will still refer to the same Server on the map. Its contents, like `owner`, `reserve` etc, will change with time. 

Clusters
:	`dict` of `(owner_id: list(server_indices))`
`Clusters[A]` is a list of `server` indices that are owned by `botA`. `Servers[Cluster[A][0]]` is one the `server` objects.

##Server

Though there are methods defined in `util.py` that you can call, we warn you against it. Use `Server` objects only to read information. Any attempts to edit the object's information will lead to errors in the Game. Any changes you make to these objects will be in your bot's local memory. The Game has an actual copy which shall be used to determine the Game results and functioning.
> So, don't bother to tamper with the files we provide or try to misuse the objects we provide for your convenience.

To find distances between `Server` Objects don't use their `pos` attribute. Use the [helper method][dist_betwn] for that.

pos
:	`tuple (x%, y%)`
Position on the map. *Don't use this!*

reserve
:	`float`
The amount of qubits residing on the `Server`.

invested
:	`float`
The amount of qubits invested in `Connections`.
$$\sum_{i=0}^{num. of conns.} connection.length = invested$$

power
:	`float`
Sum of `reserve` and `invested`.

owner   
:	`int`
`Server` is owned by this `Cluster ID`. Your servers will have `owner == game.my_id`

index
:	`int`
position in the `Servers` list.

limit
:	`float`
The maximum amount of qubits that can be held in the `reserve`.

connections
:	`dict` of `(sink_id: Connection Object to sink_id`
Dictionary of `Connection` objects that have been `source`d from this server. See below.

##Connection

These objects get created and destroyed by your and the Game Engine's actions. Since the Game Engine performs [*"Special Actions to protect your cluster"*][protect], these objects might even get created/removed in between turns.
> In case of any such deletion in between turns, you can read the [`notification`][notifs] objects to get information on why the action was taken by the Game Engine.

attacker
:	Atacker Server ID `int`
The `Server ID` of the creator and owner of this Connection. Also called the `source` ID.

victim
:	Victim Server ID `int` or `string`
The `Server ID` of the target server of this Connection. Also called the `sink` ID.
> **Note that the `victim` attribute can be string. Those connections which have `victim` as string are necessarily `whostile` connections.**

arate
:	`float` Range {0.0, [BANDWIDTH_LIMIT][specs-table]}, PER TURN.
The rate at which qubits are sent along this connection for support or attack purposes.

state
:	`int` Range {0 - 4}
The current state of the `Connection` object.
```py
'making'      : 0,
'connected'   : 1,
'withdrawing' : 2,
'headon'      : 3,
'whostile'    : 4
```

length
:	`float`
Current length of this `Connection`.

full_distance
:	`float`
Distance between the `source` and `sink` servers.

#Notifications

These lists will be filled with notifications from the Game Engine at every turn. Notifications are added in chronological order (and are timestamped) for easy traversal and understanding. You can access these `lists` like this:
```py
game.error_dump(game.news_additions)
```

* Incase of any Connection Objects that were deleted in-between turns
`news_deletions`
:	`list` of `tuples(epoch%, source, sink, state)`
>`epoch%` is a `float` that points out the exact time of the incident. Interpret as *"previous turn_no + `epoch%` * time betwween 2 turns"*. Note that time between 2 turns is fixed and not same as `game.turntime`.
Other arguments give more information about the `Connection` object that got deleted.
**Remember that `sink` can be `string`.**

* Incase of new Connection objects created. New objects are necessarily created only at beginning of the turns. Hence `epoch%` is `0.0`.
`news_additions`
:	`list` of `tuples(source, sink, arate, full_distance, state)`
> **Remember that `sink` can be `string`.**

* ***Incase of [Special Actions of the Game Engine][protect], Use `news_alerts`.***
It is a `list` of `tuples(mode, turn, epoch%, info1, info2, info3)`
There are 3 types of such actions:
	+ `mode == 'w'` **Auto-Withdraw**. Incase your server ran out of reserve and engine withdrew a connection.
		+ `info1` is `source` ID
		+ `info2` is `sink` ID
		+ `info3` is `state` of the connection before `withdrawing` it.

	+ `mode == 'p'` **Server Lost**. Incase you lost a server.
		+ `info1` is  winner `Server.owner` ID
		+ `info2` is  winner `Server` ID (this doesn't really matter. What would you do with it anyways?)
		+ `info3` is  `Server` ID of the lost `Server`.

	+ `mode == 'i'` **Insuffecient Resources**. Incase you don't have enough reserve to make a connection, the [request will be dropped][specs-attack].
		+ `info1` is `source` ID
		+ `info2` is `sink` ID
		+ `info3` is the required `reserve` for such a request to be implemented.

#Moves

The following moves can be made @ every turn. You can make as many `moves` as you want in each turn, but the `(source, sink)` in each move should be unique. Say, you want your `ServerX` to `attack` `ServerK`, but in the same turn you make the move `update-link` between `ServerX` and `ServerK`, then the second move will be ignored.
You can still make moves from `ServerX` but the target can no more be `ServerK` (as it has been issued a command before)!

##`attack`

Arguments
> `source_id, sink_id, arate`

Validation
> `source_id`, `sink_id` must be integers. `arate` must be float in the Range defined [here][specs-table]
`source_id` must be owned by *"this"* bot, `sink_id` may or may not be.

##`update_link`

Arguments
> `source_id, sink_id, new_arate`

Validation
Same as that of `attack`, additionally, the connection must exist.

##`withdraw`

Arguments
> `source_id, sink_id, split_ratio`

Validation
`source_id`, `sink_id` must be integers. The connection must exist. If connection is in `making` state, the `split_ratio` is ignored (but is required).
`split_ratio` must be a `float` between `0.0` and `1.0`. Say, the current connection length (when you gave the command) is \\(L\\). You will recieve \\(L \times split_ratio\\) qubits back. Rest will be forwarded faithfully to the target. They will `attack` or `support` it as specified in the [Game Spec][specs-attack].

#Helper Methods

##`error_dump`

Arguments
> `string`

This function will dump the string into the `stderr`. You can open `logs/bot0.error.log` to view the printout.
> Make sure that the argument is a `string`, not an object or other `builtin`.
You can easily convert python's `builtin` data structures and even the `Server` and `Connection` objects into strings like this:
```py
game.error_dump("%r, %d\n%s\n" % ([1,2,3], 2342, game.Servers[0]))
# even '%s' can be used instead of the '%r'
```

##`dist_between`

Arguments
> `server_id, server_id`

Returns
> The actual distance between the 2 servers in the game.

[move-calls]: #moves
[server]: #server
[notifs]: #notifications
[protect]: ../game_spec.html#game-engine-has-got-your-back-covered
[specs-attack]: ../game_spec.html#attacking
[specs-table]: ../game_spec.html#parameter-table
[error_dump]: #error_dump
[dist-betw]: #dist_between