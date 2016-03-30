# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.potential.vorticity 111111"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit - RD January 2000.

function verint(arg)

budget = "potential.vorticity"

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

var.0 = "tropres"
var.1 = "tropott"
varnames()

conin.0 = 25
conin.1 = 7.5

cenval.0 = 100
cenval.1 = 280

title.0 = "Pressure ("conin.0" hPa)"
title.1 = "Potential Temperature ("conin.1" K)"

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

a = 0
while (a < 2)
  "clear"
  b = tima
  c = 1
  while (b <= timb)
    "set t "b
    "set vpage "vpage.b
    "set grads off"
    "run gui_trackpos "tracklat" "tracklon
    position = result
    "run gui_view_grid 17.5 60 "position
    if (a = 0)
      "run disp_unshaded_nozero "var.a"/100 "conin.a" "cenval.a
    else
      "run disp_unshaded_nozero "var.a" "conin.a" "cenval.a
#      if (c = 6)
#        "run disp_vector tropuwnd tropvwnd 50"
#      else
#        "run disp_vector_nolab tropuwnd tropvwnd 50"
#      endif
    endif
#    "run disp_box_grid "dellat" "dellon" "shiftlat" "shiftlon" "position
    "run gui_track_grid_short troplat.2 troplon.2 1 "position
    "run gui_calcindic"
    num = result
    "run gui_date"
    date = result
    "draw title "date" ("num" cases)"
    b = b + 2
    c = c + 1
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.15 Dynamic Trop (2 PVU) "title.a
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
