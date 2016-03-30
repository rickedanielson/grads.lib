* This script is designed to plot comparisons between
* GlobCurrent current components using a command like
*
*     grads -blc "plot.globcurrent.components.brochure-2 2010010112"
*
* - RD October 2014.

function plot(arg)
stemgeo = substr(arg,1,8)
stemall = arg

fpz = "xyzzy.forgetit" ; "!echo $HOME > "fpz ; line = read(fpz) ; home = sublin(line,2) ; ret = close(fpz) ; "!rm "fpz
"clear"
*"run disp_colours"
"set grid off"
"set mpt * off"
"set clopts 1 6 .20"
"set xlopts 1 6 .20"
"set ylopts 1 6 .20"
dotsize = 0.0
bigdot = 0.2

*dellat = "-90 90"                           ;* global
*dellon = "-180 180"
dellat = "28 70"                            ;* North Atlantic
dellon = "-80 19"
*dellat = "-50 -24"                          ;* Agulhas
*dellon = "-5 55"
*dellat = "58 60"                            ;* Orkney
*dellon = "-7.5 -0.5"
*dellat = "29 37"                            ;* Tsushima
*dellon = "120 138"

"set rgb  51 255 255 255"
"set rgb  52 255 240 150"
"set rgb  53 215 160 160"
"set rgb  54 255 120 120"
"set rgb  55 175  80  80"
"set rgb  56 255  40  40"
"set rgb  88   0   0 208" ;* default best track colour
"set rgb  99 200 200 200" ;* default land colour

xpic = 2 ; string = "1.30  9.70 4.50 "xpic ; inner_decomp(string)
a = 1 ; while (a <= xpic) ; lef.a = _retlef.a ; cen.a = _retmid.a ; rig.a = _retrig.a ; a = a + 1 ; endwhile

ypic = 2 ; string = "2.20 6.90 2.50 "ypic ; inner_decomp(string)
a = 1 ; while (a <= ypic) ; bot.a = _retlef.a ; mid.a = _retmid.a ; top.a = _retrig.a ; a = a + 1 ; endwhile

label.1 = cen.1" "top.2-0.15" Geostrophic Current (ms`a-1`n)"
label.2 = cen.2" "top.2-0.15" Ekman Current (ms`a-1`n)"
label.3 = cen.1" "top.1-0.15" Stokes Current (ms`a-1`n)"
label.4 = cen.2" "top.1-0.15" Pressure (hPa)"

a = 1 ; while (a <= xpic)                               ;* 11 21 31
  b = 1 ; while (b <= ypic)                             ;* 12 22 32 are created here
    c = ypic - b + 1
    vpage.a.c = lef.a" "rig.a" "bot.b" "top.b
  b = b + 1 ; endwhile
a = a + 1 ; endwhile
*vptmp1 = vpage.3.1
*vptmp2 = vpage.2.2
*vpage.3.1 = vptmp2
*vpage.2.2 = vptmp1
*vptmp1 = vpage.2.1
*vptmp2 = vpage.2.2
*vptmp3 = vpage.3.1
*vptmp4 = vpage.3.2
*vpage.2.1 = vptmp3
*vpage.2.2 = vptmp4
*vpage.3.1 = vptmp2
*vpage.3.2 = vptmp1

"sdfopen "stemgeo"000000-GLOBCURRENT-L4-CUR-ALT-geostrophic-v01.0-fv01.0.nc"
*ccol = "41   42   43   44   45   46   47   48   49   50   51"
*ccol = "9 	14 	4 	11 	5 	13 	3 	10 	7 	12 	8 	2 	6
*ccol = " 0   44   11   5    13    3   10    7   12    8   2"
*clev = "  0.1  0.2  0.3  0.5  0.7  1.0  1.3  1.7  2.3  3.0"
ccol = " 0   52   10    3   13    5   11   44   1"
clev = "  0.1  0.2  0.3  0.4  0.5  0.6  0.8  1.0"
"set gxout shaded" ; "set ccols "ccol ; "set clevs "clev
"d lat" ; "q shades" ; _shadea = result ; "clear"
*ccol = "41    47     48    49   50   51"
*clev = "   .001   .002    .005  0.01  0.02"
"set gxout shaded" ; "set ccols "ccol ; "set clevs "clev
"d lat" ; "q shades" ; _shadeb = result ; "clear"
"close 1"

a = 1 ; c = 1
while (a < 3)
  b = 1
  while (b < 3)
    vref = 0.5
*   ccol = "41   42   43   44   45   46   47   48   49   50   51"
    ccol = " 0   52   10    3   13    5   11   44   1"
    clev = "  0.1  0.2  0.3  0.4  0.5  0.6  0.8  1.0"
*   clev = "  0.2  0.4  0.6  0.8  1.0  1.2  1.4  1.6  1.8  2.0"
    if (a = 1)
      if (b = 1)
        "sdfopen "stemgeo"000000-GLOBCURRENT-L4-CUR-ALT-geostrophic-v01.0-fv01.0.nc"
        uvar = "eastward_geostr"
        vvar = "northward_geost"
      else
        "sdfopen "stemall"0000-GLOBCURRENT-L4-STK-WW3-Ifremer-v01.0-fv01.0.nc"
        uvar = "eastward_stokes"
        vvar = "northward_stoke"
      endif
    endif
    if (a = 2)
      if (b = 1)
        "sdfopen "stemall"0000-GLOBCURRENT-L4-CUR-ALT-ekman_hs-v01.0-fv01.0.nc"
        uvar = "eastward_ekman_"
        vvar = "northward_ekman"
      else
       "sdfopen "stemall"0000-GLOBCURRENT-L4-STK-WW3-Ifremer-v01.0-fv01.0.nc"
        "sdfopen slp.2010.nc"
*       ccol = "41   52   53    54    55    56"
*       ccol = " 9    4    5     3     7     8    6"
*       clev = "  972  984   996  1008  1020"
      endif
    endif

    "set vpage "vpage.a.b
    if (a = 1) ; "set ylab on" ; lablat = 1 ; else ; "set ylab off" ; lablat = 0 ; endif
    if (b = 2) ; "set xlab on" ; lablon = 1 ; else ; "set xlab off" ; lablon = 0 ; endif
*"set ylab on" ; "set xlab off"
    "set xlint 20"
    "set ylint 10"
    "set lat "dellat
    "set lon "dellon
*   "set mproj nps"
*   "set display black"

    say label.c ; c = c + 1
    "set gxout shaded"
    "set ccols "ccol
    "set clevs "clev
    if (a = 2 & b = 2)
      "set gxout contour"
      "set cint 8" ; "set ccols 0" ; "set cthick 6"
      "set grads off" ; "set clab off" ; "d slp.2/100" ; "set cthick 3"
      "set shpopts 99" ; "set line 99"
      "draw shp "home"/prog/graphics.grads/lib/www.shapefiles/countries" ; "set line 1 1 6"
      "set cint 8" ; "set ccols 1" ; "set cthick 6"
      "set grads off" ; "set clab on" ; "d slp.2/100" ; "set cthick 3"
*     "set strsiz 0.20 0.20" ; "set line 1 1 6" ; "run disp_gen_latlon 0.15 "lablat" 0 "lablon" 0"
      "set gxout shaded"
      "close 2"
    else
      "set grads off" ; "set clab off" ; "set datawarn off" ; "d mag("uvar","vvar")"
      if (a != b)
        "set gxout stream" ; "set cthick 6" ; "set ccols 0"
        "set strmden -10 1.0 0.15 1"
        "d "uvar";"vvar
        "set cthick 3"
      endif
*     "set strsiz 0.20 0.20" ; "set line 1 1 6" ; "run disp_gen_latlon 0.12 "lablat" 0 "lablon" 0"
      "set shpopts 99" ; "set line 99"
      "draw shp "home"/prog/graphics.grads/lib/www.shapefiles/countries" ; "set line 1 1 6"
    endif
    "run gui_date"
    date = result
    "close 1"
    b = b + 1
  endwhile
  a = a + 1
endwhile

"set vpage off"
"set string 1 c 6"
"set strsiz 0.15 0.15"
a = 1 ; while (a < 5)
  "draw string "label.a
  a = a + 1
endwhile
"draw string 5.5 7.5 "date
"set strsiz 0.10 0.10" ; "set line 1 1 6"
"set grads off" ; inner_cbarn("0.5 0 5.50 2.00 a")
*"set grads off" ; inner_cbarn("0.35 0 2.20 2.90 b")
*"set grads off" ; inner_cbarn("0.35 0 9.00 2.70 c")

*"run gui_print plot.globcurrent"arg
*say "gxprint plot.globcurrent.global."arg".png png white x2200 y1700"
*    "gxprint plot.globcurrent.global."arg".png png white x2200 y1700"
*say "gxprint plot.globcurrent.northatl."arg".png png white x2200 y1700"
*    "gxprint plot.globcurrent.northatl."arg".png png white x2200 y1700"
*say "gxprint plot.globcurrent.agulhas."arg".png png white x2200 y1700"
*    "gxprint plot.globcurrent.agulhas."arg".png png white x2200 y1700"
*say "gxprint plot.globcurrent.orkney."arg".png png white x2200 y1700"
*    "gxprint plot.globcurrent.orkney."arg".png png white x2200 y1700"
*say "gxprint plot.globcurrent.tsushima."arg".png png white x3300 y2550"
*    "gxprint plot.globcurrent.tsushima."arg".png png white x3300 y2550"
say "gxprint plot.globcurrent.brochure-2."arg".png png white x2200 y1700"
    "gxprint plot.globcurrent.brochure-2."arg".png png white x2200 y1700"
"quit"


function inner_decomp(args)
  lef = subwrd(args,1)
  rig = subwrd(args,2)
  wid = subwrd(args,3)
  num = subwrd(args,4)
  _retmid.1   = lef + wid / 2
  _retmid.num = rig - wid / 2
  a = 2
  while (a < num)
    _retmid.a = (_retmid.num * (a-1) + _retmid.1 * (num-a)) / (num - 1)
    a = a + 1
  endwhile

  a = 1
  while (a <= num)
    _retlef.a = _retmid.a - wid / 2
    _retrig.a = _retmid.a + wid / 2
    a = a + 1
  endwhile
return

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
  if (svar = "c") ; shdinfo = _shadec ; endif
*say shdinfo
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
    xwid = 0.8

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
