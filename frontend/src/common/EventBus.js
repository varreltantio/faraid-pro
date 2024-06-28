const eventBus = {
  // Metode 'on' untuk menambahkan event listener pada dokumen untuk event tertentu
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  // Metode 'dispatch' untuk memicu atau mengirimkan event custom dengan data tertentu
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  // Metode 'remove' untuk menghapus event listener dari dokumen untuk event tertentu
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;