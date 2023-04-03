import Loading from "../../components/Loading";
import { useState, useEffect } from "react";

function Conversations() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <>
      {loading && <Loading />}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default Conversations;
