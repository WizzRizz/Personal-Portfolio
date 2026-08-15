interface BackgroundProps {
    videoURL: string;
}

function Background({videoURL}: BackgroundProps) {
    return (
        <div className="img-bg fixed top-0 left-0 w-screen h-screen">
        <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/profilepic.gif"
            webkit-playsinline="true"
            x5-playsinline="true"
            className="w-full h-full object-cover"
        >
            <source src={videoURL} type="video/mp4" />
        </video>
        </div>
    )
}

export default Background;