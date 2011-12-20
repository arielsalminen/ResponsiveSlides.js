/*! ResponsiveSlides.js v1.04. (c) 2011 Viljami Salminen. MIT License. http://responsive-slides.viljamis.com  */
(function ($, window) {
  $.fn.responsiveSlides = function (opts) {

    // Settings
    var settings = {
      'speed' : 4000,
      'fade' : 1000,
      'auto' : true,
      'maxwidth' : 'none',
      'namespace' : 'rs'
    },
    parseF = parseFloat; /* for minification */

    return this.each(function () {

      var $this = $(this);

      if (opts) {
        $.extend(settings, opts);
      }

      var $slide = $this.find('img'),
        hasTouch = 'ontouchstart' in window,
        startEvent = hasTouch ? 'touchstart' : 'mousedown',
        namespace = settings.namespace,
        activeClass = namespace + '_here',
        visibleClass = namespace + '_on',
        slideClassPrefix = namespace + '_s',
        tabsClass = namespace + '_tabs',
        $pagination = $('<ul class="' + tabsClass + '"/>'),
        fadetime = parseF(settings.fade),
        visible = { 'position': 'relative', 'float': 'left' },
        hidden = { 'position': 'absolute', 'float': 'none' },
        maxW = parseF(settings.maxwidth);

      // Only run if there's more than one slide
      if ($this.find($slide).length > 1) {

        $slide.each(function (i) {
          this.id = slideClassPrefix + i;
        });

        $slide.css({
          'top': 0,
          'left': 0,
          'width': '100%',
          'height': 'inherit',
          'position': 'absolute'
        });

        $this.css({
          'max-width': maxW,
          'width': '100%',
          'overflow': 'hidden',
          'position': 'relative'
        });

        $this.find(":first-child").css(visible);
        $this.find($slide + ':gt(0)').hide(); // <-- this makes no sense, since the selector becomes "[object Object]:gt(0)"

        // Auto: true
        if (settings.auto === true) {
          setInterval(function () {
            $this.find(":first-child").fadeOut(fadetime, function () {
              $(this).css(hidden);
            }).next($slide).fadeIn(fadetime, function () {
              $(this).css(visible);
            }).end().appendTo($this);
          }, parseF(settings.speed));

        // Auto: false
        } else {

          tabMarkup = '';

          $slide.each(function (i) {
            var n = i + 1;
            tabMarkup +=
              '<li>' +
              '<a href="#' + slideClassPrefix + n + '"' +
              'class="' + slideClassPrefix + n + '">' + n + '</a>' +
              '</li>';
          });

          $pagination.append(tabMarkup);

          $this.after($pagination).find(":first-child").addClass(visibleClass);
          $('.' + slideClassPrefix + '1').parent().addClass(activeClass);

          $('.' + tabsClass + ' a').each(function (i) {
            var $el = $(this);
            
            $el.bind('click', function (e) {
              e.preventDefault();
            });

            $el.bind(startEvent, function () {
              
              // if currently animated
              if ($('.' + visibleClass + ':animated').length) {
                return false;
              }
              
              if (!($el.parent().hasClass(activeClass))) {
                $('.' + tabsClass + ' li').removeClass(activeClass);
                $('.' + visibleClass).stop().fadeOut(fadetime, function () {
                  $(this).removeClass(visibleClass).css(hidden);
                }).end();
                $('#' + slideClassPrefix + i).stop().fadeIn(fadetime, function () {
                  $(this).addClass(visibleClass).css(visible);
                }).end();
                $el.parent().addClass(activeClass);
              }
              
            });
            
          
          });
        }
      }

      // Fallback to make IE6 support CSS max-width
      if (typeof document.body.style.maxHeight === 'undefined') {
        function widthSupport() {

          if (opts && opts.maxwidth) {

            $this.each(function () {
              $this.css('width', '100%');
              if ($this.width() > maxW) {
                $this.css('width', maxW);
              } else if ($this.width() < maxW) {
                $this.css('width', '100%'); // <-- really necessary to do this twice?
              }
            });
          }

        }

        // Call once
        widthSupport();

        // Call on resize
        $(window).resize(function () {
          widthSupport();
        });

      }

    });
  };
})(jQuery, this);