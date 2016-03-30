* This script plots a vector field without the label - RD January 2000.

function vector(args)

scale = subwrd(args,1)
xrit = subwrd(args,2)
ybot = subwrd(args,3)
cutoff = scale / 5.0
length = 0.4

# draw the label

if (xrit = "")
  xrit = 1.0
endif
if (ybot = "")
  ybot = 0.3
endif
#xrit = 5.00
#ybot = 0.40
rc = arrow(xrit-0.25,ybot+0.2,length,scale)
return

function arrow(x,y,len,scale)
'set line 1 1 7'
'draw line 'x-len/2.' 'y' 'x+len/2.' 'y
'draw line 'x+len/2.-0.05' 'y+0.025' 'x+len/2.' 'y
'draw line 'x+len/2.-0.05' 'y-0.025' 'x+len/2.' 'y
'set string 1 c'
'set strsiz 0.2'
'draw string 'x' 'y-0.18' 'scale
#'set strsiz 0.2'
#'draw string 'x-1.5*len' 'y' 'scale
return
