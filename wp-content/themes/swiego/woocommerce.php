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
                    <?php if(is_search()){

                        $orderby = 'name';
                        $order = 'asc';
                        $hide_empty = false ;
                        $cat_args = array(
                            'orderby'    => $orderby,
                            'order'      => $order,
                            'hide_empty' => $hide_empty,
                            'name__like' => get_search_query()
                        );

                        $product_categories = get_terms( 'product_cat', $cat_args );

                        if( !empty($product_categories) ){
                            echo '<h2>Categories</h2>';
                            echo '<ul class="products columns-3">';
                            foreach ($product_categories as $key => $category) {
                                $thumbnail_id = get_woocommerce_term_meta( $category->term_id, 'thumbnail_id', true );
                                $image = wp_get_attachment_url( $thumbnail_id );
                                echo '<li class="product-category product">';
                                echo '<a href="'.get_term_link($category).'" >';
                                echo '<img src="'.$image.'" alt="'.$category->name.'" width="200" height="200">';
                                echo '<h2 class="woocommerce-loop-category__title">'.$category->name.'</h2>';
                                echo '</a>';
                                echo '<li>';
                            }
                            echo '</ul>';
                        }

                        ?>
                    <?php }?>
                </div>
            </div>
        </div>
        <?php get_footer(); ?>
    </body>
</html>
