import { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import './Form.css';

const baseURL = '';

const Form = ({ title }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');

  const str = /[A-Za-zA-Яа-яЁё]/g;
  const num = /[0-9]/g;

  const onInput = e => {
    switch (e.target.name) {
      case 'name':
        e.target.value = e.target.value.replace(num, '');
        setName(e.target.value);
        break;
      case 'phone':
        e.target.value = e.target.value.replace(str, '');
        const val = e.target.value.match(num);
        if (val.length > 11) {
          return;
        }
        setPhone(val.join(''));
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
    if (name === '' || name.length < 2 || phone === '' || phone.length < 11) {
      return alert('Заполните все поля корректно');
    }

    axios
      .post(baseURL, { name, phone, text })
      .then(resp => {
        console.log(resp.data);
      })
      .catch(error => {
        console.log(error.message);
      });

    const form = e.currentTarget;
    form.reset();
    console.log({ name, phone, text });
    setName('');
    setPhone('');
    setText('');
  };

  return (
    <div className="form__box">
      <p>{title}</p>
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

        <InputMask
          id="phone"
          mask={'+7 (999) 999 99 99'}
          maskPlaceholder={'-'}
          value={phone}
          className="form__input"
          type="tel"
          name="phone"
          required
          placeholder="Phone"
          onInput={onInput}
        />

        <textarea
          className="form__input"
          value={text}
          rows={6}
          name="text"
          placeholder="Text"
          onInput={onInput}
        ></textarea>

        <button className="form__button" disabled={false} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Form;
