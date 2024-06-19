import React, { useState } from "react";
import "./Verify.css"
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
        <div className="container">
            <form className="form" onSubmit={submitHandler}>
                <h2 className="verify">Verify your email</h2>
                <h3 className="paste">Paste the verification link from your email below.</h3>

                <div className="inpBox">
                    <label className="label" htmlFor="verificationCode">
                        Verification link
                    </label>
                    <input
                        className="input"
                        id="verificationCode"
                        type="text"
                        placeholder="Enter verification link"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                </div>

                <div className="btn">
                    <button
                        className="btnT"
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
