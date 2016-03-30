# This script is designed to perform areal averages of budget terms
* and produce a postscript plot of the terms and their corresponding
* growth rates.  It can be executed using a command like
*
*        grads -bpc "plot.budget.energy.conversion.eddy.volavg.12h 111111"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit.  If the tag is 111111,
* then the budget domain is assumed to be defined relative to a mobile
* location, otherwise it's assumed to be stationary with respect to the
* grid it's defined upon - RD January 2000.

function volavg(arg)

budget = "budget.energy.conversion.eddy"

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
dellon = 5
shiftlat = 0
shiftlon = -10
tracklat = "troplat.2"
tracklon = "troplon.2"

var.0 = "kinevint"
var.1 = "kgenvint"
var.2 = "ghfcvint"
var.3 = "gvfcvint"
var.4 = "barovint"
var.5 = "cresvint"
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
while (a < 6)
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
#    b = b + 2
  endwhile
  say "define "var.a"avg = "varall
      "define "var.a"avg = "varall

  "set t "tima
  say "d ave("var.a"avg,t="tima",t="timb")"
      "d ave("var.a"avg,t="tima",t="timb")"
  line = sublin(result,2)
  timavg.a = subwrd(line,4)
  say timavg.a
  a = a + 1
endwhile
"set t "tima" "timb

# plot kinetic energy

"set missconn on"
"set vpage 0 8.5 7.5 11"
"set grads off"
"set vrange 0e6 4e6"
"set cthick 10"
"set xaxis "xlabel
"d "var.0"avg"
#"d maskout("var.0"avg,abs("var.0"avg)-0.0000001)"

# plot the average values

"set vpage 0 8.5 3.9 8.0"
"set grads off"
"set vrange -30 30"
"set cthick 10"
"set xaxis "xlabel

a = 1
while (a < 6)
  "set ccolor 1"
  "set cmark "mrk.a
  "d "var.a"avg"
#  "d maskout("var.a"avg,abs("var.a"avg)-0.0000001)"
  a = a + 1
endwhile

# plot the growth rates

"set vpage 0 8.5 0.3 4.4"
"set grads off"
"set vrange -1e-5 1.5e-5"
"set cthick 10"
"set xaxis "xlabel

a = 1
while (a < 6)
  "set ccolor 1"
  "set cmark "mrk.a
  "d "var.a"avg/"var.0"avg"
#  "d maskout("var.a"avg/"var.0"avg,abs("var.a"avg/"var.0"avg)-0.0000001)"
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
"draw string 4.9 10.7 Areal Average Vertical Integral Eddy Kinetic Energy (J/m2)"
"draw string 4.9 7.6 Eddy Energy Conversion Budget (W/m2)"
"draw string 4.9 4.0 Growth Rates (/s)"
"draw string 4.9 0.45 Quasi-Lagrangian domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
"draw string 4.9 0.15 shifted by ("shiftlat","shiftlon")`3.`0 relative to ("tracklat","tracklon")"

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
