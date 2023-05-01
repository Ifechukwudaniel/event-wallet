import dynamic from "next/dynamic";
import { ethers } from "ethers";
import { useAppStore } from "~~/services/store/store";

// @ts-ignore
const ReactQrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

const QrCodeReader = () => {
  const isQrReaderOpen = useAppStore(state => state.isQrReaderOpen);
  const setIsQrReaderOpen = useAppStore(state => state.setIsQrReaderOpen);
  const setScreen = useAppStore(state => state.setScreen);

  const handelScanRead = (result: string) => {
    if (ethers.utils.isAddress(result)) {
      setScreen("send", { toAddress: result });
      return;
    }
  };

  return (
    <>
      {isQrReaderOpen && (
        <div className="max-w-[90%] w-[300px] h-[300px] absolute top-0 left-0 right-0 bottom-0 m-auto z-50">
          <ReactQrReader
            // @ts-ignore
            onScan={(result: string) => {
              if (!!result) {
                console.info("Scan result", result);
                handelScanRead(result);
                setIsQrReaderOpen(false);
              }
            }}
            onError={(error: any) => console.log(error)}
            style={{ width: "100%" }}
          />
        </div>
      )}
      {isQrReaderOpen && (
        <div className="fixed inset-0 z-10 bg-white bg-opacity-80" onClick={() => setIsQrReaderOpen(false)} />
      )}
    </>
  );
};

export { QrCodeReader };