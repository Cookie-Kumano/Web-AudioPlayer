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
        musicbox[i].getElementsByClassName("play")[0].addEventListener("click", {name: i, handleEvent: playMusic}, false);
        musicbox[i].getElementsByClassName("seekbar")[0].style.backgroundSize = "0%"; 
    }

}

function playMusic() {
    let audio = musicbox[this.name].children[0];
    let seekbar = musicbox[this.name].getElementsByClassName("seekbar")[0];
    let slider_volume = musicbox[this.name].getElementsByClassName("volume")[0];

    // 音量の設定
    audio.volume = slider_volume.value;

    if (audio.paused) {
        audio.play();
    }   else {
        audio.pause();
    }

    // 現在の再生位置を表示
    audio.addEventListener("timeupdate", (e) => {
        const current = Math.floor(audio.currentTime);
        const duration = Math.round(audio.duration);
        if (!isNaN(duration)) {
            $(musicbox[this.name]).find("#current").text(playTime(current));
            $(musicbox[this.name]).find("#duration").text(playTime(duration));
            const percent = Math.round((audio.currentTime/audio.duration)*1000)/10;
            seekbar.style.backgroundSize = percent + "%"; 
        }
    });

    // プログレスバーを引っ叩くと再生位置を変えられる
    seekbar.addEventListener("click", (e) => {
        const duration = Math.round(audio.duration);
        if(!isNaN(duration)){
            const mouse = e.pageX;
            const rect = seekbar.getBoundingClientRect();
            const position = rect.left + window.pageXOffset;
            const offset = mouse - position;
            const width = rect.right - rect.left;
            audio.currentTime = Math.round(duration * (offset / width));
          }
    });

    // 音量スライダーの実装
    slider_volume.addEventListener("input", (e) => {
        audio.volume = slider_volume.value;
    })

    // 再生終了判定
    audio.addEventListener("ended", (e) => {
        seekbar.style.backgroundSize = "0%";
        $(musicbox[this.name]).find("#current").text("00:00");
        $(musicbox[this.name]).find("#duration").text("00:00");
    });
}

function playTime (t) {
    let hms = '';
    const h = t / 3600 | 0;
    const m = t % 3600 / 60 | 0;
    const s = t % 60;
    const z2 = (v) => {
      const s = '00' + v;
      return s.substr(s.length - 2, 2);
    }
    if(h != 0){
      hms = h + ':' + z2(m) + ':' + z2(s);
    }else if(m != 0){
      hms = z2(m) + ':' + z2(s);
    }else{
      hms = '00:' + z2(s);
    }
    return hms;
  }