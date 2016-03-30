*
*  View the Sample grib file
*

'reinit'
'clear'
'open grib.ctl'
'd z'
'draw title 500mb Heights'
'draw xlab From GRIB Data'
pull dummy
'clear'
'set lon -30 60'
'set lat 30 70'
'd z(t=2)-z(t=1)'
'd z(t=2)'
'draw title 6hr 500mb Height Change \ 500mb Heights'
'draw xlab From GRIB Data'
pull dummy
