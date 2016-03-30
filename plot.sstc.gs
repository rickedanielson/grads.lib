# This script is designed to plot the central pressure values
* for different simulations (in time)
*
*     grads -blc "plot.sstc"
*
* where no data files are required - RD August 2002.
* %%BoundingBox: 130 438 575 756
function compare(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .16"
"set xlopts 1 4 .16"
"set ylopts 1 4 .16"

var.1 = "tracklat"
var.2 = "tracklon"
var.3 = "tracknum"
var.4 = "gridslp.4"
var.5 = "manuslp"

label.1 = "No Advance"
label.2 = "6-h Advance"
label.3 = "12-h Advance"
label.4 = "Half PV Addition"
label.5 = "Manual"

mrk.1 = 2
mrk.2 = 3
mrk.3 = 4
mrk.4 = 5
mrk.5 = 7

"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont4.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont10.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont6.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont11.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont7.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont12.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont8.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont13.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont5.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont14.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont9.track.nc"

"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert4.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert10.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert6.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert11.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert7.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert12.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert8.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert13.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert5.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert14.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert9.track.nc"

vpage.1  = "0 11 7.8 8.5"
vpage.2  = "0 11 7.1 7.8"
vpage.3  = "0 11 6.4 7.1"
vpage.4  = "0 11 5.7 6.4"
vpage.5  = "0 11 5.0 5.7"
vpage.6  = "0 11 4.3 5.0"
vpage.7  = "0 11 3.6 4.3"
vpage.8  = "0 11 2.9 3.6"
vpage.9  = "0 11 2.2 2.9"
vpage.10 = "0 11 1.5 2.2"
vpage.11 = "0 11 0.8 1.5"

a = 1
while (a < 2)
  b = a + 11
#  "set parea "vpage.a
  "set grads off"
  "set ylint 1"
  "set dfile 11"
  "set t 1 61"
  "set digsiz 0.1"
  "set vrange 9.7 15.3"
#  "set ylab off"

  "define a"a" = cycaslp."a
  "define a"b" = cycaslp."b
  "set datawarn off"
  "set cthick 10"
  "set ccolor 1"
#  "d a"a"-a"b
  "d a"a"-a"a"-10"

  "define b"a" = cycbslp."a
  "define b"b" = cycbslp."b
  "set datawarn off"
  "set cthick 10"
  "set ccolor 1"
#  "d b"a"-b"b
  "d b"a"-b"a"-10"

  "define c"a" = cyccslp."a
  "define c"b" = cyccslp."b
  "set datawarn off"
  "set cthick 10"
  "set ccolor 1"
#  "d c"a"-c"b
  "d c"a"-c"a"-10"

  "define d"a" = cycdslp."a
  "define d"b" = cycdslp."b
  "set datawarn off"
  "set cthick 10"
  "set ccolor 1"
#  "d d"a"-d"b
  "d d"a"-d"a"-10"

  a = a + 1
endwhile

"set grads off"
"set ylint 2"
"set dfile 11"
"set t 1 61"
"set digsiz 0.1"
"set vrange -10 10"
"set datawarn off"
"set cthick 30"
"set ccolor 2"
"set cmark 0"

#"define asum = const(a1-a12,0,-u)+const(a2-a13,0,-u)+const(a3-a14,0,-u)+const(a4-a15,0,-u)+const(a5-a16,0,-u)+const(a6-a17,0,-u)+const(a7-a18,0,-u)+const(a8-a19,0,-u)+const(a9-a20,0,-u)+const(a10-a21,0,-u)+const(a11-a22,0,-u)"
#"define anum = const(1+a1-a1,0,-u)+const(1+a2-a2,0,-u)+const(1+a3-a3,0,-u)+const(1+a4-a4,0,-u)+const(1+a5-a5,0,-u)+const(1+a6-a6,0,-u)+const(1+a7-a7,0,-u)+const(1+a8-a8,0,-u)+const(1+a9-a9,0,-u)+const(1+a10-a10,0,-u)+const(1+a11-a11,0,-u)"

#"define bsum = const(b1-b12,0,-u)+const(b2-b13,0,-u)+const(b3-b14,0,-u)+const(b4-b15,0,-u)+const(b5-b16,0,-u)+const(b6-b17,0,-u)+const(b7-b18,0,-u)+const(b8-b19,0,-u)+const(b9-b20,0,-u)+const(b10-b21,0,-u)+const(b11-b22,0,-u)"
#"define bnum = const(1+b1-b1,0,-u)+const(1+b2-b2,0,-u)+const(1+b3-b3,0,-u)+const(1+b4-b4,0,-u)+const(1+b5-b5,0,-u)+const(1+b6-b6,0,-u)+const(1+b7-b7,0,-u)+const(1+b8-b8,0,-u)+const(1+b9-b9,0,-u)+const(1+b10-b10,0,-u)+const(1+b11-b11,0,-u)"

#"define csum = const(c1-c12,0,-u)+const(c2-c13,0,-u)+const(c3-c14,0,-u)+const(c4-c15,0,-u)+const(c5-c16,0,-u)+const(c6-c17,0,-u)+const(c7-c18,0,-u)+const(c8-c19,0,-u)+const(c9-c20,0,-u)+const(c10-c21,0,-u)+const(c11-c22,0,-u)"
#"define cnum = const(1+c1-c1,0,-u)+const(1+c2-c2,0,-u)+const(1+c3-c3,0,-u)+const(1+c4-c4,0,-u)+const(1+c5-c5,0,-u)+const(1+c6-c6,0,-u)+const(1+c7-c7,0,-u)+const(1+c8-c8,0,-u)+const(1+c9-c9,0,-u)+const(1+c10-c10,0,-u)+const(1+c11-c11,0,-u)"

#"define dsum = const(d1-d12,0,-u)+const(d2-d13,0,-u)+const(d3-d14,0,-u)+const(d4-d15,0,-u)+const(d5-d16,0,-u)+const(d6-d17,0,-u)+const(d7-d18,0,-u)+const(d8-d19,0,-u)+const(d9-d20,0,-u)+const(d10-d21,0,-u)+const(d11-d22,0,-u)"
#"define dnum = const(1+d1-d1,0,-u)+const(1+d2-d2,0,-u)+const(1+d3-d3,0,-u)+const(1+d4-d4,0,-u)+const(1+d5-d5,0,-u)+const(1+d6-d6,0,-u)+const(1+d7-d7,0,-u)+const(1+d8-d8,0,-u)+const(1+d9-d9,0,-u)+const(1+d10-d10,0,-u)+const(1+d11-d11,0,-u)"
#"d (asum+bsum+csum+dsum)/(anum+bnum+cnum+dnum)"

"q w2xy 12Z27FEB1985 14.8"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 15.2"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 00Z28FEB1985 14.3"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 14.7"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 12Z28FEB1985 13.8"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 14.2"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 00Z01MAR1985 13.3"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 13.7"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 12Z01MAR1985 12.8"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 13.2"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 00Z02MAR1985 12.3"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 12.7"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 12Z02MAR1985 11.8"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 12.2"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 00Z03MAR1985 11.3"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 11.7"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 12Z03MAR1985 10.8"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 11.2"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 00Z04MAR1985 10.3"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 10.7"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"q w2xy 12Z04MAR1985  9.8"
xbef = subwrd(result,3)
ybef = subwrd(result,6)
"q w2xy 12Z14MAR1985 10.2"
xaft = subwrd(result,3)
yaft = subwrd(result,6)
"draw recf "xbef" "ybef" "xaft" "yaft

"set string 1 c"
"set strsiz 0.22 0.22"
"draw string 6.3 8.15 Ensemble Integrations"
"printim plot.sstc.gif gif x1200 y900"
#"run gui_print plot.ssta"
"quit"
