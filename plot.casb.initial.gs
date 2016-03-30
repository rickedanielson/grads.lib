# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casb.initial"
*
* %%BoundingBox: 27 465 574 756
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .19"
"set xlopts 1 4 .17"
"set ylopts 1 4 .16"

dotsize = 0.0
bigdot = 0.22
RADIN  =   750                                          ;* radius of anomaly removal inner domain (km)
RADOUT =   1500                                         ;* radius of anomaly removal outer domain (km)
NEGLAT =   56.0                                         ;* central latitude  of the negative anomaly removal domain
NEGLON =   91.0                                         ;* central longitude of the negative anomaly removal domain
POSLAT =   50.0                                         ;* central latitude  of the positive anomaly removal domain
POSLON =   115.0

"sdfopen /home/rdanielson/model/out/runs/mmout_balpert9.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balpert9.budget.energy.conversion.eddy.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balpert9.quasi.geost.wave.activity.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balpert9.track.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balpert9.track.west.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.budget.energy.conversion.eddy.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.quasi.geost.wave.activity.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.track.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.track.west.nc"
"set lat 25 75"
"set lon 55 185"
"set t 5"

basevar.1 = "kinevint.2 1e6"
basevar.2 = "wavevavg.3 30"
basevar.3 = "kinevint.7 1e6"
basevar.4 = "wavevavg.8 30"
fluxvar.1 = "uagfvint.2 vagfvint.2 2e8"
fluxvar.2 = "uwavevavg.3 vwavevavg.3 2000"
fluxvar.3 = "uagfvint.7 vagfvint.7 2e8"
fluxvar.4 = "uwavevavg.8 vwavevavg.8 2000"

vpage.1  = "0.0  4.3  8.4  10.8"
vpage.2  = "0.0  4.3  6.3   8.7"
vpage.3  = "4.2  8.5  8.4  10.8"
vpage.4  = "4.2  8.5  6.3   8.7"

#label.1  = "2.1  10.6 a) Full Removal EKE (1 MJ m`a-2`n)"
#label.2  = "2.05  8.5 b) Full Removal WA (30 m s`a-1`n)"
#label.3  = "6.35 10.6 c) No Removal EKE (1 MJ m`a-2`n)"
#label.4  = "6.30  8.5 d) No Removal WA (30 m s`a-1`n)"
label.1  = "1.25  10.6 a) Full Removal"
label.2  = "1.25  8.5 b) Full Removal"
label.3  = "7.25 10.6 c) No Removal"
label.4  = "7.25  8.5 d) No Removal"
label.5  = "4.25 10.6 Eddy Kinetic Energy (1 MJ m`a-2`n)"
label.6  = "4.25  8.5 Wave Activity (30 m s`a-1`n)"

  b = 1
  while (b < 5)
    "set vpage "vpage.b
    "set grads off"
    if (b = 1 | b = 2)
      "set ylab on"
    else
      "set ylab off"
    endif
    if (b = 2 | b = 4)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set xlint 20"
    "set ylint 10"

    "set clab off"
    "set cthick 4"
    if (b = 3)
      "run disp_shaded_nozero "basevar.b
      "set line 1 1 4"
      "set cthick 8"
#      "run disp_vector_left "fluxvar.b
    else
      "run disp_shaded_nozero "basevar.b
      "set line 1 1 4"
      "set cthick 8"
#      "run disp_vector_right "fluxvar.b
    endif

    if (b = 1 | b = 2)
      "set clab off"
      "set cthick 4"
      "run disp_unshaded_nozero hgt.1(lev=500) 300 4100 10"
      "set line 1 1 15"
#      "run gui_track_simple 4  gridlat.4  gridlon.4  1 "dotsize" "bigdot
      "run gui_track_simple 5  gridlat.5  gridlon.5  1 "dotsize" "bigdot
    else
      "set clab off"
      "set cthick 4"
      "run disp_unshaded_nozero hgt.6(lev=500) 300 4100 10"
      "set line 1 1 15"
#      "run gui_track_simple 9  gridlat.9  gridlon.9  1 "dotsize" "bigdot
      "run gui_track_simple 10 gridlat.10 gridlon.10 1 "dotsize" "bigdot
    endif
      "run disp_circle "NEGLAT" "NEGLON" "RADIN"  1"
      "run disp_circle "NEGLAT" "NEGLON" "RADOUT" 1"
      "run disp_circle "POSLAT" "POSLON" "RADIN"  1"
      "run disp_circle "POSLAT" "POSLON" "RADOUT" 1"
    b = b + 1
  endwhile

  "set vpage off"
  "set strsiz 0.13 0.13"
  "set string 1 c"
  b = 1
  while (b < 7)
    "draw string "label.b
    b = b + 1
  endwhile
"run gui_print plot.casb.initial"
"quit"
