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

#"set gxout shaded"
#"set ccols   9  14     4  11     5  13     3  10     7  12     8   2     6  15     9  14    4  11    5 13    3 10    7 12"
#"set clevs -40 -17 -16.5 -16 -15.5 -15 -14.5 -14 -13.5 -13 -12.5 -12 -11.5 -11 -10.5 -10 -9.5  -9 -8.5 -8 -7.5 -7 -6.5  6"
"set ccols   9  14     4  11     5  13     3  10     7  12     8   2    6   15    9    14 0"
"set clevs -40 -16 -15.5 -15 -14.5 -14 -13.5 -13 -12.5 -12 -11.5 -11 -10.5 -10 -9.5  -0.9 999"
"d "var
"set gxout contour"

# define the rainbow colour map

# colours = "9 14 4 11 5 13 3 10 7 12 8 2 6"

# define the contour intervals

# i = -25
# clva = ""
# clvb = ""
# clvc = ""
# while (i < 27)
#   clv.i = i * clv + cenval
#   clva = clva" "clv.i
#   if (i < 0)
#     clvb = clvb" "clv.i
#   endif
#   if (i > 0)
#     clvc = clvc" "clv.i
#   endif
#   i = i + 1
# endwhile

# draw the shaded region

# "set gxout shaded"
# "set ccols "colours
# "set clevs "clva
# "set clskip 1000"
# "d "var

# draw the negative contours

# "set gxout contour"
# "set ccolor "colour
# "set cstyle 2"
# "set clevs "clvb
# "d "var

# draw the positive contours

# "set ccolor "colour
# "set cstyle 1"
# "set clevs "clvc
# "d "var

#"reset events"
