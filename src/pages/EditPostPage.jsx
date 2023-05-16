import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { updatePost } from '../redux/features/post/postSlice'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const EditPostPage = () => {
  const [title, setTitle] = useState('')
  const [place, setPlace] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = useParams()
  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setPlace(data.place)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('place', place)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
        console.log(error)
    }
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
  
  const clearFormHandler = () => {
    setTitle('')
    setPlace('')
    setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form 
      className='w-2/3 mx-auto py-10'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className='text-gray-300 py-2 bg-blue-950 text-sm mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Прикрепить изображение:
        <input type="file" className='hidden' 
          onChange={(e) => {
            setNewImage(e.target.files[0])
            setOldImage('')
          }} 
        />
      </label>
      <div className='flex object-cover py-2'>
        {oldImage && ( <img src={`${process.env.REACT_APP_URL}${oldImage}`} alt={oldImage.name} />)}
        {newImage && ( <img src={URL.createObjectURL(newImage)} alt={newImage.name} />)}
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
          Изменить
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
