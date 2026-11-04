export type TabType = 'home' | 'assignments' | 'patrol' | 'schedule' | 'profile';

export interface Checkpoint {
  id: string;
  order: number;
  name: string;
  status: 'completed' | 'pending' | 'scheduled';
  time?: string;
  tagType: 'NFC' | 'QR Code';
  tagId: string;
  note?: string;
  image?: string;
  instructions?: string;
  targetWindow?: string;
  estimatedProximity?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SecurityAssignment {
  id: string;
  postNumber: string;
  title: string;
  category: string;
  status: 'active' | 'confirmed' | 'standby' | 'scheduled';
  roleTag: string;
  timeWindow: string;
  date: string;
  address: string;
  sector?: string;
  unitAssigned: string;
  ordersVersion?: string;
  supervisor?: string;
  tier: string;
}

export interface OfficerProfile {
  name: string;
  badgeNumber: string;
  rank: string;
  tier: string;
  status: 'ON DUTY' | 'ON BREAK' | 'OFF DUTY';
  currentShift: {
    property: string;
    sector: string;
    address: string;
    startTime: string;
    endTime: string;
    gateKeycode: string;
    supervisor: string;
    geofenceAccuracy: string;
  };
  metrics: {
    hoursLogged: number;
    shiftsCompleted: number;
    onTimeRate: number;
    overtimeHours: number;
  };
}

export interface FieldNote {
  id: string;
  checkpointId?: string;
  timestamp: string;
  author: string;
  category: string;
  content: string;
  imageUrl?: string;
}

export interface IncidentAlert {
  id: string;
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  category: string;
  description: string;
  resolved: boolean;
}
