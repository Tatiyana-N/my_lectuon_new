import React, { useState, useMemo } from 'react';
import './App.css';

import PostList from './components/PostList';
import PostForm from './components/PostForm';

import PostFilter from './components/PostFilter';


function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Aa', body: 'Description' },
    { id: 2, title: 'Bb', body: 'Description' },
    { id: 3, title: 'Cc', body: 'Description' },

  ])

  const [filter, setFilter] = useState({sort:'', query: ''})



  const sortedPosts = useMemo(() => {
    console.log('AAAAAA')
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;

  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.includes(filter.query))

  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])

  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))

  }

 

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margin:'15px'}}/>
      <PostFilter
                filter={filter}
                setFilter={setFilter} 
      />
    
         <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
       

    </div>
  );
}

export default App;
