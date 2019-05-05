import { IButton } from "@src/core/head/button";

export default class Center implements IButton {
    
    text: string = '居中';
    icon: string = 'center';

    handle() {
        console.log('click center')
    }
}
