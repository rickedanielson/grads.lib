# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casb.control"
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
bigdot = 0.22

"sdfopen /home/rdanielson/model/out/767605.nc"
"sdfopen /home/rdanielson/model/out/767605.nc"
"sdfopen /home/rdanielson/model/out/767602.track.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.track.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.potential.vorticity.nc"
"sdfopen /home/rdanielson/model/out/767605.potential.vorticity.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.track.west.nc"
"set lat 22.5 72.5"
"set lon 100 250"

time.1 = 55
time.2 = 59
time.3 = 63
time.4 = 67
time.5 = 71

vpage.1.1  = "0.0  4.3  8.4  10.8"
vpage.1.2  = "0.0  4.3  6.3   8.7"
vpage.1.3  = "0.0  4.3  4.2   6.6"
vpage.1.4  = "0.0  4.3  2.1   4.5"
vpage.1.5  = "0.0  4.3  0.0   2.4"
vpage.2.1  = "4.2  8.5  8.4  10.8"
vpage.2.2  = "4.2  8.5  6.3   8.7"
vpage.2.3  = "4.2  8.5  4.2   6.6"
vpage.2.4  = "4.2  8.5  2.1   4.5"
vpage.2.5  = "4.2  8.5  0.0   2.4"

label.1.1  = "1.4  10.55 a) SLP (8 hPa)"
label.1.2  = "1.4   8.45 b)"
label.1.3  = "1.4   6.35 c)"
label.1.4  = "1.4   4.25 d)"
label.1.5  = "1.4   2.15 e)"
label.2.1  = "7.1  10.55 f) Trop-`3z`0 (10 K)"
label.2.2  = "7.1   8.45 g)"
label.2.3  = "7.1   6.35 h)"
label.2.4  = "7.1   4.25 i)"
label.2.5  = "7.1   2.15 j)"
label.3.1  = "4.25 10.55 00 UTC 8 March (0h)"
label.3.2  = "4.25  8.45 00 UTC 9 March (24h)"
label.3.3  = "4.25  6.35 00 UTC 10 March (48h)"
label.3.4  = "4.25  4.25 00 UTC 11 March (72h)"
label.3.5  = "4.25  2.15 00 UTC 12 March (96h)"

  b = 1
  while (b < 6)
    a = 1
    "set vpage "vpage.a.b
    "set grads off"
    "set t "time.b
    if (a = 1)
      "set ylab on"
    else
      "set ylab off"
    endif
    if (b = 5)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set xlint 20"
    "set ylint 10"

    "set cthick 7"
    "set clab off"
    "run disp_shaded_nozero slp.5/100-slp.2/100 8"
    "set cthick 4"
    "set clab off"
    "run disp_unshaded_nozero slp.5/100 8 940"
    "set clab on"
    "run disp_unshaded_nozero slp.5/100 24 940"
    "set line 1 1 15"
    "run gui_track_simple 8 gridlat.8 gridlon.8 1 "dotsize" "bigdot
    "run gui_track_simple 4 gridlat.4 gridlon.4 1 "dotsize" "bigdot

    a = 2
    "set vpage "vpage.a.b
    "set grads off"
    "set ylab off"
    if (b = 5)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set xlint 20"
    "set ylint 10"

    "set cthick 7"
    "set clab off"
    "run disp_shaded_nozero smth9(tropott.6)-smth9(tropott.7) 10"
    "set cthick 4"
    "set clab off"
    "run disp_unshaded_nozero smth9(tropott.6) 10 230"
    "set clab on"
    "run disp_unshaded_nozero smth9(tropott.6) 80 130"
    "set line 1 1 15"
    "run gui_track_simple 8 gridlat.8 gridlon.8 1 "dotsize" "bigdot
    "run gui_track_simple 4 gridlat.4 gridlon.4 1 "dotsize" "bigdot

    b = b + 1
  endwhile

  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  b = 1
  while (b < 6)
    "draw string "label.1.b
    "draw string "label.2.b
    "draw string "label.3.b
    b = b + 1
  endwhile
"run gui_print plot.casb.control"
"quit"
