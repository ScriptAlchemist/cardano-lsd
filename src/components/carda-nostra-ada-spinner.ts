import { gsap } from "gsap";

// Copyright (c) CardanoGoatio. All rights reserved. Licensed under the MIT license.

/**
 * A library cardano-lsd frontend components and animations. Checkout development: {@link https://github.com/CardanoGoat-io/cardano-lsd | github}
 *
 * @remarks
 * The `cardano-lsd` defines the {@link CardaNostraAdaSpinner} class. To draw the spinner,
 * call the {@link CardaNostraAdaSpinner.attachSVG | attachSVG()}.
 *
 * @packageDocumentation
 */

/**
 * Interface object spinnerSetting.
 * @param id - Element Id
 * @param color - Element Color
 * @param delay - Animation Delay Start
 * @param duration - Animation Length
 * 
 */
type spinnerSetting = {
  id: string;
  color?: string;
  delay?: number;
  duration?: number;
}
/**
 * Create a new ada spinner to attach to SVG.
 *
 * @remarks
 * This method is part of the cardano-lsd animation library.
 *
 * @typeParam spinnerSettings
 * @returns A new CardaNostraAdaSpinner
 *
 * @public
 */
export class CardaNostraAdaSpinner {
  private _htmlId: string;
  private _color: string;
  private _delay: number;
  private _duration: number;
 
  constructor({id, color, delay, duration}: spinnerSetting) {
    this._htmlId = id;
    if (color !== undefined) {
      this._color = color;
    } else {
      /**
       * @defaultValue "blue"
       */
      this._color = "blue";
    }
    if (delay !== undefined) {
      this._delay = delay;
    } else {
      /**
       * @defaultValue `0.3`
       */
      this._delay = 0.3;
    }
    if (duration !== undefined) {
      this._duration = duration;
    } else {
      /**
       * @defaultValue `4`
       */
      this._duration = 4;
    }
    
  }

  /**
   * Get Element Id.
   *
   * @example
   * 
   * ```ts
   * let spinner = new CardaNostraAdaSpinner({id="element-id"});
   * const spinnerId = spinner.htmlId;
   * ```
   * @readonly
   */

  public get htmlId() {
    return this._htmlId;
  }

  public set htmlId(value) {
    this._htmlId = value;
  }
  /**
   * Get Element Color.
   *
   * @example
   * 
   * ```ts
   * let spinner = new CardaNostraAdaSpinner({id="element-id", color:"green"});
   * const spinnerColor = spinner.color;
   * // green
   * ```
   * @readonly
   */
  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
  }

  /**
   * Get Animation Delay.
   *
   * @example
   * 
   * ```ts
   * let spinner = new CardaNostraAdaSpinner({id="element-id", delay:0.5});
   * const spinnerDelay = spinner.delay;
   * // 0.5
   * ```
   * @readonly
   */
  get delay(): number {
    return this._delay;
  }

  set delay(value: number) {
    this._delay = value;
  }

  /**
   * Get Animation Duration.
   *
   * @example
   * 
   * ```ts
   * let spinner = new CardaNostraAdaSpinner({id="element-id", duration:10});
   * const spinnerDuration = spinner.duration;
   * // 10
   * ```
   * @readonly
   */
  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  /**
   * Internal _animate function
   * 
   * @param svgContainer - SVG Element
   * 
   * @eventProperty
   * 
   * @internal
   * 
   */
  protected async _animate(svgContainer: SVGSVGElement) {
    const svg = svgContainer;
    const rings = [
      { d: 396, r: 169, fill: this._color },
      { d: 678, r: 100, fill: this._color },
      { d: 880, r: 85, fill: this._color },
      { d: 1084, r: 70, fill: this._color },
      { d: 1195, r: 55, fill: this._color },
    ];
    const ns = svg.namespaceURI;
    rings.forEach((ringData, index) => {
      const ring = document.createElementNS(ns, "g");
      ring.setAttribute("fill", ringData.fill);
      svg.appendChild(ring);

      const tl = gsap.timeline();
      tl.set(
        ring,
        { rotation: 30 * index, transformOrigin: "center center" },
        0
      );
      for (let i = 0; i < 6; i++) {
        const isLastRing = index === rings.length - 1;
        const circle = document.createElementNS(ns, "circle");
        circle.setAttribute("r", ringData.r.toString());
        ring.appendChild(circle);
        tl.set(
          circle,
          {
            cx: ringData.d,
            transformOrigin: "center center",
            rotation: i * 60,
          },
          0
        );
        const offset = i * 0.01;
        const nextCircle = rings[index + 1] || rings[0];
        tl.to(
          circle,
          {
            cx: isLastRing ? undefined : nextCircle.d,
            r: isLastRing ? undefined : nextCircle.r,
            rotation: `+=${
              30 * index + ((index + 1) % 2) * 30 + (isLastRing ? 150 : 0)
            }`,
            ease: "back.inOut",
          },
          offset
        );
        if (isLastRing) {
          tl.to(
            circle,
            {
              duration: this._duration * 0.2,
              r: "30",
              ease: "power2.in",
            },
            offset + this._delay + this._duration * 0.2
          );
          tl.to(
            circle,
            {
              cx: 0,
            },
            offset + this._delay + this._duration * 0.4
          );
          tl.to(
            circle,
            {
              r: nextCircle.r,
              cx: nextCircle.d,
            },
            offset + this._delay + this._duration * 0.6
          );
        }
      }
    });
  }

  /**
   * Attach SVG and run animation on CardaNostraAdaSpinner by Element Id.
   *
   * @remarks
   * This method attaches and animates the element.
   * 
   * @example
   * 
   * ```ts
   * let spinner = new CardaNostraAdaSpinner({id="element-id"});
   * // after page load attach svg to animate
   * spinner.attachSVG();
   * ```
   *
   * @eventProperty
   *
   * @public
   */
  async attachSVG(){
    const container = document.getElementById(this._htmlId);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "carda-nostra-svg";
    svg.setAttribute("viewBox", "-1300 -1300 2600 2600");
    if(container !== null) {
      const svgContainer = container.appendChild(svg)
      return this._animate(svgContainer);
    } else {
      throw new Error("Initiated Container Id Incorrect");
    }
  }

}
export default CardaNostraAdaSpinner;