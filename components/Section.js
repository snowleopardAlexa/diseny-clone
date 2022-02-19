import Card from './Card';

const Section = ({ genre, videos }) => {
  return (
    <div className={"section"}>
       <h2 className="genre-name">{genre}</h2>
       <div>
         {videos.map(video => (
             <a key={video.id} href={`/video/${video.slug}`}>
               <Card thumbnail={video.thumbnail} />
             </a>
         ))}
       </div>
    </div>
  )
}

export default Section