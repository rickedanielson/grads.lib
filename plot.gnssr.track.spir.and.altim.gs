* This script plots collocated GNSS-R and conventional altimetry
* and can be executed using a command like
*
*     grads -blc "plot.gnssr.track.spir.and.altim JA2_GPN_2PdP273_092_20151203_155445_20151203_165058.nc.txt WAV_G1_track00_L1_ZZ.txt windgps"
*     grads -blc "plot.gnssr.track.spir.and.altim JA2_GPN_2PdP273_092_20151203_155445_20151203_165058.nc.txt WAV_G1_track00_L1_ZZ.txt wavegps"
*     grads -blc "plot.gnssr.track.spir.and.altim JA2_GPN_2PdP273_092_20151203_155445_20151203_165058.nc.txt WAV_G1_track00_L1_ZZ.txt hghtgps"
*     grads -blc "plot.gnssr.track.spir.and.altim JA2_GPN_2PdP273_092_20151203_155445_20151203_165058.nc.txt WAV_G1_track00_L1_ZZ.txt windalt"
*     grads -blc "plot.gnssr.track.spir.and.altim JA2_GPN_2PdP273_092_20151203_155445_20151203_165058.nc.txt WAV_G1_track00_L1_ZZ.txt wavealt"
*     grads -blc "plot.gnssr.track.spir.and.altim JA2_GPN_2PdP273_092_20151203_155445_20151203_165058.nc.txt WAV_G1_track00_L1_ZZ.txt hghtalt"
*
* - RD September 2016.

function plot(args)

see = 1                                                            ;* view land (1=yes, 0=no)
alt = subwrd(args,1)
gps = subwrd(args,2)
chk = subwrd(args,3)

alok = 0 ; filestat = read(alt) ; if (sublin(filestat,1) != 0) ; say alt" is not available" ; else ; alok = 1 ; filestat = close(alt) ; endif
gpok = 0 ; filestat = read(gps) ; if (sublin(filestat,1) != 0) ; say gps" is not available" ; else ; gpok = 1 ; filestat = close(gps) ; endif
* if (sfok = 0 & drok = 0) ; "quit" ; endif

"set rgb  41 255 255 255"
"set rgb  42 200 255 200"
"set rgb  43 160 205 160"
"set rgb  44 120 255 120"
"set rgb  45  80 155  80"
"set rgb  46  40 255  40"
"set rgb  47 200 200 255"
"set rgb  48 160 160 205"
"set rgb  49 120 120 255"
"set rgb  50  80  80 155"
"set rgb  51  40  40 255"
"set rgb  52 255 200 200"
"set rgb  53 205 160 160"
"set rgb  54 255 120 120"
"set rgb  55 155  80  80"
"set rgb  56 255  40  40"
"set rgb  88   0   0 208" ;* default best track colour
"set rgb  99 210 210 210" ;* default land colour

"sdfopen data_ecmwf/interim_2015-12-01_2015-12-05_oper.nc"
"sdfopen data_ecmwf/interim_2015-12-01_2015-12-05_wave.nc"
"set lat 59.70 60.45"
"set lon 25.05 26.85"
"set mpdset hires"
"set mpt * 1 1 10"
"set grid off"
"set clopts 1 4 .08"
"set xlopts 1 4 .095"
"set ylopts 1 4 .095"
"set digsiz 0.05"
defa = "D2R = 3.141592654 / 180.0" ; "define "defa

if (chk = "windgps" | chk = "windalt")
  va =  3.0 ; vb =  4.0 ; vc =  5.0 ; vd =  6.0 ; ve =  7.0 ; vf =  8.0 ; vg =  9.0 ; vh = 10.0 ; vi = 11.0 ; vj = 12.0 ; vk = 13.0
endif
if (chk = "wavegps" | chk = "wavealt")
  va = 0.2  ; vb = 0.4  ; vc = 0.6  ; vd = 0.8  ; ve = 1.0  ; vf = 1.2  ; vg = 1.4  ; vh = 1.6  ; vi = 1.8  ; vj = 2.0  ; vk = 2.2
endif
if (chk = "hghtgps" | chk = "hghtalt")
  va = 13.0 ; vb = 13.5 ; vc = 14.0 ; vd = 14.5 ; ve = 15.0 ; vf = 15.5 ; vg = 16.0 ; vh = 16.5 ; vi = 17.0 ; vj = 17.5 ; vk = 18.0
endif

"set xlint 0.2" ; "set ylint 0.1"
"set grads off" ; "set clab off" ; "set clevs 0" ; "d msl/100"
"set gxout grfill"
"set ccols  9   14    4   11    5   13    3   10    7   12    8    2"
"set clevs   "va" "vb" "vc" "vd" "ve" "vf" "vg" "vh" "vi" "vj" "vk
"set xlint 0.2" ; "set ylint 0.1"
"set grads off" ; "set clab off" ; "d msl/100"
"q shades" ; _shades = result

"clear"
"set gxout contour"
"set xlint 0.2" ; "set ylint 0.1"
"set grads off" ; "set clab off" ; "set clevs 0" ; "d msl/100"

if (1 = 1)
  if (chk = "windgps" | chk = "wavegps") ; drop = gps ; endif
  if (chk = "windalt" | chk = "wavealt") ; drop = alt ; endif
  "q gxinfo"
  line3 = sublin(result,3)
  line4 = sublin(result,4)
  x1 = subwrd(line3,4)
  x2 = subwrd(line3,6)
  y1 = subwrd(line4,4)
  y2 = subwrd(line4,6)
  "set clip "x1" "x2" "y1" "y2
  say "reading "drop
  filestat = read(drop)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    drop_ilat = subwrd(line,1)
    drop_ilon = subwrd(line,2)
*   gpspars = ["latitude_spec", "longitude_spec", "height_rcv",           "atmospheric_delay", "SSH",   "sigma_SSH",      "mss_snr_max", "mss_snr_der", "elevation_txr"]
    if (chk = "windgps")
      drop_wspd = subwrd(line,7)
    endif
    if (chk = "wavegps")
      drop_wspd = subwrd(line,7)
    endif
    if (chk = "hghtgps")
      drop_ideg = subwrd(line,9)
      drop_wspd = subwrd(line,5) - (subwrd(line,4) / 2.0 / math_sin(drop_ideg * 3.141592654 / 180.0))
    endif
*   altpars = ["lat",           "lon",            "rad_distance_to_land", "swh_ku",            "swh_c", "wind_speed_alt", "range_ku",    "range_c",     "alt"]
    if (chk = "windalt")
      drop_wspd = subwrd(line,6)                                              ;* wind_speed_alt
    endif
    if (chk = "wavealt")
      drop_wspd = subwrd(line,4)                                              ;* swh_ku
    endif
    if (chk = "hghtalt")
      drop_wspd = subwrd(line,7)                                              ;* alt - range_ku (precalculated)
    endif
    if                   (drop_wspd < va) ; drop_colr =  9 ; endif
    if (drop_wspd >= va & drop_wspd < vb) ; drop_colr = 14 ; endif
    if (drop_wspd >= vb & drop_wspd < vc) ; drop_colr =  4 ; endif
    if (drop_wspd >= vc & drop_wspd < vd) ; drop_colr = 11 ; endif
    if (drop_wspd >= vd & drop_wspd < ve) ; drop_colr =  5 ; endif
    if (drop_wspd >= ve & drop_wspd < vf) ; drop_colr = 13 ; endif
    if (drop_wspd >= vf & drop_wspd < vg) ; drop_colr =  3 ; endif
    if (drop_wspd >= vg & drop_wspd < vh) ; drop_colr = 10 ; endif
    if (drop_wspd >= vh & drop_wspd < vi) ; drop_colr =  7 ; endif
    if (drop_wspd >= vi & drop_wspd < vj) ; drop_colr = 12 ; endif
    if (drop_wspd >= vj & drop_wspd < vk) ; drop_colr =  8 ; endif
    if (drop_wspd >= vk)                  ; drop_colr =  2 ; endif
    "q w2xy "drop_ilon" "drop_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    dotsize = 0.09 ; if (chk = "windalt" | chk = "wavealt" | chk = "hghtalt") ; dotsize = 0.19 ; endif
    "set line "drop_colr" 1 5" ; "draw mark 3 "obsx" "obsy" "dotsize ; "set line 1 1 5"
    filestat = read(drop)
  endwhile
  filestat = close(drop)
endif

"set grads off" ; "set clab off" ; "set clevs 0" ; "d msl/100"                ;* plot ECMWF vector field
if (chk = "windgps" | chk = "windalt")
  "set ccolor 1" ; "set arrscl 0.6 10" ; "d u10(t=11);v10(t=11)"
endif
if (chk = "wavegps" | chk = "wavealt")
  "set ccolor 1" ; "d -swh.2(t=11)*sin(mwd.2(t=11)*3.141592654/180.0);-swh.2(t=11)*cos(mwd.2(t=11)*3.141592654/180.0)"
* "set gxout shaded" ; "d swh.2(t=11)"
  "run basemap L 0 1"
endif
if (chk = "hghtgps" | chk = "hghtalt")
  "set ccolor 1"
endif

"set strsiz 0.18"
"set string 1 bc 5"
if (chk = "windgps") ; "draw string 5.50 7.00 ECMWF Interim 10-m wind (m/s) 12 UTC 3 December 2015" ; endif
if (chk = "wavegps") ; "draw string 5.50 7.00 ECMWF Interim SWH (m) 12 UTC 3 December 2015"         ; endif
if (chk = "hghtgps") ; "draw string 5.50 7.00 ECMWF Interim Altimetry (m) 12 UTC 3 December 2015"   ; endif
if (chk = "windalt") ; "draw string 5.50 7.00 JASON-2 10-m wind speed (m/s) 16 UTC 3 December 2015" ; endif
if (chk = "wavealt") ; "draw string 5.50 7.00 JASON-2 SWH (m) 16 UTC 3 December 2015"               ; endif
if (chk = "hghtalt") ; "draw string 5.50 7.00 JASON-2 Altimetry (m) 16 UTC 3 December 2015"         ; endif
"set grads off" ; inner_cbarn("0.80 0 4.20 1.20")

*"set string 1 l 6"
*"draw string 2.2 7.6 Best Track ("btxt_ty")"
*"set line  1 1  5" ; "draw mark 3 1.75 7.60 0.17"
*"set line  0 1  5" ; "draw mark 3 1.75 7.60 0.10"
*spd = math_format("%.0f",best_vmax)
*"set string 1 c 6"
*"set strsiz 0.10" ; xpos = 5.5 ; ypos = 8.4 ; ydel = 0.15

if (chk = "windgps") ; plotnam = "plot.ECMWF.wind."gps ; endif
if (chk = "wavegps") ; plotnam = "plot.ECMWF.wave."gps ; endif
if (chk = "hghtgps") ; plotnam = "plot.ECMWF.hght."gps ; endif
if (chk = "windalt") ; plotnam = "plot.ECMWF.wind."alt ; endif
if (chk = "wavealt") ; plotnam = "plot.ECMWF.wave."alt ; endif
if (chk = "hghtalt") ; plotnam = "plot.ECMWF.hght."alt ; endif

#"run gui_print_colour "plotnam
say "printim "plotnam".png png white x1100 y850"
    "printim "plotnam".png png white x1100 y850"
"quit"


*     drop_delh = drop_delh + subwrd(line,6) ; drop_numb = drop_numb + 1

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



*gridpoints = 50
*qtxt_ibai = math_format('%.0f',qtxt_ibat)
*qtxt_iboi = math_format('%.0f',qtxt_ibon)
*minbat = qtxt_ibai - gridpoints; maxbat = qtxt_ibai + gridpoints
*minbon = qtxt_iboi - gridpoints; maxbon = qtxt_iboi + gridpoints
*if (minbat < 1) ; minbat = 1 ; endif ; if (maxbat > qtxt_lats) ; maxbat = qtxt_lats ; endif
*if (minbon < 1) ; minbon = 1 ; endif ; if (maxbon > qtxt_lons) ; maxbon = qtxt_lons ; endif
*say minbat" "qtxt_ibai" "maxbat" "maxbat-minbat
*say minbon" "qtxt_iboi" "maxbon" "maxbon-minbon

*pixelsize = 4.5 * (maxbon - minbon) / (2 * gridpoints)
*xpic = 2 ; string = "0.50 10.50 "pixelsize" "xpic ; inner_decomp(string)
*a = 1 ; while (a <= xpic) ; lef.a = _retlef.a ; clr.a = _retmid.a ; rig.a = _retrig.a ; a = a + 1 ; endwhile

*pixelsize = 4.5 * (maxbat - minbat) / (2 * gridpoints)
*ypic = 1 ; string = "1.20 6.20 "pixelsize" "ypic ; inner_decomp(string)
*a = 1 ; while (a <= ypic) ; bot.a = _retlef.a ; cbt.a = _retmid.a ; top.a = _retrig.a ; a = a + 1 ; endwhile

*a = 1 ; while (a <= xpic)
*  b = 1 ; while (b <= ypic)
*    vpage.a.b = lef.a" "rig.a" "bot.b" "top.b
*  b = b + 1 ; endwhile
*a = a + 1 ; endwhile
