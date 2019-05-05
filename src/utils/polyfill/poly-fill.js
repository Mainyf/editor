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
