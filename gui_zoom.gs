* This script zooms in or out on a location of interest if
* arguments (---, --, ++, +++) are defined.  With no arguments,
* a new position of interest is defined by a mouse click, or
* region of interest defined by the click and drag feature.
* If the right or middle mouse button is used the viewing
* domain is reset to the entire domain.  Positions defining
* a new domain are "exact" (i.e. no "snapping to the grid", to
* permit domains smaller than a gridbox).  The catch is that
* reference is made to the last file open (perhaps required so
* that world-grid-xy conversions work) and if this file is a
* station data file, then the entire domain is assumed to be
* global.  The other catch is that define isn't yet valid for
* a station data file, so if another file isn't open, it isn't
* possible to define a variable position of interest - RD February 2001.

function zoom(args)

* define an initial position of interest (if calling
* this function for the first time) and the zoom factors

* inilon = 170
* inilat = 45
inilon =  0.1
inilat = 49.9
bigzoom = 4
lilzoom = 1

* find the last file open and use it as the default
* (so that world-grid-xy conversions work)

loop = 1
"q files"
message = sublin(result,loop)
while (message != "")
  if (subwrd(message,1) = "File")
    convfile = subwrd(message,2)
  endif
  loop = loop + 1
  message = sublin(result,loop)
endwhile

* also check for a file that isn't a station data file
* (so that the position of interest can be redefined)

definfile = convfile
loop = 1
while (loop <= convfile)
  "q file "loop
  rec = sublin(result,4)
  if (subwrd(rec,3) != "Station")
    definfile = loop
  endif
  loop = loop + 1
endwhile

* check for a central location of interest (otherwise define it)

"set dfile "definfile
"d cenlon"
rec = sublin(result,1)
cenlon = subwrd(rec,4)
if (cenlon = "Operand")
  "define cenlon = "inilon
  cenlon = inilon
endif

"d cenlat"
rec = sublin(result,1)
cenlat = subwrd(rec,4)
if (cenlat = "Operand")
  "define cenlat = "inilat
  cenlat = inilat
endif
"set dfile "convfile

* get the dimensions of the current viewing domain

"q dims"
rec = sublin(result,2)
lonmina = subwrd(rec,6)
lonmaxa = subwrd(rec,8)
diflona = lonmaxa - lonmina
rec = sublin(result,3)
latmina = subwrd(rec,6)
latmaxa = subwrd(rec,8)
diflata = latmaxa - latmina

* zooming out

if (args = "---" | args = "--")
  if (args = "---")
    zscale = bigzoom
  else
    zscale = lilzoom
  endif

* calculate and set the larger viewing domain (within limits)

  lonminb = cenlon - zscale * diflona
  lonmaxb = cenlon + zscale * diflona
  latminb = cenlat - zscale * diflata
  latmaxb = cenlat + zscale * diflata

  if (zscale * diflona >= 178.75 & zscale * diflata >= 90)
    lonminb = 0
    lonmaxb = 357.5
    latminb = -90
    latmaxb = 90
  endif

  "set lon "lonminb" "lonmaxb
  "set lat "latminb" "latmaxb
endif

* zooming in

if (args = "+++" | args = "++")
  if (args = "+++")
    zscale = 0.25 / bigzoom
  else
    zscale = 0.25 / lilzoom
  endif

* calculate and set the smaller viewing domain (no limits)

  lonminb = cenlon - zscale * diflona
  lonmaxb = cenlon + zscale * diflona
  latminb = cenlat - zscale * diflata
  latmaxb = cenlat + zscale * diflata

  "set lon "lonminb" "lonmaxb
  "set lat "latminb" "latmaxb
endif

* re-defining a position of interest

"q gxinfo"
rec = sublin(result,2)
pagex = subwrd(rec,4)
pagey = subwrd(rec,6)

if (args = "")
  "set rband 21 box 0 0 "pagex" "pagey
  "q pos"
  rec = sublin(result,1)
  xa = subwrd(rec,3)
  ya = subwrd(rec,4)
  xb = subwrd(rec,8)
  yb = subwrd(rec,9)
  button = subwrd(rec,5)

  if (button = 1)
    "q xy2w "xa" "ya
    rec = sublin(result,1)
    lonmina = subwrd(rec,3)
    latmaxa = subwrd(rec,6)
    "q xy2w "xb" "yb
    rec = sublin(result,1)
    lonmaxa = subwrd(rec,3)
    latmina = subwrd(rec,6)

    if (lonmaxa < lonmina)
      temp = lonmaxa
      lonmaxa = lonmina
      lonmina = temp
    endif
    if (latmaxa < latmina)
      temp = latmaxa
      latmaxa = latmina
      latmina = temp
    endif

    if ((xa - xb)*(xa - xb) < 0.005 | (ya - yb)*(ya - yb) < 0.005)
*     for a mouse click only, re-locate the position
*     of interest, keeping the domain size the same

      cenlon = (lonmaxa + lonmina) / 2.0
      cenlat = (latmaxa + latmina) / 2.0
      "set dfile "definfile
      "define cenlon = "cenlon
      "define cenlat = "cenlat
      "set dfile "convfile

      zscale = 0.5
      lonminb = cenlon - zscale * diflona
      lonmaxb = cenlon + zscale * diflona
      latminb = cenlat - zscale * diflata
      latmaxb = cenlat + zscale * diflata
      "set lon "lonminb" "lonmaxb
      "set lat "latminb" "latmaxb
    else
*     for a click and drag, re-define the domain of interest,
*     and calculate the new central position of interest

      cenlon = (lonmaxa + lonmina) / 2.0
      cenlat = (latmaxa + latmina) / 2.0
      "set dfile "definfile
      "define cenlon = "cenlon
      "define cenlat = "cenlat
      "set dfile "convfile

      "set lon "lonmina" "lonmaxa
      "set lat "latmina" "latmaxa
    endif
  else
*   if the left mouse button wasn't used, find the
*   dimensions of the entire viewing domain and reset everything

    "set dfile "definfile
    "define cenlon = "inilon
    "define cenlat = "inilat
    "set dfile "convfile

    "q file"
    rec = sublin(result,5)
    if (subwrd(rec,1) = "Tsize")
      say "detected a station data file - assuming global domain..."
      "set lon 0 357.5"
      "set lat -90 90"
    else
      xa = 1
      xb = subwrd(rec,3)
      ya = 1
      yb = subwrd(rec,6)
      "set x "xa" "xb
      "set y "ya" "yb
    endif
  endif
endif

"set dfile 1"
"run gui_disp"
