# Bastion

A human-curated information repository.

## Generating `history.txt`

- Open the Firefox history window.
- For each month of history, hit ctrl+A to select all, ctrl+C to copy
- Paste the data into a text file `raw-history.txt`.
- Run:

  ```bash
  cat raw-history.txt \
    | cut -d/ -f3 \
    | sed 's/^www\.//' \
    | sort \
    | uniq -c \
    | sort -nr \
    | awk '{print $2}' \
    > history.txt
  ```