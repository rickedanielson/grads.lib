# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.basic.indv.case 778128"
*
* The budget domain is assumed to be defined relative to a mobile
* location (in terms of geography), although it is stationary with
* respect to the grid it's defined upon - RD January 2000, July 2001.

function verint(arg)

budget = "basic"

"clear"
"run disp_colours"
"set grid off"
tag = subwrd(arg,1)

"sdfopen "tag".nc"
"sdfopen "tag".track.nc"

"run gui_getdate "tag
onset = result
tima = onset - 10
timb = onset + 10
budgetpos = "45 280 45 280"

dellat = 17.5
dellon = 60
tracklat = "troplat.2"
tracklon = "troplon.2"

var.0 = "omega"
var.1 = "slp"

conin.0 = 0.15
conin.1 = 6

cenval.0 = 0.0
cenval.1 = 940

title.0 = "500-hPa Omega ("conin.0" Pa/s) and SLP ("conin.1" hPa)"

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

#  plot each time series

a = 0
while (a < 1)                                                      ;# for each budget term
  "clear"
  b = tima
  c = 1
  while (b <= timb)                                                ;# loop through the time series
    "set t "b
    "run gui_trackpos "tracklat" "tracklon                         ;# get the position of interest
    trackpos = result
    "set vpage "vpage.c
    "set grads off"
    "run gui_view_grid "dellat" "dellon" "trackpos
    "set clab off"
    "run disp_shaded_nozero "var.0"(lev=500) "conin.0" "cenval.0
    "set clab on"
    "run disp_unshaded_nozero "var.1"/100 "conin.1" "cenval.1
    "run gui_track_real troplat.2 troplon.2 1 "trackpos
    "run gui_trackpos manulat.2 manulon.2"
    position = result
    "run gui_track_real manulat.2 manulon.2 8 "position

    "run gui_date"
    date = result
    "draw title "date
    b = b + 2
    c = c + 1
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.15 "title.a
  "set strsiz 0.1 0.1"
  "set string 1 l"
  "draw string 6.0 10.8 "tag
  "run gui_print plot."tag"."budget
  a = a + 1
endwhile
"quit"
