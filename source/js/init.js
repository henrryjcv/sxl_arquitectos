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
      onPageClicked: function(e, originalEvent, type, page) {}
    };
    return $('.pagination').bootstrapPaginator(options);
  };

  actionButtons = function() {
    var bus;
    bus = $('body').find('.dataNav').attr('id');
    $('ul#navPrin li a:eq(' + bus + ')').addClass('active');
    $('nav.container-item .item a:eq(' + bus + ')').addClass('active');
    if (bus === '5') {
      return $('header').addClass('headBlog');
    }
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
        self._validate();
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

    contact.prototype._validate = function() {
      $("#sname").filter_input({
        regex: '[a-zA-Z \-\'\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC]'
      });
      $("#phone").filter_input({
        regex: '[0-9]'
      });
      $('#frmData').validate({
        errorElement: 'span',
        rules: {
          sname: {
            required: true
          },
          phone: {
            required: true,
            minlength: 7
          },
          mail: {
            required: true,
            email: true
          },
          message: {
            required: true
          }
        },
        messages: {
          sname: {
            required: "Nombre inv&aacute;lido"
          },
          phone: {
            required: "tel&eacute;fonos inv&aacute;lido",
            minlength: "tel&eacute;fonos inv&aacute;lido"
          },
          mail: {
            required: "e-mail inv&aacute;lido",
            email: "e-mail inv&aacute;lido"
          },
          message: {
            required: "Mensaje inv&aacute;lido"
          }
        },
        onfocusout: function(element) {
          this.element(element);
        },
        errorPlacement: function(error, element) {
          return $(element).parents(".trform").find(".message-error").append(error);
        },
        submitHandler: function() {
          return false;
        }
      });
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
          width: "100%"
        }, 300);
        return $("#navPrin").css({
          "display": "block"
        });
      });
      return $(".close-menu").on("click", function() {
        console.log("close");
        $("#navPrin").css({
          "display": "none"
        });
        return $(".wrapper-menu").animate({
          width: "0"
        }, 500);
      });
    };

    menu.prototype._validationMobil = function() {
      var key;
      if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return key = true;
      } else {
        return key = false;
      }
    };

    menu.prototype._getOrientation = function() {
      var test;
      if (typeof window.orientation === 'undefined') {
        test = window.matchMedia("(orientation: portrait)");
        return test.addListener(function(m) {
          var key, mozz;
          mozz = $(window).height();
          if (m.matches || mozz === 257) {
            return key = true;
          } else {
            return key = false;
          }
        });
      } else {
        return window.addEventListener('orientationchange', function() {
          var key;
          if (window.orientation === 90 || window.orientation === -90) {
            return key = false;
          } else {
            return key = true;
          }
        });
      }
    };

    menu.prototype._setPosition = function() {
      var $menu, self, w;
      self = this;
      w = $(window).innerWidth();
      $menu = $(".wrapper-menu");
      if (w <= 768 || (self._validationMobil() === true && self._getOrientation() === true)) {
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
      $(".lightbox").fancybox({
        beforeShow: function() {
          var $close, $next, $prev, w;
          w = $(window).innerWidth();
          if (w > 768) {
            $close = $('<a title="Close" class="fancybox-item fancybox-trigger-close" href="javascript:;"></a>');
            $prev = $('<a title="Previous" class="fancybox-nav fancybox-trigger-prev" href="javascript:;"><span></span></a>');
            $next = $('<a title="Next" class="fancybox-nav fancybox-trigger-next" href="javascript:;"><span></span></a>');
            $(".fancybox-wrap").before($close);
            $(".fancybox-wrap").before($prev);
            $(".fancybox-wrap").before($next);
            $prev.on("click", function() {
              return $(".fancybox-prev").trigger("click");
            });
            $next.on("click", function() {
              return $(".fancybox-next").trigger("click");
            });
            return $close.on("click", function() {
              return $(".fancybox-close").trigger("click");
            });
          }
        },
        afterShow: function() {
          var w;
          w = $(window).innerWidth();
          if (w <= 768) {
            $(".fancybox-next").css("display", "block");
            $(".fancybox-prev").css("display", "block");
            return $(".fancybox-close").css("display", "block");
          }
        }
      });
    }
    if (window.google) {
      return contact = new contact();
    }
  });

}).call(this);
