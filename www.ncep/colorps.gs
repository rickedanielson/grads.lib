
*     colorps.gs takes the current image and saves it in /tmp/meta.ps as a color
*     postscript file. This script is easily modified for DOS and/or to print the
*     resulting postscript file.

* script to make a color postscript file
* and print it on ph200i
'enable print /tmp/meta.tmp'
'print'
'disable print'
'! gxps -rc -i /tmp/meta.tmp -o /tmp/meta.tmp.psx'
'! /usr/local/lib/grads/postfix /tmp/meta.tmp.psx /tmp/meta.ps'
'! rm /tmp/meta.tmp.psx'
