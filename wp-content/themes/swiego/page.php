<?php

$post = get_post();

?>
<html <?php language_attributes(); ?>>
<head>
    <title><?php echo $post->post_title;?> - <?php echo bloginfo('name'); ?></title>
    <?php get_header() ?>
</head>
<?php require_once("menu.php")?>
    <div class="container">
        <div <?php if(is_cart()){echo "style='background-color: #ececec;padding: 40px;'";}?>>
            <?php if(!is_cart()){?>
                <h1><?php echo $post->post_title;?></h1>
            <?php }else{?>
                <h1 style="text-align: left;">Shipping Cart</h1>
            <?php }?>
            <div style="text-align: left">
                <?php while (have_posts()) : the_post(); ?>

                    <?php the_content(); ?>

                <?php endwhile; ?>
            </div>
        </div>
    </div>
<?php get_footer(); ?>
</body>
</html>
