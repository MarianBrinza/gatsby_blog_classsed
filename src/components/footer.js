import React from 'react';

const Footer = () => {

  return (
    <div className="site-footer">
      <h4 className="text-center">
        Some Blog
      </h4>

      <p className='text-center'>Follow you to Neverland</p>

      <div className='footer-social-links'>
        <ul className="social-links-list">
          <li>
            <a href="http://www.fakedomain_.com" target='_blank' rel='noopener noreferrer' className='facebook'>
              facebook icon here
            </a>
          </li>
          <li>
            <a href="http://www.fakedomain_.com" target='_blank' rel='noopener noreferrer' className='twitter'>
              twitter icon here
            </a>
          </li>
          <li>
            <a href="http://www.fakedomain_.com" target='_blank' rel='noopener noreferrer' className='google'>
              google icon here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
