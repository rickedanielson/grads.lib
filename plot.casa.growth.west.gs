# This script is designed to perform areal averages of masked budget terms
* and produce a postscript plot of the terms and their corresponding
* growth rates.  It can be executed using a command like
*
*        grads -bpc "plot.casa.growth 756609"
*
* (note that more than one term may be included with the residual) - RD July 2001.

function retrkgrd(args)

"clear"
"set grid off"

"sdfopen "args".growth.rates.energy.eddy.nc"
"sdfopen "args".growth.rates.energy.eddy.posneg.nc"

dom.1 = "a"
dom.2 = "b"
dom.3 = "c"

if (args = '756609')
  tima.1 = 9    ;   timb.1 = 11
  tima.2 = 11   ;   timb.2 = 15
  tima.3 = 15   ;   timb.3 = 19
endif
if (args = '845072')
  tima.1 = 5    ;   timb.1 = 7
  tima.2 = 7    ;   timb.2 = 11
  tima.3 = 11   ;   timb.3 = 15
endif
if (args = '845495')
  tima.1 = 9    ;   timb.1 = 11
  tima.2 = 11   ;   timb.2 = 15
  tima.3 = 13   ;   timb.3 = 17
endif

vpage.1.1  = "0.8  2.2  7.5  10.0"
vpage.1.2  = "2.3  5.1  7.5  10.0"
vpage.1.3  = "5.2  8.0  7.5  10.0"
vpage.2.1  = "0.8  2.2  4.3   6.8"
vpage.2.2  = "2.3  5.1  4.3   6.8"
vpage.2.3  = "5.2  8.0  4.3   6.8"
vpage.3.1  = "0.8  2.2  1.1   3.6"
vpage.3.2  = "2.3  5.1  1.1   3.6"
vpage.3.3  = "5.2  8.0  1.1   3.6"

label.1.1  = "1.5   9.80 Western"
label.1.2  = "3.7   9.80 Central"
label.1.3  = "6.6   9.80 Eastern"
label.2.1  = "1.5   9.50 Center"
label.2.2  = "3.7   9.50 Center"
label.2.3  = "6.6   9.50 Center"

mrksiz = 0.12

"set strsiz 0.15 0.15"
"set string 1 c"

a = 1
while (a < 4)
  "set parea "vpage.1.a
  "set grads off"
  "set xlab on"
  "set xlopts 1 4 0.15"
  "set ylopts 1 4 0.15"
  if (a = 1)
    "set xlabs  |  | "
    "set ylab on"
  endif
  if (a = 2)
    "set xlabs |  |  |  | "
    "set ylab off"
  endif
  if (a = 3)
    "set xlabs |  |  |  | "
    "set ylab off"
  endif
  "set ylint 5"
  "set t "tima.a" "timb.a
  "set vrange 0 22"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 3"
  "define var = kine"dom.a" / 1e18"
  "d var"
  "draw string "label.1.a
  "draw string "label.2.a
  a = a + 1
endwhile

a = 1
while (a < 4)
  "set parea "vpage.2.a
  "set grads off"
  "set xlab on"
  "set xlopts 1 4 0.15"
  "set ylopts 1 4 0.15"
  if (a = 1)
    "set xlabs  |  | "
    "set ylab on"
  endif
  if (a = 2)
    "set xlabs |  |  |  | "
    "set ylab off"
  endif
  if (a = 3)
    "set xlabs |  |  |  | "
    "set ylab off"
  endif
  "set ylint 1"
  "set t "tima.a" "timb.a
  "set vrange -2 3"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 3"
  "define var = khfc"dom.a" + kvfc"dom.a
  "d var"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 4"
  "define var = kgen"dom.a
  "d var"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 5"
  "define var = krey"dom.a
  "d var"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 7"
  "define var = kefo"dom.a
  "d var"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 8"
  "define var = kres"dom.a" + knst"dom.a
  "d var"
  if (a = 2 | a = 3)
    "set cthick 7" ; "set ccolor 1" ; "set cstyle 2" ; "set digsiz "mrksiz
    "set cmark 0"
    "define var = ghfp"dom.a".2"
    "d var"
  endif
  a = a + 1
endwhile

x.1 = 1.05 ; y.1 = 6.55 ; mrk.1 = 3 ; var.1 = "-`2U`327`2K`be"
x.2 = 2.55 ; y.2 = 6.55 ; mrk.2 = 4 ; var.2 = "-`2v`327`2`bp`n`3x"
x.3 = 3.70 ; y.3 = 6.55 ; mrk.3 = 5 ; var.3 = "-`2v`32`0(`2u`32`37`2V`0)"
x.4 = 5.50 ; y.4 = 6.55 ; mrk.4 = 7 ; var.4 = "+`2v`32`0(`2u`32`37`2v`0)"
x.5 = 7.10 ; y.5 = 6.55 ; mrk.5 = 8 ; var.5 = "+`2R`bk"
"set string 1 l"
"set strsiz 0.15 0.15"
a = 1
while (a < 6)
  shift = x.a + 0.13
  "draw mark "mrk.a" "x.a" "y.a" "mrksiz
  "draw string "shift" "y.a" "var.a
  a = a + 1
endwhile
"set line 1 1 4"
"draw line 4.75 6.67 4.90 6.67"
"draw line 6.05 6.67 6.75 6.67"

a = 1
while (a < 4)
  "set parea "vpage.3.a
  "set grads off"
  "set xlab on"
  "set xlopts 1 4 0.15"
  "set ylopts 1 4 0.15"
  if (a = 1)
    "set xlabs 8/00Z |  | 8/12Z"
    "set ylab on"
  endif
  if (a = 2)
    "set xlabs |  | 9/00Z |  | 9/12Z"
    "set ylab off"
  endif
  if (a = 3)
    "set xlabs |  | 10/00Z |  | 10/12Z"
    "set ylab off"
  endif
  "set ylint 1"
  "set t "tima.a" "timb.a
  "set vrange -2 3"
#  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
#  "set cmark 4"
#  "define var = kgen"dom.a
#  "d var"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 4"
  "define var = ghfc"dom.a
  "d var"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 2"
  "define var = baro"dom.a
  "d var"
  "set cthick 4" ; "set ccolor 1" ; "set cstyle 1" ; "set digsiz "mrksiz
  "set cmark 3"
  "define var = gvfc"dom.a" + cres"dom.a
  "d var"
  if (a = 2 | a = 3)
    "set cthick 7" ; "set ccolor 1" ; "set cstyle 2" ; "set digsiz "mrksiz
    "set cmark 0"
    "define var = ghfp"dom.a".2"
    "d var"
  endif
  a = a + 1
endwhile

x.1 = 1.20 ; y.1 = 3.35 ; mrk.1 = 2 ; var.1 = "-`3aw"
x.2 = 3.00 ; y.2 = 3.35 ; mrk.2 = 4 ; var.2 = "-`37`2`bp`n`32`0(`3x`2v`0)`2`ba"
x.3 = 6.00 ; y.3 = 3.35 ; mrk.3 = 3 ; var.3 = "-`36`0(`3xw`0)/`36`2p"
"set string 1 l"
"set strsiz 0.15 0.15"
a = 1
while (a < 4)
  shift = x.a + 0.13
  "draw mark "mrk.a" "x.a" "y.a" "mrksiz
  "draw string "shift" "y.a" "var.a
  a = a + 1
endwhile

"set string 1 c"
"set strsiz 0.18 0.18"
"draw string 4.2 10.25 `2Ke`0 (10`a18`n J)"
"draw string 4.4  7.05 Contributions to `36`2Ke/`36`2t`0 (day`a-1`n)"
"draw string 4.4  3.85 Contributions to -`2v`327`2`bp`n`3x`0 (day`a-1`n)"

"set string 1 c 10"
"set strsiz 0.25"
"draw string 2.0  7.7   a"
"draw string 4.9  7.7   b"
"draw string 7.8  7.7   c"
"draw string 2.0  4.5   d"
"draw string 4.9  4.5   e"
"draw string 7.8  4.5   f"
"draw string 2.0  1.35  g"
"draw string 4.9  1.3   h"
"draw string 7.8  1.3   i"

"run gui_print plot.casa.growth."args
"quit"
