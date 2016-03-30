# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.indv 778128"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit - RD January 2000.

function verint(arg)

budget = "basic"

"clear"
tag = subwrd(arg,1)
if (tag != "")
  "run disp_colours"
#  "sdfopen "tag"."budget".nc"
  "sdfopen "tag".nc"
  "sdfopen "tag".track.nc"
endif

if (tag != "111111")
  "run gui_getdate "tag
  onset = result
  tima = onset - 8
  timb = onset + 8
else
  tima = 3
  timb = 23
endif

dellat = 7.5
dellon = 15
shiftlat = 0
shiftlon = 0
tracklat = "troplat.2"
tracklon = "troplon.2"

var.0 = "omega"
var.1 = "slp"
varnames()

conin.0 = 0.15
conin.1 = 6

cenval.0 = 0.0
cenval.1 = 940

title = tag" 500-hPa Omega ("conin.0" Pa/s) and SLP ("conin.1" hPa)"

vpage.1  = "0 7.5 8.0 11"
vpage.2  = "0 7.5 6.0 9.0"
vpage.3  = "0 7.5 4.0 7.0"
vpage.4  = "0 7.5 2.0 5.0"
vpage.5  = "0 7.5 0.0 3.0"

datepos.1 = "7.1 9.5"
datepos.2 = "7.1 7.5"
datepos.3 = "7.1 5.5"
datepos.4 = "7.1 3.5"
datepos.5 = "7.1 1.5"

#  plot the time series

"clear"
"set grid off"
b = tima
c = 1
while (b <= timb)
  "set t "b
  "set vpage "vpage.c
  "set grads off"
  "run gui_trackpos "tracklat" "tracklon
  position = result
  "run gui_view_grid 17.5 60 "position
  "set clab off"
  "run disp_shaded_nozero "var.0"(lev=500) "conin.0" "cenval.0
  "set clab on"
  "run disp_unshaded_nozero "var.1"/100 "conin.1" "cenval.1
  "run gui_track_real troplat.2 troplon.2 1 "position
  "run gui_trackpos manulat.2 manulon.2"
  position = result
  "run gui_track_real manulat.2 manulon.2 8 "position
  b = b + 4
  c = c + 1
endwhile
"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 0.15 "title

"set strsiz 0.11 0.11"
b = tima
c = 1
while (b <= timb)
  "set t "b
  "run gui_date"
  date = result
  "draw string "datepos.c" "date
  b = b + 4
  c = c + 1
endwhile
"run gui_print plot."tag"."budget"."var.0

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
