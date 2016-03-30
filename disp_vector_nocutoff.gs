* This script plots a vector field without the label - RD January 2000.

function vector(args)

vara = subwrd(args,1)
varb = subwrd(args,2)
scale = subwrd(args,3)
cutoff = 0.0
length = 0.4

# draw the vector field (skipping every other vector)

"set gxout vector"
"set arrlab off"
"set arrscl "length" "scale
"d maskout("vara",mag("vara","varb")-"cutoff");skip("varb",2,2);mag("vara","varb")"
"set gxout contour"

# draw the label

#xrit = 7.0
#ybot = 0.4
xrit = 5.00
#ybot = 1.15
ybot = 3.5
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
'set strsiz 0.14'
'draw string 'x-1.2*len' 'y' 'scale
return
