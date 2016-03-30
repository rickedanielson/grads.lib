# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.thesis.slp.comparison dj30d        om30d        45 151"
*     grads -bpc "plot.thesis.slp.comparison gd2000.dj30d gd2000.om30d 45 151"
*     grads -bpc "plot.thesis.slp.comparison atlmid       atltra       45 -52.5"
*     grads -bpc "plot.thesis.slp.comparison dec          mar          45 151"
*
* where 45 150 is the stationary central position - RD October 2000.
* %%BoundingBox: 32 300 576 776   or   %%BoundingBox: 32 615 567 776

function doit(arg)

"clear"
"run disp_colours"
"set grid off"

fila = subwrd(arg,1)
filb = subwrd(arg,2)
position = subwrd(arg,3)" "subwrd(arg,4)" "subwrd(arg,3)" "subwrd(arg,4)
dellat = 20
dellon = 49

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
if (fila = "dec")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "Midwinter (11) - Transitional (11)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (11)"
endif

"set clopts 1 3 0.25"
"set xlopts 1 3 0.25"
"set ylopts 1 3 0.25"

vpage.1.1 = "0.1  3.2  8.7 10.4"
vpage.2.1 = "2.7  5.8  8.7 10.4"
vpage.3.1 = "5.3  8.4  8.7 10.4"
if (fila = "atlmid")
  vpage.1.2 = "0.1  3.2  8.7 10.4"
  vpage.2.2 = "2.7  5.8  8.7 10.4"
  vpage.3.2 = "5.3  8.4  8.7 10.4"
else
  vpage.1.2 = "0.1  3.2  7.1  8.8"
  vpage.2.2 = "2.7  5.8  7.1  8.8"
  vpage.3.2 = "5.3  8.4  7.1  8.8"
endif
vpage.1.3 = "0.1  3.2  5.5  7.2"
vpage.2.3 = "2.7  5.8  5.5  7.2"
vpage.3.3 = "5.3  8.4  5.5  7.2"
vpage.1.4 = "0.1  3.2  3.9  5.6"
vpage.2.4 = "2.7  5.8  3.9  5.6"
vpage.3.4 = "5.3  8.4  3.9  5.6"
vpage.1.5 = "0.1  3.2  2.3  4.0"
vpage.2.5 = "2.7  5.8  2.3  4.0"
vpage.3.5 = "5.3  8.4  2.3  4.0"

conin.1.1 = 2
conin.2.1 = 2
conin.3.1 = 2
conin.1.2 = 1
conin.2.2 = 1
conin.3.2 = 1
conin.1.3 = 2
conin.2.3 = 2
conin.3.3 = 2
conin.1.4 = 2
conin.2.4 = 2
conin.3.4 = 2
conin.1.5 = 4
conin.2.5 = 0
conin.3.5 = 4
midlev = 968

dir.1 = "low"
dir.2 = "med"
dir.3 = "hig"
dir.4 = "raw"
dir.5 = "raw"

z = 5                                                              ;* z should loop from 1 to 9 through time and
while (z < 6)                                                      ;* a should loop from 1 to 5 through row
"clear"
a = 1
while (a < 6)
  "sdfopen /home/rdanielson/slp/slp."dir.a"/"fila".slp.nc"
  "sdfopen /home/rdanielson/slp/slp."dir.a"/"fila"-"filb".slp.nc"
  "sdfopen /home/rdanielson/slp/slp."dir.a"/"filb".slp.nc"
  "run gui_view_grid "dellat" "dellon" "position
  "set t "z
  "run gui_date"
  datatim = result

  "set vpage "vpage.1.a
  "set grads off"
  if (a = 5 | fila = "atlmid")
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab on"
  "set xlint 20"
  "set ylint 10"
  "set cthick 4"
  "set clab off"
  if (a != 5)
    "run disp_shaded_nozero slpanom/100 "conin.1.a
    "set clab on"
    "run disp_unshaded_nozero slpanom/100 "3*conin.1.a
    "run disp_box_grid "box
  else
    "run disp_unshaded_nozero slp/100 "conin.1.a" "midlev
    "set clab on"
    "run disp_unshaded_nozero slp/100 "3*conin.1.a" "midlev
    "run disp_box_grid "box
  endif

  "set vpage "vpage.2.a
  "set grads off"
  if (a = 4 | fila = "atlmid")
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set xlint 20"
  "set ylint 10"
  "set clab on"
  if (a != 5)
    if (a != 1)
      "set gxout fgrid"
      "set fgvals 95 44 99 44"
      "d stat.2"
      "set gxout contour"
#      "run disp_stat_95 stat.2"
    endif
    "set cthick 4"
    "set clab off"
    "run disp_unshaded_nozero slpanom.2/100 "conin.2.a
    "set clab on"
    "run disp_unshaded_nozero slpanom.2/100 "3*conin.2.a
    "run disp_box_grid "box
  endif

  "set vpage "vpage.3.a
  "set grads off"
  if (a = 5 | fila = "atlmid")
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set xlint 20"
  "set ylint 10"
  "set cthick 4"
  "set clab off"
  if (a != 5)
    "run disp_shaded_nozero slpanom.3/100 "conin.3.a
    "set clab on"
    "run disp_unshaded_nozero slpanom.3/100 "3*conin.3.a
    "run disp_box_grid "box
  else
    "run disp_unshaded_nozero slp.3/100 "conin.3.a" "midlev
    "set clab on"
    "run disp_unshaded_nozero slp.3/100 "3*conin.3.a" "midlev
    "run disp_box_grid "box
  endif

  "close 3"
  "close 2"
  "close 1"
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.13 0.13"
"set string 1 c"
"draw string 1.65 10.9 "title.2
"draw string 4.25 10.9 Midwinter-Transitional"
"draw string 6.85 10.9 "title.3
"draw string 1.65 10.65 SLP Anomaly"
"draw string 4.25 10.65 SLP Difference"
"draw string 6.85 10.65 SLP Anomaly"
"set strsiz 0.12 0.12"
if (fila != "atlmid")
"draw string 1.65 10.3 a) >30 days ("conin.1.1" hPa)"
"draw string 4.25 10.3 b) >30 days ("conin.2.1" hPa)"
"draw string 6.85 10.3 c) >30 days ("conin.3.1" hPa)"
"draw string 1.65  8.7 d) 10-30 days ("conin.1.2" hPa)"
"draw string 4.25  8.7 e) 10-30 days ("conin.2.2" hPa)"
"draw string 6.85  8.7 f) 10-30 days ("conin.3.2" hPa)"
"draw string 1.65  7.1 g) 2-10 days ("conin.1.3" hPa)"
"draw string 4.25  7.1 h) 2-10 days ("conin.2.3" hPa)"
"draw string 6.85  7.1 i) 2-10 days ("conin.3.3" hPa)"
"draw string 1.65  5.5 j) Unfiltered ("conin.1.4" hPa)"
"draw string 4.25  5.5 k) Unfiltered ("conin.2.4" hPa)"
"draw string 6.85  5.5 l) Unfiltered ("conin.3.4" hPa)"
"draw string 1.65  3.9 m) SLP ("conin.1.5" hPa)"
"draw string 6.85  3.9 n) SLP ("conin.3.5" hPa)"
else
"draw string 1.65 10.3 a) 10-30 days ("conin.1.2" hPa)"
"draw string 4.25 10.3 b) 10-30 days ("conin.2.2" hPa)"
"draw string 6.85 10.3 c) 10-30 days ("conin.3.2" hPa)"
endif
#"run disp_label_95_99 1 1 1.3 9.5 10"
#"draw string 4.25  1.5 "datatim
#"draw string 4.25  1.0 "fila"-"filb
"run gui_print plot.basic.slp.raw."fila"."filb"."z
z = z + 1
endwhile
"quit"
