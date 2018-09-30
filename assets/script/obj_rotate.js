
cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 0,
        rotationSpeed: 30,
        clockwise : false
    },
  
    start () {
        this.moveSpeed = 0;
        this.rotationSpeed = 50;
    },

    update (dt) {
        this.node.x += dt * this.moveSpeed;
        if(this.clockwise == true){
            this.node.rotation += dt * this.rotationSpeed;    
        }else{
            this.node.rotation -= dt * this.rotationSpeed;
        }
    },
});
