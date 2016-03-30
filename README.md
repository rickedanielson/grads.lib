```shell
`
# get a copy
git clone git@github.com:rickedanielson/grads.lib.git

# requirements
installation of opengrads-2.1.a2.oga.1 (for scripting)
installation of opengrads.v2.0.2.oga.2 (for gui browsing)

# aliases on ubuntu 14.04 (local)
alias   gui 'cd $STEMA/prog/graphics.grads/grads.lib/gui; ls -al'
alias  grad 'cd $STEMA/prog/graphics.grads/grads.lib; ls'
set path = ($path /opt/opengrads)
setenv  GADDIR /opt/opengrads/Resources/SupportData
setenv GA2UDXT /opt/opengrads.v2.0.2.oga.2/Linux/Versions/2.0.2.oga.2/i686/gex/udxt
setenv  GADSET /opt/opengrads/Resources/SampleDatasets
setenv  GASCRP $STEMA/prog/graphics.grads/grads.lib
alias  gradh 'setenv GAGUI "$STEMA/prog/graphics.grads/grads.lib/gui/h.gui" ; /opt/opengradb/grads -l -g 1045x755--7--7'
alias   disp 'vi $STEMA/prog/graphics.grads/lib/gui_disp.gs'
