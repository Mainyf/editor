import { isArray, isElement, every } from 'lodash';
import Sizzle from 'sizzle';
import { when, hasHTMLChar, convertDOM } from '../utils/utils';

export class DOMObject {

    _element: Element[] = [];

    constructor(el: string | string[] | Element | Element[]) {
        this._element = this._convertElement(el);
    }

    public append(el: string | string[] | Element | Element[]): DOMObject {
        this._element.forEach((v) => {
            let _el = this._convertElement(el);
            // @ts-ignore
            console.log();
            _el.forEach((x) => v.append(x));
        });
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
        ])
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

    public forEach(predicate: (el: Element) => void) {
        this._element.forEach(predicate);
    }
}