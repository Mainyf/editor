import { IEditorModule } from "./index";

export class Content implements IEditorModule {

    getElement(): Element {
        const result = document.createElement('div');
        result.className = 'editor-content';
        result.contentEditable = 'true';
        return result;
    }

}