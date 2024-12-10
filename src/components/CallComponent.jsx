import React, { useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './CallComponent.css';

const CallComponent = () => {
  const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  const localVideoRef = useRef(null);

  const joinCall = async () => {
    const appId = 'YOUR_AGORA_APP_ID';
    const token = 'YOUR_TEMPORARY_TOKEN';
    const channel = 'testChannel';

    // Join the channel
    await client.join(appId, channel, token, null);

    // Publish local video
    const localTrack = await AgoraRTC.createCameraVideoTrack();
    localTrack.play(localVideoRef.current);
    await client.publish([localTrack]);
  };

  return (
    <div className="call-component">
      <div ref={localVideoRef} className="video-stream"></div>
      <button onClick={joinCall}>Join Call</button>
    </div>
  );
};

export default CallComponent;
