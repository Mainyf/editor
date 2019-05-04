import { some } from 'lodash';

export function when(args: Array<{
    predicate: () => void,
    action: () => void
}>) {
    for(const v of args) {
        if(v.predicate.call(null)) {
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