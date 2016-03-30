* This script calls a program to recursively modify track values.
* We assume that the second file is the track file, and only
* two files are open - RD November 1999, January 2000.
* disp: "run gui_track_simple 2 gridlat.2 gridlon.2 1 0.1 0.2 2"
* "set cint 4"
* "d slp/100"
* "set line 9 1 10"
* "run gui_track_simple 2 cycalat.2 cycalon.2 1 0.1 0.2 2"
* "set line 10 1 10"
* "run gui_track_simple 2 cycblat.2 cycblon.2 1 0.1 0.2 2"
* "set line 11 1 10"
* "run gui_track_simple 2 cycclat.2 cycclon.2 1 0.1 0.2 2"
* "set line 12 1 10"
* "run gui_track_simple 2 cycdlat.2 cycdlon.2 1 0.1 0.2 2"
* "set line 9 1 10"
* "run gui_track_simple 2 acyalat.2 acyalon.2 1 0.1 0.2 2"
* "set line 10 1 10"
* "run gui_track_simple 2 acyblat.2 acyblon.2 1 0.1 0.2 2"
* "set line 11 1 10"
* "run gui_track_simple 2 acyclat.2 acyclon.2 1 0.1 0.2 2"
* "set line 12 1 10"
* "run gui_track_simple 2 acydlat.2 acydlon.2 1 0.1 0.2 2"

function retrkgrd()

* get the second file name and the number of available times

"q file 1"
rec = sublin(result,3)
gridfile = subwrd(rec,2)
"q file 2"
rec = sublin(result,3)
file = subwrd(rec,2)
rec = sublin(result,5)
last = subwrd(rec,12)

stem = "cyca"

loop = 1
while (loop = 1)

  if (stem = "cyca")
    "set line 9"
    "draw recf 0.0 0.0 0.7 0.5"
  endif
  if (stem = "cycb")
    "set line 10"
    "draw recf 0.7 0.0 1.4 0.5"
  endif
  if (stem = "cycc")
    "set line 11"
    "draw recf 1.4 0.0 2.1 0.5"
  endif
  if (stem = "cycd")
    "set line 12"
    "draw recf 2.1 0.0 2.75 0.5"
  endif
  if (stem = "acya")
    "set line 9"
    "draw recf 8.25 0.0 8.9 0.5"
  endif
  if (stem = "acyb")
    "set line 10"
    "draw recf 8.9 0.0 9.6 0.5"
  endif
  if (stem = "acyc")
    "set line 11"
    "draw recf 9.6 0.0 10.3 0.5"
  endif
  if (stem = "acyd")
    "set line 12"
    "draw recf 10.3 0.0 11.0 0.5"
  endif

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

  "draw line 0.0 0.5 11.0 0.5"
*  "draw string 1.375 0.10 Pretrack"
  "draw string 0.35 0.10 CycA"
  "draw line 0.7 0.0 0.7 0.5"
  "draw string 1.05 0.10 CycB"
  "draw line 1.4 0.0 1.4 0.5"
  "draw string 1.75 0.10 CycC"
  "draw line 2.1 0.0 2.1 0.5"
  "draw string 2.45 0.10 CycD"
  "draw line 2.75 0.0 2.75 0.5"
  "draw string 4.125 0.10 Prenull"
  "draw line 5.5 0.0 5.5 0.5"
  "draw string 6.875 0.10 Postnull"
  "draw line 8.25 0.0 8.25 0.5"
*  "draw string 9.625 0.10 Postrack"
  "draw string 8.55 0.10 AcyA"
  "draw line 8.9 0.0 8.9 0.5"
  "draw string 9.25 0.10 AcyB"
  "draw line 9.6 0.0 9.6 0.5"
  "draw string 9.95 0.10 AcyC"
  "draw line 10.3 0.0 10.3 0.5"
  "draw string 10.65 0.10 AcyD"

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

  if (y < 0.5 | y > 8.0)
*    if (y < 0.5 & x < 2.75)
*      "set z 1"
*      "set lat 45"
*      "set lon 180"
*      "d "stem"lat.2"
*      lat = subwrd(result,4)
*      "d "stem"lon.2"
*      lon = subwrd(result,4)
*      "d "stem"slp.2"
*      slp = subwrd(result,4)
*      now = tval - 1
*      while (now >= 1)
*        "set t "now
*        "run gui_date"
*        date = result
*        say "!nc.modify.fval "file" "stem"lat "date" "lat
*            "!nc.modify.fval "file" "stem"lat "date" "lat
*        say "!nc.modify.fval "file" "stem"lon "date" "lon
*            "!nc.modify.fval "file" "stem"lon "date" "lon
*        say "!nc.modify.fval "file" "stem"slp "date" "slp
*            "!nc.modify.fval "file" "stem"slp "date" "slp
*        now = now - 1
*      endwhile
*    endif

    if (y < 0.5 & x < 0.7)
      stem = "cyca"
    endif

    if (y < 0.5 & x >= 0.7 & x < 1.4)
      stem = "cycb"
    endif

    if (y < 0.5 & x >= 1.4 & x < 2.1)
      stem = "cycc"
    endif

    if (y < 0.5 & x >= 2.1 & x < 2.75)
      stem = "cycd"
    endif

    if (y < 0.5 & x >= 2.75 & x < 5.5)
      now = tval - 1
      while (now >= 1)
        "set t "now
        "run gui_date"
        date = result
        say "!nc.modify.fval "file" "stem"lat "date" 9999.0"
            "!nc.modify.fval "file" "stem"lat "date" 9999.0"
        say "!nc.modify.fval "file" "stem"lon "date" 9999.0"
            "!nc.modify.fval "file" "stem"lon "date" 9999.0"
        say "!nc.modify.fval "file" "stem"slp "date" 9999.0"
            "!nc.modify.fval "file" "stem"slp "date" 9999.0"
        now = now - 1
      endwhile
    endif

    if (y < 0.5 & x >= 5.5 & x < 8.25)
      now = tval + 1
      while (now <= last)
        "set t "now
        "run gui_date"
        date = result
        say "!nc.modify.fval "file" "stem"lat "date" 9999.0"
            "!nc.modify.fval "file" "stem"lat "date" 9999.0"
        say "!nc.modify.fval "file" "stem"lon "date" 9999.0"
            "!nc.modify.fval "file" "stem"lon "date" 9999.0"
        say "!nc.modify.fval "file" "stem"slp "date" 9999.0"
            "!nc.modify.fval "file" "stem"slp "date" 9999.0"
        now = now + 1
      endwhile
    endif

    if (y < 0.5 & x >= 8.25 & x < 8.9)
      stem = "acya"
    endif

    if (y < 0.5 & x >= 8.9 & x < 9.6)
      stem = "acyb"
    endif

    if (y < 0.5 & x >= 9.6 & x < 10.3)
      stem = "acyc"
    endif

    if (y < 0.5 & x >= 10.3)
      stem = "acyd"
    endif

*    if (y < 0.5 & x >= 8.25)
*      "set z 1"
*      "set lat 45"
*      "set lon 180"
*      "d gridlat.2"
*      lat = subwrd(result,4)
*      "d gridlon.2"
*      lon = subwrd(result,4)
*      "d "stem"slp.2"
*      slp = subwrd(result,4)
*      now = tval + 1
*      while (now <= last)
*        "set t "now
*        "run gui_date"
*        date = result
*        say "!nc.modify.fval "file" "stem"lat "date" "lat
*            "!nc.modify.fval "file" "stem"lat "date" "lat
*        say "!nc.modify.fval "file" "stem"lon "date" "lon
*            "!nc.modify.fval "file" "stem"lon "date" "lon
*        say "!nc.modify.fval "file" "stem"slp "date" "slp
*            "!nc.modify.fval "file" "stem"slp "date" "slp
*        now = now + 1
*      endwhile
*    endif

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
#    "q xy2gr "x" "y
    "q xy2w "x" "y
    rec = sublin(result,1)
    x = subwrd(rec,3)
    y = subwrd(rec,6)

* otherwise get the lat-lon position of the nearest gridpoint

    "set x "x
    rec = sublin(result,1)
#    lon = subwrd(rec,4)
    lon = x
    "set y "y
    rec = sublin(result,1)
#    lat = subwrd(rec,4)
    lat = y

* get the date and modify the track position

    "run gui_date"
    date = result
    say "!nc.modify.fval.slp "gridfile" "file" "stem" "date" "lat" "lon
        "!nc.modify.fval.slp "gridfile" "file" "stem" "date" "lat" "lon
  endif

* close and reopen the second file to reinitialize the track

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
