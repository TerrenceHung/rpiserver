export DISPLAY=:0
if wmctrl -l | grep SteamLink > /dev/null
then
    echo Switching to Steam Link window
    wmctrl -a SteamLink
else
    echo Starting Steam Link
    steamlink > /dev/null 2>&1 &
    sleep 7
fi

xdotool mousemove 349 367 click 1
