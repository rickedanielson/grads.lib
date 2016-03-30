# This script is designed to plot the time series of budget terms.
* It can be executed using a command like
*
*     grads -bpc "plot.twin.comp.lhtfl"
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

var = "lhtfl"
scale = "1/2.5e6*24*3600"
var.1.1 = var"*"scale
var.2.1 = var".2*"scale
var.2.2 = var"stat.2"
var.3.1 = var".3*"scale
conin.1 = 5
conin.2 = 2
conin.3 = 5
trk.1 = "4 manulat.4 manulon.4 1 0.1 0.2 3"
trk.2 = "5 manulat.5 manulon.5 1 0.1 0.2 3"
trk.3 = "6 manulat.6 manulon.6 1 0.1 0.2 3"

vertvar = "varh"
vertscale = "1e3*24*3600"
vertvar.1 = vertvar"*"vertscale
vertvar.2 = vertvar".3*"vertscale
vertvar.3 = vertvar"stat.2"
mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
bigdot = 0.35
critval = 0
leva = 2
levb = 8

filename = "surf.gauss.moist.latlon.nc"
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

vpage.1.1 = "0.1  3.1  8.7 10.4"
vpage.1.2 = "2.3  5.3  8.7 10.4"
vpage.1.3 = "4.5  7.5  8.7 10.4"
vpage.1.4 = "6.8  8.5  8.83  10.27"
vpage.2.1 = "0.1  3.1  7.1  8.8"
vpage.2.2 = "2.3  5.3  7.1  8.8"
vpage.2.3 = "4.5  7.5  7.1  8.8"
vpage.2.4 = "6.8  8.5  7.23  8.67"
vpage.3.1 = "0.1  3.1  5.5  7.2"
vpage.3.2 = "2.3  5.3  5.5  7.2"
vpage.3.3 = "4.5  7.5  5.5  7.2"
vpage.3.4 = "6.8  8.5  5.63  7.07"
vpage.4.1 = "0.1  3.1  3.9  5.6"
vpage.4.2 = "2.3  5.3  3.9  5.6"
vpage.4.3 = "4.5  7.5  3.9  5.6"
vpage.4.4 = "6.8  8.5  4.03  5.47"

a = 1
while (a < 5)
  "sdfopen "file.a.1"."filename
  "sdfopen "file.a.2"."filename
  "sdfopen "file.a.3"."filename
  "sdfopen "file.a.1"."trackname
  "sdfopen "file.a.2"."trackname
  "sdfopen "file.a.3"."trackname
  "sdfopen "file.a.1".nc"
  "sdfopen "file.a.2".nc"
  "sdfopen "file.a.3".nc"
  "run gui_view_grid "dellat" "dellon" "position
  "set t "time

  "set clopts 1 3 0.25"
  "set xlopts 1 3 0.25"
  "set ylopts 1 3 0.25"

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
  "set cthick 10"
  "run disp_unshaded_dashzero slp.7/100 8 1016"
  "set clab on"
  "set cthick 4"
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
  if (a = 9)
    "set gxout fgrid"
    "set fgvals 95 44 99 44"
    "d "var.2.2
    "set gxout contour"
  endif
  "set cthick 4"
  "set clab off"
  "run disp_shaded_nozero "var.2.1" "conin.2
  "run gui_track_simple "trk.2
  trackpos = result
  "run disp_box 10 10 0 5 "trackpos" "trackpos

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
  "set cthick 10"
  "run disp_unshaded_dashzero slp.9/100 8 1016"
  "set clab on"
  "set cthick 4"
  "run disp_unshaded_nozero "var.3.1" "3*conin.3
  "run gui_track_simple "trk.3

  "close 9"
  "close 8"
  "close 7"
  "close 6"
  "close 5"
  "close 4"
  "close 3"
  "close 2"
  "close 1"

  "sdfopen "file.a.1".track.forcing.moist.nc"
  "sdfopen "file.a.2".track.forcing.moist.nc"
  "sdfopen "file.a.3".track.forcing.moist.nc"

  "set clopts 1 3 0.45"
  "set xlopts 1 3 0.45"
  "set ylopts 1 3 0.45"

  "set vpage "vpage.a.4
  "set grads off"
  if (a = 4)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set ylab off"
  "set ylint 100"
  "set x 1"
  "set y 1"
#  "set z "leva" "levb
  "set lev 1000 300"
  "set t 4"
  "set vrange -1 5"
  "set xlint 1"
  "set digsiz 0.1"

  b = 5
  while (b < 4)
    "set ccolor 1"
    "define var = "vertvar.b
    "set cmark "mrk.b
    if (b = 3)                                            ;# loop through levels to highlight
      c = leva                                            ;# significant differences
      while (c < levb+1)
        "set z "c
        "define var = "vertvar.b
        "d var"
        var = subwrd(result,4)
        if (var >= critval)
          "define var = "vertvar.1
          "d var"
          var = subwrd(result,4)
          "q gr2xy "var" "c
          xval = subwrd(result,3)
          yval = subwrd(result,6)
          "set line 0"
          "draw mark 3 "xval" "yval" "bigdot
          "set line 1"
          "draw mark 2 "xval" "yval" "bigdot

          "define var = "vertvar.2
          "d var"
          var = subwrd(result,4)
          "q gr2xy "var" "c
          xval = subwrd(result,3)
          yval = subwrd(result,6)
          "set line 1"
          "draw mark 3 "xval" "yval" "bigdot
        endif
        c = c + 1
      endwhile
    else
      "d var"
    endif
    b = b + 1
  "set line 1 1 3"
  "q gr2xy 0 "leva
  xa = subwrd(result,3)
  ya = subwrd(result,6)
  "q gr2xy 0 "levb
  xb = subwrd(result,3)
  yb = subwrd(result,6)
  "draw line "xa" "ya" "xb" "yb
  endwhile

  "close 3"
  "close 2"
  "close 1"
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.12 0.12"
"set string 1 c"
"draw string 1.6  10.3 a) GD Mid (11)"
"draw string 3.8  10.3 b) GD Mid-Tra"
"draw string 6.0  10.3 c) GD Tra (11)"
"draw string 7.6  10.3 d)"
"draw string 7.8   9.9 Mid"
"draw mark 2 7.8   9.7 0.1"
"draw string 1.6   8.7 e) Mid (13)"
"draw string 3.8   8.7 f) Mid-Tra"
"draw string 6.0   8.7 g) Tra (12)"
"draw string 7.6   8.7 h)"
"draw string 7.8   8.3 Tra"
"draw mark 3 7.8   8.1 0.1"
"draw string 1.6   7.1 i) Dec (11)"
"draw string 3.8   7.1 j) Dec-Mar"
"draw string 6.0   7.1 k) Mar (11)"
"draw string 7.6   7.1 l)"
"draw string 1.6   5.5 m) All Mid (25)"
"draw string 3.8   5.5 n) All Mid-Tra"
"draw string 6.0   5.5 o) All Tra (23)"
"draw string 7.6   5.5 p)"
"set strsiz 0.13 0.13"
"draw string 4.35 10.7 Latent Heat Flux ("conin.1" mm/day) and Diff ("conin.2" mm/day)"
"run gui_print plot.twin.evol.lhtfl"
"quit"
