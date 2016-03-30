# This script can be executed using a command like
*
*     grads -bpc "plot.individual.tracks eastern.bombs.tagorder 45 180"
*
* but BoundingBox: 25 250 579 543
* - RD March 2002.

function doit(arg)

filename = "/home/rdanielson/data/eastern.bombs/ncep/"subwrd(arg,1)
position = subwrd(arg,2)" "subwrd(arg,3)" "subwrd(arg,2)" "subwrd(arg,3)
dellat = subwrd(arg,4)
dellon = subwrd(arg,5)
if (dellat = "")
  dellat = 25
endif
if (dellon = "")
  dellon = 60
endif

"set grid off"
"run disp_colours_light"

"sdfopen /home/rdanielson/data/eastern.bombs/coads/eastern.bombs.sst.stat.nc"  ;# create a mean SST field
"run gui_view_grid "dellat" "dellon" "position

"set grads off"
"set clopts 1 3 0.13"
"set xlopts 1 3 0.13"
"set ylopts 1 3 0.13"
"set xlint 20"
"set ylint 10"
"set clab off"
"run disp_shaded_nozero sst 3"
"set clab on"
"run disp_unshaded_nozero sst 6"

masking = 1
if (masking = 1)
  "run basemap L 0 1"
  "q gxinfo"
  line = sublin(result,3)
  xl = subwrd(line,4)
  xr = subwrd(line,6)
  line = sublin(result,4)
  yb = subwrd(line,4)
  yt = subwrd(line,6)
  "set line 1"
  "draw rec "xl" "yb" "xr" "yt
endif
"close 1"

a = 0                                                              ;# loop through all the cases
say "reading "filename
filestat = read(filename)
message = sublin(filestat,1)
while (message = 0)
  line = sublin(filestat,2)
  date = subwrd(line,1)
  tag  = subwrd(line,2)
  trackfile = tag".track.nc"
  "sdfopen /home/rdanielson/data/eastern.bombs/ncep/"trackfile

  now = 1                                                          ;# find the appropriate date
  found = 0
  while (found = 0)
    "set t "now
    "run gui_date_simple"
    if (result = date)
      found = now
    endif
    now = now + 1
  endwhile
  say tag" "date" occurs at index "found

  "set t "found
  "set grads off"
  "set xlab off"
  "set ylab off"
  "run gui_view_grid "dellat" "dellon" "position

  if (tag != "111111")
    "set line 1 1 7"
    "run gui_track_simple 1 manulat manulon 1 0.0 0.16"
  else
    "set line 0 1 7"
    "run gui_track_simple_noline 1 troplat troplon 1 0.15 0.25"
    "set line 1 1 7"
    "run gui_track_simple_noline 1 troplat troplon 1 0.15 0.25 2"
  endif

  "close 1"
  filestat = read(filename)
  message = sublin(filestat,1)
  a = a + 1
endwhile
filestat = close(filename)

"run gui_print plot.individual.tracks"
"quit"
