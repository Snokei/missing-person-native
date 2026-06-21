export const MOCK_PERSONS = [
  {
    id: '1',
    name: 'John Doe',
    age: 34,
    gender: 'Male',
    lastSeen: '12 Oct 2023, 10:30 AM',
    location: 'Downtown Park, NY',
    status: 'Missing',
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 28,
    gender: 'Female',
    lastSeen: '14 Oct 2023, 08:15 PM',
    location: 'Central Station',
    status: 'Found',
  },
  {
    id: '3',
    name: 'Sam Wilson',
    age: 45,
    gender: 'Male',
    lastSeen: '10 Oct 2023, 02:00 PM',
    location: 'Riverside Drive',
    status: 'Missing',
  },
  {
    id: '4',
    name: 'Emily Clark',
    age: 19,
    gender: 'Female',
    lastSeen: '16 Oct 2023, 06:45 AM',
    location: 'University Campus',
    status: 'Missing',
  },
  {
    id: '5',
    name: 'Robert Fox',
    age: 52,
    gender: 'Male',
    lastSeen: '09 Oct 2023, 11:00 PM',
    location: 'Main St. Diner',
    status: 'Found',
  },
  {
    id: '6',
    name: 'Alice Walker',
    age: 8,
    gender: 'Female',
    lastSeen: '18 Oct 2023, 03:20 PM',
    location: 'North Elementary',
    status: 'Missing',
  },
  {
    id: '7',
    name: 'Michael Brown',
    age: 60,
    gender: 'Male',
    lastSeen: '15 Oct 2023, 09:00 AM',
    location: 'City Hospital Area',
    status: 'Missing',
  },
  {
    id: '8',
    name: 'Sarah Connor',
    age: 35,
    gender: 'Female',
    lastSeen: '20 Oct 2023, 05:00 PM',
    location: 'Tech Park',
    status: 'Closed',
  },
];

export interface PersonRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastSeen: string;
  location: string;
  status: 'Missing' | 'Found' | 'Closed';
}

export function getStats() {
  const total = MOCK_PERSONS.length;
  const missing = MOCK_PERSONS.filter((p) => p.status === 'Missing').length;
  const found = MOCK_PERSONS.filter((p) => p.status === 'Found').length;
  const closed = MOCK_PERSONS.filter((p) => p.status === 'Closed').length;
  return { total, missing, found, closed };
}