#!/bin/bash

# Function to resize GIF to the nearest 100px width interval, with a maximum width of 500px
resize_gif() {
  input_path="$1"
  output_path="$2"

  echo "Processing $input_path..."

  # Get the original width of the GIF
  original_width=$(identify -format "%w" "$input_path" | head -n 1)
  if [ -z "$original_width" ] || ! [[ "$original_width" =~ ^[0-9]+$ ]]; then
    echo "Failed to get a valid width for $input_path"
    return 1
  fi

  echo "Original width: $original_width"

  # Calculate the nearest width interval of 100px, with a sanity check
  new_width=$(( (original_width + 50) / 100 * 100 ))
  max_width=500 # Set a reasonable maximum width to 500px
  new_width=$((new_width > max_width ? max_width : new_width))
  echo "Initial new width: $new_width"

  # Attempt to resize the GIF, reducing the width interval if an error occurs
  while [ $new_width -gt 0 ]; do
    echo "Trying to resize to width: $new_width"
    if convert "$input_path" -coalesce -resize "${new_width}x" -layers Optimize "$output_path"; then
      echo "Resized $input_path to $output_path with width $new_width"
      return 0
    else
      echo "Failed to resize $input_path to width $new_width, trying a smaller width"
      new_width=$((new_width - 100))
    fi
  done

  echo "Failed to resize $input_path, all width intervals exhausted"
  return 1
}

# Check for the -f option
if [ "$1" == "-f" ]; then
  echo "Processing all GIF files in the current directory..."
  # Loop through all GIF files in the current directory
  for input_gif in *.gif; do
    if [ -f "$input_gif" ]; then
      output_gif="resized_$input_gif"
      resize_gif "$input_gif" "$output_gif"
    else
      echo "No GIF files found in the current directory."
    fi
  done
else
  echo "Usage: $0 -f"
fi
