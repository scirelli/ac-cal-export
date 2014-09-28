let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/My_Programs/aircraftclubs
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +1 aircraftclubs.html
badd +1 js/test.js
badd +45 manifest.json
badd +1 background.js
badd +1 js/contentscript/main.js
badd +1 aircraftclubs_popup.html
badd +1 js/aircraftclubs_popup.js
badd +1 js/identity.js
badd +0 js/lib/extras-string.js
badd +0 css/popup.css
args aircraftclubs.html
edit manifest.json
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
3wincmd h
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 86 + 117) / 235)
exe 'vert 2resize ' . ((&columns * 27 + 117) / 235)
exe 'vert 3resize ' . ((&columns * 23 + 117) / 235)
exe '4resize ' . ((&lines * 7 + 26) / 52)
exe 'vert 4resize ' . ((&columns * 96 + 117) / 235)
exe '5resize ' . ((&lines * 42 + 26) / 52)
exe 'vert 5resize ' . ((&columns * 96 + 117) / 235)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 6 - ((5 * winheight(0) + 25) / 50)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
6
normal! 025|
wincmd w
argglobal
edit background.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 7 - ((6 * winheight(0) + 25) / 50)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
7
let s:c = 34 - ((20 * winwidth(0) + 13) / 27)
if s:c > 0
  exe 'normal! ' . s:c . '|zs' . 34 . '|'
else
  normal! 034|
endif
wincmd w
argglobal
edit js/test.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 25) / 50)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
wincmd w
argglobal
edit css/popup.css
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 3) / 7)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/My_Programs/aircraftclubs
wincmd w
argglobal
edit ~/My_Programs/aircraftclubs/aircraftclubs_popup.html
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 9 - ((7 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
9
normal! 011|
lcd ~/My_Programs/aircraftclubs
wincmd w
4wincmd w
exe 'vert 1resize ' . ((&columns * 86 + 117) / 235)
exe 'vert 2resize ' . ((&columns * 27 + 117) / 235)
exe 'vert 3resize ' . ((&columns * 23 + 117) / 235)
exe '4resize ' . ((&lines * 7 + 26) / 52)
exe 'vert 4resize ' . ((&columns * 96 + 117) / 235)
exe '5resize ' . ((&lines * 42 + 26) / 52)
exe 'vert 5resize ' . ((&columns * 96 + 117) / 235)
tabedit ~/My_Programs/aircraftclubs/js/identity.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
21,39fold
44,77fold
105,110fold
114,121fold
let s:l = 40 - ((39 * winheight(0) + 25) / 51)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
40
normal! 05|
4wincmd w
tabedit ~/My_Programs/aircraftclubs/js/aircraftclubs_popup.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 54 - ((26 * winheight(0) + 24) / 49)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
54
normal! 09|
4wincmd w
tabedit ~/My_Programs/aircraftclubs/js/contentscript/main.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 51 - ((50 * winheight(0) + 25) / 51)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
51
normal! 0
lcd ~/My_Programs/aircraftclubs/js
4wincmd w
tabedit ~/My_Programs/aircraftclubs/js/lib/extras-string.js
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 108 - ((22 * winheight(0) + 25) / 51)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
108
normal! 065|
lcd ~/My_Programs/aircraftclubs/js
4wincmd w
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
