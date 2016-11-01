README FIRST
===============

As of November 1, 2016, I've decided to remove my extension from the Brackets registry. Multiple users have found themselves banned from the w3c API because Brackets, for whatever reason, sends a large number of API requests. I was never able to figure out why. It could be my fault, it could be Brackets' fault. As I don't use, or recommend, Brackets anymore, I'm not really working on this extension. If someone wants to take a stab at fixing it, be my guest.


brackets-w3cvalidation
=================

A Brackets extension to enable W3C validation support. To use this extension, 
open any HTML file and then check the bottom right corner of Brackets 
(where all files are checked) and look for either the green icon (all is well)
or the yellow warning sign (issues). Clicking the icon will open a panel with
the current issues.

Issues/Updates
=====

[7/1/15] It now hides the two default messages that are just noise. Warning - while testing a week or so ago, I was able to trip a security block on the w3 site that stopped all requests from my IP. I don't know exactly how it happened (there aren't any loops that could hit the API multiple times), but *something* caused it to throw a flag. I've investigated using the Jar locally, which would require doing the whole Brackets/Node thing, but I'm not sure that makes sense.

[6/20/15] New new service API.
[6/8/15] New service API.

[5/11/15] Chinese translation by https://github.com/lclzd.

[4/24/2015] Update strings

[4/23/2015] Update keywords

[10/9/2014] update package.json PR by @Denisov21

[10/9/2014] Japanese translation by lclzd

[10/3/2014] German translation by danielkratz

[9/9/2014] Two big updates by Denisov21. First, F9 can fire a re-scan. And then he added an 
Italian language file. Go Italy!

[8/28/2014] Added a submenu (under "Edit") to update the W3C validation (fixed bug when connection lost). Credit goes to valx76 (https://github.com/cfjedimaster/brackets-w3cvalidation/pull/16)

[5/19/2014] Removed an annoying console message.

[4/15/2014] Requires Brackets Sprint 38. Supports sexy new async linting.

[2/23/2014] Fix bug 9 and another few things. Note that zebra striping isn't working anymore, but in theory, Sprint 37 will allow me to switch to the built in linting API and I won't have to care.

[10/3/2013] Fix bug where the close icon wasn't working. There is a new bug though - links in the results
open a small window AND a Chrome tab.

[5/24/2013] Set version to 2, added package.json support.

[4/21/2013] Remove links in explanation that just point to the 'add' function. Make links open in new window.

[11/12/2012] Update code to properly insert the content over the status bar. Also made it resizable.  

[9/26/2012] Fixes some display issues.

Currently it is performing a HTTP request on file edits. Not sure I like that.

Credit
=====
As with the other extensions I built, it is heavily based on the work of [Jonathan Rowny](http://www.jonathanrowny.com/). 
