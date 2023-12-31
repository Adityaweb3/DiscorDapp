import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { io } from "socket.io-client"

// Components
import Navigation from './components/Navigation'
import Servers from './components/Servers'
import Channels from './components/Channels'
import Messages from './components/Messages'

// ABIs
import DiscorDapp from './abis/DiscorDapp.json'

// Config
import config from './config.json';

// Socket
const socket = io('ws://localhost:3030');

function App() {
  const [provider , setProvider] = useState(null)
  const [account , setAccount] = useState(null)
  const [discordapp , setDiscordapp] = useState(null)
  const [channels, setChannels] = useState([])
  const [currentChannel , setCurrentChannel] = useState(null)

  const loadBlockchainData = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()
    const discordapp = new ethers.Contract(config[network.chainId].DiscorDapp.address,DiscorDapp,provider)
    setDiscordapp(discordapp)
    const totalChannels = await discordapp.totalChannels()
    const channels = []

    for (var i = 1 ; i<= totalChannels ; i++){
      const channel = await discordapp.getChannel(i)
      channels.push(channel)
    }
    setChannels(channels)


    window.ethereum.on('accountsChanged', async () => {
      window.location.reload()
    })
    
  }

  useEffect(()=>{
    loadBlockchainData()
  })

  return (
    <div>
      <Navigation  account ={account} setAccount={setAccount} />
      
      

      <main>

        <Servers />
        <Channels  provider = {provider} account = {account} discordapp = {discordapp} channels={channels} currentChannel = {currentChannel} setCurrentChannel={setCurrentChannel}/>
        <Messages />

      </main>
    </div>
  );
}

export default App;
