
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    runAmplifier1(){
        
        let zoomIn = cc.scaleBy(0.15, 51/50, 51/50);
        let zoomOut = cc.scaleBy(0.15, 50/51, 50/51);
        
        let seq = cc.sequence(zoomIn, zoomOut, cc.callFunc(function () {                
        }));
        
        this.node.runAction(seq).repeatForever();
        
    },

    start () {
      this.runAmplifier1();
    },

    update (dt) {
        if(cc.find('Canvas').getComponent("home").sceneState == "GAME_PAUSE"){
            // cc.director.getActionManager().pauseTarget(this.node);      
            
        }

        
    },
});
