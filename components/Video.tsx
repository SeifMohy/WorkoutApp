import YouTube from "react-youtube";
  
// export default class YoutubeVideo 
// extends React.Component {
//   render() {
//     const opts = {
//       height: "390",
//       width: "640",
//       playerVars: {
//         autoplay: 1,
//       },
//     };

import React from 'react'

function Video(this: any) {
    const opts = {
              height: "390",
              width: "640",
              playerVars: {
                autoplay: 1,
              }
            }
    return (
        <YouTube videoId="sTnm5jvjgjM" 
            opts={opts} />
    )
}

export default Video
