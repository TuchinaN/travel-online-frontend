import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deletePost } from '../redux/features/post/postSlice'
import { CommentItem } from '../components/CommentItem'
import axios from '../utils/axios'
import { createComment, getPostComments } from '../redux/features/comment/commentSlice'
import {checkIsAuth} from '../redux/features/auth/authSlice'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const isAuth = useSelector(checkIsAuth)
    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const deletePostHandler = () => {
        try {
            dispatch(deletePost(params.id))
            toast('Пост был удален')
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        try {
            const postId = params.id 
            dispatch(createComment({postId, comment}))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])



    if (!post) {
        return (
            <div className='text-xl text-center text-blue-950 py-10'>
                Загрузка...
            </div>
        )
    }
    return (
        <div>
            <button className='flex justify-center items-center bg-blue-950 text-xs text-white rounded-sm py-2 px-4'>
                <Link className='flex' to={'/'}>
                    Назад
                </Link>
            </button>

            <div className='flex gap-10 py-8'>
                <div className='w-2/3'>
                    <div className='flex flex-col basis-1/4 flex-grow'>
                        <div
                            className={
                                post?.imgUrl
                                    ? 'flex rouded-sm h-80'
                                    : 'flex rounded-sm'
                            }
                        >
                            {post?.imgUrl && (
                                <img
                                    src={`${process.env.REACT_APP_URL}${post.imgUrl}`}
                                    alt='img'
                                    className='object-cover w-full'
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex justify-between items-center pt-2'>
                        <div className='text-sm text-blue-950 opacity-80'>
                            {post.username}
                        </div>
                        <div className='text-sm text-blue-950 opacity-80'>
                            <Moment date={post.createdAt} format='D MMM YYYY' />
                        </div>
                    </div>
                    <div className='text-blue-950 text-xl'>{post.title}</div>
                    <div className='text-blue-950 text-sm italic'>{post.place}</div>
                    <ReactMarkdown className='text-blue-950 text-sm pt-4 line-clamp-4' children={post.text} />

                    <div className='flex gap-3 items-center mt-2 justify-between'>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex items-center justify-center gap-2 text-sm text-blue-950 opacity-80'>
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className='flex items-center justify-center gap-2 text-sm text-blue-950 opacity-80'>
                                <AiOutlineMessage />{' '}
                                <span>{post.comments?.length || 0} </span>
                            </button>
                        </div>
                        
                        {user?._id === post.author && (
                            <div className='flex gap-3 mt-4'>
                                <button className='flex items-center justify-center gap-2 text-blue-950 opacity-80'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link> 
                                </button>
                                <button 
                                    onClick={deletePostHandler}
                                    className='flex items-center justify-center gap-2 text-blue-950 opacity-80'>
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                    
                </div>
                <div className='w-1/3 p-8 bg-blue-950 flex flex-col gap-2 rounded-sm'>
                    { isAuth && (<form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Ваши мысли...'
                            className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
                        />
                        <button 
                            type='submit'
                            onClick={handleSubmit}
                            className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                        >
                            Отправить
                        </button>
                    </form>
                    )}
                    
                    {
                        comments?.map((cmt) => (
                            <CommentItem key={cmt._id} cmt={cmt} />
                    ))}
                </div>
            </div>
        </div>
    )
}
