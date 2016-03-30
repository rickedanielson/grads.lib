* This script plots tons of thick, solid negative contours to mimic
* a solid fill shading scheme - RD September 2000.

function nozero(args)

var = subwrd(args,1)
clv = subwrd(args,2)
cenval = subwrd(args,3)
if (cenval = "")
  cenval = 0
endif

# define the contours

i = 0
clvs = ""
while (i < 50)
  clv.i = cenval - i * clv
  clvs = clvs" "clv.i
  i = i + 1
endwhile

# draw the negative contours

"set gxout contour"
"set ccolor 1"
"set cstyle 1"
"set cthick 10"
"set clevs "clvs
#"set xlint 20"
#"set ylint 10"
"set ylint 200"
"d "var

"set cthick 3"
