/*! ResponsiveSlides.js v1.01. (c) 2011 Viljami Salminen. MIT License. http://responsive-slides.viljamis.com  */
(function ($) {
  $.fn.responsiveSlides = function (options) {

    // Settings
    var settings = {
      'speed' : 4000,
      'fade' : 1000,
      'auto' : true,
      'maxwidth' : 'none',
      'namespace' : 'responsiveSlides'
    };

    return this.each(function () {
      var $this = $(this);

      if (options) {
        $.extend(settings, options);
      }

      var slideshow = function () {

        var $slide = $this.find('img'),
          $pagination = $('<ul class="' + settings.namespace + '_tabs" />'),
          visible = {
            'position': 'relative',
            'float': 'left'
          },
          hidden = {
            'position': 'absolute',
            'float': 'none'
          };

        // Don't run if there's only one slide
        if ($this.find($slide).length <= 1) {
          return;
        }

        $slide.each(function (i) {
          var $el = $(this);
          $el.attr({
            id : settings.namespace + '_slide' + i
          });
        });

        $slide.css({
          'top': 0,
          'left': 0,
          'width': '100%',
          'height': 'inherit',
          'position': 'absolute'
        });

        $this.find(':first-child')
          .addClass(settings.namespace + '_visible')
          .css(visible);

        $this.css({
          'max-width': parseFloat(settings.maxwidth),
          'width': '100%',
          'overflow': 'hidden',
          'position': 'relative'
        });

        $this.find($slide + ':gt(0)').hide();

        // Auto: true
        if (settings.auto === true) {
          setInterval(function () {
            $this.find(':first-child').fadeOut(parseFloat(settings.fade), function () {
              $(this).css(hidden);
            }).next($slide).fadeIn(parseFloat(settings.fade), function () {
              $(this).css(visible);
            }).addClass(settings.namespace + '_visible').end().appendTo($this)
              .removeClass(settings.namespace + '_visible');
          }, parseFloat(settings.speed));

        // Auto: false
        } else {
          $slide.each(function (i) {
            var whichSlide = i + 1;
            tabMarkup = [
              '<li>',
              '<a href="#' + settings.namespace + '_slide' + whichSlide + '"',
              'class="' + settings.namespace + '_slide' + whichSlide + '">' + whichSlide + '</a>',
              '</li>'
            ].join('');
            $pagination.append(tabMarkup);
          });
          $this.after($pagination);

          $('.' + settings.namespace + '_slide1').parent().addClass(settings.namespace + '_active');
          $('.' + settings.namespace + '_tabs a').each(function (i) {
            var $el = $(this);

            $el.click(function (e) {
              e.preventDefault();

              // Prevent clicking if animated
              if ($('.' + settings.namespace + '_visible:animated').length) {
                return false;
              }

              if (!($el.parent().hasClass(settings.namespace + '_active'))) {
                $('.' + settings.namespace + '_tabs li').removeClass(settings.namespace + '_active');

                $('.' + settings.namespace + '_visible').stop()
                  .fadeOut(parseFloat(settings.fade), function () {
                    $(this)
                      .removeClass(settings.namespace + '_visible')
                      .css(hidden);
                  }).end();

                $('#' + settings.namespace + '_slide' + i).stop()
                  .fadeIn(parseFloat(settings.fade), function () {
                    $(this)
                      .addClass(settings.namespace + '_visible')
                      .css(visible);
                  }).end();

                $el.parent().addClass(settings.namespace + '_active');
              }
            });

          });
        }
      };

      // Fallback to make IE6 support CSS max-width
      var widthSupport = function () {
        if (options.maxwidth) {
          if (typeof document.body.style.maxHeight !== 'undefined' && typeof document.body.style.minHeight !== 'undefined') {
            return false;
          } else {
            $this.each(function () {
              $this.css('width', '100%');
              if ($this.width() > parseFloat(settings.maxwidth)) {
                $this.css('width', parseFloat(settings.maxwidth));
              } else if ($this.width() < parseFloat(settings.maxwidth)) {
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