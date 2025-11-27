'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import api from '../../../api/api';
import WixBlogRenderer from '../../../components/blogRender';

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  image: string;
  imageAlt?: string;
  url?: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  shares: number;
  comments: Comment[];
  estimatedReadTime: number;
  createdAt: string;
  writer: {
    name: string;
    image: string;
    bio: string;
  };
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
}

interface RelatedBlog {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  imageAlt?: string;
  url?: string;
  category: string;
  views: number;
  likes: number;
  comments: any[];
  createdAt: string;
  writer: {
    name: string;
    image: string;
  };
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Comment state
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  
  // Interaction state
  const [hasLiked, setHasLiked] = useState(false);
  const [hasShared, setHasShared] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blogs/${slug}`);
      setBlog(response.data);
      
      // Fetch related blogs
      fetchRelatedBlogs(response.data._id);
    } catch (err) {
      setError('Blog not found');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (blogId: string) => {
    try {
      const response = await api.get(`/blogs/${blogId}/related`);
      setRelatedBlogs(response.data);
    } catch (err) {
      console.error('Error fetching related blogs:', err);
    }
  };

  const handleLike = async () => {
    if (!blog) return;
    
    try {
      const response = await api.post(`/blogs/${blog._id}/like`);
      console.log('Like response:', response.data);
      
      // Update the blog with the response data
      setBlog(prev => prev ? {
        ...prev,
        likes: response.data.likes
      } : null);
      setHasLiked(!hasLiked);
      
      // Show success feedback
      console.log('Blog liked successfully!');
    } catch (err) {
      console.error('Error liking blog:', err);
      // Show user-friendly error message
      alert('Failed to like the blog. Please try again.');
    }
  };

  const handleShare = async () => {
    if (!blog) return;
    
    try {
      const response = await api.post(`/blogs/${blog._id}/share`);
      console.log('Share response:', response.data);
      
      // Update the blog with the response data
      setBlog(prev => prev ? {
        ...prev,
        shares: response.data.shares
      } : null);
      setHasShared(true);
      
      // Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Error sharing blog:', err);
      alert('Failed to share the blog. Please try again.');
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog || !commentContent.trim()) return;
    
    try {
      setSubmittingComment(true);
      const response = await api.post(`/blogs/${blog._id}/comments`, {
        content: commentContent
      });
      
      // Add new comment to the list
      setBlog(prev => prev ? {
        ...prev,
        comments: [...prev.comments, response.data]
      } : null);
      
      setCommentContent('');
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <Link href="/blog" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {/* Blog Header */}
        <header className="mb-6 md:mb-8">
          {/* Author */}
          <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 rounded-lg">
            {blog.writer?.image ? (
              <Image
                src={blog.writer.image}
                alt={blog.writer.name}
                width={40}
                height={40}
                sizes="48px"
                quality={75}
                className="rounded-full md:w-12 md:h-12"
              />
            ) : (
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm md:text-lg text-gray-600">
                  {blog.writer?.name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            <div className='flex flex-col md:flex-row md:gap-2 md:items-top'>
              <p className="font-semibold text-sm md:text-base text-gray-900">{blog.writer?.name || 'Anonymous'}</p>
              <p className="text-xs md:text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
              <p className="text-xs md:text-sm text-gray-500">{blog.estimatedReadTime} min read</p> 
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">{blog.title}</h1>

        </header>

        {/* Blog Image */}
        {blog.image && (
          <div className="relative h-48 md:h-64 lg:h-96 bg-gray-200 rounded-lg overflow-hidden mb-6 md:mb-8">
            {blog.url ? (
              <a 
                href={blog.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer group"
                title="Click to open in new tab"
              >
                <Image
                  src={blog.image}
                  alt={blog.imageAlt || blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  quality={85}
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            ) : (
              <Image
                src={blog.image}
                alt={blog.imageAlt || blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                quality={85}
                priority
                className="object-cover"
              />
            )}
          </div>
        )}

        {/* Blog Content */}
        {/* <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none mb-8 md:mb-12">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article> */}

        <WixBlogRenderer content={blog.content} />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Tags</h3>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {blog.tags.map((tag, index) => (
                <span key={index} className="text-xs md:text-sm text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8 p-3 md:p-4 bg-white rounded-lg shadow-sm">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
              hasLiked 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill={hasLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{blog.likes} Likes</span>
          </button>

          <button
            onClick={handleShare}
            className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
              hasShared 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>{blog.shares} Shares</span>
          </button>
        </div>

        {/* Comments Section */}
        <section className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
            Comments ({blog.comments?.length || 0})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="mb-6 md:mb-8">
            <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment <span className="text-red-500">*</span></label>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm md:text-base"
                rows={3}
                required
              />
              <div className="mt-2 md:mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={submittingComment || !commentContent.trim()}
                  className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {submittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 md:space-y-4">
                         {blog.comments && blog.comments.length > 0 ? (
               blog.comments.map((comment) => (
                 <div key={comment._id} className="bg-white rounded-lg shadow-sm p-3 md:p-4">
                   <div className="flex items-start space-x-2 md:space-x-3">
                     <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                       <span className="text-xs md:text-sm text-gray-600">U</span>
                     </div>
                     <div className="flex-1">
                       <div className="flex items-center space-x-2 mb-1 md:mb-2">
                         <span className="font-semibold text-sm md:text-base text-gray-900">Anonymous User</span>
                         <span className="text-xs md:text-sm text-gray-500">
                           {formatTimeAgo(comment.createdAt)}
                         </span>
                       </div>
                       <p className="text-sm md:text-base text-gray-700">{comment.content}</p>
                     </div>
                   </div>
                 </div>
               ))
             ) : (
              <div className="text-center py-6 md:py-8 text-gray-500 text-sm md:text-base">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </section>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Related Blogs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <article key={relatedBlog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-32 md:h-40 lg:h-48 bg-gray-200">
                    {relatedBlog.image ? (
                      relatedBlog.url ? (
                        <a 
                          href={relatedBlog.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full h-full cursor-pointer group"
                          title="Click to open in new tab"
                        >
                          <Image
                            src={relatedBlog.image}
                            alt={relatedBlog.imageAlt || relatedBlog.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2">
                              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <Image
                          src={relatedBlog.image}
                          alt={relatedBlog.imageAlt || relatedBlog.title}
                          fill
                          className="object-cover"
                        />
                      )
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                      {relatedBlog.category}
                    </span>
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedBlog.slug}`} className="hover:text-blue-600 transition-colors">
                        {relatedBlog.title}
                      </Link>
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                      {relatedBlog.description}
                    </p>
                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                      <span>{relatedBlog.views} views</span>
                      <span>{relatedBlog.likes} likes</span>
                      <span>{relatedBlog.comments?.length || 0} comments</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
