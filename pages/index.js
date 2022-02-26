import { gql, GraphQLClient } from 'graphql-request';

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
  console.log(videos);
  return (
    <div>
        Hello  
    </div>
  )
}
