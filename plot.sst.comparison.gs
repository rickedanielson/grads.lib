# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.sst.comparison        dj30d        om30d 37 145"
*     grads -bpc "plot.sst.comparison gd2000.dj30d gd2000.om30d 37 145"
*     grads -bpc "plot.sst.comparison       atlmid       atltra 42 -60"
*     grads -bpc "plot.sst.comparison gyakum.mb1.update gyakum.sn1.update 37 145"
*     grads -bpc "plot.sst.comparison        dec          mar   37 145"
*     grads -bpc "plot.sst.comparison       gisdec       gismar 42 -60"
*     grads -bpc "plot.sst.comparison       pacdec       pacmar 37 145"
*     grads -bpc "plot.sst.comparison       atldec       atlmar 45 -55"
*
* where dj30d and om30d are file stems and 40 150 is a stationary central
* position - RD October 2000.

function plot(args)
* newtime = 13
stema  = subwrd(args,1)
stemb  = subwrd(args,2)
position = subwrd(args,3)" "subwrd(args,4)" "subwrd(args,3)" "subwrd(args,4)

* newtime = subwrd(args,5)
masking = 0

if (stema = "dj30d")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "Midwinter (13) - Transitional (12)"
  title.2 = "Midwinter (13)"
  title.3 = "Transitional (12)"
endif
if (stema = "gd2000.dj30d")
  box = "2.5 2.5 0 0 0 0 37.5 147.5"
  title.1 = "Midwinter (11) - Transitional (11)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (11)"
endif
if (stema = "atlmid")
  box = "6.5 10.0 0 0 0 0 41.5 -60.0"
  title.1 = "Midwinter (12) - Transitional (16)"
  title.2 = "Midwinter (12)"
  title.3 = "Transitional (16)"
endif
if (stema = "gyakum.mb1.update")
  box = "2.5 2.5 0 0 0 0 37.5 147.5"
  title.1 = "Moderate Bomb (17) - Strong Non-Bomb (18)"
  title.2 = "Moderate Bomb (17)"
  title.3 = "Strong Non-Bomb (18)"
endif
if (stema = "dec")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "Midwinter (11) - Transitional (12)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (12)"
endif
if (stema = "gisdec")
  box = "6.5 10.0 0 0 0 0 41.5 -60.0"
  title.1 = "Midwinter (30) - Transitional (29)"
  title.2 = "Midwinter (30)"
  title.3 = "Transitional (29)"
endif
if (stema = "pacdec")
  box = "5 7.5 0 0 0 0 35 150.0"
  title.1 = "December (40) - March (40)"
  title.2 = "December (40)"
  title.3 = "March (40)"
endif
if (stema = "atldec")
  box = "5 7.5 0 0 0 0 42.5 -50.0"
  title.1 = "December (40) - March (40)"
  title.2 = "December (40)"
  title.3 = "March (40)"
endif

"set grid off"
"run disp_colours_dark"
#"run disp_colours_rev_sst colour"
"set rgb    99  210  210  210"

#vpage.1  = "2.05  6.45  5.5  10.0"
#vpage.2  = "0.0   4.35  1.0   5.5"
#vpage.3  = "4.15  8.5   1.0   5.5"
vpage.2 = "0.1  3.2  7.5 10.0"
vpage.1 = "2.7  5.8  7.5 10.0"
vpage.3 = "5.3  8.4  7.5 10.0"
vpage.5 = "0.1  3.2  5.0  7.5"
vpage.4 = "2.7  5.8  5.0  7.5"
vpage.6 = "5.3  8.4  5.0  7.5"

dellat = 20
dellon = 30
if (stema = "atldec")
  dellat = 16.5
  dellon = 25
endif

#newtime = 1
#while (newtime < 16)
newtime = 3
while (newtime < 4)
  "clear"
  "set grid off"

"sdfopen "stema"-"stemb".sst.stat.nc"
"sdfopen "stema".sst.stat.nc"
"sdfopen "stemb".sst.stat.nc"

limit = 300
conin.1 = 0.25
conin.2 = 4

"run gui_view_grid "dellat" "dellon" "position
"set clopts 1 3 0.2"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"
"set t "newtime
"run gui_date"
timestamp = result

"set vpage "vpage.1
"set grads off"
"set ylab off"
"set xlint 15"
"set ylint 10"
"set gxout fgrid"
#"set fgvals 95 44 99 44 100 44"
"set fgvals -100 25 -99 25 -95 25 95 55 99 55 100 55"
"d maskout(stat.1,"limit"-infl.1)"
"set gxout contour"
"set cthick 4" ;# "set cthick 9"
"set clab off"
"run disp_unshaded_nozero maskout(sstanom.1,"limit"-infl.1) "conin.1
"set cthick 15"
"set ccolor 1"
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
"draw title "title.1

"set vpage "vpage.2
"set grads off"
"set ylab on"
"set xlint 15"
"set ylint 10"
"set cthick 4" ;# "set cthick 10"
"set clab off"
"run disp_shaded_nozero maskout(sstanom.2,"limit"-infl.2) "conin.1
"set cthick 3"
"set clab off"
"run disp_unshaded maskout(sst.2,"limit"-infl.2) "conin.2
"set clab on"
"run disp_unshaded maskout(sst.2,"limit"-infl.2) "conin.2*2
"set cthick 15"
"set ccolor 1"
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
"draw title "title.2

"set vpage "vpage.3
"set grads off"
"set ylab off"
"set xlint 15"
"set ylint 10"
"set cthick 4" ;# "set cthick 10"
"set clab off"
"run disp_shaded_nozero maskout(sstanom.3,"limit"-infl.3) "conin.1
"set cthick 3"
"set clab off"
"run disp_unshaded maskout(sst.3,"limit"-infl.3) "conin.2
"set clab on"
"run disp_unshaded maskout(sst.3,"limit"-infl.3) "conin.2*2
"set cthick 15"
"set ccolor 1"
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
"draw title "title.3

  "close 3"
  "close 2"
  "close 1"
  if (stema = "atldecc")

"sdfopen "stema"-"stemb".ice.nc"
"sdfopen "stema".ice.nc"
"sdfopen "stemb".ice.nc"

conin.1 = 0.02
conin.2 = 4
* position = "47 -60 47 -60"
"run gui_view_grid "dellat" "dellon" "position
"set clopts 1 3 0.2"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"
"set t "newtime
"run gui_date"
timestamp = result

"set vpage "vpage.4
"set grads off"
"set ylab off"
"set xlint 15"
"set ylint 10"
"set cthick 10"
"set clab off"
"run disp_shaded_nozero -icec "conin.1
"run disp_box_grid "box

"set vpage "vpage.5
"set grads off"
"set ylab on"
"set xlint 15"
"set ylint 10"
"set cthick 10"
"set clab off"
"run disp_shaded_nozero -icec.2 "conin.1
"run disp_box_grid "box

"set vpage "vpage.6
"set grads off"
"set ylab off"
"set xlint 15"
"set ylint 10"
"set cthick 10"
"set clab off"
"run disp_shaded_nozero -icec.3 "conin.1
"run disp_box_grid "box

  "close 3"
  "close 2"
  "close 1"
  endif

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
#"draw string 4.25 10.2 "stema"-"stemb" at "timestamp
"draw string 4.25 10.2 "timestamp
#"draw string 4.25 7.4 Sea Ice Anomalies ("conin.1*100"%)"
#"draw string 4.25 1.1 SST Composite ("conin.2"`3.`0C) and Anomaly ("conin.1"`3.`0C)"
#"draw string 4.25 0.8 Analyses Limited at Influence Radius of "limit"km (dashed)"
if (newtime < 10)
  "run gui_print plot.sst.comparison."stema"."stemb".0"newtime
  "printim       plot.sst.comparison."stema"."stemb".0"newtime".gif white x1020 y1320"
else
  "run gui_print plot.sst.comparison."stema"."stemb"."newtime
  "printim       plot.sst.comparison."stema"."stemb"."newtime".gif white x1020 y1320"
endif

  newtime = newtime + 1
endwhile
"quit"
