import React, { useState } from 'react';

const DiscussionForum = ({ courseId, courseName }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Mwangi',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      title: 'Question about Module 3 assignment',
      content: 'I\'m having trouble understanding the concept of state management. Can someone help explain?',
      timestamp: '2 hours ago',
      replies: 3,
      likes: 5,
      category: 'question'
    },
    {
      id: 2,
      author: 'John Kamau',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      title: 'Great course! Sharing my project',
      content: 'Just completed the final project. Here\'s what I built using the concepts from this course...',
      timestamp: '5 hours ago',
      replies: 8,
      likes: 12,
      category: 'showcase'
    }
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'question' });
  const [showNewPost, setShowNewPost] = useState(false);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        title: newPost.title,
        content: newPost.content,
        timestamp: 'Just now',
        replies: 0,
        likes: 0,
        category: newPost.category
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', category: 'question' });
      setShowNewPost(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'question': return '❓';
      case 'showcase': return '🎯';
      case 'discussion': return '💬';
      default: return '📝';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'showcase': return 'bg-green-100 text-green-800';
      case 'discussion': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Discussion Forum - {courseName}
          </h2>
          <button
            onClick={() => setShowNewPost(!showNewPost)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            New Post
          </button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <form onSubmit={handleSubmitPost} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Post title..."
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="What would you like to discuss?"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-between items-center">
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="question">Question</option>
                <option value="discussion">Discussion</option>
                <option value="showcase">Showcase</option>
              </select>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {getCategoryIcon(post.category)} {post.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>By {post.author}</span>
                      <span>{post.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-orange-500">
                        <span>👍</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-orange-500">
                        <span>💬</span>
                        <span>{post.replies}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;