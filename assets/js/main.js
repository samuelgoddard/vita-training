// Widget
import smoothScrollInternalLinks from 'widgets/smoothScrollInternalLinks';

const init = () => {

  const APP = window.APP || {};

    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');

    APP.widgets = {
      smoothScrollInternalLinks: smoothScrollInternalLinks(),
    };

};

window.addEventListener('DOMContentLoaded', init);
