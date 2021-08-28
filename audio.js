let musicbox;

window.addEventListener("DOMContentLoaded", nyan, false);

// 読み込み次第走らせる
function nyan() {
    $(document).ready(function() {
        setMusicBox();
    });
}

function setMusicBox() {
    musicbox = document.getElementsByClassName("musicbox");

    for (let i = 0; i < musicbox.length; i++) {
        playMusic(i);
    }
}

function playMusic(id) {
    let playButton = musicbox[id].getElementsByClassName("play")[0];
    let audio = musicbox[id].children[0];
    let seekbar = musicbox[id].getElementsByClassName("seekbar")[0];
    let slider_volume = musicbox[id].getElementsByClassName("volume")[0];

    // 音量の設定と初期表示作成
    seekbar.value = 0;
    seekbar.style.backgroundSize = "0%";
    slider_volume.style.backgroundSize = "80%"
    audio.volume = slider_volume.value;
    
    // 再生ボタン動作
    playButton.addEventListener("click", (e) => {
        if (audio.paused) {
            audio.play();
            playButton.children[0].src = "/img/Button_Pause.png";
        }   else {
            audio.pause();
            playButton.children[0].src = "/img/Button_Play.png";
        }
    });

    // 現在の再生位置を表示
    audio.addEventListener("timeupdate", (e) => {
        const current = Math.floor(audio.currentTime);
        const duration = Math.round(audio.duration);
        seekbar.max = Math.round(duration);
        if (!isNaN(duration)) {
            $(musicbox[id]).find("#current").text(playTime(current));
            $(musicbox[id]).find("#duration").text(playTime(duration));
            seekbar.value = audio.currentTime;
            seekbar.style.backgroundSize = Math.floor((seekbar.value / seekbar.max) * 100) + "%"; 
        }
    });

    // プログレスバーを引っ叩くと再生位置を変えられる
    seekbar.addEventListener("input", (e) => {
        audio.currentTime = seekbar.value;
    });

    // 音量スライダーの実装
    slider_volume.addEventListener("input", (e) => {
        audio.volume = slider_volume.value;
        slider_volume.style.backgroundSize = Math.floor((slider_volume.value / 1)*100) + "%";
    })

    // 再生終了判定
    audio.addEventListener("ended", (e) => {
        seekbar.value = 0;
        seekbar.style.backgroundSize = "0%";
        $(musicbox[id]).find("#current").text("00:00");
        playButton.children[0].src = "/img/Button_Play.png";
    });
}

// 時間を整形して返す
function playTime (t) {
    let resTime = '';
    t = Math.floor(t)

    if ( 60 <= t) {
        resTime = Math.floor(t / 60);
        resTime += ":" + Math.floor(t % 60).toString().padStart(2, "0");
    }
    else {
        resTime = "00:" + Math.floor(t % 60).toString().padStart(2, "0");
    }
    return resTime;
  }