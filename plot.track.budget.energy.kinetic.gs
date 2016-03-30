# This script is designed to plot the time series of budget terms.
* It can be executed using a command like
*
*     grads -bpc "plot.track.budget.energy.kinetic"
*
* - RD April 2003.

function doit(arg)

sta = subwrd(arg,1)
if (sta = "")
  sta = 1
  end = 8
else
  end = sta
endif

"run disp_colours"
"set grid off"

filename  = "budget.energy.kinetic.eddy.nc"
trackname = "track.nc"
slpname   = "slp.nc"
vertname  = "track.forcing.energy.kinetic.nc"

var.1  = "kinevint"
var.2  = "ktendvint"
var.3  = "khfcvint"
var.4  = "kvfcvint"
var.5  = "kreyvint"
var.6  = "kefovint"
var.7  = "kgenvint"
var.8  = "kresvint"

sca.1  = 1e-6
sca.2  = 1
sca.3  = 1
sca.4  = 1
sca.5  = 1
sca.6  = 1
sca.7  = 1
sca.8  = 1

conin.1 = 0.5
conin.2 = 7
conin.3 = 15
conin.4 = 1
conin.5 = 7
conin.6 = 4
conin.7 = 10
conin.8 = 7

title.1 = "Eddy KE ("conin.1" MJ/m2) Difference ("0.5*conin.1" MJ/m2) Profile (*1e-2 m2/s2)"
title.2 = "Ktend ("conin.2" W/m2) Diff ("0.5*conin.2" W/m2) Profile (*1e3 m2/s3)"
title.3 =  "Khfc ("conin.3" W/m2) Diff ("0.5*conin.3" W/m2) Profile (*1e3 m2/s3)"
title.4 =  "Kvfc ("conin.4" W/m2) Diff ("0.5*conin.4" W/m2) Profile (*1e3 m2/s3)"
title.5 =  "Krey ("conin.5" W/m2) Diff ("0.5*conin.5" W/m2) Profile (*1e3 m2/s3)"
title.6 =  "Kefo ("conin.6" W/m2) Diff ("0.5*conin.6" W/m2) Profile (*1e3 m2/s3)"
title.7 =  "Kgen ("conin.7" W/m2) Diff ("0.5*conin.7" W/m2) Profile (*1e3 m2/s3)"
title.8 =  "Kres ("conin.8" W/m2) Diff ("0.5*conin.8" W/m2) Profile (*1e3 m2/s3)"

vertvar.1  = "varj"
vertvar.2  = "vark"
vertvar.3  = "varl"
vertvar.4  = "varm"
vertvar.5  = "varn"
vertvar.6  = "varo"
vertvar.7  = "varp"
vertvar.8  = "varr"

vertsca.1  = 1e-2
vertsca.2  = 1e3
vertsca.3  = 1e3
vertsca.4  = 1e3
vertsca.5  = 1e3
vertsca.6  = 1e3
vertsca.7  = 1e3
vertsca.8  = 1e3

vrange.1 = "0 3"
vrange.2 = "-3 3"
vrange.3 = "-4 2"
vrange.4 = "-2 4"
vrange.5 = "-3 3"
vrange.6 = "-3 3"
vrange.7 = "0 6"
vrange.8 = "-5 1"

mrk.1 = 2
mrk.2 = 3
bigdot = 0.35
leva = 2
levb = 12

dellat = 17.5
dellon = 37.5
position = "37 145 37 145"
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
    "sdfopen "file.b.1"."slpname
    "sdfopen "file.b.2"."slpname
    "sdfopen "file.b.3"."slpname
    "run gui_view_grid "dellat" "dellon" "position

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
    "run disp_shaded_nozero "sca.a"*"var.a" "conin.a
    "set clab on"
#    "run disp_unshaded_nozero "sca.a"*"var.a" "6*conin.a
    "set clab off"
    "set cthick 10"
    "run disp_unshaded_nozero slpanom.7/100 5"
    "set cthick 4"
    "run gui_track_simple "trk.1

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
    "run disp_shaded_nozero "sca.a"*"var.a".2 "0.5*conin.a
    "run gui_track_simple "trk.2
    trackpos = result
    "run disp_box 10 10 0 5 "trackpos" "trackpos

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
    "run disp_shaded_nozero "sca.a"*"var.a".3 "conin.a
    "set clab on"
#    "run disp_unshaded_nozero "sca.a"*"var.a".3 "6*conin.a
    "set clab off"
    "set cthick 10"
    "run disp_unshaded_nozero slpanom.9/100 5"
    "set cthick 4"
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

    "sdfopen "file.b.1"."vertname
    "sdfopen "file.b.2"."vertname
    "sdfopen "file.b.3"."vertname

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
#    "set z "leva" "levb
    "set lev 1000 100"
    "set t 4"
    "set vrange "vrange.a
    "set xlint 2"
    "set digsiz 0.1"

    "set ccolor 1"
    "set cmark "mrk.1
    "d "vertvar.a"*"vertsca.a
    "set cmark "mrk.2
    "d "vertvar.a".3*"vertsca.a
    c = leva                                              ;# emphasize values
    while (c < levb+1)
      "set z "c

      "define var = "vertvar.a"*"vertsca.a
      "d var"
      var = subwrd(result,4)
      "q gr2xy "var" "c
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      "set line 0"
      "draw mark 3 "xval" "yval" "bigdot
      "set line 1"
      "draw mark 2 "xval" "yval" "bigdot

      "define var = "vertvar.a".3*"vertsca.a
      "d var"
      var = subwrd(result,4)
      "q gr2xy "var" "c
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      "set line 1"
      "draw mark 3 "xval" "yval" "bigdot

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
  "draw string 4.35 10.7 "title.a
  "run gui_print plot.track.budget.energy.kine."var.a
  a = a + 1
endwhile
"quit"
