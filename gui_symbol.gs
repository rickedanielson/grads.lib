* This script plots a desired weather symbol given
* the name of the variable which defines it.
*
* e.g. "run gui_symbol ww"
*
* where it is assumed that a COADS-type variable is used - RD September 2002.

function symbol(args)
var = subwrd(args,1)
#clr = subwrd(args,2)
#if (clr != "")
#  "set wxopt mark"
#  "set line 0 1 7"
#  "set cmark 3"
#else
#  "set wxopt wxsym"
#  "set line 1 1 3"
#endif

"set gxout wxsym"
symbol =  1   ;# funnel cloud
code   =  19  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"

symbol =  2   ;# thunderstorm
code   =  17  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  18  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  29  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  91  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  92  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  93  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  94  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  95  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  96  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  97  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  98  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   =  99  ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"

symbol = 16   ;# rain
code   = 21   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 24   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 25   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 50   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 51   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 52   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 53   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 54   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 55   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 56   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 57   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 58   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 59   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 60   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 61   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 62   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 63   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 64   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 65   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 66   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 67   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 68   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 69   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 80   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 81   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 82   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 83   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 84   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"

symbol = 21   ;# snow
code   = 22   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 23   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 26   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 27   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 70   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 71   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 72   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 73   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 74   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 75   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 76   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 77   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 78   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 79   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 85   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 86   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 87   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 88   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 89   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 90   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"

symbol = 28   ;# drizzle
code   = 20   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"

symbol = 34   ;# fog
code   = 10   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 11   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 12   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 28   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 40   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 41   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 42   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 43   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 44   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 45   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 46   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 47   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 48   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"
code   = 49   ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"

#symbol = 39   ;# smoke
#code   = 4    ; "d maskout(maskout("var"-"var"+"symbol","var"-"code"),"code"-"var")"

"set gxout model"
