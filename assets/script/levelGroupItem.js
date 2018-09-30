
cc.Class({
    extends: cc.Component,

    properties: {
       levelNo : 0,
       lock : 0
    },

    start () {
        let self = this;
        let bg_mask = this.node.parent.getChildByName("bg_mask");

        this.node.on("touchstart", function(){        
            bg_mask.active = true;
        });
        this.node.on("touchcancel", function(){            
            bg_mask.active = false;
        });
        this.node.on("touchend", function(){ 
            bg_mask.active = false;            
            
            let homeCom = cc.find('Canvas').getComponent("home");
            cc.audioEngine.play(homeCom.snd_btn, false, 1);
            if(homeCom.userLevelInfos["userLevelInfos"][self.levelNo - 1]["lock"] == 1) return;
            // check next level prefab            
            if(homeCom.level_scene_prefab.length < self.levelNo) return;
            
            homeCom.scrollview_levelgroup.active = false;
            homeCom.curLevelNo = self.levelNo;
            homeCom.loadLevelScene(homeCom.curLevelNo);
            
            homeCom.back_btn.node.active = false;
            
        });
    },

    // update (dt) {},
});