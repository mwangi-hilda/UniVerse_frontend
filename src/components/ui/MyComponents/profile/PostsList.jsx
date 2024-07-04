import React from "react";
import PostCard from "@/components/ui/MyComponents/cards/PostCard";
import PostSkeleton from "../cards/skeletons/Skeleton";
import { useProfilePosts } from "@/hooks/profile";
import { formatCreatedAt } from "@/lib/utils";

const PostsList = ({ id, is_owner }) => {
	const { data: postData, isLoading, error } = useProfilePosts(id);
	console.log(postData);
	return (
		<div className="flex flex-col w-full gap-y-3">
			{isLoading ? (
				<PostSkeleton />
			) : (
				postData?.results?.map((post, index) => (
					<PostCard
						key={index}
						postId={post.id}
						first_name={post.author.user.first_name}
						last_name={post.author.user.last_name}
						pfpImage={post.author.profile_picture}
						isVerified={post.author.is_verified}
						isLiked={post.is_liked}
						isFollowingCreator={post.is_following_creator}
						likeCount={post.likes_count}
						isSaved={post.is_bookmarked}
						bookmarkCount={post.bookmarks_count}
						type="Student"
						date={formatCreatedAt(post.created_at)}
						title={post.title}
						content={post.content}
						postImage={post.media}
						smallImage
						forProfile
						isOwner={true}
					/>
				))
			)}
		</div>
	);
};

export default PostsList;
