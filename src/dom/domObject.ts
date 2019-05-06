import { isArray, isElement, every, isString, isFunction } from "lodash";
import Sizzle from "sizzle";
import { when, hasHTMLChar, convertDOM, makeMap } from "../utils/utils";

export class DOMObject {
    private readonly _element: Element[] = [];

    constructor(el: string | string[] | Element | Element[]) {
        this._element = this._convertElement(el);
    }

    public append(
        el: string | string[] | Element | Element[] | DOMObject
    ): DOMObject {
        this._element.forEach(v => {
            if (el instanceof DOMObject) {
                el._element.forEach(x => v.append(x));
            } else {
                let _el = this._convertElement(el);
                _el.forEach(x => v.append(x));
            }
        });
        return this;
    }

    public on(
        eventName: string,
        selector: string | Function,
        handle?: Function
    ): DOMObject {
        this._element.forEach(v => {
            v.addEventListener(eventName, e => {
                let _handle;
                let $el;
                if (isString(selector)) {
                    $el = $(e.target as Element).closest(selector);
                    _handle = handle;
                } else if (isFunction(selector)) {
                    $el = $(e.currentTarget as Element);
                    _handle = selector as Function;
                }
                if ($el && !$el.isEmpty()) {
                    _handle.call(null, $el.first(), e);
                }
            });
        });
        return this;
    }

    public findFirst(selector: string): DOMObject {
        return $(Sizzle.matches(this.findAll().toArray(), selector));
    }

    public findAll(): DOMObject {
        return $(
            this._element.reduce(
                (prev, curr) => prev.concat(this._findAll(curr)),
                []
            )
        );
    }

    public closest(selector?: string): DOMObject {
        const result = [];
        const filter = makeMap("BODY,HTML");
        for (
            let _el = this.first().parentElement;
            !filter(_el.tagName) &&
            (selector ? Sizzle.matchesSelector(_el, selector) : true);
            _el = _el.parentElement
        ) {
            result.push(_el);
            break;
        }
        return $(result);
    }

    public parents(): DOMObject {
        return $(
            this._element.reduce(
                (prev, curr) => prev.concat(this._parent(curr)),
                []
            )
        );
    }

    private _findAll(el: Element): Element[] {
        let result = [];
        for (const v of el.children) {
            const children = v.children;
            if (children.length) {
                result.push(v);
                result = result.concat(this._findAll(v));
            } else {
                result.push(v);
            }
        }
        return result;
    }

    private _parent(el: Element): Element[] {
        const result = [];
        const filter = makeMap("BODY,HTML");
        for (
            let _el = el.parentElement;
            !filter(_el.tagName);
            _el = _el.parentElement
        ) {
            result.push(_el);
        }
        return result;
    }

    private _convertElement(
        el: string | string[] | Element | Element[]
    ): Element[] {
        let result: Element[] = [];
        when([
            {
                predicate: () =>
                    this._isString(el) && this._isHTMLChar(el as any),
                action: () => {
                    this._toArray(el as any).forEach(v => {
                        result.push(convertDOM(v));
                    });
                }
            },
            {
                predicate: () => this._isString(el),
                action: () =>
                    (result = isArray(el)
                        ? (<string[]>el).map(v => Sizzle(v)).flat()
                        : Sizzle(<string>el))
            },
            {
                predicate: () => this._isElement(el),
                action: () =>
                    (result = isArray(el)
                        ? (el as Array<Element>)
                        : [el as Element])
            }
        ]);
        return result;
    }

    private _isString(el: any | any[]): boolean {
        if (typeof el === "string") {
            return true;
        }
        return isArray(el) && every(el, v => typeof v === "string");
    }

    private _isElement(el: any | any[]): boolean {
        if (isElement(el)) {
            return true;
        }
        return isArray(el) && every(el, v => isElement(v));
    }

    private _isHTMLChar(el: string | string[]): boolean {
        if (typeof el === "string" && hasHTMLChar(el)) {
            return true;
        }
        return isArray(el) && every(el, v => hasHTMLChar(v));
    }

    private _toArray<T>(el: T | T[]): T[] {
        return isArray(el) ? el : [el];
    }

    private _push(el: Element) {
        this._element.push(el);
    }

    public attr(key: string): string {
        return this.first().getAttribute(key);
    }

    public attrs(): {[key: string]: string} {
        const target = this.first();
        return target.getAttributeNames().reduce((prev, v) => {
            prev[v] = target.getAttribute(v);
            return prev;
        }, Object.create(null));
    }

    public forEach(predicate: (el: Element) => void): DOMObject {
        this._element.forEach(predicate);
        return this;
    }

    public first(): Element | undefined {
        return this._element.length ? this._element[0] : undefined;
    }

    public end(): Element | undefined {
        return this._element.length
            ? this._element[this._element.length - 1]
            : undefined;
    }

    public toArray(): Element[] {
        return this._element;
    }

    public isEmpty(): boolean {
        return this._element.length === 0;
    }
}

export function $(el: string | string[] | Element | Element[]): DOMObject {
    return new DOMObject(el);
}
