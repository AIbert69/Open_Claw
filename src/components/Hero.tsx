import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__heading">
          PRECISION PEPTIDES.
          <br />
          POWERFUL RESULTS.
        </h1>
        <p className="hero__sub">
          Discover clinically designed formulations engineered to enhance
          recovery, optimize performance, and unlock your full potential.
        </p>
        <Link href="/shop" className="btn btn-primary hero__cta">
          Explore more <span className="btn__arrow">→</span>
        </Link>

        <div className="hero__features">
          <span className="hero__feature-dot"></span>
          <span className="hero__feature-dot hero__feature-dot--active"></span>
          <span className="hero__feature-dot"></span>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__product-img">
          <div className="hero__vial">
            <div className="hero__vial-cap"></div>
            <div className="hero__vial-body">
              <div className="hero__vial-logo">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="10,1 19,5.5 19,14.5 10,19 1,14.5 1,5.5"
                    stroke="#00c9a7"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
                <span>peplogix</span>
              </div>
              <p className="hero__vial-name">MOTS-C</p>
              <p className="hero__vial-dose">5mg</p>
              <p className="hero__vial-tag">RESEARCH USE ONLY</p>
            </div>
          </div>
        </div>

        <div className="hero__badge">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00c9a7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <div>
            <strong>Tested in ISO</strong>
            <span>certified labs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
