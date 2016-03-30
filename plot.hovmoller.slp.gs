# This script is designed to perform latitudinal averages of a term
* and produce a postscript plot.  It can be executed using a command like
*
*        grads -bpc "plot.hovmoller.slp"
*
* - RD December 2001.

function plot(arg)

"clear"
"sdfopen slp.mon.mean.nc"

tima = 6
timb = 18

var = "slp"
varnames()
mrk = 2

"set xyrev on"
"set lat 45"
"set lon 120 240"

# define the areal averages then the time averages

#"set t 42 54"
#"set cint 2"
#"d ave(slp,lat=35,lat=70)"

b = tima
while (b <= timb)
  "set t "b
  "run gui_getimindex 2"
  timindex = result
  tmpvar = "maskout(ave(slp,lat=35,lat=70),-abs(tindex.2(x=1,y=1)-"timindex"))"
  "set t "tima" "timb
  say "define "_tmpvar.b" = "tmpvar
      "define "_tmpvar.b" = "tmpvar
  if (b = tima)
    varall =           "const("_tmpvar.b",0.0,-u)"
  else
    varall = varall " + const("_tmpvar.b",0.0,-u)"
  endif
  b = b + 1
endwhile
say "define "var.a"avg = "varall
    "define "var.a"avg = "varall
"set t "tima" "timb

"run gui_header date"

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
