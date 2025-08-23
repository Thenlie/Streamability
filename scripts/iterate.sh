#!/bin/bash

# Simple script to run a unit test multiple times
# Useful for debugging flaky tests
# Usage: ./iterate.sh 10 "path/to/testFile.test.js"

TIMES=$1
TEST_FILE=$2

for i in $(seq 1 $TIMES)
do
  echo "Run #$i"
  npm run test -- $TEST_FILE
  if [ $? -ne 0 ]; then
    echo "❌ Test failed on run #$i"
    exit 1
  fi
done

echo "✅ All $TIMES test runs passed."