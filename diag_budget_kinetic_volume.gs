* This script computes one of various diagnostic quantities using
* basic NCEP Reanalysis grids stored in a template netcdf file.
* An assumption is that the calculation domain of interest has been
* specified - RD, Apr `98

function kebvol()

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
say "calculating the volume-averaged kinetic energy budget terms,"
say "area-averaging the vertically averaged terms and using a mask"
say ""

say "computing over time:" ; say ""
"set t "timemin" "timemax
"set z 1"
"set lat "latmin
"set lon "lonmin

defa = "kmassvol = aave(maskout(kmassvint,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

defa = "ksfcpresvol = aave(maskout(sfcpres/100.0,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

defa = "kinemidvol = aave(maskout(kinemidvavg,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

defa = "ktendmidvol = 1e3 * aave(maskout(ktendmidvavg,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

defa = "khfcmidvol = 1e3 * aave(maskout(khfcmidvavg,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

defa = "kvfcmidvol = 1e3 * aave(maskout(kvfcmidvavg,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

defa = "kgenmidvol = 1e3 * aave(maskout(kgenmidvavg,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

defa = "kresmidvol = 1e3 * aave(maskout(kresmidvavg,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

defa = "kabremidvol = 1e3 * aave(maskout(kabremidvavg,kemask-0.5),lon="lonmin",lon="lonmax",lat="latmin",lat="latmax")"
  say  "  "defa ; say ""
  "define "defa

say "     Start of          Average Kinetic          70 hPa--Surf            Surface"
say "   6-h Intvl          Energy (m2/s2)         Average Mass (kg)      Pressure (hPa)"

"set t "timemin
"set z 1"
"set lat "latmin
"set lon "lonmin

"run gui_date"  ; date = result
"d kinemidvol"  ; rec = sublin(result,1) ; kinemidvol  = subwrd(rec,4)
"d kmassvol"    ; rec = sublin(result,1) ; kmassvol    = subwrd(rec,4)
"d ksfcpresvol" ; rec = sublin(result,1) ; ksfcpresvol = subwrd(rec,4)
defa = date"         "kinemidvol"                "kmassvol"                "ksfcpresvol
say defa

"set t "timemin+1
"run gui_date"  ; date = result
"d kinemidvol"  ; rec = sublin(result,1) ; kinemidvol  = subwrd(rec,4)
"d kmassvol"    ; rec = sublin(result,1) ; kmassvol    = subwrd(rec,4)
"d ksfcpresvol" ; rec = sublin(result,1) ; ksfcpresvol = subwrd(rec,4)
defa = date"         "kinemidvol"                "kmassvol"                "ksfcpresvol
say defa

"set t "timemin+2
"run gui_date"  ; date = result
"d kinemidvol"  ; rec = sublin(result,1) ; kinemidvol  = subwrd(rec,4)
"d kmassvol"    ; rec = sublin(result,1) ; kmassvol    = subwrd(rec,4)
"d ksfcpresvol" ; rec = sublin(result,1) ; ksfcpresvol = subwrd(rec,4)
defa = date"         "kinemidvol"                "kmassvol"                "ksfcpresvol
say defa

"set t "timemin+3
"run gui_date"  ; date = result
"d kinemidvol"  ; rec = sublin(result,1) ; kinemidvol  = subwrd(rec,4)
"d kmassvol"    ; rec = sublin(result,1) ; kmassvol    = subwrd(rec,4)
"d ksfcpresvol" ; rec = sublin(result,1) ; ksfcpresvol = subwrd(rec,4)
defa = date"         "kinemidvol"                "kmassvol"                "ksfcpresvol
say defa

"set t "timemin+4
"run gui_date"  ; date = result
"d kinemidvol"  ; rec = sublin(result,1) ; kinemidvol  = subwrd(rec,4)
"d kmassvol"    ; rec = sublin(result,1) ; kmassvol    = subwrd(rec,4)
"d ksfcpresvol" ; rec = sublin(result,1) ; ksfcpresvol = subwrd(rec,4)
defa = date"         "kinemidvol"                "kmassvol"                "ksfcpresvol
say defa

"set t "timemin+5
"run gui_date"  ; date = result
"d kinemidvol"  ; rec = sublin(result,1) ; kinemidvol  = subwrd(rec,4)
"d kmassvol"    ; rec = sublin(result,1) ; kmassvol    = subwrd(rec,4)
"d ksfcpresvol" ; rec = sublin(result,1) ; ksfcpresvol = subwrd(rec,4)
defa = date"         "kinemidvol"                "kmassvol"                "ksfcpresvol
say defa

"set t "timemin
"set z 1"
"set lat "latmin
"set lon "lonmin

"d ktendmidvol" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+1
"d ktendmidvol" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+2
"d ktendmidvol" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+3
"d ktendmidvol" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+4
"d ktendmidvol" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+5
"d ktendmidvol" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin
"d ktendmidvol/kinemidvol*86.4" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol/kinemidvol*86.4"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+1
"d ktendmidvol/kinemidvol*86.4" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol/kinemidvol*86.4"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+2
"d ktendmidvol/kinemidvol*86.4" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol/kinemidvol*86.4"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+3
"d ktendmidvol/kinemidvol*86.4" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol/kinemidvol*86.4"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+4
"d ktendmidvol/kinemidvol*86.4" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol/kinemidvol*86.4"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa

"set t "timemin+5
"d ktendmidvol/kinemidvol*86.4" ; rec = sublin(result,1) ; ktendmidvol = subwrd(rec,4)
"d khfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; khfcmidvol  = subwrd(rec,4)
"d kvfcmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kvfcmidvol  = subwrd(rec,4)
"d kgenmidvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kgenmidvol  = subwrd(rec,4)
"d kresvol/kinemidvol*86.4"     ; rec = sublin(result,1) ; kresvol     = subwrd(rec,4)
"d kabsresvol/kinemidvol*86.4"  ; rec = sublin(result,1) ; kabsresvol  = subwrd(rec,4)
defa = "   "ktendmidvol"          "khfcmidvol"             "kvfcmidvol"             "kgenmidvol"             "kresvol"             "kabsresvol
say defa ; say ""

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
