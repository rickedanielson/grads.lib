# This script is designed to print budget comparisons
*
*     grads -bpc "plot.track.forcing.summary.basic"
*
* where no data files are required - RD August 2002.

file.1.1 = "gd2000.dj30d"
file.1.2 = "gd2000.om30d"
file.2.1 = "dj30d"
file.2.2 = "om30d"
file.3.1 = "dec"
file.3.2 = "mar"
file.4.1 = "midwinter"
file.4.2 = "transitional"

vars   = 14
nam.1  = "  Omega  "
nam.2  = "Q-Vec Con"
nam.3  = "  Eady   "
nam.4  = "  Shear  "
nam.5  = "  Brunt  "
nam.6  = "  Stab   "
nam.7  = "  MEady  "
nam.8  = "  MStab  "
nam.9  = " Mn Eady "
nam.10 = " Mn Shear"
nam.11 = " Mn Brunt"
nam.12 = " Mn Stab "
nam.13 = " Mn MEady"
nam.14 = " Mn MStab"

var.1  = "vara"
var.2  = "varb"
var.3  = "varc"
var.4  = "vard"
var.5  = "vare"
var.6  = "varf"
var.7  = "varg"
var.8  = "varh"
var.9  = "vari"
var.10 = "varj"
var.11 = "vark"
var.12 = "varl"
var.13 = "varm"
var.14 = "varn"

sca.1  = 1
sca.2  = 1e18
sca.3  = 24*3600
sca.4  = 1e3
sca.5  = 1e2
sca.6  = 1e6
sca.7  = 24*3600
sca.8  = 1e6
sca.9  = 24*3600
sca.10 = 1e3
sca.11 = 1e2
sca.12 = 1e6
sca.13 = 24*3600
sca.14 = 1e6

time = 4
level = 700

a = 1
while (a < 5)
  "sdfopen "file.a.1"-"file.a.2".track.forcing.basic.nc"
  "sdfopen "file.a.1".track.forcing.basic.nc"
  "sdfopen "file.a.2".track.forcing.basic.nc"
  "set t "time
  "set lev "level

  b = 1
  while (b <= vars)
    scale = sca.b
    "d "scale"*"var.b
    difres.a.b = subwrd(result,4)
    "d "scale"*"var.b".2"
    midres.a.b = subwrd(result,4)
    "d "scale"*"var.b".3"
    trares.a.b = subwrd(result,4)
    "d "var.b"stat"
    stares.a.b = subwrd(result,4)
    b = b + 1
  endwhile

  say
  say file.a.1" "file.a.2
  b = 1                                                            ;# print the values
  line.1 = ""
  line.2 = ""
  line.3 = ""
  line.4 = ""
  line.5 = ""
  line.6 = ""
  while (b <= vars)
    line.1 = line.1" "nam.b
    line.2 = line.2" "math_format("%9.2e",sca.b)
    line.3 = line.3" & "math_format("%7.2f",midres.a.b)
    line.4 = line.4" & "math_format("%7.2f",trares.a.b)
    line.5 = line.5" & "math_format("%7.2f",stares.a.b)
    line.6 = line.6" & "math_format("%7.2f",difres.a.b)
    b = b + 1
  endwhile
  say "                  400-600-hPa 300-500-hPa                                          600-850-hPa"
  say "             "line.1
  say "             "line.2
  say "midwinter    "line.3
  say "transitional "line.4
  say "t-test       "line.5

  "close 3"
  "close 2"
  "close 1"
  a = a + 1
endwhile
"quit"
