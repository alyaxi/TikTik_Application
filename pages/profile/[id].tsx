import { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { IUser, Video } from "../../types";
interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideo: Video[];
  };
}
const Profile = ({ data }: IProps) => {
  const [showUserVideo, setShowUserVideo] = useState(true);
  console.log(data);
  const videos = showUserVideo ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideo ? "border-b-2 border-black" : "text-gray-400";
  const { user, userVideos, userLikedVideo } = data;
  const [videoList, setVideoList] = useState<Video[]>([])

  useEffect(() => {
    if(showUserVideo) {
        setVideoList(userVideos)
    }else {
        setVideoList(userLikedVideo)
        
    }
  }, [showUserVideo, userVideos,userLikedVideo])
  return (
    <div className="w-full">
      <div className=" flex gap-6 md:gap-5 mb-4 bg-white w-full">
        <div className="w-8 h-16 md:w-20 md:h-20">
          <Image
            src={user.image}
            alt="user image"
            width={80}
            height={80}
            className="rounded-full"
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="md:text-xl tracking-wider flex gap-1 items-center justify-center text-primary font-bold text-md">
            {user.userName}
            <GoVerified className="text-blue-600 text-medium ml-2" />
          </p>
          <p className="lowercase md:text-xl text-gray-400 text-xs">
            {user.userName.replaceAll(" ", "")}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideo(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideo(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
            {videoList.length > 0 ? (
                videoList.map((post: Video, idx: number) => (
                    <VideoCard post={post} key={idx} />
                )
            )): <NoResult  text={`No ${showUserVideo ? "" : "Liked"} Videos Yet`}/>}
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const response = await axios.get(`http://localhost:3000/api/profile/${id}`);
  console.log(response);
  return {
    props: { data: response.data },
  };
};
export default Profile;
