* This script creates two others (gui_disp.gs and gui_dispv.gs) which
* list all displayable variables (either defined or from multiple
* opened files) in a form which also can be executed.  In the second
* script file, only variables which have more than one level are included.
* Pre-existing display scripts are overwritten - RD August 1998, November
* 1999, January 2000, February 2001.

function list(arg)

fila = arg"_sig0.hdr"
say "reading "fila
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
direction = subwrd(line,2)

filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
beam = subwrd(line,2)

filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
filestat = read(fila)
line = sublin(filestat,2)
date = subwrd(line,2)
time = subwrd(line,3)
fileclose = close(fila)

* determine how many files are open

loop = 1
"q files"
message = sublin(result,loop)
while (message != "")
  if (subwrd(message,1) = "File")
    filenumb = subwrd(message,2)
  endif
  loop = loop + 1
  message = sublin(result,loop)
endwhile

* get info about all displayable variables in
* all opened files, and all defined variables

loop = 1
while (loop <= filenumb)
  "q file "loop
  file.loop = result
  loop = loop + 1
endwhile

"q define"
define = result

* open both display scripts and store some initial display commands

fpz = "xyzzy.forgetit" ; "!echo $HOME > "fpz ; line = read(fpz) ; home = sublin(line,2) ; ret = close(fpz) ; "!rm "fpz
filenama = home'/prog/graphics.grads/grads.lib/gui_disp.gs'
filenamb = home'/prog/graphics.grads/grads.lib/gui_dispp.gs'
outline = ''
filestat = write(filenama,outline)
messaga = sublin(filestat,1)
filestat = write(filenamb,outline)
messagb = sublin(filestat,1)
if (messaga != 0 | messagb != 0)
  say 'either error 'messaga' in opening and writing to 'filenama
  say '    or error 'messagb' in opening and writing to 'filenamb
endif

outline = '"clear"'
filewrite = write(filenama,outline)
filewrite = write(filenamb,outline)
outline = '"set grads off"'
filewrite = write(filenama,outline)
filewrite = write(filenamb,outline)
outline = '"set grid off"'
filewrite = write(filenama,outline)
outline = '"set xlab off"'
filewrite = write(filenama,outline)
outline = '"set ylab off"'
filewrite = write(filenama,outline)
outline = '"set digsiz 0.09"'
filewrite = write(filenama,outline)
filewrite = write(filenamb,outline)
outline = '#"set mpdset novascotia"'
filewrite = write(filenama,outline)
outline = '"set gxout shaded"'
filewrite = write(filenama,outline)
outline = '"set zlog on"'
filewrite = write(filenamb,outline)
outline = '"set cint 1"'
filewrite = write(filenama,outline)

* include the data file variables in the display scripts
* if a station data file is found, just save the file number
* otherwise, show all variables (except in the 3D display script,
* where only 3D variables are shown) and save the last instances
* of a SLP variable, a surface pressure variable, and a 3D variable

loop = 1
while (loop <= filenumb)
  outline = ''
  filewrite = write(filenama,outline)
  filewrite = write(filenamb,outline)
  linenumb = 7
  ret = sublin(file.loop,linenumb)
  while (ret != '')
    variable = subwrd(ret,1)
    levels = subwrd(ret,2)
    if (variable = "b10")
      stnfile = loop
      linenumb = 999
    else
      if (variable = 'slp')
        slpvar = 1
        slpfile = loop
      endif
      if (variable = 'sfcpres')
        suprvar = 1
        suprfile = loop
      endif
      if (loop = 1)
        outline = '#"d 'variable'"'
      else
        outline = '#"d 'variable'.'loop'"'
      endif
      filewrite = write(filenama,outline)
      if (levels > 0)
        filewrite = write(filenamb,outline)
        vertvar = variable
        vertfile = loop
      endif
    endif
    linenumb = linenumb + 1
    ret = sublin(file.loop,linenumb)
  endwhile
  loop = loop + 1
endwhile

* include any defined variables in both display scripts

linenumb = 1
ret = sublin(define,linenumb)
if (ret != 'No Defined Variables')
  outline = ''
  filewrite = write(filenama,outline)
  filewrite = write(filenamb,outline)
  while (ret != '')
    variable = subwrd(ret,1)
    outline = '#"d 'variable'"'
    filewrite = write(filenama,outline)
    filewrite = write(filenamb,outline)
    linenumb = linenumb + 1
    ret = sublin(define,linenumb)
  endwhile
endif

* define an initial display field (for the main display script, this can
* be either SLP or the first variable in the first file, while in the 3D
* script this is the last 3D variable, if it exists)

outline = ''
filewrite = write(filenama,outline)
filewrite = write(filenamb,outline)
if (slpvar = 1)
  outline = '"set cint 4"'
  filewrite = write(filenama,outline)
  if (slpfile <= 1)
    outline = '"d slp/100"'
  else
    outline = '"d slp.'slpfile'/100"'
  endif
  filewrite = write(filenama,outline)
else
  filenumb = 1
  linenumb = 7
  ret = sublin(file.filenumb,linenumb)
  variable = subwrd(ret,1)
  outline = '"d 'variable'"'
  filewrite = write(filenama,outline)
endif
if (vertvar != "")
  if (vertfile <= 1)
    outline = '"d 'vertvar'"'
  else
    outline = '"d 'vertvar'.'vertfile'"'
  endif
  filewrite = write(filenamb,outline)
endif

* if a station data file was found, include the station model in the main display

if (stnfile != "stnfile")
  outline = ''
  filewrite = write(filenama,outline)
  outline = '"set gxout model"'
  filewrite = write(filenama,outline)
  outline = '"set mdlopts dig3"'
  filewrite = write(filenama,outline)
  if (stnfile = 1)
    outline = '"d uwnd;vwnd;at;dpt;slp*10;0;3+maskout(n-n,ww-49);0;maskout(ww,ww-49)"'
  else
    outline = '"d uwnd.'stnfile';vwnd.'stnfile';at.'stnfile';dpt.'stnfile';'
    outline = outline 'slp.'stnfile'*10;0;3+maskout(n.'stnfile'-n.'stnfile',ww.'stnfile'-49);'
    outline = outline '0;maskout(ww.'stnfile',ww.'stnfile'-49)"'
  endif
  filewrite = write(filenama,outline)
  outline = '"set gxout contour"'
  filewrite = write(filenama,outline)
endif

* if surface pressure was found, include an indication of this in the 3D display

if (suprvar = 1)
  outline = ''
  filewrite = write(filenamb,outline)
  outline = '"set clab off"'
  filewrite = write(filenamb,outline)
  outline = '"set black -1e9 -1e-9"'
  filewrite = write(filenamb,outline)
  outline = '"set cint 20"'
  filewrite = write(filenamb,outline)
  outline = '"set cthick 10"'
  filewrite = write(filenamb,outline)
  if (suprfile = 1)
    outline = '"d lev-sfcpres/100"'
  else
    outline = '"d lev-sfcpres.'suprfile'/100"'
  endif
  filewrite = write(filenamb,outline)
  outline = '"set cthick 4"'
  filewrite = write(filenamb,outline)
  outline = '"set clab on"'
  filewrite = write(filenamb,outline)
endif

* finally append a date stamp for the titles

outline = '"draw title 'direction' 'beam' 'date'"'
filewrite = write(filenama,outline)
outline = '"set string 1 c 5"'
filewrite = write(filenama,outline)
outline = '"draw string 5.5 0.3 'time'"'
filewrite = write(filenama,outline)

outline = ''
filewrite = write(filenama,outline)
filewrite = write(filenamb,outline)
outline = '"run gui_header date"'
#filewrite = write(filenama,outline)
outline = '"run gui_headerp date"'
filewrite = write(filenamb,outline)
fileclose = close(filenama)
fileclose = close(filenamb)

* and run the display script

"run gui_disp"
