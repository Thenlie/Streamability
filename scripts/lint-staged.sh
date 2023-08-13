#!/bin/bash
# Run es-lint on staged files with the fix flag

echo "--- Running ES-Lint ---"
passing=true
while read filename; do
    if [[ "$filename" =~ \.ts$ || "$filename" =~ \.tsx ]]; then
        npx eslint $filename --fix
        if [[ "$?" == 0 ]]; then
            git add $filename
            printf "\033[32m✅ ESLint Passed for $filename\033[0m\n"
        else
            printf "\033[41m❌ ESLint Failed for $filename\033[0m\n"
            passing=false
        fi
    fi
done < <(git diff --cached --name-only --diff-filter=ACMR )
if [[ "$passing" == false ]] ; then
    exit 1
fi
exit 0
