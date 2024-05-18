import * as DocumentPicker from "expo-document-picker";
import { User as FirebaseUser } from "firebase/auth";

import { DocumentData } from "firebase/firestore";

export interface ContestData {
    user_id:string,
    name: string;
    organization: string;
    totalCash: string;
    startDate: string | null;
    finishDate: string | null;
    minAge: string;
    maxAge: string;
    participants: string;
    specifications: string;
    terms: string;
    objetive: string;
    urlbases: DocumentPicker.DocumentPickerResult | null;
    publishDate: string | null;
    weburl:string
  }

  export interface CombinedUser extends FirebaseUser {
    displayName: string | null;
    email: string | null;
    country: string | null;
    city: string | null;
    about_description: string | null;
    avatar: string | null;
    web_url: string | null;
    rol: string | null;
    user_id: string | null;
    firestoreData?: DocumentData;
  }
export interface AppUser {

  displayName: string | null,
  email: string | null,
  country: string | null,
  city: string | null,
  about_description: string | null,
  avatar:string | null,
  web_url: string | null,
  rol: string | null,
  user_id: string | null,

  }

  export interface ArtGrantData {
    user_id:string,
    name: string;
    organization: string;
    destinyCentre: string;
    totalGranted: string;
    startDate: string | null;
    finishDate: string | null;
    minAge: string;
    maxAge: string;
    participants: string;
    specifications: string;
    terms: string;
    urlbases: DocumentPicker.DocumentPickerResult | null;
    publishDate: string | null;
    weburl:string
  }