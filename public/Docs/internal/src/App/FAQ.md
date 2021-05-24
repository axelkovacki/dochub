#FAQ

if you are on linux and run yarn start and got this error:
```bash
watch /path/to/compufacil/App ENOSPC
Error: watch /path/to/compufacil/App ENOSPC
    at exports._errnoException (util.js:1022:11)
    at FSWatcher.start (fs.js:1306:19)
    at Object.fs.watch (fs.js:1331:11)
    at NodeWatcher.watchdir (/path/to/compufacil/App/node_modules/sane/src/node_watcher.js:144:20)
    at new NodeWatcher (/path/to/compufacil/App/node_modules/sane/src/node_watcher.js:45:8)
    at createWatcher (/path/to/compufacil/App/node_modules/jest-haste-map/build/index.js:536:23)
    at Array.map (native)
    at HasteMap._watch (/path/to/compufacil/App/node_modules/jest-haste-map/build/index.js:654:44)
    at _buildPromise._buildFileMap.then.then.hasteMap (/path/to/compufacil/App/node_modules/jest-haste-map/build/index.js:250:21)
error Command failed with exit code 1.

```

you should follow this:


Run the below command to avoid ENOSPC:

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
For Arch Linux add this line to /etc/sysctl.d/99-sysctl.conf:

```bash
fs.inotify.max_user_watches=524288
```
Then execute:

```bash
sysctl --system
This will also persist across reboots.
```

To know more about this, follow [this thread](http://stackoverflow.com/questions/22475849/node-js-error-enospc)