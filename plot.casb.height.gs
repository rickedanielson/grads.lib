# This script is designed to plot the comparison of a variable at
* different levels.  It can be executed using a command like
*
*     grads -bpc "plot.casb.height"
*
* where the two data files contain the variables to be compared - RD April 2001.
* and set %%BoundingBox: 50 440 555 754

function compare(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .12"
"set xlopts 1 4 .12"
"set ylopts 1 4 .12"

"sdfopen /home/rdanielson/model/in/bal/runs/767605.totl.res.nc.modified.9"
"sdfopen /home/rdanielson/model/in/bal/runs/767605.totl.res.nc.modified.10"
"sdfopen /home/rdanielson/model/in/bal/runs/767605.totl.res.nc.unmodified.3"
"sdfopen /home/rdanielson/model/in/bal/runs/767605.totl.res.nc.modified.11"
"sdfopen /home/rdanielson/model/in/bal/runs/767605.totl.nc"

"set t 1"
"set lev 400"
"set lat 22.5 87.5"
"set lon 40 270"
RADIN  =   750                                          ;* radius of anomaly removal inner domain (km)
RADOUT =   1500                                         ;* radius of anomaly removal outer domain (km)
NEGLAT =   56.0                                         ;* central latitude  of the negative anomaly removal domain
NEGLON =   91.0                                         ;* central longitude of the negative anomaly removal domain
POSLAT =   50.0                                         ;* central latitude  of the positive anomaly removal domain
POSLON =   115.0

#vpage.1 = "0.1  4.6  8.2  10.8"
#vpage.2 = "3.9  8.4  8.2  10.8"
#vpage.3 = "0.1  4.6  5.9   8.5"
#vpage.4 = "3.9  8.4  5.9   8.5"
vpage.1 = "0.1 8.5 8 11"
vpage.2 = "0.1 8.5 5.8 8.8"
vpage.3 = "0.1 8.5 3.6 6.6"
vpage.4 = "0.1 8.5 1.4 4.4"

conin.1 = 40
conin.2 = 20
conin.3 = 150
title.1 = "a) Full PV Removal ("conin.1" m)"
title.2 = "b) Half PV Removal ("conin.1" m)"
title.3 = "c) No PV Removal ("conin.2" m)"
title.4 = "d) Half PV Addition ("conin.1" m)"

# plot the series

a = 1
while (a < 5)
  "set vpage "vpage.a
  "set grads off"
  "set xlint 30"
  "set ylint 20"
  if (a = 4)
    "set xlab on"
  else
    "set xlab off"
  endif
  "set clab off"
  "set cthick 8"
  if (a = 3)
    "run disp_shaded_nozero hgt.3-hgt.5 "conin.2
  else
    "run disp_shaded_nozero hgt."a"-hgt.3 "conin.1
  endif
  "set cthick 4"
  "run disp_unshaded_nozero hgt."a" "conin.3" 6000"
  "set clab on"
  "run disp_unshaded_nozero hgt."a" "7*conin.3" 6300"
  "draw title "title.a
#  "run disp_circle "NEGLAT" "NEGLON" "RADIN"  1"
#  "run disp_circle "NEGLAT" "NEGLON" "RADOUT" 1"
#  "run disp_circle "POSLAT" "POSLON" "RADIN"  1"
#  "run disp_circle "POSLAT" "POSLON" "RADOUT" 1"
  a = a + 1
endwhile
"run gui_print plot.casb.height"
"quit"
