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

})
