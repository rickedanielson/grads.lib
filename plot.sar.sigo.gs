* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -bpc "plot.sar.sigo 2006-08-10_G0462427.00025.sar.nc"
*
* - RD April 2004.

function plot(arg)

stem     = substr(arg,1,25)
stemstem = substr(arg,1,19)
resol    = substr(arg,21,5)
obsfile  = substr(arg,1,25)".ctl"
estfile  = substr(arg,1,25)".est.ctl"

a = 1
while (a < 6)
  if (substr(resol,a,1) = 0)
    shift = a
  else
    a = 5
  endif
  a = a + 1
endwhile
resol = substr(resol,shift+1,5-shift)

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

"sdfopen "arg
#"open "obsfile
#"open "estfile

"clear"
"set grads off"
"set grid off"
"set xlab off"
"set ylab off"
#"set digsiz 0.03"
"set gxout grfill"
#"set grads off" ; "d sigo"
#"d const(sigo,0,-u)+const(mask,0,-u)"
#"set ccols   9  14   4  11   5  13   3  10   7   12   8   2   6"
#"set clevs   -18  -17 -16 -15 -14 -13 -12 -11 -10  -9  -8  -7"
"set ccols   9  14   4  11   5  13   3  10   7   12   8   2"
"set clevs   -40 -37 -34 -31 -28 -25 -22 -19 -16  -13  -10"
"set grads off" ; "d sigo*-13/(0.015*angl*angl-1.69*angl+23.95)"
"q gxinfo" ; _gxinfo = result ; "q shades" ; _shades = result
"set grads off" ; inner_cbarn("1.0 0 4.25 1.00")
#"set gxout barb"
#"set grads off" ; "d uwnd;skip(vwnd,8)"
#"set gxout contour"
#"set clevs 0.5"
#"set clab off"
#"set cthick 20"
#"set grads off" ; "d land"
#"set cthick 5"
#"set gxout model"
#"set mdlopts dig3"
#"set digsiz 0.22"
#"set ccolor 1"
#"set cthick 15"
#"set grads off" ; "d uwnd.2;vwnd.2"
#"set ccolor 6"
#"d uwnd.3;vwnd.3"
#"set gxout contour"

fila = stem".hdr"
say "reading "fila
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
direction = subwrd(line,2)

filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
beam = subwrd(line,2)

filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
word = subwrd(line,4)
date = substr(word,1,10)
word = subwrd(line,3)
time = substr(word,1,5)

"draw title "resol"-m "beam" "date" "time" UTC"
"q gxinfo"
rec = sublin(result,2)
pagex = subwrd(rec,4)
pagey = subwrd(rec,6)
y = pagey + 0.1
"set string 1 c 5"
pagex = pagex / 2
#"draw string "pagex" 0.3 "time

#"run gui_header date"
"set strsiz 0.08 0.08"
"set strsiz 0.1 0.1"
#"run disp_sar_latlon"

"run gui_print_colour plot."stem
#say "printim plot."stem".gif gif white x850 y1100"
#    "printim plot."stem".gif gif white x850 y1100"
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
