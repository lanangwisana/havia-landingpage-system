// // components/ClientWrapper.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
// import SplashScreen from "../components/SplashScreen";

// export default function ClientWrapper({ children }: { children: React.ReactNode }) {
//   const [showSplash, setShowSplash] = useState(true);
//   const [showContent, setShowContent] = useState(false);

//   const handleSplashFinish = () => {
//     setShowSplash(false);
//     // Kasih delay kecil untuk transisi yang smooth
//     setTimeout(() => {
//       setShowContent(true);
//     }, 100);
//   };

//   // Prevent scroll saat splash screen muncul
//   useEffect(() => {
//     if (showSplash) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showSplash]);

//   return (
//     <>
//       <AnimatePresence mode="wait">
//         {showSplash && (
//           <SplashScreen onFinish={handleSplashFinish} />
//         )}
//       </AnimatePresence>

//       {showContent && children}
//     </>
//   );
// }