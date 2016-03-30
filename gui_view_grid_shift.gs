* This script centers the view on a position of interest - RD Novemer 1999.

function view(args)

* get the position and the view half-distances (in degrees)

latview = subwrd(args,1)
lonview = subwrd(args,2)
latpos = subwrd(args,5)
lonpos = subwrd(args,6)
shiftlat = subwrd(args,7)
shiftlon = subwrd(args,8)

* and set the new view

if (latview > 0 & latpos > -90 & latpos < 90)
  "set lat "latpos-latview+shiftlat" "latpos+latview+shiftlat
endif
if (lonview > 0 & lonpos > -360 & lonpos < 720)
  "set lon "lonpos-lonview+shiftlon" "lonpos+lonview+shiftlon
endif
