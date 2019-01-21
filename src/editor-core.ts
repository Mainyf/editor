import { DomUtils } from './utils/domUtils';

export interface IEditorOptions {
    debug?: boolean;
}

export class Editor {

    private _defaultOptions: IEditorOptions = {
        debug: false
    };

    private _defaultEntrySelector = 'editor';
    private _classes = {
        frame: 'editor-frame',
        top: 'editor-top',
        textarea: 'editor-textarea',
        textareaContent: 'editor-textarea__content'
    };
    private _frame?: HTMLElement = undefined;
    private _frameTop?: HTMLElement = undefined;
    private _frameTextarea?: HTMLElement = undefined;

    public init(entry: Element | HTMLElement) {
        if (!entry) {
            let defaultEntry = document.getElementById(this._defaultEntrySelector);
            if (!defaultEntry) {
                throw new Error(`not find defaultEntry`);
            }
            entry = defaultEntry;
        }

        this._frame = this._appendFrame(entry);
        this._frameTop = this._appendFrameTop(this._frame);
        this._frameTextarea = this._appendFrameTextrea(this._frame);
    }

    private _appendFrame(el: Element | HTMLElement): HTMLElement {
        const frame = document.createElement('div');
        frame.classList.add(this._classes.frame);
        el.appendChild(frame);
        return frame;
    }

    private _appendFrameTop(el: Element | HTMLElement): HTMLElement {
        const frameTop = document.createElement('div');
        frameTop.classList.add(this._classes.top);
        el.appendChild(frameTop);
        return frameTop;
    }

    private _appendFrameTextrea(el: Element | HTMLElement): HTMLElement {
        const textarea = document.createElement('div');
        textarea.classList.add(this._classes.textarea);
        const content = document.createElement('div');
        content.classList.add(this._classes.textareaContent);
        textarea.appendChild(content);
        el.appendChild(textarea);
        return textarea;
    }
}
