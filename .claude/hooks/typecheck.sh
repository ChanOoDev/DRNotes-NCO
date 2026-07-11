#!/usr/bin/env bash

if [ -f app/package.json ]; then
  cd app && npx tsc --noEmit 2>&1
fi

exit 0
