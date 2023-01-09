import { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import './Form.css';

const baseURL = '';

const Form = ({ title }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');

  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [textDirty, setTextDirty] = useState(false);

  const nameError = 'Имя не может быть пустым или содержать меньше 2х символов';

  const phoneError = 'Поле с номером должно содержать 11 симфолов';

  const textError =
    'Поле с текстом не может быть пустым или содержать менее 15 символов ';

  const str = /[A-Za-zA-Яа-яЁё]/g;
  const num = /[0-9]/g;

  const onInput = e => {
    switch (e.target.name) {
      case 'name':
        e.target.value = e.target.value.replace(num, '');
        setName(e.target.value);
        if (e.target.value === '' || e.target.value.length < 2) {
          return setNameDirty(true);
        }
        return setNameDirty(false);

      case 'phone':
        e.target.value = e.target.value.replace(str, '');
        const val = e.target.value.match(num);
        if (val.length > 11) {
          return;
        }
        setPhoneDirty(true);
        setPhone(val.join(''));
        if (phone.length >= 10) {
          setPhoneDirty(false);
        }

        break;
      case 'text':
        setText(e.target.value);
        if (text === '' || text.length < 15) {
          return setTextDirty(true);
        }
        return setTextDirty(false);

      default:
        return;
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    if (nameDirty || phoneDirty || textDirty) {
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
      <p form__title>{title}</p>
      <form className="form" onSubmit={onFormSubmit}>
        {nameDirty && (
          <p style={{ color: 'red', fontSize: '12px' }}>{nameError}</p>
        )}
        <input
          id="name"
          className="form__input"
          type="text"
          name="name"
          required
          placeholder="Name"
          onInput={onInput}
        />
        {phoneDirty && (
          <p style={{ color: 'red', fontSize: '12px' }}>{phoneError}</p>
        )}
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

        {textDirty && (
          <p style={{ color: 'red', fontSize: '12px' }}>{textError}</p>
        )}
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
