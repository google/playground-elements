#!/usr/bin/env bash

# Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
# This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
# The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
# The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
# Code distributed by Google as part of the polymer project is also
# subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt

# cd to the repo root so that this script can be run from any cwd.
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${SCRIPT_DIR}/.."
REPO_ROOT="$(pwd)"

# Include the local repo path in the session name so that if somebody had
# multiple clones of the same repo, they would each have their own tmux session.
NAME="dev[$REPO_ROOT]"

# https://misc.flogisoft.com/bash/tip_colors_and_formatting
RESET="\e[0m"
BOLD="\e[1m"
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
REDBG="\e[41m"
MAGENTA="\e[95m"
WHITE="\e[97m"

echo -e "`cat <<EOF

This script will launch ${BOLD}tmux${RESET} to run the following
commands with layout:

  +---------------------------+
  +           wtr             |
  + ----+--------+------------+
  | tsc | rollup | dev-server |
  +-----+--------+------------+

=======================================

Using tmux session name:

  ${BOLD}${NAME}${RESET}

=======================================

Useful tmux commands:

  Detach ......... ${BOLD}${WHITE}Ctrl-b d${RESET}
  Kill ........... ${BOLD}${WHITE}Ctrl-b :kill-session <Enter>${RESET}
  Change pane .... ${BOLD}${WHITE}Ctrl-b <Arrow key>${RESET}
  Cycle layouts .. ${BOLD}${WHITE}Ctrl-b <Space>${RESET}
  Zoom pane ...... ${BOLD}${WHITE}Ctrl-b z${RESET}

To enable mouse pane selection and scrolling:

  echo "set -g mouse on" >> ~/.tmux.conf

See "man tmux" for more help

Cheat sheet: https://gist.github.com/michaellihs/b6d46fa460fa5e429ea7ee5ff8794b96

Note that after a tmux session starts, it will continue
indefinitely, even if you detach, until you kill it.

=======================================

EOF
`"

if ! command -v tmux &> /dev/null
then
  echo -e "`cat <<EOF

${REDBG}${WHITE}${BOLD}[ERROR] This script requires tmux, but tmux could not be found.${RESET}

Installation help:

  macOS (Homebrew): https://formulae.brew.sh/formula/tmux
  Linux:            https://github.com/tmux/tmux/wiki/Installing
  Source:           https://github.com/tmux/tmux#installation\n
EOF
`"
  exit 1
fi

tmux has-session -t "$NAME" &> /dev/null
HAS_SESSION_CODE=$?

if [ $HAS_SESSION_CODE -eq 0 ]
then
  echo -e "`cat <<EOF

Found existing session. Press a key to continue:

  [ ${BOLD}${GREEN}Enter${RESET} ]  Attach
  [   ${BOLD}${YELLOW}r${RESET}   ]  Restart and attach
  [   ${BOLD}${RED}k${RESET}   ]  Kill session and exit
  [   ${BOLD}${MAGENTA}x${RESET}   ]  Exit

EOF
`"

else
  echo -e "`cat <<EOF

No existing session found. Press a key to continue:

  [ ${BOLD}${GREEN}Enter${RESET} ] ... Start new session and attach
  [   ${BOLD}${MAGENTA}x${RESET}   ] ... Exit
EOF
`"
fi

function new_session {
  echo -e "\nCreating new tmux session "${NAME}""
  tmux new-session -s "$NAME" -d
  tmux send "npm run test:watch" C-m # 0
  tmux split-window
  tmux send "npm run build:tsc:watch" C-m # 1
  tmux split-window
  tmux send "npm run build:rollup:watch" C-m # 2
  tmux split-window
  tmux send "npm run serve" C-m # 3
  tmux select-layout main-horizontal
  # Select wtr by default since it's interactive.
  tmux select-pane -t 0
}

function attach_session {
  echo -e "\nAttaching to tmux session "${NAME}""
  tmux attach -t "$NAME"
}

function kill_session {
  echo -e "\nKilling tmux session "${NAME}""
  tmux kill-session -t "$NAME"
}

for (( ; ; ))
do
  read -rsn1

  if [[ $REPLY == x || $REPLY == X ]]; then
    exit
  elif [[ $REPLY == k || $REPLY == K ]]; then
    if [[ $HAS_SESSION_CODE -eq 0 ]]; then
      kill_session
    fi
    exit
  elif [[ $REPLY == r || $REPLY == R ]]; then
    if [[ $HAS_SESSION_CODE -eq 0 ]]; then
      kill_session
    fi
    new_session
    attach_session
  elif [[ $REPLY == "" ]]; then
    if [[ $HAS_SESSION_CODE -ne 0 ]]; then
      new_session
    fi
    attach_session
  else
    echo -e "\n${RED}${BOLD}[ERROR]${RESET} Unknown command: ${REPLY}"
    continue
  fi
  exit
done
