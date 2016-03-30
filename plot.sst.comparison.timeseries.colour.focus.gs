# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.sst.comparison.timeseries.colour.focus dj30d        om30d        42 151"
*     grads -bpc "plot.sst.comparison.timeseries.colour.focus gd2000.dj30d gd2000.om30d 42 151"
*     grads -bpc "plot.sst.comparison.timeseries.colour.focus atlmid       atltra       42 -55"
*     grads -bpc "plot.sst.comparison.timeseries.colour.focus dec          mar          42 151"
*     grads -bpc "plot.sst.comparison.timeseries.colour.focus gyakum.mb1.update gyakum.sn1.update 42 151"
*
* where 45 150 is the stationary central position - RD October 2000.
* %%BoundingBox: 31 535 573 749

function doit(arg)

"clear"
"run disp_colours_rev_sst colour"
"set rgb    99  210  210  210"
"set grid off"
masking = 0
refcont = 16

fila = subwrd(arg,1)
filb = subwrd(arg,2)
position = subwrd(arg,3)" "subwrd(arg,4)" "subwrd(arg,3)" "subwrd(arg,4)
dellat = 20
dellon = 29
dellat = 15
dellon = 20

if (fila = "dj30d")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "Midwinter-Transitional"
  title.2 = "Midwinter (13)"
  title.3 = "Transitional (12)"
  title.1 = "Dec/Jan-Oct/Mar"
  title.2 = "13 Dec/Jan Cyclones"
  title.3 = "12 Oct/Mar Cyclones"
endif
if (fila = "gd2000.dj30d")
  box = "2.5 2.5 0 0 0 0 37.5 147.5"
  title.1 = "Midwinter-Transitional"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (11)"
endif
if (fila = "atlmid")
  box = "6.5 10.0 0 0 0 0 41.5 -60.0"
  title.1 = "Midwinter-Transitional"
  title.2 = "Midwinter (12)"
  title.3 = "Transitional (16)"
  tima = 3
  timb = 3
endif
if (fila = "dec")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "December-March"
  title.2 = "December (11)"
  title.3 = "March (11)"
endif
if (fila = "gyakum.mb1.update")
  box = "2.5 2.5 0 0 0 0 37.5 147.5"
  title.1 = ""
  title.2 = "Moderate Bomb (17)"
  title.3 = "Strong Non-Bomb (18)"
  tima = 1
  timb = 1
endif

"set clopts 1 3 0.25"
"set xlopts 1 3 0.25"
"set ylopts 1 3 0.25"

"sdfopen "fila".sst.stat.nc"
"sdfopen "fila"-"filb".sst.stat.nc"
"sdfopen "filb".sst.stat.nc"
"run gui_view_grid "dellat" "dellon" "position

if (fila != "gyakum.mb1.update" & fila != "atlmid")
  tima = 2
  timb = 3
endif
shift.1 = 0
shift.2 = 0
shift.3 = 0
shift.4 = 1
limit = 300
conin.1 = 4
conin.2 = 0.4

vpage.1.2 = "0.1  3.2  7.5 10.0"
vpage.2.2 = "2.7  5.8  7.5 10.0"
vpage.3.2 = "5.3  8.4  7.5 10.0"
vpage.1.3 = "0.1  3.2  5.2  7.7"
vpage.2.3 = "2.7  5.8  5.2  7.7"
vpage.3.3 = "5.3  8.4  5.2  7.7"
if (fila != "atlmid")
  vpage.1.1 = "0.1  3.2  2.9  5.4"
  vpage.2.1 = "2.7  5.8  2.9  5.4"
  vpage.3.1 = "5.3  8.4  2.9  5.4"
else
  vpage.1.1 = "0.1  3.2  7.5 10.0"
  vpage.2.1 = "2.7  5.8  7.5 10.0"
  vpage.3.1 = "5.3  8.4  7.5 10.0"
endif
vpage.1.4 = "0.1  3.2  0.6  3.1"
vpage.2.4 = "2.7  5.8  0.6  3.1"
vpage.3.4 = "5.3  8.4  0.6  3.1"

a = tima
while (a <= timb)
  b = a + shift.a
  "set t "b
  "set vpage "vpage.1.a
  "set grads off"
  if (a = timb)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab on"
  "set xlint 20"
  "set ylint 10"
  "set clab off"

  "set cthick 6"
  "run disp_shaded_nozero maskout(sstanom.1,"limit"-infl.1) "conin.2
  "set cthick 3"
  "run disp_unshaded maskout(sst.1,"limit"-infl.1) "conin.1
  "set cthick 10"
  "set ccolor 1"
  "set clevs "refcont
  "set cstyle 1"
  "d maskout(sst.1,"limit"-infl.1)"
  "set cthick 8"
  "set clevs "limit
  "set cstyle 2"
  "set ccolor 1"
  "d infl.1"

  if (masking = 1)
    "run basemap L 99 1"
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 1"
    "draw rec "xl" "yb" "xr" "yt
  endif
  "set line 1 1 10"
  "run disp_box_grid "box
  "set line 1 1 4"

  "run gui_date"
  date = result
#  "draw title "title.1.a" "date
  a = a + 1
endwhile

a = tima
while (a <= timb)
  b = a + shift.a
  "set t "b
  "set vpage "vpage.2.a
  "set grads off"
  if (a = timb)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set xlint 20"
  "set ylint 10"
  "set clab off"

  if  (fila != "gyakum.mb1.update")
    "set gxout fgrid"
    "set fgvals -100 25 -99 25 -98 25 -97 25 -96 25 -95 25 95 55 96 55 97 55 98 55 99 55 100 55"
    "d maskout(stat.2*sstanom.2/abs(sstanom.2),"limit"-infl.2)"
  endif
  "set gxout contour"
  "set cthick 6"
  "run disp_unshaded_nozero maskout(sstanom.2,"limit"-infl.2) "conin.2
  "set cthick 8"
  "set clevs "limit
  "set cstyle 2"
  "set ccolor 1"
  "d infl.2"

  if (masking = 1)
    "run basemap L 99 1"
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 1"
    "draw rec "xl" "yb" "xr" "yt
  endif
  "set line 1 1 10"
  "run disp_box_grid "box
  "set line 1 1 4"

  "run gui_date"
  date = result
#  "draw title "title.2.a" "date
  a = a + 1
endwhile

a = tima
while (a <= timb)
  b = a + shift.a
  "set t "b
  "set vpage "vpage.3.a
  "set grads off"
  if (a = timb)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set xlint 20"
  "set ylint 10"
  "set clab off"

  "set cthick 6"
  "run disp_shaded_nozero maskout(sstanom.3,"limit"-infl.3) "conin.2
  "set cthick 3"
  "run disp_unshaded maskout(sst.3,"limit"-infl.3) "conin.1
  "set cthick 10"
  "set ccolor 1"
  "set clevs "refcont
  "set cstyle 1"
  "d maskout(sst.3,"limit"-infl.3)"
  "set cthick 8"
  "set clevs "limit
  "set cstyle 2"
  "set ccolor 1"
  "d infl.3"

  if (masking = 1)
    "run basemap L 99 1"
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 1"
    "draw rec "xl" "yb" "xr" "yt
  endif
  "set line 1 1 10"
  "run disp_box_grid "box
  "set line 1 1 4"

  "run gui_date"
  date = result
#  "draw title "title.3.a" "date
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.12 0.12"
"set string 1 c"
if  (fila != "gyakum.mb1.update" & fila != "atlmid")
  "draw string 1.65 10.5 "title.2
  "draw string 4.25 10.5 "title.1
  "draw string 6.85 10.5 "title.3
  "draw string 1.65 10.25 SST ("conin.1"`3.`0C) Anom ("conin.2"`3.`0C)"
  "draw string 4.25 10.25 SST Diff ("conin.2"`3.`0C)"
  "draw string 6.85 10.25 SST ("conin.1"`3.`0C) Anom ("conin.2"`3.`0C)"
  "draw string 1.65 9.9 a) T0-3.5 days"
  "draw string 4.25 9.9 b) T0-3.5 days"
  "draw string 6.85 9.9 c) T0-3.5 days"
  "draw string 1.65 7.6 d) T0"
  "draw string 4.25 7.6 e) T0"
  "draw string 6.85 7.6 f) T0"
#  "draw string 1.65 5.3 g) T0"
#  "draw string 4.25 5.3 h) T0"
#  "draw string 6.85 5.3 i) T0"
#  "draw string 1.65 3.0 j) T0+7 days"
#  "draw string 4.25 3.0 k) T0+7 days"
#  "draw string 6.85 3.0 l) T0+7 days"
else
  "draw string 1.65 10.5 "title.2
  "draw string 4.25 10.5 "title.1
  "draw string 6.85 10.5 "title.3
  "draw string 1.65 10.25 SST ("conin.1"`3.`0C) Anom ("conin.2"`3.`0C)"
  "draw string 4.25 10.25 SST Diff ("conin.2"`3.`0C)"
  "draw string 6.85 10.25 SST ("conin.1"`3.`0C) Anom ("conin.2"`3.`0C)"
  "draw string 1.65 9.9 a) T0"
  "draw string 4.25 9.9 b) T0"
  "draw string 6.85 9.9 c) T0"
endif

#"run disp_label_95_99 1 1 1.3 9.5 10"
"run gui_print_colour plot.sst.timeseries.focus."fila"."filb
#"printim plot.sst.timeseries."fila"."filb".gif white x1020 y1320"
"quit"
