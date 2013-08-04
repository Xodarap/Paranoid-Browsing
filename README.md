Paranoid-Browsing
=================

Many organizations attempt to build a profile of you based on your browsing history. Paranoid Browsing confuses that effort by browsing the internet randomly in the background.

PB currently browses the "standard American" set of web pages, but you can easily modify this to look at ponies, go carts or whatever else you want profilers to think you're interested in. 

Note: Since Paranoid Browsing clicks on links randomly, you will get a lot of pop-ups. I recommend having a dedicated window for PB.

**Tech Overview**

PB follows the standard Chrome extension paradigm. Event.js is the "master" script, which manages the tab. Content.js is responsible for randomly clicking within loaded webpages. Options.js/html is where the options are set.