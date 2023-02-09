import Container from 'components/containers/Container';
import { useState } from 'react';
import { SPORT_TYPES, getSportType } from 'data/constants/sportConstants';
import { useWalletSelector } from 'contexts/WalletSelectorContext';
import { ADMIN } from 'data/constants/address';
import { DEFAULT_MAX_FEES, MINT_STORAGE_COST } from 'data/constants/gasFees';
import BigNumber from 'bignumber.js';

export default function Promotional(props) {

  const { selector, modal, accounts, accountId } = useWalletSelector();
  const [whitelistInfoNFL, setWhitelistInfoNFL] = useState(null);
  const [whitelistInfoNBA, setWhitelistInfoNBA] = useState(null);
  const [currentSport, setCurrentSport] = useState(null);
  const [detailsNFL, setDetailsNFL] = useState({
    description: '',
  });
  const [detailsNBA, setDetailsNBA] = useState({
    description: '',
  });

  async function execute_send_type_1_pack(selector, contract) {
    const transferArgs = Buffer.from(
      JSON.stringify({
        msg: 'Promotional pack',
        receiver_id:whitelistInfoNFL,
      })
    );
  
    const deposit = new BigNumber(MINT_STORAGE_COST).toFixed();
  
    const action_transfer_call = {
      type: 'FunctionCall',
      params: {
        methodName: 'send_type_1_pack',
        args: transferArgs,
        gas: DEFAULT_MAX_FEES,
        deposit: deposit,
      },
    };
  
    const wallet = await selector.wallet();
    // @ts-ignore:next-line;
    const tx = wallet.signAndSendTransactions({
      transactions: [
        {
          receiverId: contract,
          //@ts-ignore:next-line
          actions: [action_transfer_call],
        },
      ],
    });
  }

  const onChangeWhitelistNFL = (e) => {
    if (e.target.name === 'description') {
      if (e.target.value !== '') {
        const whitelistArray = e.target.value.split('\n').filter((n) => n);
        setWhitelistInfoNFL(whitelistArray);
        setDetailsNFL({
          ...detailsNFL,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setWhitelistInfoNFL(null);
        setDetailsNFL({
          ...detailsNFL,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const onChangeWhitelistNBA = (e) => {
    if (e.target.name === 'description') {
      if (e.target.value !== '') {
        const whitelistArray = e.target.value.split('\n').filter((n) => n);
        setWhitelistInfoNBA(whitelistArray);
        setDetailsNBA({
          ...detailsNBA,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.value.length === 0) {
        setWhitelistInfoNBA(null);
        setDetailsNBA({
          ...detailsNBA,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    execute_send_type_1_pack(selector, getSportType(currentSport).packPromoContract);
  };

  console.log(whitelistInfoNFL);
  console.log(whitelistInfoNBA);

  console.log(currentSport)

  return (
    <Container>
      <div className="flex flex-col w-1/2 ml-24 mt-24">
        <label className="font-monument" htmlFor="duration">
          WHITELIST FOOTBALL
        </label>
        <textarea
          className="border outline-none rounded-lg px-3 p-2"
          id="description"
          name="description"
          // type="text"
          placeholder="Enter accounts to whitelist. One account per line. Leave empty for no whitelist."
          onChange={(e) => onChangeWhitelistNFL(e)}
          value={detailsNFL.description}
          style={{
            minHeight: '120px',
          }}
        />
        <div className="  mt-6">
          <button
            className=" flex text-center justify-center items-center iphone5:w-64 bg-indigo-buttonblue font-montserrat text-indigo-white p-3 mb-4 md:mr-4 text-xs "
            onClick={(e) => {handleButtonClick(e), setCurrentSport('FOOTBALL')}}
            >
            Send
          </button>
        </div>
      </div>
      <div className="flex flex-col w-1/2 ml-24 mt-24">
        <label className="font-monument" htmlFor="duration">
          WHITELIST BASKETBALL
        </label>
        <textarea
          className="border outline-none rounded-lg px-3 p-2"
          id="description"
          name="description"
          // type="text"
          placeholder="Enter accounts to whitelist. One account per line. Leave empty for no whitelist."
          onChange={(e) => onChangeWhitelistNBA(e)}
          value={detailsNBA.description}
          style={{
            minHeight: '120px',
          }}
        />
        <div className="  mt-6">
          <button
            className=" flex text-center justify-center items-center iphone5:w-64 bg-indigo-buttonblue font-montserrat text-indigo-white p-3 mb-4 md:mr-4 text-xs "
              onClick={(e) => {handleButtonClick(e), setCurrentSport('BASKETBALL')}}
          >
            Send
          </button>
        </div>
      </div>
    </Container>
  );
}