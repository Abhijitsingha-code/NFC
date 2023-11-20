'use client'
import { useEffect } from 'react';

const NFCComponent = () => {
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

  return (
    <div>
      <button onClick={handleScanClick}>Scan NFC</button>
      <button onClick={handleWriteClick}>Write to NFC</button>
      <button onClick={handleMakeReadOnlyClick}>Make Read-Only</button>
    </div>
  );
};

export default NFCComponent;

