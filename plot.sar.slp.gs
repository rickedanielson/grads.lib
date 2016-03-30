* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -bpc "plot.sar.slp 21Mar04_43737_01.sar.nc"
*
* - RD April 2004.

function plot(args)

"run disp_colours_rev_cmos colour"
file = subwrd(args,1)
position = "45 300 45 300"
dellat = 15
dellon = 15

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

"sdfopen slp.2004.nc"

"q file"
ret = sublin(result,5)
lasttime = subwrd(ret,12)

index = 1
while (index < lasttime)
  "set t "index
  "run gui_date"
  if (result = maxdate)
    maxind = index
    index = lasttime
  endif
  index = index + 1
endwhile

"clear"
"set grads off"
"set grid off"
"set xlab off"
"set ylab off"
"set digsiz 0.09"
"set gxout shaded"
"set cint 8"
"run gui_view_grid "dellat" "dellon" "position
"run disp_shaded_contoured (slp+slp(t+1))/200 8 1000"
"run gui_date"
"draw title "result
#"draw title "direction" "beam" "date

"set line 1 1 20"
"run disp_box_points "ullat" "ullon" "urlat" "urlon" "lrlat" "lrlon" "lllat" "lllon

#"run gui_print plot."stem".slp"
say "printim plot."stem"slp.gif gif x450 y600"
    "printim plot."stem"slp.gif gif x450 y600"
"quit"
