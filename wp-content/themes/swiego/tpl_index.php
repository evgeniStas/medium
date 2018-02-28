<?php
/*
Template Name: Index
*/
?>
<html <?php language_attributes(); ?>>
    <head>
        <title><?php echo bloginfo('name'); ?></title>
        <?php get_header() ?>
    </head>
    <body>
    <?php do_action( 'storefront_before_site' ); ?>
        <?php require_once("menu.php")?>

        <div id="sales">
            <div class="container">
                <?php

                $query_args = array(
                    'posts_per_page'    => 8,
                    'no_found_rows'     => 1,
                    'post_status'       => 'publish',
                    'post_type'         => 'product',
                    'meta_query'        => WC()->query->get_meta_query(),
                    'post__in'          => array_merge( array( 0 ), wc_get_product_ids_on_sale() )
                );
                $WP_Query = new WP_Query;
                $loop = $WP_Query->query( $query_args );

                $i=0;
                foreach ($loop as $post) {
                    $product = new WC_Product($post->ID);
                    //var_dump($product);
                    if ($i == 2) {
                        ?>
                        <div class="item all">
                            <div class="mask"></div>
                            <div style="background-image: url(<?php echo get_template_directory_uri(); ?>/image/pete-bellis.png);"
                                 class="content">
                                <div class="modal">
                                    <div class="header">-50%</div>
                                    <div class="desc">all acssessorise</div>
                                </div>
                            </div>
                        </div>
                        <?php
                    } else {

                       $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' )[0];
                        ?>
                        <div data-product_id="<?php echo $post->ID;?>" class="item yith-wcqv-button">
                            <div style="background-image: url(<?php echo $image; ?>);"
                                 class="content">
                                <div class="controll">
                                    <div class="info">
                                        <div class="title"><?php echo $post->post_title; ?></div>
                                        <div class="sile">$800</div>
                                        <div class="price">$250</div>
                                    </div>
                                    <div class="btn">
                                        <div class="button">
                                            <a style="color: inherit;" href="<?php echo $post->guid; ?>">
                                                SHOP NOW
                                                <span class="icon-btn_cart"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                    ?>
                    <?php
                    $i++;
                    //echo '<br /><a href="'.get_permalink().'">' . woocommerce_get_product_thumbnail().' '.get_the_title().'</a>';
                }

                wp_reset_query();
                ?>
            </div>
        </div>
        <div id="brands">
            <?php
            $args = array(  'post_type'=> 'lables', 'posts_per_page' => -1);
            $Social = get_posts( $args );
            wp_reset_postdata();
            for($i=0;$i<3;$i++) {
                foreach ($Social as $item) {
                    setup_postdata($item);
                    $img = get_field('photo', $item->ID)["sizes"]["large"];
                    ?>
                    <div class="brand"><img src="<?php echo $img; ?>"/></div>
                    <?php
                }
            }
            ?>
        </div>
        <div id="types">
            <div class="container">
                <div class="types">

                    <?php

                    $taxonomy     = 'product_cat';
                    $orderby      = 'name';
                    $show_count   = 0;      // 1 for yes, 0 for no
                    $pad_counts   = 0;      // 1 for yes, 0 for no
                    $hierarchical = 1;      // 1 for yes, 0 for no
                    $title        = '';
                    $empty        = 0;

                    $args = array(
                        'taxonomy'     => $taxonomy,
                        'orderby'      => $orderby,
                        'show_count'   => $show_count,
                        'pad_counts'   => $pad_counts,
                        'hierarchical' => $hierarchical,
                        'title_li'     => $title,
                        'hide_empty'   => $empty
                    );
                    $all_categories = get_categories( $args );
                    foreach ($all_categories as $cat) {
                        if($cat->category_parent == 0) {
                            $category_id = $cat->term_id;
                            $thumbnail_id = get_woocommerce_term_meta( $cat->term_id, 'thumbnail_id', true );

                            // get the image URL
                            $image = wp_get_attachment_url( $thumbnail_id );
                            ?>
                                <div class="type">
                                    <div class="mask"></div>
                                    <a href="<?php echo get_term_link($cat->slug, 'product_cat');?>">
                                        <div class="title"><?php echo $cat->name;?></div>
                                        <img src="<?php echo $image; ?>"/>
                                    </a>
                                </div>
                            <?php
                        }
                    }
                    ?>
                </div>
                <div class="controls">
                    <div class="right">
                        <span class="icon-arrow_02"></span>
                    </div>
                    <div class="left">
                        <span class="icon-arrow_01"></span>
                    </div>
                </div>
            </div>
        </div>
    <?php
    $post_collection = 106;
    ?>
        <div id="collection">
            <div class="container">
                <div class="left-photo">
                    <img src="<?php echo get_field('photo_left', $post_collection)["url"]; ?>"/>
                </div>
                <div class="right-content">
                    <div class="title"><?php echo get_the_title($post_collection);?></div>
                    <div class="desc">
                        <?php  the_field("description", $post_collection); ?>
                    </div>
                    <div class="controlls">
                        <div class="btn-black">
                            <a style="color: inherit;" href="<?php echo esc_url( get_permalink($post_collection) ); ?>">
                                CONTINUE <span class="icon-arrow_bred"></span>
                            </a>
                        </div>
                    </div>
                    <img src="<?php echo get_field('photo_right', $post_collection)["url"]; ?>"/>
                </div>
            </div>
        </div>
       <?php get_footer();?>
    </body>
</html>
