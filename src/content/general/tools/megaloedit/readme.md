---
title: MegaloEdit
stub: true
img: megaloedit.png
caption: MegaloEdit window with *Halo 4*'s Capture the Flag gametype
---

**MegaloEdit** is a program included in the [Halo Reach Editing Kit](~hr-ek), Halo 4 Editing Kit, and Halo 2 Anniversary Multiplayer Editing Kit that is used to create, edit, and compile gametypes. It utilizes a custom scripting language to handle gametype logic. Gametype source code is saved directly to standard text files.

# Main Window
## Basic gametype management
- *File > New* - Closes the currently active gametype after prompting to save, and clears the text box.
- *File > Open* - Opens the Windows file selection to select a gametype text file.
- *File > Save* - Save the currently active file.
- *File > Save as* - Save the active file under a new name.
## Building and Hot Reloading
- *Build* - Creates a .mglo file out of the current gametype in the `../maps/megalo/` directory. Moving it to a game's HotReload folder allows it to be quickly reloaded from the "Hot Reload" option in the pause menu.
## Text box
The text box is where Megalo code is typed. It features syntax highlighting, live error checking, and autocomplete. The autocomplete dialogue can be invoked using {% key "Ctrl+Space" /%} or {% key "." /%}. The size of the text can be adjusted by holding {% key "Ctrl" /%} and scrolling in/out. [More information about the language](~megalo_scripting).

Unintentionally, the text box appears to support rich text and images. These are stripped when the file is saved.
## Error List
The Error List lies just below the text box. If no errors have been sent, it will appear blank. It will output any warnings or errors the program encounters if a gametype is built.
## Status bar
The Status Bar runs along the bottom of the main window and can display the syntax of the closest action or condition. Square brackets denotes an optional parameter, curly braces indicate a choice, and paranthesis contain extra information.
## Non-functional/Unknown
- *Source Control* - likely a leftover from an internal source control system. Clicking on it does nothing.
- The "Disconnected" message on the left side of the status bar is likely a leftover from 360-era development.
# Converting gametypes to `.bin` files
tool