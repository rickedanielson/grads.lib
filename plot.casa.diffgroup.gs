# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casa.diffgroup"
*
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours_dark"
"set grid off"
"set clopts 1 3 .19"
"set xlopts 1 4 .23"
"set ylopts 1 4 .23"

"sdfopen /home/rdanielson/model/out/767605.budget.energy.total.eddy.nc"
"sdfopen /home/rdanielson/model/out/767605.budget.energy.conversion.eddy.nc"
"sdfopen /home/rdanielson/model/out/767605.quasi.geost.wave.activity.nc"
"sdfopen /home/rdanielson/model/out/767605.nc"
"sdfopen /home/rdanielson/model/out/767605.energy.mask.nc"
"sdfopen /home/rdanielson/model/out/767605.wave.mask.nc"
"sdfopen /home/rdanielson/model/out/767605.group.velocity.nc"

basevar.1 = "kinevint 2e6"
fluxvar.1 = "ukinevint+uagfvint.2 vkinevint+vagfvint.2 2e8"
maskvar.1 = "mask.5 kinevint 3000001"
basevar.2 = "wavevavg.3 30"
fluxvar.2 = "uwavevavg.3 vwavevavg.3 2000"
maskvar.2 = "mask.6 wavevavg.3 30.01"

dellat = "23.5 71.5"
dellon = "105 265"

time.1 = 1
time.2 = 5
time.3 = 9
time.4 = 13
time.5 = 17
time.6 = 21

vpage.1.1  = "0.0  3.8  8.6  10.5"
vpage.1.2  = "0.0  3.8  7.0   8.9"
vpage.1.3  = "0.0  3.8  5.4   7.3"
vpage.1.4  = "0.0  3.8  3.8   5.7"
vpage.1.5  = "0.0  3.8  2.2   4.1"
vpage.1.6  = "0.0  3.8  0.6   2.5"
vpage.2.1  = "3.5  7.3  8.6  10.5"
vpage.2.2  = "3.5  7.3  7.0   8.9"
vpage.2.3  = "3.5  7.3  5.4   7.3"
vpage.2.4  = "3.5  7.3  3.8   5.7"
vpage.2.5  = "3.5  7.3  2.2   4.1"
vpage.2.6  = "3.5  7.3  0.6   2.5"
vpage.3.1  = "7.4  8.5  8.6  10.5"
vpage.3.2  = "7.4  8.5  7.0   8.9"
vpage.3.3  = "7.4  8.5  5.4   7.3"
vpage.3.4  = "7.4  8.5  3.8   5.7"
vpage.3.5  = "7.4  8.5  2.2   4.1"
vpage.3.6  = "7.4  8.5  0.6   2.5"

a = 1
while (a < 4)
  b = 1
  while (b < 7)
    "set vpage "vpage.a.b
    "set grads off"
    "set t "time.b

    if (a < 3)
      "set lat "dellat
      "set lon "dellon
      if (b = 6)
        "set xlab on"
      else
        "set xlab off"
      endif
      "set ylab off"
      "set clab off"
      "set cthick 4"
      "run disp_shaded_nozero "basevar.a
      "set cthick 5"
      if (b = 1)
        if (a = 1)
          "run disp_vector_left "fluxvar.a
        else
          "run disp_vector_right "fluxvar.a
        endif
      else
        "run disp_vector_nolab "fluxvar.a
      endif
      "set cthick 3"
      "set clab off"
      "run disp_unshaded_nozero hgt.4(lev=500) 300 4100 10"
      "set cthick 10"
      "run disp_masks_one "maskvar.a
      "draw string 3.0 5.0 "label.a.b
    else
      "set lat 45"
      "set lon 180"
      "d cgeu.7(x=1,y=1)"
      cgeu.a = subwrd(result,4)
      "d cgev.7(x=1,y=1)"
      cgev.a = subwrd(result,4)
      "d cgwu.7(x=1,y=1)"
      cgwu.a = subwrd(result,4)
      "d cgwv.7(x=1,y=1)"
      cgwv.a = subwrd(result,4)
      say cgeu.a" "cgev.a" "cgwu.a" "cgwv.a
      "set lat -15 15"
      "set lon 0 30"
      "set xlab on"
      "set ylab on"
      "set xlopts 1 4 .8"
      "set ylopts 1 4 .8"
      "set xlabs  | | "
      "set ylabs  | | "
      "set mpdraw off"
      "run disp_unshaded_nozero hgt.4(lev=500) 300 -4100 10"
      "q w2xy 0 0"
      rec = sublin(result,1)
      xbef = subwrd(rec,3)
      ybef = subwrd(rec,6)
      "q w2xy "cgeu.a" "cgev.a
      rec = sublin(result,1)
      xaft = subwrd(rec,3)
      yaft = subwrd(rec,6)
      "set line 1 1 10"
      "draw line "xbef" "ybef" "xaft" "yaft
#      "draw mark 2 "xaft" "yaft" 0.5"
      "set strsiz 0.8"
      "set string 1 c 7"
      "draw string "xaft" "yaft" E"
      "q w2xy "cgwu.a" "cgwv.a
      rec = sublin(result,1)
      xaft = subwrd(rec,3)
      yaft = subwrd(rec,6)
      "set line 1 1 10"
      "draw line "xbef" "ybef" "xaft" "yaft
#      "draw mark 4 "xaft" "yaft" 0.5"
      "set strsiz 0.8"
      "set string 1 c 7"
      "draw string "xaft" "yaft" W"
    endif

    b = b + 1
  endwhile
  a = a + 1
endwhile

title.1  = "00 UTC 8 March"
title.2  = "00 UTC 9 March"
title.3  = "00 UTC 10 March"
title.4  = "00 UTC 11 March"
title.5  = "00 UTC 12 March"
title.6  = "00 UTC 13 March"
label.1.1  = "a"
label.1.2  = "b"
label.1.3  = "c"
label.1.4  = "d"
label.1.5  = "e"
label.1.6  = "f"
label.2.1  = "g"
label.2.2  = "h"
label.2.3  = "i"
label.2.4  = "j"
label.2.5  = "k"
label.2.6  = "l"
label.3.1  = "m"
label.3.2  = "n"
label.3.3  = "o"
label.3.4  = "p"
label.3.5  = "q"
label.3.6  = "r"

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 c 4"
#"draw string 1.5 10.62 Eddy"
"draw string 1.0 10.32 Eddy Energy"
#"draw string 6.0 10.62 Wave"
"draw string 6.3 10.32 Wave Activity"
#"draw string 8.0 10.4 Cg"
"draw string 8.0 10.32 Cg"
a = 1
yposa = 10.32
yposb =  9.96
yposc = 10.10
yposd =  9.55
ypose =  9.00
yposf =  8.85
while (a < 7)
  "set strsiz 0.15"
  "set string 1 c 4"
  "draw string 3.6 "yposa" "title.a
  "set strsiz 0.20"
  "set string 1 c 10"
  "draw string 0.5 "yposb" "label.1.a
  "draw string 4.0 "yposb" "label.2.a
  "draw string 7.7 "yposb" "label.3.a
  "set strsiz 0.10"
  "set string 1 r 3"
  "draw string 7.45 "yposc" 15"
  "draw string 7.45 "yposd" 0"
  "draw string 7.45 "ypose" -15"
  "draw string 7.55 "yposf" 0"
  "draw string 8.05 "yposf" 15"
  "draw string 8.50 "yposf" 30"

  a = a + 1
  yposa = yposa - 1.6
  yposb = yposb - 1.6
  yposc = yposc - 1.6
  yposd = yposd - 1.6
  ypose = ypose - 1.6
  yposf = yposf - 1.6
endwhile

"run gui_print plot.casa.diffgroup"
"quit"
