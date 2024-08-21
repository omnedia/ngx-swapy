import { SafeHtml } from "@angular/platform-browser";

export type SwapyContentElement = {
    uuids: string[],
    element: SafeHtml,
}

export type AnimationType = 'dynamic' | 'spring' | 'none';

export type Config = {
    animation: AnimationType;
    continuousMode: boolean;
};

export type SwapCallback = (event: SwapEventData) => void;

export type SwapEventArray = Array<{
    slot: string;
    item: string | null;
}>;

export type SwapEventData = {
    data: SwapEventDataData;
}

export type SwapEventDataData = {
    map: SwapEventMap;
    array: SwapEventArray;
    object: SwapEventObject;
}

export type SwapEventMap = Map<string, string | null>;

export type SwapEventObject = Record<string, string | null>;

export interface SwapyApi {
    onSwap(callback: SwapCallback): void;
    enable(enabled: boolean): void;
}