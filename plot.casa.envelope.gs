# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casa.envelope"
*
* %%BoundingBox: 20 470 581 754
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

"sdfopen /home/rdanielson/model/out/767605.nc"
"sdfopen /home/rdanielson/model/out/767605.budget.energy.total.eddy.nc"
"sdfopen /home/rdanielson/model/out/767605.budget.energy.conversion.eddy.nc"
"sdfopen /home/rdanielson/model/out/767605.quasi.geost.wave.activity.nc"
"sdfopen /home/rdanielson/model/out/767605.energy.mask.nc"
"sdfopen /home/rdanielson/model/out/767605.wave.mask.nc"
"sdfopen /home/rdanielson/model/out/767605.group.velocity.nc"
"sdfopen /home/rdanielson/model/out/767602.track.nc"
"sdfopen /home/rdanielson/model/out/767605.track.nc"
"sdfopen /home/rdanielson/model/out/767605.wave.packet.demod.nc"
"sdfopen /home/rdanielson/model/out/767605.wave.packet.envelope.nc"
"set lat 22.5 72.5"
"set lon 100 250"
"set t 63"

basevar.1 = "kinevint.2 2e6"
fluxvar.1 = "ukinevint.2+uagfvint.3 vkinevint.2+vagfvint.3 2e8"
maskvar.1 = "mask.5 kinevint.2 3000001"
basevar.2 = "vint(sfcpres-sfcpres+600,envelope.10,100)/vint(sfcpres-sfcpres+600,hgt-hgt+1,100)"
basevar.3 = "wavevavg.4 30"
fluxvar.3 = "uwavevavg.4 vwavevavg.4 2000"
maskvar.3 = "mask.6 wavevavg.4 30.01"
basevar.4 = "vint(sfcpres-sfcpres+600,envelope.11,100)/vint(sfcpres-sfcpres+600,hgt-hgt+1,100)"

vpage.1  = "0.0  4.3  8.4  10.8"
vpage.2  = "0.0  4.3  6.3   8.7"
vpage.3  = "4.2  8.5  8.4  10.8"
vpage.4  = "4.2  8.5  6.3   8.7"

label.1  = "2.1  10.55 a) Eddy Energy (2 MJ m`a-2`n)"
label.2  = "2.1   8.45 b) Complex Demod (10 m s`a-1`n)"
label.3  = "6.35 10.55 c) Wave Activity (30 m s`a-1`n)"
label.4  = "6.35  8.45 d) Hilbert Trans (5 m s`a-1`n)"

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
    if (b = 1)
      "run disp_shaded_nozero "basevar.b
      "set line 1 1 4"
      "set cthick 8"
      "run disp_vector_left "fluxvar.b
      "set cthick 15"
      "run disp_masks_one "maskvar.b
    endif
    if (b = 2)
      "define var = "basevar.b
      "run disp_shaded_nozero var 10"
      "set cthick 15"
      "set clevs 30"
      "d var"
    endif
    if (b = 3)
      "run disp_shaded_nozero "basevar.b
      "set line 1 1 4"
      "set cthick 8"
      "run disp_vector_right "fluxvar.b
      "set cthick 15"
      "run disp_masks_one "maskvar.b
    endif
    if (b = 4)
      "define var = "basevar.b
      "run disp_shaded_nozero var 5"
      "set cthick 15"
      "set clevs 25"
      "d var"
    endif
    "set clab off"
    "set cthick 4"
    "run disp_unshaded_nozero hgt.4(lev=500) 300 4100 10"
    "set line 1 1 15"
    "run gui_track_simple 8 gridlat.8 gridlon.8 1 "dotsize" "bigdot
    "run gui_track_simple 9 gridlat.9 gridlon.9 1 "dotsize" "bigdot

    b = b + 1
  endwhile

  "set vpage off"
  "set strsiz 0.15 0.15"
  "set string 1 c"
  b = 1
  while (b < 5)
    "draw string "label.b
    b = b + 1
  endwhile
"run gui_print plot.casa.envelope"
"quit"
