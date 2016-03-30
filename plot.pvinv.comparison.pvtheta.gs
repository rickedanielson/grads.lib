# This script is designed to plot the comparison of a variable at
* different levels.  It can be executed using a command like
*
*     grads -bpc "plot.pvinv.comparison.pvtheta 767605.totl.potential.vorticity.nc.modified 767605.totl.potential.vorticity.nc.unmodified"
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
RADIN  =   750                                          ;* radius of anomaly removal inner domain (km)
RADOUT =   1500                                         ;* radius of anomaly removal outer domain (km)

swit = 1
if (swit = 1)
"set lat 27.5 77.5"
"set lon 50 155"
NEGLAT =   56.0                                         ;* central latitude  of the negative anomaly removal domain
NEGLON =   91.0                                         ;* central longitude of the negative anomaly removal domain
POSLAT =   50.0                                         ;* central latitude  of the positive anomaly removal domain
POSLON =   115.0
else
"set lat 17.5 67.5"
"set lon 120 225"
NEGLAT =   42.0                             ;* central latitude  of the negative anomaly removal domain
NEGLON =   145.0                            ;* central longitude of the negative anomaly removal domain
POSLAT =   37.0                             ;* central latitude  of the positive anomaly removal domain
POSLON =   192.0
endif

vpage.1 = "0.0  4.5  8.1  11.0"
vpage.2 = "4.0  8.5  8.1  11.0"
vpage.3 = "0.0  4.5  5.6   8.5"
vpage.4 = "4.0  8.5  5.6   8.5"
vpage.5 = "0.0  4.5  3.1   6.0"
vpage.6 = "4.0  8.5  3.1   6.0"
vpage.7 = "0.0  4.5  0.6   3.5"
vpage.8 = "4.0  8.5  0.6   3.5"

var.0 = "potv*1e6"
var.1 = "potv.2(t=1)*1e6"
var.2 = "pott"
var.3 = "pott.2(t=1)"

lev.1 = "100"
lev.2 = "150"
lev.3 = "150"
lev.4 = "200"
lev.5 = "250"
lev.6 = "300"
lev.7 = "400"

conin.0 = 1.0
conin.1.1 = 5.0
conin.1.2 = 5.0
conin.1.3 = 1.5
conin.1.4 = 1.5
conin.1.5 = 1.0
conin.1.6 = 0.75
conin.1.7 = 0.5
conin.2 = 1.0

# plot the series

a = 1
while (a < 8)
  "set lev "lev.a
  "set vpage "vpage.a
  "set grads off"
#  if (a = 1 | a = 2 | a = 3 | a = 4 | a = 5)
#    "set xlab off"
#  else
#    "set xlab on"
#  endif
#  if (a = 2 | a = 4 | a = 6)
#    "set ylab off"
#  else
#    "set ylab on"
#  endif
  if (a = 1 | a = 2)
    "run disp_shaded_nozero "var.2"-"var.3" "conin.2
    "set cint "conin.1.a
#    "d "var.2
    "draw title "lev.a"-hPa Potential Temperature ("conin.1.a" K)"
  else
    "run disp_shaded_nozero "var.0"-"var.1" "conin.0
    "set cint "conin.1.a
#    "d "var.0
    "draw title "lev.a"-hPa PV ("conin.1.a" PVU)"
  endif
  "run disp_circle "NEGLAT" "NEGLON" "RADIN"  1"
  "run disp_circle "NEGLAT" "NEGLON" "RADOUT" 1"
  "run disp_circle "POSLAT" "POSLON" "RADIN"  1"
  "run disp_circle "POSLAT" "POSLON" "RADOUT" 1"
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"run gui_date"
date = result
"draw string 4.25 0.4 "date" PV/Theta Differences ("conin.0" PVU / "conin.2" K)"
"set strsiz 0.1 0.1"
"draw string 4.25 0.1 "infila" - "infilb
"run gui_print plot.pvinv.comp.pvtheta.a"
"clear"

lev.1 = "400"
lev.2 = "500"
lev.3 = "600"
lev.4 = "700"
lev.5 = "850"
lev.6 = "925"
lev.7 = "925"
lev.8 = "1000"

conin.0 = 0.2
conin.1.1 = 0.3
conin.1.2 = 0.3
conin.1.3 = 0.2
conin.1.4 = 0.2
conin.1.5 = 0.2
conin.1.6 = 0.2
conin.1.7 = 5.0
conin.1.8 = 5.0
conin.2 = 2.0

# plot the series

a = 2
while (a < 9)
  "set lev "lev.a
  "set vpage "vpage.a
  "set grads off"
#  if (a = 1 | a = 2 | a = 3 | a = 4 | a = 5 | a = 6)
#    "set xlab off"
#  else
#    "set xlab on"
#  endif
#  if (a = 4 | a = 6 | a = 8)
#    "set ylab off"
#  else
#    "set ylab on"
#  endif
  if (a = 7 | a = 8)
    "run disp_shaded_nozero "var.2"-"var.3" "conin.2
    "set cint "conin.1.a
#    "d "var.2
    "draw title "lev.a"-hPa Potential Temperature ("conin.1.a" K)"
  else
    "run disp_shaded_nozero "var.0"-"var.1" "conin.0
    "set cint "conin.1.a
#    "d "var.0
    "draw title "lev.a"-hPa PV ("conin.1.a" PVU)"
  endif
  "run disp_circle "NEGLAT" "NEGLON" "RADIN"  1"
  "run disp_circle "NEGLAT" "NEGLON" "RADOUT" 1"
  "run disp_circle "POSLAT" "POSLON" "RADIN"  1"
  "run disp_circle "POSLAT" "POSLON" "RADOUT" 1"
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"run gui_date"
date = result
"draw string 4.25 0.4 "date" PV/Theta Differences ("conin.0" PVU / "conin.2" K)"
"set strsiz 0.1 0.1"
"draw string 4.25 0.1 "infila" - "infilb
"run gui_print plot.pvinv.comp.pvtheta.b"
"quit"
