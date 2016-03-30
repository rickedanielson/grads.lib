.\"-- GrADS troff manual page gribmap.l
.\"-- written by Karin Meier
.\"--            DKRZ - Hamburg
.\"--            (German climate computing center)
.\"              e-mail: karin.meier@dkrz.de
.\"
.TH gribmap 1 "\*(Dt" "GrADS  V1.6.beta4" "GrADS  V1.6.beta4"
.SH NAME
gribmap \- 
"maps" between the 
.B GRIB \c \&
and the 
.B GrADS \c \&
descriptor.
.\"--------------- synopsis --------------------------------
.SH SYNOPSIS
.B gribmap
[\fI-i fname] [\-v] [\-t0] [\-0] [\-sxxxxx] [\-hxxx] [\-fxxx\fR]
.\"--------------- description -----------------------------
.SH DESCRIPTION
.LP
.B gribmap \c \&
is a 
.B GrADS \c \&
utility that "maps" between
.B GRIB \c \&
data and the 
.B GrADS \c \&
data description.
.PP
When you set up a 
.B GrADS \c \&
data descriptor file (e.g.,  the ".ctl" file), you are defining, external to the
data itself, a structure, \- how many variables, how times in a file (or set of
files with the template option), the spatial dimension or "shape" of the variables,
etc. The 
.B GrADS \c \&
format (floats, either 64\-bit or 32\-bit IEEE depending on platform) is so simple 
that the relationship between the data structure defined in the .ctl file is calculated 
and stored in memory when the file is opened.
.PP
What makes GRIB so painful is that there is NO relationship between the GRIB data
and the bigger structural context implied by the .ctl file. Hence, the need for a utility 
which "maps" between the GRIB data and the GrADS data description.
.PP
How this actually happens in gribmap is that each field in the GRIB data file is 
read and its parameters (variable, level, time, etc.) are extracted and compared to 
ALL the variables at any of the level/times/UNITS in the .ctl file until a match 
is found.
.PP
The new features of gribmap allow restrictions to be placed on this matching process.
.B gribmap \c \&
supports 
.B GRIB0  \c \&
and 
.B GRIB1  \c \&
format (version 0 and version 1).
.PP
Second the code now automatically scans for character string "GRIB" vice having to
worry about headers and what not (e.g., "junk" between the beginning and the end
of the GRIB message). That is unless you are NMC and put (duh) GRIB in the header.
The default scan limit is 1000 which can be changed via the command line option.
.\"--------------- options ---------------------------------
.SH OPTIONS
.LP
.TP 15
.BI \-i\ fname
\fIfname\fR is the input grib file name.
.TP 15
.BI \-v
nicer output to verify what you are attempting to map.
.TP 15
.BI \-t0
a match can only occur if the base time in the grib record is the same as 
the initial time in the .ctl file. This is used to pull out a forecast 
sequence (0, 12, 24, .., 72 h) starting a specific time (e.g., 95010300).
.TP 15
.BI \-0
ignore the forecast time in setting up the match. This is useful in reanalysis
where some of the diagnostic fields are "valid" at slightly different forecast 
time even though they share the same starting time.
.TP 15
.BI \-sxxxxx.
where xxxxx is the max number of bytes to search between records for GRIB.
.TP 15
.BI \-hxxx
bypass the bytes before starting the scan process; where xxx is the number of bytes,
or for NMC:  \-hnmc
.TP 15
.BI \-fxxx
where xxx is the forecast time in hours. In this case, a match occurs \fIonly\fR if the
\fIforecast\fR time in the grib record matches xxx (hours). This is used to isolate a
sequence of forecasts, e.g., all the 120 h forecasts verifying during the period 
00z1jan1995 to 12z2jan1995 from the MRF ensemble runs.
.\"--------------- examples ---------------------------------
.SH EXAMPLES
.LP
Here is a nice trick. To verify what is mapped during the gribmap:
.br
	\fB gribmap -v -t0 ..... | grep MATCH\fR
.br
	all records \fIMATCH\fR matching will be displayed.
.\"--------------- see also -------------------------------
.SH "SEE ALSO"
grads(1), gribscan(1)
.br
\fI\(em GrADS Documentation V1.5.1.12 (gadoc151.ps),\fR
.br
	Brian Doty (COLA), Mike Fiorino (LLNL), Tom Holt (UEA)
.br
\fI\(em GrADS commands and scripting language reference cards,\fR
.br
	Karin Meier (DKRZ)
