# This script is designed to plot the time series of
* budget terms.  It can be executed using a command like
*
*     grads -bpc "plot.comparison.balpv"
*
* %%BoundingBox: 20 215 598 635
* - RD February 2000.

function doit

vpage.1  = "0.0  4.35  6.5   9.0"
vpage.2  = "0.0  4.35  4.4   6.9"
vpage.3  = "0.0  4.35  2.3   4.8"
vpage.4  = "4.15  8.5  6.5   9.0"
vpage.5  = "4.15  8.5  4.4   6.9"
vpage.6  = "4.15  8.5  2.3   4.8"

title.1 = "a) Coriolis * Stability"
title.2 = "b) Vorticity * Stability"
title.3 = "c) Remaining Term"
title.4 = "d) Phi Laplacian"
title.5 = "e) Psi Laplacian"
title.6 = "f) Proxy Remaining Term"

"clear"
"run disp_colours_dark"
"set grid off"
"set clopts 1 3 .18"
"set xlopts 1 8 .17"
"set ylopts 1 8 .17"

"sdfopen 767605.totl.floats.nc"
"set zlog on"
"set lev 1000 100"
"set lat 15 85"
"set lon 180"

a = 1
while (a < 7)
  "set vpage "vpage.a
  "set grads off"
  "set xlint 20"
  "set ylint 200"
  "set clab forced"

  b = 2 * (a-1)
  c = 2 * (a-1) + 1
  if (a = 1 | a = 2 | a = 3)
    if (a = 1)
      "run disp_shaded_nozero (var"c"-var"b")*1e6 2"
    else
      "run disp_shaded_nozero (var"c"-var"b")*1e8 2"
    endif
  else
    "run disp_shaded_nozero (var"c"-var"b")*1e11 1"
  endif

  if (a = 1 | a = 2 | a = 3)
    "d 1e6*var"b
  else
    "d 1e9*var"b
  endif

  if (a = 1 | a = 2 | a = 3)
    "set clab forced"
    if (a = 1)
      "run disp_unshaded_nozero (var"c"-var"b")*1e6 2"
    else
      "run disp_unshaded_nozero (var"c"-var"b")*1e8 2"
    endif
  else
    "set clab on"
    "run disp_unshaded_nozero (var"c"-var"b")*1e11 1"
  endif

  "q gxinfo"
  line = sublin(result,3)
  xl = subwrd(line,4)
  xr = subwrd(line,6)
  line = sublin(result,4)
  yb = subwrd(line,4)
  yt = subwrd(line,6)
  "set line 0"
  if (a = 1 | a = 2 | a = 4 | a = 5)
    "draw recf "xl-0.1" 0 "xr+0.1" "yb-0.08
  endif
  if (a = 4 | a = 5 | a = 6)
    "draw recf -0.5 "yb-0.5" "xl-0.12" "yt+0.5
  endif

  "set string 1 c"
  "set strsiz 0.25"
  "draw string 4.6 4.7 "title.a
  a = a + 1
endwhile
"set vpage off"
"set strsiz 0.15"
#"draw string 2.4 9.6 Analytic PV Terms"
#"draw string 2.4 9.3 (PVU) and FD Errors"
#"draw string 6.6 9.6 Analytic Balance Terms"
#"draw string 6.6 9.3 (1e-9 /s2) and FD Errors"
"draw string 2.5 9.3 Potential Vorticity"
"draw string 6.6 9.3 Balance Equation"
"run gui_print plot.comparison.balpv"
"quit"
