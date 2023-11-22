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
            setMessage(message)
            alert(`message: ${message.records}`)
            const scannedData = message.records.map((record: any) => record.data ? new TextDecoder().decode(record.data) : '').join('');
            setScanData(scannedData);
            alert(`scannedData: ${scannedData}`);
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
      {/* <p>Message: {message}</p> */}
    </div>
  );
};

export default NFCComponent;
