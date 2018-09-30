
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
                cc.moveBy(3, cc.v2(this.move_amount, 0)),
                cc.moveBy(3, cc.v2(-1 * this.move_amount, 0))
            )).repeatForever();
            this.moveStart = true;
        }
    },
});
