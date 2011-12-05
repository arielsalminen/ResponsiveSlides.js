/*! ResponsiveSlides.js v1.0. (c) 2011 Viljami Salminen. MIT License. http://responsive-slides.viljamis.com  */
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

      // Don't run if there's only one image
      if ($this.find('img').length <= 1) {
        return;
      }

      var slideshow = function () {
        var $slides = $this.find('img');

        $slides.each(function (i) {
          var $el = $(this);
          $el.attr({
            id : settings.namespace + '_slide' + i
          });
        });

        $slides.css({
          top: 0,
          left: 0,
          width: '100%',
          height: 'inherit',
          position: 'absolute'
        });

        $this.find(':first-child').addClass(settings.namespace + '_visible');

        $this.css({
          'max-width': parseFloat(settings.maxwidth),
          width: '100%',
          overflow: 'hidden',
          position: 'relative'
        });

        // Dirty attempt to fix the height
        heightFix = [
          '<style>',
          '.' + settings.namespace + '_visible {',
          'position: relative !important;',
          'float: left !important;',
          '}',
          '</style>'
        ].join('');
        $('head').append(heightFix);

        // Auto: true
        if (settings.auto === true) {
          $this.find('img:gt(0)').hide();
          setInterval(function () {
            $this.find(':first-child').fadeOut(parseFloat(settings.fade))
              .next('img').fadeIn(parseFloat(settings.fade))
              .addClass(settings.namespace + '_visible').end().appendTo($this)
              .removeClass(settings.namespace + '_visible');
          }, parseFloat(settings.speed));

        // Auto: false
        } else {
          var $pagination = $('<ul class="' + settings.namespace + '_tabs" />');

          $this.find('img:gt(0)').hide();

          $slides.each(function (i) {
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

          $('.' + settings.namespace + '_slide1').parent().addClass('active');

          $('.' + settings.namespace + '_tabs a').each(function (i) {
            var $el = $(this);

            $el.click(function (e) {
              e.preventDefault();

              // Prevent clicking if animated
              if ($('.' + settings.namespace + '_visible:animated').length) {
                return false;
              }

              if (!($el.parent().hasClass('active'))) {
                $('.' + settings.namespace + '_tabs li').removeClass('active');

                $('.' + settings.namespace + '_visible').stop()
                  .fadeOut(parseFloat(settings.fade), function () {
                    $(this).removeClass(settings.namespace + '_visible');
                  }).end();

                $('#' + settings.namespace + '_slide' + i).stop()
                  .fadeIn(parseFloat(settings.fade), function () {
                    $(this).addClass(settings.namespace + '_visible');
                  }).end();

                $el.parent().addClass('active');
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