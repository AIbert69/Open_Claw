export default function AboutStrip() {
  return (
    <section className="about-strip">
      <p className="section-label">× ABOUT PEPTIDES</p>
      <div className="about-strip__grid">
        <div className="about-strip__item">
          <span className="about-strip__icon about-strip__icon--green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4l3 3" />
            </svg>
          </span>
          <h3>Cellular Activation</h3>
          <p>Peptides trigger biological processes at a molecular level.</p>
        </div>
        <div className="about-strip__item">
          <span className="about-strip__icon about-strip__icon--teal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </span>
          <h3>Targeted Delivery</h3>
          <p>Each compound interacts with specific receptors for precision results.</p>
        </div>
        <div className="about-strip__item">
          <span className="about-strip__icon about-strip__icon--green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </span>
          <h3>Natural Response</h3>
          <p>Supports your body&#39;s innate ability to regenerate and balance.</p>
        </div>
      </div>
    </section>
  );
}
