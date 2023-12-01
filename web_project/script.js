const audio = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const currentProgress = document.getElementById('currentProgress');
const volumeBar = document.getElementById('volumeBar');
const currentVolume = document.getElementById('currentVolume');
const playButton = document.getElementById('playButton');
const volumeControl = document.getElementById('volumeControl');
const repeatButton = document.getElementById('repeatButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const TitleDisplay = document.getElementById('Title');
const SubtitleDisplay = document.getElementById('Subtitle')

const playlist = ["music/Perfect night", "music/Drama.mp3", "music/Baddie.mp3", "music/Seven.mp3", "music/Love Lee.mp3", "music/사랑은 늘 도망가.mp3", "music/후라이의 꿈.mp3", "music/You&me.mp3", "music/헤어지자 말해요.mp3", "music/Do or die.mp3", "music/모래 알갱이.mp3", "music/우리들의 블루스.mp3"];
const title = ["Perfect night","Drama", "Baddie", "Seven", "Love Lee", "사랑은 늘 도망가", "후라이의 꿈", "You&me", "헤어지자 말해요", "Do or die", "모래 알갱이", "우리들의 블루스"];
const subtitle = ["LE SSERAFIM (르세라핌)", "aespa", "IVE (아이브)", "정국", "AKMU (악뮤)", "임영웅", "AKMU (악뮤)", "제니 (JENNIE)", "박재정", "임영웅","임영웅","임영웅"];
const MusicImg = ["icon/perfect night.jpg", "icon/Drama.webp", "icon/Baddie.webp","icon/Seven.webp", ""]
let currentTrackIndex = 0;
let currentTitleIndex = 0;
let currentSubtitleIndex = 0;
let isRepeat = false;

playButton.addEventListener('click', togglePlay);
volumeControl.addEventListener('click', toggleVolumeBarVisibility);
repeatButton.addEventListener('click', toggleRepeat);
prevButton.addEventListener('click', playPrevTrack);
nextButton.addEventListener('click', playNextTrack);

audio.addEventListener('timeupdate', updateProgressBarAndTime);
audio.addEventListener('durationchange', updateTotalTime);
audio.addEventListener('ended', handleSongEnd);
audio.addEventListener('volumechange', updateVolumeBar);

progressBar.addEventListener('click', (event) => {
    const clickedPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const newPosition = (clickedPosition / progressBar.clientWidth) * audio.duration;
    audio.currentTime = newPosition;
});

volumeBar.addEventListener('click', (event) => {
    const clickedPosition = event.clientX - volumeBar.getBoundingClientRect().left;
    const newVolume = clickedPosition / volumeBar.clientWidth;
    audio.volume = newVolume;
});

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.innerText = '일시 정지';
    } else {
        audio.pause();
        playButton.innerText = '음악 재생';
    }
}

function toggleVolumeBarVisibility() {
    const isVisible = volumeBar.style.display === 'block';
    volumeBar.style.display = isVisible ? 'none' : 'block';
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    if (isRepeat) {
        repeatButton.innerText = '반복 중지';
    } else {
        repeatButton.innerText = '반복 재생';
    }
}

function playPrevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack();
    if(currentTitleIndex == 0 && currentSubtitleIndex == 0) {
        currentTitleIndex--;
        currentSubtitleIndex++;
        currentTitleIndex = 11;
        currentSubtitleIndex = 11;
        Title.innerText = `${title[currentTitleIndex]}`;
        Subtitle.innerText = `${subtitle[currentSubtitleIndex]}`;

    }
    else {
        currentTitleIndex = currentTitleIndex - 1;
        currentSubtitleIndex = currentSubtitleIndex - 1;
        Title.innerText = `${title[currentTitleIndex]}`;
        Subtitle.innerText = `${subtitle[currentSubtitleIndex]}`;
        
    }
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack();
    if (currentTitleIndex == 11 && currentSubtitleIndex == 11){
        currentTitleIndex = 0;
        currentSubtitleIndex = 0;
        Title.innerText = `${title[currentTitleIndex]}`;
        Subtitle.innerText = `${subtitle[currentSubtitleIndex]}`;
    }
    else {
        currentTitleIndex = currentTitleIndex + 1;
        currentSubtitleIndex = currentSubtitleIndex + 1;
        Title.innerText = `${title[currentTitleIndex]}`;
        Subtitle.innerText = `${subtitle[currentSubtitleIndex]}`;
    }
}

function loadTrack() {
    audio.src = playlist[currentTrackIndex];
    audio.load();
    playButton.innerText = '음악 재생';
    audio.play();
}

function handleSongEnd() {
    if (isRepeat) {
        // 반복 재생이 활성화된 경우 다음 곡으로 넘어가지 않고 현재 곡을 다시 재생
        audio.currentTime = 0;
        audio.play();
    } else {
        // 반복 재생이 비활성화된 경우 다음 곡으로 넘어감
        playNextTrack();
    }
}

function updateProgressBarAndTime() {
    const progress = (audio.currentTime / audio.duration) * 100;
    currentProgress.style.width = `${progress}%`;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeDisplay.innerText = `재생 시간: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateTotalTime() {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    totalTimeDisplay.innerText = `전체 시간: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateVolumeBar() {
    const volume = audio.volume * 100;
    currentVolume.style.width = `${volume}%`;

    // 소리가 0이면 버튼에 소리 꺼짐이라고 표시
    if (volume === 0) {
        volumeControl.src = "icon/mute.png";
        volumeControl.classList.add('muted');
    } else {
        volumeControl.src = "icon/volume.png";
        volumeControl.classList.remove('muted');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const resultList = document.getElementById('resultList');
    const maxResults = 5; // 최대 표시 결과 개수 설정

    const data = [
        'Perfect night',
        'Drama',
        'Baddie',
        'Seven',
        'Love Lee',
        '우리들의 블루스',
        '헤어지자 말해요',
        '후라이의 꿈',
        '사랑은 늘 도망가',
        '모래 알갱이',
        'You & me',
        'Do or die'
        ];
    
    function displayResults(results) {
        resultList.innerHTML = '';
        for (let i = 0; i < Math.min(results.length, maxResults); i++) {
            const result = results[i];
            const listItem = document.createElement('li');
            listItem.className = 'resultItem';
            listItem.textContent = result;
            resultList.appendChild(listItem);

            listItem.addEventListener('click', function () {
                searchInput.value = result;
                resultList.innerHTML = '';
            });
        }
    }

    searchInput.addEventListener('input', function () {
        const inputValue = searchInput.value.toLowerCase();
        const filteredResults = data.filter(item => item.toLowerCase().includes(inputValue));
        displayResults(filteredResults);
    });

    // Close the result list when clicking outside the input and results
    document.addEventListener('click', function (event) {
        if (!event.target.closest('#searchInput') && !event.target.closest('#resultList')) {
            resultList.innerHTML = '';
        }
    });
});
