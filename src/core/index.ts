import { DOMObject } from '../dom/domObject';
import { Head } from './head/head';
import { Content } from './content';

export interface IEditorOptions {
    debug?: boolean;
}

export class Editor {

    private $editor: DOMObject;
    private head = new Head();
    private content = new Content();

    public init(entry: Element | HTMLElement) {
        this.$editor = new DOMObject(entry);
        this.$editor.append(this.head.getElement());
        this.$editor.append(this.content.getElement());
    }

}

export interface IEditorModule {

    getElement(): Element;

}
