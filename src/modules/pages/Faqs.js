import React from 'react'
// https://github.com/farbodsalimi/react-light-accordion
import { Accordion, AccordionItem } from 'react-light-accordion'
import 'react-light-accordion/demo/css/index.css'
import '../../css/faqs.css'
import { Link } from 'react-router-dom'

export default function Faqs() {
  return (
    <div className="faqs">
      <header>
        <h1>FAQs</h1>
      </header>
      <Accordion atomic={true}>
        <AccordionItem title="Are Powershotz videos available anywhere else?">
          <p>
            Powershotz videos, clips, and photo sets are ONLY available for sale
            on this website.
          </p>
          <p>
            If you find our videos elsewhere, they are stolen, illegal, and are
            probably low quality.
          </p>
        </AccordionItem>
        <AccordionItem title="How do I order?">
          <p>It's Easy!</p>
          <p>
            <b>Instant Downloads:</b>
          </p>
          <ol>
            <li>
              Click on any "DOWNLOAD" button located by the{' '}
              <Link to="/videos">video</Link> or{' '}
              <Link to="/photos">photo set</Link> that you want
            </li>
            <li>Pay using Bitcoin.</li>
            <li>Check your email for the download link.</li>
          </ol>
          <p>
            <b>Can I order downloads with cash, check, or money order?</b>
          </p>
          <ol>
            <li>
              YES! Just <a href="mailto:alexandra@powershotz.com">email me</a>{' '}
              until the shopping cart is finished.
            </li>
          </ol>
          <p>
            <b>DVD Orders:</b>
          </p>
          <ol>
            <li>
              Go to the <Link to="/dvd">DVD order form</Link> and follow the
              directions
            </li>
            <li>NEW shopping cart coming soon!</li>
          </ol>
          <p>
            <b>ALWAYS MAKE SURE YOU ALLOW POPUPS FROM THIS SITE!</b>
          </p>
        </AccordionItem>

        <AccordionItem title="How do I download my videos?">
          <p>
            <b>DOWNLOAD INSTRUCTIONS:</b>
          </p>
          <ol>
            <li>
              Click on the link in your email from alexandra@powershotz.com
            </li>
            <li>Save the file(s) somewhere on your computer</li>
          </ol>
        </AccordionItem>

        <AccordionItem title="What if I have problems downloading my video?">
          <p>Don't worry... We GUARANTEE that you will get your video!</p>
          <p>
            We will work with you to makes sure that you get your video as
            quickly and easily as possible.
          </p>
          <p>
            Please <Link to="/contact">use this link to contact us</Link> or
            send an email to{' '}
            <a href="mailto:alexandra@powershotz.com">
              alexandra@powershotz.com
            </a>
          </p>
        </AccordionItem>

        <AccordionItem title="I've lost my file or it has become corrupted!">
          <p>We have a 90-day replacement policy on all downloadable orders.</p>
        </AccordionItem>

        <AccordionItem title="My DVD has arrived damaged!">
          <p>
            If the DVD has arrived to you damaged, just send it back right away
            and we will replace it.
          </p>
        </AccordionItem>

        <AccordionItem title="Help! The buttons don't work!">
          <p>
            <b>Disable your browser's popup blocker for this site</b>, refresh
            the page, or try a different browser. If nothing works, please{' '}
            <Link to="/contact">contact me</Link> or email me at{' '}
            <a href="mailto:alexandra@powershotz.com">
              alexandra@powershotz.com
            </a>
          </p>
        </AccordionItem>

        <AccordionItem title="How do I buy DVDs?">
          <p>
            To purchase a collection of exciting Bondage, BDSM, Damsel in
            Distress, Strugglefuck, and Master/slave fantasy full-length videos
            in DVD format, go to the <Link to="/dvd">DVD order form</Link> and
            follow the instructions. Or, click on any "BUY DVD" button.
          </p>
        </AccordionItem>

        <AccordionItem title="How fast can I get my DVDs?">
          <p>
            Orders will usually ship within one day upon receipt of payment.
          </p>
        </AccordionItem>

        <AccordionItem title="What's the difference between the VL & PZV series videos?">
          <p>The VL series contain penetration scenes.</p>
          <p>
            The PZV series <em>usually</em> do not.
          </p>
        </AccordionItem>

        <AccordionItem title="Are the clips part of a full-length video?">
          <p>
            Most clips are taken from one of the full-length videos. Often, I'm
            not sure which one! :(
          </p>
          <p>
            Please <Link to="/contact">contact me</Link> if you'd like help
            figuring it out.
          </p>
        </AccordionItem>

        <AccordionItem title="Are there more clips?">
          <p>
            There are 1000s of short clips available right now! But, there are
            still a few that haven't been released yet. Keep checking back!
          </p>
        </AccordionItem>

        <AccordionItem title="Are you guys the REAL Powershotz?">
          <p>
            Yes! We are the official owners of Powershotz video production
            company (Emotionz LLC) and the original producers of all Powershotz
            content.
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
            The performers are often fully bound, repeatedly saying no, and
            asking for it to stop. It appears as though the performers are
            having sexual activity against their will. But they aren't...{' '}
            <b>they're acting!</b>
          </p>
        </AccordionItem>

        <AccordionItem title="Can I use the photos and videos any way I want?">
          <p>
            The content is copyrighted and is for your personal use only.
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
            Please see our <Link to="/about">About Us</Link> page for all of the
            legal stuff.
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
      </Accordion>
    </div>
  )
}
