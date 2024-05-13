import * as DocumentPicker from "expo-document-picker";


export interface ContestData {
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
  }