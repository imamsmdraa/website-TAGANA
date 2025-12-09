// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function NotFoundPage() {
//   const router = useRouter();
//   const [countdown, setCountdown] = useState(10);
//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           router.push("/admin/dashboard");
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [router]);

//   const handleGoHome = () => {
//     router.push("/admin/dashboard");
//   };

//   const handleGoBack = () => {
//     router.back();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//       <div className="max-w-2xl w-full text-center">
//         {/* Animated 404 */}
//         <div className="relative mb-8">
//           <h1 
//             className="text-[180px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none animate-pulse-slow"
//             onMouseEnter={() => setIsHovering(true)}
//             onMouseLeave={() => setIsHovering(false)}
//           >
//             404
//           </h1>
          
//           {/* Floating Icons */}
//           <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}>
//             <div className="relative w-32 h-32">
//               {/* Question Mark Icon */}
//               <div className="absolute top-0 left-0 animate-bounce" style={{ animationDelay: '0s' }}>
//                 <svg className="w-8 h-8 text-blue-500 opacity-70" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
//                 </svg>
//               </div>
              
//               {/* Search Icon */}
//               <div className="absolute top-0 right-0 animate-bounce" style={{ animationDelay: '0.2s' }}>
//                 <svg className="w-8 h-8 text-purple-500 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
              
//               {/* Alert Icon */}
//               <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: '0.4s' }}>
//                 <svg className="w-8 h-8 text-pink-500 opacity-70" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         <div className="mb-8 space-y-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//             Oops! Halaman Tidak Ditemukan
//           </h2>
//           <p className="text-lg text-gray-600 max-w-xl mx-auto">
//             Sepertinya halaman yang Anda cari tidak ada atau telah dipindahkan. 
//             Jangan khawatir, mari kita bantu Anda kembali ke jalur yang benar!
//           </p>
//         </div>

//         {/* Suggestions */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
//           <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
//             <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//             </svg>
//             Saran untuk Anda
//           </h3>
          
//           <div className="grid md:grid-cols-3 gap-4 text-left">
//             {/* Suggestion 1 */}
//             <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//               <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800 text-sm">Periksa URL</p>
//                 <p className="text-xs text-gray-600">Pastikan alamat yang Anda masukkan benar</p>
//               </div>
//             </div>

//             {/* Suggestion 2 */}
//             <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//               <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
//                 <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800 text-sm">Kembali ke Home</p>
//                 <p className="text-xs text-gray-600">Mulai dari dashboard utama</p>
//               </div>
//             </div>

//             {/* Suggestion 3 */}
//             <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
//               <div className="bg-pink-100 rounded-full p-2 flex-shrink-0">
//                 <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800 text-sm">Butuh Bantuan?</p>
//                 <p className="text-xs text-gray-600">Hubungi administrator sistem</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
//           <button
//             onClick={handleGoHome}
//             className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
//           >
//             <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//             </svg>
//             <span>Kembali ke Dashboard</span>
//           </button>

//           <button
//             onClick={handleGoBack}
//             className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             <span>Halaman Sebelumnya</span>
//           </button>
//         </div>

//         {/* Auto Redirect Countdown */}
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 inline-block">
//           <p className="text-sm text-gray-700 flex items-center space-x-2">
//             <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span>
//               Otomatis kembali ke dashboard dalam <span className="font-bold text-blue-600 text-lg mx-1">{countdown}</span> detik
//             </span>
//           </p>
//         </div>

//         {/* Decorative Elements */}
//         <div className="absolute top-10 left-10 opacity-20">
//           <svg className="w-20 h-20 text-blue-300 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
//             <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
//           </svg>
//         </div>
        
//         <div className="absolute bottom-10 right-10 opacity-20">
//           <svg className="w-24 h-24 text-purple-300 animate-pulse-slow" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }
