import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, ChevronDown, Music2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { photos, audioSrc, spotifyEmbedUrl } from './config';
import './style.css';

const stars = Array.from({ length: 72 }, (_, i) => ({
  left: `${(i * 37.71) % 100}%`, top: `${(i * 61.37) % 100}%`,
  delay: `${(i % 11) * -0.7}s`, duration: `${3 + (i % 5)}s`, size: i % 9 === 0 ? 2.5 : 1.4
}));

function App() {
  const [stage, setStage] = useState('intro');
  const [opening, setOpening] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [muted, setMuted] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [loadedPhotos, setLoadedPhotos] = useState({});
  const audioRef = useRef(null);
  const touchStart = useRef(null);

  const hasAudio = Boolean(audioSrc);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
    const onKey = (event) => {
      if (activePhoto === null) return;
      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowRight') changePhoto(1);
      if (event.key === 'ArrowLeft') changePhoto(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePhoto]);

  const startMusic = async () => {
    if (!audioRef.current || !hasAudio) return;
    try {
      await audioRef.current.play();
      setMusicPlaying(true);
      setMusicError(false);
    } catch {
      setMusicPlaying(false);
      setMusicError(true);
    }
  };

  const toggleMusic = async () => {
    if (!hasAudio || !audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      await startMusic();
    }
  };

  const openLetter = async () => {
    if (opening) return;
    setOpening(true);
    // Tarayıcı izinleri için play() gerçek kullanıcı tıklamasının içinde çağrılır.
    await startMusic();
    window.setTimeout(() => setStage('letter'), 850);
  };

  const changePhoto = (direction) => {
    setActivePhoto((current) => {
      if (current === null) return current;
      return (current + direction + photos.length) % photos.length;
    });
  };

  const handleTouchStart = (event) => { touchStart.current = event.touches[0].clientX; };
  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 45) changePhoto(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <main className="universe">
      <div className="nebula nebula-one" /><div className="nebula nebula-two" />
      <div className="stars" aria-hidden="true">{stars.map((star, i) => <i key={i} style={{ left: star.left, top: star.top, animationDelay: star.delay, animationDuration: star.duration, width: star.size, height: star.size }} />)}</div>
      <div className="horizon-glow" />

      {hasAudio && <audio ref={audioRef} src={audioSrc} loop preload="none" onEnded={() => setMusicPlaying(false)} onError={() => { setMusicPlaying(false); setMusicError(true); }} />}

      {stage === 'intro' && (
        <section className={`intro-screen ${opening ? 'is-opening' : ''}`}>
          <div className="intro-kicker"><span /> KÜÇÜK BİR NOT <span /></div>
          <button className="envelope-button" onClick={openLetter} aria-label="Mektubu aç" disabled={opening}>
            <div className="envelope-shadow" />
            <div className="envelope">
              <div className="envelope-back" />
              <div className="letter-peek"><span>Ayşenur’a…</span><small>Bir şey söylemek istedim.</small></div>
              <div className="envelope-front" />
              <div className="envelope-flap" />
              <div className="wax-seal">f<span>✦</span></div>
            </div>
          </button>
          <h1>Senin için küçük<br /><em>bir şey hazırladım,</em> Ayşenur.</h1>
          <p className="intro-subtitle">Biraz zamanını bana ayırır mısın?</p>
          <button className="text-cta" onClick={openLetter} disabled={opening}>Mektubu aç <span>↗</span></button>
          <div className="bottom-note">FURKAN’DAN, SANA</div>
        </section>
      )}

      {stage === 'letter' && (
        <section className="letter-screen screen-enter">
          <div className="letter-topline"><span>01 / BİRKAÇ KELİME</span><span>AYŞENUR’A</span></div>
          <article className="letter-card">
            <div className="paper-star">✳</div>
            <p className="eyebrow">İÇİMDEN GELDİĞİ GİBİ</p>
            <h2>Ayşenur’a<span>…</span></h2>
            <div className="letter-copy">
              <p>Öncelikle bana güvenmeyi ve bu ihtimale bir şans vermeyi denediğin için sana teşekkür etmek istiyorum.</p>
              <p>Bunun senin için kolay bir karar olmadığını biliyorum. Alıştığın düzenin dışına çıkmanın, daha önce deneyimlemediğin bir şeye adım atmanın beraberinde soru işaretleri getirmesini anlayabiliyorum.</p>
              <p>Senden hiçbir şeyi bir anda değiştirmeni ya da bütün endişelerini bir kenara bırakmanı beklemiyorum. Sadece bana verdiğin güveni boşa çıkarmamak için elimden geleni yapacağımı bilmeni istiyorum. Seni isteyerek kırmak ya da üzmek istemem. Her zaman her şeyi doğru yapacağımı söyleyemem ama bir sorun yaşadığımızda görmezden gelmek yerine birlikte çözmek için çabalarım.</p>
              <p>Bazen birbirimizi anlamakta zorlanabilir, bazen farklı düşünebiliriz. Her şeyin kusursuz olmasına gerek yok. Önemli olan dürüst olmak, birbirimize anlayış göstermek ve birbirimizi gerçekten mutlu etmeyi istemek.</p>
              <p>Ben seninle güzel şeyler yaşamak istiyorum. Birlikte yeni yerler keşfetmek, saçma şeylere gülmek, güzel anılar biriktirmek ve zamanla birbirimizi daha iyi tanımak…</p>
              <p>Bana bu şansı verdiğin için mutluyum. Umarım ileride geriye dönüp baktığımızda, “İyi ki denemişiz.” deriz.</p>
              <p>Şimdilik söylemek istediğim tek şey bu.</p>
            </div>
            <div className="signature"><span>İyi ki…</span><strong>Furkan</strong><i>✦</i></div>
          </article>
          <div className="letter-next">
            <p>Şimdi sen bu şarkının tadını çıkar. Ama gitmeden önce sana göstermek istediğim birkaç şey daha var…</p>
            <button className="primary-cta" onClick={() => setStage('gallery')}>Küçük galerimize göz at <span>↗</span></button>
          </div>
        </section>
      )}

      {stage === 'gallery' && (
        <section className="gallery-screen screen-enter">
          <div className="gallery-heading">
            <div className="letter-topline"><span>02 / KÜÇÜK ANLAR</span><span>FURKAN & AYŞENUR</span></div>
            <p className="eyebrow">ŞİMDİLİK SADECE SEN...</p>
            <h2>Senin anılarından<br /><em>küçük bir seçki.</em></h2>
            <p className="gallery-intro">Her fotoğrafının senin için bir hikâyesi var. Umarım bir gün burayı yeni anılarımızla değiştirme fırsatım olur...</p>
          </div>
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <button className={`photo-card photo-card-${index % 3}`} key={`${photo.src}-${index}`} onClick={() => setActivePhoto(index)} aria-label={`${index + 1}. fotoğrafı tam ekran aç`}>
                <div className="photo-frame">
                  {!loadedPhotos[index] && <div className="photo-placeholder"><span>✧</span><small>BURAYA BİR ANIMIZ GELECEK</small></div>}
                  <img src={photo.src} alt={photo.caption || `Ayşenur ve Furkan anısı ${index + 1}`} loading="lazy" onLoad={() => setLoadedPhotos((old) => ({ ...old, [index]: true }))} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <span className="photo-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="photo-expand">⤢</span>
                </div>
                {photo.caption && <p className="photo-caption">{photo.caption}</p>}
              </button>
            ))}
          </div>
          <footer className="gallery-footer"><span>ŞİMDİLİK BU KADAR.</span><div>✦</div><p>Güzel şeylerin devamı gelsin.</p><small>FURKAN’DAN, AYŞENUR’A</small></footer>
          <button className="back-link" onClick={() => setStage('letter')}><ArrowLeft size={15} /> Mektuba dön</button>
        </section>
      )}

      {stage !== 'intro' && <div className="music-control">
        <div className={`music-disc ${musicPlaying ? 'spinning' : ''}`}><Music2 size={15} /></div>
        <div className="music-info"><strong>Bizim şarkımız</strong><span>{hasAudio ? (musicError ? 'Ses dosyası açılamadı' : musicPlaying ? 'Şu an çalıyor' : 'Duraklatıldı') : 'Müzik dosyası bekleniyor'}</span></div>
        <button className="music-action" onClick={toggleMusic} disabled={!hasAudio} aria-label={musicPlaying ? 'Müziği duraklat' : 'Müziği oynat'}>{musicPlaying ? <Pause size={16} /> : <Play size={16} />}</button>
        <button className="volume-action" onClick={() => setMuted((m) => !m)} disabled={!hasAudio} aria-label={muted ? 'Sesi aç' : 'Sesi kapat'}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button>
        <input aria-label="Ses seviyesi" className="volume-slider" type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }} disabled={!hasAudio} />
      </div>}

      {musicError && <div className="music-hint" role="status">Müzik dosyası bulunamadı. <code>src/config.js</code> içindeki yolu kontrol et.</div>}
      {!hasAudio && stage !== 'intro' && <div className="music-hint" role="status">Şarkıyı eklemek için <code>public/music/</code> klasörüne ses dosyanı koyup <code>src/config.js</code> içindeki <code>audioSrc</code> alanını doldur.</div>}

      {activePhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotoğraf görüntüleyici" onClick={() => setActivePhoto(null)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Kapat"><X /></button>
          <button className="lightbox-arrow prev" onClick={(e) => { e.stopPropagation(); changePhoto(-1); }} aria-label="Önceki fotoğraf"><ArrowLeft /></button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-wrap">
              {loadedPhotos[activePhoto] ? <img src={photos[activePhoto].src} alt={photos[activePhoto].caption || 'Anı fotoğrafı'} /> : <div className="photo-placeholder large"><span>✧</span><small>FOTOĞRAFINI BURAYA EKLE</small></div>}
            </div>
            <div className="lightbox-caption"><span>{String(activePhoto + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span><p>{photos[activePhoto].caption}</p></div>
          </div>
          <button className="lightbox-arrow next" onClick={(e) => { e.stopPropagation(); changePhoto(1); }} aria-label="Sonraki fotoğraf"><ArrowRight /></button>
          <div className="swipe-note">GEÇİŞ İÇİN KAYDIR</div>
        </div>
      )}

      {spotifyEmbedUrl && <div className="spotify-embed"><iframe title="Spotify player" src={spotifyEmbedUrl} width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></div>}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
