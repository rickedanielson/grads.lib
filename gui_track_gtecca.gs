* This script plots a track, assuming a call such as "set line 1 1 7"
* occurs first in the calling script - RD January 2001, March 2002.
* (e.g., "run gui_track_gtecca /home/rdanielson/data/track/GTECCA/GTECCA.vor.rates 2 manulat.2 manulon.2 1 0.0 0.18")

function track(args)

* get the track names, colour of the track, and position of interest (if applicable)

namefil = subwrd(args,1)
filenum = subwrd(args,2)
latname = subwrd(args,3)
lonname = subwrd(args,4)
colour  = subwrd(args,5)
dotsize = subwrd(args,6)
bigdot  = subwrd(args,7)
marktype = subwrd(args,8)

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
seeit = 1
shift = 0.25

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

"run gui_date_simple"                                              ;* get all track names for this date
"!grep "result" "namefil" > "fpz
tagnum = 1
filestat = read(fpz)
while (sublin(filestat,1) = 0)
  result = sublin(filestat,2)
  tag.tagnum = subwrd(result,1)
  tagnum = tagnum + 1
  filestat = read(fpz)
endwhile
ret = close(fpz)
"!rm "fpz
* say "found "tagnum-1" tracks in "namefil

count = 1
while (count < tagnum)
  "sdfopen "namefil".ind/"tag.count".track.nc"
  "set dfile "filenum                                              ;* get the current position of this track
  "set z 1"
  "set y 1"
  "set x 1"

  "d "latname
  latnow = subwrd(result,4)
  "d "lonname
  lonnow = subwrd(result,4)
  if (lonnow < 0)
    lonnow = lonnow + 360.0
  endif
  "d manuslp."filenum
  slp = subwrd(result,4)

* if (seeit != 0 & (latnow < latminv | latnow > latmaxv | lonnow < lonminv | lonnow > lonmaxv))
* endif

* plot the part of the track which appears in the viewframe

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
  if (lonbef < 0)
    lonbef = lonbef + 360.0
  endif

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
    if (lonaft < 0)
      lonaft = lonaft + 360.0
    endif

    "q w2xy "lonaft" "lataft
    rec = sublin(result,1)
    xaft = subwrd(rec,3)
    yaft = subwrd(rec,6)

    if (latbef >= latminv & latbef <= latmaxv & lonbef >= lonminv & lonbef <= lonmaxv)
      if (lataft >= latminv & lataft <= latmaxv & lonaft >= lonminv & lonaft <= lonmaxv)
        if (tbef = timindex)
          "draw mark "marktype" "xbef" "ybef" "bigdot
          biglat = latbef
          biglon = lonbef
"draw string "xbef+shift" "ybef+shift" "slp
        else
          "draw mark "marktype" "xbef" "ybef" "dotsize
        endif
        if (taft = timindex)
          "draw mark "marktype" "xaft" "yaft" "bigdot
          biglat = lataft
          biglon = lonaft
"draw string "xaft+shift" "yaft+shift" "slp
        else
          "draw mark "marktype" "xaft" "yaft" "dotsize
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

  "close "filenum
  "set dfile 1"
  "set t "tval
  count = count + 1
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
