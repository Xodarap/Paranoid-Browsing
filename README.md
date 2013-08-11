Paranoid-Browsing
=================

Many organizations attempt to build a profile of you based on your browsing history. Paranoid Browsing confuses that effort by browsing the internet randomly in the background.

PB currently browses the "standard American" set of web pages, but you can easily modify this to look at ponies, go carts or whatever else you want profilers to think you're interested in. 

Note: Since Paranoid Browsing clicks on links randomly, you will get a lot of pop-ups. I recommend having a dedicated window for PB.

**Tech Overview**

PB follows the standard Chrome extension paradigm. Event.js is the "master" script, which manages the tab. Content.js is responsible for randomly clicking within loaded webpages. Options.js/html is where the options are set.

**License**
Copyright (C) 2013

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.