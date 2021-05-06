import Altcoin from '../models/Altcoin'
// import firebase from 'firebase'

const btc = 'https://powershotz.com/qr/btc.png'
const aave = 'https://powershotz.com/qr/aave.png'
const bat = 'https://powershotz.com/qr/bat.png'
const bnb = 'https://powershotz.com/qr/bnb.png'
const bch = 'https://powershotz.com/qr/bch.png'
const btg = 'https://powershotz.com/qr/btg.png'
const bsv = 'https://powershotz.com/qr/bsv.png'
const ada = 'https://powershotz.com/qr/ada.png'
const link = 'https://powershotz.com/qr/link.png'
const atom = 'https://powershotz.com/qr/atom.png'
const dai = 'https://powershotz.com/qr/dai.png'
const dash = 'https://powershotz.com/qr/dash.png'
const doge = 'https://powershotz.com/qr/doge.png'
const eth = 'https://powershotz.com/qr/eth.png'
const icx = 'https://powershotz.com/qr/icx.png'
const knc = 'https://powershotz.com/qr/knc.png'
const lsk = 'https://powershotz.com/qr/lsk.png'
const ltc = 'https://powershotz.com/qr/ltc.png'
const mkr = 'https://powershotz.com/qr/mkr.png'
const xmr = 'https://powershotz.com/qr/xmr.png'
const nano = 'https://powershotz.com/qr/nano.png'
const xem = 'https://powershotz.com/qr/xem.png'
const neo = 'https://powershotz.com/qr/neo.png'
const omg = 'https://powershotz.com/qr/omg.png'
const dot = 'https://powershotz.com/qr/dot.png'
const qtum = 'https://powershotz.com/qr/qtum.png'
const ren = 'https://powershotz.com/qr/ren.png'
const snt = 'https://powershotz.com/qr/snt.png'
const xlm = 'https://powershotz.com/qr/xlm.png'
const usdt = 'https://powershotz.com/qr/usdt.png'
const xtz = 'https://powershotz.com/qr/xtz.png'
const trx = 'https://powershotz.com/qr/trx.png'
const vet = 'https://powershotz.com/qr/vet.png'
const xrp = 'https://powershotz.com/qr/xrp.png'
const zec = 'https://powershotz.com/qr/zec.png'
const zelle = 'https://powershotz.com/qr/zelle.png'
const cashApp = 'https://powershotz.com/qr/cashApp.png'

// coinName, coinAbbr, address, qrImg

export const ALTCOINS = [
  new Altcoin(
    'Bitcoin',
    'BTC',
    'bc1qccj5zxshpg6ck8pffw3pjaq8us47zru26tkc57',
    btc
  ),
  new Altcoin(
    'Aave',
    'AAVE',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    aave
  ),
  new Altcoin(
    'Basic-Attention-Token',
    'BAT',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    bat
  ),
  new Altcoin(
    'BinanceCoin',
    'BNB',
    'bnb1da3jfj09slwdfygzts60ljxa2d76v7cq4tkkjd',
    bnb
  ),
  new Altcoin(
    'Bitcoin-Cash',
    'BCH',
    'qrxrrqw6x8hz4ukv4ngjfjcmxc2spcllssuq9gt62j',
    bch
  ),
  new Altcoin('Bitcoin-Gold', 'BTG', 'GNc83NEcWDoHY1NWXSfabMvJMxa3cBMARw', btg),
  new Altcoin(
    'Bitcoin-Cash-SV',
    'BSV',
    '1LxweJS3CuhqnXR5Wt9C6BwmQtTwyWDM5Y',
    bsv
  ),
  new Altcoin(
    'Cardano',
    'ADA',
    'addr1q95funmpvjnpq9xyv3gmgzuvlg92pnyn7p07mz2uaxuefxmgne8kze9xzq2vgez3ks9ce7s25rxf8uzlaky4e6dejjdsun3p7t',
    ada
  ),
  new Altcoin('Cash App', 'USD', '$Powershotz', cashApp),
  new Altcoin(
    'Chainlink',
    'LINK',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    link
  ),
  new Altcoin(
    'Cosmos',
    'ATOM',
    'cosmos1m3y5swtrvshp5nf4k0d0qr0msc6q90nlfzspnz',
    atom
  ),
  new Altcoin('DAI', 'DAI', '0x3f7bC09733E74c471491c62328045D521CD994da', dai),
  new Altcoin('Dash', 'DASH', 'XyD6jERA13AuMPmXj4SnNVjuUXkZxYi9gm', dash),
  new Altcoin('Dogecoin', 'DOGE', 'DGwcEB2kZxKLwYH7VUKxyyNHStZMcH5b4L', doge),
  new Altcoin(
    'Ethereum',
    'ETH',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    eth
  ),
  new Altcoin('ICON', 'ICX', 'hx97544e74ec0678f916eee73ed64e20ca282de3e9', icx),
  new Altcoin(
    'Kyber-Network',
    'KNC',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    knc
  ),
  new Altcoin('Lisk', 'LSK', '10196460184089174085L', lsk),
  new Altcoin('Litecoin', 'LTC', 'LNGWBEA8zBRsPZWddYCcwzuA94V7ZUNgdL', ltc),
  new Altcoin(
    'Maker',
    'MKR',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    mkr
  ),
  new Altcoin(
    'Monero',
    'XMR',
    '45ecCKa5pPm11mBCrZ6tbS53bpouLFD66QABrQtcxxYmaeYbX6Ui2c4F5WPKD5xTyU71x4rzzvKVfGSgxDKq6N2wCGNGP2G',
    xmr
  ),
  new Altcoin(
    'Nano',
    'NANO',
    'nano_3dhmzj3ofhsk9ukwfsemezn4pm68gychort3mcyep6czaxepm6xfbhjiox1f',
    nano
  ),
  new Altcoin('NEM', 'XEM', 'NDZU5EH2NB3WXMM3LZIDFXEYGNYDM3FCOTKRSJLE', xem),
  new Altcoin('Neo', 'NEO', 'AXo4SfXwkZNwLmp54hZScpvTNUqYDHLuKV', neo),
  new Altcoin(
    'Omisego',
    'OMG',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    omg
  ),
  new Altcoin(
    'Polkadot',
    'DOT',
    '13SZLBwyZJCiaeN2EVnr25Zb13y9VJcHCtVZdHcSZ8T3Rr79',
    dot
  ),
  new Altcoin('Qtum', 'QTUM', 'QicBA1fWmeAmcqne7VbtA6m5TCfkYLhZqq', qtum),
  new Altcoin(
    'Republic-Protocol',
    'REN',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    ren
  ),
  new Altcoin('Ripple', 'XRP', 'r3rKMMntN9We78ZmPyBso6MUJeRvWRHMxu', xrp),
  new Altcoin(
    'Status',
    'SNT',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    snt
  ),
  new Altcoin(
    'Stellar',
    'XLM',
    'GCEFLGC4XPIAJTRD7GMPVNY7HQBR7AQQI2JV66ELOIX5EBYNRPKU7K77',
    xlm
  ),
  new Altcoin(
    'Tether',
    'USDT',
    '0x3f7bC09733E74c471491c62328045D521CD994da',
    usdt
  ),
  new Altcoin('Tezos', 'XTZ', 'tz1PD9FUQGsTkbFX9AZbsovzG2bLhLfidiu4', xtz),
  new Altcoin('Tron', 'TRX', 'TCjvbvA269aj9q14nfRwvzgx472Yu8daw8', trx),
  new Altcoin(
    'VeChain',
    'VET',
    '0xb156c973476633e2Eb6634b65df2c2ca26f0ec90',
    vet
  ),
  new Altcoin('Zcash', 'ZEC', 't1aHKAqbFzoBxghvR1eGJE4LiixRQAx9DgK', zec),
  new Altcoin('Zelle', 'USD', 'alexandra@powershotz.com', zelle),
]

// coinName, coinAbbr, address, qrImg

export const SelectCoin = ALTCOINS.map((item) => {
  return { value: item, label: `${item.coinName} (${item.coinAbbr})` }
})

// export const fetchCoins = () => {
//   const allCoins = []
//   firebase
//     .database()
//     .ref()
//     .child('altcoin')
//     .get()
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const resData = snapshot.val()
//         console.log(resData)
//         for (const key in resData) {
//           console.log(resData)
//           allCoins.push(
//             new Altcoin(
//               resData[key],
//               resData[key].value,
//               resData[key].address,
//               resData[key].image
//             )
//           )
//         }
//       } else {
//         console.log('Cannot load altcoins')
//       }
//     })
//     .catch((e) => {
//       console.log('Error loading altcoins', e.message)
//     })
//   return allCoins
// }
