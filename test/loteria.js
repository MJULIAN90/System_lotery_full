const { expect, assert } = require("chai");
const { utils } = require("ethers");
let hardhatLoteria;
let contract;
let owner;
let addr1;

beforeEach(async function () {
  contract = await ethers.getContractFactory("Loteria");
  [owner, addr1, addr2] = await ethers.getSigners();
  hardhatLoteria = await contract.deploy("Rocket", "RXC", 10000);
});

describe("amount tokens", () => {
  it("should to validate amount tokens in the contract", async () => {
    expect(await hardhatLoteria.balanceOf(hardhatLoteria.address)).to.equal(10000);
  })
})

describe("buying tokens", () => {
  it("returns the balance account 1 buying 5 tokens", async () => {
    let balanceInitial = await addr1.getBalance();
    await hardhatLoteria.connect(addr1).buyTokens(5, {value: utils.parseEther("5")});
    let balanceEnd = await addr1.getBalance();

    expect(await hardhatLoteria.balanceOf(addr1.address)).to.equal(5);
    expect(balanceInitial.toString()).not.equal(balanceEnd.toString());
  })

  it("returns an error", async() => {
    try{
      await hardhatLoteria.connect(addr1).buyTokens(11000, {value: utils.parseEther("1000")});
    }catch(err){
      assert.include(err.message, 'Compra menos tokens.')
    }
  })
})

describe("ether balance contract", () => {
  it("returns the balance of contract", async() => {
    await hardhatLoteria.buyTokens(5, {value: utils.parseEther("5")});
    let balance = await hardhatLoteria.etherBalanceContract();

    expect(balance.toString()).to.equal("5000000000000000000");
  })
})

describe("buy ticket", () => {
  it("return an error", async() => {
    try{
      await hardhatLoteria.connect(addr1).buyTicket(3)
    }catch(err){
      assert.include(err.message, 'No tienes los tokens suficientes para comprar los tickets deseados.')
    }
  })

  it("add tickets to user", async() => {
    await hardhatLoteria.connect(addr1).buyTokens(100, {value: utils.parseEther("100")});
    await hardhatLoteria.connect(addr1).buyTicket(10);
    await hardhatLoteria.connect(addr2).buyTokens(100, {value: utils.parseEther("100")});
    await hardhatLoteria.connect(addr2).buyTicket(7);

    let a = await hardhatLoteria.balanceOf(hardhatLoteria.address)
    let b = await hardhatLoteria.balanceOf(addr1.address)

    expect(await hardhatLoteria.seeUserTickets(addr1.address)).to.have.lengthOf(10);
    expect(await hardhatLoteria.seeUserTickets(addr2.address)).to.have.lengthOf(7);
  })
})

describe("winner lottery", () => {
  it("no participants in lottery", async() => {
    try {
      await hardhatLoteria.winnerLottery();
    } catch (error) {
      assert.include(error.message, "No hay personas participantes.");
    }
  })

  it("with participants in lottery", async() => {
    await hardhatLoteria.connect(addr1).buyTokens(100, {value: utils.parseEther("100")});
    await hardhatLoteria.connect(addr1).buyTicket(11);

    let data = await hardhatLoteria.winnerLottery();
    let result = await data.wait()
    let event = await result.events[0]
    let winner = await event.args
  
    expect(parseInt(winner[1])).that.is.a("number");
  })
})

describe("withdraw Money", () => {
  it("with suficient tokens", async() => {
    await hardhatLoteria.buyTokens(5, {value: utils.parseEther("10")});
    await hardhatLoteria.withdrawMoney(3);

    let tokens = await hardhatLoteria.balanceOf(hardhatLoteria.address);
    let ether = await hardhatLoteria.etherBalanceContract();

    expect(ether).to.equal("2000000000000000000");
    expect(parseInt(tokens)).to.equal(9998);
    expect(await owner.getBalance()).to.equal("9992970284235093575364");
  })

  it("with suficient tokens", async() => {
    await hardhatLoteria.buyTokens(5, {value: utils.parseEther("10")});
    try {
      await hardhatLoteria.withdrawMoney(6);
    } catch (error) {
      assert.include(error.message, "No posees los suficientes tokens");
    }
  })
})