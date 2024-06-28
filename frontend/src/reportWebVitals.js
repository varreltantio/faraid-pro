const reportWebVitals = onPerfEntry => {
  // Memeriksa apakah onPerfEntry adalah sebuah fungsi
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Mengimpor fungsi-fungsi performa dari paket 'web-vitals'
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Memanggil setiap fungsi performa dengan parameter onPerfEntry
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;