* This script is designed to plot comparisons between
* GlobCurrent current components using a command like
*
*     grads -blc "plot.globcurrent.drifter 1 2012-04-12-0000.00109460.traj.2012-05-15-0000 ../links/20120515000000-GLOBCURRENT-L4-CUReul_15m-ALT_SUM-v01.0-fv01.0.nc   3.0    4.0 -60.0  -58.0"
*     grads -blc "plot.globcurrent.drifter 1 2010-10-04-1800.00070972.traj.2010-10-23-1800 ../links/20101023180000-GLOBCURRENT-L4-CUReul_15m-ALT_SUM-v01.0-fv01.0.nc -47.880 -6.174 9.815 73.083"
*
* - RD October 2014.

function plot(arg)
infiln = subwrd(arg,1)
infila = subwrd(arg,2)
infilb = subwrd(arg,3)
minlat = subwrd(arg,4)
maxlat = subwrd(arg,5)
minlon = subwrd(arg,6)
maxlon = subwrd(arg,7)
cenlat = (minlat + maxlat) / 2
cenlon = (minlon + maxlon) / 2
infilc = substr(infila,1,24)".xyzzy"
z2 = 0 ; z1 = (maxlat - minlat) / 4
if(z2=0&z1>50.00);z2=50.00;endif;if(z2=0&z1>30.00);z2=30.00;endif;if(z2=0&z1>20.00);z2=20.00;endif;if(z2=0&z1>15.000);z2=15.000;endif;if(z2=0&z1>10.00);z2=10.00;endif
if(z2=0&z1> 5.00);z2= 5.00;endif;if(z2=0&z1> 3.00);z2= 3.00;endif;if(z2=0&z1> 2.00);z2= 2.00;endif;if(z2=0&z1> 1.500);z2= 1.500;endif;if(z2=0&z1> 1.00);z2= 1.00;endif
if(z2=0&z1> 0.50);z2= 0.50;endif;if(z2=0&z1> 0.30);z2= 0.30;endif;if(z2=0&z1> 0.20);z2= 0.20;endif;if(z2=0&z1> 0.150);z2= 0.150;endif;if(z2=0&z1> 0.10);z2= 0.10;endif
if(z2=0&z1> 0.05);z2= 0.05;endif;if(z2=0&z1> 0.03);z2= 0.03;endif;if(z2=0&z1> 0.02);z2= 0.02;endif;if(z2=0&z1> 0.015);z2= 0.015;endif;if(z2=0&z1> 0.01);z2= 0.01;endif
dellat = z2
z2 = 0 ; z1 = (maxlon - minlon) / 4
if(z2=0&z1>50.00);z2=50.00;endif;if(z2=0&z1>30.00);z2=30.00;endif;if(z2=0&z1>20.00);z2=20.00;endif;if(z2=0&z1>15.000);z2=15.000;endif;if(z2=0&z1>10.00);z2=10.00;endif
if(z2=0&z1> 5.00);z2= 5.00;endif;if(z2=0&z1> 3.00);z2= 3.00;endif;if(z2=0&z1> 2.00);z2= 2.00;endif;if(z2=0&z1> 1.500);z2= 1.500;endif;if(z2=0&z1> 1.00);z2= 1.00;endif
if(z2=0&z1> 0.50);z2= 0.50;endif;if(z2=0&z1> 0.30);z2= 0.30;endif;if(z2=0&z1> 0.20);z2= 0.20;endif;if(z2=0&z1> 0.150);z2= 0.150;endif;if(z2=0&z1> 0.10);z2= 0.10;endif
if(z2=0&z1> 0.05);z2= 0.05;endif;if(z2=0&z1> 0.03);z2= 0.03;endif;if(z2=0&z1> 0.02);z2= 0.02;endif;if(z2=0&z1> 0.015);z2= 0.015;endif;if(z2=0&z1> 0.01);z2= 0.01;endif
dellon = z2

"clear"
"set grid off"
"set mpt * off"
"set clopts 1 6 .20"
"set xlopts 1 6 .20"
"set ylopts 1 6 .20"
"set xlint "dellon
"set ylint "dellat

"set rgb  51 255 255 255"
"set rgb  52 255 240 150"
"set rgb  53 215 160 160"
"set rgb  54 255 120 120"
"set rgb  55 175  80  80"
"set rgb  56 255  40  40"
"set rgb  88   0   0 208" ;* default best track colour
"set rgb  99 200 200 200" ;* default land colour

"sdfopen /home/ricani/data/topography/elev.0.25-deg.nc"
"set lat "minlat" "maxlat
"set lon "minlon" "maxlon
"set gxout shaded"
"set ccols  51    52   53   54   99"
"set clevs    -1000 -500 -100   0"
"set grads off" ; "set clab off" ; "d data"
"q gxinfo" ; _gxinfo = result ; "q shades" ; _shadea = result
"run basemap L 99 1"
"set gxout contour"
"close 1"

"sdfopen "infilb
"set lat "minlat" "maxlat
"set lon "minlon" "maxlon
"set grads off"
"set string 1 c 6"
"set strsiz 0.25 0.25"
"set line 15 1 7"
"set gxout stream"
"set ccols   9   4   5   3   7    8"
"set clevs     1   5  15  50  150"
"set strmden 2 9.0 0.1 1" ; "set cthick 12"
"d 100*eastward_euleri;100*northward_euler;mag(100*eastward_euleri,100*northward_euler)"
"q gxinfo" ; _gxinfo = result ; "q shades" ; _shadeb = result
"set gxout contour"
*"run disp_vector_globcurrent eastward_euleri skip(northward_euler,2) 0.4 15 10.55 8.25"

*"open /home/cercache/project/globcurrent/data/era_interim_surface_wind_components/era.ctl"
"sdfopen /home/ricani/data/era_interim/era_2012-04.nc"
"set line 99 1 7" ; "set string 99 c 6" ; "set strsiz 0.1 0.1"
"set dfile 2" ; "q dims" ; tmp = sublin(result,5) ; tval = subwrd(tmp,9)
"run disp_vector_globcurrent ave(u10.2,t="tval-1",t="tval+1") skip(ave(v10.2,t="tval-1",t="tval+1"),7) 10 ms`a-1`n 99 5.9 0.2"
"set line 1 1 7" ; "set string 1"
"set dfile 1"
"close 2"

count = 1
filestat = read(infilc)
message = sublin(filestat,1)
while (message = 0 & count <= infiln)
  line = sublin(filestat,2)
  trackfile = subwrd(line,1)
  "sdfopen "trackfile
  "set line 1 1 10"
  "set grads off"
  "run gui_track_simple 2 drilat.2 drilon.2 2 0.0 0.25 3 1"
  "set line 4 1 3"
  "set grads off"
  "run gui_track_simple_noline 2 simlat.2 simlon.2 1 0.0 0.10 3 4"
  "close 2"
  count = count + 1
  filestat = read(infilc)
  message = sublin(filestat,1)
endwhile
filestat = close(infilc)

"run gui_date_simple" ; date = result
"set string 1 c 6"
"set strsiz 0.25 0.25"
"draw string 5.85 8.25 "date
"set string 1 l 6"
"set strsiz 0.1  0.1"
"draw string 0.2 0.2 "substr(infila,1,24)

"set strsiz 0.13"
"set string 1 bc 5"
"set grads off" ; inner_cbarn("0.60 0 9.35 8.30 a")
"set grads off" ; inner_cbarn("0.60 0 2.00 8.30 b")

"sdfopen /home/ricani/data/topography/elev.0.25-deg.nc"
"set vpage 9.5 11.0 0.0 1.5"
"set lat "cenlat-20" "cenlat+20
"set lon "cenlon-25" "cenlon+25
"set gxout shaded"
"set ccols  51    52   53   54   99"
"set clevs    -1000 -500 -100   0"
"set xlab off"
"set ylab off"
"set grads off" ; "set clab off" ; "d data.2(t=1)"
"q w2xy "minlon" "minlat
xlo = subwrd(result,3)
ylo = subwrd(result,6)
"q w2xy "maxlon" "maxlat
xhi = subwrd(result,3)
yhi = subwrd(result,6)
"set line 3 1 10"
"draw rec "xlo" "ylo" "xhi" "yhi

say "gxprint plot.globcurrent.drift."infila".png png white x1100 y850"
    "gxprint plot.globcurrent.drift."infila".png png white x1100 y850"
"quit"


function inner_cbarn(args)
  sf  =subwrd(args,1)
  vert=subwrd(args,2)
  xmid=subwrd(args,3)
  ymid=subwrd(args,4)
  svar=subwrd(args,5)

  if(sf='');sf=1.0;endif
*
*  Check shading information
*
*  'query shades'
  if (svar = "a") ; shdinfo = _shadea ; endif
  if (svar = "b") ; shdinfo = _shadeb ; endif
* if (svar = "c") ; shdinfo = _shadec ; endif
* say shdinfo
* shdinfo = _shades
  if (subwrd(shdinfo,1)='None')
    say 'Cannot plot color bar: No shading information'
    return
  endif

*
*  Get plot size info
*
  "set vpage off"
  'query gxinfo'
*  result = _gxinfo
*say result
  rec2 = sublin(result,2)
  rec3 = sublin(result,3)
  rec4 = sublin(result,4)
  xsiz = subwrd(rec2,4)
  ysiz = subwrd(rec2,6)
  ylo = subwrd(rec4,4)
  xhi = subwrd(rec3,6)
  xd = xsiz - xhi

  ylolim=0.6*sf
  xdlim1=1.0*sf
  xdlim2=1.5*sf
  barsf=0.8*sf
  yoffset=0.2*sf
  stroff=0.1*sf
  strxsiz=0.17*sf
  strysiz=0.18*sf
*
*  Decide if horizontal or vertical color bar
*  and set up constants.
*
  if (ylo<ylolim & xd<xdlim1)
    say "Not enough room in plot for a colorbar"
    return
  endif
  cnum = subwrd(shdinfo,5)
*
*       logic for setting the bar orientation with user overides
*
  if (ylo<ylolim | xd>xdlim1)
    vchk = 1
    if(vert = 0) ; vchk = 0 ; endif
  else
    vchk = 0
    if(vert = 1) ; vchk = 1 ; endif
  endif
*
*       vertical bar
*

  if (vchk = 1 )

    if(xmid = '') ; xmid = xhi+xd/2 ; endif
    xwid = 0.2*sf
    ywid = 0.5*sf

    xl = xmid-xwid/2
    xr = xl + xwid
    if (ywid*cnum > ysiz*barsf)
      ywid = ysiz*barsf/cnum
    endif
    if(ymid = '') ; ymid = ysiz/2 ; endif
    yb = ymid - ywid*cnum/2
#RD    'set string 1 l'
    'set string 1 r'
    vert = 1

  else

*
*       horizontal bar
*

    ywid = 0.4
    xwid = 0.63

    if(ymid = '') ; ymid = ylo/2-ywid/2 ; endif
    yt = ymid + yoffset
    yb = ymid
    if(xmid = '') ; xmid = xsiz/2 ; endif
    if (xwid*cnum > xsiz*barsf)
      xwid = xsiz*barsf/cnum
    endif
    xl = xmid - xwid*cnum/2
    'set string 1 tc'
    vert = 0
  endif


*
*  Plot colorbar
*


* 'set strsiz 'strxsiz' 'strysiz
  num = 0
  while (num<cnum)
    rec = sublin(shdinfo,num+2)
*RD    rec = sublin(shdinfo,num+20)
    col = subwrd(rec,1)
    hi = subwrd(rec,3)
    if (vert)
      yt = yb + ywid
    else
      xr = xl + xwid
    endif

*   Draw the left/bottom triangle
    if (num = 0)
      if(vert = 1)
        xm = (xl+xr)*0.5
        'set line 'col
        'draw polyf 'xl' 'yt' 'xm' 'yb' 'xr' 'yt' 'xl' 'yt
        'set line 1 1'
        'draw line 'xl' 'yt' 'xm' 'yb
        'draw line 'xm' 'yb' 'xr' 'yt
        'draw line 'xr' 'yt' 'xl' 'yt
      else
        ym = (yb+yt)*0.5
        'set line 'col
        'draw polyf 'xl' 'ym' 'xr' 'yb' 'xr' 'yt' 'xl' 'ym
        'set line 1 1'
        'draw line 'xl' 'ym' 'xr' 'yb
        'draw line 'xr' 'yb' 'xr' 'yt
        'draw line 'xr' 'yt' 'xl' 'ym
      endif
    endif

*   Draw the middle boxes
    if (num!=0 & num!= cnum-1)
      'set line 'col
      'draw recf 'xl' 'yb' 'xr' 'yt
      'set line 1 1'
      'draw rec  'xl' 'yb' 'xr' 'yt
    endif

*   Draw the right/top triangle
    if (num = cnum-1)
      if (vert = 1)
        'set line 'col
        'draw polyf 'xl' 'yb' 'xm' 'yt' 'xr' 'yb' 'xl' 'yb
        'set line 1 1'
        'draw line 'xl' 'yb' 'xm' 'yt
        'draw line 'xm' 'yt' 'xr' 'yb
        'draw line 'xr' 'yb' 'xl' 'yb
      else
        'set line 'col
        'draw polyf 'xr' 'ym' 'xl' 'yb' 'xl' 'yt' 'xr' 'ym
        'set line 1 1'
        'draw line 'xr' 'ym' 'xl' 'yb
        'draw line 'xl' 'yb' 'xl' 'yt
        'draw line 'xl' 'yt' 'xr' 'ym
      endif
    endif

*   Put numbers under each segment of the color key
    if (num < cnum-1)
      if (vert)
#RD        xp=xr+stroff
        xp=xl-stroff
        'draw string 'xp' 'yt' 'hi
      else
        yp=yb-stroff
       'draw string 'xr' 'yp' 'hi
      endif
    endif

*   Reset variables for next loop execution
    if (vert)
      yb = yt
    else
      xl = xr
    endif
    num = num + 1
  endwhile
return
