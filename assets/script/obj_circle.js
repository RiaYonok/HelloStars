
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    start () {
        this.isMoveStart  = false;
        let body = this.node.getComponent(cc.RigidBody);
        if(body == null){
            body = this.node.addComponent(cc.RigidBody);
        }
        body.type = cc.RigidBodyType.Static;    
        body.gravityScale = 3;   
    },

    update (dt) {
        
        let c = cc.find("Canvas");
        if(c.getComponent("home").isOneDrawed == true && this.isMoveStart == false){
            let body = this.node.getComponent(cc.RigidBody);
            body.type = cc.RigidBodyType.Dynamic;
            body.gravityScale = 3;
            
            let collider_circle = this.node.getComponent(cc.PhysicsCircleCollider);
            collider_circle.density = 0.001;
            collider_circle.friction = 0.001;
            collider_circle.restitution = 0.4;
            collider_circle.tag = "obj_circle";
            
            this.isMoveStart = true;
        }        
    }
        
    
});
