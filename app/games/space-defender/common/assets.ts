import { Assets, type Texture } from 'pixi.js';
import appTextures, { allTextureKeys } from './textures';

Object.entries(appTextures).forEach(([key, value]) => {
	Assets.add({ alias: key, src: value });
});

const textures = new Map<string, Texture>();

export const loadAssets = (onProgress: (progress: number | 'all') => void): void => {
	const keys = Object.values(allTextureKeys);
	Assets.load([...keys], onProgress).then((data) => {
		Object.entries(data).forEach(([key, value]) => {
			textures.set(key, value);
		});
		onProgress('all');
	});
};

export const getTexture = (id: string): Texture | null => {
	if (textures.has(id)) {
		return textures.get(id) ?? null;
	}
	return null;
};
