// import React, { useEffect, useRef } from 'react'

// interface propPlayer {
//     id: string;
// }

// const Player: React.FC<propPlayer> = ({ id }) => {
//     // const url = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
//     // return (
//     // <div>
//     //     <iframe
//     //         title="Spotify Track"
//     //         src={url}
//     //         width="100%"
//     //         height="352"
//     //         frameBorder="0"
//     //         allowFullScreen
//     //         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//     //         style={{ borderRadius: '12px', position: 'relative', zIndex: 1 , background: '#121212'}}
//     //         loading="lazy"
//     //     />
//     // </div>
//     //)
//     const iframeRef = useRef<HTMLIFrameElement>(null);

//     const playTrack = () => {
//         const iframe = iframeRef.current;
//         if (iframe) {
//             iframe.contentWindow?.postMessage(
//                 {
//                     type: 'play',
//                     spotify_uri: `spotify:track:${id}`,
//                 },
//                 'https://sdk.scdn.co/embedded/index.html',
//             );
//         }
//     };

//     const pauseTrack = () => {
//         const iframe = iframeRef.current;
//         if (iframe) {
//             iframe.contentWindow?.postMessage(
//                 {
//                     type: 'pause',
//                 },
//                 'https://sdk.scdn.co/embedded/index.html',
//             );
//         }
//     };
    
//     useEffect(() => {
//         const iframe = iframeRef.current;

//         const loadSpotifyPlayer = () => {
//             if (!iframe) return;

//             iframe.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
//         };

//         loadSpotifyPlayer();
//     }, [id]);

//     return <iframe title="spotify-iframe" ref={iframeRef} width="300" height="380" frameBorder="0" allow="encrypted-media"></iframe>;
// };

// export default Player;