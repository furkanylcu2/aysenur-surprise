# Ayşenur'a — Furkan'dan

Ayşenur için hazırlanmış, React + Vite tabanlı romantik ve interaktif dijital hediye.

## Gereksinimler
- Node.js 20 veya üzeri
- npm

## Bilgisayarda çalıştırma
1. ZIP dosyasını çıkar.
2. Proje klasöründe terminal aç.
3. `npm install`
4. `npm run dev`
5. Terminalde görünen yerel adresi tarayıcıda aç (genellikle http://localhost:5173).

Üretim derlemesi için: `npm run build`  
Derlemeyi yerelde kontrol etmek için: `npm run preview`

## Fotoğraf ekleme
1. Fotoğraflarını `public/images/` klasörüne kopyala.
2. `src/config.js` dosyasını aç.
3. `photos` dizisindeki örnekleri kendi dosya adların ve notlarınla değiştir.

Örnek:
```js
export const photos = [
  { src: "/images/ayse-furkan-01.jpg", caption: "O gün çok gülmüştük." },
  { src: "/images/ayse-furkan-02.jpg", caption: "Bir başka güzel anı." }
];
```
İstediğin kadar fotoğraf ekleyebilirsin. Dosya bulunamazsa galeri boş/kırık görsel yerine tasarlanmış yer tutucu gösterir.

## Müzik ekleme
Tarayıcıların otomatik oynatma kısıtlamaları nedeniyle müzik, Ayşenur zarfı açmak için dokunduğunda başlatılmayı dener.

1. Kullanım hakkına sahip olduğun ses dosyasını `public/music/` klasörüne koy.
2. `src/config.js` içindeki `audioSrc` değerini dosya yoluyla değiştir:
```js
export const audioSrc = "/music/ilk-goruste-diyenler.mp3";
```
3. Kaydet ve siteyi yenile.

**Önemli:** Spotify bağlantısı doğrudan MP3 değildir. Spotify'dan şarkı indirmeye veya Spotify URL'sini `<audio>` kaynağı olarak kullanmaya çalışma. Spotify kullanacaksan resmi Spotify Embed bağlantısını `spotifyEmbedUrl` alanına ekleyebilirsin. Spotify oynatıcısının kendi kontrolleri vardır; sayfadaki yerel ses seviyesi kontrolü Spotify embed'ini yönetmez. Embed otomatik çalmayı garanti etmez. En sorunsuz entegre deneyim, kullanım hakkına sahip olduğun bir ses dosyasıdır.

## İnternette yayınlama — GitHub Pages yerine Netlify kolay seçenek
1. GitHub'da yeni bir repository oluştur ve bu klasördeki dosyaları yükle.
2. Netlify hesabında **Add new site → Import an existing project** seç.
3. GitHub repository'sini bağla.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy'e bas. Netlify sana paylaşabileceğin bir HTTPS adresi verir.

Vercel'de de **New Project** ile aynı repository'yi seçebilirsin. Framework Vite, build command `npm run build`, output directory `dist` olmalı.

## İçerik notları
- Mektup metnini `src/main.jsx` içindeki `letter-copy` bölümünden değiştirebilirsin.
- İsimler ve başlıklar aynı dosyada bulunur.
- Fotoğraf altyazıları `src/config.js` içinden düzenlenir.
- Müzik çalmıyorsa `audioSrc` yolunu, dosya adının büyük/küçük harflerini ve tarayıcı konsolunu kontrol et.

## Teknik notlar
- Tek sayfalı React uygulaması; mektup ve galeri geçişleri React state ile yapılır.
- Ses elementi uygulamanın üst seviyesinde kalır; galeriye geçerken yeniden oluşturulmaz ve parça başa sarmaz.
- Galeri lightbox'ı ileri/geri, Escape, klavye okları ve mobil yatay kaydırmayı destekler.
- `prefers-reduced-motion` kullanan cihazlarda animasyonlar azaltılır.
- Gerçek fotoğraflar ve ses dosyası henüz projeye eklenmemiştir; örnek yer tutucular bilinçli olarak bırakılmıştır.
