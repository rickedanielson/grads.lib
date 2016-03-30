* This script computes one of various diagnostic quantities using
* basic NCEP Reanalysis grids stored in a template netcdf file.
* An assumption is that the calculation domain of interest has been
* specified - RD, Feb `99

function keb()

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
say "calculating kinetic energy budget terms, pointwise"
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

say "computing over time, lat, and lon:" ; say ""
"set t "timemin" "timemax
"set z 1"
"set lat "latmin" "latmax
"set lon "lonmin" "lonmax

defa = "avsfcp = (sfcpres + sfcpres(t+1)) / 2.0"
  say  "  "defa ; say ""
  "define "defa

say "computing over time, level, lat, and lon:" ; say ""
"set t "timemin" "timemax
"set lev "levmin" "levmax
"set lat "latmin" "latmax
"set lon "lonmin" "lonmax

defa = "muwnd = shum * uwnd"
  say  "  "defa ; say ""
  "define "defa

defa = "mvwnd = shum * vwnd"
  say  "  "defa ; say ""
  "define "defa

defa = "mwwnd = shum * omega"
  say  "  "defa ; say ""
  "define "defa

#defa = "mtend = (shum(t+1) - shum(t-1)) / 6.0 / 60.0 / 60.0"
defa = "mtend = (shum(t+1) - shum(t-1)) / 12.0 / 60.0 / 60.0"
  say  "  "defa ; say ""
  "define "defa

defa = "mhfc = -hdivg(shum * uwnd, shum * vwnd)"
  say  "  "defa ; say ""
  "define "defa

defa = "mvfc = -(shum(z-1) * omega(z-1) - shum(z+1) * omega(z+1)) / (lev(z-1) - lev(z+1)) / 100.0"
  say  "  "defa ; say ""
  "define "defa

defa = "mres = mtend - mhfc - mvfc"
  say  "  "defa ; say ""
  "define "defa

defa = "mabre = abs(mtend - mhfc - mvfc)"
  say  "  "defa ; say ""
  "define "defa

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



# other formulae:

# time average

#defa = "amtendmid = 0.5 * (shum(t+1,z+1) - shum(z+1) + shum(t+1) - shum) / 6.0 / 60.0 / 60.0"
#  say  "  "defa ; say ""
#  "define "defa

#defa = "amhfcmid = -0.25 * (hdivg(shum(t+1,z+1) * uwnd(t+1,z+1), shum(t+1,z+1) * vwnd(t+1,z+1)) +"
#defb =                    "hdivg(shum(z+1) * uwnd(z+1), shum(z+1) * vwnd(z+1)) +"
#defc =                    "hdivg(shum(t+1) * uwnd(t+1), shum(t+1) * vwnd(t+1)) +"
#defd =                    "hdivg(shum * uwnd, shum * vwnd))"
#  say  "  "defa" "defb" "defc" "defd ; say ""
#  "define "defa" "defb" "defc" "defd

#defa = "amvfcmid = -0.5 * (shum * omega - shum(z+1) * omega(z+1) +"
#defb =                   "shum(t+1) * omega(t+1) - shum(t+1,z+1) * omega(t+1,z+1)) /"
#defc =                  "(lev - lev(z+1)) / 100.0"
#  say  "  "defa" "defb" "defc ; say ""
#  "define "defa" "defb" "defc

#defa = "amresmid = amtendmid - amhfcmid - amvfcmid"
#  say  "  "defa ; say ""
#  "define "defa

#defa = "amabremid = abs(amtendmid - amhfcmid - amvfcmid)"
#  say  "  "defa ; say ""
#  "define "defa
