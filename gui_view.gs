* This script centers the view on a position of interest - RD Novemer 1999.

function view(args)

* get the position and the view half-distances (in degrees)

latview = subwrd(args,1)
lonview = subwrd(args,2)
latpos = subwrd(args,3)
lonpos = subwrd(args,4)

* and set the new view

if (latview > 0 & latpos > -90 & latpos < 90)
  "set lat "latpos-latview" "latpos+latview
endif
if (lonview > 0 & lonpos > -360 & lonpos < 720)
  "set lon "lonpos-lonview" "lonpos+lonview
endif
