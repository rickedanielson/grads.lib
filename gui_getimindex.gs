* This script returns the value of tindex for the current
* date, but relative to time in the track file, since time
* ranges may differ between a data file and its associated
* track data file. - RD April 2000.

function getindex(args)

* get the track file and current default file numbers

"q dims"
rec = sublin(result,1)
dfila = subwrd(rec,5)
dfilb = subwrd(args,1)

* get the value of tindex relative to time in the track file

"set dfile "dfilb
"q dims"
rec = sublin(result,5)
tindex = subwrd(rec,9)

* reset the default file and return the time index

"set dfile "dfila
return(tindex)
