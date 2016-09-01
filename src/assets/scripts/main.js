// Load Vendor or/and external dependencys
// with, or not, to be included to the build
//
// import $ from 'vendor/jquery/dist/jquery';
// where vendor are an alias to node_modules

import $ from 'vendor/jquery/dist/jquery';

$(document).ready( function(){

    console.log('jQuery document Ready Main JS');

});

// import Zepto but without include it to the build
// See external{} in webpack.dev.config.js
import Zepto from 'customImport';

Zepto(function($){

    console.log('Zepto externaly loaded from Main.js')

})
