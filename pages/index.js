import { gql, GraphQLClient } from 'graphql-request';
import Section from '../components/Section';
import Navbar from '../components/Navbar';

export const getStaticProps = async() => {

  const url = process.env.ENDPOINT

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
  })

// communicate with database graphCMS
const query = gql `
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

// get data
const data = await graphQLClient.request(query)
const videos = data.videos

return {
  props: {
    videos,
  }
 }
}

export default function Home({ videos}) {

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
      <Navbar />
      <div className="app">
        <div className="main-video">
          <img src={randomVideo(videos).thumbnail.url} 
           alt={randomVideo(videos).title} />
        </div>
        <div className="video-feed">
         <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
         <Section genre={"Family"} videos={filterVideos(videos, 'Family')} />
         <Section genre={"Adventure"} videos={filterVideos(videos, 'Adventure')} />
         <Section genre={"Marvel"} videos={filterVideos(videos, 'Marvel')} />
         <Section genre={"Disney"} videos={filterVideos(videos, 'Disney')} />
         <Section genre={"Pixar"} videos={filterVideos(videos, 'Pixar')} />
         <Section genre={"Classic"} videos={filterVideos(videos, 'Classic')} />
         <Section genre={"Thriller"} videos={filterVideos(videos, 'Thriller')} />
         <Section genre={"Drama"} videos={filterVideos(videos, 'Drama')} />
      </div>
      </div>
    </>
  )
}
