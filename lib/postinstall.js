'use strict';

const bin = require('./ngrok/wrapper');

bin.run(['version'], (err) => {
    if (err) {
        console.log(err.message);
        console.log('ngrok binary test failed');
        return;
    }
    console.log('ngrok binary test passed successfully');
});
