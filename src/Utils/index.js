export const formatEther = amount => {
  if(amount.includes(".")){
    amount = amount.split(".");
    amount = `${amount[0]}.${amount[1].slice(0, 3)}`;
  }

  return amount;
};

export const formatEtherAdmin = amount => parseInt(amount)/Math.pow(10, 18);