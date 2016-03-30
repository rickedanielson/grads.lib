# This script can be executed using a command like
*
*     grads -bpc "plot.mean.phase.speed"
*
* with %%BoundingBox: 28 262 578 508
* - RD March 2002.

function doit(arg)

dellat = "22.5 72.5"
dellon = "100 260"
conin = 100
dotsize = 0.07

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .12"
"set xlopts 1 4 .12"
"set ylopts 1 4 .12"

"sdfopen /home/rdanielson/model/out/767605.wave.activity.budget.calc/dump.phase.speed.nc"
"sdfopen /home/rdanielson/model/out/767605.wave.activity.budget.calc/767605.mean.nc"
"sdfopen /home/rdanielson/model/out/767605.quasi.geost.wave.activity.nc"

"set t 1"
"set lev 300"
"set lat "dellat
"set lon "dellon

"set grads off"
"set xlint 20"
"set ylint 10"

"set cthick 8"
"set clab off"
"set clevs 2"
"d mag(umean.3(t=1),vmean.3(t=1))-mag(uwnd,vwnd)"

"set cthick 4"
"set clab off"
"run disp_unshaded_nozero maskout(hgt.2,mag(umean.3(t=1),vmean.3(t=1))-mag(uwnd,vwnd)-2) "conin" 7000"
"set clab on"
"run disp_unshaded_nozero maskout(hgt.2,mag(umean.3(t=1),vmean.3(t=1))-mag(uwnd,vwnd)-2) "4*conin" 7000"
"run disp_vector_nocutoff uwnd maskout(vwnd,mag(umean.3(t=1),vmean.3(t=1))-mag(uwnd,vwnd)-2) 25"
"close 3"
"close 2"
"close 1"

"sdfopen /home/rdanielson/model/out/767605.wave.activity.budget.calc/767605.track.upstream.nc"
"sdfopen /home/rdanielson/model/out/767605.wave.activity.budget.calc/767605.mean.nc"
"set t 25"
"set lat "dellat
"set lon "dellon

"set grads off"
"set xlab off"
"set ylab off"
"set line 1 1 7"
"run gui_track_simple 1 troplat troplon 1 "dotsize" "dotsize
"close 2"
"close 1"

"sdfopen /home/rdanielson/model/out/767605.wave.activity.budget.calc/767605.track.downstream.nc"
"sdfopen /home/rdanielson/model/out/767605.wave.activity.budget.calc/767605.mean.nc"
"set t 25"
"set lat "dellat
"set lon "dellon

"set grads off"
"set xlab off"
"set ylab off"
"set line 1 1 7"
"run gui_track_simple 1 troplat troplon 1 "dotsize" "dotsize

"run gui_print plot.mean.phase.speed"
"quit"
