document.addEventListener('DOMContentLoaded', function () {
    const videoContainer = document.querySelector('.main__video')
    const videoPlayer = document.querySelector('.main__video-player')
    const playButton = document.querySelector('.main__video-img')

    videoContainer.addEventListener('click', function () {
        if (!videoPlayer.src) {
            videoPlayer.src = '../video/memp.mp4'
        }

        videoPlayer.style.display = 'block'
        playButton.style.display = 'none'

        videoPlayer
            .play()
            .then(() => {
                if (videoPlayer.requestFullscreen) {
                    videoPlayer.requestFullscreen()
                } else if (videoPlayer.webkitRequestFullscreen) {
                    videoPlayer.webkitRequestFullscreen()
                } else if (videoPlayer.msRequestFullscreen) {
                    videoPlayer.msRequestFullscreen()
                } else if (videoPlayer.mozRequestFullScreen) {
                    videoPlayer.mozRequestFullScreen()
                }
            })
            .catch((error) => {
                console.log('Error attempting to play video:', error)
            })
    })

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    function handleFullscreenChange() {
        if (
            !document.fullscreenElement &&
            !document.webkitFullscreenElement &&
            !document.mozFullScreenElement &&
            !document.msFullscreenElement
        ) {
            videoPlayer.pause()
            videoPlayer.style.display = 'none'
            playButton.style.display = 'block'
        }
    }
})
