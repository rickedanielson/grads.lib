function myscorr(xx,yy,t1,t2)
'set fwrite outfile.dat'
it=t1
While (it<=t2)
*
* Take the whole world
*
  'set lat -90 90';'set lon 0 360'
*
* Set the time
*
  'set t 'it
*
* Output statistics ...
*
  'set gxout stat'
*
* for XX, YY and XX*YY
*
  'd 'xx     ; result1=result
  'd 'yy     ; result2=result
  'd 'xx'*'yy; result3=result

*
* Number of Valid Points
*
  NN = sublin(result1,7) ; NN = subwrd(NN,8)

*
* Sum(Xi) and Sum(Xi^2)
*
  line10 = sublin(result1,10);
  SXi  = subwrd(line10,2);
  SXi2 = subwrd(line10,3);
*
* Sum(Yi) and Sum(Yi^2)
*
  line10 = sublin(result2,10);
  SYi  = subwrd(line10,2);
  SYi2 = subwrd(line10,3);
*
* Sum(Xi*Yi)
*
  line10= sublin(result3,10);
  SXiYi = subwrd(line10,2);
*
* b1 = Slope of Regression(X,Y)
* b2 = Slope of Regression(Y,X)
* R^2 = b1*b2
*
  b1 = (SXiYi - SXi*SYi/NN)/(SXi2 - SXi*SXi/NN)
  b2 = (SXiYi - SYi*SXi/NN)/(SYi2 - SYi*SYi/NN)
  R2 = b1*b2
*
* Write r=SQRT(R^2) (i.e. correlation) in outfile.dat
*
 'set gxout fwrite'; 'd SQRT('R2')'
  it = it + 1
EndWhile
'disable fwrite'

*
* Write out a data descriptor file for the dummy data
*
fname = 'outfile.ctl'
'set t 't1 ; 'q time' ; ntimes = t2-t1+1 ; timmn = subwrd(result,3)
rc = write(fname,'dset outfile.dat')
rc = write(fname,'undef -9.99e33')
rc = write(fname,'title Correlation')
rc = write(fname,'xdef 1 linear 0 1')
rc = write(fname,'ydef 1 linear 0 1')
rc = write(fname,'zdef 1 linear 0 1')
rc = write(fname,'tdef 'ntimes' linear 'timmn' 1dy')
rc = write(fname,'vars 1')
rc = write(fname,'corr 0 99 Correlation')
rc = write(fname,'endvars')
rc = close(fname)

* Read the dummy data in
'open 'fname
*
* Check to how many files are open so that the correct variable.# is assigned
*
'q files';
*
* Count the number of lines of the output of 'q files'
*
line = 'something';
hmlines = 1;
while (line!='')
  line = sublin(result,hmlines)
  hmlines = hmlines + 1
endwhile
* Since there are 3 lines of output per file,
* 1 line overhead ( the last empty line)
* and hmlines is inceased an additional time because of the while-endwhile loop 
* How Many Files is the (number of lines - 2)/3
hmfiles = (hmlines-2)/3 
*
* So now we know that there are hmfiles files open.
* define the corr from the dummy file
'set gxout contour'
'set x 1';'set y 1';'set z 1'
'set t 't1' 't2
'define corr = corr.'hmfiles'(x=1,y=1,z=1)'
'close 'hmfiles

*
* delete the dummy files outfile.dat and outfile.ctl
*
'!rm outfile* -f'

return corr

