# This script can be executed using a command like
*
*     grads -bpc "plot.individual.tracks.trop eastern.bombs.dateorder.T-24 42.5 180"
*
* - RD March 2002.

function doit(arg)

filename = "/home/rdanielson/data/eastern.bombs/ncep/"subwrd(arg,1)
position = subwrd(arg,2)" "subwrd(arg,3)" "subwrd(arg,2)" "subwrd(arg,3)
dellat = subwrd(arg,4)
dellon = subwrd(arg,5)
if (dellat = "")
  dellat = 22.5
endif
if (dellon = "")
  dellon = 65
endif

"set grid off"
"run disp_colours_orig"
"set xlopts 1 8 .35"
"set ylopts 1 8 .35"

a = 1                                                              ;# create the virtual pages
dely = 0.61
while (a < 12)
  y = (11 - a) * (10.5 - dely) / 11 + dely
  c = a
  d = a + 11
  e = a + 22
  f = a + 33
  up = y + dely + 0.5
  down = y - dely + 0.5
  vpage.c = "0.0  2.2  "down" "up
  vpage.d = "2.1  4.3  "down" "up
  vpage.e = "4.2  6.4  "down" "up
  vpage.f = "6.3  8.5  "down" "up
  a = a + 1
endwhile
vpage.42 = vpage.43

label.1  = 0  ;  uplat.1  =  0.0  ;  uplon.1  =   0.0              ;# define the label type
label.2  = 1  ;  uplat.2  = 27.0  ;  uplon.2  = 150.0              ;# (1 = black on white)
label.3  = 0  ;  uplat.3  = 43.0  ;  uplon.3  = 166.0              ;# (0 = reverse)
label.4  = 0  ;  uplat.4  = 37.0  ;  uplon.4  = 147.0              ;# and the position of
label.5  = 0  ;  uplat.5  = 42.0  ;  uplon.5  = 158.0              ;# any upstream features
label.6  = 1  ;  uplat.6  = 52.0  ;  uplon.6  = 155.0
label.7  = 0  ;  uplat.7  = 46.0  ;  uplon.7  = 168.0
label.8  = 1  ;  uplat.8  = 49.0  ;  uplon.8  = 160.0
label.9  = 1  ;  uplat.9  = 46.0  ;  uplon.9  = 148.0
label.10 = 1  ;  uplat.10 = 56.0  ;  uplon.10 = 163.0
label.11 = 0  ;  uplat.11 =  0.0  ;  uplon.11 =   0.0
label.12 = 1  ;  uplat.12 = 42.5  ;  uplon.12 = 148.0
label.13 = 0  ;  uplat.13 =  0.0  ;  uplon.13 =   0.0
label.14 = 0  ;  uplat.14 =  0.0  ;  uplon.14 =   0.0
label.15 = 1  ;  uplat.15 = 51.0  ;  uplon.15 = 134.0
label.16 = 0  ;  uplat.16 = 54.0  ;  uplon.16 = 172.0
label.17 = 0  ;  uplat.17 =  0.0  ;  uplon.17 =   0.0
label.18 = 1  ;  uplat.18 =  0.0  ;  uplon.18 =   0.0
label.19 = 0  ;  uplat.19 = 52.0  ;  uplon.19 = 152.0
label.20 = 1  ;  uplat.20 = 51.0  ;  uplon.20 = 159.0
label.21 = 1  ;  uplat.21 = 46.0  ;  uplon.21 = 148.0
label.22 = 0  ;  uplat.22 =  0.0  ;  uplon.22 =   0.0
label.23 = 0  ;  uplat.23 = 56.0  ;  uplon.23 = 145.0
label.24 = 1  ;  uplat.24 = 41.0  ;  uplon.24 = 162.0
label.25 = 1  ;  uplat.25 = 38.0  ;  uplon.25 = 130.0
label.26 = 0  ;  uplat.26 = 37.0  ;  uplon.26 = 155.0
label.27 = 1  ;  uplat.27 = 37.0  ;  uplon.27 = 157.0
label.28 = 0  ;  uplat.28 =  0.0  ;  uplon.28 =   0.0
label.29 = 1  ;  uplat.29 = 36.0  ;  uplon.29 = 152.0
label.30 = 1  ;  uplat.30 = 40.0  ;  uplon.30 = 156.0
label.31 = 0  ;  uplat.31 = 46.0  ;  uplon.31 = 153.0
label.32 = 1  ;  uplat.32 = 46.0  ;  uplon.32 = 165.0
label.33 = 1  ;  uplat.33 = 33.0  ;  uplon.33 = 137.0
label.34 = 1  ;  uplat.34 = 47.0  ;  uplon.34 = 140.0
label.35 = 0  ;  uplat.35 = 46.0  ;  uplon.35 = 152.0
label.36 = 0  ;  uplat.36 = 47.0  ;  uplon.36 = 161.0
label.37 = 0  ;  uplat.37 =  0.0  ;  uplon.37 =   0.0
label.38 = 0  ;  uplat.38 = 32.0  ;  uplon.38 = 152.0
label.39 = 1  ;  uplat.39 = 33.0  ;  uplon.39 = 140.0
label.40 = 0  ;  uplat.40 =  0.0  ;  uplon.40 =   0.0
label.41 = 1  ;  uplat.41 = 39.0  ;  uplon.41 = 138.0
label.42 = 1  ;  uplat.42 = 45.0  ;  uplon.42 = 149.0

a = 1                                                              ;# loop through all the cases
say "reading "filename
filestat = read(filename)
message = sublin(filestat,1)
while (message = 0)
  line = sublin(filestat,2)
  date = subwrd(line,1)
  tag  = subwrd(line,2)
  tropfile   = tag".potential.vorticity.nc"
  trackfile = tag".track.nc"
  "sdfopen /home/rdanielson/data/eastern.bombs/ncep/"tropfile
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
  "set vpage "vpage.a
  "set grads off"
  if (a != 42)
    "set xlab off"
    "set ylab off"
  else
    "set xlab on"
    "set ylab off"
    "set ylpos 0 r"
    "set xlint 30"
    "set ylint 10"
  endif
  "run gui_view_grid "dellat" "dellon" "position

  "set cthick 7"
  "set clab off"
  "run disp_shaded_lightdark smth9(tropott) 15 320"
  "set clab off"
  "run disp_unshaded_nozero smth9(tropott) 15 230"

  "set line 1 1 15"
  "run gui_track_simple 2 troplat troplon 1 0.0 0.4"

  labx = 7.3
  laby = 1.25
  delx = 0.55
  dely = 0.35
  "set strsiz 0.5 0.5"
  if (label.a = 1)                                                 ;# draw the label
    "set line 0 1 5"
    "draw recf "labx-delx" "laby-dely" "labx+delx" "laby+dely
    "set line 1 1 5"
    "draw rec  "labx-delx" "laby-dely" "labx+delx" "laby+dely
    "set string 1 c 10"
    "draw string "labx" "laby" "a
  else
    "set line 1 1 5"
    "draw recf "labx-delx" "laby-dely" "labx+delx" "laby+dely
    "set string 0 c 10"
    "draw string "labx" "laby" "a
  endif

  if (uplat.a != 0.0)                                              ;# draw upstream features
    "q w2xy "uplon.a" "uplat.a
    rec = sublin(result,1)
    xval = subwrd(rec,3)
    yval = subwrd(rec,6)
    "draw mark 3 "xval" "yval" 0.5"
    "set line 0"
    "draw mark 3 "xval" "yval" 0.25"
    "set line 1"
  endif

  "q gxinfo"                                                       ;# thicken the graphic border
  line = sublin(result,3)
  xl = subwrd(line,4)
  xr = subwrd(line,6)
  line = sublin(result,4)
  yb = subwrd(line,4)
  yt = subwrd(line,6)
  "set line 1 1 10"
  "draw rec "xl" "yb" "xr" "yt

  "close 2"
  "close 1"
  filestat = read(filename)
  message = sublin(filestat,1)
  a = a + 1
endwhile
filestat = close(filename)
"set vpage off"

"set strsiz 0.2 0.2"
"set string 1 c 6"
#"draw string 4.25 0.3 "filename

"run gui_print plot.individual.tracks.trop"
"quit"
