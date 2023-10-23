#!/bin/bash

# npx supabase start | tee >(grep -e "API URL: " -e "anon key: " | sed "s/^.*: //" > .env)

echo "Starting supabase local development setup..."

output=$(npx supabase start)
url=$(echo "${output}" | grep -e "API URL: " | sed "s/^.*: //")
key=$(echo "${output}" | grep -e "anon key: " | sed "s/^.*: //")

echo -e "\nVITE_SUPABASE_URL=${url}" >> .env
echo -e "VITE_SUPABASE_ANON_KEY=${key}\n" >> .env