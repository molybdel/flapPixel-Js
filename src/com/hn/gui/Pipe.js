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
    var randomY = getRandomInt(-Math.floor(bottomSize.height / 4), Math.floor(bottomSize.height / 3));
    cc.log("randomY = " + randomY);
    this.bottomBody.p = cc.p(winSize.width, randomY);
    // this.bottomBody.applyForce(cp.v(0, -s_gravity), cp.v(0, 0));
    // this.layer.space.addBody(this.bottomBody);
    this.bottomShape = new cp.BoxShape(this.bottomBody, bottomSize.width - 14, bottomSize.height);
    // this.bottomshape.setElasticity(1);
    // this.bottomShape.setFriction(1);
    this.layer.space.addShape(this.bottomShape);
    this.spBottomPipe.setBody(this.bottomBody);
    this.bottomBody.setVel(cp.v(100, 0));


    this.spTopPipe = new cc.PhysicsSprite(res.Pipe);
    this.layer.addChild(this.spTopPipe);

    var topSize = this.spTopPipe.getContentSize();
    this.topBody = new cp.Body(Infinity, Infinity);
    this.topBody.applyImpulse(cp.v(s_VX_Pipe, 0), cp.v(0, 0));//run speed
    this.topBody.p = cc.p(this.bottomBody.p.x, this.bottomBody.p.y + bottomSize.height / 2 + topSize.height / 2 + 220);

    this.topShape = new cp.BoxShape(this.topBody, topSize.width - 14, topSize.height);
    this.layer.space.addShape(this.topShape);
    this.spTopPipe.setBody(this.topBody);

    this.moveFinish = function () {
        this.removeFromParent();
    };
    this.removeFromParent = function () {
        this.layer.space.removeShape(this.topShape);
        this.topShape = null;
        this.layer.space.removeShape(this.bottomShape);
        this.bottomShape = null;
        this.spTopPipe.removeFromParent();
        this.spBottomPipe.removeFromParent();
        this.layer.removePipe(this);
    };
    this.update = function () {
        if (this.bottomBody.getPos().x > -this.spBottomPipe.getContentSize().width / 2 + 10) {
            this.bottomBody.getPos().x += s_VX_Pipe / 60;
            this.topBody.getPos().x = this.bottomBody.getPos().x;
            return;
        }
        this.moveFinish();
    }
};