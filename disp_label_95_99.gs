* This script plots a shading convention at
* the positions given - RD October 2001.

function plot(args)

vert = subwrd(args,1)
xl = subwrd(args,2)
xr = subwrd(args,3)
yb = subwrd(args,4)
yt = subwrd(args,5)
ywid = yt - yb
xwid = xr - xl

val.0 = 95
val.2 = 99

"set strsiz 0.12 0.13"
a = 0
while (a < 3)
  "set line "45+a
  if (vert)
    yt = yb + ywid
  else
    xr = xl + xwid
  endif

  "draw recf "xl" "yb" "xr" "yt
  if (vert)
    "draw string "xr+0.05" "yb+ywid/2" "val.a"%"
  else
    "draw string "xr-xwid/2" "yb-0.05" "val.a"%"
  endif

  if (vert)
    yb = yt
  else
    xl = xr
  endif
  a = a + 2
endwhile
