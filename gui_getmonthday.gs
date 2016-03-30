* This script obtains the time index of the climatological file
* referring to the month and day of the corresponding input date
* - RD, November 2001.

function doit(args)

monthday = substr(args,6,5)
indate = "1-"monthday"-00"

say "desired date is "indate

"q dims"
rec = sublin(result,5)
if (subwrd(rec,3) = "varying")
  tmin = subwrd(rec,11)
  tmax = subwrd(rec,13)
  tvar = "varying"
else
  tval = subwrd(rec,9)
  tvar = "fixed"
endif

"set dfile 2"
"q file 2"
ret = sublin(result,5)
lasttime = subwrd(ret,12)

index = 1
while (index < lasttime)
  "set t "index
  "run gui_date"
  if (result = indate)
    indout = index
  endif
  index = index + 1
endwhile
"set dfile 1"

if (tvar = "varying")
  "set t "tmin" "tmax
else
  "set t "tval
endif

return(indout)
