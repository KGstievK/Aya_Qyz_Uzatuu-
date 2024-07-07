"use client"
import { SubmitHandler, useForm } from 'react-hook-form'
import scss from './FormGuest.module.scss'
import axios from 'axios'

interface FormType {
  _id?: number,
  name: string,
  dev: string,
  partner: string,
  comment: string,
}

const url = process.env.NEXT_PUBLIC_API_URL

const FormGuest = () => {

  const { register, handleSubmit } = useForm<FormType>({})
  const onSubmit: SubmitHandler<FormType> = async (FormData) => {
    const guestData = {
      name: FormData.name,
      dev: FormData.dev,
      partner: FormData.partner,
      comment: FormData.comment,
    }
    const {data} = await axios.post(`${url}/wedding_v1`, guestData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        'Content-Type': "application/json"
      }
    })
    console.log(data)
  }


  return (
    <section className={scss.FormGuest}>
      <div className="container">
        <div className={scss.content}>
          <h1>Анкета гостя</h1>
          <p>Пожалуйста ответьте на несколько вопросов и подтвердите свое присутствие</p>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Ваше Имя и Фамилия' {...register("name", {required: true})} />
            <p>Подтверждение присутствия</p>
            <div className={scss.radio}>
              <input  type="radio" value="Приду" {...register("dev", {required: true})} />
              <p>Приду</p>
            </div>
            <div className={scss.radio}>
              <input  type="radio" value="Не смогу" {...register("dev", {required: true})}/>
              <p>Не смогу</p>
            </div>
            <input type="text" placeholder='Если будете с парой, просьба указать имя' {...register("partner", {required: true})} />
            <input type="text" placeholder='Если у вас есть комментарии, напишите' {...register("comment", {required: true})} />
            <button type='submit'>ПОДТВЕРДИТЬ</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FormGuest