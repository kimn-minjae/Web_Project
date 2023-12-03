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

const playlist = ["music/Perfect night", "music/Drama.mp3", "music/Baddie.mp3", "music/Seven.mp3", "music/Love Lee.mp3", "music/사랑은 늘 도망가.mp3", "music/후라이의 꿈.mp3", "music/You&me.mp3", "music/헤어지자 말해요.mp3", "music/Do or die.mp3", "music/모래 알갱이.mp3", "music/우리들의 블루스.mp3", "music/Either Way.mp3", "music/인사.mp3", "music/Super Shy.mp3", "music/Smoke.mp3", "music/사막에서 꽃을 피우듯.mp3", "music/ETA.mp3", "music/첫눈.mp3", "music/그대만 있다면.mp3", "music/Standing next to you.mp3", "music/All I Want for Christmas Is You.mp3", "music/퀸카.mp3", "music/Get A Guitar.mp3", "music/별 떨어진다.mp3", "music/Ditto.mp3", "music/Fast Forward.mp3", "music/Hype Boy.mp3"];
const title = ["Perfect night","Drama", "Baddie", "Seven", "Love Lee", "사랑은 늘 도망가", "후라이의 꿈", "You&me", "헤어지자 말해요", "Do or die", "모래 알갱이", "우리들의 블루스", "Either Way", "인사", "Super Shy", "Smoke (Prod. Dynamicduo, Padi)", "사막에서 꽃을 피우듯", "ETA", "첫 눈", "그대만 있다면 (여름날 우리 X 너드커넥션 (Nerd Connection))", "Standing Next to You", "All I Want for Christmas Is You", "퀸카 (Queencard)", "Get A Guitar", "별 떨어진다 (I Do)", "Ditto", "Fast Forward", "Hype Boy"];
const subtitle = ["LE SSERAFIM (르세라핌)", "aespa", "IVE (아이브)", "정국", "AKMU (악뮤)", "임영웅", "AKMU (악뮤)", "제니 (JENNIE)", "박재정", "임영웅","임영웅","임영웅", "IVE (아이브)", "범진", "NewJeans", "다이나믹 듀오, 이영지", "우디 (Woody)", "NewJeans", "EXO", "너드커넥션 (Nerd Connection)", "정국", "Mariah Carey", "(여자)아이들", "RIIZE", "디오 (D.O.)", "NewJeans", "전소미", "NewJeans"];
const MusicImg = ["icon/perfect night.jpg", "icon/Drama.webp", "icon/Baddie.webp","icon/Seven.webp", "icon/Love Lee.png", "icon/사랑은 늘 도망가.png", "icon/Love Lee.png", "icon/You & me.avif", "icon/헤어지자 말해요.jpg", "icon/Do or die.png", "icon/모래 알갱이.png", "icon/우리들의 블루스.png", "icon/Baddie.webp", "icon/인사.jpg", "icon/super shy.webp", "icon/smoke.png", "icon/사막에서 꽃을 피우듯.png", "icon/super shy.webp", "icon/첫눈.jpg", "icon/그대만 있다면.jpg", "icon/standing next to you.jpg", "icon/all i want for christmas is you.png", "icon/퀸카.jpg", "icon/get a guitar.webp", "icon/별 떨어진다.png", "icon/ditto.webp", "icon/fast forward.webp", "icon/hype boy.svg"];
let currentTrackIndex = 0;
let currentTitleIndex = 0;
let currentSubtitleIndex = 0;
let currentImg = 0;
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
    currentImg = (currentImg - 1 + MusicImg.length) % MusicImg.length;
    loadTrack();
    document.getElementById('music_info_image').src = MusicImg[currentImg];
    if(currentTitleIndex == 0 && currentSubtitleIndex == 0) {

        currentTitleIndex = 27;
        currentSubtitleIndex = 27;
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
    currentImg = (currentImg + 1) % MusicImg.length;
    loadTrack();
    document.getElementById('music_info_image').src = MusicImg[currentImg];
    if (currentTitleIndex == 27 && currentSubtitleIndex == 27){
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
        "Perfect night",
        "Drama",
        "Baddie",
        "Seven",
        "Love Lee",
        "사랑은 늘 도망가",
        "후라이의 꿈",
        "You&me",
        "헤어지자 말해요", 
        "Do or die", 
        "모래 알갱이", 
        "우리들의 블루스", 
        "Either Way", 
        "인사", 
        "Super Shy", 
        "Smoke (Prod. Dynamicduo, Padi)", 
        "사막에서 꽃을 피우듯", 
        "ETA", 
        "첫 눈", 
        "그대만 있다면 (여름날 우리 X 너드커넥션 (Nerd Connection))", 
        "Standing Next to You", 
        "All I Want for Christmas Is You", 
        "퀸카 (Queencard)", 
        "Get A Guitar", 
        "별 떨어진다 (I Do)", 
        "Ditto", 
        "Fast Forward", 
        "Hype Boy"
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

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const resultContainer = document.getElementById('resultContainer');

    function displayResults(data) {
        resultContainer.innerHTML = '';

        data.forEach(item => {
            // 여기서 검색어와 일치하는 경우에만 이미지를 표시
            if (searchInput.value.toLowerCase() == "perfect night") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1_1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1_2;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1_3;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1_4;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1_1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1_2;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1_3;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1_4;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1_1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1_2;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1_3;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1_4;
                description4.className = 'description4';
                resultContainer.appendChild(description4);

            }
            else if (searchInput.value.toLowerCase() == "drama") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title2_1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title2_2;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title2_3;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title2_4;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image2_1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image2_2;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image2_3;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image2_4;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url2, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url2, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url2, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url2, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description2_1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description2_2;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description2_3;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description2_4;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "baddie") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title3_1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title3_2;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title3_3;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title3_4;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image3_1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image3_2;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image3_3;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image3_4;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url3, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url3, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url3, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url3, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description3_1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description3_2;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description3_3;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description3_4;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "seven") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "love lee") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);

            }
            else if (searchInput.value.toLowerCase() == "사랑은 늘 도망가") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "후라이의 꿈") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "you & me") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "헤어지자 말해요") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(title3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image4';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "do or die") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(titl3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image3';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "모래 알갱이") {
    
                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(titl3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image3';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
            else if (searchInput.value.toLowerCase() == "우리들의 블루스") {

                const title1 = document.createElement('h3');
                title1.textContent = item.title1;
                title1.className = 'title1';
                resultContainer.appendChild(title1);

                const title2 = document.createElement('h3');
                title2.textContent = item.title1;
                title2.className = 'title2';
                resultContainer.appendChild(title2);

                const title3 = document.createElement('h3');
                title3.textContent = item.title1;
                title3.className = 'title3';
                resultContainer.appendChild(titl3);

                const title4 = document.createElement('h3');
                title4.textContent = item.title1;
                title4.className = 'title4';
                resultContainer.appendChild(title4);

                const image1 = document.createElement('img');
                image1.src = item.image1;
                image1.alt = '';
                image1.className = 'image1';
                resultContainer.appendChild(image1);

                const image2 = document.createElement('img');
                image2.src = item.image1;
                image2.alt = '';
                image2.className = 'image2';
                resultContainer.appendChild(image2);

                const image3 = document.createElement('img');
                image3.src = item.image1;
                image3.alt = '';
                image3.className = 'image3';
                resultContainer.appendChild(image3);

                const image4 = document.createElement('img');
                image4.src = item.image1;
                image4.alt = '';
                image4.className = 'image3';
                resultContainer.appendChild(image4);

                image1.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image2.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image3.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                image4.addEventListener('click', function () {
                    window.open(item.url1, '_blank', 'fullscreen')
                });

                const description1 = document.createElement('p');
                description1.textContent = item.description1;
                description1.className = 'description1';
                resultContainer.appendChild(description1);

                const description2 = document.createElement('p');
                description2.textContent = item.description1;
                description2.className = 'description2';
                resultContainer.appendChild(description2);

                const description3 = document.createElement('p');
                description3.textContent = item.description1;
                description3.className = 'description3';
                resultContainer.appendChild(description3);

                const description4 = document.createElement('p');
                description4.textContent = item.description1;
                description4.className = 'description4';
                resultContainer.appendChild(description4);
            }
        });
    }

    function performSearch() {
        // 가상의 데이터 (실제로는 서버에서 데이터를 가져와야 함)
        const searchData = [
            {
                title1_1: title[0],
                title1_2: title[14],
                title1_3: title[15],
                title1_4: title[27],
                image1_1: MusicImg[0],
                image1_2: MusicImg[14],
                image1_3: MusicImg[15],
                image1_4: MusicImg[27],
                description1_1: subtitle[0],
                description1_2: subtitle[14],
                description1_3: subtitle[15],
                description1_4: subtitle[27],
                url1_1: './LE SSERAFIM.html'
            },
            {
                title2_1: title[1],
                title2_2: title[2],
                title2_3: title[9],
                title2_4: title[15],
                image2_1: MusicImg[1],
                image2_2: MusicImg[2],
                image2_3: MusicImg[9],
                image2_4: MusicImg[15],
                description2_1: subtitle[1],
                description2_2: subtitle[2],
                description2_3: subtitle[9],
                description2_4: subtitle[15],
                url2: './Aespa.html'
            },
            {
                title3_1: title[2],
                title3_2: title[27],
                title3_3: title[12],
                title3_4: title[17],
                image3_1: MusicImg[2],
                image3_2: MusicImg[27],
                image3_3: MusicImg[12],
                image3_4: MusicImg[17],
                description3_1: subtitle[2],
                description3_2: subtitle[27],
                description3_3: subtitle[12],
                description3_4: subtitle[17],
                url3: './IVE.html'
            },
            {
                title4_1: title[3],
                title4_2: title[14],
                title4_3: title[15],
                title4_4: title[20],
                image4_1: MusicImg[3],
                image4_2: MusicImg[14],
                image4_3: MusicImg[15],
                image4_4: MusicImg[20],
                description4_1: subtitle[3],
                description4_2: subtitle[14],
                description4_3: subtitle[15],
                description4_4: subtitle[20],
                url4: './정국.html'
            },
            {
                title5_1: title[4],
                title5_2: title[21],
                title5_3: title[7],
                title5_4: title[27],
                image5_1: MusicImg[4],
                image5_2: MusicImg[21],
                image5_3: MusicImg[7],
                image5_4: MusicImg[19],
                description5_1: subtitle[4],
                description5_2: subtitle[21],
                description5_3: subtitle[7],
                description5_4: subtitle[19],
                url5: './AKMU.html'
            },
            {
                title6_1: title[5],
                title6_2: title[13],
                title6_3: title[16],
                title6_4: title[6],
                image6_1: MusicImg[5],
                image6_2: MusicImg[13],
                image6_3: MusicImg[16],
                image6_4: MusicImg[6],
                description6_1: subtitle[5],
                description6_2: subtitle[13],
                description6_3: subtitle[16],
                description6_4: subtitle[6],
                url6: './임영웅.html'
            },
            {
                title7_1: title[6],
                title7_2: title[14],
                title7_3: title[15],
                title7_4: title[27],
                image7_1: MusicImg[6],
                image7_2: MusicImg[14],
                image7_3: MusicImg[15],
                image7_4: MusicImg[27],
                description7_1: subtitle[6],
                description7_2: subtitle[14],
                description7_3: subtitle[15],
                description7_4: subtitle[27],
                url7: './AKMU.html'
            },
            {
                title8_1: title[7],
                image8_1: MusicImg[7],
                description8_1: subtitle[7],
                url8: './제니.html'
            },
            {
                title9_1: title[8],
                image9_1: MusicImg[8],
                description9_1: subtitle[8],
                url9: './박재정.html'
            },
            {
                title10_1: title[9],
                image10_1: MusicImg[9],
                description10_1: subtitle[9],
                url10: './임영웅.html'
            },
            {
                title11_1: title[10],
                image11_1: MusicImg[10],
                description11_1: subtitle[10],
                url11: './임영웅.html'
            },
            {
                title12_1: title[11],
                image12_1: MusicImg[11],
                description12_1: subtitle[11],
                url12: './임영웅.html'
            }
        ];

        displayResults(searchData);
    }

    searchButton.addEventListener('click', function () {
        // 검색 버튼 클릭시 이전 검색 결과 초기화
        resultContainer.innerHTML = '';
        performSearch();
    });
});
