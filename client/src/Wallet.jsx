import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils"

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const address = privateKey.length === 64 ? `0x${toHex(secp.getPublicKey(privateKey).slice(-20))}` : 0;
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <img className="logo" src="../public/alchemy_400x400.png" alt="" />
      <label>
        Private Key 🤑🤑🤑
        <input placeholder="Copy paste a Private key, see info section below" value={privateKey} onChange={onChange}></input>
      </label>

      <div>Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
