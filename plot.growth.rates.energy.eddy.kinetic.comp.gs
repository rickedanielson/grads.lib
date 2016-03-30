# This script is designed to perform areal averages of masked budget terms
* and produce a postscript plot of the terms and their corresponding
* growth rates.  It can be executed using a command like
*
*        ncks -a -d time,0,32,2 111111.growth.rates.energy.eddy.nc 111111.growth.rates.energy.eddy.nc.12hourly
*        grads -bpc "plot.growth.rates.energy.eddy.kinetic.comp 111111"
*
* (note that more than one term may be included with the residual) - RD July 2001.

function volavg(arg)

budget = "growth.rates.energy.eddy"

"clear"
tag = subwrd(arg,1)
"sdfopen "tag"."budget".nc.12hourly"

"q file"                                                           ;# get the first and last time
ret = sublin(result,5)                                             ;# and the T0 time
tima = 1
timb = subwrd(ret,12)
"run gui_getdate_grads "tag
timc = subwrd(result,2)

var.1 = "ktend"
var.2 = "khfc"
var.3 = "kgen"
var.4 = "krey"
var.5 = "kefo"
var.6 = "kres"
var.7 = "kvfc"
var.8 = "knst"
cutoffnum = 16
maxnum = 41

domname.1 = "Western"
domname.2 = "Upstream"
domname.3 = "Downstream"
domname.4 = "Eastern"
dom.1 = "a"
dom.2 = "b"
dom.3 = "c"
dom.4 = "d"

vpage.0  = "0.0  8.5  8.0  11.0"
vpage.1  = "0.0  8.5  6.0   9.0"
vpage.2  = "0.0  8.5  4.0   7.0"
vpage.3  = "0.0  8.5  2.0   5.0"
vpage.4  = "0.0  8.5  0.0   3.0"

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
mrk.4 = 5
mrk.5 = 7
mrk.6 = 8
mrk.7 = 6

scale = 1e18
x = 0.075
dely = 0.3
mrksiz = 0.1
top = 14
bottom = 0

"set strsiz 0.15 0.15"
"set t "tima" "timb
"set z 1"
"set y 1"
"set x 1"

"set vpage "vpage.0                                                ;# draw kinetic energy as scaled
"set grads off"                                                    ;# integrals
"set vrange "bottom" "top
"set cthick 7"
a = 1
while (a < 4)
  var = "maskout(kine"dom.a",num"dom.a"-"cutoffnum")"
  "set ccolor 1"
  "set cmark "mrk.a
  "d "var" / "scale
  a = a + 1
endwhile

"q w2xy "timc" "bottom                                             ;# draw a line indicating T0
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy "timc" "top
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw line "xbef" "ybef" "xaft" "yaft

"set vpage off"                                                    ;# draw labels
y = subwrd(vpage.0,4) - 0.6
"set string 1 c"
"draw string 4.9 "y" Eddy Kinetic Energy ("scale" J)"
"set string 1 l"
a = 1
while (a < 4)
  y = y - dely
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x+0.1" "y" "domname.a
  a = a + 1
endwhile

top = 42
bottom = 0

"set vpage "vpage.4                                                ;# draw the number of cases
"set grads off"
"set vrange "bottom" "top
"set cthick 7"
a = 1
while (a < 4)
  var = "num"dom.a
  "set ccolor 1"
  "set cmark "mrk.a
  "d "var
  a = a + 1
endwhile

"q w2xy "timc" "bottom                                             ;# draw a line indicating T0
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy "timc" "top
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw line "xbef" "ybef" "xaft" "yaft

"set vpage off"                                                    ;# draw labels
y = subwrd(vpage.4,4) - 0.6
"set string 1 c"
"draw string 4.9 "y" Number of Cases"
"set string 1 l"
a = 1
while (a < 4)
  y = y - dely
  "draw mark "mrk.a" "x" "y" "mrksiz
  "draw string "x+0.1" "y" "domname.a
  a = a + 1
endwhile

top = 2.0
bottom = -1.5

a = 1                                                              ;# draw budget terms as growth rates
while (a < 4)
  "set vpage "vpage.a
  "set grads off"
  "set vrange "bottom" "top
  "set cthick 10"
  b = 1
  while (b < 7)
    if (b = 6)                                                     ;# include other terms in residual
      var = "maskout("var.b""dom.a" + kvfc"dom.a" + knst"dom.a",num"dom.a"-"cutoffnum")"
    else
      var = "maskout("var.b""dom.a",num"dom.a"-"cutoffnum")"
    endif
    "set ccolor 1"
    "set cmark "mrk.b
    "d "var

    "set t "tima                                                   ;# calculate time averages
    say "d ave("var", t="tima", t="timb")"
        "d ave("var", t="tima", t="timb")"
    line = sublin(result,2)
    timavg.b = subwrd(line,4)
    say timavg.b
    if (timavg.b < 0)
      timavg.b = -1 * timavg.b
      sign.b = "-"
    else
      sign.b = " "
    endif
    "set t "tima" "timb
    b = b + 1
  endwhile

  "q w2xy "timc" "bottom                                           ;# draw a line indicating T0
  xbef = subwrd(result,3)
  ybef = subwrd(result,6)
  "q w2xy "timc" "top
  xaft = subwrd(result,3)
  yaft = subwrd(result,6)
  "draw line "xbef" "ybef" "xaft" "yaft

  "set vpage off"                                                  ;# plot labels and time averages
  y = subwrd(vpage.a,4) - 0.6
  "set string 1 c"
  "draw string 4.9 "y" "domname.a" Growth Rates (/day)"
  "set string 1 l"
  b = 1
  while (b < 7)
    y = y - dely
    "draw mark "mrk.b" "x" "y" "mrksiz
    "draw string "x+0.1" "y" "var.b
    if (sign.b = "-")
      "draw string "x+0.65" "y" "sign.b
    endif
    "draw string "x+0.85" "y" "substr(timavg.b,1,4)
    b = b + 1
  endwhile
  a = a + 1
endwhile

"set string 1 c"
"draw string 4.25 10.8 Average Eddy Kinetic Energy"
"draw string 4.25 0.32 Notes: residual term (kres) includes kvfc and knst terms and"
"draw string 4.25 0.13 averages employ a minimum of "cutoffnum" of "maxnum" available cases"

"run gui_print plot."tag"."budget".kinetic.volavg"
"quit"
