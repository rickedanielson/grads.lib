* This script obtains the time index referring to the date of interest.
* Given the desired file and date (the arguments), this date is matched
* and the time index is returned.  The initial default file is assumed
* to be the first one - RD December 2001.

function onset(args)

infile = subwrd(args,1)
indate = subwrd(args,2)

"q dims"
rec = sublin(result,5)
tval = subwrd(rec,9)

say "searching for "indate" in file "infile

"set dfile "infile
"q file"
ret = sublin(result,5)
lasttime = subwrd(ret,12)

inind = 0
index = 1
while (index <= lasttime)
  "set t "index
  "run gui_date_grads"
  tmpdate = subwrd(result,1)
  if (tmpdate = indate)
    inind = index
    intime = subwrd(result,2)
  endif
  index = index + 1
endwhile
if (inind = 0)
  say "couldn't match "indate" with a date in file "infile
endif

"set dfile 1"
"set t "tval
return(inind" "intime)
