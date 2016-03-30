* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -bpc "z_plot_fig44 all.col.var.nc"
*     grads -bpc "z_plot_fig44 all.col.var.pert.nc"
*
* - RD April 2004.

function plot(sarfile)

"set rgb    42     0    0    0"
"set rgb    43    30   30   30"
"set rgb    44    50   50   50"
"set rgb    45    70   70   70"
"set rgb    46    90   90   90"
"set rgb    47   110  110  110"
"set rgb    48   130  130  130"
"set rgb    49   150  150  150"
"set rgb    50   170  170  170"
"set rgb    51   190  190  190"
"set rgb    52   210  210  210"

vpage.1  = "1.1  4.4  7.3  10.3"
vpage.2  = "1.1  4.4  3.8   6.8"
vpage.4  = "4.9  8.2  7.3  10.3"
vpage.5  = "4.9  8.2  3.8   6.8"
#vpage.1  = "0.5  4.2  7.1  10.8"
#vpage.2  = "0.5  4.2  3.7   7.3"
#vpage.3  = "0.5  4.2  0.2   3.9"
#vpage.4  = "4.3  8.0  7.1  10.8"
#vpage.5  = "4.3  8.0  3.7   7.3"
#vpage.6  = "4.3  8.0  0.2   3.9"

label.1 = "2.75 10.4 Wind Speed (ms`a-1`n)"
label.2 = "2.75 6.9  U-Wind (ms`a-1`n)"
label.4 = "6.55 10.4 Wind Direction (deg)"
label.5 = "6.55 6.9  V-Wind (ms`a-1`n)"
#label.1 = "2.35 10.6 a) Wind Speed (m s`a-1`n)"
#label.2 = "2.35 7.1  b) U-Wind (m s`a-1`n)"
#label.3 = "2.35 3.7  c) U and V Wind (m s`a-1`n)"
#label.4 = "6.15 10.6 d) Wind Direction (deg)"
#label.5 = "6.15 7.1  e) V-Wind (m s`a-1`n)"
#label.6 = "6.15 3.7  f) Radar Cross Section (dB)"

"sdfopen "sarfile
"set mproj off"
"set grid off"
"set clopts 1 3 .19"
"set xlopts 1 4 .135 .15"
"set ylopts 1 4 .135 .15"
"set dignum 2"
"set digsiz 0.07 0.08"
"q file"
line = sublin(result,5)
levs = subwrd(line,9)
tiny = 1e-4

g = 1
while (g <= levs)
  "set z "g
  "q dims"
  line = sublin(result,4)
  leval = subwrd(line,6)

a = 1
while (a < 2)
  if (a = 1) ; var = "eo" ; titla = "Analysis Error" ; endif
  if (a = 2) ; var = "eg" ; titla = "Analysis Error" ; endif
  if (a = 3) ; var = "go" ; titla = "GEM Error" ; endif
  b = 1
  while (b < 2)
    if (b = 1) ; end = "std" ; title = titla" STD"  ; endif
    if (b = 2) ; end = "avg" ; title = titla" Bias" ; endif
    if (b = 3) ; end = "rms" ; title = titla" RMS" ; endif
    if (a = 1) ; title = title" vs Buoys" ; endif
    if (a = 2) ; title = title" vs GEM"   ; endif
    if (a = 3) ; title = title" vs Buoys" ; endif
    var.1 = var"wspd"end
    var.2 = var"uwnd"end
    var.3 = var"wind"end
    var.4 = var"wdir"end
    var.5 = var"vwnd"end
    var.6 = var"sigo"end
    ref.1 = "gowspd"end
    ref.2 = "gouwnd"end
    ref.3 = "gowind"end
    ref.4 = "gowdir"end
    ref.5 = "govwnd"end
    ref.6 = "gosigo"end

    c = 1
    while (c < 7)
      if (c != 3 & c != 6)
      "set parea "vpage.c
      if (c = 2 | c = 5) ; "set xlab on" ; else ; "set xlab off" ; endif
      if (c < 4)         ; "set ylab on" ; else ; "set ylab off" ; endif
      "set gxout stat" ; "d "ref.c ; line = sublin(result,8) ; masklev = subwrd(line,4)
                         "d "var.c ; line = sublin(result,8) ; minlev  = subwrd(line,4) + tiny
      "set gxout grfill"
      "set gridln off"
      "set lat -1.5 5.5"
      "set lon -1.5 4.5"
#      "set xlpos -0.1 b"
#      "set clip 0 8.5 0 11"
      "set xlabs | 0 | | 5 | | 15 | | 35 | | 75 | | 155 |"
      "set ylabs | 1e-4 | | 0.5 | | 1.5 | | 3.5 | | 7.5 | | 15.5 | | 31.5 |"
      "set grads off" ; "d "var.c
#      "set datawarn off"
#      "set grads off" ; "d const(maskout(1,"minlev"-"var.c"),0,-u)"
#      "set gxout shaded"
      "set gxout contour"
      "set cthick 10"
      "set clab off"
      "set clevs 0.5"
      "set grads off" ; "d const(maskout(1,"masklev"-"var.c"),0,-u)"
      "set ccolor 4"
      "set cstyle 5"
      "set clevs 0.65"
      "set grads off" ; "d const(maskout(1,"minlev"-"var.c"),0,-u)"
#     "set clab on"
#     "q gxinfo" ; _gxinfo = result ; "q shades" ; _shades = result
#     "set grads off" ; inner_cbarn("0.5 1 6.65 8.5")
      "set gxout grid"
      "set cthick 2"
      "set grads off" ; "d "var.c
      endif
      c = c + 1
    endwhile

    "set vpage off"
#    "set strsiz 0.14 0.14"
#    "set string 1 bc 3"
    "set strsiz 0.17 0.17"
    "set string 1 bc 6"
    c = 1
    while (c < 7)
      if (c != 3 & c != 6)
      "draw string "label.c
      endif
      c = c + 1
    endwhile
#   "draw string 4.25 10.85 "title" (derr = "leval")"
#   "draw string 4.25  0.05 SAR Error Model - Length Scale (km)"
#   "set string 1 bc 3 90"
#   "draw string 0.15  5.45 SAR Error Model - Fractional Magnitude (%)"
    "draw string 4.65 10.80 Analysis - Buoy Standard Deviation"
    "draw string 4.65  3.20 SAR Error Length Scale (km)"
    "set string 1 bc 6 90"
    "draw string 0.20  7.15 SAR Error (% of SAR Obs)"
    "set string 1 bc 3 0"

    "printim       "sarfile"."var"."end"."g".gif gif white x850 y1100"
    "run gui_print "sarfile"."var"."end"."g
    "clear"
    b = b + 1
  endwhile
  a = a + 1
endwhile
g = g + 1
endwhile
"quit"


*  The script will assume a colorbar is wanted even if there is 
*  not room -- it will plot on the side or the bottom if there is
*  room in either place, otherwise it will plot along the bottom and
*  overlay labels there if any.  This can be dealt with via 
*  the 'set parea' command.  In version 2 the default parea will
*  be changed, but we want to guarantee upward compatibility in
*  sub-releases.
*
*	run cbarn sf vert xmid ymid
*
*	sf   - scale the whole bar 1.0 = original 0.5 half the size, etc.
*	vert - 0 FORCES a horizontal bar = 1 a vertical bar
*	xmid - the x position on the virtual page the center the bar
*	ymid - the x position on the virtual page the center the bar

function inner_cbarn(args)

sf=subwrd(args,1)
vert=subwrd(args,2)
xmid=subwrd(args,3)
ymid=subwrd(args,4)

if(sf='');sf=1.0;endif

*
*  Check shading information
*
*  'query shades'
  shdinfo = _shades
say shdinfo
  if (subwrd(shdinfo,1)='None') 
    say 'Cannot plot color bar: No shading information'
    return
  endif

* 
*  Get plot size info
*
*"set vpage off"
*  'query gxinfo'
  result = _gxinfo
say result
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
  strxsiz=0.20*sf
  strysiz=0.21*sf
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
*	logic for setting the bar orientation with user overides
*
  if (ylo<ylolim | xd>xdlim1)
    vchk = 1
    if(vert = 0) ; vchk = 0 ; endif
  else
    vchk = 0
    if(vert = 1) ; vchk = 1 ; endif
  endif
*
*	vertical bar
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
#RD    'set string 1 l 3'
    'set string 1 r 3'
    vert = 1

  else

*
*	horizontal bar
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
    'set string 1 tc 3'
    vert = 0
  endif


*
*  Plot colorbar
*


  'set strsiz 'strxsiz' 'strysiz
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
        'set line 1 1 3'
        'draw line 'xl' 'yt' 'xm' 'yb
        'draw line 'xm' 'yb' 'xr' 'yt
        'draw line 'xr' 'yt' 'xl' 'yt
      else
        ym = (yb+yt)*0.5
        'set line 'col
        'draw polyf 'xl' 'ym' 'xr' 'yb' 'xr' 'yt' 'xl' 'ym
        'set line 1 1 3'
        'draw line 'xl' 'ym' 'xr' 'yb
        'draw line 'xr' 'yb' 'xr' 'yt
        'draw line 'xr' 'yt' 'xl' 'ym
      endif
    endif

*   Draw the middle boxes
    if (num!=0 & num!= cnum-1)
      'set line 'col
      'draw recf 'xl' 'yb' 'xr' 'yt
      'set line 1 1 3'
      'draw rec  'xl' 'yb' 'xr' 'yt
    endif

*   Draw the right/top triangle
    if (num = cnum-1)
      if (vert = 1)
        'set line 'col
        'draw polyf 'xl' 'yb' 'xm' 'yt' 'xr' 'yb' 'xl' 'yb
        'set line 1 1 3'
        'draw line 'xl' 'yb' 'xm' 'yt
        'draw line 'xm' 'yt' 'xr' 'yb
        'draw line 'xr' 'yb' 'xl' 'yb
      else
        'set line 'col
        'draw polyf 'xr' 'ym' 'xl' 'yb' 'xl' 'yt' 'xr' 'ym
        'set line 1 1 3'
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
