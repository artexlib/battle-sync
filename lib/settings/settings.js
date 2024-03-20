const SettingsUI = require('tera-mod-ui').Settings;

class SettingsManager {
    constructor(mod) {
        this.mod = mod;
        this.ui = null;
        this.initializeUI = this.initializeUI.bind(this); // Ensure 'this' context
    }

    initializeUI() {
        const settingsStructure = require('./settings_structure');
        this.ui = new SettingsUI(this.mod, settingsStructure, this.mod.settings, { height: 200 });
        this.ui.on('update', (settings) => {
            this.mod.settings = settings;
        });
    }

    destructor() {
        if (this.ui) {
            this.ui.close();
            this.ui = null;
        }
    }
}

module.exports = SettingsManager;
