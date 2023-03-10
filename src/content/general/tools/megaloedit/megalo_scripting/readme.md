---
title: Megalo scripting
stub: true
---

**Megalo script** is a scripting language utilized by [MegaloEdit](~megaloedit) that is used to store options and control the flow of multiplayer gametypes in [Halo: Reach](~hr), *Halo 4* and *Halo 2: Anniversary* Multiplayer. 

# Syntax
uhhhh pretend some smart stuff is here

## Comments
Comments can be included by prepending text with a `;` semicolon:
```megalo
;this is a comment
trigger general
    action end_round ;i didn't want to play anyway
end
```

## Variables
Variables are used to store and manipulate data in gametypes. They are either considered global variables or nested variables. Variables must be declared prior to triggers:
```megalo
variables <category>
    <network_priority> <type> <name> <initial_value>
end
```

| Type | Comments |
|---|---|
| `number` | Used to store numeric values. 16-bit shorts which range from -32768 to 32767. |
| `player` | Used to store references to specific players. Player variables do not always point to valid or existing players. Sometimes, a player variable may point to a player who is not in the game or does not exist at all. This can happen when a player leaves the game and their index is freed up for another player to join. This can cause new players to inherit data of old players if gametypes do not properly accomodate for this. |
| `team` | Used to store references to specific teams. |
| `object` | Used to store references to specific objects, like forge pieces or weapons and vehicles. A limit of 512 objects can have variables stored on them, which is called the "scripted objects limit." For instance, if each object on a large forge map is assigned the number 1 in one of their variable slots, only the first 512 objects will remember that number. The rest of the objects will not store any new variables. |
| `timer` | comment about timers |

### Global variables
Global variables can be directly referenced at any time when calling an action or condition.

To declare a global variable, for example:
```megalo
variables global
    networked number phase 1
end
```

### Nested variables
Nested variables are variables that exist within other variables in Megalo. Unlike global variables, they can only be accessed through their parent variable. The parent variable must be a global variable of type player, object or team.

Nested variables are primarily used to store and access variables that are specific to one player, team, or object. For example, if you want to track how much money each player has, you would use a number variable stored under the player variable.

To declare a nested variable, for example one that is specific to a player:
```megalo
variables player
    networked number money 100
end
```
The nested variable can then be referenced via an accessor:
```megalo
trigger player
    condition if current_player.money > 500
    action end_round
end
```

### Variable priorities
Variable priorities determine how often and how fast a variable is synced from the host to the clients. Note that variable updates are only sent when a value changes from its previous value. For example, if you set var1 to 300 and it was already 300, no update will be sent.

| Priority         | Comments                                                                                                                                             |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `local`          | Not synced at all. Only exists on the host and is not sent to clients. Helps reduce network traffic and improve performance.                         |
| `networked`      | Synced about once per second. There may be some delay between the host and clients when a variable changes (about 5-30 ticks with a good connection. |
| `networked_high` | Synced several times per second. Less delay between the host and clients when a variable changes. (about 3-15 ticks with a good connection)          |

### Temporary variables

### Script options
Script options are a special kind of variable that can be modified in the MCC custom game menu (under specific game options). They enable users who do not have mod tools to customize the mode according to the options provided by the modder. This is very useful for creating flexible modes that can accommodate different preferences and features; a modder can create a script option that allows users to toggle a feature on or off depending on their liking. Script options also make it easier to adjust settings while the mode is in development, as there is no need to recompile the mode. The changes can be made in the custom game menu.

## Constants


## Gametype flow
### Triggers
Triggers are code blocks that tell the game which actions and conditions to run, and when to run. Event triggers get executed when a specific occurance happens, such as at the start of the game, or when an object gets destroyed. Iteration triggers loop through multiple instances. All triggers must be closed with an `end` statement. To run a trigger:
```megalo
trigger <type>
    ;do stuff
end
```

| Type | Category | Comments |
|---|---|---|
| `general` | General | Executed every game tick. |
| `local` | General | Executed every game tick, but is not networked. Local code is run individually on the host and on each client. |
| `object` | Iteration | Runs through most objects every game tick. The instance of the current object can be referenced with `current_object` |
| `player` | Iteration | Runs through all players every game tick. The instance of the current player can be referenced with `current_player` |
| `random_player` | Iteration | Runs through all players in a random order every game tick. The instance of the current player can be referenced with `current_player` |
| `team` | Iteration | Runs through all teams every game tick. The instance of the current team can be referenced with `current_team` |
| `initialization` | Event | Fires once at the very start of the match. |
| `host_migration` | Event | Fires after a host migration has occurred. |
| `double_migration` | Event | Fires after a double host migration has occurred. |
| `object_death` | Event | Fires when certain objects die. It does not fire when some objects are destroyed, for example a Fusion Coil detonation. `object_death_damage_type`, `object_death_dead_object`, `object_death_killing_object`, and `object_death_killing_player` can be referenced. |
| `pregame` | Event | Fires once before the start of a match. |

### Nested triggers
Nested triggers, also referred to as subtriggers, are triggers that are run inside of another. They are called by the action `for_each`, and the trigger type can be specified as one of the parameters.
```megalo
trigger object
    action for_each player
        condition object_in_area current_player current_object
        ;do stuff
    end
end
```

### Conditions
Conditions are the ways to perform comparisons and other boolean functions. With conditions, one can stop or wait until certain criteria are met before executing a section of code. If a condition is determined to be false, the rest of the code in the current iteration of a trigger will immediatly stop executing.

### Actions
Actions are the core of gametype scripting, and control the actual logic behind them. For example, it can be used to increase or decrease a team's score or play an announcer voiceline.

# Megalo script reference
## Condition list
{% dataTable
  dataPath="megalo/conditions/conditions"
  linkCol=true
  linkSlugKey="slug"
  rowSortKey="slug"
  columns=[
    {name: "Condition", key: "info/en"}
  ]
/%}
## Action list
{% dataTable
  dataPath="megalo/actions/actions"
  linkCol=true
  linkSlugKey="slug"
  rowSortKey="slug"
  columns=[
    {name: "Action", key: "info/en"}
  ]
/%}
