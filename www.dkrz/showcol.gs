*--------------------------------------------------------
*--- showcol.gs:  GrADS script to display max.80 colors
*---              in a color table
*---              pal      - palette file name 
*---              cnum     - number of colors to display
*---
*--- 11.06.96           Karin Meier (karin.meier@dkrz.de)
*--------------------------------------------------------
function main(com)


   pal  = subwrd(com,1)
   cnum = subwrd(com,2)

*--- max. color number is 80

   if (cnum = '' | cnum > 80);  cnum = 80; endif

   prfile = pal".mf";  psfile = pal".ps"

   'enable print 'prfile
   'set parea 1 10 1 7.5'
   'set string 1 c 6'
   'set strsiz 0.25 0.30'
   'draw string 5.5 7.8 Palette:    'pal'    'cnum' colors'

   'run 'pal

   inum = 16;  num = 0;   index = 1
   xl = 0.4 ;  xr = 1.0;  yb = 6.3 ;  yt = 7.3

*--------- create "cnum" color boxes with indices; 16 boxes per row

   while (num < cnum) 
       col = inum
       'set line 'col
       'draw recf 'xl' 'yb' 'xr' 'yt
       'set strsiz 0.10 0.11'
        hi = num + 16
       'draw string 'xl+0.3' '%(yb-0.09)%' 'hi
        xl = xl + 0.65
        xr = xr + 0.65
        if (index=16|index=32|index=48|index=64)
            xl = 0.4 ; xr = 1.0
            yb = yb - 1.4 ; yt = yt - 1.4
        endif
        num = num + 1
        inum = inum + 1
        index = index + 1
        if (index=cnum+1|index>81) 
            say "done ...."
            break
        endif
   endwhile

*--------- create PostScript color palette file

   'print'
   'disable print'
   '!xgxps -c -i 'prfile' -o 'psfile

return
