* This script plots a box centered on one of the positions given
* and with given dimensions - RD January 2000.

function box(args)

lata = subwrd(args,1)
lona = subwrd(args,2)
latb = subwrd(args,3)
lonb = subwrd(args,4)
latc = subwrd(args,5)
lonc = subwrd(args,6)
latd = subwrd(args,7)
lond = subwrd(args,8)

if (lona < 0)
  lona = lona + 360
endif
if (lonb < 0) 
  lonb = lonb + 360
endif
if (lonc < 0) 
  lonc = lonc + 360
endif
if (lond < 0) 
  lond = lond + 360
endif

"q w2xy "lona" "lata
xa = subwrd(result,3)
ya = subwrd(result,6)
"q w2xy "lonb" "latb
xb = subwrd(result,3)
yb = subwrd(result,6)
"q w2xy "lonc" "latc
xc = subwrd(result,3)
yc = subwrd(result,6)
"q w2xy "lond" "latd
xd = subwrd(result,3)
yd = subwrd(result,6)

#say "draw polyf "xa" "ya" "xb" "yb" "xc" "yc" "xd" "yd" "xa" "ya
"draw polyf "xa" "ya" "xb" "yb" "xd" "yd" "xc" "yc" "xa" "ya

#"draw line "xa" "ya" "xc" "yc
#"draw line "xa" "ya" "xb" "yb
#"draw line "xb" "yb" "xd" "yd
#"draw line "xc" "yc" "xd" "yd
