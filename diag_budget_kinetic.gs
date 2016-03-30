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

say "computing over time, level, lat, and lon:" ; say ""
"set t "timemin" "timemax
"set lev "levmin" "levmax
"set lat "latmin" "latmax
"set lon "lonmin" "lonmax

defa = "kinemid = 0.25 * (uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1) +"
defb =                   "uwnd * uwnd + vwnd * vwnd)"
  say  "  "defa" "defb ; say ""
  "define "defa" "defb

defa = "ukinemid = uwnd * 0.25 * (uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1) +"
defb =                           "uwnd * uwnd + vwnd * vwnd)"
  say  "  "defa" "defb ; say ""
  "define "defa" "defb

defa = "vkinemid = vwnd * 0.25 * (uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1) +"
defb =                           "uwnd * uwnd + vwnd * vwnd)"
  say  "  "defa" "defb ; say ""
  "define "defa" "defb

defa = "wkinemid = omega * 0.25 * (uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1) +"
defb =                           "uwnd * uwnd + vwnd * vwnd)"
  say  "  "defa" "defb ; say ""
  "define "defa" "defb

defa = "ktendmid = 0.25 * (uwnd(t+1,z+1) * uwnd(t+1,z+1) + vwnd(t+1,z+1) * vwnd(t+1,z+1) -"
defb =                    "uwnd(t-1,z+1) * uwnd(t-1,z+1) - vwnd(t-1,z+1) * vwnd(t-1,z+1) +"
defc =                    "uwnd(t+1) * uwnd(t+1) + vwnd(t+1) * vwnd(t+1) -"
defd =                    "uwnd(t-1) * uwnd(t-1) - vwnd(t-1) * vwnd(t-1)) / 12.0 / 60.0 / 60.0"
  say  "  "defa" "defb" "defc" "defd ; say ""
  "define "defa" "defb" "defc" "defd

defa = "khfcmid = -0.25 * (hdivg((uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1)) * uwnd(z+1),"
defb =                          "(uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1)) * vwnd(z+1)) +"
defc =                    "hdivg((uwnd * uwnd + vwnd * vwnd) * uwnd,"
defd =                          "(uwnd * uwnd + vwnd * vwnd) * vwnd))"
  say  "  "defa" "defb" "defc" "defd ; say ""
  "define "defa" "defb" "defc" "defd

defa = "kvfcmid = -0.5 * ((uwnd * uwnd + vwnd * vwnd) * omega -"
defb =                   "(uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1)) * omega(z+1)) /"
defc =                  "(lev - lev(z+1)) / 100.0"
  say  "  "defa" "defb" "defc ; say ""
  "define "defa" "defb" "defc

defa = "kgenmid = -0.5 * GRAV * (uwnd(z+1) * cdiff(hgt(z+1),x) / delx + vwnd(z+1) * cdiff(hgt(z+1),y) / dely +"
defb =                          "uwnd * cdiff(hgt,x) / delx + vwnd * cdiff(hgt,y) / dely)"
  say  "  "defa" "defb ; say ""
  "define "defa" "defb

defa = "kresmid = ktendmid - khfcmid - kvfcmid - kgenmid"
  say  "  "defa ; say ""
  "define "defa

defa = "kabremid = abs(ktendmid - khfcmid - kvfcmid - kgenmid)"
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

# tendency - forward difference

#defa = "ktendmid = 0.25 * (uwnd(t+1,z+1) * uwnd(t+1,z+1) + vwnd(t+1,z+1) * vwnd(t+1,z+1) -"
#defb =                    "uwnd(z+1) * uwnd(z+1) - vwnd(z+1) * vwnd(z+1) +"
#defc =                    "uwnd(t+1) * uwnd(t+1) + vwnd(t+1) * vwnd(t+1) -"
#defd =                    "uwnd * uwnd - vwnd * vwnd) / 6.0 / 60.0 / 60.0"
#  say  "  "defa" "defb" "defc" "defd ; say ""
#  "define "defa" "defb" "defc" "defd

# tendency - backward difference

#defa = "ktendmid = 0.25 * (uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1) -"
#defb =                    "uwnd(t-1,z+1) * uwnd(t-1,z+1) - vwnd(t-1,z+1) * vwnd(t-1,z+1) +"
#defc =                    "uwnd * uwnd + vwnd * vwnd -"
#defd =                    "uwnd(t-1) * uwnd(t-1) - vwnd(t-1) * vwnd(t-1)) / 6.0 / 60.0 / 60.0"
#  say  "  "defa" "defb" "defc" "defd ; say ""
#  "define "defa" "defb" "defc" "defd

# time average (forward)

#say "computing over time, lat, and lon:" ; say ""
#"set t "timemin" "timemax
#"set z 1"
#"set lat "latmin" "latmax
#"set lon "lonmin" "lonmax

#defa = "avsfcp = (sfcpres + sfcpres(t+1)) / 2.0"
#  say  "  "defa ; say ""
#  "define "defa

#defa = "kinemidav = 0.125 * (uwnd(t+1,z+1) * uwnd(t+1,z+1) + vwnd(t+1,z+1) * vwnd(t+1,z+1) +"
#defb =                      "uwnd(t+1) * uwnd(t+1) + vwnd(t+1) * vwnd(t+1) +"
#defc =                      "uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1) +"
#defd =                      "uwnd * uwnd + vwnd * vwnd)"
#  say  "  "defa" "defb" "defc" "defd ; say ""
#  "define "defa" "defb" "defc" "defd

#defa = "ktendmidav = 0.25 * (uwnd(t+1,z+1) * uwnd(t+1,z+1) + vwnd(t+1,z+1) * vwnd(t+1,z+1) -"
#defb =                      "uwnd(z+1) * uwnd(z+1) - vwnd(z+1) * vwnd(z+1) +"
#defc =                      "uwnd(t+1) * uwnd(t+1) + vwnd(t+1) * vwnd(t+1) -"
#defd =                      "uwnd * uwnd - vwnd * vwnd) / 6.0 / 60.0 / 60.0"
#  say  "  "defa" "defb" "defc" "defd ; say ""
#  "define "defa" "defb" "defc" "defd

#defa = "khfcmidav = -0.125 * (hdivg((uwnd(t+1,z+1) * uwnd(t+1,z+1) + vwnd(t+1,z+1) * vwnd(t+1,z+1)) * uwnd(t+1,z+1),"
#defb =                             "(uwnd(t+1,z+1) * uwnd(t+1,z+1) + vwnd(t+1,z+1) * vwnd(t+1,z+1)) * vwnd(t+1,z+1)) +"
#defc =                       "hdivg((uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1)) * uwnd(z+1),"
#defd =                             "(uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1)) * vwnd(z+1)) +"
#defe =                       "hdivg((uwnd(t+1) * uwnd(t+1) + vwnd(t+1) * vwnd(t+1)) * uwnd(t+1),"
#deff =                             "(uwnd(t+1) * uwnd(t+1) + vwnd(t+1) * vwnd(t+1)) * vwnd(t+1)) +"
#defg =                       "hdivg((uwnd * uwnd + vwnd * vwnd) * uwnd,"
#defh =                             "(uwnd * uwnd + vwnd * vwnd) * vwnd))"
#  say  "  "defa" "defb" "defc" "defd" "defe" "deff" "defg" "defh ; say ""
#  "define "defa" "defb" "defc" "defd" "defe" "deff" "defg" "defh

#defa = "kvfcmidav = -0.25 * ((uwnd * uwnd + vwnd * vwnd) * omega -"
#defb =                      "(uwnd(z+1) * uwnd(z+1) + vwnd(z+1) * vwnd(z+1)) * omega(z+1) +"
#defc =                      "(uwnd(t+1) * uwnd(t+1) + vwnd(t+1) * vwnd(t+1)) * omega(t+1) -"
#defd =                      "(uwnd(t+1,z+1) * uwnd(t+1,z+1) + vwnd(t+1,z+1) * vwnd(t+1,z+1)) * omega(t+1,z+1)) /"
#defc =                     "(lev - lev(z+1)) / 100.0"
#  say  "  "defa" "defb" "defc ; say ""
#  "define "defa" "defb" "defc

#defa = "kgenmidav = -0.25 * GRAV * (uwnd(t+1,z+1) * cdiff(hgt(t+1,z+1),x) / delx + vwnd(t+1,z+1) * cdiff(hgt(t+1,z+1),y) / dely +"
#defb =                           "uwnd(z+1) * cdiff(hgt(z+1),x) / delx + vwnd(z+1) * cdiff(hgt(z+1),y) / dely +"
#defc =                           "uwnd(t+1) * cdiff(hgt(t+1),x) / delx + vwnd(t+1) * cdiff(hgt(t+1),y) / dely +"
#defd =                           "uwnd * cdiff(hgt,x) / delx + vwnd * cdiff(hgt,y) / dely)"
#  say  "  "defa" "defb" "defc" "defd ; say ""
#  "define "defa" "defb" "defc" "defd

#defa = "kresmidav = ktendmidav - khfcmidav - kvfcmidav - kgenmidav"
#  say  "  "defa ; say ""
#  "define "defa

#defa = "kabremidav = abs(ktendmidav - khfcmidav - kvfcmidav - kgenmidav)"
#  say  "  "defa ; say ""
#  "define "defa
