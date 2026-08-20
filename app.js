const { useState, useEffect, useRef } = React;

// CUSTOMIZE THESE
const PROFILES = [
    { name: 'My Love', color: '#e50914' },
    { name: 'Beautiful', color: '#ff6b9d' },
    { name: 'Sweetheart', color: '#9b59b6' },
    { name: 'My Everything', color: '#3498db' }
];

const MAIN_VIDEO = 'assets/main-video.mp4';
const BACKGROUND_MUSIC = 'assets/background-music.mp3';

// Add your photos here - they'll show up in Memory Lane
const MEMORY_PHOTOS = [
    { id: 1, src: 'assets/memory1.jpg', title: 'Us' },
    { id: 2, src: 'assets/memory2.jpg', title: 'Together' },
    { id: 3, src: 'assets/memory3.jpg', title: 'Forever' },
    { id: 4, src: 'assets/memory4.jpg', title: 'Always' },
    { id: 5, src: 'assets/memory5.jpg', title: 'Love' },
    { id: 6, src: 'assets/memory6.jpg', title: 'You & Me' },
    { id: 7, src: 'assets/memory7.jpg', title: 'My Favorite' },
    { id: 8, src: 'assets/memory8.jpg', title: 'Perfect' },
];

// Poem slideshow - each slide shows an image with poem lines
const POEM_SLIDES = [
    {
        image: 'assets/poem1.jpg',
        lines: 'I still remember 11th grade,\nsitting in the back of that room,\nwatching the new transfer student walk in—\nthe girl who would quietly steal my whole world.'
    },
    {
        image: 'assets/poem2.jpg',
        lines: 'A semester later, you spoke to me for the first time,\nand right then, my heart made up its mind.'
    },
    {
        image: 'assets/poem3.jpg',
        lines: 'Even when the timing wasn\'t ours,\neven through two long years of waiting,\nI kept a quiet place for you inside my chest.\nI never truly moved on,\nbecause some things are just meant to be.'
    },
    {
        image: 'assets/poem4.jpg',
        lines: 'Then came that summer after our first year of college.\nMy birthday at RTC—\nsharing boba, laughing, taking pictures,\nneither of us saying what was already in the air.'
    },
    {
        image: 'assets/poem5.jpg',
        lines: 'A week later, you finally told me the truth,\nand under that open night sky watching the stars,\nfate finally caught up to us.'
    },
    {
        image: 'assets/poem6.jpg',
        lines: 'Look at everything we\'ve built in just one year:\nSitting on the deck by the Kirkland waterfront,\neating dinner by the lake, resting our heads on each other\'s shoulders,\nholding onto you in a hug I never wanted to end.'
    },
    {
        image: 'assets/poem7.jpg',
        lines: 'The silly dance reels we filmed in December,\ndressing up for fancy dinners,\nthe surprise gifts on your birthday in March...'
    },
    {
        image: 'assets/poem8.jpg',
        lines: 'And those two unforgettable days in Irvine—\nUniversal Studios, the ocean breeze at the beach,\nand simply falling asleep right by your side.'
    },
    {
        image: 'assets/poem9.jpg',
        lines: 'We\'ve had our tests lately, and some rough days.\nLife gets heavy sometimes.\nBut every single night when I close my eyes,\nonly one truth remains:\nthere is nothing in this world I want more than to see you smile.'
    },
    {
        image: 'assets/poem10.jpg',
        lines: 'I love you for exactly who you are.\nMy heart fell for you the moment I saw you in that classroom,\nit held on through the years,\nand it will never, ever let you go.\n\nHappy 1st Anniversary, my love.'
    },
];

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(BACKGROUND_MUSIC);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
        setTimeout(() => setLoggedIn(true), 500);
    };

    if (!loggedIn) {
        return <ProfileSelection profiles={PROFILES} onSelect={handleProfileSelect} />;
    }

    return <Netflix profileName={selectedProfile?.name} />;
}

function ProfileSelection({ profiles, onSelect }) {
    return (
        <div className="profile-selection">
            <div className="profile-container">
                <h1 className="profile-title">Who's watching?</h1>
                <div className="profiles-grid">
                    {profiles.map((profile, idx) => (
                        <div
                            key={idx}
                            className="profile-card"
                            onClick={() => onSelect(profile)}
                        >
                            <div
                                className="profile-avatar"
                                style={{ backgroundColor: profile.color }}
                            >
                                <span className="profile-initial">
                                    {profile.name.charAt(0)}
                                </span>
                            </div>
                            <span className="profile-name">{profile.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Netflix({ profileName }) {
    const [showPoemPlayer, setShowPoemPlayer] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);

    return (
        <div className="netflix">
            <Navbar profileName={profileName} />

            <Hero onPlayClick={() => setShowVideoPlayer(true)} />

            <div className="content-rows">
                <ContentRow
                    title="Our Greatest Moments"
                    subtitle="The special that started it all"
                >
                    <SpecialCard onClick={() => setShowVideoPlayer(true)} />
                </ContentRow>

                <ContentRow title="Memory Lane" subtitle="Every moment with you">
                    <MemoryGallery photos={MEMORY_PHOTOS} />
                </ContentRow>

                <ContentRow
                    title="Love Letters"
                    subtitle="A poem for my love"
                >
                    <LoveLetterCard onClick={() => setShowPoemPlayer(true)} />
                </ContentRow>

                <ContentRow title="More Memories" subtitle="Forever grateful for you">
                    <MemoryGallery photos={MEMORY_PHOTOS.slice().reverse()} />
                </ContentRow>
            </div>

            {showPoemPlayer && (
                <PoemPlayer
                    slides={POEM_SLIDES}
                    onClose={() => setShowPoemPlayer(false)}
                />
            )}

            {showVideoPlayer && (
                <VideoPlayer
                    videoSrc={MAIN_VIDEO}
                    onClose={() => setShowVideoPlayer(false)}
                />
            )}
        </div>
    );
}

function Navbar({ profileName }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="logo">OurFlix</h1>
                <span className="nav-link active">Home</span>
                <span className="nav-link">Memories</span>
                <span className="nav-link">Love Letters</span>
            </div>
            <div className="navbar-right">
                <div className="profile-icon">{profileName?.charAt(0)}</div>
            </div>
        </nav>
    );
}

function Hero({ onPlayClick }) {
    return (
        <div className="hero">
            <video className="hero-video" autoPlay loop muted playsInline>
                <source src={MAIN_VIDEO} type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">Our Love Story</h1>
                <p className="hero-description">
                    A collection of our most precious moments together
                </p>
                <div className="hero-buttons">
                    <button className="btn-play" onClick={onPlayClick}>
                        <span className="play-icon">▶</span> Play
                    </button>
                    <button className="btn-info" onClick={onPlayClick}>
                        <span className="info-icon">ⓘ</span> More Info
                    </button>
                </div>
            </div>
        </div>
    );
}

function ContentRow({ title, subtitle, children }) {
    return (
        <div className="content-row">
            <div className="row-header">
                <h2 className="row-title">{title}</h2>
                {subtitle && <p className="row-subtitle">{subtitle}</p>}
            </div>
            <div className="row-content">{children}</div>
        </div>
    );
}

function SpecialCard({ onClick }) {
    return (
        <div className="special-card" onClick={onClick}>
            <div className="special-thumbnail">
                <video className="special-video" muted>
                    <source src={MAIN_VIDEO} type="video/mp4" />
                </video>
                <div className="special-overlay">
                    <div className="play-button-large">▶</div>
                </div>
            </div>
            <div className="special-info">
                <h3>Our Anniversary Special</h3>
                <p>A journey through our love</p>
                <div className="special-meta">
                    <span className="match">99% Match</span>
                    <span className="duration">Full of Love</span>
                </div>
            </div>
        </div>
    );
}

function MemoryGallery({ photos }) {
    return (
        <div className="memory-gallery">
            {photos.map((photo) => (
                <div key={photo.id} className="memory-card">
                    <img src={photo.src} alt={photo.title} />
                    <div className="memory-overlay">
                        <span className="memory-title">{photo.title}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

function LoveLetterCard({ onClick }) {
    return (
        <div className="love-letter-card" onClick={onClick}>
            <div className="letter-content">
                <div className="heart-icon">♥</div>
                <h3>A Poem For You</h3>
                <p>Click to read</p>
            </div>
        </div>
    );
}

function PoemPlayer({ slides, onClose }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const timer = setTimeout(() => {
            if (currentSlide < slides.length - 1) {
                setCurrentSlide(currentSlide + 1);
            }
        }, 6000); // Increased to 6 seconds for longer poems

        return () => clearTimeout(timer);
    }, [currentSlide, isPaused, slides.length]);

    const goNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const goPrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const slide = slides[currentSlide];

    return (
        <div className="poem-player">
            <button className="close-button" onClick={onClose}>✕</button>

            <div className="poem-slide">
                <img src={slide.image} alt="Memory" className="poem-image" />
                <div className="poem-overlay"></div>
                <div className="poem-text">
                    <p>{slide.lines}</p>
                </div>
            </div>

            <div className="poem-controls">
                <button
                    className="control-btn"
                    onClick={goPrev}
                    disabled={currentSlide === 0}
                >
                    ‹
                </button>
                <button
                    className="control-btn"
                    onClick={() => setIsPaused(!isPaused)}
                >
                    {isPaused ? '▶' : '⏸'}
                </button>
                <button
                    className="control-btn"
                    onClick={goNext}
                    disabled={currentSlide === slides.length - 1}
                >
                    ›
                </button>
            </div>

            <div className="poem-progress">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`progress-dot ${idx === currentSlide ? 'active' : ''} ${idx < currentSlide ? 'completed' : ''}`}
                        onClick={() => setCurrentSlide(idx)}
                    />
                ))}
            </div>
        </div>
    );
}

function VideoPlayer({ videoSrc, onClose }) {
    return (
        <div className="video-player-modal">
            <button className="close-button" onClick={onClose}>✕</button>
            <div className="video-player-container">
                <video className="main-video-player" controls autoPlay>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
