# This script is designed to plot the time series of budget terms.  It
* can be executed using a command like
*
*     grads -bpc "plot.budget.energy.total.eddy.verint.indv.case mmout_balcont3"
*
* The budget domain is assumed to be defined relative to a mobile
* location (in terms of geography), although it is stationary with
* respect to the grid it's defined upon - RD January 2000, July 2001.

function verint(arg)

budget = "budget.energy.total.eddy"

"clear"
"run disp_colours"
"set grid off"
tag = subwrd(arg,1)

"sdfopen "tag"."budget".nc"
"sdfopen "tag".track.nc"
"sdfopen "tag".nc"
"sdfopen "tag".energy.mask.nc"

#"run gui_getdate "tag
#onset = result
onset = 11
tima = onset - 10
timb = onset + 10
budgetpos = "45 280 45 280"

#dellat = 17.5
#dellon = 60
dellat = "25 75"
dellon = "100 260"
tracklat = "troplat.2"
tracklon = "troplon.2"

var.0 = "kinevint"
var.1 = "kgenvint"
var.2 = "ghfcvint"
var.3 = "barovint"
var.4 = "cresvint"
var.5 = "gvfcvint"
vecvar = "ukinevint vkinevint 2e8"

conin.0 = 2e6
conin.1 = 40
conin.2 = 40
conin.3 = 40
conin.4 = 40
conin.5 = 20

title.0 = "Eddy Energy ("conin.0" J/m2) and Flux (J/m/s)"
title.1 = "Eddy Generation ("conin.1" W/m2)"
title.2 = "Eddy Geopot Hor Flux Conv ("conin.2" W/m2)"
title.3 = "Eddy PE Conversion ("conin.3" W/m2)"
title.4 = "Eddy Conversion Residual ("conin.4" W/m2)"
title.5 = "Eddy Geopot Vert Flux Conv ("conin.5" W/m2)"

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
#    "run gui_trackpos 2 "tracklat" "tracklon                       ;# get the position of interest
#    trackpos = result
    "set lat "dellat
    "set lon "dellon
    "set vpage "vpage.c
    "set grads off"
    "set mpdraw off"                                               ;# plot the variables of interest
    "set xlab off"                                                 ;# but without the background map
    "set ylab off"
    "set clab on"
#    "run gui_view_grid "dellat" "dellon" "budgetpos
    "run disp_shaded_nozero "var.a" "conin.a
    if (a = 0 | a = 2)
      if (c = 6)
        "run disp_vector "vecvar
      else
        "run disp_vector_nolab "vecvar
      endif
    endif
    "set cthick 10"
    "run disp_masks_one mask.4 kinevint 1750001"
    "set cthick 4"

    "clear events"                                                 ;# plot background data and the map
    "set grads off"
    "set mpdraw on"
    "set xlab on"
    "set ylab on"
    "set clab off"
#    "run gui_view_grid "dellat" "dellon" "trackpos
    "set lat "dellat
    "set lon "dellon
    "run disp_unshaded_nozero hgt.3(lev=500) 200 4100"
#    "run gui_track_real troplat.2 troplon.2 1 "trackpos
#    "run gui_track_simple 2 manulat.2 manulon.2 1 0.05 0.25"

    "run gui_date"
    date = result
    "draw title "date
    b = b + 2
    c = c + 1
  endwhile
  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  "draw string 4.25 0.15 Vint Sfc-100hPa "title.a
  "set strsiz 0.1 0.1"
  "set string 1 l"
  "draw string 6.0 10.8 "tag
  "run gui_print plot."tag"."budget".verint."var.a
  a = a + 1
endwhile
"quit"
