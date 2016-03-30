* This script lists the displayed variables at the top of the
* viewscreen (which can be either landscape or portrait),
* according to the contents of gui_disp.gs - RD September 1998,
* February 2001.

function header(arg)

if (arg != "")
  if (arg = "date")
    "run gui_date"
    "draw title "result
  else
    "draw title "arg
  endif
endif

filename = '/home/rdanielson/prog/graphics.grads/lib/gui_dispp.gs'
"set string 1 l 5"
"set strsiz 0.15 0.15"

"q gxinfo"
rec = sublin(result,2)
pagex = subwrd(rec,4)
pagey = subwrd(rec,6)
y = pagey + 0.1

* scan the display script for lines beginning with '"d '
* and after each is found, plot the variable on the screen

filestat = read(filename)
while (sublin(filestat,1) = 0)
  line = sublin(filestat,2)
  if (substr(line,1,3) = '"d ')
    a = 5
    while (substr(line,a,1) != '"')
      a = a + 1
    endwhile
    y = y - 0.2
    "draw string 0.5 "y" "substr(line,4,a-4)
  endif
  filestat = read(filename)
endwhile
