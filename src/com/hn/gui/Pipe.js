/**
 * Created by TuaansPhamj on 12/17/2016.
 */
var Pipe = function (_layer) {
    this.layer = _layer;

    var winSize = cc.director.getWinSize();

    this.spBottomPipe = new cc.PhysicsSprite(res.Pipe);
    // this.spBottomPipe =  new cc.Sprite(res.Pipe);
    this.layer.addChild(this.spBottomPipe);

    var bottomSize = this.spBottomPipe.getContentSize();
    this.bottomBody = new cp.Body(Infinity, Infinity);
    this.bottomBody.applyImpulse(cp.v(s_VX_Pipe, 0), cp.v(0, 0));//run speed
    this.bottomBody.p = cc.p(winSize.width / 2, -bottomSize.height / 3);
    // this.bottomBody.applyForce(cp.v(0, -s_gravity), cp.v(0, 0));
    // this.layer.space.addBody(this.bottomBody);
    this.bottomShape = new cp.BoxShape(this.bottomBody, bottomSize.width - 14, bottomSize.height);
    // this.bottomshape.setElasticity(1);
    // this.bottomShape.setFriction(1);
    this.layer.space.addShape(this.bottomShape);
    this.spBottomPipe.setBody(this.bottomBody);

    this.moveFinish = function () {
        this.removeChild(this.spBottomPipe);
    }
};