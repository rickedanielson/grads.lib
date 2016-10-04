* This script plots overpasses collocated in time with GNSS-R
* acquisitions and can be executed using a command like
*
*     grads -blc "plot.gnssr.track.overpasses"
*
* - RD September 2016.

function plot(args)
hdrfil = subwrd(args,1)
sarfil = substr(hdrfil,1,25)".sar.nc"
gpsfil = subwrd(args,2)

"sdfopen /home/ricani/data/ncep.reanalysis/slp/slp.2015.nc"
"set mpdset hires"
"set grid off"
"set clopts 1 4 .08"
"set xlopts 1 1 .095"
"set ylopts 1 1 .095"
"set digsiz 0.05"

"set t 1345"
"set lat 53 64.5"
"set lon 13 29.0"
"set clevs 0"
"set grads off" ; "d slp"

"set line 1 1 7"
"run disp_box_points 58.433860778808594 19.499194270154778 59.174560546875 26.597288936399682 61.96696090698242 17.566294676063965 62.74959182739258 25.47206412655372"
* 60.342911 24.979921 60.435688 26.172400 59.628521 25.223694 59.720844 26.390842"

"q w2xy 25.9 60.05"
rec  = sublin(result,1)
xpos = subwrd(rec,3)
ypos = subwrd(rec,6)
"draw mark 2 "xpos" "ypos" "0.4

"set line 1 1 5"
"run gui_track_satellite /home/ricani/data/track.satellite/satellites.altika/39086         12 0.15         Altika  8.00  2.50  0.18"
"run gui_track_satellite /home/ricani/data/track.satellite/satellites.cryosat-2/36508       2 0.15      Cryosat-2  8.00  2.20  0.18"
"run gui_track_satellite /home/ricani/data/track.satellite/satellites.hy-2a/37781           3 0.15          HY-2a  8.00  1.90  0.18"
"run gui_track_satellite /home/ricani/data/track.satellite/satellites.jason-2/33105         9 0.15        JASON-2  8.00  1.60  0.18"
"run gui_track_satellite /home/ricani/data/track.satellite/satellites.sentinel-1a/39634     1 0.15           S-1a  8.00  1.30  0.18"
"run gui_track_satellite /home/ricani/data/track.satellite/satellites.sentinel-2a/40697    13 0.15           S-2a  8.00  1.00  0.18"

plotnam = "plot.2015-12-03.overpass"
#"run gui_print_colour "plotnam
say "printim "plotnam".png png white x1100 y850"
    "printim "plotnam".png png white x1100 y850"
"quit"


*"set strsiz 0.20"
*"set string 1 bc 5"
*"draw string 5.50 8.00 Sentinel-1a `3s`0`bO`aHH`n (dB) and GNSS-R MSS"
*"set grads off" ; inner_cbarn("1.00 1  1.00 4.25 a")
*"set grads off" ; inner_cbarn("1.00 1 10.00 4.25 b")
