cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-browsertab.BrowserTab",
    "file": "plugins/cordova-plugin-browsertab/www/browsertab.js",
    "pluginId": "cordova-plugin-browsertab",
    "clobbers": [
      "cordova.plugins.browsertab"
    ]
  },
  {
    "id": "cordova-plugin-buildinfo.BuildInfo",
    "file": "plugins/cordova-plugin-buildinfo/www/buildinfo.js",
    "pluginId": "cordova-plugin-buildinfo",
    "clobbers": [
      "BuildInfo"
    ]
  },
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "id": "cordova-universal-links-plugin.universalLinks",
    "file": "plugins/cordova-universal-links-plugin/www/universal_links.js",
    "pluginId": "cordova-universal-links-plugin",
    "clobbers": [
      "universalLinks"
    ]
  },
  {
    "id": "ionic-plugin-keyboard.keyboard",
    "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
    "pluginId": "ionic-plugin-keyboard",
    "clobbers": [
      "cordova.plugins.Keyboard"
    ],
    "runs": true
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-browsertab": "0.2.0",
  "cordova-plugin-buildinfo": "2.0.1",
  "cordova-plugin-inappbrowser": "1.7.1",
  "cordova-universal-links-plugin": "1.2.1",
  "ionic-plugin-keyboard": "2.2.1",
  "cordova-plugin-whitelist": "1.3.1",
  "cordova-plugin-statusbar": "2.2.4-dev",
  "cordova-plugin-device": "1.1.4",
  "cordova-plugin-ionic-webview": "1.1.16"
};
// BOTTOM OF METADATA
});