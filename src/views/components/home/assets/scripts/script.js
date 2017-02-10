/*
 * components/home/assets
 */

// Test for multiple import dependency
import jQuery from 'vendor/jquery/dist/jquery';

const isDeveloping = process.env.NODE_ENV !== 'production';

if ( !isDeveloping ) {
    jQuery(document).ready( function(){
        console.log( 'Script Component/home' );
    });
}
