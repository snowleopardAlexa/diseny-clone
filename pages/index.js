import { gql, GraphQLClient } from 'graphql-request';
import Section from '../components/Section';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import disneyLogo from '../public/disney3.jpeg';
import marvelLogo from '../public/marvel.jpeg';
import pixarLogo from '../public/pixar2.jpeg';

export const getStaticProps = async() => {

  const url = process.env.ENDPOINT

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
  })

// communicate with database graphCMS
const videosQuery = gql `
  query {
    videos {
      createdAt,
      id,
      title,
      description,
      seen,
      slug,
      tags,
      thumbnail {
        url
      },
      mp4 {
        url
      }
    }
  }
`
// account data
const accountQuery = gql `
query {
  account(where: {id: "cl041up9ql5yx0aodxjhsdald"}) {
    username
    avatar {
      url
    }
  }
}
`

// get data
const data = await graphQLClient.request(videosQuery)
const videos = data.videos

const accountData = await graphQLClient.request(accountQuery)
const account = accountData.account 

return {
  props: {
    videos,
    account
  }
 }
}

export default function Home({ videos, account }) {

// display random video
const randomVideo = (videos) => {
  return videos[Math.floor(Math.random() * videos.length)]
}

// filter videos
const filterVideos = (videos, genre) => {
  return videos.filter((video) => video.tags.includes(genre))
}

// recommended videos
const unSeenVideos = (videos) => {
  return videos.filter(video => video.seen === false || video.seen === null)
}

  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img src={randomVideo(videos).thumbnail.url} 
           alt={randomVideo(videos).title} />
        </div>
        <div className="container-feed">
        <div className="video-feed">
         <Link href="#disney">
           <div className="franchise" id="disney">
           <Image src={disneyLogo} />
           </div>
         </Link>
         <Link href="#family">
        <div className="franchise" id="family">
          <Image src={pixarLogo} />
           </div></Link>
         <Link href="#adventure"><div className="franchise" id="adventure">
         <Image src={marvelLogo} />
           </div></Link>
         <Link href="#marvel"><div className="franchise" id="marvel">
         <Image src={pixarLogo} />
           </div></Link>
         <Link href="#pixar"><div className="franchise" id="pixar">
         <Image src={disneyLogo} />
           </div></Link>
         <Link href="#classic"><div className="franchise" id="classic">
         <Image src={marvelLogo} />
           </div></Link>
         <Link href="#thriller"><div className="franchise" id="thriller">
         <Image src={pixarLogo} />
           </div></Link>
         <Link href="#drama"><div className="franchise" id="drama">
         <Image src={disneyLogo} />
           </div></Link>
        </div>
         <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
         <Section id="family" genre={"Family"} videos={filterVideos(videos, 'Family')} />
         <Section id="adventure" genre={"Adventure"} videos={filterVideos(videos, 'Adventure')} />
         <Section id="marvel" genre={"Marvel"} videos={filterVideos(videos, 'Marvel')} />
         <Section id="disney" genre={"Disney"} videos={filterVideos(videos, 'Disney')} />
         <Section id="pixar" genre={"Pixar"} videos={filterVideos(videos, 'Pixar')} />
         <Section id="classic" genre={"Classic"} videos={filterVideos(videos, 'Classic')} />
         <Section id="thriller" genre={"Thriller"} videos={filterVideos(videos, 'Thriller')} />
         <Section id="drama" genre={"Drama"} videos={filterVideos(videos, 'Drama')} />
      </div>
      </div>
    </>
  )
}




