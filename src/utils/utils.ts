import { some } from 'lodash';

export function when(args: Array<{
    predicate: () => void,
    action: () => void
}>) {
    for (const v of args) {
        if (v.predicate.call(null)) {
            v.action.call(null);
            break;
        }
    }
}

export function hasHTMLChar(str: string): boolean {
    // @ts-ignore
    return some(str, (x) => x.charCodeAt() === 62 || x.charCodeAt() == 60);
}

export function convertDOM(htmlStr: string): Element {
    const _el = document.createElement('div');
    _el.innerHTML = htmlStr;
    return _el.firstChild as Element;
}

export function hashCode(str: string): number {
    let hash = 0, i, chr;
    if (this.length === 0) {
        return hash;
    }
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function randomStr(min, max) {
    let str = '',
        range = Math.round(Math.random() * (max - min)) + min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let i = 0; i < range; i++) {
        str += arr[Math.round(Math.random() * (arr.length - 1))];
    }
    return str;
}
