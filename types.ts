import * as DocumentPicker from "expo-document-picker";


export interface ContestData {
    name: string;
    organization: string;
    totalCash: string;
    startDate: Date | null;
    finishDate: Date | null;
    minAge: string;
    maxAge: string;
    participants: string;
    specifications: string;
    terms: string;
    objetive: string;
    urlbases: DocumentPicker.DocumentPickerResult | null;
    publishDate: Date | null;
  }