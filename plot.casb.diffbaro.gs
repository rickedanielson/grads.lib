# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casb.diffbaro"
*
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .19"
"set xlopts 1 4 .17"
"set ylopts 1 4 .16"

file.1.1 = "/home/rdanielson/model/out/runs/mmout_balpert9.budget.energy.conversion.eddy.nc"
file.1.2 = "/home/rdanielson/model/out/runs/mmout_balpert9.nc"
file.1.3 = "/home/rdanielson/model/out/runs/mmout_balpert9.track.nc"
file.1.4 = "/home/rdanielson/model/out/runs/mmout_balpert9.track.west.nc"
file.2.1 = "/home/rdanielson/model/out/runs/mmout_balpert10.budget.energy.conversion.eddy.nc"
file.2.2 = "/home/rdanielson/model/out/runs/mmout_balpert10.nc"
file.2.3 = "/home/rdanielson/model/out/runs/mmout_balpert10.track.nc"
file.2.4 = "/home/rdanielson/model/out/runs/mmout_balpert10.track.west.nc"
file.3.1 = "/home/rdanielson/model/out/runs/mmout_balcont3.budget.energy.conversion.eddy.nc"
file.3.2 = "/home/rdanielson/model/out/runs/mmout_balcont3.nc"
file.3.3 = "/home/rdanielson/model/out/runs/mmout_balcont3.track.nc"
file.3.4 = "/home/rdanielson/model/out/runs/mmout_balcont3.track.west.nc"
file.4.1 = "/home/rdanielson/model/out/runs/mmout_balpert11.budget.energy.conversion.eddy.nc"
file.4.2 = "/home/rdanielson/model/out/runs/mmout_balpert11.nc"
file.4.3 = "/home/rdanielson/model/out/runs/mmout_balpert11.track.nc"
file.4.4 = "/home/rdanielson/model/out/runs/mmout_balpert11.track.west.nc"

time   = 3

dellat = "25 70"
dellon = "110 185"

vpage.1  = "0.0  4.4  6.9  11.0"
vpage.2  = "0.0  4.4  3.7   7.8"
vpage.3  = "4.1  8.5  6.9  11.0"
vpage.4  = "4.1  8.5  3.7   7.8"

label.1  = "2.25 10.5 a) Full Removal (12h)"
label.2  = "2.25 7.3  b) Half Removal (12h)"
label.3  = "6.35 10.5 c) No Removal (12h)"
label.4  = "6.35 7.3  d) Half Addition (12h)"

  b = 1
  while (b < 5)
    "sdfopen "file.b.1
    "sdfopen "file.b.2
    "sdfopen "file.b.3
    "sdfopen "file.b.4
    "set lat "dellat
    "set lon "dellon
    "set vpage "vpage.b
    "set grads off"
    "set t "time
    if (b = 1 | b = 2)
      "set ylab on"
    else
      "set ylab off"
    endif
    if (b = 2 | b = 4)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set xlint 20"
    "set ylint 10"

    "set cthick 4"
    "set clab off"
    "run disp_shaded_nozero smth9(barovint) 25"
    "set clab off"
    "run disp_unshaded_nozero slp.2/100 4 944"
    "set clab on"
    "run disp_unshaded_nozero slp.2/100 20 948"
    "set line 1 1 7"
    "set cthick 10"
    if (b = 1)
      "run disp_vector_newlab uagfvint/1e6 vagfvint/1e6 100 8.5 0.8"
    else
      "run disp_vector_nolab  uagfvint/1e6 vagfvint/1e6 100"
    endif
    "set clab off"
    "set cthick 4"
#    "run disp_unshaded_nozero hgt.2(lev=500) 300 4100 10"
    "set line 1 1 10"
    "run gui_track_simple 3 gridlat.3 gridlon.3 1 0.0 0.25"
    "run gui_track_simple 4 gridlat.4 gridlon.4 1 0.0 0.25"
    "run gui_date"
    date = result
#    "draw title "label.b
#    "draw title "date

    "close 4"
    "close 3"
    "close 2"
    "close 1"
    b = b + 1
  endwhile

  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  b = 1
  while (b < 5)
    "draw string "label.b
    "draw string "label.b
    "draw string "label.b
    b = b + 1
  endwhile
"run gui_print plot.casb.diffbaro"
"quit"
