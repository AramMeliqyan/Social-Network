import { useEffect, useRef, useState } from "react";
import { addPost, deletePosts, getAllPosts } from "../../../helpers/api";
import { IPost } from "../../../helpers/types";
import { BASE } from "../../../helpers/default";

export const Photos = () => {
    const photo = useRef<HTMLInputElement | null>(null);
    const [text, setText] = useState<string>("");
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        getAllPosts().then((response) => {
            setPosts(response.payload as IPost[]);
        });
    }, []);

    const handlePostAdd = () => {
        const file = photo.current?.files?.[0];
        if (file) {
            const form = new FormData();
            form.append("photo", file);
            form.append("content", text);
            addPost(form).then((response) => {
                setPosts([...posts, response.payload as IPost]);
                setText("");
            });
        }
    };

    const handleDelete = (id: number) => {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (confirmed) {

            deletePosts(id)
                .then(() => {
                    confirm
                    setPosts(posts.filter(x => x.id !== id));
                });
        }
    }

    return (
        <div className="container mx-auto mt-5 px-4">
            <h1 className="text-center text-3xl font-bold mb-6">Photos</h1>
            <div className="mb-6 flex flex-col items-center">
                <input
                    type="file"
                    ref={photo}
                    className="form-control mb-4 file:btn file:btn-outline-primary w-full max-w-sm"
                />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="form-control mb-4 p-3 rounded-lg shadow w-full max-w-sm border border-gray-300"
                    placeholder="Add a caption..."
                />
                <button
                    onClick={handlePostAdd}
                    className="btn btn-primary w-full max-w-sm py-2 rounded-lg shadow-md"
                >
                    Upload
                </button>
            </div>
            <div className="row">
                {posts.map(elm => (
                    <div key={elm.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={BASE + elm.picture}
                                className="card-img-top"
                                alt={elm.title}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Title: {elm.title}</h5>
                                <p className="card-text">Likes: {elm.likes.length || 0}
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ALUMqHcuhiRmymnRq3CwK8gxRzvg6CHoDQ&s"
                                        style={{ width: "20px", height: "15px" }}
                                    />
                                </p>
                                <button
                                    className="btn btn-danger w-150"
                                    onClick={() => handleDelete(elm.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};