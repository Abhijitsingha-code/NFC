'use client'
import { useState, useEffect } from 'react';

const NFCComponent = () => {
  const [scanData, setScanData] = useState<string[]>([]);

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
            alert(`Record Data: ${event.message.records[0]}`);
            const recordsString = JSON.stringify(event.message.records[0], null, 2); // JSON.stringify to convert array to string
            alert(`NFC Records:\n${recordsString}`);
            alert(`NDEF Message length: ${event.message.records.length}`);

            // event.message.records.forEach((record) => {
            //   // Accessing common properties of NDEFRecord
            //   const recordType = record.recordType;
            //   const mediaType = record.mediaType;
            //   const id = record.id;
            //   const data = new TextDecoder().decode(record.data);

            //   // Displaying the properties in an alert (for debugging purposes)
            //   alert(`Record Type: ${recordType}\nMedia Type: ${mediaType}\nID: ${id}\nData: ${data}`);

            //   // Save the scan data to the state
            //   setScanData((prevScanData) => [...prevScanData, data]);
            // });
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
      <p>{scanData}</p>
    </div>
  );
};

export default NFCComponent;
