import styled from './TheftReportForm.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createReport } from '../../../redux/reportAction';

function TheftReportForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      createReport(
        data.licenseNumber,
        data.ownerFullName.split(' ').map(elem => elem[0].toUpperCase() + elem.slice(1).toLowerCase()).join(' '),
        data.type,
        data.clientId,
        data.color,
        data.date,
        data.description
      )
    );
    reset();
  };

  const { message } = useSelector((state) => state.messageReducer);
  const { isReported } = useSelector((state) => state.reportReducer);

  return (
    <div className={styled.wrap}>
      { isReported ? (
        <div className={styled.text}>
          <h3 className={styled.title + ' ' + styled.success}>Ваш запрос успешно отправлен!</h3>
        </div>
      ) :
      <div className={styled.text}>
        {message ? (
          <h3 className={styled.title + ' ' + styled.error}>{message}</h3>
        ) : (
          <>
            <h2 className={styled.title}>Мы вам поможем!</h2>
            <p className={styled.descr}>
              Если ваш велосипед пропал, мы&nbsp;поможем найти, просто заполните
              краткую форму и&nbsp;ожидайте. Мы&nbsp;сообщаем промежуточные
              результаты на&nbsp;каждом этапе поиска.
            </p>
          </>
        )}
      </div>

      }
      <span className={styled.line}></span>
      <form onSubmit={handleSubmit(onSubmit)} className={styled.form} action="">
        <label className={`${styled.form__label} ${styled.full}`}>
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
        <label className={`${styled.form__label} ${styled.full}`}>
          ФИО арендатора
          <input
            {...register('ownerFullName', {
              required: '*Обязательное поле',
              minLength: {
                value: 4,
                message: '*Минимум 4 буквы',
              },
              pattern: {
                value: /^[а-яА-Яё Ёa-zA-Z]+$/,
                message: '*Недопустимый формат',
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
            {errors?.ownerFullName?.message || ''}
          </span>
        </label>
        <label className={styled.form__label}>
          Номер лицензии
          <input
            {...register('licenseNumber', {
              required: '*Обязательное поле',
            })}
            className={
              errors.licenseNumber
                ? styled.form__input + ' ' + styled.invalid
                : styled.form__input
            }
            type="text"
          />
          <span className={styled.form__error}>
            {errors?.licenseNumber?.message || ''}
          </span>
        </label>
        <label className={styled.form__label}>
          Дата кражи
          <input
            {...register('date')}
            className={styled.form__input}
            type="date"
          />
        </label>
        <label className={styled.form__label}>
          Тип велосипеда:
          <select
            {...register('type', {
              required: '*Обязательное поле',
            })}
            className={
              errors.type
                ? styled.form__select + ' ' + styled.invalid
                : styled.form__select
            }
            defaultValue=""
            name="type"
          >
            <option value="">Выберите тип</option>
            <option value="montain">Горный</option>
            <option value="sport">Спортивный</option>
            <option value="other">Другой</option>
          </select>
          <span className={styled.form__error}>
            {errors?.type?.message || ''}
          </span>
        </label>
        <label className={styled.form__label}>
          Цвет велосипеда:
          <select
            {...register('color')}
            className={
              errors.color
                ? styled.form__select + ' ' + styled.invalid
                : styled.form__select
            }
            defaultValue=""
            name="color"
          >
            <option value="">Выберите цвет</option>
            <option value="red">Красный</option>
            <option value="blue">Синий</option>
            <option value="other">Другой</option>
          </select>
          <span className={styled.form__error}>
            {errors?.color?.message || ''}
          </span>
        </label>
        <label className={`${styled.form__label} ${styled.full}`}>
          Дополнительная информация
          <input
            {...register('description')}
            className={styled.form__input}
            type="text"
          />
        </label>
        <button className={styled.form__btn} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default TheftReportForm;
