* This script plots a track, centered on a position of interest
* (if applicable) unless the current position is not viewable, in
* which case the user determines if the track is plotted - RD
* November 1999, January 2000.

function track(args)

* get the track names, colour of the track, and position of interest (if applicable)

latname = subwrd(args,1)
lonname = subwrd(args,2)
colour = subwrd(args,3)
reallat = subwrd(args,4)
reallon = subwrd(args,5)
gridlat = subwrd(args,6)
gridlon = subwrd(args,7)

latpos = gridlat
lonpos = gridlon

* set colours, thicknesses, and the flag (seeit) which indicates that a track should
* be skipped if the current position is not viewable (1 = skip, 0 = plot anyway)

#"set string 1 c 5"
"set strsiz 0.15 0.15"
"set line "colour" 1 6"
*dotsize = 0.15
*bigdot = 0.25
dotsize = 0.05
bigdot = 0.2
seeit = 1

* query file for dimensions of current viewing domain and the last time

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
  latminv = subwrd(rec,6)
  latmaxv = subwrd(rec,8)
else
  yval = subwrd(rec,9)
  yvar = "fixed"
endif

rec = sublin(result,2)
if (subwrd(rec,3) = "varying")
  xmin = subwrd(rec,11)
  xmax = subwrd(rec,13)
  xvar = "varying"
  lonminv = subwrd(rec,6)
  lonmaxv = subwrd(rec,8)
else
  xval = subwrd(rec,9)
  xvar = "fixed"
endif

* get the current position of the track

"set z 1"
"set lat 45"
"set lon 180"

"d "latname
latnow = subwrd(result,4)
"d "lonname
lonnow = subwrd(result,4)

* determine the track shift to the position of interest (if applicable)

if (latpos = "" | lonpos = "")
  latshift = 0
  lonshift = 0
  latpos = latnow
  lonpos = lonnow
else
  "d "latname
  latshift = latpos - latnow
  "d "lonname
  lonshift = lonpos - lonnow
  say "using latshift "latshift" and lonshift "lonshift
endif

* depending on whether the current position appears on the viewframe,
* either return without plotting this track, and reset the original viewing domain

if (seeit != 0 & (latpos < latminv | latpos > latmaxv | lonpos < lonminv | lonpos > lonmaxv))
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
  return
endif

* or plot the part of the track which appears in the viewframe

"run gui_getimindex 2"
timindex = result

"set dfile 4"
"q file"
ret = sublin(result,5)
lasttime = subwrd(ret,12)

"set t 3"
"d "latname" + "latshift
latbef = subwrd(result,4)
"d "lonname" + "lonshift
lonbef = subwrd(result,4)

"q w2xy "lonbef" "latbef
rec = sublin(result,1)
xbef = subwrd(rec,3)
ybef = subwrd(rec,6)

tbef = 3
taft = 4
while (tbef < lasttime-2)
  "set t "taft
  "d "latname" + "latshift
  lataft = subwrd(result,4)
  "d "lonname" + "lonshift
  lonaft = subwrd(result,4)

  "q w2xy "lonaft" "lataft
  rec = sublin(result,1)
  xaft = subwrd(rec,3)
  yaft = subwrd(rec,6)

  if (latbef >= latminv & latbef <= latmaxv & lonbef >= lonminv & lonbef <= lonmaxv)
    if (lataft >= latminv & lataft <= latmaxv & lonaft >= lonminv & lonaft <= lonmaxv)
      if (tbef = timindex)
        "draw mark 3 "xbef" "ybef" "bigdot
      else
        "draw mark 3 "xbef" "ybef" "dotsize
      endif
      if (taft = timindex)
        "draw mark 3 "xaft" "yaft" "bigdot
      else
        "draw mark 3 "xaft" "yaft" "dotsize
      endif
      "draw line "xbef" "ybef" "xaft" "yaft
    endif
  endif

  latbef = lataft
  lonbef = lonaft
  xbef = xaft
  ybef = yaft
  tbef = tbef + 1
  taft = taft + 1
endwhile

* reset the original viewing domain

"set dfile 1"
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

"set line 1 1 3"
