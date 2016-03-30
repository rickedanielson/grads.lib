# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.sst.analysis 000000.sst.5day.nc 35 -50"
*
* - RD October 2000.

function plot(args)

file = subwrd(args,1)
position = subwrd(args,2)" "subwrd(args,3)" "subwrd(args,2)" "subwrd(args,3)
masking = 1

"set grid off"
"run disp_colours_dark"

dellat = 30
dellon = 50

"sdfopen "file

limit = 300
conin.1 = 0.5
conin.2 = 2

"run gui_view_grid "dellat" "dellon" "position
"set clopts 1 3 0.2"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"
"set t 1"
"run gui_date"
timestamp = result

"set grads off"
"set xlint 15"
"set ylint 10"
"set cthick 3"
"set clab off"
"run disp_shaded_nozero sstanom "conin.1
"set cthick 8"
"set clab off"
"run disp_unshaded sst "conin.2
"set clab on"
"run disp_unshaded sst "conin.2*2
"set cthick 15"
"set clab off"
"set clevs "limit
"set cstyle 2"
"d infl"
"draw title "timestamp

if (masking = 1)
  "run basemap L 0 1"
  "q gxinfo"
  line = sublin(result,3)
  xl = subwrd(line,4)
  xr = subwrd(line,6)
  line = sublin(result,4)
  yb = subwrd(line,4)
  yt = subwrd(line,6)
  "set line 1"
  "draw rec "xl" "yb" "xr" "yt
endif

"set strsiz 0.15 0.15"
"set string 1 c"
"draw string 4.25 0.7 5-d SST analysis ("conin.2"`3.`0C) and anomaly ("conin.1"`3.`0C)"
"draw string 4.25 0.3 Influence radius of "limit"km is dashed"
"run gui_print plot.sst.analysis."file
"quit"
