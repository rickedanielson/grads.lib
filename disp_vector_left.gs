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
"set gxout contour"

# draw the label

#xrit = 2.0
#ybot = 0.2
#xrit = 5.0
#ybot = 0.4
xrit = 2.7
ybot = 0.34
###xrit = 1.5
###ybot = 0.4
rc = arrow(xrit-0.25,ybot+0.2,length,scale)
return

function arrow(x,y,len,scale)
'set line 1 1 7'
'draw line 'x-len/2.' 'y' 'x+len/2.' 'y
'draw line 'x+len/2.-0.05' 'y+0.025' 'x+len/2.' 'y
'draw line 'x+len/2.-0.05' 'y-0.025' 'x+len/2.' 'y
'set string 1 c'
#'set strsiz 0.2'
#'draw string 'x' 'y-0.15' 'scale
'set strsiz 0.3'
'draw string 'x-2.0*len' 'y' 'scale
return
