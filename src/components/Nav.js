import { useState } from "react";

const Nav = ({ setCelcius, setPage }) => {
  const [navActive, setNavActive] = useState({
    today: true,
    week: false,
  });

  const [activeTemp, setActiveTemp] = useState({
    celcius: true,
    fahrenheit: false,
  });

  return (
    <nav>
      <div className="links">
        <span
          onClick={() => {
            setPage("today");
            setNavActive({
              today: true,
              week: false,
            });
          }}
          className={navActive.today ? "active-nav" : ""}
        >
          Today
        </span>
        <span
          onClick={() => {
            setPage("week");
            setNavActive({
              today: false,
              week: true,
            });
          }}
          className={navActive.week ? "active-nav" : ""}
        >
          Week
        </span>
      </div>
      <div className="temp-mode">
        <button
          className={activeTemp.celcius ? "temp-btn active" : "temp-btn"}
          onClick={() => {
            setCelcius(true);
            setActiveTemp({
              celcius: true,
              fahrenheit: false,
            });
          }}
        >
          °C
        </button>
        <button
          className={activeTemp.fahrenheit ? "temp-btn active" : "temp-btn"}
          onClick={() => {
            setCelcius(false);
            setActiveTemp({
              celcius: false,
              fahrenheit: true,
            });
          }}
        >
          °F
        </button>
      </div>
    </nav>
  );
};

export default Nav;
