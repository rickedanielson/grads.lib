* This script is designed to plot contours of a mask.
* The trick is to plot each contour separately and set
* values of regions outside the subdomain of interest to
* some constant while this is done.  The mask variable and
* a cutoff variable and value are expected as arguements - RD July 2001.

function plotmask(args)

var = subwrd(args,1)
cutvar = subwrd(args,2)
cutoff = subwrd(args,3)

# draw each contour

"set gxout contour"
clva = 1000.0
clvb = 2000.0
clvc = (clva + clvb) / 2.0
clvd = -clvc
"set clevs "clvc
"set cstyle 1"
#"set ccols 1"
"set cthick 15"
"d "clvc"+const(maskout(const(maskout(const(maskout("var","var"-"clva"),"clvd",-u),"clvb"-"var"),"clvd",-u),"cutvar"-"cutoff"),"clvd",-u)"
