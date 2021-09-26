import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../conf";
import { getPosts } from "../services/posts.services";
import { postsActions } from "../store/actions";

export default function usePosts(username, userId, page, setPage) {
    // const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(null);
    const dispatch = useDispatch();
    const posts = useSelector(store => store.posts.posts);

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            //si recibimos el username es porque estamos en un perfil
            username && setPage(1);
            username
                    ? dispatch(postsActions.getPostsUserRequest({username}))
                    : dispatch(postsActions.getPostsAllRequest({idUser: userId }))

                setLoading(false)
        }
        getData();

    }, [username]);

    useEffect(() => {
        setLoading(true);

        const getData = async () => {
            if (page > 1) {
                username
                        ? dispatch(postsActions.getPostsUserRequest({username, page}))
                        : dispatch(postsActions.getPostsAllRequest({idUser: userId, page }))

                setLoading(false)
            }
        }
        getData();

    }, [page]);

    return{
        posts,
        loading
    }
}

// export default function usePosts(username, userId, page, setPage) {
//     // const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(null);
//     const dispatch = useDispatch();
//     const posts = useSelector(store => store.posts.posts);



//     useEffect(() => {
//         setLoading(true)
//         const getData = async () => {
//             //si recibimos el username es porque estamos en un perfil
//                 const res = username
//                     ? await getPosts(`${API_URL}/posts/profile/${username}`)
//                     : await getPosts(`${API_URL}/posts/timeline/${userId}`)

//                 username && setPage(1);
//                 setLoading(false)
//                 // res && setPosts(res.docs)
//         }
//         getData();

//     }, [username]);

//     useEffect(() => {
//         setLoading(true);

//         // const getData = async () => {
//         //     if (page > 1) {
//         //         const res = username
//         //                 ? await getPosts(`${API_URL}/posts/profile/${username}?page=${page}`)
//         //                 : await getPosts(`${API_URL}/posts/timeline/${userId}?page=${page}`)
                
//         //         setLoading(false)
//         //         res && setPosts((prePosts) => prePosts.concat(res.docs))
//         //     }
//         // }
//         // getData();

//     }, [page]);

//     return{
//         posts,
//         loading
//     }
// }