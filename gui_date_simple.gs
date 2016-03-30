* This script obtains and reformats a date stamp.  If there is an
* an argument, it's taken to be a number of time steps by which to
* shift the current time before returning the result (and shifting
* back).  The date is then converted into the corresponding T0 string
* or left unconverted, depending on whether the date is near June of
* the year 1000 - RD September 1998, October 1999, January 2000.

function date(arg)

"q dims"
ret = sublin(result,5)
nowtime = subwrd(ret,9)
if (arg = "")
  "q time"
  datatime=subwrd(result,3)
else
  shiftime = nowtime + arg
  "set t "shiftime
  "q time"
  datatime=subwrd(result,3)
  "set t "nowtime
endif

if (substr(datatime,3,1) = ":")
  hr = substr(datatime,1,5)
  dy = substr(datatime,7,2)
  mon = substr(datatime,9,3)
  yr = substr(datatime,12,4)
else
  hr = substr(datatime,1,2)
  dy = substr(datatime,4,2)
  mon = substr(datatime,6,3)
  yr = substr(datatime,9,4)
endif

if (mon = 'JAN')
  mo = '01'
else
  if (mon = 'FEB')
    mo = '02'
  else
    if (mon = 'MAR')
      mo = '03'
    else
      if (mon = 'APR')
        mo = '04'
      else
        if (mon = 'MAY')
          mo = '05'
        else
          if (mon = 'JUN')
            mo = '06'
          else
            if (mon = 'JUL')
              mo = '07'
            else
              if (mon = 'AUG')
                mo = '08'
              else
                if (mon = 'SEP')
                  mo = '09'
                else
                  if (mon = 'OCT')
                    mo = '10'
                  else
                    if (mon = 'NOV')
                      mo = '11'
                    else
                      mo = '12'
                    endif
                  endif
                endif
              endif
            endif
          endif
        endif
      endif
    endif
  endif
endif
tmpdate = yr"-"mo"-"dy"-"hr

* if the year is current, then just return the date

* return(tmpdate)
retdate = tmpdate

* otherwise try to convert the date to a T0 string

if (tmpdate = '1000-06-01-00')
  retdate = 'T0'
else
  if (tmpdate = '1000-05-31-18')
    retdate = 'T0 - 6 h'
  else
    if (tmpdate = '1000-05-31-12')
      retdate = 'T0 - 12 h'
    else
      if (tmpdate = '1000-05-31-06')
        retdate = 'T0 - 18 h'
      else
        if (tmpdate = '1000-05-31-00')
          retdate = 'T0 - 24 h'
        else
          if (tmpdate = '1000-05-30-18')
            retdate = 'T0 - 30 h'
          else
            if (tmpdate = '1000-05-30-12')
              retdate = 'T0 - 36 h'
            else
              if (tmpdate = '1000-05-30-06')
                retdate = 'T0 - 42 h'
              else
                if (tmpdate = '1000-05-30-00')
                  retdate = 'T0 - 48 h'
                else
                  if (tmpdate = '1000-05-29-18')
                    retdate = 'T0 - 54 h'
                  else
                    if (tmpdate = '1000-05-29-12')
                      retdate = 'T0 - 60 h'
                    else
                      if (tmpdate = '1000-05-29-06')
                        retdate = 'T0 - 66 h'
                      else
                        if (tmpdate = '1000-05-29-00')
                          retdate = 'T0 - 72 h'
                        else
                          if (tmpdate = '1000-05-28-18')
                            retdate = 'T0 - 78 h'
                          else
                            if (tmpdate = '1000-05-28-12')
                              retdate = 'T0 - 84 h'
                            else
                              if (tmpdate = '1000-05-28-06')
                                retdate = 'T0 - 90 h'
                              else
                                if (tmpdate = '1000-05-28-00')
                                  retdate = 'T0 - 96 h'
                                else
                                  retdate = tmpdate
                                endif
                              endif
                            endif
                          endif
                        endif
                      endif
                    endif
                  endif
                endif
              endif
            endif
          endif
        endif
      endif
    endif
  endif
endif

if (retdate = tmpdate)
  if (tmpdate = '1000-06-01-06')
    retdate = 'T0 + 6 h'
  else
    if (tmpdate = '1000-06-01-12')
      retdate = 'T0 + 12 h'
    else
      if (tmpdate = '1000-06-01-18')
        retdate = 'T0 + 18 h'
      else
        if (tmpdate = '1000-06-02-00')
          retdate = 'T0 + 24 h'
        else
          if (tmpdate = '1000-06-02-06')
            retdate = 'T0 + 30 h'
          else
            if (tmpdate = '1000-06-02-12')
              retdate = 'T0 + 36 h'
            else
              if (tmpdate = '1000-06-02-18')
                retdate = 'T0 + 42 h'
              else
                if (tmpdate = '1000-06-03-00')
                  retdate = 'T0 + 48 h'
                else
                  if (tmpdate = '1000-06-03-06')
                    retdate = 'T0 + 54 h'
                  else
                    if (tmpdate = '1000-06-03-12')
                      retdate = 'T0 + 60 h'
                    else
                      if (tmpdate = '1000-06-03-18')
                        retdate = 'T0 + 66 h'
                      else
                        if (tmpdate = '1000-06-04-00')
                          retdate = 'T0 + 72 h'
                        else
                          if (tmpdate = '1000-06-04-06')
                            retdate = 'T0 + 78 h'
                          else
                            if (tmpdate = '1000-06-04-12')
                              retdate = 'T0 + 84 h'
                            else
                              if (tmpdate = '1000-06-04-18')
                                retdate = 'T0 + 90 h'
                              else
                                if (tmpdate = '1000-06-05-00')
                                  retdate = 'T0 + 96 h'
                                else
                                  retdate = tmpdate
                                endif
                              endif
                            endif
                          endif
                        endif
                      endif
                    endif
                  endif
                endif
              endif
            endif
          endif
        endif
      endif
    endif
  endif
endif

return(retdate)
