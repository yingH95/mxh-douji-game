"use strict";
cc._RF.push(module, '3d65b2szLNHW7JtqPGM9yub', 'Player');
// scripts/Player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0
    },

    onKeyDown: function onKeyDown(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = true;
                // 让玩家镜面翻转
                this.node.runAction(cc.flipX(true));
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = true;
                // 让玩家恢复镜面方向
                this.node.runAction(cc.flipX(false));
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.accUp = true;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.accDown = true;
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.accUp = false;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.accDown = false;
                break;
        }
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.enabled = false;
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        // 主角当前垂直方向速度
        this.ySpeed = 0;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy: function onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    startMoveAt: function startMoveAt(pos) {
        this.enabled = true;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.node.setPosition(pos);
    },

    stopMove: function stopMove() {
        this.node.stopAllActions();
    },

    update: function update(dt) {
        // 根据加速度flag计算速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        } else if (this.accUp) {
            this.ySpeed += this.accel * dt;
        } else if (this.accDown) {
            this.ySpeed -= this.accel * dt;
        } else {
            // 如果没有按方向键则逐渐减速
            if (this.xSpeed > 0) {
                this.xSpeed = Math.max(0, this.xSpeed - this.accel * dt);
            } else {
                this.xSpeed = Math.min(0, this.xSpeed + this.accel * dt);
            }
            if (this.ySpeed > 0) {
                this.ySpeed = Math.max(0, this.ySpeed - this.accel * dt);
            } else {
                this.ySpeed = Math.min(0, this.ySpeed + this.accel * dt);
            }
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        if (Math.abs(this.ySpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.ySpeed = this.maxMoveSpeed * this.ySpeed / Math.abs(this.ySpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
    }
});

cc._RF.pop();