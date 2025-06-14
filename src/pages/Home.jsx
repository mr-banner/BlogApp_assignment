import { useState } from "react";
import { Link } from "react-router-dom";
import usePosts from "../hooks/usePosts";
import { useDeletePost } from "../hooks/useMutatePost";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { toast } from "react-hot-toast";

export default function Home() {
  const { posts, loading, error } = usePosts();
  const { mutate: deletePost, loading: deleting } = useDeletePost();
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    postId: null,
  });

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setDeleteModal({ isOpen: false, postId: null });
    }
  };

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="mt-[70px]">
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <Link
          to="/create-post"
          className="bg-blue-600 text-white px-4 py-2 max-h-11 rounded hover:bg-blue-300 hover:text-slate-900 transition"
        >
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={() => setDeleteModal({ isOpen: true, postId: post.id })}
          />
        ))}
      </div>

      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, postId: null })}
        onConfirm={() => handleDelete(deleteModal.postId)}
        loading={deleting}
      />
    </div>
  );
}
