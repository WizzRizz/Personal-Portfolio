interface BackgroundProps {
    videoURL: string;
}

function Background({videoURL}: BackgroundProps) {
    return (
        <div className="img-bg">
        <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/profilepic.gif"
            webkit-playsinline="true"
            x5-playsinline="true"
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
            <source src={videoURL} type="video/mp4" />
        </video>
        </div>
    )
}

export default Background;