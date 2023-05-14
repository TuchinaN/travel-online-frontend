import axios from '../utils/axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { PostItem } from '../components/PostItem'
import { useSearchParams } from 'react-router-dom'

export const PostsPage = () => {

  const [posts, setPosts] = useState([])
  const fetchMyPosts = async () => {
    try {
      const {data} = await axios.get('/posts/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const postQuery = searchParams.get('post') || ''

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const query = form.search.value;

    setSearchParams({post: query})
  }

  useEffect(() => {
    fetchMyPosts()
  }, [])

  return (
    <div className='w-2/3 mx-auto py-10 flex flex-col gap-10'>
      <div className='py-2'>
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
      {posts?.filter(
        post => post.title.toLowerCase().includes(postQuery.toLowerCase())
      ).map((post, idx) => (
        <PostItem post={post} key={idx} />
      ))}
    </div>
  )
}
