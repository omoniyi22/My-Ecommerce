import React, { useEffect } from 'react'
const nearAPI = require("near-api-js");



export default function Crypto_point() {


    const _instantiate_ = async function () {

        const { keyStores } = nearAPI;
        const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

        const { connect } = nearAPI;

        const connectionConfig = {
            networkId: "testnet",
            keyStore: myKeyStore, // first create a key store
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://testnet.mynearwallet.com/",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://testnet.nearblocks.io",
        };

        const nearConnection = await connect(connectionConfig);

        const appKeyPrefix = "your-app-key-prefix"; // Define your app key prefix here
        const walletConnection = new nearAPI.WalletConnection(nearConnection, appKeyPrefix);


        console.log({ nearConnection, walletConnection })
        // const walletConnection = new WalletConnection(nearConnection);
        walletConnection.requestSignIn({
            contractId: "zoo_memory_game_contract.testnet",
            methodNames: [], // optional
            successUrl: "http://localhost:3000", // optional redirect URL on success
            failureUrl: "http://localhost:3000/failed", // optional redirect URL on failure
        })
        // const walletConnection = new WalletConnection(nearConnection);

        if (walletConnection.isSignedIn()) {
            const walletAccountObj = walletConnection.account();
            const walletAccountId = walletConnection.getAccountId();
            console.log({ walletAccountId, walletAccountObj })
        }

    }

    useEffect(() => {

        _instantiate_()

        return () => {
            // second
        }
    }, [])



    return (
        <div>crypto_point</div>
    )
}
