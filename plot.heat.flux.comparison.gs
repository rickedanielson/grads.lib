# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.heat.flux.comparison        dj30d        om30d 37 145"
*     grads -bpc "plot.heat.flux.comparison gd2000.dj30d gd2000.om30d 37 145"
*     grads -bpc "plot.heat.flux.comparison       atlmid       atltra 42 -60"
*     grads -bpc "plot.heat.flux.comparison gyakum.mb1.update gyakum.sn1.update 37 145"
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

dellat = 25
dellon = 45

"sdfopen "stema"-"stemb".heat.flux.total.nc"
"sdfopen "stema".heat.flux.total.nc"
"sdfopen "stemb".heat.flux.total.nc"

#limit = 300
conin.1 = 10
conin.2 = 150

"run gui_view_grid "dellat" "dellon" "position
"set clopts 1 3 0.2"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"
"set t 8"

"set vpage "vpage.1
"set grads off"
"set xlint 15"
"set ylint 10"
"set gxout fgrid"
"set fgvals 95 44"
"d lhtflstat.1"
"set gxout contour"
"set cthick 12"
"set clab off"
"run disp_unshaded_nozero lhtflanom.1 "conin.1

"run disp_box_grid "box
"draw title "title.1

"set vpage "vpage.2
"set grads off"
"set ylab off"
"set xlint 15"
"set ylint 10"
"set cthick 12"
"set clab off"
"run disp_unshaded_nozero lhtflanom.2 "conin.1
"set cthick 3"
"set clab off"
"run disp_unshaded lhtfl.2 "conin.2
"set clab on"
"run disp_unshaded lhtfl.2 "conin.2*2

"run disp_box_grid "box
"draw title "title.2

"set vpage "vpage.3
"set grads off"
"set ylab on"
"set xlint 15"
"set ylint 10"
"set cthick 12"
"set clab off"
"run disp_unshaded_nozero lhtflanom.3 "conin.1
"set cthick 3"
"set clab off"
"run disp_unshaded lhtfl.3 "conin.2
"set clab on"
"run disp_unshaded lhtfl.3 "conin.2*2

"run disp_box_grid "box
"draw title "title.3

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"run gui_date"
"draw string 4.25 9.8 "result
"draw string 4.25 5.7 Surface Heat Flux Differences ("conin.1" W/m2)"
"draw string 4.25 5.4 t-Test Significance (95% shaded)"
"draw string 4.25 1.1 Surface Heat Flux Composite ("conin.2" W/m2) and Anomaly ("conin.1" W/m2)"
#"draw string 4.25 0.8 Analyses Limited at Influence Radius of "limit"km (dashed)"
"run gui_print plot.heat.flux.comparison."stema"."stemb
"quit"
