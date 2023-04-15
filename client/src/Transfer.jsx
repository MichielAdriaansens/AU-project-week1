import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils'

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {

      const tx = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      }

      //hashing transaction data and create a signature
      const msgHash = keccak256(utf8ToBytes(JSON.stringify(tx)));
      const [signature, recoveryBit] = await secp.sign(msgHash, privateKey, { recovered: true });

      //passing data on to server side
      const {
        data: { balance, debug },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        msgHash,
        signature,
        recoveryBit
      });

      console.log('server side:', debug);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
