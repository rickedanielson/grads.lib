# This script is designed to print budget comparisons
*
*     grads -bpc "plot.track.forcing.summary.energy.avpe"
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

vars   = 8
nam.1  = " Avpevint"
nam.2  = "Atendvint"
nam.3  = " Ahfcvint"
nam.4  = " Avfcvint"
nam.5  = " Amedvint"
nam.6  = " Aefovint"
nam.7  = " Abrovint"
nam.8  = " Aresvint"

var.1  = "vara"
var.2  = "varb"
var.3  = "varc"
var.4  = "vard"
var.5  = "vare"
var.6  = "varf"
var.7  = "varg"
var.8  = "varh"

sca.1  = 1e-6
sca.2  = 24*3600
sca.3  = 24*3600
sca.4  = 24*3600
sca.5  = 24*3600
sca.6  = 24*3600
sca.7  = 24*3600
sca.8  = 24*3600

time = 4
level = 700

a = 1
while (a < 5)
  "sdfopen "file.a.1"-"file.a.2".track.forcing.energy.avpe.nc"
  "sdfopen "file.a.1".track.forcing.energy.avpe.nc"
  "sdfopen "file.a.2".track.forcing.energy.avpe.nc"
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
    line.1 = line.1"   "nam.b
    line.2 = line.2"   "math_format("%9.2e",sca.b)
    line.3 = line.3" & "math_format("%9.2f",midres.a.b)
    line.4 = line.4" & "math_format("%9.2f",trares.a.b)
    line.5 = line.5" & "math_format("%9.2f",stares.a.b)
    line.6 = line.6" & "math_format("%9.2f",difres.a.b)
    b = b + 1
  endwhile
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
