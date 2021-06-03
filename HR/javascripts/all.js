//Doing this just for window detection
jQuery.browser = {};
(function() {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();

$(document).ready(function() {
    init();

    //Sb Menu
    $('#btn_menu').click(function() {
        if(getBrowserWidth() < 992){
            $('.menu').slideToggle();
            if($('.wrapper_mask').css('opacity') == 0){
                $('.wrapper_mask').show();
                $('.wrapper_mask').animate({opacity:"0.8"},'easeOutSine');
            }else{
                $('.wrapper_mask').animate({opacity:"0"},'easeOutSine',function(){$('.wrapper_mask').hide();});
            }
        }
    });

    $('.hr_dropdown_toggle').click(function() {
        if(getBrowserWidth() < 992){
            $(this).toggleClass('open');
            $(this).parent().find('.hr_dropdown_menu').slideToggle();
        }
    });
    $('.hr_dropdown_toggle').hover(function() {
        if(getBrowserWidth() >= 992){
            $(this).addClass('open');
            $(this).parent().find('.hr_dropdown_menu').fadeIn();
            $('.dropdown_back').fadeIn();
        }
    });
    $('.dropdown_back').hover(
        function(){
            //end mouseover
        },
        function(){
            if(getBrowserWidth() >= 992){
                $('.hr_dropdown_toggle').removeClass('open');
                $('.hr_dropdown_menu').fadeOut();
                $('.dropdown_back').fadeOut();
            }
            //end mouseout
        }
    );

    $('.carousel').carousel({
        interval: 5000 //changes the speed
    });

    $('#moreft').click(function() {
        if( $('.icongulp ul li:last-child').css('display') == 'none' ){
            $('.icongulp ul li').show();
            $('#moreft').html('Hide');
        }else {
            $('.icongulp ul > li:nth-child(3)' ).nextAll().hide();
            $('#moreft').html('See More');
        }
    });

    $('.downbtn').click(function(event) {
        scrollToSite('#part1');
    });

    $('.link_bar a').click(function(event) {
        $('.link_bar a').removeClass('active');
        $(this).addClass('active');
    });
    
    // youtube-popup
    $('.popup-youtube').magnificPopup({
      type: 'iframe'
    });

    //News
    $('.news_list > li').on('click', 'a', function() {
        $(this).closest('li').addClass('show');
    });

    $('.news_list > li').on('click', '.closenews', function() {
        $(this).closest('li').removeClass('show');
    });


    //FAQ
    $('.faqlist > li').on('click', 'h3 a', function() {
        var $faq = $(this).closest('li');
        $faq.toggleClass('show');
        $faq.find('.wording').slideToggle();
    });
    $('#faq_contact_btn').click(function() {
        $('.contact').slideToggle();
    });


    //Back to top
    $('.backTop').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    //Browse Job 
    //- Page go down
    $('.go-down').click(function(event) {
        scrollToSite('#lookfor');
    });

    //- Apply form
    $('.job_wrap').on('click', '.apply', function() {

        //clean up
        $('.job_wrap').removeClass('apply');
        $('.job_wrap .apply').removeClass('hide');
        $('.job_wrap .close-x').addClass('hide');
        $('#applyJob').hide();
        $('.chosen-select').trigger('chosen:close');

        //action
        var $job = $(this).closest('.job_wrap');
        $job.addClass('apply');
        $( "#applyJob" ).insertAfter($job);
        $( "#applyJob" ).slideDown();

        // -Chosen
        $(".chosen-select").chosen({width:"100%"});

        //視差移動
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        if($(window).scrollTop() > $job.offset().top){
            $body.scrollTop($job.offset().top-90);
        }
       
        $(this).addClass('hide');
        $(this).next().removeClass('hide');    
    });
    $('.job_wrap').on('click', '.close-x', function() {
        var $job = $(this).closest('.job_wrap');
        $job.removeClass('apply');
        $( "#applyJob" ).slideUp();

        $(this).toggleClass('hide');
        $(this).prev().toggleClass('hide');
        $('.chosen-select').trigger('chosen:close');
    });

    // -Tag
    $('#jobtag li a').click(function() {
        $('#jobtag li a').removeClass('active');
        $(this).addClass('active');

        var c = $(this).parent().index();

        if(c==0){
            $('.job_area').show();
        }else{
            $('.job_area').hide();
            $('.joblist_container').find('.job_area').eq(c-1).show();
        }
    });    


    //animate
    var wow = new WOW(
      {
        boxClass:     'wow',
        animateClass: 'animated',
        offset:       200,
        mobile:       true,
        live:         true,
        callback:     function(box) {

        },
        scrollContainer: null
      }
    );
    wow.init();

    //resize
    $(window).resize(function() {
        init();
    });
});

//Init
var bigtosmall = 0;
function init() {

    if(getBrowserWidth() >= 992){
        $('.menu').css('display','block');
    }else if( bigtosmall != getBrowserWidth() ) {
        $('.menu').css('display','none');
        $('.wrapper_mask').css({'opacity':'0','display':'none'});
        
        $('.hr_dropdown_toggle').removeClass('open');
        $('.hr_dropdown_menu').css('display','none');
        $('.dropdown_back').css('display','none');
    }

    $('.wrapper_mask').css('height', getBrowserHeight()-50);
    bigtosmall = getBrowserWidth();

    if(getBrowserWidth() >= 768){
        $('.icongulp ul li').show();
    }else{
        if($('#moreft').html() == 'See More'){
            $('.icongulp ul > li:nth-child(3)' ).nextAll().hide();
        }
    }
}

function scrollToSite(a){
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    if(getBrowserWidth() < 992){
        $body.animate({
            scrollTop: $(a).offset().top-50
        }, 1000);
    }else{
        $body.animate({
            scrollTop: $(a).offset().top-90
        }, 1000);
    }
}

//偵測行動裝置
function isMobile(){
  return (
    (navigator.userAgent.match(/Android/i)) ||
    (navigator.userAgent.match(/webOS/i)) ||
    (navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPod/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/BlackBerry/))
  );
}

//SET VIEW PORT HEIGHT Functionally
function getBrowserHeight() {
    if ($.browser.msie) {
        return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight :
            document.body.clientHeight;
    } else {
        return self.innerHeight;
    }
}

function getBrowserWidth() {
    if ($.browser.msie) {
        return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth :
            document.body.clientWidth;
    } else {
        return self.innerWidth;
    }
}
