/*! http://responsive-slides.viljamis.com v1.23 by @viljamis */
(function ($, window, i) {
  $.fn.responsiveSlides = function (options) {

    // Default settings
    var settings = $.extend({
      "auto": true,             // Boolean: Animate automatically, true or false
      "speed": 1000,            // Integer: Speed of the transition, in milliseconds
      "timeout": 4000,          // Integer: Time between slide transitions, in milliseconds
      "pager": false,           // Boolean: Show pager, true or false
      "nav": false,             // Boolean: Show navigation, true or false
      "prev": "Previous",       // String: Text for the "previous" button
      "next": "Next",           // String: Text for the "next" button
      "maxwidth": "none",       // Integer: Max-width of the slideshow, in pixels
      "namespace": "rslides"    // String: change the default namespace
    }, options);

    return this.each(function () {

      // Index for namespacing
      i++;

      var $this = $(this);

      var index = 0,
        $slide = $this.children(),
        length = $slide.size(),
        fadetime = parseFloat(settings.speed),

        // Namespacing
        namespace = settings.namespace,
        namespaceIdx = namespace + i,

        // Classes
        namespaceIdxClass = namespace + " " + namespaceIdx,
        navClass = namespace + "_nav " + namespaceIdx + "_nav",
        activeClass = namespace + "_here",
        visibleClass = namespaceIdx + "_on",
        slideClassPrefix = namespaceIdx + "_s",
        tabsClass = namespaceIdx + "_tabs",

        // Pager
        $pager = $("<ul class='" + namespace + "_tabs " + tabsClass + "' />"),

        // Styles for visible and hidden slides
        visible = {"float": "left", "position": "relative"},
        hidden = {"float": "none", "position": "absolute"},

        // Only for minification
        settingsPager = settings.pager,
        settingsMaxwidth = settings.maxwidth;

      // Fading animation
      var slideTo = function (idx) {
        $this.trigger(namespace + "-before");
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
              .css(visible)
              .trigger(namespace + "-after");
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
          .css("max-width", settingsMaxwidth)
          .addClass(namespaceIdxClass);

        // Hide all slides, then show first one + add visible class
        $slide
          .hide()
          .eq(0)
          .addClass(visibleClass)
          .css(visible)
          .show();

        // Pager
        if (settingsPager === true) {
          var tabMarkup = [];
          $slide.each(function (i) {
            var n = i + 1;
            tabMarkup +=
              "<li>" +
              "<a href='#' class='" + slideClassPrefix + n + "'>" + n + "</a>" +
              "</li>";
          });
          $pager.append(tabMarkup);

          var $tabs = $pager.find("a");

          // Inject pager
          $this.after($pager);

          // Select pager item
          var selectTab = function (idx) {
            $tabs
              .closest("li")
              .removeClass(activeClass)
              .eq(idx)
              .addClass(activeClass);
          };
        }

        // Auto cycle
        if (settings.auto === true) {
          var startCycle, rotate;

          startCycle = function () {
            rotate = setInterval(function () {
              var idx = index + 1 < length ? index + 1 : 0;

              // Remove active state and set new if pager = "true"
              if (settingsPager === true) {
                selectTab(idx);
              }

              slideTo(idx);
            }, parseFloat(settings.timeout));
          };

          // Init cycle
          startCycle();
        }

        // Restarting cycle
        var restartCycle = function () {
          if (settings.auto === true) {
            // Stop
            clearInterval(rotate);
            // Restart
            startCycle();
          }
        };

        // Prevent clicking if currently animated
        var preventClick = function (event) {
          if ($("." + visibleClass + ":animated").length) {
            event.preventDefault();
          }
        };

        // Pager click event handler
        if (settingsPager === true) {
          $tabs.on("click", function (event) {
            event.preventDefault();
            preventClick();
            restartCycle();

            // Get index of clicked tab
            var idx = $tabs.index(this);

            // Break if element is already active
            if (index === idx) {
              return;
            }

            // Remove active state from old tab and set new one
            selectTab(idx);

            // Do the animation
            slideTo(idx);
          })
            .eq(0)
            .closest("li")
            .addClass(activeClass);
        }

      }

      // Navigation
      if (settings.nav === true) {
        var navMarkup =
          "<a href='#' class='" + navClass + " prev'>" + settings.prev + "</a>" +
          "<a href='#' class='" + navClass + " next'>" + settings.next + "</a>";
        $this.after(navMarkup);

        var $trigger = $("." + namespaceIdx + "_nav"),
          $prev = $("." + namespaceIdx + "_nav.prev"),
          $next = $("." + namespaceIdx + "_nav.next");

        // Click event handler
        $trigger.on("click", function (event) {
          event.preventDefault();
          preventClick();

          // Determine where to slide
          var idx = $slide.index($("." + visibleClass)),
            prevIdx = idx - 1,
            nextIdx = idx + 1 < length ? index + 1 : 0;

          // Go to slide
          slideTo($(this) === $prev ? prevIdx : nextIdx);
          if (settingsPager === true) {
            selectTab($(this) === $prev ? prevIdx : nextIdx);
          }

          restartCycle();
        });
      }

      // Max-width fallback
      if (typeof document.body.style.maxWidth === "undefined" && options && options.maxwidth) {
        var widthSupport = function () {
          $this.css("width", "100%");
          if ($this.width() > settingsMaxwidth) {
            $this.css("width", settingsMaxwidth);
          }
        };

        // Init fallback
        widthSupport();
        $(window).on("resize", function () {
          widthSupport();
        });
      }

    });

  };
})(jQuery, this, 0);
