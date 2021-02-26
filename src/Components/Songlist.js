import React from 'react';
import Song from './Song';

const SongList = ({songs}) => {
    return (
        <div className="col-12 p-5 row">
            {songs && songs.map((song) => (
                <Song
                    key={song.id}
                    song={song}
                />
            ))}
            
             
        </div>
      );
}
 
export default SongList;