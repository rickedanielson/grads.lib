* This script sdfopens a data.nc file and an associated track.nc file,
* then creates a display script which includes the contents of the data
* to be browsed, and displays an initial field.  The argument passed is
* assumed to be the data.nc file, which begins with the same initial few
* characters as the corresponding track.nc file - RD August 1998, January
* 2000.

function datatrk(arg)

#shared = 6
shared = 14

* isolate the tag (following the path name)
* and open the data files

a = 1
b = 0
ret = substr(arg,a,1)
while (ret != "")
  if (ret = "/")
    b = a
  endif
  a = a + 1
  ret = substr(arg,a,1)
endwhile
b = b + 1
tag = substr(arg,b,shared)

#"sdfopen "tag".budget.energy.conversion.eddy.nc"
#"sdfopen "tag".mask.nc"
"sdfopen "tag".nc"
"sdfopen "tag".track.nc"

* create and run the display script

"run gui_list_slp "tag
