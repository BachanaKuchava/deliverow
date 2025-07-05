import React from "react";
import {
  FaBoxOpen,
  FaHeadset,
  FaGlobe,
  FaShippingFast,
  FaArrowRight
} from "react-icons/fa";
import "./operation.scss";

const steps = [
  {
    icon: <FaBoxOpen />,
    title: "შეკვეთის განთავსება",
    description: "განათავსეთ შეკვეთა ჩვენთან დარეკვით ან ჩვენს პლატფორმაზე.",
  },
  {
    icon: <FaHeadset />,
    title: "დაელოდეთ უკუკავშირს",
    description: "შეკვეთის განთავსების შემდეგ თქვენ მიიღებთ უკუკავშირს.",
  },
  {
    icon: <FaGlobe />,
    title: "შეკვეთის მიღება",
    description: "დამუშავების შემდეგ მივიღებთ თქვენს შეკვეთას.",
  },
  {
    icon: <FaShippingFast />,
    title: "მიწოდება",
    description: "ამანათის მიღების და დამუშავების შემდეგ , თქვენთან მიწოდება.",
  },
];

export default function Operation() {
  return (
    <section className="operation-section">
      <div className="container">
        <p className="label">როგორ ვმუშაობთ</p>
        <h2 className="heading">
          როგორ ხდება ჩვენი სისტემის გამოყენება
        </h2>
        <div className="steps">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="step">
                <div className="icon-wrapper">
                  {step.icon}
                </div>
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
