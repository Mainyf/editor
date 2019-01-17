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
    }
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
