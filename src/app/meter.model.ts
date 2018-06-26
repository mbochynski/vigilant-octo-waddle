import { firestore } from 'firebase';

interface MeterEntry {
  timestamp: firestore.Timestamp,
  value: number,
}

interface Meter {
  name: string,
  entries: MeterEntry[],
}

export default Meter;