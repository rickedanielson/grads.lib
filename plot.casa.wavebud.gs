# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casa.wavebud"
*
* %%BoundingBox: 20 330 581 754
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours_light"
"set grid off"
"set clopts 1 3 .19"
"set xlopts 1 4 .15"
"set ylopts 1 4 .15"

dotsize = 0.0
bigdot = 0.22

"sdfopen /home/rdanielson/model/out/767605.nc"
"sdfopen /home/rdanielson/model/out/767602.track.nc"
"sdfopen /home/rdanielson/model/out/767605.track.nc"
"sdfopen /home/rdanielson/model/out/767605.quasi.geost.wave.activity.nc"
"sdfopen /home/rdanielson/model/out/767605.quasi.geost.wave.activity.budget.nc"
"set lat 22.5 72.5"
"set lon 100 250"
"set t 63"

vpage.1  = "0.0  4.3  8.4  10.8"
vpage.2  = "0.0  4.3  6.3   8.7"
vpage.3  = "0.0  4.3  4.2   6.6"
vpage.4  = "4.2  8.5  8.4  10.8"
vpage.5  = "4.2  8.5  6.3   8.7"
vpage.6  = "4.2  8.5  4.2   6.6"

label.1  = "2.1  10.55 a) `36`2M/`36`2t`0 (4`3*`010`a-4`n m s`a-2`n)"
label.2  = "2.1   8.45 b) -`36`2W`0`b3`n/`36`0p (2`3*`010`a-4`n m s`a-2`n)"
label.3  = "2.1   6.35 c) `2W`0`b3`n (2 Pa m s`a-2`n)"
label.4  = "6.35 10.55 d) -`37`2`bp`n`32`5W`0`b1,2`n (4`3*`010`a-4`n m s`a-2`n)"
label.5  = "6.35  8.45 e) `2D`0 (4`3*`010`a-4`n m s`a-2`n)"
label.6  = "6.35  6.35 f) -`372`5W`0 Check (4`3*`010`a-4`n m s`a-2`n)"

var.1  = "wtendvavg.5"
var.2  = "wvfcvavg.5"
var.3  = "wwavevavg.4"
var.4  = "whfcvavg.5"
var.5  = "wresvavg.5"
var.6  = "-chkfvavg.5"

conin.1 = 4e-4
conin.2 = 2e-4
conin.3 = 2
conin.4 = 4e-4
conin.5 = 4e-4
conin.6 = 4e-4

  b = 1
  while (b < 7)
    "set vpage "vpage.b
    "set grads off"
    if (b = 1 | b = 2 | b = 3)
      "set ylab on"
    else
      "set ylab off"
    endif
    if (b = 3 | b = 6)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set xlint 20"
    "set ylint 10"

    "set cthick 4"
    "set clab off"
    "run disp_shaded_nozero "var.b" "conin.b
    "set line 1 1 4"
    "set cthick 10"
    if (b = 4)
      "run disp_vector_newlab uwavevavg.4 vwavevavg.4 2000"
    endif
    "set clab off"
    "set cthick 4"
    "run disp_unshaded_nozero hgt(lev=500) 300 4100 10"
    "set line 1 1 15"
    "run gui_track_simple 2 gridlat.2 gridlon.2 1 "dotsize" "bigdot
    "run gui_track_simple 3 gridlat.3 gridlon.3 1 "dotsize" "bigdot

    b = b + 1
  endwhile

  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  b = 1
  while (b < 7)
    "draw string "label.b
    b = b + 1
  endwhile
"run gui_print plot.casa.wavebud"
"quit"
