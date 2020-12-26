echo Installing Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $(whoami)
rm get-docker.sh

echo Installing Docker Compose
sudo apt install -y libffi-dev libssl-dev python3 python3-pip
sudo apt remove -y python-configparser
sudo pip3 install docker-compose

echo Installing Node
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt install -y nodejs

echo Installing Node dependencies
npm install

echo Installing dependencies for Steam Link script
sudo apt install -y wmctrl steamlink xdotool

echo Linking current directory to /opt
sudo ln -s $(pwd) /opt/rpiserver

echo Setting up rpiserver service
sudo cp ./rpiserver.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now rpiserver

echo Please log out, log back in, and run docker-compose up -d in this directory
