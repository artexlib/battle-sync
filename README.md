## ⚔️ battle-sync - TERA Cooldown Tracker 

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/artexlib/battle-sync/blob/main/LICENSE)  [![Build Status](https://img.shields.io/badge/Build-passing-brightgreen)](https://github.com/artexlib/battle-sync)

**Elevate your TERA gameplay with battle-sync!** This TERA Proxy module takes the guesswork out of ability timing by providing crucial in-game notifications when your party buffs and cooldowns are about to refresh.

### ✨ Key Features

* **Precision Timing:** Tracks essential party buffs and abilities, giving you a tactical edge in combat.
* **Customizable Notifications:** Receive timely in-game countdown messages, ensuring you never miss a critical cooldown again.
* **User-Friendly Configuration:** Easily adjust settings either through the intuitive UI or directly in the `config.json` file.
* **Seamless Integration:** battle-sync works flawlessly within your TERA client, providing a polished and cohesive experience. 

### ⚙️ Installation

1. **Prerequisites:** Ensure you have TERA Proxy/Toolbox installed and configured.
2. **Download:** Get the latest release of battle-sync from the GitHub repository: https://github.com/artexlib/battle-sync
3. **Installation:** Extract the downloaded module folder and place it within your Proxy `/mods` directory.

### 🕹️ Usage

* **Toggle:** Use the in-game command `/bsync` to enable or disable the module as needed.
* **Configuration:** Access the settings window with `/bsync ui` (requires tera-mod-ui) to fine-tune battle-sync's behavior.
* **Help:**  Type `/bsync help` for a quick command reference.

### 🔧  Configuration

Customize battle-sync to your preferences through the `config.json` file or the in-game UI.  Here's a snippet of the configuration options:

```json
{
  "isEnabled": true,
}
