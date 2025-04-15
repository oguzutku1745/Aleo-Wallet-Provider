import { ReactNode } from 'react';
import { EventType, RecordStatus } from '@puzzlehq/types';
declare global {
    interface Window {
        leo?: any;
        aleo?: any;
    }
}
interface ConnectionLog {
    timestamp: Date;
    event: string;
    data?: any;
}
interface TransactionParams {
    programId: string;
    functionName: string;
    inputs: any[];
    fee: number;
}
interface TransactionResult {
    transactionId?: string;
    error?: string;
}
interface SignatureParams {
    message: string;
}
interface SignatureResult {
    signature?: string;
    error?: string;
}
interface DecryptParams {
    ciphertexts: string[];
}
interface DecryptResult {
    plaintexts?: string[];
    error?: string;
}
interface RecordParams {
    programId: string;
    status?: RecordStatus;
}
interface RecordResult {
    records?: any[];
    error?: string;
}
interface RecordPlaintextsParams {
    programId: string;
    status?: RecordStatus;
}
interface RecordPlaintextsResult {
    recordsWithPlaintext?: any[];
    error?: string;
}
interface TransactionHistoryParams {
    programId: string;
    eventType?: EventType;
    functionId?: string;
}
interface TransactionHistoryResult {
    transactions?: any[];
    error?: string;
}
interface WalletContextType {
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
export declare function WalletProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useWallet(): WalletContextType;
export {};
