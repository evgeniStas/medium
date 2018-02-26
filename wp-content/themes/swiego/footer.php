<?php
/**
 * Created by PhpStorm.
 * User: evgeni
 * Date: 20.02.18
 * Time: 14:00
 */
?>

<div id="footer">
    <div class="container">
        <div class="hr"></div>
        <div class="social">
            <div class="item">
                <a href="<?php echo get_field('link_linkedin', $id_index);?>">
                    <span class="icon-in"></span>
                </a>
            </div>
            <div class="item">
                <a href="<?php echo get_field('link_facebook', $id_index);?>">
                    <span class="icon-fb"></span>
                </a>
            </div>
            <div class="item">
                <a href="<?php echo get_field('link_twitter', $id_index);?>">
                    <span class="icon-tw"></span>
                </a>
            </div>
        </div>
    </div>
</div>
<?php wp_footer();?>
