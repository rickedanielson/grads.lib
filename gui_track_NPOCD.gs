* This script finds and plots all tracks listed (in datafile) on
* the desired date (indate).  We assume that a field has been plotted
* already which defines the region of interest - RD November 2001.

function doit(indate)

datafile = '/home/rdanielson/data/track/NPOCD.noneglons'
say "searching for tracks on "indate" in "datafile

"set strsiz 0.15 0.15"                                             ;# set some plotting attributes
"set line 1 1 10"
#"set string 1 c 5"
dotsize = 0.1
bigdot = 0.2
#dotsize = 0.05
#bigdot = 0.15
seeit = 0

"q gxinfo"                                                         ;# and the clipping region
line = sublin(result,2)
xlorig = 0
xrorig = subwrd(line,4)
yborig = 0
ytorig = subwrd(line,6)
line = sublin(result,3)
xl = subwrd(line,4)
xr = subwrd(line,6)
line = sublin(result,4)
yb = subwrd(line,4)
yt = subwrd(line,6)
"set clip "xl" "xr" "yb" "yt

"q dims"                                                           ;# get the region of interest
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

a = 1
filestat = read(datafile)
while (sublin(filestat,1) = 0)                                     ;# read the data
  line = sublin(filestat,2)
  tag.a  = subwrd(line,1)
  date.a = subwrd(line,2)
  lat.a  = subwrd(line,3)
  lon.a  = subwrd(line,4)
  pres.a = subwrd(line,5)
  pc12.a = subwrd(line,6)
  pc24.a = subwrd(line,7)
  vort.a = subwrd(line,8)
  gr12.a = subwrd(line,9)
  gr24.a = subwrd(line,10)
  info.a = subwrd(line,11)

  b = a - 1
  if (a != 1 & tag.a != tag.b)                                     ;# at the beginning of each new track
    c = 1                                                          ;# loop through the previous track
    while (c < a)                                                  ;# to see if it occured on the desired
      if (date.c = indate)                                         ;# date, and if so plot it
      if (lat.c >= latminv & lat.c <= latmaxv & lon.c >= lonminv & lon.c <= lonmaxv)
        say "plotting track for "tag.1
        d = 1
        e = 2
        while (e < a)
          "q w2xy "lon.d" "lat.d
          rec = sublin(result,1)
          xbef = subwrd(rec,3)
          ybef = subwrd(rec,6)
          "q w2xy "lon.e" "lat.e
          rec = sublin(result,1)
          xaft = subwrd(rec,3)
          yaft = subwrd(rec,6)

          if (d = c)
            "draw mark 3 "xbef" "ybef" "bigdot
          else
            "draw mark 3 "xbef" "ybef" "dotsize
          endif
          if (e = c)
            "draw mark 3 "xaft" "yaft" "bigdot
          else
            "draw mark 3 "xaft" "yaft" "dotsize
          endif
          "draw line "xbef" "ybef" "xaft" "yaft

          d = d + 1
          e = e + 1
        endwhile
      endif
      endif
      c = c + 1
    endwhile

    tag.1  = tag.a                                                 ;# then move the data refering to the
    date.1 = date.a                                                ;# new case to the beginning of the data
    lat.1  = lat.a                                                 ;# arrays, and continue reading
    lon.1  = lon.a
    pres.1 = pres.a
    pc12.1 = pc12.a
    pc24.1 = pc24.a
    vort.1 = vort.a
    gr12.1 = gr12.a
    gr24.1 = gr24.a
    info.1 = info.a
    a = 1
  endif

  filestat = read(datafile)
  a = a + 1
endwhile
filestat = close(datafile)

"set line 1 1 3"                                                   ;# reset the plotting attributes
"set clip "xlorig" "xrorig" "yborig" "ytorig                       ;# and clipping region
