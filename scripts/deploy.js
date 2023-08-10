const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {

  const [deployer] = await ethers.getSigners()
  const NAME = "DiscorDapp"
  const SYMBOL = "DD"

  const DiscorDapp = await ethers.getContractFactory("DiscorDapp")
  const discordapp= await DiscorDapp.deploy(NAME, SYMBOL)
  await discordapp.deployed()

  console.log(`Deployed Dappcord Contract at: ${discordapp.address}\n`)


  const CHANNEL_NAMES = ["general", "introuction", "jobs"]
  const COSTS = [tokens(1), tokens(0), tokens(0.25)]

  for (var i = 0; i < 3; i++) {
    const transaction = await discordapp.connect(deployer).createChannel(CHANNEL_NAMES[i], COSTS[i])
    await transaction.wait()

    console.log(`Created text channel #${CHANNEL_NAMES[i]}`)

}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});