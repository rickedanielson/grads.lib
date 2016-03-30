# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.slp.15dmm5.gb cold.sstanom.15d.mm5.half.warmed.nc 45 150"
*     grads -bpc "plot.basic.slp.15dmm5.gb cold.sstanom.15d.mm5.nc 45 150"
*     grads -bpc "plot.basic.slp.15dmm5.gb cold.sstanom.15d.ncep.nc 45 150"
*
* where cmp86 is the file stem and 45 -65 is the stationary central
* position - RD October 2000.

function verint(arg)

budget = "basic.slp"

"clear"
"run disp_colours"
"set grid off"
tag = subwrd(arg,1)
position = subwrd(arg,2)" "subwrd(arg,3)" "subwrd(arg,2)" "subwrd(arg,3)
shift = subwrd(arg,4)
dellat = subwrd(arg,5)
dellon = subwrd(arg,6)
domain = subwrd(arg,7)
if (shift = "")
  shift = 0
endif
if (dellat = "")
  dellat = 25
endif
if (dellon = "")
  dellon = 70
endif
"set clopts 1 3 0.15"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"

"sdfopen "tag

vpage.1  = "0.0  4.4  0.1   2.1"
vpage.2  = "0.0  4.4  1.9   3.9"
vpage.3  = "0.0  4.4  3.7   5.7"
vpage.4  = "0.0  4.4  5.5   7.5"
vpage.5  = "0.0  4.4  7.3   9.3"
vpage.6  = "2.05 6.45 9.0  11.0"
vpage.7  = "4.1  8.5  7.3   9.3"
vpage.8  = "4.1  8.5  5.5   7.5"
vpage.9  = "4.1  8.5  3.7   5.7"
vpage.10 = "4.1  8.5  1.9   3.9"
vpage.11 = "4.1  8.5  0.1   2.1"

#  plot the time series

tima = 1
timb = 21

a = tima
b = 1
while (a <= timb)
  "set t "a
  "set vpage "vpage.b
  "set grads off"
  "run gui_view_grid "dellat" "dellon" "position

  "set xlint 20"
  "set ylint 10"
  "set clab off"
  "run disp_shaded_contoured slp/100 8 1016"
#  "set clab on"
#  "run disp_unshaded_nozero slp/100 24 944"
#  "set clab off"
#  "set cthick 6"
#  "run disp_unshaded_nozero hgt(lev=500) 200 4100"
#  "set cthick 3"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 2
  b = b + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 0.15 Sea Level Pressure (4 hPa) 500-hPa Height (20 dm)"
"set strsiz 0.1 0.1"
"set string 1 l"
"draw string 5.0 10.8 "tag
"run gui_print plot."tag".a"

"clear"
tima = 21
timb = 41

a = tima
b = 1
while (a <= timb)
  "set t "a
  "set vpage "vpage.b
  "set grads off"
  "run gui_view_grid "dellat" "dellon" "position

  "set xlint 20"
  "set ylint 10"
  "set clab off"
  "run disp_shaded_contoured slp/100 8 1016"
#  "set clab on"
#  "run disp_unshaded_nozero slp/100 24 944"
#  "set clab off"
#  "set cthick 6"
#  "run disp_unshaded_nozero hgt(lev=500) 200 4100"
#  "set cthick 3"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 2
  b = b + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 0.15 Sea Level Pressure (4 hPa) 500-hPa Height (20 dm)"
"set strsiz 0.1 0.1"
"set string 1 l"
"draw string 5.0 10.8 "tag
"run gui_print plot."tag".b"

"clear"
tima = 41
timb = 61

a = tima
b = 1
while (a <= timb)
  "set t "a
  "set vpage "vpage.b
  "set grads off"
  "run gui_view_grid "dellat" "dellon" "position

  "set xlint 20"
  "set ylint 10"
  "set clab off"
  "run disp_shaded_contoured slp/100 8 1016"
#  "set clab on"
#  "run disp_unshaded_nozero slp/100 24 944"
#  "set clab off"
#  "set cthick 6"
#  "run disp_unshaded_nozero hgt(lev=500) 200 4100"
#  "set cthick 3"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 2
  b = b + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 0.15 Sea Level Pressure (4 hPa) 500-hPa Height (20 dm)"
"set strsiz 0.1 0.1"
"set string 1 l"
"draw string 5.0 10.8 "tag
"run gui_print plot."tag".c"
"quit"
