import { firestore } from 'firebase';

interface MeterEntry {
  timestamp: firestore.Timestamp,
  value: number,
}

interface Meter {
  name: string,
  entries: MeterEntry[],
}

class Meters {
  private list: Meter[]; 

  constructor(list: Meter[]) {
    this.list = list;
  }
}

export default Meters;
