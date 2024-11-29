import { MessageCircle, ThumbsUp } from "lucide-react";


const PopularBlogs = () => {
    const blogs = [
        {
            title: "Blog 1",
            author: "lorem1.",
            likes: 10,
            comments: 10,
        },
        {
            title: "Blog 2",
            author: "lorem2.",
            likes: 10,
            comments: 10,
        },
        {
            title: "Blog 3",
            author: "lorem3.",
            likes: 10,
            comments: 10,
        },
    ]

    return (
        <div className="bg-white p-5 w-[23rem] mt-4 border ml-5 roudned">
            <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
            <ul>
                {blogs.map((blog, index) => (
                    <li key={index} className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="font-bold mb-2">{blog.title}</span>
                        </div>
                        <span className="text-gray-600">Publish by {blog.author}</span>
                        <div className="flex items-center mt-2">
                            <MessageCircle size={16}></MessageCircle>
                            <span className="text-gray-500 mr-5 ml-1">{blog.likes}</span>

                            <ThumbsUp size={16}></ThumbsUp>
                            <span className="text-gray-500 mr-2 ml-2">
                                {blog.comments}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PopularBlogs;
