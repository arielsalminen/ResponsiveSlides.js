/*! ResponsiveSlides.js v1.02. (c) 2011 Viljami Salminen. MIT License. http://responsive-slides.viljamis.com  */
(function ($) {
  $.fn.responsiveSlides = function (opts) {
    // Settings
    var settings = {
      'speed' : 4000,
      'fade' : 1000,
      'auto' : true,
      'maxwidth' : 'none',
      'namespace' : 'rs'
    };

    return this.each(function () {
      var $this = $(this);
      if (opts) {
        $.extend(settings, opts);
      }

      var slideshow = function () {
        var $slide = $this.find('img'),
          $pagination = $('<ul class="' + settings.namespace + '_tabs" />'),
          fadetime = parseFloat(settings.fade),
          visible = { 'position': 'relative', 'float': 'left' },
          hidden = { 'position': 'absolute', 'float': 'none' };

        // Don't run if there's only one slide
        if ($this.find($slide).length <= 1) {
          return;
        }

        $slide.each(function (i) {
          var $el = $(this);
          $el.attr({
            id : settings.namespace + '_s' + i
          });
        });

        $slide.css({
          'top': 0,
          'left': 0,
          'width': '100%',
          'height': 'inherit',
          'position': 'absolute'
        });

        $this.css({
          'max-width': parseFloat(settings.maxwidth),
          'width': '100%',
          'overflow': 'hidden',
          'position': 'relative'
        });

        $this.find(':first-child').css(visible);
        $this.find($slide + ':gt(0)').hide();

        // Auto: true
        if (settings.auto === true) {
          setInterval(function () {
            $this.find(':first-child').fadeOut(fadetime, function () {
              $(this).css(hidden);
            }).next($slide).fadeIn(fadetime, function () {
              $(this).css(visible);
            }).end().appendTo($this);
          }, parseFloat(settings.speed));

        // Auto: false
        } else {
          $slide.each(function (i) {
            var whichSlide = i + 1;
            tabMarkup = [
              '<li>',
              '<a href="#' + settings.namespace + '_s' + whichSlide + '"',
              'class="' + settings.namespace + '_s' + whichSlide + '">' + whichSlide + '</a>',
              '</li>'
            ].join('');
            $pagination.append(tabMarkup);
          });
          $this.after($pagination);

          $this.find(':first-child').addClass(settings.namespace + '_on');
          $('.' + settings.namespace + '_s1').parent().addClass(settings.namespace + '_here');

          $('.' + settings.namespace + '_tabs a').each(function (i) {
            var $el = $(this);

            $el.click(function (e) {
              e.preventDefault();
              // Prevent clicking if animated
              if ($('.' + settings.namespace + '_on:animated').length) {
                return false;
              }
              if (!($el.parent().hasClass(settings.namespace + '_here'))) {
                $('.' + settings.namespace + '_tabs li').removeClass(settings.namespace + '_here');
                $('.' + settings.namespace + '_on').stop()
                  .fadeOut(fadetime, function () {
                    $(this).removeClass(settings.namespace + '_on').css(hidden);
                  }).end();
                $('#' + settings.namespace + '_s' + i).stop()
                  .fadeIn(fadetime, function () {
                    $(this).addClass(settings.namespace + '_on').css(visible);
                  }).end();
                $el.parent().addClass(settings.namespace + '_here');
              }
            });
          });
        }
      };

      // Fallback to make IE6 support CSS max-width
      var widthSupport = function () {
        var maxwidth = parseFloat(settings.maxwidth);
        if (opts.maxwidth) {
          if (typeof document.body.style.maxHeight === 'undefined') {
            $this.each(function () {
              $this.css('width', '100%');
              if ($this.width() > maxwidth) {
                $this.css('width', maxwidth);
              } else if ($this.width() < maxwidth) {
                $this.css('width', '100%');
              }
            });
          }
        }
      };

      // Call once
      slideshow();
      widthSupport();
      // Call on resize
      $(window).resize(function () {
        widthSupport();
      });
    });
  };
})(jQuery);