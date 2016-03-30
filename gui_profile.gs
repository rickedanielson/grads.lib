* This script creates a sounding (cross section)
* given a mouse click (and drag) defining the position(s)
* of interest.  Looping allows for different times to
* be examined (for the given profile).  Active expressions
* in the display script are executed as they appear, and for
* any display commands, a profile is constructed for the
* corresponding variable.  To calculate the position(s) of
* interest, the last file open is used as the default (so
* that world-grid-xy conversions work) - RD February 2001.

function profile()

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
* and get the profile position(s) of interest

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
say lona" "lonb" "lata" "latb
"set dfile 1"

* reset the dimensions and determine if a
* sounding or a cross section is requested

"set y 1"
"set lev 1010 100"

if ((xa - xb)*(xa - xb) < 0.005 & (ya - yb)*(ya - yb) < 0.005)
  points = 1
else
  points = totalpts
endif

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
  abscissa = "(LAT,LON) = ("latlab","lonlab")"
endif
say abscissa

* scan the display script and construct vertical profiles for
* the displayable variables and execute any active commands

filename = '/home/rdanielson/prog/graphics.grads/lib/gui_dispp.gs'
loop = 1
while (loop = 1)
  filestat = read(filename)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    if (substr(line,1,2) != '#"' & line != "")
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
    filestat = read(filename)
  endwhile
  filestat = close(filename)
  if (points > 1)
    "draw xlab LAT LON"
  endif

* draw some navigation buttons for the time dimension
* (clicking other than the buttons will redisplay the profile)

  "set string 10 bc 10"
  "set strsiz 0.15 0.25"
  "set line 10 1 6"

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

  "q pos"
  rec = sublin(result,1)
  x = subwrd(rec,3)
  y = subwrd(rec,4)

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
  endif
endwhile

* reset the original viewing domain and redisplay

"set x "xmin" "xmax
"set y "ymin" "ymax
"set z "zval
"set t "tval

"run gui_disp"
