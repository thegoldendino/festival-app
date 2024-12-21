import type { PageServerLoad } from './$types.js';

import fs from 'fs';
import path from 'path';
import toml from 'toml';

export const load: PageServerLoad = async () => {
  const daysPath = path.resolve('src/data/days.toml');
  const artistsPath = path.resolve('src/data/artists.toml');
  const stagesPath = path.resolve('src/data/stages.toml');
  const optionsPath = path.resolve('src/data/options.toml');

  const days = toml.parse(fs.readFileSync(daysPath, 'utf-8'));
  const artists = toml.parse(fs.readFileSync(artistsPath, 'utf-8'));
  const stages = toml.parse(fs.readFileSync(stagesPath, 'utf-8'));
  const options = toml.parse(fs.readFileSync(optionsPath, 'utf-8'));

  return {
    days,
    artists,
    stages,
    options
  };
}
