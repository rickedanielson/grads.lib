.\"-- GrADS troff manual page stnmap.l
.\"-- written by Karin Meier
.\"--            DKRZ - Hamburg
.\"--            (German climate computing center)
.\"              e-mail: karin.meier@dkrz.de
.\"
.TH stnmap 1 "\*(Dt" "GrADS  V1.6.beta4" "GrADS  V1.6.beta4"
.SH NAME
stnmap \- 
create 
.B GrADS \c \&
station map file.
.\"--------------- synopsis --------------------------------
.SH SYNOPSIS
.B stnmap
[ \fI-i fname\fR ]
.\"--------------- description -----------------------------
.SH DESCRIPTION
.LP
.B stnmap \c \&
is a
.B GrADS \c \&
utility that writes out a hash table and/or link list information for station
data that allows 
.B GrADS \c \&
to access the report data more efficiently.
.PP
If you change the data file \- perhaps by appending another time group 
\- you will also have to change the descriptor file to reflect the 
changes \- the new number of times for example \- and then rerun the 
.B stnmap \c \&
utility.
.PP
.B Note \c \&
the difference between station descriptor file and a grid descriptor file:
.LP
.TP 20
.B DTYPE \c \&
specify a data type of: station
.TP
.B STNMAP \c \&
gives the file name of the station mapping file.
.TP
.B XDEF\, YDEF\, ZDEF \c \&
not specified.
.TP
.B TDEF \c \&
describes the time grouping interval and the number of the time groups
in the file.
.TP
.B VAR \c \&
surface variables must come first,  and are given a zero for the 
number\-of\-levels field. Level dependent variables are listed after the surface
variables,  and are given a one in the number\-of\-levels field.
.\"--------------- options --------------------------------
.SH OPTIONS
.LP
.TP 15
.BI \-i\ fname
.I
fname
is the name of the input 
.B GrADS \c \&
descriptor file.
.\"--------------- examples --------------------------------
.SH EXAMPLES
.LP
When a data set, for example 
.I
ua.reps
is written, and the descriptor file 
.I
stat.ctl, 
including the information records for the station data file 
.I
ua.reps 
is created, you should then create the station map file 
.I
ua.map
(named in the STNMAP record of the descriptor file; see below) by running the 
.B stnmap \c \&
utility.
.PP
Example descriptor file: \c \&
.I
stat.ctl
.LP
.TP 15
\ 
.B DSET \c \&
\ \ ^ua.reps
.br
.B DTYPE \c \&
\ \ station
.br
.B STNMAP \c \&
^ua.map
.br
.B UNDEF \c \&
\ \ \-999.0
.br
.B TITLE \c \&
\ \ Real\ Time\ Upper\ air\ obs
.br
.B TDEF \c \&
\ \ \ 10\ linear\ 12z18jan1992\ 12hr
.br
.B VARS \c \&
\ \ \ 12
.br
.B \ \ slp \c \&
\ \ 0\ \ 99\ \ SLP
.br
.B \ \ ts \c \&
\ \ \ 0\ \ 99\ \ Temps
.br
.B \ \ us \c \&
\ \ \ 0\ \ 99\ \ U Winds
.br
.B \ \ vs \c \&
\ \ \ 0\ \ 99\ \ V Winds
.br
.B \ \ z \c \&
\ \ \ \ 1\ \ 99\ \ Heights
.br
.B \ \ t \c \&
\ \ \ \ 1\ \ 99\ \ Temps
.br
.B \ \ u \c \&
\ \ \ \ 1\ \ 99\ \ U Winds
.br
.B \ \ v \c \&
\ \ \ \ 1\ \ 99\ \ V WInds
.br
.B ENDVARS
.PP
Running the stnmap utility:
.LP
.TP 15
\ 
.B stnmap \-i stat.ctl
.br
.PP
The station map file
.I
ua.map
is a binary file, which includes the hash table and/or link list information.
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
