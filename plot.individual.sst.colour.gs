# This script can be executed using a command like
*
*     grads -bpc "plot.individual.sst.colour dj30d.om30d.dateorder   37.5 145"
*     grads -bpc "plot.individual.sst.colour gd2000.dateorder        37.5 145"
*     grads -bpc "plot.individual.sst.colour atlmid.atltra.dateorder 43.5 -60"
*
* - RD March 2002.

function doit(arg)

masking = 1
limit = 300
conin.1 = 1
conin.2 = 4
refcont = 16
datatim = 3

filename = subwrd(arg,1)
position = subwrd(arg,2)" "subwrd(arg,3)" "subwrd(arg,2)" "subwrd(arg,3)
dellat = subwrd(arg,4)
dellon = subwrd(arg,5)
if (dellat = "")
  dellat = 10
endif
if (dellon = "")
  dellon = 20
endif

"set grid off"
"run disp_colours_rev_sst colour"
"set rgb    99  210  210  210"
"sdfopen /home/rdanielson/sst.wkmean.1981-1989.nc"
"sdfopen /home/rdanielson/sst.wkmean.1990-present.nc"
"sdfopen /home/rdanielson/data/coads/climatology/sst.day.ltm.nc"
"run gui_view_grid "dellat" "dellon" "position

a = 1                                                              ;# create the virtual pages
dely = 0.745
while (a < 10)
  y = (9 - a) * (10.5 - dely) / 9 + dely
  b = 2 * a - 1
  c = 2 * a
  d = 2 * a + 17
  e = 2 * a + 18
  f = 2 * a + 35
  g = 2 * a + 36
  up = y + dely + 0.5 + 0.3388888888889
  cen = y + dely + 0.27 + 0.3388888888889
  down = y - dely + 0.5 + 0.3388888888889
  vpage.b = "0.00  1.45  "down" "up
  vpage.c = "1.35  2.80  "down" "up
  vpage.d = "2.80  4.25  "down" "up
  vpage.e = "4.15  5.60  "down" "up
  vpage.f = "5.60  7.05  "down" "up
  vpage.g = "6.95  8.40  "down" "up
  labpos.b = "1.30 "cen
  labpos.d = "4.20 "cen
  labpos.f = "7.00 "cen
  a = a + 1
endwhile
y = (9 - a) * (10.5 - dely) / 9 + dely
f = 2 * a + 35
g = 2 * a + 36
up = y + dely + 0.5 + 0.3388888888889
cen = y + dely + 0.27 + 0.4188888888889
down = 0.0
vpage.f = "5.60  7.05  "down" "up
vpage.g = "6.95  8.40  "down" "up
labpos.f = "7.00 "cen

if (filename = "dj30d.om30d.dateorder")
  time.1   = 0   ;  file.1   = 1
  time.2   = 0   ;  file.2   = 1
  time.3   = 0   ;  file.3   = 1
  time.4   = 0   ;  file.4   = 1
  time.5   = 0   ;  file.5   = 1
  time.6   = 0   ;  file.6   = 1
  time.7   = 0   ;  file.7   = 1
  time.8   = 0   ;  file.8   = 1
  time.9   = 0   ;  file.9   = 1
  time.10  = 0   ;  file.10  = 1
  time.11  = 0   ;  file.11  = 1
  time.12  = 0   ;  file.12  = 1
  time.13  = 0   ;  file.13  = 1
  time.14  = 0   ;  file.14  = 1
  time.15  = 0   ;  file.15  = 1
  time.16  = 11  ;  file.16  = 1
  time.17  = 18  ;  file.17  = 1
  time.18  = 61  ;  file.18  = 1
  time.19  = 72  ;  file.19  = 1
  time.20  = 105 ;  file.20  = 1
  time.21  = 111 ;  file.21  = 1
  time.22  = 118 ;  file.22  = 1
  time.23  = 125 ;  file.23  = 1
  time.24  = 164 ;  file.24  = 1
  time.25  = 176 ;  file.25  = 1
endif
if (filename = "atlmid.atltra.dateorder")
  time.1   = 0   ;  file.1   = 1
  time.2   = 0   ;  file.2   = 1
  time.3   = 0   ;  file.3   = 1
  time.4   = 0   ;  file.4   = 1
  time.5   = 0   ;  file.5   = 1
  time.6   = 0   ;  file.6   = 1
  time.7   = 0   ;  file.7   = 1
  time.8   = 0   ;  file.8   = 1
  time.9   = 0   ;  file.9   = 1
  time.10  = 0   ;  file.10  = 1
  time.11  = 0   ;  file.11  = 1
  time.12  = 0   ;  file.12  = 1
  time.13  = 0   ;  file.13  = 1
  time.14  = 0   ;  file.14  = 1
  time.15  = 0   ;  file.15  = 1
  time.16  = 0   ;  file.16  = 1
  time.17  = 9   ;  file.17  = 1
  time.18  = 19  ;  file.18  = 1
  time.19  = 50  ;  file.19  = 1
  time.20  = 62  ;  file.20  = 1
  time.21  = 71  ;  file.21  = 1
  time.22  = 104 ;  file.22  = 1
  time.23  = 110 ;  file.23  = 1
  time.24  = 114 ;  file.24  = 1
  time.25  = 157 ;  file.25  = 1
  time.26  = 170 ;  file.26  = 1
  time.27  = 174 ;  file.27  = 1
  time.28  = 179 ;  file.28  = 1
endif
if (filename = "gd2000.dateorder")
  time.1   = 0   ;  file.1   = 1
  time.2   = 0   ;  file.2   = 1
  time.3   = 0   ;  file.3   = 1
  time.4   = 5   ;  file.4   = 1
  time.5   = 14  ;  file.5   = 1
  time.6   = 71  ;  file.6   = 1
  time.7   = 170 ;  file.7   = 1
  time.8   = 175 ;  file.8   = 1
  time.9   = 209 ;  file.9   = 1
  time.10  = 218 ;  file.10  = 1
  time.11  = 227 ;  file.11  = 1
  time.12  = 283 ;  file.12  = 1
  time.13  = 332 ;  file.13  = 1
  time.14  = 426 ;  file.14  = 1
  time.15  = 60  ;  file.15  = 2
  time.16  = 107 ;  file.16  = 2
  time.17  = 112 ;  file.17  = 2
  time.18  = 146 ;  file.18  = 2
  time.19  = 157 ;  file.19  = 2
  time.20  = 162 ;  file.20  = 2
  time.21  = 267 ;  file.21  = 2
  time.22  = 274 ;  file.22  = 2
endif

a = 1                                                              ;# loop through all the cases
b = 1
say "reading "filename
filestat = read(filename)
message = sublin(filestat,1)
while (message = 0)
  line = sublin(filestat,2)
  date = subwrd(line,1)
  tag  = subwrd(line,2)
  sstfile   = tag".sst.5day.nc"
  "sdfopen "sstfile

  c = b + 1
  "set vpage "vpage.b
  "set grads off"
  "set xlab off"
  "set ylab off"
  "set clab off"

  "set cthick 4"
  "run disp_shaded_nozero maskout(sstanom.4(t="datatim"),"limit"-infl.4(t="datatim")) "conin.1
  "set cthick 3"
  "run disp_unshaded maskout(sst.4(t="datatim"),"limit"-infl.4(t="datatim")) "conin.2
  "set cthick 8"
  "set clevs "refcont
  "set cstyle 1"
  "set ccolor 1"
  "d maskout(sst.4(t="datatim"),"limit"-infl.4(t="datatim"))"
  "set cthick 6"
  "set clevs "limit
  "set cstyle 2"
  "set ccolor 1"
  "d infl.4(t="datatim")"

  if (masking = 1)                                                 ;# thicken the graphic border
    "run basemap L 99 1"
    "q gxinfo"
    line = sublin(result,3)
    xl = subwrd(line,4)
    xr = subwrd(line,6)
    line = sublin(result,4)
    yb = subwrd(line,4)
    yt = subwrd(line,6)
    "set line 1 1 10"
    "draw rec "xl" "yb" "xr" "yt
  endif

  if (time.a != 0)
    "set vpage "vpage.c
    "set grads off"
    "set xlab off"
    "set ylab off"
    "set clab off"
    "set dfile "file.a
    "set t "time.a
    "run gui_date"
    month = substr(result,6,2)
    day = substr(result,9,2)
    say result" "month" "day
    if (month = 1)
      climtime = day
    endif
    if (month = 2)
      climtime = day + 31
    endif
    if (month = 3)
      climtime = day + 59
    endif
    if (month = 4)
      climtime = day + 90
    endif
    if (month = 5)
      climtime = day + 120
    endif
    if (month = 6)
      climtime = day + 151
    endif
    if (month = 7)
      climtime = day + 181
    endif
    if (month = 8)
      climtime = day + 212
    endif
    if (month = 9)
      climtime = day + 243
    endif
    if (month = 10)
      climtime = day + 273
    endif
    if (month = 11)
      climtime = day + 304
    endif
    if (month = 12)
      climtime = day + 334
    endif
    say date

    "set cthick 4"
    "run disp_shaded_nozero (2*sst+sst(t-1)+sst(t+1))/4-sst.3(t="climtime") "conin.1
    "set cthick 3"
    "run disp_unshaded (2*sst+sst(t-1)+sst(t+1))/4 "conin.2
    "set cthick 8"
    "set clevs "refcont
    "set cstyle 1"
    "set ccolor 1"
    "d (2*sst+sst(t-1)+sst(t+1))/4"

    if (masking = 1)                                                 ;# thicken the graphic border
      "run basemap L 99 1"
      "q gxinfo"
      line = sublin(result,3)
      xl = subwrd(line,4)
      xr = subwrd(line,6)
      line = sublin(result,4)
      yb = subwrd(line,4)
      yt = subwrd(line,6)
      "set line 1 1 10"
      "draw rec "xl" "yb" "xr" "yt
    endif
    "set dfile 1"
  endif

  "set vpage off"
  "set strsiz 0.1 0.1"
  "set string 1 c 4"
  "draw string "labpos.b" "date

  "close 4"
  filestat = read(filename)
  message = sublin(filestat,1)
  a = a + 1
  b = b + 2
endwhile
filestat = close(filename)
#"run gui_print plot.individual.sst."filename
"printim plot.individual.sst."filename".gif white x1020 y1320"
"quit"
