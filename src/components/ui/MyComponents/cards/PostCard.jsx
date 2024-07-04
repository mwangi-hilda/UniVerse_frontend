"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/shadcnComponents/card";
import Image from "next/legacy/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import MyCardHeader from "./MyCardHeader";
import MyCardFooter from "./MyCardFooter";
const PostCard = ({
	postId,
	title,
	content,
	postImage,
	isPostDetails = false,
	isLiked,
	isSaved,
	likeCount,
	smallImage,
	bookmarkCount,
	profileId,
	pfpImage,
	first_name,
	last_name,
	isVerified,
	type,
	date,
}) => {
	const sanitizedContent = DOMPurify.sanitize(content);
	const containsHtml = /<\/?[a-z][\s\S]*>/i.test(content);

	//* edit post dialog

	const [isExpanded, setIsExpanded] = useState(false);
	const max_length = 250;

	const getTruncatedContent = (text) => {
		if (typeof text !== "string") {
			text = String(text); // Ensure text is a string
		}
		if (text.length <= max_length) {
			return text;
		}
		return text.substring(0, max_length) + "...";
	};

	const truncatedContent = getTruncatedContent(sanitizedContent);

	// const getTruncatedContent = (text, max_length) => {
	// 	if (text.length <= max_length && typeof text === "string") {
	// 		// setIsShort(true);
	// 		return text;
	// 	}
	// 	return text.substring(0, max_length) + "...";
	// };

	return (
		<Card className="flex w-[58%] min-w-[33.25rem] py-[0.3rem] flex-col items-start rounded-[0.5rem] bg-white dark:bg-muted">
			<MyCardHeader
				profileId={profileId}
				pfpImage={pfpImage}
				first_name={first_name}
				last_name={last_name}
				isVerified={isVerified}
				type={type}
				date={date}
			/>

			{isPostDetails ? (
				<CardContent className="flex flex-col items-start gap-[0.75rem] self-stretch h-[70%]">
					<div className="self-stretch h-[30%]">
						{title && <p className="sub-heading-3 p-1">{title}</p>}
						<div
							dangerouslySetInnerHTML={{
								__html: sanitizedContent,
							}}
						/>
					</div>
					{postImage ? (
						smallImage ? (
							<div className="rounded-[0.25rem] h-[22rem] w-full relative">
								<Image
									src={postImage}
									alt="Post Image"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						) : (
							<div className="rounded-[0.25rem] min-h-[30rem] w-full relative">
								<Image
									src={postImage}
									alt="Post Image"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						)
					) : (
						<></>
					)}
				</CardContent>
			) : (
				<CardContent className="flex flex-col items-start gap-[0.75rem] self-stretch h-[70%]">
					<div className="self-stretch h-[30%]">
						{containsHtml ? (
							<Link href={`/post/${postId}`}>
								{title && (
									<p className="sub-heading-3 p-1">{title}</p>
								)}
								<div
									dangerouslySetInnerHTML={{
										__html: isExpanded
											? sanitizedContent
											: truncatedContent,
									}}
								/>
								{sanitizedContent.length > max_length && (
									<p
										className="text-blue-500 cursor-pointer"
										onClick={() =>
											setIsExpanded(!isExpanded)
										}>
										{isExpanded ? "Show Less" : "Read More"}
									</p>
								)}
							</Link>
						) : (
							<div>
								{title && (
									<p className="sub-heading-3 p-1">{title}</p>
								)}
								<div
									dangerouslySetInnerHTML={{
										__html: isExpanded
											? sanitizedContent
											: truncatedContent,
									}}
								/>
								{sanitizedContent.length > max_length && (
									<p
										className="text-blue-500 cursor-pointer"
										onClick={() =>
											setIsExpanded(!isExpanded)
										}>
										{isExpanded ? "Show Less" : "Read More"}
									</p>
								)}
							</div>
						)}
					</div>
					{postImage ? (
						smallImage ? (
							<div className="rounded-[0.25rem] h-[22rem] w-full relative">
								<Image
									src={postImage}
									alt="Post Image"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						) : (
							<div className="rounded-[0.25rem] min-h-[30rem] w-full relative">
								<Image
									src={postImage}
									alt="Post Image"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						)
					) : (
						<></>
					)}
				</CardContent>
			)}
			<MyCardFooter
				postId={postId}
				isSaved={isSaved}
				isLiked={isLiked}
				likeCount={likeCount}
				bookmarkCount={bookmarkCount}
			/>
		</Card>
	);
};

export default PostCard;
