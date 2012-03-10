/*! ResponsiveSlides.js v1.10. (c) 2011-2012 Viljami Salminen & Bastian Gutschke. MIT License. http://responsive-slides.viljamis.com */
(function ($, window, i) {

  $.fn.responsiveSlides = function (options) {

    // Default settings
    var settings = $.extend({
      "auto": true,
      "fade": 1000,
      "maxwidth": "none",
      "speed": 4000
    }, options);

    return this.each(function () {

      // Index which is used for namespacing
      i++;

      var $this = $(this);

      var index = 0,
        $slide = $this.children(),
        $img = $("img", this),
        length = $slide.size(),
        namespace = "rslides",
        namespaceIndex = namespace + i,
        namespaceIndexClass = namespace + " " + namespaceIndex,
        activeClass = namespace + "_here",
        visibleClass = namespaceIndex + "_on",
        slideClassPrefix = namespaceIndex + "_s",
        tabsClass = namespaceIndex + "_tabs",
        fadetime = parseFloat(settings.fade),
        $pagination = $("<ul class=\"" + namespace + "_tabs " + tabsClass + "\" />"),
        visible = {"float": "left", "position": "relative"},
        hidden = {"float": "none", "position": "absolute"};

      // Fading animation
      var slideTo = function (idx) {

        $slide
          .stop()
          .fadeOut(fadetime, function () {
            $(this)
              .removeClass(visibleClass)
              .css(hidden);
          })
          .eq(idx)
          .fadeIn(fadetime, function () {
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

        // Add max-width and classes
        $this
          .css("max-width", settings.maxwidth)
          .addClass(namespaceIndexClass);

        // Hide all slides, then show first one
        $slide
          .hide()
          .eq(0)
          .addClass(visibleClass)
          .css(visible)
          .show();

        // Auto: true
        if (settings.auto === true) {

          // Rotate slides automatically
          setInterval(function () {
            var idx = index + 1 < length ? index + 1 : 0;
            slideTo(idx);
          }, parseFloat(settings.speed));

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

              // Get index of clicked tab
              var idx = $tabs.index(this);

              // Break if element is already active
              if (index === idx) {
                return;
              }

              // Prevent click/touch if currently animated,
              // otherwise if someone is using very long fade
              // This'll break when changing a slide at the same time
              if ($("." + visibleClass + ":animated").length) {
                return false;
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