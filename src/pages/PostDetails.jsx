import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import usePost from "../hooks/usePost";
import useUser from "../hooks/useUser";
import useComments from "../hooks/useComments";
import { useDeletePost } from "../hooks/useMutatePost";
import LoadingSpinner from "../components/LoadingSpinner";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { toast } from "react-hot-toast";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading: postLoading, error: postError } = usePost(id);
  const { user, loading: userLoading } = useUser(post?.userId);
  const { comments, loading: commentsLoading } = useComments(id);
  const { mutate: deletePost, loading: deleting } = useDeletePost();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setDeleteModal(false);
    }
  };

  if (postError)
    return <div className="text-red-500 p-4">Error: {postError}</div>;
  if (postLoading) return <LoadingSpinner />;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <Link to="/" className="inline-block mb-6 text-blue-600 hover:underline">
        ← Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

          <div>
            <button
              onClick={() => setDeleteModal(true)}
              disabled={deleting}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete Post"}
            </button>
            <Link
              to={`/posts/${id}/edit`}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Post
            </Link>
          </div>
        </div>
        {!userLoading && user && (
          <p className="text-gray-600 mb-4">
            By: {user.name} ({user.email})
          </p>
        )}
        <p className="text-gray-800">{post.body}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {commentsLoading ? (
          <LoadingSpinner />
        ) : comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="border-b pb-4">
                <h3 className="font-semibold">{comment.name}</h3>
                <p className="text-gray-600 text-sm mb-1">{comment.email}</p>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <DeleteConfirmation
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
