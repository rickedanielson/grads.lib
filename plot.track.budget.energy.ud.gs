# This script is designed to plot the time series of budget terms.
* It can be executed using a command like
*
*     grads -bpc "plot.track.budget.energy.ud 1"
*
* - RD April 2003.
* %%BoundingBox: 38 300 596 763

function doit(arg)

sta = subwrd(arg,1)
if (sta = "")
  sta = 1
  end = 5
else
  end = sta
endif

"run disp_colours"
"set grid off"

filename  = "budget.energy.conversion.eddy.timavg.orig.nc"
filenamb  = "budget.energy.conversion.eddy.timavg.orig.nc"
trackname = "track.nc"

var.0  = "gtfc"
#var.1  = "barovint"
#var.2  = "barovint.2"
#var.3  = "barovint.3"
var.1  = "(gvfc+ghfc)"
var.2  = "(gvfc.2+ghfc.2)"
var.3  = "(gvfc.3+ghfc.3)"

flux = 1000

#sca.1  = 1e4
sca.1  = 1
sca.2  = 24*3600
sca.3  = 24*3600
sca.4  = 24*3600
sca.5  = 24*3600

conin.1 = 2
conin.2 = 5
conin.3 = 5
conin.4 = 1
conin.5 = 5

mainlev = 650
#reflat = 46
#reflon = 132.5
#dellat = 7.5
#dellon = 12.5
reflat = 40
reflon = 130
dellat = 10
dellon = 10
minlat = reflat - dellat
maxlat = reflat + dellat
minlon = reflon - dellon
maxlon = reflon + dellon
box        = " "dellat" "dellon" 0 0 "reflat" "reflon" "reflat" "reflon
vertarea   = ",lon="minlon",lon="maxlon",lat="minlat",lat="maxlat")"
vertvar.1  = "aave((gvfc+ghfc)"vertarea
vertvar.2  = "aave((gvfc.2+ghfc.2)"vertarea
vertvar.3  = "aave((gvfc.3+ghfc.3)"vertarea
#vertvar.1  = "aave(baro"vertarea
#vertvar.2  = "aave(baro.2"vertarea
#vertvar.3  = "aave(baro.3"vertarea

vertsca.1  = 1e3
vertsca.2  = 1e3
vertsca.3  = 1e3

#vrange.1 = "-800 800"
vrange.1 = "-1.9 1.9"

mrk.1 = 2
mrk.2 = 3
bigdot = 0.35
leva = 2
levb = 12

dellat = 14
dellon = 30
position = "42.5 140 42.5 140"
trk.1 = "4 manulat.4 manulon.4 1 0.1 0.2 3"
trk.2 = "5 manulat.5 manulon.5 1 0.1 0.2 3"
trk.3 = "6 manulat.6 manulon.6 1 0.1 0.2 3"

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

vpage.1.1 = "0.1  3.1  8.7 10.4"
vpage.1.2 = "2.3  5.3  8.7 10.4"
vpage.1.3 = "4.5  7.5  8.7 10.4"
vpage.1.4 = "6.8  8.5  8.81  10.28"
vpage.2.1 = "0.1  3.1  7.1  8.8"
vpage.2.2 = "2.3  5.3  7.1  8.8"
vpage.2.3 = "4.5  7.5  7.1  8.8"
vpage.2.4 = "6.8  8.5  7.21  8.68"
vpage.3.1 = "0.1  3.1  5.5  7.2"
vpage.3.2 = "2.3  5.3  5.5  7.2"
vpage.3.3 = "4.5  7.5  5.5  7.2"
vpage.3.4 = "6.8  8.5  5.61  7.08"
vpage.4.1 = "0.1  3.1  3.9  5.6"
vpage.4.2 = "2.3  5.3  3.9  5.6"
vpage.4.3 = "4.5  7.5  3.9  5.6"
vpage.4.4 = "6.8  8.5  4.01  5.48"

a = sta
while (a <= end)
  "clear"
  b = 1
  while (b < 5)
    "sdfopen "file.b.1"."filename
    "sdfopen "file.b.2"."filename
    "sdfopen "file.b.3"."filename
    "sdfopen "file.b.1"."trackname
    "sdfopen "file.b.2"."trackname
    "sdfopen "file.b.3"."trackname
    "run gui_view_grid "dellat" "dellon" "position
    "set lev "mainlev

    "set clopts 1 3 0.25"
    "set xlopts 1 3 0.25"
    "set ylopts 1 3 0.25"

    "set vpage "vpage.b.1
    "set grads off"
    if (b = 4)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set ylab on"
    "set xlint 20"
    "set ylint 10"
    "set cthick 4"
    "set clab off"
    "run disp_shaded_nozero "sca.a"*"var.1" "conin.a
    "set clab on"
#    "run disp_unshaded_nozero "sca.a"*"var.1" "4*conin.a
    "set clab off"
    "set cthick 10"
#    "run disp_unshaded_nozero slpanom.7/100 5"
#    "run disp_unshaded_dashzero slp.7/100 8 1016"
#    "set cthick 4"
#    "run gui_track_simple "trk.1
    "run disp_vector_nolab uagf vagf "flux
    "run disp_box "box

    "set vpage "vpage.b.2
    "set grads off"
    if (b = 4)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set ylab off"
    "set xlint 20"
    "set ylint 10"
    "set cthick 4"
    "set clab off"
    "run disp_shaded_nozero "sca.a"*"var.2" "conin.a
#    "run gui_track_simple "trk.2
#    trackpos = result
#    "run disp_vector_nolab uagf.2 vagf.2 "flux
    "run disp_box "box

    "set vpage "vpage.b.3
    "set grads off"
    if (b = 4)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set ylab off"
    "set xlint 20"
    "set ylint 10"
    "set cthick 4"
    "set clab off"
    "run disp_shaded_nozero "sca.a"*"var.3" "conin.a
    "set clab on"
#    "run disp_unshaded_nozero "sca.a"*"var.3" "4*conin.a
    "set clab off"
    "set cthick 10"
#    "run disp_unshaded_nozero slpanom.9/100 5"
#    "run disp_unshaded_dashzero slp.9/100 8 1016"
#    "set cthick 4"
#    "run gui_track_simple "trk.3
    if (b = 1)
      "run disp_vector_newlab uagf.3 vagf.3 "flux
    else
      "run disp_vector_nolab uagf.3 vagf.3 "flux
    endif
    "run disp_box "box

    "close 6"
    "close 5"
    "close 4"
    "close 3"
    "close 2"
    "close 1"

    "sdfopen "file.b.1"."filenamb
    "sdfopen "file.b.2"."filenamb
    "sdfopen "file.b.3"."filenamb

    "set clopts 1 3 0.43"
    "set xlopts 1 3 0.43"
    "set ylopts 1 3 0.43"

    "set vpage "vpage.b.4
    "set grads off"
    if (b = 4)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set ylpos 0 r"
    "set ylab on"
    "set ylint 200"
    "set x 1"
    "set y 1"
    "set z "leva" "levb
    "set lev 1000 100"
    "set vrange "vrange.a
    "set xlint 1"
    "set digsiz 0.1"

    "set ccolor 1"
    "set cmark "mrk.1
    "define a = "vertvar.1"*"vertsca.a
    "d a"
    "set cmark "mrk.2
    "define a = "vertvar.3"*"vertsca.a
    "d a"
    c = leva                                              ;# emphasize values
    while (c < levb+1)
      "set z "c

      "define var = "vertvar.1"*"vertsca.a
      "d var"
      var = subwrd(result,4)
      "q gr2xy "var" "c
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      if (var < 800)
        "set line 0"
        "draw mark 3 "xval" "yval" "bigdot
        "set line 1"
        "draw mark 2 "xval" "yval" "bigdot
      endif

      "define var = "vertvar.3"*"vertsca.a
      "d var"
      var = subwrd(result,4)
      "q gr2xy "var" "c
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      if (var < 800)
        "set line 1"
        "draw mark 3 "xval" "yval" "bigdot
      endif

      c = c + 1
    endwhile
    "set line 1 1 3"
    "q gr2xy 0 "leva
    xa = subwrd(result,3)
    ya = subwrd(result,6)
    "q gr2xy 0 "levb
    xb = subwrd(result,3)
    yb = subwrd(result,6)
    "draw line "xa" "ya" "xb" "yb

    "close 3"
    "close 2"
    "close 1"
    b = b + 1
  endwhile

  "set vpage off"
  "set strsiz 0.12 0.12"
  "set string 1 c"
  "draw string 1.6  10.3 a) GD Mid (11)"
  "draw string 3.8  10.3 b) GD Mid-Tra"
  "draw string 6.0  10.3 c) GD Tra (11)"
  "draw string 7.6  10.3 d)"
  "draw string 7.9   9.5 Mid"
  "draw mark 2 7.9   9.3 0.1"
  "draw string 1.6   8.7 e) Mid (13)"
  "draw string 3.8   8.7 f) Mid-Tra"
  "draw string 6.0   8.7 g) Tra (12)"
  "draw string 7.6   8.7 h)"
  "draw string 7.9   7.9 Tra"
  "draw mark 3 7.9   7.7 0.1"
  "draw string 1.6   7.1 i) Dec (11)"
  "draw string 3.8   7.1 j) Dec-Mar"
  "draw string 6.0   7.1 k) Mar (11)"
  "draw string 7.6   7.1 l)"
  "draw string 1.6   5.5 m) All Mid (25)"
  "draw string 3.8   5.5 n) All Mid-Tra"
  "draw string 6.0   5.5 o) All Tra (23)"
  "draw string 7.6   5.5 p)"
  "set strsiz 0.13 0.13"
  "draw string 4.35 10.7 Low-Level Geopot Flux Conv ("conin.1"x10  m2/s3) and Profile (10  m2/s3)"
  "set strsiz 0.10 0.10"
  "draw string 4.39 10.8 -4"
  "draw string 7.15 10.8 -3"
  "run gui_print plot.track.budget.ud."var.0
  a = a + 1
endwhile
"quit"
