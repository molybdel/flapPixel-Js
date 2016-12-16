/**
 * Created by Tuaans Phamj on 12/15/2016.
 */
var Pixel = cc.PhysicsSprite.extend({
    ctor:function () {
            this._super();
            this.init();
        },
        init:function () {
            var contentSize = this.sprite.getContentSize();
            this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
            //3. set the position of the runner
            this.body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);
            //4. apply impulse to the body
            this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
            //5. add the created body to space
            this.space.addBody(this.body);
            //6. create the shape for the body
            this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
            //7. add shape to space
            this.space.addShape(this.shape);
            //8. set body to the physic sprite
            this.sprite.setBody(this.body);
        }
});