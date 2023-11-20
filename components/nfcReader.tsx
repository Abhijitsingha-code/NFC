'use client'
import { useState, useEffect } from 'react';

const NFCComponent = () => {
  const [scanData, setScanData] = useState(null);

  const handleScanClick = async () => {
    console.log("User clicked scan button");

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      console.log("> Scan started");

      ndef.addEventListener("readingerror", () => {
        console.log("Argh! Cannot read data from the NFC tag. Try another one?");
      });

      ndef.addEventListener("reading", ({ message, serialNumber }:any) => {
        console.log(`> Serial Number: ${serialNumber}`);
        console.log(`> Records: (${message.records.length})`);

        // Assuming the data is a string, you may need to adjust this based on your actual data format
        const scannedData = message.records.map((record:any) => record.data ? new TextDecoder().decode(record.data) : '').join('');
        setScanData(scannedData);
      });
    } catch (error) {
      console.log("Argh! " + error);
    }
  };

  const handleWriteClick = async () => {
    console.log("User clicked write button");

    try {
      const ndef = new NDEFReader();
      await ndef.write("Hello world!");
      console.log("> Message written");
    } catch (error) {
      console.log("Argh! " + error);
    }
  };

  const handleMakeReadOnlyClick = async () => {
    console.log("User clicked make read-only button");

    try {
      const ndef = new NDEFReader();
      await ndef.makeReadOnly();
      console.log("> NFC tag has been made permanently read-only");
    } catch (error) {
      console.log("Argh! " + error);
    }
  };

  useEffect(() => {
    // Clean up NFC functionality if needed
    return () => {
      // Clean up NFC functionality if needed
    };
  }, []);

  return (
    <div>
      <button onClick={handleScanClick}>Scan NFC</button>
      <button onClick={handleWriteClick}>Write to NFC</button>
      <button onClick={handleMakeReadOnlyClick}>Make Read-Only</button>

      {scanData && (
        <div>
          <h2>Scanned Data</h2>
          <p>{scanData}</p>
        </div>
      )}
    </div>
  );
};

export default NFCComponent;

