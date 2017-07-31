#!/bin/bash

echo "     ___  ________  _________  _______                                                         "
echo "    |\  \|\   ____\|\___   ___\\  ___ \                                                        "
echo "    \ \  \ \  \___|\|___ \  \_\ \   __/|                                                       "
echo "  __ \ \  \ \_____  \   \ \  \ \ \  \_|/__                                                     "
echo " |\  \\_\  \|____|\  \   \ \  \ \ \  \_|\ \                                                    "
echo " \ \________\____\_\  \   \ \__\ \ \_______\                                                   "
echo "  \|________|\_________\   \|__|  \|_______|                                                   "
echo "            \|_________|                                                                       "
echo "                                                                                               "
echo "                                                                                               "
echo "              _____ ______   ________  ________   ________  ________  _______   ________       "
echo "              |\   _ \  _   \|\   __  \|\   ___  \|\   __  \|\   ____\|\  ___ \ |\   __  \     "
echo "              \ \  \\\__\ \  \ \  \|\  \ \  \\ \  \ \  \|\  \ \  \___|\ \   __/|\ \  \|\  \    "
echo "               \ \  \\|__| \  \ \   __  \ \  \\ \  \ \   __  \ \  \  __\ \  \_|/_\ \   _  _\   "
echo "                \ \  \    \ \  \ \  \ \  \ \  \\ \  \ \  \ \  \ \  \|\  \ \  \_|\ \ \  \\  \|  "
echo "                 \ \__\    \ \__\ \__\ \__\ \__\\ \__\ \__\ \__\ \_______\ \_______\ \__\\ _\  "
echo "                  \|__|     \|__|\|__|\|__|\|__| \|__|\|__|\|__|\|_______|\|_______|\|__|\|__| "
echo "                                                                                               "

echo " Starting building Jste Manager "

dir=$(cd -P -- "$(dirname -- "$0")" && npm install && pkg .)

echo " Jste Manager has been built properly ;) "
