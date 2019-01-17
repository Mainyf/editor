import { DomUtils } from './utils/domUtils';

export interface IEditorOptions {
    debug?: boolean;
}

export class Editor {

    private _defaultOptions: IEditorOptions = {
        debug: false
    };

    private _defaultEntrySelector = 'editorEntry';
    private _editorFrameClassName = 'editor_frame';
    private _editorTopClassName = 'editor_top';
    private _editorTextareaClassName = 'editor_textarea';
    private _frame?: HTMLElement = undefined;
    private _frameTop?: HTMLElement = undefined;
    private _frameTextarea?: HTMLElement = undefined;

    public init(entry: Element | HTMLElement) {
        if(!entry) {
            let defaultEntry = document.getElementById(this._defaultEntrySelector);
            if(!defaultEntry) {
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
        frame.classList.add(this._editorFrameClassName);
        el.appendChild(frame);
        return frame;
    }

    private _appendFrameTop(el: Element | HTMLElement): HTMLElement {
        const frameTop = document.createElement('div');
        frameTop.classList.add(this._editorTopClassName);
        el.appendChild(frameTop);
        return frameTop;
    }

    private _appendFrameTextrea(el: Element | HTMLElement): HTMLElement {
        const frameTop = document.createElement('div');
        frameTop.classList.add(this._editorTextareaClassName);
        el.appendChild(frameTop);
        return frameTop;
    }
}
