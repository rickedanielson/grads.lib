# This script is designed to plot the comparison of a variable at
* different levels.  It can be executed using a command like
*
*     grads -bpc "plot.casb.pvtheta"
*
* where the two data files contain the variables to be compared - RD April 2001.
* and set %%BoundingBox: 50 440 555 754

function compare(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .18"
"set xlopts 1 4 .17"
"set ylopts 1 4 .17"

"sdfopen /home/rdanielson/model/in/bal/runs/767605.totl.mod.potential.vorticity.nc"
"sdfopen /home/rdanielson/model/in/bal/runs/767605.totl.potential.vorticity.nc"

"set t 1"
"set lat 32.5 72.5"
"set lon 57.5 147.5"
RADIN  =   750                                          ;* radius of anomaly removal inner domain (km)
RADOUT =   1500                                         ;* radius of anomaly removal outer domain (km)
NEGLAT =   56.0                                         ;* central latitude  of the negative anomaly removal domain
NEGLON =   91.0                                         ;* central longitude of the negative anomaly removal domain
POSLAT =   50.0                                         ;* central latitude  of the positive anomaly removal domain
POSLON =   115.0

vpage.1 = "0.1  4.6  8.2  10.8"
vpage.2 = "3.9  8.4  8.2  10.8"
vpage.3 = "0.1  4.6  5.9   8.5"
vpage.4 = "3.9  8.4  5.9   8.5"
thickness = 4
thicknessb = 10

# plot the series

a = 1
while (a < 5)
  "set vpage "vpage.a
  "set grads off"
  "set xlint 20"
  "set ylint 10"
  if (a = 1 | a = 2)
    "set xlab off"
  else
    "set xlab on"
  endif
  if (a = 2 | a = 4)
    "set ylab off"
  else
    "set ylab on"
  endif
  if (a = 1)
    "set clab off"
    "set cthick "thicknessb
    "run disp_shaded_nozero (pott(lev=100)-pott.2(t=1,lev=100)+pott(lev=150)-pott.2(t=1,lev=150))/2 2"
    "set cthick "thickness
    "run disp_unshaded_nozero (pott.2(t=1,lev=100)+pott.2(t=1,lev=150))/2 10 250"
    "set clab on"
    "run disp_unshaded_nozero (pott.2(t=1,lev=100)+pott.2(t=1,lev=150))/2 20 250"
    "set cthick 4"
    "draw title a) 125-hPa `3Dz`0 (2 K)"
  endif
  if (a = 2)
    "set clab off"
    "set cthick "thicknessb
    "run disp_shaded_nozero potv(lev=200)*1e6-potv.2(t=1,lev=200)*1e6 1"
    "set cthick "thickness
    "run disp_unshaded_nozero potv.2(t=1,lev=200)*1e6 2"
    "set clab on"
    "run disp_unshaded_nozero potv.2(t=1,lev=200)*1e6 4"
    "set cthick 4"
    "draw title b) 200-hPa `3D`0PV (1 PVU)"
  endif
  if (a = 3)
    "set clab off"
    "set cthick "thicknessb
    "run disp_shaded_nozero potv(lev=400)*1e6-potv.2(t=1,lev=400)*1e6 1"
    "set cthick "thickness
    "run disp_unshaded_nozero potv.2(t=1,lev=400)*1e6 1"
    "set clab on"
    "run disp_unshaded_nozero potv.2(t=1,lev=400)*1e6 1"
    "set cthick 4"
    "draw title c) 400-hPa `3D`0PV (1 PVU)"
  endif
  if (a = 4)
    "set clab off"
    "set cthick "thicknessb
    "run disp_shaded_nozero potv(lev=600)*1e6-potv.2(t=1,lev=600)*1e6 0.2"
    "set cthick "thickness
    "run disp_unshaded_nozero potv.2(t=1,lev=600)*1e6 0.5"
    "set clab on"
    "run disp_unshaded_nozero potv.2(t=1,lev=600)*1e6 0.5"
    "set cthick 4"
    "draw title d) 600-hPa `3D`0PV (0.2 PVU)"
  endif
  "run disp_circle "NEGLAT" "NEGLON" "RADIN"  1"
  "run disp_circle "NEGLAT" "NEGLON" "RADOUT" 1"
  "run disp_circle "POSLAT" "POSLON" "RADIN"  1"
  "run disp_circle "POSLAT" "POSLON" "RADOUT" 1"
  a = a + 1
endwhile
"run gui_print plot.casb.pvtheta"
"quit"
