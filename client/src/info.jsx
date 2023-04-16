function info() {

    return (
        <div className="container wallet info">
            <h1>Info</h1>
            Yo whassup G! Here are some adresses to play around with...
            <p>
                <label>
                    <strong>user1</strong><br />
                    <u><em>address:</em></u> 0x7f821592e9a54b8c641fb9e91a874efecd35e91c<br />
                    <u><em>private key:</em></u> 76b9986f010b50561ad800fcdd3d7905df053d31d15294c5985c4bf2b4862b55
                </label>
                <label>
                    <strong>user2</strong><br />
                    <u><em>address:</em></u> 0x4eb5e8bbdbf32d751f2119a0f0b0336088b0c6b0<br />
                    <u><em>private key:</em></u> ad4d73b98dfc3595f1ffb902d4fe1c726914465d7f2c61440c7f662ac31b3a00
                </label>
                <label>
                    <strong>user3</strong><br />
                    <u><em>address:</em></u> 0xd2380d73f40f282f6cff3f5e351ddd9db24306ef<br />
                    <u><em>private key:</em></u> 1480d2be8ba6f337eaf8cfed82fc98a8e8c4b90f4a9614400c1826841092bef8
                </label>
            </p>

            <h1>ECDSA project</h1>
            <div className="summary">
                Now what is going on here? What is up with the private key?
                Well let's awner that with another question, what if we did not have a private key!?
                If you could send out whatever is in your wallet just by using your address.. that would
                mean anyone who knows your address can transfer whatever is in your wallet to whomever!😱
                That would be chaotic.. funny even maybe but not secure in the slightest.
                <br /><br />
                That's why we 'Sign' transactions with our private key.
                Sinse no one else knows your private key👀 you thereby prove that YOU accept the transaction of currency to
                take place.<br />
                When using a wallet like Metamask or Coinbase that's what happens when you get those pop ups
                asking to confirm and you click confirm without reading. :3
                <br /><br />
                So how does this work? doesn't someone need to confirm the private key then? Therefore jeapordize the privacy of the private key!?
                Don't worry, i won't awnser that with another question. See this is where the magic of assymetric cryptography
                or 'public key cryptography' comes into play.
                Instead of passing your private key around all willy nilly.. you encrypt a transacion with your private key, creating a 'signature'.
                and from that 'signature' the transaction and your address *wich is public can be decrypted by the receiving party.
                Did you catch it yet? The only way that adress could be retrieved from that encrypted data is if it were signed with your private key.
                Again you are the only one that knows your private key!.. IT WAS YOU!! IT WAS YOU ALL ALONG!!!😱😱
                <br /><br />
                Now commonly in Web3 the encryption process is done with ECDSA aka Eliptic-Curve-Digital-Signature-Algorytm.
                And yes, it's as crazy and math heavy as it sounds! The gist of it is..<br />
                <ul>
                    <li>deterministic - X goes in and will always generate the same output. x = y</li>
                    <li>pseudorandom - Knowing x1 = y1 doesn't tell you anything about x2 = y2</li>
                    <li>one direction - You can tell what y is on behalf of x but it's near impossible to retrieve x from only knowing y</li>
                    <li>go fast - The computation is super fast!</li>
                    <li>no collision - Two different inputs can never generate the same output. x2 is never y1</li>
                </ul>
            </div>
        </div>
    );
}

export default info;