import { IButton } from "../button";
import { button } from "../head";

@button()
class Center implements IButton {
    
    text: string = '居中';
    icon: string = 'icon-center';

    handle() {

    }
}
