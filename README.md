# Aleo Wallet Provider

A React provider for seamless integration with multiple Aleo blockchain wallets. This package provides a unified API for connecting to different Aleo wallet implementations, handling transactions, signatures, and more.

## Features

- 🔌 **Multi-wallet Support**: Supports Puzzle, Leo, Fox, and Soter wallets
- 🔄 **Unified API**: Consistent interface across different wallet implementations
- 🛠️ **Complete Functionality**: Transactions, signatures, decryption, and record management
- 📦 **Simple Integration**: Easy-to-use React Context and hooks
- 🔍 **Connection Logs**: Built-in logging for debugging
- 📝 **TypeScript Support**: Full type definitions included

## Installation

```bash
npm install aleo-wallet-provider
```

## Dependencies

This package depends on the following libraries, which will be installed automatically:
- `@puzzlehq/sdk`
- `@puzzlehq/types`
- `@demox-labs/aleo-wallet-adapter-leo`
- `@arcane-finance-defi/aleo-wallet-adapters`

## Version Requirements

⚠️ **Important**: This package requires specific React versions to work properly:
- React: 18.2.0
- React DOM: 18.2.0

Using different versions may cause connection problems with Leo Wallet.

## Basic Usage

```jsx
import React from 'react';
import { WalletProvider, useWallet } from 'aleo-wallet-provider';

// Wrap your app with the WalletProvider
function App() {
  return (
    <WalletProvider>
      <YourApp />
    </WalletProvider>
  );
}

// Use in any component
function ConnectButton() {
  const { connectWallet, connected, address, walletName } = useWallet();
  
  return (
    <div>
      <button 
        onClick={() => connectWallet('puzzle')} 
        disabled={connected}
      >
        Connect to Puzzle Wallet
      </button>
      
      {connected && (
        <div>
          <p>Connected to: {walletName}</p>
          <p>Address: {address}</p>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### `WalletProvider`

The main context provider component that manages wallet state.

```jsx
<WalletProvider>
  {children}
</WalletProvider>
```

### `useWallet` Hook

The hook provides access to the following properties and methods:

#### Connection State
- `connected`: Boolean indicating if a wallet is connected
- `connecting`: Boolean indicating if connection is in progress
- `address`: The connected wallet address (string or null)
- `walletName`: Name of the connected wallet (string or null)
- `errorMessage`: Any error message from recent operations (string or null)

#### Connection Methods
- `connectWallet(type)`: Connect to a specific wallet type
  - `type`: 'puzzle' | 'leo' | 'fox' | 'soter'
- `disconnectWallet()`: Disconnect the current wallet

#### Transaction Management
- `createTransaction(params)`: Create and execute a transaction
  - `params`: `{ programId, functionName, inputs, fee }`
- `transactionPending`: Boolean indicating if a transaction is in progress
- `lastTransactionId`: ID of the most recent transaction

#### Signature Operations
- `signMessage(params)`: Sign a message
  - `params`: `{ message }`
- `signaturePending`: Boolean indicating if signing is in progress
- `lastSignature`: Most recent signature

#### Decryption
- `decryptMessage(params)`: Decrypt ciphertexts
  - `params`: `{ ciphertexts }`
- `decryptPending`: Boolean indicating if decryption is in progress
- `lastDecryptedTexts`: Array of decrypted texts

#### Record Management
- `getRecords(params)`: Fetch records
  - `params`: `{ programId, status }`
- `getRecordPlaintexts(params)`: Fetch record plaintexts
  - `params`: `{ programId, status }`
- `getTransactionHistory(params)`: Fetch transaction history
  - `params`: `{ programId, eventType, functionId }`

#### Debugging
- `connectionLogs`: Array of connection-related log entries

## Advanced Examples

### Creating a Transaction

```jsx
function TransactionComponent() {
  const { createTransaction, connected, transactionPending, lastTransactionId } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleTransaction = async () => {
    if (!connected) return;
    
    const result = await createTransaction({
      programId: 'credits.aleo',
      functionName: 'transfer',
      inputs: [recipient, `${amount}u64`],
      fee: 3000
    });
    
    if (result.transactionId) {
      console.log(`Transaction submitted: ${result.transactionId}`);
    } else if (result.error) {
      console.error(`Transaction failed: ${result.error}`);
    }
  };
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="Recipient address" 
        value={recipient} 
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)}
      />
      <button 
        onClick={handleTransaction} 
        disabled={!connected || transactionPending}
      >
        {transactionPending ? 'Processing...' : 'Send Tokens'}
      </button>
      
      {lastTransactionId && (
        <p>Transaction ID: {lastTransactionId}</p>
      )}
    </div>
  );
}
```

### Signing Messages

```jsx
function SignatureComponent() {
  const { signMessage, connected, signaturePending, lastSignature } = useWallet();
  const [message, setMessage] = useState('Hello, Aleo!');
  
  const handleSignMessage = async () => {
    if (!connected) return;
    
    const result = await signMessage({
      message
    });
    
    if (result.signature) {
      console.log(`Message signed: ${result.signature}`);
    } else if (result.error) {
      console.error(`Signing failed: ${result.error}`);
    }
  };
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="Message to sign" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
      />
      <button 
        onClick={handleSignMessage} 
        disabled={!connected || signaturePending}
      >
        {signaturePending ? 'Signing...' : 'Sign Message'}
      </button>
      
      {lastSignature && (
        <div>
          <p>Signature:</p>
          <pre>{lastSignature}</pre>
        </div>
      )}
    </div>
  );
}
```

## License

MIT

Built with ❤️ by kyatzu 