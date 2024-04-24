# oui-stylus

> CSS Framework written in Stylus

Goals:

- [ ] Good CSS resets
- [ ] Support for dark mode
- [ ] Styleguide for naming properties and CSS variables
- [ ] Great defaults
- [ ] Concise

---

## Naming conventions

In general the **semantic meaning** is prefered over visual aspects.

### Components

CSS for Vue components start with `oui-` like `oui-modal`.

### Modifiers

Modifiers start with an underscore like `_active`. The idea behind this is, that you can more easily use these in Vue class bindings like `:class="{ _active }"` or `:class="[ _active ]"`, because they don't conflict with JS variable names, like `-active` would do. I also want to avoid uppercase letters, and therefore modifiers like `isActive` or `hasValue` (see Bulma).

Modifiers should only be defined together with other class names, like `&._active`.

For widgets with inner structure this might look like this:

```html
<div class="oui-list">
  <div class="oui-list-item" :class="[_active]">
    ...
  </div>
</div>
```

### CSS variables

```css
:root {
  /* Neutral colors */
  --n0-50: $gray-50;
  --n0-100: $gray-100;
  --n0-200: $gray-200;
  --n0-300: $gray-300;
  --n0-400: $gray-400;
  --n0-500: $gray-500;
  --n0-600: $gray-600;
  --n0-700: $gray-700;
  --n0-800: $gray-800;
  --n0-900: $gray-900;
  --n0-950: $gray-950;

  /* Brand / primary colors */
  --p1-50: $primary-50;   /* light */
  --p1-100: $primary-100;
  --p1-200: $primary-200;
  --p1-300: $primary-300;
  --p1-400: $primary-400;
  --p1-500: $primary-500; /* signal color */
  --p1-600: $primary-600;
  --p1-700: $primary-700;
  --p1-800: $primary-800;
  --p1-900: $primary-900;
  --p1-950: $primary-950; /* dark */
}
```

```css
:root {

  /** Common text and panel colors */
  --fg: var(--n0-950, black);
  --bg: var(--n0-50, white);
  --s2-fg: var(--n0-800);
  --s2-bg: var(--n0-200);
  --t3-fg: var(--n0-700);
  --t3-bg: var(--n0-300);

  /* Hyperlinks */
  --link-fg: var(--p1-800);
  --link-fg-hover: var(--p1-700);
  --link-fg-active: var(--p1-600);
}

/* Dark mode via class, because user might want to choose */
.dark {
  --fg: var(--n0-50, white);
  --bg: var(--n0-950, black);
}
```

`--name-(level)-style-state`

`--link-fg-hover`
`--input-border-focus`
`--s2-bg`

- Level (Basics)
  - `n0` (neutral, usually gray)
  - `p1` (primary)
  - `s2` (secondary, usually lighter)
  - `t3` (ternary, usually even more lighter)
- Style
  - `fg` is **foreground color**, corresponds to `color`
  - `bg` is **background**, corresponds to `background`
  - `border`
  - `shadow`
  - `outline`
  - `radius`
- State
  - `active`
  - `disabled`
  - `focus`
  - `hover`

Do not use words like `color`.

## Colors

We work with color palettes like in Tailwind where `500` is the actual color.

These tools might help to find good values for you particular color:

- [tailwindcss](https://tailwindcss.com/docs/customizing-colors) pick a good one here
- [tailwindshades](https://www.tailwindshades.com/)
- [ui colors](https://uicolors.app/create)
- [tints.dev](https://www.tints.dev/)

---

For websites and web apps there is no way around CSS. It is versatile and powerful, but in some places it is also cumbersome. CSS frameworks make things easier, but sometimes they are already too much. Then there are also utility first CSS frameworks like [Tailwind](https://tailwindcss.com/), which put the [whole design back into HTML](https://tailwindcss.com/docs/utility-first).

Tailwind indeed offers maximum flexibility with attractive results. But it ignores the semantic structure of HTML. Especially if different themes are to be used, the classic approach to separate content and visual design is better.

To get the best of both worlds, I have written Stylus mix ins inspired by Tailwind using the incredibly powerful yet elegant [Stylus CSS preprocessor](https://stylus-lang.com/), which should make the code clearer.

## Get started

First _twindy_ can be easily installed via npm:

```shell
npm i oui-stylus
```

We now create a stylus file, e.g. 'mystormy.styl' with the content:

```stylus
@require "oui-stylus"
```

## Units
We introduce the special unit `rex` (a mix of `rem` and `px`). `1rem` is usually equivalent to `16px`, but it can vary between different environments. Still it is easier for most developers think in `px`. To get the best of both worlds and a UI that scales correctly for the environment you can now use `rex(value)` to have the pseudo pixel size being translated to `rem` values.

The shortcuts for `padding` and `margin` automatically convert pure numbers without any specified unit to `rex`. Such that in the following example we would get horizontal margins if `0.5rem`:

```stylus
.demo
  m-x 8
```

It should always be thought in steps of 8 to get a harmonious picture. Further, shortcuts like `p()` or `m-y()` or `p-r()` or the long versions like `padding-y` are available.

In case you would like to write your own function using `rex` with multiple values, there is a function for that:

```stylus
fancy-border()
  border rexArgs(arguments)

.test
  fancy-border 1 solid -gray-500

// Will result in:
// border: 0.0625rem solid #71717a;
```

## Predefined Values and Colors

Predefined values are prefixed by `-`. This convention should help to better see the difference of a mix in and a value.

Such values are e.g. colors. These have been adopted from Tailwind and can be used beautifully as follows:

```stylus
.success
  color -green-900
  background -green-100
```

You can see the [full list of colors at Tailwind](https://tailwindcss.com/docs/customizing-colors#color-palette-reference).

## Breakpoints / Responsiveness

Stylus already offers a flexible '@media' support, so it can also be placed within a class or mix in. The breakpoints are defined as variables. Example:

```stylus
container()
  m-x(32)

  @media -lg
    margin-left auto
    margin-right auto
    max-width 960px
```

The full list is:

```stylus
-sm = '(min-width: 640px)'
-md = '(min-width: 768px)'
-lg = '(min-width: 1024px)'
-xl = '(min-width: 1280px)'
```

## Dark Mode

If the design should respond to systems that prefer dark mode, you can simply to so by defining the alternatives with `@media -dark`:

```stylus
body
  color -gray-900
  @media -dark
    color white
    background -gray-800
```

But you could also set a class named `dark` to the `html` element programmatically and respond to that:

```stylus
body
  color -gray-900
  .dark &
    color white
    background -gray-800
```

Learn more about [this setup at Tailwind](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually).

## Reset

The included reset canonizes all elements so that they are used purely semantically and can be visually overloaded later. The box model is predefined with 'box-sizing: border-box'. In the own CSS definition you should then only set the desired font.

However, _twindy_ generally does not add styles on its own, so we have to call the following mix in at the beginning of the CSS file:

```stylus
oui-reset()
```

## Text

Similar to the reset, there are also predefined styles for continuous text passages, which can be used optionally. For example, for elements within the `.text` class:

```stylus
.text
  oui-text()
```

## Shortcuts

To make the code look more like CSS you can use the `tw` expander for functionalities, that have none or default arguments (aliases `use`, `do`, `apply` or `twindy`). The previous example could be written this way too:

```stylus
article
  use text
```

But it is also possible to add multiple calls like shown in the following sections.

## Stack Layout

A strong abstraction for the layout, especially for web apps, is provided by stacks. A container can define a vertical `stack-y()` or horizontal `stack-x()`. The child elements are then arranged accordingly. If an element should consume the remaining space it can be marked with `grow()`. If it should be vertically scrollable, this can be done with `vscroll()`. If contained content should be placed vertically and horizontally centered, this can be defined with `center()`. In general, the layout is created using a flex box, so all the usual CSS properties will work.

Example:

```stylus
.app
  use stack-x

  .sidebar
    use stack-y

  .content
    use stack-item-grow stack-item-scroll
```

## Blocks

You can of course name and set your CSS selectors as you like, but I personally would not recommend going nuts by naming elements the [BEM](https://en.bem.info/) way or nest to hard. If you avoid global definitions for repeating elements like 'h1' or classes with common names like '.title' you can do everything you need in the scope of a well-defined block, without having side effects. This [article from Cube CSS](https://piccalil.li/cube-css/block/) describes the methodology quite well.

## Positioning

But also from the old stylus framework [nib](https://github.com/stylus/nib) I took some things over, like the shortcuts for positioning elements:

```stylus
.header
  absolute top left
  width 100%
```

## File Size

Due to its design _twindy_ is already very economical with definitions. But there is of course more to it:

1. use [Purge CSS](https://purgecss.com/) to remove unused styles
2. apply a CSS minifier, such as [clean-css](https://github.com/jakubpawlowicz/clean-css)

---

## Inspiring 3rd Party Work

- The elegant and powerful [Stylus](https://stylus-lang.com/)
- The awesome [TailwindCSS](https://tailwindcss.com/)
- The classic Stylus CSS framework [nib](https://github.com/stylus/nib)
