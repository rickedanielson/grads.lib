# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.quasi.geostrophic.gb decjan 40 140"
*
* where cmp86 is the file stem and 45 -65 is the stationary central
* position - RD October 2000.

function verint(arg)

budget = "basic.quasi.geostrophic"

"clear"
"run disp_colours"
"set grid off"
tag = subwrd(arg,1)
position = subwrd(arg,2)" "subwrd(arg,3)" "subwrd(arg,2)" "subwrd(arg,3)
shift = subwrd(arg,4)
dellat = subwrd(arg,5)
dellon = subwrd(arg,6)
domain = subwrd(arg,7)
if (shift = "")
  shift = 0
endif
if (dellat = "")
  dellat = 17.5
#  dellat = 90
endif
if (dellon = "")
  dellon = 60
#  dellon = 180
endif
#"set mproj scaled"

"sdfopen "tag".quasi.geostrophic.nc"
#"sdfopen "tag".nc"

#tima = 55 + shift
#timb = 75 + shift
tima = 1
timb = 9

var.0 = "(qvecon(lev=600)+qvecon(lev=500)+qvecon(lev=400)+qvecon(lev=300))/4*1e18"
var.1 = "slp"

conin.0 = 2
conin.1 = 8
cenval.0 = 0
cenval.1 = 940

title.0 = "600-hPa to 300-hPa Averaged Q-vector"
title.1 = "and Q-vector Convergence ("conin.0" /Pa/s3)"

vpage.1  = "0.0  4.4  0.1   2.1"
vpage.2  = "0.0  4.4  1.9   3.9"
vpage.3  = "0.0  4.4  3.7   5.7"
vpage.4  = "0.0  4.4  5.5   7.5"
vpage.5  = "0.0  4.4  7.3   9.3"
vpage.6  = "2.05 6.45 9.0  11.0"
vpage.7  = "4.1  8.5  7.3   9.3"
vpage.8  = "4.1  8.5  5.5   7.5"
vpage.9  = "4.1  8.5  3.7   5.7"
vpage.10 = "4.1  8.5  1.9   3.9"
vpage.11 = "4.1  8.5  0.1   2.1"

#  plot the time series

a = 0
while (a < 1)
  "clear"
#  b = tima         + 4
#  c = 1            + 2
#  while (b <= timb - 4)
  b = tima
#  c = 1
c = 2
  while (b <= timb)
    "set t "b
    "set vpage "vpage.c
#"set vpage off"
    "set grads off"
    "run gui_view_grid "dellat" "dellon" "position
    "set clab off"
    "run disp_shaded_nozero "var.0" "conin.0" "cenval.0
    "set clab off"
    "run disp_unshaded_nozero "var.0" "conin.0" "cenval.0
    "set clab on"
    "run disp_unshaded_nozero "var.0" "8*conin.0" "cenval.0

    "define avu = (qvecu(lev=600)+qvecu(lev=500)+qvecu(lev=400)+qvecu(lev=300))/4"
    "define avv = (qvecv(lev=600)+qvecv(lev=500)+qvecv(lev=400)+qvecv(lev=300))/4"
    if (b = 5)
      "run disp_vector_noskip avu avv 6e-10"
    else
      "run disp_vector_noskip_nolab avu avv 6e-10"
    endif

    "run gui_date"
    date = result
    "draw title "date
#b = timb
#b = b + 4
#    b = b + 2
b=b+1
    c = c + 1
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.55 "title.0
  "draw string 4.25 0.20 "title.1
  "set strsiz 0.1 0.1"
  "set string 1 l"
  "draw string 6.0 10.8 "tag
  "run gui_print plot."tag".basic.quasi.geostrophic"
  a = a + 1
endwhile

if (tag != "")
  "quit"
endif
