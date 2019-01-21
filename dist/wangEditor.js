(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.wangEditor = factory());
}(this, function () { 'use strict';

    var Editor = /** @class */ (function () {
        function Editor() {
            this._defaultOptions = {
                debug: false
            };
            this._defaultEntrySelector = 'editor';
            this._classes = {
                frame: 'editor-frame',
                top: 'editor-top',
                textarea: 'editor-textarea',
                textareaContent: 'editor-textarea__content'
            };
            this._frame = undefined;
            this._frameTop = undefined;
            this._frameTextarea = undefined;
        }
        Editor.prototype.init = function (entry) {
            if (!entry) {
                var defaultEntry = document.getElementById(this._defaultEntrySelector);
                if (!defaultEntry) {
                    throw new Error("not find defaultEntry");
                }
                entry = defaultEntry;
            }
            this._frame = this._appendFrame(entry);
            this._frameTop = this._appendFrameTop(this._frame);
            this._frameTextarea = this._appendFrameTextrea(this._frame);
        };
        Editor.prototype._appendFrame = function (el) {
            var frame = document.createElement('div');
            frame.classList.add(this._classes.frame);
            el.appendChild(frame);
            return frame;
        };
        Editor.prototype._appendFrameTop = function (el) {
            var frameTop = document.createElement('div');
            frameTop.classList.add(this._classes.top);
            el.appendChild(frameTop);
            return frameTop;
        };
        Editor.prototype._appendFrameTextrea = function (el) {
            var textarea = document.createElement('div');
            textarea.classList.add(this._classes.textarea);
            var content = document.createElement('div');
            content.classList.add(this._classes.textareaContent);
            textarea.appendChild(content);
            el.appendChild(textarea);
            return textarea;
        };
        return Editor;
    }());

    if(typeof Object.assign !== 'function') {
        Object.assign = function (target, ...args) {
            if(!target) {
                throw new TypeError('Cannot convert undefined or null to object')
            }
            let result = Object(target);
            for(let i = 0; i < args.length;i++) {
                let item = args[i];
                if(item) {
                    for(let key in item) {
                        if(Object.prototype.hasOwnProperty.call(item, key)) {
                            result[key] = item[key];
                        }
                    }
                }
            }
            return result;
        };
    }

    // IE 中兼容 Element.prototype.matches
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // @ts-ignore
    var index = (window.wangEditor || new Editor());

    return index;

}));
