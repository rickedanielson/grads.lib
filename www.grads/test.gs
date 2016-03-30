'reinit'
while (1)
'clear'
say '  '
say '   '
say '  '
say 'A) Run Model Data Script'
say 'B) Run Surface and Station Data Script'
say 'C) Run GRIB Data Script'
say '  '
say 'Q) Quit'
say '  '
say '  '
prompt 'Enter Choice: '
pull res
if (res='a' | res='A')
  'run model.gs'
endif
if (res='b' | res='B')
  'run maps.gs'
endif
if (res='c' | res='C')
  'run grib.gs'
endif
if (res='q' | res='Q')
  break
endif

endwhile

'quit'
