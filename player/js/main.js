$.ajaxSetup({cache : false});

if((bowser.opera && bowser.version < 15) ||
    (bowser.msie && bowser.version < 10)) {
    $('body').html('Your Browser is not supported, please use a modern browser');
}
var Cookie = {
    remove : function (cookieName) {
        document.cookie = cookieName+'=; expires='+new Date().toGMTString();
    },

    set : function (cookieName, cookieValue, seconds) {
        document.cookie = cookieName+'='+cookieValue+'; expires='+new Date(Date.now()+(seconds*1000)).toGMTString();
    },

    get : function (cookieName) {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].replace(/^\s+|\s+$/gm,'');;
            var cookieParts = cookie.split('=');
            if((cookieParts[0] == cookieName) && (cookieParts[1] != undefined)){
                return cookieParts[1];
            }
        }
    }
}

var App = {};

App.selectedChannel = undefined;





(function(){

    $('.channel-group-toggle').on('click', function(e){
        e.preventDefault();
        var cl = $(this).parent().find('.channel-list'); 
        cl.slideToggle();
        $('.channel-list').not(cl).slideUp(0);
        $('html, body').animate({
                scrollTop: $(this).offset().top
        }, 1000);
    });

    $('.channel-list-link').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        App.selectedChannel = $this;
        var scrolling = " scrolling=";
        var style = " style=";
		var fullscreen = " allowfullscreen";
        var isMobile = window.matchMedia("(max-width: 800px)").matches;
        $('.selected').removeClass('selected');
        $this.parent().addClass('selected');
        if(window.location.pathname !== '/') {
            document.title = $this.text();

        }
        console.log($('.stream-container').html());
        if(($.trim($('.stream-container').html()) !== "") || isMobile) {
            history.replaceState({}, document.title, $this.attr('href'));
        }

        scrolling += (($(this).data('provider-id') === 2) && isMobile) ?  '"auto" ' : "no ";
        style += (($(this).data('provider-id') === 2) && isMobile) ?  '"height:400px;" ' : '""';
        $('.stream-container').removeClass('epg-player');
        $('.channel-watch-container .window-bar-icon').attr('src', $(this).find('.channel-listing-icon').attr('src'));
        $('.channel-watch-container .window-bar-title').text($this.find('.channel-name').text());
        $('.channel-watch-container .stream-container').html('<iframe ' + style + scrolling + fullscreen +' src="'+ $this.data('channel-location')+'"></iframe>');
        $('.channel-watch-container').show();

            
        

    });


    $('.channel-watch-container .window-bar-close').on('click', function(e) {
        e.preventDefault();
        $('.channel-watch-container .stream-container').html("");
        $('.channel-watch-container').hide();
    });


    var isHome = (window.location.pathname === '/');
    var isMobile = window.matchMedia("(max-width: 800px)").matches;
    if(!(isMobile && isHome)){
        var selectedLink = $('.selected').find('.channel-list-link').click();
        $('.selected').parent().slideDown(1500, function() {
            $('html, body').animate({
                    scrollTop: selectedLink.offset().top - 30
            }, 2000);
        });
    }
})();
