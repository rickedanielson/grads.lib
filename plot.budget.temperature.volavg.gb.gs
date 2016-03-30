# This script is designed to perform areal averages of budget terms
* and produce a postscript plot of the terms and their corresponding
* growth rates.  It can be executed using a command like
*
*        grads -bpc "plot.budget.temperature.volavg.gb 000000"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit.  If the tag is 000000,
* then the budget domain is assumed to be defined relative to a mobile
* location, otherwise it's assumed to be stationary with respect to the
* grid it's defined upon - RD January 2000.

function volavg(arg)

budget = "budget.energy.conversion"

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

tima = 21 + shift
timb = 41 + shift
dellat = 50
dellon = 75
shiftlat = 0
shiftlon = 0

var.0 = "tempvint"
var.1 = "ttendvint"
var.2 = "thfcvint"
var.3 = "tvfcvint"
var.4 = "tadivint"
var.5 = "tresvint"
var.6 = "sfcpres"
varnames()

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
mrk.4 = 5
mrk.5 = 7

"set z 1"
"set y 1"
"set x 1"

# define the areal averages then the time averages

a = 0
while (a < 7)
  tmpvar = "aave(maskout("var.a",domain-0.5),lon="cenlon+shiftlon-dellon",lon="cenlon+shiftlon+dellon","
  tmpvar = tmpvar                           "lat="cenlat+shiftlat-dellat",lat="cenlat+shiftlat+dellat")"
  "set t "tima" "timb
  say "define varall = "tmpvar
      "define varall = "tmpvar
  say "define "var.a"avg = tloop(varall(t-2)+2*varall(t-1)+4*varall+2*varall(t+1)+varall(t+2))/10"
      "define "var.a"avg = tloop(varall(t-2)+2*varall(t-1)+4*varall+2*varall(t+1)+varall(t+2))/10"

  "set t "tima
  say "d ave("var.a"avg,t="tima",t="timb")"
      "d ave("var.a"avg,t="tima",t="timb")"
  line = sublin(result,2)
  timavg.a = subwrd(line,4)
  say timavg.a
  a = a + 1
endwhile
"set t "tima+2" "timb-2

# plot kinetic energy

"set missconn on"
"set vpage 0 8.5 7.5 11"
"set grads off"
"set vrange 241 244"
"set cthick 10"
"d 9.8*"var.0"avg/("var.6"avg-10000)"

# plot the average values

"set vpage 0 8.5 3.9 8.0"
"set grads off"
"set vrange -2e-4 2e-4"
"set cthick 10"

a = 1
while (a < 6)
  "set ccolor 1"
  "set cmark "mrk.a
  "d 9.8*"var.a"avg/("var.6"avg-10000)"
  a = a + 1
endwhile

# plot the growth rates

"set vpage 0 8.5 0.3 4.4"
"set grads off"
"set vrange -1e-6 1e-6"
"set cthick 10"

a = 1
while (a < 6)
  "set ccolor 1"
  "set cmark "mrk.a
  "d "var.a"avg/"var.0"avg"
  a = a + 1
endwhile

# plot the labels and time averages

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 l"
x = 0.2
x2 = 0.3
y = 7.5
dely = 0.45
mrksiz = 0.1
a = 1
while (a < 6)
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x2" "y" "var.a
  y = y - dely/2.0
  "draw string "x2" "y" "substr(timavg.a,1,6)
  y = y - dely
  a = a + 1
endwhile

"set string 1 c"
"draw string 4.9 10.7 Domain Average Temperature (K)"
"draw string 4.9 7.6 Temperature Budget (K/s)"
"draw string 4.9 4.0 Growth Rates (/s)"
"draw string 4.9 0.45 using a quasi-Lagrangian domain"

"run gui_print plot."budget".volavg"
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
