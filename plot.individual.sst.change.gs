# This script can be executed using a command like
*
*     grads -bpc "plot.individual.sst.change dj30d.om30d.dateorder   37.5 145"
*     grads -bpc "plot.individual.sst.change gd2000.dateorder        37.5 145"
*     grads -bpc "plot.individual.sst.change atlmid.atltra.dateorder.T-24 43.5 -60"
*
* - RD March 2002.

function doit(arg)

masking = 0
limit = 300
conin.1 = 1
conin.2 = 1
refcont = 16

filename = subwrd(arg,1)
position = subwrd(arg,2)" "subwrd(arg,3)" "subwrd(arg,2)" "subwrd(arg,3)
dellat = subwrd(arg,4)
dellon = subwrd(arg,5)
if (dellat = "")
  dellat = 10
endif
if (dellon = "")
  dellon = 20
endif

"set grid off"
"run disp_colours"

a = 1                                                              ;# create the virtual pages
dely = 0.745
while (a < 10)
  y = (9 - a) * (10.5 - dely) / 9 + dely
  b = 2 * a - 1
  c = 2 * a
  d = 2 * a + 17
  e = 2 * a + 18
  f = 2 * a + 35
  g = 2 * a + 36
  up = y + dely + 0.5
  cen = y + dely + 0.27
  down = y - dely + 0.5
  vpage.b = "0.00  1.45  "down" "up
  vpage.c = "1.35  2.80  "down" "up
  vpage.d = "2.80  4.25  "down" "up
  vpage.e = "4.15  5.60  "down" "up
  vpage.f = "5.60  7.05  "down" "up
  vpage.g = "6.95  8.40  "down" "up
  labpos.b = "1.30 "cen
  labpos.d = "4.20 "cen
  labpos.f = "7.00 "cen
  a = a + 1
endwhile

a = 1                                                              ;# loop through all the cases
b = 1
say "reading "filename
filestat = read(filename)
message = sublin(filestat,1)
while (message = 0)
  line = sublin(filestat,2)
  date = subwrd(line,1)
  tag  = subwrd(line,2)
  sstfile   = tag".sst.5day.nc"
  "sdfopen "sstfile
  "run gui_view_grid "dellat" "dellon" "position

  c = b + 1
  "set vpage "vpage.b
  "set grads off"
  "set xlab off"
  "set ylab off"
  "set clab off"

  "set cthick 4"
  "run disp_shaded_nozero maskout(sst(t=9)-sst(t=8),"limit"-infl(t=9)) "conin.1
  "set cthick 6"
  "set clevs "limit
  "set cstyle 2"
  "d infl(t=9)"

  if (masking = 1)                                                 ;# thicken the graphic border
    "run basemap L 0 1"
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 1 1 10"
    "draw rec "xl" "yb" "xr" "yt
  endif

  "set vpage "vpage.c
  "set grads off"
  "set xlab off"
  "set ylab off"
  "set clab off"

  "set cthick 4"
  "run disp_shaded_nozero maskout(sstanom(t=9)-sstanom(t=8),"limit"-infl(t=9)) "conin.2
  "set cthick 6"
  "set clevs "limit
  "set cstyle 2"
  "d infl(t=9)"

  if (masking = 1)                                                 ;# thicken the graphic border
    "run basemap L 0 1"
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 1 1 10"
    "draw rec "xl" "yb" "xr" "yt
  endif

  "set vpage off"
  "set strsiz 0.1 0.1"
  "set string 1 c 4"
  "draw string "labpos.b" "date

  "close 1"
  filestat = read(filename)
  message = sublin(filestat,1)
  a = a + 1
  b = b + 2
endwhile
filestat = close(filename)
"run gui_print plot.individual.sst.change."filename
"quit"
