import { IButton } from "@src/core/head/button";

export default class Bold implements IButton {

    text: string = '加粗';
    icon: string = 'bold';

    handle() {
        console.log('click bold')
    }
}
