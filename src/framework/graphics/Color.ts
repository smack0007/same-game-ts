export class Color {
  constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number,
    public readonly a: number
  ) {}

  public static areEqual(color1: Color, color2: Color): boolean {
    return (
      color1.r === color2.r &&
      color1.g === color2.g &&
      color1.b === color2.b &&
      color1.a === color2.a
    );
  }

  public equals(other: Color): boolean {
    return (
      this.r === other.r &&
      this.g === other.g &&
      this.b === other.b &&
      this.a === other.a
    );
  }

  public with(values: Partial<Color>): Color {
    return new Color(
      values.r ?? this.r,
      values.g ?? this.g,
      values.b ?? this.b,
      values.a ?? this.a
    );
  }
}
