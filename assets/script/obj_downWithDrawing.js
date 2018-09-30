
cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
        this.isMoveStart = false;
    },

    update (dt) {
        let c = cc.find("Canvas");
        if(c.getComponent("home").isOneDrawed == true && this.isMoveStart == false){
            let body = this.node.getComponent(cc.RigidBody);
            body.type = cc.RigidBodyType.Dynamic;            

            this.isMoveStart = true;
        }
    },
});
