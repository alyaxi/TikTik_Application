import { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { IUser, Video } from "../../types";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import { useRouter } from "next/router";
import { BASE_URL } from "../../utils/index1";
const Search = ({videos}: {videos: Video[]}) => {
    
    const [isAccount, setIsAccount] = useState(false)
    const accounts = isAccount ? "border-b-2 border-black" : "text-gray-400";
    const isVideo = !isAccount ? "border-b-2 border-black" : "text-gray-400";
    const router = useRouter()
    const {searchTerm}: any = router.query
    console.log(videos);
    const {allUsers} = useAuthStore()
    const searchAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()) )
    
  return (
    <div className="w-full">
         <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
            onClick={() => setIsAccount(true)}
          >
            Accounts
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${isVideo}`}
            onClick={() => setIsAccount(false)}
          >
            Videos
          </p>
        </div>
        {isAccount ? (
            <div className="md:mt-16">
                {searchAccounts.length > 0 ? (
                    searchAccounts.map((user: IUser, idx: number) => (
                        <Link key={idx} href={`/profile/${user._id}`}>
                        <div className="flex p-2 font-semibold rounded border-b-2 border-gray-200 gap-3 cursor-pointer">
                        <div  >
                      <Image
                        src={user.image}
                        alt="user image"
                        width={34}
                        height={34}
                        className="rounded-full"
                      />
                    </div>
                    <div className="hidden xl:block">
                      
                        <p className=" flex gap-1 items-center text-primary ">{user.userName}
                        <GoVerified className="text-blue-600 text-medium ml-2" />
                        </p>
                       <p className="lowercase text-gray-400 text-xs">{user.userName.replaceAll(" ", "" )}</p>
                    </div>
                          </div>    
                        </Link>
                    ))
                ): <NoResult text={`No accounts results for ${searchTerm}`} />}
            </div>
        ): <div className="md:mt-16 flex flex-wrap gap-6 justify-start">
            
            {videos?.length ? (
                videos.map((video: Video, idx) => (
                    
                    <VideoCard post={video} key={idx}/>
                ))
            ):<NoResult text={`No video results for ${searchTerm}`} /> }
            </div>}
                
    </div>
  )
}
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const response = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  console.log(response);
  return {
    props: { videos: response.data },
  };
};
export default Search