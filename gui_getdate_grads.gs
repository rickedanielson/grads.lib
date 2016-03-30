* This script obtains the time index referring to the onset of (e.g.)
* maximum deepening.  The argument defines the ascii input track file
* which is read to determine the desired date, then the default time
* index is searched for the T0 time index - RD, June 2000.

function onset(args)

filename = subwrd(args,1)

maxval = 2000
filestat = read(filename)
message = sublin(filestat,1)
while (message = 0)
  line = sublin(filestat,2)
  deep = subwrd(line,7)
  if (deep < maxval)
    maxval = deep
    maxdate = subwrd(line,2)
  endif
  filestat = read(filename)
  message = sublin(filestat,1)
endwhile
filestat = close(filename)

say "onset of "maxval" occurs on "maxdate

"q file"
ret = sublin(result,5)
lasttime = subwrd(ret,12)

index = 1
while (index < lasttime)
  "set t "index
  "run gui_date_grads"
  tmpdate = subwrd(result,1)
  if (tmpdate = maxdate)
    maxind = index
    maxtime = subwrd(result,2)
  endif
  index = index + 1
endwhile

return(maxind" "maxtime)
