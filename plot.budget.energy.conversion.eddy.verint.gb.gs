# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.budget.energy.conversion.eddy.verint.gb cmp86 45 -65"
*
* where cmp86 is the file stem and 45 -65 is the stationary central
* position - RD October 2000.

function verint(arg)

budget = "budget.energy.conversion.eddy"

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
#  dellat = 90
endif
if (dellon = "")
  dellon = 60
#  dellon = 180
endif
#"set mproj scaled"

"sdfopen "tag"."budget".nc"
"sdfopen "tag".nc"

tima =  1 + shift
timb = 21 + shift

var.0 = "kinevint"
var.1 = "kgenvint"
var.2 = "ghfcvint"
var.3 = "barovint"
var.4 = "cresvint"
var.5 = "gvfcvint"

conin.0 = 1e6
conin.1 = 40
conin.2 = 40
conin.3 = 40
conin.4 = 40
conin.5 = 20

title.0 = "Eddy KE ("conin.0" J/m2) and AGG Flux (m3/s3)"
title.1 = "Eddy Generation ("conin.1" W/m2)"
title.2 = "Eddy Geopot Hor Flux Conv ("conin.2" W/m2)"
title.3 = "Eddy PE Conversion ("conin.3" W/m2)"
title.4 = "Eddy Conversion Residual ("conin.4" W/m2)"
title.5 = "Eddy Geopot Vert Flux Conv ("conin.5" W/m2)"

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
while (a < 6)
  if (a = 1)
    a = 2
  endif
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
        "run disp_vector uagfvint vagfvint 1e8"
      else
        "run disp_vector_nolab uagfvint vagfvint 1e8"
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
#b = b + 4
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
"quit"
