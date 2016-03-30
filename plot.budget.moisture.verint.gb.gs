# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.budget.moisture.verint.gb decjan 37.5 145"
*
* where cmp86 is the file stem and 45 -65 is the stationary central
* position - RD October 2000.

function verint(arg)

budget = "budget.moisture"

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
#"set mproj scaled"

"sdfopen "tag"."budget".nc"
#"sdfopen "tag".nc"

tima = 1
timb = 9
"set lat 22 52"
"set lon 110 170"

var.0 = "shumvint"
var.1 = "stendvint*86400"
var.2 = "shfcvint*86400"
var.3 = "svfcvint*86400"
var.4 = "sresvint*86400"

conin.0 = 5
conin.1 = 5
conin.2 = 5
conin.3 = 2.5
conin.4 = 5

title.0 = "Precip Water ("conin.0" mm) and Transport (mm m/s)"
title.1 = "Precip Water Tendency ("conin.1" mm/d)"
title.2 = "PW Hor Flux Conv ("conin.2" mm/d) Transport (mm m/s)"
title.3 = "Precip Water Ver Flux Conv ("conin.3" mm/d)"
title.4 = "Precip Water Budget Residual ("conin.4" mm/d)"

vpage.1  = "0.0  4.4  0.3   2.7"
vpage.2  = "0.0  4.4  2.3   4.7"
vpage.3  = "0.0  4.4  4.3   6.7"
vpage.4  = "0.0  4.4  6.3   8.7"
vpage.5  = "2.05 6.45 8.3  10.7"
vpage.6  = "4.1  8.5  6.3   8.7"
vpage.7  = "4.1  8.5  4.3   6.7"
vpage.8  = "4.1  8.5  2.3   4.7"
vpage.9  = "4.1  8.5  0.3   2.7"

#  plot the time series

a = 0
while (a < 5)
  "clear"
  b = tima
  c = 1
  while (b <= timb)
    "set t "b
    "set vpage "vpage.c
    "set grads off"
    "run gui_view_grid "dellat" "dellon" "position
    if (a = 0 | a = 2)
#      "set clab off"
      "run disp_shaded_nozero "var.a" "conin.a
      if (c = 5)
        "run disp_vector ushumvint vshumvint 500"
      else
        "run disp_vector_nolab ushumvint vshumvint 500"
      endif
    else
      "run disp_shaded_nozero "var.a" "conin.a
    endif
#    "set clab off"
#    "run disp_unshaded_nozero hgt.2(lev=500) 200 4100"
    "run gui_date"
    date = result
    "draw title "date
    b = b + 1
    c = c + 1
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.15 Vint Sfc-300hPa "title.a
  "set strsiz 0.1 0.1"
  "set string 1 l"
  "draw string 6.0 10.8 "tag
  "run gui_print plot."tag"."budget".verint."var.a
  a = a + 1
endwhile
"quit"
