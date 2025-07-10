declare interface ParticleNetworkOptions {
	readonly particleColor?: string;
	readonly background?: string;
	readonly interactive?: boolean;
	readonly speed?: 'fast' | 'slow' | 'none' | number;
	readonly density?: 'high' | 'low' | number;
}

type ParticleNetwork = object;

declare const ParticleNetwork: {
	new (container: HTMLDivElement, options?: ParticleNetworkOptions): ParticleNetwork;
};

declare global {
	interface Window {
		readonly ParticleNetwork: typeof ParticleNetwork;
	}
}

export as namespace ParticleNetwork;
export default ParticleNetwork;
