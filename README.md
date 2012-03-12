# ResponsiveSlides.js 
### Simple & lightweight responsive slideshow plugin (in 1kb)



[ResponsiveSlides.js](http://responsive-slides.viljamis.com/) is a tiny jQuery plugin that creates a responsive slideshow using images inside &lt;ul>. It works with wide range of browsers including all IE versions from IE6 and up. It also adds css max-width support for IE6 and other browsers that don't natively support it. Only dependency is [jQuery](http://jquery.com/) and that all the images are same size.

Biggest difference to other responsive slideshow plugins is the file size (805 bytes minified and gzipped) + that this one doesn't try to do everything. ResponsiveSlides.js has basically only two different modes: Either it just automatically fades the images, or operates as a responsive image container with pagination to navigate/fade between slides.



Usage Instructions and demo
======

For instructions and demo go to [http://responsive-slides.viljamis.com](http://responsive-slides.viljamis.com/)

...or [download this repository as a zip file](https://github.com/viljamis/ResponsiveSlides.js/zipball/master) and and open "index.html" from the "example" folder.

Currently only jQuery 1.7+ is supported.



License
======

Licensed under the MIT license.

Copyright (c) 2011-2012 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



Changelog
======

v1.10 (2012-03-12) - Refactoring, New markup style, CSS is now separated from the plugin, you can have links around images + New option called "pagination", which enables to choose both "pagination" and "auto" at the same time. Shout outs for the help to [@bgutschke](https://github.com/bgutschke)

v1.06 (2012-03-06) - Using touch events instead of click on touch screen.

v1.05 (2012-03-05) - No more need to change the namespace if you have more than one slideshow on the same page.

v1.04 (2011-12-19) - Fixes problems when ResponsiveSlides.js is used with other plugins

v1.03 (2011-12-12) - Code refactoring, smaller size, better performance

v1.01 (2011-12-11) - Better usage of styles and the namespace

v1.00 (2011-12-04) - Release