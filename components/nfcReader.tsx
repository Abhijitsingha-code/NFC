'use client'
import { useState, useEffect } from 'react';

const NFCComponent: React.FC = () => {
  const [scanData, setScanData] = useState<string[]>([]);

  useEffect(() => {
    const handleNFC = async () => {
      try {
        const ndef = new NDEFReader();

        ndef.onreading = (event) => {
          console.log("Scan started successfully.");

          const message = event.message;

          // Process each record in the NDEF message
          message.records.forEach((record) => {
            // Accessing common properties of NDEFRecord
            const recordType = record.recordType;
            const mediaType = record.mediaType;
            const id = record.id;
            const data = new TextDecoder().decode(record.data);

            // Displaying the properties in the console (for debugging purposes)
            console.log(`Record Type: ${recordType}\nMedia Type: ${mediaType}\nID: ${id}\nData: ${data}`);

            // Save the scan data to the state
            setScanData((prevScanData) => [...prevScanData, data]);
          });
        };

        await ndef.scan();
      } catch (error) {
        console.error('Error reading NFC:', error);
      }
    };

    if ('NDEFReader' in window) {
      handleNFC();
    } else {
      console.warn('NFC API not supported in this browser.');
    }
  }, []);

  return (
    <div>
      <h1>Your Next.js NFC Example</h1>
      <div>
        <h2>Scan Data:</h2>
        <ul>
          {scanData.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default NFCComponent;
