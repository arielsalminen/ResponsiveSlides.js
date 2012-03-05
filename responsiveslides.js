/*! ResponsiveSlides.js v1.05. (c) 2011 Viljami Salminen. MIT License. http://responsive-slides.viljamis.com  */
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
          namespace = 'rslides' + i,
          activeClass = namespace + '_here',
          visibleClass = namespace + '_on',
          slideClassPrefix = namespace + '_s',
          tabsClass = namespace + '_tabs',
          $pagination = $('<ul class="' + tabsClass + '" />'),
          fadetime = parseFloat(settings.fade),
          visible = { 'position': 'relative', 'float': 'left' },
          hidden = { 'position': 'absolute', 'float': 'none' };

        // Only run if there's more than one slide
        if ($this.find($slide).length > 1) {

          $slide.each(function (i) {
            // linked slide
            var link = this.getAttribute('data-link');
            if (link) {
              $(this).css({'cursor':'pointer'}).click(function(){
                location.href=link;
              });
            };

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
            'max-width': parseFloat(settings.maxwidth),
            'width': '100%',
            'overflow': 'hidden',
            'position': 'relative'
          })
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
                '<a href="#' + slideClassPrefix + n + '"' +
                'class="' + slideClassPrefix + n + '">' + n + '</a>' +
                '</li>';
            });
            $pagination.append(t);

            $this.after($pagination).find(':first-child').addClass(visibleClass);
            $('.' + slideClassPrefix + '1').parent().addClass(activeClass);

            $('.' + tabsClass + ' a').each(function (i) {
              var $el = $(this);
              $el.click(function (e) {
                e.preventDefault();
                // Prevent clicking if animated
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
