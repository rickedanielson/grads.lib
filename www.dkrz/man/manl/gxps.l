.\"-- GrADS troff manual page gxps.l
.\"-- written by Karin Meier
.\"--            DKRZ - Hamburg
.\"--            (German climate computing center)
.\"              e-mail: karin.meier@dkrz.de
.\"
.TH gxps 1 "\*(Dt" "GrADS  V1.6.beta4" "GrADS  V1.6.beta4"
.SH NAME
gxps \- translate \c \&
.B GrADS \c \&
metacode format to \c \&
.B PostScript \c \&
format
.\"--------------- synopsis --------------------------------
.SH SYNOPSIS
.B gxps
[ \fI-crd -i <infile> -o <outfile> ]\fR ]
.\"--------------- description -----------------------------
.SH DESCRIPTION
.LP
.B gxps
convert the 
.B GrADS \c\&
metacode format file to a 
.B PostScript \c\&
file.
.br
.PP
Without any given option,
.B gxps \c\&
converts per default the 
.B GrADS \c\&
metacode format file to a greyscale on white background
.B PostScript \c\&
file. The default 
.B GrADS \c\&
rainbow colors (color numbers 2 to 14) are translated into 
pleasing greyscale values. User defined rainbow colors (numbers 
above 15) are translated to greyscale intensity based on their 
green content only.

.\"--------------- options --------------------------------
.SH OPTIONS
.LP
.TP 15
.BI \-i\ fname
input 
.B GrADS \c\&
metacode format file name 
.I
fname.
.TP
.BI \-o\ fname
output
.B PostScript \c\&
file name 
.I
fname.
.TP
.BI \-c
print color on a white background (= old gxpscw).
.TP
.BI \-r
print greyscale on a black background.
.TP
.BI \-d
add a CTRL-D to the end of the file,  useful if printing on a 
HP 1200C/PS color printer.
.\"--------------- examples --------------------------------
.SH EXAMPLES
.TP 15
Example 1:
example%  gxps \-rc -i mytest.mf -o mytest.ps
.IP
convert 
.B GrADS \c\&
metacode format file
.I
mytest.mf 
to color on black background PostScript file
.I
mytest.ps 
(= old gxpsc).
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
