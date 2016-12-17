/**
 * Created by Tuaans Phamj on 12/15/2016.
 */
var Pixel = function (_layer) {

    // PlayScene:ActionLayer
    this.layer = _layer;

    this.sp_pixel = new cc.PhysicsSprite(res.Pixel);
    this.layer.addChild(this.sp_pixel);
    var winSize = cc.director.getWinSize();
    var contentSize = this.sp_pixel.getContentSize();
    // 2. init the runner physic body
    this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
    //3. set the position of the runner
    this.body.p = cc.p(winSize.width / 2, winSize.height / 2);
    //4. apply impulse to the body
    this.body.applyImpulse(cp.v(0, 0), cp.v(0, 0));//run speed
    //5. add the created body to space
    this.layer.space.addBody(this.body);
    //6. create the shape for the body
    this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
    this.shape.setElasticity(1);
    //7. add shape to space
    this.layer.space.addShape(this.shape);
    //8. set body to the physic sprite
    this.sp_pixel.setBody(this.body);

    this.update = function () {
        cc.log("update pixel!");
    };
    this.flap = function () {
        this.body.setVel(cp.v(0, 500));
        // cc.director.getScheduler().unscheduleAllForTarget(this);
        // cc.director.getScheduler().scheduleCallbackForTarget(this, this.fall, .3, 0);
    };
    this.update = function () {
        if (this.body.getVel().y >= 0) {
            this.body.setAngVel (10);
            return;
        }
        this.body.setAngVel (-10);
    }
};