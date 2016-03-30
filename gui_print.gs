* This script prints a grads gmeta file named either according to
* the current date and time or the argument passed - RD August 1998,
* January 2000.

function print(name)

if (name = "")
  "!~/bin/date.formatted"
  ret = read(grads.print.date)
  "!rm grads.print.date"

  status = sublin(ret,1)
  if (status != 0)
    say 'error reading grads.print.date'
  endif
  name = sublin(ret,2)
endif
namx = "xyzzy"

"enable print "namx
"print"
"disable print"

* and convert to postscript

say "/opt/opengrads/gxeps -c -i "namx" -o "name".ps"
   "!/opt/opengrads/gxeps -c -i "namx" -o "name".ps"
#say "~/prog/graphics.grads/bin/gxeps -c -i "namx" -o "name".ps"
#   "!~/prog/graphics.grads/bin/gxeps -c -i "namx" -o "name".ps"
say "/bin/rm "namx
   "!/bin/rm "namx
