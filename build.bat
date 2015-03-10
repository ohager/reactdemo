@echo off

echo JSX'ing the react components...
rd .jsx-cache /S /Q
rd ./js/views/components /S /Q
node ./node_modules/react-tools/bin/jsx ./jsx ./js/views/components --cache-dir ./.jsx-cache -x jsx

