import React, { useState } from 'react';
import { Clock, User, ArrowRight, X } from 'lucide-react';
import { blogPosts } from '@/data/siteData';

const BlogSection: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<typeof blogPosts[0] | null>(null);

  return (
    <section id="blog" className="py-16 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-[28px] font-bold text-[#1E3A8F] mb-1">Latest from StudyAdvisor Blog</h2>
            <p className="text-[16px] text-gray-500">Tips, guides, and insights for your educational journey</p>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              onClick={() => setSelectedBlog(post)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-[#00C7B1] text-white text-[12px] font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-[18px] font-bold text-[#1E3A8F] mb-2 leading-tight group-hover:text-[#00C7B1] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-[13px] text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </div>
                </div>
                <button className="mt-4 text-[14px] font-semibold text-[#00C7B1] hover:text-[#00b5a1] transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedBlog(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-56">
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button onClick={() => setSelectedBlog(null)} className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 rounded-full p-1.5">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 bg-[#00C7B1] text-white text-[12px] font-semibold rounded-full">
                  {selectedBlog.category}
                </span>
                <h3 className="text-[24px] font-bold text-white mt-2 leading-tight">{selectedBlog.title}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-[13px] text-gray-400 mb-6 pb-4 border-b border-gray-100">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{selectedBlog.author}</span>
                <span>{selectedBlog.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{selectedBlog.readTime}</span>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-[15px] text-gray-600 leading-relaxed mb-4">{selectedBlog.excerpt}</p>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
                  This article provides comprehensive insights and practical advice for students navigating the university admissions process in Pakistan. From understanding entry requirements to preparing for entrance tests, we cover everything you need to know.
                </p>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-4">
                  Whether you're a first-time applicant or looking to transfer to a different institution, our expert guidance will help you make informed decisions about your educational future. Stay tuned for more detailed articles on specific topics.
                </p>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="mt-4 px-6 py-2.5 bg-[#1E3A8F] text-white font-semibold rounded-lg hover:bg-[#0f2b42] transition-all"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
