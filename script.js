const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch();
  // do something here...
})();
