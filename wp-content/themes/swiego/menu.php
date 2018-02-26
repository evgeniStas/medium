<?php
/**
 * Created by PhpStorm.
 * User: evgeni
 * Date: 20.02.18
 * Time: 13:57
 */
$id_index = 9;
?>
<div class="container">
    <div class="top">
        <div class="logo">
            <a href="<?php echo get_home_url();?>">
                <img src="<?php echo get_template_directory_uri();  ?>/logo.png">
            </a>
        </div>
        <div class="phone">
            <?php echo get_field('phone', $id_index);?>
        </div>
    </div>
    <div class="hr"></div>
    <div class="menu-items">
        <div class="main-menu">
            <?php wp_nav_menu();?>
        </div>
        <div class="rigth-menu">
            <?php get_product_search_form();?>
            <span class="icon-search_ic" id="icon-search_ic"></span>
            <a href="<?php echo wc_get_cart_url();?>">
                <?php if($woocommerce->cart->cart_contents_count>0){ ?>
                <span class="cart-count"><?php echo $woocommerce->cart->cart_contents_count;?></span>
                <?php }?>
                <span class="icon-cart"></span>
            </a>
        </div>
    </div>
</div>
