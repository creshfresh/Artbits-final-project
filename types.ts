import * as DocumentPicker from "expo-document-picker";


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

  export interface ArtGrantData {
    user_id:string,
    name: string;
    organization: string;
    totalGranted: string;
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