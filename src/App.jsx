import Layout from "../src/components/layout/Layout";
import Home from "../src/pages/Home";

import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Home />
      </Layout>
    </AuthProvider>
  );
};
export default App;
