# This script can be executed using a command like
*
*     grads -bpc "plot.individual.slp.sar"
*
* - RD March 2002.

function doit(arg)

filename = "slp.2004.nc"
position = "45 300 45 300"
dellat = 10
dellon = 20
if (dellat = "")
  dellat = 22.5
endif
if (dellon = "")
  dellon = 65
endif

"sdfopen "filename
"set grid off"
#"run disp_colours_orig"
#"set xlopts 1 8 .35"
#"set ylopts 1 8 .35"

a = 1                                                              ;# create the virtual pages
dely = 0.85
while (a < 8)
  y = (7 - a) * (10.5 - dely) / 7 + dely
  c = a
  d = a + 7
  e = a + 14
  up = y + dely + 0.5
  down = y - dely + 0.5
  vpage.c = "0.0  3.0  "down" "up
  vpage.d = "2.75  5.75  "down" "up
  vpage.e = "5.5  8.5  "down" "up
  a = a + 1
endwhile
vpage.42 = vpage.43

label.1  = "46.736 -49.829 47.100 -47.580 44.880 -49.134 45.235 -46.976"
label.2  = "48.065 -50.351 48.437 -48.031 46.289 -49.658 46.652 -47.432"
label.3  = "44.963 -64.100 45.580 -68.458 41.811 -65.103 42.421 -69.240"
label.4  = "44.612 -56.899 45.511 -63.829 39.389 -58.508 40.290 -64.883"
label.5  = "44.435 -58.017 45.051 -53.689 47.656 -59.112 48.280 -54.524"
label.6  = "44.671 -50.747 45.288 -46.400 47.828 -51.826 48.453 -47.221"
label.7  = "44.792 -59.964 45.409 -64.320 41.627 -60.967 42.239 -65.102"
label.8  = "44.595 -53.876 45.212 -49.534 47.806 -54.972 48.432 -50.369"
label.9  = "46.769 -48.799 47.134 -46.551 44.894 -48.096 45.249 -45.947"
label.10 = "44.991 -63.050 45.609 -67.422 41.838 -64.054 42.450 -68.203"
label.11 = "47.496 -54.926 48.394 -62.214 42.291 -56.639 43.186 -63.288"
label.12 = "44.411 -56.968 45.027 -52.640 47.625 -58.060 48.250 -53.473"
label.13 = "47.669 -47.490 48.291 -52.073 44.524 -48.559 45.138 -52.887"
label.14 = "44.670 -49.703 45.287 -45.357 47.829 -50.783 48.454 -46.179"

a = 1                                                              ;# loop through all the cases
while (a < 22)
  now = a * 2 + 323                                                ;# find the appropriate date
  "set t "now
  "set vpage "vpage.a
say "set vpage "vpage.a
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
*  "set clab off"
  "set cint 4"
  "d slp/100"
  "run gui_date_simple"
  "draw title "result

  "set line 1 1 20"
  if (a = 1)
    "run disp_box_points "label.1
    "run disp_box_points "label.2
  endif
  if (a = 2)
    "run disp_box_points "label.3
  endif
  if (a = 4)
    "run disp_box_points "label.4
  endif
  if (a = 5)
    "run disp_box_points "label.5
  endif
  if (a = 7)
    "run disp_box_points "label.6
  endif
  if (a = 10)
    "run disp_box_points "label.7
  endif
  if (a = 13)
    "run disp_box_points "label.8
  endif
  if (a = 15)
    "run disp_box_points "label.9
  endif
  if (a = 16)
    "run disp_box_points "label.10
  endif
  if (a = 18)
    "run disp_box_points "label.11
  endif
  if (a = 19)
    "run disp_box_points "label.12
  endif
  if (a = 20)
    "run disp_box_points "label.13
  endif
  if (a = 21)
    "run disp_box_points "label.14
  endif

  a = a + 1
endwhile
"set vpage off"

"set strsiz 0.2 0.2"
"set string 1 c 6"
#"draw string 4.25 0.3 "filename

"run gui_print plot.individual.slp.sar"
"quit"

#21Mar04_43737_01 2004-03-21-20:47 1 46.736 -49.829 47.100 -47.580 44.880 -49.134 45.235 -46.976 17020 14024 RSAT-1-SAR-SGF
#21Mar04_43737_02 2004-03-21-20:47 1 48.065 -50.351 48.437 -48.031 46.289 -49.658 46.652 -47.432 16304 14119 RSAT-1-SAR-SGF
#22Mar04_43745_01 2004-03-22-10:38 2 44.963 -64.100 45.580 -68.458 41.811 -65.103 42.421 -69.240 14322 13948 RSAT-1-SAR-SCN
#23Mar04_43759_01 2004-03-23-10:08 4 44.612 -56.899 45.511 -63.829 39.389 -58.508 40.290 -64.883 11817 11094 RSAT-1-SAR-SCW
#23Mar04_43766_01 2004-03-23-21:28 5 44.435 -58.017 45.051 -53.689 47.656 -59.112 48.280 -54.524 14652 13982 RSAT-1-SAR-SCN
#24Mar04_43780_01 2004-03-24-20:59 7 44.671 -50.747 45.288 -46.400 47.828 -51.826 48.453 -47.221 14361 13986 RSAT-1-SAR-SCN
#26Mar04_43802_01 2004-03-26-10:21 10 44.792 -59.964 45.409 -64.320 41.627 -60.967 42.239 -65.102 14376 13984 RSAT-1-SAR-SCN
#27Mar04_43823_01 2004-03-27-21:12 13 44.595 -53.876 45.212 -49.534 47.806 -54.972 48.432 -50.369 14607 13988 RSAT-1-SAR-SCN
#28Mar04_43837_01 2004-03-28-20:43 15 46.769 -48.799 47.134 -46.551 44.894 -48.096 45.249 -45.940 17201 14009 RSAT-1-SAR-SGF
#29Mar04_43845_01 2004-03-29-10:33 16 44.991 -63.050 45.609 -67.422 41.838 -64.054 42.450 -68.203 14322 13986 RSAT-1-SAR-SCN
#30Mar04_43859_01 2004-03-30-10:03 18 47.496 -54.926 48.394 -62.214 42.291 -56.639 43.186 -63.288 11791 11066 RSAT-1-SAR-SCW
#30Mar04_43866_01 2004-03-30-21:24 19 44.411 -56.968 45.027 -52.640 47.625 -58.060 48.250 -53.473 14620 13986 RSAT-1-SAR-SCN
#31Mar04_43873_01 2004-03-31-09:34 20 47.669 -47.490 48.291 -52.073 44.524 -48.559 45.138 -52.887 14303 13960 RSAT-1-SAR-SCN
#31Mar04_43880_01 2004-03-31-20:55 21 44.670 -49.703 45.287 -45.357 47.829 -50.783 48.454 -46.179 14366 13984 RSAT-1-SAR-SCN
