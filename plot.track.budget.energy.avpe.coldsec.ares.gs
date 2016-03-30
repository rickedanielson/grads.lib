# This script is designed to plot the time series of budget terms.
* It can be executed using a command like
*
*     grads -bpc "plot.track.budget.energy.avpe.coldsec.ares"
*
* - RD April 2003.
* %%BoundingBox: 88 435 557 767

function doit(arg)

sta = subwrd(arg,1)
sta = 8
if (sta = "")
  sta = 1
  end = 8
else
  end = sta
endif

"run disp_colours"
"set grid off"

filename  = "budget.energy.avpe.eddy.nc"
trackname = "track.nc"
slpname   = "slp.nc"
vertnama  = "track.forcing.energy.avpe.nc"
vertnamb  = "track.forcing.energy.avpe.coldsec.nc"

vertvar.1  = "vari"
vertvar.2  = "varj"
vertvar.3  = "vark"
vertvar.4  = "varl"
vertvar.5  = "varm"
vertvar.6  = "varn"
vertvar.7  = "varo"
vertvar.8  = "varp"

vertsca.1  = 1e-2
vertsca.2  = 1e3
vertsca.3  = 1e3
vertsca.4  = 1e3
vertsca.5  = 1e3
vertsca.6  = 1e3
vertsca.7  = 1e3
vertsca.8  = 1e3

vrange.1 = "0 2"
vrange.2 = "-3 3"
vrange.3 = "-3 3"
vrange.4 = "-3 3"
vrange.5 = "-1 5"
vrange.6 = "-3 3"
vrange.7 = "-6 0"
vrange.8 = "-2 3"

mrk.1 = 2
mrk.2 = 3
bigdot = 0.35
leva = 2
levb = 12

file.1.1 = "gd2000.dj30d"
file.1.2 = "gd2000.dj30d-gd2000.om30d"
file.1.3 = "gd2000.om30d"
file.2.1 = "dj30d"
file.2.2 = "dj30d-om30d"
file.2.3 = "om30d"
file.3.1 = "dec"
file.3.2 = "dec-mar"
file.3.3 = "mar"
file.4.1 = "midwinter"
file.4.2 = "midwinter-transitional"
file.4.3 = "transitional"

vpage.1 = "1.0  3.0  8.6 10.4"
vpage.2 = "2.75 4.75 8.6 10.4"
vpage.3 = "4.5  6.5  8.6 10.4"
vpage.4 = "6.25 8.25 8.6 10.4"
vpage.5 = "1.0  3.0  6.1  7.9"
vpage.6 = "2.75 4.75 6.1  7.9"
vpage.7 = "4.5  6.5  6.1  7.9"
vpage.8 = "6.25 8.25 6.1  7.9"

a = sta
while (a <= end)
  "clear"
  b = 1
  while (b < 5)
    "sdfopen "file.b.1"."vertnama
    "sdfopen "file.b.2"."vertnama
    "sdfopen "file.b.3"."vertnama

    "set clopts 1 3 0.40"
    "set xlopts 1 3 0.40"
    "set ylopts 1 3 0.40"

    "set vpage "vpage.b
    "set grads off"
    "set xlab on"
    if (b = 1)
      "set ylab on"
    else
      "set ylab off"
    endif
#    "set ylpos 0 r"
#    "set ylab on"
    "set ylint 200"
    "set x 1"
    "set y 1"
#    "set z "leva" "levb
    "set lev 1000 100"
    "set t 4"
    "set vrange "vrange.a
    "set xlint 1"
    "set digsiz 0.1"

    "set ccolor 1"
    "set cmark "mrk.1
    "d "vertvar.a"*"vertsca.a
    "set cmark "mrk.2
    "d "vertvar.a".3*"vertsca.a
    c = leva                                              ;# emphasize values
    while (c < levb+1)
      "set z "c

      "define var = "vertvar.a"*"vertsca.a
      "d var"
      var = subwrd(result,4)
      "q gr2xy "var" "c
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      "set line 0"
      "draw mark 3 "xval" "yval" "bigdot
      "set line 1"
      "draw mark 2 "xval" "yval" "bigdot

      "define var = "vertvar.a".3*"vertsca.a
      "d var"
      var = subwrd(result,4)
      "q gr2xy "var" "c
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      "set line 1"
      "draw mark 3 "xval" "yval" "bigdot

      c = c + 1
    endwhile
    "set line 1 1 3"
    "q gr2xy 0 "leva
    xa = subwrd(result,3)
    ya = subwrd(result,6)
    "q gr2xy 0 "levb
    xb = subwrd(result,3)
    yb = subwrd(result,6)
    "draw line "xa" "ya" "xb" "yb

    "close 3"
    "close 2"
    "close 1"
    "sdfopen "file.b.1"."vertnamb
    "sdfopen "file.b.2"."vertnamb
    "sdfopen "file.b.3"."vertnamb

    "set clopts 1 3 0.40"
    "set xlopts 1 3 0.40"
    "set ylopts 1 3 0.40"

    c = b + 4
    "set vpage "vpage.c
    "set grads off"
    "set xlab on"
    if (b = 1)
      "set ylab on"
    else
      "set ylab off"
    endif
#    "set ylpos 0 r"
#    "set ylab on"
    "set ylint 200"
    "set x 1"
    "set y 1"
#    "set z "leva" "levb
    "set lev 1000 100"
    "set t 4"
    "set vrange "vrange.a
    "set xlint 1"
    "set digsiz 0.1"

    "set ccolor 1"
    "set cmark "mrk.1
    "d "vertvar.a"*"vertsca.a
    "set cmark "mrk.2
    "d "vertvar.a".3*"vertsca.a
    c = leva                                              ;# emphasize values
    while (c < levb+1)
      "set z "c

      "define var = "vertvar.a"*"vertsca.a
      "d var"
      var = subwrd(result,4)
      "q gr2xy "var" "c
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      "set line 0"
      "draw mark 3 "xval" "yval" "bigdot
      "set line 1"
      "draw mark 2 "xval" "yval" "bigdot

      "define var = "vertvar.a".3*"vertsca.a
      "d var"
      var = subwrd(result,4)
      "q gr2xy "var" "c
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      "set line 1"
      "draw mark 3 "xval" "yval" "bigdot

      c = c + 1
    endwhile
    "set line 1 1 3"
    "q gr2xy 0 "leva
    xa = subwrd(result,3)
    ya = subwrd(result,6)
    "q gr2xy 0 "levb
    xb = subwrd(result,3)
    yb = subwrd(result,6)
    "draw line "xa" "ya" "xb" "yb

    "close 3"
    "close 2"
    "close 1"
    b = b + 1
  endwhile

  "set vpage off"
  "set strsiz 0.11 0.11"
  "set string 1 c"
  "draw string 1.9  10.4 a) GD Mid/Tra"
  "draw string 3.7  10.4 b) Mid/Tra"
  "draw string 5.45 10.4 c) Dec/Mar"
  "draw string 7.2  10.4 d) All Mid/Tra"
  "draw string 1.9   7.9 e) GD Mid/Tra"
  "draw string 3.7   7.9 f) Mid/Tra"
  "draw string 5.45  7.9 g) Dec/Mar"
  "draw string 7.2   7.9 h) All Mid/Tra"
  "draw string 4.0   7.1 Mid"
  "draw mark 2 4.0   6.9 0.1"
  "draw string 5.8   7.1 Tra"
  "draw mark 3 5.8   6.9 0.1"
  "set strsiz 0.13 0.13"
  "draw string 4.55 10.7 Warm-Sector APe Budget Residual Profiles (10  m2/s3)"
  "draw string 4.55  8.2 Cold-Sector APe Budget Residual Profiles (10  m2/s3)"
  "set strsiz 0.10 0.10"
  "draw string 6.6  10.8 -3"
  "draw string 6.53  8.3 -3"
  "run gui_print plot.track.budget.energy.avpe.coldsec.ares"
  a = a + 1
endwhile
"quit"
