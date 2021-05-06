import React from 'react'
// https://github.com/farbodsalimi/react-light-accordion
import { Accordion, AccordionItem } from 'react-light-accordion'
import 'react-light-accordion/demo/css/index.css'
import '../../css/faqs.css'
import { Link } from 'react-router-dom'
import newTabBlue from '../../images/newTabBlue.png'

export default function Faqs() {
  return (
    <div className="faqs">
      <header>
        <h1>FAQs</h1>
      </header>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Accordion atomic={true}>
          <AccordionItem title="Are Powershotz videos available anywhere else?">
            <p>
              Powershotz videos, clips, and photo sets are ONLY available for
              sale on this website.
            </p>
            <p>
              If you find our videos elsewhere, they are stolen, illegal, and
              are probably low quality.
            </p>
          </AccordionItem>

          <AccordionItem title="What is the Powershotz Onion?">
            <p>
              <a href="hhttp://gug57oxjp5pvsjwfqurtutlv23sym2idlq5ywxfczmow6brjktb6tcad.onion/">
                Powershotz Onion
              </a>{' '}
              is a hidden service available only on the TOR (The Onion Router)
              network. If you try to access it using a normal browser, you'll
              get a 404 error (not found).
            </p>
            <p>
              We{' '}
              <em>
                <b>strongly</b>
              </em>{' '}
              advise doing some research before trying to access any hidden
              service or installing the Tor Browser.
            </p>
            <p>
              More information about the Tor Browser can be found at{' '}
              <a
                href="https://www.torproject.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                torproject.org
                <img
                  src={newTabBlue}
                  style={{
                    opacity: '0.8',
                    width: '10px',
                    marginLeft: '3px',
                  }}
                  alt="tor"
                />
              </a>
              .
            </p>
          </AccordionItem>

          <AccordionItem title="How do I order and pay?">
            <p>It's Easy!</p>
            <p>
              <b>Downloads:</b>
            </p>
            <ol>
              <li>
                Click on any "ADD TO CART" button located by the{' '}
                <Link to="/videos">video</Link> or{' '}
                <Link to="/photos">photo set</Link> that you want
              </li>
              <li>
                Go to the <Link to="/cart">shopping cart</Link>
              </li>
              <li>Pay with Bitcoin or Altcoins.</li>
              <li>Check your email for download links.</li>
            </ol>
            <p>
              <b>How else can I pay?</b>
            </p>
            <ol>
              <li>
                Zelle, Cash app, cash, check, money order, or gold &#128521;
              </li>
              <li>
                <Link to="/contact">Contact me</Link>
              </li>
            </ol>
            <p>
              <b>DVD Orders:</b>
            </p>
            <ol>
              <li>
                Go to the <Link to="/dvd">DVD order form</Link> and follow the
                instructions.
              </li>
            </ol>
          </AccordionItem>

          <AccordionItem title="Do you accept other altcoins?">
            <p>
              Besides Bitcoin (BTC), we accept 34 different altcoins. Just let
              us know if there is another currency you'd like to use. Please{' '}
              <Link to="/contact">contact us</Link> and we'll try to accommodate
              your payment method.
            </p>
          </AccordionItem>

          <AccordionItem title="How do I download or stream my purchases?">
            <p>
              <b>DOWNLOAD INSTRUCTIONS:</b>
            </p>
            <ol>
              <li>
                Click on a link in your email from alexandra@powershotz.com
              </li>
              <li>Download and save the file somewhere on your computer</li>
            </ol>
            <p>
              <b>STREAMING INSTRUCTIONS:</b>
            </p>
            <ol>
              <li>
                Click on a link in your email from alexandra@powershotz.com
              </li>
              <li>
                If the video is available to stream, click on{' '}
                <b>
                  "
                  <img
                    src={newTabBlue}
                    alt=""
                    style={{
                      width: '11px',
                      marginRight: '3px',
                    }}
                  />
                  Open"
                </b>
              </li>
            </ol>
          </AccordionItem>

          <AccordionItem title="Why does my download keep failing?">
            <p>Don't worry... We GUARANTEE that you will get your video!</p>
            <p>
              We will work with you to makes sure that you get your video as
              quickly and easily as possible.
            </p>
            <ol>
              <li>
                Some browsers will pause or fail a download in the event of a
                service interruption. Even a disconnection lasting a fraction of
                a second can cause the failure of a file download.
              </li>
              <li>
                If your connection is slow, or the server from where the file is
                being downloaded is overloaded, it can cause the download to
                fail or time out.
              </li>
            </ol>
            <p>What should you do about it?</p>
            <ol>
              <li>Only download one video at a time.</li>
              <li>If available, press the 'resume' button.</li>
              <li>Download large files during off-peak hours.</li>
              <li>Try using a different web browser.</li>
              <li>Try using a cloud service like Dropbox.</li>
              <li>Clear your browsing data.</li>
              <li>
                Check to see if your are running the latest version of your
                browser.
              </li>
              <li>
                Inside the browser settings, select Advanced Settings, increase
                the connection timeout option to 60 seconds, and then save your
                settings.
              </li>
              <li>
                If the option to open file is available, open it. Try
                right-clicking the video and select Save As.
              </li>
              <li>
                If nothing works, please{' '}
                <Link to="/contact">use this link to contact us</Link> or send
                an email to{' '}
                <a href="mailto:alexandra@powershotz.com">
                  alexandra@powershotz.com
                </a>
              </li>
            </ol>
          </AccordionItem>

          <AccordionItem title="Why haven't I received my download links?">
            <p>
              There may be a few reasons why you haven't received your download
              links.
            </p>
            <ol>
              <li>The email went to your junk or spam folder.</li>
              <li>Your payment timed out.</li>
              <ul>
                <li>
                  Most of the time, payments will confirm within 10 minutes. But
                  sometimes the blockchain can be slow and it could take hours
                  for a payment to confirm.
                </li>
                <li>
                  If you've paid and the transaction times out, DON'T WORRY!{' '}
                  <strong>Your payment won't be lost.</strong> It will be
                  returned to your wallet.
                </li>
              </ul>
            </ol>
            <p>
              If you need more information about your payment status, please{' '}
              <Link to="/contact">use this link to contact us</Link> or send an
              email to{' '}
              <a href="mailto:alexandra@powershotz.com">
                alexandra@powershotz.com
              </a>
            </p>
          </AccordionItem>

          <AccordionItem title="I've lost my file or it has become corrupted!">
            <p>
              We have a 90-day replacement policy on all downloadable orders.
            </p>
          </AccordionItem>

          <AccordionItem title="How do I buy DVDs?">
            <p>
              To purchase a collection of exciting Bondage, BDSM, Damsel in
              Distress, Strugglefuck, and Master/slave fantasy full-length
              videos in DVD format, go to the{' '}
              <Link to="/dvd">DVD order form</Link> and follow the instructions.
              Or, click on any "BUY DVD" button.
            </p>
          </AccordionItem>

          <AccordionItem title="How fast can I get my DVDs?">
            <p>
              Orders will usually ship within one day upon receipt of payment.
            </p>
          </AccordionItem>

          <AccordionItem title="My DVD has arrived damaged!">
            <p>
              If the DVD has arrived to you damaged, just send it back right
              away and we will replace it.
            </p>
          </AccordionItem>

          <AccordionItem title="What's the difference between the VL & PZV series videos?">
            <p>The VL series contain penetration scenes.</p>
            <p>
              The PZV series <em>usually</em> do not.
            </p>
          </AccordionItem>

          <AccordionItem title="Why are the previews fuzzy?">
            <p>
              The preview clips are in low-resolution for a smaller file size
              and faster loading in browsers. The downloads are better quality
              and have higher resolution.
            </p>
          </AccordionItem>

          <AccordionItem title="Are the clips part of a full-length video?">
            <p>
              Most clips are taken from one of the full-length videos. Often,
              I'm not sure which one! &#x2639;
            </p>
            <p>
              Please <Link to="/contact">contact me</Link> if you'd like help
              figuring it out.
            </p>
          </AccordionItem>

          <AccordionItem title="Are you guys the REAL Powershotz?">
            <p>
              Yes! We are the official owners of Powershotz video production
              company and the original producers of all Powershotz content.
            </p>
          </AccordionItem>

          <AccordionItem title="Why are your prices so high?">
            <p>
              We are unable to use credit card processing for seemingly
              non-consensual sexual acts portrayed on Powershotz videos.
              Therefore, our operating, processing, and marketing costs are
              higher.
            </p>
            <p>
              Note: The performers are often fully bound, repeatedly saying no,
              and asking for it to stop. It appears as though the performers are
              having sexual activity against their will. But they aren't...{' '}
              <b>they're acting!</b>
            </p>
          </AccordionItem>

          <AccordionItem title="Can I use the photos and videos any way I want?">
            <p>
              No. The content is copyrighted and is for your personal use only.
              Powershotz images and videos may not be distributed.
            </p>
            <p>
              Please read the <Link to="/">terms of service</Link>, the{' '}
              <Link to="/about">about us</Link> page, and the "Important!"
              information at the bottom of each page.
            </p>
          </AccordionItem>

          <AccordionItem title="I'm worried about the girls, are they being hurt?">
            <p>
              <b>ABSOLUTELY NOT!!!</b>
            </p>
            <p>
              They are actors. They are ACTING!!! Please read about{' '}
              <Link to="/about">our philosophy</Link> on this...
            </p>
          </AccordionItem>

          <AccordionItem title="What about all the legal stuff?">
            <p>
              Please see our <Link to="/about">About Us</Link> page for all of
              the legal stuff.
            </p>
          </AccordionItem>

          <AccordionItem title="Can I contact one of the models?">
            <p>
              <strong>Forget about it!</strong>
            </p>
            <p>
              We will <strong>NEVER</strong> disclose any personal information
              about any of our models!
            </p>
          </AccordionItem>

          <AccordionItem title="Can I sell my videos on your site?">
            <p>
              We are working on expanding our site to include other studios and
              artists. More information to come!
            </p>
            <p>
              If you need server or website services, please{' '}
              <Link to="/contact">use this link to contact Alexandra</Link> or
              send an email to{' '}
              <a href="mailto:alexandra@powershotz.com">
                alexandra@powershotz.com
              </a>
            </p>
            <p>
              Alexandra is an awesome full-stack mobile/web app developer!
              &#128521;
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
