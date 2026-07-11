#!/usr/bin/env bash

if [ -f app/package.json ] && [ -f app/eslint.config.mjs ]; then
  cd app && npx eslint src/ 2>&1
fi

exit 0
