# This script is designed to plot the time series of budget terms.
* It can be executed using a command like
*
*     grads -blc "plot.sstb"
*
* - RD November 2001.

function plot(arg)

"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont6.sst.slp.wind.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/cont6.track.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert6.sst.slp.wind.nc"
"sdfopen /home/rdanielson/data/season/mm5/model/1985-02-27-12/pert6.track.nc"

tima  =  1
timb  = 45

dellata = 30
dellona = 80
position.1.1  = "0 0 40.0 170.0"
dellatb = 12
dellonb = 15

vpage.1  = "1.0    11   0.4 4.2"
vpage.2  = "1.0    11   4.5   8.3"
vpage.3  = "0.0    2.8   0.8   4.5"
vpage.4  = "2.7    5.5   0.8   4.5"
vpage.5  = "5.4   11.0   4.2   8.2"
vpage.6  = "5.4   11.0   4.2   8.2"
vpage.7  = "5.4    8.2   0.8   4.5"
vpage.8  = "8.1   10.9   0.8   4.5"

#  plot the time series

"set map 15 1 5"
"run disp_colours colour"
"set grid off"
#"set clopts 1 3 0.25"
"set xlopts 1 3 0.15"
"set ylopts 1 3 0.15"

a = tima
while (a <= timb)
  "clear"
  "set t "a
  "set grads off"
  "set grid off"
  "set xlab on"
  "set ylab on"
  "set ylint 10"
  "set digsiz 0.09"
  "set lat 25 65"
  "set lon 100 190"
  "set parea "vpage.1
  "set mpt * 15 1 10"
  "set cthick 10"
  "set cthick 8"
  "set cint 6"
  "set ccolor rainbow"
  "d slp/100"
  "set line 9 1 10"
  "run gui_track_simple 2 cycalat.2 cycalon.2 1 0.1 0.2 2"
  "set line 10 1 10"
  "run gui_track_simple 2 cycblat.2 cycblon.2 1 0.1 0.2 2"
  "set line 11 1 10"
  "run gui_track_simple 2 cycclat.2 cycclon.2 1 0.1 0.2 2"
  "set line 12 1 10"
  "run gui_track_simple 2 cycdlat.2 cycdlon.2 1 0.1 0.2 2"

  "c events"
  "set grads off"
  "set grid off"
  "set xlab off"
  "set ylab on"
  "set ylint 10"
  "set digsiz 0.09"
  "set lat 25 65"
  "set lon 100 190"
  "set parea "vpage.2
  "set mpt * 15 1 10"
  "set cthick 10"
  "set cthick 8"
  "set cint 6"
  "set ccolor rainbow"
  "d slp.3/100"
  "set line 9 1 10"
  "run gui_track_simple 4 cycalat.4 cycalon.4 1 0.1 0.2 2"
  "set line 10 1 10"
  "run gui_track_simple 4 cycblat.4 cycblon.4 1 0.1 0.2 2"
  "set line 11 1 10"
  "run gui_track_simple 4 cycclat.4 cycclon.4 1 0.1 0.2 2"
  "set line 12 1 10"
  "run gui_track_simple 4 cycdlat.4 cycdlon.4 1 0.1 0.2 2"

  "set vpage off"
  "set strsiz 0.25 0.25"
  "set string 1 c 6"
  "run gui_date"
  date = result
#  "draw string 5.4 7.8 "date
  "set string 3 c 6"
#  "draw string 5.4 4.6 500-hPa Height (20 dam)"
  "set string 2 c 6"
#  "draw string 5.4 4.2 Column Eddy Kinetic Energy (1e6 J/m2)"
  "set string 1 c 6"
#  "draw string 5.4 1.0 Zoom of Sea Level Pressure (8 hPa)"

  "set string 1 l 6"
  "draw string 0.5 3.8 Cold"
  "draw string 0.5 7.4 SST"
  "draw string 0.5 7.8 Warm"
  "draw string 0.5 3.4 SST"
  "set string 1 r 6"
#  "draw string 10.5 8.2 No Trough"
#  "draw string 10.4 7.8 Upstream"

  if (a < 10)
    say "printim 0"a".gif gif x1200 y900"
        "printim 0"a".gif gif x1200 y900"
  else
    say "printim "a".gif gif x1200 y900"
        "printim "a".gif gif x1200 y900"
  endif
  a = a + 1
endwhile
"quit"
