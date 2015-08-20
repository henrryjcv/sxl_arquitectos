viwMore = ->
  $('.infinite-scroll').jscroll(
    loadingHtml: '<img src="images/loading.gif" alt="Loading" /> Cargando...'
    nextSelector: 'a.btnRaedMore:last'
    autoTrigger: false
  )

pagination = ->
  options =
    bootstrapMajorVersion: 3
    currentPage: 1
    totalPages: 10
    numberOfPages: 3
    onPageClicked: (e, originalEvent, type, page)->
      #console.log page

  $('.pagination').bootstrapPaginator(options)

actionButtons = ->
  bus = $('body').find('.dataNav').attr('id')
  $('ul#navPrin li a:eq(' + bus + ')').addClass('active')
  $('nav.container-item .item a:eq(' + bus + ')').addClass('active')
  if bus == '5'
    $('header').addClass('headBlog')


class init
  constructor: ()->
    self = this
    self.initialize()

  initialize: ->
    self = this
    self._events()

  _events: ->
    self = this
    self._setSlideText()

    $(".wrapper-img").on "mouseover", ->
      $(@).children(".caption").hide()
      $(@).children(".text-hover").show()
      return
    $(".wrapper-img").on "mouseout", ->
      $(@).children(".caption").show()
      $(@).children(".text-hover").hide()
      return
    #slider
    $("#slider-principal").on "slid.bs.carousel", (e)->
      self._setSlideText()
    $("#prev").on "click", (e)->
      e.preventDefault()
      $("#slider-principal").carousel('prev')
    $("#next").on "click", (e)->
      e.preventDefault()
      $("#slider-principal").carousel('next')

  _setSlideText: ->
    slide = $("#slider-principal").find(".carousel-inner").children(".active")
    text = $(slide).find(".carousel-caption").html()
    $(".slide-text").html(text)

class contact
  constructor: ()->
    self = this
    self.initialize()

  initialize: ->
    if window.google
      self = this
      self._validate()
      google.maps.event.addDomListener window, "load", self._loadMap()
      google.maps.event.addDomListener window, 'resize', self._loadMap()
      return

  _loadMap: ->
    position = new google.maps.LatLng '-12.1214747', '-77.0285793'
    mapOptions =
      "panControl": false
      "zoomControl": false
      "mapTypeControl": false
      "scaleControl": false
      "streetViewControl": false
      "overviewMapControl": false
      "zoom": 11
      "center": position
    map = new google.maps.Map document.getElementById("map"), mapOptions
    marker = new google.maps.Marker
      "position": position
      "icon": "images/ico-market.png"
      "title": "S-XL Arquitectos"
    marker.setMap map

  _validate:()->
    $("#sname").filter_input regex:'[a-zA-Z \-\'\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC]'
    $("#phone").filter_input regex:'[0-9]'
    $('#frmData').validate
    ##onsubmit : false
      errorElement: 'span',
      rules:
        sname:
          required: true
        phone:
          required: true
          minlength:7
        mail:
          required: true
          email:true
        message:
          required: true
      messages:
        sname:
          required: "Nombre inv&aacute;lido"
        phone:
          required: "tel&eacute;fonos inv&aacute;lido"
          minlength: "tel&eacute;fonos inv&aacute;lido"
        mail:
          required: "e-mail inv&aacute;lido"
          email: "e-mail inv&aacute;lido"
        message:
          required: "Mensaje inv&aacute;lido"
      onfocusout: (element) ->
        this.element(element)
        return
      errorPlacement:(error, element)->
        $(element).parents(".trform").find(".message-error").append error
      submitHandler:()->
        return false
    return




class menu
  constructor: ()->
    self = this
    self.initialize()

  initialize:()->
    self = this
    self._setPosition()
    self._events()

  _events:()->
    self = this
    $(window).on "resize",  ->
      self._setPosition()

    $(".btn-navbar").on "click", ()->
      $(".wrapper-menu").show().animate({width: "100%" }, 300 )
      $("#navPrin").css("display":"block")

    $(".close-menu").on "click", ()->
      console.log "close"
      $("#navPrin").css("display":"none")
      $(".wrapper-menu").animate({width: "0" }, 500 )

  _validationMobil: ->
    if navigator.userAgent.match(/Android/i) or navigator.userAgent.match(/webOS/i) or navigator.userAgent.match(/iPhone/i) or navigator.userAgent.match(/iPad/i) or navigator.userAgent.match(/iPod/i) or navigator.userAgent.match(/BlackBerry/i) or navigator.userAgent.match(/Windows Phone/i)
      key = true
    else
      key = false

  _getOrientation: ()->

    if typeof window.orientation == 'undefined'
      test = window.matchMedia("(orientation: portrait)")
      test.addListener (m)->
        mozz = $(window).height()
        if m.matches or mozz is 257
          key = true ## vertical
        else
          key = false  ## horizontal
    else
      window.addEventListener 'orientationchange', ->
        if window.orientation is 90 or window.orientation is -90
          key = false  ## horizontal
        else
          key = true  ## vertical

  _setPosition:()->
    self = this
    w = $(window).innerWidth()
    $menu = $(".wrapper-menu");


    if w <= 768 or (self._validationMobil() is true and self._getOrientation() is true)
      $("body").css("position","relative")
      $(".navbar").before($menu)
      $menu.css('height','101%').hide()
      $menu.find('ul').css("display","block")
    else
      $("body").removeAttr("style")
      $menu.removeAttr("style")
      $("#headerline").after($menu)
      $(".maskMenu").css("width",0)


$(document).on 'ready', ->
  viwMore()
  pagination()
  actionButtons()
  init = new init()
  menu = new menu()
  if $.fancybox
    $(".lightbox").fancybox
      beforeShow: ->
        w = $(window).innerWidth()
        if w > 768
          $close = $('<a title="Close" class="fancybox-item fancybox-trigger-close" href="javascript:;"></a>')
          $prev= $('<a title="Previous" class="fancybox-nav fancybox-trigger-prev" href="javascript:;"><span></span></a>')
          $next = $('<a title="Next" class="fancybox-nav fancybox-trigger-next" href="javascript:;"><span></span></a>')
          $(".fancybox-wrap").before($close)
          $(".fancybox-wrap").before($prev)
          $(".fancybox-wrap").before($next)
          $prev.on "click",()->
            $(".fancybox-prev").trigger "click"
          $next.on "click",()->
            $(".fancybox-next").trigger "click"
          $close.on "click",()->
            $(".fancybox-close").trigger "click"
      afterShow:()->
        w = $(window).innerWidth()
        if w <= 768
          $(".fancybox-next").css("display","block")
          $(".fancybox-prev").css("display","block")
          $(".fancybox-close").css("display","block")


  if window.google
    contact = new contact()



