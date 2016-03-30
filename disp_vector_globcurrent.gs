* This script plots a vector field without the label - RD January 2000.
* It can be called having specified the following
*
* "set string 4 c 6"
* "set strsiz 0.25 0.25"
* "set line 4 1 7"
* "run disp_vector_globcurrent skip(eastward_euleri,100) northward_euler 0.4 4 10.55 8.25"

function vector(args)

vara   = subwrd(args,1)
varb   = subwrd(args,2)
scale  = subwrd(args,3)
units  = subwrd(args,4)
vcol   = subwrd(args,5)
xrit   = subwrd(args,6)
ybot   = subwrd(args,7)

cutoff = scale / 5.0
length = 0.4

# draw the vector field (skipping every other vector)

"set gxout vector"
"set arrlab off"
"set arrscl "length" "scale
"set ccolor "vcol
"d "vara";"varb
#"d maskout("vara",mag("vara","varb")-"cutoff");skip("varb",2,2);mag("vara","varb")"
#"d maskout("vara",mag("vara","varb")-"cutoff");skip("varb",2,2)"
"set gxout contour"

# draw the label

*xrit = 10.8
*ybot = 7.65
*xrit = 5.0
*ybot = 0.4
*#xrit = 7.0
*#ybot = 0.4
*##xrit = 1.5
*##ybot = 0.4
*rc = arrow(xrit,ybot,length,scale)
* return

* function arrow(x,y,len,scale)
*"set line 1 1 7"
xrit = xrit - 1.5 * length
"draw line "xrit-length/2."      "ybot"       "xrit+length/2." "ybot
"draw line "xrit+length/2.-0.05" "ybot+0.025" "xrit+length/2." "ybot
"draw line "xrit+length/2.-0.05" "ybot-0.025" "xrit+length/2." "ybot
xrit = xrit + 1.5 * length
*"set string 1 c"
*"set strsiz 0.2"
*"draw string "xrit" "ybot-0.15" "scale
*"set strsiz 0.25"
"draw string "xrit" "ybot" "scale""units
return
