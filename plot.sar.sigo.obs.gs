* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -bpc "plot.sar.sigo.obs 2004-11-25_47292_01.sar.nc"
*
* - RD April 2004.

function plot(args)

file = subwrd(args,1)

* isolate the data file name (following the path name)

a = 1
b = 1
ret = substr(args,a,1)
while (ret != "")
  if (b = 1 & ret = ".")
    b = a
  endif
  a = a + 1
  ret = substr(args,a,1)
endwhile
b = b - 1
stem = substr(args,1,b)

fila = stem".06400.hdr"
say "reading "fila
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
direction = subwrd(line,2)

filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
beam = subwrd(line,2)

filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
date = subwrd(line,2)
time = subwrd(line,3)

filestat = read(fila)                                           ;# get the acquisition corners
line = sublin(filestat,2)                                       ;# and the initial view
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
fileclose = close(fila)
midlat = (ullat + urlat + lllat + lrlat) / 4.0
midlon = (ullon + urlon + lllon + lrlon) / 4.0
if (midlon < 0) ; midlon = midlon + 360.0 ; endif

filb = stem".coads.obs"                                       ;# verify whether any obs exist
say "reading "filb
countb = 0
filestat = read(filb)
while (sublin(filestat,1) = 0)
  line = sublin(filestat,2)
  countb = countb + 1
  filestat = read(filb)
endwhile
say countb" obs were found"
fileclose = close(filb)
zeronumb = countb

"sdfopen "stem".gem.nc"
if (zeronumb > 0)
  "open "stem".coads.obs.ctl"
endif
"open "stem".coads.omt.ctl"
"open "stem".coads.alt.ctl"
"set lat "midlat-3" "midlat+3
"set lon "midlon-4" "midlon+4

"clear"
"set grads off"
"set grid off"
"set mpdset hires"
#"set xlab off"
#"set ylab off"
#"set digsiz 0.09"
"set gxout contour"
"set ccolor rainbow"
"set cthick 4"
"d slp/100"
"set gxout barb"
"set ccolor 3"
"d uwnd;vwnd"
"set line 1 1 20"
"run disp_box_points "ullat" "ullon" "urlat" "urlon" "lllat" "lllon" "lrlat" "lrlon
"set line 1 1 4"

"q dims"
rec = sublin(result,2)
say rec
lonmin = subwrd(rec,6)
lonmax = subwrd(rec,8)
"set lon "lonmin-360" "lonmax-360
"set gxout model"
"set mdlopts dig3"
if (zeronumb > 0)
  "set digsiz 0.05"
  "set ccolor 2"
  "set cthick 4"
  "d uwnd.4;vwnd.4"
  "set digsiz 0.09"
  "set ccolor 15"
  "set cthick 10"
  "d uwnd.3;vwnd.3"
  "set digsiz 0.11"
  "set ccolor 1"
  "set cthick 10"
  "d uwnd.2;vwnd.2"
  "set cthick 4"
else
  "d uwnd.2;vwnd.2"
endif

filb = stem".coads.obs"
say "reading "filb
countb = 0
filestat = read(filb)
while (sublin(filestat,1) = 0)
  line = sublin(filestat,2)
  obslat = subwrd(line,3)
  obslon = subwrd(line,4)
  radius = subwrd(line,17)
  "set line 1 1 10"
  "run disp_circle "obslat" "obslon" "radius" 1"
  countb = countb + 1
  filestat = read(filb)
endwhile
say countb" obs were found"
fileclose = close(filb)

"draw title "direction" "beam" "date" 10 UTC"
"run gui_print plot."stem
say "printim plot."stem".gif gif white x850 y1100"
    "printim plot."stem".gif gif white x850 y1100"
"quit"



#"set gxout barb"
#"set cthick 10"
#"set digsiz 0.1"
#"d skip(uwnd,60,60);vwnd"

#"set gxout model"
#"set mdlopts dig3"
#"set ccolor 1"
#"set cthick 100"
#"set digsiz 0.22"
#"d uwnd.2;vwnd.2"
#"set gxout contour"

#"q gxinfo"
#rec = sublin(result,2)
#pagex = subwrd(rec,4)
#pagey = subwrd(rec,6)
#y = pagey + 0.1
#"set string 1 c 5"
#pagex = pagex / 2
#"draw string "pagex" 0.3 "time

#"run gui_header date"
#"set strsiz 0.08 0.08"
#"set strsiz 0.1 0.1"
#"run disp_sar_latlon"
