### What
Replaces drvfs mountpoints
with Windows pathnames
in Error stacktraces
when using node
under the Windows Subsystem for Linux

### Why 🤔
I use https://github.com/Microsoft/vscode
and develop under WSL.
When I see stacktraces, I'd like
to be able to click to jump
to a `UGH:\dir\file.js:line` spot.

### How
```
Error.prepareStackTrace = require('wsl-drvfs-stack-formatter');
```

### But
If you're not under WSL,
this is a no-op,
so you don't need to
include it conditionally.

If you already have
[another formatter](https://github.com/v8/v8/wiki/Stack-Trace-API),
you can safely place this one after it,
as it can cope with an existing one
that returns a string.
