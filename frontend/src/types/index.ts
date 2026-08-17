export type Role = 'patient' | 'driver' | 'doctor' | 'hospital_admin' | 'super_admin';

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  role: Role;
  is_verified?: boolean;
}

export interface PatientProfile {
  id: number;
  blood_group?: string;
  allergies?: string;
  chronic_conditions?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  current_lat?: number;
  current_lng?: number;
}

export interface Hospital {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  total_icu_beds: number;
  available_icu_beds: number;
  total_general_beds: number;
  available_general_beds: number;
  emergency_capacity: number;
  contact_phone: string;
  trauma_center_level: string;
}

export interface Ambulance {
  id: number;
  vehicle_number: string;
  type: string;
  status: 'available' | 'busy' | 'maintenance';
  lat: number;
  lng: number;
  oxygen_level: number;
  fuel_level: number;
}

export interface EmergencyRequest {
  id: number;
  patient_id: number;
  pickup_address?: string;
  pickup_lat: number;
  pickup_lng: number;
  description?: string;
  severity_level: 'P1_CRITICAL' | 'P2_URGENT' | 'P3_NON_URGENT';
  status: 'pending' | 'dispatched' | 'en_route_patient' | 'on_site' | 'transporting' | 'arrived_hospital' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Trip {
  id: number;
  emergency_request_id: number;
  driver_id: number;
  hospital_id: number;
  status: string;
  eta_minutes: number;
  distance_km: number;
  start_time: string;
}

export interface VitalSign {
  id?: number;
  trip_id: number;
  heart_rate: number;
  spo2: number;
  temperature: number;
  blood_pressure_sys: number;
  blood_pressure_dia: number;
  timestamp?: string;
}

export interface MedicalRecord {
  id: number;
  title: string;
  record_type: string;
  summary: string;
  file_url?: string;
  uploaded_at: string;
}
