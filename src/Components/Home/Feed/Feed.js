import React, {useState, useEffect} from 'react'
import '../../../Style/Feed.css'
import Tweetbox from '../Tweetbox'
import Post from './Post'
import db, {timestamp} from '../../../Database/firebase'
import firebase from 'firebase';

const Feed = ({name, avatar, email}) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        db.collection("posts").orderBy("time", "desc").onSnapshot((snapshot) =>

            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        );


        db.collection('users').doc(email).set({
            username: name,
            email: email,
            avatar: avatar,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        })


        setLoading(false)
    }, [avatar]);

    return (
        <div className='feed'>
            <div className='feed-header'>
                <h2>Home </h2>
            </div>
            <Tweetbox avatar={avatar} name={name}/>
            {
                posts.map((post) =>
                    <Post
                        key={post.data.text}
                        displayname={post.data.displayname}
                        username={post.data.username}
                        verification={post.data.verification}
                        text={post.data.text}
                        avatar={post.data.avatar}
                        image={post.data.image}
                        time={post.data.time}
                        like={post.data.like}
                        name={name}
                        avatarr={avatar}
                        postid={post.id}
                        reply={post.data.reply}
                        who={post.data.who}
                        like={post.data.like}
                    />
                )}

            {
                loading ?
                    <div>

                    </div> :
                    <div className='loader'>

                    </div>
            }

        </div>
    )
}

export default Feed
