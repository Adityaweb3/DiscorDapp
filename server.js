const express = require('express')
const app = express()

const PORT = process.env.PORT || 3030
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))

const messages = [
  {
    channel: "1",
    account: "0xfD2b04Ea727f090DDaf6Bb7fB53b2a95F5f0A569",
    text: "Welcome to DiscorDApp!"
  },
  {
    channel: "2",
    account: "0xfD2b04Ea727f090DDaf6Bb7fB53b2a95F5f0A569",
    text: "Welcome to DiscorDapp , I am Aditya with 2 years of experience in web3 space ."
  },
  {
    channel: "1",
    account: "0xfaDb5Ab2c7B365F8Faa17FC9Ff9DcF558cAcd96a",
    text: "Hola !"
  },
  {
    channel: "2",
    account: "0xfaDb5Ab2c7B365F8Faa17FC9Ff9DcF558cAcd96a",
    text: "Hi everyone I am Snoop looking forward to learn web3 !"
  },
  {
    channel: "1",
    account: "0x701C484bfb40ac628aFA487b6082f084B14AF0BD",
    text: "Less gooo! "
  },
  {
    channel: "1",
    account: "0x189B9cBd4AfF470aF2C0102f365FC1823d857965",
    text: "Wagmi !"
  },
  {
    channel: "1",
    account: "0x176F3DAb24a159341c0509bB36B833E7fdd0b322",
    text: "GM Everyone"
  },
  {
    channel: "1",
    account: "0x828103B231B39ffFCe028562412B3c04A4640d26",
    text: "Hello!"
  },
  {
    channel: "1",
    account: "0xe13de9c6CE75febcfBf914511C7b5D948734F26C",
    text: "Gm frens just got accepted for ETHIndia .."
  },
]

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('get messages', () => {
    io.emit('get messages', messages)
  })

  socket.on('new message', (msg) => {
    messages.push(msg)
    io.emit('new message', messages)
  })
})