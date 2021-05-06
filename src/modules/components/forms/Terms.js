import React from 'react'
import { Link } from 'react-router-dom'
import bluex from '../../../images/bluex.webp'

function Terms(props) {
  return (
    <div
      id="terms"
      className={props.hideT ? 'hide' : ''}
      style={{
        textAlign: 'left',
        backgroundColor: 'var(--textColor)',
        color: 'var(--backgroundColor)',
        padding: '5px 20px 15px 20px',
        marginBottom: '20px',
        borderRadius: '4px',
      }}
    >
      <img
        src={bluex}
        alt="close"
        style={{ width: '50px', float: 'right', cursor: 'pointer' }}
      />
      <h2 style={{ color: 'black' }}>TERMS & CONDITIONS OF USE</h2>
      <p style={{ textTransform: 'uppercase' }}>
        You must be at least 18 years of age (21 years of age where 18 is not
        the age of majority) to view this website. You are responsible for the
        stewardship of any products that you order or download. This means that
        you will not sell, give away, or allow to be seen, any of the images or
        video products that you may obtain to anyone under the age of 18 years
        of age (21 years of age where 18 is not the age of majority). You
        further certify that you will destroy any material that you no longer
        have use for so that it may not fall inadvertently into the hands of
        minors.
      </p>
      <h2 style={{ color: 'black' }}>PRIVACY POLICY</h2>
      <p>
        Powershotz.com (the "Website") has created this privacy policy
        ("Policy") in order to demonstrate our company's commitment to privacy.
        The following discloses our information gathering and disseminating
        practices.
      </p>
      <h3>Minors</h3>
      <p>
        Our company's services are directed to adults who possess validated
        credit card information and are not marketed to individuals under the
        age of Eighteen (18)(21-years old where 18 is not the age of majority).
        Certain portions of Website, which may contain content considered
        offensive to some, are inaccessible to individuals under the age of
        Eighteen (18)(21-years old where 18 is not the age of majority), as
        advocated by the Communications Decency Act. For those portions that may
        be accessible to individuals under the age of Eighteen (18), such as the
        Website home page and other areas, the Website has no intention of
        collecting any personally identifiable information (that is, name,
        address, telephone number, or email address) from individuals under
        Eighteen (18) years of age (21-years old where 18 is not the age of
        majority).
      </p>
      <h3>
        PERSONS UNDER THE AGE OF EIGHTEEN (18) & or (21) SHOULD NOT SUBMIT
        INFORMATION TO THE WEBSITE
      </h3>
      <p>
        If a minor has provided us with personally-identifiable information, a
        parent or guardian of that minor should contact us at the email address
        listed at the bottom of this Policy immediately.
      </p>
      <h3>Personally-Identifiable Information</h3>
      <p>
        Our site may require customers to give us contact information (such as
        email addresses and phone numbers), financial information (this includes
        account or credit card numbers), and demographic information (this
        includes address, zip code, and age). We use contact information to send
        the user information, products, or contact them only when necessary. The
        financial information collected is used to bill the user for services or
        products ordered.
      </p>
      <h3>Sharing of Information</h3>
      <p>
        The Website does not rent, sell, or share personal information about you
        with any third party, except to the financial institution that processes
        your transaction or where required by law.
      </p>
      <h3>Third-Party Companies</h3>
      <p>
        This site contains links to other sites. Please note that the Website is
        not responsible for the privacy practices or the content of other sites.
      </p>
      <h3>Changes to our Privacy Policy</h3>
      <p>
        We will notify users of any change to this privacy policy either by
        posting a notification on the main page of the site or via this page.
      </p>
      <h3>Customer Service Questions?</h3>
      <p>
        Email{' '}
        <a href="mailto:alexandra@powershotz.com">alexandra@powershotz.com</a>{' '}
        or <Link to="/contact">use our contact form.</Link>
      </p>
    </div>
  )
}

export default Terms
