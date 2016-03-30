* This script creates another (gui_disp.gs) listing all displayable
* variables (either defined or from multiple opened files) in a form
* which also can be executed.  Unfortunately, the existing display
* script is overwritten.  Two files are expected to be open,
* the second one being the mask file.  If masking is set then the
* display script will be configured accordingly - RD August 1998,
* November 1999, January 2000.

function listmask(args)

tag = subwrd(args,1)

* define whether to mask, and the variables used

masking = "off"

* get info about all displayable variables in all opened files, and all defined variables

filenumb = 0
while (message != 'QUERY FILE Error:  file 'filenumb' not open')
  file.filenumb = result
  filenumb = filenumb + 1
  "q file "filenumb
  message = sublin(result,1)
endwhile
filenumb = filenumb - 1

"q define"
define = result

* open the display script

fpz = "xyzzy.forgetit" ; "!echo $HOME > "fpz ; line = read(fpz) ; home = sublin(line,2) ; ret = close(fpz) ; "!rm "fpz
filenama = home'/prog/graphics.grads/lib/gui_disp.gs'
outline = ''
filestat = write(filename,outline)
message = sublin(filestat,1)
if (message != 0)
  say 'error 'message' in opening and writing to 'filename
else
  say 'opened 'filename
endif

* reset the time to the onset time and turn map off

if (masking = "on")
  "run gui_getdate "tag
  say "set t "result
  "set t "result
  outline = '"set mpdraw off"'
  filewrite = write(filename,outline)
endif
"set t 9"
"set lat 20 60"
#"set lon 120 180"
"set lon -100 -40"

outline = '"clear"'
filewrite = write(filename,outline)
outline = '"set grads off"'
filewrite = write(filename,outline)
outline = '"set grid off"'
filewrite = write(filename,outline)
outline = '"set digsiz 0.09"'
filewrite = write(filename,outline)

* include the data file variables in the display script

numb = 1
while (numb <= filenumb)
  outline = ''
  filewrite = write(filename,outline)
  linenumb = 7
  ret = sublin(file.numb,linenumb)
  while (ret != '')
    variable = subwrd(ret,1)
    if (numb = 1)
      outline = '#"d 'variable'"'
    else
      outline = '#"d 'variable'.'numb'"'
    endif
    filewrite = write(filename,outline)
    linenumb = linenumb + 1
    ret = sublin(file.numb,linenumb)
  endwhile
  numb = numb + 1
endwhile

* include any defined variables

linenumb = 1
ret = sublin(define,linenumb)
if (ret != 'No Defined Variables')
  outline = ''
  filewrite = write(filename,outline)
  while (ret != '')
    variable = subwrd(ret,1)
    outline = '#"d 'variable'"'
    filewrite = write(filename,outline)
    linenumb = linenumb + 1
    ret = sublin(define,linenumb)
  endwhile
endif

* define an initial display field (the first variable in the first file)
* or else define the display for masking some feature

if (masking != "on")
  outline = ''
  filewrite = write(filename,outline)
  filenumb = 1
  linenumb = 7
  ret = sublin(file.filenumb,linenumb)
  variable = subwrd(ret,1)
  outline = '#"d 'variable'"'
  filewrite = write(filename,outline)
  outline = '"set cint 2"'
  filewrite = write(filename,outline)
  outline = '"d slp/100"'
  filewrite = write(filename,outline)
  outline = '"run gui_track_simple 2 manulat.2 manulon.2 0 0.1"'
  filewrite = write(filename,outline)
else
  outline = '#"run disp_mask_unfilled mask.2 1"'
  filewrite = write(filename,outline)
  outline = '"run disp_mask_filled mask.2 100"'
  filewrite = write(filename,outline)
  outline = '"set ccolor rainbow"'
  filewrite = write(filename,outline)
  outline = '"set clab off"'
  filewrite = write(filename,outline)
  outline = '"set cint 0.5"'
  filewrite = write(filename,outline)
  outline = '"set cthick 10"'
  filewrite = write(filename,outline)
  outline = '"d kinevint/1e6"'
  filewrite = write(filename,outline)
  outline = '"set cthick 2"'
  filewrite = write(filename,outline)
  outline = '"run disp_vector_noskip uagfvint vagfvint 1e8"'
  filewrite = write(filename,outline)
endif

* finally append a date stamp for a title

outline = ''
filewrite = write(filename,outline)
outline = '"run gui_header date"'
filewrite = write(filename,outline)
fileclose = close(filename)

* and run the display script and the masking function

"run gui_disp"
