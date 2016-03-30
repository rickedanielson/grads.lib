# This script is designed to plot the time series of
* budget terms.  It can be executed using a command like
*
*     grads -bpc "plot.individual.budget.eke"
*     grads -bpc "plot.individual.budget.eke 3"
*
* A common bounding box will need to be inserted, such as
* %%BoundingBox: 67 298 584 717
* - RD February 2000.

function doit(args)
number = subwrd(args,1)

"run disp_colours_dark"
avgperiod = 4

#vpage.1  = "1.0   6.5   7.75 10.25"
#vpage.2  = "1.0   6.5   6.00  8.50"
#vpage.3  = "1.0   6.5   4.25  6.75"
#vpage.4  = "1.03  5.66  2.54  4.92"
#vpage.5  = "1.750 3.250 0.90  2.65"
#vpage.6  = "2.875 4.375 0.90  2.65"
#vpage.7  = "4.000 5.500 0.90  2.65"
vpage.1  = "0.0   5.5   7.90 10.40"
vpage.2  = "0.0   5.5   5.80  8.30"
vpage.3  = "0.0   5.5   3.70  6.20"
vpage.4  = "4.15  8.5   8.40 10.30"
vpage.5  = "4.15  8.5   6.85  8.75"
vpage.6  = "4.15  8.5   5.45  7.35"
vpage.7  = "4.15  8.5   4.05  5.95"

dellat = 17.5
dellon = 45

dom.1 = "a"
dom.2 = "b"
dom.3 = "c"
var.1 = "kinea"
var.2 = "kineb"
var.3 = "kinec"
newvar.0 = "aa"
newvar.1 = "west"
newvar.2 = "upst"
newvar.3 = "down"
newvar.4 = "xx"
newvar.5 = "yy"
newvar.6 = "zz"
varnames()

tag.1  = 756922 ; date.1  = "1900-00-00-00" ; tim.1.1  =  0 ; tim.1.2  =  0 ; tim.1.3  =  0 ; shift.1  =  0
tag.2  = 756100 ; date.2  = "1900-00-00-00" ; tim.2.1  =  0 ; tim.2.2  =  0 ; tim.2.3  =  0 ; shift.2  =  0
tag.3  = 756148 ; date.3  = "1975-11-13-00" ; tim.3.1  =  5 ; tim.3.2  = 11 ; tim.3.3  = 15 ; shift.3  = 10
tag.4  = 756267 ; date.4  = "1900-00-00-00" ; tim.4.1  =  0 ; tim.4.2  =  0 ; tim.4.3  =  0 ; shift.4  =  0
tag.5  = 756760 ; date.5  = "1976-02-08-00" ; tim.5.1  =  7 ; tim.5.2  = 11 ; tim.5.3  = 15 ; shift.5  = -15
tag.6  = 756903 ; date.6  = "1976-02-15-12" ; tim.6.1  =  5 ; tim.6.2  =  9 ; tim.6.3  = 13 ; shift.6  =  0
tag.7  = 756585 ; date.7  = "1900-00-00-00" ; tim.7.1  =  0 ; tim.7.2  =  0 ; tim.7.3  =  0 ; shift.7  =  0
tag.8  = 756609 ; date.8  = "1976-03-15-12" ; tim.8.1  =  7 ; tim.8.2  = 11 ; tim.8.3  = 15 ; shift.8  = -5
tag.9  = 756623 ; date.9  = "1976-03-20-00" ; tim.9.1  =  5 ; tim.9.2  =  9 ; tim.9.3  = 13 ; shift.9  = -15
tag.10 = 767030 ; date.10 = "1976-10-06-00" ; tim.10.1 =  7 ; tim.10.2 = 11 ; tim.10.3 = 13 ; shift.10 =  0
tag.11 = 767152 ; date.11 = "1900-00-00-00" ; tim.11.1 =  0 ; tim.11.2 =  0 ; tim.11.3 =  0 ; shift.11 =  0
tag.12 = 767185 ; date.12 = "1976-11-20-00" ; tim.12.1 =  7 ; tim.12.2 = 11 ; tim.12.3 = 13 ; shift.12 = -15
tag.13 = 767474 ; date.13 = "1900-00-00-00" ; tim.13.1 =  0 ; tim.13.2 =  0 ; tim.13.3 =  0 ; shift.13 =  0
tag.14 = 767544 ; date.14 = "1900-00-00-00" ; tim.14.1 =  0 ; tim.14.2 =  0 ; tim.14.3 =  0 ; shift.14 =  0
tag.15 = 767605 ; date.15 = "1977-03-09-12" ; tim.15.1 =  5 ; tim.15.2 =  9 ; tim.15.3 = 13 ; shift.15 = -10
tag.16 = 778128 ; date.16 = "1900-00-00-00" ; tim.16.1 =  0 ; tim.16.2 =  0 ; tim.16.3 =  0 ; shift.16 =  0
tag.17 = 778209 ; date.17 = "1900-00-00-00" ; tim.17.1 =  0 ; tim.17.2 =  0 ; tim.17.3 =  0 ; shift.17 =  0
tag.18 = 778405 ; date.18 = "1978-02-17-00" ; tim.18.1 =  9 ; tim.18.2 = 11 ; tim.18.3 = 15 ; shift.18 = -15
tag.19 = 789177 ; date.19 = "1900-00-00-00" ; tim.19.1 =  0 ; tim.19.2 =  0 ; tim.19.3 =  0 ; shift.19 =  0
tag.20 = 789371 ; date.20 = "1979-02-03-12" ; tim.20.1 =  5 ; tim.20.2 =  9 ; tim.20.3 = 13 ; shift.20 = -10
tag.21 = 790070 ; date.21 = "1979-10-21-00" ; tim.21.1 =  5 ; tim.21.2 =  9 ; tim.21.3 = 13 ; shift.21 = -15
tag.22 = 790190 ; date.22 = "1900-00-00-00" ; tim.22.1 =  0 ; tim.22.2 =  0 ; tim.22.3 =  0 ; shift.22 =  0
tag.23 = 790278 ; date.23 = "1900-00-00-00" ; tim.23.1 =  0 ; tim.23.2 =  0 ; tim.23.3 =  0 ; shift.23 =  0
tag.24 = 801181 ; date.24 = "1980-11-28-12" ; tim.24.1 =  7 ; tim.24.2 = 11 ; tim.24.3 = 13 ; shift.24 = -15
tag.25 = 801289 ; date.25 = "1980-12-24-12" ; tim.25.1 =  9 ; tim.25.2 = 11 ; tim.25.3 = 13 ; shift.25 = -15
tag.26 = 801866 ; date.26 = "1900-00-00-00" ; tim.26.1 =  0 ; tim.26.2 =  0 ; tim.26.3 =  0 ; shift.26 =  0
tag.27 = 801356 ; date.27 = "1981-01-17-12" ; tim.27.1 =  5 ; tim.27.2 =  9 ; tim.27.3 = 11 ; shift.27 = -15
tag.28 = 801434 ; date.28 = "1900-00-00-00" ; tim.28.1 =  0 ; tim.28.2 =  0 ; tim.28.3 =  0 ; shift.28 =  0
tag.29 = 801460 ; date.29 = "1981-02-17-12" ; tim.29.1 =  5 ; tim.29.2 =  7 ; tim.29.3 = 11 ; shift.29 = -5
tag.30 = 801501 ; date.30 = "1981-03-05-12" ; tim.30.1 =  5 ; tim.30.2 =  9 ; tim.30.3 = 13 ; shift.30 = -5
tag.31 = 812831 ; date.31 = "1900-00-00-00" ; tim.31.1 =  0 ; tim.31.2 =  0 ; tim.31.3 =  0 ; shift.31 =  0
tag.32 = 823448 ; date.32 = "1900-00-00-00" ; tim.32.1 =  0 ; tim.32.2 =  0 ; tim.32.3 =  0 ; shift.32 =  0
tag.33 = 823537 ; date.33 = "1983-03-14-00" ; tim.33.1 = 13 ; tim.33.2 = 17 ; tim.33.3 = 19 ; shift.33 = -10
tag.34 = 834071 ; date.34 = "1900-00-00-00" ; tim.34.1 =  0 ; tim.34.2 =  0 ; tim.34.3 =  0 ; shift.34 =  0
tag.35 = 834297 ; date.35 = "1983-12-24-00" ; tim.35.1 =  5 ; tim.35.2 =  7 ; tim.35.3 = 11 ; shift.35 = -10
tag.36 = 834607 ; date.36 = "1900-00-00-00" ; tim.36.1 =  0 ; tim.36.2 =  0 ; tim.36.3 =  0 ; shift.36 =  0
tag.37 = 845805 ; date.37 = "1900-00-00-00" ; tim.37.1 =  0 ; tim.37.2 =  0 ; tim.37.3 =  0 ; shift.37 =  0
tag.38 = 845072 ; date.38 = "1984-10-23-00" ; tim.38.1 =  3 ; tim.38.2 =  7 ; tim.38.3 = 11 ; shift.38 = -5
tag.39 = 845188 ; date.39 = "1984-12-02-00" ; tim.39.1 =  7 ; tim.39.2 =  9 ; tim.39.3 = 13 ; shift.39 = -15
tag.40 = 845354 ; date.40 = "1900-00-00-00" ; tim.40.1 =  0 ; tim.40.2 =  0 ; tim.40.3 =  0 ; shift.40 =  0
tag.41 = 845495 ; date.41 = "1985-03-09-12" ; tim.41.1 =  7 ; tim.41.2 = 11 ; tim.41.3 = 13 ; shift.41 = -15

if (number = "")                                                   ;# find the case of interest
  start = 1
  finish = 41
else
  start = number
  finish = number
endif

a = start                                                          ;# loop through the valid case(s)
while (a <= finish)
  if (date.a != "1900-00-00-00")
  "clear"
  "set grid off"
  "sdfopen "tag.a".nc"
  "sdfopen "tag.a".budget.energy.conversion.eddy.nc"
  "sdfopen "tag.a".mask.nc"
  "sdfopen "tag.a".track.nc"

  "run gui_getdate_grads "tag.a
  timecent = subwrd(result,1)                                      ;# find the onset date and
  now = 1                                                          ;# the date and location
  found = 0                                                        ;# of interest
  while (found = 0)
    "set t "now
    "run gui_date_simple"
    if (result = date.a)
      found = now
    endif
    now = now + 1
  endwhile
  say tag.a" "date.a" occurs at index "found
  "set t "found
  "q time"
  datatime = subwrd(result,3)
  "run gui_trackpos 4 troplat.4 troplon.4"
  position = result

  "set clopts 1 3 .15"
  "set xlopts 1 3 .19"
  "set ylopts 1 3 .19"

  "set vpage "vpage.1                                              ;# plot SLP and omega
  "set grads off"
#  "set xlpos 0 t"
  "set xlab off"
  "set ylab on"
  "set xlint 20"
  "set ylint 10"
  "set clab off"
  "set mpdraw on"
  "set map 1 1 6"
  "run gui_view_grid_shift "dellat" "dellon" "position" 0 "shift.a
  "set cthick 4"
  "run disp_shaded_nozero omega(lev=500) 0.15"
  "set cthick 10"
  "run disp_unshaded_nozero slp/100 8 940"
#  "set cthick 4"
#  "set clab on"
#  "run disp_unshaded_nozero slp/100 16 940"
  "set line 1 1 20"
  "run gui_track_simple 4 manulat.4 manulon.4 1 0.0 0.25"

  "set vpage "vpage.2                                              ;# plot energy conversions
  "set grads off"
  "set xlab off"
  "set ylab off"
  "set clab off"
  "set mpdraw off"
  "run gui_view_grid_shift "dellat" "dellon" 45 280 45 280 0 "shift.a
  "set cthick 4"
  "run disp_shaded_nozero barovint.2 35"
  "set cthick 7"
  "run disp_vector_newlab uagfvint.2/1e6 vagfvint.2/1e6 100 5.3 0.4"
  "set cthick 10"
  "run disp_masks mask.3 kinevint.2 750001"

  "c events"
  "set grads off"
  "set xlab off"
  "set ylab on"
  "set xlint 20"
  "set ylint 10"
  "set clab off"
  "set mpdraw on"
  "set map 1 1 6"
  "run gui_view_grid_shift "dellat" "dellon" "position" 0 "shift.a
  "set cthick 4"
  "run disp_unshaded_nozero hgt(lev=500) 200000 40"
#  "set line 1 1 20"
#  "run gui_track_simple 4 troplat.4 troplon.4 1 0.0 0.25"

  "set vpage "vpage.3                                              ;# plot EKE and height
  "set grads off"
  "set xlab off"
  "set ylab off"
  "set clab off"
  "set mpdraw off"
  "run gui_view_grid_shift "dellat" "dellon" 45 280 45 280 0 "shift.a
  "set cthick 4"
  "run disp_shaded_nozero kinevint.2/1e6 1"
  "set cthick 10"
  "run disp_masks mask.3 kinevint.2 750001"

  "c events"
  "set grads off"
  "set xlab on"
  "set ylab on"
  "set xlint 20"
  "set ylint 10"
  "set clab off"
  "set mpdraw on"
  "set map 1 1 6"
  "run gui_view_grid_shift "dellat" "dellon" "position" 0 "shift.a
  "set cthick 4"
  "run disp_unshaded_nozero hgt(lev=500) 200 4100"
  "set line 1 1 20"
  "run gui_track_simple 4 troplat.4 troplon.4 1 0.0 0.25"
  "close 4"
  "close 3"
  "close 2"                                                        ;# plot EKE evolution
  "close 1"                                                        ;# find the onset date again

  "sdfopen "tag.a".growth.rates.energy.eddy.nc"
  "sdfopen "tag.a".growth.rates.energy.eddy.posneg.nc"
  "run gui_getdate_grads "tag.a
  timecent = subwrd(result,1)
  "set missconn on"

  "set clopts 1 3 .29"
  "set xlopts 1 3 .29"
  "set ylopts 1 3 .29"
  "set vpage "vpage.4
  "set grads off"
  "set grid off"
  "set xlab off"
  "set ylab on"
  "set xaxis -60 60 24"
  "set ylint 5"
  "set x 1"
  "set y 1"
  "set z 1"
  "set t "timecent-10" "timecent+10

  "set line 1 1 20"
  "set vrange 0 20"                                                ;# draw a line corresponding to
  "d const(kinea-100,-100,-u)"                                     ;# the date in the above graphs
  "q w2xy "datatime" 0"
  xbef = subwrd(result,3)
  ybef = subwrd(result,6)
  "q w2xy "datatime" 20"
  xaft = subwrd(result,3)
  yaft = subwrd(result,6)
  "draw line "xbef" "ybef" "xaft" "yaft

  b = 1                                                            ;# draw lines without markers
  while (b <= 3)
    "define "newvar.b" = tloop("var.b" / 1e18)"
    "set cthick 7"
    "set cmark 0"
    "d "newvar.b
    b = b + 1
  endwhile

  b = timecent-10                                                  ;# add the unfilled markers
  while (b <= timecent+10)
    "set t "b
    "q time"
    now = subwrd(result,3)
    c = 1
    while (c <= 3)
      "d "var.c" / 1e18"
      value = subwrd(result,4)
      "q w2xy "now" "value
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      if (c = 1)
        "set line 0 1 8"
        "draw mark 3 "xval" "yval" 0.14"
        "set line 1 1 8"
        "draw mark 2 "xval" "yval" 0.14"
      endif
      if (c = 2)
        "set line 0 1 8"
        "draw mark 5 "xval" "yval" 0.14"
        "set line 1 1 8"
        "draw mark 4 "xval" "yval" 0.14"
      endif
      if (c = 3)
        "set line 0 1 20"
        "draw mark 7 "xval" "yval" 0.06"
        "set line 0 1 10"
        "draw mark 7 "xval" "yval" 0.12"
        "set line 1 1 8"
        "draw mark 7 "xval" "yval" 0.18"
      endif
      c = c + 1
    endwhile
    b = b + 1
  endwhile

  b = timecent-10                                                  ;# then add the filled markers
  while (b <= timecent+10)
    "set t "b
    "q time"
    now = subwrd(result,3)
    c = 1
    while (c <= 3)
      "d "var.c" / 1e18"
      value = subwrd(result,4)
      "q w2xy "now" "value
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      if (b >= tim.a.c & b <= tim.a.c + avgperiod)
        if (c = 1)
          "set line 1 1 8"
          "draw mark 3 "xval" "yval" 0.14"
        endif
        if (c = 2)
          "set line 1 1 8"
          "draw mark 5 "xval" "yval" 0.14"
        endif
        if (c = 3)
          "set line 1 1 20"
          "draw mark 7 "xval" "yval" 0.06"
          "set line 1 1 10"
          "draw mark 7 "xval" "yval" 0.12"
          "set line 1 1 8"
          "draw mark 7 "xval" "yval" 0.18"
        endif
      endif
      c = c + 1
    endwhile
    b = b + 1
  endwhile

  b = 1                                                            ;# finally, plot the three sets of
  while (b <= 3)                                                   ;# growth rate terms which contribute
    c = b + 4                                                      ;# to the tendency term
    "set vpage "vpage.c
    "set clopts 1 3 .29"
    "set xlopts 1 3 .29"
    "set ylopts 1 3 .29"
    "set grads off"
    "set grid off"
    if (b = 3)
      "set xlab on"
    else
      "set xlab off"
    endif
    "set ylab on"
    "set xaxis -60 60 24"
    "set ylint 1"
    "set x 1"
    "set y 1"
    "set z 1"
    "set t "timecent-10" "timecent+10

    "set line 1 1 20"
    "set vrange -2 3"                                                ;# draw a line corresponding to
    "d const(kinea-100,-100,-u)"                                     ;# the date in the above graphs
    "q w2xy "datatime" -2"
    xbef = subwrd(result,3)
    ybef = subwrd(result,6)
    "q w2xy "datatime" 3"
    xaft = subwrd(result,3)
    yaft = subwrd(result,6)
    "draw line "xbef" "ybef" "xaft" "yaft

    grvar.0 = "gvfc"dom.b"+cres"dom.b"+kvfc"dom.b"+kefo"dom.b"+knst"dom.b"+kres"dom.b
    grvar.1 = "khfc"dom.b
    grvar.2 = "krey"dom.b                                            ;# and define the other terms
    grvar.3 = "baro"dom.b
    grvar.4 = "ghfc"dom.b
    grvar.5 = "ghfp"dom.b".2"

    c = 0                                                            ;# draw lines without markers
    while (c <= 5)
      if (b = 1 & c = 5)
        c = c + 1
      else
        "define "newvar.c" = tloop("grvar.c")"
        "set cthick 7"
        "set cmark 0"
        "set cstyle 1"
        if (c = 5)
          "set cstyle 2"
        endif
        "d "newvar.c
        c = c + 1
      endif
    endwhile

  bb = timecent-10                                                  ;# add the unfilled markers
  while (bb <= timecent+10)
    "set t "bb
    "q time"
    now = subwrd(result,3)
    c = 0
    while (c <= 4)
      "d "grvar.c
      value = subwrd(result,4)
      if (value < 3 & value > -2)
      "q w2xy "now" "value
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      if (c = 4)
        "set line 0 1 8"
        "draw mark 5 "xval" "yval" 0.14"
        "set line 1 1 8"
        "draw mark 4 "xval" "yval" 0.14"
      endif
      if (c = 3)
        "set line 0 1 8"
        "draw mark 3 "xval" "yval" 0.14"
        "set line 1 1 8"
        "draw mark 2 "xval" "yval" 0.14"
      endif
      if (c = 2)
        "set line 0 1 20"
        "draw mark 7 "xval" "yval" 0.06"
        "set line 0 1 10"
        "draw mark 7 "xval" "yval" 0.12"
        "set line 1 1 8"
        "draw mark 7 "xval" "yval" 0.18"
      endif
      if (c = 1)
        "set line 0 1 20"
        "draw mark 8 "xval" "yval" 0.06"
        "set line 0 1 10"
        "draw mark 8 "xval" "yval" 0.12"
        "set line 1 1 8"
        "draw mark 8 "xval" "yval" 0.18"
      endif
      if (c = 0)
        "set line 1 1 8"
        "draw mark 1 "xval" "yval" 0.14"
      endif
      endif
      c = c + 1
    endwhile
    bb = bb + 1
  endwhile

  bb = timecent-10                                                  ;# then add the filled markers
  while (bb <= timecent+10)
    "set t "bb
    "q time"
    now = subwrd(result,3)
    c = 0
    while (c <= 4)
      "d "grvar.c
      value = subwrd(result,4)
      if (value < 3 & value > -2)
      "q w2xy "now" "value
      xval = subwrd(result,3)
      yval = subwrd(result,6)
      if (bb >= tim.a.b & bb <= tim.a.b + avgperiod)
      if (c = 4)
        "set line 1 1 8"
        "draw mark 5 "xval" "yval" 0.14"
      endif
      if (c = 3)
        "set line 1 1 8"
        "draw mark 3 "xval" "yval" 0.14"
      endif
      if (c = 2)
        "set line 1 1 20"
        "draw mark 7 "xval" "yval" 0.06"
        "set line 1 1 10"
        "draw mark 7 "xval" "yval" 0.12"
        "set line 1 1 8"
        "draw mark 7 "xval" "yval" 0.18"
      endif
      if (c = 1)
        "set line 1 1 20"
        "draw mark 8 "xval" "yval" 0.06"
        "set line 1 1 10"
        "draw mark 8 "xval" "yval" 0.12"
        "set line 1 1 8"
        "draw mark 8 "xval" "yval" 0.18"
      endif
      endif
      endif
      c = c + 1
    endwhile
    bb = bb + 1
  endwhile

    b = b + 1
  endwhile
  "close 2"
  "close 1"

  "set vpage off"                                                    ;# finally add the labels
  "set string 1 c 10"
  "set strsiz 0.25"
  "draw string 4.2  9.75  a"
  "draw string 4.2  7.6   b"
  "draw string 4.2  5.55  c"
  "draw string 8.04 9.7   d"
  "draw string 8.04 8.2   e"
  "draw string 8.04 6.70  f"
  "draw string 8.04 5.40  g"
  "set string 1 c 4"
  "set strsiz 0.16"
  if (number = 8)
    "draw string 2.75 10.08 SLP and `3w`0 (T0)"
  endif
  if (number = 38)
    "draw string 2.75 10.08 SLP and `3w`0 (T0-24h)"
  endif
  if (number = 41)
    "draw string 2.75 10.08 SLP and `3w`0 (T0)"
  endif
  "draw string 2.75  8.00 -`3aw`0 and (`3x`2v`0)`2`ba`n`0"
  "draw string 2.75  5.90 `2Ke`0"
  "draw string 6.75 10.05 West/Central/East `2Ke`0"
  "draw string 6.75  8.50 Western `2Ke`0 Center"
  "draw string 6.75  7.10 Central `2Ke`0 Center"
  "draw string 6.75  5.70 Eastern `2Ke`0 Center"
  "set strsiz 0.14"
  "draw string 6.75  4.00 Time (h) relative to T0"
  "set string 1 c 4 90"
  "set strsiz 0.15"
  "draw string 4.65  9.30 `2Ke`0(10`a18`nJ)"
  "draw string 4.65  6.45 Contributions to `36`2Ke/`36`2t`0 (day`a-1`n)"
  "run gui_print plot.individual.budget.eke."tag.a
  "reset"
  endif
  a = a + 1
endwhile
"quit"

function varnames()
  _tmpvar.1  = "var01"
  _tmpvar.2  = "var02"
  _tmpvar.3  = "var03"
  _tmpvar.4  = "var04"
  _tmpvar.5  = "var05"
  _tmpvar.6  = "var06"
  _tmpvar.7  = "var07"
  _tmpvar.8  = "var08"
  _tmpvar.9  = "var09"
  _tmpvar.10 = "var10"
  _tmpvar.11 = "var11"
  _tmpvar.12 = "var12"
  _tmpvar.13 = "var13"
  _tmpvar.14 = "var14"
  _tmpvar.15 = "var15"
  _tmpvar.16 = "var16"
  _tmpvar.17 = "var17"
  _tmpvar.18 = "var18"
  _tmpvar.19 = "var19"
  _tmpvar.20 = "var20"
  _tmpvar.21 = "var21"
  _tmpvar.22 = "var22"
  _tmpvar.23 = "var23"
  _tmpvar.24 = "var24"
  _tmpvar.25 = "var25"
  _tmpvar.26 = "var26"
  _tmpvar.27 = "var27"
  _tmpvar.28 = "var28"
  _tmpvar.29 = "var29"
  _tmpvar.30 = "var30"
  _tmpvar.31 = "var31"
  _tmpvar.32 = "var32"
  _tmpvar.33 = "var33"
  _tmpvar.34 = "var34"
  _tmpvar.35 = "var35"
  _tmpvar.36 = "var36"
  _tmpvar.37 = "var37"
  _tmpvar.38 = "var38"
  _tmpvar.39 = "var39"
  _tmpvar.40 = "var40"
  _tmpvar.41 = "var41"
  _tmpvar.42 = "var42"
  _tmpvar.43 = "var43"
  _tmpvar.44 = "var44"
  _tmpvar.45 = "var45"
  _tmpvar.46 = "var46"
  _tmpvar.47 = "var47"
  _tmpvar.48 = "var48"
  _tmpvar.49 = "var49"
  _tmpvar.50 = "var50"
return
