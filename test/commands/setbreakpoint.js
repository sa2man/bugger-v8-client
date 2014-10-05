'use strict';

var withBugger = require('../helpers/with_bugger');
var expect = require('expect.js');

describe('commands.backtrace', function() {
  describe('against three.js', function() {
    withBugger('three.js');

    it('can break at a line', function*() {
      var b = this.bugger;
      yield b.nextEvent('break');
      var breakpoint = yield b.setbreakpoint({
        type: 'scriptRegExp', target: 'three.js', line: 1, column: 0 });
      expect(breakpoint.line).to.be(1);
      expect(breakpoint.column).to.be(0);

      b.resume();
      var breakEvent = yield b.nextEvent('break');
      expect(breakEvent.location.line).to.be(1);
      expect(breakEvent.location.column).to.be(0);
    });
  });
});