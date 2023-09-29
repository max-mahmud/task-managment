import React, { useState } from "react";
import Header from "./component/Header";

const App = () => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div>
      {/* <DarkModeToggle /> */}
      <Header setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} />
    </div>
  );
};

export default App;
