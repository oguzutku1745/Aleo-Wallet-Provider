import { ReactNode } from 'react';
import { RecordStatus, EventType } from '@puzzlehq/types';
export interface Window {
    leo?: any;
    aleo?: any;
}
export interface ConnectionLog {
    timestamp: Date;
    event: string;
    data?: any;
}
export interface TransactionParams {
    programId: string;
    functionName: string;
    inputs: any[];
    fee: number;
}
export interface TransactionResult {
    transactionId?: string;
    error?: string;
}
export interface SignatureParams {
    message: string;
}
export interface SignatureResult {
    signature?: string;
    error?: string;
}
export interface DecryptParams {
    ciphertexts: string[];
}
export interface DecryptResult {
    plaintexts?: string[];
    error?: string;
}
export interface RecordParams {
    programId: string;
    status?: RecordStatus;
}
export interface RecordResult {
    records?: any[];
    error?: string;
}
export interface RecordPlaintextsParams {
    programId: string;
    status?: RecordStatus;
}
export interface RecordPlaintextsResult {
    recordsWithPlaintext?: any[];
    error?: string;
}
export interface TransactionHistoryParams {
    programId: string;
    eventType?: EventType;
    functionId?: string;
}
export interface TransactionHistoryResult {
    transactions?: any[];
    error?: string;
}
export interface WalletContextType {
    connected: boolean;
    connecting: boolean;
    address: string | null;
    walletName: string | null;
    connectionLogs: ConnectionLog[];
    errorMessage: string | null;
    connectWallet: (type: 'puzzle' | 'leo' | 'fox' | 'soter') => Promise<void>;
    disconnectWallet: () => Promise<void>;
    createTransaction: (params: TransactionParams) => Promise<TransactionResult>;
    signMessage: (params: SignatureParams) => Promise<SignatureResult>;
    decryptMessage: (params: DecryptParams) => Promise<DecryptResult>;
    getRecords: (params: RecordParams) => Promise<RecordResult>;
    getRecordPlaintexts: (params: RecordPlaintextsParams) => Promise<RecordPlaintextsResult>;
    getTransactionHistory: (params: TransactionHistoryParams) => Promise<TransactionHistoryResult>;
    transactionPending: boolean;
    lastTransactionId: string | null;
    signaturePending: boolean;
    lastSignature: string | null;
    decryptPending: boolean;
    lastDecryptedTexts: string[] | null;
    recordsLoading: boolean;
    lastRecords: any[] | null;
    recordPlaintextsLoading: boolean;
    lastRecordPlaintexts: any[] | null;
    transactionHistoryLoading: boolean;
    lastTransactionHistory: any[] | null;
}
export interface WalletProviderProps {
    children: ReactNode;
}
