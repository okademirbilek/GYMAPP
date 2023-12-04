import { useState } from "react";

const useLoadPage = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  return { loading, status, error, setLoading, setStatus, setError };
};

export default useLoadPage;
