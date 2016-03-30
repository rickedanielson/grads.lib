* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -bpc "plot.sar.all all.hdr all.06400.col.gemdir.common"
*
* - RD April 2004.

function plot(args)
hdrfile = subwrd(args,1)
obsfile = subwrd(args,2)

b = 0
countsta = 0
while (b < 834)
  filestat = read(obsfile)
  line = sublin(filestat,2)
  obssta = subwrd(line,1)
  obslat = subwrd(line,3)
  obslon = subwrd(line,4)
  obshgt = subwrd(line,5)
  obstmp = obssta" "obslat" "obslon" "obshgt

  if (countsta = 0)
    obslin.0 = obstmp
    countsta = 1
  else
    c = 0
    flag = 0
    while (c < countsta)
      if (subwrd(obslin.c,1) = subwrd(obstmp,1))
        flag = 1
      endif
      c = c + 1
    endwhile
    if (flag = 0)
      obslin.countsta = obstmp
      countsta = countsta + 1
    endif
  endif
  filestat = read(obsfile)
  b = b + 1
endwhile
filestat = close(obsfile)
say
say "found "countsta" obs platforms in "obsfile
say

c = 0
while (c < countsta)
  say obslin.c
  c = c + 1
endwhile
say

"sdfopen /home/rdanielson/data/coads/climatology/clim.month.sst.ltm.nc"
#"set mproj scaled"
vpg.0 = "0.0  4.25 3 11"
vpg.1 = "4.25 8.5  3 11"
pos.0 = "49.5 231 49.5 231"
pos.1 = "45   301 45   301"
tit.0 = "a) 191 SAR Scenes"
tit.1 = "b) 294 SAR Scenes"
dellat = 7
dellon = 15

a = 0
while (a < 2)
  "set vpage "vpg.a
  "set grads off"
  "set grid off"
  "set map 15 1"
  "set mpdset mres"
  "set mpt * off" ; "set mpt 0 -1" ;# "set mpt 1 -1"
  "set xlopts 1 5 0.15"
  "set ylopts 1 5 0.15"
  "set xlint 5"
  "set ylint 4"
  "set digsiz 0.09"
  "run gui_view_grid "dellat" "dellon" "pos.a
  "set cthick 15"
  "set clab off"
  "set clevs 100"
  "set ccolor 0"
  "d sst-sst"

  b = 0
  count.a = 0
  while (b < 485)
    filestat = read(hdrfile)
    fila = sublin(filestat,2)
#    say "reading "fila
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    filestat = read(fila)
    line = sublin(filestat,2)
    ullat = subwrd(line,2)
    filestat = read(fila)
    line = sublin(filestat,2)
    ullon = subwrd(line,2)
    filestat = read(fila)
    line = sublin(filestat,2)
    urlat = subwrd(line,2)
    filestat = read(fila)
    line = sublin(filestat,2)
    urlon = subwrd(line,2)
    filestat = read(fila)
    line = sublin(filestat,2)
    lllat = subwrd(line,2)
    filestat = read(fila)
    line = sublin(filestat,2)
    lllon = subwrd(line,2)
    filestat = read(fila)
    line = sublin(filestat,2)
    lrlat = subwrd(line,2)
    filestat = read(fila)
    line = sublin(filestat,2)
    lrlon = subwrd(line,2)
    filestat = close(fila)

    "set line 1 1 5"
    if ((a = 0 & ullon < -75) | (a = 1 & ullon > -75))
      "run disp_box_points_fill "ullat" "ullon" "urlat" "urlon" "lllat" "lllon" "lrlat" "lrlon
      count.a = count.a + 1
    endif
    b = b + 1
  endwhile
  filestat = close(hdrfile)
  "run basemap L 15 15 M"
  "draw title "tit.a

  b = 0
  while (b < countsta)
    obslat = subwrd(obslin.b,2)
    obslon = subwrd(obslin.b,3)
    if ((a = 0 & obslon < -75) | (a = 1 & obslon > -75))
      obslon = obslon + 360
      "q w2xy "obslon" "obslat
      rec = sublin(result,1)
      obsx = subwrd(rec,3)
      obsy = subwrd(rec,6)
      "set line 0 1 5"
      "draw mark 3 "obsx" "obsy" 0.085"
      "set line 1 1 5"
    endif
    b = b + 1
  endwhile
  a = a + 1
endwhile

say "west coast has "count.0
say "east coast has "count.1

"run gui_print plot.sar.all"
say "printim plot.sar.all.gif gif white x1100 y850"
    "printim plot.sar.all.gif gif white x1100 y850"
"quit"
