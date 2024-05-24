document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const signButton = document.getElementById('signButton');
    const walletAddressDisplay = document.getElementById('walletAddress');
    const signedMessageDisplay = document.getElementById('signedMessage');
    let web3;

    connectButton.addEventListener('click', async () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                walletAddressDisplay.innerText = `Connected wallet: ${accounts[0]}`;
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            console.error("MetaMask is not installed");
        }
    });

    signButton.addEventListener('click', async () => {
        const address = document.getElementById('inputAddress').value;
        const number = document.getElementById('inputNumber').value;
        
        if (web3 && address && number) {
            const accounts = await web3.eth.getAccounts();
            const message = `Address: ${address}, Number: ${number}`;
            
            try {
                const signedMessage = await web3.eth.personal.sign(message, accounts[0]);
                signedMessageDisplay.innerText = `Signed Message: ${signedMessage}`;
            } catch (error) {
                console.error("Error signing message", error);
            }
        } else {
            console.error("Web3 not initialized, address or number missing");
        }
    });
});
