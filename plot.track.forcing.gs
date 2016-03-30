# This script is designed to plot the central pressure values
* for different simulations (in time)
*
*     grads -bpc "plot.track.forcing        dj30d        om30d"
*     grads -bpc "plot.track.forcing gd2000.dj30d gd2000.om30d"
*     grads -bpc "plot.track.forcing       atlmid       atltra"
*     grads -bpc "plot.track.forcing        dec          mar"
*
* where no data files are required - RD August 2002.
* %%BoundingBox: 
function compare(args)
stema  = subwrd(args,1)
stemb  = subwrd(args,2)

if (stema = "dj30d")
  title.1 = "Midwinter (13) - Transitional (12)"
  title.2 = "Midwinter (13)"
  title.3 = "Transitional (12)"
endif
if (stema = "gd2000.dj30d")
  title.1 = "Midwinter (11) - Transitional (11)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (11)"
endif
if (stema = "atlmid")
  title.1 = "Midwinter (12) - Transitional (16)"
  title.2 = "Midwinter (12)"
  title.3 = "Transitional (16)"
endif
if (stema = "dec")
  title.1 = "Midwinter (11) - Transitional (12)"
  title.2 = "Midwinter (11)"
  title.3 = "Transitional (12)"
endif

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .14"
"set xlopts 1 4 .14"
"set ylopts 1 4 .14"

vpage.1 = "0 8.5  7.5  10.5"
vpage.2 = "0 8.5  5.0   8.0"
vpage.3 = "0 8.5  2.5   5.5"
vpage.4 = "0 8.5  0.0   3.0"

label.1 = "Midwinter"
label.2 = "Transitional"
label.3 = "Significance"

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4

"sdfopen "stema"-"stemb".track.nc"
"sdfopen "stema".track.nc"
"sdfopen "stemb".track.nc"

var.1 = "manugrv.2*1e2"
var.2 = "manugrv.3*1e2"
var.3 = "manusgr24-60"

"set missconn on"
"set vpage "vpage.1
"set grads off"
"set vrange -50 -5"
"set ylint 5"
"set t 3 7"
"set digsiz 0.1"
"set xlab off"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)
    "set cstyle 1"
  else
    "set cstyle 1"
  endif
  "d var"
  a = a + 1
endwhile
"draw title Vertical Velocity"

var.1 = "tracklat.2*1e18"
var.2 = "tracklat.3*1e18"
var.3 = "tracknum-10"

"set missconn on"
"set vpage "vpage.2
"set grads off"
"set vrange 0 10"
"set ylint 2"
"set digsiz 0.1"
"set xlab off"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)
    "set cstyle 1"
  else
    "set cstyle 1"
  endif
  "d var"
  a = a + 1
endwhile
"draw title Q-Vector Forcing"

var.1 = "gridlat.2*1e6"
var.2 = "gridlat.3*1e6"
var.3 = "gridnum"

"set missconn on"
"set vpage "vpage.3
"set grads off"
"set vrange 1 2"
"set ylint 0.2"
"set digsiz 0.1"
"set xlab off"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  if (a = 3)
    "set cstyle 1"
  else
    "set cstyle 1"
  endif
  "d var"
  a = a + 1
endwhile
"draw title Static Stability"

var.1 = "troplat.2"
var.2 = "troplat.3"
var.3 = "tropnum"

"set missconn on"
"set vpage "vpage.4
"set grads off"
"set vrange 5 30"
"set ylint 5"
"set digsiz 0.1"
"set xlab on"

a = 1
while (a < 4)
  "set ccolor 1"
  "define var = "var.a
  "set cmark "mrk.a
  "d var"
  a = a + 1
endwhile
"draw title Precipitable Water"

"set vpage off"
"set strsiz 0.15 0.15"
"set string 1 l"
x = 4.2
x2 = 4.4
y = 9.6
dely = 0.25
mrksiz = 0.1
a = 1
while (a < 3)
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x2" "y" "label.a
  y = y - dely/2.0
#  "draw string "x2" "y" "substr(timavg.a,1,6)
  y = y - dely
  a = a + 1
endwhile

"set string 1 c"
"set strsiz 0.15"
"draw string 4.9 10.5 "stema"-"stemb
#"draw string 1.1 1.3 Central Pressure (hPa)"
##"draw string 1.1 1.7 Col Distance (km)"
#"draw string 1.1 6.2 Circulation (1e6 m2/s)"

#"set string 1 l 10 0"
#"set strsiz 0.3"
#"draw string 7.6 6.1 a"
#"draw string 7.6 1.6 b"

"run gui_print plot.track.forcing."stema"-"stemb
"quit"
