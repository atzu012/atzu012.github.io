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


    $.getJSON( "ajax/data.json", function( data ) {
		var items = [], banner_items = [];;
		$.each( data, function( key, val ) {

            if( key == "web" ){
                val.forEach(function(el, ind){
                    items.push( `<div class="card">
                    <a href="${(el.link != '')? el.link:'javascript:;'}" target="_blank">
                    <span class="link_icon"><i class="fa fa-link" aria-hidden="true"></i></span>
                    <img class="card-img-top img-fluid" src="${el.small_img}">
                    <div class="card-block">
                    <p class="card-text">${el.title}</p>
                    <p class="card-text">${el.type}</p>
                  </div></a></div>` );
                });

                $("#web").append( items );
            }else if( key == "banner" ){
                val.forEach(function(el, ind){
                    banner_items.push( `<div class="card">
                    <a data-toggle="modal" data-target=".bd-example-modal-lg" href="javascript:;">
                    <span class="link_icon"><i class="fa fa-search-plus" aria-hidden="true"></i></span>
                    <img class="card-img img-fluid" src="${el.img}"></a></div>` );
                });
                
                $("#banner").append( banner_items );
            }
		});
        
        
    });
    
    $('.works_wrapper').on('click', 'a', function(){
        $('.popup_pic img').attr("src", $(this).find('img').attr('src'));
    })

    $('.popup_pic').click(function(){
        $('#img_popup').modal('hide');
    });

    $('.navbar-brand').click(function(){
        scrollToSite( "#i_top" );
    });


    $('body').on('click', '.navbar-nav a, .s_link a', function(){
        scrollToSite( "#" + $(this).data("link") );
    });


    var os = new OnScreen({
        tolerance: 0,
        debounce: 100,
        container: window
    });

    os.on('enter', '.boxtit h1', (element, event) => {
        TweenLite.to(element, .8, {transform:"translateY(0)", opacity: "1", ease: Expo.easeOut});
    });
    os.on('enter', '.s_photo', (element, event) => {
        TweenLite.to(element, 1.2, {width:"100%", ease: Power4.easeOut});
    });



    //resize
    $(window).resize(function() {
        init();
    });
});

//Init
function init() {
    //
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
