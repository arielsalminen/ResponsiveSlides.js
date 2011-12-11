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

		  // just for minification:
		  namespace = settings.namespace,
		  maxwidth = parseFloat(settings.maxwidth),
		  fade = parseFloat(settings.fade),
		  
          $pagination = $('<ul class="' + namespace + '_tabs"/>'),
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
		  this.id = namespace + '_slide' + i;
        });

        $slide.css({
          'top': 0,
          'left': 0,
          'width': '100%',
          'height': 'inherit',
          'position': 'absolute'
        });

        $this.find(':first-child').addClass(namespace + '_visible').css(visible);

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
            $this.find(':first-child').fadeOut(fade, function () {
              $(this).css(hidden);
            }).next($slide).fadeIn(fade, function () {
              $(this).css(visible);
            }).addClass(namespace + '_visible').end().appendTo($this).removeClass(namespace + '_visible');
          }, parseFloat(settings.speed));

        // Auto: false
        } else {
          $slide.each(function (i) {
            var whichSlide = i + 1,
            tabMarkup =
              '<li>' +
              '<a href="#' + namespace + '_slide' + whichSlide + '"' +
              'class="' + namespace + '_slide' + whichSlide + '">' + whichSlide + '</a>' +
              '</li>'
            ;
            $pagination.append(tabMarkup);
          });
          $this.after($pagination);

          $('.' + namespace + '_slide1').parent().addClass(namespace + '_active');
          $('.' + namespace + '_tabs a').each(function (i) {
            var $el = $(this);

            $el.click(function (e) {
              e.preventDefault();

              // Prevent clicking if animated
              if ($('.' + namespace + '_visible:animated').length) {
                return false;
              }

              if (!($el.parent().hasClass(namespace + '_active'))) {
                $('.' + namespace + '_tabs li').removeClass(namespace + '_active');

                $('.' + namespace + '_visible').stop()
                  .fadeOut(fade, function () {
                    $(this).removeClass(namespace + '_visible').css(hidden);
                  }).end();

                $('#' + namespace + '_slide' + i).stop()
                  .fadeIn(fade, function () {
                    $(this).addClass(namespace + '_visible').css(visible);
                  }).end();

                $el.parent().addClass(namespace + '_active');
              }
            });
          });
        }
      };

      // Fallback to make IE6 support CSS max-width
      var widthSupport = function () {
        if (options.maxwidth) {
          if (typeof document.body.style.maxHeight === 'undefined' || typeof document.body.style.minHeight === 'undefined') {
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