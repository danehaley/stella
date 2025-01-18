import { useState, useRef} from "react";
import "./Feedback.scss";
import emailjs from "@emailjs/browser";

function Feedback() {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [text, setText] = useState("*feedback*");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFeedbackText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
    closeModal();

    setText("-sent-");
    setTimeout(function () {
      setText("*feedback*");
    }, 5000);
  };

  const sendEmail = () => {
    emailjs
      .sendForm("service_grvs616", "template_nrub3ro", form.current, {
        publicKey: "nuRYis8II71EmaDvi",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  const form = useRef();
  return (
    <div className="feedback-wrapper">
      <button onClick={openModal}> {text} </button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <form ref={form} onSubmit={handleSubmit}>
              <label>Name</label>
              <input type="text" name="name" placeholder="ur name" />
              <label>Message</label>
              <textarea name="message" placeholder="ur message" rows={5}/>
              <input type="submit" value="send" />
              <button onClick={closeModal}>nevermind</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
