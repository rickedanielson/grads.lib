# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.lhtfl.raw.gb dj30d        om30d        45 150"
*     grads -bpc "plot.basic.lhtfl.raw.gb gd2000.dj30d gd2000.om30d 45 150"
*     grads -bpc "plot.basic.lhtfl.raw.gb atlmid       atltra       45 -52.5"
*
* where 45 150 is the stationary central position - RD October 2000.

function doit(arg)

"clear"
"run disp_colours"
"set grid off"

fila = subwrd(arg,1)
filb = subwrd(arg,2)
position = subwrd(arg,3)" "subwrd(arg,4)" "subwrd(arg,3)" "subwrd(arg,4)
dellat = 20
dellon = 50

"set clopts 1 3 0.10"
"set xlopts 1 3 0.10"
"set ylopts 1 3 0.10"

"sdfopen "fila".heat.flux.nc"
"sdfopen "fila"-"filb".heat.flux.nc"
"sdfopen "filb".heat.flux.nc"
"run gui_view_grid "dellat" "dellon" "position

tima = 1
timb = 9

var.1.0 = "lhtflstat"
var.1.1 = "lhtflanom"
var.2.0 = "lhtflstat.2"
var.2.1 = "lhtflanom.2"
var.3.0 = "lhtflstat.3"
var.3.1 = "lhtflanom.3"
conin.1 = 30
conin.2 = 30

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
  "set t "a
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

  "set clab off"
  "run disp_stat_95_99 "var.1.0
  "set cthick 8"
  "run disp_unshaded_nozero "var.1.1" "conin.1
  "set cthick 3"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
endwhile

a = tima
while (a <= timb)
  "set t "a
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

  "set clab off"
  "run disp_stat_95_99 "var.2.0
  "set cthick 8"
  "run disp_unshaded_nozero "var.2.1" "conin.2
  "set cthick 3"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
endwhile

a = tima
while (a <= timb)
  "set t "a
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

  "set clab off"
  "run disp_stat_95_99 "var.3.0
  "set cthick 8"
  "run disp_unshaded_nozero "var.3.1" "conin.1
  "set cthick 3"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 0.20 Latent Heat Flux ("conin.1" W/m2) Diff ("conin.2" W/m2)"
"set strsiz 0.1 0.1"
"set string 1 c"
"draw string 1.75 10.8 "fila
"draw string 4.25 10.8 "fila"-"filb
"draw string 6.85 10.8 "filb
#"run disp_label_95_99 1 1 1.3 9.5 10"
"run gui_print plot.basic.lhtfl.raw."fila"."filb
"quit"
