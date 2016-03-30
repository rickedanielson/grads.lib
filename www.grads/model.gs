'reinit'
'clear'
'open model.ctl'
'set mpvals -120 -75 25 65'
'set lon -150 -45'
'set lat 15 80'
'set mproj nps'
'set parea 0 11 0 8.2'
'set string 1 bc'
'set strsiz 0.15'
'set csmooth on'
'q hardware'
rec = sublin(result,2)
_cols = subwrd(rec,4)
if (_cols=256)
  'set rgb 30 0 80 0'
  'set rgb 31 0 110 0'
  'set rgb 32 0 150 0'
  'set rgb 33 0 200 0'
  'set rgb 34 0 250 0'
  'set rgb 35 150 255 0'
endif
'set mpdset nam'
'set map auto'
'set grid off'

t = 2
hr = 12
while (1)
  'clear'
  'set t 't
  say '  '
  say 'Time = 't'  ('hr'hr fcst)'
  say '  '
  say '  '
  say 'A)  500mb Heights and Vorticity'
  say 'B)  SLP and Thickness'
  say 'C)  Precip and 850mb Temps'
  say 'D)  850mb Streamlines and Isotachs'
  say 'E)  500mb Streamlines and Isotachs'
  say 'F)  850mb RH and Winds'
  if (t>1)
    say 'G)  500mb 12hr Height Change'
    say 'H)  500mb 12hr Vorticity Change'
  endif
  say '  '
  say 'T1) Time = 1'
  say 'T2) Time = 2'
  say 'T3) Time = 3'
  say 'T4) Time = 4'
  say 'T5) Time = 5'
  say '  '
  say 'Q) Quit'
  say '   '
  prompt 'Enter Choice: '
  pull r
  if (r='a' | r='A')
    rc = doa()
  endif
  if (r='b' | r='B')
    rc = dob()
  endif
  if (r='c' | r='C')
    rc = doc()
  endif
  if (r='d' | r='D')
    rc = dod()
  endif
  if (r='e' | r='E')
    rc = doe()
  endif
  if (r='f' | r='F')
    rc = dof()
  endif
  if (r='g' | r='G')
    rc = dog()
  endif
  if (r='h' | r='H')
    rc = doh()
  endif
  if (r='t1' | r='T1')
    t = 1
    hr = 0
   endif
  if (r='t2' | r='T2')
    t = 2
    hr = 12
   endif
  if (r='t3' | r='T3')
    t = 3
    hr = 24
   endif
  if (r='t4' | r='T4')
    t = 4
    hr = 36
   endif
  if (r='t5' | r='T5')
    t = 5
    hr = 48
   endif
   if (r='q' | r='Q')
     break
   endif
endwhile
return


* Draw 500mb Heights and Vorticity

function doa()
'clear'
'set map auto'
'set gxout shaded'
'set cint 2'
'set grads off'
'd hcurl(u5,v5)*1e5'
'set gxout contour'
'set cint 2'
'set ccolor 15'
'set grads off'
'd hcurl(u5,v5)*1e5'
'set cthick 3'
'set ccolor 0'
'set cint 3'
'set grads off'
'd z5/10'
'draw string 5.5 8.30 500mb Heights and Vorticity'
pull dummy
return

*  Draw SLP and Thickness

function dob()
'clear'
'set map auto'
'set gxout contour'
'set cint 2'
'set grads off'
'd slp'
'set cint 6'
'set cstyle 5'
'set grads off'
'd (z5-z10)/10'
'set cthick 6'
'set ccolor 1'
'set clevs 540'
'set grads off'
'd (z5-z10)/10'
'draw string 5.5 8.30 SLP and 1000-500mb Thickness'
pull dummy
return;

*  Draw Precip and 850 temps

function doc()
'clear'
'set map 15 1 1'
'set gxout shaded'
if (_cols=256)
  'set clevs 1 2 4 8 16 32'
  'set ccols 0 30 31 32 33 34 35'
else
  'set clevs 1 2 4 8 16'
  'set ccols 0 11 5 13 3 10'
endif
'set grads off'
'd p'
'set gxout contour'
'set ccolor 0'
'set clevs 1 2 4 8 16 32 64'
'set grads off'
'd p'
'set gxout contour'
'set ccolor 0'
'set cthick 12'
'set cint 2'
'set cstyle 1'
'set grads off'
'd t8-273.16'
'set ccolor rainbow'
'set cthick 1'
'set cint 2'
'set cstyle 1'
'set grads off'
'd t8-273.16'
'set ccolor 1'
'set clevs 0'
'set grads off'
'set cthick 12'
'd t8-273.16'
'set ccolor 0'
'set clevs 0'
'set grads off'
'set cthick 1'
'd t8-273.16'
'draw string 5.5 8.30 Precip and 850mb Temperature'
pull dummy
return;

*  Do 850mb Streamlines and Isotachs

function dod()
'clear'
'set map 1'
'set gxout shaded'
'set cint 5'
'set grads off'
'd mag(u8,v8)*1.944'
'set gxout contour'
'set cint 5'
'set ccolor 15'
'set grads off'
'd mag(u8,v8)*1.944'
'set gxout stream'
'set ccolor 0'
'set grads off'
'd u8;v8'
'draw string 5.5 8.30 850mb Isotachs and Streamlines'
pull dummy
return

*  Do 500mb Streamlines and Isotachs

function doe()
'clear'
'set map 1'
'set gxout shaded'
'set cint 5'
'set grads off'
'd mag(u5,v5)*1.944'
'set gxout contour'
'set cint 5'
'set ccolor 15'
'set grads off'
'd mag(u5,v5)*1.944'
'set gxout stream'
'set ccolor 0'
'set grads off'
'd u5;v5'
'draw string 5.5 8.30 500mb Isotachs and Streamlines'
pull dummy
return

*  Do 850mb RH and Winds

function dof()
'clear'
'set map 15'
'set gxout shaded'
'set clevs 50 70 90'
'set ccols 0 13 3 10'
'set grads off'
'd rh8'
'set gxout contour'
'set ccolor 0'
'set clevs 70 90'
'set grads off'
'd rh8'
'set gxout barb'
'set digsiz 0.085'
'set ccolor 0'
'set cthick 12'
'set grads off'
'd u8*1.944;v8*1.944'
'set ccolor 1'
'set cthick 1'
'set grads off'
'd u8*1.944;v8*1.944'
'draw string 5.5 8.30 850mb Relative Humidity and Winds'
pull dummy
return

*  Do 500mb Height Change

function dog()
'clear'
'set map auto'
'set gxout contour'
'set cint 25'
'set grads off'
'd z5-z5(t-1)'
'set cint 6'
'set grads off'
'd z5/10'
'draw string 5.5 8.30 500mb 12Hr Height Change'
pull dummy
return

*  Do 500mb Vorticity Change

function doh()
'clear'
'set map auto'
'set gxout contour'
'set cint 2'
'set grads off'
'd (hcurl(u5,v5)-hcurl(u5(t-1),v5(t-1)))*1e5'
'set cint 6'
'set grads off'
'd z5/10'
'draw string 5.5 8.30 500mb 12Hr Vorticity Change'
pull dummy
return
