# This script is designed to plot comparisons between simulation
* and analysis using a command like
*
*     grads -bpc "plot.casa.wavegroup"
*
* - RD November 2001.

function plot(arg)

"clear"
"run disp_colours"
"set grid off"
"set clopts 1 3 .10"
"set xlopts 1 3 .11"
"set ylopts 1 3 .11"

deltim = "1 21"
dellat = "0 90"
dellon = "110 260"

vpage.1  = "0.7  3.7  7.8  10.1"
vpage.2  = "3.8  6.8  7.8  10.1"
vpage.3  = "6.9  8.3  7.8  10.1"
vpage.4  = "0.7  3.7  5.1   7.4"
vpage.5  = "3.8  6.8  5.1   7.4"
vpage.6  = "6.9  8.3  5.1   7.4"
vpage.7  = "0.7  3.7  2.4   4.7"
vpage.8  = "3.8  6.8  2.4   4.7"
vpage.9  = "6.9  8.3  2.4   4.7"

"sdfopen /home/rdanielson/model/out/767605.budget.energy.total.eddy.nc"
"sdfopen /home/rdanielson/model/out/767605.budget.energy.conversion.eddy.nc"
"sdfopen /home/rdanielson/model/out/767605.energy.mask.nc"
"sdfopen /home/rdanielson/model/out/767605.quasi.geost.wave.activity.nc"
"sdfopen /home/rdanielson/model/out/767605.wave.mask.nc"
"sdfopen /home/rdanielson/model/out/767605.budget.energy.total.eddy.nc.nonlinear"

"set t   "deltim
"set lat "dellat
"set lon "dellon
cutoff.1 = 3000001
cutoff.2 = 30.01
cutoff = cutoff.1
param = "kinevint"
"define ea = ave(maskout(maskout("param",mask.3-500),kinevint-"cutoff"),lat=0,lat=90)"
"define ed = aave(maskout(maskout("param",mask.3-500),kinevint-"cutoff"),lon=0,lon=360,lat=0,lat=90)"
param = "ukinevint"
#param = "pow(pow(ukinevint,2)+pow(vkinevint,2),0.5)"
"define eb = ave(maskout(maskout("param",mask.3-500),kinevint-"cutoff"),lat=0,lat=90)"
"define ee = aave(maskout(maskout("param",mask.3-500),kinevint-"cutoff"),lon=0,lon=360,lat=0,lat=90)"
param = "uagfvint.2"
#param = "pow(pow(uagfvint.2,2)+pow(vagfvint.2,2),0.5)"
"define ec = ave(maskout(maskout("param",mask.3-500),kinevint-"cutoff"),lat=0,lat=90)"
"define ef = aave(maskout(maskout("param",mask.3-500),kinevint-"cutoff"),lon=0,lon=360,lat=0,lat=90)"
param = "ukinevint.6"
#param = "pow(pow(ukinevint.6,2)+pow(vkinevint.6,2),0.5)"
"define eg = ave(maskout(maskout("param",mask.3-500),kinevint-"cutoff"),lat=0,lat=90)"
"define eh = aave(maskout(maskout("param",mask.3-500),kinevint-"cutoff"),lon=0,lon=360,lat=0,lat=90)"
cutoff = cutoff.2
param = "wavevavg.4"
"define wa = ave(maskout(maskout("param",mask.5-500),wavevavg.4-"cutoff"),lat=0,lat=90)"
"define wd = aave(maskout(maskout("param",mask.5-500),wavevavg.4-"cutoff"),lon=0,lon=360,lat=0,lat=90)"
param = "uwavevavg.4"
#param = "pow(pow(uwavevavg.4,2)+pow(vwavevavg.4,2),0.5)"
"define wb = ave(maskout(maskout("param",mask.5-500),wavevavg.4-"cutoff"),lat=0,lat=90)"
"define we = aave(maskout(maskout("param",mask.5-500),wavevavg.4-"cutoff"),lon=0,lon=360,lat=0,lat=90)"
param = "reluwavevavg.4"
#param = "pow(pow(reluwavevavg.4,2)+pow(relvwavevavg.4,2),0.5)"
"define wc = ave(maskout(maskout("param",mask.5-500),wavevavg.4-"cutoff"),lat=0,lat=90)"
"define wf = aave(maskout(maskout("param",mask.5-500),wavevavg.4-"cutoff"),lon=0,lon=360,lat=0,lat=90)"

plotparam.1 = "(eb+ec)/ea  5"
plotparam.2 = "(eb+ec)/ea  15"
plotparam.3 = "(eg+ec)/ea  5"
plotparam.4 = "(eg+ec)/ea  15"
plotparam.5 = "(ee+ef)/ed"
plotparam.6 = "(eh+ef)/ed"

"set parea "vpage.1
"set grads off"
"set yflip on"
"set ylab on"
"set xlab off"
"set xlint 30"
"set ylabs Mar 8 | Mar 9 | Mar 10| Mar 11| Mar 12| Mar 13"
"set lat 0"
"set cthick 3"
"set clab off"
"run disp_shaded_nozero "plotparam.1
"set clab on"
"run disp_unshaded_nozero "plotparam.2
#"set cthick 10"
#"set clab off"
#"run disp_unshaded_nozero a/1e6 1"

"set parea "vpage.2
"set grads off"
"set yflip on"
"set ylab off"
"set xlab off"
"set xlint 30"
"set lat 0"
"set cthick 3"
"set clab off"
"run disp_shaded_nozero "plotparam.3
"set clab on"
"run disp_unshaded_nozero "plotparam.4
#"set clab off"
#"set cthick 10"
#"run disp_unshaded_nozero a 20"

"set parea "vpage.3
"set grads off"
"set yflip on"
"set xyrev on"
"set ylab off"
"set xlab off"
"set xlint 10"
"set vrange 0 40"

"set missconn on"
"set digsiz 0.065"
"set ccolor 1"
"set cstyle 1"
"set cmark 3"
"d "plotparam.5
"set ccolor 1"
"set cmark 5"
"d "plotparam.6
"set xyrev off"

plotparam.1 = "(eb+ec)/ea  5"
plotparam.2 = "(eb+ec)/ea  15"
plotparam.3 = "(wb+wc)/wa  5"
plotparam.4 = "(wb+wc)/wa  15"
plotparam.5 = "(ee+ef)/ed"
plotparam.6 = "we/wd"

"set parea "vpage.4
"set grads off"
"set yflip on"
"set ylab on"
"set xlab off"
"set xlint 30"
"set ylabs Mar 8 | Mar 9 | Mar 10| Mar 11| Mar 12| Mar 13"
"set lat 0"
"set cthick 3"
"set clab off"
"run disp_shaded_nozero "plotparam.1
"set clab on"
"run disp_unshaded_nozero "plotparam.2
#"set cthick 10"
#"set clab off"
#"run disp_unshaded_nozero a/1e6 1"

"set parea "vpage.5
"set grads off"
"set yflip on"
"set ylab off"
"set xlab off"
"set xlint 30"
"set lat 0"
"set cthick 3"
"set clab off"
"run disp_shaded_nozero "plotparam.3
"set clab on"
"run disp_unshaded_nozero "plotparam.4
#"set clab off"
#"set cthick 10"
#"run disp_unshaded_nozero a 20"

"set parea "vpage.6
"set grads off"
"set yflip on"
"set xyrev on"
"set ylab off"
"set xlab off"
"set xlint 10"
"set vrange 0 40"

"set missconn on"
"set digsiz 0.065"
"set ccolor 1"
"set cstyle 1"
"set cmark 3"
"d "plotparam.5
"set ccolor 1"
"set cmark 2"
"d "plotparam.6
"set xyrev off"

plotparam.1 = "100*ec/(eb+ec) 10"
plotparam.2 = "100*ec/(eb+ec) 20"
plotparam.3 = "100*wc/(wb+wc) 10"
plotparam.4 = "100*wc/(wb+wc) 20"
plotparam.5 = "100*ef/(ee+ef)"
plotparam.6 = "100*wf/we"

"set parea "vpage.7
"set grads off"
"set yflip on"
"set ylab on"
"set xlab on"
"set xlint 30"
"set ylabs Mar 8 | Mar 9 | Mar 10| Mar 11| Mar 12| Mar 13"
"set lat 0"
"set cthick 3"
"set clab off"
"run disp_shaded_nozero "plotparam.1
"set clab on"
"run disp_unshaded_nozero "plotparam.2
#"set cthick 10"
#"set clab off"
#"run disp_unshaded_nozero a/1e6 1"

"set parea "vpage.8
"set grads off"
"set yflip on"
"set ylab off"
"set xlab on"
"set xlint 30"
"set lat 0"
"set cthick 3"
"set clab off"
"run disp_shaded_nozero "plotparam.3
"set clab on"
"run disp_unshaded_nozero "plotparam.4
#"set clab off"
#"set cthick 10"
#"run disp_unshaded_nozero a 20"

"set parea "vpage.9
"set grads off"
"set yflip on"
"set xyrev on"
"set ylab off"
"set xlab on"
"set xlint 10"
"set vrange 0 40"

"set missconn on"
"set digsiz 0.065"
"set ccolor 1"
"set cstyle 1"
"set cmark 3"
"d "plotparam.5
"set ccolor 1"
"set cmark 2"
"d "plotparam.6

"set vpage off"
"set parea 0 8.5 0 11"
"set strsiz 0.16 0.16"
"set string 1 c 4"
"draw string 4.5 10.3 Eddy Energy Flux (5 m s`a-1`n)"
"draw string 4.5  7.6 Linear Flux (5 m s`a-1`n)"
"draw string 4.5  4.9 Relative Flux Fraction (20 %)"

"set string 1 c 10"
"set strsiz 0.20"
"draw string 0.9  8.0   a"
"draw string 4.0  8.0   b"
"draw string 7.1  8.0   c"
"draw string 0.9  5.3   d"
"draw string 4.0  5.3   e"
"draw string 7.1  5.3   f"
"draw string 0.9  2.65  g"
"draw string 4.0  2.6   h"
"draw string 7.1  2.6   i"

"set strsiz 0.145 0.145"
"set string 1 r 4"
"draw string 3.6 9.9 Linear"
"draw mark 3 3.4 9.6 0.12"
"draw string 6.7 9.9 Nonlinear"
"draw mark 5 6.5 9.6 0.12"
"draw string 3.6 7.2 Eddy Energy"
"draw mark 3 3.4 6.9 0.12"
"draw string 6.7 7.2 Wave Activity"
"draw mark 2 6.5 6.9 0.12"
"draw string 3.6 4.5 Ageostrophic"
"draw string 3.6 4.3 Geopotential"
"draw mark 3 3.4 4.0 0.12"
"draw string 6.7 4.5 Stationary"
"draw string 6.7 4.3 Wave Activity"
"draw mark 2 6.5 4.0 0.12"

"run gui_print plot.casa.wavegroup"
"quit"
