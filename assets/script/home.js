
cc.Class({
    extends: cc.Component,

    properties: {
        level_scene_prefab : { 
            default : [],
            type : cc.Prefab
        },
        
        level_scene : cc.Node,
       
        home_bg : cc.Sprite,

        back_btn : cc.Button,
        setting_btn : cc.Button,
        shop_btn : cc.Button,
        ads_btn : cc.Button,

        title : cc.Sprite,

        //setting
        isSoundOn : true,
        sound_lb : cc.Label,
        sound_on : cc.Sprite,
        sound_lb_on : cc.Label,
        sound_off : cc.Sprite,
        sound_lb_off : cc.Label,

        isNotification : true,
        notification_lb : cc.Label,
        notification_on : cc.Sprite,
        notification_lb_on : cc.Label,
        notification_off : cc.Sprite,
        notification_lb_off : cc.Label,

        curLanguage : "English",
        language_lb : cc.Label,
        language : cc.Sprite,
        language_down : cc.Sprite,
        curlanguage_lb : cc.Label,

        facebook : cc.Sprite,
        facebook_down : cc.Sprite,
        facebook_lb : cc.Label,
        
        rate : cc.Sprite,
        rate_down : cc.Sprite,
        rate_lb : cc.Label,
        
        share : cc.Sprite,
        share_down : cc.Sprite,
        share_lb : cc.Label,
        ////////


        start_btn : cc.Button,
        place_btn : cc.Button,
        
        
        //gmenu
        gmenu_bg : cc.Sprite,
        gmenu_pause : cc.Sprite,
        gmenu_pause_down : cc.Sprite,
        gmenu_percent : cc.Sprite,
        gmenu_videoRecording : cc.Sprite,
        gmenu_videoRecording_down : cc.Sprite,
        gmenu_shop : cc.Sprite,
        gmenu_shop_down : cc.Sprite,
        gmenu_answer : cc.Sprite,
        gmenu_answer_down : cc.Sprite,
        gmenu_restart : cc.Sprite,
        gmenu_restart_down : cc.Sprite,
        gmenu_progressbar : cc.ProgressBar,
        gmenu_progressbar_lb : cc.Label,

        money_btn : cc.Button,
        money_lb : cc.Label,

        //mask_panel_pause
        mask_panel_pause : cc.Node,
        mask_bg_pause : cc.Sprite,
        mask_close : cc.Sprite,
        mask_choiceLevel : cc.Sprite,
        mask_choiceLevel_down : cc.Sprite,
        mask_replay : cc.Sprite,
        mask_replay_down : cc.Sprite,
        mask_play : cc.Sprite,
        mask_play_down : cc.Sprite,
        mask_gohome : cc.Sprite,
        mask_gohome_down : cc.Sprite,
        mask_soundon : cc.Sprite,
        mask_soundoff : cc.Sprite,
        mask_wormhole : cc.Sprite,
        mask_maze : cc.Sprite,
        mask_gotolevel : cc.Sprite,

        //scrollview_levelgroup
        scrollview_levelgroup : cc.Node,
        levelGroupItem : {
            default : [],
            type : cc.Node
        },
        levelgroup_next : cc.Sprite,
        levelgroup_next_down : cc.Sprite,
        levelgroup_curview_no : 0,

        //scrollview_allgroup
        scrollview_allgroup : cc.Node,
        allGroupItem : {
            default : [],
            type : cc.Node
        },

        //end scene
        gameEndScene : cc.Node,
        particle_chukpo1 : cc.ParticleSystem,
        particle_chukpo2 : cc.ParticleSystem,
        particle_chukpo3 : cc.ParticleSystem,
        
        isLevelStart : false,
        sceneState : "", //GAME_PAUSE,LEVELGROUP_VIEW,ALLGROUP_VIEW,SETTING,HOME,GAME_PLAY,GAME_END,
        levelMax : 50,
        curLevelNo : 1,        
        winWidth : 0,
        winHeight : 0,
        // userLevelInfos : {
        //     default : [],
        //     type : [userLevelInfo]
        // },
        levelGroupGoal : {
            default : [],
            type : cc.Integer
        },
        isLevelSuccess : false,
        levelStarCount : 0,
        
        
        prevPoint : cc.v2(-10000, -10000),
        draw_points : {
            default : [],
            type : cc.v2
        },
        g_prefab : cc.Prefab,        
        graphics : cc.Node,
        _graphics : cc.Graphics,
        g_node_group : cc.Node,
        follower : cc.Node,
        chalkBrushPrefab : cc.Prefab,
        
        snd_btn : {
            default : null,
            type : cc.AudioClip
        },
        snd_bg : {
            default : null,
            type : cc.AudioClip
        },
        snd_star : {
            default : null,
            type : cc.AudioClip
        },
        snd_target : {
            default : null,
            type : cc.AudioClip
        },
        snd_fail : {
            default : null,
            type :cc.AudioClip
        }

        
        

    },
 
    onEnable: function () {        
        this.debugDrawFlags = cc.director.getPhysicsManager().debugDrawFlags;
        cc.director.getPhysicsManager().debugDrawFlags = 
           /* cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit*/ 0
            ;
    },

    onDisable: function () {
        cc.director.getPhysicsManager().debugDrawFlags = this.debugDrawFlags;
    },

    changeNodePos(node){
        node.width = node.width * (this.winWidth / 720);
        node.height = node.height * (this.winHeight / 1280);
        node.x = node.x * (this.winWidth / 720);
        node.y = node.y * (this.winHeight / 1280);
    },

    changeControlPos(){
        this.home_bg.node.width = this.winWidth;
        this.home_bg.node.height = this.winHeight;
//return;
        this.changeNodePos(this.back_btn.node);
        this.changeNodePos(this.setting_btn.node);;
        this.changeNodePos(this.sound_lb.node);
        this.changeNodePos(this.sound_on.node);
        this.changeNodePos(this.sound_lb_on.node);
        this.changeNodePos(this.sound_off.node);
        this.changeNodePos(this.sound_lb_off.node);
        this.changeNodePos(this.start_btn.node);

        this.changeNodePos(this.gmenu_bg.node);
        this.changeNodePos(this.gmenu_pause.node);
        this.changeNodePos(this.gmenu_pause_down.node);
        this.changeNodePos(this.gmenu_restart.node);
        this.changeNodePos(this.gmenu_restart_down.node);
        this.changeNodePos(this.gmenu_progressbar.node);
        this.changeNodePos(this.gmenu_progressbar_lb.node);
        this.gmenu_progressbar.node.getComponent(cc.ProgressBar).totalLength = this.gmenu_progressbar.node.getComponent(cc.ProgressBar).totalLength * (this.winWidth / 720);

        this.mask_bg_pause.node.width = this.winWidth;
        this.mask_bg_pause.node.height = this.winHeight;
        this.changeNodePos(this.mask_close.node);
        this.changeNodePos(this.mask_choiceLevel.node);
        this.changeNodePos(this.mask_choiceLevel_down.node);
        this.changeNodePos(this.mask_replay.node);
        this.changeNodePos(this.mask_replay_down.node);
        this.changeNodePos(this.mask_play.node);
        this.changeNodePos(this.mask_play_down.node);
        this.changeNodePos(this.mask_gohome.node);
        this.changeNodePos(this.mask_gohome_down.node);
        this.changeNodePos(this.mask_soundon.node);
        this.changeNodePos(this.mask_soundoff.node);
        
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);
        // this.changeNodePos(this.start_btn.node);


    },

    init(){   
        //this.userLevelInfos = [];
        this.playground_w = 720 * (this.winWidth / 720);
        this.playground_h = 1090 * (this.winHeight / 1280);
        this.isOneDrawed = false;
        //init graphics        
        this.level_point_sum = 0;
        this.isDrawable = false;
        this.graphics_offset = 800;        
        this.graphics.x = -1 * this.winWidth / 2  - this.graphics_offset;  //offset because collider collision
        this.graphics.y = -1 * this.winHeight / 2 - this.graphics_offset;  //offset
        this._graphics = this.graphics.getComponent(cc.Graphics);        
        this._graphics.lineWidth = 7;
        this._graphics.fillColor.fromHEX('#ff0000'); 
        this.chalkPrefabCount = 0;

        
        //get last level from file.
        //userLevelInfo setting from file.
        this.loadUserLevelInfo();

        //set level no
        let ls = cc.sys.localStorage;
        let ret = ls.getItem("HS_lastLevel"); //test
        
        if(ret == null){
            this.curLevelNo = 1;
        }else{
            try{
                let obj = JSON.parse(ret);
                this.curLevelNo = obj["lastLevel"];             
                if(this.curLevelNo > this.userLevelInfos["userLevelInfos"].length)
                   this.curLevelNo = this.userLevelInfos["userLevelInfos"].length;
            } catch (e) {
                this.curLevelNo = 1;
            }
        }

        //zoomout of mask_panel_pause to 1/10 first.
        let self = this;
        let zoomOut = cc.scaleBy(0.1, 0.1, 0.1);
        self.mask_panel_pause.runAction(zoomOut);

        //particle
        this.particle_chukpo1.stopSystem();
        this.particle_chukpo2.stopSystem();
        this.particle_chukpo3.stopSystem();

    },

    loadUserLevelInfo(){

        //load from file.        
        let ls = cc.sys.localStorage;       
        let ret = ls.getItem("HS_userLevelInfos");  
        
        if(ret == null){
            this.userLevelInfos = 
            {"userLevelInfos" : [
                {"gain_star":0, "lock":0}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, 
                {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, 
                {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, 
                {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, 
                {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1} 
                ]};            
        }else{
            try {
                let obj = JSON.parse(ret);
                this.userLevelInfos = obj;
            } catch (e) {
                this.userLevelInfos = 
                {"userLevelInfos" : [
                    {"gain_star":0, "lock":0}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, 
                    {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, 
                    {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, 
                    {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, 
                    {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1}, {"gain_star":0, "lock":1} 
                    ]};            
            }
        }

        this.levelMax = this.userLevelInfos["userLevelInfos"].length;

        this.levelGroupGoal = [10, 12, 14, 16, 16];

        //level line max
        this.levelLineMax = [];
        for(let i = 0; i < this.levelMax; i++){
            this.levelLineMax[i] = 1800;
        }
        
    },

    onLoad(){
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        physicsManager.debugDrawFlags = 
            // 0;
            // cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;

        cc.audioEngine.playMusic(this.snd_bg, true);
    },

    start () {        
        
        this.winWidth = cc.winSize.width;
        this.winHeight = cc.winSize.height;
        
        this.changeControlPos();
        this.init();
        let self = this;
        
        //setting panel
        this.sound_on.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.audioEngine.play(self.snd_btn, false, 1);
            cc.audioEngine.pauseMusic();
            self.sound_on.node.active = false;
            self.sound_lb_on.node.active = false;

            self.sound_off.node.active = true;
            self.sound_lb_off.node.active = true;
            self.isSoundOn = false;
        }, this);


        this.sound_off.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.audioEngine.play(self.snd_btn, false, 1);
            cc.audioEngine.resumeMusic();
            self.sound_on.node.active = true;
            self.sound_lb_on.node.active = true;

            self.sound_off.node.active = false;
            self.sound_lb_off.node.active = false;
            self.isSoundOn = true;
        }, this);


        // this.notification_on.node.on(cc.Node.EventType.TOUCH_END, function (event) {
        //     self.notification_on.node.active = false;
        //     self.notification_lb_on.node.active = false;

        //     self.notification_off.node.active = true;
        //     self.notification_lb_off.node.active = true;
        //     self.isNotification = false;
        // }, this);


        // this.notification_off.node.on(cc.Node.EventType.TOUCH_END, function (event) {
        //     self.notification_on.node.active = true;
        //     self.notification_lb_on.node.active = true;

        //     self.notification_off.node.active = false;
        //     self.notification_lb_off.node.active = false;
        //     self.isNotification = true;
        // }, this);


        // this.language.node.on("touchstart", function(){
        //     self.language_down.node.active = true;
        // });
        // this.language.node.on("touchend", function(){
        //     self.language_down.node.active = false;
        // });
        // this.language.node.on("touchcancel", function(){
        //     self.language_down.node.active = false;
        // });


        // this.facebook.node.on("touchstart", function(){
        //     self.facebook_down.node.active = true;
        // });
        // this.facebook.node.on("touchend", function(){
        //     self.facebook_down.node.active = false;
        // });
        // this.facebook.node.on("touchcancel", function(){
        //     self.facebook_down.node.active = false;
        // });


        // this.rate.node.on("touchstart", function(){
        //     self.rate_down.node.active = true;
        // });
        // this.rate.node.on("touchend", function(){
        //     self.rate_down.node.active = false;
        // });
        // this.rate.node.on("touchcancel", function(){
        //     self.rate_down.node.active = false;
        // });


        // this.share.node.on("touchstart", function(){
        //     self.share_down.node.active = true;
        // });
        // this.share.node.on("touchend", function(){
        //     self.share_down.node.active = false;
        // });
        // this.share.node.on("touchcancel", function(){
        //     self.share_down.node.active = false;
        // });



        //game menu     

        // this.gmenu_videoRecording.node.on("touchstart", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     self.gmenu_videoRecording_down.node.active = true;            
        // });
        // this.gmenu_videoRecording.node.on("touchend", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     self.gmenu_videoRecording_down.node.active = false;            
        // });
        // this.gmenu_videoRecording.node.on("touchcancel", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     self.gmenu_videoRecording_down.node.active = false;            
        // });


        // this.gmenu_shop.node.on("touchstart", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     self.gmenu_shop_down.node.active = true;            
        // });
        // this.gmenu_shop.node.on("touchend", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     self.gmenu_shop_down.node.active = false;            
        // });
        // this.gmenu_shop.node.on("touchcancel", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     self.gmenu_shop_down.node.active = false;            
        // });


        // this.gmenu_answer.node.on("touchstart", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     self.gmenu_answer_down.node.active = true;            
        // });
        // this.gmenu_answer.node.on("touchend", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     cc.audioEngine.play(this.snd_btn, false, 1);
        //     self.gmenu_answer_down.node.active = false;            
        // });
        // this.gmenu_answer.node.on("touchcancel", function(){
        //     if(self.mask_bg_pause.node.active === true) return;
        //     self.gmenu_answer_down.node.active = false;            
        // });


        this.gmenu_restart.node.on("touchstart", function(){
            if(self.mask_bg_pause.node.active === true) return;
            self.gmenu_restart_down.node.active = true;            
        });
        this.gmenu_restart.node.on("touchend", function(){
            if(self.mask_bg_pause.node.active === true) return;
            cc.audioEngine.play(self.snd_btn, false, 1);
            self.gmenu_restart_down.node.active = false;         
//self.isLevelSuccess = true;  return;//test
            self.closeCurGame();            
            self.loadLevelScene(self.curLevelNo);            
        });
        this.gmenu_restart.node.on("touchcancel", function(){
            if(self.mask_bg_pause.node.active === true) return;
            self.gmenu_restart_down.node.active = false;            
        });


        //mask_panel_pause
        this.gmenu_pause.node.on("touchend", function(){
            if(self.mask_bg_pause.node.active === true) return;
            cc.audioEngine.play(self.snd_btn, false, 1);
            self.sceneState = "GAME_PAUSE";
            self.mask_bg_pause.node.active = true;
                        
            self.mask_close.node.active = true;
            self.mask_choiceLevel.node.active = true;
            self.mask_replay.node.active = true;
            self.mask_play.node.active = true;
            self.mask_gohome.node.active = true;
            
            if(self.isSoundOn){
                self.mask_soundon.node.active = true;            
                self.mask_soundoff.node.active = false;
            }else{
                self.mask_soundon.node.active = false;
                self.mask_soundoff.node.active = true;
            }

            //self.mask_wormhole.node.active = true;
            //self.mask_maze.node.active = false;
            //self.mask_gotolevel.node.active = false;

            //pause all action of current scene.

            let zoomIn = cc.scaleBy(0.2, 11, 11);
            let zoomOut = cc.scaleBy(0.2, 10/11, 10/11);
            let seq = cc.sequence(zoomIn, zoomOut, cc.callFunc(function () {                
            }));
            self.mask_panel_pause.runAction(seq);
            
        });
        this.gmenu_pause.node.on("touchstart", function(){            
            self.gmenu_pause_down.node.active = true;            
        });       
        this.gmenu_pause.node.on("touchcancel", function(){
            self.gmenu_pause_down.node.active = false;            
        });



        this.mask_choiceLevel.node.on("touchstart", function(){
            self.mask_choiceLevel_down.node.active = true;            
        });
        this.mask_choiceLevel.node.on("touchend", function(){
            cc.audioEngine.play(self.snd_btn, false, 1);
            self.mask_choiceLevel_down.node.active = false;
            //appear levelgroup scrollview
            let no = Math.floor((self.curLevelNo - 1) / 10);
            // self.node.runAction(cc.sequence(
            //     cc.fadeOut(0.5),
            //     cc.delayTime(0.2),
                //cc.fadeIn(0.5),
                // cc.callFunc(function () {                                   
                    self.closeGamePauseMask(),
                    self.closeCurGame();            
                    self.loadLevelGroupInScrollView(no);
                    self.scrollview_levelgroup.active = true;
                    self.back_btn.node.active = true;
                    self.sceneState = "LEVELGROUP_VIEW";        
                // })
            // ));
            // self.node.runAction(cc.sequence(
            //     cc.fadeIn(0.5),
            //     cc.delayTime(0.1)
            // ));
        });
        this.mask_choiceLevel.node.on("touchcancel", function(){
            self.mask_choiceLevel_down.node.active = false;
        });


        this.mask_replay.node.on("touchstart", function(){
            self.mask_replay_down.node.active = true;
        });
        this.mask_replay.node.on("touchend", function(){
            cc.audioEngine.play(self.snd_btn, false, 1);
            self.mask_replay_down.node.active = false;
            self.closeGamePauseMask();
            self.closeCurGame();
            self.loadLevelScene(self.curLevelNo);            
        });
        this.mask_replay.node.on("touchcancel", function(){
            self.mask_replay_down.node.active = false;
        });


        this.mask_play.node.on("touchstart", function(){
            self.mask_play_down.node.active = true;
        });
        this.mask_play.node.on("touchend", function(){   
            cc.audioEngine.play(self.snd_btn, false, 1);         
            self.mask_play_down.node.active = false;
            self.closeGamePauseMask();            
            self.sceneState = "GAME_PLAY";
        });
        this.mask_play.node.on("touchcancel", function(){
            self.mask_play_down.node.active = false;
        });


        this.mask_gohome.node.on("touchstart", function(){
            self.mask_gohome_down.node.active = true;
        });
        this.mask_gohome.node.on("touchend", function(){
            cc.audioEngine.play(self.snd_btn, false, 1);
            self.mask_gohome_down.node.active = false;
            self.closeGamePauseMask();
            self.closeCurGame();                        

            self.back_btn.node.active = false;
            self.setting_btn.node.active = true;        
            //self.shop_btn.node.active = true;        
            //self.ads_btn.node.active = true;
            self.title.node.active = true;
            self.start_btn.node.active = true;
            //self.place_btn.node.active = true;
            self.sceneState = "HOME";
        });
        this.mask_gohome.node.on("touchcancel", function(){
            self.mask_gohome_down.node.active = false;
        });


        this.mask_soundon.node.on("touchend", function(){
            cc.audioEngine.play(self.snd_btn, false, 1);
            cc.audioEngine.pauseMusic();
            self.mask_soundoff.node.active = true;
            self.isSoundOn = false;
            self.mask_soundon.node.active = false;
        });
        this.mask_soundoff.node.on("touchend", function(){
            cc.audioEngine.play(self.snd_btn, false, 1);
            cc.audioEngine.resumeMusic();
            self.mask_soundon.node.active = true;
            self.isSoundOn = true;
            self.mask_soundoff.node.active = false;
        });


        this.mask_close.node.on("touchend", function(){
            cc.audioEngine.play(self.snd_btn, false, 1);
            self.closeGamePauseMask();            
        });

        //levelgroup scrollview
        this.levelgroup_next.node.on("touchstart", function(){
            self.levelgroup_next_down.node.active = true;
        });
        this.levelgroup_next.node.on("touchend", function(){
            cc.audioEngine.play(self.snd_btn, false, 1);
            self.levelgroup_next_down.node.active = false;                        
            self.loadLevelGroupInScrollView(self.levelgroup_curview_no + 1);
        });
        this.levelgroup_next.node.on("touchcancel", function(){
            self.levelgroup_next_down.node.active = false;
        });

        //gameend 
       

        //draw      
        this.node.on("touchstart", function(event){ 
            if(self.sceneState != "GAME_PLAY") return;
            let pos =  cc.v2(event.touch.getLocationX(), event.touch.getLocationY());
            if(pos.y >= self.playground_h || pos.x < 10 || pos.x > self.winWidth - 10 || pos.y < 10 ) return;            

            self.follower.active = true;
            self.follower.x = pos.x - (self.winWidth / 2);
            self.follower.y = pos.y - (self.winHeight / 2);
                        
            if(self.follower.getComponent("follower").isCollided == true){                                
                return;
            }            
            
            self.prevPoint = pos;  
            self.isDrawable = true;            
            self.draw_points = [];                              
            self.draw_points.push(pos); 
            
        });
        
        this.node.on("touchmove", function(event){   
            if(self.sceneState != "GAME_PLAY") return;
            if(self.isDrawable == false) return;

            // let delta = event.touch.getDelta();
            // this.x += delta.x;
            // this.y += delta.y;

            //check prefab count
            if(self.chalkPrefabCount > 16000){
                self.closeCurGame();            
                self.loadLevelScene(this.curLevelNo);  
                return;
            }
            
            let pos = cc.v2(event.touch.getLocationX(), event.touch.getLocationY());       
            //collider move and check        
            self.follower.x = pos.x - (self.winWidth / 2);
            self.follower.y = pos.y - (self.winHeight / 2);            
            if(self.follower.getComponent("follower").isCollided == true){                
                self.completeDrawing();
                return;
            }

            if(pos.x < 10 || pos.x > self.winWidth - 10){                  
                self.completeDrawing();//console.log('1');
                return;
            }
            
            if(pos.y < 10 || pos.y > self.playground_h){                          
                self.completeDrawing();//console.log('2');
                return;
            }                
                        
            if(self.prevPoint === cc.v2(-10000, -10000)) {
                self.prevPoint = pos;
                return;
            }            
            
            let dist = Math.round(pos.sub(self.prevPoint).mag());
            for(let i = 0; i < dist; i += 1) {
                let cPos = self.prevPoint.lerp(pos, i/dist);         
                try {
                    // self._graphics.moveTo(self.offsetPos(self.prevPoint));
                    // self._graphics.lineTo(self.offsetPos(cPos)); 
                    self.drawBrushAtPoint(cPos);
                } catch (error) {
                    return;
                }                       
                
                if(self.prevPoint.x != cPos.x || self.prevPoint.y != cPos.y)
                    self.draw_points.push(cPos);            

                self.prevPoint = cPos;    
            }            
           
            //self._graphics.stroke();
            //self._graphics.fill();                  
                         
        });
        
        this.node.on("touchend", function(event){
            if(self.sceneState != "GAME_PLAY") return;            
            if(self.isDrawable == false) return;
            self.follower.active = false;            
            
            let pos =  cc.v2(event.touch.getLocationX(), event.touch.getLocationY());   
            if(self.prevPoint.x != pos.x || self.prevPoint.y != pos.y)
                self.draw_points.push(pos);
            
            self.completeDrawing();  //console.log('3');                     
        });

        this.node.on("touchcancel", function(){
            if(self.sceneState != "GAME_PLAY") return; 
            if(self.isDrawable == false) return; 
            self.completeDrawing();  //console.log('4');
        });

    },

    drawBrushAtPoint(pos){
        let cbrush = cc.instantiate(this.chalkBrushPrefab);        
        let position = this.offsetPos(pos);
        cbrush.setPosition(position.x, position.y);                
        cbrush.parent = this.graphics;
        this.chalkPrefabCount++;
        
    },

    eraseGraphics(){
        // try{
        //      this._graphics.fillColor.fromHEX('#fcfcec'); 
        //      this._graphics.fillRect(this.graphics_offset,this.graphics_offset, this.winWidth, this.winHeight);            
        // }catch(error){
        // }

        this.graphics.removeAllChildren();
        this.graphics.destroyAllChildren();
        this.chalkPrefabCount = 0;
    },

    completeDrawing(){                   
        if(this.isDrawable == false) return;//console.log('5');         
        this.eraseGraphics();
        
        //set gap by points count.
        let col_circle_gap = 20; //test
        if(this.draw_points.length < col_circle_gap)
            return;

        if(this.isOneDrawed == false)
            this.isOneDrawed = true;

        // level star count setting by line's length, progress bar setting       
        let levelLineMax = this.levelLineMax[this.curLevelNo - 1];
        this.level_point_sum += this.draw_points.length;//console.log(this.draw_points.length, this.level_point_sum);
        if(this.level_point_sum > levelLineMax){ //point count limit per level
            this.gmenu_progressbar.progress = 1 - this.level_point_sum / levelLineMax;
            this.gmenu_progressbar_lb.node.getComponent(cc.Label).string = Math.floor(this.gmenu_progressbar.progress * 100) + "%";  
            this.closeCurGame();            
            this.loadLevelScene(this.curLevelNo);  
            return;
        }
        this.gmenu_progressbar.progress = 1 - this.level_point_sum / levelLineMax;
        this.gmenu_progressbar_lb.node.getComponent(cc.Label).string = Math.floor(this.gmenu_progressbar.progress * 100) + "%";            
        this.levelStarCount = 3 - Math.floor(this.level_point_sum / (levelLineMax / 3)); 
        
        let node = cc.instantiate(this.g_prefab);
        node.name = "g_node";                
        node.x = -1 * this.winWidth / 2  - this.graphics_offset;  //offset because collider collision
        node.y = -1 * this.winHeight / 2 - this.graphics_offset;  //offset
        let g = node.getComponent(cc.Graphics);
        g.lineWidth = 7;// error by 1
        g.fillColor.fromHEX('#ff0000');   
        
        
        //find center point of graphic.       
        let ptCount = this.draw_points.length;
                
        for(let i = 0; i < ptCount; i++){
            let p = this.draw_points[i];
            let p_ex = this.offsetPos(p);

            //draw            
            if((i != 0) && (i < ptCount - 1)){
                try {
                    //g.moveTo(this.offsetPos(prev));                
                    //g.lineTo(this.offsetPos(this.draw_points[i]));                               
                    g.circle(p_ex.x, p_ex.y, 1);
                    g.stroke();
                    g.fill();                                      
                } catch (error) {
                    return;
                }                                
            }                              
            
            //make collider
            if( (i % col_circle_gap == 0 && 2 < (ptCount - i)) || (i == ptCount - 1) ) {                
                //test
                // let newp = this.offsetPos(p);
                // g.circle(newp.x, newp.y, 1);            
                // g.strokeColor.fromHEX('#ff0000'); 
                // g.stroke();

                //collider create                
                let collider = node.addComponent(cc.PhysicsCircleCollider);
                collider.density = 1;
                collider.friction = 0.2;
                collider.restitution = 0.2;  
                collider.radius = 1;
                collider.offset.x = p.x + this.graphics_offset;
                collider.offset.y = p.y + this.graphics_offset;   
            }  
                        
           
        }
        
        node.parent = this.g_node_group;
        this.isDrawable = false;
        
         
    //console.log(this.g_node_group.children);
        return;
        
    },

    offsetPos(pos){
        let res = cc.v2(pos.x + this.graphics_offset, pos.y + this.graphics_offset);
        return res; 
    },
    
    brightenGradually(){   
        let canvas = cc.find('Canvas'); 
        canvas.runAction(cc.sequence( 
            cc.fadeIn(0.4),
            cc.delayTime(0.1)            
        ));
    },
 
    darkenGradually(){        
        let canvas = cc.find('Canvas'); 
        canvas.runAction(cc.sequence( 
            cc.fadeOut(0.4), 
            cc.delayTime(0.1)
        ));

    },

    loadLevelGroupInScrollView(levelGroupNo){
        if(Math.ceil(this.levelMax / 10) - 1 < levelGroupNo){ 
            return;
        }            
        
        for(let i = 0; i < 10; i++){
            let levelNo = 10 * levelGroupNo + i + 1;//1,2,....            
            let item = this.levelGroupItem[i];        
            item.active = true;        
            if(levelNo > this.levelMax) {
                item.active = false;
                continue;
            }        
            let sprite_node = item.getChildByName("New Sprite"); 
            if(sprite_node.getComponent("levelGroupItem") == null){
                let itemComponent = sprite_node.addComponent("levelGroupItem");                 
                itemComponent.levelNo = levelNo;
            }else{
                sprite_node.getComponent("levelGroupItem").levelNo = levelNo;
            }
                        
            let sprite = sprite_node.getComponent(cc.Sprite);            
            let spriteurl = "texture/sg" /*+ (levelNo)*/;
            
            let res = cc.loader.loadRes(spriteurl, function(err, data) {
                if (err) {
                    //cc.error(err.message || err);                    
                    return;
                }
                this.spriteFrame = new cc.SpriteFrame(data);
                               
            }.bind(sprite));

            //level no setting
            item.getChildByName("New Label").getComponent(cc.Label).string = levelNo;
            //3 star setting          
            item.getChildByName("levelgroupitem_star1").active = false;
            item.getChildByName("levelgroupitem_star2").active = false;
            item.getChildByName("levelgroupitem_star3").active = false;
            if(this.userLevelInfos["userLevelInfos"][levelNo - 1]["gain_star"] > 0){
                item.getChildByName("levelgroupitem_star1").active = true;
            }
            if(this.userLevelInfos["userLevelInfos"][levelNo - 1]["gain_star"] > 1){
                item.getChildByName("levelgroupitem_star2").active = true;
            }
            if(this.userLevelInfos["userLevelInfos"][levelNo - 1]["gain_star"] > 2){
                item.getChildByName("levelgroupitem_star3").active = true;
            }


            //check lock
            item.getChildByName("mask").active = true;
            item.getChildByName("key").active = true;
            if(this.userLevelInfos["userLevelInfos"][levelNo - 1]["lock"] == 0){
                item.getChildByName("mask").active = false;
                item.getChildByName("key").active = false;
            }

        }
                
        this.levelgroup_curview_no = levelGroupNo;
        let scrollview = this.scrollview_levelgroup.getComponent(cc.ScrollView);
        scrollview.scrollToTop(0.1);        
       
    },

    closeCurGame(){
        this.level_scene.destroyAllChildren();      
        this.level_scene.removeAllChildren();
        this.g_node_group.destroyAllChildren();      
        this.g_node_group.removeAllChildren();
        this.eraseGraphics();
        this.gmenu_bg.node.active = false;
        this.gmenu_pause.node.active = false;        
        //this.gmenu_percent.node.active = false;
        this.gmenu_progressbar.node.active = false;
        this.gmenu_progressbar_lb.node.active = false;
        this.gmenu_videoRecording.node.active = false;
        this.gmenu_shop.node.active = false;
        this.gmenu_answer.node.active = false;
        this.gmenu_restart.node.active = false;    
    },

    closeGamePauseMask(){        
        let self = this;
        self.mask_bg_pause.node.active = false;
        self.mask_close.node.active = false;
        self.mask_choiceLevel.node.active = false;
        self.mask_replay.node.active = false;
        self.mask_play.node.active = false;
        self.mask_gohome.node.active = false;
        self.mask_soundon.node.active = false;

        self.mask_wormhole.node.active = false;

        let zoomOut = cc.scaleBy(0.1, 0.1, 0.1);
        self.mask_panel_pause.runAction(zoomOut);
    },

    onClickSetting(){
        cc.audioEngine.play(this.snd_btn, false, 1);

        this.back_btn.node.active = true;        
        this.setting_btn.node.active = false;        
        this.shop_btn.node.active = false;        
        this.ads_btn.node.active = false;
        
        this.start_btn.node.active = false;
        this.place_btn.node.active = false;

        //sound
        this.sound_lb.node.active = true;
        if(this.isSoundOn === true){
            this.sound_on.node.active = true;
            this.sound_lb_on.node.active = true;
            this.sound_off.node.active = false;
            this.sound_lb_off.node.active = false;
        }else{
            this.sound_on.node.active = false;
            this.sound_lb_on.node.active = false;
            this.sound_off.node.active = true;
            this.sound_lb_off.node.active = true;
        }
        //notification
  /*      this.notification_lb.node.active = true;
        if(this.isNotification === true){
            this.notification_on.node.active = true;
            this.notification_lb_on.node.active = true;
            this.notification_off.node.active = false;
            this.notification_lb_off.node.active = false;
        }else{
            this.notification_on.node.active = false;
            this.notification_lb_on.node.active = false;
            this.notification_off.node.active = true;
            this.notification_lb_off.node.active = true;
        }
       //language
        this.language_lb.node.active = true;
        this.language.node.active = true;
        this.curlanguage_lb.node.active = true;
        this.curlanguage_lb.node.getComponent(cc.Label).string = this.curLanguage;
         //facebook,rate,share
        this.facebook.node.active = true;
        this.facebook_lb.node.active = true;
        this.rate.node.active = true;
        this.rate_lb.node.active = true;
        this.share.node.active = true;
        this.share_lb.node.active = true;
*/
        this.sceneState = "SETTING";
    },

    getGainStarSum(group_no){//0, 1, ...
        let gainStarSum = 0;
        for(let i = 0; i < 10; i++){
            if(this.levelMax < group_no * 10 + i + 1) break;
            gainStarSum += this.userLevelInfos["userLevelInfos"][group_no * 10 + i]["gain_star"];
        }
        return gainStarSum;        
    },

    onClickBack(){
        cc.audioEngine.play(this.snd_btn, false, 1);

        if(this.sceneState == "LEVELGROUP_VIEW"){
            this.scrollview_levelgroup.active = false;
            this.scrollview_allgroup.active = true;
            //item's star label setting
            for(let i = 0; i < this.levelGroupGoal.length; i++){
                let item = this.allGroupItem[i];
                let sprite_node = item.getChildByName("New Sprite");
                if(sprite_node.getComponent("allGroupItem") == null){
                    let allGroupCom = sprite_node.addComponent("allGroupItem");
                    allGroupCom.group_no = i;
                }
                //group no setting
                //item.getChildByName("New Label").getComponent(cc.Label).string = "Group" + (i + 1);
                item.getChildByName("New Label").getComponent(cc.Label).string = (i * 10 + 1).toString() + "-" + ((i + 1) * 10).toString();
                //goal setting
                item.getChildByName("goal").getComponent(cc.Label).string = this.levelGroupGoal[i];
                // gain_star sum.                
                let starLabel_node = item.getChildByName("starLabel");
                starLabel_node.getComponent(cc.Label).string = this.getGainStarSum(i) + "/" + this.levelGroupGoal[i];
                //mask check
                if(this.getGainStarSum(i) > this.levelGroupGoal[i]){
                    item.getChildByName("mask").active = false;
                    item.getChildByName("ag_unlock").active = false;
                    item.getChildByName("unlock").active = false;
                    item.getChildByName("goal").active = false;
                }                
            }

            this.back_btn.node.active = true; 
            this.setting_btn.node.active = false;        
            this.shop_btn.node.active = false;        
            this.ads_btn.node.active = false;
            this.sceneState = "ALLGROUP_VIEW";
            return;
        }
        if(this.sceneState == "ALLGROUP_VIEW"){
            //to home
            this.scrollview_allgroup.active = false;
            this.back_btn.node.active = false; 
            this.setting_btn.node.active = true;        
            //this.shop_btn.node.active = true;        
            //this.ads_btn.node.active = true;
            this.title.node.active = true;
            this.start_btn.node.active = true;
            //this.place_btn.node.active = true;
            return;
        }
        if(this.sceneState == "SETTING"){
            //disapper
            this.sound_lb.node.active = false;
            this.sound_on.node.active = false;
            this.sound_lb_on.node.active = false;
            this.sound_off.node.active = false;
            this.sound_lb_off.node.active = false;

            this.notification_lb.node.active = false;
            this.notification_on.node.active = false;
            this.notification_lb_on.node.active = false;
            this.notification_off.node.active = false;
            this.notification_lb_off.node.active = false;

            this.language_lb.node.active = false;
            this.language.node.active = false;
            this.language_down.node.active = false;        
            this.curlanguage_lb.node.active = false;

            this.facebook.node.active = false;
            this.facebook_down.node.active = false;
            this.facebook_lb.node.active = false;

            this.rate.node.active = false;
            this.rate_down.node.active = false;
            this.rate_lb.node.active = false;

            this.share.node.active = false;
            this.share_down.node.active = false;
            this.share_lb.node.active = false;

            //appear
            this.back_btn.node.active = false;        
            this.setting_btn.node.active = true;        
            //this.shop_btn.node.active = true;        
            //this.ads_btn.node.active = true;


            this.start_btn.node.active = true;
            //this.place_btn.node.active = true;s
        }
        if(this.sceneState == "GAME_END"){
            this.gameEndScene.active = false;
            let g_no = Math.floor((this.curLevelNo - 1) / 10);    
            this.loadLevelGroupInScrollView(g_no);      
            this.scrollview_levelgroup.active = true;            
            this.sceneState = "LEVELGROUP_VIEW"; 
        }else{
            
        }
        
    },

    loadLevelScene(levelno){        
       
        //all graphics(garphics_node) remove        
        this.g_node_group.destroyAllChildren();      
        this.g_node_group.removeAllChildren();
        this.eraseGraphics();

        this.gmenu_bg.node.active = true;
        this.gmenu_pause.node.active = true;        
        //this.gmenu_percent.node.active = true;
        this.gmenu_progressbar.node.active = true;
        this.gmenu_progressbar_lb.node.active = true;
        this.gmenu_restart.node.active = true;
         //this.gmenu_videoRecording.node.active = true;
        //this.gmenu_shop.node.active = true;
        //this.gmenu_answer.node.active = true;

        let scene = cc.instantiate(this.level_scene_prefab[levelno - 1]);
        // scene.addComponent("level_script");
        scene.parent = this.level_scene;
        this.sceneState = "GAME_PLAY";
        this.isLevelSuccess = false;
        this.levelStarCount = 0;      
        this.level_point_sum = 0;
        this.gmenu_progressbar.progress = 1;
        this.gmenu_progressbar_lb.node.getComponent(cc.Label).string = "100%";
        this.isOneDrawed = false;

        //particle init
        this.gameEndScene.getChildByName("gameend_star1").active = false;
        this.gameEndScene.getChildByName("gameend_star2").active = false;
        this.gameEndScene.getChildByName("gameend_star3").active = false;
        this.particle_chukpo1.stopSystem();
        this.particle_chukpo2.stopSystem();
        this.particle_chukpo3.stopSystem();
        //console.log('levelno', this.curLevelNo, this.level_scene.childrenCount, this.level_scene.children);        
    },

    gameFailed(){
        this.closeCurGame();            
        this.loadLevelScene(this.curLevelNo);
    },

    onClickGameStart(){
        this.title.node.active = false;
        this.start_btn.node.active = false;
        this.place_btn.node.active = false;

        this.setting_btn.node.active = false;
        this.shop_btn.node.active = false;
        this.ads_btn.node.active = false;
        
        cc.audioEngine.play(this.snd_btn, false, 1);
        this.loadLevelScene(this.curLevelNo);    
       
    },

    gameEnd(){
        this.sceneState = "GAME_END";
        this.closeCurGame();
        this.gameEndScene.active = true;
        this.back_btn.node.active = true;       

        // level no setting
        this.gameEndScene.getChildByName("Level_no").getComponent(cc.Label).string = "Level " + this.curLevelNo;
        //star count setting
        
        let zoomIn = cc.scaleBy(0, 2.5, 2.5);
        let zoomOut = cc.scaleBy(0.4, 1/2.5, 1/2.5);
        let delay = cc.delayTime(0.7);
        this.gameEndScene.runAction(cc.sequence(cc.delayTime(0.2), cc.delayTime(0.2)));
        if(this.levelStarCount > 0){
            this.gameEndScene.getChildByName("gameend_star1").active = true;
            this.gameEndScene.getChildByName("well").getComponent(cc.Label).string = "Good !";
            let star1 = this.gameEndScene.getChildByName("gameend_star1");                        
            star1.runAction(cc.sequence(zoomIn, zoomOut, cc.callFunc(this.chuk1_active_emission.bind(this)) ));            
        }
        if(this.levelStarCount > 1){
            this.gameEndScene.getChildByName("gameend_star2").active = true;
            this.gameEndScene.getChildByName("well").getComponent(cc.Label).string = "Well !";
            let star2 = this.gameEndScene.getChildByName("gameend_star2");                                    
            star2.runAction(cc.sequence(cc.delayTime(0.4), zoomIn, zoomOut, cc.callFunc(this.chuk2_active_emission.bind(this)) ));            
        }
        if(this.levelStarCount > 2){
            this.gameEndScene.getChildByName("gameend_star3").active = true;
            this.gameEndScene.getChildByName("well").getComponent(cc.Label).string = "Perfect !";
            let star3 = this.gameEndScene.getChildByName("gameend_star3");                                   
            star3.runAction(cc.sequence(cc.delayTime(0.8), zoomIn, zoomOut, cc.callFunc(this.chuk3_active_emission.bind(this)) ));            
        }        
        
    },

    chuk1_active_emission(){
        cc.audioEngine.play(this.snd_star, false, 1);
        this.particle_chukpo1.node.active = true;
        this.particle_chukpo1.resetSystem();        
    },

    chuk2_active_emission(){
        cc.audioEngine.play(this.snd_star, false, 1);
        this.particle_chukpo2.node.active = true;
        this.particle_chukpo2.resetSystem();
        cc.audioEngine.play(this.snd_star, false, 1);
    },

    chuk3_active_emission(){
        cc.audioEngine.play(this.snd_star, false, 1);
        this.particle_chukpo3.node.active = true;
        this.particle_chukpo3.resetSystem();        
    },
    
    goNextLevel(){
        cc.audioEngine.play(this.snd_btn, false, 1);

        // check next level prefab
        if(this.level_scene_prefab.length < this.curLevelNo + 1) return;
        //check next level lock
        if(this.userLevelInfos["userLevelInfos"][this.curLevelNo]["lock"] == 1) return;
        
        this.gameEndScene.active = false;        

        this.back_btn.node.active = false;
       
        this.curLevelNo++;
        this.loadLevelScene(this.curLevelNo);
    },

    onClickGameEnd_Replay(){
        this.gameEndScene.active = false;
        this.back_btn.node.active = false;
        
        cc.audioEngine.play(this.snd_btn, false, 1);
        this.loadLevelScene(this.curLevelNo);        
    },

    // update (dt) {

    // },
});
