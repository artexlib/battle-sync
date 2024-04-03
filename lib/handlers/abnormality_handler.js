const Abnormalities = require('../data/abnormalities');

class AbnormalityHandler {
    constructor(mod) {
        this.mod = mod;
        this.activeAbnormalities = new Map();
        this.startCountdown = this.startCountdown.bind(this);
    }

    start() {
        this.mod.hook('S_ABNORMALITY_BEGIN', 4, (event) => {
            if (event.target === this.mod.game.me.gameId && this.isRelevantAbnormality(event.id)) {
                const abnormalityData = Abnormalities.find(ab => ab.id === event.id);
                this.handleAbnormality(abnormalityData);
            }
        });

        this.mod.hook('S_ABNORMALITY_REFRESH', 1, (event) => {
            if (event.target === this.mod.game.me.gameId && this.isRelevantAbnormality(event.id)) {
                const abnormalityData = Abnormalities.find(ab => ab.id === event.id);
                if (abnormalityData.type === "countdown") {
                    this.clearCountdown(event.id);
                    this.startCountdown(event.id);
                }
            }
        });
    }

    startCountdown(abnormalityId) {
        const abnormalityData = Abnormalities.find(ab => ab.id === abnormalityId);
        if (!abnormalityData) return;
    
        const { id, name, sync } = abnormalityData;
    
        this.clearCountdown(id);
    
        const buffer = 300;
        let remainingTime = Math.floor((sync - buffer) / 1000);
    
        remainingTime = Math.max(remainingTime, 5);
    
        const messageType = this.mod.settings.messageType || "normal";
    
        const messageTypeMap = {
            "normal": 41,
            "system": 40,
            "notice": 44
        };
    
        const messageTypeID = messageTypeMap[messageType];
    
        const countdownTimer = setInterval(() => {
            if (remainingTime <= 5 && this.mod.game.me.inCombat) {
                this.mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
                    type: messageTypeID,
                    message: `${name} ready in: ${remainingTime}`,
                });
            }
            if (remainingTime > 0) {
                remainingTime--;
            } else {
                this.clearCountdown(id);
            }
        }, 1000);
    
        this.activeAbnormalities.set(id, countdownTimer);
    }

    handleAbnormality(abnormalityData) {
        if (abnormalityData.type === "countdown") {
            this.startCountdown(abnormalityData.id);
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

    sendInstantNotification(abnormalityName) {
        this.mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
            type: 41,
            message: abnormalityName,
        });
    }

    isRelevantAbnormality(abnormalityId) {
        return Abnormalities.some(abnormality => abnormality.id === abnormalityId);
    }
}

module.exports = AbnormalityHandler;