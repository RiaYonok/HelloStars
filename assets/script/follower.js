
cc.Class({
    extends: cc.Component,

    properties: {
        isCollided : false
    },

    start () {

    },

    onEnable(){
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
   },

   onDisable(){
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
   },

    onBeginContact(_contact, selfCollider, otherCollider){   
        //console.log("collid in");
        this.isCollided = true;
    },

    onEndContact(_contact, _selfCollider, _otherCollider){
        //console.log("collid out");
        this.isCollided = false;
    }
    // update (dt) {},
});
