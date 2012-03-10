/*! ResponsiveSlides.js v1.07. (c) 2011 Viljami Salminen. MIT License. http://responsive-slides.viljamis.com */
(function($, window, i) {

	$.fn.responsiveSlides = function( options ) {

		// Merge default settings with optional arguments
		var settings = $.extend({
			"auto": true,
			"fade": 1000,
			"maxwidth": "none",
			"speed": 4000
		}, options);

		return this.each( function () {

			// increment i, which is used for namespacing
			i++;

			// save handle for the slideshow
			var $this = $( this );

			var $slide = $this.children(),
				$img = $( "img", this ),

				namespace = "rslides" + i,

				activeClass = namespace + "_here",
				slideClassPrefix = namespace + "_s",

				tabsClass = namespace + "_tabs",
				$pagination = $( "<ul class=\"" + tabsClass + "\" />" ),

				visible = {"float": "left", "position": "relative"},
				hidden = {"float": "none", "position": "absolute"},

				// start index and number of slides
				index = 0,
				length = $slide.size();
				
			// animations
			var slideTo = function( idx ) {

				$slide
					.stop()
					.fadeOut( settings.fade, function() {
						$( this ).css( hidden );
					})
					.eq( idx )
					.fadeIn( settings.fade, function() {
						$( this ).css( visible );
						index = idx;
					});
			};

			// Only run if there's more than one slide
			if ( $slide.size() > 1 ) {

				// add ids to each slide
				$slide.each( function ( i ) {
					this.id = slideClassPrefix + i;
				});

				// add css to the slideshow
				$this.css({
					"max-width": settings.maxwidth
				});

				// hide all slides, then show first one
				$slide
					.hide()
					.eq( 0 )
					.css( visible )
					.show();

				// Auto: true
				if ( settings.auto === true ) {

					// rotate slides automatically
					setInterval( function () {
						var idx = index + 1 < length ? index + 1 : 0;
						slideTo( idx );
					}, settings.speed );

				}
				// Auto: false
				else {

					// build pagination
					var tabMarkup = [];
					$slide.each( function( i ) {
						var n = i + 1;

						tabMarkup.push( "<li>" );
						tabMarkup.push( "<a href=\"#" + slideClassPrefix + n + "\" " );
						tabMarkup.push( "class=\"" + slideClassPrefix + n + "\">" + n + "</a>" );
						tabMarkup.push( "</li>" );
					});
					$pagination.append( tabMarkup.join("") );

					var $tabs = $pagination.find( "a" );

					// add click/touch event handler and set first tab active
					$tabs.on( "ontouchstart" in window ? "touchstart" : "click", function( e ) {
							e.preventDefault();

							// get index of clicked tab
							var idx = $tabs.index( this );

							// break here if element is already active
							if( index === idx ) {
								return;
							}

							// remove active state from old tab and set new one
							$tabs
								.closest( "li" )
								.removeClass( activeClass )
								.eq( idx )
								.addClass( activeClass );

							// do the animation
							slideTo( idx );
						})
						.eq( 0 )
						.closest( "li" )
						.addClass( activeClass );

					// inject pagination
					$this.after( $pagination );
				}
			}

			
			// only add fallback if maxwidth isn't supported and maxwidth is set
			if ( typeof document.body.style.maxWidth === "undefined" && options && options.maxwidth ) {
				
				// Fallback to make IE6 support CSS max-width
				var widthSupport = function() {
				
					$this.css( "width", "100%" );
					
					if ( $this.width() > settings.maxwidth ) {
						$this.css( "width", settings.maxwidth );
					}
				};
				widthSupport();
				// bind on window resize
				$( window ).on( "resize", function () {
					widthSupport();
				});

			}

		});
	};

})(jQuery, this, 0);
