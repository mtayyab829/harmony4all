'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogAPI } from '../../lib/api';

interface Blog {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  imageAlt?: string;
  url?: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  shares: number;
  comments: any[];
  estimatedReadTime: number;
  createdAt: string;
  publishedAt?: string;
  writer: {
    name: string;
    image: string;
  };
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page: number = 1) => {
    try {
      setLoading(true);
      setError('');
      const response = await blogAPI.getBlogs({ page, limit: 12 });

      // Handle the response structure: { blogs: [...], pagination: {...} }
      // The API returns data directly, not wrapped in another data object
      const blogsData = response.blogs || response.data?.blogs || response.data || [];
      const paginationData = response.pagination || response.data?.pagination;

      // Blogs are already sorted by published date (newest first) from the backend
      setBlogs(Array.isArray(blogsData) ? blogsData : []);
      setPagination(paginationData || null);

      // Update current page if it's different from the requested page
      if (paginationData && paginationData.currentPage !== page) {
        setCurrentPage(paginationData.currentPage);
      }
    } catch (err) {
      setError('Failed to load blogs');
      console.error('Error fetching blogs:', err);
      setBlogs([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => fetchBlogs(1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Our Blog
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover insights, tutorials, and stories from our team. Stay updated with the latest trends and knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-12 md:py-16 lg:py-20">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-sm md:text-base text-gray-500">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {blogs.map((blog) => (
              <article key={blog._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100 overflow-hidden transform hover:-translate-y-2">
                <Link href={`/blog/${blog.slug}`} className="block">
                {/* Blog Image */}
                <div className="relative h-40 md:h-48 lg:h-56 bg-gradient-to-br from-gray-100 to-gray-200">
                  {blog.image ? (
                    blog.url ? (
                      <a 
                        href={blog.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full h-full cursor-pointer group/image"
                        title="Click to open in new tab"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Image
                          src={blog.image}
                          alt={blog.imageAlt || blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </a>
                    ) : (
                      <Image
                        src={blog.image}
                        alt={blog.imageAlt || blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <svg className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-1 md:mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs md:text-sm font-medium">No Image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Read Time Badge */}
                  <div className="absolute top-2 md:top-3 lg:top-4 right-2 md:right-3 lg:right-4">
                    <span className="inline-block bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 md:px-2.5 py-0.5 md:py-1 rounded-full">
                      {blog.estimatedReadTime || 5} min read
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-4 md:p-6 lg:p-8">
                  {/* Title */}
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4 line-clamp-2 group-hover:underline transition-colors duration-300 leading-tight">
                    {blog.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                    <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {blog.views}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {blog.likes}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        {blog.comments?.length || 0}
                      </span>
                    </div>
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      {blog.writer?.image ? (
                        <Image
                          src={blog.writer.image}
                          alt={blog.writer.name}
                          width={32}
                          height={32}
                          className="rounded-full ring-2 ring-gray-100 md:w-10 md:h-10"
                        />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-gray-100">
                          <span className="text-xs md:text-sm font-semibold text-white">
                            {blog.writer?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-xs md:text-sm font-semibold text-gray-900">{blog.writer?.name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-500">{formatDate(blog.publishedAt || blog.createdAt)}</p>
                      </div>
                    </div>
                    
                    {/* Read More Arrow */}
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
            {/* Page Info */}
            <div className="text-sm md:text-base text-gray-600 mb-4 sm:mb-0">
              Showing {blogs.length > 0 ? ((currentPage - 1) * pagination.limit) + 1 : 0} to{' '}
              {Math.min(currentPage * pagination.limit, pagination.totalBlogs)} of{' '}
              {pagination.totalBlogs} blogs
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage || loading}
                className="flex items-center px-3 md:px-4 py-2 text-sm md:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show first page, last page, current page, and pages around current page
                    return page === 1 ||
                           page === pagination.totalPages ||
                           (page >= currentPage - 1 && page <= currentPage + 1);
                  })
                  .map((page, index, array) => {
                    // Add ellipsis if there's a gap
                    const showEllipsis = index > 0 && page - array[index - 1] > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && (
                          <span className="px-2 py-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          disabled={loading}
                          className={`px-3 md:px-4 py-2 text-sm md:text-base font-medium rounded-lg transition-colors duration-200 ${
                            page === currentPage
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage || loading}
                className="flex items-center px-3 md:px-4 py-2 text-sm md:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Jump to Page (for larger page counts) */}
          {pagination.totalPages > 5 && (
            <div className="flex items-center justify-center mt-4 space-x-2">
              <span className="text-sm text-gray-600">Go to page:</span>
              <input
                type="number"
                min="1"
                max={pagination.totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= pagination.totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="text-sm text-gray-600">of {pagination.totalPages}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
