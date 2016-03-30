# This script is designed to plot the central pressure values
* for different simulations (in time)
*
*     grads -bpc "plot.casb.score"
*
* where no data files are required - RD August 2002.
* %%BoundingBox: 130 438 575 756
function compare(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .16"
"set xlopts 1 4 .16"
"set ylopts 1 4 .16"

var.1 = "tracklat"
var.2 = "tracklon"
var.3 = "tracknum"
var.4 = "gridslp.4"
var.5 = "manuslp"

label.1 = "No Advance"
label.2 = "6-h Advance"
label.3 = "12-h Advance"
label.4 = "Half PV Addition"
label.5 = "Manual"

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
mrk.4 = 5
mrk.5 = 7

"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.scores.nc"

"set missconn off"
"set vpage 0 8.5 6.0 11"
"set grads off"
"set vrange 00 60"
"set ylint 10"
"set t 21 41"
"set digsiz 0.1"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  "d var"
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.17 0.17"
"set string 1 l"
x = 2.3
x2 = 2.5
y = 10.0
dely = 0.23
mrksiz = 0.13
a = 3
while (a > 0)
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x2" "y" "label.a
#  "draw string "x2" "y" "var.a
  y = y - dely/2.0
#  "draw string "x2" "y" "substr(timavg.a,1,6)
  y = y - dely
  a = a - 1
endwhile
"set string 1 c"
"set strsiz 0.22 0.22"
"draw string 5.25 10.55 Control S1 Scores"

"run gui_print plot.casb.score"
"quit"
