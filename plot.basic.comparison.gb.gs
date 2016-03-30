# This script is designed to plot the time series of difference terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.comparison.gb mmout_balcont2 mmout_balpert7 45 170 0 25 80"
*
* where mmout_balcont and mmout_balpert7 are file stems and 45 170 is a
* stationary central position - RD August 2001.

function verint(arg)

"clear"
"run disp_colours"
"set grid off"
taga = subwrd(arg,1)
tagb = subwrd(arg,2)
position = subwrd(arg,3)" "subwrd(arg,4)" "subwrd(arg,3)" "subwrd(arg,4)
shift = subwrd(arg,5)
dellat = subwrd(arg,6)
dellon = subwrd(arg,7)
domain = subwrd(arg,8)
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

"sdfopen "taga".nc"
"sdfopen "tagb".nc"

tima = 55 + shift
timb = 75 + shift

var = "hgt"
lev = "500"
conin.0 = 25
conin.1 = 100

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
  "set lev "lev
  b = tima
  c = 1
  while (b <= timb)
    "set t "b
    "set vpage "vpage.c
    "set grads off"
    "run gui_view_grid "dellat" "dellon" "position
#    "run disp_shaded_nozero "var".1-"var".2 "conin.0
#    "set cint "conin.1
#    "d "var
    "run disp_shaded_nozero hgt(lev=500)-hgt(lev=1000)-hgt.2(lev=500)+hgt.2(lev=1000) 25"
    "set cint 100"
    "d hgt(lev=500)-hgt(lev=1000)"
    if (domain != "")
      "set clevs 0.5"
      "set cthick 8"
      "set clab off"
      "d domain"
    endif
    "run gui_date"
    date = result
    "draw title "date
    b = b + 2
    c = c + 1
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.15 1000-500-hPa Thickness Differences (shaded at "conin.0" m)"
  "set strsiz 0.1 0.1"
  "set string 1 l"
  "draw string 6.0 10.8 "taga
  "draw string 6.0 10.5 "tagb
  "run gui_print plot."taga"."tagb".comparison"
  a = a + 1
endwhile
"quit"
