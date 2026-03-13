import Link from "next/link";

export default function CapsuleHero() {
  return (
    <section className="hero hero--capsule">
      <div className="hero__content">
        <h2 className="hero__heading hero__heading--caps">
          THE FUTURE OF PEPTIDES
          <br />
          IN CAPSULE FORM
        </h2>
        <p className="hero__sub">
          The same verified purity — redefined for daily precision. Your
          favourite peptides, now in a seamless capsule format.
        </p>
        <Link href="/shop?category=Capsules" className="btn btn-primary hero__cta">
          Find more <span className="btn__arrow">→</span>
        </Link>
      </div>
      <div className="hero__visual hero__visual--capsule">
        <div className="capsule-bottles">
          <div className="capsule-bottle capsule-bottle--1">
            <div className="capsule-bottle__label">BPC-157</div>
          </div>
          <div className="capsule-bottle capsule-bottle--2">
            <div className="capsule-bottle__label">GLU-PP-332</div>
          </div>
          <div className="capsule-pills"></div>
        </div>
      </div>
    </section>
  );
}
