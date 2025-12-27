
import React, { useRef, useEffect } from 'react';

interface QRScannerProps {
  onBack: () => void;
  onScan: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onBack, onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex-1 bg-black flex flex-col relative overflow-hidden h-full">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <header className="p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
          <button onClick={onBack} className="p-2 bg-white/10 rounded-full text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
          <h2 className="text-white font-bold">Escaneamento Inteligente</h2>
          <div className="w-10"></div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <div className="w-64 h-64 border-2 border-primary rounded-3xl relative shadow-[0_0_50px_rgba(19,236,128,0.2)]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl translate-x-1 translate-y-1"></div>
            
            {/* Animated Scanning Line */}
            <div className="absolute left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(19,236,128,0.8)] animate-[scan_2s_infinite]"></div>
          </div>
          <p className="mt-8 text-white/70 text-sm text-center font-medium max-w-[200px]">
            Aponte para o QR Code de uma nota fiscal ou PIX
          </p>
        </div>

        <footer className="p-8 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
          <button onClick={() => onScan('mock_data')} className="bg-primary px-8 py-3 rounded-xl text-black font-bold shadow-lg">
            Simular Escaneamento
          </button>
        </footer>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          100% { top: 90%; }
        }
      `}</style>
    </div>
  );
};

export default QRScanner;
