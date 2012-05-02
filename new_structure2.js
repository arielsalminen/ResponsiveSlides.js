/*! ResponsiveSlides.js v2XX
 * http://responsiveslides.com
 * http://viljamis.com
 *
 * Copyright (c) 2011-2012 @viljamis
 * Available under the MIT license
 *
 * Do not use this, not a working version yet!
 */

/*jslint browser: true, sloppy: true, vars: true, plusplus: true, indent: 2 */

;(function ($, window) {

  var selectTab, startCycle, restartCycle, rotate, $tabs;
  var instance = 0;
  var index = 0;

  var visibleStyles = {"float": "left", "position": "relative"},
    hiddenStyles = {"float": "none", "position": "absolute"};

  // Plugin constructor
  var ResponsiveSlides = function (element, options) {
      instance++;
      this.el = element;
      this.$el = $(element);
      this.options = options;
    };

  // Plugin prototype
  ResponsiveSlides.prototype = {

    defaults : {
      auto: true,               // Boolean: Animate automatically, true or false
      speed: 1000,              // Integer: Speed of the transition, in milliseconds
      timeout: 4000,            // Integer: Time between slide transitions, in milliseconds
      pager: false,             // Boolean: Show pager, true or false
      nav: false,               // Boolean: Show navigation, true or false
      random: false,            // Boolean: Randomize the order of the slides, true or false
      pause: false,             // Boolean: Pause on hover, true or false
      pauseControls: false,     // Boolean: Pause when hovering controls, true or false
      prevText: "Previous",     // String: Text for the "previous" button
      nextText: "Next",         // String: Text for the "next" button
      maxwidth: "",             // Integer: Max-width of the slideshow, in pixels
      controls: "",             // Selector: Where controls should be appended to, default is after the <ul>
      namespace: "rslides",     // String: Change the default namespace used
      before: function () {},   // Function: Before callback
      after: function () {}     // Function: After callback
    },

    _init : function () {
      this.config = $.extend({}, this.defaults, this.options);
      this._create();
      this._widthSupport();
      return this;
    },

    _create : function () {
      var slider = this,
        config = this.config,
        $slide = this.$el.children(),
        namespaceIdx = config.namespace + instance,
        $pager = $("<ul class='" + config.namespace + "_tabs' />");

      // Random order
      if (config.random) {
        $slide.sort(function () {
          return (Math.round(Math.random()) - 0.5);
        });
        this.$el
          .empty()
          .append($slide);
      }

      // Add ID's to each slide
      $slide.each(function (i) {
        this.id = config.namespace + "_s" + i;
      });

      // Add max-width and classes
      this.$el.addClass(config.namespace + " " + namespaceIdx);
      if (config.maxwidth) {
        this.$el.css("max-width", config.maxwidth);
      }

      // Hide all slides, then show first one
      $slide
        .hide()
        .eq(0)
        .addClass(namespaceIdx + "_on")
        .css(visibleStyles)
        .show();

      // Only run if there's more than one slide
      // and if timeout is at least 100ms longer than the fade
      if( $slide.length <= 1 || config.timeout < config.speed + 100) {
        return;
      }

      // Pager
      if (config.pager) {
        var tabMarkup = [];
        $slide.each(function (i) {
          var n = i + 1;
          tabMarkup +=
            "<li>" +
            "<a href='#' class='" + config.namespace + "_s" + n + "'>" + n + "</a>" +
            "</li>";
        });
        $pager.append(tabMarkup);

        $tabs = $pager.find("a");

        // Inject pager
        if (config.controls) {
          $(config.controls).append($pager);
        } else {
          this.$el.after($pager);
        }
      }

      // Auto cycle
      if (config.auto) {
        this.startCycle();
      }

      // Restarting cycle
      restartCycle = function () {
        if (config.auto) {
          // Stop
          clearInterval(rotate);
          // Restart
          slider.startCycle();
        }
      };

      // Pause on hover
      if (config.pause) {
        this.$el.hover(function () {
          clearInterval(rotate);
        }, function () {
          restartCycle();
        });
      }

      // Pager click event handler
      if (config.pager) {
        $tabs.bind("click", function (e) {
          e.preventDefault();

          if (!config.pauseControls) {
            restartCycle();
          }

          // Get index of clicked tab
          var idx = $tabs.index(this);

          // Break if element is already active or currently animated
          if (index === idx || $("." + namespaceIdx + "_on:animated").length) {
            return;
          }

          // Remove active state from old tab and set new one
          slider.selectTab(idx);

          // Do the animation
          slider.slideTo(idx);
        })
          .eq(0)
          .closest("li")
          .addClass(config.namespace + "_here");

        // Pause when hovering pager
        if (config.pauseControls) {
          $tabs.hover(function () {
            clearInterval(rotate);
          }, function () {
            restartCycle();
          });
        }
      }

      // Navigation
      if (config.nav) {
        var navMarkup =
          "<a href='#' class='" + config.namespace + "_nav prev'>" + config.prevText + "</a>" +
          "<a href='#' class='" + config.namespace + "_nav next'>" + config.nextText + "</a>";

        // Inject navigation
        if (config.controls) {
          $(config.controls).append(navMarkup);
        } else {
          this.$el.after(navMarkup);
        }

        var $trigger = $("." + config.namespace + "_nav"),
          $prev = $("." + config.namespace + "_nav.prev");

        // Click event handler
        $trigger.bind("click", function (e) {
          e.preventDefault();

          // Prevent clicking if currently animated
          if ($("." + namespaceIdx + "_on:animated").length) {
            return;
          }

          // Go to slide
          if ($(this).hasClass("prev")) {
            slider.prevSlide();
          } else {
            slider.nextSlide();
          }

          if (config.pager) {
            var idx = $slide.index($("." + namespaceIdx + "_on")),
              nextIdx = idx + 1 < $slide.size() ? index + 1 : 0;
              prevIdx = idx - 1;

            slider.selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx);
          }

          if (!config.pauseControls) {
            restartCycle();
          }
        });

        // Pause when hovering navigation
        if (config.pauseControls) {
          $trigger.hover(function () {
            clearInterval(rotate);
          }, function () {
            restartCycle();
          });
        }
      }
    },

    _widthSupport : function () {
      var config = this.config,
        $this = this.$el;

      if (typeof document.body.style.maxWidth === "undefined" && config.maxwidth) {
        var widthSupport = function () {
          $this.css("width", "100%");
          if ($this.width() > config.maxwidth) {
            $this.css("width", config.maxwidth);
          }
        };

        // Init fallback
        widthSupport();
        $(window).bind("resize", function () {
          widthSupport();
        });
      }
    },

    startCycle : function () {
      var slider = this,
        config = this.config,
        $slide = this.$el.children();

      rotate = setInterval(function () {
        var idx = index + 1 < $slide.size() ? index + 1 : 0;

        // Remove active state and set new if pager is set
        if (config.pager) {
          slider.selectTab(idx);
        }

        slider.slideTo(idx);
      }, config.timeout);
    },

    slideTo : function (idx) {
      var config = this.config,
        namespaceIdx = config.namespace + instance;

      config.before();
      this.$el.children()
        .stop()
        .fadeOut(config.speed, function () {
          $(this)
            .removeClass(namespaceIdx + "_on")
            .css(hiddenStyles);
        })
        .eq(idx)
        .fadeIn(config.speed, function () {
          $(this)
            .addClass(namespaceIdx + "_on")
            .css(visibleStyles);
          config.after();
          index = idx;
        });
    },

    selectTab : function (idx) {
      $tabs
        .closest("li")
        .removeClass(this.config.namespace + "_here")
        .eq(idx)
        .addClass(this.config.namespace + "_here");
    },

    nextSlide : function () {
      var $slide = this.$el.children(),
        idx = $slide.index($("." + this.config.namespace + instance + "_on")),
        nextIdx = idx + 1 < $slide.size() ? index + 1 : 0;
      this.slideTo(nextIdx);
    },

    prevSlide : function () {
      var idx = this.$el.children().index($("." + this.config.namespace + instance + "_on")),
        prevIdx = idx - 1;
      this.slideTo(prevIdx);
    },

    alert : function () {
      alert("alert");
    }

  };

  ResponsiveSlides.defaults = ResponsiveSlides.prototype.defaults;

  $.fn.responsiveSlides = function (options) {
    // Method calling logic
    if (typeof options === "string") {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        return ResponsiveSlides.prototype[options].apply(this, args);
      });
    } else {
      return this.each(function () {
        new ResponsiveSlides(this, options)._init();
      });
    }
  };

})(jQuery, window);
