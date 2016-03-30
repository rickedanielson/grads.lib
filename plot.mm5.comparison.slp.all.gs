# This script is designed to plot the time series of budget terms.
* It can be executed using a command like
*
*     grads -blc "plot.mm5.comparison.slp.all"
*
* - RD November 2001.

function plot(arg)

"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.nc"
"sdfopen /home/rdanielson/model/out/runs/mmout_balcont3.track.nc"
"sdfopen /home/rdanielson/model/out/767605.nc"
"sdfopen /home/rdanielson/model/out/767605.track.nc"

tima  =  5
timb  =  25

dellat = "22.5 72.5"
dellon = "100 260"

vpage.1  = "0.0 11.0 0.50 4.75"
vpage.2  = "0.0 11.0 3.85 8.10"

#  plot the time series

"set map 15 1 10"
"run disp_colours colour"
"set grid off"
"set clopts 10 3 0.10"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"

a = tima
while (a <= timb)
  "clear"
  "set t "a
  "set cthick 8"
  "set vpage "vpage.1
  "set grads off"
  "set xlab on"
  "set ylab on"
  "set xlint 20"
  "set ylint 10"
  "set lat "dellat
  "set lon "dellon
  "set clab off"
  "run disp_shaded_contoured slp/100 8 992"
  "set clab on"
  "set cthick 15"
  "run disp_unshaded_nozero hgt(lev=500) 300 4100 10"

  "set vpage "vpage.2
  "set grads off"
  "set xlab off"
  "set ylab on"
  "set xlint 20"
  "set ylint 10"
  "set clab off"
  "run disp_shaded_contoured slp.3/100 8 992"
  "set clab on"
  "set cthick 15"
  "run disp_unshaded_nozero hgt.3(lev=500) 300 4100 10"

  "run gui_cbarn 1.0 1 10 4.25"
  "set vpage off"
  "set strsiz 0.25 0.25"
  "set string 1 c 6"
  "run gui_date"
  date = result
  "draw string 1.9 7.8  "date
  "draw string 5.5 8.25 SLP (8 hPa) and 500-hPa Height (30 dm)"
#  "draw string 5.4 4.2 Column Eddy Kinetic Energy (1e6 J/m2)"

  "draw string 5.5 4.3 Control Simulation"
  "draw string 5.5 7.6 NCEP Reanalysis"
#  "draw string 10.5 8.2 Full Removal"

  if (a = tima)
    b = 10
    while (b < 12)
      say "printim slpall."b".gif gif x1200 y900"
          "printim slpall."b".gif gif x1200 y900"
      b = b + 1
    endwhile
  endif
  say "printim slpall."b".gif gif x1200 y900"
      "printim slpall."b".gif gif x1200 y900"
  a = a + 1
  b = b + 1
endwhile
"quit"
