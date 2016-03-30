# This script is designed to plot the comparison of a variable at
* different levels.  It can be executed using a command like
*
*     grads -bpc "plot.pvinv.comparison.strm 767605.totl.res.integrals.nc 767605.totl.integrals.nc"
*
* where the two data files contain the variables to be compared - RD April 2001.

function compare(arg)

"clear"
"run disp_colours"
"set grid off"
infila = subwrd(arg,1)
infilb = subwrd(arg,2)

"sdfopen "infila
"sdfopen "infilb

"set t 1"
#"set lat 30 65"
#"set lon 160 225"
"set lat 22.5 87.5"
"set lon 40 270"
#"set lat 22.5 67.5"
#"set lon -110 -30"

var.0 = "strm"
var.1 = "strm.2"

lev.1 = "100"
lev.2 = "200"
lev.3 = "300"
lev.4 = "400"
lev.5 = "500"
lev.6 = "600"
lev.7 = "850"
lev.8 = "1000"

conin.0 = 0.2e7
conin.1.1 = 2.0e7
conin.1.2 = 2.0e7
conin.1.3 = 2.0e7
conin.1.4 = 1.6e7
conin.1.5 = 1.4e7
conin.1.6 = 1.2e7
conin.1.7 = 1.0e7
conin.1.8 = 0.8e7

vpage.1 = "0.0  4.5  8.1  11.0"
vpage.2 = "4.0  8.5  8.1  11.0"
vpage.3 = "0.0  4.5  5.6   8.5"
vpage.4 = "4.0  8.5  5.6   8.5"
vpage.5 = "0.0  4.5  3.1   6.0"
vpage.6 = "4.0  8.5  3.1   6.0"
vpage.7 = "0.0  4.5  0.6   3.5"
vpage.8 = "4.0  8.5  0.6   3.5"

# plot the series

a = 1
while (a < 9)
  "set lev "lev.a
  "set vpage "vpage.a
  "set grads off"
  if (a = 1 | a = 2 | a = 3 | a = 4 | a = 5 | a = 6)
    "set xlab off"
  else
    "set xlab on"
  endif
  if (a = 2 | a = 4 | a = 6 | a = 8)
    "set ylab off"
  else
    "set ylab on"
  endif
  "set clab off"
  "set cthick 8"
  "run disp_shaded_nozero "var.0"-"var.1" "conin.0
  "set cint "conin.1.a
  "set clab off"
  "set cthick 4"
  "d "var.0
  "draw title "lev.a"-hPa Streamfunction ("conin.1.a" m2/s)"
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"run gui_date"
date = result
"draw string 4.25 0.4 "date" Streamfunction Differences ("conin.0" m2/s)"
"set strsiz 0.1 0.1"
"draw string 4.25 0.1 "infila" - "infilb
"run gui_print plot.pvinv.comp.strm."infila"."infilb
"quit"
