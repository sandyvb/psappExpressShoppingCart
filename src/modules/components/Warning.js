import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/warning.css'

function Warning() {
  const styles = {
    button: {
      padding: '0px',
      height: '60px',
    },
  }

  return (
    <div className="warning">
      <h1>Powershotz.com</h1>
      <Link to="/home">
        <button style={styles.button}>I accept these terms, LET ME IN!</button>
      </Link>
      <h2>WARNING!</h2>
      <p>
        Please note that this site contains materials of an adult nature, and is
        intended only for individuals 18 years of age and older. Access is made
        available only to those who accept the terms of the following agreement:
        By accepting this agreement, I certify the following:
      </p>
      <ol>
        <li>
          I do not find images of nude adults, adults engaged in sexual acts, or
          other sexual material to be offensive or objectionable.
        </li>
        <li>
          I am at least 18 years of age and have the legal right to possess
          adult material in my community.
        </li>
        <li>
          I understand the standards and laws of the community, site and
          computer to which I am transporting these materials and am completely
          responsible for my actions.
        </li>
        <li>
          By entering this site, I will have released and discharged the
          providers, owners and creators of this site from any and all liability
          which might arise.
        </li>
        <li>
          I will not forward or transfer by any means any images or information
          on this site to any minors or persons who are not legally allowed to
          possess the content of this site.
        </li>
        <li>
          Bookmarking to a page on this server/site whereby this warning page is
          by-passed shall constitute an implicit acceptance of this agreement.
        </li>
        <li>
          I hold the publishers of this page harmless if I do find the materials
          contained herein offensive.
        </li>
        <li>
          If I use these services in violation of this agreement, I understand I
          may be in violation of local and federal laws and am solely
          responsible for my actions.
        </li>
        <li>
          This site complies with the record keeping requirements of &nbsp;
          <Link to="/usc2257">U.S.C. 2257</Link>. All models are 18 years of age
          or older with appropriate documentation on file. The depiction of
          bondage and captivity contained in this site is purely consensual and
          meant to portray activities between enlightened adults and is
          presented for its educational and entertainment value. Do not attempt
          to recreate the scenarios contained in this site without proper
          training and safety precautions. We assume no responsibility for any
          actions which may arise from the attempted re-creation of these
          images.
        </li>
        <li>
          COPYRIGHTS and TERMS OF SERVICE: Entering this site entitles you to
          view and/or download images for your personal and private use only.
          All images and content in this site are copyrighted and may not be
          redistributed or used in any way without the expressed written
          permission of Powershotz. Posting or distributing any part of these
          images to newsgroups, other sites or individuals is a violation of our
          Terms Of Service and could result in civil and criminal prosecution.
        </li>
      </ol>
      <h3>
        Note: All content on this site is simulated, consensual, and rehearsed
      </h3>
      <Link to="/home">
        <button style={styles.button}>I accept these terms, LET ME IN!</button>
      </Link>
      <div className="ncs">
        <a href="https://ncsfreedom.org/" rel="noopener noreferrer">
          I am easily offended, take me elsewhere
        </a>
      </div>
    </div>
  )
}

export default Warning
