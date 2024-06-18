import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            let tmp1 = verificationCode.split("oobCode=")[1];
            let tmp2 = tmp1.split("&apiKey=")[0];
            const resp = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDp8idFWhl-LP5BGCa7F_troVRArne3Zls`,
                {
                    oobCode: tmp2,
                }
            );
            if (resp.data.emailVerified === true) {
                navigate("/home", { replace: true });
            }
        } catch (error) {
            console.error("Verification error:", error);
            window.alert("Please enter a valid verification link.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                <h2 className="text-xl font-bold mb-4">Verify your email</h2>
                <h3 className="text-md mb-4">Paste the verification link from your email below.</h3>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verificationCode">
                        Verification link
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="verificationCode"
                        type="text"
                        placeholder="Enter verification link"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 text-sm px-2 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Verify;
