// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { searchPostsQuery } from '../../../utils/queries'
searchPostsQuery


export default async function  handler( req: NextApiRequest,res: NextApiResponse
){
    if(req.method === "GET"){
    const {searchTerm} = req.query;

    const videoQuery = searchPostsQuery(searchTerm)
    const videos = await client.fetch(videoQuery)

    res.status(200).json(videos)
    }
    
}
