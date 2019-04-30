(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '996afdmYUFBaZ77moPK8brY', 'Game', __filename);
// scripts/Game.js

'use strict';

var Player = require('Player');

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

    onLoad: function onLoad() {
        this.timer = 0;
    },


    onStartGame: function onStartGame() {
        this.enabled = true;
        this.timer = 0;
        this.startBtn.x = 3000;
        this.player.startMoveAt(cc.v2(-window.innerWidth / 2, window.innerHeight / 2));
    },

    update: function update(dt) {
        // 每帧更新计时器
        if (this.timer > this.maxTime) {
            this.gameOver();
            this.enabled = false; // disable this to avoid gameOver() repeatedly
            return;
        }
        this.timer += dt;
        this.addTimer();
    },

    addTimer: function addTimer() {
        // 更新 scoreDisplay Label 的文字
        this.timerDisplay.string = 'Timer: ' + (this.maxTime - this.timer).toFixed(2);
    },

    gameOver: function gameOver() {
        this.player.enabled = false;
        this.player.stopMove();
        this.startBtn.x = 0;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        