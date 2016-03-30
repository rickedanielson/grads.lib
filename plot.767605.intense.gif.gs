# This script is designed to plot the central pressure values
* for different simulations (in time)
*
*     grads -bpc "plot.767605.intense"
*
* where no data files are required - RD August 2002.
* %%BoundingBox: 116 372 583 755
function compare(arg)

"clear"
"run disp_colours_rev"
"set grid off"
"set clopts 1 3 .14"
"set xlopts 1 4 .14"
"set ylopts 1 4 .14"

size = "x680 y880"

var.1 = "gridslp"
var.2 = "gridslp.2"
var.3 = "gridslp.3"
var.4 = "gridslp.4"
var.5 = "manuslp"
var.6 = "gridslp.6"
var.7 = "gridslp.7"

label.1 = "Full Removal (Dry dashed)"
#label.1 = "Full Removal"
label.2 = "Half Removal"
label.3 = "No Removal (Dry dashed)"
#label.3 = "No Removal"
label.4 = "Half Addition"
label.5 = "NCEP Reanalysis"

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
mrk.4 = 5
mrk.5 = 7
mrk.6 = 2
mrk.7 = 4

"sdfopen /home/rdanielson/model/out/runs/mmout_balpert9.track.west.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balpert10.track.west.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.track.west.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balpert11.track.west.nc"
"sdfopen /home/rdanielson/model/out/767605.track.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balpertdry.track.west.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcontdry.track.west.nc"

"set missconn on"
"set vpage 0 8.5 0.5 6.0"
"set grads off"
"set vrange 945 1030"
"set ylint 10"
#"set vrange 0 2500"
#"set ylint 500"
#"set t 25 37"
"set t 1 20"
"set digsiz 0.1"
"set xlab on"

a = 1
while (a < 5)
if (a = 5)
  a = 6
endif
  "set ccolor 1"
  "define var = "var.a
#  "define var = 1e-3*tracknum."a
  "set cmark "mrk.a
  if (a = 6 | a = 7)
    "set cstyle 3"
  else
    "set cstyle 1"
  endif
  "d var"
  a = a + 1
endwhile

"set missconn on"
"set vpage 0 8.5 5.0 11"
"set grads off"
"set vrange 0 225"
"set ylint 25"
"set t 25 37"
"set digsiz 0.1"
"set xlab off"

a = 8
while (a < 8)
  "set ccolor 1"
  "define var = 1e-6*tropnum."a
  "set cmark "mrk.a
#  "d smth9(var)"
  if (a = 6 | a = 7)
    "set cstyle 3"
  else
    "set cstyle 1"
  endif
  "d var"
  a = a + 1
endwhile
"draw title Eastern Cyclone Intensification"

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 l"
#x = 2.2
#x2 = 2.4
#y = 10.0
x = 2.5
x2 = 2.7
y = 9.6
dely = 0.25
mrksiz = 0.1
a = 4
while (a > 0)
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x2" "y" "label.a
  y = y - dely/2.0
#  "draw string "x2" "y" "substr(timavg.a,1,6)
  y = y - dely
  a = a - 1
endwhile
#"draw mark "mrk.5" "x" "y" "mrksiz
#"draw string "x2" "y" "label.5

y = 1.9
"draw mark "mrk.5" "x" "y" "mrksiz
"draw string "x2" "y" NCEP Manual Analysis"

"set string 1 l 4 90"
"set strsiz 0.2"
"draw string 1.1 1.3 Central Pressure (hPa)"
#"draw string 1.1 1.7 Col Distance (km)"
"draw string 1.1 6.2 Circulation (1e6 m2/s)"

"set string 1 l 10 0"
"set strsiz 0.3"
"draw string 7.6 6.1 a"
"draw string 7.6 1.6 b"

#"printim plot.767605.intense.gif gif "size" white"
"run gui_print plot.767605.intense"
"quit"
