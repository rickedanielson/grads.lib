# This script is designed to perform areal averages of budget terms
* and produce a postscript plot of the terms and their corresponding
* growth rates.  It can be executed using a command like
*
*        grads -bpc "plot.budget.moisture.volavg.comp"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit.  If the tag is 000000,
* then the budget domain is assumed to be defined relative to a mobile
* location, otherwise it's assumed to be stationary with respect to the
* grid it's defined upon - RD January 2000.

function volavg(arg)

"clear"
"sdfopen /home/rdanielson/work.pwtr/dj30d.budget.moisture.nc"
"sdfopen /home/rdanielson/work.pwtr/om30d.budget.moisture.nc"
"sdfopen /home/rdanielson/data/coads/seasonal.atmos/dj30d.heat.flux.nc"
"sdfopen /home/rdanielson/data/coads/seasonal.atmos/om30d.heat.flux.nc"

tima = 1
timb = 9
xlabel = "-48 48 12"
#xlabel = ""
dellat = 12.5
dellon = 15.0
shiftlat = 0
shiftlon = 0
cenlat = 37.5
cenlon = 155.0

var.0 = "shumvint"
var.1 = "shumvint.2"
var.2 = "shfcvint*86400"
var.3 = "shfcvint.2*86400"
var.4 = "sresvint*86400"
var.5 = "sresvint.2*86400"
var.6 = "lhtfl.3/2.5e6*86400"
var.7 = "lhtfl.4/2.5e6*86400"

varname.0 = "shum"
varname.1 = "shum2"
varname.2 = "shfc"
varname.3 = "shfc2"
varname.4 = "sres"
varname.5 = "sres2"
varname.6 = "lhtfl3"
varname.7 = "lhtfl4"

mrk.0 = 1
mrk.1 = 2
mrk.2 = 1
mrk.3 = 2
mrk.4 = 1
mrk.5 = 2
mrk.6 = 1
mrk.7 = 2

"set z 1"
"set y 1"
"set x 1"

# define the areal averages then the time averages

a = 0
while (a < 8)
  tmpvar = "aave("var.a",lon="cenlon+shiftlon-dellon",lon="cenlon+shiftlon+dellon","
  tmpvar = tmpvar       "lat="cenlat+shiftlat-dellat",lat="cenlat+shiftlat+dellat")"
  "set t "tima" "timb
  say "define varall = "tmpvar
      "define varall = "tmpvar
#  say "define "var.a"avg = tloop(varall(t-2)+2*varall(t-1)+2*varall+2*varall(t+1)+varall(t+2))/8"
#      "define "var.a"avg = tloop(varall(t-2)+2*varall(t-1)+2*varall+2*varall(t+1)+varall(t+2))/8"
  say "define "varname.a"avg = varall"
      "define "varname.a"avg = varall"

  "set t "tima
  say "d ave("varname.a"avg,t="tima",t="timb")"
      "d ave("varname.a"avg,t="tima",t="timb")"
  line = sublin(result,2)
  timavg.a = subwrd(line,4)
  say timavg.a
  a = a + 1
endwhile
"set t "tima" "timb

# plot precipitable water

"set missconn on"
"set vpage 0 4.4 6.5 10"
"set grads off"
"set grid off"
"set clopts 1 3 0.2"
"set xlopts 1 3 0.2"
"set ylopts 1 3 0.2"
"set vrange 12 24"
"set cthick 10"
"set xaxis "xlabel
"set cmark 0"
"set cstyle "mrk.0
"d "varname.0"avg"
"set cmark 0"
"set cstyle "mrk.1
"d "varname.1"avg"
"set line 1 3"
#"draw line 1.0 0.0 5.0 0.0"

# plot hfc

"set vpage 4.1 8.5 6.5 10"
"set grads off"
"set grid off"
"set clopts 1 3 0.2"
"set xlopts 1 3 0.2"
"set ylopts 1 3 0.2"
"set vrange -6 6"
"set cthick 10"
"set xaxis "xlabel
"set cmark 0"
"set cstyle "mrk.0
"d "varname.2"avg"
"set cmark 0"
"set cstyle "mrk.1
"d "varname.3"avg"

# plot residual

"set vpage 0 4.4 3.1 6.6"
"set grads off"
"set grid off"
"set clopts 1 3 0.2"
"set xlopts 1 3 0.2"
"set ylopts 1 3 0.2"
"set vrange -6 6"
"set cthick 10"
"set xaxis "xlabel
"set cmark 0"
"set cstyle "mrk.0
"d "varname.4"avg"
"set cmark 0"
"set cstyle "mrk.1
"d "varname.5"avg"

# plot evap

"set vpage 4.1 8.5 3.1 6.6"
"set grads off"
"set grid off"
"set clopts 1 3 0.2"
"set xlopts 1 3 0.2"
"set ylopts 1 3 0.2"
"set vrange 0 12"
"set cthick 10"
"set xaxis "xlabel
"set cmark 0"
"set cstyle "mrk.0
"d "varname.6"avg"
"set cmark 0"
"set cstyle "mrk.1
"d "varname.7"avg"

# plot the labels and time averages

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 l"
x = 0.2
x2 = 0.3
y = 7.5
dely = 0.45
mrksiz = 0.1
a = 5
while (a < 5)
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x2" "y" "varname.a
  y = y - dely/2.0
  "draw string "x2" "y" "substr(timavg.a,1,6)
  y = y - dely
  a = a + 1
endwhile

"set string 1 c"
"draw string 2.5  9.9 Precipitable Water (kg/m2)"
"draw string 6.6  9.9 Flux Convergence (mm/d)"
"draw string 2.5 6.4 Evap - Precip (mm/d)"
"draw string 6.6 6.4 NCEP Evap (mm/d)"
#"draw string 4.9 2.85 Quasi-Lagrangian domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
#"draw string 4.9 0.15 shifted by ("shiftlat","shiftlon")`3.`0 relative to ("cenlat","cenlon")`3.`0"
"draw string 4.9 10.6 Moisture Budgets for Midwinter (solid) and"
"draw string 4.9 10.3 Transition (dashed) Cyclone Groups"
"draw string 4.9 2.85 Budget Domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
"draw string 4.9 2.5 relative to ("cenlat","cenlon")`3.`0"
"set strsiz 0.1 0.1"
"set string 1 l"
#"draw string 6.0 10.9 "arg

"run gui_print plot."budget".volavg"
"quit"
