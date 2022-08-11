import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import { v4 as uuid } from "uuid";
import { Input, Button, Navbar, Dropdown, Form } from "react-daisyui";

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
        e.target.reset();
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
            <Navbar className="bg-purple-900">
                <div className="flex-1">
                    <Button
                        className="text-xl normal-case text-white"
                        color="ghost"
                    >
                        BLOGS
                    </Button>
                </div>
                <div className="flex-none gap-2">
                    <Form>
                        <Input bordered type="text" placeholder="Search" />
                    </Form>
                    <Dropdown vertical="end">
                        <Button color="ghost" className="avatar" shape="circle">
                            <div className="w-10 rounded-full">
                                <img
                                    src="https://api.lorem.space/image/face?hash=33791"
                                    alt=""
                                />
                            </div>
                        </Button>
                        <Dropdown.Menu className="w-52 menu-compact">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Navbar>
            <div className="flex pt-5 justify-center">
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
