
cc.Class({
    extends: cc.Component,

    properties: {
       isUpDown : false,
       
    },

    start () {
        this.moveStart = false;
        return;
        let moveUp = cc.moveBy(this.node.x, this.node.y + 100);
        let moveDown = cc.moveBy(this.node.x, this.node.y);
        this.node.parent.runAction(cc.sequence(
            moveUp,
            cc.delayTime(0.1),
            moveDown,
            //cc.fadeIn(0.2),
            //cc.delayTime(0.1)
        ));
    },

   onEnable(){
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
   },

   onDisable(){
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
   },

    onBeginContact(_contact, selfCollider, otherCollider){    //console.log("hello");    
        let otherBody = otherCollider.body;
        if(otherCollider.tag == "obj_circle"){
            let c = cc.find("Canvas");
            //c.getComponent("home").gameFailed();
        }
        if(otherBody.node.name == "ball_1"){            
            this.node.removeComponent(cc.PhysicsCircleCollider);
            this.disappear();
        }
        //console.log(this);        
    },

    disappear(){
        let c = cc.find('Canvas');
        let home = c.getComponent("home");        
        home.isLevelSuccess = true;
        cc.audioEngine.play(home.snd_target, false, 1);         
        
        this.node.runAction(cc.sequence(
            cc.moveBy(1, 0, 250),
            cc.fadeOut(0.5),
            cc.callFunc(this.levelSuccess.bind(this))
        ));
    },

    levelSuccess(){
        let c = cc.find('Canvas');
        let home = c.getComponent("home");        
        let ls = cc.sys.localStorage;
        //userinfo current level star count change
        if(home.levelStarCount > home.userLevelInfos["userLevelInfos"][home.curLevelNo - 1]["gain_star"]){
            home.userLevelInfos["userLevelInfos"][home.curLevelNo - 1]["gain_star"] = home.levelStarCount;
            //save to file.
            ls.setItem("HS_userLevelInfos", JSON.stringify(home.userLevelInfos));
        }

        // lock change
        if((home.curLevelNo % 10) != 0){//1~9,11~19,..
            //next level unlock
            home.userLevelInfos["userLevelInfos"][home.curLevelNo]["lock"] = 0;
            //save to file.                
            ls.setItem("HS_userLevelInfos", JSON.stringify(home.userLevelInfos));
            
        }else{//10,20...
            //10 levels star count check
            let group_no = Math.floor((home.curLevelNo - 1) / 10);
            // if((this.curLevelNo % 10) == 0)
            //     group_no--;
            if(home.getGainStarSum(group_no) > home.levelGroupGoal[group_no]){
                //next level unlock
                home.userLevelInfos["userLevelInfos"][home.curLevelNo]["lock"] = 0;
                //save to file.
                ls.setItem("HS_userLevelInfos", JSON.stringify(home.userLevelInfos));               
            }
        }

        //save to file lastLevel
        let lastLevel = {"lastLevel" : home.curLevelNo + 1};
        ls.setItem("HS_lastLevel", JSON.stringify(lastLevel));
        
        
        home.gameEnd();
        //console.log('gameend');
        
    },

    onEndContact(_contact, _selfCollider, _otherCollider){
       
    },
    
    update (dt) {

        if(this.moveStart == false && this.isUpDown == true){
            this.node.runAction(cc.sequence(
                cc.moveBy(1, cc.v2(0, 160)),
                cc.moveBy(1, cc.v2(0, -160))
            )).repeatForever();
            this.moveStart = true;
        }
    },
});
