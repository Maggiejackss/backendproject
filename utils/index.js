const setMainView = (view) => {
  return {
    footer: 'partials/footer',
      header: 'partials/header',
      main: `partials/mainHTMLs/${view}`
  }
}

const setNavs = (currentHref, navs) => {
  const _navs = navs.map(nav => {
    nav.className = '';
    if (nav.href === currentHref) {
      nav.className = 'active';
    }
    return nav;
  });
  return {navs};
}

module.exports = { setMainView, setNavs };