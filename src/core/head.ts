import { IEditorModule } from './index';
import { IButton } from './button';

export class Head implements IEditorModule {
    
    static buttons: IButton[] = [];

    getElement(): Element {
        const result = document.createElement('div');
        result.className = 'editor-head';
        return result;
    }

}

export function button(): any {
    return (target: any) => {
        debugger;
        Head.buttons.push(target);
    }
}