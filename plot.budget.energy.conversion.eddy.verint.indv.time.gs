# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.budget.energy.conversion.eddy.verint.indv.time 767605.full.output 47.5 140"
*
* where 767605.full.output is the file stem and 47.5 140 is the stationary central
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
  dellat = 22.5
#  dellat = 90
endif
if (dellon = "")
  dellon = 80
#  dellon = 180
endif
#"set mproj scaled"

"sdfopen "tag"."budget".nc"
"sdfopen "tag".nc"

time = 1 + shift

var.0 = "kinevint"
var.1 = "kgenvint"
var.2 = "barovint"
var.3 = "ghfcvint"
var.4 = "gvfcvint"

conin.0 = 1e6
conin.1 = 40
conin.2 = 40
conin.3 = 40
conin.4 = 20

title.0 = "Eddy KE ("conin.0" J/m2) and AGG Flux (m3/s3)"
title.1 = "Eddy Generation ("conin.1" W/m2)"
title.2 = "Eddy PE Conversion ("conin.2" W/m2)"
title.3 = "Eddy Geopot Hor Flux Conv ("conin.3" W/m2)"
title.4 = "Eddy Geopot Vert Flux Conv ("conin.4" W/m2)"

vpage.0  = "0 7.5 8.0 11"
vpage.1  = "0 7.5 6.0 9.0"
vpage.2  = "0 7.5 4.0 7.0"
vpage.3  = "0 7.5 2.0 5.0"
vpage.4  = "0 7.5 0.0 3.0"

#  plot the budget

a = 0
while (a < 5)
  "set t "time
  "set vpage "vpage.a
  "set grads off"
  if (a = 4)
    "set xlab on"
  else
    "set xlab off"
  endif
  "run gui_view_grid "dellat" "dellon" "position
  "set clab off"
  "run disp_shaded_nozero "var.a" "conin.a
  if (a = 0 | a = 3)
    "run disp_vector_nolab uagfvint vagfvint 1e8"
  endif
  "set clab off"
  "run disp_unshaded_nozero hgt.2(lev=500) 200 4100"
#  "draw title Vint Sfc-100hPa "title.a
  "draw string 4.25 6.0 Vint Sfc-100hPa "title.a
  a = a + 1
endwhile

"set vpage off"
"set strsiz 0.1 0.1"
"set string 1 c"

a = 0
while (a < 5)
  "draw string 3.7 "subwrd(vpage.a,4)-0.5" Vint Sfc-100hPa "title.a
  a = a + 1
endwhile

"run gui_date"
date = result
"draw string 7.5 10.5 "date
"draw string 7.5 10.1 "tag
"run gui_print plot."tag"."budget".verint"
"quit"
