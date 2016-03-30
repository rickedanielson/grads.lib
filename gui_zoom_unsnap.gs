* This script zooms in on the location defined by two mouse
* clicks, upper left and lower right.  If the position of both
* is the same then the full domain is restored - RD July 1998,
* added snap to the grid - RD October 1999.  The catch is that
* reference should be made to the last file open, so this is
* how the position is obtained - RD November 2000.

function zoom()

* find the last file open and use it as the default

loop = 1
"q files"
message = sublin(result,loop)
while (message != "")
  message = sublin(result,loop)
  if (subwrd(message,1) = "File")
    filenumb = subwrd(message,2)
  endif
  loop = loop + 1
endwhile
"set dfile "filenumb

* query file for dimensions of current viewing domain

"c events"
"q pos"
rec = sublin(result,1)
x = subwrd(rec,3)
y = subwrd(rec,4)
"q xy2w "x" "y
rec = sublin(result,1)
lonmin = subwrd(rec,3)
latmax = subwrd(rec,6)

"q pos"
rec = sublin(result,1)
x = subwrd(rec,3)
y = subwrd(rec,4)
"q xy2w "x" "y
rec = sublin(result,1)
lonmax = subwrd(rec,3)
latmin = subwrd(rec,6)

if (lonmin = lonmax & latmin = latmax)
  "c"
  "q file"
  rec = sublin(result,5)
  if (subwrd(rec,1) = "Tsize")
    say "Detected a Station Data file..."
    "set lat -90 90"
    "set lon 0 360"
  else
    xmin = 1
    xmax = subwrd(rec,3)
    ymin = 1
    ymax = subwrd(rec,6)
    "set x "xmin" "xmax
    "set y "ymin" "ymax
  endif
  "set dfile 1"
  "run gui_disp"
else
  "set lon "lonmin" "lonmax
  "set lat "latmin" "latmax

  "q w2xy "lonmin" "latmax
  rec = sublin(result,1)
  x1 = subwrd(rec,3)
  y1 = subwrd(rec,6)
  "q w2xy "lonmax" "latmin
  rec = sublin(result,1)
  x2 = subwrd(rec,3)
  y2 = subwrd(rec,6)

  say lonmin" "latmax
  say lonmax" "latmin
  say x1" "y1
  say x2" "y2

  "set line 8 1 8"
  "draw line "x1" "y1" "x2" "y1
  "draw line "x2" "y1" "x2" "y2
  "draw line "x2" "y2" "x1" "y2
  "draw line "x1" "y2" "x1" "y1
  "set dfile 1"
endif
