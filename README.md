# ResponsiveSlides.js 
### Simple & lightweight responsive slideshow plugin (in 1kb)


[ResponsiveSlides.js](http://responsive-slides.viljamis.com/) is a tiny jQuery plugin that creates a responsive slideshow using images inside a single container. It works with wide range of browsers including all IE versions from IE6 and up. It also adds css max-width support for IE6 and other browsers that don't natively support it. Only dependency is [jQuery](http://jquery.com/) and that all the images are same size.

Biggest difference to other responsive slideshow plugins is the file size (819 bytes minified and gzipped) + that this one doesn't try to do everything. ResponsiveSlides.js has basically only two different modes: Either it just automatically fades the images, or operates as a responsive image container with pagination to navigate/fade between slides.


Usage Instructions and demo
======

For instructions and demo go to [http://responsive-slides.viljamis.com](http://responsive-slides.viljamis.com/)


Known bugs
======

*   Firefox 2: if you have more than one auto fading slideshows on the same page page it explodes. with one auto fading slideshow per page everything works though.
*   The slideshow prevents the clicking of pagination while it's fading to the next slide so you shouldn't (at least right now) use long fade times + pagination together, as it might be confusing for the user if nothing happens when trying to change the slide.


License
======

Licensed under the MIT license.

Copyright (c) 2011-2012 Viljami Salminen, http://viljamis.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.