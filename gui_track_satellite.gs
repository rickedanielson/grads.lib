* This script plots a track, assuming calls such as
* "sdfopen /home/ricani/data/ncep.reanalysis/slp/slp.2016.nc" ; "set line 1 1 7" ; "set string 1 c"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.altika/39086          1 0.15         Altika  0.40  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.cryosat-2/36508       2 0.15      Cryosat-2  1.10  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.envisat/27386         3 0.15        ENVISAT  1.80  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.ers-1/21574           4 0.15          ERS-1  2.50  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.ers-2/23560           5 0.15          ERS-2  3.20  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.gfo/25157             6 0.15            GFO  3.90  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.hy-2a/37781           7 0.15          HY-2a  4.60  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.jason-1/26997         8 0.15        JASON-1  5.30  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.jason-2/33105         9 0.15        JASON-2  6.00  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.jason-3/41240        10 0.15        JASON-3  6.70  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.quikscat/25789       11 0.15       Quikscat  7.40  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.sentinel-1a/39634    12 0.15           S-1a  8.10  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.sentinel-2a/40697    13 0.15           S-2a  8.90  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.sentinel-3a/41335    14 0.15           S-3a  9.60  0.15  0.08"
* "run gui_track_satellite /home/ricani/data/track.satellite/satellites.topex-poseidon/22076 15 0.15 Topex-Poseidon 10.30  0.15  0.08"
* in the calling script - RD January 2001, March 2002, August 2016.

function track(args)

* get the track names, colour of the track, and position of interest (if applicable)

filstem = subwrd(args,1)
colour  = subwrd(args,2)
txtsize = subwrd(args,3)
labstrg = subwrd(args,4)
labxpos = subwrd(args,5)
labypos = subwrd(args,6)
labsize = subwrd(args,7)
dotsize = subwrd(args,8)
mrktype = subwrd(args,9)

if (colour = "")
  colour = 1
endif
if (txtsize = "")
  txtsize = 0.15
endif
if (dotsize = "")
  dotsize = 0.05
endif
if (mrktype = "")
  mrktype = 3
endif
miss = -9999.0
"set strsiz "txtsize
"set string "colour
"set line   "colour

* first check that the desired satellite track file exists

"run gui_date_simple"
datename = substr(result,1,10)
filename = filstem"."datename".trkmi" ; say "reading "filename
filestat = read(filename)
message  = sublin(filestat,1)
if (message != 0)
  say "ERROR : could not open "filename
else

"q gxinfo"
line3 = sublin(result,3)
line4 = sublin(result,4)
x1 = subwrd(line3,4)
x2 = subwrd(line3,6)
y1 = subwrd(line4,4)
y2 = subwrd(line4,6)
"set clip "x1" "x2" "y1" "y2

* query file for dimensions of current viewing domain and the last time

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

* plot all the satellite passes for that day

line   = sublin(filestat,2)
timbef = subwrd(line,1)
latbef = subwrd(line,2)
lonbef = subwrd(line,3) ;#if (lonbef < 0) ; lonbef = lonbef + 360 ; endif
"q w2xy "lonbef" "latbef
rec = sublin(result,1)
xbef = subwrd(rec,3)
ybef = subwrd(rec,6)
# say "q w2xy "lonbef" "latbef

filestat = read(filename)
message = sublin(filestat,1)
while (message = 0)
  line   = sublin(filestat,2)
  timaft = subwrd(line,1)
  lataft = subwrd(line,2)
  lonaft = subwrd(line,3) ;#if (lonaft < 0) ; lonaft = lonaft + 360 ; endif
  "q w2xy "lonaft" "lataft
  rec  = sublin(result,1)
  xaft = subwrd(rec,3)
  yaft = subwrd(rec,6)
# say "q w2xy "lonaft" "lataft

# if (lataft >= latminv & lataft <= latmaxv & lonaft >= lonminv & lonaft <= lonmaxv)
#   if (taft = timindex)
#     "draw mark "mrktype" "xaft" "yaft" "bigdot
#     biglat = lataft
#     biglon = lonaft
#   else
#     "draw mark "mrktype" "xaft" "yaft" "dotsize
#   endif
#   "draw line "xbef" "ybef" "xaft" "yaft
# endif

  del = lonaft - lonbef
  if (del > -120 & del < 120) ; "draw line "xbef" "ybef" "xaft" "yaft ; endif
# "draw mark "mrktype" "xbef" "ybef" "dotsize
# "draw mark "mrktype" "xaft" "yaft" "dotsize
  "set string "colour" c"
  "draw string "xbef" "ybef" "substr(timbef,1,4)
  "draw string "xaft" "yaft" "substr(timaft,1,4)
  timbef = timaft
  latbef = lataft ; ybef = yaft
  lonbef = lonaft ; xbef = xaft
  filestat = read(filename)
  message = sublin(filestat,1)
endwhile
filestat = close(filename)

"set string "colour" l"
"set clevs 9e9" ; "d lat"
if (labstrg != "")
  "set strsiz "labsize
  "draw string "labxpos" "labypos" "labstrg
endif

endif
