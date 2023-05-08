import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from './SignInForm.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { signIn } from '../../../redux/authAction';

function SignInForm() {
  const [signedIn, setSignedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  const { message } = useSelector((state) => state.messageReducer);
  const { isSignedIn } = useSelector((state) => state.authReducer);

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  const onSubmit = (data) => {
    setSignedIn(true);

    dispatch(signIn(data.email, data.password))
      .then(() => {
        navigate('/');
        window.location.reload();
        setSignedIn(true);
      })
      .catch(() => {
        setSignedIn(false);
      });

    reset();
  };

  return (
    <div className={styled.wrap}>
      <div className={styled.text}>
        {message ? (
          <h2 className={styled.title + ' ' + styled.error}>{message}</h2>
        ) : (
          <>
            <h2 className={styled.title}>Рады снова вас видеть!</h2>
            <p className={styled.descr}>
              Для полного доступа к платформе, необходимо войти в ваш аккаунт.
            </p>
          </>
        )}
      </div>
      <span className={styled.line}></span>
      <form onSubmit={handleSubmit(onSubmit)} className={styled.form}>
        <label className={`${styled.form__label} ${styled.full}`}>
          Email
          <input
            {...register('email', {
              required: '*Обязательное поле',
              minLength: {
                value: 5,
                message: '*Минимум 5 символов',
              },
              pattern: {
                value: /[^@\s]+@[^@\s]+/,
                message: '*Некоректный email адрес',
              },
            })}
            className={
              errors.email
                ? styled.form__input + ' ' + styled.invalid
                : styled.form__input
            }
          />
          <span className={styled.form__error}>
            {errors?.email?.message || ''}
          </span>
        </label>
        <label className={`${styled.form__label} ${styled.full}`}>
          Пароль
          <input
            {...register('password', {
              required: '*Обязательное поле',
              minLength: {
                value: 6,
                message: '*Минимум 6 символов',
              },
            })}
            className={
              errors.password
                ? styled.form__input + ' ' + styled.invalid
                : styled.form__input
            }
            type='password'
          />
          <span className={styled.form__error}>
            {errors?.password?.message || ''}
          </span>
        </label>
        <button className={styled.form__btn} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
