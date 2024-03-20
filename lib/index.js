const SettingsManager = require('./settings/settings');
const CommandHandler = require('./handlers/command_handler');
const AbnormalityHandler = require('./handlers/abnormality_handler');

module.exports = function BattleSync(mod) {
    const settingsManager = new SettingsManager(mod);
    const commandHandler = new CommandHandler(mod, settingsManager);
    const abnormalityHandler = new AbnormalityHandler(mod);

    mod.command.add('bsync', (...args) => commandHandler.handleCommand(args));
    
    abnormalityHandler.start();

    if (global.TeraProxy && global.TeraProxy.GUIMode) {
        settingsManager.initializeUI();
    }

    // Clean up on mod unload or reload
    this.destructor = () => {
        settingsManager.destructor();
    };
};
