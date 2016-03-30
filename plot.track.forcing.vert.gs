# This script is designed to plot vertical profile comparisons
*
*     grads -bpc "plot.track.forcing.vert midwinter    transitional"
*     grads -bpc "plot.track.forcing.vert dj30d        om30d"
*     grads -bpc "plot.track.forcing.vert gd2000.dj30d gd2000.om30d"
*     grads -bpc "plot.track.forcing.vert atlmid       atltra"
*     grads -bpc "plot.track.forcing.vert dec          mar"
*
* where no data files are required - RD August 2002.
* %%BoundingBox: 
function compare(args)
stema  = subwrd(args,1)
stemb  = subwrd(args,2)

if (stema = "midwinter")
  title.1 = "Midwinter (24) - Transitional (23)"
  title.2 = "Midwinter (24)"
  title.3 = "Transitional (23)"
endif
if (stema = "dj30d")
  title.1 = "Midwinter (13) - Transitional (12)"
  title.2 = "Midwinter (13)"
  title.3 = "Transitional (12)"
endif
if (stema = "gd2000.dj30d")
  title.1 = "Midwinter (11) - Transitional (11)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (11)"
endif
if (stema = "atlmid")
  title.1 = "Midwinter (12) - Transitional (16)"
  title.2 = "Midwinter (12)"
  title.3 = "Transitional (16)"
endif
if (stema = "dec")
  title.1 = "Midwinter (11) - Transitional (12)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (12)"
endif

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .14"
"set xlopts 1 4 .14"
"set ylopts 1 4 .14"

vpage.1 = "0 4.5  7.25  11.0"
vpage.2 = "4 8.5  7.25  11.0"
vpage.3 = "0 4.5  3.85  7.35"
vpage.4 = "4 8.5  3.85  7.35"
vpage.5 = "0 4.5  0.2   3.95"
vpage.6 = "4 8.5  0.2   3.95"

label.1 = "Mid"
label.2 = "Tra"
label.3 = "Significance"

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
bigdot = 0.25
critval = 95

tima = 7
timb = 6
leva = 1
levb = 10

"sdfopen "stema"-"stemb".track.forcing.nc"
"sdfopen "stema".track.forcing.nc"
"sdfopen "stemb".track.forcing.nc"

var.1 = "omega.2*1e2"
var.2 = "omega.3*1e2"
var.3 = "omegastat"

"set missconn on"
"set vpage "vpage.1
"set grads off"
"set t "tima
"set z "leva" "levb
"set vrange -27 0"
"set xlint 5"
"set digsiz 0.1"
"set xlab on"
"set ylab off"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)                                            ;# loop through levels to highlight
    b = leva                                            ;# significant differences
    while (b < levb+1)
      "set z "b
      "define var = "var.a
      "d var"
      var = subwrd(result,4)
      if (var >= critval)
        "define var = "var.1
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 0"
        "draw mark 3 "xval" "yval" "bigdot
        "set line 1"
        "draw mark 2 "xval" "yval" "bigdot

        "define var = "var.2
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 1"
        "draw mark 3 "xval" "yval" "bigdot
      endif
      b = b + 1
    endwhile
  else
    "d var"
  endif
  a = a + 1
endwhile
"draw title Vertical Velocity"

var.1 = "qvecon.2*1e18"
var.2 = "qvecon.3*1e18"
var.3 = "qveconstat"

"set missconn on"
"set vpage "vpage.2
"set grads off"
"set t "tima
"set z "leva" "levb
"set vrange 0 13"
"set xlint 2"
"set digsiz 0.1"
"set xlab on"
"set ylab on"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)                                            ;# loop through levels to highlight
    b = leva                                            ;# significant differences
    while (b < levb+1)
      "set z "b
      "define var = "var.a
      "d var"
      var = subwrd(result,4)
      if (var >= critval)
        "define var = "var.1
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 0"
        "draw mark 3 "xval" "yval" "bigdot
        "set line 1"
        "draw mark 2 "xval" "yval" "bigdot

        "define var = "var.2
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 1"
        "draw mark 3 "xval" "yval" "bigdot
      endif
      b = b + 1
    endwhile
  else
    "d var"
  endif
  a = a + 1
endwhile
"draw title Q-Vector Convergence"

var.1 = "stab.2*1e6"
var.2 = "stab.3*1e6"
var.3 = "stabstat"

"set missconn on"
"set vpage "vpage.3
"set grads off"
"set t "tima
"set z "leva" "levb
"set vrange 0 5"
"set xlint 1"
"set digsiz 0.1"
"set xlab on"
"set ylab off"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)                                            ;# loop through levels to highlight
    b = leva                                            ;# significant differences
    while (b < levb+1)
      "set z "b
      "define var = "var.a
      "d var"
      var = subwrd(result,4)
      if (var >= critval)
        "define var = "var.1
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 0"
        "draw mark 3 "xval" "yval" "bigdot
        "set line 1"
        "draw mark 2 "xval" "yval" "bigdot

        "define var = "var.2
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 1"
        "draw mark 3 "xval" "yval" "bigdot
      endif
      b = b + 1
    endwhile
  else
    "d var"
  endif
  a = a + 1
endwhile
"draw title Static Stability"

var.1 = "shum.2*1e3"
var.2 = "shum.3*1e3"
var.3 = "shumstat"

"set missconn on"
"set vpage "vpage.4
"set grads off"
"set t "tima
"set z "leva" "levb
"set vrange 0 10"
"set xlint 2"
"set digsiz 0.1"
"set xlab on"
"set ylab on"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)                                            ;# loop through levels to highlight
    b = leva                                            ;# significant differences
    while (b < levb+1)
      "set z "b
      "define var = "var.a
      "d var"
      var = subwrd(result,4)
      if (var >= critval)
        "define var = "var.1
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 0"
        "draw mark 3 "xval" "yval" "bigdot
        "set line 1"
        "draw mark 2 "xval" "yval" "bigdot

        "define var = "var.2
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 1"
        "draw mark 3 "xval" "yval" "bigdot
      endif
      b = b + 1
    endwhile
  else
    "d var"
  endif
  a = a + 1
endwhile
"draw title Specific Humidity"

var.1 = "vara.2*1e8"
var.2 = "vara.3*1e8"
var.3 = "varastat"

"set missconn on"
"set vpage "vpage.5
"set grads off"
"set t "tima
"set z "leva" "levb
"set vrange -4 8"
"set xlint 1"
"set digsiz 0.1"
"set xlab on"
"set ylab off"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)                                            ;# loop through levels to highlight
    b = leva                                            ;# significant differences
    while (b < levb+1)
      "set z "b
      "define var = "var.a
      "d var"
      var = subwrd(result,4)
      if (var >= critval)
        "define var = "var.1
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 0"
        "draw mark 3 "xval" "yval" "bigdot
        "set line 1"
        "draw mark 2 "xval" "yval" "bigdot

        "define var = "var.2
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 1"
        "draw mark 3 "xval" "yval" "bigdot
      endif
      b = b + 1
    endwhile
  else
    "d var"
  endif
  a = a + 1
endwhile
"draw title Specific Humidity Hor Flux Conv"

var.1 = "varb.2*1e8"
var.2 = "varb.3*1e8"
var.3 = "varbstat"

"set missconn on"
"set vpage "vpage.6
"set grads off"
"set t "tima
"set z "leva" "levb
"set vrange -8 4"
"set xlint 1"
"set digsiz 0.1"
"set xlab on"
"set ylab off"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)                                            ;# loop through levels to highlight
    b = leva                                            ;# significant differences
    while (b < levb+1)
      "set z "b
      "define var = "var.a
      "d var"
      var = subwrd(result,4)
      if (var >= critval)
        "define var = "var.1
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 0"
        "draw mark 3 "xval" "yval" "bigdot
        "set line 1"
        "draw mark 2 "xval" "yval" "bigdot

        "define var = "var.2
        "d var"
        var = subwrd(result,4)
        "q gr2xy "var" "b
        xval = subwrd(result,3)
        yval = subwrd(result,6)
        "set line 1"
        "draw mark 3 "xval" "yval" "bigdot
      endif
      b = b + 1
    endwhile
  else
    "d var"
  endif
  a = a + 1
endwhile
"draw title Specific Humidity Ver Flux Conv"

"set vpage off"
"set strsiz 0.11 0.11"
"set string 1 c"
x = 4.2
x2 = 4.4
y = 8.6
dely = 0.25
mrksiz = 0.1
a = 1
while (a < 3)
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x2" "y" "label.a
  y = y - dely/2.0
#  "draw string "x2" "y" "substr(timavg.a,1,6)
  y = y - dely
  a = a + 1
endwhile

"run gui_date"
date = result
"set string 1 c"
"set strsiz 0.15"
"draw string 4.25 0.2 "stema"-"stemb" "date
#"draw string 1.1 1.3 Central Pressure (hPa)"
##"draw string 1.1 1.7 Col Distance (km)"
#"draw string 1.1 6.2 Circulation (1e6 m2/s)"

#"set string 1 l 10 0"
#"set strsiz 0.3"
#"draw string 7.6 6.1 a"
#"draw string 7.6 1.6 b"

"run gui_print plot.track.forcing.vert."tima"."stema

"quit"
