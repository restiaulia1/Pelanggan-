import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyBoQovSZfN-IWxwE6SNigeVFl7EyoGo6I8",
  authDomain: "insan-cemerlang-bf3bc.firebaseapp.com",
  projectId: "insan-cemerlang-bf3bc",
  storageBucket: "insan-cemerlang-bf3bc.appspot.com",
  messagingSenderId: "97027282334",
  appId: "1:97027282334:web:f8b63d43a947098d3df28f",
  measurementId: "G-TJFSY9D8R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const basisdata = getFirestore(app);

// fungsi ambil daftar pelanggan 
export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "pelanggan");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);

  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      nohape: dokumen.data().nohape

    })
  })

  return hasilkueri;
}

// fungsi menambah data pelanggan 
export async function tambahPelanggan(nama, alamat, nohape) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "pelanggan"), {
      nama: nama,
      alamat: alamat,
      nohape: nohape
    })

    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data pelanggan")
  } catch (error) {
    // menampilkan pesan gagal 
    console.log("gagal menyimpan data pelanggan")
  }
}

export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "pelanggan", id))
}


export async function ubahPelanggan(id, namabaru, alamatbaru, nohapebaru) {
  await updateDoc(
    doc(basisdata, "pelanggan", id), { nama: namabaru, alamat: alamatbaru, nohape: nohapebaru }
  )

}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "pelanggan", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}