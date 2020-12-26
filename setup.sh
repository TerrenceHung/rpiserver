curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $(whoami)
rm get-docker.sh

sudo apt install -y libffi-dev libssl-dev python3 python3-pip
sudo apt remove -y python-configparser
sudo pip3 install docker-compose

# install node stuff here
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt install -y nodejs

sudo apt install -y wmctrl steamlink xdotool

sudo ln -s $(pwd)/scripts /opt/scripts

sudo cp ./rpiserver.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now rpiserver
