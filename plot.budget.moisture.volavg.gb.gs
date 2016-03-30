# This script is designed to perform areal averages of budget terms
* and produce a postscript plot of the terms and their corresponding
* growth rates.  It can be executed using a command like
*
*        grads -bpc "plot.budget.moisture.volavg.gb decjan.budget.moisture.nc"
*
* If no argument (tag) is specified, the data files are assumed to be
* open and the script will not automatically exit.  If the tag is 000000,
* then the budget domain is assumed to be defined relative to a mobile
* location, otherwise it's assumed to be stationary with respect to the
* grid it's defined upon - RD January 2000.

function volavg(arg)

budget = "budget.moisture"

"clear"
"sdfopen "arg

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
var.1 = "stendvint*86400"
var.2 = "shfcvint*86400"
var.3 = "svfcvint*86400"
var.4 = "sresvint*86400"

varname.0 = "shumvint"
varname.1 = "stendvint"
varname.2 = "shfcvint"
varname.3 = "svfcvint"
varname.4 = "sresvint"

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
mrk.4 = 5

"set z 1"
"set y 1"
"set x 1"

# define the areal averages then the time averages

a = 0
while (a < 5)
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
"set vpage 0 8.5 7.5 11"
"set grads off"
"set vrange 12 22"
"set cthick 10"
"set xaxis "xlabel
"d "varname.0"avg"

# plot the average values

"set vpage 0 8.5 3.9 8.0"
"set grads off"
"set vrange -6 6"
"set cthick 10"
"set xaxis "xlabel

a = 1
while (a < 5)
  "set ccolor 1"
  "set cmark "mrk.a
  "d "varname.a"avg"
  a = a + 1
endwhile

# plot the growth rates

"set vpage 0 8.5 0.3 4.4"
"set grads off"
"set vrange -6e-6 6e-6"
"set cthick 10"
"set xaxis "xlabel

a = 1
while (a < 5)
  "set ccolor 1"
  "set cmark "mrk.a
  "d "varname.a"avg/86400/"varname.0"avg"
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
while (a < 5)
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x2" "y" "varname.a
  y = y - dely/2.0
  "draw string "x2" "y" "substr(timavg.a,1,6)
  y = y - dely
  a = a + 1
endwhile

"set string 1 c"
"draw string 4.9 10.6 Precipitable Water (kg/m2)"
"draw string 4.9 7.6 Moisture Budget (mm/d)"
"draw string 4.9 4.0 Growth Rates (/s)"
"draw string 4.9 0.45 Quasi-Lagrangian domain of ("2*dellat","2*dellon")`3.`0 in (lat,lon)"
"draw string 4.9 0.15 shifted by ("shiftlat","shiftlon")`3.`0 relative to ("cenlat","cenlon")`3.`0"
"set strsiz 0.1 0.1"
"set string 1 l"
"draw string 6.0 10.9 "arg

"run gui_print plot."budget".volavg"
"quit"
