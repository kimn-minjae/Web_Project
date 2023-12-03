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
const MusicImg = ["icon/perfect night.jpg", "icon/Drama.webp", "icon/Baddie.webp","icon/Seven.webp", "icon/Love Lee.png", "icon/사랑은 늘 도망가.png", "icon/Love Lee.png", "icon/You & me.avif", "icon/헤어지자 말해요.jpg", "icon/Do or die.png", "icon/모래 알갱이.png", "icon/우리들의 블루스.png"];
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
    currentImg = (currentImg + 1) % MusicImg.length;
    loadTrack();
    document.getElementById('music_info_image').src = MusicImg[currentImg];
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

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const resultContainer = document.getElementById('resultContainer');

    function displayResults(data) {
        resultContainer.innerHTML = '';

        data.forEach(item => {
            // 여기서 검색어와 일치하는 경우에만 이미지를 표시
            if (searchInput.value.toLowerCase() == "perfect night") {

                const title = document.createElement('h3');
                title.textContent = item.title1;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image1;
                image.alt = '';
                resultContainer.appendChild(image);

                image.addEventListener('click', function () {
                    resultContainer.innerHTML = ''; // 이전 요소 삭제

                    // 예: 클릭된 이미지의 customContent로 새로운 요소 생성
                    const newContent = document.createElement('h4');
                    newContent.textContent = item.content1_1;
                    newContent.textContent = item.content1_2;

                    // 새로운 요소를 결과 컨테이너에 추가
                    resultContainer.appendChild(newContent);
                });

                const description = document.createElement('p');
                description.textContent = item.description1;
                resultContainer.appendChild(description);

            }
            else if (searchInput.value.toLowerCase() == "drama") {

                const title = document.createElement('h3');
                title.textContent = item.title2;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image2;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description2;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "baddie") {

                const title = document.createElement('h3');
                title.textContent = item.title3;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image3;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description3;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "seven") {

                const title = document.createElement('h3');
                title.textContent = item.title4;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image4;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description4;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "love lee") {

                const title = document.createElement('h3');
                title.textContent = item.title5;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image5;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description5;
                resultContainer.appendChild(description);

            }
            else if (searchInput.value.toLowerCase() == "사랑은 늘 도망가") {

                const title = document.createElement('h3');
                title.textContent = item.title6;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image6;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description6;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "후라이의 꿈") {

                const title = document.createElement('h3');
                title.textContent = item.title7;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image7;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description7;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "you & me") {

                const title = document.createElement('h3');
                title.textContent = item.title8;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image8;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description8;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "헤어지자 말해요") {

                const title = document.createElement('h3');
                title.textContent = item.title9;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image9;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description9;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "do or die") {

                const title = document.createElement('h3');
                title.textContent = item.title10;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image10;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description10;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "모래 알갱이") {
    
                const title = document.createElement('h3');
                title.textContent = item.title11;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image11;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description11;
                resultContainer.appendChild(description);
            }
            else if (searchInput.value.toLowerCase() == "우리들의 블루스") {

                const title = document.createElement('h3');
                title.textContent = item.title12;
                resultContainer.appendChild(title);

                const image = document.createElement('img');
                image.src = item.image12;
                image.alt = '';
                resultContainer.appendChild(image);

                const description = document.createElement('p');
                description.textContent = item.description12;
                resultContainer.appendChild(description);
            }
        });
    }

    function performSearch() {
        // 가상의 데이터 (실제로는 서버에서 데이터를 가져와야 함)
        const searchData = [
            {
                title1: title[0],
                image1: MusicImg[0],
                description1: subtitle[0],
                content1_1: 'LE SSERAFIM (르세라핌)은 대한민국의 걸그룹이다. 세상의 시선에 흔들리지 않고 두려움 없이 앞으로 나아가겠다는 자기 확신과 강한 의지를 바탕으로 비상할 준비를 마친 그룹은 2022년 5월, 대망의 첫 미니 앨범 [FEARLESS]를 공개하며 가요계에 출사표를 던졌다. 방시혁 총괄 프로듀서의 진두지휘 아래 얼터너티브 팝, 디스코-펑크, R&B 등 다양한 장르의 음악이 그룹만의 스타일로 탄생했고 멤버 김채원과 허윤진은 수록곡 <Blue Flame>의 작사에 참여하는 등 앨범에 각별한 애정을 내비치며 새로운 여정의 설렘과 각오를 담았다.',
                content1_2: '데뷔와 동시에 각종 신기록을 쏟아낸 그룹은 같은 해 10월 두 번째 EP [ANTIFRAGILE]로 성공 가도를 이어가며 강력한 팬덤을 구축해 나갔다. 2023년 5월에는 첫 번째 정규 앨범 [UNFORGIVEN]을 발매, 타인의 평가에 개의치 않고 르세라핌 만의 길을 개척하겠다는 각오를 주제로 삼았고 월드 클래스 뮤지션들이 참여해 그룹의 위상을 입증했다.',
            },
            {
                title2: title[1],
                image2: MusicImg[1],
                description2: subtitle[1]
            },
            {
                title3: title[2],
                image3: MusicImg[2],
                description3: subtitle[2]
            },
            {
                title4: title[3],
                image4: MusicImg[3],
                description4: subtitle[3]
            },
            {
                title5: title[4],
                image5: MusicImg[4],
                description5: subtitle[4]
            },
            {
                title6: title[5],
                image6: MusicImg[5],
                description6: subtitle[5]
            },
            {
                title7: title[6],
                image7: MusicImg[6],
                description7: subtitle[6]
            },
            {
                title8: title[7],
                image8: MusicImg[7],
                description8: subtitle[7]
            },
            {
                title9: title[8],
                image9: MusicImg[8],
                description9: subtitle[8]
            },
            {
                title10: title[9],
                image10: MusicImg[9],
                description10: subtitle[9]
            },
            {
                title11: title[10],
                image11: MusicImg[10],
                description11: subtitle[10]
            },
            {
                title12: title[11],
                image12: MusicImg[11],
                description12: subtitle[11]
            },
            {
                title13: title[12],
                image13: MusicImg[12],
                description13: subtitle[12]
            },
        ];

        displayResults(searchData);
    }

    searchButton.addEventListener('click', function () {
        // 검색 버튼 클릭시 이전 검색 결과 초기화
        resultContainer.innerHTML = '';
        performSearch();
    });
});
