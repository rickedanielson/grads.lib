# This script is designed to perform areal averages of budget terms
* and produce a postscript plot of the terms and their corresponding
* growth rates.  It can be executed using a command like
*
*     grads -bpc "plot.budget.energy.kinetic.corr.horavg 111111"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit.  If the tag is 111111,
* then the budget domain is assumed to be defined relative to a mobile
* location, otherwise it's assumed to be stationary with respect to the
* grid it's defined upon - RD January 2000.

function horavg(arg)

budget = "budget.energy.kinetic.corr"

"clear"
tag = subwrd(arg,1)
if (tag != "")
  "sdfopen "tag"."budget".nc"
  "sdfopen "tag".track.nc"
endif
if (tag != "111111")
  cenlat = 45
  cenlon = 205
endif

tima = 3
timb = 23
xlabel = "-60 60 12"
#xlabel = ""
dellat = 7.5
dellon = 15
shiftlat = 0
shiftlon = 0
tracklat = "troplat.2"
tracklon = "troplon.2"

var.0 = "kine"
var.1 = "ktend"
var.2 = "khfc"
var.3 = "kgen"
var.4 = "kres"
var.5 = "kvfc"
var.6 = "kefo"
var.7 = "krey"
var.8 = "chfc"
var.9 = "cvfc"
var.10 = "knst"
var.11 = "wkine"
varnames()

conin.0 = 50
conin.1 = 0.0005
conin.2 = 0.0005
conin.3 = 0.0005
conin.4 = 0.0005
conin.5 = 0.0005
conin.6 = 0.0005
conin.7 = 0.0005
conin.8 = 0.0005
conin.9 = 0.0005
conin.10 = 0.0005

title.0 = "a) Kinetic Energy ("conin.0" m2/s2) and V-Flux"
title.1 = "b) Q-L 12-h Tendency ("conin.1" m2/s3)"
title.2 = "c) Q-L Hor Flux Conv ("conin.2" m2/s3)"
title.3 = "d) Generation ("conin.3" m2/s3)"
title.4 = "e) Residual ("conin.4" m2/s3)"
title.5 = "f) Vert Flux Conv ("conin.5" m2/s3)"
title.6 = "g) Eddy Forcing ("conin.6" m2/s3)"
title.7 = "h) Reynolds Stress ("conin.7" m2/s3)"
title.8 = "i) Corr Hor Flux Conv ("conin.8" m2/s3)"
title.9 = "j) Corr Ver Flux Conv ("conin.9" m2/s3)"
title.10 = "k) Non-Stationary Forcing ("conin.10" m2/s3)"

vpage.0 = "0.0  4.4  7.4  11.0"
vpage.1 = "4.1  8.5  7.4  11.0"
vpage.2 = "0.0  4.4  4.0   7.6"
vpage.3 = "4.1  8.5  4.0   7.6"
vpage.4 = "0.0  4.4  0.6   4.2"
vpage.5 = "4.1  8.5  0.6   4.2"

"run disp_colours"
"set lev 1000 100"
"set y 1"
"set x 1"

# define the average values

a = 0
while (a < 12)
  b = tima
  while (b <= timb)
    "set t "b
    if (tag = "111111")
      "run gui_trackpos "tracklat" "tracklon
      cenlat = subwrd(result,3)
      cenlon = subwrd(result,4)
    endif
    "run gui_getimindex 2"
    timindex = result
    tmpvar = "maskout(aave("var.a",lon="cenlon+shiftlon-dellon",lon="cenlon+shiftlon+dellon","
    tmpvar = tmpvar               "lat="cenlat+shiftlat-dellat",lat="cenlat+shiftlat+dellat"),"
    tmpvar = tmpvar               "-abs(tindex.2(x=1,y=1)-"timindex"))"
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
  a = a + 1
endwhile

# plot the average values

a = 0
while (a < 6)
  "set vpage "vpage.a
  "set grads off"
  "set xaxis "xlabel
  "run disp_shaded_nozero "var.a"avg "conin.a
  if (a = 0)
    "d "var.11"avg - "var.11"avg ; -"var.11"avg"
  endif
  "draw title "title.a
  a = a + 1
endwhile

"set vpage off"
"set string 1 c"
"draw string 4.35 0.65 Corr Kinetic Energy Budget - Areal Averages"
"draw string 4.35 0.40 over a quasi-Lagrangian domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
"draw string 4.35 0.15 shifted by ("shiftlat","shiftlon")`3.`0 relative to ("tracklat","tracklon")"

"run gui_print plot."budget".horavg"
"clear"

while (a < 11)
  b = a - 6
  "set vpage "vpage.b
  "set grads off"
  "set xaxis "xlabel
  "run disp_shaded_nozero "var.a"avg "conin.a
  "draw title "title.a
  a = a + 1
endwhile

"set vpage off"
"set string 1 c"
"draw string 4.35 0.65 Corr Kinetic Energy Budget - Areal Averages"
"draw string 4.35 0.40 over a quasi-Lagrangian domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
"draw string 4.35 0.15 shifted by ("shiftlat","shiftlon")`3.`0 relative to ("tracklat","tracklon")"

"run gui_print plot."budget".horavg.second"
"quit"

# plot the average growth rates

conin.1 = 3e-6
conin.2 = 3e-6
conin.3 = 3e-6
conin.4 = 3e-6
conin.5 = 3e-6
conin.6 = 3e-6
conin.7 = 3e-6
conin.8 = 3e-6
conin.9 = 3e-6
conin.10 = 3e-6

title.1 = "a) Q-L 12-h Tendency ("conin.1" /s)"
title.2 = "b) Q-L Hor Flux Conv ("conin.2" /s)"
title.3 = "c) Generation ("conin.3" /s)"
title.4 = "d) Residual ("conin.4" /s)"
title.5 = "e) Vert Flux Conv ("conin.5" /s)"
title.6 = "f) Eddy Forcing ("conin.6" /s)"
title.7 = "g) Reynolds Stress ("conin.7" /s)"
title.8 = "i) Corr Hor Flux Conv ("conin.8" /s)"
title.9 = "j) Corr Ver Flux Conv ("conin.9" /s)"
title.10 = "k) Non-Stationary Forcing ("conin.10" /s)"

"clear"
a = 1
while (a < 6)
  "set vpage "vpage.a
  "set grads off"
  "set xaxis "xlabel
  "run disp_shaded_nozero "var.a"avg/"var.0"avg "conin.a
  "draw title "title.a
  a = a + 1
endwhile

"set vpage off"
"set string 1 c"
"draw string 4.35 0.65 Corr Kinetic Energy Budget - Areal Average Growth Rates"
"draw string 4.35 0.40 over a quasi-Lagrangian domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
"draw string 4.35 0.15 shifted by ("shiftlat","shiftlon")`3.`0 relative to ("tracklat","tracklon")"

"run gui_print plot."budget".horavg.growth"
"clear"

while (a < 11)
  b = a - 6
  "set vpage "vpage.b
  "set grads off"
  "set xaxis "xlabel
  "run disp_shaded_nozero "var.a"avg/"var.0"avg "conin.a
  "draw title "title.a
  a = a + 1
endwhile

"set vpage off"
"set string 1 c"
"draw string 4.35 0.65 Corr Kinetic Energy Budget - Areal Average Growth Rates"
"draw string 4.35 0.40 over a quasi-Lagrangian domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
"draw string 4.35 0.15 shifted by ("shiftlat","shiftlon")`3.`0 relative to ("tracklat","tracklon")"

"run gui_print plot."budget".horavg.growth.second"

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
