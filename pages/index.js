import { gql, GraphQLClient } from 'graphql-request';

export const getStaticProps = async() => {

  const url = "https://api-us-east-1.graphcms.com/v2/cl03aja7d03y601xedp64avr1/master"

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDU5MDczNjYsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NsMDNhamE3ZDAzeTYwMXhlZHA2NGF2cjEvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYTI1ZWJhYzYtNzExMi00YzAwLWJlNWEtNjk1YzFlODliZWUwIiwianRpIjoiY2wwNGFxemw4MTVlYzAxejJieWJqZGE5ayJ9.UxUiSi3oOOmgNYxl8bLKKQUx_93xrEU28NcLCc9wzcclnCF-hVXHsQgCfZjNimMq0xV4DpWZaV3RAC2SDVlmbb7-n7X6iBqfsOcz4SZH8gAl9VEySdJfff4k-e76SwK1Ed4HL0NwaHPoGTeQsQ9MvkExZ8AINyR3GxpYzvPWxAUYe0PdKmQyGC0OUhUVvPsrBt-uOTC0h22jxkGlFl3pICyWV88D8Rexx5NYuWotxnLtc0mCOCic8BZc6j41Q70u4tgSDptpmLlNrxQDZZ489lqO7EhvzypOUOPClFwvhvqgXACNqQZCNXIK2M55tWo14Fwz4npoJKvPn3b74uohWmLrc95qCGlaYUgBkbYdJeX018AVE63nRdnI6OSsKFSAxhWnPydhDxRjyKver12CBeg3sjdrIr5tqjSsk07u5hLkD5erC7XZY_vTusB6olCZFD_chTG3ZAH2Ax6lNM0P41l_A6n3DtaxngMQTaJGQtpxr3oWQ_G5v-FFX76Hqk4jySwiqHPRDUSR4qBNg5qtkQxveXn1QJ-0Q1YnG9d0tqq0-ge_G_nxmtBNTXINLU7bEtKeox9F2wvXFvhVI8B3d7YY2A1BoW9vej6A2Gaw2UTZqTkLpBkEw5XT39ZR0T_PbtSe0T9wBQvb6EsnLujkG8e9gH3cPxziYO4ga4KiWjM "
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
