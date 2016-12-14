/**
 * Created by TuaansPhamj on 12/14/2016.
 */


var MenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var size = cc.winSize;
        var spBg = new cc.Sprite(res.MenuBackground);
        spBg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(spBg, 0);

        var titleGame = new cc.Sprite(res.Title);
        titleGame.attr({
            x: size.width / 2,
            y: size.height / 4 * 3
        });
        this.addChild(titleGame);

        //Button
        var playBtn = new cc.MenuItemImage(res.PlayBtn, res.PlayBtn, this.gotoPlayScene, this);
        // ::create("PlayBtn.png", "playBtn.png", CC_CALLBACK_0(MenuScene::gotoPlayScene, this));
        var menu = new cc.Menu(playBtn);
        menu.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(menu);
        return true;
    },
    gotoPlayScene: function () {
        cc.log("%c gotoPlayScene");
        cc.director.runScene(new PlayScene());
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});