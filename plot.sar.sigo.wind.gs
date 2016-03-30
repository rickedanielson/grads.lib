* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -blc "plot.sar.sigo.wind 2004-11-25_47292_01.06400.sar.nc.incid.est"
*
* - RD April 2004.

function plot(args)

file = subwrd(args,1)
prenum = subwrd(args,2)
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
maxdate = year"/"monb"/"day" "hour" UTC"
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

"run disp_colours_sar colour"
"sdfopen "args                                        ;* plot SAR

"clear"
"set mproj scaled"
"set grads off"
"set grid off"
"set xlab off"
"set ylab off"
"set digsiz 0.09"

if (1 = 2)
"set parea 5.6 10.8 0.2 8.0"
"set gxout shaded"
"set ccols   43  44  45  46  47  48  49  50  51  52  53  54  55  56  57  58  59"
"set clevs  -40 -18 -17 -16 -15 -14 -13 -12 -11 -10  -9  -8  -7  -6  -5  -4  30"
"d sigo"
#"run disp_shaded_contoured sigo 1 -5"
#"clear graphics"
#"run gui_cbarn 1.0 1 10 4.25"

"set gxout contour"
"set cthick 15"
"set clab off"
"set clevs 0"
"set ccolor 1"
"d land"
endif

#"set parea 0.2 5.4 0.2 8.0"                           ;# plot wind
"set parea 1.6 2.8 0.2 1.0"
"set gxout shaded"
"set ccols   42  41  40  39  38  37  36  35  34  33  32  31  30  29  28  27  26"
"set clevs    0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  48"
"d mag(uwnd,vwnd)"
"set cthick 3"
#"run disp_shaded_contoured mag(uwnd,vwnd) 1 0"
"run gui_cbarn 1.0 1 10 4.25"

if (1= 2)
"set gxout barb"
"set cthick 20"
"set digsiz 0.1"
"set ccolor 1"
"d skip(uwnd,4,4);vwnd"

"set gxout contour"
"set cthick 15"
"set clab off"
"set clevs 0"
"set ccolor 1"
"d land"

"set parea off"
"set string 1 c 20"
"set strsiz 0.21 0.21"
"draw string 5.5 8.22 "direction" "beam" "maxdate
endif

if (prenum > 99)
  say "printim "prenum".plot."stem".gif gif white x1100 y850"
      "printim "prenum".plot."stem".gif gif white x1100 y850"
else
  if (prenum > 9)
    say "printim 0"prenum".plot."stem".gif gif white x1100 y850"
        "printim 0"prenum".plot."stem".gif gif white x1100 y850"
  else
    say "printim 00"prenum".plot."stem".gif gif white x1100 y850"
        "printim 00"prenum".plot."stem".gif gif white x1100 y850"
  endif
endif
"quit"

#"open "stem".coads.ctl"
#"sdfopen "stem".sar.cmod5.vector.nc"
#"sdfopen "stem".sar.wind.nc"
#"set gxout model"
#"set mdlopts dig3"
#"set digsiz 0.22"
#"set ccolor 1"
#"set cthick 100"
#"d uwnd.2;vwnd.2"
#"set strsiz 0.09 0.09"
#"run disp_sar_latlon"
#"run gui_print plot."stem
