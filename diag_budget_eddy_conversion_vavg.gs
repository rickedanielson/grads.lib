* This script computes one of various diagnostic quantities using
* basic NCEP Reanalysis grids stored in a template netcdf file.
* An assumption is that the calculation domain of interest has been
* specified - RD, Apr `98

function econvavg(args)

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

vintpres = args

say ""
say "calculating APE-eddy KE conversion terms, vertically"
say "averaged from the surface to the "vintpres" hPa level"
say ""
say "using the following calculation domain:"
say "time from "timemin" to "timemax
say "lat from "latmin" to "latmax
say "lon from "lonmin" to "lonmax
say ""

say "defining field of 1.0 (assuming lon is defined)..." ; say ""
"set t 1"
"set z 1"
"set lat "latmin" "latmax
"set lon "lonmin" "lonmax
defa = "one = 1.0 + lon - lon"
  say  "  "defa ; say ""
  "define "defa

say "computing over time, lat, and lon:" ; say ""
"set t "timemin" "timemax
"set z 1"
"set lat "latmin" "latmax
"set lon "lonmin" "lonmax

defa = "eckinemidvavg = vint(sfcpres / 100.0, eckinemid, "vintpres") / vint(sfcpres / 100.0, one, "vintpres")"
  say  "  "defa ; say ""
  "define "defa

defa = "ecagfumidvavg = vint(sfcpres / 100.0, ecagfumid, "vintpres") / vint(sfcpres / 100.0, one, "vintpres")"
  say  "  "defa ; say ""
  "define "defa

defa = "ecagfvmidvavg = vint(sfcpres / 100.0, ecagfvmid, "vintpres") / vint(sfcpres / 100.0, one, "vintpres")"
  say  "  "defa ; say ""
  "define "defa

defa = "eckgenmidvavg = vint(sfcpres / 100.0, eckgenmid, "vintpres") / vint(sfcpres / 100.0, one, "vintpres")"
  say  "  "defa ; say ""
  "define "defa

defa = "ecghfcmidvavg = vint(sfcpres / 100.0, ecghfcmid, "vintpres") / vint(sfcpres / 100.0, one, "vintpres")"
  say  "  "defa ; say ""
  "define "defa

defa = "ecgvfcmidvavg = vint(sfcpres / 100.0, ecgvfcmid, "vintpres") / vint(sfcpres / 100.0, one, "vintpres")"
  say  "  "defa ; say ""
  "define "defa

defa = "ecbaromidvavg = vint(sfcpres / 100.0, ecbaromid, "vintpres") / vint(sfcpres / 100.0, one, "vintpres")"
  say  "  "defa ; say ""
  "define "defa

say "undefining field of 1.0" ; say ""
"undefine one"

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
