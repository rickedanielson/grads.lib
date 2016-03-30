# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casb.diffke"
*
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .19"
"set xlopts 1 4 .17"
"set ylopts 1 4 .16"
dotsize = 0.0
bigdot = 0.2

file.1.1 = "/home/rdanielson/model/out/runs/mmout_balpert9.budget.energy.conversion.eddy.nc"
file.1.2 = "/home/rdanielson/model/out/runs/mmout_balpert9.nc"
file.1.3 = "/home/rdanielson/model/out/runs/mmout_balpert9.track.nc"
file.1.4 = "/home/rdanielson/model/out/runs/mmout_balpert9.track.west.nc"
file.2.1 = "/home/rdanielson/model/out/runs/mmout_balcont3.budget.energy.conversion.eddy.nc"
file.2.2 = "/home/rdanielson/model/out/runs/mmout_balcont3.nc"
file.2.3 = "/home/rdanielson/model/out/runs/mmout_balcont3.track.nc"
file.2.4 = "/home/rdanielson/model/out/runs/mmout_balcont3.track.west.nc"
file.3.1 = "/home/rdanielson/model/out/runs/mmout_balpert10.budget.energy.conversion.eddy.nc"
file.3.2 = "/home/rdanielson/model/out/runs/mmout_balpert10.nc"
file.3.3 = "/home/rdanielson/model/out/runs/mmout_balpert10.track.nc"
file.3.4 = "/home/rdanielson/model/out/runs/mmout_balpert10.track.west.nc"
file.4.1 = "/home/rdanielson/model/out/runs/mmout_balpert11.budget.energy.conversion.eddy.nc"
file.4.2 = "/home/rdanielson/model/out/runs/mmout_balpert11.nc"
file.4.3 = "/home/rdanielson/model/out/runs/mmout_balpert11.track.nc"
file.4.4 = "/home/rdanielson/model/out/runs/mmout_balpert11.track.west.nc"

dellat = "22.5 72.5"
dellon = "110 250"

time.1 = 3
time.2 = 9
time.3 = 15

vpage.1.1  = "0.0  4.4  8.6  11.0"
vpage.1.2  = "0.0  4.4  6.4   8.8"
vpage.1.3  = "0.0  4.4  4.2   6.6"
vpage.2.1  = "4.1  8.5  8.6  11.0"
vpage.2.2  = "4.1  8.5  6.4   8.8"
vpage.2.3  = "4.1  8.5  4.2   6.6"
vpage.3.3  = "0.0  4.4  2.0   4.4"
vpage.4.3  = "4.1  8.5  2.0   4.4"

label.1.1  = "a) 12 UTC 8 March Full Removal (12h)"
label.1.2  = "b) 00 UTC 10 March Full Removal (48h)"
label.1.3  = "c) 12 UTC 11 March Full Removal (84h)"
label.2.1  = "e) 12 UTC 8 March No Removal (12h)"
label.2.2  = "f) 00 UTC 10 March No Removal (48h)"
label.2.3  = "g) 12 UTC 11 March No Removal (84h)"
label.3.3  = "d) 12 UTC 11 March Half Removal (84h)"
label.4.3  = "h) 12 UTC 11 March Half Addition (84h)"

a = 1
while (a < 5)
  "sdfopen "file.a.1
  "sdfopen "file.a.2
  "sdfopen "file.a.3
  "sdfopen "file.a.4
  "set lat "dellat
  "set lon "dellon
  if (a < 3)
    b = 1
  else
    b = 3
  endif
  while (b < 4)
    "set vpage "vpage.a.b
    "set grads off"
    "set t "time.b
    if (a = 1 | a = 3)
      "set ylab on"
    else
      "set ylab off"
    endif
    if (a > 2)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set xlint 20"
    "set ylint 10"

    "set clab off"
    "set cthick 4"
    "run disp_shaded_nozero kinevint/1e6 1"
    "set clab on"
    "run disp_unshaded_nozero kinevint/1e6 3"
    "set cthick 7"
    if (b = 1)
      "run disp_vector_newlab uagfvint/1e6 vagfvint/1e6 100"
    else
      "run disp_vector_nolab uagfvint/1e6 vagfvint/1e6 100"
    endif
    "set cthick 4"
    "set clab off"
    "run disp_unshaded_nozero hgt.2(lev=500) 300 4100"
#    "set cthick 10"
#    "run disp_masks mask.3 kinevint.2 750001"
#    if (b != 1)
      "set line 1 1 10"
      "run gui_track_simple 3 gridlat.3 gridlon.3 1 "dotsize" "bigdot
      "run gui_track_simple 4 gridlat.4 gridlon.4 1 "dotsize" "bigdot
      "set line 1 1 3"
#    endif

    "run gui_date"
    date = result
    "draw title "label.a.b
#    "draw title "date
    b = b + 1
  endwhile
  "close 4"
  "close 3"
  "close 2"
  "close 1"
  a = a + 1
endwhile
"run gui_print plot.casb.diffke"
"quit"
