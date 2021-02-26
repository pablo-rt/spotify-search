import React from 'react';
const Song = ({song}) => {

    // get song info
    const {album, name, external_urls} = song;
    const img = album.images[0].url;
    const song_link = external_urls.spotify
    
    return (
         <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>
             <div className='card'>
                 <img src={img} className='card-img-top' alt='unavailable'/>
             </div>
             <div className='card-body'> 
             <a className='card-txt text-success' href={song_link}> {name} </a>
             </div>
         </div>
    );
}
 
export default Song;