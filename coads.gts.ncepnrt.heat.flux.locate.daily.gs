* This script is designed to plot cyclone location and intensity (colour code).
* It can be executed using a command like
*
*     grads -blc "coads.gts.ncepnrt.heat.flux.locate.daily all.flux.daily.locate"
*
* - RD November 2012

function plot(args)
dotfile = subwrd(args,1)
dotsiz = 0.05

fpz = "xyzzy.forgetit" ; "!echo $HOME > "fpz ; line = read(fpz) ; home = sublin(line,2) ; ret = close(fpz) ; "!rm "fpz
"sdfopen /home/ricani/data/mdt/MDT_CNES-CLS13_REF20_CF_extended.nc"
"set mproj scaled"
"set grads off"
"set grid off"
*"set map 15 1"
*"set mpdset mres"
*"set mpt * off" ; "set mpt 0 -1" ;# "set mpt 1 -1"
"set mpdraw off"
"set xlopts 1 5 0.15"
"set ylopts 1 5 0.15"
"set xlint 30"
"set ylint 15"
"set digsiz 0.09"
"set lat -85 85"
"set lon -182 182"
*"set lon -182 362"
"set cthick 15"
"set clab off"
"set ccolor 0"
"set clevs 100"
"d flag-flag"
*"run basemap L 15 15 M"
"set shpopts 99" ; "set line 99"
"draw shp "home"/prog/graphics.grads/lib/www.shapefiles/countries" ; "set line 1 1 6"

countc = 0
while (countc < 5)
  counta = 0
  countb = 0
  filestat = read(dotfile)
  while (sublin(filestat,1) = 0)
*   counta = counta + 1
    line = sublin(filestat,2)
    cyclat = subwrd(line,1)
    cyclon = subwrd(line,2)
    cycnum = subwrd(line,3)
    if (cyclon > 180) ; cyclon = cyclon - 360.0 ; endif
    if (cycnum > 0) ; counta = counta + 1 ; endif
    if (cycnum > 0) ; countb = countb + cycnum ; endif
*   if (cycnum >  10000) ; cyccol = 14 ; endif
    if (cycnum >   1000) ; cyccol = 14 ; endif
    if (cycnum <=  1000) ; cyccol = 13 ; endif
    if (cycnum <=   100) ; cyccol = 10 ; endif
    if (cycnum <=    10) ; cyccol = 12 ; endif
    if (cycnum  =     1) ; cyccol =  2 ; endif
    flag = 0
    if (cyccol =  2 & countc = 0) ; flag = 1 ; endif
    if (cyccol = 12 & countc = 1) ; flag = 1 ; endif
    if (cyccol = 10 & countc = 2) ; flag = 1 ; endif
    if (cyccol = 13 & countc = 3) ; flag = 1 ; endif
    if (cyccol = 14 & countc = 4) ; flag = 1 ; endif
*   if (cyccol = 14 & countc = 5) ; flag = 1 ; endif
    if (flag = 1)
      "q w2xy "cyclon" "cyclat
      rec = sublin(result,1)
      obsx = subwrd(rec,3)
      obsy = subwrd(rec,6)
      "set line "cyccol" 1 5"
      if (cycnum > 0) ; "draw mark 3 "obsx" "obsy" "dotsiz ; endif
      "set line 1 1 5"
    endif
    filestat = read(dotfile)
  endwhile
  filestat = close(dotfile)
  countc = countc + 1
endwhile

refx = 7.1 ; refy = 7.3
"set line 0"
"draw recf "refx+0.01" "refy-0.41" "refx+3.31" "refy+0.39
"set line 1"
"draw rec "refx+0.01" "refy-0.41" "refx+3.31" "refy+0.39
dotsiz = 0.08 ; "set string 1 l" ; "set strsiz 0.2"
obsx = refx+0.2 ; obsy = refy+0.2 ; "set line  2" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" =1"
obsx = refx+1.3 ; obsy = refy+0.2 ; "set line 12" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" `3<`010"
obsx = refx+2.4 ; obsy = refy+0.2 ; "set line 10" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" `3<`010`a2`n"
obsx = refx+0.6 ; obsy = refy-0.2 ; "set line 13" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" `3<`010`a3`n"
obsx = refx+1.9 ; obsy = refy-0.2 ; "set line 14" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" >10`a3`n"
*obsx = refx+2.4 ; obsy = refy-0.2 ; "set line 14" ; "draw mark 3 "obsx" "obsy" "dotsiz ; "draw string "obsx+0.1" "obsy" >10`a4`n"

"set string 1 bc 5" ; "set strsiz 0.2"
"draw string 5.55 7.95 "counta" positions and "countb" observations"

say "found "counta" positions and "countb" observations in "dotfile
*"run gui_print_colour "dotfile
say "gxprint plot.ocean.heat.flux.dots."dotfile".png png white x1100 y850"
    "gxprint plot.ocean.heat.flux.dots."dotfile".png png white x1100 y850"
"quit"
