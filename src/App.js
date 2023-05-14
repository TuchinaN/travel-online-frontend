import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'

import {MainPage} from './pages/MainPage.jsx'
import {PostsPage} from './pages/PostsPage.jsx'
import {PostPage} from './pages/PostPage.jsx'
import {EditPostPage} from './pages/EditPostPage.jsx'
import {AddPostPage} from './pages/AddPostPage.jsx'
import {RegisterPage} from './pages/RegisterPage.jsx'
import {LoginPage} from './pages/LoginPage.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/auth/authSlice.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/api/' element={<MainPage />} />
        <Route path='api/posts' element={<PostsPage />} />
        <Route path='/api/:id' element={<PostPage />} />
        <Route path='/api/:id/edit' element={<EditPostPage />} />
        <Route path='/api/new' element={<AddPostPage />} />
        <Route path='/api/register' element={<RegisterPage />} />
        <Route path='/api/login' element={<LoginPage />} />
      </Routes>

      <ToastContainer position='bottom-right' />
    </Layout>
  );
}

export default App;
