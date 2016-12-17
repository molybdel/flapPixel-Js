/**
 * Created by TuaansPhamj on 12/14/2016.
 */


var BgLayerPlayScene = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        var size = cc.winSize;
        var spBg = new cc.Sprite(res.PlayBackground);
        spBg.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.addChild(spBg);

        return true;
    }
});

var ActionLayer = cc.Layer.extend({
    m_pixelObj :null,
    space:null,
    ctor: function (space) {
        this._super();
        this.space = space;
        this.init();
    },
    init: function () {
        this._super();
        this.m_pixelObj = new Pixel(this);
    }
});

var OverLayer = cc.Layer.extend({
    scoreLabel: null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite(res.Gameover);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.addChild(bg, 0);

        this.scoreLabel = new cc.LabelTTF("0", "Minecrafter", 120);
        this.scoreLabel.attr({
            x: size.width / 2,
            y: bg.y
        });
        this.addChild(this.scoreLabel, 10);

        var menuBtn = new cc.MenuItemImage(res.MenuBtn, res.MenuBtn_Selected, this.gotoMenuScene, this);
        var replayBtn = new cc.MenuItemImage(res.ReplayBtn, res.ReplayBtn_Selected, this.replay, this);

        var menu = new cc.Menu(menuBtn, replayBtn);
        // xep nang cach nhau 50
        menu.alignItemsHorizontallyWithPadding(50);

        menu.attr({
            x: size.width / 2,
            y: bg.y - 100
        });

        this.addChild(menu);
    },

    gotoMenuScene: function () {
        cc.log("gotoMenuScene");
        cc.director.runScene(new MenuScene());
    },
    replay: function () {
        cc.log("replay");
        cc.director.runScene(new PlayScene());
    }
});
var PlayScene = cc.Scene.extend({
    space: null,
    m_bgLayerPlayScene: null,
    m_overLayerPlayScene: null,
    m_ActionLayerPlayScene: null,

    onEnter: function () {
        this._super();
        this.initPhysics();

        this.m_bgLayerPlayScene = new BgLayerPlayScene();
        this.addChild(this.m_bgLayerPlayScene);

        this.m_ActionLayerPlayScene = new ActionLayer(this.space);

        this.addChild(this.m_ActionLayerPlayScene);
        // this.scheduleOnce(this.addOverLayer, 2.0, "addOverLayer");

        // schedule update
        this.scheduleUpdate();
        this.registerTouchListener();

    },

    registerTouchListener : function () {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: this.onTouchesEnded
        }, this);
    },

    onTouchesEnded:function () {
        this._node.m_ActionLayerPlayScene.m_pixelObj.flap();
    },
    update: function (dt) {
        // chipmunk step
        this.space.step(dt);
        this.m_ActionLayerPlayScene.m_pixelObj.update();
    },

    addOverLayer: function () {
        this.m_overLayerPlayScene = new OverLayer();
        this.addChild(this.m_overLayerPlayScene, 10);
    },

    initPhysics: function () {
        //1. new space object
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(0, -1500);

        // 3. set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundHeight),// start point
            cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
            0);// thickness of wall
        wallBottom.setElasticity(1);
        this.space.addStaticShape(wallBottom);
    }
});