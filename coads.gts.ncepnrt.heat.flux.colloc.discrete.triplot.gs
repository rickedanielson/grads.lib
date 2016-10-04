* This script is designed to plot cyclone location and intensity (colour code).
* It can be executed using a command like
*
*          grads -blc   "coads.gts.ncepnrt.heat.flux.colloc.discrete.triplot  55.000 75.000  -40.000  30.000 1"
*          grads -blc   "coads.gts.ncepnrt.heat.flux.colloc.discrete.triplot -90.000 90.000 -180.000 180.000 1"
* parallel grads -blc '"'coads.gts.ncepnrt.heat.flux.colloc.discrete.triplot -90.000 90.000 -180.000 180.000 ::: `seq 1 365` ::: '"'
*
* - RD November 2012

function plot(arg)
minlat = subwrd(arg,1)
maxlat = subwrd(arg,2)
minlon = subwrd(arg,3)
maxlon = subwrd(arg,4)
reftim = subwrd(arg,5)
cenlat = (minlat + maxlat) / 2
cenlon = (minlon + maxlon) / 2

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
*fpz = "xyzzy.forgetit" ; "!echo $HOME > "fpz ; line = read(fpz) ; home = sublin(line,2) ; ret = close(fpz) ; "!rm "fpz

"clear"
"set grid off"
"set mpt * off"
"set clopts 1 6 .20"
"set xlopts 1 6 .20"
"set ylopts 1 6 .20"
"set xlint "dellon
"set ylint "dellat
"set mproj off"

"set rgb  51 255 255 255"
"set rgb  52 255 240 150"
"set rgb  53 215 160 160"
"set rgb  54 255 120 120"
"set rgb  55 175  80  80"
"set rgb  56 255  40  40"
"set rgb  88   0   0 208" ;* default best track colour
"set rgb  99 200 200 200" ;* default land colour

*"sdfopen /home/ricani/data/topography/elev.0.25-deg.nc"
*"set lat "minlat" "maxlat
*"set lon "minlon" "maxlon
*"set gxout shaded"
*"set ccols  51    52   53   54   99"
*"set clevs    -1000 -500 -100   0"
*"set grads off" ; "set clab off" ; "d data"
*"q gxinfo" ; _gxinfo = result ; "q shades" ; _shadea = result
*"run basemap L 99 1"
*"set gxout contour"
*"close 1"

"open /home/ricani/work/works/ifremerflux_2005/ifremerflux.ctl"
"set t "reftim
"set lat "minlat" "maxlat
"set lon "minlon" "maxlon
"set gxout shaded"
"set ccols  9   4   5   3   7    8"
*"set clevs  -25  25   75 125 175"
*"set clevs    -2  -1  0   1   2"
"set clevs   25  50  75  100 125"
*"set clevs   0.1 0.3 0.5 0.7 0.9"
*"set grads off" ; "set clab off" ; "d (0.00324523)*air*air + (0.47446203)*spd*spd + (-1.02788081)*(sst-273.15)*(sst-273.15) + (1.47811392)*air*spd + (0.90989238)*air*(sst-273.15) + (-1.81451063)*spd*(sst-273.15) + (-34.99778667)*air + (-1.40607747)*spd + (44.28974691)*(sst-273.15) + (-107.62631171)"
*"set grads off" ; "set clab off" ; "d (-0.21157525)*air*air + (-0.07878915)*spd*spd + (-0.38109803)*(sst-273.15)*(sst-273.15) + (0.10323660)*air*spd + (0.55607395)*air*(sst-273.15) + (-0.13859643)*spd*(sst-273.15) + (-3.92385427)*air + (2.50089656)*spd + (5.75275786)*(sst-273.15) + (-28.43351098)"
"set grads off" ; "set clab off" ; "d (0.51144810)*air*air + (-0.06875373)*spd*spd + (0.46118014)*(sst-273.15)*(sst-273.15) + (-0.09309947)*air*spd + (-1.07129783)*air*(sst-273.15) + (0.00312724)*spd*(sst-273.15) + (-4.44965402)*air + (4.40675646)*spd + (7.38663450)*(sst-273.15) + (0.11215290)"
*"set grads off" ; "set clab off" ; "d (-0.00701055)*air*air + (0.00113865)*spd*spd + (-0.00356523)*(sst-273.15)*(sst-273.15) + (0.00970338)*air*spd + (0.01164945)*air*(sst-273.15) + (-0.00810264)*spd*(sst-273.15) + (-0.12436707)*air + (-0.00822184)*spd + (0.06732740)*(sst-273.15) + (0.63281551)"

*all.flux.daily.locate_2.0_calib.shfx.got2000_obs.grab.cfsr <==
*"set grads off" ; "set clab off" ; "d (-0.00195855)*air*air + (0.00361290)*spd*spd + (0.00196083)*(sst-273.15)*(sst-273.15) + (0.00521693)*air*spd + (0.00174474)*air*(sst-273.15) + (-0.00253722)*spd*(sst-273.15) + (-0.05214780)*air + (-0.08682895)*spd + (-0.03388291)*(sst-273.15) + (1.22396110)"
*==> all.flux.daily.locate_2.0_calib.shfx.got2000_obs.grab.erainterim <==
*"set grads off" ; "set clab off" ; "d (-0.01273270)*air*air + (-0.00003823)*spd*spd + (-0.01214382)*(sst-273.15)*(sst-273.15) + (0.00415140)*air*spd + (0.02549310)*air*(sst-273.15) + (-0.00320071)*spd*(sst-273.15) + (-0.10325792)*air + (0.00017479)*spd + (0.07346742)*(sst-273.15) + (0.50741012)"
*==> all.flux.daily.locate_2.0_calib.shfx.got2000_obs.grab.hoaps <==
*"set grads off" ; "set clab off" ; "d (-0.01039746)*air*air + (-0.00063780)*spd*spd + (-0.01096215)*(sst-273.15)*(sst-273.15) + (0.00629990)*air*spd + (0.02139855)*air*(sst-273.15) + (-0.00576387)*spd*(sst-273.15) + (-0.10918737)*air + (0.01946693)*spd + (0.10299850)*(sst-273.15) + (0.16931634)"
*==> all.flux.daily.locate_2.0_calib.shfx.got2000_obs.grab.ifremerflux <==
*"set grads off" ; "set clab off" ; "d (-0.00701055)*air*air + (0.00113865)*spd*spd + (-0.00356523)*(sst-273.15)*(sst-273.15) + (0.00970338)*air*spd + (0.01164945)*air*(sst-273.15) + (-0.00810264)*spd*(sst-273.15) + (-0.12436707)*air + (-0.00822184)*spd + (0.06732740)*(sst-273.15) + (0.63281551)"
*==> all.flux.daily.locate_2.0_calib.shfx.got2000_obs.grab.jofuro <==
*"set grads off" ; "set clab off" ; "d (-0.01067259)*air*air + (-0.00006666)*spd*spd + (-0.00952495)*(sst-273.15)*(sst-273.15) + (0.00095762)*air*spd + (0.02070674)*air*(sst-273.15) + (-0.00004253)*spd*(sst-273.15) + (-0.05424462)*air + (-0.00729606)*spd + (0.02513483)*(sst-273.15) + (0.64770370)"
*==> all.flux.daily.locate_2.0_calib.shfx.got2000_obs.grab.merra <==
*"set grads off" ; "set clab off" ; "d (-0.01038254)*air*air + (0.00050317)*spd*spd + (-0.00972686)*(sst-273.15)*(sst-273.15) + (0.00365189)*air*spd + (0.02070241)*air*(sst-273.15) + (-0.00314524)*spd*(sst-273.15) + (-0.08651912)*air + (-0.00737406)*spd + (0.06132983)*(sst-273.15) + (0.52654383)"
*==> all.flux.daily.locate_2.0_calib.shfx.got2000_obs.grab.oaflux <==
*"set grads off" ; "set clab off" ; "d (-0.01477325)*air*air + (-0.00070731)*spd*spd + (-0.01502081)*(sst-273.15)*(sst-273.15) + (0.00313638)*air*spd + (0.03020980)*air*(sst-273.15) + (-0.00239151)*spd*(sst-273.15) + (-0.10725140)*air + (0.01206251)*spd + (0.08897352)*(sst-273.15) + (0.46444877)"
*==> all.flux.daily.locate_2.0_calib.shfx.got2000_obs.grab.seaflux <==
*"set grads off" ; "set clab off" ; "d (-0.00768448)*air*air + (-0.00023086)*spd*spd + (-0.00458647)*(sst-273.15)*(sst-273.15) + (0.00537788)*air*spd + (0.01302630)*air*(sst-273.15) + (-0.00493803)*spd*(sst-273.15) + (-0.05411098)*air + (0.01118426)*spd + (0.01619642)*(sst-273.15) + (0.55023207)"

"q gxinfo" ; _gxinfo = result ; "q shades" ; _shadea = result
"set gxout contour"
"run basemap L 99 1"
"set grads off"
"set string 1 c 6"
"set strsiz 0.25 0.25"
"set line 15 1 7"
"set gxout stream"
"set ccols   51  52  53  54  55  56"
"set clevs     1   5  10  15  20"
"set strmden -5 9.0 0.1 1" ; "set cthick 4"
"d u;v;mag(u,v)"
"q gxinfo" ; _gxinfo = result ; "q shades" ; _shadeb = result

"run gui_date_simple" ; date = result
"set string 1 c 6"
"set strsiz 0.23"
*"draw string 3.85 8.25 SHF bias (Wm`a-2`n) "date
*"draw string 3.85 8.25 SHF calib "date
"draw string 3.85 8.25 SHF RMSE (Wm`a-2`n) "date
*"draw string 3.85 8.25 SHF Correlation "date

*"set string 1 l"
*"draw string 0.7 7.50 a) CFSR"
*"draw string 0.7 7.50 b) ERA Interim"
*"draw string 0.7 7.50 c) HOAPS"
*"draw string 0.7 7.50 d) IfremerFlux"
*"draw string 0.7 7.50 e) J-OFURO"
*"draw string 0.7 7.50 f) MERRA"
*"draw string 0.7 7.50 g) OAFlux"
*"draw string 0.7 7.50 h) SeaFlux"

"set strsiz 0.13"
"set string 1 bc 5"
"set grads off" ; inner_cbarn("0.60 0 8.5 7.5 a")
*"set grads off" ; inner_cbarn("0.60 0 9.25 8.30 a")
**"set grads off" ; inner_cbarn("0.60 0 2.00 8.30 b")

                 tval = "00"reftim
if reftim >  9 ; tval =  "0"reftim ; endif
if reftim > 99 ; tval =     reftim ; endif
say "gxprint coads.gts.ncepnrt.heat.flux.colloc.discrete.triplot."tval".png png white x1100 y850"
    "gxprint coads.gts.ncepnrt.heat.flux.colloc.discrete.triplot."tval".png png white x1100 y850"
"quit"

*   res  = coef[1] * varair[i] * varair[i] + coef[2] * varspd[i] * varspd[i] + coef[3] * varsst[i] * varsst[i] +
*          coef[4] * varair[i] * varspd[i] + coef[5] * varair[i] * varsst[i] + coef[6] * varspd[i] * varsst[i] +
*          coef[7] * varair[i]             + coef[8] * varspd[i]             + coef[9] * varsst[i] + coef[10]
*     1.58142453*air*air + 0.21192243*spd*spd + 1.67550186*(sst-273.15)*(sst-273.15) - 0.41619424*air*spd - 3.24287984*air*(sst-273.15) + 0.45987590*spd*(sst-273.15) + 1.70888986*air - 3.84710777*spd - 2.46165525*(sst-273.15) + 18.81675320
*    -0.03783432*air*air + 0.02171992*spd*spd - 0.03027189*(sst-273.15)*(sst-273.15) - 0.01635796*air*spd + 0.07194274*air*(sst-273.15) + 0.01944569*spd*(sst-273.15) + 0.03169998*air - 0.51312824*spd - 0.18250736*(sst-273.15) +  4.20293794
*     0.22812659*air*air - 0.21859154*spd*spd + 0.30715734*(sst-273.15)*(sst-273.15) - 0.14577318*air*spd - 0.58272658*air*(sst-273.15) + 0.13243353*spd*(sst-273.15) - 7.04641458*air + 6.11999371*spd + 7.63826821*(sst-273.15) +  2.68540473
*    -0.03947466*air*air + 0.00270543*spd*spd - 0.03975109*(sst-273.15)*(sst-273.15) + 0.00189707*air*spd + 0.07981320*air*(sst-273.15) - 0.00087165*spd*(sst-273.15) - 0.19026551*air - 0.06386870*spd + 0.16114838*(sst-273.15) +  0.80171620


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
