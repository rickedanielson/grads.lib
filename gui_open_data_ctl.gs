* This script opens a file.ctl, initializes the domain of interest,
* creates display scripts which include the contents of the data
* to be browsed, and displays an initial field - RD August 1998.

function open(arg)

"open "arg

* isolate the data file name (following the path name)

a = 1
ret = substr(arg,a,1)
while (ret != "")
  if (ret = "/")
    b = a
  endif
  a = a + 1
  ret = substr(arg,a,1)
endwhile
b = b + 1

* determine if the initialization script exists and
* run it, or else set the domain of interest to be
* the entire data domain

fpz = "xyzzy.forgetit" ; "!echo $HOME > "fpz ; line = read(fpz) ; home = sublin(line,2) ; ret = close(fpz) ; "!rm "fpz
script = home"/prog/graphics.grads/lib/case_"substr(arg,b,100)
ret = read(script)
if (status != 0)
  say "missing "script
  say "the computational domain will be the entire domain"

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

  "q file "filenumb
  rec = sublin(result,5)
  "timemin = 1"
  "timemax = "subwrd(rec,12)
  levmin = 1
  levmax = subwrd(rec,9)
  latmin = 1
  latmax = subwrd(rec,6)
  lonmin = 1
  lonmax = subwrd(rec,3)

  "q dims"
  rec = sublin(result,4)
  if (subwrd(rec,3) = "varying")
    zmin = subwrd(rec,11)
    zmax = subwrd(rec,13)
    zvar = "varying"
  else
    zval = subwrd(rec,9)
    zvar = "fixed"
  endif
  rec = sublin(result,3)
  if (subwrd(rec,3) = "varying")
    ymin = subwrd(rec,11)
    ymax = subwrd(rec,13)
    yvar = "varying"
  else
    yval = subwrd(rec,9)
    yvar = "fixed"
  endif
  rec = sublin(result,2)
  if (subwrd(rec,3) = "varying")
    xmin = subwrd(rec,11)
    xmax = subwrd(rec,13)
    xvar = "varying"
  else
    xval = subwrd(rec,9)
    xvar = "fixed"
  endif

  "set z "levmin
  "levmin = "subwrd(result,4)
  "set z "levmax
  "levmax = "subwrd(result,4)
  "set y "latmin
  "latmin = "subwrd(result,4)
  "set y "latmax
  "latmax = "subwrd(result,4)
  "set x "lonmin
  "lonmin = "subwrd(result,4)
  "set x "lonmax
  "lonmax = "subwrd(result,4)

  if (zvar = "varying")
    "set z "zmin" "zmax
  else
    "set z "zval
  endif
  if (yvar = "varying")
    "set y "ymin" "ymax
  else
    "set y "yval
  endif
  if (xvar = "varying")
    "set x "xmin" "xmax
  else
    "set x "xval
  endif
else
  "run case_"substr(arg,b,100)
endif

* then create and run the display script

"run gui_list"
