// Fotoğrafları ve müziği buradan yönetebilirsin.
// Fotoğrafları public/images/ klasörüne koy. Henüz olmayan dosyalar şık yer tutucu gösterir.
export const photos = [
  { src: "/images/photo1.jpeg", caption: "Verdiğim en güzel mücadele." },
  { src: "/images/photo2.jpeg", caption: "Sanat eserinden daha öte..." },
  { src: "/images/photo3.jpeg", caption: "Öyle bi alıyorsun ki aklımı," },
  { src: "/images/photo4.jpeg", caption: "Bu anılarda yanında olmak istiyorum." },
  { src: "/images/photo5.jpeg", caption: "Kusursuz..." }
];

// Yasal olarak kullanabildiğin MP3/M4A dosyasını public/music/ içine koyup yolu yaz.
// Örnek: audioSrc: "/music/ilk-goruste-diyenler.mp3"
// Boş bırakılırsa uygulama müzik varmış gibi davranmaz; zarif bir bilgilendirme gösterir.
export const audioSrc = "/music/sarki.mp3";

// İstersen kendi yasal ses dosyan yerine Spotify'ın resmi paylaşım/Embed bağlantısını
// burada kullanmak üzere README'deki yönergeyi takip edebilirsin. Spotify embed, uygulamanın
// yerel ses seviyesi kontrolleriyle yönetilemez.
export const spotifyEmbedUrl = "";
