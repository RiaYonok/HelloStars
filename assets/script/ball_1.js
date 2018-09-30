
cc.Class({
    extends: cc.Component,

    properties: {
       startWithDrawing : false
    },

    start () {
        this.startWithDrawing = true;

        let body = this.node.getComponent(cc.RigidBody);
        if(body == null){
            body = this.node.addComponent(cc.RigidBody);
        }
        if(this.startWithDrawing){
            body.type = cc.RigidBodyType.Static;    
        }else{
            body.type = cc.RigidBodyType.Dynamic;    
        }        
        body.gravityScale = 3;    

        let collider_circle = this.node.getComponent(cc.PhysicsCircleCollider);        
        if(collider_circle == null){
            collider_circle = this.node.addComponent(cc.PhysicsCircleCollider);
        }
        collider_circle.density = 0.001;
        collider_circle.friction = 0.001;
        collider_circle.restitution = 0.4;
        collider_circle.tag = "ball_1";
    },

    update (dt) {
       if(this.startWithDrawing == true){
            let c = cc.find("Canvas");
            if(c.getComponent("home").isOneDrawed == true){
                let body = this.node.getComponent(cc.RigidBody);
                body.type = cc.RigidBodyType.Dynamic;                
            }
       }
    },
});
