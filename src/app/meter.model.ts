import { firestore } from 'firebase';

interface MeterEntry {
  timestamp: firestore.Timestamp,
  value: number,
}

class Meter {
  name: string;
  entries: MeterEntry[];

  constructor(name: string, entries: MeterEntry[]) {
    this.name = name;
    this.entries = entries;
  }
} 

export default Meter;