
cc.Class({
    extends: cc.Component,

    properties: {
        size: cc.size(0, 0),
        //mouseJoint: true
    },

    // use this for initialization
    onLoad: function () {
        let width   = this.size.width || this.node.width;
        let height  = this.size.height || this.node.height;

        let node = new cc.Node();
        node.name = "physicsbound";
        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        // if (this.mouseJoint) {
        //     // add mouse joint
        //     let joint = node.addComponent(cc.MouseJoint);
        //     joint.mouseRegion = this.node;    
        // }
        
        //this._addBound(node, 0, height/2, width, 2); //top
        this._addBound(node, 0, -height/2, width, 20); //bottom
        this._addBound(node, -width/2 - 10, 0, 2, height); //left
        this._addBound(node, width/2 + 10, 0, 2, height); //right

        node.parent = this.node;
    },

    _addBound (node, x, y, width, height) {
        let collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
    }
});
