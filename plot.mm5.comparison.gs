# This script is designed to plot the time series of budget terms.
* It can be executed using a command like
*
*     grads -blc "plot.mm5.comparison"
*
* - RD November 2001.

function plot(arg)

"sdfopen mmout_balcont3.budget.energy.conversion.eddy.nc"
"sdfopen mmout_balcont3.nc"
var.1 = "kinevint"
var.2 = "hgt.2(lev=500)"
var.3 = "slp.2/100"
var.4 = "slp.2/100"
conin.1 = "1e6 0 2"
conin.2 = "200 4100 10"
conin.3 = "8 940"
conin.4 = "8 940"

"sdfopen mmout_balpert9.budget.energy.conversion.eddy.nc"
"sdfopen mmout_balpert9.nc"
var.5 = "kinevint.3"
var.6 = "hgt.4(lev=500)"
var.7 = "slp.4/100"
var.8 = "slp.4/100"
conin.5 = "1e6 0 2"
conin.6 = "200 4100 10"
conin.7 = "8 940"
conin.8 = "8 940"

tima  =  1
timb  = 21

dellata = 30
dellona = 80
position.1.1  = "0 0 40.0 170.0"
dellatb = 12
dellonb = 15
position.3.1  = "0 0 50.0 128.5"    ;# 00 UTC 8
position.3.2  = "0 0 51.5 132.0"
position.3.3  = "0 0 51.0 134.0"
position.3.4  = "0 0 51.5 138.0"
position.3.5  = "0 0 51.0 140.0"    ;# 00 UTC 9
position.3.6  = "0 0 50.0 142.5"
position.3.7  = "0 0 52.0 145.0"
position.3.8  = "0 0 53.0 145.0"
position.3.9  = "0 0 54.0 145.5"    ;# 00 UTC 10
position.3.10 = "0 0 54.5 145.5"
position.3.11 = "0 0 54.5 145.5"
position.3.12 = "0 0 54.5 145.5"
position.3.13 = "0 0 54.0 146.0"    ;# 00 UTC 11
position.3.14 = "0 0 53.5 147.0"
position.3.15 = "0 0 53.5 148.5"
position.3.16 = "0 0 53.0 149.0"
position.3.17 = "0 0 52.5 150.0"    ;# 00 UTC 12
position.3.18 = "x 0 53.0 151.5"
position.3.19 = "x 0 53.0 153.0"
position.3.20 = "x 0 53.0 153.0"
position.3.21 = "x 0 53.5 154.5"    ;# 00 UTC 13

position.4.1  = "x 0 27.0 177.0"    ;# 00 UTC 8
position.4.2  = "x 0 27.0 177.0"
position.4.3  = "x 0 27.0 177.0"
position.4.4  = "x 0 27.5 177.0"
position.4.5  = "x 0 28.0 179.5"    ;# 00 UTC 9
position.4.6  = "x 0 29.5 182.0"
position.4.7  = "0 0 34.0 188.0"
position.4.8  = "0 0 39.0 195.0"
position.4.9  = "0 0 42.0 200.0"    ;# 00 UTC 10
position.4.10 = "0 0 45.0 205.0"
position.4.11 = "0 0 47.5 209.0"
position.4.12 = "0 0 50.0 212.0"
position.4.13 = "0 0 52.5 215.0"    ;# 00 UTC 11
position.4.14 = "0 0 54.0 216.0"
position.4.15 = "0 0 55.0 217.0"
position.4.16 = "0 0 55.0 217.5"
position.4.17 = "0 0 56.5 218.0"    ;# 00 UTC 12
position.4.18 = "0 0 57.0 218.0"
position.4.19 = "0 0 58.0 219.0"
position.4.20 = "0 0 58.0 219.0"
position.4.21 = "0 0 58.0 219.0"    ;# 00 UTC 13

position.7.1  = "0 0 51.0 132.0"    ;# 00 UTC 8
position.7.2  = "0 0 51.0 137.0"
position.7.3  = "0 0 51.0 142.0"
position.7.4  = "0 0 51.0 146.0"
position.7.5  = "0 0 52.0 149.0"    ;# 00 UTC 9
position.7.6  = "0 0 52.5 152.0"
position.7.7  = "0 0 52.5 154.0"
position.7.8  = "0 0 53.0 155.0"
position.7.9  = "0 0 53.0 157.0"    ;# 00 UTC 10
position.7.10 = "0 0 53.5 161.0"
position.7.11 = "0 0 54.5 165.0"
position.7.12 = "0 0 55.0 166.0"
position.7.13 = "0 0 55.0 166.0"    ;# 00 UTC 11
position.7.14 = "0 0 56.0 168.0"
position.7.15 = "0 0 56.0 169.0"
position.7.16 = "0 0 55.5 169.0"
position.7.17 = "0 0 56.0 171.0"    ;# 00 UTC 12
position.7.18 = "x 0 53.0 151.5"
position.7.19 = "x 0 53.0 153.0"
position.7.20 = "x 0 53.0 153.0"
position.7.21 = "x 0 53.5 154.5"    ;# 00 UTC 13

position.8.1  = "x 0 27.0 177.0"    ;# 00 UTC 8
position.8.2  = "x 0 27.0 177.0"
position.8.3  = "x 0 27.0 177.0"
position.8.4  = "x 0 27.5 177.0"
position.8.5  = "x 0 28.0 179.5"    ;# 00 UTC 9
position.8.6  = "x 0 29.5 182.0"
position.8.7  = "0 0 34.0 188.0"
position.8.8  = "0 0 39.0 196.0"
position.8.9  = "0 0 42.0 202.0"    ;# 00 UTC 10
position.8.10 = "0 0 45.0 207.0"
position.8.11 = "0 0 48.0 212.0"
position.8.12 = "0 0 49.0 217.0"
position.8.13 = "0 0 50.0 220.0"    ;# 00 UTC 11
position.8.14 = "0 0 54.0 222.0"
position.8.15 = "0 0 52.0 223.0"
position.8.16 = "0 0 53.0 225.0"
position.8.17 = "0 0 53.0 226.0"    ;# 00 UTC 12
position.8.18 = "0 0 54.0 228.0"
position.8.19 = "0 0 55.0 230.0"
position.8.20 = "0 0 56.0 232.0"
position.8.21 = "0 0 57.0 234.0"    ;# 00 UTC 13

vpage.1  = "0.0    5.6   4.2   8.2"
vpage.2  = "0.0    5.6   4.2   8.2"
vpage.3  = "0.0    2.8   0.8   4.5"
vpage.4  = "2.7    5.5   0.8   4.5"
vpage.5  = "5.4   11.0   4.2   8.2"
vpage.6  = "5.4   11.0   4.2   8.2"
vpage.7  = "5.4    8.2   0.8   4.5"
vpage.8  = "8.1   10.9   0.8   4.5"

#  plot the time series

"set map 15 1 5"
"run disp_colours_dark colour"
"set grid off"
"set clopts 1 3 0.25"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"

a = tima
while (a <= timb)
  "clear"
  "set t "a
  "set cthick 8"
  "set vpage "vpage.1
  "set grads off"
  "set xlab on"
  "set ylab off"
  "set clab off"
  "set xlint 20"
  "set ylint 10"
  "run gui_view_grid "dellata" "dellona" "position.1.1
  "run disp_shaded_nozero "var.1" "conin.1
  "run disp_unshaded_nozero "var.2" "conin.2
#  "run disp_vector_nolab ukinevint vkinevint 1e8"
  "set line 1 1 6"
  plot = subwrd(position.3.a,1)
  if (plot != "x")
    "run disp_box_grid "dellatb" "dellonb" 0 0 "position.3.a
  endif
  plot = subwrd(position.4.a,1)
  if (plot != "x")
    "run disp_box_grid "dellatb" "dellonb" 0 0 "position.4.a
  endif
  "set line 1 1 4"

  plot = subwrd(position.3.a,1)
  if (plot != "x")
    "set vpage "vpage.3
    "set grads off"
    "set xlab off"
    "set ylab off"
    "set clab on"
    "run gui_view_grid "dellatb" "dellonb" "position.3.a
    "run disp_unshaded_nozero "var.3" "conin.3
  endif

  plot = subwrd(position.4.a,1)
  if (plot != "x")
    "set vpage "vpage.4
    "set grads off"
    "set xlab off"
    "set ylab off"
    "set clab on"
    "run gui_view_grid "dellatb" "dellonb" "position.4.a
    "run disp_unshaded_nozero "var.4" "conin.4
  endif

  "set vpage "vpage.5
  "set grads off"
  "set xlab on"
  "set ylab on"
  "set clab off"
  "set xlint 20"
  "set ylint 10"
  "run gui_view_grid "dellata" "dellona" "position.1.1
  "run disp_shaded_nozero "var.5" "conin.5
  "run disp_unshaded_nozero "var.6" "conin.6
  "set line 1 1 6"
  plot = subwrd(position.7.a,1)
  if (plot != "x")
    "run disp_box_grid "dellatb" "dellonb" 0 0 "position.7.a
  endif
  plot = subwrd(position.8.a,1)
  if (plot != "x")
    "run disp_box_grid "dellatb" "dellonb" 0 0 "position.8.a
  endif
  "set line 1 1 4"

  plot = subwrd(position.7.a,1)
  if (plot != "x")
    "set vpage "vpage.7
    "set grads off"
    "set xlab off"
    "set ylab off"
    "set clab on"
    "run gui_view_grid "dellatb" "dellonb" "position.7.a
    "run disp_unshaded_nozero "var.7" "conin.7
  endif

  plot = subwrd(position.8.a,1)
  if (plot != "x")
    "set vpage "vpage.8
    "set grads off"
    "set xlab off"
    "set ylab off"
    "set clab on"
    "run gui_view_grid "dellatb" "dellonb" "position.8.a
    "run disp_unshaded_nozero "var.8" "conin.8
  endif

  "set vpage off"
  "set strsiz 0.25 0.25"
  "set string 1 c 6"
  "run gui_date"
  date = result
  "draw string 5.4 7.8 "date
  "set string 3 c 6"
  "draw string 5.4 4.6 500-hPa Height (20 dam)"
  "set string 2 c 6"
  "draw string 5.4 4.2 Column Eddy Kinetic Energy (1e6 J/m2)"
  "set string 1 c 6"
  "draw string 5.4 1.0 Zoom of Sea Level Pressure (8 hPa)"

  "set string 1 l 6"
  "draw string 0.5 7.8 Control"
  "set string 1 r 6"
  "draw string 10.5 8.2 No Trough"
  "draw string 10.4 7.8 Upstream"

  say "printim "a".gif gif x800 y600"
      "printim "a".gif gif x800 y600"
  a = a + 1
endwhile
"quit"
