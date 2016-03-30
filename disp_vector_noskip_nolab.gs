* This script plots a vector field with the label - RD January 2000.

function vector(args)

vara = subwrd(args,1)
varb = subwrd(args,2)
scale = subwrd(args,3)
cutoff = scale / 8.0

# draw the vector field

"set gxout vector"
"set arrlab off"
"set arrscl 0.4 "scale
"d maskout("vara",mag("vara","varb")-"cutoff");"varb
"set gxout contour"
