import { useState } from 'react';
import styled from './SignUpForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { signUp } from '../../../redux/authAction';

function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  const [signedUp, setSignedUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setSignedUp(true);

    dispatch(
      signUp(
        data.email,
        data.password,
        data.clientId,
        data.firstName,
        data.lastName
      )
    )
      .then(() => {
        navigate('/theftForm');
        window.location.reload();
        setSignedUp(true);
      })
      .catch(() => {
        setSignedUp(false);
      });

    reset();
  };

  const { message } = useSelector((state) => state.messageReducer);
  const { isSignedIn } = useSelector((state) => state.authReducer);

  if (isSignedIn) {
    return <Navigate to="/theftForm" />;
  }

  return (
    <div className={styled.wrap}>
      <div className={styled.text}>
        {message ? (
          <h3 className={styled.title + ' ' + styled.error}>{message}</h3>
        ) : (
          <>
            <h2 className={styled.title}>Приятно познакомиться!</h2>
            <p className={styled.descr}>
              Чтобы использовать все доступные возможности платформы, необходимо
              пройти регистрацию.
            </p>
          </>
        )}
      </div>
      <span className={styled.line}></span>
      {!signedUp ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styled.form}
          action=""
        >
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
              type="text"
            />
            <span className={styled.form__error}>
              {errors?.email?.message || ''}
            </span>
          </label>
          <label className={`${styled.form__label} ${styled.full}`}>
            Имя
            <input
              {...register('firstName', {
                minLength: {
                  value: 2,
                  message: '*Минимум 2 буквы',
                },
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z]+$/,
                  message: '*Недопустимый формат',
                },
              })}
              className={
                errors.firstName
                  ? styled.form__input + ' ' + styled.invalid
                  : styled.form__input
              }
              type="text"
            />
            <span className={styled.form__error}>
              {errors?.firstName?.message || ''}
            </span>
          </label>
          <label className={`${styled.form__label} ${styled.full}`}>
            Фамилия
            <input
              {...register('lastName', {
                minLength: {
                  value: 2,
                  message: '*Минимум 2 буквы',
                },
                pattern: {
                  value: /^[а-яА-ЯёЁa-zA-Z]+$/,
                  message: '*Недопустимый формат',
                },
              })}
              className={
                errors.lastName
                  ? styled.form__input + ' ' + styled.invalid
                  : styled.form__input
              }
              type="text"
            />
            <span className={styled.form__error}>
              {errors?.lastName?.message || ''}
            </span>
          </label>
          <label className={styled.form__label}>
            Пароль
            <input
              {...register('password', {
                required: '*Обязательное поле',
                minLength: {
                  value: 6,
                  message: '*Минимум 6 символов',
                },
                pattern: {
                  value:
                    /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/,
                  message: '*Недопустимый формат',
                },
              })}
              className={
                errors.password
                  ? styled.form__input + ' ' + styled.invalid
                  : styled.form__input
              }
              type="text"
            />
            <span className={styled.form__error}>
              {' '}
              {errors?.password?.message || ''}
            </span>
          </label>
          <label className={styled.form__label}>
            Client ID
            <input
              {...register('clientId', {
                required: '*Обязательное поле',
              })}
              className={
                errors.clientId
                  ? styled.form__input + ' ' + styled.invalid
                  : styled.form__input
              }
              type="text"
            />
            <span className={styled.form__error}>
              {errors?.clientId?.message || ''}
            </span>
          </label>
          <button className={styled.form__btn} type="submit">
            Отправить
          </button>
        </form>
      ) : (
        <h2 className={styled.title}>Регистрация завершенна!</h2>
      )}
    </div>
  );
}

export default SignUpForm;
