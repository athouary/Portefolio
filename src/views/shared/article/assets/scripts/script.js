/*
 * Shared/article/assets
 */

// Test for multiple import dependency
import jQuery from 'vendor/jquery/dist/jquery';

jQuery(document).ready( function(){

    jQuery('.button_1').on('click', function(){
        console.log( "Click Button Article Script" );
    });

    console.log( 'Script Shared/Article' );

} );
