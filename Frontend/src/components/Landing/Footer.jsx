import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.heading}>Get In Touch</h3>
          <p>Our Address</p>
          <p>1234 Web Automation St.</p>
          <p>Addis Ababa, AA 94101</p>
          <p>Ethiopia</p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Contact Us</h3>
          <p>Phone: +1 800-123-4567</p>
          <p>Email: support@aicontentgenerationplatform.com</p>
          <p>Operating Hours: 9 AM - 6 PM (Mon - Fri)</p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Follow Us</h3>
          <div style={styles.links}>
            <a href="https://facebook.com" style={styles.link}>Facebook</a>
            <a href="https://twitter.com" style={styles.link}>Twitter</a>
            <a href="https://linkedin.com" style={styles.link}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <p style={styles.text}>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '30px 0',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  section: {
    flex: '1 1 250px',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  text: {
    margin: 0,
    textAlign: 'center',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  bottom: {
    borderTop: '1px solid #555',
    marginTop: '20px',
    paddingTop: '10px',
  },
};

export default Footer;
