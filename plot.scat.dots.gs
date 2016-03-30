* This script is designed to plot cyclone location and intensity (colour code).
* It can be executed using a command like
*
*     grads -blc "plot.scat.dots z_dots_scat.txt.nhc-wmo.zZ"
*
* - RD November 2012

function plot(args)
cycfila = subwrd(args,1)
dotsiz = 0.065

*"sdfopen /glade/user/rickd/ecmwf/ecmwf_interim_shear_200-850_199901.nc"
"sdfopen /home/rick/data/coads/climatology/sstmask1deg.mask.nc"
*"set mproj scaled"
"set grads off"
"set grid off"
"set map 15 1"
"set mpdset mres"
"set mpt * off" ; "set mpt 0 -1" ;# "set mpt 1 -1"
"set xlopts 1 5 0.15"
"set ylopts 1 5 0.15"
"set xlint 30"
"set ylint 15"
"set digsiz 0.09"
"set lat -60 75"
"set lon 0 360"
"set cthick 15"
"set clab off"
"set ccolor 0"
"set clevs 100"
"d mask-mask"

counta = 0
filestat = read(cycfila)
while (sublin(filestat,1) = 0)                                     ;* read the data
  counta = counta + 1
  line = sublin(filestat,2)
  cyccol = subwrd(line,2)
  cyclat = subwrd(line,3)
  cyclon = subwrd(line,4)
  "q w2xy "cyclon" "cyclat
  rec = sublin(result,1)
  obsx = subwrd(rec,3)
  obsy = subwrd(rec,6)
  "set line "cyccol" 1 5"
  "draw mark 3 "obsx" "obsy" "dotsiz
  "set line 1 1 5"
  filestat = read(cycfila)
endwhile
filestat = close(cycfila)
"run basemap L 15 15 M"

"set line 0"
"draw recf 7.21667 2.6 8.88333 4.1"
"set line 1"
*X Limits = 7.21667 to 8.88333
*Y Limits = 2.3 to 3.8

cycfilb = "z_dots_scat.txt.nhc-wmo.zM"                             ;* draw an inset with the 73 training data locations
*"set parea 6.25 10 2.15 3.65"
"set parea 6.10 10 2.6 4.1"
"set grads off"
"set grid off"
"set map 15 1"
"set mpdset mres"
"set mpt * off" ; "set mpt 0 -1" ;# "set mpt 1 -1"
"set xlopts 1 5 0.15"
"set ylopts 1 5 0.15"
"set xlab `3 `0"
"set ylab `3 `0"
"set xlint 30"
"set ylint 15"
"set digsiz 0.09"
"set lat 3 48"
"set lon 255 315"
"set cthick 15"
"set clab off"
"set ccolor 0"
"set clevs 100"
"d mask-mask"
*"q gxinfo"
*say result

countb = 0
filestat = read(cycfilb)
while (sublin(filestat,1) = 0)
  countb = countb + 1
  line = sublin(filestat,2)
  cyccol = subwrd(line,2)
  cyclat = subwrd(line,3)
  cyclon = subwrd(line,4)
  "q w2xy "cyclon" "cyclat
  rec = sublin(result,1)
  obsx = subwrd(rec,3)
  obsy = subwrd(rec,6)
  "set line "cyccol" 1 5"
  "draw mark 3 "obsx" "obsy" "dotsiz
  "set line 1 1 5"
  filestat = read(cycfilb)
endwhile
filestat = close(cycfilb)
"run basemap L 15 15 M"

refx = 1.3 ; refy = 5.75
"set line 0"
"draw recf "refx+0.01" "refy-0.41" "refx+2.41" "refy+0.39
"set line 1"
"draw rec "refx+0.01" "refy-0.41" "refx+2.41" "refy+0.39
dotsiz = 0.1 ; "set string 1 l" ; "set strsiz 0.2"
obsx = refx+0.2 ; obsy = refy+0.2 ; "set line 1" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" TS"
obsx = refx+1.0 ; obsy = refy+0.2 ; "set line 4" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" H1"
obsx = refx+1.8 ; obsy = refy+0.2 ; "set line 5" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" H2"
obsx = refx+0.2 ; obsy = refy-0.2 ; "set line 3" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" H3"
obsx = refx+1.0 ; obsy = refy-0.2 ; "set line 7" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" H4"
obsx = refx+1.8 ; obsy = refy-0.2 ; "set line 2" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" H5"

"set string 1 bc 5"
"draw string 5.45 6.65 "counta" non-training (and "countb" training) QuikSCAT overpasses"

say "found "counta" cyclone centers in "cycfila
say "found "countb" cyclone centers in "cycfilb
"run gui_print_colour "cycfila
say "printim "cycfila".gif gif white x1100 y850"
    "printim "cycfila".gif gif white x1100 y850"
"quit"
