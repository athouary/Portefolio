/*
 * components/home/assets
 */

// Test for multiple import dependency
import jQuery from 'vendor/jquery/dist/jquery';

jQuery(document).ready( function(){
  jQuery('.container').css('background', 'blue')
    console.log( 'Script Component/home' );
});
