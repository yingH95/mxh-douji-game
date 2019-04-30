const Player = require('Player');

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: Player
        },
        startBtn: {
            default: null,
            type: cc.Node
        },
        timerDisplay: {
            default: null,
            type: cc.Label
        },
        maxTime: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.timer = 0;
    },

    onStartGame: function () {
        this.enabled = true;
        this.timer = 0;
        this.startBtn.x = 3000;
        this.player.startMoveAt(cc.v2(-window.innerWidth / 2, window.innerHeight / 2));
    },

    update: function (dt) {
        // 每帧更新计时器
        if (this.timer > this.maxTime) {
            this.gameOver();
            this.enabled = false;   // disable this to avoid gameOver() repeatedly
            return;
        }
        this.timer += dt;
        this.addTimer();
    },

    addTimer: function () {
        // 更新 scoreDisplay Label 的文字
        this.timerDisplay.string = 'Timer: ' + (this.maxTime - this.timer).toFixed(2);
    },

    gameOver: function () {
        this.player.enabled = false;
        this.player.stopMove();
        this.startBtn.x = 0;
    }
});
