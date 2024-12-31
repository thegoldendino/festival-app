import type { PageServerLoad } from './$types.js';

import fs from 'fs';
import path from 'path';
import toml from 'toml';

const mapImages = import.meta.glob(
  '/static/images/maps/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
  {
    eager: true,
    query: {
      enhanced: true
    }
  }
)

const artistImages = import.meta.glob(
  '/static/images/artists/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
  {
    eager: true,
    query: {
      enhanced: true
    }
  }
)


export const load: PageServerLoad = async () => {
  // Import data from TOML files
  const daysPath = path.resolve('src/data/days.toml');
  const artistsPath = path.resolve('src/data/artists.toml');
  const stagesPath = path.resolve('src/data/stages.toml');
  const optionsPath = path.resolve('src/data/options.toml');

  // Parse TOML files
  const days = toml.parse(fs.readFileSync(daysPath, 'utf-8'));
  const artists = toml.parse(fs.readFileSync(artistsPath, 'utf-8'));
  const stages = toml.parse(fs.readFileSync(stagesPath, 'utf-8'));
  const options = toml.parse(fs.readFileSync(optionsPath, 'utf-8'));

  // Add map images to day objects
  Object.entries(mapImages).forEach(([path, file]) => {
    const imageFilenameWithoutExtension = path.split('/').pop()?.split('.').shift();
    const typedFile = file as { default: { img: { src: string, w: number, h: number } } };

    if (!imageFilenameWithoutExtension || !days[imageFilenameWithoutExtension]) {
      return;
    }

    days[imageFilenameWithoutExtension].mapImage = {
      src: typedFile.default.img.src,
      width: typedFile.default.img.w,
      height: typedFile.default.img.h,
    };
  });

  // Add artist images to artist objects
  Object.entries(artistImages).forEach(([path, file]) => {
    const imageFilenameWithoutExtension = path.split('/').pop()?.split('.').shift();
    const typedFile = file as { default: { img: { src: string, w: number, h: number } } };

    if (!imageFilenameWithoutExtension || !artists[imageFilenameWithoutExtension]) {
      return;
    }
    artists[imageFilenameWithoutExtension].image = {
      src: typedFile.default.img.src,
      width: typedFile.default.img.w,
      height: typedFile.default.img.h
    };
  });

  return {
    days,
    artists,
    stages,
    options
  };
}
