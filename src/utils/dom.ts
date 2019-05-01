import { isArray } from "lodash";

class DOMObject {

    _element: Element[] = [];

    constructor(el: string | Element | Element[]) {
        if(typeof el === 'string') {
            this._element = Sizzle(el as string);
        } else {
            if(isArray(el)) {
                this._element = this._element.concat(el);
            } else {
                this._element.push(el);
            }
        }
    }

    public append(el: string | string[] | Element | Element[]): DOMObject {
        
        return this;
    }
    
}