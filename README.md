# Eth Photo

## Team 10

Decentralized Photo Sharing using The Ethereum based Blockchain Platform


Required packages to build and run the software
-------------------------------------
* ethereum (geth)
* nodejs
* npm
* embark
* go-ipfs
* mist browser
* ntp


Platform
--------

We have built and tested the software on Ubuntu 14.04 LTS on x64 architecture.


Setup Instructions and Installation
-----------------------------------

0. Install all the dependencies using

	bash install.sh

1. Run

		nohup ipfs daemon &

in the terminal. `nohup` and `&` enables us to work on the same terminal and put the process in the background.

2. Run

		ipfs swarm connect /ip4/<ip>/tcp/4001/ipfs/<ipfshash>

3. Include this in your `genesis.json` file for each. All nodes *should* have the same genesis block.

		{
		    "nonce": "0x0000000000000042",
		    "difficulty": "0x40000",
		    "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
		    "coinbase": "0x0000000000000000000000000000000000000000",
		    "timestamp": "0x00",
		    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
		    "extraData": "0x",
		    "gasLimit": "0x4c4b40"
		}


4. Run

		$ geth --identity ”Sukhi” --rpc --rpcport ”8001” --rpccorsdomain ”*”
		--rpcaddr ”0.0.0.0” --datadir ”./node0” --port ”30301” --ipcapi ”ad-
		min,db,eth,debug,miner,net,shh,txpool,personal,web3” --rpcapi ”db,eth,net,web3”
		--autodag --networkid 1900 --nat ”any” init genesis.json

5. Run

		$ geth --identity ”Sukhi” --rpc --rpcport ”8001” --rpccorsdomain ”*”
		--rpcaddr ”0.0.0.0” --datadir ”./node0” --port ”30301” --ipcapi ”ad-
		min,db,eth,debug,miner,net,shh,txpool,personal,web3” --rpcapi ”db,eth,net,web3”
		--autodag --networkid 1900 --nat ”any” console on geth command line

6. Run `admin.addPeer("enode://<enodehash>@<ip>:30301")`

7. Make an account in geth by executing personal.newAccount("password")

8. Now set networkx proxy (http and https) to `http://<ip>:1337`

9. Mine the node. Run `miner.start()`

10. Type `admin.addPeers` on geth command line

11. Run

		$ mist –rpc node0/geth.ipc

in another terminal and open `http://<ip>:8000` in address bar.


Start up MIST browser as follows:

    mist --rpc geth.ipc
