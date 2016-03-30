# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -blc "plot.mm5.comparison.slp.zoom"
*
* - RD November 2001.

function plot(arg)

"open    /home/rdanielson/model/out/767605.coads/767605.hour.coads.ctl"
"sdfopen /home/rdanielson/model/out/767605.nc"
"sdfopen /home/rdanielson/model/out/767602.track.nc"
"sdfopen /home/rdanielson/model/out/767605.track.nc"

vpage.1  = "0.0 11.0 3.85 8.10"
vpage.2  = "1.5  5.5 0.20 4.45"
vpage.3  = "5.5  9.5 0.20 4.45"

dotsize = 0.0
bigdot = 0.2
hugedot = 0.4
dellat = 7
dellon = 11.0
obsize = 0.19

#  plot the time series

"set map 15 1 10"
"run disp_colours colour"
"set grid off"
"set clopts 10 3 0.10"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"

time.1 = 1
time.2 = 2
time.3 = 3
time.4 = 4
time.5 = 5
time.6 = 6
time.7 = 7
time.8 = 8
time.9 = 9

position.2.1  = "0 0 49.0 133.0"    ;# 00 UTC 8             (western cyclone)
position.2.2  = "0 0 50.0 140.5"    ;# 12 UTC 8
position.2.3  = "0 0 51.0 146.5"    ;# 00 UTC 9
position.2.4  = "0 0 51.5 148.5"    ;# 12 UTC 9
position.2.5  = "0 0 52.0 151.0"    ;# 00 UTC 10
position.2.6  = "0 0 52.0 152.5"    ;# 12 UTC 10
position.2.7  = "0 0 52.0 154.0"    ;# 00 UTC 11
position.2.8  = "0 0 52.0 156.0"    ;# 12 UTC 11
position.2.9  = "0 0 52.0 159.0"    ;# 00 UTC 12
position.3.1  = "0 0 33.0 179.0"    ;# 00 UTC 8             (eastern cyclone)
position.3.2  = "0 0 34.0 183.0"    ;# 12 UTC 8
position.3.3  = "0 0 35.0 187.0"    ;# 00 UTC 9
position.3.4  = "0 0 38.0 195.0"    ;# 12 UTC 9
position.3.5  = "0 0 43.5 203.0"    ;# 00 UTC 10
position.3.6  = "0 0 49.0 209.0"    ;# 12 UTC 10
position.3.7  = "0 0 55.0 216.0"    ;# 00 UTC 11
position.3.8  = "0 0 55.0 218.0"    ;# 12 UTC 11
position.3.9  = "0 0 55.0 220.0"    ;# 00 UTC 12

  b = 1
  while (b < 10)
    a = 1
    "clear"
    "set vpage "vpage.a
    "set grads off"
    "set t "time.b
    "set cthick 8"
    "set xlab off"
    "set ylab on"
    "set xlint 20"
    "set ylint 10"
    "set lat 22.5 72.5"
    "set lon 100 260"
    "set clab off"
    "run disp_shaded_contoured slp.2/100 4 1000"
    "run gui_cbarn 1.0 1 10 4.25"
    "set vpage "vpage.a
    "set vpage "vpage.a
    "set grads off"
    "set cthick 8"
    "set xlab off"
    "set ylab on"
    "set xlint 20"
    "set ylint 10"
    "set clab off"
    "run disp_shaded_contoured slp.2/100 4 1000"
    "set line 3 1 15"
    "run gui_track_simple 3 gridlat.3 gridlon.3 1 "dotsize" "bigdot
    "run gui_track_simple 4 gridlat.4 gridlon.4 1 "dotsize" "bigdot
    "set line 1 1 10"
    box = dellat" "dellon" 0 0 "position.2.b
    "run disp_box "box
    "set line 1 1 10"
    box = dellat" "dellon" 0 0 "position.3.b
    "run disp_box "box

    a = 2
    "set vpage "vpage.a
    "set grads off"
    "set clopts 1 3 .4"
    "set xlab off"
    "set ylab off"

    "run gui_view_grid "dellat" "dellon" "position.a.b
    "set gxout model"
    "set digsiz "obsize
    "d uwnd;vwnd"
    "set ccolor 0"
    "d uwnd-uwnd+0;vwnd-vwnd+0"
    "set ccolor 3"
    "set gxout contour"
    "set digsiz 0.5"
    "run gui_symbol ww"
    "set clab off"
#    "run disp_unshaded_nozero slp.2/100 4 940"
    "set clab on"
#    "run disp_unshaded_nozero slp.2/100 24 948"
    "set line 3 1 15"
    "run gui_track_simple 3 gridlat.3 gridlon.3 1 "dotsize" "hugedot

    a = 3
    "set vpage "vpage.a
    "set grads off"
    "set clopts 1 3 .4"
    "set xlab off"
    "set ylab off"

    "run gui_view_grid "dellat" "dellon" "position.a.b
    "set gxout model"
    "set digsiz "obsize
    "d uwnd;vwnd"
    "set ccolor 0"
    "d uwnd-uwnd+0;vwnd-vwnd+0"
    "set ccolor 3"
    "set gxout contour"
    "set digsiz 0.5"
    "run gui_symbol ww"
    "set clab off"
#    "run disp_unshaded_nozero slp.2/100 4 940"
    "set clab on"
#    "run disp_unshaded_nozero slp.2/100 24 948"
    "set line 3 1 15"
    "run gui_track_simple 4 gridlat.4 gridlon.4 1 "dotsize" "hugedot

    "set vpage off"
    "set strsiz 0.25 0.25"
    "set string 1 c 6"
    "run gui_date"
    date = result
    say date
    "draw string 5.5 8.25 "date
    "draw string 5.5 7.7  Sea Level Pressure (hPa)"
    "draw string 5.5 4.15 COADS Observations"
#    "draw string 5.4 4.2 Column Eddy Kinetic Energy (1e6 J/m2)"

#    "draw string 5.5 7.6 Sea Level Pressure"
#    "draw string 5.5 4.3 Full Removal"

    say "printim slp."b".gif gif x1200 y900"
        "printim slp."b".gif gif x1200 y900"

    b = b + 1
  endwhile
"quit"
