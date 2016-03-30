* This script sdfopens a data.nc file and an associated track.nc file,
* then creates a display script which includes the contents of the data
* to be browsed, and displays an initial field.  The argument passed is
* assumed to be the data.nc file, which begins with the same initial few
* characters as the corresponding track.nc file - RD August 1998, January
* 2000.

function sarfile(arg)

file = subwrd(arg,1)

* isolate the data file name (following the path name)

a = 1
b = 1
ret = substr(arg,a,1)
while (ret != "")
  if (b = 1 & ret = ".")
    b = a
  endif
  a = a + 1
  ret = substr(arg,a,1)
endwhile
b = b - 1
stem = substr(arg,1,b)

"sdfopen "arg

* create and run the display script

"run gui_list_sar "stem
