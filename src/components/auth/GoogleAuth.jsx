import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import axiosInstance from "../../apis/axios";
import { useAuth } from "../../context/AuthContext";

const GoogleAuth = ({
    endpoint = "/auth/google",
    redirectTo = "/",
    buttonText = "Continue with Google",
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || redirectTo;

    const googleLogin = useGoogleLogin({
        flow: "auth-code",

        onSuccess: async ({ code }) => {
            try {
                setLoading(true);

                const { data } = await axiosInstance.post(endpoint, {
                    code,
                });

                if (!data.success) {
                    throw new Error(data.message);
                }

                login(data.data, data.token);

                navigate(from, {
                    replace: true,
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <button
            type="button"
            onClick={googleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/60 hover:border-slate-600 transition-all duration-200 shadow-md hover:shadow-teal-500/10 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
        >
            {loading ? (
                <div className="h-5 w-5 border-2 border-slate-400 border-t-teal-400 rounded-full animate-spin" />
            ) : (
                <FcGoogle className="text-xl transition-transform duration-200 group-hover:scale-110 shrink-0" />
            )}
            <span className="tracking-wide">
                {loading ? "Signing In..." : buttonText}
            </span>
        </button>
    );
};

export default GoogleAuth;