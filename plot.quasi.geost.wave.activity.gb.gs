# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.quasi.geost.wave.activity.gb 767605 45 170"
*     grads -bpc "plot.quasi.geost.wave.activity.gb mmout_balcont3 45 170"
*     grads -bpc "plot.quasi.geost.wave.activity.gb mmout_balpert9 45 170"
*     grads -bpc "plot.quasi.geost.wave.activity.gb mmout_balpert10 45 170"
*     grads -bpc "plot.quasi.geost.wave.activity.gb mmout_balpert11 45 170"
*
* where 767605 is the file stem and 45 170 is the stationary central
* position - RD October 2000.

function verint(arg)

budget = "quasi.geost.wave.activity"

"clear"
"run disp_colours_light"
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
  dellat = 25
#  dellat = 90
endif
if (dellon = "")
  dellon = 80
#  dellon = 180
endif
#"set mproj scaled"

"sdfopen "tag".quasi.geost.wave.activity.nc"
"sdfopen "tag".quasi.geost.wave.activity.budget.nc"

tima =  1 + shift
timb = 21 + shift

var.0  = "vint(sfcpres/100,kineeddy,100)/vint(sfcpres/100,hgt-hgt+1,100)"
var.1  = "vint(sfcpres/100,0.5*1e12*potveddy*potveddy,100)/vint(sfcpres/100,hgt-hgt+1,100)"
var.2  = "wavevavg"
var.3  = "wwavevavg"
var.4  = "wtendvavg.2"
var.5  = "whfcvavg.2"
var.6  = "-hdivg(reluwavevavg,relvwavevavg)"
var.7  = "-hdivg(meanuwavevavg,meanvwavevavg)"
var.8  = "wvfcvavg.2"
var.9  = "wresvavg.2"

conin.0 = 200
conin.1 = 0.5
conin.2 = 20
conin.3 = 3
conin.4 = 5e-4
conin.5 = 5e-4
conin.6 = 5e-4
conin.7 = 5e-4
conin.8 = 1e-4
conin.9 = 5e-4

varname.0 = "qgke"
varname.1 = "qgenstro"
varname.2 = "wave"
varname.3 = "wwave"
varname.4 = "wtend"
varname.5 = "whfc"
varname.6 = "whfcrel"
varname.7 = "whfcmean"
varname.8 = "wvfc"
varname.9 = "wres"

title.0 = "QG Energy ("conin.0" m2/s2)"
title.1 = "QG Enstrophy ("conin.1" PVU^2)"
title.2 = "QG Wave Activity ("conin.2" m/s)"
title.3 = "Ver Flux ("conin.3" Pa m/s2)"
title.4 = "Tendency ("conin.4" m/s2)"
title.5 = "Hor Flux Conv ("conin.5" m/s2)"
title.6 = "Rel Hor Flux Conv ("conin.6" m/s2)"
title.7 = "Mean Hor Flux Conv ("conin.7" m/s2)"
title.8 = "Ver Flux Conv ("conin.8" m/s2)"
title.9 = "Residual ("conin.9" m/s2)"

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
while (a < 10)
  "clear"
  b = tima
  c = 1
  while (b <= timb)
    "set t "b
    "set lev 500"
    "set vpage "vpage.c
    "set grads off"
    "set clab off"
    "run gui_view_grid "dellat" "dellon" "position
    "run disp_shaded_nozero "var.a" "conin.a
    if (a = 2 | a = 5)
      if (c = 6)
        "run disp_vector uwavevavg vwavevavg 2000"
      else
        "run disp_vector_nolab uwavevavg vwavevavg 2000"
      endif
    endif
    if (a = 6)
      if (c = 6)
        "run disp_vector reluwavevavg relvwavevavg 500"
      else
        "run disp_vector_nolab reluwavevavg relvwavevavg 500"
      endif
    endif
    if (a = 7)
      if (c = 6)
        "run disp_vector meanuwavevavg meanvwavevavg 1000"
      else
        "run disp_vector_nolab meanuwavevavg meanvwavevavg 1000"
      endif
    endif
    "run disp_unshaded_nozero hgt 200 4100"
    "run gui_date"
    date = result
    "draw title "date
    b = b + 2
    c = c + 1
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.15 Vavg Sfc-100hPa "title.a
  "set strsiz 0.1 0.1"
  "set string 1 l"
  "draw string 6.0 10.8 "tag
  "run gui_print plot."tag"."budget".vavg."varname.a
  a = a + 1
endwhile
"quit"
