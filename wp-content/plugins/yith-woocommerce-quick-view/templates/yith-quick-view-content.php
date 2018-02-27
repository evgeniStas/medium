<?php
/*
 * This file belongs to the YIT Framework.
 *
 * This source file is subject to the GNU GENERAL PUBLIC LICENSE (GPL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.gnu.org/licenses/gpl-3.0.txt
 */
add_filter('woocommerce_sale_flash', 'woo_custom_hide_sales_flash');


while ( have_posts() ) : the_post(); ?>

 <div class="product">
	<div id="product-<?php the_ID(); ?>" <?php post_class('product'); ?>>

		<?php do_action( 'yith_wcqv_product_image' ); ?>
		<div class="summary entry-summary">
			<div class="summary-content">
                <?php

                //remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
                //remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);

                add_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
                add_action('woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 10);
                add_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 15);
                ?>
				<?php do_action( 'yith_wcqv_product_summary' ); ?>
			</div>
		</div>

	</div>

</div>

<?php endwhile; // end of the loop.