# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casb.slp"
*
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours"
"set grid off"

dotsize = 0.0
bigdot = 0.22
hugedot = 0.4
dellat = 7
dellon = 11.0
obsize = 0.19

"open    /home/rdanielson/model/out/767605.coads/767605.hour.coads.ctl"
"sdfopen /home/rdanielson/model/out/767605.nc"
"sdfopen /home/rdanielson/model/out/767602.track.nc"
"sdfopen /home/rdanielson/model/out/767605.track.nc"

time.1 = 1
time.2 = 3
time.3 = 5
time.4 = 7
time.5 = 9

vpage.1.1  = "0.0  4.3  8.4  10.8"
vpage.1.2  = "0.0  4.3  6.3   8.7"
vpage.1.3  = "0.0  4.3  4.2   6.6"
vpage.1.4  = "0.0  4.3  2.1   4.5"
vpage.1.5  = "0.0  4.3  0.0   2.4"
vpage.2.1  = "4.05 6.35 8.4  10.8"
vpage.2.2  = "4.05 6.35 6.3   8.7"
vpage.2.3  = "4.05 6.35 4.2   6.6"
vpage.2.4  = "4.05 6.35 2.1   4.5"
vpage.2.5  = "4.05 6.35 0.0   2.4"
vpage.3.1  = "6.2  8.5  8.4  10.8"
vpage.3.2  = "6.2  8.5  6.3   8.7"
vpage.3.3  = "6.2  8.5  4.2   6.6"
vpage.3.4  = "6.2  8.5  2.1   4.5"
vpage.3.5  = "6.2  8.5  0.0   2.4"

label.1.1  = "2.2  10.55 a) 00 UTC 8 March"
label.1.2  = "2.2   8.45 b) 00 UTC 9 March"
label.1.3  = "2.2   6.35 c) 00 UTC 10 March"
label.1.4  = "2.2   4.25 d) 00 UTC 11 March"
label.1.5  = "2.2   2.15 e) 00 UTC 12 March"
label.2.1  = "5.1  10.55 f) Western Storm"
label.2.2  = "5.1   8.45 g)"
label.2.3  = "5.1   6.35 h)"
label.2.4  = "5.1   4.25 i)"
label.2.5  = "5.1   2.15 j)"
label.3.1  = "7.35 10.55 k) Eastern Storm"
label.3.2  = "7.35  8.45 l)"
label.3.3  = "7.35  6.35 m)"
label.3.4  = "7.35  4.25 n)"
label.3.5  = "7.35  2.15 o)"

position.2.1  = "0 0 49.0 133.0"    ;# 00 UTC 8             (western cyclone)
position.2.2  = "0 0 51.0 146.5"    ;# 00 UTC 9
position.2.3  = "0 0 52.0 151.0"    ;# 00 UTC 10
position.2.4  = "0 0 52.0 154.0"    ;# 00 UTC 11
position.2.5  = "0 0 52.0 159.0"    ;# 00 UTC 12
position.3.1  = "0 0 33.0 179.0"    ;# 00 UTC 8             (eastern cyclone)
position.3.2  = "0 0 35.0 187.0"    ;# 00 UTC 9
position.3.3  = "0 0 43.5 203.0"    ;# 00 UTC 10
position.3.4  = "0 0 55.0 216.0"    ;# 00 UTC 11
position.3.5  = "0 0 55.0 220.0"    ;# 00 UTC 12

  b = 1
  while (b < 6)
    a = 1
    "set vpage "vpage.a.b
    "set grads off"
    "set clopts 1 3 .19"
    "set xlopts 1 4 .15"
    "set ylopts 1 4 .15"
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

    "set map auto"
    "set lat 22.5 72.5"
    "set lon 100 250"
    "set cthick 7"
    "set clab off"
    "run disp_shaded_nozero omega.2(lev=500) 0.2"
    "set cthick 4"
    "set clab off"
    "run disp_unshaded_nozero slp.2/100 8 940"
    "set clab on"
    "run disp_unshaded_nozero slp.2/100 24 940"
    "set line 1 1 15"
    "run gui_track_simple 3 gridlat.3 gridlon.3 1 "dotsize" "bigdot
    "run gui_track_simple 4 gridlat.4 gridlon.4 1 "dotsize" "bigdot
    "set line 1 1 10"
    box = dellat" "dellon" 0 0 "position.2.b
    "run disp_box "box
    "set line 1 1 10"
    box = dellat" "dellon" 0 0 "position.3.b
    "run disp_box "box

    a = 2
    "set vpage "vpage.a.b
    "set grads off"
    "set clopts 1 3 .4"
    "set xlab off"
    "set ylab off"

    "run gui_view_grid "dellat" "dellon" "position.a.b
    "set gxout model"
    "set digsiz "obsize
    "d uwnd*2;vwnd*2"
    "set ccolor 0"
    "d uwnd-uwnd+0;vwnd-vwnd+0"
    "set ccolor 1"
    "set gxout contour"
    "set digsiz 0.5"
    "run gui_symbol ww"
    "set map 1 1 4"
    "draw map"
    "set clab off"
    "run disp_unshaded_nozero slp.2/100 4 940"
    "set clab on"
    "run disp_unshaded_nozero slp.2/100 24 948"
    "set line 1 1 15"
    "run gui_track_simple_line 3 gridlat.3 gridlon.3 1 "dotsize" "hugedot
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 0 1 10"
    "draw recf 0.1 "yb-0.5" "xl" "yt+0.5
    "draw recf "xr" "yb-0.5" 8.7 "yt+0.5
    "draw rec "xl" "yb" "xr" "yt
    "set line 1 1 4"
    "draw rec "xl" "yb" "xr" "yt

    a = 3
    "set vpage "vpage.a.b
    "set grads off"
    "set clopts 1 3 .4"
    "set xlab off"
    "set ylab off"

    "run gui_view_grid "dellat" "dellon" "position.a.b
    "set gxout model"
    "set digsiz "obsize
    "d uwnd*2;vwnd*2"
    "set ccolor 0"
    "d uwnd-uwnd+0;vwnd-vwnd+0"
    "set ccolor 1"
    "set gxout contour"
    "set digsiz 0.5"
    "run gui_symbol ww"
    "set map 1 1 4"
    "draw map"
    "set clab off"
    "run disp_unshaded_nozero slp.2/100 4 940"
    "set clab on"
    "run disp_unshaded_nozero slp.2/100 24 948"
    "set line 1 1 15"
    "run gui_track_simple_line 4 gridlat.4 gridlon.4 1 "dotsize" "hugedot
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 0 1 10"
    "draw recf 0.1 "yb-0.5" "xl" "yt+0.5
    "draw recf "xr" "yb-0.5" 8.7 "yt+0.5
    "draw recf "xl-1.5" 0.0 "xr+1.5" "yb
    "draw recf "xl-1.5" "yt" "xr+1.5" 11"
    "draw rec "xl" "yb" "xr" "yt
    "set line 1 1 4"
    "draw rec "xl" "yb" "xr" "yt

    a = 1
    while (a < 4)
      "set vpage off"
      "set strsiz 0.15 0.15"
      "set string 1 c"
      "draw string "label.a.b
      a = a + 1
    endwhile

    b = b + 1
  endwhile
"run gui_print plot.casb.slp"
"quit"
