'use client'
import { useState, useEffect } from 'react';

const NFCComponent = () => {
  const [scanData, setScanData] = useState<string | null>(null);
  const [message, setMessage] = useState<any>()

  const handleScanClick = async () => {

    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          alert("Scanning.");
          ndef.onreadingerror = (event) => {
            alert("Scan Failed.");
            alert(
              "Error! Cannot read data from the NFC tag. Try a different one?",
            );
            alert(event)
          };
          ndef.onreading = event => {
            alert("Scan started successfully.");
            alert(event.serialNumber)
            const message = event.message;
            message.records.forEach((record) => {
              // Convert record data to ArrayBuffer
              const dataBuffer = record.data;
              const text = new TextDecoder().decode(dataBuffer);
              // Display text in an alert for debugging
              setMessage((prev: any) => prev + ' ' + text)
            });
            alert(`message ${message}`);
          };
        })
        .catch((error) => {
          alert(`Error! Scan failed to start: ${error}.`);
        });
    }
  };

  return (
    <div>
      <button onClick={handleScanClick}>Scan NFC</button>

      <h2>Scanned Data</h2>
      {scanData && (
        <p>{scanData}</p>
      )}
    </div>
  );
};

export default NFCComponent;
