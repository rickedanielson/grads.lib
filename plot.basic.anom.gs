# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.anom 111111"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit - RD January 2000.

function verint(arg)

budget = "anomaly"

"clear"
tag = subwrd(arg,1)
if (tag != "")
  "run disp_colours"
  "sdfopen "tag"."budget".nc"
  "sdfopen "tag".track.nc"
endif

tima = 3
timb = 23
dellat = 7.5
dellon = 15
shiftlat = 0
shiftlon = 0
tracklat = "troplat.2"
tracklon = "troplon.2"

var.0 = "slpanom"
stat.0 = "slpstat"
var.1 = "olranom"
stat.1 = "olrstat"
var.2 = "hgtanom"
stat.2 = "hgtstat"
varnames()

conin.0 = 2
conin.1 = 5
conin.2 = 20

title.0 = "SLP Anomaly ("conin.0" hPa) and T-stat (90/95/99%)"
title.1 = "OLR Anomaly ("conin.1" W/m2) and T-stat (90/95/99%)"
title.2 = "400-hPa Height Anomaly ("conin.2" m) and T-stat (90/95/99%)"

vpage.3  = "0.0  4.4  0.1   2.1"
vpage.5  = "0.0  4.4  1.9   3.9"
vpage.7  = "0.0  4.4  3.7   5.7"
vpage.9  = "0.0  4.4  5.5   7.5"
vpage.11 = "0.0  4.4  7.3   9.3"
vpage.13 = "2.05 6.45 9.0  11.0"
vpage.15 = "4.1  8.5  7.3   9.3"
vpage.17 = "4.1  8.5  5.5   7.5"
vpage.19 = "4.1  8.5  3.7   5.7"
vpage.21 = "4.1  8.5  1.9   3.9"
vpage.23 = "4.1  8.5  0.1   2.1"

#  plot the time series

a = 2
while (a < 3)
  "clear"
  b = tima
  while (b <= timb)
    "set t "b
    "set vpage "vpage.b
    "set grads off"
    "run gui_trackpos "tracklat" "tracklon
    position = result
    "run gui_view_grid 17.5 60 "position
    if (a = 0)
      "run disp_shaded_stat "stat.a
      "run disp_unshaded_nozero "var.a"/100 "conin.a
      "run gui_date"
      date = result
      "draw title "date
    endif
    if (a = 1)
      "run disp_shaded_stat "stat.a
      "run disp_unshaded_nozero "var.a" "conin.a
      "run gui_calcindic"
      num = result
      "run gui_date"
      date = result
      "draw title "date" ("num" cases)"
    endif
    if (a = 2)
      "run disp_shaded_stat "stat.a"(lev=400)"
      "run disp_unshaded_nozero "var.a"(lev=400) "conin.a
      "run gui_date"
      date = result
      "draw title "date
    endif
    "run gui_track_grid_short troplat.2 troplon.2 1 "position
    b = b + 2
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.15 "title.a
  "run gui_print plot."budget"."var.a
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
