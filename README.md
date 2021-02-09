# ResponsiveSlides.js v1.55
### Simple & lightweight responsive slider plugin (in 1kb)


[ResponsiveSlides.js](http://responsiveslides.com/) is a tiny jQuery plugin that creates a responsive slider using elements inside a container. It has been used on sites like [Microsoft's Build 2012](http://www.buildwindows.com/launch) and [Gridset App](https://gridsetapp.com). ResponsiveSlides.js works with wide range of browsers including all IE versions from IE6 and up. It also adds CSS max-width support for IE6 and other browsers that don't natively support it. Only dependency is [jQuery](http://jquery.com/) (1.6 and up supported, tested up to 1.8.3) and that all the images are the same size.

Biggest difference to other responsive slider plugins is the file size (1.4kb minified and gzipped) + that this one doesn't try to do everything. ResponsiveSlides.js has basically only two different modes: Either it just automatically fades the images, or operates as a responsive image container with pagination and/or navigation to fade between slides.

#### Features:
 * Fully responsive
 * 1kb minified and gzipped
 * CSS3 transitions with JavaScript fallback
 * Simple markup using unordered list
 * Settings for transition and timeout durations
 * Multiple slideshows supported
 * Automatic and manual fade
 * Works in all major desktop and mobile browsers
 * Captions and other html-elements supported inside slides
 * Separate pagination and next/prev controls
 * Possibility to choose where the controls append to
 * Possibility to randomize the order of the slides
 * Possibility to use custom markup for pagination
 * Can be paused while hovering slideshow and/or controls
 * Images can be wrapped inside links
 * Optional 'before' and 'after' callbacks



Usage Instructions and demo
======

For instructions and demo go to [http://responsiveslides.com/](http://responsiveslides.com/), or [download this repository as a zip file](https://github.com/viljamis/ResponsiveSlides.js/zipball/master) and and open "index.html" from the "example" folder.

* View [additional usage examples online](http://responsiveslides.com/themes/themes.html).
* View [a demo with captions](http://responsiveslides.com/with-captions/themes.html).

Currently jQuery 1.6 and up is supported.



License
======

Licensed under the MIT license.

Copyright (c) 2011-2012 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



Changelog
======


v1.55 (2016-08-05) - Adds jQuery 3.0 compatibility (thanks to [@Requios](https://github.com/Requios)!).

v1.54 (2013-04-26) - Fixes few bugs with the before and after callbacks.

v1.53 (2013-01-14) - Minor speed optimization (thanks [@bazineta](https://github.com/bazineta)!).

v1.52 (2013-01-07) - Adds option called "manualControls" which allows to write custom markup for pager navigation (thanks to [@andyadams](https://github.com/andyadams)). "controls" option is renamed to "navContainer". Default speed of the transition is now to 500ms. Adds also webkit-backface-visibility: hidden; style for the slides to prevent some HD acceleration issues on mobile WebKit browsers.

v1.51 (2012-12-15) - Fixes a bug where pictures would not display if next button was clicked too quickly 10 times.

v1.5 (2012-12-14) - Adds CSS3 transition support with automatic jQuery fallback.

v1.32 (2012-05-09) - Fixes a bug which caused the slideshow to break in Chrome when changing between active and inactive browser tabs.

v1.31 (2012-05-02) - Easier to use callbacks (+ optional "active" class for the next/prev buttons when animating slides. If you need this functionality, open the unminified version and search for "Adds active class during slide animation" and remove comments around it).

v1.3 (2012-04-26) - Three new options: "random", "pause", "pauseControls" + small bug fixes.

v1.25 (2012-04-19) - No more flashing of unstyled slideshow before JS has loaded. Adds also better support for cases when JavaScript isn't available.

v1.24 (2012-04-12) - Changes the way slideshow works if there's only one slide. Now all classes and max-width for the container are added, but we don't show the next and prev buttons anymore as they don't make much sense in that case. This version also fixes a bug which made the 'previous' button always go to the next slide.

v1.23 (2012-03-31) - Adds new option called "controls", which allows to choose where the controls should be appended to. Includes also code optimization, bug fixes, better option names and better jQuery support (jQuery 1.4 and up is now supported).

v1.22 (2012-03-27) - Adds callback events which are similar as in [@Wilto](https://github.com/Wilto)'s [Dynamic Carousel](https://github.com/Wilto/Dynamic-Carousel/). The possibility to change the 'namespace' is also back + next/prev buttons have now classes which make more sense.

v1.21 (2012-03-23) - Added two new options: 'nextText' and 'prevText'.

v1.20 (2012-03-21) - New option called 'nav', which enables next and previous buttons. Can be used with 'pagination' and 'auto' options. Adds also new [themes folder](http://responsiveslides.com/themes/themes.html) with three different ways to use the new next and previous buttons.

v1.10 (2012-03-12) - Refactoring, New markup style, CSS is now separated from the plugin, you can have links around images and other elements inside slides (not just images, but also captions etc.) + New option called "pagination", which enables to choose both "pagination" and "auto" at the same time. Shout outs for the help to [@bgutschke](https://github.com/bgutschke)

v1.05 (2012-03-05) - No more need to change the namespace if you have more than one slideshow on the same page.

v1.04 (2011-12-19) - Fixes problems when ResponsiveSlides.js is used with other plugins

v1.03 (2011-12-12) - Code refactoring, smaller size, better performance

v1.01 (2011-12-11) - Better usage of styles and the namespace

v1.00 (2011-12-04) - Release


Want to do a pull request?
======

Great! New ideas are more than welcome, but please check the [Pull Request Guidelines](https://github.com/viljamis/ResponsiveSlides.js/wiki/Pull-Request-Guidelines) first before doing so.
