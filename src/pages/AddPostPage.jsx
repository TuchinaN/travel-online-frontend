import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [place, setPlace] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
        const data = new FormData()
        data.append('title', title)
        data.append('place', place)
        data.append('text', text)
        data.append('image', image)
        dispatch(createPost(data))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setPlace('')
    setText('')
  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, [])

const options = React.useMemo(() => ({
  spellChecker: false,
  maxHeight: "400px",
  autofocus: true,
  placeholder: "Ваше приключение...",
  status: false,
  autosave: {
    enabled: true,
    delay: 1000,
  },
}), []);

  return (
    <form 
      className='w-2/3 mx-auto py-10'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className='text-gray-300 py-2 bg-blue-950 text-sm mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Прикрепить изображение:
        <input type="file" className='hidden' onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <div className='flex object-cover py-2'>
        {image && ( <img src={URL.createObjectURL(image)} alt={image.name} />)}
      </div>
      <label className='text-base text-blue-950 opacity-80 font-bold'>
        Заголовок поста:
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Заголовок'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder:text-gray-700 font-normal' />
      </label>
      <label className='text-base text-blue-950 opacity-80 font-bold'>
        Местоположение:
        <input 
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder='Страна, Город'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder:text-gray-700 font-normal' />
      </label>
      <label className='text-base text-blue-950 opacity-80 font-bold'>
        Текст поста:
        <SimpleMDE 
          value={text}
          onChange={onChange}
          options={options}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none  h-100 placeholder:text-gray-700 font-normal'/>
          
        {/* <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Текст поста'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40 placeholder:text-gray-700 font-normal'/> */}
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button
          onClick={submitHandler}
          className='flex justify-center items-center bg-blue-950 text-sm text-white rounded-sm py-2 px-4'>
          Добавить
        </button>

        <button
          onClick={clearFormHandler}
          className='flex justify-center items-center bg-red-700 text-sm text-white rounded-sm py-2 px-4'>
          Отменить
        </button>
      </div>
    </form>
  )
}
