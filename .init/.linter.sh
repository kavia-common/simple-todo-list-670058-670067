#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-todo-list-670058-670067/react_js_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

