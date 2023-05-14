import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'
import { useSearchParams } from 'react-router-dom'

export const MainPage = () => {

  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)

  const [searchParams, setSearchParams] = useSearchParams();
  const postQuery = searchParams.get('post') || ''

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const query = form.search.value;

    setSearchParams({post: query})
  }
  
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
        <div className='text-xl text-center text-blue-950 py-10'>
            Постов не существует.
        </div>
    )
  }

  return (
    <div className='max-w-[900px] mx-auto'>
      <div className='py-5'>
        <form onSubmit={handleSubmit}>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  type="search"
                  name='search'
                  placeholder="Поиск..." 
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Найти</button>
            </div>
        </form>
      </div>
      
      <div className='flex justify-between gap-8 py-5'>
          <div className='flex flex-col gap-10 basis-4/5'>
            {posts?.filter(
              post => post.title.toLowerCase().includes(postQuery.toLowerCase())
            ).map((post, idx) => (
              <PostItem key={idx} post={post} />
            ))}
          </div>
          <div className='basis-1/5'>
              <div className='text-xs uppercase text-blue-950 font-bold'>
                Популярное:
              </div>
              {popularPosts?.map((post, idx) => (
                <PopularPosts key={idx} post={post} />
              ))}
          </div>
      </div>
    </div>
  )
}
