
cc.Class({
    extends: cc.Component,

    properties: {
        move_amount : 0
    },

    start () {
        this.moveStart = false;
    },

    update (dt) {
        if(this.moveStart == false){
            this.node.runAction(cc.sequence(
                cc.moveBy(8, cc.v2(0, this.move_amount)),
                cc.moveBy(8, cc.v2(0, -1 * this.move_amount))
            )).repeatForever();
            this.moveStart = true;
        }
    },
});
