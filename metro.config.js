const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  };
  config.resolver = {
    ...resolver,
    assetExts: [...resolver.assetExts, 'png', 'jpg', 'jpeg', 'gif', 'svg'],
  };

  return config;
})();
