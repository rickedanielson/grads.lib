* This script is designed to plot contours of a mask.
* The trick is to plot each contour separately and set
* values of regions outside the subdomain of interest to
* some constant while this is done.  The mask variable and
* contour interval are expected as arguements - RD July 2001.

function plotmask(args)

var = subwrd(args,1)
clv = subwrd(args,2)
cenval = subwrd(args,3)
if (cenval = "")
  cenval = 0
endif

# draw each contour

"set gxout contour"
"set cthick 9"
i = 1
while (i < 20)
  clva = (i-0.5) * clv + cenval
  clvb = (i+0.5) * clv + cenval
  clvc =   i * clv + cenval
  clvd = -(i * clv + cenval)
  "set clevs "clvc
  "set ccols 15"
  "set clab on"
  "d "clvc"+const(maskout(const(maskout("var","var"-"clva"),"clvd",-u),"clvb"-"var"),"clvd",-u)"
  i = i + 1
endwhile
"set cthick 3"
