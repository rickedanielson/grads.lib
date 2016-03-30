* This script plots a box centered on one of the positions given
* and with given dimensions - RD January 2000.

function box(args)

dellat = subwrd(args,1)
dellon = subwrd(args,2)
shiftlat = subwrd(args,3)
shiftlon =  subwrd(args,4)
reallat = subwrd(args,5)
reallon = subwrd(args,6)
gridlat = subwrd(args,7)
gridlon = subwrd(args,8)

# define the relevant coordinates and draw the box

lolat = gridlat + shiftlat - dellat
hilat = gridlat + shiftlat + dellat
lolon = gridlon + shiftlon - dellon
hilon = gridlon + shiftlon + dellon

"q w2xy "lolon" "lolat
xlo = subwrd(result,3)
ylo = subwrd(result,6)
"q w2xy "hilon" "hilat
xhi = subwrd(result,3)
yhi = subwrd(result,6)

"draw recf "xlo" "ylo" "xhi" "yhi
