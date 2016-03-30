* This script plots a shaded field with negative contours dashed
* and no zero contour.  We assume that a colour palette has already
* been defined - RD Novemer 1999.

function nozero(args)

var = subwrd(args,1)
clv = subwrd(args,2)
cenval = subwrd(args,3)
colour = subwrd(args,4)
if (cenval = "")
  cenval = 0
endif
if (colour = "")
  colour = 1
endif

# define the colour map         5             10             15             20             25

colours =         "44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 44 41"
colours = colours" 42 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48 48"

# define the contour intervals

i = -25
clva = ""
clvb = ""
clvc = ""
while (i < 27)
  clv.i = i * clv + cenval
  clva = clva" "clv.i
  if (i < 0)
    clvb = clvb" "clv.i
  endif
  if (i > 0)
    clvc = clvc" "clv.i
  endif
  i = i + 1
endwhile

# draw the shaded region

"set gxout shaded"
"set ccols "colours
"set clevs "clva
"set clskip 1000"
"d "var

# draw the negative contours

"set gxout contour"
"set ccolor "colour
"set cstyle 2"
"set clevs "clvb
"d "var

# draw the positive contours

"set ccolor "colour
"set cstyle 1"
"set clevs "clvc
"d "var
