
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {

    },

    update (dt) {
        if(this.node.y < -3000){
            this.node.removeFromParent();
        }
    },
});
