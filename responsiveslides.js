/*! http://responsive-slides.viljamis.com v1.10 by @viljamis */
(function ($, window, i) {
  $.fn.responsiveSlides = function (options) {

    // Default settings
    var settings = $.extend({
      "auto": true, // Boolean: Animate automatically
      "pagination": false, // Boolean: Use pagination
      "fade": 1000, // Integer: Crossfade time, in milliseconds
      "maxwidth": "none", // Integer: Max-width of the Slideshow, in pixels
      "speed": 4000 // Integer: How long image shows before fading to next, in milliseconds
    }, options);

    return this.each(function () {

      // Index which is used for namespacing
      i++;

      var $this = $(this);

      var index = 0,
        $slide = $this.children(),
        length = $slide.size(),
        fadetime = parseFloat(settings.fade),

        // Namespacing
        namespace = "rslides",
        namespaceIndex = namespace + i,

        // Classes
        namespaceIndexClass = namespace + " " + namespaceIndex,
        activeClass = namespace + "_here",
        visibleClass = namespaceIndex + "_on",
        slideClassPrefix = namespaceIndex + "_s",
        tabsClass = namespaceIndex + "_tabs",

        // Pagination
        $pagination = $("<ul class=\"" + namespace + "_tabs " + tabsClass + "\" />"),

        // Styles for visible and hidden slides
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

        // Hide all slides, then show first one + add visible
        // class for that one. Later we are using that same
        // class to check if it's currently :animated
        $slide
          .hide()
          .eq(0)
          .addClass(visibleClass)
          .css(visible)
          .show();

        // Build pagination
        if (settings.pagination === true) {
          var tabMarkup = [];
          $slide.each(function (i) {
            var n = i + 1;

            tabMarkup.push("<li>");
            tabMarkup.push("<a href=\"#\" class=\"" + slideClassPrefix + n + "\">" + n + "</a>");
            tabMarkup.push("</li>");
          });
          $pagination.append(tabMarkup.join(""));

          var $tabs = $pagination.find("a");

          // Inject pagination
          $this.after($pagination);
        }

        // Auto rotation
        if (settings.auto === true) {

          var startCycle, rotate;

          // Rotate slides automatically
          startCycle = function () {
            rotate = setInterval(function () {
              var idx = index + 1 < length ? index + 1 : 0;

              // Only remove active state from old tab and set
              // to new one if we have pagination set to "true"
              if (settings.pagination === true) {
                $tabs
                  .closest("li")
                  .removeClass(activeClass)
                  .eq(idx)
                  .addClass(activeClass);
              }

              slideTo(idx);
            }, parseFloat(settings.speed));
          };

          // Init rotation
          startCycle();
        }

        // Click/touch event handler
        if (settings.pagination === true) {
          $tabs.on("ontouchstart" in window ? "touchstart" : "click", function (e) {
            e.preventDefault();

            if (settings.auto === true) {
              // Stop auto rotation
              clearInterval(rotate);
              // ...Restart it
              startCycle();
            }

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
        }

      }

      // Add fallback if max-width isn't supported and settings "maxwidth" is set
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