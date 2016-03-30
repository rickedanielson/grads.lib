.\"-- GrADS troff manual page gxtran.l
.\"-- written by Karin Meier
.\"--            DKRZ - Hamburg
.\"--            (German climate computing center)
.\"              e-mail: karin.meier@dkrz.de
.\"
.TH gxtran 1 "\*(Dt" "GrADS  V1.6.beta4" "GrADS  V1.6.beta4"
.SH NAME
gxtran \- display \c \&
.B GrADS \c \&
metacode format file.
.\"--------------- synopsis --------------------------------
.SH SYNOPSIS
.B gxtran
[ \fI-airg <infile>\fR ]
.\"--------------- description -----------------------------
.SH DESCRIPTION
.LP
.B gxtran
is used to display 
.B GrADS \c\&
meta files containing single frames or animations (multi frames).
.PP
Without any option 
the user is asked of the name of the 
.B GrADS \c\&
meta file. 
.I
gxtran
waits till the user hits return in the command window. To quit 
.I
gxtran
press once again return in the command window.
.\"--------------- options --------------------------------
.SH OPTIONS
.LP
.TP 15
.BI \-i\ fname
.I
fname
ist the name of the meta file.
.LP
.TP 15
.BI \-a
animate the frames, i.e., do not pause between frames until the user hits 
a return in the command window.
.LP
.TP 15
.BI \-r
reverse black and white so you get your plot on white (black) background.
.LP
.TP 15
.BI \-g\ WWWWxHHHH+X+Y
set the geometry of the X window as you would do in any other X application. 
The only difference is the space between -g and WWWW. The display window will be
WWWW pixels wide and HHHH pixels tall starting at point X and Y on the screen.
.\"--------------- examples --------------------------------
.SH EXAMPLES
.TP 15
Example:
example%  gxtran \-a \-g 800x600+0 \-i mytest.mf
.IP
would open a window of size 800x600 starting at the upper left corner of the 
screen and animate all frames (plots) in the file
.I
mytest.mf.
.PP
.\"--------------- see also -------------------------------
.SH "SEE ALSO"
grads(1)
.br
\fI \(em GrADS Documentation V1.5.1.12 (gadoc151.ps),\fR
.br
	Brian Doty (COLA), Mike Fiorino (LLNL), Tom Holt (UEA)
.br
\fI \(em GrADS commands and scripting language reference cards,\fR
.br
	Karin Meier (DKRZ)
