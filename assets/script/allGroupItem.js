
cc.Class({
    extends: cc.Component,

    properties: {
       group_no : 0
    },

    start () {
        let self = this;
        let homeCom = cc.find('Canvas').getComponent("home");
        this.node.on("touchend", function(){
            cc.audioEngine.play(homeCom.snd_btn, false, 1);
            cc.delayTime(0.2);//important! for soundplay.
            homeCom.scrollview_allgroup.active = false;            
            homeCom.loadLevelGroupInScrollView(self.group_no);
            homeCom.scrollview_levelgroup.active = true;
            homeCom.back_btn.node.active = true;
            homeCom.sceneState = "LEVELGROUP_VIEW";    
        });
    },

    // update (dt) {},
});
