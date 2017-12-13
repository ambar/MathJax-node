var tape = require('tape')
var mjAPI = require('../lib/main.js')

tape('clear macros', function(t) {
  t.plan(2)

  mjAPI.start()
  var tex = '\\def\\macroA{\\macroB}\\def\\macroB{\\macroA}\\macroB'
  var tex2 = 'P(D|\\bar{E}B)'

  mjAPI.typeset({math: tex, format: 'TeX', svg: true}, function(data) {
      t.equal(data.errors[0], 'TeX parse error: MathJax maximum macro substitution count exceeded; is there a recursive macro call?')

      mjAPI.typeset({math: tex2, format: 'TeX', svg: true}, function(data) {
          t.equal(data.errors, undefined)
      })
  })
})

tape('donot overwrite internal macros', function(t) {
  t.plan(1)

  mjAPI.start()
  var tex = '\\def\\foo{\\bar}\\def\\bar{\\foo}\\bar'

  mjAPI.typeset({math: tex, format: 'TeX', svg: true}, function(data) {
      t.equal(data.errors[0], 'TeX parse error: Missing argument for \\bar')
  })
})
