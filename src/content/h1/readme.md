---
title: Halo 1
keywords:
  - h1
  - halo
  - combat evolved
  - ce
thanks:
  gbMichelle: H1A/MCC lineage information
  Hasuku: Xbox modding lineage
  Kavawuvi: Engine versions
  Vaporeon: Analyzing marketing beta
  Neo: Providing the marketing beta
---
{% figure src="box-art.jpg" %}
Halo's box art
{% /figure %}

**Halo: Combat Evolved**, also known as **Halo 1**, is the first installment of the Halo game series. It was created by [Bungie][bungie] and initially released on the original Xbox in 2001 by publisher/owner [Microsoft][microsoft]. In 2003, the game was released for Windows PC and Mac via different studios.

Halo 1 uses Bungie's proprietary [Blam!](~engine) engine, which also formed the basis of later games in the series. PC versions of the game support a variety of command line/shortcut [arguments](~) to configure and toggle features.

# Editions and versions

{% figure src="games.svg" %}
Evolution of the Halo 1 editions and versions, colour-coded by platform or major revision
{% /figure %}

## Xbox (Bungie, 2001)
Sometimes called **h1x** or **OG Xbox**, this is the classic first release of Halo 1 for the original Xbox. It supports LAN multiplayer and spawned a competitive community which is still active. While original Xbox consoles are hard to come by, [emulation][xemu] is an emerging alternative. Though it is a more involved process, custom maps created with the [HEK](~) can be ported back to Xbox.

Xbox has a rich history of modding, notably:

* **Halo 1.5**, which adds [new competitive maps][h15]. [Custom edition ports][h15-maps-ce] of these maps are also available
* [**Halo 1 Final**][h1final], and its **Neutral Host Edition** (NHE), is a newer competitive mod with modified sounds, time callouts, and a selection of stock and H1.5 2v2-oriented maps
* **Patch Edition** (PE) is a modified version of NHE with map adjustments by Patch and hirsute.

## Halo PC (Gearbox Software, 2003)
Often called **retail** or **PC**, this edition is the classic port of Halo 1 to Windows PC by developer [Gearbox Software][gearbox] and publisher [Microsoft Game Studios][microsoft]. Compared to the Xbox version, the PC port included a number of changes (for better and worse):

* Modification of some multiplayer maps' level geometry
* Addition of server browser and online play
* Addition of Banshees to multiplayer
* Addition of the flame thrower, fuel rod gun, and rocket warthog
* Addition of the multiplayer maps Death Island, Ice Fields, Gephyrophobia, Infinity, Timberland, and Danger Canyon
* Addition of a dedicated server, `haloceded.exe`
* The [model](~) tag was modified into [gbxmodel](~)
* A new "jet" particle creation physics type was added to the [particle_system](~) tag
* [Regressions in visuals](~renderer#gearbox-regressions) and assets due to platform differences and the port being based on a pre-release version of Xbox Halo 1

The game received several patches since its release to address remote exploits, remove the CD requirement, replace the GameSpy Arcade lobby, and other minor improvements. Its current version is `1.0.10` ([2014][patch]).

Several beta versions of Halo PC can also be found online. Beta 1.5 has [unfinished versions of PC-exclusive content][pc-beta-2] and [weapon tuning][pc-beta-1] similar to pre-release Xbox versions. [Marketing beta 1.8][pc-beta-3] features doppler and a model detail option.

## Custom Edition (PC, Gearbox Software, 2004)
Custom edition, often called **Halo CE** or **CE** is a standalone version of Halo PC which supports custom maps created by the [HEK](~), [released in 2004][custom-edition-launch]. Like Halo PC it features a server browser and its own `haloceded.exe` dedicated server, but lacks the campaign. [Maps](~map) are incompatible between the editions.

CE has many more differences from PC. To name a few:

* Some tags were modified, such as stun effects, possibly as a workaround for [netcode desyncs](~netcode#known-issues-and-limitations)
* Regression in rendering of certain objects through fog
* Addition of the the gamemode info menu (F2)
* Addition of the teammate names toggle (F3)
* Addition of new server-related console commands like `sv_say`

Custom Edition has become the de facto standard PC title due to its support of custom maps, actively maintained client and server mods, and [campaign ports][refined]. Like retail, its current version is `1.0.10` ([2014][patch]).

## Mac (Westlake Interactive, 2003)
The Gearbox PC port (retail) was itself ported to Mac by _Westlake Interactive_ and published by _MacSoft_. No significant changes were made aside from platform compatibility, and maps are byte-for-byte identical to retail's. With _MacSoft's_ shutdown in 2011, this version has not been receiving the latest patches. [Nil's fix][nil-fix] enables its continued use with intel GPUs on OSX Mavericks and the post-Gamespy lobby master server.

The Mac edition has a mod called [Halo Mini Demo][halomd], or **HaloMD**, which allows it to be played on modern systems. The plugin [**Halo+**][halo-plus] by Samuco can be used to enhance to experience, and a [netcode translator][halomd-bridge] can be used to connect to Custom Editions servers.

## Demo (PC and Mac)
The free demo versions of Halo 1 on Mac and PC include just the multiplayer map Blood Gulch and the campaign mission _The Silent Cartographer_ (b30). Upon closing the demo, players are presented with the [iconic Sergeant Johnson advertisement][demo-ad] (`demo.bik`).

## Anniversary (Xbox 360, 343 Industries, 2011)
In 2011, Halo: Combat Evolved Anniversary was released for Xbox 360. Often called **CEA** by the community. It was developed by [343 Industries][343i] and [Saber Interactive][saber] as a remaster of the original Halo: Combat Evolved, and is derived from the Gearbox PC port. This edition contains the secondary _Saber3D_ engine for its remastered graphics mode.

## MCC (PC and Xbox One, 343 Industries, 2014-2021)
Halo: The Master Chief collection (MCC) is actively maintained by [343 Industries][343i] for both PC and Xbox One. It brings the Halo series under a single [Game as a Service][gaas], including unified matchmaking and progression experiences. The PC port uses [Unreal Engine][unreal] as a menu and input layer over the respective engines of each included Halo game.

Custom maps can be created for MCC PC using the official [H1A Editing kit](~h1a-ek).
The community tool [Invader](~) also supports building H1A caches. The [SeT](~) supports modifying S3D content (this is not supported by the offical tools).

[gearbox]: https://en.wikipedia.org/wiki/Gearbox_Software
[bungie]: https://en.wikipedia.org/wiki/Bungie
[microsoft]: https://en.wikipedia.org/wiki/Xbox_Game_Studios
[patch]: https://www.bungie.net/en/Forums/Post/64943622
[xemu]: https://github.com/mborgerson/xemu/wiki
[pc-beta-1]: https://www.youtube.com/watch?v=fvXuoceVhpg
[pc-beta-2]: https://www.youtube.com/watch?v=qAK-rIR_st8
[pc-beta-3]: https://archive.org/details/halopcmarketingbeta
[h15]: https://www.youtube.com/watch?v=_a0R8SOIjWQ
[h15-maps-ce]: https://opencarnage.net/index.php?/topic/7455-halo-15-maps-converted-to-ce/
[h1final]: http://halo1final.com
[refined]: https://www.reddit.com/r/HaloCERefined/
[demo-ad]: https://www.youtube.com/watch?v=N11I-YtyLf8
[nil-fix]: https://halo-fixes.forumotion.com/t9-mac-patch-for-the-new-lobby
[halomd]: https://www.halomd.net/
[halo-plus]: https://opencarnage.net/index.php?/topic/5174-halomd-halo/
[halomd-bridge]: https://opencarnage.net/index.php?/topic/7082-misc-ce-development/&page=18#comment-83828
[saber]: https://en.wikipedia.org/wiki/Saber_Interactive
[343i]: https://en.wikipedia.org/wiki/343_Industries
[gaas]: https://en.wikipedia.org/wiki/Games_as_a_service
[unreal]: https://en.wikipedia.org/wiki/Unreal_Engine
[custom-edition-launch]: https://www.gamespot.com/articles/gearbox-readying-halo-custom-edition/1100-6095140/
