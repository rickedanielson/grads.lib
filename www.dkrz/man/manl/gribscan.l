.\"-- GrADS troff manual page gribscan.l
.\"-- written by Karin Meier
.\"--            DKRZ - Hamburg
.\"--            (German climate computing center)
.\"              e-mail: karin.meier@dkrz.de
.\"

.TH gribscan 1 "\*(Dt" "GrADS  V1.6.beta4" "GrADS  V1.6.beta4"
.SH NAME
gribscan \- 
.B GrADS \c \&
extract grid info from GRIB data files.
.\"--------------- synopsis --------------------------------
.SH SYNOPSIS
.B gribscan
[ \fI-i fname ] [\-o ofname ] [ \-og ] [ \-oa ] [ \-of\fR ]
.\"--------------- description -----------------------------
.SH DESCRIPTION
.LP
.B gribscan \c \&
is a 
.B GrADS \c \&
routine which is used for extracting grid info from a 
.B GRIB \c \&
data file or features:
.LP
.TP 10
\(bu \c \&
grid output in ASCII, floats, and/or grib;
.TP
\(bu \c \&
product/grid information;
.TP
\(bu \c \&
automatic scanning for GRIB records so that you don't have to know the 
physical layout of the data to scan it;
.\"--------------- file options ----------------------------
.SH FILE\ OPTIONS
.LP
.TP 15
.BI \-i\ fname
.I
fname
is the input grib file name.
.TP 15
.BI \-o\ ofname
.I
ofname
is the output file name WITHOUT an extension.
.TP 15
.BI \-og
output GRIB.
.TP 15
.BI \-oa
output ASCII.
.TP 15
.BI \-of
a stream of floats. This is machine dependent and is equal to 64bit on CRAYS 
and 32-bit elsewhere.
.PP
If \-i option is not invoked then gribscan asks for a file name. If \-o option is
omitted then a default ofname of 
.I
zy0x1w2.type 
is created where 
.I
type
is equal to
.br
.TP
.B asc \c \&
ASCII
.TP
.B grb \c \&
GRIB
.TP
.B dat \c \&
a stream of floats (GrADS format)
.\"--------------- display options -------------------------
.SH DISPLAY\ OPTIONS
.LP
.TP 15
.BI \-q
quick output to extract stuff GrADS gribmap cares about.
.TP 15
.BI \-q1
one-line quick output.
.TP 15
.BI \-d
common delimited mode.
.TP 15
.BI \-v
verbose mode for diagnostics.
.TP 15
.BI \-bd
binary data section info.
.TP 15
.BI \-gv
use the NMC GRIB variable table to output the mnemonic, title and units from the
standard NMC table.
.TP 15
.BI \-gd
output info from the grid defined section.
.TP 15
.BI \-h81
needed for old "standard" NMC GRIB file with 81\-byte header.
.TP 15
.BI \-S
silent NO standard output.
.\"--------------- examples -------------------------------
.SH EXAMPLES
.I 
Example\ 1:
.IP
A "quick" scan to get the info GrADS cares about:
.IP
.BI gribscan\ \-q\ \-i\ eta.T12Z.PGrbF48\ |\ grep\ 184
.br
.IP
produces the following line:
.IP
.B 184,F,135,108,100,0,100,0,1e+09,T,1994,8,29,12,0,1,48,0,
.B G,104,BDTG,94082912
.ta 1.1i 1.5i 3.0i 6.0i
.IP
184	\-	field # in the file
.br
F	\-	field data
.br
135	\-	param #
.br
108	\-	level indicator
.br
100	\-	level
.br
0	\-	11 byte 1 of level
.br
100	\-	12 byte 2 of level
.br
0	\-	time range indicator
.br
1e+09	\-	decimal scale factor
.br
T	\-	time data follows
.br
1994	\-	year
.br
8	\-	month
.br
29	\-	day
.br
12	\-	hour
.br
0	\-	min
.br
1	\-	forecast time unit (hour)
.br
48	\-	t=48 h forecast
.br
G	\-	grid param follows
.br
104	\-	NMC grid #104
.br
BDTG	\-	Base date\-time\-group (yymmddhh) follows
.br
94082912	\-	yymmddhh
.br
.PP
.I
Example\ 2:
.IP
Comma delimited output for parsing by things like awk:
.IP
.BI gribscan\ \-d\ \-i\ eta.T12Z.PGrbF48\ |\ grep\ 184
.br
.IP
produces the following line:
.IP
.B PDS,184,104,135,108,100,0,100,1994,8,29,12,0,1,48,0,0,1e+09
.br
.IP
same as above but arranged differently.
.br
.PP
.I
Example\ 3:
.IP
A full listing:
.IP
.BI gribscan\ \-d\ \-gv\ \-bd\ \-gd\ \-i\ eta.T12Z.PGrbF48\ |\ grep\ 184
.br
.IP
produces the following line:
.IP
.B PDS,184,104,135,108,100,0,100,1994,8,29,12,0,1,1e+09,mconv,
.B Horizontal\ moisture\ divergence,[kg/kg/s],GDS,5,147,110,
.B \-139.475,90.755,0.354,\-0.268,\-105.000,3353.000,0,1,0,BDS,12,
.B \-646.844,16170,4825059,26366
.br
.IP
104	\-	grid id
.br
param #135	\-	mconv, Horizontal moisture divergence,
.br
		[kg/kg/s] (shown by -gv option)
.br
BDS	\-	binary data section
.br
646.844	\-	reference value
.br
16170	\-	# of points
.br
4825059	\-	starting byte of the data
.br
26366	\-	length of the grib message
.br
.PP
.I
Example\ 4:
.IP
Output a selected few fields in GRIB:
.IP
.BI gribscan\ \-og\ \-sp135\ \-q\ \-i\ eta.T12Z.PGrbF48\ \-o\ /wrk/$USER/eta.135
.br
.IP
Writes out all GRIB message containing the 135 parameter to the file 
.I
/wrk/$USER/tmp/eta.135.grb.
.PP
A subsequent gribscan on 
.I
eta.135.grb:
.IP
.BI gribscan\ \-q\ \-i\ eta.135.grb
.br
.IP
produces the following line:
.IP
.B 1,F,135,108,100,0,100,0,1e+09,T,1994,8,29,12,0,1,48,0,G,104,
.B BDTG,94082912,\ 2,F,135,108,21860,85,100,0,1e+09,T,
.B 1994,8,29,12,0,1,48,0,G,104,BDTG,94082912
..br
.PP
.\"--------------- see also -------------------------------
.SH "SEE ALSO"
.ta 0.4i
grads(1), gribmap(1)
.br
\fI\(em GrADS Documentation V1.5.1.12 (gadoc151.ps),\fR
.br
	Brian Doty (COLA), Mike Fiorino (LLNL), Tom Holt (UEA)
.br
\fI\(em GrADS commands and scripting language reference cards,\fR
.br
	Karin Meier (DKRZ)
