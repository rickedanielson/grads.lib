* This script computes one of various diagnostic quantities using
* basic NCEP Reanalysis grids stored in a template netcdf file.
* An assumption is that the calculation domain of interest has been
* specified - RD, Feb `99

function econv()

* query file for dimensions of current viewing domain

"q dims"
rec = sublin(result,5)
if (subwrd(rec,3) = "varying")
  tmin = subwrd(rec,11)
  tmax = subwrd(rec,13)
  tvar = "varying"
else
  tval = subwrd(rec,9)
  tvar = "fixed"
endif

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

* query file for dimensions of calculation domain

"d timemin"
rec = sublin(result,1)
timemin = subwrd(rec,4)

"d timemax"
rec = sublin(result,1)
timemax = subwrd(rec,4)

"d levmin"
rec = sublin(result,1)
levmin = subwrd(rec,4)

"d levmax"
rec = sublin(result,1)
levmax = subwrd(rec,4)

"d moistmax"
rec = sublin(result,1)
moistmax = subwrd(rec,4)

"d latmin"
rec = sublin(result,1)
latmin = subwrd(rec,4)

"d latmax"
rec = sublin(result,1)
latmax = subwrd(rec,4)

"d lonmin"
rec = sublin(result,1)
lonmin = subwrd(rec,4)

"d lonmax"
rec = sublin(result,1)
lonmax = subwrd(rec,4)

say ""
say "calculating APE-eddy KE conversion terms, pointwise"
say ""
say "using the following calculation domain:"
say "time from "timemin" to "timemax
say "level from "levmin" to "levmax
say "lat from "latmin" to "latmax
say "lon from "lonmin" to "lonmax
say ""

say "defining temporary variables" ; say ""
defa = "EARTH =  6.371e6"
  say  "  "defa
  "define "defa
defa = "D2R =    3.141592654 / 180.0"
  say  "  "defa
  "define "defa
defa = "OMEG =   7.292e-5"
  say  "  "defa
  "define "defa
defa = "GRAV =   9.8"
  say  "  "defa
  "define "defa
say ""

say "computing over lat and lon:" ; say ""
"set t 1"
"set z 1"
"set lat "latmin" "latmax
"set lon "lonmin" "lonmax

defa = "delx = EARTH * cdiff(lon,x) * D2R * cos(lat*D2R)"
  say  "  "defa ; say ""
  "define "defa

defa = "dely = EARTH * cdiff(lat,y) * D2R"
  say  "  "defa ; say ""
  "define "defa

defa = "coriol = 2.0 * OMEG * sin(lat*D2R)"
  say  "  "defa ; say ""
  "define "defa

say "computing over time, level, lat, and lon:" ; say ""
"set t "timemin" "timemax
"set lev "levmin" "levmax
"set lat "latmin" "latmax
"set lon "lonmin" "lonmax

defa = "eckinemid = 0.25 * ((uwnd(z+1)-monthuwnd(z+1)) * (uwnd(z+1)-monthuwnd(z+1)) +"
defb =                     "(vwnd(z+1)-monthvwnd(z+1)) * (vwnd(z+1)-monthvwnd(z+1)) +"
defc =                     "(uwnd-monthuwnd) * (uwnd-monthuwnd) + (vwnd-monthvwnd) * (vwnd-monthvwnd))"
  say  "  "defa" "defb" "defc ; say ""
  "define "defa" "defb" "defc

defa = "ecagfumid = 0.5 * ((uwnd(z+1)-monthuwnd(z+1)) * GRAV * (hgt(z+1)-monthhgt(z+1)) +"
defb =                    "cdiff(pow(GRAV * (hgt(z+1)-monthhgt(z+1)), 2.0) / 2.0 / coriol, y) / dely +"
defc =                    "(uwnd-monthuwnd) * GRAV * (hgt-monthhgt) +"
defd =                    "cdiff(pow(GRAV * (hgt-monthhgt), 2.0) / 2.0 / coriol, y) / dely)"
  say  "  "defa" "defb" "defc" "defd ; say ""
  "define "defa" "defb" "defc" "defd

defa = "ecagfvmid = 0.5 * ((vwnd(z+1)-monthvwnd(z+1)) * GRAV * (hgt(z+1)-monthhgt(z+1)) -"
defb =                    "cdiff(pow(GRAV * (hgt(z+1)-monthhgt(z+1)), 2.0) / 2.0 / coriol, x) / delx +"
defc =                    "(vwnd-monthvwnd) * GRAV * (hgt-monthhgt) -"
defd =                    "cdiff(pow(GRAV * (hgt-monthhgt), 2.0) / 2.0 / coriol, x) / delx)"
  say  "  "defa" "defb" "defc" "defd ; say ""
  "define "defa" "defb" "defc" "defd

defa = "eckgenmid = -0.5 * GRAV * ((uwnd(z+1)-monthuwnd(z+1)) * cdiff((hgt(z+1)-monthhgt(z+1)),x) / delx +"
defb =                            "(vwnd(z+1)-monthvwnd(z+1)) * cdiff((hgt(z+1)-monthhgt(z+1)),y) / dely +"
defc =                            "(uwnd-monthuwnd) * cdiff((hgt-monthhgt),x) / delx +"
defd =                            "(vwnd-monthvwnd) * cdiff((hgt-monthhgt),y) / dely)"
  say  "  "defa" "defb" "defc" "defd ; say ""
  "define "defa" "defb" "defc" "defd

defa = "ecghfcmid = -0.5 * GRAV * (hdivg((uwnd(z+1)-monthuwnd(z+1)) * (hgt(z+1)-monthhgt(z+1)),"
defb =                                  "(vwnd(z+1)-monthvwnd(z+1)) * (hgt(z+1)-monthhgt(z+1))) +"
defc =                            "hdivg((uwnd-monthuwnd) * (hgt-monthhgt),(vwnd-monthvwnd) * (hgt-monthhgt)))"
  say  "  "defa" "defb" "defc ; say ""
  "define "defa" "defb" "defc

defa = "ecgvfcmid = - GRAV * ((hgt-monthhgt) * (omega-monthomega) -"
defb =                       "(hgt(z+1)-monthhgt(z+1)) * (omega(z+1)-monthomega(z+1))) /"
defc =                      "(lev - lev(z+1)) / 100.0"
  say  "  "defa" "defb" "defc ; say ""
  "define "defa" "defb" "defc

defa = "ecbaromid = -0.5 * ((omega(z+1)-monthomega(z+1)) * 287.0 / lev(z+1) / 100.0 * (air(z+1)-monthair(z+1)) +"
defb =                     "(omega-monthomega) * 287.0 / lev / 100.0 * (air-monthair))"
  say  "  "defa" "defb ; say ""
  "define "defa" "defb

say "undefining temporary variables" ; say ""
"undefine EARTH"
"undefine D2R"
"undefine OMEG"
"undefine GRAV"

say "resetting the original viewing domain" ; say ""
if (tvar = "varying")
  "set t "tmin" "tmax
else
  "set t "tval
endif
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

say "re-creating the display script" ; say ""
"run gui_list"
