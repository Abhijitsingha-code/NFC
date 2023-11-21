'use client'
import { useState, useEffect } from 'react';

const NFCComponent = () => {
  const [scanData, setScanData] = useState(null);

  const handleScanClick = async () => {
    console.log("User clicked scan button");

    try {
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
          ndef.onreading = ({ event, serialNumber }: any) => {
            alert(event)
            alert(serialNumber)
            const scannedData = event.records.map((record: any) => record.data ? new TextDecoder().decode(record.data) : '').join('');
            setScanData(scannedData);
          };
        })
        .catch((error) => {
          alert(`Error! Scan failed to start: ${error}.`);
        });
    } catch (error) {
      alert("Argh! " + error);
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
