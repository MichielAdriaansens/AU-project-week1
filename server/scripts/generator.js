const secp = require('ethereum-cryptography/secp256k1');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');

const private = secp.utils.randomPrivateKey();
console.log('private key: ', toHex(private));


const public = secp.getPublicKey(private);
console.log('public key: ', toHex(public));


const address = toHex(public.slice(-20));
console.log('address: ', address);