* This script creates a sounding (cross section)
* given a mouse click (and drag) defining the position(s)
* of interest.  Looping allows for different times to
* be examined (for the given profile).  Active expressions
* in the display script are executed as they appear, and for
* any display commands, a profile is constructed for the
* corresponding variable.  To calculate the position(s) of
* interest, the last file open is used as the default (so
* that world-grid-xy conversions work) - RD February 2001.

function profile(args)

* for a cross section, select the number of points along the
* profile, and the number of points to be labeled (e.g. 21 and 5)

totalpts = 21
labelpts = 5

* save the dimensions of the current viewing domain

"q dims"
rec = sublin(result,2)
xmin = subwrd(rec,11)
xmax = subwrd(rec,13)
rec = sublin(result,3)
ymin = subwrd(rec,11)
ymax = subwrd(rec,13)
rec = sublin(result,4)
zval = subwrd(rec,9)
rec = sublin(result,5)
tval = subwrd(rec,9)

* find the last file open and use it as the default

loop = 1
"q files"
message = sublin(result,loop)
while (message != "")
  if (subwrd(message,1) = "File")
    filenumb = subwrd(message,2)
  endif
  loop = loop + 1
  message = sublin(result,loop)
endwhile

* determine the display type (landscape or portrait)
* and get the profile position(s) of interest (unless
* these are already known)

if (args = "")
  "set dfile "filenumb
  "q gxinfo"
  rec = sublin(result,2)
  pagex = subwrd(rec,4)
  pagey = subwrd(rec,6)
  "set rband 21 box 0 0 "pagex" "pagey
  "q pos"
  rec = sublin(result,1)
  xa = subwrd(rec,3)
  ya = subwrd(rec,4)
  xb = subwrd(rec,8)
  yb = subwrd(rec,9)
  "q xy2w "xa" "ya
  rec = sublin(result,1)
  lona = subwrd(rec,3)
  lata = subwrd(rec,6)
  "q xy2w "xb" "yb
  rec = sublin(result,1)
  lonb = subwrd(rec,3)
  latb = subwrd(rec,6)
else
  lata = subwrd(args,1)
  lona = subwrd(args,2)
  latb = subwrd(args,3)
  lonb = subwrd(args,4)
endif

"set dfile 1"
diflon = (lona - lonb) / 2.0
diflat = (lata - latb) / 2.0
cenlon = (lona + lonb) / 2.0
cenlat = (lata + latb) / 2.0

* determine if a sounding or a cross section is requested

if ((lata - latb)*(lata - latb) < 0.1 & (lona - lonb)*(lona - lonb) < 0.1)
  points = 1
else
  points = totalpts
endif

* scan both display scripts and construct vertical profiles for
* the displayable 3D variables and execute any active commands
* (except clear) - main display below and 3D display above

filenama = '/home/rdanielson/prog/graphics.grads/lib/gui_disp.gs'
filenamb = '/home/rdanielson/prog/graphics.grads/lib/gui_dispp.gs'

loop = 1
while (loop = 1)
  abscissa = ablab(points,labelpts,lona,lata,lonb,latb)
  if (args = "")
    "clear"
  endif
  "set y 1"
  "set lev 1010 300"
  "set vpage 0 7.75 0.0 5.5"
  filestat = read(filenamb)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    if (substr(line,1,2) != '#"' & line != "" & line != '"clear"')
      if (substr(line,1,3) = '"d ')
        a = 5
        while (substr(line,a,1) != '"')
          a = a + 1
        endwhile
        variable = substr(line,4,a-4)

        if (points > 1)
          "set x 1"
          "collect 0 free"
          inloop = 0
          while (inloop < points)
            inlon = lona + (lonb - lona) * inloop / (points - 1)
            inlat = lata + (latb - lata) * inloop / (points - 1)
            "collect 0 gr2stn("variable","inlon","inlat")"
            inloop = inloop + 1
          endwhile
          "set x 1 "points
          "set xlabs "abscissa
          "d coll2gr(0,-u)"
          "collect 0 free"
        else
          "set x 1"
          "d gr2stn("variable","lona","lata")"
          "draw xlab "abscissa
        endif
      else
        a = 5
        while (substr(line,a,1) != '"')
          a = a + 1
        endwhile
        substr(line,2,a-2)
      endif
    endif
    filestat = read(filenamb)
  endwhile
  filestat = close(filenamb)
  if (points > 1)
    "draw xlab LAT LON"
  endif

  "set x "xmin" "xmax
  "set y "ymin" "ymax
  "set z "zval
  "set vpage 0 8.5 5.5 11"
  filestat = read(filenama)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    if (substr(line,1,2) != '#"' & line != "" & line != '"clear"' & line != '"run gui_header date"')
      a = 5
      while (substr(line,a,1) != '"')
        a = a + 1
      endwhile
      substr(line,2,a-2)
    endif
    filestat = read(filenama)
  endwhile
  filestat = close(filenama)

  "set dfile "filenumb
  "q w2xy "lona" "lata
  rec = sublin(result,1)
  xa = subwrd(rec,3)
  ya = subwrd(rec,6)
  "q w2xy "lonb" "latb
  rec = sublin(result,1)
  xb = subwrd(rec,3)
  yb = subwrd(rec,6)
  "set dfile 1"
  xc = (xa + xb) / 2
  yc = (ya + yb) / 2
  "set line 1 1"
  "draw line "xa" "ya" "xb" "yb
  "draw mark 3 "xc" "yc" 0.1"
  "run gui_header"
#"run gui_print x"

* draw some navigation buttons for the time dimension
* (clicking other than the buttons will redisplay the profile)
* unless the profile isn't interactive, in which case quit

  if (args = "")
    "set string 10 bc 10"
    "set strsiz 0.15 0.25"
    "set line 10 1 6"

    "q gxinfo"
    rec = sublin(result,2)
    pagex = subwrd(rec,4)
    pagey = subwrd(rec,6)

    xa = pagex - 3.0
    ya = pagey - 0.5
    xb = pagex
    yb = pagey - 0.5
    "draw line "xa" "ya" "xb" "yb
    xa = pagex - 3.0
    ya = pagey - 0.5
    xb = pagex - 3.0
    yb = pagey
    "draw line "xa" "ya" "xb" "yb
    xa = pagex - 2.75
    ya = pagey - 0.3
    "draw string "xa" "ya" <<"
    xa = pagex - 2.5
    ya = pagey - 0.5
    xb = pagex - 2.5
    yb = pagey
    "draw line "xa" "ya" "xb" "yb
    xa = pagex - 2.25
    ya = pagey - 0.3
    "draw string "xa" "ya" <"
    xa = pagex - 2.0
    ya = pagey - 0.5
    xb = pagex - 2.0
    yb = pagey
    "draw line "xa" "ya" "xb" "yb
    xa = pagex - 1.75
    ya = pagey - 0.3
     "draw string "xa" "ya" >"
    xa = pagex - 1.5
    ya = pagey - 0.5
    xb = pagex - 1.5
    yb = pagey
    "draw line "xa" "ya" "xb" "yb
    xa = pagex - 1.25
    ya = pagey - 0.3
    "draw string "xa" "ya" >>"
    xa = pagex - 1.0
    ya = pagey - 0.5
    xb = pagex - 1.0
    yb = pagey
    "draw line "xa" "ya" "xb" "yb
    xa = pagex - 0.5
    ya = pagey - 0.3
    "draw string "xa" "ya" Quit"

*   get the position and convert it to the vpage coordinates
*   if the position is off the buttons, interpret this as the
*   center of a new profile position

    "q pos"
    rec = sublin(result,1)
    x = subwrd(rec,3)
    y = subwrd(rec,4)
    y = y - 5.5

    if (y > pagey - 0.5)
      if (x >= pagex - 3.0 & x < pagex - 2.5)
        "run gui_time_nodisp -4"
      endif

      if (x >= pagex - 2.5 & x < pagex - 2.0)
        "run gui_time_nodisp -1"
      endif

      if (x >= pagex - 2.0 & x < pagex - 1.5)
        "run gui_time_nodisp 1"
      endif

      if (x >= pagex - 1.5 & x < pagex - 1.0)
        "run gui_time_nodisp 4"
      endif

      if (x >= pagex - 1.0)
        loop = 0
      endif
    else
      "set dfile "filenumb
      "q xy2w "x" "y
      rec = sublin(result,1)
      cenlon = subwrd(rec,3)
      cenlat = subwrd(rec,6)
      "set dfile 1"
      lona = cenlon + diflon
      lata = cenlat + diflat
      lonb = cenlon - diflon
      latb = cenlat - diflat
    endif
  else
    loop = 0
  endif
endwhile
"set vpage off"

* reset the original viewing domain and redisplay

if (args = "")
  "set x "xmin" "xmax
  "set y "ymin" "ymax
  "set z "zval
  "set t "tval
  "run gui_disp"
endif

function ablab(points,labelpts,lona,lata,lonb,latb)

* create the abscissa label (without long fractions of a number)

if (points > 1)
  abscissa = ""
  loop = 0
  labloop = labelpts
  while (loop < points)
    inlat = lata + (latb - lata) * loop / (points - 1)
    inlon = lona + (lonb - lona) * loop / (points - 1)
    if (inlon > 180)
      inlon = inlon - 360
    endif
    if (inlon < -180)
      inlon = inlon + 360
    endif
    a = 1
    while (substr(inlat,a,1) != "." & substr(inlat,a,1) != "")
      a = a + 1
    endwhile
    latlab = substr(inlat,1,a+1)
    a = 1
    while (substr(inlon,a,1) != "." & substr(inlon,a,1) != "")
      a = a + 1
    endwhile
    lonlab = substr(inlon,1,a+1)

    if (labloop = labelpts)
      if (abscissa = "")
        abscissa = " "latlab" "lonlab" "
      else
        abscissa = abscissa " |  "latlab" "lonlab" "
      endif
      labloop = 1
    else
      abscissa = abscissa " | "
    endif
    loop = loop + 1
    labloop = labloop + 1
  endwhile
else
  a = 1
  while (substr(lata,a,1) != "." & substr(lata,a,1) != "")
    a = a + 1
  endwhile
  latlab = substr(lata,1,a+1)
  a = 1
  while (substr(lona,a,1) != "." & substr(lona,a,1) != "")
    a = a + 1
  endwhile
  lonlab = substr(lona,1,a+1)
  if (lonlab > 180)
    lonlab = lonlab - 360
  endif
  if (lonlab < -180)
    lonlab = lonlab + 360
  endif
  abscissa = "(LAT,LON) = ("latlab","lonlab")"
endif

return(abscissa)
