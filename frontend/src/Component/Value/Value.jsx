import React, { useEffect } from 'react';
import style from './Value.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Value() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <section style={{ overflow: 'hidden' }} className={style.Contributor2}>
        <div data-aos="fade-right" className={style.left}>
          <h1>Our value for your business.</h1>
        </div>

        <div data-aos="fade-left" className={style.right}>
          <div>
            <h1>Online Growth</h1>
            <p>
              Establishing a whole eCommerce system which acts as an independent selling channel.
            </p>
          </div>
          <div>
            <h1>Operational Efficiency</h1>
            <p>
              Handling all your end-to-end operations on your behalf to maximize your customer experience.
            </p>
          </div>
          <div>
            <h1>Cost Optimization</h1>
            <p>
              Integrating tools which can efficiently focus your budgets on what grows your business.
            </p>
          </div>
          <div>
            <h1>Targeted Sales</h1>
            <p>
              Implementing marketing tactics to grow & expand your customer base.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Value;
