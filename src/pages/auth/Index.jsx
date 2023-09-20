import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import img1 from "../../assets/icons8-logo-de-google-96.png";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const singInWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    const authInfo = {
      userId: res.user.uid,
      userEmail: res.user.email,
      userName: res.user.displayName,
      userPhoto: res.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page flex justify-center items-center flex-col h-screen w-full gap-10 bg-slate-800">
      <h2 className="text-5xl text-orange-500">Gestor de Gastos</h2>
      <p className="text-4xl text-gray-50">Inicia sesión con google</p>
      <button
        className="login-btn px-4 py-3 bg-slate-700 text-white flex justify-center items-center gap-5 rounded-md text-2xl"
        onClick={singInWithGoogle}
      >
        <img src={img1} alt="google" className="w-10" />
        Iniciar sesion
      </button>
    </div>
  );
};
export default Auth;
