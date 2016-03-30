# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.twin.evol.shfcvint midwinter    transitional  37 145"
*     grads -bpc "plot.twin.evol.shfcvint dj30d        om30d         37 145"
*     grads -bpc "plot.twin.evol.shfcvint gd2000.dj30d gd2000.om30d  37 145"
*     grads -bpc "plot.twin.evol.shfcvint atlmid       atltra        42 -50"
*     grads -bpc "plot.twin.evol.shfcvint dec          mar           37 145"
*
* where dj30d and om30d are file stems and 40 150 is a stationary central
* position - RD October 2000.

function plot(args)
stema  = subwrd(args,1)
stemb  = subwrd(args,2)
position = subwrd(args,3)" "subwrd(args,4)" "subwrd(args,3)" "subwrd(args,4)

parname  = "shfcvint"
filename = "budget.moisture.fluxcon.nc"

if (stema = "midwinter")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "Midwinter (24) - Transitional (23)"
  title.2 = "Midwinter (24)"
  title.3 = "Transitional (23)"
endif
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
  title.1 = "Midwinter (11) - Transitional (11)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (11)"
endif

"run disp_colours"
"set grid off"

vpage.1.1  = "0.0  3.5  9.1  11.0"
vpage.1.2  = "0.0  3.5  7.3   9.3"
vpage.1.3  = "0.0  3.5  5.5   7.5"
vpage.1.4  = "0.0  3.5  3.7   5.7"
vpage.1.5  = "0.0  3.5  1.9   3.9"
vpage.1.6  = "0.0  3.5  0.1   2.1"
vpage.2.1  = "2.5  6.0  9.1  11.0"
vpage.2.2  = "2.5  6.0  7.3   9.3"
vpage.2.3  = "2.5  6.0  5.5   7.5"
vpage.2.4  = "2.5  6.0  3.7   5.7"
vpage.2.5  = "2.5  6.0  1.9   3.9"
vpage.2.6  = "2.5  6.0  0.1   2.1"
vpage.3.1  = "5.0  8.5  9.1  11.0"
vpage.3.2  = "5.0  8.5  7.3   9.3"
vpage.3.3  = "5.0  8.5  5.5   7.5"
vpage.3.4  = "5.0  8.5  3.7   5.7"
vpage.3.5  = "5.0  8.5  1.9   3.9"
vpage.3.6  = "5.0  8.5  0.1   2.1"

dellat = 17.5
dellon = 37.5

"set clopts 1 3 0.25"
"set xlopts 1 3 0.25"
"set ylopts 1 3 0.25"

"sdfopen "stema"."filename
"sdfopen "stema"-"stemb"."filename
"sdfopen "stemb"."filename
"sdfopen "stema".track.nc"
"sdfopen "stema"-"stemb".track.nc"
"sdfopen "stemb".track.nc"
"run gui_view_grid "dellat" "dellon" "position

var.1 = parname"*1e5"
var.2 = parname".2*1e5"
var.3 = parname".3*1e5"
trk.1 = "4 manulat.4 manulon.4 1 0.1 0.2 2"
trk.2 = "5 manulat.5 manulon.5 1 0.1 0.2 2"
trk.3 = "6 manulat.6 manulon.6 1 0.1 0.2 2"

conin.1 = 10
conin.2 = 5
conin.3 = 10
cenval.1 = 0
cenval.2 = 0
cenval.3 = 0
tima = 3

a = 1
while (a < 4)
  b = 2
  c = tima
  while (b < 7)
    "set t "c
    "set vpage "vpage.a.b
    "set grads off"
    if (a = 1)
      "set ylab on"
      "set ylint 10"
    else
      "set ylab off"
    endif
    if (b = 6)
      "set xlab on"
      "set xlint 20"
    else
      "set xlab off"
    endif
    "set clab off"
    "run disp_shaded_nozero "var.a" "conin.a" "cenval.a
    "set clab off"
    "run disp_unshaded_nozero "var.a" "conin.a" "cenval.a
#    "set clab on"
#    "run disp_unshaded_nozero "var.a" "8*conin.a" "cenval.a
    "run gui_track_simple "trk.a
    "run gui_date"
    date = result
    "draw title "date
    b = b + 1
    c = c + 1
  endwhile
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.13 0.13"
"set string 1 c"
"draw string 1.75  9.5 "title.2
"draw string 4.25  9.5 Midwinter-Transitional"
"draw string 6.75  9.5 "title.3
"draw string 4.25 10.2 Precipitable Water Flux Convergence ("conin.1" kg/m2/s)"
"draw string 4.25 9.9      and Difference ("conin.2" kg/m2/s)"
"set strsiz 0.1"
"draw string 6.75 10.6 ("stema" "stemb")"
"run gui_print plot.twin.evol.shfcvint."stema"."stemb
"quit"
