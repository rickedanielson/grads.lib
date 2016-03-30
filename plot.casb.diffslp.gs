# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casb.diffslp"
*
* %%BoundingBox: 25 252 572 767
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .19"
"set xlopts 1 4 .17"
"set ylopts 1 4 .16"

file.1.1 = "/home/rdanielson/model/out/runs/mmout_balpert9.nc"
file.1.2 = "/home/rdanielson/model/out/runs/mmout_balpert9.track.nc"
file.1.3 = "/home/rdanielson/model/out/runs/mmout_balpert9.vort.mask.nc"
file.2.1 = "/home/rdanielson/model/out/runs/mmout_balpert10.nc"
file.2.2 = "/home/rdanielson/model/out/runs/mmout_balpert10.track.nc"
file.2.3 = "/home/rdanielson/model/out/runs/mmout_balpert10.vort.mask.nc"
file.3.1 = "/home/rdanielson/model/out/runs/mmout_balcont3.nc"
file.3.2 = "/home/rdanielson/model/out/runs/mmout_balcont3.track.nc"
file.3.3 = "/home/rdanielson/model/out/runs/mmout_balcont3.vort.mask.nc"
file.4.1 = "/home/rdanielson/model/out/runs/mmout_balpert11.nc"
file.4.2 = "/home/rdanielson/model/out/runs/mmout_balpert11.track.nc"
file.4.3 = "/home/rdanielson/model/out/runs/mmout_balpert11.vort.mask.nc"

time.1 = 19

dellat = "29 74"
dellon = "175 250"

vpage.1  = "0.0  4.4  6.9  11.0"
vpage.2  = "0.0  4.4  3.7   7.8"
vpage.3  = "4.1  8.5  6.9  11.0"
vpage.4  = "4.1  8.5  3.7   7.8"

label.1  = "2.25 10.5 a) Full Removal (84h)"
label.2  = "2.25 7.3  b) Half Removal (84h)"
label.3  = "6.35 10.5 c) No Removal (84h)"
label.4  = "6.35 7.3  d) Half Addition (84h)"

a = 1
while (a < 5)
  "sdfopen "file.a.1
  "sdfopen "file.a.2
  "sdfopen "file.a.3
  "set lat "dellat
  "set lon "dellon

  "set vpage "vpage.a
  "set grads off"
  "set t "time.1
  if (a < 3)
    "set ylab on"
  else
    "set ylab off"
  endif
  if (a = 2 | a = 4)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set xlint 15"
  "set ylint 10"
  "set clab off"
  "run disp_unshaded_nozero slp/100 4 944"
  "set clab on"
  "run disp_unshaded_nozero slp/100 8 944"
  "set line 1 1 10"
  "run gui_track_simple 2 gridlat.2 gridlon.2 1 0.0 0.25"
  "set clab off"
  "run disp_masks_one mask.3 slp 0"
  "set line 1 1 4"
#  "draw title "label.a
  "close 3"
  "close 2"
  "close 1"
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
b = 1
while (b < 5)
  "draw string "label.b
  b = b + 1
endwhile

"run gui_print plot.casb.diffslp"
"quit"
