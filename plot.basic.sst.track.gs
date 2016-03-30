# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.sst.track 789177 40 185"
*
* where cmp86 is the file stem and 45 -65 is the stationary central
* position - RD October 2000.

function plot(arg)

"clear"
"run disp_colours_dark colour"
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
  dellat = 22.5
endif
if (dellon = "")
  dellon = 55
endif
#"set mproj scaled"
masking = 1

"sdfopen "tag".sst.5day.nc"
#"sdfopen "tag".track.nc"
#"sdfopen /home/rdanielson/eastern.bombs/ncep/"tag".nc"

tima = 4
timb = 4

var.0 = "stat"
var.1 = "slpanom/100"
var.2 = "slp.3/100"

limit = 1000
conin.1 = 1.0
conin.2 = 3

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
b = 2
while (a <= timb)
  "set t "a
#  "set vpage "vpage.b
  "set grads off"
  "set clopts 1 3 0.15"
  "set xlopts 1 3 0.15"
  "set ylopts 1 3 0.15"
  "set xlint 10"
  "set ylint 5"
  "run gui_view_grid "dellat" "dellon" "position
#  "set lat 30 60"
#  "set lon -80 -20"

  "set cthick 8"
  "set clab off"
  "run disp_shaded_nozero maskout(sstanom,"limit"-infl) "conin.1
  "set cthick 3"
  "set clab off"
  "run disp_unshaded maskout(sst,"limit"-infl) "conin.2
  "set clab on"
  "run disp_unshaded maskout(sst,"limit"-infl) "conin.2*2

  if (masking = 1)
    "run basemap L 0 1"
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 1"
    "draw rec "xl" "yb" "xr" "yt
  endif

#  "set cthick 6"
#  "set clab off"
#  "run disp_unshaded_nozero "var.2" "conin.2" "940
#  "set clab on"
#  "run disp_unshaded_nozero "var.2" "conin.2*2" "940
#  "run disp_box_grid 5 7.5 0 0 0 0 35 142.5"

#  "run gui_track_simple 2 manulat manulon 1"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
  b = b + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
#"draw string 5.25 0.55 SLP, SST Anomaly ("conin.1"`3.`0C) and ENP Cyclone Track at T0"
#"set strsiz 0.1 0.1"
"set string 1 r"
"draw string 10.8 7.7 "tag
#"run disp_label_95_99 1 1 1.3 9.5 10"
#"run gui_print plot."tag".basic.slp.sst"
"run gui_print_colour plot."tag".basic.slp.sst"
"quit"
