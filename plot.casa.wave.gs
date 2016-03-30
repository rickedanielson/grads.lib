# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casa.wave"
*
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours"
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

label.1.1  = "2.2  10.55 a) 00 UTC 8 March"
label.1.2  = "2.2   8.45 b) 00 UTC 9 March"
label.1.3  = "2.2   6.35 c) 00 UTC 10 March"
label.1.4  = "2.2   4.25 d) 00 UTC 11 March"
label.1.5  = "2.2   2.15 e) 00 UTC 12 March"

  b = 1
  while (b < 6)
    a = 1
    "set vpage "vpage.a.b
    "set grads off"
    "set t "time.b
    "set ylab on"
    if (b = 5)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set xlint 20"
    "set ylint 10"

    "set cthick 8"
    "set clab off"
    "run disp_shaded_nozero wavevavg.4 30"
    "set line 1 1 4"
    "set cthick 10"
    if (b = 1)
      "run disp_vector_newlab reluwavevavg.4 relvwavevavg.4 500"
    else
      "run disp_vector_nolab  reluwavevavg.4 relvwavevavg.4 500"
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
  while (b < 6)
    "draw string "label.1.b
    b = b + 1
  endwhile
"run gui_print plot.casa.wave"
"quit"
