export interface Comparable {
  // 0 => same, -number => other > this, +number => this > other
  compareTo(other: Comparable): number
}
