* This script calls a program to modify a mask.
* We assume that a couple of files are open and
* the second one is the mask file - RD November 1999, January 2000.

function modmask()

* initialize the mask value

maskval = 500

* isolate the tag (following the path name)
* and get the number of available times

"q file 2"
rec = sublin(result,3)
file = subwrd(rec,2)
rec = sublin(result,5)
last = subwrd(rec,12)

a = 1
b = 0
ret = substr(file,a,1)
while (ret != "")
  if (ret = "/")
    b = a
  endif
  a = a + 1
  ret = substr(file,a,1)
endwhile
b = b + 1
tag = substr(file,b,6)
#tag = "mmout_balcont3"

loop = 1
while (loop = 1)

* indicate the current mask value being used

  "set line 4"
  if (maskval = 200)
    "set line 9"
    "draw recf 0.0 7.5 2.75 8.0"
  endif
  if (maskval = 300)
    "set line 10"
    "draw recf 2.75 7.5 4.125 8.0"
  endif
  if (maskval = 400)
    "set line 11"
    "draw recf 4.125 7.5 5.5 8.0"
  endif
  if (maskval = 500)
    "set line 12"
    "draw recf 5.5 7.5 6.875 8.0"
  endif
  if (maskval = 600)
    "set line 13"
    "draw recf 6.875 7.5 8.25 8.0"
  endif
  if (maskval = 700)
    "set line 14"
    "draw recf 8.25 7.5 11.0 8.0"
  endif

* draw the buttons for modifying track segments

  "set string 10 bc 10"
  "set strsiz 0.15 0.25"
  "set line 10 1 6"

  "draw line 0.0 8.0 11.0 8.0"
  "draw line 0.0 7.5 11.0 7.5"
  "draw string 1.375 8.2 Display"
  "draw string 1.375 7.7 200"
  "draw line 2.75 7.5 2.75 8.5"
  "draw string 3.437 8.2 <<"
  "draw string 3.437 7.7 300"
  "draw line 4.125 7.5 4.125 8.5"
  "draw string 4.812 8.2 <"
  "draw string 4.812 7.7 400"
  "draw line 5.5 7.5 5.5 8.5"
  "draw string 6.187 8.2 >"
  "draw string 6.187 7.7 500"
  "draw line 6.875 7.5 6.875 8.5"
  "draw string 7.562 8.2 >>"
  "draw string 7.562 7.7 600"
  "draw line 8.25 7.5 8.25 8.5"
  "draw string 9.625 8.2 Quit"
  "draw string 9.625 7.7 700"

  "set string 1 c 5"
  "set strsiz 0.15 0.15"
  "set line 1 1 3"

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

  "q pos"
  rec = sublin(result,1)
  x = subwrd(rec,3)
  y = subwrd(rec,4)

* if the mouse click is off the map, perform one of the optional functions

  if (y > 7.5)
    if (x < 2.75)
      if (y > 8.0)
        "set z 1"
      else
        maskval = 200
      endif
    endif

    if (x >= 2.75 & x < 4.125)
      if (y > 8.0)
        "run gui_time_nodisp -4"
        "q dims"
        rec = sublin(result,5)
        tval = subwrd(rec,9)
      else
        maskval = 300
      endif
    endif

    if (x >= 4.125 & x < 5.5)
      if (y > 8.0)
        "run gui_time_nodisp -1"
        "q dims"
        rec = sublin(result,5)
        tval = subwrd(rec,9)
      else
        maskval = 400
      endif
    endif

    if (x >= 5.5 & x < 6.875)
      if (y > 8.0)
        "run gui_time_nodisp 1"
        "q dims"
        rec = sublin(result,5)
        tval = subwrd(rec,9)
      else
        maskval = 500
      endif
    endif

    if (x >= 6.875 & x < 8.25)
      if (y > 8.0)
        "run gui_time_nodisp 4"
        "q dims"
        rec = sublin(result,5)
        tval = subwrd(rec,9)
      else
        maskval = 600
      endif
    endif

    if (x >= 8.25)
      if (y > 8.0)
        "run gui_disp"
        return
      else
        maskval = 700
      endif
    endif
  else
    "q xy2gr "x" "y
    rec = sublin(result,1)
    x = subwrd(rec,3)
    y = subwrd(rec,6)

* otherwise get the lat-lon position of the nearest gridpoint

    "set x "x
    rec = sublin(result,1)
    lon = subwrd(rec,4)
    "set y "y
    rec = sublin(result,1)
    lat = subwrd(rec,4)

* get the date and modify the track position

    "run gui_date"
    date = result
    say "!/home/rdanielson/bin/nc.modify.fval.mask.gb "tag".mask.nc "date" "lat" "lon" "maskval
        "!/home/rdanielson/bin/nc.modify.fval.mask.gb "tag".mask.nc "date" "lat" "lon" "maskval
  endif

* close and reopen the second file

  "close 2"
  "sdfopen "file

* reset the original viewing domain, redisplay, and loop back again

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

  "run gui_disp"
endwhile
