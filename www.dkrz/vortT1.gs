*-----------------------------------------------------------------------------
* Data:    Miguel Zorita
*          (MPI) Max Planck Institute of Meteorology - Hamburg/Germany
* Script:  Karin Meier
*          (DKRZ) German Climate Computing Center - Hamburg/Germany
* E-mail:  karin.meier@dkrz.de
*-----------------------------------------------------------------------------

'reinit'

*------- open descriptor files:
*-------         vort.ctl:    vorticity data
*-------         shelf.ctl:   shelf mask
*-------         land.ctl:    land mask

'open ./vort.ctl'
'open ./shelf.ctl'
'open ./land.ctl'

*------- get color palette BYR-03
'run ../../lib/colors/BYR-03'

*------- set viewport
'set vpage 0.5 10.5 0.5 8.5'
'set parea 0.75 10.5 0.5 8.5'

*------- color index setting
col1 = "76 75 74 73 72 71 70 69 68 67 66 65 64 63 62 61 60 "
col2 = "59 58 57 56 55 54 52 50 49 47 46 45 44 43 42 41 40 39 38 "
col3 = "37 36 35 34 33 32 31 30 29 28 27 26 25 24 23 22 21 20 19 18 17"
colors = col1%col2%col3

*------- level setting
lev1 = "0.5000E-04   0.5200E-04   0.5400E-04   0.5600E-04   0.5800E-04   0.6000E-04   0.6200E-04   0.6400E-04 "
lev2 = "0.6600E-04   0.6800E-04   0.7000E-04   0.7200E-04   0.7400E-04   0.7600E-04   0.7800E-04   0.8000E-04 "
lev3 = "0.8200E-04   0.8400E-04   0.8600E-04   0.8800E-04   0.9000E-04   0.9200E-04   0.9400E-04   0.9600E-04 "
lev4 = "0.9800E-04   0.1000E-03   0.1020E-03   0.1040E-03   0.1060E-03   0.1080E-03   0.1100E-03   0.1120E-03 "
lev5 = "0.1140E-03   0.1160E-03   0.1180E-03   0.1200E-03   0.1220E-03   0.1240E-03   0.1260E-03   0.1280E-03 "
lev6 = "0.1300E-03   0.1320E-03   0.1340E-03   0.1360E-03   0.1380E-03   0.1400E-03   0.1420E-03   0.1440E-03 "
lev7 = "0.1460E-03   0.1480E-03   0.1500E-03 "
levels = lev1%lev2%lev3%lev4%lev5%lev6%lev7

*------- map settings
'set mpdset lowres'
'set mproj latlon'
'set mpdraw off'
'set xlopts 1 6 0.20'
'set ylopts 1 6 0.20'

*------- draw voticity data using shaded contour
'set gxout shaded'
'set cterp off'
'set csmooth off'
'set grads off'
'set t 1'
'set ccols 'colors
'set cmin  0.5E-04'
'set cmax  1.5E-04'
'set cint  2.0E-06'
'set clevs 'levels
'd vort.1/1000.0'
'run labelbar.gs 10000 5'

*-------new defining of white(99) and black(98)
'set rgb 98   0   0   0'
'set rgb 99 255 255 255'

*------- shelf mask
'set gxout fgrid'
'set grads off'
'set fgvals 0 99'
'd shelf.2'

*------- land mask
'set gxout fgrid'
'set grads off'
'set fgvals 0 98'
'd land.3'

*------- draw title string
'set font 4'
'set string 1 tl 9'
'set strsiz 0.32 0.34'
'draw string 1.6 8.1 Vorticity'
'set string 1 tl 6'
'set strsiz 0.20 0.22'
'draw string 5.0 7.97 1.Schicht      (E-04 [s'
'draw string 9.37 7.97 ])'
'set strsiz 0.14 0.16'
'draw string 9.05 8.03 -1'
'set font 0'

*------- print day and month below labelbar
'q time'
date = subwrd(result,3)
day = substr(date,4,2)
month = substr(date,6,3)

'set string 1 bl 8';  'set strsiz 0.24 0.26'
'draw string 3.5 0.1 Day:'
'set string 1 br 8'
'draw string 5.0 0.1 'day
'set string 1 bl 8'
'draw string 5.5 0.1 Month:'
'set string 1 br 8'
'draw string 7.5 0.1 'month

'set vpage 0.0 11.0 0.0 8.5'
'set string 1 c 5';  'set strsiz 0.10 0.12'
'draw string 5.5 0.22 Max Planck Institute of Meteorology (MPI) - Hamburg/Germany'

