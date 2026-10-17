import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validExts = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];

// 1. Scan Guest Photos (guest_img)
const guestImgDir = path.resolve(__dirname, '../public/guest_img');
const guestJsonPath = path.resolve(__dirname, '../src/data/guestPhotos.json');

if (fs.existsSync(guestImgDir)) {
  const guestFiles = fs.readdirSync(guestImgDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return validExts.includes(ext) && !f.startsWith('.');
  });

  const guestPhotos = guestFiles.map((filename, index) => {
    const match = filename.match(/^table_(\d+)_/);
    const table = match ? parseInt(match[1], 10) : null;
    return {
      id: 'guest_photo_' + (index + 1),
      filename,
      url: './guest_img/' + filename,
      table: table,
      title: table ? ('Маса ' + table) : 'Снимка от гости',
    };
  });

  fs.writeFileSync(guestJsonPath, JSON.stringify(guestPhotos, null, 2));
  console.log(`[UpdatePhotos] Synced ${guestPhotos.length} guest photo(s) into src/data/guestPhotos.json.`);
}

// 2. Scan Wedding Photos (wedding_img)
const weddingImgDir = path.resolve(__dirname, '../public/wedding_img');
const weddingOutJson = path.resolve(weddingImgDir, 'photos.json');
const weddingSrcJson = path.resolve(__dirname, '../src/data/weddingPhotos.json');

if (!fs.existsSync(weddingImgDir)) {
  fs.mkdirSync(weddingImgDir, { recursive: true });
}

const weddingFiles = fs.readdirSync(weddingImgDir).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return validExts.includes(ext) && !f.startsWith('.');
});

const weddingPhotos = weddingFiles.map((file, idx) => ({
  id: `wedding_photo_${idx + 1}`,
  filename: file,
  url: './wedding_img/' + file,
  title: `Сватбена снимка #${idx + 1}`,
  category: 'Официални кадри',
}));

fs.writeFileSync(weddingOutJson, JSON.stringify(weddingPhotos, null, 2));
fs.writeFileSync(weddingSrcJson, JSON.stringify(weddingPhotos, null, 2));
console.log(`[UpdatePhotos] Synced ${weddingPhotos.length} wedding photo(s) into public/wedding_img/photos.json.`);
