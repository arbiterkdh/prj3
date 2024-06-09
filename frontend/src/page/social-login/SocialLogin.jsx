import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export function SocialLogin() {
  const location = useLocation();

  const [company, setCompany] = useState(location.state?.company);
  const kakaoKey = import.meta.env.VITE_KAKAO_APP_KEY;
  const kakaoUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const navigate = useNavigate();

  useEffect(() => {
    if (company === null) {
      navigate("/");
    }

    if (company === "kakao") {
      axios.get(
        `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoKey}&redirect_uri=${kakaoUri}`,
      );
    }
  }, []);

  return null;
}
