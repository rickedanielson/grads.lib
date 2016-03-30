# This script is designed to plot the comparison of a variable at
* different levels.  It can be executed using a command like
*
*     grads -bpc "plot.comparison.balpv.invert 767605.totl"
*     grads -bpc "plot.comparison.balpv.invert 767605.totl.ideal"
*
* where the two data files contain the variables to be compared - RD April 2001.

function compare(arg)

tag = subwrd(arg,1)
reflev = "250"
reflat = "27.5 82.5"
reflon = "47.5 262.5"

vpage.1 = "0.0   4.25  7.0   8.85"
vpage.2 = "0.0   4.25  5.25  7.10"
vpage.3 = "0.0   4.25  3.5   5.35"
vpage.4 = "4.25  8.5   7.0   8.85"
vpage.5 = "4.25  8.5   5.25  7.10"
vpage.6 = "4.25  8.5   3.5   5.35"

conin.1 = 400     ;  cenval.1 = 0
conin.2 = 100     ;  cenval.2 = 0
conin.3 = 20      ;  cenval.3 = 0
conin.4 = 0.5     ;  cenval.4 = 0
conin.5 = 0.5     ;  cenval.5 = 0
conin.6 = 0.1     ;  cenval.6 = 0
conin2.4 = 2.0
conin2.5 = 2.0
conin2.6 = 2.0

title.1 = "a) ("conin.4" PVU)"
title.2 = "c) ("conin.5" PVU)"
title.3 = "e) ("conin.6" PVU)"
title.4 = "b) ("conin.1" m)"
title.5 = "d) ("conin.2" m)"
title.6 = "f) ("conin.3" m)"

main.1 = "Reference PV ="
main.2 = "Reference PV ="
main.3 = "Reference PV ="
main.4 = "Finite Difference"
main.5 = "Analytic"
main.6 = "Finite Difference"

"clear"
"run disp_colours_dark"
"set grid off"
"set clopts 1 3 .18"
"set xlopts 1 4 .17"
"set ylopts 1 4 .17"

path.1 = "iterate.once"
path.2 = "iterate.once.idealpv"
path.3 = "iterate.totally"

a = 1
while (a < 4)
  "sdfopen "path.a"/"tag".bas.potential.vorticity.nc"
  "sdfopen "path.a"/"tag".res.potential.vorticity.nc"
  "set lev "reflev
  "set lat "reflat
  "set lon "reflon

  "set vpage "vpage.a
  "set grads off"
  "set xlint 40"
  "set ylint 20"
  "set clab forced"

  b = a + 3
  "set clab off"
  "set cthick 8"
  "run disp_shaded_nozero (potv.2-potv)*1e6 "conin.b" "cenval.b
  "set cint "conin2.b
#  "set clab forced"
  "set clab off"
  "set cthick 4"
  "d 1e6*potv.2"

  "q gxinfo"
  line = sublin(result,3)
  xl = subwrd(line,4)
  xr = subwrd(line,6)
  line = sublin(result,4)
  yb = subwrd(line,4)
  yt = subwrd(line,6)
  "set line 0"
  if (a != 3)
    "draw recf "xl-0.5" 0 "xr+0.5" "yb-0.08
  endif

  "set string 1 l"
  "set strsiz 0.28"
  "draw string 0.0 3.55 "title.a
  "set string 1 r"
  "draw string 8.5 3.55 "main.a
  "close 2"
  "close 1"

  "sdfopen "path.a"/"tag".bas.nc"
  "sdfopen "path.a"/"tag".res.nc"
  "set lev "reflev
  "set lat "reflat
  "set lon "reflon

  "set vpage "vpage.b
  "set grads off"
  "set xlint 40"
  "set ylint 20"

  "set clab off"
  "set cthick 8"
  "run disp_shaded_nozero hgt.2-hgt "conin.a
  "set cint 400"
#  "set clab forced"
  "set cthick 4"
  "d hgt.2"
#  "run disp_unshaded_nozero hgt.2 400 10000"

  "q gxinfo"
  line = sublin(result,3)
  xl = subwrd(line,4)
  xr = subwrd(line,6)
  line = sublin(result,4)
  yb = subwrd(line,4)
  yt = subwrd(line,6)
  "set line 0"
  "draw recf -0.7 "yb-0.1" "xl-0.12" "yt+0.1
  if (a != 3)
    "draw recf "xl-0.5" 0 "xr+0.5" "yb-0.08
  endif

  "set string 1 r"
  "set strsiz 0.28"
  "draw string 8.0 3.55 "title.b
  "set string 1 l"
  "draw string 0.3 3.55 "main.b
  "close 2"
  "close 1"
  a = a + 1
endwhile

"set vpage off"
"set string 1 c"
"set strsiz 0.15"
"draw string 2.0 9.5 Inversion Output-Reference"
"draw string 2.0 9.2 PV at "reflev" hPa"
"draw string 6.5 9.5 Inversion Output-Analytic"
"draw string 6.5 9.2 Height at "reflev" hPa"
"run gui_print plot.comparison.balpv.invert"
"quit"
