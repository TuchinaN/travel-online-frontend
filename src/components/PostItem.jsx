import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown'

export const PostItem = ({post}) => {
    if (!post) {
        return (
            <div className='text-xl text-center text-blue-950 py-10'>
                Загрузка...
            </div>
        )
    }
    return ( 
        <Link to={`/${post._id}`}>
            <div className='flex flex-col basis-1/4 flex-grow'>
                <div className={
                        post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'
                    }
                >
                    {post.imgUrl && (
                        <img
                            src={`${process.env.REACT_APP_URL}${post.imgUrl}`}
                            alt='img'
                            className='object-cover w-full'
                        />
                    )}
                </div>
                <div className='flex justify-between items-center pt-2'>
                    <div className='text-sm text-blue-950 opacity-80'>
                        {post.username}
                    </div>
                    <div className='text-sm text-blue-950 opacity-80'>
                        <Moment date={post.createdAt} format='D MMM YYYY'/>
                    </div>
                </div>
                <div className='text-blue-950 text-xl'>{post.title}</div>

                <div className='text-blue-950 text-sm italic'>{post.place}</div>
                <ReactMarkdown className='text-blue-950 text-sm pt-4 line-clamp-4' children={post.text} />

                <div className='flex gap-3 items-center mt-2'>
                    <button className='flex items-center justify-center gap-2 text-sm text-blue-950 opacity-80'>
                        <AiFillEye /> <span>{post.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-sm text-blue-950 opacity-80'>
                        <AiOutlineMessage />{' '}
                        <span>{post.comments?.length || 0}</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}
