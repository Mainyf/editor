import { IEditorModule } from '../index';
import { IButton } from './button';
import { $ } from '@src/dom/domObject';
import { randomStr } from '@src/utils/utils';
import { get } from 'lodash';

export class Head implements IEditorModule {

    private readonly headClass = 'editor-head';
    private readonly listWrapClass = 'button-list-container';
    private readonly buttons: {[key: string]: IButton} = {};

    constructor() {
        // @ts-ignore
        const buttonComponents = require.context('./buttons', false, /\.ts$/);
        buttonComponents.keys().forEach((v) => {
            const button = buttonComponents(v)['default'];
            this.buttons[`data-v${randomStr(5, 5).toLocaleLowerCase()}`] = new button();
        });
    }


    getElement(): Element {
        const result = document.createElement('div');
        result.className = this.headClass;
        const $buttonWrap = $(`<ul class="${this.listWrapClass}"></ul>`);
        for(let key in this.buttons) {
            const v = this.buttons[key];
            $buttonWrap.append($(`<li title="${v.text}" ${key}><i class="iconfont icon-${v.icon}"></i></li>`));
        }
        $buttonWrap.on('click', 'li', (el) => {
            const attr = Object.keys($(el).attrs()).find((v) => v.startsWith('data-'));
            if(attr) {
                // @ts-ignore
                const _handle: Function = get(this.buttons, `[${attr}].handle`);
                if(_handle) {
                    _handle.call(null);
                }
            }
        });
        $(result).append($buttonWrap);
        return result;
    }

}
