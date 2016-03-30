* This script is designed to fill all groups of gridboxes
* within a range of values defined on input.  Note that for
* some reason a maximum of 25 integers is included in each
* call to fgvals; any more might be too much - RD July 2001.

function maskfill(args)

var = subwrd(args,1)
clv = subwrd(args,2)
cenval = subwrd(args,3)
if (cenval = "")
  cenval = 0
endif

# fill the gridbox groups

"set gxout fgrid"
i = 1
while (i < 10)
  clva = i * clv + cenval
  clvb = (i+1) * clv + cenval
  j = clva
  vals = ""
  while (j < clvb & j < clva+25)
    vals = vals" "j" "i+7
    j = j + 1
  endwhile
  "set fgvals "vals
  "d "var
  i = i + 1
endwhile

"set gxout contour"
