* This script plots lat and lon labels for a
* satellite acquistion that isn't aligned along
* lats and lons.  The script is executed using
* commands such as
*
* "set strsiz 0.10 0.10"
* "set line 1 1 4"
* "run disp_scat_latlon 0.05 1 1 0 0"
*
* where strsiz controls the label size - RD April 2004.

function latlon(args)

dela   = 2
delta  = subwrd(args,1)
left   = subwrd(args,2)
right  = subwrd(args,3)
bottom = subwrd(args,4)
top    = subwrd(args,5)
if (delta  = "") ; delta  = 0.08 ; endif                 ;* length of tick marks
if (left   = "") ; left   = 1;     endif                 ;* 1 = plot labels along axis
if (right  = "") ; right  = 1;     endif
if (bottom = "") ; bottom = 1;     endif
if (top    = "") ; top    = 0;     endif

"q dims"                                                 ;* retain the original view
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

"q gxinfo"                                               ;* and get the page coords
line = sublin(result,3)                                  ;* of the most recent plot
xl = subwrd(line,4)
xr = subwrd(line,6)
line = sublin(result,4)
yb = subwrd(line,4)
yt = subwrd(line,6)

"set gxout stat"                                         ;* get all possible lat/lon
"d qs_lat"                                               ;* labels for this plot
line = sublin(result,3)
lonmin = subwrd(line,4)
lonmax = subwrd(line,6)
line = sublin(result,4)
latmin = subwrd(line,4)
latmax = subwrd(line,6)
line = sublin(result,9)
latlabmin = subwrd(line,5)
latlabmax = subwrd(line,6)
latlabint = subwrd(line,7)
"d qs_lon"
*say result
line = sublin(result,9)
lonlabmin = subwrd(line,5) ;* if (lonlabmin > 180) ; lonlabmin = lonlabmin - 360 ; endif
lonlabmax = subwrd(line,6) ;* if (lonlabmax > 180) ; lonlabmax = lonlabmax - 360 ; endif
lonshift = 0
if (lonlabmin > 180 & lonlabmax > 180)
  lonshift  = 1
  lonlabmin = lonlabmin - 360
  lonlabmax = lonlabmax - 360
endif
lonlabint = subwrd(line,7)

a = 0                                                    ;* and count these labels
latlabnum = (latlabmax - latlabmin) / latlabint + 0.5
while (a <= latlabnum)
  latlab.a = latlabmin + a * latlabint
  a = a + 1
endwhile

a = 0
lonlabnum = (lonlabmax - lonlabmin) / lonlabint + 0.5
while (a <= lonlabnum)
  lonlab.a = lonlabmin + a * lonlabint
  a = a + 1
endwhile

"set x "lonmin" "lonmax                                  ;* first compute a tick shift
"set y "latmin
"define tmplats=qs_lat"
"define tmplons=qs_lon"
"set gxout value"
"set x "lonmin
"d tmplats"
lata = subwrd(result,4)
"d tmplons"
lona = subwrd(result,4)
"set x "lonmax
"d tmplats"
latb = subwrd(result,4)
"d tmplons"
lonb = subwrd(result,4)
shift = -delta * (lata - latb) / (lona - lonb)

if (bottom = 1)
  "set x "lonmin" "lonmax                                ;* then isolate a row/column
  "set y "latmin
  "define tmp=qs_lon"
  "set string 1 c"

  a = 0                                                  ;* and for each label find the
  while (a <= lonlabnum)                                 ;* closest visible position
    index.a = 0
    b = lonmin
    while (b < lonmax)
      "set x "b
      "d tmp"
      tmpa = subwrd(result,4) ; if (tmpa > 180 & lonshift = 1) ; tmpa = tmpa - 360 ; endif
      "set x "b+1
      "d tmp"
      tmpb = subwrd(result,4) ; if (tmpb > 180 & lonshift = 1) ; tmpb = tmpb - 360 ; endif
      if (lonlab.a >= tmpa & lonlab.a < tmpb)
        index.a = b + (lonlab.a - tmpa) / (tmpb - tmpa)
      endif
      b = b + 1
    endwhile
    if (index.a > lonmin & index.a < lonmax)
      xpos = xl + (xr - xl) * (index.a - lonmin) / (lonmax - lonmin)
      "draw line "xpos" "yb" "xpos+shift" "yb-delta
      if (lonlab.a > 180) ; lonlab.a = lonlab.a - 360 ; endif
      if (lonlab.a < 0) ; tmplab = -lonlab.a"W" ; endif ; if (lonlab.a = -180) ; tmplab = -lonlab.a ; endif
      if (lonlab.a > 0) ; tmplab =  lonlab.a"E" ; endif ; if (lonlab.a =  180) ; tmplab =  lonlab.a ; endif
      if (lonlab.a = 0) ; tmplab =  lonlab.a    ; endif
      "draw string "xpos" "yb-2*delta" "tmplab
    endif
    a = a + dela
  endwhile
endif

if (top = 1)
  "set x "lonmin" "lonmax                                ;* then isolate a row/column
  "set y "latmax
  "define tmp=qs_lon"
  "set string 1 c"

  a = 0                                                  ;* and for each label find the
  while (a <= lonlabnum)                                 ;* closest visible position
    index.a = 0
    b = lonmin
    while (b < lonmax)
      "set x "b
      "d tmp"
      tmpa = subwrd(result,4) ; if (tmpa > 180 & lonshift = 1) ; tmpa = tmpa - 360 ; endif
      "set x "b+1
      "d tmp"
      tmpb = subwrd(result,4) ; if (tmpb > 180 & lonshift = 1) ; tmpb = tmpb - 360 ; endif
      if (lonlab.a >= tmpa & lonlab.a < tmpb)
        index.a = b + (lonlab.a - tmpa) / (tmpb - tmpa)
      endif
      b = b + 1
    endwhile
    if (index.a > lonmin & index.a < lonmax)
      xpos = xl + (xr - xl) * (index.a - lonmin) / (lonmax - lonmin)
      "draw line "xpos" "yt" "xpos-shift" "yt+delta
      if (lonlab.a > 180) ; lonlab.a = lonlab.a - 360 ; endif
      if (lonlab.a < 0) ; tmplab = -lonlab.a"W" ; endif ; if (lonlab.a = -180) ; tmplab = -lonlab.a ; endif
      if (lonlab.a > 0) ; tmplab =  lonlab.a"E" ; endif ; if (lonlab.a =  180) ; tmplab =  lonlab.a ; endif
      if (lonlab.a = 0) ; tmplab =  lonlab.a    ; endif
      "draw string "xpos" "yt+2*delta" "tmplab
    endif
    a = a + dela
  endwhile
endif

if (left = 1)
  "set x "lonmin                                         ;* then isolate a row/column
  "set y "latmin" "latmax
  "define tmp=qs_lat"
  "set string 1 r"

  a = 0                                                  ;* and for each label find the
  while (a <= latlabnum)                                 ;* closest visible position
    index.a = 0
    b = latmin
    while (b < latmax)
      "set y "b
      "d tmp"
      tmpa = subwrd(result,4)
      "set y "b+1
      "d tmp"
      tmpb = subwrd(result,4)
      if (latlab.a >= tmpa & latlab.a < tmpb)
        index.a = b + (latlab.a - tmpa) / (tmpb - tmpa)
      endif
      b = b + 1
    endwhile
    if (index.a > latmin & index.a < latmax)
      ypos = yb + (yt - yb) * (index.a - latmin) / (latmax - latmin)
      "draw line "xl" "ypos" "xl-delta" "ypos-shift
      if (latlab.a < 0) ; tmplab = -latlab.a"S" ; endif
      if (latlab.a > 0) ; tmplab =  latlab.a"N" ; endif
      if (latlab.a = 0) ; tmplab =  latlab.a    ; endif
      "draw string "xl-1.25*delta" "ypos-shift" "tmplab
    endif
    a = a + dela
  endwhile
endif

if (right = 1)
  "set x "lonmax                                         ;* then isolate a row/column
  "set y "latmin" "latmax
  "define tmp=qs_lat"
  "set string 1 l"

  a = 0                                                  ;* and for each label find the
  while (a <= latlabnum)                                 ;* closest visible position
    index.a = 0
    b = latmin
    while (b < latmax)
      "set y "b
      "d tmp"
      tmpa = subwrd(result,4)
      "set y "b+1
      "d tmp"
      tmpb = subwrd(result,4)
      if (latlab.a >= tmpa & latlab.a < tmpb)
        index.a = b + (latlab.a - tmpa) / (tmpb - tmpa)
      endif
      b = b + 1
    endwhile
    if (index.a > latmin & index.a < latmax)
      ypos = yb + (yt - yb) * (index.a - latmin) / (latmax - latmin)
      "draw line "xr" "ypos" "xr+delta" "ypos+shift
      if (latlab.a > 0) ; tmplab =  latlab.a"N" ; endif
      if (latlab.a < 0) ; tmplab = -latlab.a"S" ; endif
      if (latlab.a = 0) ; tmplab =  latlab.a    ; endif
      "draw string "xr+1.25*delta" "ypos+shift" "tmplab
    endif
    a = a + dela
  endwhile
endif

"set gxout contour"                                      ;* reset the original view
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

*     "set x "index.a
*    "d tmp"
*    say lonlab.a" is closest to "subwrd(result,4)" at index "index.a
