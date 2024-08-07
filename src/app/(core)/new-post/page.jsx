import React from "react";
import PostForm from "@/components/forms/postForm";
import { Card } from "@/components/ui/shadcnComponents/card";

const page = () => {
	return (
		<Card className="min-h-screen p-5 dark:bg-gray-800">
			<PostForm article />
		</Card>
	);
};

export default page;
