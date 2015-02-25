exports.config = {
    directConnect: true,
    allScriptsTimeout: 11000,
    specs: [
      'specs/**/*.spec.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    //multiCapabilities: [{
    //    browserName: 'firefox'
    //}, {
    //    browserName: 'chrome'
    //}],
    baseUrl: 'http://localhost:63380/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};