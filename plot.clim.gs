# This script is designed to perform areal averages of budget terms
* and produce a postscript plot of the terms.  It can be executed using
* a command like
*
*     grads -blc "plot.clim"
*
* - RD September 2000.

function horavg

tima = 1
timb = 188
timc = 550
deltim = 180

a = 7
var.0 = "kinevint"
var.1 = "kgenvint"
var.2 = "barovint"
var.3 = "ghfcvint"
var.4 = "cresvint"
var.5 = "slp"
var.6 = "uagfvint"
var.7 = "vagfvint"
varnames()

conin.0 = 2e5
conin.1 = 2
conin.2 = 2
conin.3 = 2
conin.4 = 2
conin.5 = 400
conin.6 = 4e6
conin.7 = 2e6

"clear"
"set grads off"
"run disp_colours"
"set grid off"
#"set clopts 1 3 .35"
#"set xlopts 1 3 .4"
#"set ylopts 1 3 .4"
#"set strsiz .6 .6"
#"set string 1 bl 10"

vpage.0  = "1.05 3.25 9.0  10.8"
vpage.1  = "0.0  2.2  6.9   8.7"
vpage.2  = "0.0  2.2  5.0   6.8"
vpage.3  = "0.0  2.2  3.1   4.9"
vpage.4  = "2.1  4.3  6.9   8.7"
vpage.5  = "2.1  4.3  5.0   6.8"
vpage.6  = "2.1  4.3  3.1   4.9"

title.0 = "a"
title.1 = "b"
title.2 = "c"
title.3 = "d"
title.4 = "e"

"sdfopen 1975.trop.nc"
"sdfopen 1976.trop.nc"
"sdfopen 1977.trop.nc"
"sdfopen 1978.trop.nc"
"sdfopen 1979.trop.nc"
"sdfopen 1980.trop.nc"
"sdfopen 1981.trop.nc"
"sdfopen 1982.trop.nc"
"sdfopen 1983.trop.nc"
"sdfopen 1984.trop.nc"
"sdfopen 1985.trop.nc"

b = 1
c = 1
while (b < 21)
  if (b = 1)
    say "define "_tmpvar.b" = ave("var.a",t="timb",t="timb+deltim")"
        "define "_tmpvar.b" = ave("var.a",t="timb",t="timb+deltim")"
    varall =          "("_tmpvar.b
  else
    say "define "_tmpvar.b" = ave("var.a"."c",t="timc",t="timc+deltim")"
        "define "_tmpvar.b" = ave("var.a"."c",t="timc",t="timc+deltim")"
    varall = varall " + "_tmpvar.b
  endif
  b = b + 1
  c = c + 1
  say "set dfile "c
      "set dfile "c
  say "define "_tmpvar.b" = ave("var.a"."c",t="tima",t="tima+deltim")"
      "define "_tmpvar.b" = ave("var.a"."c",t="tima",t="tima+deltim")"
  varall = varall " + "_tmpvar.b
  b = b + 1
endwhile

varall = varall ")/20"
say "define varall = "varall
    "define varall = "varall

"set clab off"
"run disp_shaded_nozero varall "conin.a
"set clab on"
"run disp_unshaded_nozero varall "2*conin.a
"draw title 10-Year 6-Mon-Cold-Season (12-hly) Avg "var.a
"run gui_print plot.clim."var.a
"quit"

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
