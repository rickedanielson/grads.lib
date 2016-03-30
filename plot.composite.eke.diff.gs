# This script is designed to plot the time series of
* budget terms.  It can be executed using a command like
*
*     grads -bpc "plot.composite.eke.diff"
*
* %%BoundingBox: 20 475 598 635
* - RD February 2000.

function doit

tim.0 = 13
tim.1 = 13
tim.2 = 17

vpage.0.0  = "0.0  4.35  6.5   9.0"
vpage.0.1  = "0.0  4.35  4.4   6.9"
vpage.0.2  = "0.0  4.35  2.3   4.8"
vpage.1.0  = "4.15  8.5  6.5   9.0"
vpage.1.1  = "4.15  8.5  4.4   6.9"
vpage.1.2  = "4.15  8.5  2.3   4.8"

title.0.0 = "a)"
title.0.1 = "b)"
title.0.2 = "c)"
title.1.0 = "b)"
title.1.1 = "e)"
title.1.2 = "f)"

"clear"
"run disp_colours_dark"
"set grid off"
"set clopts 1 3 .19"
"set xlopts 1 3 .17"
"set ylopts 1 3 .16"

"sdfopen /home/rdanielson/data/eastern.bombs/ncep/222222.nc"
"sdfopen /home/rdanielson/data/eastern.bombs/ncep/222222.budget.energy.conversion.eddy.nc"
"sdfopen /home/rdanielson/data/eastern.bombs/ncep/222222.track.nc"

a = 0
b = 0
while (b < 1)
  "set t "tim.b
  "set vpage "vpage.a.b
  "set grads off"
  "set xlab off"
  "set ylab off"

  "run gui_trackpos 3 troplat.3 troplon.3"
  position = result
  "run gui_view_grid_shift 17.5 50 "position" 0 -5"
  "set clab off"
  "set cthick 8"
  "run disp_shaded_nozero kinevint.2/1e6 0.5"
  "set cthick 4"
  "set clab off"
  "run disp_unshaded_nozero hgt(lev=500) 200 4100"
  "set cthick 8"
  "run disp_vector_nolab uagfvint.2/1e6 vagfvint.2/1e6 35"
  "set cthick 4"
  "set clab on"
  "run disp_unshaded_nozero kinevint.2/1e6 1"

  "set line 0 1 7"
  "run gui_track_simple_noline 3 troplat.3 troplon.3 1 0.12 0.25"
  "set line 1 1 7"
  "run gui_track_simple_noline 3 troplat.3 troplon.3 1 0.12 0.25 2"

  "set xlint 20"
  "set ylint 10"
  position = "0 0 0 0"
  "run gui_view_grid_shift 17.5 50 "position" 0 -5"
  if (b = 0)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab on"
  "set map 0"
  "run disp_unshaded_nozero lat 2 4100"
  "set map 1"
  "set xlab off"
  "set ylab off"

  "q gxinfo"
  line = sublin(result,3)
  xl = subwrd(line,4)
  xr = subwrd(line,6)
  line = sublin(result,4)
  yb = subwrd(line,4)
  yt = subwrd(line,6)
  "set line 0"
#  "draw recf "xl-0.5" 0 "xr+0.5" "yb-0.08
#  "draw recf -0.5 "yb-0.5" "xl-0.12" "yt+0.5
  "draw recf -0.1 "yb+1.3" "xl-0.12" "yt-1.3
  ym = (yb + yt) / 2
  "set string 1 c"
  "set strsiz 0.16"
  "draw string "xl-0.2" "ym" 0"

  "run gui_date"
  date = result
  "set string 1 c"
  "set strsiz 0.25"
  "draw string 4.3 4.4 "title.a.b" Group A ("date")"
  b = b + 1
endwhile

"close 3"
"close 2"
"close 1"
"sdfopen /home/rdanielson/data/eastern.bombs/ncep/333333.nc"
"sdfopen /home/rdanielson/data/eastern.bombs/ncep/333333.budget.energy.conversion.eddy.nc"
"sdfopen /home/rdanielson/data/eastern.bombs/ncep/333333.track.nc"

a = 1
b = 0
while (b < 1)
  "set t "tim.b
  "set vpage "vpage.a.b
  "set grads off"
  "set xlab off"
  "set ylab off"

  "run gui_trackpos 3 troplat.3 troplon.3"
  position = result
  "run gui_view_grid_shift 17.5 50 "position" 0 -5"
  "set clab off"
  "set cthick 8"
  "run disp_shaded_nozero kinevint.2/1e6 0.5"
  "set cthick 4"
  "set clab off"
  "run disp_unshaded_nozero hgt(lev=500) 200 4100"
  "set cthick 8"
  "run disp_vector_nolab uagfvint.2/1e6 vagfvint.2/1e6 35"
  "set cthick 4"
  "set clab on"
  "run disp_unshaded_nozero kinevint.2/1e6 1"

  "set line 0 1 7"
  "run gui_track_simple_noline 3 troplat.3 troplon.3 1 0.12 0.25"
  "set line 1 1 7"
  "run gui_track_simple_noline 3 troplat.3 troplon.3 1 0.12 0.25 2"

  "set xlint 20"
  "set ylint 10"
  position = "0 0 0 0"
  "run gui_view_grid_shift 17.5 50 "position" 0 -5"
  "set map 0"
  if (b = 0)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "run disp_unshaded_nozero lat 2 4100"
  "set map 1"
  "set xlab off"
  "set ylab off"

  "q gxinfo"
  line = sublin(result,3)
  xl = subwrd(line,4)
  xr = subwrd(line,6)
  line = sublin(result,4)
  yb = subwrd(line,4)
  yt = subwrd(line,6)
#  "set line 0"
#  "draw recf "xl-0.5" 0 "xr+0.5" "yb-0.08
#  "draw recf -0.1 "yb-0.5" "xl-0.12" "yt+0.5

  if (b = 0)
    "run disp_vector_justlab 35 8.0 4.3"
  endif
  "run gui_date"
  date = result
  "set string 1 c"
  "set strsiz 0.25"
  "draw string 4.3 4.4 "title.a.b" Group B ("date")"
  b = b + 1
endwhile
"run gui_print plot.composite.eke.diff"
"quit"
