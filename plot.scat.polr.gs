* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -blc "plot.scat.polr 2005D07-10_31545_01.00012.scat.txt.nhcjtwc"
*
* - RD April 2004.

function plot(arg)

seetype = "polt"                                                   ;* polf polr polt
seeboun = 0                                                        ;* view land and TC boundaries (1=yes, 0=no)
seevmax = 1                                                        ;* view the vmax location by closed contour (1=yes, 0=no)
left = 3                                                           ;* plotvar on lhs (1=oldv 2=newv 3=unco 4=frnk 5=hwnd)

stem = substr(arg,1,25)
data =        arg"."seetype".nc"
datb =        arg"."seetype".nc"
land = substr(arg,1,25)".scat.land"
btrk = substr(arg,1,25)".scat.btrk.nc"

fila = substr(arg,1,42) ; say "reading "fila
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lats = subwrd(line,2) ;* lats: 80
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lons = subwrd(line,2) ;* lons: 73
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_name = subwrd(line,2) ;* storm_name: OPHELIA
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_nnin = subwrd(line,2) ;* in_train_set: Yes
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hava = subwrd(line,2) ;* hwind_available: Yes
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_htrl = subwrd(line,2) ;* hwind_translated: Yes
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hpro = subwrd(line,2) ;* hwind_provider: NOAA_HRC
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_yr   = subwrd(line,2) ;* year: 2005
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_mo   = subwrd(line,2) ;* month: 9
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_dy   = subwrd(line,2) ;* day: 10
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hr   = subwrd(line,2) ;* hour: 22
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_mi   = subwrd(line,2) ;* minute: 54
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_qtim = subwrd(line,2) ;* qs_time: 22:54 UTC
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_htim = subwrd(line,2) ;* hw_time: 01:30 UTC
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_qdat = subwrd(line,2) ;* qs_date: 09/10/2005
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hdat = subwrd(line,2) ;* hw_date: 09/11/2005
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hfil = subwrd(line,2) ;* hwind_file: al16.2005_0911_01_30_marine
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_qfil = subwrd(line,2) ;* qs_l2b_ver2_file: QS_S2B32436.20070892233.CP12
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_clon = subwrd(line,2) ;* center_longitude: -90.41500 -90.42444  26.25052  26.11004
                                                    qtxt_cbon = subwrd(line,3) ;*                             -90.42444
                                                    qtxt_ilon = subwrd(line,4) ;*                                        26.25052
                                                    qtxt_ibon = subwrd(line,5) ;*                                                  26.11004
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_clat = subwrd(line,2) ;* center_latitude: 25.66250  25.63889 104.41214 104.22905
                                                    qtxt_cbat = subwrd(line,3) ;*                            25.63889
                                                    qtxt_ilat = subwrd(line,4) ;*                                     104.41214
                                                    qtxt_ibat = subwrd(line,5) ;*                                               104.22905
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_rev  = subwrd(line,2) ;* rev: 32436
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hnum = subwrd(line,2) ;* hurrnum: 16
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_pass = subwrd(line,2) ;* pass_dir: descending
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_scan = subwrd(line,2) ;* scan_dir: descending
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lap1 = subwrd(line,2) ;* lat_plane_coefs:       39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_lap2 = subwrd(line,3) ;*                                            0.0300242960 
                                                    qtxt_lap3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_lap4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lop1 = subwrd(line,2) ;* lon_plane_coefs:       39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_lop2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_lop3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_lop4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lai1 = subwrd(line,2) ;* index_lat_plane_coefs: 39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_lai2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_lai3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_lai4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_loi1 = subwrd(line,2) ;* index_lon_plane_coefs: 39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_loi2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_loi3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_loi4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_tang = subwrd(line,2) ;* track_angle_wind_rotate: 346.85190 -13.14810
                                                    qtxt_rota = subwrd(line,3) ;*                                    -13.14810
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_datq = subwrd(line,2) ;* qs_fulldate: 2005-07-10-1113
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_dath = subwrd(line,2) ;* hw_fulldate: 2005-07-10-1030   -43
                                                    qtxt_delh = subwrd(line,3) ;*              -43
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_datb = subwrd(line,2) ;* bt_fulldate: 2005-07-10-1200    47
                                                    btxt_delb = subwrd(line,3) ;*              47
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_file = subwrd(line,2) ;* bt_file: /home/rdanielson/data/atcf/2003/bal102003.dat
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_basn = subwrd(line,2) ;* bt_basin: AL
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_tech = subwrd(line,2) ;* bt_tech: BEST
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_tau  = subwrd(line,2) ;* bt_tau: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_clat = subwrd(line,2) ;* bt_lat: 28.5 47.301033
                                                    btxt_ilat = subwrd(line,3) ;*              47.301033
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_clon = subwrd(line,2) ;* bt_lon: -86.3 23.612263
                                                    btxt_ilon = subwrd(line,3) ;*               23.612263
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_vmax = subwrd(line,2) ;* bt_vmax: 120
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_mslp = subwrd(line,2) ;* bt_mslp: 930
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_ty   = subwrd(line,2) ;* bt_ty: HU
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_radp = subwrd(line,2) ;* bt_radp: 1010
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_rrp  = subwrd(line,2) ;* bt_rrp: 250
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_mrd  = subwrd(line,2) ;* bt_mrd: 10
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_gust = subwrd(line,2) ;* bt_gust: 155
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_eye  = subwrd(line,2) ;* bt_eye: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_regn = subwrd(line,2) ;* bt_subregion: L
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_seas = subwrd(line,2) ;* bt_maxseas: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_init = subwrd(line,2) ;* bt_initials: MISS
filestat = read(fila) ; line = sublin(filestat,2) ; btet_dir  = subwrd(line,2) ;* bt_dir: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_sped = subwrd(line,2) ;* bt_speed: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_name = subwrd(line,2) ;* bt_stormname: DENNIS
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_dept = subwrd(line,2) ;* bt_depth: D
filestat = read(fila) ; line = sublin(filestat,2) ; oldv_vmax = subwrd(line,2) ;* oldv_vmax: 49.86  36.19669 -64.04440   35   37
                                                    oldv_vlat = subwrd(line,3) ;*                   36.19669
                                                    oldv_vlon = subwrd(line,4) ;*                            -64.04440
                                                    oldv_vlai = subwrd(line,5) ;*                                        35
                                                    oldv_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; oldv_34ne = subwrd(line,3) ;* oldv_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    oldv_34se = subwrd(line,4) ;*                          -8999999488
                                                    oldv_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    oldv_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; oldv_50ne = subwrd(line,3) ;* oldv_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    oldv_50se = subwrd(line,4) ;*                          -8999999488
                                                    oldv_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    oldv_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; oldv_64ne = subwrd(line,3) ;* oldv_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    oldv_64se = subwrd(line,4) ;*                          -8999999488
                                                    oldv_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    oldv_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; newv_vmax = subwrd(line,2) ;* newv_vmax: 49.86  36.19669 -64.04440   35   37
                                                    newv_vlat = subwrd(line,3) ;*                   36.19669
                                                    newv_vlon = subwrd(line,4) ;*                            -64.04440
                                                    newv_vlai = subwrd(line,5) ;*                                        35
                                                    newv_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; newv_34ne = subwrd(line,3) ;* newv_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    newv_34se = subwrd(line,4) ;*                          -8999999488
                                                    newv_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    newv_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; newv_50ne = subwrd(line,3) ;* newv_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    newv_50se = subwrd(line,4) ;*                          -8999999488
                                                    newv_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    newv_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; newv_64ne = subwrd(line,3) ;* newv_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    newv_64se = subwrd(line,4) ;*                          -8999999488
                                                    newv_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    newv_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; unco_vmax = subwrd(line,2) ;* unco_vmax: 49.86  36.19669 -64.04440   35   37
                                                    unco_vlat = subwrd(line,3) ;*                   36.19669
                                                    unco_vlon = subwrd(line,4) ;*                            -64.04440
                                                    unco_vlai = subwrd(line,5) ;*                                        35
                                                    unco_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; unco_34ne = subwrd(line,3) ;* unco_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    unco_34se = subwrd(line,4) ;*                          -8999999488
                                                    unco_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    unco_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; unco_50ne = subwrd(line,3) ;* unco_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    unco_50se = subwrd(line,4) ;*                          -8999999488
                                                    unco_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    unco_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; unco_64ne = subwrd(line,3) ;* unco_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    unco_64se = subwrd(line,4) ;*                          -8999999488
                                                    unco_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    unco_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; frnk_vmax = subwrd(line,2) ;* frnk_vmax: 49.86  36.19669 -64.04440   35   37
                                                    frnk_vlat = subwrd(line,3) ;*                   36.19669
                                                    frnk_vlon = subwrd(line,4) ;*                            -64.04440
                                                    frnk_vlai = subwrd(line,5) ;*                                        35
                                                    frnk_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; frnk_34ne = subwrd(line,3) ;* frnk_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    frnk_34se = subwrd(line,4) ;*                          -8999999488
                                                    frnk_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    frnk_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; frnk_50ne = subwrd(line,3) ;* frnk_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    frnk_50se = subwrd(line,4) ;*                          -8999999488
                                                    frnk_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    frnk_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; frnk_64ne = subwrd(line,3) ;* frnk_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    frnk_64se = subwrd(line,4) ;*                          -8999999488
                                                    frnk_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    frnk_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; hwnd_vmax = subwrd(line,2) ;* hwnd_vmax: 49.86  36.19669 -64.04440   35   37
                                                    hwnd_vlat = subwrd(line,3) ;*                   36.19669
                                                    hwnd_vlon = subwrd(line,4) ;*                            -64.04440
                                                    hwnd_vlai = subwrd(line,5) ;*                                        35
                                                    hwnd_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; hwnd_34ne = subwrd(line,3) ;* hwnd_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    hwnd_34se = subwrd(line,4) ;*                          -8999999488
                                                    hwnd_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    hwnd_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; hwnd_50ne = subwrd(line,3) ;* hwnd_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    hwnd_50se = subwrd(line,4) ;*                          -8999999488
                                                    hwnd_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    hwnd_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; hwnd_64ne = subwrd(line,3) ;* hwnd_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    hwnd_64se = subwrd(line,4) ;*                          -8999999488
                                                    hwnd_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    hwnd_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; nnet_vmax = subwrd(line,2) ;* nnet_vmax: 49.86  36.19669 -64.04440   35   37
                                                    nnet_vlat = subwrd(line,3) ;*                   36.19669
                                                    nnet_vlon = subwrd(line,4) ;*                            -64.04440
                                                    nnet_vlai = subwrd(line,5) ;*                                        35
                                                    nnet_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; nnet_34ne = subwrd(line,3) ;* nnet_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    nnet_34se = subwrd(line,4) ;*                          -8999999488
                                                    nnet_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    nnet_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; nnet_50ne = subwrd(line,3) ;* nnet_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    nnet_50se = subwrd(line,4) ;*                          -8999999488
                                                    nnet_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    nnet_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; nnet_64ne = subwrd(line,3) ;* nnet_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    nnet_64se = subwrd(line,4) ;*                          -8999999488
                                                    nnet_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    nnet_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; best_vmax = subwrd(line,2) ;* best_vmax: 120.00  -9999.00 -9999.000 -9999 -9999
                                                    best_vlat = subwrd(line,3) ;*                    -9999.00
                                                    best_vlon = subwrd(line,4) ;*                             -9999.000
                                                    best_vlai = subwrd(line,5) ;*                                       -9999
                                                    best_vloi = subwrd(line,6) ;*                                             -9999
filestat = read(fila) ; line = sublin(filestat,2) ; best_34ne = subwrd(line,3) ;* best_rad: 34    175    200     90    115
                                                    best_34se = subwrd(line,4) ;*                        200
                                                    best_34sw = subwrd(line,5) ;*                                90
                                                    best_34nw = subwrd(line,6) ;*                                      115
filestat = read(fila) ; line = sublin(filestat,2) ; best_50ne = subwrd(line,3) ;* best_rad: 50    100     75     30     50
                                                    best_50se = subwrd(line,4) ;*                         75
                                                    best_50sw = subwrd(line,5) ;*                                30
                                                    best_50nw = subwrd(line,6) ;*                                       50
filestat = read(fila) ; line = sublin(filestat,2) ; best_64ne = subwrd(line,3) ;* best_rad: 64     25     25     15     25
                                                    best_64se = subwrd(line,4) ;*                         25
                                                    best_64sw = subwrd(line,5) ;*                                15
                                                    best_64nw = subwrd(line,6) ;*                                       25
filestat = close(fila)

*if (best_vmax < 0 | nnet_vmax < 0) ; "quit" ; endif
if ((left = 5) & (qtxt_hava != "Yes" & qtxt_hava != "yes"))
  say "HWind desired on LHS but unavailable" ; quit
  if (left =  5) ; left = 2 ; endif
endif

if (qtxt_mo =  1) ; qtxt_month = "Jan" ; endif
if (qtxt_mo =  2) ; qtxt_month = "Feb" ; endif
if (qtxt_mo =  3) ; qtxt_month = "Mar" ; endif
if (qtxt_mo =  4) ; qtxt_month = "Apr" ; endif
if (qtxt_mo =  5) ; qtxt_month = "May" ; endif
if (qtxt_mo =  6) ; qtxt_month = "Jun" ; endif
if (qtxt_mo =  7) ; qtxt_month = "Jul" ; endif
if (qtxt_mo =  8) ; qtxt_month = "Aug" ; endif
if (qtxt_mo =  9) ; qtxt_month = "Sep" ; endif
if (qtxt_mo = 10) ; qtxt_month = "Oct" ; endif
if (qtxt_mo = 11) ; qtxt_month = "Nov" ; endif
if (qtxt_mo = 12) ; qtxt_month = "Dec" ; endif

"set rgb  41 255 255 255"
"set rgb  42 200 255 200"
"set rgb  43 160 205 160"
"set rgb  44 120 255 120"
"set rgb  45  80 155  80"
"set rgb  46  40 255  40"
"set rgb  47 200 200 255"
"set rgb  48 160 160 205"
"set rgb  49 120 120 255"
"set rgb  50  80  80 155"
"set rgb  51  40  40 255"
"set rgb  52 255 200 200"
"set rgb  53 205 160 160"
"set rgb  54 255 120 120"
"set rgb  55 155  80  80"
"set rgb  56 255  40  40"
"set rgb  88   0   0 208" ;* default best track colour
"set rgb  99 210 210 210" ;* default land colour

gridpoints = 1
qtxt_ibai = math_format('%.0f',qtxt_ibat)
qtxt_iboi = math_format('%.0f',qtxt_ibon)
minbat = qtxt_ibai - gridpoints; maxbat = qtxt_ibai + gridpoints
minbon = qtxt_iboi - gridpoints; maxbon = qtxt_iboi + gridpoints
if (minbat < 1) ; minbat = 1 ; endif ; if (maxbat > qtxt_lats) ; maxbat = qtxt_lats ; endif
if (minbon < 1) ; minbon = 1 ; endif ; if (maxbon > qtxt_lons) ; maxbon = qtxt_lons ; endif
*say minbat" "qtxt_ibai" "maxbat" "maxbat-minbat
*say minbon" "qtxt_iboi" "maxbon" "maxbon-minbon

pixelsize = 4.5 * (maxbon - minbon) / (2 * gridpoints)
pixelsize = 4.5
xpic = 2 ; string = "0.50 10.50 "pixelsize" "xpic ; inner_decomp(string)
a = 1 ; while (a <= xpic) ; lef.a = _retlef.a ; clr.a = _retmid.a ; rig.a = _retrig.a ; a = a + 1 ; endwhile

pixelsize = 4.5 * (maxbat - minbat) / (2 * gridpoints)
pixelsize = 4.5
ypic = 1 ; string = "1.20 6.20 "pixelsize" "ypic ; inner_decomp(string)
a = 1 ; while (a <= ypic) ; bot.a = _retlef.a ; cbt.a = _retmid.a ; top.a = _retrig.a ; a = a + 1 ; endwhile

a = 1 ; while (a <= xpic)
  b = 1 ; while (b <= ypic)
    vpage.a.b = lef.a" "rig.a" "bot.b" "top.b
  b = b + 1 ; endwhile
a = a + 1 ; endwhile

"sdfopen "data
"set lat 72 90"
"set lon 0 360"
"set mproj nps"
"set grid off"
"set mpdraw off"
"set clopts 1 4 .08"
"set xlopts 1 4 .095"
"set ylopts 1 4 .095"
"set digsiz 0.05"
defa = "D2R = 3.141592654 / 180.0" ; "define "defa

if (left = 1) ; plotvar = "qs_spd_orig"     ; plotvas = "w0qs_spd_orig"   ; plotvat = "w1qs_spd_orig"   ; endif
if (left = 2) ; plotvar = "qs_spd_ku2010"   ; plotvas = "w0qs_spd_ku2010" ; plotvat = "w1qs_spd_ku2010" ; endif
if (left = 3) ; plotvar = "qs_spduncorr_ku" ; plotvas = "w0qs_spduncorr_" ; plotvat = "w1qs_spduncorr_" ; endif
if (left = 4) ; plotvar = "firstrankspd_ku" ; plotvas = "w0firstrankspd_" ; plotvat = "w1firstrankspd_" ; endif
if (left = 5) ; plotvar = "hwspd"           ; plotvas = "w0hwspd"         ; plotvat = "w1hwspd"         ; endif
                plotvar = plotvar"*1.94384" ; plotvas = plotvas"*1.94384" ; plotvat = plotvat"*1.94384"
"set parea "vpage.1.1
"set xlab off"
"set ylab off"
"set gxout shaded"
"set ccols  48  42  43  44  45  46  47  48  49  50  51  52  53  54  55  56"
"set clevs    10  15  20  25  30  34  40  45  50  55  64  83  96  113 137"
"set grads off" ; "set clab off" ; "d "plotvar
"q gxinfo" ; _gxinfo = result ; "q shades" ; _shades = result
"set gxout contour"
*"set ccolor 2" ; "set clevs 71 73 74.8 76.8 79.2 81.2 83 85 87" ; "d lat"
"set ccolor 1" ; "set clevs 10  15  20  25  30  34  40  45  50  55  64  83  96  113 137"
"set grads off" ; "set clab off" ; "d "plotvas"+"plotvat
if (seevmax = 1)
  "set x 1" ; "set y 1"
  "d maxloc("plotvas",lat=72,lat=86)" ; line = sublin(result,2) ; maxlat = subwrd(line,4) ; "set y "maxlat
  "d maxloc("plotvat",lon=0,lon=360)" ; line = sublin(result,2) ; maxlon = subwrd(line,4) ; "set x "maxlon
  "set lat 72 90" ; "set lon 0 360" ; "q gr2xy "maxlon" "maxlat
  rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
  if (maxlat = 1 | maxlat = 8) ; "set line 2 1 10" ; else ; "set line 1 1 10" ; endif
  "draw mark 2 "obsx" "obsy" 0.19" ; "set line 1 1 3"
  say "wavenumber-1 peak at "maxlon" for "plotvar
endif

plotvar =   "annspd*1.94384"
plotvas = "w0annspd*1.94384"
plotvat = "w1annspd*1.94384"
"set parea "vpage.2.1
"set xlab off"
"set ylab off"
"set gxout shaded"
"set ccols  48  42  43  44  45  46  47  48  49  50  51  52  53  54  55  56"
"set clevs    10  15  20  25  30  34  40  45  50  55  64  83  96  113 137"
"set grads off" ; "set clab off" ; "d "plotvar
"set gxout contour"
*"set ccolor 2" ; "set clevs 71 73 74.8 76.8 79.2 81.2 83 85 87" ; "d lat"
"set ccolor 1" ; "set clevs 10  15  20  25  30  34  40  45  50  55  64  83  96  113 137"
"set grads off" ; "set clab off" ; "d "plotvas"+"plotvat
if (seevmax = 1)
  "set x 1" ; "set y 1"
  "d maxloc("plotvas",lat=72,lat=86)" ; line = sublin(result,2) ; maxlat = subwrd(line,4) ; "set y "maxlat
  "d maxloc("plotvat",lon=0,lon=360)" ; line = sublin(result,2) ; maxlon = subwrd(line,4) ; "set x "maxlon
  "set lat 72 90" ; "set lon 0 360" ; "q gr2xy "maxlon" "maxlat
  rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
  if (maxlat = 1 | maxlat = 8) ; "set line 2 1 10" ; else ; "set line 1 1 10" ; endif
  "draw mark 2 "obsx" "obsy" 0.19" ; "set line 1 1 3"
  say "wavenumber-1 peak at "maxlon" for "plotvar
endif

"set vpage off"
"set strsiz 0.16"
"set string 1 bc 6"
"set grads off" ; inner_cbarn("1.20 0 5.50 0.44")
"draw string 5.50 0.95 Wind Speed (kt)            NHC Category"
*"set line  1 1  5" ; "draw mark 3 6.35 0.87 0.17"
*"set line  0 1  5" ; "draw mark 3 6.35 0.87 0.10"
"set line  1 3 10" ; "draw line 0.90  0.555  4.19  0.555"
"set line 11 1 10" ; "draw line 4.19  0.555  7.50  0.555"
"set line 56 1 10" ; "draw line 7.50  0.555  8.80  0.555"
"set line 46 1 10" ; "draw line 8.80  0.555 10.60  0.555"
"set line  1 1 10" ; "draw line 4.19  0.350  4.19  0.670"
"set line 11 1 10" ; "draw line 6.16  0.350  6.16  0.670"
"set line 56 1 10" ; "draw line 7.49  0.350  7.49  0.670"

"set string     1 bc 6" ; "draw string       5.5   "top.1+0.4" "qtxt_name
if (left = 1) ; spd = math_format("%.0f",oldv_vmax) ; endif
if (left = 2) ; spd = math_format("%.0f",newv_vmax) ; endif
if (left = 3) ; spd = math_format("%.0f",unco_vmax) ; endif
if (left = 4) ; spd = math_format("%.0f",frnk_vmax) ; endif
if (left = 5) ; spd = math_format("%.0f",hwnd_vmax) ; endif
col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
"set string 1 br 6"
if (left = 1) ; "draw string "clr.1-0.5" "top.1+0.4" JPL v2" ; endif
if (left = 2) ; "draw string "clr.1-0.5" "top.1+0.4" JPL v3" ; endif
if (left = 3) ; "draw string "clr.1-0.5" "top.1+0.4" JPL v3 no rain corr" ; endif
if (left = 4) ; "draw string "clr.1-0.5" "top.1+0.4" JPL v3 first rank amb" ; endif
if (left = 5) ; "draw string "clr.1-0.5" "top.1+0.4" H*Wind" ; endif
"set string "col" bl 6" ; "draw string "clr.1+0.5" "top.1+0.4" "spd" kt"
spd = math_format("%.0f",nnet_vmax)
col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
"set string "col" br 6" ; "draw string "clr.2-0.5" "top.1+0.4" "spd" kt"
if (qtxt_nnin = "Yes" | qtxt_nnin = "yes")
  "set string 9  l 6" ; "draw string "clr.2+0.2" "top.1+0.8" H*Wind Trained"
  "set string 9 bl 6" ; "draw string "clr.2+0.5" "top.1+0.4" Neural Net"
else
  "set string 1 bl 6" ; "draw string "clr.2+0.5" "top.1+0.4" Neural Net"
endif

"set string 1 l 6"
"draw string 2.2 7.9 QuikSCAT"
"set line  1 1  5" ; "draw mark 9 1.75 7.90 0.20"
"set line  0 1  5" ; "draw mark 9 1.75 7.899 0.09"
"set string 1 r 6"
"draw string 10.5 7.9 "qtxt_datq

"set string 1 l 6"
"draw string 2.2 7.6 Best Track ("btxt_ty")"
"set line  1 1  5" ; "draw mark 3 1.75 7.60 0.17"
"set line  0 1  5" ; "draw mark 3 1.75 7.60 0.10"
spd = math_format("%.0f",best_vmax)
col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
"set string "col" c 6" ; "draw string 5.5 7.6 "spd" kt"
"set string 1 r 6"
if (btxt_delb > 0) ; "draw string 10.5 7.6 (+"btxt_delb"mi) "btxt_datb ; endif
if (btxt_delb = 0) ; "draw string 10.5 7.6                  "btxt_datb ; endif
if (btxt_delb < 0) ; "draw string 10.5 7.6 (" btxt_delb"mi) "btxt_datb ; endif
* else               ; "draw string 10.5 7.6 (" btxt_delb"mi) "btxt_datb ; endif

if (qtxt_hava = "Yes" | qtxt_hava = "yes")
  "set string 1 l 6"
  if (qtxt_hpro = "NOAA_HRC") ; qtxt_hpro = "HRD" ; endif
  "draw string 2.2 7.3 H*Wind by "qtxt_hpro
  spd = math_format("%.0f",hwnd_vmax)
  col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
  "set string "col" c 6" ; "draw string 5.5 7.3 "spd" kt"
  "set string 1 r 6"
  if (qtxt_delh > 0) ; "draw string 10.5 7.3 (+"qtxt_delh"mi) "qtxt_dath ; endif
  if (qtxt_delh = 0) ; "draw string 10.5 7.3                  "qtxt_dath ; endif
  if (qtxt_delh < 0) ; "draw string 10.5 7.3 (" qtxt_delh"mi) "qtxt_dath ; endif
* else               ; "draw string 10.5 7.3 (" qtxt_delh"mi) "qtxt_dath ; endif
endif

if (left = 1) ; plotnam = seetype"."stem".oldv" ; endif
if (left = 2) ; plotnam = seetype"."stem".newv" ; endif
if (left = 3) ; plotnam = seetype"."stem".unco" ; endif
if (left = 4) ; plotnam = seetype"."stem".frnk" ; endif
if (left = 5) ; plotnam = seetype"."stem".hwnd" ; endif
*"run gui_print_colour "plotnam
say "printim "plotnam".gif gif white x1100 y850"
    "printim "plotnam".gif gif white x1100 y850"
*if (best_vmax < 0 | nnet_vmax < 0) ; "!echo mv "plotnam".gif limbop >> xcop" ; endif
"quit"


function inner_radii(args)
  r34 = subwrd(args,1)
  r50 = subwrd(args,2)
  r64 = subwrd(args,3)
  xpo = subwrd(args,4)
  ypo = subwrd(args,5)

  "draw string "xpo" "ypo    " "r34
  "draw string "xpo" "ypo-0.3" "r50
  "draw string "xpo" "ypo-0.6" "r64
return

function inner_decomp(args)
  lef = subwrd(args,1)
  rig = subwrd(args,2)
  wid = subwrd(args,3)
  num = subwrd(args,4)

  if (num = 1)                                                     ;* anchor the midpoint of a single panel at the
    _retmid.1 = (lef + rig) / 2                                    ;* center of the outer allowable limits, or else
  else                                                             ;* anchor the midpoints of the outer two panels
    _retmid.1   = lef + wid / 2                                    ;* as far away as possible from each other and
    _retmid.num = rig - wid / 2                                    ;* linearly interpolate the midpoints of the
    a = 2                                                          ;* panels in between
    while (a < num)
      _retmid.a = (_retmid.num * (a-1) + _retmid.1 * (num-a)) / (num - 1)
      a = a + 1
    endwhile
  endif

  a = 1                                                            ;* then calculate the left and right limts
  while (a <= num)                                                 ;* of each panel
    _retlef.a = _retmid.a - wid / 2
    _retrig.a = _retmid.a + wid / 2
    a = a + 1
  endwhile

  if (num > 1)                                                     ;* now check the gap between adjacent panels
    dis = (num - 1) / (num + 1) * (_retlef.2 - _retrig.1) - 0.2    ;* and recalculate the outer two panel midpoints
    if (dis > 0)                                                   ;* so that the gap between the outer limit and
      lef = subwrd(args,1) + dis                                   ;* these panels is the same as the gap between
      rig = subwrd(args,2) - dis                                   ;* adjacent panels, then recalculate panel limits
      _retmid.1   = lef + wid / 2
      _retmid.num = rig - wid / 2
      a = 2
      while (a < num)
        _retmid.a = (_retmid.num * (a-1) + _retmid.1 * (num-a)) / (num - 1)
        a = a + 1
      endwhile

      a = 1
      while (a <= num)
        _retlef.a = _retmid.a - wid / 2
        _retrig.a = _retmid.a + wid / 2
        a = a + 1
      endwhile
    endif
  endif
return

function inner_cbarn(args)

sf=subwrd(args,1)
vert=subwrd(args,2)
xmid=subwrd(args,3)
ymid=subwrd(args,4)

if(sf='');sf=1.0;endif

*
*  Check shading information
*
*  'query shades'
  shdinfo = _shades
*say shdinfo
  if (subwrd(shdinfo,1)='None')
    say 'Cannot plot color bar: No shading information'
    return
  endif

*
*  Get plot size info
*
*"set vpage off"
*  'query gxinfo'
  result = _gxinfo
*say result
  rec2 = sublin(result,2)
  rec3 = sublin(result,3)
  rec4 = sublin(result,4)
  xsiz = subwrd(rec2,4)
  ysiz = subwrd(rec2,6)
  ylo = subwrd(rec4,4)
  xhi = subwrd(rec3,6)
  xd = xsiz - xhi

  ylolim=0.6*sf
  xdlim1=1.0*sf
  xdlim2=1.5*sf
  barsf=0.8*sf
  yoffset=0.2*sf
  stroff=0.1*sf
  strxsiz=0.17*sf
  strysiz=0.18*sf
*
*  Decide if horizontal or vertical color bar
*  and set up constants.
*
  if (ylo<ylolim & xd<xdlim1)
    say "Not enough room in plot for a colorbar"
    return
  endif
  cnum = subwrd(shdinfo,5)
*
*       logic for setting the bar orientation with user overides
*
  if (ylo<ylolim | xd>xdlim1)
    vchk = 1
    if(vert = 0) ; vchk = 0 ; endif
  else
    vchk = 0
    if(vert = 1) ; vchk = 1 ; endif
  endif
*
*       vertical bar
*

  if (vchk = 1 )

    if(xmid = '') ; xmid = xhi+xd/2 ; endif
    xwid = 0.2*sf
    ywid = 0.5*sf

    xl = xmid-xwid/2
    xr = xl + xwid
    if (ywid*cnum > ysiz*barsf)
      ywid = ysiz*barsf/cnum
    endif
    if(ymid = '') ; ymid = ysiz/2 ; endif
    yb = ymid - ywid*cnum/2
#RD    'set string 1 l 3'
    'set string 1 r 3'
    vert = 1

  else

*
*       horizontal bar
*

    ywid = 0.4
    xwid = 0.8

    if(ymid = '') ; ymid = ylo/2-ywid/2 ; endif
    yt = ymid + yoffset
    yb = ymid
    if(xmid = '') ; xmid = xsiz/2 ; endif
    if (xwid*cnum > xsiz*barsf)
      xwid = xsiz*barsf/cnum
    endif
    xl = xmid - xwid*cnum/2
    'set string 1 tc 3'
    vert = 0
  endif


*
*  Plot colorbar
*


* 'set strsiz 'strxsiz' 'strysiz
  num = 0
  while (num<cnum)
    rec = sublin(shdinfo,num+2)
*RD    rec = sublin(shdinfo,num+20)
    col = subwrd(rec,1)
    hi = subwrd(rec,3)
    if (vert)
      yt = yb + ywid
    else
      xr = xl + xwid
    endif

*   Draw the left/bottom triangle
    if (num = 0)
      if(vert = 1)
        xm = (xl+xr)*0.5
        'set line 'col
        'draw polyf 'xl' 'yt' 'xm' 'yb' 'xr' 'yt' 'xl' 'yt
        'set line 1 1 3'
        'draw line 'xl' 'yt' 'xm' 'yb
        'draw line 'xm' 'yb' 'xr' 'yt
        'draw line 'xr' 'yt' 'xl' 'yt
      else
        ym = (yb+yt)*0.5
        'set line 'col
        'draw polyf 'xl' 'ym' 'xr' 'yb' 'xr' 'yt' 'xl' 'ym
        'set line 1 1 3'
        'draw line 'xl' 'ym' 'xr' 'yb
        'draw line 'xr' 'yb' 'xr' 'yt
        'draw line 'xr' 'yt' 'xl' 'ym
      endif
    endif

*   Draw the middle boxes
    if (num!=0 & num!= cnum-1)
      'set line 'col
      'draw recf 'xl' 'yb' 'xr' 'yt
      'set line 1 1 3'
      'draw rec  'xl' 'yb' 'xr' 'yt
    endif

*   Draw the right/top triangle
    if (num = cnum-1)
      if (vert = 1)
        'set line 'col
        'draw polyf 'xl' 'yb' 'xm' 'yt' 'xr' 'yb' 'xl' 'yb
        'set line 1 1 3'
        'draw line 'xl' 'yb' 'xm' 'yt
        'draw line 'xm' 'yt' 'xr' 'yb
        'draw line 'xr' 'yb' 'xl' 'yb
      else
        'set line 'col
        'draw polyf 'xr' 'ym' 'xl' 'yb' 'xl' 'yt' 'xr' 'ym
        'set line 1 1 3'
        'draw line 'xr' 'ym' 'xl' 'yb
        'draw line 'xl' 'yb' 'xl' 'yt
        'draw line 'xl' 'yt' 'xr' 'ym
      endif
    endif

*   Put numbers under each segment of the color key
    if (num < cnum-1)
      if (vert)
#RD        xp=xr+stroff
        xp=xl-stroff
        'draw string 'xp' 'yt' 'hi
      else
        yp=yb-stroff
       'draw string 'xr' 'yp' 'hi
      endif
    endif

*   Reset variables for next loop execution
    if (vert)
      yb = yt
    else
      xl = xr
    endif
    num = num + 1
  endwhile
return


#"set mpdset novascotia"
#"d ati"
#"d cti"
#"d hwspd"
#"d hwdir"
#"d timedif"
#"d qs_spd_orig"
#"d qs_dir_orig"
#"d srad_rainrate"
#"d qs_spd_ku2010"
#"d qs_spduncorr_ku"
#"d qs_dir_ku2010"
#"d qs_rainimp_ku20"
#"d qs_lat"
#"d qs_lon"
#"d s0hhfore"
#"d s0hhaft"
#"d s0vvfore"
#"d s0vvaft"
#"d s0hhfore_lores"
#"d s0hhaft_lores"
#"d s0vvfore_lores"
#"d s0vvaft_lores"
#"d varhhfore"
#"d varhhaft"
#"d varvvfore"
#"d varvvaft"
#"d azimhhfore"
#"d azimhhaft"
#"d azimvvfore"
#"d azimvvaft"
#"d firstrankspd_ku"
#"d hwrelazimhhfore"
#"d hwrelazimhhaft"
#"d hwrelazimvvfore"
#"d hwrelazimvvaft"
#"d ctd"
#"d ssmi_timedif"
#"d ssmi_rainrate"
#"d ssmi_windspeed"
#"d ssmi_vapor"
#"d ssmi_cloud"
