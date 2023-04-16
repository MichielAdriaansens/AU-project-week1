const users = require("./TestAdresses.json");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x7f821592e9a54b8c641fb9e91a874efecd35e91c": 100,
  "0x4eb5e8bbdbf32d751f2119a0f0b0336088b0c6b0": 50,
  "0xd2380d73f40f282f6cff3f5e351ddd9db24306ef": 75,
};

//when valid address in input
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;

  res.send({ balance });
});

//when transfer button is pressed 
app.post("/send", (req, res) => {

  const { sender, recipient, amount, msgHash, signature, recoveryBit } = req.body;

  //check if recipient is valid
  const verifyRecipient = recipient === "0x7f821592e9a54b8c641fb9e91a874efecd35e91c"
    || recipient === "0x4eb5e8bbdbf32d751f2119a0f0b0336088b0c6b0"
    || recipient === "0xd2380d73f40f282f6cff3f5e351ddd9db24306ef";

  if (!verifyRecipient) {
    res.status(400).send({ message: "invalid recipient adress! 🤦" });
  }

  //get signature
  const msg = new Uint8Array(Object.values(msgHash));
  const sign = new Uint8Array(Object.values(signature));

  //recover public key
  const recoveredPublicKey = secp.recoverPublicKey(msg, sign, recoveryBit);

  //verify signature
  const isVerified = secp.verify(sign, msg, recoveredPublicKey);
  if (!isVerified) {
    res.status(400).send({ message: "no bueno! verify failed" });
  }

  //public key should be sender
  const verifiedSender = `0x${toHex(recoveredPublicKey.slice(-20))}`;

  setInitialBalance(verifiedSender);
  setInitialBalance(recipient);

  if (balances[verifiedSender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[verifiedSender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[verifiedSender], debug: verifiedSender });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
