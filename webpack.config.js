const path = require('path');


module.exports = {
    entry: {
        script: './src/script.js',
        auth: './src/auth.js',
        home: './src/home.js',
        index: './src/index.js',
        main: './src/main.js',
        moreInfo: './src/moreInfo.js',
        muzzy2: './src/muzzy2.js',
        profile: './src/profile.js',
        search: './src/search.js',
        signUp: './src/signUp.js',
    },
    output: {
        path: path.resolve(__dirname, 'docs/js'),
        filename: '[name].js',
    },
    mode: 'production'
};