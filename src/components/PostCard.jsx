import { Link } from 'react-router-dom';

export default function PostCard({ post, onDelete }) {
  return (
    <div className="border w-full rounded-2xl p-4 shadow hover:shadow-md transform-gpu hover:[transform:translateZ(150px)] cursor-pointer hover:border-slate-400 transition">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">
        {post.body.length > 100 ? `${post.body.substring(0, 200)}...` : post.body}
        <Link
          to={`/posts/${post.id}`}
          className="ml-3 text-slate-600 hover:underline"
        >
          Read More
        </Link>
      </p>
      <div className="flex justify-between items-center">
        
        <div className="space-x-2">
          <Link
            to={`/posts/${post.id}/edit`}
            className="px-3 py-1 bg-blue-600 text-white w-full rounded hover:bg-blue-300 hover:text-slate-900 transition"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(post.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
