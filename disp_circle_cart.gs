* This script draws a circle of constant distance from
* the central point - RD June 2001.

function circle(args)

* get the track names

cenlat = subwrd(args,1)
cenlon = subwrd(args,2)
radius = subwrd(args,3)
pattern = subwrd(args,4)

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

"set z 1"
"set lat 45"
"set lon 180"

EARTH = 6.371e3
D2R   = 3.141592654 / 180.0
DELTA = 10

a = 1
deg = 0
while (deg <= 360)
  "define dellat = "radius" * sin("deg"*"D2R") / "EARTH" / "D2R
  "d dellat"
  dellat = subwrd(result,4)
  "define dellon = "radius" * cos("deg"*"D2R") / "EARTH" / "D2R
  "d dellon"
  dellon = subwrd(result,4)
  "q w2xy "cenlon+dellon" "cenlat+dellat
  rec = sublin(result,1)
  x.a = subwrd(rec,3)
  y.a = subwrd(rec,6)
  deg = deg + DELTA
  a = a + 1
endwhile
count = a-1

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

"set line 1 "pattern" 10"
a = 1
while (a < count)
  b = a + 1
  "draw line "x.a" "y.a" "x.b" "y.b
  a = a + 1
endwhile
"set line 1 1 3"

return
