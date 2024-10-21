import init from './init';
import { UI } from './ui';
import './forms.js';

__webpack_public_path__ = window['_root'];

export const App = () => {
  UI();
  init();
};
if (typeof window._loq == 'undefined') {
  window._loq = { push: (arg = false, arg2 = false, arg3 = false) => {} };
}

App();
