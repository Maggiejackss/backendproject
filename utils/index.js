const setMainView = (view) => {
  return {
    footer: 'partials/footer',
      header: 'partials/header',
      main: `partials/mainHTMLs/${view}`
  }
}

const setNavs = (currentHref, navs, isAuthenticated) => {
  const _navs = navs.map(nav => {
    nav.className = '';
    if (nav.href === currentHref) {
      nav.className = 'active';
    }
    return nav;
  }).filter(nav => {
    if (!isAuthenticated) {
      return !nav.isPrivate;
    } else {
      return nav.isPrivate || nav.isPrivate === undefined;
    }
  })
  return {navs: _navs};
}

module.exports = { setMainView, setNavs };