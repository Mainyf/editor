export class DomUtils {

    public static find(selector: string): Element | Element[] | null {
        const el = document.querySelectorAll<Element>(selector);
        if(this._hasList(el)) {
            return this._toElements(el);
        } else {
            return el.length ? el.item(0) : null;
        }
    }

    private static _toElements(el: NodeListOf<Element>): Element[] {
        const result: Element[] = [];
        el.forEach(v => result.push(v));
        return result;
    }

    private static _hasList(el: any): boolean {
        if(!el) {
            return false;
        }
        return el instanceof HTMLCollection || el instanceof NodeList;
    }

}
