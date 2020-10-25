const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

function findSWPrecachePlugin(element) {
  return element.constructor.name === 'GenerateSW';
}

function removeSWPrecachePlugin(config) {
  const swPrecachePluginIndex = config.plugins.findIndex(findSWPrecachePlugin);
  if (swPrecachePluginIndex !== -1) {
    config.plugins.splice(swPrecachePluginIndex, 1); // mutates
  }
}

// function rewireWorkboxInject(workboxConfig) {
//   workboxConfig = workboxConfig || defaultInjectConfig;
//   return function rewireWorkboxInner(config, env) {
//     removeSWPrecachePlugin(config);
//     // Add the Workbox plugin
//     config.plugins.push(new workboxPlugin.InjectManifest(workboxConfig));
//     return config;
//   };
// }

module.exports = function override(config, env) {
  if (env === 'production') {
    console.log('Production build - Adding Workbox for PWAs');
    removeSWPrecachePlugin(config);
    config.plugins.push(
      new InjectManifest({
        swSrc: path.join(__dirname, 'src', 'service-worker.js')
      })
    );
  }
  return config;
};
