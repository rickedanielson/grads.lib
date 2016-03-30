* Depending on the first argument (arga), this script either (arga=0)
* sets current time to the start or end of the time series, or (0<arga<1)
* multiplies the total number of time intervals (lasttime) by arga and
* resets time to the result, or (arga>1) jumps forward or back arga
* number of intervals, and redisplays - RD August 1998.

function time(args)

arga = subwrd(args,1)
argb = subwrd(args,2)

"q file"
ret = sublin(result,5)
if (subwrd(ret,1) = "Tsize")
  say "Detected a Station Data file..."
  lasttime = subwrd(ret,3)
else
  lasttime = subwrd(ret,12)
endif

"q dims"
ret = sublin(result,5)
datatime = subwrd(ret,9)

if (arga = 0)
  if (argb = 'begin')
    datatime = 1
  else
    datatime = lasttime
  endif
endif

if (arga > 0 & arga < 1)
  datatime = lasttime * arga
endif

if (arga >= 1 | arga <= -1)
  if (datatime + arga >= 1 & datatime + arga <= lasttime)
    datatime = datatime + arga
  else
    say 'requested data time outside range..'
  endif
endif

say "set t "datatime
"set t "datatime
say result

"run gui_disp"
