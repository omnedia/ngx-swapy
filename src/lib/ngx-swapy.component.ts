import {CommonModule} from "@angular/common";
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  signal,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import {OmSwapEvent, SwapyContentElement,} from "./ngx-swapy.types";
import {Config, createSwapy, SwapEndEvent, SwapStartEvent, Swapy} from "swapy";

@Component({
  selector: "om-swapy",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-swapy.component.html",
  styleUrl: "./ngx-swapy.component.scss",
})
export class NgxSwapyComponent implements AfterViewInit, OnDestroy {
  @Input("styleClass")
  styleClass?: string;

  @Input("disableSwap")
  set disableSwap(disableSwap: boolean) {
    this.swapDisabled = disableSwap;

    if (this.swapyApi) {
      this.swapyApi.enable(!this.swapDisabled);
    }
  }

  swapDisabled = false;

  @Input("swapyConfig")
  swapyConfig: Config = {
    animation: "dynamic",
    swapMode: "hover",
    enabled: true,
    dragOnHold: false,
    autoScrollOnDrag: true,
    dragAxis: "both",
    manualSwap: false,
  };

  @Input("templateColumns")
  set templateColumns(templateColumns: string) {
    if (!templateColumns && templateColumns.length <= 0) {
      this.style["--om-swapy-template-columns"] = "1fr 1fr 1fr";
      return;
    }

    this.style["--om-swapy-template-columns"] = templateColumns;
  }

  @Input("gridGap")
  set gridGap(gridGap: string) {
    if (!gridGap && gridGap.length <= 0) {
      this.style["--om-swapy-gap"] = "1rem";
      return;
    }

    this.style["--om-swapy-gap"] = gridGap;
  }

  style: any = {};

  @Output("onSwapStart") onSwapStart = new EventEmitter<SwapStartEvent>();
  @Output("onSwap") onSwap = new EventEmitter<OmSwapEvent>();
  @Output("onSwapEnd") onSwapEnd = new EventEmitter<SwapEndEvent>();

  @ViewChild("OmSwapyContainer") containerRef!: ElementRef<HTMLElement>;

  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;

  swapElements = signal<SwapyContentElement[]>([]);

  private swapyApi?: Swapy;

  private domChangeObserver?: MutationObserver;

  ngAfterViewInit(): void {
    if (!this.templates) {
      return;
    }

    this.swapElements.set(this.templates?.toArray().map((template) => {
      return {
        uuids: [this.generateUUID(), this.generateUUID()],
        element: template
      };
    }));

    this.domChangeObserver = new MutationObserver(() => this.initSwapy());

    this.domChangeObserver.observe(this.containerRef.nativeElement, {
      childList: true,
    });
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

    this.swapyApi = createSwapy(
      this.containerRef.nativeElement,
      this.swapyConfig,
    );

    this.swapyApi.enable(!this.swapDisabled);

    this.swapyApi.onSwapStart((event) => {
      this.onSwapStart.emit(event);
    });

    this.swapyApi.onSwap((event) => {
      const draggingItemElement = this.containerRef.nativeElement.querySelector(`[data-swapy-item="${event.draggingItem}"]`);
      const swappedWithItemElement = this.containerRef.nativeElement.querySelector(`[data-swapy-item="${event.swappedWithItem}"]`);

      const data = event as OmSwapEvent;
      data.draggingElement = draggingItemElement;
      data.swappedWithElement = swappedWithItemElement;

      this.onSwap.emit(data);
    });

    this.swapyApi.onSwapEnd((event) => {
      this.onSwapEnd.emit(event);
    });
  }

  private generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const randomNum = (Math.random() * 16) | 0;
      const value = char === "x" ? randomNum : (randomNum & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}
