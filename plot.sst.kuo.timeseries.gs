# This script is designed to plot the central pressure values
* for different simulations (in time)
*
*     grads -bpc "plot.sst.kuo.timeseries"
*
* where no data files are required - RD August 2002.
* %%BoundingBox: 121 460 586 756
function compare(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .14"
"set xlopts 1 4 .14"
"set ylopts 1 4 .14"

var.1 = "tracklat"
var.2 = "tracklon*10"
var.3 = "tracknum"
var.4 = "gridslp.4"
var.5 = "manuslp"

label.1 = "Explosive Cyclones"
label.2 = "Transitional SST Anomaly (*10)"
label.3 = "12-h Lag"
label.4 = "Half PV Addition"
label.5 = "Manual"

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
mrk.4 = 5
mrk.5 = 7

"sdfopen 000000.track.nc"

"set missconn on"
"set vpage 0 8.5 6.0 11"
"set grads off"
"set vrange -19 24"
"set ylint 5"
"set t 1 29"
"set digsiz 0.1"
"set xlabs 58/59 | | | | 62/63 | | | | 66/67 | | | | 70/71 | | | | 74/75 | | | | 78/79 | | | | 82/83 | | | | 86/87"

a = 1
while (a < 3)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  "d var"
  a = a + 1
endwhile
#"draw title Western North Pacific Strong Cyclones"

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 l"
x = 2.3
x2 = 2.5
y = 7.35
dely = 0.2
mrksiz = 0.1
a = 1
while (a < 3)
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x2" "y" "label.a
#  "draw string "x2" "y" "var.a
  y = y - dely/2.0
#  "draw string "x2" "y" "substr(timavg.a,1,6)
  y = y - dely
  a = a + 1
endwhile

"run gui_print plot.sst.kuo.timeseries"
"quit"
