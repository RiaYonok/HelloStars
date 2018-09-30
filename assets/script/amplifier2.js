
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    runAmplifier2(){
                
        let zoomOut = cc.scaleBy(0.1, 15/16, 15/16);
        let zoomIn = cc.scaleBy(0.1, 16/15, 16/15);

        let seq = cc.sequence( zoomOut, zoomIn, cc.callFunc(function () {                
        }));
        
        this.node.runAction(seq).repeatForever();
        
    },

    start () {
      this.runAmplifier2();
    },

    // update (dt) {},
});
