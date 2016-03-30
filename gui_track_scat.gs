* This script plots a track, assuming a call such as "set line 1 1 7"
* occurs first in the calling script - RD January 2001, March 2002.

function track(args)

* get the track names, colour of the track dots, and position of interest (if applicable)

filenum = subwrd(args,1)
latname = subwrd(args,2)
lonname = subwrd(args,3)
colour  = subwrd(args,4)
dotsize = subwrd(args,5)
bigdot  = subwrd(args,6)
marktype = subwrd(args,7)

* set the flag (seeit) which indicates that a track should be skipped
* if the current position is not viewable (1 = skip, 0 = plot anyway)

if (dotsize = "")
  dotsize = 0.05
endif
if (bigdot = "")
  bigdot = 0.2
endif
if (marktype = "")
  marktype = 3
endif
seeit = 0

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

"set dfile "filenum
"set z 1"
"set y 1"
"set x 1"

#"d "latname
#latnow = subwrd(result,4)
#"d "lonname
#lonnow = subwrd(result,4)

if (seeit != 0 & (latnow < latminv | latnow > latmaxv | lonnow < lonminv | lonnow > lonmaxv))
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
  return
endif

* plot the part of the track which appears in the viewframe

"q gxinfo"
line3 = sublin(result,3)
line4 = sublin(result,4)
x1 = subwrd(line3,4)
x2 = subwrd(line3,6)
y1 = subwrd(line4,4)
y2 = subwrd(line4,6)
"set clip "x1" "x2" "y1" "y2

"q dims"
rec = sublin(result,5)
timindex = subwrd(rec,9)

"q file"
ret = sublin(result,5)
lasttime = subwrd(ret,12)

"set t 1"
"d "latname
latbef = subwrd(result,4)
"d "lonname
lonbef = subwrd(result,4)
"d vmax."filenum
vmxbef = subwrd(result,4)
"d mslp."filenum
slpbef = subwrd(result,4)

"q w2xy "lonbef" "latbef
rec = sublin(result,1)
xbef = subwrd(rec,3)
ybef = subwrd(rec,6)

tbef = 1
taft = 2
while (tbef < lasttime)
  "set t "taft
  "d "latname
  lataft = subwrd(result,4)
  "d "lonname
  lonaft = subwrd(result,4)
  "d vmax."filenum
  vmxaft = subwrd(result,4)
  "d mslp."filenum
  slpaft = subwrd(result,4)

  "q w2xy "lonaft" "lataft
  rec = sublin(result,1)
  xaft = subwrd(rec,3)
  yaft = subwrd(rec,6)

  if                 (vmxbef <  34) ; "set line  1 3" ; endif
  if (vmxbef >=  34 & vmxbef <  64) ; "set line 11 1" ; endif
  if (vmxbef >=  64 & vmxbef <  96) ; "set line 56 1" ; endif
  if (vmxbef >=  96)                ; "set line 46 1" ; endif
  "draw line "xbef" "ybef" "xaft" "yaft

  "set line "colour
  if (tbef = timindex)
    "draw mark "marktype" "xbef" "ybef" "bigdot
    biglat = latbef
    biglon = lonbef
  else
    "draw mark "marktype" "xbef" "ybef" "dotsize
  endif
  if (taft = timindex)
    "draw mark "marktype" "xaft" "yaft" "bigdot
    biglat = lataft
    biglon = lonaft
  else
    "draw mark "marktype" "xaft" "yaft" "dotsize
  endif

  latbef = lataft
  lonbef = lonaft
  vmxbef = vmxaft
  slpbef = slpaft
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

return(biglat' 'biglon)
