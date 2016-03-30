* Depending on the argument, this script either (arg<10) jumps up
* or down "arg" number of levels, or jumps to the "arg" level and
* redisplays - RD October 1999.

function level(arg)

"q file"
ret = sublin(result,5)
lastlev = subwrd(ret,9)

"q dims"
ret = sublin(result,4)
datalev = subwrd(ret,9)

if (arg < 10)
  if (datalev + arg >= 1 & datalev + arg <= lastlev)
    datalev = datalev + arg
  else
    say 'requested data level is outside range..'
  endif
  "set z "datalev
  say result
else
  "set lev "arg
  say result
endif

"run gui_disp"
