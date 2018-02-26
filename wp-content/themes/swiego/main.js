var count_cat_all = 4;
var page_slider = 0;

$(function() {
    $(".rigth-menu #icon-search_ic").on("click", function (event) {
        $(this).css("display","none");
        $('.search-menu').show("slide").css("display","inline-block");;
    });
    $("#types .controls .right").on("click", function (event) {
        var width = $("#types .types").width();
        if(page_slider>count_cat_all*2-2){
            return false;
        }
        page_slider++;
        var margin = page_slider*150;


        $("#types .type:first-child").css("margin-left","-"+margin);

    });
    $("#types .controls .left").on("click", function (event) {
        var width = $("#types .types").width();
        if(page_slider==0){return false}
        page_slider--;
        var margin = page_slider*150;
        $("#types .type:first-child").css("margin-left","-"+margin);
    });
});