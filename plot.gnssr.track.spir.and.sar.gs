* This script plots either collocated GNSS-R and SAR anomalies (as proxies
* for MSS) or else just SAR alone.  It can be executed using a command like
*
*     grads -blc "plot.gnssr.track.spir.and.sar                          2015-12-03-160500DH.00040.hdr"
*     grads -blc "plot.gnssr.track.spir.and.sar WAV_G1_track00_L1_ZZ.txt 2015-12-03-160500DH.00040.hdr"
*
* - RD September 2016.

function plot(args)
gpsfil = subwrd(args,1)              ; gpsnam = substr(gpsfil,5,3)
if (gpsnam = "G1_" | gpsnam = "G3_") ; gpsnam = substr(gpsfil,5,2) ; endif
hdrfil = subwrd(args,2) ; if (hdrfil = "") ; hdrfil = gpsfil ; gpsfil = "" ; endif
sarfil = substr(hdrfil,1,25)".sar.nc"
resol  = substr(hdrfil,21,5) + 0

fila = hdrfil ; say "reading "fila
a = 0 ; while a < 24 ; filestat = read(fila) ; a = a + 1 ; endwhile
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lats = subwrd(line,2) ;* NumAzimuthSubScenes    310
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lons = subwrd(line,2) ;* NumRangeSubScenes      370
filestat = read(fila)
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lap1 = subwrd(line,2) ;* lat_plane_coefs        60.2999722724       0.0004648163      -0.0028557874      -0.0000000109
                                                    qtxt_lap2 = subwrd(line,3) ;*                                            0.0004648163 
                                                    qtxt_lap3 = subwrd(line,4) ;*                                                              -0.0028557874
                                                    qtxt_lap4 = subwrd(line,5) ;*                                                                                 -0.0000000109
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lop1 = subwrd(line,2) ;* lon_plane_coefs        39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_lop2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_lop3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_lop4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lai1 = subwrd(line,2) ;* target_lat_plane_coefs 39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_lai2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_lai3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_lai4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_loi1 = subwrd(line,2) ;* target_lon_plane_coefs 39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_loi2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_loi3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_loi4 = subwrd(line,5) ;*                                                                                 -0.0000308856

"set rgb  41 255 255 255"
"set rgb  42 225 225 225"
"set rgb  43 205 205 205"
"set rgb  44 185 185 185"
"set rgb  45 165 165 165"
"set rgb  46 145 145 145"
"set rgb  47 125 125 125"
"set rgb  48 105 105 105"
"set rgb  49  85  85  85"
"set rgb  50  65  65  65"
"set rgb  51  45  45  45"
"set rgb  52  25  25  25"
"set rgb  53   5   5   5"
"set rgb  54 255 120 120"
"set rgb  55 155  80  80"
"set rgb  56 255  40  40"
"set rgb  88   0   0 208" ;* default best track colour
"set rgb  99 210 210 210" ;* default land colour

"sdfopen "sarfil
"set lat  48.480  49.360"
"set lon 280.480 281.616"
*"set lon 280 281.67"
"set mproj off"
"set grid off"
"set clopts 1 4 .08"
"set xlopts 1 4 .095"
"set ylopts 1 4 .095"
"set digsiz 0.05"
defa = "D2R = 3.141592654 / 180.0" ; "define "defa

if (gpsnam = "G1" | gpsnam = "G3")
  va = 0.000 ; vb = 0.005 ; vc = 0.010 ; vd = 0.015 ; ve = 0.020 ; vf = 0.025 ; vg = 0.030 ; vh = 0.035 ; vi = 0.040 ; vj = 0.045 ; vk = 0.050
else
  va = 0.070 ; vb = 0.075 ; vc = 0.080 ; vd = 0.085 ; ve = 0.090 ; vf = 0.095 ; vg = 0.100 ; vh = 0.105 ; vi = 0.110 ; vj = 0.115 ; vk = 0.120
endif

"set gxout grfill"                                                            ;* get shading scheme for GNSS-R MSS
"set ccols 41    42    43    44    45    46    47    48    49    50    51    52"
"set clevs   "va"  "vb"  "vc"  "vd"  "ve"  "vf"  "vg"  "vh"  "vi"  "vj"  "vk
"set grads off" ; "d sice"
"q shades" ; _shadea = result
"clear"

"set vpage 2.0 9.0 0.25 8.0"                                                  ;* plot sigo or its anomaly
"set xlab off"
"set ylab off"
"set gxout grfill"
*"set ccols  9    14     4    11     5    13     3    10     7    12     8     2"
*"set clevs   -27.0 -26.0 -25.0 -24.5 -24.0 -23.5 -23.0 -22.5 -22.0 -21.0 -20.0"
if (gpsfil = "")
  "set ccols  9    14     4    11    13    10    12     8     2"
  "set clevs   -27.0 -26.0 -25.0 -24.0 -23.0 -22.0 -21.0 -20.0"
  "set grads off" ; "d sigo"
else
  "set grads off" ; "d sice"
endif
"q shades" ; _shadeb = result

*gpsfil = "WAV_G1_track00_L1_ZZ.txt"
if (gpsfil != "")                                                             ;* include the GNSS-R MSS tracks
"q gxinfo"
line3 = sublin(result,3)
line4 = sublin(result,4)
x1 = subwrd(line3,4)
x2 = subwrd(line3,6)
y1 = subwrd(line4,4)
y2 = subwrd(line4,6)
"set clip "x1" "x2" "y1" "y2
say "reading "gpsfil
filestat = read(gpsfil)
while (sublin(filestat,1) = 0)
  line = sublin(filestat,2)
  drop_tlat = subwrd(line,1)
  drop_tlon = subwrd(line,2)
  drop_ilat = qtxt_lai1 + qtxt_lai2 * drop_tlon + qtxt_lai3 * drop_tlat + qtxt_lai4 * drop_tlat * drop_tlon
  drop_ilon = qtxt_loi1 + qtxt_loi2 * drop_tlon + qtxt_loi3 * drop_tlat + qtxt_loi4 * drop_tlat * drop_tlon
  drop_ideg = subwrd(line,9)
  drop_wspd = subwrd(line,7)
  if                   (drop_wspd < va) ; drop_colr = 41 ; endif
  if (drop_wspd >= va & drop_wspd < vb) ; drop_colr = 42 ; endif
  if (drop_wspd >= vb & drop_wspd < vc) ; drop_colr = 43 ; endif
  if (drop_wspd >= vc & drop_wspd < vd) ; drop_colr = 44 ; endif
  if (drop_wspd >= vd & drop_wspd < ve) ; drop_colr = 45 ; endif
  if (drop_wspd >= ve & drop_wspd < vf) ; drop_colr = 46 ; endif
  if (drop_wspd >= vf & drop_wspd < vg) ; drop_colr = 47 ; endif
  if (drop_wspd >= vg & drop_wspd < vh) ; drop_colr = 48 ; endif
  if (drop_wspd >= vh & drop_wspd < vi) ; drop_colr = 49 ; endif
  if (drop_wspd >= vi & drop_wspd < vj) ; drop_colr = 50 ; endif
  if (drop_wspd >= vj & drop_wspd < vk) ; drop_colr = 51 ; endif
  if (drop_wspd >= vk)                  ; drop_colr = 52 ; endif
  "q w2xy "drop_ilon" "drop_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
  "set line "drop_colr" 1 5" ; "draw mark 3 "obsx" "obsy"  0.09" ; "set line 1 1 5"
  filestat = read(gpsfil)
endwhile
filestat = close(gpsfil)
endif
*gpsfil = ""

"set gxout contour" ; "set grads off" ; "set clab off" ; "set clevs 1000" ; "d sigo"
"set strsiz 0.09 0.09"
"set line 1 1 4"
"run disp_sar_latlon 0.05 1 1 1 1 1 2"
"set vpage off"

"set strsiz 0.20"
"set string 1 bc 5"
if (gpsfil = "")
  "draw string 5.50 8.00 Sentinel-1a `3s`0`bO`aHH`n (dB) at "resol"-m"
  "set grads off" ; inner_cbarn("1.00 1 10.00 4.25 b")
else
  a = 1 ; while (substr(gpsfil,a,1) != "0") ; a = a + 1 ; endwhile
  stem = substr(gpsfil,1,a-1)
  a = 0 ; while (a < 8)
    tarfil = substr(sarfil,1,25)".hdr"
    if (a = 0) ; corfil = "data_skyvan/"stem"01_L1_AB.nc.txt_"tarfil".cor" ; endif
    if (a = 1) ; corfil = "data_skyvan/"stem"02_L1_BA.nc.txt_"tarfil".cor" ; endif
    if (a = 2) ; corfil = "data_skyvan/"stem"03_L1_CD.nc.txt_"tarfil".cor" ; endif
    if (a = 3) ; corfil = "data_skyvan/"stem"04_L1_DC.nc.txt_"tarfil".cor" ; endif
    if (a = 4) ; corfil = "data_skyvan/"stem"05_L1_AB.nc.txt_"tarfil".cor" ; endif
    if (a = 5) ; corfil = "data_skyvan/"stem"06_L1_BA.nc.txt_"tarfil".cor" ; endif
    if (a = 6) ; corfil = "data_skyvan/"stem"07_L1_CD.nc.txt_"tarfil".cor" ; endif
    if (a = 7) ; corfil = "data_skyvan/"stem"08_L1_DC.nc.txt_"tarfil".cor" ; endif
    say "reading "corfil
    filestat = read(corfil)
    line = sublin(filestat,2)
    group = subwrd(line,1)
    track = subwrd(line,2)
    corav = subwrd(line,3)
    corav = math_format("%5.2f", corav)
    filestat = close(corfil)
    "draw string 7.0 "4.5-a*0.4" "track":"corav
    a = a + 1
  endwhile
  "draw string 5.50 7.70 Anomalous `3s`0`bO`aHH`n (dB) and "gpsnam" MSS"
  "set grads off" ; inner_cbarn("1.00 1  1.60 4.25 a")
  "set grads off" ; inner_cbarn("1.00 1  9.70 4.25 b")
endif

if (gpsfil = "")
  plotnam = "plot."sarfil
else
  plotnam = gpsfil"_"substr(sarfil,1,29)
endif
#"run gui_print_colour "plotnam
say "printim "plotnam".png png white x1100 y850"
    "printim "plotnam".png png white x1100 y850"
"quit"


function inner_cbarn(args)

sf=subwrd(args,1)
vert=subwrd(args,2)
xmid=subwrd(args,3)
ymid=subwrd(args,4)
aorb=subwrd(args,5)

if(sf='');sf=1.0;endif

*
*  Check shading information
*
*  'query shades'
  if aorb = 'a' ; shdinfo = _shadea ; endif
  if aorb = 'b' ; shdinfo = _shadeb ; endif
*say shdinfo
  if (subwrd(shdinfo,1)='None')
    say 'Cannot plot color bar: No shading information'
    return
  endif

*
*  Get plot size info
*
*"set vpage off"
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
#RD    'set string 1 l 3'
    'set string 1 r 3'
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
    'set string 1 tc 3'
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

* drop_wspd = subwrd(line,5) - (subwrd(line,4) / 2.0 / math_sin(drop_ideg * 3.141592654 / 180.0))
* if                     (drop_wspd < 13.0) ; drop_colr =  9 ; endif
* if (drop_wspd >= 13.0 & drop_wspd < 13.5) ; drop_colr = 14 ; endif
* if (drop_wspd >= 13.5 & drop_wspd < 14.0) ; drop_colr =  4 ; endif
* if (drop_wspd >= 14.0 & drop_wspd < 14.5) ; drop_colr = 11 ; endif
* if (drop_wspd >= 14.5 & drop_wspd < 15.0) ; drop_colr =  5 ; endif
* if (drop_wspd >= 15.0 & drop_wspd < 15.5) ; drop_colr = 13 ; endif
* if (drop_wspd >= 15.5 & drop_wspd < 16.0) ; drop_colr =  3 ; endif
* if (drop_wspd >= 16.0 & drop_wspd < 16.5) ; drop_colr = 10 ; endif
* if (drop_wspd >= 16.5 & drop_wspd < 17.0) ; drop_colr =  7 ; endif
* if (drop_wspd >= 17.0 & drop_wspd < 17.5) ; drop_colr = 12 ; endif
* if (drop_wspd >= 17.5 & drop_wspd < 18.0) ; drop_colr =  8 ; endif
* if (drop_wspd >= 18.0)                    ; drop_colr =  2 ; endif
