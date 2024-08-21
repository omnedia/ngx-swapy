import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChild } from '@angular/core';
import { Config, SwapEventData, SwapEventDataData, SwapyApi, SwapyContentElement } from './ngx-swapy.types';
import { createSwapy } from 'swapy';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'om-swapy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-swapy.component.html",
  styleUrl: "./ngx-swapy.component.scss"
})
export class NgxSwapyComponent implements AfterViewInit, OnDestroy {
  @Input('styleClass')
  styleClass?: string;

  @Input('disableSwap')
  set disableSwap(disableSwap: boolean) {
    this.swapDisabled = disableSwap;

    if (this.swapyApi) {
      this.swapyApi.enable(!this.swapDisabled);
    }
  }

  @Input('swapyConfig')
  swapyConfig: Config = {
    animation: 'dynamic',
    continuousMode: true,
  }

  swapDisabled = false;

  @Output('onSwap') onSwap = new EventEmitter<SwapEventDataData>();

  @ViewChild('OmSwapyContainer') containerRef!: ElementRef<HTMLElement>;
  @ContentChildren('OmSwapyContent') swapElementRefs?: QueryList<ElementRef<HTMLElement>>;

  swapElements: SwapyContentElement[] = [];

  private swapyApi?: SwapyApi;

  private domChangeObserver?: MutationObserver;

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    if (!this.swapElementRefs) {
      return;
    }

    this.swapElements = this.swapElementRefs?.toArray().map((ref) => {
      console.log(ref.nativeElement.outerHTML);
      return {
        uuids: [
          this.generateUUID(),
          this.generateUUID(),
        ],
        element: this.sanitizer.bypassSecurityTrustHtml(ref.nativeElement.outerHTML)
      }
    });

    this.domChangeObserver = new MutationObserver(() => this.initSwapy());

    this.domChangeObserver.observe(this.containerRef.nativeElement, { childList: true });
  }

  ngOnDestroy(): void {
    if (this.domChangeObserver) {
      this.domChangeObserver.disconnect();
    }
  }

  initSwapy(): void {
    if (this.domChangeObserver) {
      this.domChangeObserver?.disconnect();
      this.domChangeObserver = undefined;
    }

    this.swapyApi = createSwapy(this.containerRef.nativeElement, this.swapyConfig);

    this.swapyApi.enable(!this.swapDisabled);

    this.swapyApi.onSwap((event: SwapEventData) => {
      this.onSwap.emit(event.data);
    })
  }

  private generateUUID(): string {
    return crypto.randomUUID();
  }
}