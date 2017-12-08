# Moving to a temporary directory...
cd `mktemp -d`

printf "\n Setting proxy...\n"
export http_proxy=http://10.3.100.207:8080
export https_proxy=http://10.3.100.207:8080

printf "\n Updating the apt-get repositories. Please provide permissions...\n"
sudo add-apt-repository universe
sudo apt-get install build-essential
sudo -E apt-get update

if command -v geth 1>/dev/null 2>/dev/null; then
	printf "\n ethereum already installed. \n"
else
	printf "\n Installing ethereum...\n"
	sudo -E apt-get install -y software-properties-common
	sudo -E add-apt-repository -y ppa:ethereum/ethereum
	sudo -E apt-get update
	sudo -E apt-get install -y ethereum
fi

if command -v nodejs 1>/dev/null 2>/dev/null; then
	printf "\n nodejs already installed\n"
else
	printf "\n Installing nodejs...\n"
	sudo -E apt-get install -y nodejs
fi

if command -v node 1>/dev/null 2>/dev/null; then
	printf "\n node already installed\n"
else
	printf "\n Installing node...\n"
	sudo -E apt-get install -y nodejs-legacy  # Required on some versions
fi

if command -v npm 1>/dev/null 2>/dev/null; then
	printf "\n npm already installed\n"
else
	printf "\n Installing npm...\n"
	sudo -E apt-get install -y npm
fi

printf "\n Configuring proxy for npm\n"
sudo npm config set http-proxy http://10.3.100.207:8080
sudo npm config set https-proxy http://10.3.100.207:8080

if command -v embark 1>/dev/null 2>/dev/null; then
	printf "\n embark already installed\n"
else
	printf "\n Installing embark...\n"
	sudo -E npm install -g embark
fi

#printf "\nInstalling test-rpc...\n"
#sudo -E npm install -g ethereumjs-testrpc@2.0.9

# https://ipfs.io/docs/install/

if command -v ipfs 1>/dev/null 2>/dev/null; then
	printf "\n ipfs already installed....\n"
else
	printf "\n Installing IPFS...\n"
	wget https://dist.ipfs.io/go-ipfs/v0.4.7/go-ipfs_v0.4.7_linux-amd64.tar.gz
	tar xvfz go-ipfs_v0.4.7_linux-amd64.tar.gz
	sudo mv go-ipfs/ipfs /usr/local/bin/ipfs
fi

# https://github.com/iurimatias/embark-framework/wiki/Install-on-Linux
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[\"true\"]"
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "[\"PUT\", \"POST\", \"GET\"]"

if command -v mist 1>/dev/null 2>/dev/null; then
	printf "\n Mist browser already installed\n"
else
	printf "\n Installing mist browser...\n"
	# https://github.com/ethereum/mist/releases
	wget https://github.com/ethereum/mist/releases/download/v0.8.9/Mist-linux64-0-8-9.deb
	sudo dpkg -i Mist-*.deb
fi

if command -v ntpd 1>/dev/null 2>/dev/null; then
	printf "\n ntp already installed...\n"
else
	printf "\n Installing ntp...\n"
	sudo apt-get install ntp
fi

# Moving back to last directory
cd -
