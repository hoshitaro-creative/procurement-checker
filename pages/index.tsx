import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Layout from "../components/Layout";

const IndexPage = () => {
  const [docs, setDocs] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  useEffect(() => {
    const db = getFirestore();
    getDocs(collection(db, "procurement")).then((snapshot) => {
      setDocs(snapshot.docs);
    });
  }, []);
  return (
    <Layout title="トップページ_調達チェッカー">
      <h1>更新情報</h1>
      <Flex>
        {docs.map((doc, i) => (
          <div key={i}>{doc.ref.path}</div>
        ))}
      </Flex>
    </Layout>
  );
};

export default IndexPage;
