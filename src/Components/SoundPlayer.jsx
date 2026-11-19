import { useRef, useState } from "react"

// 75 seconds -> "1:15"
function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const rest = Math.floor(seconds % 60).toString().padStart(2, "0")
    return `${minutes}:${rest}`
}

// A small audio player. The real <audio> element is hidden; we draw our own buttons and talk to it through a ref.
export default function SoundPlayer({ src, name }) {

    // useRef = a handle to the real <audio> element, so we can call .play() and .pause() on it
    const audioRef = useRef(null)

    const [playing, setPlaying] = useState(false)
    const [time, setTime] = useState(0)
    const [duration, setDuration] = useState(0)

    if (!src) {
        return (
            <div className="rounded-3xl border border-dashed border-line px-5 py-4 text-sm text-muted">
                <span className="eyebrow">Sound sample</span>
                <p className="mt-1">A recording of this instrument is coming soon.</p>
            </div>
        )
    }

    const togglePlay = () => {
        const audio = audioRef.current
        if (playing) {
            audio.pause()
        } else {
            audio.play().catch(() => setPlaying(false))
        }
    }

    // Dragging the slider jumps to that moment in the recording
    const handleSeek = (event) => {
        const newTime = Number(event.target.value)
        audioRef.current.currentTime = newTime
        setTime(newTime)
    }

    return (
        <div className="rounded-3xl border border-line bg-sand/60 px-5 py-4">
            <p className="eyebrow">Sound sample</p>

            <div className="mt-3 flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    aria-label={playing ? `Pause ${name}` : `Play ${name}`}
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-clay text-white transition hover:bg-clay-dark active:scale-95"
                >
                    {playing ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <rect x="6" y="5" width="4" height="14" rx="1" />
                            <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                        </svg>
                    )}
                </button>

                <div className="flex-1">
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.01"
                        value={time}
                        onChange={handleSeek}
                        aria-label={`Position in the ${name} sample`}
                        className="h-1.5 w-full cursor-pointer accent-clay"
                    />
                    <div className="mt-1 flex justify-between text-xs tabular-nums text-muted">
                        <span>{formatTime(time)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            {/* The hidden real player. Its events keep our buttons in sync with what it is doing. */}
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            />
        </div>
    )
}
