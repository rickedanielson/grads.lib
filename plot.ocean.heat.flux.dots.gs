* This script is designed to plot cyclone location and intensity (colour code).
* It can be executed using a command like
*
*     grads -blc "plot.ocean.heat.flux.dots all.flux.locate"
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
"set lat -65 85"
"set lon -182 182"
"set cthick 15"
"set clab off"
"set ccolor 0"
"set clevs 100"
"d flag-flag"
*"run basemap L 15 15 M"
"set shpopts 99" ; "set line 99"
"draw shp "home"/prog/graphics.grads/lib/www.shapefiles/countries" ; "set line 1 1 6"

counta = 0
filestat = read(dotfile)
while (sublin(filestat,1) = 0)
  counta = counta + 1
  line = sublin(filestat,2)
  cyccol = 2
  cyclat = subwrd(line,1)
  cyclon = subwrd(line,2)
  "q w2xy "cyclon" "cyclat
  rec = sublin(result,1)
  obsx = subwrd(rec,3)
  obsy = subwrd(rec,6)
  "set line "cyccol" 1 5"
  "draw mark 3 "obsx" "obsy" "dotsiz
  "set line 1 1 5"
  filestat = read(dotfile)
endwhile
filestat = close(dotfile)

"set string 1 bc 5" ; "set strsiz 0.2"
"draw string 5.55 7.95 "counta" GTS observation positions"

say "found "counta" cyclone centers in "dotfile
*"run gui_print_colour "dotfile
say "gxprint plot.ocean.heat.flux.dots."dotfile".png png white x1100 y850"
    "gxprint plot.ocean.heat.flux.dots."dotfile".png png white x1100 y850"
"quit"


"set line 0"
"draw recf 7.21667 2.6 8.88333 4.1"
"set line 1"
*X Limits = 7.21667 to 8.88333
*Y Limits = 2.3 to 3.8

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
