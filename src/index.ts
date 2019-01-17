import { Editor } from './editor-core';
import './utils/polyfill/poly-fill';

// @ts-ignore
export default (window.wangEditor || new Editor());
