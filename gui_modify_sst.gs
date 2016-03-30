* This script calls a program to recursively modify track values.
* We assume that the second file is the track file, and only
* two files are open - RD November 1999, January 2000.

function gridmod()

* user set the new value (float)

newval = 18.0

* get the file name and the number of available times

"q file 1"
rec = sublin(result,3)
file = subwrd(rec,2)
rec = sublin(result,5)
last = subwrd(rec,12)

loop = 1
while (loop = 1)

* draw the buttons for modifying track segments

  "set string 10 bc 10"
  "set strsiz 0.15 0.25"
  "set line 10 1 6"

  "draw line 0.0 8.0 11.0 8.0"
  "draw string 1.375 8.2 Display"
  "draw line 2.75 8.0 2.75 8.5"
  "draw string 3.437 8.2 <<"
  "draw line 4.125 8.0 4.125 8.5"
  "draw string 4.812 8.2 <"
  "draw line 5.5 8.0 5.5 8.5"
  "draw string 6.187 8.2 >"
  "draw line 6.875 8.0 6.875 8.5"
  "draw string 7.562 8.2 >>"
  "draw line 8.25 8.0 8.25 8.5"
  "draw string 9.625 8.2 Quit"

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

  if (y > 8.0)
    if (y > 8.0 & x < 2.75)
      "set z 1"
    endif

    if (y > 8.0 & x >= 2.75 & x < 4.125)
      "run gui_time_nodisp -4"
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
    endif

    if (y > 8.0 & x >= 4.125 & x < 5.5)
      "run gui_time_nodisp -1"
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
    endif

    if (y > 8.0 & x >= 5.5 & x < 6.875)
      "run gui_time_nodisp 1"
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
    endif

    if (y > 8.0 & x >= 6.875 & x < 8.25)
      "run gui_time_nodisp 4"
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
    endif

    if (y > 8.0 & x >= 8.25)
      "run gui_disp"
      return
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
    say "!/home/rdanielson/bin/nc.modify.fval.grid "file" sst "date" "lat" "lon" "newval
        "!/home/rdanielson/bin/nc.modify.fval.grid "file" sst "date" "lat" "lon" "newval
  endif

* close and reopen the second file to reinitialize the track

  "close 1"
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
