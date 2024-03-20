const Abnormalities = require('../data/abnormalities');

class AbnormalityHandler {
    constructor(mod) {
        this.mod = mod;
        this.activeAbnormalities = new Map();
        this.startCountdown = this.startCountdown.bind(this);
    }

    start() {
        this.mod.hook('S_ABNORMALITY_BEGIN', 4, (event) => {
          if (event.target === this.mod.game.me.gameId) {

            const abnormalityData = Abnormalities.find(ab => ab.id === event.id);

            if (abnormalityData) {
              this.handleAbnormality(abnormalityData);
            } else {
              this.mod.log.warn("Unknown abnormality detected with ID: " + event.id);
            }
          }
        });

        this.mod.hook('S_ABNORMALITY_REFRESH', 1, (event) => {
            if (event.target === this.mod.game.me.gameId) {
                if (this.isRelevantAbnormality(event.id)) {
                    this.startCountdown(event.id);
                }
            }
        });

        this.mod.hook('S_ABNORMALITY_END', 1, (event) => {
            this.clearCountdown(event.id); 
        });
    }

    startCountdown(abnormality) {
        const { id, name, skill_cooldown } = abnormality;
        this.clearCountdown(id);
    
        const messageTime = skill_cooldown - 5000;
        const buffer = 500;
    
        let remainingTime = Math.floor((skill_cooldown - buffer) / 1000);
    
        const countdownTimer = setInterval(() => {
          if (remainingTime > 5) {
            remainingTime--;
          } else if (remainingTime > 0) {
            this.mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
              type: 41,
              message: `${name} ready in: ${remainingTime}`,
            });
            remainingTime--;
          } else {
            this.clearCountdown(id);
          }
        }, 1000);
    
        this.activeAbnormalities.set(id, countdownTimer);
      }

    sendInstantNotification(abnormalityName) {
        this.mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
          type: 41,
          message: abnormalityName,
        });
    }

    handleAbnormality(abnormalityData) {
        if (abnormalityData.type === "countdown") {
          this.startCountdown(abnormalityData);
        } else if (abnormalityData.type === "notify") {
          this.sendInstantNotification(abnormalityData.name);
        }
      }

    clearCountdown(abnormalityId) {
        const timer = this.activeAbnormalities.get(abnormalityId);
        if (timer) {
            clearInterval(timer);
            this.activeAbnormalities.delete(abnormalityId);
        }
    }

    isRelevantAbnormality(abnormalityId) {
        return Abnormalities.some(abnormality => abnormality.id === abnormalityId);
    }
}

module.exports = AbnormalityHandler;
