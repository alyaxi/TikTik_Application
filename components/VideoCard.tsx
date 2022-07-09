import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video;
}
const VideoCard = ({ post }: IProps) => {
  
  const [isHover, setIsHover] = useState(false)
  const [Playing, setPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if(Playing) {
        videoRef.current?.pause();
        setPlaying(false)
    } else {
        videoRef.current?.play();
        setPlaying(true)
    }
  }
    console.log(post.postedBy.userName);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile picture"
                  layout="responsive"
                ></Image>
              </>
            </Link>
          </div>
          <Link href="/">
            <div className="flex items-center gap-2">
              <p className="flex gap-2 itms-center md:text-md font-bold text-primary">
                {post.postedBy.userName}{" "}
                <GoVerified className="text-blue-400 text-md " />
              </p>
              <p className="font-mediumn capitalize text-xs text-gray-500 hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => {setIsHover(true)}}
          onMouseLeave={() => {setIsHover(false)}}
        >
          <Link href="/">
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              className="lg:w[600px] h-[300px] md:h-[400px] lg:h-[430px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>
          {isHover && (
          <div className="flex absolute bottom-1 left-12 cursor-pointer md:left-14 lg:left-8 gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
            
                {Playing ? (
                    <div>
                        <button onClick={onVideoPress} className="text-black text-1xl lg:text-2xl m-1">
                        <BsFillPauseFill />
                        </button>
                    </div>
                ): (
                    <button onClick={onVideoPress} className="text-black text-1xl lg:text-2xl m-1">
                        <BsFillPlayFill />
                    </button>
                )}
                {isMuted ? (
                    <div>
                        <button onClick={() => setIsMuted(false)} className="text-black text-1xl lg:text-2xl m-1">
                        <HiVolumeOff />
                        </button>
                    </div>
                ): (
                    <button onClick={() => setIsMuted(true)} className="text-black text-1xl lg:text-2xl m-1">
                        <HiVolumeUp />
                    </button>
                )}
           
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
