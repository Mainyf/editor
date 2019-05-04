import { IEditorModule } from '../index';
import { IButton } from './button';
import { $ } from '@src/dom/domObject';
import { randomStr } from '@src/utils/utils';

export class Head implements IEditorModule {

    private readonly headClass = 'editor-head';
    private readonly listContainerClass = 'button-list-container';
    private buttons: IButton[] = [];

    constructor() {
        // @ts-ignore
        const buttonComponents = require.context('./buttons', false, /\.ts$/);
        for (const v of buttonComponents.keys()) {
            const button = buttonComponents(v)['default'];
            this.buttons.push(new button());
        }
    }


    getElement(): Element {
        const result = document.createElement('div');
        result.className = this.headClass;
        const buttonContainer = $(`<ul class="${this.listContainerClass}"></ul>`);
        for (const v of this.buttons) {
            const key = `data-v${randomStr(5, 5)}`;
            buttonContainer.append($(`<li title="${v.text}" ${key}><i class="iconfont icon-${v.icon}"></i></li>`));

        }
        $(result).append(buttonContainer);
        return result;
    }

}
