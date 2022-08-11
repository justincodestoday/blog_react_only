import React, { useState } from "react";
import { Card, Button, Modal, Input, Textarea } from "react-daisyui";

function Post({ data, deletePost, editPost }) {
    const [visible, setVisible] = useState(false);
    const [post, setPost] = useState(data);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    const onChangeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        editPost(post);
        toggleVisible();
    };

    return (
        <Card className="m-5 border-black bg-slate-600 shadow-md shadow-black">
            <Card.Body className="text-white">
                <Card.Title tag="h2" className="font-bold">
                    {data.title}
                </Card.Title>
                <p>{data.body}</p>
                <Card.Actions className="justify-end">
                    <Button
                        color="accent"
                        className="w-full sm:w-1/3 md:w-1/4"
                        onClick={toggleVisible}
                    >
                        Edit
                    </Button>
                    <Modal
                        open={visible}
                        onClickBackdrop={toggleVisible}
                        className="text-black"
                    >
                        <Modal.Header className="font-bold">
                            Edit Post
                        </Modal.Header>

                        <Modal.Body className="">
                            <form onSubmit={onSubmitHandler}>
                                <div className="form-control w-full max-w">
                                    <label className="label">
                                        <span className="label-text font-bold">
                                            Title
                                        </span>
                                    </label>
                                    <Input
                                        name="title"
                                        onChange={onChangeHandler}
                                        value={post.title}
                                    />
                                </div>

                                <br />

                                <div className="form-control w-full max-w">
                                    <label className="label">
                                        <span className="label-text font-bold">
                                            Body
                                        </span>
                                    </label>
                                    <Textarea
                                        className="resize-none"
                                        name="body"
                                        onChange={onChangeHandler}
                                        value={post.body}
                                    />
                                </div>
                                <Button
                                    color="primary"
                                    className="ml-auto mt-3 block w-full"
                                    // onClick={onSubmitHandler}
                                >
                                    Confirm
                                </Button>
                            </form>
                            <Button
                                // color=""
                                className="ml-auto mt-3 block w-full bg-slate-600"
                                onClick={toggleVisible}
                            >
                                Cancel
                            </Button>

                            <Button
                                size="sm"
                                shape="circle"
                                className="absolute right-2 top-2"
                                onClick={toggleVisible}
                            >
                                ✕
                            </Button>
                        </Modal.Body>
                    </Modal>

                    <Button
                        color="error"
                        className="w-full sm:w-1/3 md:w-1/4"
                        onClick={() => deletePost(post.id)}
                    >
                        Delete
                    </Button>
                </Card.Actions>
            </Card.Body>
        </Card>
    );
}

export default Post;
