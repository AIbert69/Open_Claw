import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link href="/" className="navbar__logo footer__logo">
            <svg
              className="navbar__logo-icon"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <polygon
                points="18,2 34,10 34,26 18,34 2,26 2,10"
                stroke="#00c9a7"
                strokeWidth="2"
                fill="none"
              />
              <polygon
                points="18,8 28,13 28,23 18,28 8,23 8,13"
                stroke="#00c9a7"
                strokeWidth="1.5"
                fill="rgba(0,201,167,0.12)"
              />
              <circle cx="18" cy="18" r="3" fill="#00c9a7" />
            </svg>
            <span className="navbar__logo-text footer__logo-text">peplogix</span>
          </Link>
          <p className="footer__tagline">
            Unlock your body&#39;s potential with science-backed peptides —
            precision, performance, and vitality in every dose.
          </p>
        </div>

        <div className="footer__col">
          <h5>Menu</h5>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/#testing">Testing</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h5>Quick Links</h5>
          <ul>
            <li><Link href="#">Legal</Link></li>
            <li><Link href="/register">Register</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms and Conditions</Link></li>
            <li><Link href="#">Legal &amp; Compliance</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h5>Operational</h5>
          <p>
            Every day 9:00 – 22:00
            <br />
            Sat – Sun 9:00 – 19:00
          </p>
          <Link href="#" className="footer__consult">
            You need a consult?
          </Link>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Copyright © {new Date().getFullYear()}</p>
        <div className="footer__payments">
          <svg
            className="footer__pay-icon"
            viewBox="0 0 48 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="30" rx="4" fill="#1a1f71" />
            <text
              x="8"
              y="21"
              fill="white"
              fontSize="14"
              fontFamily="Arial"
              fontWeight="bold"
              fontStyle="italic"
            >
              VISA
            </text>
          </svg>
          <svg
            className="footer__pay-icon"
            viewBox="0 0 48 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="30" rx="4" fill="#252525" />
            <circle cx="18" cy="15" r="9" fill="#eb001b" />
            <circle cx="30" cy="15" r="9" fill="#f79e1b" />
            <path
              d="M24 8.2a9 9 0 010 13.6 9 9 0 010-13.6z"
              fill="#ff5f00"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
