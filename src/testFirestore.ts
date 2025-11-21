import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function testFirestore() {
  console.log("🔥 Avvio test Firestore...");

  try {
    const ref = collection(db, "referti");
    const snapshot = await getDocs(ref);

    console.log(`📄 Trovati ${snapshot.size} referti:`);

    snapshot.forEach((doc) => {
      console.log("➡️", doc.id, doc.data());
    });

    console.log("✅ Test Firestore COMPLETATO");
  } catch (error) {
    console.error("❌ Errore Firestore:", error);
  }
}
