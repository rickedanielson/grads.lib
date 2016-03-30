* This script plots a vector field without the label - RD January 2000.

function vector(args)

vara = subwrd(args,1)
varb = subwrd(args,2)
scale = subwrd(args,3)
cutoff = scale / 5.0
length = 0.4

# draw the vector field (skipping every other vector)

"set gxout vector"
"set arrlab off"
"set arrscl "length" "scale
#"d maskout("vara",mag("vara","varb")-"cutoff");skip("varb",2,2);mag("vara","varb")"
"d maskout("vara",mag("vara","varb")-"cutoff");skip("varb",2,2)"
#"d maskout("vara",mag("vara","varb")-"cutoff");"varb
"set gxout contour"
