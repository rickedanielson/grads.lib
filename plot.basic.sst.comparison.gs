# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.sst.comparison dj30d        om30d        45 150"
*     grads -bpc "plot.basic.sst.comparison gd2000.dj30d gd2000.om30d 45 150"
*     grads -bpc "plot.basic.sst.comparison atlmid       atltra       45 -52.5"
*
* where 45 150 is the stationary central position - RD October 2000.

function doit(arg)

"clear"
"run disp_colours"
"set grid off"
masking = 1

fila = subwrd(arg,1)
filb = subwrd(arg,2)
position = subwrd(arg,3)" "subwrd(arg,4)" "subwrd(arg,3)" "subwrd(arg,4)
dellat = 20
dellon = 50

if (fila = "dj30d")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "Midwinter (13) - Transitional (12)"
  title.2 = "Midwinter (13)"
  title.3 = "Transitional (12)"
endif
if (fila = "gd2000.dj30d")
  box = "2.5 2.5 0 0 0 0 37.5 147.5"
  title.1 = "Midwinter (11) - Transitional (11)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (11)"
endif
if (fila = "atlmid")
  box = "6.5 10.0 0 0 0 0 41.5 -60.0"
  title.1 = "Midwinter (12) - Transitional (16)"
  title.2 = "Midwinter (12)"
  title.3 = "Transitional (16)"
endif
if (fila = "gyakum.mb1.update")
  box = "2.5 2.5 0 0 0 0 37.5 147.5"
  title.1 = "Moderate Bomb (17) - Strong Non-Bomb (18)"
  title.2 = "Moderate Bomb (17)"
  title.3 = "Strong Non-Bomb (18)"
endif

"set clopts 1 3 0.10"
"set xlopts 1 3 0.10"
"set ylopts 1 3 0.10"

"sdfopen "fila".sst.stat.nc"
"sdfopen "fila"-"filb".sst.stat.nc"
"sdfopen "filb".sst.stat.nc"
"run gui_view_grid "dellat" "dellon" "position

tima = 1
timb = 9
limit = 300
conin.1 = 4
conin.2 = 0.4

a = 1                                                              ;# create the virtual pages
dely = 0.73
while (a < 10)
  y = (9 - a) * (10.7 - dely) / 9 + dely/1.5
  up = y + dely + 0.5
  down = y - dely + 0.5
  vpage.1.a = "0.1  3.2  "down" "up
  vpage.2.a = "2.7  5.8  "down" "up
  vpage.3.a = "5.3  8.4  "down" "up
  a = a + 1
endwhile

a = tima
while (a <= timb)
  b = a + 4
  "set t "b
  "set vpage "vpage.1.a
  "set grads off"
  if (a = 9)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab on"
  "set xlint 20"
  "set ylint 10"

  "set cthick 6"
  "set clab off"
  "run disp_shaded_nozero maskout(sstanom.1,"limit"-infl.1) "conin.2
  "set cthick 3"
  "set clab off"
  "run disp_unshaded maskout(sst.1,"limit"-infl.1) "conin.1
  "set clab on"
  "run disp_unshaded maskout(sst.1,"limit"-infl.1) "conin.1*2
  "set cthick 8"
  "set clab off"
  "set clevs "limit
  "set cstyle 2"
  "d infl.1"

  if (masking = 1)
    "run basemap L 0 1"
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
  "run disp_box_grid "box

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
endwhile

a = tima
while (a <= timb)
  b = a + 4
  "set t "b
  "set vpage "vpage.2.a
  "set grads off"
  if (a = 9)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set xlint 20"
  "set ylint 10"

  "set gxout fgrid"
  "set fgvals 95 44 99 44 100 44"
  "d maskout(stat.2,"limit"-infl.2)"
  "set gxout contour"
  "set cthick 6"
  "set clab off"
  "run disp_unshaded_nozero maskout(sstanom.2,"limit"-infl.2) "conin.2
  "set cthick 8"
  "set clab off"
  "set clevs "limit
  "set cstyle 2"
  "d infl.2"

  if (masking = 1)
    "run basemap L 0 1"
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
  "run disp_box_grid "box

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
endwhile

a = tima
while (a <= timb)
  b = a + 4
  "set t "b
  "set vpage "vpage.3.a
  "set grads off"
  if (a = 9)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set xlint 20"
  "set ylint 10"

  "set cthick 6"
  "set clab off"
  "run disp_shaded_nozero maskout(sstanom.3,"limit"-infl.3) "conin.2
  "set cthick 3"
  "set clab off"
  "run disp_unshaded maskout(sst.3,"limit"-infl.3) "conin.1
  "set clab on"
  "run disp_unshaded maskout(sst.3,"limit"-infl.3) "conin.1*2
  "set cthick 8"
  "set clab off"
  "set clevs "limit
  "set cstyle 2"
  "d infl.3"

  if (masking = 1)
    "run basemap L 0 1"
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
  "run disp_box_grid "box

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 0.20 SST ("conin.1"`3.`0C) Diff ("conin.2"`3.`0C)"
"set strsiz 0.1 0.1"
"set string 1 c"
"draw string 1.75 10.8 "fila
"draw string 4.25 10.8 "fila"-"filb
"draw string 6.85 10.8 "filb
#"run disp_label_95_99 1 1 1.3 9.5 10"
"run gui_print plot.basic.sst."fila"."filb
"quit"
