import { useState } from 'react';
import './Form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');

  const state = {
    name,
    phone,
    text,
  };

  const onInput = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'text':
        setText(e.target.value);
        break;

      default:
        return;
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className="form__box">
      <form className="form" onSubmit={onFormSubmit}>
        <input
          id="name"
          className="form__input"
          type="text"
          name="name"
          required
          placeholder="Name"
          onInput={onInput}
        />

        <input
          id="phone"
          value={phone}
          className="form__input"
          type="tel"
          name="phone"
          required
          placeholder="Phone"
          onInput={onInput}
        />

        <p>
          <textarea
            className="form__input"
            value={text}
            rows={6}
            name="text"
            placeholder="Text"
            onInput={onInput}
          ></textarea>
        </p>

        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Form;
