* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -blc "plot.sar.sigo.slp 21Mar04_43737_01.gem.nc"
*
* - RD April 2004.

function plot(args)

file = subwrd(args,1)
a = 1                                         ;* isolate the the header file name
b = 1                                         ;* and read the ancillary data
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

fila = stem"_sig0.hdr"
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
year = substr(date,8,4)
mona = substr(date,4,3)
day  = substr(date,1,2)
hour = substr(time,1,2)
if (mona = "JAN") ; monb = "01" ; endif
if (mona = "FEB") ; monb = "02" ; endif
if (mona = "MAR") ; monb = "03" ; endif
if (mona = "APR") ; monb = "04" ; endif
if (mona = "MAY") ; monb = "05" ; endif
if (mona = "JUN") ; monb = "06" ; endif
if (mona = "JUL") ; monb = "07" ; endif
if (mona = "AUG") ; monb = "08" ; endif
if (mona = "SEP") ; monb = "09" ; endif
if (mona = "OCT") ; monb = "10" ; endif
if (mona = "NOV") ; monb = "11" ; endif
if (mona = "DEC") ; monb = "12" ; endif
if (hour = 9 | hour = 10 | hour = 11)
  maxdate = year"-"monb"-"day"-06"
else
  maxdate = year"-"monb"-"day"-18"
endif
say date" "time
say maxdate

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
midlat = (ullat + urlat + lllat + lrlat) / 4.0
midlon = (ullon + urlon + lllon + lrlon) / 4.0
if (midlon < 0) ; midlon = midlon + 360.0 ; endif
dellat = 5
dellon = 7

"run disp_colours colour"
"sdfopen "args                                        ;* plot SAR data
"open "stem".coads.ctl"

"clear"
"set grads off"
"set grid off"
"set mpdset hires"
"set map 15 1 10"
"set lat "midlat-dellat" "midlat+dellat
"set lon "midlon-dellon" "midlon+dellon
"define cenlat = "midlat
"define cenlon = "midlon

"set gxout contour"
"set ccolor rainbow"
"d slp/100"

"set gxout grfill"
"set clevs 0 10"
"set datawarn off"
"d maskout(sice,sice-0.099)"

"q dims"
rec = sublin(result,2)
lonmin = subwrd(rec,6)
lonmax = subwrd(rec,8)
"set lon "lonmin-360" "lonmax-360
"set gxout model"
"set mdlopts dig3"
"set digsiz 0.15"
"set cthick 20"
"d uwnd.2;vwnd.2"

"set lon "lonmin" "lonmax
"set gxout barb"
"set digsiz 0.075"
"set cthick 7"
"d uwnd;vwnd"

"set line 1 1 20"
"run disp_box_points "ullat" "ullon" "urlat" "urlon" "lllat" "lllon" "lrlat" "lrlon

"set strsiz 0.2 0.2"
"set string 1 c 10"
"draw string 5.5 8.2 "date" "hour" UTC"

say "printim plot."stem".gif gif x1100 y850"
    "printim plot."stem".gif gif x1100 y850"
"quit"
