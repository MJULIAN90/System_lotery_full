// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

//import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ERC20.sol";
// import "hardhat/console.sol";

// loteriaRocket, LR, 10000
contract Loteria {
    //Direcciones
    address public owner;
    uint256 public randNonce = 0;
    ERC20 private token;
    uint256 public ticketWinner;

    constructor(
        string memory name,
        string memory symbol,
        uint256 amountSupply
    ) {
        owner = msg.sender;
        token = new ERC20(name, symbol);
        token.mint(amountSupply);
    }

    //Events
    event congratulationWinnerEvent(string, uint256);
    event buyTokensEvent(string, uint256, string);
    event buyTicketsEvent(string, uint256, string);
    event withdrawMoneyEvent(string, uint256, string);

    //Modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "No posees permisos para esta operacion");
        _;
    }

    //Mapping para identificar la direccion con los boletos comprados
    mapping(address => uint256[]) private userTickets;
    mapping(uint256 => address) private participies;
    uint256[] ticketsTotal;

    function priceTokens(uint256 _numTokens) internal pure returns (uint256) {
        //Conversion my token a ethers 1 a 1
        return _numTokens * (1 ether);
    }

    function buyTokens(uint256 _numTokens) public payable {
        require(
            token.balanceOf(address(this)) >= _numTokens,
            "Compra menos tokens."
        );
        uint256 cost = priceTokens(_numTokens);
        require(
            msg.value >= cost,
            "Necesitas mas ethers para comprar la cantidad de tokens deseada."
        );
        uint256 returnValue = msg.value - cost;

        payable(msg.sender).transfer(returnValue);
        token.transfer(msg.sender, _numTokens);
        emit buyTokensEvent("Has comprado ", _numTokens, "tokens");
    }

    function seeUserTickets(address account)
        public
        view
        returns (uint256[] memory)
    {
        return userTickets[account];
    }

    function buyTicket(uint256 quantityTickets) public {
        uint256 price = quantityTickets * 1;
        require(
            balanceOf(msg.sender) >= price,
            "No tienes los tokens suficientes para comprar los tickets deseados."
        );
        token.transferTokenLottery(msg.sender, owner, price);

        for (uint256 i = 0; i < quantityTickets; i++) {
            uint256 numberTicket = uint256(
                keccak256(abi.encodePacked(msg.sender, randNonce, block.timestamp))
            ) % 10000;
            userTickets[msg.sender].push(numberTicket);
            participies[numberTicket] = msg.sender;
            ticketsTotal.push(numberTicket);
            randNonce++;
        }

        emit buyTicketsEvent("Has comprado ", quantityTickets, "tickets");
    }

    receive() external payable {}
    fallback() external payable {}

    function etherBalanceContract()
        public
        view
        onlyOwner
        returns (uint256)
    {
        return address(this).balance;
    }

    function balanceOf(address account) public view returns (uint256) {
        return token.balanceOf(account);
    }

    function winnerLottery() public onlyOwner {
        require(ticketsTotal.length > 0, "No hay personas participantes.");

        uint256 positionWinner = uint256(
            uint256(keccak256(abi.encodePacked(block.timestamp))) %
                ticketsTotal.length
        );
        uint ticketwinner = uint(ticketsTotal[positionWinner]);
        address winner = participies[ticketwinner];
        //saldo premio
        uint256 award = balanceOf(owner);
        

        //cargamos premio al ganador
        token.transferTokenLottery(owner, winner, award);
        //guardamos el ganador
        ticketWinner = ticketwinner;

        emit congratulationWinnerEvent("felicidades al ganador", ticketwinner);
    }

    function withdrawMoney(uint256 amount) public payable {
        require(
            balanceOf(msg.sender) >= amount,
            "No posees los suficientes tokens"
        );

        token.transferTokenLottery(msg.sender, address(this), amount);
        payable(msg.sender).transfer(priceTokens(amount));

        emit withdrawMoneyEvent(
            "La cuenta ha retirado ",
            amount,
            "ETH"
        );
    }
}
