import React from 'react'
import './Footer.scss'
import creditCardImg from '../../assests/creditCard.png'
import { AiOutlineFacebook,AiOutlineInstagram,AiOutlineTwitter,AiOutlineMail} from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='Footer'>
      <div className="container">
        <div className="content">
          <div className="footer-left">
              <h3 className="title">Follow Us</h3>
              <ul className='follow'>
                <li className='hover-link center'>
                <AiOutlineInstagram/>
                </li>
                <li className='hover-link center'>
                  <AiOutlineFacebook/>
                </li>
                <li className='hover-link center'>
                  <AiOutlineTwitter/>
                </li>
                <li className='hover-link center'>
                  <AiOutlineMail/>
                </li>
              </ul>
          </div>
          <div className="footer-right">
                <h3 className='title'>My Comapany</h3>
                <ul className="company">
                  <li className="hover-link">Contact us</li>
                  <li className="hover-link">Privacy Policy </li>
                  <li className="hover-link">Return And Exchange Policy us</li>
                  <li className="hover-link">Shipping Policy </li>
                  <li className="hover-link">Terms & Conditions</li>
                </ul>
          </div>
        </div>
        <div className="subfooter">
          <div className="credit-card-img">
            <img src={creditCardImg} alt="" />
          </div>
          <p>Copyright {new Date().getFullYear()} ©️ <strong>Posterz.</strong> </p>
        </div>
      </div>
      
    </div>
  )
}

export default Footer
