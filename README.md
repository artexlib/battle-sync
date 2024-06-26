## Battle-Sync: TERA Timing Assistant WIP!

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/artexlib/battle-sync/blob/main/LICENSE)  [![Build Status](https://img.shields.io/badge/Build-passing-brightgreen)](https://github.com/artexlib/battle-sync)

This module provides crucial in-game notifications to help you time party buffs and soon even more...

### Key Features

* **Timing:** Tracks essential party buffs and abilities.
* **Notifications:** Receive timely in-game countdown messages.
* **Configuration:** Adjust settings through the UI or `config.json`.
* **Advanced:** Add more abormalities/buffs if you wish so `lib/data/abnormalities.js`. 

### Installation

1. **Prerequisites:** Ensure you have TERA Toolbox.
2. **Download:** Get the latest release from the GitHub repository: https://github.com/artexlib/battle-sync
3. **Installation:** Place the module folder within your Proxy `/mods` directory (unziped).

### Usage

* `/bsync`: Toggle the module on/off.
* `/bsync ui`: Access the settings window (requires tera-mod-ui).
* `/bsync help`: View a quick command reference.
* `/bsync msg (type)`: Change your display notification message type: normal, system, notice.

### Important

Countdown notification cooldowns are set for Menma's Tera (MT: Dream) 1min||60s burning, can be adjusted at `lib/data/abnormalities.js` where "sync" value is the skill cooldown you would want to sync with (in miliseconds).

There is a combat check to prevent pointless screen notifications if boss dies during internal countdown.

Example: When lancer uses Adrenaline Rush, it will tell you that it's ready again in 5,4,...1.

### Configuration

Customize Battle-Sync's behavior through the `config.json` file or the in-game UI. 

For advanced users, add additional abnormalities data in `lib/data/abnormalities.js`.

### Contributing

This a a WIP (WORK IN PROGRES) project

### Contact

Author: ArtexLib
GitHub: https://github.com/artexlib/battle-sync 