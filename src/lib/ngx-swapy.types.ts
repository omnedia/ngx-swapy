import {TemplateRef} from '@angular/core';
import {SwapEvent} from 'swapy';

export type SwapyContentElement = {
  uuids: string[];
  element: TemplateRef<any>;
};

export interface OmSwapEvent extends SwapEvent {
  draggingElement?: Element | null;
  swappedWithElement?: Element | null;
}
