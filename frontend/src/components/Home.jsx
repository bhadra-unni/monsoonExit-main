//Create the Home UI for the BlogAPP(Cards are preferrred; You may choose your UI preference )


//Write your code here
import React, { useEffect } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try{
      const response = await axios.get("http://localhost:3001/get");
      setBlogs(response.data);
    }catch(error){
      console.log(error);
    }
  };

  const handleDelete = async (id)=> {
    try{
      const res =await axios.delete(`http://localhost:3001/delete/${id}`);
      alert(res.data.message);
      getBlogs();
    }catch(error){
      console.log(error);
    }
  }

  const handleUpdate = (blog) => {
    navigate(`/add`, { state: { blog } } );
  };

  return (
    <Box sx={{ padding: 4, display: 'flex' }}>
      <Grid container spacing={2} sx={{ padding: 2 , justifyContent: 'center'}} >
      {blogs.map((blog, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia component='img' height='200' image={blog.img_url} alt={blog.title}/>
            <CardContent>
              <Typography variant='caption' color='text.secondary'>{blog.title}</Typography>
              <Typography variant='subtitle1' color='black'>{blog.content}</Typography><br />
              <Button variant='contained' color='secondary' onClick={() => handleDelete(blog._id)}>DELETE</Button> &nbsp;
              <Button variant='contained' color='secondary' onClick={() => handleUpdate(blog)}>UPDATE</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>
    </Box>
  )
}

export default Home