* This script plots a vector field without the label - RD January 2000.

function vector(args)

vara = subwrd(args,1)
varb = subwrd(args,2)
"define vara = vint(hgt-hgt+500,"vara",100)/vint(hgt-hgt+500,wave-wave+1,100)"
"define varb = vint(hgt-hgt+500,"varb",100)/vint(hgt-hgt+500,wave-wave+1,100)"
#"define vara = "vara"(lev=300)"
#"define varb = "varb"(lev=300)"
scale = subwrd(args,3)
cutoff = scale / 5.0

# draw the vector field (skipping every other vector)

"set gxout vector"
"set arrlab on"
#"set cthick 8"
"set arrscl 0.4 "scale
#"d maskout("vara",mag("vara","varb")-"cutoff");skip("varb",2,2);mag("vara","varb")"
"d maskout(vara,mag(vara,varb)-"cutoff");skip(varb,2,2);mag(vara,varb)"
"undefine vara"
"undefine varb"
#"set cthick 3"
"set gxout contour"
