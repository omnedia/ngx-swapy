# ngx-swapy

`@omnedia/ngx-swapy` is an Angular library that provides a dynamic swapping mechanism for content elements. This component allows you to swap content interactively with smooth animations, customizable settings, and event handling. It is perfect for creating interactive UIs, dashboards, or content games.

## Features

- Interactive content swapping with customizable animations.
- Supports continuous mode for more fluid transitions.
- Lightweight and easy to integrate as a standalone component.
- Emits events on each swap for further interaction.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-swapy swapy
```

## Usage

Import the `NgxSwapyComponent` in your Angular module or component:

```typescript
import { NgxSwapyComponent } from '@omnedia/ngx-swapy';

@Component({
  ...
  imports: [
    ...
    NgxSwapyComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<om-swapy [swapyConfig]="{ animation: 'dynamic', continuousMode: true }" [disableSwap]="false" styleClass="custom-swapy">
  <div #OmSwapyContent class="content-1">
    Content 1
  </div>
  <div #OmSwapyContent class="content-2">
    Content 2
  </div>
  <div #OmSwapyContent class="content-3">
    Content 3
  </div>
</om-swapy>
```

## How It Works

- Global Styling: The `.om-swapy-container` and `.om-swapy-section` elements are styled globally within the application, and additional styles can be applied using the styleClass input.
- Swapy Content Styling: The individual content elements inside the `om-swapy` component are styled within their component’s CSS. Each content element should have the `#OmSwapyContent` identifier, ensuring it is correctly targeted for swapping.

## Styling Example

In this example, the custom-swapy style class is used to customize the appearance of the swapping container. Meanwhile, each content item retains the styles applied within the parent component.

```html
<om-swapy styleClass="swapy-container" [disableSwap]="false">
  <div class="section-a" #OmSwapyContent>
    Section A
  </div>
  <div class="section-b" #OmSwapyContent>
    Section B
  </div>
</om-swapy>
```

```css
/* Globally style the swapy container */
.swapy-container {
  background-color: #333;
  border-radius: 10px;
  padding: 1rem;
}

/* Globally style the sections */
.om-swapy-section {
  border: 1px solid #555;
  transition: transform 0.3s;
}

.om-swapy-section:hover {
  transform: scale(1.05);
}

/* Style individual content elements inside the component */
.section-a {
  background-color: lightblue;
  color: black;
  padding: 1rem;
}

.section-b {
  background-color: lightcoral;
  color: white;
  padding: 1rem;
}
```

## Component API

```html
<om-swapy
  [swapyConfig]="swapyConfig"
  [disableSwap]="disableSwap"
  (onSwap)="handleSwap($event)"
  styleClass="custom-class"
>
  <ng-content></ng-content>
</om-swapy>
```

- `swapyConfig` (optional): Configuration for the swap animation, including the animation type ('dynamic', 'spring', 'none') and whether continuous mode is enabled (true or false).
- `disableSwap` (optional): A boolean to enable or disable swapping. When true, the swapping functionality is disabled.
- `styleClass` (optional): Custom CSS class to apply to the .om-swapy-container for additional styling.
- `onSwap` (optional): Event that emits data every time a swap occurs.

## Example

```html
<om-swapy [swapyConfig]="{ animation: 'spring', continuousMode: false }" (onSwap)="onSwapEvent($event)">
  <div class="card" #OmSwapyContent>
    Card 1
  </div>
  <div class="card" #OmSwapyContent>
    Card 2
  </div>
</om-swapy>
```

This will create a swapping interface with two cards that can be swapped dynamically using spring animation.

## Styling

### `.om-swapy-container`

- This element wraps the swappable content and can be styled globally via a CSS class applied with the styleClass input. Use it to style the entire swapping grid, background, padding, and more.

### `.om-swapy-section`

- Each swappable section that contains individual content. You can apply global styles to `.om-swapy-section` to customize the appearance of the containers housing each piece of swappable content. Add `[data-swapy-highlighted]` to the selector to style the placeholder that appears while dragging an item.

### Individual Content

- Content inside the `.om-swapy-section` retains its styling from the parent component, allowing you to style each piece of content independently while keeping the swapping functionality intact.

## Example Styling Rules

```css
/* Globally: Apply a custom background and grid layout */
.custom-swapy {
  background-color: #1e1e1e;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* Globally: Style each swappable section */
.om-swapy-section {
  padding: 1rem;
  background-color: #282828;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}

/* In Component: Individual content styles are inherited */
.card {
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
```

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.