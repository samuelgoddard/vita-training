// Widget
import smoothScrollInternalLinks from 'widgets/smoothScrollInternalLinks';

const init = () => {

  const APP = window.APP || {};

    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');

    svg4everybody();

    APP.widgets = {
      smoothScrollInternalLinks: smoothScrollInternalLinks(),
    };

};

window.addEventListener('DOMContentLoaded', init);
