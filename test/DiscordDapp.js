const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("DiscorDapp", function () {
  let deployer, user

  let discordapp 
  const NAME = "DiscorDapp"
  const SYMBOL = "DD"

  this.beforeEach(async()=> {

     [deployer,user]=await ethers.getSigners()

       const DiscorDapp = await ethers.getContractFactory("DiscorDapp")
    
       discordapp = await DiscorDapp.deploy(NAME, SYMBOL)

       const transaction = await discordapp.connect(deployer).createChannel("general" , tokens(1))
       await transaction.wait()

  })

  describe("Deployment", function(){
    it("Sets the name ", async()=>{
      

      // Fetch name 
      let result = await discordapp.name()
      //Get name 
      expect(result).to.equal(NAME)

      
    })

    it("Sets the symbol", async()=>{
      

      //Fetch and get result
      let result = await discordapp.symbol()
      expect(result).to.equal(SYMBOL)
    })

    it("sets the owner", async()=>{

      const result = await discordapp.owner()
      expect(result).to.equal(deployer.address)

    })

    

  })

  describe ("creating Channels" , ()=>{

    it("returns the total channels", async()=>{
      const result = await discordapp.totalChannels()
      expect(result).to.equal(1)
    })

    it("Returns channels attributes", async()=>{
      const channel = await discordapp.getChannel(1)
      expect(channel.id).to.be.equal(1)
      expect(channel.name).to.be.equal("general")
      expect(channel.cost).to.be.equal(tokens(1))
    })
  })

  describe("Joining Channels", () => {
    const ID = 1
    const AMOUNT = ethers.utils.parseUnits("1", 'ether')

    beforeEach(async () => {
      const transaction = await discordapp.connect(user).mint(ID, { value: AMOUNT })
      await transaction.wait()
    })

    it('Joins the user', async () => {
      const result = await discordapp.hasJoined(ID, user.address)
      expect(result).to.be.equal(true)
    })

    it('Increases total supply', async () => {
      const result = await discordapp.totalSupply()
      expect(result).to.be.equal(ID)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(discordapp.address)
      expect(result).to.be.equal(AMOUNT)
    })
  })

  describe("Withdrawing", () => {
    const ID = 1
    const AMOUNT = ethers.utils.parseUnits("10", 'ether')
    let balanceBefore

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      let transaction = await discordapp.connect(user).mint(ID, { value: AMOUNT })
      await transaction.wait()

      transaction = await discordapp.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(discordapp.address)
      expect(result).to.equal(0)
    })
  })


})
