# This script is designed to perform areal averages of budget terms
* and produce a postscript plot of the terms and their corresponding
* growth rates.  It can be executed using a command like
*
*     grads -bpc "plot.budget.temperature.horavg.gb compare_1986 45 -65"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit.  If the tag is 111111,
* then the budget domain is assumed to be defined relative to a mobile
* location, otherwise it's assumed to be stationary with respect to the
* grid it's defined upon - RD January 2000.

function horavg(arg)

budget = "budget.temperature"

"clear"
tag = subwrd(arg,1)
"sdfopen "tag"."budget".nc"
cenlat = subwrd(arg,2)
cenlon = subwrd(arg,3)
shift =  subwrd(arg,4)
if (shift = "")
  shift = 0
endif

"sdfopen "tag"."budget".nc"

tima = 21 + shift
timb = 41 + shift
dellat = 50
dellon = 75
shiftlat = 0
shiftlon = 0
tracklat = "troplat.2"
tracklon = "troplon.2"

var.0 = "temp"
var.1 = "ttend"
var.2 = "thfc"
var.3 = "tvfc"
var.4 = "tadi"
var.5 = "tres"
var.6 = "wtemp"
var.7 = "sfcpres/100-lev"
varnames()
van.0 = "temp"
van.1 = "ttend"
van.2 = "thfc"
van.3 = "tvfc"
van.4 = "tadi"
van.5 = "tres"
van.6 = "wtemp"
van.7 = "mask"

conin.0 = 25
conin.1 = 0.00002
conin.2 = 0.0002
conin.3 = 0.0002
conin.4 = 0.00005
conin.5 = 0.0002
conin.7 = 5

title.0 = "Vertical Temperature Flux (K Pa/s)"
title.1 = "12-h Tendency ("conin.1" K/s)"
title.2 = "Hor Flux Conv ("conin.2" K/s)"
title.3 = "Vert Flux Conv ("conin.3" K/s)"
title.4 = "Adiabatic Pressure Work ("conin.4" K/s)"
title.5 = "Temperature Residual ("conin.5" K/s)"

vpage.0 = "0.0  4.4  7.4  11.0"
vpage.1 = "4.1  8.5  7.4  11.0"
vpage.2 = "0.0  4.4  4.0   7.6"
vpage.3 = "4.1  8.5  4.0   7.6"
vpage.4 = "0.0  4.4  0.6   4.2"
vpage.5 = "4.1  8.5  0.6   4.2"

"run disp_colours"
"set lev 1050 150"
"set y 1"
"set x 1"

# define the average values

a = 0
while (a < 8)
  tmpvar = "aave(maskout("var.a",domain-0.5),lon="cenlon+shiftlon-dellon",lon="cenlon+shiftlon+dellon","
  tmpvar = tmpvar                           "lat="cenlat+shiftlat-dellat",lat="cenlat+shiftlat+dellat")"
  "set t "tima" "timb
  say "define varall = "tmpvar
      "define varall = "tmpvar
  say "define "van.a"avg = tloop(varall(t-2)+2*varall(t-1)+4*varall+2*varall(t+1)+varall(t+2))/10"
      "define "van.a"avg = tloop(varall(t-2)+2*varall(t-1)+4*varall+2*varall(t+1)+varall(t+2))/10"
#  say "define "van.a"avg = varall"
#      "define "van.a"avg = varall"
  a = a + 1
endwhile
"set t "tima+2" "timb-2

# plot the average values

a = 0
while (a < 6)
  "set vpage "vpage.a
  "set grads off"
  if (a = 0)
    "d "van.6"avg - "van.6"avg ; -"van.6"avg"
  else
    "run disp_shaded_nozero "van.a"avg "conin.a
  endif
  "run disp_shaded_mask "van.7"avg "conin.7
  "draw title "title.a
  a = a + 1
endwhile

"set vpage off"
"set string 1 c"
"draw string 4.35 0.65 Temperature Budget - Areal Averages"
"draw string 4.35 0.40 over a domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
"draw string 4.35 0.15 shifted by ("shiftlat","shiftlon")`3.`0 relative to ("cenlat","cenlon")"

"run gui_print plot."budget".horavg"
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
