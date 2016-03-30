# This script can be executed using a command like
*
*     grads -bpc "plot.casb.traj"
*
* with %%BoundingBox: 28 262 578 508
* - RD March 2002.

function doit(arg)

dellat = "25 75"
dellon = "60 255"
conin = 100
dotsize = 0.07
RADIN  =   750                                          ;* radius of anomaly removal inner domain (km)
RADOUT =   1500                                         ;* radius of anomaly removal outer domain (km)
NEGLAT =   56.0                                         ;* central latitude  of the negative anomaly removal domain
NEGLON =   91.0                                         ;* central longitude of the negative anomaly removal domain
POSLAT =   50.0                                         ;* central latitude  of the positive anomaly removal domain
POSLON =   115.0

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .12"
"set xlopts 1 4 .12"
"set ylopts 1 4 .12"

"sdfopen /home/rdanielson/model/out/runs/mmout_balpert9.trajectory.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balpert9.nc"
"set lev 250"
"set lat "dellat
"set lon "dellon

"set grads off"
"set xlint 20"
"set ylint 10"

"run disp_shaded_nocontour traj(t=1)+traj(t=13) 2"
      "run disp_circle "NEGLAT" "NEGLON" "RADIN"  1"
      "run disp_circle "NEGLAT" "NEGLON" "RADOUT" 1"
      "run disp_circle "POSLAT" "POSLON" "RADIN"  1"
      "run disp_circle "POSLAT" "POSLON" "RADOUT" 1"

"set t 13"
"set clab off"
"set cthick 4"
"run disp_unshaded_nozero hgt.2 300 4100 10"
#"run disp_shaded_nocontour traj 2"
"set clab on"
"set clevs 11"
"set cthick 8"
"d traj+10.5"

"set t 1"
"set clevs 8"
"set cthick 8"
"d traj+7.5"

"run gui_print plot.casb.traj"
"quit"
