.\"-- GrADS troff manual page
.\"-- written by Karin Meier
.\"--            DKRZ - Hamburg
.\"--            (German climate computing center)
.\"              e-mail: karin.meier@dkrz.de
.\"
.TH grads 1 "\*(Dt" "GrADS  V1.6.beta4" "GrADS  V1.6.beta4"
.SH NAME
grads \- The 
.B G\c \&
.B r\c \&
id 
.B A\c \&
nalysis and 
.B D\c \&
isplay 
.B S\c \&
ystem program
.\"--------------- synopsis --------------------------------
.SH SYNOPSIS
.B grads
[ \fI-\fR ]
b|l|p
[ \fI-c 'command'\fR ]
.\"--------------- description -----------------------------
.SH DESCRIPTION
.LP
.B grads
is an interactive desktop tool that is currently in use worldwide for the
analysis and display of earth science data.
.br
.PP
.BI GrADS
implements a 4-Dimensional data model, where the dimensions are usually latitude, 
longitude, level and time. Each data set is located within this 4-Dimensional space
by the use of a data descriptor file. Both gridded and station data may be described. 
Gridded data may be non-linearly spaced; Gaussian grids and variable resolution ocean 
model grids are directly supported. The internal data representation in a file 
may be either 
.I binary \c\&
or 
.I GRIB.
.br
.PP
Operations may be performed on the data directly, and interactively, by entering 
.I FORTRAN-like
expressions at the command line. A rich set of built-in functions are 
provided. In addition, users may add their own functions as external routines written 
in any programming language. The expression syntax allows complex operations that range 
over very large amounts of data to be performed with simple expressions.
.br
.PP
For more information see
.I
GrADS Documentation V1.5.1.12 (gadoc151.ps).
.br
.PP
.BI GrADS 
is freely distributed over the Internet.
.\"--------------- options --------------------------------
.SH OPTIONS
.LP
.TP 15
.BI \-l
run grads in landscape mode. The orientation question is not asked.
.TP
.BI \-p
run grads in portrait mode. The orientation question is not asked.
.TP
.BI \-b
run grads in batch mode. No graphics output window is opened.
.TP
.BI \-c\ 'command'
execute the supplied 'command' as the first GrADS command after GrADS is started.
For example:
.RS
.IP
example%  grads \-c 'query'
.RE
.IP
execute the query command after GrADS is started.
.LP
The options may be used in combinations. For example:
.LP
.RS
example%  grads \-lc 'run script.gs'
.RE
.\"--------------- environment settings --------------------
.SH ENVIRONMENT VARIABLES
.LP
Some environment variables must be set before starting the GrADS.
.TP 15
.BI \GADDIR
points to the directory containing the 
.BI GrADS 
package.
.TP
.BI \GASCRP
held a list of directories containing 
.BI GrADS 
utility scripts and user scripts.
.TP
.BI \GAUDFT
points to the user defined function table. If this variable is not set, 
the function table will not be read.
.TP
.BI \PATH
the environment variable PATH must be expanded by 
.BI GADDIR .
.br
.PP
.PD .2i
For example:
.br
.PP
.IP
.I
C\-shell\:
.br
.PP
.IP
example%  setenv GADDIR /usr/local/dkrz/grads
.PD .2v
.IP
example%  setenv GASCRP $HOME/grads/scripts
.PD .2v
.IP
example%  setenv GAUDFT $HOME/grads/udf/table
.PD .2v
.IP
example%  setenv PATH $PATH":$GADDIR"
.PD .2i
.PP
.IP
.I
Bourne shell\:
.br
.PP
.IP
example%  GADDIR=/usr/local/dkrz/grads; export GADDIR
.PD .2v
.IP
example%  GASCRP=$HOME/grads/scripts; export GASCRP
.PD .2v
.IP
example%  GAUDFT=$HOME/grads/udf/table; export GAUDFT
.PD .2v
.IP
example%  PATH=$PATH:$GADDIR; export PATH
.PD .15i
.\"--------------- examples --------------------------------
.SH EXAMPLES
.TP 15
Example 1:
example%  grads \-pc 'open data.ctl'
.IP
start grads and open data descriptor file data.ctl.
.TP 15
Example 2:
example%  grads \-bpc 'run script.gs'
.IP
running grads in batch mode, executing the GrADS script "script.gs" in portrait mode.
.PP
.\"--------------- see also -------------------------------
.SH "SEE ALSO"
gxps(1), gxtran(1)
.br
\fI \(em GrADS Documentation V1.5.1.12 (gadoc151.ps),\fR
.br
	Brian Doty (COLA), Mike Fiorino (LLNL), Tom Holt (UEA)
.br
\fI \(em GrADS commands and scripting language reference cards,\fR
.br
	Karin Meier (DKRZ)
