
cc.Class({
    extends: cc.Component,

    properties: {
       
    },
  
    start () {
        this.moveStart = false;
    },

    update (dt) {
        let c = cc.find("Canvas");
        if(c.getComponent("home").isOneDrawed == true){
            if(this.moveStart == false){
                this.node.runAction(cc.sequence(
                    cc.moveBy(0.4, cc.v2(70, 0)),
                    cc.moveBy(0.4, cc.v2(-70, 0))
                )).repeatForever();
                this.moveStart = true;
            }
        }
    },
});
