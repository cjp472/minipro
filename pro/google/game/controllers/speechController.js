function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SpeechController = void 0;

var e = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var i = e[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, o, i) {
        return o && t(e.prototype, o), i && t(e, i), e;
    };
}(), o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/soundFXController.js")), i = require("../../libs/underscore/underscore.modified");

exports.SpeechController = function() {
    function n(e) {
        var o = this;
        t(this, n), wx.createInnerAudioContext ? (this.audioCtx = wx.createInnerAudioContext(), 
        this.audioCtx.autoplay = !1, this.audioCtx.loop = !1, this.audioCtx.src = e, this.setUrlTimeStamp = Date.now(), 
        this.audioCtx.onError(function(t) {
            o.speakErr(t);
        }), this.audioCtx.onEnded(function(t) {
            o.speakFinished();
        }), this.audioCtx.onCanplay(function(t) {
            o.onCanplay();
        }), this.audioCtx.onPlay(function(t) {
            o.onPlay = !0;
        })) : this.audioCtx = null;
    }
    return e(n, [ {
        key: "speakErr",
        value: function(t) {
            console.log(t), this.audioCtx.destroy(), this._callback && this._callback();
        }
    }, {
        key: "onCanplay",
        value: function() {
            if (this.audioCtx) {
                var t = Date.now() - this.setUrlTimeStamp;
                console.log("onCanplay ## Loading latency:" + t + " url: " + this.audioCtx.src), 
                this.requestPlay && !this.onPlay && this.audioCtx.play();
            }
        }
    }, {
        key: "stop",
        value: function() {
            this.audioCtx && this.audioCtx.stop();
        }
    }, {
        key: "speakFinished",
        value: function() {
            this.audioCtx && this.audioCtx.destroy(), this._callback && this._callback();
        }
    }, {
        key: "speak",
        value: function(t) {
            var e = this;
            this._callback = i.once(function() {
                t && t();
            }), this.audioCtx && !o.default.getMute() ? (this.audioCtx.play(), this.requestPlay = !0) : setTimeout(function() {
                e.speakFinished();
            }, 1e3);
        }
    }, {
        key: "destroy",
        value: function() {
            this.audioCtx && this.audioCtx.destroy();
        }
    } ]), n;
}();