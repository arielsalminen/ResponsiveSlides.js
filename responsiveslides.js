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
          $pagination = $('<ul class="' + settings.nspace + '_tabs" />'),
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
            id : settings.nspace + '_s' + i
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
              '<a href="#' + settings.nspace + '_s' + whichSlide + '"',
              'class="' + settings.nspace + '_s' + whichSlide + '">' + whichSlide + '</a>',
              '</li>'
            ].join('');
            $pagination.append(tabMarkup);
          });
          $this.after($pagination);

          $this.find(':first-child').addClass(settings.nspace + '_on');
          $('.' + settings.nspace + '_s1').parent().addClass(settings.nspace + '_here');

          $('.' + settings.nspace + '_tabs a').each(function (i) {
            var $el = $(this);

            $el.click(function (e) {
              e.preventDefault();
              // Prevent clicking if animated
              if ($('.' + settings.nspace + '_on:animated').length) {
                return false;
              }
              if (!($el.parent().hasClass(settings.nspace + '_here'))) {
                $('.' + settings.nspace + '_tabs li').removeClass(settings.nspace + '_here');
                $('.' + settings.nspace + '_on').stop()
                  .fadeOut(fadetime, function () {
                    $(this).removeClass(settings.nspace + '_on').css(hidden);
                  }).end();
                $('#' + settings.nspace + '_s' + i).stop()
                  .fadeIn(fadetime, function () {
                    $(this).addClass(settings.nspace + '_on').css(visible);
                  }).end();
                $el.parent().addClass(settings.nspace + '_here');
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