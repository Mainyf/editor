import { isArray, isElement, every } from 'lodash';
import Sizzle from 'sizzle';
import { when, hasHTMLChar, convertDOM } from '../utils/utils';
import { EventEmitter } from '@src/utils/eventEmitter';

export class DOMObject {

    private _element: Element[] = [];
    private eventEmitter: EventEmitter = new EventEmitter();

    constructor(el: string | string[] | Element | Element[]) {
        this._element = this._convertElement(el);

    }

    public append(el: string | string[] | Element | Element[] | DOMObject): DOMObject {
        this._element.forEach((v) => {
            if (el instanceof DOMObject) {
                for (const x of el._element) {
                    v.append(x)
                }
            } else {
                let _el = this._convertElement(el);
                // @ts-ignore
                _el.forEach((x) => v.append(x));
            }
        });
        return this;
    }

    // TODO add dom utils on method
    public on(): DOMObject {

        return this;
    }

    private _convertElement(el: string | string[] | Element | Element[]): Element[] {
        let result: Element[] = [];
        when([
                 {
                     predicate: () => this._isString(el) && this._isHTMLChar(el as any),
                     action: () => {
                         this._toArray(el as any).forEach((v) => {
                             result.push(convertDOM(v));
                         });
                     }
                 },
                 {
                     predicate: () => this._isString(el),
                     action: () => result = isArray(el) ? (<string[]>el).map((v) => Sizzle(v)).flat() : Sizzle(<string>el)
                 },
                 {
                     predicate: () => this._isElement(el),
                     action: () => result = isArray(el) ? el as Array<Element> : [el as Element]
                 }
             ]);
        return result;
    }

    private _isString(el: any | any[]): boolean {
        if (typeof el === 'string') {
            return true;
        }
        return isArray(el) && every(el, (v) => typeof v === 'string');
    }

    private _isElement(el: any | any[]): boolean {
        if (isElement(el)) {
            return true;
        }
        return isArray(el) && every(el, (v) => isElement(v));
    }

    private _isHTMLChar(el: string | string[]): boolean {
        if (typeof el === 'string' && hasHTMLChar(el)) {
            return true;
        }
        return isArray(el) && every(el, (v) => hasHTMLChar(v));
    }

    private _toArray<T>(el: T | T[]): T[] {
        return isArray(el) ? el : [el];
    }

    public forEach(predicate: (el: Element) => void): DOMObject {
        this._element.forEach(predicate);
        return this;
    }

    public isEmpty(): boolean {
        return this._element.length === 0;
    }
}

export function $(el: string | string[] | Element | Element[]): DOMObject {
    return new DOMObject(el);
}
