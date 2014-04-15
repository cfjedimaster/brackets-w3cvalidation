brackets-w3cvalidation
=================

A Brackets extension to enable W3C validation support. To install, place in your ```brackets/src/extensions/user``` folder.
When installed, you can enable W3CValidation by clicking 'Enable W3CValidation' in your View menu.

Issues/Updates
=====
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
