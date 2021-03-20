import Altcoin from '../models/Altcoin'

import btc from '../images/btc.png'
import aave from '../images/aave.png'
import bat from '../images/bat.png'
import bnb from '../images/bnb.png'
import bch from '../images/bch.png'
import bsv from '../images/bsv.png'
import ada from '../images/ada.png'
import link from '../images/link.png'
import atom from '../images/atom.png'
import dai from '../images/dai.png'
import dash from '../images/dash.png'
import doge from '../images/doge.png'
import eth from '../images/eth.png'
import icx from '../images/icx.png'
import knc from '../images/knc.png'
import lsk from '../images/lsk.png'
import ltc from '../images/ltc.png'
import mkr from '../images/mkr.png'
import xmr from '../images/xmr.png'
import nano from '../images/nano.png'
import xem from '../images/xem.png'
import neo from '../images/neo.png'
import omg from '../images/omg.png'
import dot from '../images/dot.png'
import qtum from '../images/qtum.png'
import ren from '../images/ren.png'
import snt from '../images/snt.png'
import xlm from '../images/xlm.png'
import usdt from '../images/usdt.png'
import xtz from '../images/xtz.png'
import trx from '../images/trx.png'
import vet from '../images/vet.png'
import xrp from '../images/xrp.png'
import zec from '../images/zec.png'

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
    'Binance-Coin',
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
    'Kyber',
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
  new Altcoin('Neo', 'neo', 'AXo4SfXwkZNwLmp54hZScpvTNUqYDHLuKV', neo),
  new Altcoin('OMG', 'OMG', '0x3f7bC09733E74c471491c62328045D521CD994da', omg),
  new Altcoin(
    'Polkadot',
    'DOT',
    '13SZLBwyZJCiaeN2EVnr25Zb13y9VJcHCtVZdHcSZ8T3Rr79',
    dot
  ),
  new Altcoin('Qtum', 'QTUM', 'QicBA1fWmeAmcqne7VbtA6m5TCfkYLhZqq', qtum),
  new Altcoin('Ren', 'REN', '0x3f7bC09733E74c471491c62328045D521CD994da', ren),
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
    'Tether USD',
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
  new Altcoin('XRP', 'XRP', 'r3rKMMntN9We78ZmPyBso6MUJeRvWRHMxu', xrp),
  new Altcoin('Zcash', 'ZEC', 't1aHKAqbFzoBxghvR1eGJE4LiixRQAx9DgK', zec),
]
