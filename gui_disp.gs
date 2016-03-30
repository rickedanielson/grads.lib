
"clear"
"set grads off"
"set grid off"
"set xlab on"
"set ylab on"
"set digsiz 0.09"
#"set mpdset novascotia"
"define D2R = 3.141592654 / 180.0"
"set mpdraw on"

"set x 1 1440"
"set y 1 720"
"q dims"
say result

#"d surface_downwar"
#"d surface_upward_"
#"d air_temperature"
#"d wind_direction"
"d dew_point_tempe"
#"d eastward_wind"
#"d sea_surface_tem"
#"d northward_wind"
#"d wind_speed"
#"d surface_downwar"
#"d surface_upward_"
#"d air_surface_spe"

"run gui_header"

"set lat -.25"
"set lon -180"
"d dew_point_tempe"
say result
"q dims"
say result

*"d dew_point_tempe"
*say result
