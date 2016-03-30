* This script plots a shaded field with negative contours dashed
* and no zero contour.  We assume that a colour palette has already
* been defined - RD Novemer 1999.

function nozero(args)

var = subwrd(args,1)

# use the colour map            5             10             15             20             25

colours =         "16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41"
colours = colours" 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67"

# fill the gridboxes

"set gxout fgrid"
"set fgvals 90 43 95 45 99 47"
"d "var
"set gxout contour"
