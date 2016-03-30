# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.budget.energy.kinetic.eddy.verint.gb compare_1986 45 -65"
*
* where cmp86 is the file stem and 45 -65 is the stationary central
* position - RD October 2000.

function verint(arg)

budget = "budget.energy.kinetic.eddy"

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
  dellat = 17.5
endif
if (dellon = "")
  dellon = 60
endif

"sdfopen "tag"."budget".nc"
"sdfopen "tag".nc"

tima =  1 + shift
timb = 21 + shift

var.0 = "kinevint"
var.1 = "ktendvint"
var.2 = "khfcvint"
var.3 = "kvfcvint"
var.4 = "kgenvint"
var.5 = "kresvint"
var.6 = "kefovint"
var.7 = "kreyvint"
var.8 = "knstvint"
varnames()

conin.0 = 1e6
conin.1 = 40
conin.2 = 40
conin.3 = 20
conin.4 = 40
conin.5 = 40
conin.6 = 20
conin.7 = 20
conin.8 = 5

title.0 = "Kinetic Energy ("conin.0" J/m2) and H-Flux"
title.1 = "Q-L 12-h Tendency ("conin.1" W/m2)"
title.2 = "Q-L Hor Flux Conv ("conin.2" W/m2)"
title.3 = "Vert Flux Conv ("conin.3" W/m2)"
title.4 = "Generation ("conin.4" W/m2)"
title.5 = "Eddy KE Residual ("conin.5" W/m2)"
title.6 = "Eddy Forcing ("conin.6" W/m2)"
title.7 = "Reynolds Stress ("conin.7" W/m2)"
title.8 = "Non-Stationary Forcing ("conin.8" W/m2)"

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

a = 0
while (a < 9)
  "clear"
#  b = tima         + 4
#  c = 1            + 2
#  while (b <= timb - 4)
  b = tima
  c = 1
  while (b <= timb)
    "set t "b
    "set vpage "vpage.c
#"set vpage off"
    "set grads off"
    "run gui_view_grid "dellat" "dellon" "position
    if (a = 0 | a = 2)
      "set clab off"
      "run disp_shaded_nozero "var.a" "conin.a
      if (c = 6)
        "run disp_vector ukinevint vkinevint 1e8"
      else
        "run disp_vector_nolab ukinevint vkinevint 1e8"
      endif
    else
      "run disp_shaded_nozero "var.a" "conin.a
    endif
    "set clab off"
    "run disp_unshaded_nozero hgt.2(lev=500) 200 4100"
    if (domain != "")
      "set clevs 0.5"
      "set cthick 8"
      "set clab off"
      "d domain.2"
    endif
    "run gui_date"
    date = result
    "draw title "date
#b = timb
    b = b + 2
    c = c + 1
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.15 Vint Sfc-100hPa "title.a
#"draw string 4.25 3.5 Vint Sfc-100hPa "title.a
  "set strsiz 0.1 0.1"
  "set string 1 l"
  "draw string 6.0 10.8 "tag
  "run gui_print plot."tag"."budget".verint."var.a
  a = a + 1
endwhile

if (tag != "")
  "quit"
endif

function varnames()
  _tmpvar.1  = "var01"
  _tmpvar.2  = "var02"
  _tmpvar.3  = "var03"
  _tmpvar.4  = "var04"
  _tmpvar.5  = "var05"
  _tmpvar.6  = "var06"
  _tmpvar.7  = "var07"
  _tmpvar.8  = "var08"
  _tmpvar.9  = "var09"
  _tmpvar.10 = "var10"
  _tmpvar.11 = "var11"
  _tmpvar.12 = "var12"
  _tmpvar.13 = "var13"
  _tmpvar.14 = "var14"
  _tmpvar.15 = "var15"
  _tmpvar.16 = "var16"
  _tmpvar.17 = "var17"
  _tmpvar.18 = "var18"
  _tmpvar.19 = "var19"
  _tmpvar.20 = "var20"
  _tmpvar.21 = "var21"
  _tmpvar.22 = "var22"
  _tmpvar.23 = "var23"
  _tmpvar.24 = "var24"
  _tmpvar.25 = "var25"
  _tmpvar.26 = "var26"
  _tmpvar.27 = "var27"
  _tmpvar.28 = "var28"
  _tmpvar.29 = "var29"
  _tmpvar.30 = "var30"
  _tmpvar.31 = "var31"
  _tmpvar.32 = "var32"
  _tmpvar.33 = "var33"
  _tmpvar.34 = "var34"
  _tmpvar.35 = "var35"
  _tmpvar.36 = "var36"
  _tmpvar.37 = "var37"
  _tmpvar.38 = "var38"
  _tmpvar.39 = "var39"
  _tmpvar.40 = "var40"
  _tmpvar.41 = "var41"
  _tmpvar.42 = "var42"
  _tmpvar.43 = "var43"
  _tmpvar.44 = "var44"
  _tmpvar.45 = "var45"
  _tmpvar.46 = "var46"
  _tmpvar.47 = "var47"
  _tmpvar.48 = "var48"
  _tmpvar.49 = "var49"
  _tmpvar.50 = "var50"
return
