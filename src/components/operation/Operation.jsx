// src/components/operation/Operation.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaHeadset,
  FaGlobe,
  FaShippingFast,
  FaArrowRight
} from "react-icons/fa";
import "./operation.scss";
import { LanguageContext } from "../../LanguageContext";

export default function Operation() {
  const { lang } = useContext(LanguageContext);
  const [t, setT] = useState({});

  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/translations`)
      .then((res) => {
        if (!mounted) return;
        const map = {};
        res.data.forEach(({ alias, value }) => {
          map[alias] = value;
        });
        setT(map);
      })
      .catch((err) => console.error("Translations fetch failed:", err));
    return () => {
      mounted = false;
    };
  }, [lang]);

  const steps = [
    {
      icon: <FaBoxOpen />,
      title: t.aboutussystemfirsttitle || "შეკვეთის განთავსება",
      description:
        t.aboutussystemfirsttext ||
        "განათავსეთ შეკვეთა ჩვენთან დარეკვით ან ჩვენს პლატფორმაზე."
    },
    {
      icon: <FaHeadset />,
      title: t.aboutussystemsecondtitle || "დაელოდეთ უკუკავშირს",
      description:
        t.aboutussystemsecondtext ||
        "შეკვეთის განთავსების შემდეგ თქვენ მიიღებთ უკუკავშირს."
    },
    {
      icon: <FaGlobe />,
      title: t.aboutussystemthirdtitle || "შეკვეთის მიღება",
      description:
        t.aboutussystemthirdtext ||
        "დამუშავების შემდეგ მივიღებთ თქვენს შეკვეთას."
    },
    {
      icon: <FaShippingFast />,
      title: t.aboutussystemforthtitle || "მიწოდება",
      description:
        t.aboutussystemfourthtext ||
        "ამანათის მიღების და დამუშავების შემდეგ , თქვენთან მიწოდება."
    }
  ];

  return (
    <section className="operation-section">
      <div className="container">
        <p className="label">
          {t.aboutussystemworkintro || "როგორ ვმუშაობთ"}
        </p>
        <h2 className="heading">
          {t.aboutussystemworktitle ||
            "როგორ ხდება ჩვენი სისტემის გამოყენება"}
        </h2>
        <div className="steps">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="step">
                <div className="icon-wrapper">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <FaArrowRight className="arrow" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
