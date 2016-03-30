# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.skt.comparison        dj30d        om30d 37 145"
*     grads -bpc "plot.skt.comparison gd2000.dj30d gd2000.om30d 37 145"
*     grads -bpc "plot.skt.comparison       atlmid       atltra 42 -60"
*     grads -bpc "plot.skt.comparison gyakum.mb1.update gyakum.sn1.update 37 145"
*
* where dj30d and om30d are file stems and 40 150 is a stationary central
* position - RD October 2000.

function plot(args)
stema  = subwrd(args,1)
stemb  = subwrd(args,2)
position = subwrd(args,3)" "subwrd(args,4)" "subwrd(args,3)" "subwrd(args,4)
masking = 1

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

"set grid off"
"run disp_colours_dark"

vpage.1  = "2.05  6.45  5.5  10.0"
vpage.2  = "0.0   4.35  1.0   5.5"
vpage.3  = "4.15  8.5   1.0   5.5"

dellat = 15
dellon = 25

"sdfopen "stema"-"stemb".skt.nc"
"sdfopen "stema".skt.nc"
"sdfopen "stemb".skt.nc"

limit = 300
conin.1 = 0.4
conin.2 = 4

"run gui_view_grid "dellat" "dellon" "position
"set clopts 1 3 0.2"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"
"set t 13"

"set vpage "vpage.1
"set grads off"
"set xlint 15"
"set ylint 10"
"set gxout fgrid"
"set fgvals 95 44"
"d sktstat.1"
"set gxout contour"
"set cthick 9"
"set clab off"
"run disp_unshaded_nozero sktanom.1 "conin.1

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
"set ylab off"
"set xlint 15"
"set ylint 10"
"set cthick 10"
"set clab off"
"run disp_shaded_nozero sktanom.2 "conin.1
"set cthick 3"
"set clab off"
"run disp_unshaded skt.2-273.15 "conin.2
"set clab on"
"run disp_unshaded skt.2-273.15 "conin.2*2

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
"set ylab on"
"set xlint 15"
"set ylint 10"
"set cthick 10"
"set clab off"
"run disp_shaded_nozero sktanom.3 "conin.1
"set cthick 3"
"set clab off"
"run disp_unshaded skt.3-273.15 "conin.2
"set clab on"
"run disp_unshaded skt.3-273.15 "conin.2*2

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

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 5.7 SKT Differences ("conin.1"`3.`0C) and t-Test Significance (95% shaded)"
"draw string 4.25 1.1 SKT Composite ("conin.2"`3.`0C) and Anomaly ("conin.1"`3.`0C)"
"draw string 4.25 0.8 Analyses Limited at Influence Radius of "limit"km (dashed)"
"run gui_print plot.skt.comparison."stema"."stemb
"quit"
