export default class Nyan {
    private context;
    private song;
    private catHeight;
    private catWidth;
    private options;
    private defaultOptions;
    private defaultCue;
    private songReadyResolve;
    private songReadyPromise;
    private NO_TRANSITION;
    private cueTimeouts;
    private styledPositions;
    constructor(options: NyanOptions);
    nyan(): void;
    checkCompat(logErrors?: boolean): boolean;
    private prepareContext;
    private prepareCats;
    private resetCats;
    private getTransition;
}
export interface NyanOptions {
    rumble?: boolean;
    song?: string | HTMLAudioElement | null;
    transitionDuration?: number;
    transitionTiming?: string;
    zIndex?: number;
    cues: NyanCue[];
}
export interface NyanCue {
    delay?: number;
    start?: NyanPosition;
    end?: NyanPosition;
    rumble?: boolean | null;
    transitionDuration?: number;
    transitionTiming?: string;
    zIndex?: number;
    _element?: HTMLDivElement;
}
export declare type NyanPosition = 'left-bottom' | 'left' | 'left-top' | 'top-left' | 'top' | 'top-right' | 'right-top' | 'right' | 'right-bottom' | 'bottom-right' | 'bottom' | 'bottom-left';
