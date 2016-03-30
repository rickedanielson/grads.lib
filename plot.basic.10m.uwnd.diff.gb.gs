# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.10m.uwnd.diff.gb decjan-octmar 40 140"
*
* where cmp86 is the file stem and 45 -65 is the stationary central
* position - RD October 2000.

function verint(arg)

budget = "basic.10m.uwnd"

"clear"
"run disp_colours_dark"
"set grid off"
tag = subwrd(arg,1)
position = subwrd(arg,2)" "subwrd(arg,3)" "subwrd(arg,2)" "subwrd(arg,3)
shift = subwrd(arg,4)
dellat = subwrd(arg,5)
dellon = subwrd(arg,6)
domain = subwrd(arg,7)
if (shift = "")
  shift = 0
endif
if (dellat = "")
  dellat = 20
endif
if (dellon = "")
  dellon = 50
endif
#"set mproj scaled"

"sdfopen "tag".10m.winds.nc"

tima = 2
timb = 12

var.0 = "uwndstat"
var.1 = "uwndanom"
conin.1 = 0.2

vpage.1  = "0.0  4.4  0.1   2.1"
vpage.2  = "0.0  4.4  1.9   3.9"
vpage.3  = "0.0  4.4  3.7   5.7"
vpage.4  = "0.0  4.4  5.5   7.5"
vpage.5  = "0.0  4.4  7.3   9.3"
vpage.6  = "2.05 6.45 9.0  11.0"
vpage.7  = "4.1  8.5  7.3   9.3"
vpage.8  = "4.1  8.5  5.5   7.5"
vpage.9  = "4.1  8.5  3.7   5.7"
vpage.10 = "4.1  8.5  1.9   3.9"
vpage.11 = "4.1  8.5  0.1   2.1"

#  plot the time series

a = tima
b = 1
while (a <= timb)
  "set t "a
  "set vpage "vpage.b
  "set grads off"
  "run gui_view_grid "dellat" "dellon" "position

#  "set clopts 1 3 0.15"
#  "set xlopts 1 3 0.2"
#  "set ylopts 1 3 0.2"
  "set xlint 20"
  "set ylint 10"
  "set clab off"
  "run disp_stat_95_99 "var.0
  "set cthick 8"
  "run disp_unshaded_nozero "var.1" "conin.1
  "set cthick 3"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
  b = b + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 0.20 10-m Zonal Wind Difference ("conin.1" m/s)"
#"draw string 4.25 0.20 and t-Test Significance (shaded)"
"set strsiz 0.1 0.1"
"set string 1 l"
"draw string 6.0 10.8 "tag
"run disp_label_95_99 1 1 1.3 9.5 10"
"run gui_print plot."tag".basic.10m.uwnd"
"quit"
