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
badd +1 css/popup.css
badd +1 js/lib/xhrWithAuth.js
badd +1 js/lib/calendar/Events.js
badd +1 js/lib/calendar/CalendarList.js
badd +1 js/lib/calendar/CalendarListEntry.js
badd +1 js/lib/calendar/Calendars.js
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
exe '1resize ' . ((&lines * 48 + 26) / 52)
exe 'vert 1resize ' . ((&columns * 24 + 118) / 237)
exe '2resize ' . ((&lines * 48 + 26) / 52)
exe 'vert 2resize ' . ((&columns * 51 + 118) / 237)
exe '3resize ' . ((&lines * 48 + 26) / 52)
exe 'vert 3resize ' . ((&columns * 17 + 118) / 237)
exe '4resize ' . ((&lines * 5 + 26) / 52)
exe 'vert 4resize ' . ((&columns * 75 + 118) / 237)
exe '5resize ' . ((&lines * 42 + 26) / 52)
exe 'vert 5resize ' . ((&columns * 75 + 118) / 237)
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
let s:l = 6 - ((5 * winheight(0) + 24) / 48)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
6
let s:c = 25 - ((9 * winwidth(0) + 12) / 24)
if s:c > 0
  exe 'normal! ' . s:c . '|zs' . 25 . '|'
else
  normal! 025|
endif
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
let s:l = 22 - ((20 * winheight(0) + 24) / 48)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
22
normal! 03|
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
let s:l = 1 - ((0 * winheight(0) + 24) / 48)
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
let s:l = 1 - ((0 * winheight(0) + 2) / 5)
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
let s:l = 19 - ((16 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
19
normal! 035|
lcd ~/My_Programs/aircraftclubs
wincmd w
exe '1resize ' . ((&lines * 48 + 26) / 52)
exe 'vert 1resize ' . ((&columns * 24 + 118) / 237)
exe '2resize ' . ((&lines * 48 + 26) / 52)
exe 'vert 2resize ' . ((&columns * 51 + 118) / 237)
exe '3resize ' . ((&lines * 48 + 26) / 52)
exe 'vert 3resize ' . ((&columns * 17 + 118) / 237)
exe '4resize ' . ((&lines * 5 + 26) / 52)
exe 'vert 4resize ' . ((&columns * 75 + 118) / 237)
exe '5resize ' . ((&lines * 42 + 26) / 52)
exe 'vert 5resize ' . ((&columns * 75 + 118) / 237)
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
48,62fold
64,69fold
84,98fold
100,105fold
let s:l = 75 - ((43 * winheight(0) + 25) / 51)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
75
normal! 013|
lcd ~/My_Programs/aircraftclubs
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
4,48fold
52,121fold
4
normal! zo
let s:l = 151 - ((103 * winheight(0) + 25) / 51)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
151
normal! 016|
lcd ~/My_Programs/aircraftclubs/js
tabedit ~/My_Programs/aircraftclubs/js/lib/xhrWithAuth.js
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
6,61fold
80,89fold
125,192fold
195,234fold
125
normal! zo
195
normal! zo
let s:l = 212 - ((29 * winheight(0) + 25) / 51)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
212
normal! 075|
lcd ~/My_Programs/aircraftclubs/js
tabedit ~/My_Programs/aircraftclubs/js/lib/calendar/Events.js
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
let s:l = 239 - ((19 * winheight(0) + 25) / 51)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
239
normal! 024|
lcd ~/My_Programs/aircraftclubs/js
tabedit ~/My_Programs/aircraftclubs/js/lib/calendar/CalendarList.js
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
28,57fold
66,87fold
92,108fold
112,135fold
139,160fold
164,183fold
let s:l = 21 - ((20 * winheight(0) + 25) / 51)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
21
normal! 041|
lcd ~/My_Programs/aircraftclubs/js
tabedit ~/My_Programs/aircraftclubs/js/lib/calendar/CalendarListEntry.js
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
normal! 08|
lcd ~/My_Programs/aircraftclubs/js
tabedit ~/My_Programs/aircraftclubs/js/lib/calendar/Calendars.js
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
let s:l = 224 - ((48 * winheight(0) + 24) / 49)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
224
normal! 08|
lcd ~/My_Programs/aircraftclubs/js
tabnext 2
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
