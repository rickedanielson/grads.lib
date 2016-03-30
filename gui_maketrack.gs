* This script plots the previous track segments as defined in
* the track file and appends the next point in the track, defined
* by a mouse click.  A "Restart" button is placed in the lower
* left corner in case the track file needs to be erased and the
* tracking begun again - RD September 1998.

function maketrk()

* set colours and thicknesses and draw the restart button

"set string 10 bl 10"
"set strsiz 0.15 0.25"
"set line 10 1 6"
"draw string 0.05 0.03 Restart"
"draw line 0 0.3 1.0 0.3"
"draw line 1.0 0.3 1.0 0"

* open the track file (if it exists) and plot the track data

filename = "grads.track"
dotsize = 0.15

filestat = read(filename)
message = sublin(filestat,1)
if (message != 0)
  say "no tracks yet defined..."
  trackflag = 0
else
  say "opened "filename" for reading"
  trackflag = 1

  line = sublin(filestat,2)
  say line
  lon = subwrd(line,4)
  lat = subwrd(line,3)
  "q w2xy "lon" "lat
  say result
  rec = sublin(result,1)
  xold = subwrd(rec,3)
  yold = subwrd(rec,6)
  "draw mark 3 "xold" "yold" "dotsize

  filestat = read(filename)
  message = sublin(filestat,1)
  while (message = 0)
    line = sublin(filestat,2)
    lon = subwrd(line,4)
    lat = subwrd(line,3)
    "q w2xy "lon" "lat
    rec = sublin(result,1)
    xnew = subwrd(rec,3)
    ynew = subwrd(rec,6)
    "draw mark 3 "xnew" "ynew" "dotsize
    "draw line "xold" "yold" "xnew" "ynew
    xold = xnew
    yold = ynew
    filestat = read(filename)
    message = sublin(filestat,1)
  endwhile

  filestat = close(filename)
  message = sublin(filestat,1)
  if (message != 0)
    say "error in trying to close "filename
  endif
endif

* get the position of the next track point

"q pos"
rec = sublin(result,1)
xnew = subwrd(rec,3)
ynew = subwrd(rec,4)

* if position is in far lower left corner then erase track file,
* otherwise echo position to the screen and append it to the track file

if (xnew < 1.0 & ynew < 0.3)
  "!rm "filename
  "clear"
  "run gui_disp"
else
  "draw mark 3 "xnew" "ynew" "dotsize

  if (trackflag = 1)
    "draw line "xold" "yold" "xnew" "ynew
  endif

  "run gui_date"
  datatime=result

  "q dims"
  rec = sublin(result,4)
  level = subwrd(rec,6)

  "q xy2w "xnew" "ynew
  rec = sublin(result,1)
  lon = subwrd(rec,3)
  lat = subwrd(rec,6)

  outline = datatime" "level" "lat" "lon
  filestat = write(filename,outline,append)
  message = sublin(filestat,1)
  if (message != 0)
    say "error 'message" in writing to "filename
  endif
endif
