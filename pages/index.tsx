import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import {Video} from "../types"
import VideoCard from "../components/VideoCard";
import NoResult from "../components/NoResult";
import { BASE_URL } from "../utils/index1";

interface IProp {
  videos: Video[]
}
const Home = ({videos}: IProp) => {
  // console.log(videos);
  
  
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video) => (
          <VideoCard post= {video} key={video._id}/>
        ))
      ): (
        <NoResult text={"No Videos"}/>
      )}
    </div>
  )
};

export const getServerSideProps = async ({query: {topic}}: {query: {topic: string}}) => {
  let response = null;
  if(topic){

    response = await axios.get(`http://localhost:3000/api/discover/${topic}`);
  }else{

    response = await axios.get(`http://localhost:3000/api/post`);
  }

  // console.log(data[0].video);
  

  
  return{
    props: {
      videos: response.data
    }
  }
};
export default Home;
