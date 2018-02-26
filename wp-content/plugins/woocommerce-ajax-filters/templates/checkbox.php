<?php
/**
* The template for displaying checkbox filters
*
* Override this template by copying it to yourtheme/woocommerce-filters/checkbox.php
*
* @author	BeRocket
* @package	WooCommerce-Filters/Templates
* @version	1.0.1
*/
?>
<?php
$hiden_value = false;
if ( ! empty($terms) ):
    ?>
<?php

    if($terms[0]->taxonomy=="pa_brands") {
        $count_all = 0;
        foreach( $terms as $term ){
            $count_all+=$term->count;
        }
        ?>
        <li style="padding-left: 5px;">
            <span class="item">
            <input type='checkbox' data-taxonomy='<?php echo $terms[0]->taxonomy ?>' value=''/>
                <label class="berocket_aapf_all">All</label>
            </span>
            <span class="count"><?php echo $count_all;?></span>
        </li>
        <?php
    }
//var_dump($terms);
    foreach( $terms as $term ):
        $selected = false;
        if( ! empty($_POST['terms']) ){
            foreach( $_POST['terms'] as $p_term ){
                if( @ $p_term[0] == $term->taxonomy and $term->term_id == @ $p_term[1] ){
                    $selected = true;
                    break;
                }
            }
        }
        ?>
        <li class="<?php if( ! empty($hide_o_value) && isset($term->count) && $term->count == 0 ) { echo 'berocket_hide_o_value '; $hiden_value = true; }  if( ! empty($hide_sel_value) && $selected ) { echo 'berocket_hide_sel_value'; $hiden_value = true; } ?>">
            <span class="item">
                <input id='checkbox_<?=$term->term_id?>' class="checkbox_<?php echo $term->term_id ?>" type='checkbox'
                    data-term_id='<?php echo $term->term_id ?>' data-taxonomy='<?php echo $term->taxonomy ?>' data-operator='<?php echo $operator ?>'
                    <?php
                    if( ! empty($_POST['terms']) ){
                        foreach( $_POST['terms'] as $p_term ){
                            if( @ $p_term[0] == $term->taxonomy and $term->term_id == @ $p_term[1] ){
                                echo ' checked="checked"';
                                break;
                            }
                        }
                    }
                    ?> /><label for='checkbox_<?php echo $term->term_id ?>' class="berocket_label_widgets<?php
                    if( ! empty($_POST['terms']) ){
                        foreach( $_POST['terms'] as $p_term ){
                            if( @ $p_term[0] == $term->taxonomy and $term->term_id == @ $p_term[1] ){
                                echo ' berocket_checked';
                                break;
                            }
                        }
                    }
                    ?>"> <?php echo $term->name ?></label>
            </span>
            <span class="count"><?php echo $term->count;?></span>
        </li>
        <?php
    endforeach; ?>
        <li class="berocket_widget_show_values"<?php if( !$hiden_value ) echo ' style="display: none;"'; ?>><?php _e( 'Show value', 'BeRocket_AJAX_domain' ) ?><span class="show_button"></span></li>
<?php endif; ?>
