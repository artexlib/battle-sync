class CommandHandler {
  constructor(mod, settingsManager) {
      this.mod = mod;
      this.settingsManager = settingsManager;
  }
  
  handleCommand(args) {
      switch (args[0]) {
          case undefined:
              this.mod.settings.isEnabled = !this.mod.settings.isEnabled;
              this.mod.command.message(`Mod is now ${this.mod.settings.isEnabled ? 'enabled' : 'disabled'}.`);
              this.settingsManager.ui.update(this.mod.settings);
              this.mod.saveSettings();
              break;
          
          case 'ui':
              this.settingsManager.ui.show();
              break;
          
          case 'help':
              this.mod.command.message(this.getHelpMessage());
              break;

          case 'msg':
            if (args[1] && ["normal", "system", "notice"].includes(args[1])) {
            this.mod.settings.messageType = args[1];
            this.mod.command.message(`Message type set to: ${args[1]}.`);
            this.mod.saveSettings();
            } else {
            this.mod.command.message(`Invalid message type. Usage: bsync message [normal|system|notice]`);
            }
            break;
          
          default:
              this.mod.command.message('Unknown command!');
      }
  }
  
  getHelpMessage() {
      return `Commands:\n` +
              `- bsync - toggle mod on/off.\n` +
              `- bsync ui - displays settings ui.\n` +
              `- bsync help - FAQ.\n` +
              `- bsync msg - change display type.\n` +
              `Sync well, ${this.mod.game.me.name}!`;
  }
}

module.exports = CommandHandler;
