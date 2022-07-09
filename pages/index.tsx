import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import {Video} from "../types"
import VideoCard from "../components/VideoCard";
import NoResult from "../components/NoResult";

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

export const getServerSideProps = async () => {
  const {data} = await axios.get('http://localhost:3000/api/post');

  // console.log(data[0].video);
  

  
  return{
    props: {
      videos: data
    }
  }
};
export default Home;
