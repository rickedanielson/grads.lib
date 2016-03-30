# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.slp.sst.gb om30d 40 150"
*
* where cmp86 is the file stem and 45 -65 is the stationary central
* position - RD October 2000.

function plot(arg)

"clear"
"run disp_colours_dark"
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
  dellat = 17.5
endif
if (dellon = "")
  dellon = 50
endif
#"set mproj scaled"
masking = 1

#"sdfopen "tag".slp.nc"
#"sdfopen "tag".sst.stat.nc"
"sdfopen sst.mean.coads.nc"
"sdfopen sst.ltm.coads.nc"

tima = 1
timb = 12
conin.1 = 1

vpage.1  = "0.0  4.4  0.1   2.1"
vpage.2  = "0.0  4.4  1.9   3.9"
vpage.3  = "0.0  4.4  3.7   5.7"
vpage.4  = "0.0  4.4  5.5   7.5"
vpage.5  = "0.0  4.4  7.3   9.3"
vpage.6  = "0.0  4.4  9.0  11.0"
vpage.7  = "4.1  8.5  9.0  11.0"
vpage.8  = "4.1  8.5  7.3   9.3"
vpage.9  = "4.1  8.5  5.5   7.5"
vpage.10 = "4.1  8.5  3.7   5.7"
vpage.11 = "4.1  8.5  1.9   3.9"
vpage.12 = "4.1  8.5  0.1   2.1"

#  plot the time series

shift = 0
while (shift <= 30)
"clear"
a = tima
b = 1
while (a <= timb)
  c = 12 * shift + a + 2
  "set t "c
  "set vpage "vpage.b
  "set grads off"
  "set clopts 1 3 0.15"
  "set xlopts 1 3 0.15"
  "set ylopts 1 3 0.15"
  "set xlint 20"
  "set ylint 10"
  "run gui_view_grid "dellat" "dellon" "position

  "run gui_date"
  clim = substr(result,6,2)
  "set clab off"
  "run disp_shaded_nozero sst-sst.2(t="clim") "conin.1
  say "d sst-sst.2(t="clim")"

  "run gui_date"
  date = result
  "draw title "date
  a = a + 1
  b = b + 1
endwhile

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 1.55 SST ("conin.1"`3.`0C)"
"set strsiz 0.1 0.1"
"set string 1 l"
#"draw string 6.0 10.8 "tag
#"run disp_label_95_99 1 1 1.3 9.5 10"
"run gui_print plot.monthly.sst."shift

shift = shift + 1
endwhile
"quit"
