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

        this.scoreLabel = new cc.LabelTTF("0", res.Font_Minecrafter, 120);
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

    m_bgLayerPlayScene: null,
    m_overLayerPlayScene: null,
    onEnter: function () {
        this._super();
        this.m_bgLayerPlayScene = new BgLayerPlayScene();
        this.addChild(this.m_bgLayerPlayScene);
        this.scheduleOnce(this.addOverLayer, 2.0, "addOverLayer");
    },

    addOverLayer: function () {
        this.m_overLayerPlayScene = new OverLayer();
        this.addChild(this.m_overLayerPlayScene, 10);
    }
});