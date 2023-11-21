'use client'
import { useState, useEffect } from 'react';

const NFCComponent = () => {
  const [scanData, setScanData] = useState<string | null>(null);

  const handleScanClick = async () => {

    if ('NDEFReader' in window) {
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          console.log("Scan started successfully.");
          ndef.onreadingerror = (event) => {
            console.log(
              "Error! Cannot read data from the NFC tag. Try a different one?",
            );
            alert(event)
          };
          ndef.onreading = event => {
            const message = event.message;
            for (const record of message.records) {
              alert("Record type:  " + record.recordType);
              alert("MIME type:    " + record.mediaType);
              alert("Record id:    " + record.id);
              const scannedData = message.records.map((record: any) => record.data ? new TextDecoder().decode(record.data) : '').join('');
              setScanData(scannedData);
            }
          };
        })
        .catch((error) => {
          alert(`Error! Scan failed to start: ${error}.`);
        });
    }else{
      alert(`NFC not supported.`);
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

