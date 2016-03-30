* This script is designed to plot Fig.8 of Ueno and Kunii (2008) with
* observations overlayed.  It can be executed using a command like
*
*     grads -blc "plot.scat.wind.ueno zA.tect"
*
* - RD April 2004.

function plot(arg)
refazimuth = 30 ; if (refazimuth > 90 | refazimuth < -90) ; quit ; endif
cutoff = 6

plotfil = arg
if (plotfil = "zA.tect") ; title = "Arabian Sea / Bay of Bengal" ; endif
if (plotfil = "zC.tect") ; title = "Central/Eastern North Pacific Ocean" ; endif
if (plotfil = "zL.tect") ; title = "Atlantic Ocean" ; endif
if (plotfil = "zP.tect") ; title = "South Pacific Ocean (L-R mirrored)" ; endif
if (plotfil = "zS.tect") ; title = "South Indian Ocean (L-R mirrored)" ; endif
if (plotfil = "zW.tect") ; title = "Western North Pacific Ocean" ; endif
if (plotfil = "zZ.tect") ; title = "Global Oceans (SH is L-R mirrored)" ; endif

xpic = 2 ; string = "1.50  10.50 4.6 "xpic ; inner_decomp(string)
a = 1 ; while (a <= xpic) ; lef.a = _retlef.a ; clr.a = _retmid.a ; rig.a = _retrig.a ; a = a + 1 ; endwhile
ypic = 2 ; string = "0.70  8.20 3.85 "ypic ; inner_decomp(string)
a = 1 ; while (a <= ypic) ; bot.a = _retlef.a ; cbt.a = _retmid.a ; top.a = _retrig.a ; a = a + 1 ; endwhile

a = 1 ; while (a <= xpic)
  b = 1 ; while (b <= ypic)
    if (a = 1 & b = 2) ; titl.a.b = "a) JPL-V2" ; endif
    if (a = 2 & b = 2) ; titl.a.b = "b) JPL-V3" ; endif
    if (a = 1 & b = 1) ; titl.a.b = "c) Neural Net" ; endif
    if (a = 2 & b = 1) ; titl.a.b = "d) JPL-V3 Rain Uncorrected" ; endif
    vpage.a.b = lef.a" "rig.a" "bot.b" "top.b
  b = b + 1 ; endwhile
a = a + 1 ; endwhile

"sdfopen /home/rick/docs/work/fig/xyzzy.scat.nc"
"set mproj off"
"set grid off"
"set mpdraw off"
"set clopts 1 4 .08"
"set xlopts 1 4 .095"
"set ylopts 1 4 .095"
"set digsiz 0.05"
"set rgb  41 200 200 200"
defa = "D2R = 3.141592654 / 180.0" ; "define "defa

a = 1 ; while (a <= xpic)
  b = 1 ; while (b <= ypic)
    "set vpage "vpage.a.b
*   "set xlint 60" ; "set ylint 60"
    "set xlab off" ; "set ylab off"
    "set grads off" ; "set clab off" ; "set clevs 999" ; "d lat"

    low = refazimuth - 90 ; hig = refazimuth + 90
    "q w2xy -180  "low  ; rec = sublin(result,1) ; obsxa = subwrd(rec,3) ; obsya = subwrd(rec,6)
    "q w2xy -180  "hig  ; rec = sublin(result,1) ; obsxb = subwrd(rec,3) ; obsyb = subwrd(rec,6)
    "q w2xy "hig" -180" ; rec = sublin(result,1) ; obsxc = subwrd(rec,3) ; obsyc = subwrd(rec,6)
    "q w2xy "low" -180" ; rec = sublin(result,1) ; obsxd = subwrd(rec,3) ; obsyd = subwrd(rec,6)
    "set line  41 1 5" ; "draw polyf "obsxa" "obsya" "obsxb" "obsyb" "obsxc" "obsyc" "obsxd" "obsyd
    low = refazimuth - 90 ; hig = refazimuth + 90
    "q w2xy  180  "low  ; rec = sublin(result,1) ; obsxa = subwrd(rec,3) ; obsya = subwrd(rec,6)
    "q w2xy  180  "hig  ; rec = sublin(result,1) ; obsxb = subwrd(rec,3) ; obsyb = subwrd(rec,6)
    "q w2xy "hig"  180" ; rec = sublin(result,1) ; obsxc = subwrd(rec,3) ; obsyc = subwrd(rec,6)
    "q w2xy "low"  180" ; rec = sublin(result,1) ; obsxd = subwrd(rec,3) ; obsyd = subwrd(rec,6)
    "set line  41 1 5" ; "draw polyf "obsxa" "obsya" "obsxb" "obsyb" "obsxc" "obsyc" "obsxd" "obsyd

    "q w2xy -180 -180" ; rec = sublin(result,1) ; obsxa = subwrd(rec,3) ; obsya = subwrd(rec,6)
    "q w2xy  180  180" ; rec = sublin(result,1) ; obsxb = subwrd(rec,3) ; obsyb = subwrd(rec,6)
    "set line  1 1 10" ; "draw rec "obsxa" "obsya" "obsxb" "obsyb
    "q w2xy -180    0" ; rec = sublin(result,1) ; obsxa = subwrd(rec,3) ; obsya = subwrd(rec,6)
    "q w2xy  180    0" ; rec = sublin(result,1) ; obsxb = subwrd(rec,3) ; obsyb = subwrd(rec,6)
    "set line  1 1  5" ; "draw line "obsxa" "obsya" "obsxb" "obsyb
    "q w2xy    0 -180" ; rec = sublin(result,1) ; obsxa = subwrd(rec,3) ; obsya = subwrd(rec,6)
    "q w2xy    0  180" ; rec = sublin(result,1) ; obsxb = subwrd(rec,3) ; obsyb = subwrd(rec,6)
    "set line  1 1  5" ; "draw line "obsxa" "obsya" "obsxb" "obsyb

    counta = 0
    countb = 0
    countc = 0
    countd = 0
    counte = 0
    countf = 0
    file = plotfil
    filestat = read(file)
    while (sublin(filestat,1) = 0)                               ;* read the data and plot
      line = sublin(filestat,2)                                  ;* open circles (2) or closed triangles (9)
      btwnd = subwrd(line,1)                                     ;* Best Track cyclone max wind speed (kt)
      tcspd = subwrd(line,2)                                     ;* Best Track cyclone track speed (m/s)
      tcdir = subwrd(line,3)                                     ;* Best Track cyclone track direction (deg)
      shspd = subwrd(line,4)                                     ;* ECMWF deep-layer shear speed (m/s)
      shdir = subwrd(line,5)                                     ;* ECMWF deep-layer shear direction (deg)
      wadir = subwrd(line,7)                                     ;* oldv wavenumber-1 azimuth (deg)
      wbdir = subwrd(line,9)                                     ;* newv wavenumber-1 azimuth (deg)
      wcdir = subwrd(line,11)                                    ;* unco wavenumber-1 azimuth (deg)
      wddir = subwrd(line,13)                                    ;* hwnd wavenumber-1 azimuth (deg)
      wedir = subwrd(line,15)                                    ;* nnet wavenumber-1 azimuth (deg)
      tclat = subwrd(line,17)                                    ;* cyclone  latitude (deg)
      tclon = subwrd(line,18)                                    ;* cyclone longitude (deg)
      lands = subwrd(line,19)                                    ;* minimum distance from cyclone center to land (km)
      deeps = subwrd(line,20)                                    ;* Best Track bracketing 6-h intensity change (kt)
*     if (wadir > -999 & wbdir > -999 & wcdir > -999 & wedir > -999 & lands > 100 & tcspd > 1)
      if (wadir > -999 & wbdir > -999 & wcdir > -999 & wedir > -999 & lands > 100 & tclat > -30 & tclat < 30)
*     if (wcdir > -999 & wedir > -999)
        if (btwnd >= 50)                                           ;* (and mirror the values in the SH)
          wndir = -9999.0;
          if (titl.a.b =                  "a) JPL-V2") ; wndir = wadir ; endif
          if (titl.a.b =                  "b) JPL-V3") ; wndir = wbdir ; endif
          if (titl.a.b = "d) JPL-V3 Rain Uncorrected") ; wndir = wcdir ; endif
          if (titl.a.b =                  "z) H*Wind") ; wndir = wddir ; endif
          if (titl.a.b =              "c) Neural Net") ; wndir = wedir ; endif
*         if (wndir = -9999.0) ; say "wndir not defined so exiting" ; "quit" ; endif
          if (wndir > -999)
            if (tclat < 0) ; wndir = -1.0 * wndir ; else ; shdir = -1.0 * shdir ; endif
            "q w2xy "wndir" "shdir ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
*           if (shspd < tcspd)
            if (shspd < cutoff)
              "set line 1 1 5" ; "draw mark 2 "obsx" "obsy"  0.11" ; "set line 1 1 5"
              if (wndir > 0) ; countc = countc + 1 ; else ; countd = countd + 1 ; endif
              counta = counta + 1
            else
              "set line 1 1 5" ; "draw mark 9 "obsx" "obsy"  0.11" ; "set line 1 1 5"
              countb = countb + 1
              cuta = refazimuth - shdir - 270
              cutb = refazimuth - shdir -  90
              cutc = refazimuth - shdir +  90
              cutd = refazimuth - shdir + 270
              if ((wndir > cuta & wndir < cutb) | (wndir > cutc & wndir < cutd)) ; counte = counte + 1 ; else ; countf = countf + 1 ; endif
            endif
          endif
        endif
      endif
      filestat = read(file)
    endwhile
    filestat = close(file)
    say titl.a.b
    percentc = math_format("%2.0f",100*countc/counta)
    percentd = math_format("%2.0f",100*countd/counta)
    percente = math_format("%2.0f",100*counte/countb)
    percentf = math_format("%2.0f",100*countf/countb)
    say "number of ECMWF shear < "cutoff"m/s   (open circles)   scenes is "counta" ("percentc"% to the right and "percentd"% to the left)"
    say "number of ECMWF shear > "cutoff"m/s (closed triangles) scenes is "countb" ("percente"% in the grey and "percentf"% out of it)"
  b = b + 1 ; endwhile
a = a + 1 ; endwhile

"set vpage off"
"set strsiz 0.16"
a = 1 ; while (a <= xpic)
  b = 1 ; while (b <= ypic)
*   "set strsiz 0.16" ; "set string 1 bc 6 0"
*   "draw string "clr.a" "top.b-0.2" "titl.a.b
    "set strsiz 0.16" ; "set string 1 br 6 0"
    "draw string "rig.a-0.3" "top.b-0.2" "titl.a.b
    "set strsiz 0.10" ; "set string 1 bl 6 -90"
    if (a = 1) ; "draw string "lef.a-0.0" "top.b-0.4" Left of Track" ; endif
    "set string 1 br 6 -90"
    if (a = 1) ; "draw string "lef.a-0.0" "bot.b+0.4" Right of Track" ; endif
    "set string 1 bl 6 0"
    if (b = 1) ; "draw string "lef.a+0.3" "bot.b+0.13" Left of Track" ; endif
    "set string 1 br 6 0"
    if (b = 1) ; "draw string "rig.a-0.3" "bot.b+0.13" Right of Track" ; endif
  b = b + 1 ; endwhile
a = a + 1 ; endwhile
"set strsiz 0.18" ; "set string 1 bc 6 0"
c = 0.51 * (rig.1+lef.2) + 1.3 ; d = top.2+0.1
*"set strsiz 0.18" ; "set string 1 br 6 0"
*c = rig.2-0.3 ; d = top.2+0.1
"draw string "c" "d" "title
"set strsiz 0.18" ; "set string 1 bc 6 0"
c = 0.51 * (rig.1+lef.2) ; d = bot.1-0.2
"draw string "c" "d" QuikSCAT Wavenumber-1 Azimuth"
"set strsiz 0.18" ; "set string 1 bc 6 -90"
c = lef.1-0.4 ; d = 0.5 * (top.1+bot.2)
"draw string "c" "d" ECMWF Deep-Layer Shear Direction"
"set strsiz 0.16" ; "set string 1 bl 6 0"
c = 1.74 ; d = top.2+0.1 ; "draw string "c" "d" "counta" (shr<"cutoff"ms`a-1`n)"
c = 1.74 ; d = top.2-0.2 ; "draw string "c" "d" "countb" (shr`3>`0"cutoff"ms`a-1`n)"
"set line 1 1 5"
c = 1.54 ; d = top.2+0.17 ; "draw mark 2 "c" "d" 0.14"
c = 1.54 ; d = top.2-0.13 ; "draw mark 9 "c" "d" 0.16"

say "printim "plotfil".gif gif white x1100 y850"
    "printim "plotfil".gif gif white x1100 y850"
"quit"


function inner_decomp(args)
  lef = subwrd(args,1)
  rig = subwrd(args,2)
  wid = subwrd(args,3)
  num = subwrd(args,4)

  if (num = 1)                                                     ;* anchor the midpoint of a single panel at the
    _retmid.1 = (lef + rig) / 2                                    ;* center of the outer allowable limits, or else
  else                                                             ;* anchor the midpoints of the outer two panels
    _retmid.1   = lef + wid / 2                                    ;* as far away as possible from each other and
    _retmid.num = rig - wid / 2                                    ;* linearly interpolate the midpoints of the
    a = 2                                                          ;* panels in between
    while (a < num)
      _retmid.a = (_retmid.num * (a-1) + _retmid.1 * (num-a)) / (num - 1)
      a = a + 1
    endwhile
  endif

  a = 1                                                            ;* then calculate the left and right limts
  while (a <= num)                                                 ;* of each panel
    _retlef.a = _retmid.a - wid / 2
    _retrig.a = _retmid.a + wid / 2
    a = a + 1
  endwhile

  if (num > 1)                                                     ;* now check the gap between adjacent panels
    dis = (num - 1) / (num + 1) * (_retlef.2 - _retrig.1) - 0.2    ;* and recalculate the outer two panel midpoints
    if (dis > 0)                                                   ;* so that the gap between the outer limit and
      lef = subwrd(args,1) + dis                                   ;* these panels is the same as the gap between
      rig = subwrd(args,2) - dis                                   ;* adjacent panels, then recalculate panel limits
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
    endif
  endif
return
