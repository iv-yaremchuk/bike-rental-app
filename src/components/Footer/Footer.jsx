import styled from './Footer.module.css'

function Footer() {
  return (
    <footer className={styled.wrap}>
      <a className={styled.link} href="tel:+79993332211">+7(999) 333 22 11</a>
      <a className={styled.link} href="mailto:bike@rental.info">bike@rental.info</a>
    </footer>
  )
}

export default Footer;