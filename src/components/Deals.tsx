import dealsImg from "../assets/deals.webp";

const Deals = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="deals-img" />
      </div>

      <div className="deals__content">
        <h5>Get up to 30% discount</h5>
        <h4>Deals of the month</h4>
        <p>
          Don’t miss out on our exclusive monthly deals! Discover incredible
          discounts on top products across categories—your favorites at
          unbeatable prices. Shop now and save big while supplies last!
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>17</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>18</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>05</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deals;
