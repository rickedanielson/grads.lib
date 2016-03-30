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
"set ccols   9  14   4  11   5  13   3  10   7 12  8  2  6 15  9 14  4  11  5 13  3 10  7 12"
#"set clevs -40 -24 -22 -20 -18 -16 -14 -12 -10 -8 -6 -4 -2  0  2  4  6  8  10 12 14 16 18 20"
#"set clevs -40 -20 -19 -18 -17 -16 -15 -14 -13 -12 -11 -10 -9 -8 -7 -6 -5 -4 -3 -2 -1 0 1 10"
"set clevs -40 -34 -32 -30 -28 -26 -24 -22 -20 -18 -16 -14 -12 -10 -8 -6 -4 -2 0 2 4 6 8 10"
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
