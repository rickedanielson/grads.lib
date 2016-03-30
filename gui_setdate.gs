* This script finds the time index referring to the date
* of interest and sets it to this date - RD April 2002.

function onset(arg)

"set t 1"
firstdate = subwrd(result,4)

"q file"
ret = sublin(result,5)
lasttime = subwrd(ret,12)

"set t "lasttime
lastdate = subwrd(result,4)

a = numeric(firstdate)
b = numeric(lastdate)
c = numeric(arg)
d = (c-a)/(b-a)*lasttime
"set t "d
return


function numeric(date)

year = substr(date,1,4)

start = 6
a = start
while (substr(date,a,1) != ':' & a < 22)
  a = a + 1
endwhile
length = a - start
month = substr(date,start,length)

start = a + 1
a = start
while (substr(date,a,1) != ':' & a < 22)
  a = a + 1
endwhile
length = a - start
day = substr(date,start,length)

start = a + 1
length = 5
hour = substr(date,start,length)

number = year
if (month < 10)
  number = number "0" month
else
  number = number""month
endif
if (day < 10)
  number = number "0" day
else
  number = number""day
endif
if (hour < 10)
  number = number "0" hour
else
  number = number""hour
endif

return number
