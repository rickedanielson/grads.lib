* This script searches a station observation file for the
* data associated with the nearest station to a mouse click
* and prints the data - RD June 2001.

function grepstn()

* determine how many files are open and find the station data file

loop = 1
"q files"
message = sublin(result,loop)
while (message != "")
  if (subwrd(message,1) = "File")
    filenumb = subwrd(message,2)
  endif
  loop = loop + 1
  message = sublin(result,loop)
endwhile

loop = 1
while (loop <= filenumb)
  "q file "loop
  ret = sublin(result,7)
  variable = subwrd(ret,1)
  if (variable = "b10")
    stnfile = loop
  endif
  loop = loop + 1
endwhile

* isolate the tag (following the path name)

"q file "stnfile
rec = sublin(result,3)
file = subwrd(rec,2)
rec = sublin(result,5)
last = subwrd(rec,12)

a = 1
b = 0
ret = substr(file,a,1)
while (ret != "")
  if (ret = "/")
    b = a
  endif
  a = a + 1
  ret = substr(file,a,1)
endwhile
b = b + 1
tag = substr(file,b,6)

* find the nearest station to the position of the mouse click
* and print the tag and current date as well

"q pos"
rec = sublin(result,1)
x = subwrd(rec,3)
y = subwrd(rec,4)

"set gxout findstn"
"d sst."stnfile";"x";"y
station = substr(result,1,8)
location = substr(result,9,99)
lon = subwrd(location,1)
lat = subwrd(location,2)

"run gui_date"
date = result

say "!station.grep "tag".coads.obs "date" "lat" "lon" "station
    "!station.grep "tag".coads.obs "date" "lat" "lon" "station
