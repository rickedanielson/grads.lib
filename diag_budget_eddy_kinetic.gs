* This script computes one of various diagnostic quantities using
* basic NCEP Reanalysis grids stored in a template netcdf file.
* An assumption is that the calculation domain of interest has been
* specified - RD, Feb `99

function ekeb()

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
say "calculating eddy kinetic energy budget terms, pointwise"
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

defa = "ekinemid = 0.25 * ((uwnd(z+1)-monthuwnd(z+1)) * (uwnd(z+1)-monthuwnd(z+1)) +"
defb =                    "(vwnd(z+1)-monthvwnd(z+1)) * (vwnd(z+1)-monthvwnd(z+1)) +"
defc =                    "(uwnd-monthuwnd) * (uwnd-monthuwnd) + (vwnd-monthvwnd) * (vwnd-monthvwnd))"
#  say  "  "defa" "defb" "defc ; say ""
#  "define "defa" "defb" "defc

defa = "ektendmid = 0.25 * ((uwnd(t+1,z+1)-monthuwnd(z+1)) * (uwnd(t+1,z+1)-monthuwnd(z+1)) +"
defb =                     "(vwnd(t+1,z+1)-monthvwnd(z+1)) * (vwnd(t+1,z+1)-monthvwnd(z+1)) -"
defc =                     "(uwnd(t-1,z+1)-monthuwnd(z+1)) * (uwnd(t-1,z+1)-monthuwnd(z+1)) -"
defd =                     "(vwnd(t-1,z+1)-monthvwnd(z+1)) * (vwnd(t-1,z+1)-monthvwnd(z+1)) +"
defe =                     "(uwnd(t+1)-monthuwnd) * (uwnd(t+1)-monthuwnd) +"
deff =                     "(vwnd(t+1)-monthvwnd) * (vwnd(t+1)-monthvwnd) -"
defg =                     "(uwnd(t-1)-monthuwnd) * (uwnd(t-1)-monthuwnd) -"
defh =                     "(vwnd(t-1)-monthvwnd) * (vwnd(t-1)-monthvwnd)) / 12.0 / 60.0 / 60.0"
#  say  "  "defa" "defb" "defc" "defd" "defe" "deff" "defg" "defh ; say ""
#  "define "defa" "defb" "defc" "defd" "defe" "deff" "defg" "defh

defa = "ekhfcmid = -0.25 * (hdivg(((uwnd(z+1)-monthuwnd(z+1)) * (uwnd(z+1)-monthuwnd(z+1)) +"
defb =                            "(vwnd(z+1)-monthvwnd(z+1)) * (vwnd(z+1)-monthvwnd(z+1))) * uwnd(z+1),"
defc =                           "((uwnd(z+1)-monthuwnd(z+1)) * (uwnd(z+1)-monthuwnd(z+1)) +"
defd =                            "(vwnd(z+1)-monthvwnd(z+1)) * (vwnd(z+1)-monthvwnd(z+1))) * vwnd(z+1)) +"
defe =                     "hdivg(((uwnd-monthuwnd) * (uwnd-monthuwnd) + (vwnd-monthvwnd) * (vwnd-monthvwnd)) * uwnd,"
deff =                           "((uwnd-monthuwnd) * (uwnd-monthuwnd) + (vwnd-monthvwnd) * (vwnd-monthvwnd)) * vwnd))"
#  say  "  "defa" "defb" "defc" "defd" "defe" "deff ; say ""
#  "define "defa" "defb" "defc" "defd" "defe" "deff

defa = "ekvfcmid = -0.5 * (((uwnd-monthuwnd) * (uwnd-monthuwnd) + (vwnd-monthvwnd) * (vwnd-monthvwnd)) * omega -"
defb =                    "((uwnd(z+1)-monthuwnd(z+1)) * (uwnd(z+1)-monthuwnd(z+1)) +"
defc =                     "(vwnd(z+1)-monthvwnd(z+1)) * (vwnd(z+1)-monthvwnd(z+1))) * omega(z+1)) /"
defd =                   "(lev - lev(z+1)) / 100.0"
#  say  "  "defa" "defb" "defc" "defd ; say ""
#  "define "defa" "defb" "defc" "defd

defa = "ekgenmid = -0.5 * GRAV * ((uwnd(z+1)-monthuwnd(z+1)) * cdiff((hgt(z+1)-monthhgt(z+1)),x) / delx +"
defb =                           "(vwnd(z+1)-monthvwnd(z+1)) * cdiff((hgt(z+1)-monthhgt(z+1)),y) / dely +"
defc =                           "(uwnd-monthuwnd) * cdiff((hgt-monthhgt),x) / delx +"
defd =                           "(vwnd-monthvwnd) * cdiff((hgt-monthhgt),y) / dely)"
#  say  "  "defa" "defb" "defc" "defd ; say ""
#  "define "defa" "defb" "defc" "defd

defa = "ekreymid = -0.5 * ((uwnd(z+1)-uwnd.2(t=1,z+1)) * (uwnd(z+1)-uwnd.2(t=1,z+1)) * cdiff(uwnd.2(t=1,z+1),x) / delx +"
defb =                    "(uwnd(z+1)-uwnd.2(t=1,z+1)) * (vwnd(z+1)-vwnd.2(t=1,z+1)) * (cdiff(uwnd.2(t=1,z+1),y) / dely +"
defc =                                                                                 "cdiff(vwnd.2(t=1,z+1),x) / delx) +"
defd =                    "(vwnd(z+1)-vwnd.2(t=1,z+1)) * (vwnd(z+1)-vwnd.2(t=1,z+1)) * cdiff(vwnd.2(t=1,z+1),y) / dely +"
defe =                    "(uwnd-uwnd.2(t=1)) * (uwnd-uwnd.2(t=1)) * cdiff(uwnd.2(t=1),x) / delx +"
deff =                    "(uwnd-uwnd.2(t=1)) * (vwnd-vwnd.2(t=1)) * (cdiff(uwnd.2(t=1),y) / dely + cdiff(vwnd.2(t=1),x) / delx) +"
defg =                    "(vwnd-vwnd.2(t=1)) * (vwnd-vwnd.2(t=1)) * cdiff(vwnd.2(t=1),y) / dely)"
#  say  "  "defa" "defb" "defc" "defd" "defe" "deff" "defg ; say ""
#  "define "defa" "defb" "defc" "defd" "defe" "deff" "defg

defa = "ekreymia = -0.5 * ((uwnd(z+1)-uwnd.2(t=1,z+1)) * (uwnd(z+1)-uwnd.2(t=1,z+1)) * cdiff(uwnd.2(t=1,z+1),x) / delx +"
defe =                    "(uwnd-uwnd.2(t=1)) * (uwnd-uwnd.2(t=1)) * cdiff(uwnd.2(t=1),x) / delx)"
  say  "  "defa" "defe ; say ""
  "define "defa" "defe

defb = "ekreymib = -0.5 * ((uwnd(z+1)-uwnd.2(t=1,z+1)) * (vwnd(z+1)-vwnd.2(t=1,z+1)) * (cdiff(uwnd.2(t=1,z+1),y) / dely) +"
deff =                    "(uwnd-uwnd.2(t=1)) * (vwnd-vwnd.2(t=1)) * (cdiff(uwnd.2(t=1),y) / dely))"
  say  "  "defb" "deff ; say ""
  "define "defb" "deff

defb = "ekreymic = -0.5 * ((uwnd(z+1)-uwnd.2(t=1,z+1)) * (vwnd(z+1)-vwnd.2(t=1,z+1)) * (cdiff(vwnd.2(t=1,z+1),x) / delx) +"
deff =                    "(uwnd-uwnd.2(t=1)) * (vwnd-vwnd.2(t=1)) * (cdiff(vwnd.2(t=1),x) / delx))"
  say  "  "defb" "deff ; say ""
  "define "defb" "deff

defd = "ekreymid = -0.5 * ((vwnd(z+1)-vwnd.2(t=1,z+1)) * (vwnd(z+1)-vwnd.2(t=1,z+1)) * cdiff(vwnd.2(t=1,z+1),y) / dely +"
defg =                    "(vwnd-vwnd.2(t=1)) * (vwnd-vwnd.2(t=1)) * cdiff(vwnd.2(t=1),y) / dely)"
  say  "  "defd" "defg ; say ""
  "define "defd" "defg

defa = "ekresmid = ektendmid - ekhfcmid - ekvfcmid - ekgenmid - ekreymid"
#  say  "  "defa ; say ""
#  "define "defa

defa = "ekabremid = abs(ektendmid - ekhfcmid - ekvfcmid - ekgenmid - ekreymid)"
#  say  "  "defa ; say ""
#  "define "defa

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
