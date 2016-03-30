# This script can be executed using a command like
*
*     grads -bpc "plot.individual.tracks.sstcomp dj30d        om30d        42.5 150"
*     grads -bpc "plot.individual.tracks.sstcomp gd2000.dj30d gd2000.om30d 42.5 150"
*     grads -bpc "plot.individual.tracks.sstcomp atlmid       atltra       50.0 -55"
*     grads -bpc "plot.individual.tracks.sstcomp dec          mar          42.5 150"
*
* - RD March 2002.

function doit(arg)

fila = subwrd(arg,1)
filb = subwrd(arg,2)
position = subwrd(arg,3)" "subwrd(arg,4)" "subwrd(arg,3)" "subwrd(arg,4)
dellat = 25
dellon = 60

vpage.1 = "0.0 4.9 2.0 4.5"
vpage.2 = "3.6 8.5 2.0 4.5"

if (fila = "dj30d")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "Midwinter (13) - Transitional (12)"
  title.2 = "a) Midwinter (13)"
  title.3 = "b) Transitional (12)"
endif
if (fila = "gd2000.dj30d")
  box = "2.5 2.5 0 0 0 0 37.5 147.5"
  title.1 = "Midwinter (11) - Transitional (11)"
  title.2 = "a) Midwinter (11)"
  title.3 = "b) Transitional (11)"
endif
if (fila = "atlmid")
  box = "6.5 10.0 0 0 0 0 41.5 -60.0"
  title.1 = "Midwinter (12) - Transitional (16)"
  title.2 = "a) Midwinter (12)"
  title.3 = "b) Transitional (16)"
endif
if (fila = "gyakum.mb1.update")
  box = "2.5 2.5 0 0 0 0 37.5 147.5"
  title.1 = "Moderate Bomb (17) - Strong Non-Bomb (18)"
  title.2 = "a) Moderate Bomb (17)"
  title.3 = "b) Strong Non-Bomb (18)"
endif
if (fila = "dec")
  box = "5 7.5 0 0 0 0 35 142.5"
  title.1 = "Midwinter (11) - Transitional (11)"
  title.2 = "a) December (11)"
  title.3 = "b) March (11)"
endif

"set clopts 1 3 0.18"
"set xlopts 1 3 0.18"
"set ylopts 1 3 0.18"

"set grid off"
"run disp_colours"
"sdfopen /home/rdanielson/data/ncep/climatology/slp.mon.ltm.nc"
"set vpage "vpage.1
"set grads off"
"set xlab on"
"set ylab on"
"set xlint 20"
"set ylint 10"
"run gui_view_grid "dellat" "dellon" "position
"set clevs 0"
"d slp"
"draw title "title.2

a = 1                                                              ;# loop through all the cases
say "reading "fila
filestat = read(fila)
message = sublin(filestat,1)
while (message = 0)
  "set dfile 1"
  "run gui_view_grid "dellat" "dellon" "position
  line = sublin(filestat,2)
  date = subwrd(line,1)
  tag  = subwrd(line,2)
  apf  = subwrd(line,7)
  trackfile = tag".track.nc"
  "sdfopen "trackfile
  "set dfile 2"

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
  "set t "found
  "set line 1 1 10"
  "run gui_track_simple 2 manulat.2 manulon.2 1 0.0 0.18"
  "set x 1"
  "set y 1"
  "d -manuapc24.2(x=1,y=1,t="found")*0.051"
  bergeron = subwrd(result,4)
  say tag" "date" occurs at index "found" with intensification (Bergerons) of "bergeron

  "close 2"
  filestat = read(fila)
  message = sublin(filestat,1)
  a = a + 1
endwhile
"run disp_box_grid "box
filestat = close(fila)

"set vpage "vpage.2
"set grads off"
"set xlab on"
"set ylab off"
"set xlint 20"
"set ylint 10"
"run gui_view_grid "dellat" "dellon" "position
"set clevs 0"
"d slp"
"draw title "title.3

a = 1                                                              ;# loop through all the cases
say "reading "filb
filestat = read(filb)
message = sublin(filestat,1)
while (message = 0)
  "set dfile 1"
  "run gui_view_grid "dellat" "dellon" "position
  line = sublin(filestat,2)
  date = subwrd(line,1)
  tag  = subwrd(line,2)
  apf  = subwrd(line,7)
  trackfile = tag".track.nc"
  "sdfopen "trackfile
  "set dfile 2"

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
  "set t "found
  "set line 1 1 8"
  "run gui_track_simple 2 manulat.2 manulon.2 1 0.0 0.16"
  "set x 1"
  "set y 1"
  "d -manuapc24.2(x=1,y=1,t="found")*0.051"
  bergeron = subwrd(result,4)
  say tag" "date" occurs at index "found" with intensification (Bergerons) of "bergeron

  "close 2"
  filestat = read(filb)
  message = sublin(filestat,1)
  a = a + 1
endwhile
"run disp_box_grid "box
filestat = close(filb)
"set vpage off"

"set strsiz 0.2 0.2"
"set string 1 c 6"
#"draw string 4.25 0.3 "fila

"run gui_print plot.individual.tracks.sstcomp."fila"."filb
"quit"
