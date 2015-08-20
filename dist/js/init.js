(function() {
  var actionButtons, contact, init, menu, pagination, viwMore;

  viwMore = function() {
    return $('.infinite-scroll').jscroll({
      loadingHtml: '<img src="images/loading.gif" alt="Loading" /> Cargando...',
      nextSelector: 'a.btnRaedMore:last',
      autoTrigger: false
    });
  };

  pagination = function() {
    var options;
    options = {
      bootstrapMajorVersion: 3,
      currentPage: 1,
      totalPages: 10,
      numberOfPages: 3,
      onPageClicked: function(e, originalEvent, type, page) {
        return console.log(page);
      }
    };
    return $('.pagination').bootstrapPaginator(options);
  };

  actionButtons = function() {
    var bus;
    bus = $('body').find('.dataNav').attr('id');
    return $('nav#Header ul li a:eq(' + bus + ')').addClass('on');
  };

  init = (function() {
    function init() {
      var self;
      self = this;
      self.initialize();
    }

    init.prototype.initialize = function() {
      var self;
      self = this;
      return self._events();
    };

    init.prototype._events = function() {
      var self;
      self = this;
      self._setSlideText();
      $(".wrapper-img").on("mouseover", function() {
        $(this).children(".caption").hide();
        $(this).children(".text-hover").show();
      });
      $(".wrapper-img").on("mouseout", function() {
        $(this).children(".caption").show();
        $(this).children(".text-hover").hide();
      });
      $("#slider-principal").on("slid.bs.carousel", function(e) {
        return self._setSlideText();
      });
      $("#prev").on("click", function(e) {
        e.preventDefault();
        return $("#slider-principal").carousel('prev');
      });
      return $("#next").on("click", function(e) {
        e.preventDefault();
        return $("#slider-principal").carousel('next');
      });
    };

    init.prototype._setSlideText = function() {
      var slide, text;
      slide = $("#slider-principal").find(".carousel-inner").children(".active");
      text = $(slide).find(".carousel-caption").html();
      return $(".slide-text").html(text);
    };

    return init;

  })();

  contact = (function() {
    function contact() {
      var self;
      self = this;
      self.initialize();
    }

    contact.prototype.initialize = function() {
      var self;
      if (window.google) {
        self = this;
        google.maps.event.addDomListener(window, "load", self._loadMap());
        google.maps.event.addDomListener(window, 'resize', self._loadMap());
      }
    };

    contact.prototype._loadMap = function() {
      var map, mapOptions, marker, position;
      position = new google.maps.LatLng('-12.1214747', '-77.0285793');
      mapOptions = {
        "panControl": false,
        "zoomControl": false,
        "mapTypeControl": false,
        "scaleControl": false,
        "streetViewControl": false,
        "overviewMapControl": false,
        "zoom": 11,
        "center": position
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      marker = new google.maps.Marker({
        "position": position,
        "icon": "images/ico-market.png",
        "title": "S-XL Arquitectos"
      });
      return marker.setMap(map);
    };

    return contact;

  })();

  menu = (function() {
    function menu() {
      var self;
      self = this;
      self.initialize();
    }

    menu.prototype.initialize = function() {
      var self;
      self = this;
      console.log;
      self._setPosition();
      return self._events();
    };

    menu.prototype._events = function() {
      var self;
      self = this;
      $(window).on("resize", function() {
        return self._setPosition();
      });
      $(".btn-navbar").on("click", function() {
        $(".wrapper-menu").show().animate({
          width: "70%"
        }, 300);
        return $(".maskMenu").css({
          "width": "100%"
        });
      });
      return $(".close-menu").on("click", function() {
        $(".maskMenu").css({
          "width": "0"
        });
        return $(".wrapper-menu").animate({
          width: "0"
        }, 500);
      });
    };

    menu.prototype._setPosition = function() {
      var $menu, w;
      w = $(window).width();
      console.log($("html").height());
      $menu = $(".wrapper-menu");
      if (w < 768) {
        $("body").css("position", "relative");
        $(".navbar").before($menu);
        $menu.css('height', '101%').hide();
        return $menu.find('ul').css("display", "block");
      } else {
        $("body").removeAttr("style");
        $menu.removeAttr("style");
        $("#headerline").after($menu);
        return $(".maskMenu").css("width", 0);
      }
    };

    return menu;

  })();

  $(document).on('ready', function() {
    viwMore();
    pagination();
    actionButtons();
    init = new init();
    menu = new menu();
    if ($.fancybox) {
      $(".lightbox").fancybox();
    }
    if (window.google) {
      return contact = new contact();
    }
  });

}).call(this);
