function loop(arg)

*     loop.gs is a GrADS do-loop. For example, "run loop i 0 20 2" will run the
*     next N GrADS commands for i=0,20,2 where "i" is an element of (lat, lon,
*     lev, t, x, y, z).

* runs a do-loop of grads commands
*
* usage: run loop variable from end by
*  example run loop lat 0 90 5
*
* the commands to execute in the do-loop
*  then queried
*
* w. ebisuzaki 8/96
*

* parse do-loop variables

var=subwrd(arg,1)
start=subwrd(arg,2)
end=subwrd(arg,3)
by=subwrd(arg,4)
c1=subwrd(arg,5)
c2=subwrd(arg,6)
if (by = '')
  by=1
endif

say var '=' start ' to ' end ' step ' by

* get grads commands

ncmd=0
flag=1
while (flag=1)
  say 'enter command:'
  pull command.ncmd
  if (command.ncmd = '')
     flag=0
  else
     ncmd=ncmd+1
  endif
endwhile

i=start
while (i <= end)
   'set ' var ' ' i
   'clear'
   'set grads off'
   j=0
   while (j < ncmd)
      command.j
      j=j+1
   endwhile
   'draw title ' var '=' i
   say var '=' i ' enter <cr> for next'
   pull x
   i=i+by
endwhile
exit

