# This script can be executed using a command like
*
*     grads -bpc "plot.surf.wind.comparison"
*
* - RD February 2000.

function doit(args)

datelist.0 = "decjan.T-24"
datelist.1 = "octmar.T-24"

tima = 1
timb = 21

dotsize = 0.1
smalldot = 0.07
mrk.0 = 7
mrk.1 = 3
mrk.2 = 8

a = 0
while (a < 2)
  filename = datelist.a
  say filename
  filestat = read(filename)
  message = sublin(filestat,1)
  count.a = 0
  while (message = 0)
    line = sublin(filestat,2)
    date = subwrd(line,1)
    tag = subwrd(line,2)
    trackfile = tag".surf.wind.nc"
    "sdfopen "trackfile
    count.a = count.a + 1
    filestat = read(filename)
    message = sublin(filestat,1)
  endwhile
  filestat = close(filename)
  a = a + 1
endwhile
say count.0" "count.1
#"run gui_print plot.surf.wind.ps"
"quit"
