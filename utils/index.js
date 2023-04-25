const setMainView = (view) => {
  return {
    footer: 'partials/footer',
      header: 'partials/header',
      main: `partials/mainHTMLs/${view}`
  }
}

module.exports = { setMainView };