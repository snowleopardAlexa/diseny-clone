import { gql, GraphQLClient } from 'graphql-request';
import Section from '../components/Section';

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

  return (
    <>
      <div className="app">
        <div className="main-video">
          <img src={randomVideo(videos).thumbnail.url} 
           alt={randomVideo(videos).title} />
        </div>
        <div className="video-feed">
         <Section genre={"Family"} videos={filterVideos(videos, 'Family')} />
         <Section genre={"Adventure"} videos={videos} />
         <Section genre={"Marvel"} videos={videos} />
         <Section genre={"Disney"} videos={videos} />
         <Section genre={"Pixar"} videos={videos} />
         <Section genre={"Classic"} videos={videos} />
         <Section genre={"Thriller"} videos={videos} />
         <Section genre={"Star Wars"} videos={videos} />
      </div>
      </div>
    </>
  )
}
