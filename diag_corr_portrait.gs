* This script computes the area-weighted correlation between two
* horizontally varying fields.  The calculation domain of interest
* is assumed to be the viewable domain - (original corr.gs by ?) RD October 1999

function correl(args)
arga = subwrd(args,1)
argb = subwrd(args,2)
if (arga = "" | argb = "")
 say ""
 say "ERROR: two fields are needed to calculate the correlation"
 say "e.g. run diag_corr uwnd vwnd"
 say ""
 return
endif

* query file for dimensions of current viewing domain

"q dims"
say result
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
  latminv = subwrd(rec,6)
  latmaxv = subwrd(rec,8)
else
  yval = subwrd(rec,9)
  yvar = "fixed"
endif

rec = sublin(result,2)
if (subwrd(rec,3) = "varying")
  xmin = subwrd(rec,11)
  xmax = subwrd(rec,13)
  xvar = "varying"
  lonminv = subwrd(rec,6)
  lonmaxv = subwrd(rec,8)
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
say "calculating correlation for "arga" and "argb
say "using the current domain"
say ""

# calculate the unweighted and weighted correlation coefficients

#result = corru(arga,argb,lonminv,lonmaxv,latminv,latmaxv)
#numdef = subwrd(result,1)
#nundef = subwrd(result,2)
#rhou   = subwrd(result,3)
result = corrw(arga,argb,lonminv,lonmaxv,latminv,latmaxv)
numdef = subwrd(result,1)
nundef = subwrd(result,2)
rhow   = subwrd(result,3)

# plot the first panel with labels

"set vpage 0 8.5 4.5 11"
"set grads off"
#"set xaxis -200 1800 200"
#"set yaxis -0.000 0.025 0.005"
"set vrange 0 1800"
"set vrange2 0 0.02"
"set gxout scatter"
"d "arga";"argb

"draw title `3r`0`barea-weighted`n = "rhow
#"draw string 4.0 4.0 `3r`0`bunweighted`n = "rhou

#"set strsiz 0.15 0.15"
"set string 1 c 5 90"
"draw string 0.5 3.25 "argb" (m2/s3)"
"set string 1 c 5 0"
"draw string 4.25 0.5 "arga" (m2/s2)"
#"draw xlab "arga" (m2/s2)"
#"draw ylab "argb" (m2/s3)"

"set string 1 l 5"
"draw string 0.9 6.3 "numdef" boxes def'd"
"draw string 0.9 6.0 "nundef" undef'd"

"set string 1 r 5"
"draw string 8.3 6.3 lon=["lonminv", "lonmaxv"]"
"draw string 8.3 6.0 lat=["latminv", "latmaxv"]"

# and the second panel with labels

"set vpage 0 8.5 0 5.5"
"set grads off"
"set gxout contour"
"set cint 200"
"d "arga
"set cthick 9"
"set cint 0.005"
"d "argb
"set cthick 1"

"run gui_date"
"draw title "result
"set string 1 l 5"
"draw string 0.5 1.0 "arga" (200 m2/s2)"
"draw string 0.5 0.6 "argb" (0.005 m2/s3 - bold)"
#"run gui_headerv"

say "resetting the original viewing domain" ; say ""
"set vpage off"
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

function corrw(arga,argb,lonminv,lonmaxv,latminv,latmaxv)

# calculate the correlation coefficient for 2-D horizontal fields using aave
# for non-horizontal fields use ave(ave...)
# requires that the grids have the same number of undefined and defined points
# based on formula on p.92 of Panofsky and Brier, 1968 "Some applications of
# statistics to meteorology." Penn State Press

"set gxout stat"
"d "arga
resulta = result
"d "argb
resultb = result

carda = sublin(resulta,7)
cardb = sublin(resultb,7)
numdefa = subwrd(carda,8)
nundefa = subwrd(carda,4)
numdefb = subwrd(cardb,8)
nundefb = subwrd(cardb,4)

say " The number of defined points in "arga" is "numdefa" and undefined points is "nundefa
say " The number of defined points in "argb" is "numdefb" and undefined points is "nundefb
if (numdefa != numdefb | nundefa != nundefb)
  say " ERROR: these values should be the same..."
  line = "0 0 -9.99999"
  return(line)
endif

"set gxout contour"
"d aave("arga",         lon="lonminv",lon="lonmaxv",lat="latminv",lat="latmaxv")"
avea  = subwrd(result,4)
"d aave("argb",         lon="lonminv",lon="lonmaxv",lat="latminv",lat="latmaxv")"
aveb  = subwrd(result,4)
"d aave("arga" * "argb",lon="lonminv",lon="lonmaxv",lat="latminv",lat="latmaxv")"
avec = subwrd(result,4)
"d aave("arga" * "arga",lon="lonminv",lon="lonmaxv",lat="latminv",lat="latmaxv")"
avesqa = subwrd(result,4)
"d aave("argb" * "argb",lon="lonminv",lon="lonmaxv",lat="latminv",lat="latmaxv")"
avesqb = subwrd(result,4)

"d "avec" - "avea" * "aveb
num = subwrd(result,4)
"d sqrt("avesqa" - "avea" * "avea")"
den1 = subwrd(result,4)
"d sqrt("avesqb" - "aveb" * "aveb")"
den2 = subwrd(result,4)
"d "num" / ("den1" * "den2")"
corr = subwrd(result,4)

say " The area-weighted correlation = "corr
line = numdefa" "nundefa" "corr
return(line)

function corru(arga,argb,lonminv,lonmaxv,latminv,latmaxv)

* use the biased (/N) not the unbiased (/(N-1)) statistics output from gxout stat
* ASSUMES THE GRIDS HAVE THE SAME NUMBER OF DEFINED POINTS!!!!
* based on formula on p.92 of Panofsky and Brier, 1968 "Some applications of
* statistics to meteorology." Penn State Press

"set gxout stat"
"d "arga
resulta = result
"d "argb
resultb = result
"d "arga" * "argb
resultc = result

# loop through the stat output for the number of defined
# and undefined points used, and the (biased) squared values

i = 1
carda = sublin(resulta,i)
cardb = sublin(resultb,i)
cardc = sublin(resultc,i)
while(carda != 0)
  if(subwrd(carda,2) = "count")
    numdefa = subwrd(carda,8)
    nundefa = subwrd(carda,4)
    numdefb = subwrd(cardb,8)
    nundefb = subwrd(cardb,4)
    say " The number of defined points in "arga" is "numdefa" and undefined points is "nundefa
    say " The number of defined points in "argb" is "numdefb" and undefined points is "nundefb
    if (numdefa != numdefb | nundefa != nundefb)
      say " ERROR: these values should be the same..."
      line = "0 0 -9.99999"
      return(line)
    endif
  endif

  if(subwrd(carda,1) = "Stats[(sum,sumsqr,root(sumsqr))/n]:")
    avea   = subwrd(carda,2)
    aveb   = subwrd(cardb,2)
    avec   = subwrd(cardc,2)
    avesqa = subwrd(carda,3)
    avesqb = subwrd(cardb,3)
    break
  endif

  i = i + 1
  carda = sublin(resulta,i)
  cardb = sublin(resultb,i)
  cardc = sublin(resultc,i)
endwhile

# turn off stat output and do the rest of the calculation

"set gxout contour"
"d "avec" - "avea" * "aveb
num = subwrd(result,4)
"d sqrt("avesqa" - "avea" * "avea")"
den1 = subwrd(result,4)
"d sqrt("avesqb" - "aveb" * "aveb")"
den2 = subwrd(result,4)
"d "num" / ("den1" * "den2")"
corr = subwrd(result,4)

say " The UNWEIGHTED correlation = "corr
line = numdefa" "nundefa" "corr
return(line)
