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
        if($("#header").css("bottom") == "0px")
        {
            var h = getBrowserHeight() - 60;
            $("#header").animate({bottom:h+"px"},'easeOutSine');
        }
        else
        {
            $("#header").animate({bottom:"0px"},'easeOutSine');
        }
    });


    //報名表單
    $('.popup-with-form').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      fixedContentPos: true,

      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
        beforeOpen: function() {
          if($(window).width() < 700) {
            this.st.focus = false;
          } else {
            this.st.focus = '#name';
          }

          $("#formarea").show();
          document.getElementById("p_info").innerHTML="";
        }
      }
    });

    //排序按鈕
    $('.pagenav li a').click(function() {
        $('.pagenav li').removeClass( "active" );
        $(this).parent().addClass( "active" );
    });

    //首頁下滑按鈕
    $('.goto_down').click(function() {
        var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $body.animate({
            scrollTop: $('#rule').offset().top
        }, 1000);
   
        return false;
    });

    


    //移除超連結邊框
    $("a").focus(function(){
      $(this).blur();
    });

    //投票頁滑入上方顯示影片完整名稱
    $('.link').hover(function () {
      $(this).find('.fullname').slideToggle(250);
    });

    //resize
    $(window).resize(function() {

        if( getBrowserWidth() << 1100 ) {
            init();
        }
        
    });
});

//animate scroll
$(function() {

  var $window           = $(window),
      win_height_padded = $window.height() * 1.1,
      isTouch           = Modernizr.touch;

  /*if (isTouch) { $('.revealOnScroll').addClass('animated'); }*/

  $window.on('scroll', revealOnScroll);

  function revealOnScroll() {
    var scrolled = $window.scrollTop(),
        win_height_padded = $window.height() * 1.1;

    // Showed...
    $(".revealOnScroll:not(.animated)").each(function () {
      var $this     = $(this),
          offsetTop = $this.offset().top;

      if (scrolled + win_height_padded > offsetTop) {
        if ($this.data('timeout')) {
          window.setTimeout(function(){
            $this.addClass('animated ' + $this.data('animation'));
          }, parseInt($this.data('timeout'),10));
        } else {
          $this.addClass('animated ' + $this.data('animation'));
        }
      }
    });
    // Hidden...
   $(".revealOnScroll.animated").each(function (index) {
      var $this     = $(this),
          offsetTop = $this.offset().top;
      if (scrolled + win_height_padded < offsetTop) {
        /*$(this).removeClass('animated fadeInUp flipInX lightSpeedIn bounceIn')*/
      }
    });
  }

  revealOnScroll();
});

//Init
function init() {
    $('#header').css("bottom", getBrowserHeight()-60+"px");

    //標題過長隱藏後段內容
    $('.vote_gallery').find('h2').dotdotdot();
}

//報名表送出成功訊息
function ShowComplete() {
    document.getElementById("p_info").innerHTML="感謝您熱情的參與<br>恭喜您已完成報名階段審核通過後，會於投票期間於投票頁面出現您的影片，謝謝";
    $("#formarea").hide();
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
