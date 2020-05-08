export class InputValues {
  Port?: string;
  VesselName?: string;
  Flag?: string;
  VesselType?: string;
  Loa?: number;
  Bm?: number;
  Dm?: number;
  Gt?: number;
  Rgt?: number;
  Terminal?: string;

  VesselVol(): number {
    return this.Loa * this.Dm * this.Bm;
  }
}
