import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { SelectVideoTitle } from '../style/MainVideoStyle';
import { useSelector, useDispatch } from 'react-redux';

const MainVideoItem = ({ videoData, className }) => {
  const dispatch = useDispatch();
  console.log('videoData ? ', videoData);
  const [isWatchedVideo, setIsWatchedVideo] = useState(false); // 동영상을 봤는지 안봤는지
  const [playerState, setPlayerState] = useState('unstarted');
  const videoOptions = {
    height: '600',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // 초기 브라우저 진입시 비디오 재생상태 => 0:정지, 1:재생
    },
  };
  const onPlayerReady = (e) => {
    console.log('비디오재생');
    setIsWatchedVideo(true);
  };

  const changePlayerStateShow = (playerStatus) => {
    // 유투브 플레이어 스테이츠 테스트중
    if (playerStatus.data === -(-1)) {
      setPlayerState('started');
      onPlayerReady();
    } else if (playerStatus.data === -0) {
      setPlayerState('ended'); // ended
      alert('운동끝났습니다! 데이로그를 작성해야 달력에 체크표시가 됩니다!');
      // 데이로그 컴포넌트 팝업 노출 시켜야함
      // dispatch(markCalendar(Number(todayDate))); => 데이로그 작성 후 보낼예정
    } else if (playerStatus.data === 1) {
      setPlayerState('playing'); // playing
    } else if (playerStatus.data === 2) {
      setPlayerState('paused'); // paused
    } else if (playerStatus.data === 3) {
      setPlayerState('buffering'); // buffering
    } else if (playerStatus.data === 5) {
      setPlayerState('cued'); // cued
    }
  };

  return (
    <div className={`video-item-wrap ${className}`}>
      <div
        className={
          playerState === 'ended' ? 'video-item complete' : 'video-item'
        }
      >
        <YouTube
          videoId={videoData.videoId}
          opts={videoOptions}
          onStateChange={changePlayerStateShow}
        />
      </div>
      {!videoData ? (
        <SelectVideoTitle>선택된 영상이 없습니다.</SelectVideoTitle>
      ) : (
        <SelectVideoTitle>
          <button disabled={isWatchedVideo}>수정</button>
          {videoData.videoTitle}
        </SelectVideoTitle>
      )}
    </div>
  );
};

export default MainVideoItem;