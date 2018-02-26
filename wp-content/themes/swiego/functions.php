<?php
/**
 * Created by PhpStorm.
 * User: evgeni
 * Date: 19.02.18
 * Time: 16:59
 */


add_theme_support( 'woocommerce' );

if ( function_exists('register_sidebar') )
    register_sidebar();

remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

add_filter('woocommerce_show_page_title', create_function('$result', 'return false;'), 20);
remove_action( 'woocommerce_before_shop_loop' , 'woocommerce_result_count', 20 );
// Add custom wrappers.
add_action( 'woocommerce_before_main_content', array( __CLASS__, 'output_content_wrapper' ) );
add_action( 'woocommerce_after_main_content', array( __CLASS__, 'output_content_wrapper_end' ) );

// Declare theme support for features.
add_theme_support( 'wc-product-gallery-zoom' );
add_theme_support( 'wc-product-gallery-lightbox' );
add_theme_support( 'wc-product-gallery-slider' );
add_theme_support( 'woocommerce', array(
    'thumbnail_image_width' => 200,
    'single_image_width'    => 350,
) );

/*

add_filter( 'woocommerce_variable_sale_price_html', 'my_remove_variation_price', 10, 2 );
add_filter( 'woocommerce_variable_price_html', 'my_remove_variation_price', 10, 2 );

function my_remove_variation_price( $price ) {
    $price = '';
    return $price;
}
*/

add_filter( 'woocommerce_loop_add_to_cart_link', function( $product ) {
    return '';
} );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
function custom_remove_all_quantity_fields( $return, $product ) {return true;}
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_sale_flash', 10 );


add_filter( 'woocommerce_product_single_add_to_cart_text', 'woo_custom_cart_button_text' );    // 2.1 +

function woo_custom_cart_button_text()
{

    if (!is_product()) {
        return __('SHOP NOW', 'woocommerce');
    }else{
        return __('ADD TO CART', 'woocommerce');
    }

}

remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );

remove_action( 'woocommerce_proceed_to_checkout', 'woocommerce_button_proceed_to_checkout', 20 );
add_action('woocommerce_proceed_to_checkout', 'sm_woo_custom_checkout_button_text',20);

function sm_woo_custom_checkout_button_text() {
    $checkout_url = WC()->cart->get_checkout_url();
    ?>
    <a href="<?php echo $checkout_url; ?>" class="checkout-button btn-black alt wc-forward"><?php  _e( 'CONTINUE', 'woocommerce' ); ?><span class="icon-arrow_bred"></span></a>
    <?php
}
