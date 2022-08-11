import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import { v4 as uuid } from "uuid";
import { Input, Button } from "react-daisyui";

function App() {
    const [posts, setPosts] = useState(
        JSON.parse(localStorage.getItem("posts")) || []
    );

    const [post, setPost] = useState({
        id: uuid(),
        title: "",
        body: "",
        userId: 1,
    });

    const onChangeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let posts = JSON.parse(localStorage.getItem("posts"));
        posts.unshift(post);
        localStorage.setItem("posts", JSON.stringify(posts));
        getPosts();
        setPost({ ...post, id: uuid() });
    };

    const getPosts = async () => {
        let url = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await url.json();

        if (localStorage.getItem("posts")) {
            setPosts(JSON.parse(localStorage.getItem("posts")));
        } else {
            setPosts(data);
            localStorage.setItem("posts", JSON.stringify(data));
        }
        return data;
    };

    const deletePost = (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            let posts = JSON.parse(localStorage.getItem("posts"));
            posts = posts.filter((post) => post.id != id);
            localStorage.setItem("posts", JSON.stringify(posts));
            getPosts();
        }
    };

    const editPost = (updatedPost) => {
        let posts = JSON.parse(localStorage.getItem("posts"));
        posts.map((post) => {
            if (post.id == updatedPost.id) {
                return (
                    (post.title = updatedPost.title),
                    (post.body = updatedPost.body)
                );
            }
        });
        localStorage.setItem("posts", JSON.stringify(posts));
        getPosts();
    };

    let showPosts = !localStorage.getItem("posts") ? (
        <h2>No posts to show</h2>
    ) : (
        JSON.parse(localStorage.getItem("posts")).map((post) => (
            <Post
                key={post.id}
                data={post}
                deletePost={deletePost}
                editPost={editPost}
            />
        ))
    );
    useEffect(() => {
        getPosts();
        // setPosts(getPosts().then((data) => data));
    }, []);

    return (
        <div className="bg-purple-300">
            <div className="flex py-5 justify-center">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 p-5 rounded-lg">
                    <form action="" onSubmit={onSubmitHandler}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">
                                    Title
                                </span>
                            </label>
                            <Input name="title" onChange={onChangeHandler} />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">
                                    Body
                                </span>
                            </label>
                            <Input name="body" onChange={onChangeHandler} />
                        </div>
                        <Button className="bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 ml-auto mt-5 w-full">
                            Add Post
                        </Button>
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                {showPosts}
            </div>
        </div>
    );
}

export default App;
