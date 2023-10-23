#!/bin/bash
# Start the local supabase development server
# Get the url and anon key from the CLI output
# Write those keys to the local .env file

echo "Starting supabase local development setup..."

output=$(npx supabase start)
url=$(echo "${output}" | grep -e "API URL: " | sed "s/^.*: //")
key=$(echo "${output}" | grep -e "anon key: " | sed "s/^.*: //")

echo -e "\nVITE_SUPABASE_URL=${url}" >> .env
echo -e "VITE_SUPABASE_ANON_KEY=${key}\n" >> .env
