# This script is designed to plot the time series of budget terms.
* It can be executed using a command like
*
*     grads -bpc "plot.twin.comp.qvecon"
*
* - RD April 2003.

function doit(arg)

"clear"
"run disp_colours"
"set grid off"

fila = subwrd(arg,1)
filb = subwrd(arg,2)
position = "37 145 37 145"
dellat = 17.5
dellon = 37.5
time = 5

var = "(qvecon(lev=500)+qvecon(lev=400)+qvecon(lev=300))/3"
scale = "e18"
var.1.1 = "(qvecon(lev=500)+qvecon(lev=400)+qvecon(lev=300))/3*1"scale
var.2.1 = "(qvecon.2(lev=500)+qvecon.2(lev=400)+qvecon.2(lev=300))/3*1"scale
var.2.2 = "qveconstat.2(lev=400)"
var.3.1 = "(qvecon.3(lev=500)+qvecon.3(lev=400)+qvecon.3(lev=300))/3*1"scale
conin.1 = 4
conin.2 = 2
conin.3 = 4
trk.1 = "4 manulat.4 manulon.4 1 0.1 0.2 3"
trk.2 = "5 manulat.5 manulon.5 1 0.1 0.2 3"
trk.3 = "6 manulat.6 manulon.6 1 0.1 0.2 3"

filename = "quasi.geostrophic.nc"
file.1.1 = "gd2000.dj30d"
file.1.2 = "gd2000.dj30d-gd2000.om30d"
file.1.3 = "gd2000.om30d"
file.2.1 = "dj30d"
file.2.2 = "dj30d-om30d"
file.2.3 = "om30d"
file.3.1 = "dec"
file.3.2 = "dec-mar"
file.3.3 = "mar"
file.4.1 = "midwinter"
file.4.2 = "midwinter-transitional"
file.4.3 = "transitional"
trackname = "track.nc"

vpage.1.1 = "0.1  3.2  8.7 10.4"
vpage.1.2 = "2.7  5.8  8.7 10.4"
vpage.1.3 = "5.3  8.4  8.7 10.4"
vpage.2.1 = "0.1  3.2  7.1  8.8"
vpage.2.2 = "2.7  5.8  7.1  8.8"
vpage.2.3 = "5.3  8.4  7.1  8.8"
vpage.3.1 = "0.1  3.2  5.5  7.2"
vpage.3.2 = "2.7  5.8  5.5  7.2"
vpage.3.3 = "5.3  8.4  5.5  7.2"
vpage.4.1 = "0.1  3.2  3.9  5.6"
vpage.4.2 = "2.7  5.8  3.9  5.6"
vpage.4.3 = "5.3  8.4  3.9  5.6"

"set clopts 1 3 0.25"
"set xlopts 1 3 0.25"
"set ylopts 1 3 0.25"

a = 1
while (a < 5)
  "sdfopen "file.a.1"."filename
  "sdfopen "file.a.2"."filename
  "sdfopen "file.a.3"."filename
  "sdfopen "file.a.1"."trackname
  "sdfopen "file.a.2"."trackname
  "sdfopen "file.a.3"."trackname
  "run gui_view_grid "dellat" "dellon" "position
  "set t "time

  "set vpage "vpage.a.1
  "set grads off"
  if (a = 4)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab on"
  "set xlint 20"
  "set ylint 10"
  "set cthick 4"
  "set clab off"
  "run disp_shaded_nozero "var.1.1" "conin.1
  "set clab on"
  "run disp_unshaded_nozero "var.1.1" "3*conin.1
  "run gui_track_simple "trk.1

  "set vpage "vpage.a.2
  "set grads off"
  if (a = 4)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set xlint 20"
  "set ylint 10"
  if (a != 4)
    "set gxout fgrid"
    "set fgvals 95 44 99 44"
    "d "var.2.2
    "set gxout contour"
  endif
  "set cthick 4"
  "set clab off"
  "run disp_unshaded_nozero "var.2.1" "conin.2
  "run gui_track_simple "trk.2

  "set vpage "vpage.a.3
  "set grads off"
  if (a = 4)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set xlint 20"
  "set ylint 10"
  "set cthick 4"
  "set clab off"
  "run disp_shaded_nozero "var.3.1" "conin.3
  "set clab on"
  "run disp_unshaded_nozero "var.3.1" "3*conin.3
  "run gui_track_simple "trk.3

  "close 6"
  "close 5"
  "close 4"
  "close 3"
  "close 2"
  "close 1"
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.12 0.12"
"set string 1 c"
"draw string 1.65 10.3 a) GD Midwinter (11)"
"draw string 4.25 10.3 b) GD Mid-Trans"
"draw string 6.85 10.3 c) GD Transitional (11)"
"draw string 1.65  8.7 d) Midwinter (13)"
"draw string 4.25  8.7 e) Mid-Trans"
"draw string 6.85  8.7 f) Transitional (12)"
"draw string 1.65  7.1 g) December (11)"
"draw string 4.25  7.1 h) Dec-Mar"
"draw string 6.85  7.1 i) March (11)"
"draw string 1.65  5.5 j) Total Midwinter (25)"
"draw string 4.25  5.5 k) Total Mid-Trans"
"draw string 6.85  5.5 l) Total Transitional (23)"
"set strsiz 0.13 0.13"
"draw string 4.25 10.7 500-300-hPa Q-Vector Convergence ("conin.1""scale" /Pa/s3) and Diff ("conin.2""scale" /Pa/s3)"
"run gui_print plot.twin.evol.qvecon"
"quit"
