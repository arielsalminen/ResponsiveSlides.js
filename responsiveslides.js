/*! ResponsiveSlides.js v1.10. Authors & copyright (c) 2011-2012 Viljami Salminen & Bastian Gutschke. MIT License. http://responsive-slides.viljamis.com */
(function ($, window, i) {

  $.fn.responsiveSlides = function (options) {

    // Merge default settings with optional arguments
    var settings = $.extend({
      "auto": true,
      "fade": 1000,
      "maxwidth": "none",
      "speed": 4000
    }, options);

    return this.each(function () {

      // Index, which is used for namespacing
      i++;

      var $this = $(this);

      var $slide = $this.children(),
        $img = $("img", this),
        index = 0,
        length = $slide.size(),
        namespace = "rslides" + i,
        activeClass = namespace + "_here",
        visibleClass = namespace + '_on',
        slideClassPrefix = namespace + "_s",
        tabsClass = namespace + "_tabs",
        $pagination = $("<ul class=\"" + tabsClass + "\" />"),
        visible = {"float": "left", "position": "relative"},
        hidden = {"float": "none", "position": "absolute"};

      // Fading animation
      var slideTo = function (idx) {

        $slide
          .stop()
          .fadeOut(settings.fade, function () {
            $(this)
              .removeClass(visibleClass)
              .css(hidden);
          })
          .eq(idx)
          .fadeIn(settings.fade, function () {
            $(this)
              .addClass(visibleClass)
              .css(visible);
            index = idx;
          });
      };

      // Only run if there's more than one slide
      if ($slide.size() > 1) {

        // Add ID's to each slide
        $slide.each(function (i) {
          this.id = slideClassPrefix + i;
        });

        // Add max-width
        $this.css({
          "max-width": settings.maxwidth
        });

        // Hide all slides, then show first one
        $slide
          .hide()
          .eq(0)
          .css(visible)
          .show();

        // Auto: true
        if (settings.auto === true) {

          // Rotate slides automatically
          setInterval(function () {
            var idx = index + 1 < length ? index + 1 : 0;
            slideTo(idx);
          }, settings.speed);

        }

        // Auto: false
        else {

          // Build pagination
          var tabMarkup = []
          $slide.each(function (i) {
            var n = i + 1;

            tabMarkup.push("<li>");
            tabMarkup.push("<a href=\"#" + slideClassPrefix + n + "\" ");
            tabMarkup.push("class=\"" + slideClassPrefix + n + "\">" + n + "</a>");
            tabMarkup.push("</li>");
          });
          $pagination.append(tabMarkup.join(""));

          var $tabs = $pagination.find("a");

          // Click/touch event handler
          $tabs.on("ontouchstart" in window ? "touchstart" : "click", function (e) {
              e.preventDefault();

              // Prevent click/touch if animated
              if ($('.' + visibleClass + ':animated').length) {
                return false;
              }

              // Get index of clicked tab
              var idx = $tabs.index(this);

              // Break if element is already active
              if (index === idx) {
                return;
              }

              // Remove active state from old tab and set new one
              $tabs
                .closest("li")
                .removeClass(activeClass)
                .eq(idx)
                .addClass(activeClass);

              // Do the animation
              slideTo(idx);
            })
            .eq(0)
            .closest("li")
            .addClass(activeClass);

          // Inject pagination
          $this.after($pagination);
        }
      }

      // Add fallback if CSS max-width isn't supported and maxwidth is set
      if (typeof document.body.style.maxWidth === "undefined" && options && options.maxwidth) {

        var widthSupport = function () {

          $this.css("width", "100%");

          if ($this.width() > settings.maxwidth) {
            $this.css("width", settings.maxwidth);
          }
        };

        // Init fallback
        widthSupport();

        // + Bind on window resize
        $(window).on("resize", function () {
          widthSupport();
        });

      }

    });

  };

})(jQuery, this, 0);