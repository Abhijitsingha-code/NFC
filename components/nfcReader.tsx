'use client'
import { useState, useEffect } from 'react';

const NFCComponent = () => {
  const [scanData, setScanData] = useState<string | null>(null);
  const [message1, setMessage1] = useState<any>()

  const handleScanClick = async () => {

    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          alert("Scanning.");

          ndef.onreadingerror = (event) => {
            alert(`Error! Cannot read data from the NFC tag. Try a different one? ${event}`);
          };

          ndef.onreading = (event) => {
            alert("Scan started successfully.");
            alert(`Serial Number: ${event.serialNumber}`);
            alert(`Record Data: ${event.message.records.toString()}`);
            alert(`NDEF Message length: ${event.message.records.length}`);
          }
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
