/*! ResponsiveSlides.js v1.05. (c) 2011-2012 Viljami Salminen. MIT License. http://responsive-slides.viljamis.com */
(function ($, window, i) {
  $.fn.responsiveSlides = function (options) {
    // Settings
    var settings = $.extend({
      'speed' : 4000,
      'fade' : 1000,
      'auto' : true,
      'maxwidth' : 'none'
    }, options);

    return this.each(function () {
      i++;
      var $this = $(this);

      var slideshow = function () {
        var $slide = $this.find('img'),
          namespace = 'rslides',
          namespace_i = namespace + i,
          namespace_i_class = namespace + ' ' + namespace_i,
          active_class = namespace + '_here',
          visible_class = namespace_i + '_on',
          slide_class_prefix = namespace_i + '_s',
          tabs_class = namespace_i + '_tabs',
          fadetime = parseFloat(settings.fade),
          $pagination = $('<ul class="' + namespace + '_tabs ' + tabs_class + '" />'),
          visible = { 'position': 'relative', 'float': 'left' },
          hidden = { 'position': 'absolute', 'float': 'none' };

        // Only run if there's more than one slide
        if ($this.find($slide).length > 1) {

          $slide.each(function (i) {
            this.id = slide_class_prefix + i;
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
          })
            .addClass(namespace_i_class)
            .find(':first-child').css(visible).end()
            .find($slide + ':gt(0)').hide();

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
            var t = '';
            $slide.each(function (i) {
              var n = i + 1;
              t +=
                '<li>' +
                '<a href="#" class="' + slide_class_prefix + n + '">' + n + '</a>' +
                '</li>';
            });
            $pagination.append(t);

            $this.after($pagination).find(':first-child').addClass(visible_class);
            $('.' + slide_class_prefix + '1').parent().addClass(active_class);

            $('.' + tabs_class + ' a').each(function (i) {
              var $el = $(this);
              $el.click(function (e) {
                e.preventDefault();

                // Prevent clicking if animated
                if ($('.' + visible_class + ':animated').length) {
                  return false;
                }

                if (!($el.parent().hasClass(active_class))) {
                  $('.' + tabs_class + ' li').removeClass(active_class);
                  $('.' + visible_class).stop().fadeOut(fadetime, function () {
                    $(this).removeClass(visible_class).css(hidden);
                  }).end();
                  $('#' + slide_class_prefix + i).stop().fadeIn(fadetime, function () {
                    $(this).addClass(visible_class).css(visible);
                  }).end();
                  $el.parent().addClass(active_class);
                }
              });
            });
          }

        }
      };

      // Fallback to make IE6 support CSS max-width
      var widthSupport = function () {
        var maxwidth = parseFloat(settings.maxwidth);
        if (options && options.maxwidth) {
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
})(jQuery, this, 0);