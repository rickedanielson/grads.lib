# This script can be executed using a command like
*
*     grads -bpc "dump.ascii.point 000000.nc 45 180"
*
* where the two numbers define the desired location of the
* data (output will reflect the gridbox nearest this point)
* and the output variables are defined below - RD March 2002.

function doit(arg)

filename = subwrd(arg,1)
"sdfopen "filename
"q file"
ret = sublin(result,5)
toplev = subwrd(ret,9)
lasttime = subwrd(ret,12)

lat = subwrd(arg,2)
lon = subwrd(arg,3)
"set lat "lat
"set lon "lon

vars = 3
var.1 = "hgt"
var.2 = "air"
var.3 = "shum"
var.4 = "uwnd"
var.5 = "vwnd"
var.6 = "omega"

line = "    date    level lat lon "
c = 1
while (c <= vars)
  line = line"           "var.c
  c = c + 1
endwhile
say line

a = 1
while (a <= lasttime)
  "set t "a
  b = 1
  while (b <= toplev)
    "set z "b
    "q dims"
    ret = sublin(result,2)
    outlon = subwrd(ret,6)
    ret = sublin(result,3)
    outlat = subwrd(ret,6)
    ret = sublin(result,4)
    outlev = subwrd(ret,6)
    ret = sublin(result,5)
    outdat = subwrd(ret,6)
    line = outdat" "outlev" "outlat" "outlon
    c = 1
    while (c <= vars)
      "d "var.c
      ret = sublin(result,1)
      value = subwrd(ret,4)
      line = line"           "value
      c = c + 1
    endwhile
    say line
    b = b + 1
  endwhile
  a = a + 1
endwhile
"quit"
