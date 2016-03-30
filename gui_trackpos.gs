* This script returns the current position of a track
* as well as the center of the gridbox nearest to this
* position.  First, the desired date is verified in the
* event that the track file employs a different temporal
* index than the gridded file - RD January, April 2000.

function trkpos(args)

* get the track names

filenum = subwrd(args,1)
latname = subwrd(args,2)
lonname = subwrd(args,3)

* query file for dimensions of current viewing domain

"q dims"
rec = sublin(result,5)
if (subwrd(rec,3) = "varying")
  tmin = subwrd(rec,11)
  tmax = subwrd(rec,13)
  tvar = "varying"
else
  tval = subwrd(rec,9)
  tvar = "fixed"
endif

rec = sublin(result,4)
if (subwrd(rec,3) = "varying")
  zmin = subwrd(rec,11)
  zmax = subwrd(rec,13)
  zvar = "varying"
else
  zval = subwrd(rec,9)
  zvar = "fixed"
endif

rec = sublin(result,3)
if (subwrd(rec,3) = "varying")
  ymin = subwrd(rec,11)
  ymax = subwrd(rec,13)
  yvar = "varying"
else
  yval = subwrd(rec,9)
  yvar = "fixed"
endif

rec = sublin(result,2)
if (subwrd(rec,3) = "varying")
  xmin = subwrd(rec,11)
  xmax = subwrd(rec,13)
  xvar = "varying"
else
  xval = subwrd(rec,9)
  xvar = "fixed"
endif

* get the current track position

"set dfile "filenum
"set z 1"
"set y 1"
"set x 1"

"d "latname
reallat = subwrd(result,4)
"d "lonname
reallon = subwrd(result,4)

* get the corresponding nearest position on the grid

"set dfile 1"
"set lat "reallat
"set lon "reallon
"q dims"
rec = sublin(result,3)
gridlat = subwrd(rec,6)
rec = sublin(result,2)
gridlon = subwrd(rec,6)

* reset the original viewing domain

if (tvar = "varying")
  "set t "tmin" "tmax
else
  "set t "tval
endif
if (zvar = "varying")
  "set z "zmin" "zmax
else
  "set z "zval
endif
if (yvar = "varying")
  "set y "ymin" "ymax
else
  "set y "yval
endif
if (xvar = "varying")
  "set x "xmin" "xmax
else
  "set x "xval
endif

* and return the desired positions

return(reallat" "reallon" "gridlat" "gridlon)
