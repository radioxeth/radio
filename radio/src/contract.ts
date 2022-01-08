import Web3 from "web3";
import RadioNFT from './RadioNFT.json'
const RADIO_CONTRACT_ADDRESS = "0x2A0F22C4282c71EB8A1FB93A6B32496c626d9422"

export const Radio = {
    web3Provider: null as any,
    accounts: [] as string[],
    contract: null as any,
    init: async function () {
        return await Radio.initWeb3();
    },

    initWeb3: async function () {
        try {
            const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8545');
            Radio.web3Provider = web3
            const accounts = await web3.eth.requestAccounts()
            Radio.accounts = accounts
            await Radio.initRadioContract(RADIO_CONTRACT_ADDRESS)
        } catch (e) {
            console.log(e)
            console.error("User denied account access");
        }
    },
    initRadioContract: async (contractAddress: string) => {
        try {
            const contract = await new Radio.web3Provider.eth.Contract(RadioNFT.abi as any, contractAddress);
            Radio.contract = contract
        } catch (e) {
            console.log(e)
        }

    }

};