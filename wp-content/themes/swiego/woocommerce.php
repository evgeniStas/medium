<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

add_filter( 'woocommerce_variable_sale_price_html', 'my_remove_variation_price', 10, 2 );
add_filter( 'woocommerce_variable_price_html', 'my_remove_variation_price', 10, 2 );

function my_remove_variation_price( $price ) {
    $price = '';
    return $price;
}
?>
<html <?php language_attributes(); ?>>
    <head>
        <title><?php echo bloginfo('name'); ?></title>
        <?php get_header() ?>
    </head>
    <body>
        <?php require_once("menu.php")?>
        <div id="woo">
            <div class="container">
                <div class="sidebar">
                    <h2>Filters</h2>
                    <?php get_sidebar(); ?>
                </div>
                <div class="woo-container woocommerce">
                    <?php woocommerce_content(); ?>
                </div>
            </div>
        </div>
        <?php get_footer(); ?>
    </body>
</html>
