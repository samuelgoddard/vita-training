import smoothscroll from 'smoothscroll-polyfill';

const scrollIntoView = (selector) => {
  const target = document.querySelector(selector);

  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    console.warn(`No smoothscroll target for selector ${selector}`);
  }
}

const bindScrollHandler = (el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      scrollIntoView(el.getAttribute('href'));
    });

    return el;
  }

export default () => {
  // kick off the polyfill!
  smoothscroll.polyfill();

  return [...document.querySelectorAll('a[href^="#"]')].map(anchor => bindScrollHandler(anchor));
}
